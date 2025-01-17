import React, { useEffect, useState } from "react";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null); // Track the note being edited
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [category, setCategory] = useState("");

  const fetchNotes = () => {
    fetch("http://localhost:8676/notes", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((res) => setNotes(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const updateNote = (noteId) => {
    const updateData = {};
    if (title) updateData.title = title;
    if (note) updateData.note = note;
    if (category) updateData.category = category;

    fetch(`http://localhost:8676/update/${noteId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setEditingNoteId(null); // Close the form
        setTitle("");
        setNote("");
        setCategory("");
        fetchNotes(); // Refresh notes list
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = (noteId) => {
    fetch(`http://localhost:8676/notes/delete/${noteId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        fetchNotes(); // Refresh notes list
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h1>Notes</h1>
      {notes.length > 0 ? (
        notes.map((item) => (
          <div key={item._id}>
            <h3>{item.title}</h3>
            <p>{item.note}</p>
            <p>
              <strong>Category:</strong> {item.category}
            </p>
            <button onClick={() => deleteNote(item._id)}>Delete</button>
            <button
              onClick={() => {
                setEditingNoteId(item._id); // Open the form for this note
                setTitle(item.title || "");
                setNote(item.note || "");
                setCategory(item.category || "");
              }}
            >
              Update
            </button>
            <hr />
          </div>
        ))
      ) : (
        <p>No Notes available for this user.</p>
      )}

      {editingNoteId && (
        <div>
          <h2>Update Note</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateNote(editingNoteId);
            }}
          >
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label>Note:</label>
              <textarea
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label>Category:</label>
              <input
                type="text"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <button type='submit'>Save</button>
            <button
              type="button"
              onClick={() => {
                setEditingNoteId(null); // Close the form without saving
                setTitle("");
                setNote("");
                setCategory("");
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Notes;
