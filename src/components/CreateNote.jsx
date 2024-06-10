import React, { useState, useEffect } from 'react';
import './CreateNote.css'; 
import sendIcon from '../images/submitIcon.png'; 

function CreateNote ({ onSave, onCancel }) {
  const [noteContent, setNoteContent] = useState('');

  // Load saved note content from localStorage on component mount
  useEffect(() => {
    const savedNoteContent = localStorage.getItem('savedNoteContent') || '';
    setNoteContent(savedNoteContent);
  }, []);

  const handleChange = (event) => {
    setNoteContent(event.target.value);
  };

  const handleSubmit = () => {
    if (noteContent.trim()) {
      onSave(noteContent);
      setNoteContent(''); // Clear the input field after saving
      localStorage.setItem('savedNoteContent', ''); // Clear saved note content in localStorage
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="create-note">
      <textarea
        value={noteContent}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder="Type your note here..."
      />
      {noteContent.trim() && (
        <img
          src={sendIcon}
          alt="Send"
          className="send-icon"
          onClick={handleSubmit}
        />
      )}
    </div>
  );
}

export default CreateNote;
