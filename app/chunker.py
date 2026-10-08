from typing import List, Dict
from app.config import CHUNK_SIZE, CHUNK_OVERLAP


def split_text(text: str, chunk_size: int = CHUNK_SIZE,
               overlap: int = CHUNK_OVERLAP) -> List[str]:
    text = " ".join(text.split())

    if not text:
        return []

    chunks = []
    start = 0

    while start < len(text):
        end = start + chunk_size
        chunk = text[start:end].strip()

        if chunk:
            chunks.append(chunk)

        if end >= len(text):
            break

        start = end - overlap

    return chunks


def create_chunks(pages: List[Dict]) -> List[Dict]:
    chunks = []

    for page in pages:
        parts = split_text(page["text"])

        for part_number, part in enumerate(parts, start=1):
            chunks.append({
                "text": part,
                "source": page["source"],
                "page": page["page"],
                "part": part_number,
            })

    return chunks
