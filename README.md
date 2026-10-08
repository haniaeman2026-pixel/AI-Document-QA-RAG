
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:E8D8C3,50:B89B7A,100:8B6F55&height=220&section=header&text=AI%20Document%20QA&fontSize=48&fontColor=3E3025&animation=fadeIn&fontAlignY=38&desc=Intelligent%20Document%20Question%20Answering%20System&descAlignY=60&descSize=18" width="100%"/>
</p>

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Georgia&size=22&duration=3000&pause=1000&color=8B6F55&center=true&vCenter=true&width=650&lines=AI-Powered+Document+Question+Answering;RAG+%7C+Embeddings+%7C+ChromaDB;Semantic+Search+%7C+Prompt+Engineering" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-B89B7A?style=for-the-badge&logo=python&logoColor=white"/>
  <img src="https://img.shields.io/badge/FastAPI-8B6F55?style=for-the-badge&logo=fastapi&logoColor=white"/>
  <img src="https://img.shields.io/badge/RAG-A68A6D?style=for-the-badge&logoColor=white"/>
  <img src="https://img.shields.io/badge/ChromaDB-C8B39D?style=for-the-badge&logoColor=3E3025"/>
  <img src="https://img.shields.io/badge/LLM-9C8063?style=for-the-badge&logoColor=white"/>
</p>

---

## 🤎 About The Project

**AI Document QA** is an AI-powered document question-answering system built using **Retrieval-Augmented Generation (RAG)**.

The system allows users to work with documents, retrieve the most relevant information using **semantic search**, and generate context-aware answers using an LLM.

Instead of relying only on the model's internal knowledge, the system retrieves relevant document content first and uses that content to generate grounded answers.

---

## ✨ Key Features

* 📄 Document loading and processing
* ✂️ Intelligent text chunking
* 🧠 Sentence-transformer embeddings
* 🔢 Vector representation of text
* 🔎 Semantic similarity search
* 🗄️ ChromaDB vector database
* 📌 Top-3 relevant chunk retrieval
* 🤖 LLM-powered answers
* 🎯 Zero-shot prompting
* 🧪 Few-shot prompting
* 👨‍💻 Role-based prompting
* 🌐 FastAPI backend
* 💻 Clean web interface

---

## 🧠 How The AI Pipeline Works

```text
Documents
    ↓
Document Loading
    ↓
Text Chunking
    ↓
Embeddings
    ↓
Vectors
    ↓
ChromaDB
    ↓
Semantic Search
    ↓
Top 3 Relevant Chunks
    ↓
Prompt + Retrieved Context
    ↓
LLM
    ↓
Final Answer
```

---

## 🔢 Embeddings

An **embedding** converts text into a numerical representation that captures its meaning.

For example:

```text
"Machine learning is a branch of AI"
                ↓
        Embedding Model
                ↓
       [0.21, -0.43, 0.87, ...]
```

Texts with similar meanings produce vectors that are close to each other in vector space.

---

## 📐 Vectors

A **vector** is the numerical representation produced by an embedding model.

The vector allows the system to mathematically compare the semantic similarity between pieces of text.

---

## 🔎 Semantic Search

Instead of searching only for exact keywords, semantic search compares the **meaning** of the user's question with the meaning of stored document chunks.

```text
User Question
      ↓
Question Embedding
      ↓
Similarity Comparison
      ↓
Most Relevant Chunks
```

The system retrieves the **top 3 semantically similar chunks**.

---

## 🗄️ ChromaDB

**ChromaDB** acts as the vector database.

It stores:

* Document chunks
* Embeddings
* Metadata

It allows the system to quickly search for vectors that are most similar to the user's question.

---

## 🤖 Retrieval-Augmented Generation

RAG stands for **Retrieval-Augmented Generation**.

It combines:

**Retrieval + Generation**

```text
Question
   ↓
Retrieve Relevant Information
   ↓
Add Context to Prompt
   ↓
LLM
   ↓
Grounded Answer
```

This helps the model answer questions using the information contained in the documents.

---

## ✍️ Prompt Engineering

Prompt engineering means designing effective instructions for an LLM.

