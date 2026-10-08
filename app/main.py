from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from app.config import DATA_DIR, ALLOWED_EXTENSIONS, MAX_FILE_SIZE_MB
from app.rag_service import RAGService


BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"

rag_service = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    global rag_service
    rag_service = RAGService()
    yield


app = FastAPI(
    title="AI Document QA",
    description="Document Question Answering system using RAG, embeddings and ChromaDB.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class QuestionRequest(BaseModel):
    question: str
    technique: str = "role-based"


class CompareRequest(BaseModel):
    question: str


@app.get("/")
def home():
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/api/health")
def health():
    return {
        "status": "online",
        "service": "AI Document QA",
    }


@app.get("/api/documents")
def documents():
    return {
        "documents": rag_service.document_list()
    }


@app.post("/api/upload")
async def upload_documents(files: list[UploadFile] = File(...)):
    uploaded = []

    for file in files:
        extension = Path(file.filename).suffix.lower()

        if extension not in ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"{file.filename}: only PDF, TXT and Markdown files are allowed."
            )

        content = await file.read()

        if len(content) > MAX_FILE_SIZE_MB * 1024 * 1024:
            raise HTTPException(
                status_code=400,
                detail=f"{file.filename}: file is larger than {MAX_FILE_SIZE_MB} MB."
            )

        filename = Path(file.filename).name
        destination = DATA_DIR / filename
        destination.write_bytes(content)
        uploaded.append(filename)

    result = rag_service.index_documents()

    return {
        "uploaded": uploaded,
        **result,
    }


@app.post("/api/index")
def index_documents():
    return rag_service.index_documents()


@app.post("/api/ask")
def ask_question(request: QuestionRequest):
    question = request.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="Question is required.")

    try:
        return rag_service.answer(question, request.technique)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/compare-prompts")
def compare_prompts(request: CompareRequest):
    question = request.question.strip()

    if not question:
        raise HTTPException(status_code=400, detail="Question is required.")

    try:
        return rag_service.compare_prompts(question)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.delete("/api/documents/{filename}")
def delete_document(filename: str):
    try:
        result = rag_service.delete_document(filename)
        return {
            "deleted": filename,
            **result,
        }
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
