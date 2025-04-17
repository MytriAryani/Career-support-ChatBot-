


const chatWindow = document.getElementById("chatWindow");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");


let currentChat = [];

console.log("Thread ID:", window.threadId);
function renderChat(message, sender) {
    const msg = document.createElement("div");
    msg.style.padding = "0.5rem";
    msg.style.marginBottom = "0.5rem";
    msg.style.borderRadius = "8px";
    msg.style.background = sender === "user" ? "#e0ccff" : "#ffffff";
    msg.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
    chatWindow.appendChild(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
  
    if (sender === "bot") {
     
      msg.textContent = "typing...";
      const prefix = "Bot: ";
      let i = 0;
  
      setTimeout(() => {
        const interval = setInterval(() => {
          if (i <= message.length) {
            msg.innerHTML = marked.parse(prefix + message.slice(0, i));
            chatWindow.scrollTop = chatWindow.scrollHeight;
            i++;
          } else {
            clearInterval(interval);
          }
        }, 25); 
      }, 500); 
    } else {
      msg.textContent = `You: ${message}`;
    }
  }
  



chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  renderChat(message, "user");
  currentChat.push({ message, sender: "user" });
  userInput.value = "";

  try {
    const res = await fetch("https://akshay050702-chatbot.hf.space/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [message],
        thread_id: window.threadId,
         
      })
    });

    if (!res.ok) {
      throw new Error("API returned an error");
    }

    const data = await res.json();
    console.log("API response:", data);

    const botMsg = typeof data === "string" ? data : "(Unexpected response)";
    renderChat(botMsg, "bot");
    currentChat.push({ message: botMsg, sender: "bot" });

  } catch (err) {
    console.error(err);
    renderChat("Error connecting to API.", "bot");
  }
});



  function toggleMenu() {
    const nav = document.getElementById("navLinks");
    nav.classList.toggle("show");
  }













