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
		
		newNote.classList.add("stickynote", "drag");
		newNote.innerHTML = newNoteHtml;
		notes.append(newNote);
		reapplyDeleteNoteEventListeners();
		clearNewNote();
	
	}

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


	// Implementation of dragging functionality
	let isDragging = false;
	let dragTarget = null;

	let lastOffsetX = 0;
	let lastOffsetY = 0;

	function dragNote(e) {
		if(!isDragging) return;

		const x = e.clientX - lastOffsetX;
		const y = e.clientY - lastOffsetY;

		dragTarget.style.left = `${x}px`;
		dragTarget.style.top = `${y}px`;
	}

	window.addEventListener("mousedown", (e) => {
		if(!e.target.classList.contains("drag")) return;

		dragTarget = e.target;
		lastOffsetX = e.offsetX;
		lastOffsetY = e.offsetY;
		isDragging = true;

		console.log(lastOffsetX, lastOffsetY);

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
	//...........

// 	// Implementation of dragging functionality
// let isDragging = false;
// let dragTarget = null;

// let lastOffsetX = 0;
// let lastOffsetY = 0;

// function dragNote(e) {
//   if (!isDragging)
//     return;

//   const x = e.clientX - lastOffsetX;
//   const y = e.clientY - lastOffsetY;
//   dragTarget.style.left = `${x}px`;
//   dragTarget.style.top = `${y}px`;
// }

// window.addEventListener("mousedown", (e) => {
//   if (!e.target.classList.contains("drag"))
//     return;

//   dragTarget = e.target;
//   lastOffsetX = e.clientX;
//   lastOffsetY = e.clientY;
//   isDragging = true;

//   console.log(lastOffsetX, lastOffsetX);

//   e.stopPropagation();
//   e.preventDefault();
// });

// window.addEventListener("mousemove", dragNote);
// window.addEventListener("mouseup", () => {
//   if (isDragging) {
//     isDragging = false;
//     dragTarget = null;
//   }
// });



	reapplyDeleteNoteEventListeners();
	addNoteBtn.addEventListener("click", createNote);
})