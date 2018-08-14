let button1 = document.querySelector("#submitButton")
button1.addEventListener("click", addDiv)


function addDiv(event) {
    //event.preventDefault();
    document.querySelector("#userContainer").style.display = "block";
    document.querySelector("#submitButton").style.display = "none";
 }



const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const requestElement = document.getElementById("request");
const commentElement = document.getElementById("comment");
const button = document.getElementById("submitButton1");
const show = document.getElementById("submitButton3");
const allRequests = document.getElementById("allRequests");
button.addEventListener("click", isAnythingEmpty);
button.addEventListener("click",updateDB);


//Set database object here
let database = firebase.database().ref()

/**
 * Updates the database with the username and message.
 */
function clearDiv(){
    show.style.display = "none";
    document.querySelector("#userContainer").style.display = "none";
    allRequests.style.display = "block";
    document.querySelector("#submitButton").style.display = "none";

}

function isAnythingEmpty(){
    const anyEmpty = usernameElement.value == "" ||
    emailElement.value == "" ||
    requestElement.value == "" 
 return anyEmpty
 }

function updateDB(event){
    if(isAnythingEmpty()){
        alert("Please Fill In All Forms!")
    } else {
    clearDiv()
    event.preventDefault();
    const username        = usernameElement.value;
    const email         = emailElement.value;
    const request         = requestElement.value;
    const comment        = commentElement.value;


    usernameElement.value = "";
    emailElement.value  = "";
    requestElement.value  = "";
   commentElement.value = "";


    //Update database here
    const rawData ={
        NAME: username,
        EMAIL: email,
        REQUEST: request,
        COMMENT: comment
    }

database.push(rawData); 
    }
}

// Set database "child_added" event listener here
database.on("child_added",addRequestToBoard);
show.addEventListener("click", clearDiv)

function addRequestToBoard(rowDataRef){
    
    const row = rowDataRef.val()
    console.log(row);
    const name = row.NAME;
    const email = row.EMAIL;
    const request = row.REQUEST;
    const comment = row.COMMENT;
    const div = document.createElement("div");
    div.className= "requestDiv"
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "Name: &nbsp;" + name  + "<br>" + "<br>" + request + " needed" + "<br>" + "Email: &nbsp" + email + "<br>" + comment ;
    div.appendChild(paragraph);
    allRequests.appendChild(div);
    


}

console.log(database);
 