This project implements three prompting approaches.

### 1. Zero-Shot Prompting

The model receives instructions without examples.

```text
Answer the question using the provided context.
```

### 2. Few-Shot Prompting

The model receives **2–3 examples** before answering the actual question.

```text
Example 1
Question → Answer

Example 2
Question → Answer

Now answer the user's question.
```

### 3. Role-Based Prompting

The model is given a specific role.

```text
You are a Technical Document Analyst.
Analyze the provided context and answer accurately.
```

---

## 🧩 Complete RAG Architecture

```text
             DOCUMENTS
                 │
                 ▼
        ┌─────────────────┐
        │ Document Loader │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    Chunking     │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │   Embeddings    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │    ChromaDB     │
        └────────┬────────┘
                 │
                 │ Semantic Search
                 ▼
        ┌─────────────────┐
        │ Top 3 Chunks    │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │ Prompt Template │
        └────────┬────────┘
                 │
                 ▼
        ┌─────────────────┐
        │      LLM        │
        └────────┬────────┘
                 │
                 ▼
              ANSWER
```

---

## 🆚 RAG vs Fine-Tuning

| RAG                             | Fine-Tuning                           |
| ------------------------------- | ------------------------------------- |
| Retrieves external information  | Trains/adapts model parameters        |
| Knowledge can be updated easily | Updating requires additional training |
| Uses vector database            | Uses training dataset                 |
| Good for document QA            | Good for behavior/task adaptation     |
| Model weights usually unchanged | Model parameters are modified         |

---

## 🔍 Semantic Search vs Keyword Search

| Keyword Search           | Semantic Search          |
| ------------------------ | ------------------------ |
| Matches exact words      | Matches meaning          |
| Lexical matching         | Vector similarity        |
| Can miss related wording | Handles related concepts |
| Traditional search       | AI-powered retrieval     |

---

## 🛠️ Technology Stack

* **Python**
* **FastAPI**
* **Sentence Transformers**
* **ChromaDB**
* **LLM**
* **RAG**
* **HTML**
* **CSS**
* **JavaScript**

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

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/haniaeman2026-pixel/AI-Document-QA.git
cd AI-Document-QA
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Environment

```powershell
.\venv\Scripts\Activate.ps1
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Run the Application

```bash
python -m uvicorn app.main:app --reload
```

### 6. Open in Browser

```text
http://127.0.0.1:8000
```

---

## ✅ Assignment Coverage

| Requirement          | Implementation |
| -------------------- | -------------- |
| Prompt Engineering   | ✅              |
| Zero-Shot            | ✅              |
| Few-Shot             | ✅              |
| Role-Based Prompting | ✅              |
| Prompt Comparison    | ✅              |
| Document Loading     | ✅              |
| Text Chunking        | ✅              |
| Sentence Embeddings  | ✅              |
| Vector Database      | ✅ ChromaDB     |
| Semantic Search      | ✅              |
| Top 3 Retrieval      | ✅              |
| Similarity Search    | ✅              |
| RAG                  | ✅              |
| LLM Generation       | ✅              |

---

## 🎓 Learning Outcomes

Through this project, I learned how to build a practical AI document assistant using:

* Prompt Engineering
* Embeddings
* Vector Representations
* Semantic Search
* Vector Databases
* ChromaDB
* Retrieval-Augmented Generation
* LLM Integration
* FastAPI

---

## 👩‍💻 Developer

**Hania Eman**

**AI & Data Science Student | ML Developer | Python Enthusiast**

---

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Georgia&size=20&duration=3000&pause=1000&color=8B6F55&center=true&vCenter=true&width=520&lines=Developed+by+Hania+Eman+%E2%9C%A8;AI+%26+Data+Science+Student;ML+Developer+%7C+Python+Enthusiast" />
</p>

<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:8B6F55,50:B89B7A,100:E8D8C3&height=130&section=footer&text=AI%20Document%20QA%20%E2%80%94%20Retrieve%20%E2%80%A2%20Understand%20%E2%80%A2%20Generate&fontSize=22&fontColor=3E3025&animation=fadeIn" width="100%"/>
</p>
