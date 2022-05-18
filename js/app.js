console.log('welcome to notes app. This is app.js');
showNotes();
//If a user adds a note , add it to a local storage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
   let myObj = {
       title: addTitle.value,
       text: addTxt.value

   }
    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTitle.value = "";
    addTxt.value = "";
    //console.log(notesObj);
    showNotes();
});
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
          <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class-"card-text">${element.text}</p>
                    <button id = "${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete</button>
                </div>
            </div>
`;
    });
    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show! use above section "Add Note" to add a note`
    }
}

function deleteNode(index) {
   // console.log('i m deleting', index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
   
}

let searchTxt = document.getElementById('searchTxt');
searchTxt.addEventListener("input",function(){
   // console.log('input event fired');
    let inputVal = searchTxt.value.toLowerCase();
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})