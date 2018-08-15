let button1 = document.querySelector("#submitButton")
button1.addEventListener("click", addDiv)


function addDiv(event) {
    //event.preventDefault();
    document.querySelector("#userContainer").style.display = "block";
    document.querySelector("#submitButton").style.display = "none";
    allRequests.style.display = "none";
    show.style.display = "block";
    other.style.display = "block";
 }




const usernameElement = document.getElementById("username");
const emailElement = document.getElementById("email");
const requestElement = document.getElementById("request");
const commentElement = document.getElementById("comment");
const button = document.getElementById("submitButton1");
const other = document.getElementById("otherDonate");
const otherWays = document.getElementById("otherWays");
const show = document.getElementById("submitButton3");
const allRequests = document.getElementById("allRequests");
const giveORwant = document.getElementById("giveORwant")
button.addEventListener("click",updateDB);
//button.addEventListener("click", clearDiv)
other.addEventListener("click", showOther)
giveORwant.addEventListener("change", updateDesc)
//Set database object here
let database = firebase.database().ref()
function updateDesc() {
    let wantOrNeed = document.querySelector("#wantOrneed")
    wantOrNeed.innerHTML = giveORwant.value == "lookingFor" ? "Want: &nbsp;" : "Have: &nbsp"
} 
/**
 * Updates the database with the username and message.
 */

 function showOther(){
    show.style.display = "none";

    button.style.display = "none";
    button1.style.display = "none";
    other.style.display = "none";
    otherWays.style.display="block";
    document.querySelector("#userContainer").style.display = "none";

 }

function clearDiv(){
    show.style.display = "none";
    other.style.display ="none";
    document.querySelector("#userContainer").style.display = "none";
    allRequests.style.display = "block";
    document.querySelector("#submitButton").style.display = "none";
    postButton.style.display = "none";
    seeButton.style.display = "none";
    other.style.display = "none";
}



function updateDB(event){
    event.preventDefault();
    const anyEmpty = usernameElement.value == "" ||
    emailElement.value == "" ||
    requestElement.value == "" ;
    
    if(anyEmpty){
        alert("Please Fill In All Forms!")
    } else {
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
        clearDiv();
    }
}

// Set database "child_added" event listener here
database.on("child_added",addRequestToBoard);
show.addEventListener("click", clearDiv)

function addRequestToBoard(rowDataRef){
    const row = rowDataRef.val();
    const name = row.NAME;
    const email = row.EMAIL;
    const request = row.REQUEST;
    const comment = row.COMMENT;
    const div = document.createElement("div");
    div.className= "requestDiv"
    const paragraph = document.createElement("p"); 
    let option = giveORwant.value == "lookingFor" ? " needed" : " to give"
    paragraph.innerHTML = "Name: &nbsp;" + name  + "<br>" + "<br>" + request + option + "<br>" + "Email: &nbsp" + email + "<br>" + comment ;
    div.appendChild(paragraph);
    allRequests.appendChild(div);
    


}

 