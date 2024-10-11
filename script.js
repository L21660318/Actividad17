// Espera a que el DOM se cargue completamente
document.addEventListener('DOMContentLoaded', () => {
    const addNoteBtn = document.getElementById('add-note-btn');
    const newNoteInput = document.getElementById('new-note');
    const notesContainer = document.getElementById('notes-container');

    // Función para obtener las notas de localStorage
    const getNotes = () => {
        const notes = localStorage.getItem('notes');
        return notes ? JSON.parse(notes) : [];
    };

    // Función para guardar las notas en localStorage
    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Función para crear una nota en el DOM
    const createNoteElement = (note) => {
        const noteDiv = document.createElement('div');
        noteDiv.classList.add('note');

        const noteContent = document.createElement('p');
        noteContent.textContent = note.text;
        noteDiv.appendChild(noteContent);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.innerHTML = '&times;'; // Símbolo de "X"
        deleteBtn.setAttribute('data-id', note.id);
        noteDiv.appendChild(deleteBtn);

        notesContainer.appendChild(noteDiv);
    };

    // Función para cargar y mostrar todas las notas
    const loadNotes = () => {
        const notes = getNotes();
        notesContainer.innerHTML = ''; // Limpia las notas existentes
        notes.forEach(note => createNoteElement(note));
    };

    // Función para agregar una nueva nota
    const addNote = () => {
        const noteText = newNoteInput.value.trim();
        if (noteText === '') {
            alert('Por favor, escribe una nota antes de agregarla.');
            return;
        }

        const notes = getNotes();
        const newNote = {
            id: Date.now(), // ID único basado en la marca de tiempo
            text: noteText
        };
        notes.push(newNote);
        saveNotes(notes);
        createNoteElement(newNote);
        newNoteInput.value = ''; // Limpia el área de texto
    };

    // Función para eliminar una nota
    const deleteNote = (id) => {
        let notes = getNotes();
        notes = notes.filter(note => note.id !== id);
        saveNotes(notes);
        loadNotes();
    };

    // Event listener para el botón de agregar nota
    addNoteBtn.addEventListener('click', addNote);

    // Event listener para eliminar notas usando delegación de eventos
    notesContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const noteId = parseInt(e.target.getAttribute('data-id'));
            deleteNote(noteId);
        }
    });

    // Carga las notas al iniciar la aplicación
    loadNotes();
});
