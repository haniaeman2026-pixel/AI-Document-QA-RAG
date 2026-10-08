import chromadb
from app.config import CHROMA_PATH, COLLECTION_NAME


class VectorStore:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=CHROMA_PATH)

        self.collection = self.client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )

    def clear(self):
        self.client.delete_collection(COLLECTION_NAME)
        self.collection = self.client.get_or_create_collection(
            name=COLLECTION_NAME,
            metadata={"hnsw:space": "cosine"},
        )

    def add_chunks(self, chunks, embeddings):
        if not chunks:
            return 0

        ids = []
        documents = []
        metadatas = []

        for index, chunk in enumerate(chunks):
            ids.append(
                f'{chunk["source"]}_{chunk["page"]}_{chunk["part"]}_{index}'
            )
            documents.append(chunk["text"])

            metadatas.append({
                "source": chunk["source"],
                "page": str(chunk["page"]) if chunk["page"] else "",
                "part": str(chunk["part"]),
            })

        self.collection.upsert(
            ids=ids,
            documents=documents,
            embeddings=embeddings,
            metadatas=metadatas,
        )

        return len(chunks)

    def search(self, query_embedding, top_k=3):
        if self.collection.count() == 0:
            return []

        result = self.collection.query(
            query_embeddings=[query_embedding],
            n_results=top_k,
            include=["documents", "metadatas", "distances"],
        )

        matches = []

        for i, document in enumerate(result["documents"][0]):
            distance = result["distances"][0][i]
            metadata = result["metadatas"][0][i]

            matches.append({
                "text": document,
                "source": metadata.get("source", "Unknown"),
                "page": metadata.get("page", ""),
                "distance": round(float(distance), 4),
                "similarity": round(max(0.0, 1 - float(distance)), 4),
            })

        return matches
