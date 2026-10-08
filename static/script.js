/* =========================================================
   DOCUMIND
   Frontend Controller
========================================================= */

const state = {
    documents: [],
    selectedFiles: [],
    indexStats: {},
    health: {}
};


/* =========================================================
   DOM HELPERS
========================================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);


function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   TOAST
========================================================= */

function showToast(message, type = "success") {

    const container = $("#toast-container");

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3500);
}


/* =========================================================
   NAVIGATION
========================================================= */

const pageTitles = {
    dashboard: "Knowledge Workspace",
    documents: "Document Library",
    ask: "Ask Your Documents",
    "prompt-lab": "Prompt Comparison Lab",
    system: "System Information"
};


function navigateTo(pageName) {

    $$(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    const page = $(`#page-${pageName}`);

    if (page) {
        page.classList.add("active-page");
    }

    $$(".nav-item").forEach(item => {
        item.classList.remove("active");

        if (item.dataset.page === pageName) {
            item.classList.add("active");
        }
    });

    $("#page-title").textContent = pageTitles[pageName] || "AI Document QA";

    $("#breadcrumb-page").textContent =
        pageName === "prompt-lab"
            ? "Prompt Lab"
            : pageTitles[pageName] || pageName;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    if (pageName === "documents") {
        renderDocuments();
    }
}


$$(".nav-item").forEach(button => {

    button.addEventListener("click", () => {

        navigateTo(button.dataset.page);

    });

});


$$("[data-page-target]").forEach(button => {

    button.addEventListener("click", () => {

        navigateTo(button.dataset.pageTarget);

    });

});


/* =========================================================
   UPLOAD MODAL
========================================================= */

const modal = $("#upload-modal");
const fileInput = $("#file-input");
const dropZone = $("#drop-zone");


function openUploadModal() {

    modal.classList.add("show");

}


function closeUploadModal() {

    modal.classList.remove("show");

}


$("#open-upload").addEventListener("click", openUploadModal);

$("#dashboard-upload").addEventListener("click", openUploadModal);

$("#documents-upload").addEventListener("click", openUploadModal);

$("#empty-upload").addEventListener("click", openUploadModal);

$("#close-upload").addEventListener("click", closeUploadModal);

$("#cancel-upload").addEventListener("click", closeUploadModal);


modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        closeUploadModal();
    }

});


dropZone.addEventListener("click", () => {

    fileInput.click();

});


fileInput.addEventListener("change", () => {

    addFiles([...fileInput.files]);

});


dropZone.addEventListener("dragover", (event) => {

    event.preventDefault();

    dropZone.classList.add("dragover");

});


dropZone.addEventListener("dragleave", () => {

    dropZone.classList.remove("dragover");

});


dropZone.addEventListener("drop", (event) => {

    event.preventDefault();

    dropZone.classList.remove("dragover");

    addFiles([...event.dataTransfer.files]);

});


function addFiles(files) {

    const allowed = [".pdf", ".txt", ".md"];

    files.forEach(file => {

        const extension =
            "." + file.name.split(".").pop().toLowerCase();

        if (!allowed.includes(extension)) {

            showToast(
                `${file.name}: unsupported file type.`,
                "error"
            );

            return;
        }

        if (file.size > 15 * 1024 * 1024) {

            showToast(
                `${file.name}: file is larger than 15 MB.`,
                "error"
            );

            return;
        }

        const exists = state.selectedFiles.some(
            item => item.name === file.name
        );

        if (!exists) {
            state.selectedFiles.push(file);
        }

    });

    renderSelectedFiles();

}


function renderSelectedFiles() {

    const container = $("#selected-files");

    container.innerHTML = "";

    state.selectedFiles.forEach((file, index) => {

        const item = document.createElement("div");

        item.className = "selected-file";

        item.innerHTML = `
            <span>▤ ${escapeHTML(file.name)}</span>
            <button data-index="${index}">×</button>
        `;

        item.querySelector("button").addEventListener(
            "click",
            () => {

                state.selectedFiles.splice(index, 1);

                renderSelectedFiles();

            }
        );

        container.appendChild(item);

    });

}


/* =========================================================
   UPLOAD
========================================================= */

$("#upload-button").addEventListener("click", uploadDocuments);


