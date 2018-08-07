const usernameElement = document.getElementById("username");
const messageElement = document.getElementById("message");
const button = document.getElementById("submitButton");
const allMessages = document.getElementById("allMessages");
button.addEventListener("click",updateDB);

//Set database object here
let database = firebase.database().ref()

/**
 * Updates the database with the username and message.
 */
function updateDB(event){
    event.preventDefault();
    const username        = usernameElement.value;
    const message         = messageElement.value;

    usernameElement.value = "";
    messageElement.value  = "";

    console.log(username + " : " + message);

    //Update database here
    const rawData ={
        NAME: username,
        MESSAGE: message
    }
database.push(rawData);
}

// Set database "child_added" event listener here
database.on("child_added",addMessageToBoard);

function addMessageToBoard(rowDataRef){
    const row = rowDataRef.val()
    console.log(row);
    const name = row.NAME;
    const message = row.MESSAGE;
    const paragraph = document.createElement("p");
    paragraph.innerText = name +": "+ message;
    allMessages.appendChild(paragraph);
}