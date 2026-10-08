<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111111,50:D4AF37,100:111111&height=220&section=header&text=AI%20Document%20QA&fontSize=48&fontColor=FFFFFF&animation=fadeIn&fontAlignY=38&desc=Intelligent%20Document%20Question%20Answering%20System&descAlignY=60&descSize=18" width="100%"/>

<br>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=21&duration=2800&pause=900&color=D4AF37&center=true&vCenter=true&width=750&lines=Retrieval-Augmented+Generation;Semantic+Search+%7C+Embeddings+%7C+Vectors;ChromaDB+%7C+Prompt+Engineering+%7C+LLMs;Ask+Questions.+Retrieve+Knowledge.+Generate+Answers." />

<br><br>

<img src="https://img.shields.io/badge/Python-D4AF37?style=for-the-badge&logo=python&logoColor=111111"/>
<img src="https://img.shields.io/badge/FastAPI-D4AF37?style=for-the-badge&logo=fastapi&logoColor=111111"/>
<img src="https://img.shields.io/badge/RAG-D4AF37?style=for-the-badge&logoColor=111111"/>
<img src="https://img.shields.io/badge/ChromaDB-D4AF37?style=for-the-badge&logoColor=111111"/>
<img src="https://img.shields.io/badge/LLM-D4AF37?style=for-the-badge&logoColor=111111"/>

</div>

---

# 🤖 About The Project

**AI Document QA** is an AI-powered document question-answering system that allows users to ask questions about information contained in their documents.

The system uses **Retrieval-Augmented Generation (RAG)** to retrieve relevant document content before generating an answer with an LLM.

Instead of asking the LLM to answer from general knowledge, the system first searches the document knowledge base and provides relevant context to the model.

### Core Pipeline

```text
Documents
    ↓
Text Extraction
    ↓
Text Chunking
    ↓
Embeddings
    ↓
Vector Storage
    ↓
Semantic Search
    ↓
Relevant Context
    ↓
Prompt Engineering
    ↓
LLM
    ↓
Final Answer
```

---

# ✨ Key Features

* 📄 Document-based Question Answering
* 🧠 Sentence-Transformer Embeddings
* 📐 Vector Representations
* 🔎 Semantic Search
* 🗄️ ChromaDB Vector Database
* 🔗 Retrieval-Augmented Generation
* ✂️ Document Chunking
* ⭐ Top-K Relevant Chunk Retrieval
* ✍️ Prompt Engineering
* 0️⃣ Zero-Shot Prompting
* 🎯 Few-Shot Prompting
* 👨‍💻 Role-Based Prompting
* 🤖 LLM-powered Answers
* 🌐 FastAPI Backend
* 💻 Clean Web Interface

---

# 🧠 How The AI Pipeline Works

## 1. 📄 Document Processing

The system loads documents and extracts their text.

Supported document types include:

```text
PDF
TXT
Markdown
```

---

## 2. ✂️ Chunking

Large documents are divided into smaller pieces called **chunks**.

```text
Large Document
      ↓
 ┌────────────┐
 │  Chunk 1   │
 ├────────────┤
 │  Chunk 2   │
 ├────────────┤
 │  Chunk 3   │
 ├────────────┤
 │    ...     │
 └────────────┘
```

Chunking makes document retrieval more efficient because the system can search smaller sections instead of processing the entire document every time.

---

# 🧠 Embeddings

An **embedding** converts text into a numerical representation that captures its semantic meaning.

For example:

```text
"What is RAG?"
      ↓
Embedding Model
      ↓
[0.21, -0.45, 0.78, 0.12, ...]
```

This numerical representation allows the system to compare the semantic similarity between a user's question and document chunks.

---

# 📐 Vectors

The numerical representation produced by an embedding model is a **vector**.

For example:

```text
[0.21, -0.45, 0.78, 0.12]
```

Similar pieces of text tend to have vectors that are close to each other in vector space.

