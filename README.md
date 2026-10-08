<div align="center">

# ✨ AI Document QA

### 🤖 Intelligent Document Question Answering with RAG

<p>
  <strong>Ask questions. Retrieve relevant knowledge. Get context-aware AI answers.</strong>
</p>

<br>

<img src="https://img.shields.io/badge/Python-FFD700?style=for-the-badge&logo=python&logoColor=111111" />
<img src="https://img.shields.io/badge/FastAPI-FFD700?style=for-the-badge&logo=fastapi&logoColor=111111" />
<img src="https://img.shields.io/badge/RAG-FFD700?style=for-the-badge&logoColor=111111" />
<img src="https://img.shields.io/badge/ChromaDB-FFD700?style=for-the-badge&logoColor=111111" />
<img src="https://img.shields.io/badge/LLM-FFD700?style=for-the-badge&logoColor=111111" />

<br><br>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=22&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=700&lines=AI-Powered+Document+Assistant;Retrieval-Augmented+Generation;Semantic+Search+%7C+Embeddings+%7C+ChromaDB;Prompt+Engineering+%7C+Context-Aware+Answers" />

</div>

---

## 🌟 About The Project

**AI Document QA** is an AI-powered knowledge assistant that allows users to ask questions about their own documents.

Instead of sending an entire document to an LLM, the system:

**loads → chunks → embeds → stores → retrieves → generates**

the most relevant information before producing an answer.

The project demonstrates practical implementation of:

* 🧠 Embeddings
* 📐 Vector representations
* 🔎 Semantic Search
* 🗄️ ChromaDB
* 🔗 Retrieval-Augmented Generation (RAG)
* ✍️ Prompt Engineering
* 🤖 LLM-based Question Answering

---

## ⚡ How It Works

```text
                    📄 DOCUMENTS
                         │
                         ▼
                ┌─────────────────┐
                │  Text Extraction │
                └────────┬────────┘
                         │
                         ▼
                   ✂️ Chunking
                         │
                         ▼
                  🧠 Embeddings
                         │
                         ▼
                📐 Vector Representations
                         │
                         ▼
                  🗄️ ChromaDB
                         │
                         │
              ┌──────────┘
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

## 🧩 Core Concepts

### 🧠 Embeddings

Embeddings convert text into numerical representations that capture its semantic meaning.

For example:

```text
"What is RAG?"
       ↓
Embedding Model
       ↓
[0.21, -0.45, 0.78, ...]
```

These numerical representations allow the system to compare the meaning of different pieces of text.

---

### 📐 Vectors

A vector is the numerical representation produced from text through an embedding model.

Similar meanings produce vectors that are closer in vector space.

```text
Document Chunk → Vector
Question       → Vector
                   ↓
             Similarity Search
```

---

### 🔎 Semantic Search

Instead of looking only for exact keywords, semantic search finds information based on **meaning**.

For example:

```text
Question:
"How does AI learn from information?"

Document:
"Machine learning algorithms improve
their performance using training data."
```

The wording is different, but the meaning is related.

That is why semantic search can retrieve the relevant chunk.

---

### 🗄️ ChromaDB

**ChromaDB** is used as the vector database.

It stores:

```text
Text Chunk
    +
Embedding
    +
Metadata
```

When a user asks a question, ChromaDB helps retrieve the most semantically relevant chunks.

---

### 🔗 RAG — Retrieval-Augmented Generation

RAG combines **retrieval** with **generation**.

```text
Question
   ↓
Retrieve relevant information
   ↓
Add retrieved information as context
   ↓
Send context + question to LLM
   ↓
Generate grounded answer
```

This helps the LLM answer using the information retrieved from the document knowledge base.

---

## ✍️ Prompt Engineering

The project demonstrates multiple prompting approaches.

### 1. Zero-Shot Prompting

The model receives instructions without examples.

```text
Answer the question using the provided context.
```

### 2. Few-Shot Prompting

The model receives a small number of examples before answering.

```text
Example 1 → Question + Answer
Example 2 → Question + Answer

