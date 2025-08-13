const form = document.getElementById("snippet-form");
const snippetList = document.getElementById("snippet-list");
const syncMsg = document.getElementById("Sync-message");

let snippets = [];

function renderSnippets(snippet, index) {
  const li = document.createElement("li");
  li.className = "card";

  li.innerHTML = `
    <h3>${snippet.title}(${snippet.language})</h3>
    <code>${snippet.code}</code>
    <button class="delete-btn">Delete</button>
  `;

  snippetList.appendChild(li);
}

function renderAllSnippets() {
  snippetList.innerHTML = "";
  snippets.forEach((snippet, index) =>renderSnippets(snippet, index));
}

// phase-2
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const language = document.getElementById("language").value.trim();
  const code = document.getElementById("code").value.trim();

  const newSnippet = {
    title,
    language,
    code,
    source: "local",
  };
  snippets.push(newSnippet);
  updateLocalStorage();
  renderAllSnippets();
  form.reset();

  syncMsg.style.display = "block";

  await fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newSnippet),
  });
  syncMsg.style.display = "none";
});

snippetList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.getAttribute("data-index");
    const snippet = snippets[index];

    snippets.splice(index, 1);
    updateLocalStorage();
    renderAllSnippets();

    if (snippet.source === "api") {
      await fetch("https://reqres.in/api/users/${index}", {
        method: "DELETE",
      });
    }
  }
});

function loadLocalSnippets() {
  const stored = localStorage.getItem("snippets");
  if (stored) {
    snippets = JSON.parse(stored);
  }
}

function updateLocalStorage() {
  localStorage.setItem("snippets", JSON.stringify(snippets));
}

async function loadMockSnippets() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data = await response.json();
  const mockSnippets = data.map(post => ({
    title: post.title,
    language: "Markdown",
    code: post.body,
    source: "api",
  }));
  snippets = [...mockSnippets, ...snippets];
  updateLocalStorage();
  renderAllSnippets();
}

loadLocalSnippets();
loadMockSnippets();
