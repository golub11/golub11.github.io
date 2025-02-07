LUXAI_CHAT_URL = "https://women-eu-demo-production.up.railway.app/chat";

function generateSessionId() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let sessionId = '';
  for (let i = 0; i < 10; i++) {
    sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return sessionId;
}

const sessionId = generateSessionId();
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messageQueue = document.getElementById('message-queue');
const typingIndicator = document.querySelector('.typing-indicator');
const chatWindow = document.getElementById('chat-window');
const chatButton = document.getElementById('chat-button');
const closeChatButton = document.getElementById('close-chat');
const paperPlane = document.querySelector('.fa-paper-plane');
// const messagePlaceholder = document.querySelector('.incoming-message-placeholder');
const messagePlaceholder = document.createElement('div');
messagePlaceholder.className = 'incoming message';
messagePlaceholder.innerHTML = `
  <div class="loading-lines"></div>
  <div class="loading-lines"></div>
  <div class="loading-lines"></div>
  <div class="loading-lines"></div>
  <div class="loading-lines"></div>
`;
function sendMessage(message) {
  const incomingMessagePlaceholder = document.querySelector('.incoming');
  if (incomingMessagePlaceholder) {
    incomingMessagePlaceholder.remove();
  }
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'sent');
  messageElement.innerHTML = `<p>${message}</p>`;
  messageQueue.appendChild(messageElement);
  messageQueue.scrollTop = messageQueue.scrollHeight; // Scroll to bottom

  messageQueue.appendChild(messagePlaceholder);
  messagePlaceholder.style.display = 'flex';
  messageQueue.scrollTop = messageQueue.scrollHeight; // Scroll to bottom
  
  typingIndicator.style.display = 'block';
  paperPlane.style.display = 'none';

  sendButton.disabled = true;

  // Simulate asynchronous response with error handling
  asyncReply(message)
    .then(response => {
      addMessageToQueue(response, 'received');
    //   addMessageToQueue(message, 'sent');
    })
    .catch(error => {
      console.error('Error sending message:', error);
      addMessageToQueue('An error occurred. Please try again.', 'sent'); // Inform user about error
    })
    .finally(() => {
      typingIndicator.style.display = 'none';
      messagePlaceholder.style.display = 'none';

      paperPlane.style.display = 'block';
      sendButton.disabled = false;
    });
}

async function asyncReply(message) {
  const apiUrl = LUXAI_CHAT_URL;
  const data = {
    'session_id': sessionId,
    'input': message
  };
  
  const request = new Request(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X_API_KEY': 'F3tdRvZbApkGV4TAqgwL6g30iFZlJf'
    },
    body: JSON.stringify(data),
  });

  try {
    const response = await fetch(request);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const responseData = await response.json();
    return responseData['response'];

  } catch (error) {
    console.error('Error:', error);
    return null;
  }

  // Mocked response for testing purposes
  await new Promise(resolve => setTimeout(resolve, 4000));
  return 'This is a mocked response';
}


function addMessageToQueue(message,type){
  // message = 'The database contains a table named `electricity_prices` with columns `id`, `country`, `date`, and `price`. Here are 3 sample rows from the table:\n\n1. id: 1, country: Denmark, date: 2023-04-18 00:00:00, price: 105.31\n2. id: 2, country: Denmark, date: 2023-04-18 01:00:00, price: 102.07\n3. id: 3, country: Denmark, date: 2023-04-18 02:00:00, price: 101.1\n\nHow can I assist you further with this information?'
  // message = "On 12th January 2024, the electricity prices in Denmark were as follows:\n\n- 00:00:00 - Price: 91.04\n- 01:00:00 - Price: 88.22\n- 02:00:00 - Price: 85.22\n- 03:00:00 - Price: 84.63\n- 04:00:00 - Price: 84.34\n- 05:00:00 - Price: 84.78\n- 06:00:00 - Price: 90.675\n- 07:00:00 - Price: 118.16\n- 08:00:00 - Price: 140.74\n- 09:00:00 - Price: 134.96\n- 10:00:00 - Price: 122.01\n- 11:00:00 - Price: 114.73\n- 12:00:00 - Price: 106.98\n- 13:00:00 - Price: 103.08\n- 14:00:00 - Price: 104.54\n- 15:00:00 - Price: 110.0\n- 16:00:00 - Price: 120.0\n- 17:00:00 - Price: 127.5\n- 18:00:00 - Price: 126.0\n- 19:00:00 - Price: 119.47\n- 20:00:00 - Price: 107.96\n- 21:00:00 - Price: 95.09\n- 22:00:00 - Price: 89.195\n- 23:00:00 - Price: 83.82\n\nThese are the electricity prices in Denmark on the specified date and times."
  message = message.replace(/`([^`]*)`/g, '<code>$1</code>');

  message = message.replace(/\n/g, '<br>');

  const messageElement = document.createElement('div');
  messageElement.classList.add('message', type);

  messageElement.innerHTML = `<p>${message}</p>`;
  
  messageQueue.appendChild(messageElement);
  messageQueue.scrollTop = messageQueue.scrollHeight; // Scroll to bottom
}

// Handle sending message on button click and Enter key press
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    sendMessage(message);
    messageInput.value = ''; // Clear input field after sending
  }
});

messageInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter' && messageInput.value.trim()) {
    sendMessage(messageInput.value.trim());
    messageInput.value = ''; // Clear input field after sending
  }
});

chatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    chatButton.classList.toggle('active');
    chatButton.style.pointerEvents = 'none';
  });
  
  closeChatButton.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
    chatButton.classList.toggle('active');
    chatButton.style.pointerEvents = 'auto';
});