import React, { useState } from 'react';
import './NoteListForm.css';

function NoteListForm({ onCreate, onClose }) {
  const [newNoteListName, setNewNoteListName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#B38BFA');

  const handleNameChange = (event) => setNewNoteListName(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newNoteListName.trim()) {
      onCreate(newNoteListName, selectedColor);
      setNewNoteListName('');
    }
  };

  const colors = ['#B38BFA', '#FF79F2', '#43E6FC', '#F19576', '#0047FF', '#6691FF'];

  return (
    <div className="newListcontainer" onClick={onClose}>
      <div className="form-content" onClick={(e) => e.stopPropagation()}>
        <h3>Create New Notes Group</h3>
        <form onSubmit={handleSubmit}>
          <div className='noteName'>
            <label htmlFor="noteListName">Group Name</label>
            <input
              type="text"
              id="noteListName"
              placeholder="Enter Your Group Name..."
              value={newNoteListName}
              onChange={handleNameChange}
            />
          </div>
          <div className='noteName'>
            <label>Choose Color</label>
            <div className="color-options">
              {colors.map((color) => (
                <div
                  key={color}
                  className="color-circle"
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </div>
          </div>
          <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
}

export default NoteListForm;