function uploadDocuments() {

    if (!state.selectedFiles.length) {

        showToast(
            "Please select at least one document.",
            "error"
        );

        return;
    }


    const formData = new FormData();

    state.selectedFiles.forEach(file => {

        formData.append("files", file);

    });


    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/upload");


    $("#upload-progress").classList.add("show");

    $("#upload-button").disabled = true;

    $("#cancel-upload").disabled = true;


    xhr.upload.addEventListener("progress", event => {

        if (event.lengthComputable) {

            const percent =
                Math.round((event.loaded / event.total) * 100);

            $("#progress-bar").style.width = `${percent}%`;

            $("#progress-percent").textContent =
                `${percent}%`;

            $("#progress-text").textContent =
                "Uploading documents...";

        }

    });


    xhr.onload = async () => {

        $("#upload-button").disabled = false;

        $("#cancel-upload").disabled = false;


        if (xhr.status >= 200 && xhr.status < 300) {

            $("#progress-bar").style.width = "100%";

            $("#progress-percent").textContent = "100%";

            $("#progress-text").textContent =
                "Upload complete. Indexing...";


            try {

                await indexDocuments();

                showToast(
                    "Documents uploaded and indexed successfully."
                );

                state.selectedFiles = [];

                renderSelectedFiles();

                closeUploadModal();

                await loadDocuments();

                navigateTo("documents");

            } catch (error) {

                showToast(
                    error.message || "Indexing failed.",
                    "error"
                );

            }

        } else {

            let message = "Upload failed.";

            try {

                const data = JSON.parse(xhr.responseText);

                message =
                    data.detail ||
                    data.message ||
                    message;

            } catch (_) {}

            showToast(message, "error");

        }


        setTimeout(() => {

            $("#upload-progress").classList.remove("show");

            $("#progress-bar").style.width = "0%";

        }, 700);

    };


    xhr.onerror = () => {

        $("#upload-button").disabled = false;

        $("#cancel-upload").disabled = false;

        showToast(
            "Could not connect to the API.",
            "error"
        );

    };


    xhr.send(formData);

}


/* =========================================================
   INDEX
========================================================= */

async function indexDocuments() {

    const response = await fetch("/api/index", {
        method: "POST"
    });


    if (!response.ok) {

        const data = await response.json()
            .catch(() => ({}));

        throw new Error(
            data.detail ||
            data.message ||
            "Document indexing failed."
        );

    }


    const data = await response.json();

    state.indexStats = data || {};

    return data;

}


/* =========================================================
   DOCUMENTS
========================================================= */

async function loadDocuments() {

    try {

        const response =
            await fetch("/api/documents");

        if (!response.ok) {
            throw new Error("Failed to load documents.");
        }

        const data = await response.json();


        if (Array.isArray(data)) {

            state.documents = data;

        } else if (Array.isArray(data.documents)) {

            state.documents = data.documents;

        } else {

            state.documents = [];

        }


        updateDashboardStats();

        renderDocuments();

        renderRecentDocuments();

    } catch (error) {

        console.error(error);

        showToast(
            "Could not load document list.",
            "error"
        );

    }

}


function normalizeDocument(doc) {

    if (typeof doc === "string") {

        return {
            filename: doc
        };

    }

    return {
        filename:
            doc.filename ||
            doc.name ||
            doc.source ||
            "Unknown document",

        chunks:
            doc.chunks ||
            doc.chunk_count ||
            null,

        status:
            doc.status ||
            "Indexed"
    };

}


function renderDocuments() {

    const container = $("#document-list");

    const search =
        ($("#document-search")?.value || "")
            .toLowerCase()
            .trim();

    const filter =
        $("#document-filter")?.value || "all";


    const normalized =
        state.documents.map(normalizeDocument);


    const filtered = normalized.filter(doc => {

        const filename =
            doc.filename.toLowerCase();

        const extension =
            filename.includes(".")
                ? filename.split(".").pop()
                : "";


        const searchMatch =
            !search ||
            filename.includes(search);


        const filterMatch =
            filter === "all" ||
            extension === filter;


        return searchMatch && filterMatch;

    });


    if (!filtered.length) {

        container.innerHTML = `
            <div class="table-empty">
                <div class="empty-icon">▤</div>
                <h3>No documents found</h3>
                <p>
                    Upload PDF, TXT or Markdown documents to begin.
                </p>
                <button class="primary-btn" id="empty-upload-inline">
                    Upload Documents
                </button>
            </div>
        `;


        $("#empty-upload-inline")
            ?.addEventListener(
                "click",
                openUploadModal
            );

        return;
    }


    container.innerHTML = filtered.map(doc => {

        const extension =
            doc.filename.includes(".")
                ? doc.filename.split(".").pop().toUpperCase()
                : "FILE";


        return `
            <div class="document-row">

                <div class="document-name">

                    <div class="file-icon">
                        ${escapeHTML(extension.substring(0, 3))}
                    </div>

                    <div>
                        <strong>
                            ${escapeHTML(doc.filename)}
                        </strong>

                        <small>
                            Ready for semantic search
                        </small>
                    </div>

                </div>

                <div class="file-type">
                    ${escapeHTML(extension)}
                </div>

                <div>
                    <span class="indexed-badge">
                        ${escapeHTML(doc.status)}
                    </span>
                </div>

                <div>
                    <button
                        class="delete-btn"
                        data-file="${encodeURIComponent(doc.filename)}"
                        title="Delete document"
                    >
                        ×
                    </button>
                </div>

            </div>
        `;

    }).join("");


    $$(".delete-btn").forEach(button => {

        button.addEventListener(
            "click",
            () => deleteDocument(
                decodeURIComponent(button.dataset.file)
            )
        );

    });

}