```text
Question Vector
       │
       │  similarity
       ▼
Document Vector
```

This is the foundation of semantic search.

---

# 🔎 Semantic Search

The system does not rely only on exact keyword matching.

Instead, it searches for text that is **semantically similar** to the user's question.

### Example

**Question:**

```text
How does AI learn from data?
```

**Document text:**

```text
Machine learning algorithms improve their
performance by learning from training data.
```

Even though the exact wording is different, the meanings are closely related.

Semantic search can therefore retrieve the relevant information.

---

# 🗄️ ChromaDB

**ChromaDB** is used as the vector database.

It stores the processed document information and its vector representations.

Conceptually:

```text
Document Chunk
      +
Embedding
      +
Metadata
      ↓
   ChromaDB
```

When the user asks a question, the question is converted into an embedding and compared against the stored vectors.

The most relevant chunks are retrieved.

---

# 🔗 Retrieval-Augmented Generation

## What is RAG?

**RAG = Retrieval-Augmented Generation**

RAG combines two major processes:

### Retrieval

Find relevant information from the knowledge base.

```text
Question
   ↓
Semantic Search
   ↓
Relevant Chunks
```

### Generation

Give the retrieved information to the LLM as context.

```text
Question
   +
Retrieved Context
        ↓
       LLM
        ↓
    Final Answer
```

Therefore:

```text
RAG
=
Retrieval
+
Context Augmentation
+
Generation
```

---

# ✍️ Prompt Engineering

Prompt Engineering means designing effective instructions for the LLM so that it produces the desired response.

This project demonstrates three prompting techniques.

## 1. 0️⃣ Zero-Shot Prompting

The model receives instructions without examples.

```text
Answer the user's question using the provided context.
```

---

## 2. 🎯 Few-Shot Prompting

The model receives a few examples before answering the new question.

```text
Example 1:
Question → Answer

Example 2:
Question → Answer

New Question:
Question → ?
```

The examples guide the model toward the desired response pattern.

---

## 3. 👨‍💻 Role-Based Prompting

The LLM is assigned a specific role.

```text
You are a technical document analyst.

Answer the user's question using
the provided document context.
```

The three approaches can be evaluated using:

```text
Accuracy
Clarity
Relevance
```

---

# 🔄 Complete RAG Architecture

```text
                 📄 DOCUMENTS
                       │
                       ▼
              ┌─────────────────┐
              │ Text Extraction │
              └────────┬────────┘
                       │
                       ▼
                  ✂️ Chunking
                       │
                       ▼
               🧠 Embeddings
                       │
                       ▼
                 📐 Vectors
                       │
                       ▼
                 🗄️ ChromaDB
                       │
                       │
                       ▼
              ❓ USER QUESTION
                       │
                       ▼
             🧠 Question Embedding
                       │
                       ▼
              🔎 Semantic Search
                       │
                       ▼
              ⭐ Top Relevant Chunks
                       │
                       ▼
             ✍️ Prompt + Context
                       │
                       ▼
                     🤖 LLM
                       │
                       ▼
                💬 FINAL ANSWER
```

---

# 🆚 RAG vs Fine-Tuning

RAG and fine-tuning are different approaches.

| RAG                                     | Fine-Tuning                         |
| --------------------------------------- | ----------------------------------- |
| Retrieves external information          | Trains/adapts the model             |
| Uses a knowledge base                   | Uses a training dataset             |
| Knowledge can be updated easily         | New training may be required        |
| Model weights normally remain unchanged | Model parameters are updated        |
| Excellent for document QA               | Useful for behavior/task adaptation |

### In this project

We use **RAG instead of fine-tuning** because the main goal is to answer questions using information retrieved from the document knowledge base.

---

# 📊 Semantic Search vs Keyword Search

