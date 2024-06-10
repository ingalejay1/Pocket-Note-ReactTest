import React from 'react';
import './NoteItem.css';

function NoteItem({ note }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString(undefined, {month: 'long', day: 'numeric', year: 'numeric'});
  };

  return (
    <div className="note">
      <div>
      <p className="note-time">
        {formatTime(note.timestamp)}
      </p>
      <p className="note-time">
        {formatDate(note.timestamp)}
      </p>
      </div>
      <p className="note-content">{note.content}</p>
    </div>
  );
}

export default NoteItem;