async function deleteDocument(filename) {

    const confirmed =
        window.confirm(
            `Delete "${filename}" from the knowledge base?`
        );

    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/documents/${encodeURIComponent(filename)}`,
                {
                    method: "DELETE"
                }
            );


        if (!response.ok) {

            const data =
                await response.json()
                    .catch(() => ({}));

            throw new Error(
                data.detail ||
                "Could not delete document."
            );

        }


        showToast("Document deleted.");

        await loadDocuments();

    } catch (error) {

        showToast(
            error.message,
            "error"
        );

    }

}


$("#document-search")
    .addEventListener(
        "input",
        renderDocuments
    );


$("#document-filter")
    .addEventListener(
        "change",
        renderDocuments
    );


$("#refresh-documents")
    .addEventListener(
        "click",
        async () => {

            await loadDocuments();

            showToast("Document list refreshed.");

        }
    );


/* =========================================================
   RECENT DOCUMENTS
========================================================= */

function renderRecentDocuments() {

    const container =
        $("#recent-documents");


    if (!state.documents.length) {

        container.innerHTML = `
            <div class="empty-state small">
                <div class="empty-icon">▤</div>
                <p>No documents indexed yet.</p>
                <button class="outline-btn" id="dashboard-upload-2">
                    Upload Document
                </button>
            </div>
        `;


        $("#dashboard-upload-2")
            ?.addEventListener(
                "click",
                openUploadModal
            );

        return;
    }


    const docs =
        state.documents
            .map(normalizeDocument)
            .slice(0, 5);


    container.innerHTML =
        docs.map(doc => {

            const extension =
                doc.filename.includes(".")
                    ? doc.filename.split(".").pop().toUpperCase()
                    : "FILE";


            return `
                <div class="recent-document">

                    <div class="file-icon">
                        ${escapeHTML(extension.substring(0, 3))}
                    </div>

                    <div class="recent-document-info">

                        <strong>
                            ${escapeHTML(doc.filename)}
                        </strong>

                        <span>
                            Semantic search enabled
                        </span>

                    </div>

                    <span class="indexed-badge">
                        Indexed
                    </span>

                </div>
            `;

        }).join("");

}


/* =========================================================
   DASHBOARD STATS
========================================================= */

function updateDashboardStats() {

    $("#stat-documents").textContent =
        state.documents.length;


    const chunkCount =
        state.indexStats.chunks_indexed ||
        state.indexStats.total_chunks ||
        state.indexStats.chunks ||
        null;


    $("#stat-chunks").textContent =
        chunkCount !== null
            ? chunkCount
            : "—";

}


/* =========================================================
   HEALTH
========================================================= */

async function loadHealth() {

    try {

        const response =
            await fetch("/api/health");


        if (!response.ok) {
            throw new Error("Health request failed.");
        }


        const data =
            await response.json();


        state.health = data || {};


        const model =
            data.model ||
            data.groq_model ||
            data.llm_model ||
            "openai/gpt-oss-20b";


        $("#system-model").textContent =
            model;


        $("#stat-embedding").textContent =
            "MiniLM";


        $("#health-api").textContent =
            "Online";


        $("#health-text").textContent =
            "Healthy";


    } catch (error) {

        $("#health-api").textContent =
            "Unavailable";

        $("#health-text").textContent =
            "Check API";

    }

}


/* =========================================================
   ASK AI
========================================================= */

$("#ask-button")
    .addEventListener(
        "click",
        askQuestion
    );


$("#question-input")
    .addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                askQuestion();

            }

        }
    );


async function askQuestion() {

    const input =
        $("#question-input");


    const question =
        input.value.trim();


    if (!question) {

        showToast(
            "Please enter a question.",
            "error"
        );

        return;
    }


    const technique =
        $("#technique").value;


    addUserMessage(question);

    input.value = "";


    const loadingId =
        addLoadingMessage();


    $("#ask-button").disabled = true;


    try {

        const response =
            await fetch(
                "/api/ask",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        question,
                        technique
                    })
                }
            );


        const data =
            await response.json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                data.detail ||
                data.message ||
                "AI request failed."
            );

        }


        removeMessage(loadingId);


        const answer =
            data.answer ||
            data.response ||
            data.result ||
            "No answer was returned.";


        addAIMessage(answer);


        const chunks =
            data.retrieved_chunks ||
            data.chunks ||
            data.sources ||
            data.context ||
            [];


        renderSources(chunks);


    } catch (error) {

        removeMessage(loadingId);

        addAIMessage(
            `Sorry, I could not process the question.\n\n${error.message}`
        );

        showToast(
            error.message,
            "error"
        );

    } finally {

        $("#ask-button").disabled = false;

    }

}


function addUserMessage(text) {

    const container =
        $("#chat-messages");


    removeWelcome();


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "message user";


    wrapper.innerHTML = `
        <div class="message-content">
            ${escapeHTML(text)}
        </div>
    `;


    container.appendChild(wrapper);

    scrollChat();

}


function addAIMessage(text) {

    const container =
        $("#chat-messages");


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "message ai";


    wrapper.innerHTML = `
        <div class="message-label">
            DOCUMENT AI
        </div>

        <div class="message-content">
            ${formatAnswer(text)}
        </div>
    `;


    container.appendChild(wrapper);

    scrollChat();

}


function formatAnswer(text) {

    return escapeHTML(text)
        .replace(/\n\n/g, "<br><br>")
        .replace(/\n/g, "<br>");

}


function addLoadingMessage() {

    const container =
        $("#chat-messages");


    const id =
        "loading-" +
        Date.now();


    const wrapper =
        document.createElement("div");


    wrapper.className =
        "message ai";


    wrapper.id = id;


    wrapper.innerHTML = `
        <div class="message-label">
            DOCUMENT AI
        </div>

        <div class="message-content">

            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>

        </div>
    `;


    container.appendChild(wrapper);

    scrollChat();


    return id;

}


function removeMessage(id) {

    document.getElementById(id)?.remove();

}


function removeWelcome() {

    $(".welcome-message")?.remove();

}


function scrollChat() {

    const container =
        $("#chat-messages");

    container.scrollTop =
        container.scrollHeight;

}


/* =========================================================
   SUGGESTIONS
========================================================= */

$$(".suggestion").forEach(button => {

    button.addEventListener(
        "click",
        () => {

            $("#question-input").value =
                button.textContent.trim();

            $("#question-input").focus();

        }
    );

});


/* =========================================================
   SOURCES
========================================================= */

function renderSources(chunks) {

    const container =
        $("#sources-list");


    if (!Array.isArray(chunks)) {

        chunks = [];

    }


    $("#source-count").textContent =
        chunks.length;


    if (!chunks.length) {

        container.innerHTML = `
            <div class="source-empty">

                <div>◈</div>

                <p>
                    No retrieved source chunks were returned
                    for this answer.
                </p>

            </div>
        `;

        return;
    }


    container.innerHTML =
        chunks.slice(0, 3).map((chunk, index) => {

            const source =
                chunk.source ||
                chunk.filename ||
                chunk.file ||
                "Unknown document";


            const page =
                chunk.page ||
                chunk.page_number ||
                "—";


            const similarity =
                chunk.similarity !== undefined
                    ? Number(chunk.similarity)
                    : null;


            const distance =
                chunk.distance !== undefined
                    ? Number(chunk.distance)
                    : null;


            const score =
                similarity !== null
                    ? `${(similarity * 100).toFixed(1)}%`
                    : "Retrieved";


            const text =
                chunk.text ||
                chunk.content ||
                chunk.chunk ||
                "No preview available.";


            return `
                <div class="source-card">

                    <div class="source-top">

                        <div class="source-file">
                            <span>▤</span>
                            ${escapeHTML(source)}
                        </div>

                        <span class="source-score">
                            ${score}
                        </span>

                    </div>

                    <div class="source-meta">

                        <span>
                            Source ${index + 1}
                        </span>

                        <span>
                            Page ${escapeHTML(page)}
                        </span>

                        ${
                            distance !== null
                            ? `<span>
                                Distance ${distance.toFixed(3)}
                               </span>`
                            : ""
                        }

                    </div>

                    <div class="source-text">
                        ${escapeHTML(text)}
                    </div>

                </div>
            `;

        }).join("");

}


/* =========================================================
   CLEAR CHAT
========================================================= */

$("#clear-chat")
    .addEventListener(
        "click",
        () => {

            $("#chat-messages").innerHTML = `
                <div class="welcome-message">

                    <div class="welcome-icon">✦</div>

                    <h3>What would you like to know?</h3>

                    <p>
                        Ask a question about any information
                        contained in your indexed documents.
                    </p>

                    <div class="suggestion-list">

                        <button class="suggestion">
                            Summarize the main topic of the document
                        </button>

                        <button class="suggestion">
                            What are the key findings?
                        </button>

                        <button class="suggestion">
                            Explain the important concepts
                        </button>

                    </div>

                </div>
            `;


            $$(".suggestion").forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        $("#question-input").value =
                            button.textContent.trim();

                        $("#question-input").focus();

                    }
                );

            });


            renderSources([]);

        }
    );


/* =========================================================
   PROMPT COMPARISON
========================================================= */

$("#compare-button")
    .addEventListener(
        "click",
        comparePrompts
    );


async function comparePrompts() {

    const question =
        $("#compare-question")
            .value
            .trim();


    if (!question) {

        showToast(
            "Enter a question first.",
            "error"
        );

        return;
    }


    const button =
        $("#compare-button");


    button.disabled = true;

    button.textContent =
        "Comparing...";


    setComparisonLoading();


    try {

        const response =
            await fetch(
                "/api/compare-prompts",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        question
                    })
                }
            );


        const data =
            await response.json()
                .catch(() => ({}));


        if (!response.ok) {

            throw new Error(
                data.detail ||
                data.message ||
                "Prompt comparison failed."
            );

        }

setComparisonResult(
    "zero-shot-result",
    findComparisonResult(
        data,
        "zero-shot"
    )
);

setComparisonResult(
    "few-shot-result",
    findComparisonResult(
        data,
        "few-shot"
    )
);

setComparisonResult(
    "role-based-result",
    findComparisonResult(
        data,
        "role-based"
    )
);



        showToast(
            "Prompt comparison completed."
        );


    } catch (error) {

        setComparisonResult(
            "zero-shot-result",
            "Comparison failed: " + error.message
        );

        setComparisonResult(
            "few-shot-result",
            "Comparison failed: " + error.message
        );

        setComparisonResult(
            "role-based-result",
            "Comparison failed: " + error.message
        );


        showToast(
            error.message,
            "error"
        );

    } finally {

        button.disabled = false;

        button.innerHTML =
            `Compare <span>→</span>`;

    }

}
function findComparisonResult(data, type) {

    // API response ke andar results object hota hai
    const results =
        data?.results && typeof data.results === "object"
            ? data.results
            : data || {};

    // Technique name ko normalize karo
    const normalizedType = String(type)
        .toLowerCase()
        .replace(/[_\s]/g, "-");

    const keys = Object.keys(results);

    // Correct technique key find karo
    const key = keys.find(rawKey => {

        const normalizedKey = String(rawKey)
            .toLowerCase()
            .replace(/[_\s]/g, "-");

        return (
            normalizedKey === normalizedType ||
            normalizedKey.includes(normalizedType)
        );

    });

    // Result nahi mila
    if (!key) {
        return "No response returned for this technique.";
    }

    const value = results[key];

    // Normal string response
    if (typeof value === "string") {
        return value.trim() || "No response returned for this technique.";
    }

    // Agar response object ki form mein aaye
    if (value && typeof value === "object") {
        return (
            value.answer ||
            value.response ||
            value.result ||
            value.text ||
            JSON.stringify(value, null, 2)
        );
    }

    return value !== null && value !== undefined
        ? String(value)
        : "No response returned for this technique.";
}

/* =========================================================
   INITIALIZATION
========================================================= */

async function initializeApp() {

    await Promise.all([
        loadDocuments(),
        loadHealth()
    ]);

    updateDashboardStats();

}


initializeApp();