| Keyword Search                          | Semantic Search               |
| --------------------------------------- | ----------------------------- |
| Matches words                           | Matches meaning               |
| Exact terms are important               | Related wording can work      |
| Can miss differently worded information | Better for conceptual queries |
| Traditional search approach             | Embedding-based approach      |

---

# 🛠️ Technology Stack

### Backend

* Python
* FastAPI

### AI / NLP

* Sentence Transformers
* Embeddings
* Vector Representations
* Semantic Search
* Retrieval-Augmented Generation
* Prompt Engineering
* LLM

### Vector Database

* ChromaDB

### Frontend

* HTML
* CSS
* JavaScript

---

# 📁 Project Structure

```text
AI-Document-QA/
│
├── app/
│   ├── main.py
│   ├── chunker.py
│   ├── config.py
│   ├── document_loader.py
│   ├── embeddings.py
│   ├── llm_service.py
│   ├── prompts.py
│   ├── rag_service.py
│   └── vector_store.py
│
├── data/
│   ├── 01_Artificial_Intelligence_Fundamentals.txt
│   ├── 02_Machine_Learning_Basics.txt
│   ├── 03_Embeddings_and_Semantic_Search.txt
│   ├── 04_Vector_Databases_and_ChromaDB.txt
│   ├── 05_RAG_and_Prompt_Engineering.txt
│   └── README.txt
│
├── static/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

# 🚀 Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/haniaeman2026-pixel/AI-Document-QA.git
cd AI-Document-QA
```

## 2. Create Virtual Environment

```bash
python -m venv venv
```

## 3. Activate Virtual Environment

### Windows PowerShell

```powershell
.\venv\Scripts\Activate.ps1
```

## 4. Install Dependencies

```bash
pip install -r requirements.txt
```

## 5. Configure Environment Variables

Create a `.env` file using `.env.example` as a reference.

Add the required API configuration.

> 🔐 Never upload real API keys or secrets to GitHub.

## 6. Run the Application

```bash
python -m uvicorn app.main:app --reload
```

Open:

```text
http://127.0.0.1:8000
```

---

# 🧪 Assignment Coverage

This project implements the main requirements of the AI Document Question Answering assignment.

### Part 1 — Prompt Engineering

```text
Zero-Shot
     ↓
Few-Shot
     ↓
Role-Based
     ↓
Same Questions
     ↓
Accuracy / Clarity / Relevance
     ↓
Comparison
```

### Part 2 — Embeddings & Semantic Search

```text
5+ Documents
     ↓
Chunking
     ↓
Sentence-Transformer
     ↓
Embeddings
     ↓
ChromaDB
     ↓
Question Embedding
     ↓
Semantic Search
     ↓
Top 3 Relevant Chunks
```

---

# 🎯 Learning Outcomes

This project demonstrates practical understanding of:

* 🧠 Embeddings
* 📐 Vectors
* ✂️ Text Chunking
* 🔎 Semantic Search
* 🗄️ Vector Databases
* 🟡 ChromaDB
* 🔗 RAG
* ✍️ Prompt Engineering
* 0️⃣ Zero-Shot Prompting
* 🎯 Few-Shot Prompting
* 👨‍💻 Role-Based Prompting
* 🤖 LLM Integration
* ⚡ FastAPI
* 🌐 AI Application Development

---

# 👩‍💻 Developer

<div align="center">

## Hania Eman

**AI & Data Science Student | ML Developer | Python Enthusiast**

Building practical AI applications with Python, Machine Learning, NLP and Generative AI.

<br>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=3000&pause=900&color=D4AF37&center=true&vCenter=true&width=650&lines=Learning+Artificial+Intelligence;Building+with+Python;Exploring+Machine+Learning;Creating+Intelligent+Applications" />

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:111111,50:D4AF37,100:111111&height=140&section=footer&animation=fadeIn" width="100%"/>

### ✨ AI Document QA

**Retrieve • Understand • Generate**

*Built with Python, RAG, Embeddings, ChromaDB & LLMs.*

</div>
