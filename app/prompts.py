def zero_shot_prompt(context: str, question: str) -> str:
    return f"""
You are a document question-answering assistant.

Answer the user's question using only the provided document context.
If the answer is not present in the context, say that the information
was not found in the provided documents.

Keep the answer clear, accurate, and concise.

DOCUMENT CONTEXT:
{context}

QUESTION:
{question}
""".strip()


def few_shot_prompt(context: str, question: str) -> str:
    return f"""
You are a document question-answering assistant.

Use the examples to follow the expected answer style.

Example 1:
Question: What is the main topic of a document?
Answer: The document mainly discusses the central subject described in its content.

Example 2:
Question: Where does the information come from?
Answer: The information comes from the relevant section of the provided document.

Example 3:
Question: What if the answer is not in the document?
Answer: State clearly that the information was not found in the provided documents.

Now answer the user's question using ONLY the document context.

DOCUMENT CONTEXT:
{context}

QUESTION:
{question}
""".strip()


def role_based_prompt(context: str, question: str) -> str:
    return f"""
You are a Technical Document Analyst specializing in accurate
document-based question answering.

Analyze the supplied context carefully. Give a concise answer based
only on the provided documents. Do not invent facts. If the answer is
not supported by the context, say so clearly.

DOCUMENT CONTEXT:
{context}

USER QUESTION:
{question}
""".strip()


def build_prompt(technique: str, context: str, question: str) -> str:
    prompts = {
        "zero-shot": zero_shot_prompt,
        "few-shot": few_shot_prompt,
        "role-based": role_based_prompt,
    }

    if technique not in prompts:
        technique = "role-based"

    return prompts[technique](context, question)
