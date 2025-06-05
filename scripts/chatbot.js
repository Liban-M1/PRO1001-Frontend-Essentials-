import { OPENAI_API_KEY } from "./config.js";

const chatForm   = document.getElementById("chat-form");
const userInput  = document.getElementById("user-input");
const chatLog    = document.getElementById("chat-log");
const chatError  = document.getElementById("chat-error");

// Append a message bubble to the chat log
function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("message", sender);
  if (sender === "bot") {
    msg.innerHTML = `<span class="fram-icon">FRAM</span>
                     <span class="bot-text">${text}</span>`;
  } else {
    msg.textContent = text;
  }
  chatLog.appendChild(msg);
  chatLog.scrollTop = chatLog.scrollHeight;
}

// Show and remove typing indicator
function showTyping() {
  const dots = document.createElement("div");
  dots.classList.add("message", "bot");
  dots.id = "typing-indicator";
  dots.innerHTML = `<span class="fram-icon">FRAM</span>
                    <span class="bot-text"><span class="typing-indicator">•••</span></span>`;
  chatLog.appendChild(dots);
  chatLog.scrollTop = chatLog.scrollHeight;
}

function removeTyping() {
  const dots = document.getElementById("typing-indicator");
  if (dots) dots.remove();
}

// Handle form submit
chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  appendMessage("user", userMessage);
  userInput.value = "";
  chatError.classList.add("d-none");

  showTyping();

  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData?.error?.message || `API Error: ${res.status}`);
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I didn't understand that.";
    removeTyping();
    appendMessage("bot", reply);

  } catch (err) {
    removeTyping();
    chatError.textContent = "Something went wrong: " + err.message;
    chatError.classList.remove("d-none");
    console.error("Chatbot Error:", err);
  }
});

