# AI-Powered Document Question Answering System

An AI Knowledge Assistant built with Python, FastAPI, Sentence Transformers, ChromaDB, Semantic Search, Prompt Engineering and RAG.

## Features

- PDF, TXT and Markdown document support
- Document chunking
- Sentence-transformer embeddings
- ChromaDB vector database
- Top-3 semantic retrieval
- Similarity and distance scores
- Retrieval-Augmented Generation
- Zero-shot prompting
- Few-shot prompting
- Role-based prompting
- Prompt comparison
- Source and page information
- Clean responsive web interface

## Architecture

Documents → Text Extraction → Chunking → Embeddings → ChromaDB → Semantic Search → Top 3 Context → Prompt → LLM → Answer

## Setup

### 1. Create environment

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install dependencies

```powershell
pip install -r requirements.txt
```

### 3. Create `.env`

```text
GROQ_API_KEY=your_key
GROQ_MODEL=openai/gpt-oss-20b
```

### 4. Add documents

Place at least five PDF, TXT or MD files inside `data/`.

### 5. Run

```powershell
python -m uvicorn app.main:app --reload
```

Open:

http://127.0.0.1:8000

## Assignment Mapping

### Part 1: Prompt Engineering

The application implements:

1. Zero-shot prompting
2. Few-shot prompting
3. Role-based prompting

The Prompt Engineering Lab compares all three techniques using the same question and retrieved context.

For the final assignment report, run the comparison with the same five questions and record:

- Accuracy
- Clarity
- Relevance

### Part 2: Embeddings and Semantic Search

The application:

1. Loads PDF/TXT/Markdown documents.
2. Splits text into smaller overlapping chunks.
3. Creates sentence-transformer embeddings.
4. Stores embeddings in ChromaDB.
5. Converts user questions into embeddings.
6. Retrieves the top three semantically similar chunks.
7. Displays retrieved chunks, similarity and distance values.

## Semantic Search vs Keyword Search

Keyword search mainly looks for exact or closely matching words.

Semantic search represents text as embeddings and compares meaning. Therefore, it can retrieve related information even when the exact keywords are different.

## Security Notes

- API keys are stored in `.env`.
- `.env` is excluded from Git.
- Uploaded file names are normalized before saving.
- File type and file size are validated.

## Suggested Five Test Questions

Use the same five questions for Zero-Shot, Few-Shot and Role-Based testing.

1. What is the main topic of the document?
2. What is the main purpose discussed in the document?
3. What are the key concepts mentioned?
4. What problem does the document describe?
5. What conclusion or recommendation is provided?

Evaluate every technique on accuracy, clarity and relevance.
