// document.querySelector('.bg-video').playbackRate = 0.3;
 "use strict"


document.addEventListener('DOMContentLoaded', () => {
  
console.log("everything works")

	const notes = document.querySelector(".notes");
	const newnoteTitle = document.querySelector(".newnote__title");
	const newnoteContent = document.querySelector(".newnote__content");
	const addNoteBtn = document.querySelector(".newnote__btn");
	const notesArr = JSON.parse(localStorage.getItem('notes')) || [];




	function createNote() {
		const newNote = document.createElement("div");
		const uniqueId = generateUniqueId();
		console.log(`Generated unique ID: ${uniqueId}`);

		const newNoteHtml = `
		<div class="note-inner" data-id="${uniqueId}">
    <div class="note-content">
      <h3>${newnoteTitle.value}</h3>
      <p>${newnoteContent.value}</p>
    </div>
    <div class="note-footer">
      <span class="deleteNote">&times;</span>
    </div>
  </div>`;
  	
		
		newNote.classList.add("stickynote", "drag");
		
		newNote.innerHTML = newNoteHtml;
		notes.append(newNote);
		reapplyDeleteNoteEventListeners();
		positionNote(newNote);

		// Store the note in local storage
    	storeNoteInLocalStorage(uniqueId, newnoteTitle.value, newnoteContent.value);
    	
    	console.log(notesArr)
		clearNewNote();
	
	}



	function generateUniqueId() {
    const timestamp = Date.now(); // Use timestamp for uniqueness
    console.log(timestamp)
    const randomPart = Math.floor(Math.random() * 1000000); // Random number part
    return `${timestamp}-${randomPart}`;
	}

	function clearNewNote() {
		newnoteTitle.value = "";
		newnoteContent.value = "";
	}


	//function to delete my note
	function deleteNote(e) {
    const noteElement = e.target.parentNode.parentNode.parentNode;
    const uniqueId = noteElement.getAttribute("data-id");

    // Remove the note from the DOM
    noteElement.remove();

    // Remove the note from local storage
    removeNoteFromLocalStorage(uniqueId);
}

	// Function to remove a note from local storage
	function removeNoteFromLocalStorage(id) {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = storedNotes.filter((note) => note.id !== id);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
	}



	// Function to store a note in local storage
	function storeNoteInLocalStorage(id, title, content) {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    storedNotes.push({ id, title, content });
    localStorage.setItem("notes", JSON.stringify(storedNotes));
	}

	// Function to get notes from local storage

	function loadNotesFromLocalStorage() {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || [];

    storedNotes.forEach((note) => {
        const uniqueId = note.id;
        const title = note.title;
        const content = note.content;

        // Create a new note element
        const newNote = document.createElement("div");
        
        newNote.setAttribute("data-id", uniqueId);

        // Create the inner HTML for the note
        const newNoteHtml = `
		<div class="note-inner" data-id="${uniqueId}">
    <div class="note-content">
      <h3>${title}</h3>
      <p>${content}</p>
    </div>
    <div class="note-footer">
      <span class="deleteNote">&times;</span>
    </div>
  </div>`;
  	
		
		newNote.classList.add("stickynote", "drag");

        newNote.innerHTML = newNoteHtml;

        notes.append(newNote);

        // Reapply deleteNote event listeners
        reapplyDeleteNoteEventListeners();

        // Position the note
        positionNote(newNote);
    });
}

	// Getting notes when the page loads
	loadNotesFromLocalStorage();



	function reapplyDeleteNoteEventListeners() {
		document.querySelectorAll(".deleteNote").forEach(btn => {
			btn.removeEventListener("click", deleteNote);
			btn.addEventListener("click", deleteNote);
		})
	}


	// Implementation of dragging functionality
	let isDragging = false;
	let dragTarget = null;

	let lastOffsetX = 0;
	let lastOffsetY = 0;

	function dragNote(e) {
		if(!isDragging) return;

		const wrapper = document.querySelector('.wrapper');
	  const wrapperRect = wrapper.getBoundingClientRect();

	  let x = e.clientX - lastOffsetX;
	  let y = e.clientY - lastOffsetY;

	  // Checking if the note is within the left and right boundaries of the wrapper
	  if (x < wrapperRect.left) x = wrapperRect.left;
	  if (x > wrapperRect.right - dragTarget.clientWidth) x = wrapperRect.right - dragTarget.clientWidth;

	  // Checking if the note is within the top and bottom boundaries of the wrapper
	  if (y < wrapperRect.top) y = wrapperRect.top;
	  if (y > wrapperRect.bottom - dragTarget.clientHeight) y = wrapperRect.bottom - dragTarget.clientHeight;

	  dragTarget.style.left = `${x}px`;
	  dragTarget.style.top = `${y}px`;

		// const x = e.clientX - lastOffsetX;
		// const y = e.clientY - lastOffsetY;

		// dragTarget.style.left = `${x}px`;
		// dragTarget.style.top = `${y}px`;
	}

	window.addEventListener("mousedown", (e) => {
		if(!e.target.classList.contains("drag")) return;

		dragTarget = e.target;
		lastOffsetX = e.offsetX;
		lastOffsetY = e.offsetY;
		isDragging = true;

		// console.log(lastOffsetX, lastOffsetY);

		e.stopPropagation();
  	e.preventDefault();
	})

	window.addEventListener("mousemove", dragNote);
	window.addEventListener("mouseup", () => {
		if(isDragging) {
			isDragging = false;
			dragTarget = null;
		}
	})

//..............

	function positionNote(newNote) {

		 let x = window.innerWidth / 2 - newNote.clientWidth / 2 + (-100 + Math.round(Math.random()*50));
  			let y = window.innerHeight / 2 - newNote.clientHeight / 2 + (-200 + Math.round(Math.random()*50));

  		// Check if the note is within the left and right boundaries of the window
  		if (x < 0) x = 0;
  		if (x > window.innerWidth - newNote.clientWidth) x = window.innerWidth - newNote.clientWidth;

  		// Check if the note is within the top and bottom boundaries of the window
  		if (y < 0) y = 0;
  		if (y > window.innerHeight - newNote.clientHeight) y = window.innerHeight - newNote.clientHeight;

  		newNote.style.left = `${x}px`;
  		newNote.style.top = `${y}px`;
  		console.log(newNote.style.left);

	}

	window.addEventListener('resize', () => {
 	document.querySelectorAll('.stickynote').forEach(note => {
    positionNote(note);
  });
});


	reapplyDeleteNoteEventListeners();
	addNoteBtn.addEventListener("click", createNote);
})