New Question → Answer
```

### 3. Role-Based Prompting

The model is assigned a specific role.

```text
You are a technical document analyst.
Answer the user's question using the provided context.
```

These approaches can be compared using:

* Accuracy
* Clarity
* Relevance

---

## 📄 Supported Documents

The system is designed to work with:

```text
📕 PDF
📄 TXT
📝 Markdown
```

The documents are processed, divided into chunks and converted into embeddings before being stored in the vector database.

---

## ✨ Key Features

| Feature                   | Description                                      |
| ------------------------- | ------------------------------------------------ |
| 📄 Document Processing    | Process supported document formats               |
| ✂️ Text Chunking          | Break large documents into searchable chunks     |
| 🧠 Embeddings             | Convert text meaning into vectors                |
| 🔎 Semantic Search        | Retrieve meaningfully relevant information       |
| 🗄️ ChromaDB              | Store and search vector representations          |
| ⭐ Top-K Retrieval         | Retrieve the most relevant chunks                |
| 🤖 LLM Answers            | Generate context-aware responses                 |
| ✍️ Prompt Engineering     | Compare different prompting strategies           |
| 📊 Similarity Information | Display retrieved information and relevance data |
| 💻 Web Interface          | Interact with the system through a simple UI     |

---

## 🛠️ Technology Stack

### Backend

* 🐍 Python
* ⚡ FastAPI
* 🤖 LLM API

### AI / NLP

* 🧠 Sentence Transformers
* 🔢 Embeddings
* 🔎 Semantic Search
* 🔗 RAG
* ✍️ Prompt Engineering

### Vector Database

* 🗄️ ChromaDB

### Frontend

* 🌐 HTML
* 🎨 CSS
* ⚡ JavaScript

---

## 📁 Project Structure

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

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/haniaeman2026-pixel/AI-Document-QA.git
```

```bash
cd AI-Document-QA
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
```

### 3. Activate the Virtual Environment

**Windows PowerShell:**

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Configure Environment Variables

Create a `.env` file based on:

```text
.env.example
```

Add the required API configuration.

> 🔐 Never commit your real API keys to GitHub.

### 6. Run the Application

```bash
python -m uvicorn app.main:app --reload
```

Then open:

```text
http://127.0.0.1:8000
```

---

## 🧪 Assignment Implementation

This project covers two major areas.

### Part 1 — Prompt Engineering

Three prompting techniques are implemented:

```text
Zero-Shot
Few-Shot
Role-Based
```

The same set of questions can be tested against all three approaches and evaluated using:

**Accuracy → Clarity → Relevance**

### Part 2 — Embeddings & Semantic Search

The retrieval pipeline includes:

```text
5+ Documents
      ↓
Text Chunking
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

## 🆚 RAG vs Fine-Tuning

RAG and fine-tuning solve different problems.

| RAG                                     | Fine-Tuning                         |
| --------------------------------------- | ----------------------------------- |
| Retrieves external knowledge            | Trains/adapts the model             |
| Uses a knowledge base                   | Uses a training dataset             |
| Model weights normally remain unchanged | Model parameters are updated        |
| Easy to update document knowledge       | Requires additional training        |
| Excellent for document-based QA         | Useful for behavior/task adaptation |

### In this project

We use **RAG**, not fine-tuning, to provide the LLM with relevant information from the document knowledge base at query time.

---

## 🎯 Why This Project Matters

Traditional document search often depends on exact keywords.

This system goes further by understanding the **semantic relationship** between a question and document content.

The result is a more intelligent workflow:

```text
Traditional Search
      ↓
Find matching words

AI Document QA
      ↓
Understand meaning
      ↓
Retrieve relevant knowledge
      ↓
Generate contextual answer
```

---

## 📌 Learning Outcomes

By building this project, the following concepts are demonstrated:

* ✅ Vector representations
* ✅ Text embeddings
* ✅ Document chunking
* ✅ Semantic similarity
* ✅ Vector databases
* ✅ ChromaDB
* ✅ Retrieval-Augmented Generation
* ✅ Prompt Engineering
* ✅ Zero-shot prompting
* ✅ Few-shot prompting
* ✅ Role-based prompting
* ✅ LLM-based question answering
* ✅ FastAPI backend development

---

## 👩‍💻 Developer

<div align="center">

### **Hania Eman**

**AI & Data Science Student | ML Developer | Python Enthusiast**

Built with curiosity, experimentation, and a passion for Artificial Intelligence. ✨

<br>

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=18&duration=3000&pause=1000&color=FFD700&center=true&vCenter=true&width=600&lines=Exploring+AI+%26+Data+Science;Building+with+Python;Learning+Machine+Learning;Creating+Intelligent+Applications" />

</div>

---

<div align="center">

### ✨ AI Document QA

**Retrieve • Understand • Generate**

<br>

⭐ **Built with Python, RAG, Embeddings, ChromaDB & LLMs** ⭐

</div>
