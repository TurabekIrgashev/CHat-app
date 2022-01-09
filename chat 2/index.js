// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBc82cU740MOnZPXz9wF3MnS-PSrl82aL0",
    authDomain: "to-rabek.firebaseapp.com",
    databaseURL: "https://to-rabek-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "to-rabek",
    storageBucket: "to-rabek.appspot.com",
    messagingSenderId: "357579034080",
    appId: "1:357579034080:web:3e8b8256aa97973136ef85",
    measurementId: "G-J20HZFKYBJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // initialize database
  const db = firebase.database();
  
  // get user's data
  const username = prompt("Please Tell Us Your Name");
  
  document.getElementById("message-form").addEventListener("submit", sendMessage);
  
  // send message to db
  function sendMessage(e) {
    e.preventDefault();
  
    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;
  
    // clear the input box
    messageInput.value = "";
  
    //auto scroll to bottom
    document
      .getElementById("messages")
      .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  
    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
      message,
      username,
    });
  }
  

  const fetchChat = db.ref("messages/");
  
  // check for new messages using the onChildAdded event listener
  fetchChat.on("child_added", function (snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
  });