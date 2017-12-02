const createConnection = document.getElementById('create-connection');
const messagesDiv = document.getElementById('messages')

createConnection.addEventListener('click', function(event) {
  window.App = {}
  window.App.cable = ActionCable.createConsumer("http://localhost:3000/cable")
  window.App.cable.subscriptions.create("RoomChannel", {
    connected() {
      console.log('connected!');
      createConnection.style.visibility = 'hidden';
      if (messagesDiv.innerText === "") {
        fetch('http://localhost:3000/messages');
        let messageForm = document.createElement('form');
        messageForm.innerHTML = "<input type='text' id='message-content'></input><br><input type='submit' id='message-submit'>Post A Message</input>"
        document.body.append(messageForm);

        let messageSubmit = document.getElementById('message-submit');
        messageSubmit.addEventListener('click', function(event) {
          event.preventDefault();
          let messageValue = document.getElementById('message-content').value
          fetch('http://localhost:3000/messages', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({content: messageValue})
          })
          document.getElementById('message-content').value = ""
        })
      }
    },
      // Called when the subscription is ready for use on the server

    disconnected() {
      console.log('connection disrupted')
    },
      // Called when the subscription has been terminated by the server

    received(data) {
      if (data.messages) {
        displayMessages(data.messages)
      }
      else if (data.new_message) {
        displayNewMessage(data.new_message)
      }
    }
  }
  );
})

function displayMessages(messages) {
  messages.forEach(message => {
    let newMessage = document.createElement('p');
    newMessage.innerText = message.content;
    messagesDiv.append(newMessage);
  })
}

function displayNewMessage(message) {
  let newMessage = document.createElement('p');
  newMessage.innerText = message.content;
  messagesDiv.append(newMessage);
}
