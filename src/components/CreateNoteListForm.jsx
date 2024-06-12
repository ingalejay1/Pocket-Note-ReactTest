import React, { useState } from 'react';
import './CreateNoteListForm.css';

const predefinedColors = ['#FF5733', '#33FF57', '#3357FF', '#FF33A5', '#33FFF3', '#F3FF33'];

function CreateNoteListForm({ onCreate }) {
  const [newNoteListName, setNewNoteListName] = useState('');
  const [selectedColor, setSelectedColor] = useState(predefinedColors[0]); // Default to the first color

  const handleNameChange = (event) => {
    setNewNoteListName(event.target.value);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newNoteListName.trim()) {
      const newNoteList = { name: newNoteListName, color: selectedColor };
      onCreate(newNoteList); // Pass the created note list to the parent component
      setNewNoteListName(''); // Clear the input field after submission
    }
  };

  return (
    <div className="newListcontainer">
      <h3>Create New Notes Group</h3>
      <form className="create-note-list-form" onSubmit={handleSubmit}>
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
            {predefinedColors.map((color) => (
              <div
                key={color}
                className={`color-circle ${color === selectedColor ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              ></div>
            ))}
          </div>
        </div>
        <button type="submit" className='btn'>Create</button>
      </form>
    </div>
  );
}

export default CreateNoteListForm;
