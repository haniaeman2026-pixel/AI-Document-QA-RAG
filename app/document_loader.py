from pathlib import Path
from typing import List, Dict
from pypdf import PdfReader


def load_pdf(path: Path) -> List[Dict]:
    pages = []
    reader = PdfReader(str(path))

    for page_number, page in enumerate(reader.pages, start=1):
        text = page.extract_text() or ""
        if text.strip():
            pages.append({
                "text": text,
                "page": page_number,
                "source": path.name,
            })

    return pages


def load_text_file(path: Path) -> List[Dict]:
    text = path.read_text(encoding="utf-8", errors="ignore")

    if not text.strip():
        return []

    return [{
        "text": text,
        "page": None,
        "source": path.name,
    }]


def load_document(path: Path) -> List[Dict]:
    extension = path.suffix.lower()

    if extension == ".pdf":
        return load_pdf(path)

    if extension in {".txt", ".md"}:
        return load_text_file(path)

    raise ValueError(f"Unsupported file type: {extension}")
