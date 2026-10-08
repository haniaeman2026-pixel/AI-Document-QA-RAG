from sentence_transformers import SentenceTransformer
from app.config import EMBEDDING_MODEL

_model = None


def get_embedding_model():
    global _model

    if _model is None:
        _model = SentenceTransformer(EMBEDDING_MODEL)

    return _model


def create_embeddings(texts):
    model = get_embedding_model()
    return model.encode(
        texts,
        normalize_embeddings=True,
        show_progress_bar=False
    ).tolist()


def create_query_embedding(text):
    return create_embeddings([text])[0]
