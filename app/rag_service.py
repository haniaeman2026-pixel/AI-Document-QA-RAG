from pathlib import Path
from typing import List

from app.config import DATA_DIR, TOP_K, ALLOWED_EXTENSIONS
from app.document_loader import load_document
from app.chunker import create_chunks
from app.embeddings import create_embeddings, create_query_embedding
from app.vector_store import VectorStore
from app.prompts import build_prompt
from app.llm_service import LLMService


class RAGService:
    def __init__(self):
        DATA_DIR.mkdir(exist_ok=True)
        self.vector_store = VectorStore()

    def index_documents(self) -> dict:
        all_chunks = []
        document_names = []

        for path in sorted(DATA_DIR.iterdir()):
            if not path.is_file() or path.suffix.lower() not in ALLOWED_EXTENSIONS:
                continue

            pages = load_document(path)
            chunks = create_chunks(pages)

            all_chunks.extend(chunks)
            document_names.append(path.name)

        if not all_chunks:
            return {
                "documents": [],
                "chunks": 0,
                "message": "No supported documents found."
            }

        embeddings = create_embeddings(
            [chunk["text"] for chunk in all_chunks]
        )

        self.vector_store.add_chunks(all_chunks, embeddings)

        return {
            "documents": document_names,
            "chunks": len(all_chunks),
            "message": "Documents indexed successfully."
        }

    def search(self, question: str) -> List[dict]:
        query_embedding = create_query_embedding(question)
        return self.vector_store.search(query_embedding, TOP_K)

    def answer(self, question: str, technique: str = "role-based") -> dict:
        matches = self.search(question)

        if not matches:
            return {
                "answer": "No indexed document content was found. Please upload and index documents first.",
                "technique": technique,
                "sources": [],
                "retrieved_chunks": [],
            }

        context_parts = []

        for number, match in enumerate(matches, start=1):
            location = match["source"]

            if match["page"]:
                location += f", page {match['page']}"

            context_parts.append(
                f"[Source {number}: {location}]\n{match['text']}"
            )

        context = "\n\n".join(context_parts)
        prompt = build_prompt(technique, context, question)

        llm = LLMService()
        answer = llm.generate(prompt)

        return {
            "answer": answer,
            "technique": technique,
            "sources": [
                {
                    "source": match["source"],
                    "page": match["page"],
                    "similarity": match["similarity"],
                }
                for match in matches
            ],
            "retrieved_chunks": matches,
        }

    def compare_prompts(self, question: str) -> dict:
        matches = self.search(question)

        if not matches:
            return {
                "question": question,
                "results": [],
                "message": "No document content is indexed."
            }

        context = "\n\n".join(
            f"[Source: {m['source']}, Page: {m['page']}]\n{m['text']}"
            for m in matches
        )

        llm = LLMService()
        results = {}

        for technique in ["zero-shot", "few-shot", "role-based"]:
            prompt = build_prompt(technique, context, question)
            results[technique] = llm.generate(prompt)

        return {
            "question": question,
            "results": results,
            "retrieved_chunks": matches,
        }

    def document_list(self):
        return [
            path.name
            for path in sorted(DATA_DIR.iterdir())
            if path.is_file() and path.suffix.lower() in ALLOWED_EXTENSIONS
        ]

    def delete_document(self, filename: str):
        safe_name = Path(filename).name
        path = DATA_DIR / safe_name

        if not path.exists():
            raise FileNotFoundError("Document not found.")

        if path.suffix.lower() not in ALLOWED_EXTENSIONS:
            raise ValueError("Unsupported file type.")

        path.unlink()
        return self.index_documents()
