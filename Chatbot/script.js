//-dropdown-//

document.addEventListener("DOMContentLoaded", () => {
  const navButton = document.querySelector(".nav-button");
  const dropdown = document.getElementById("myDropdown");
  const closeMenuBtn = document.getElementById("closeMenuBtn");

  navButton.addEventListener("click", () => {
    dropdown.classList.toggle("show");
    navButton.setAttribute("aria-expanded", dropdown.classList.contains("show"));
  });

  closeMenuBtn.addEventListener("click", () => {
    dropdown.classList.remove("show");
    navButton.setAttribute("aria-expanded", "false");
    navButton.focus();
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".nav-button") && !event.target.closest("#myDropdown")) {
      dropdown.classList.remove("show");
      navButton.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && dropdown.classList.contains("show")) {
      dropdown.classList.remove("show");
      navButton.setAttribute("aria-expanded", "false");
      navButton.focus();
    }
  });
});


document.getElementById("closeMenuBtn").addEventListener("click", () => {
  const dropdown = document.getElementById("myDropdown");
  const navButton = document.querySelector(".nav-button");

  dropdown.classList.remove("show");
  navButton.setAttribute("aria-expanded", "false");
  navButton.focus();
});


// basket //

let count = 0;

const buttons = document.querySelectorAll(".producebtn");
const basketCount = document.getElementById("basketcount");


basketCount.setAttribute("aria-live", "polite");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    count++;
    basketCount.textContent = count;
  });
});


//-Chatbot-//


  import OpenAI from "https://cdn.skypack.dev/openai@latest";

  const openai = new OpenAI({
    apiKey: 'your-api-key-here', // replace 'your-api-key-here'with your actual key //
    dangerouslyAllowBrowser: true 
  });

  const messagesDiv = document.getElementById('messages');
  const input = document.getElementById('user-input');
  const button = document.getElementById('send-btn');

function appendMessage(sender, text) {
  const wrapper = document.createElement('div'); 
  wrapper.style.display = 'flex';
  wrapper.style.alignItems = 'flex-start';
  wrapper.style.marginBottom = '10px';

  if (sender === 'You') {
    wrapper.style.justifyContent = 'flex-end';

    const bubble = document.createElement('div');
    bubble.classList.add('message', 'user');
    bubble.textContent = text;

    wrapper.appendChild(bubble);
  } else if (sender === 'Bot') {
    wrapper.style.justifyContent = 'flex-start';


    const label = document.createElement('div');
    label.textContent = 'FRAM';
    label.style.marginRight = '16px';
    label.style.fontWeight = 'regular';
    label.style.fontFamily = 'Frank Ruhl Libre';
    label.style.alignSelf = 'center';
    label.style.fontSize = '16px';

    const bubble = document.createElement('div');
    bubble.classList.add('message', 'bot');
    bubble.textContent = text;

    wrapper.appendChild(label); 
    wrapper.appendChild(bubble);
  }

  messagesDiv.appendChild(wrapper);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; 
}

function appendErrorMessage(text) {
  const wrapper = document.createElement('div');
  wrapper.style.display = 'flex';
  wrapper.style.justifyContent = 'flex-start';
  wrapper.style.marginBottom = '10px';

  const errorBox = document.createElement('div');
  errorBox.textContent = "Failed to connect. Wait and try again later.";
  errorBox.classList.add('error-message');
  wrapper.appendChild(errorBox);
  messagesDiv.appendChild(wrapper);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; 
}

  async function chatWithAI(userMessage) {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant for a sustainable food delivery webshop." },
          { role: "user", content: userMessage }
        ],
        max_tokens: 150
      });
      return response.choices[0].message.content;
    } catch (err) {
      console.error(err);
      appendErrorMessage("Failed to connect. Wait and try again later.");
      return null;
    }
  }

button.addEventListener('click', async () => {
    const message = input.value.trim();
    if (!message) return;

    appendMessage("You", message);
    input.value = "";


    const typingWrapper = document.createElement('div');
    typingWrapper.style.display = 'flex';
    typingWrapper.style.alignItems = 'flex-start';
    typingWrapper.style.marginBottom = '10px';
    typingWrapper.style.justifyContent = 'flex-start';


    const label = document.createElement('div');
    label.textContent = 'FRAM';
    label.style.marginRight = '16px';
    label.style.fontWeight = 'regular';
    label.style.fontFamily = 'Frank Ruhl Libre';
    label.style.alignSelf = 'center';
    label.style.fontSize = '16px';


    const typingBubble = document.createElement('div');
    typingBubble.classList.add('typing-bubble');
    const dots = document.createElement('div');
    dots.classList.add('typing-dots');
    dots.innerHTML = `<span></span><span></span><span></span>`;
    typingBubble.appendChild(dots);

    typingWrapper.appendChild(label);
    typingWrapper.appendChild(typingBubble);
    messagesDiv.appendChild(typingWrapper);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;


    const reply = await chatWithAI(message);


    messagesDiv.removeChild(typingWrapper);

    if (reply) appendMessage("Bot", reply);
});


input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') button.click();
});

