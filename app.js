// document.querySelector('.bg-video').playbackRate = 0.3;
 "use strict"


document.addEventListener('DOMContentLoaded', () => {
  
console.log("everything works")

	const notes = document.querySelector(".notes");
	const newnoteTitle = document.querySelector(".newnote__title");
	const newnoteContent = document.querySelector(".newnote__content");
	const addNoteBtn = document.querySelector(".newnote__btn");


	function createNote() {
		const newNote = document.createElement("div");

		const newNoteHtml = `<h3>${newnoteTitle.value}</h3>
		<p>${newnoteContent.value}</p>
		<span class="deleteNote">&times;</span>`;
		
		newNote.classList.add("stickynote");
		newNote.innerHTML = newNoteHtml;
		notes.append(newNote);
		reapplyDeleteNoteEventListeners();
		clearNewNote();
	
	}

	addNoteBtn.addEventListener("click", createNote);

	function clearNewNote() {
		newnoteTitle.value = "";
		newnoteContent.value = "";
	}

	const deleteNote = (e) => {
		e.target.parentNode.remove();
	}

	function reapplyDeleteNoteEventListeners() {
		document.querySelectorAll(".deleteNote").forEach(btn => {
			btn.removeEventListener("click", deleteNote);
			btn.addEventListener("click", deleteNote);
		})
	}


})