let userText = "";
let msgArray = [];
let sendText = (e) => {
  if (e.key == "Enter" && e.target.value.trim() != "") {
    userText = e.target.value;
    console.log(userText);
    msgArray.push(userText);
    addText(userText);
    e.target.value = "";
  }
};
let sendTextBtn = () => {
  let e = document.querySelector(".message-input");
  if (e.value.trim() != "") {
    userText = e.value;
    console.log(userText);
    msgArray.push(userText);
    addText(userText);
    e.value = "";
  }
};
function addText(msg) {
  let chatBox = document.querySelector(".chat-box");
  let textHolder = document.createElement("div");
  let userTextBox = document.createElement("div");

  textHolder.className = "text-holder";
  userTextBox.className = "user-chat";

  userTextBox.textContent = msg;
  chatBox.appendChild(textHolder);
  textHolder.appendChild(userTextBox);

  fetch(
    "https://acobot-brainshop-ai-v1.p.rapidapi.com/get?bid=178&key=sX5A2PcYZbsN5EY6&uid=mashape&msg=" +
      msg,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "acobot-brainshop-ai-v1.p.rapidapi.com",
        "x-rapidapi-key": "fcc2d6c6b3msh404adbe533c36f5p148528jsn4a93557ee62f",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((err) => {
      console.log(err);
      responsiveVoice.setDefaultVoice("US English Male");
      responsiveVoice.speak(err.cnt);

      let chatBox = document.querySelector(".chat-box");
      let textHolder = document.createElement("div");
      let userTextBox = document.createElement("div");

      textHolder.className = "text-holder";
      userTextBox.className = "bot-chat";

      userTextBox.innerHTML = err.cnt;
      chatBox.appendChild(textHolder);
      textHolder.appendChild(userTextBox);

      document.querySelector(".chat-box").scrollTop = document.querySelector(
        ".chat-box"
      ).scrollHeight;
    });
  document.querySelector(".chat-box").scrollTop = document.querySelector(
    ".chat-box"
  ).scrollHeight;
}
document.querySelector(".message-input").addEventListener("keypress", sendText);
document.querySelector(".send-btn").addEventListener("click", sendTextBtn);
//speech recognition
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onstart = function () {
  console.log("ChatBot is activated, you can speak to microphone.");
};

recognition.onresult = function (event) {
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript;
  addText(transcript);
};
//add the listener to the btn
document.querySelector(".record-voice").addEventListener("click", () => {
  recognition.start();
});
