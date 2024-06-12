import React, { useState, useEffect } from 'react';
import NoteListForm from './NoteListForm';
import NoteHeader from './NoteHeader';
import NoteItem from './NoteItem';
import CreateNote from './CreateNote';
import './Note.css';
import backgroundImg from '../images/frontBackground.png';
import lock from '../images/lock.png';

function NoteList() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [noteLists, setNoteLists] = useState([]);
  const [activeNoteList, setActiveNoteList] = useState(null);

  // Load note lists from local storage on component mount
  useEffect(() => {
    const storedNoteLists = JSON.parse(localStorage.getItem('noteLists')) || [];
    setNoteLists(storedNoteLists);
  }, []);

  // Save note lists to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('noteLists', JSON.stringify(noteLists));
  }, [noteLists]);


  const handleCreateNotesGroup = () => setIsFormVisible(true);
  const handleCloseForm = () => setIsFormVisible(false);

  const handleCreateNoteList = (name, color) => {
    const newNoteList = { id: Date.now(), name, color, notes: [] };
    setNoteLists([...noteLists, newNoteList]);
    setIsFormVisible(false);
  };

  // Deselect if the same list is clicked
  const handleSelectNoteList = (noteList) => {
    if (activeNoteList && activeNoteList.id === noteList.id) {
      setActiveNoteList(null); 
    } else {
      setActiveNoteList(noteList);
    }
  };

  const handleSaveNote = (content) => {
    const timestamp = new Date().toISOString();
    const updatedNoteLists = noteLists.map((list) => {
      if (list.id === activeNoteList.id) {
        return {
          ...list,
          notes: [{ id: Date.now(), content, timestamp, updated: timestamp }, ...list.notes],
        };
      }
      return list;
    });
    setNoteLists(updatedNoteLists);
    const updatedActiveNoteList = updatedNoteLists.find(list => list.id === activeNoteList.id);
    setActiveNoteList(updatedActiveNoteList);
  };

  const getInitials = (name) => {
    const nameParts = name.trim().split(' ');
    if (nameParts.length >= 2) {
      return nameParts[0][0].toUpperCase() + nameParts[1][0].toUpperCase();
    } else if (nameParts.length === 1) {
      return nameParts[0][0].toUpperCase() + (nameParts[0][1] ? nameParts[0][1].toUpperCase() : '');
    }
    return '';
  };

  return (
    <div className="container">
      <header className="left-main">
        <div className='fix-data'>
          <h2>Pocket Notes</h2>
          <button onClick={handleCreateNotesGroup}>+ Create Notes Group</button>
        </div>
        <div className='list-contain'>
          <nav>
            <ul>
              {noteLists.map((list) => (
                <li key={list.id} 
                  onClick={() => handleSelectNoteList(list)} 
                  className={`list-style ${activeNoteList && activeNoteList.id === list.id ? 'active' : ''}`}> 
                  <div className="circle" style={{ backgroundColor: list.color || '#ccc' }}>
                    <span>{getInitials(list.name)}</span>
                  </div>
                  {list.name}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      <div className="right-main">
        {activeNoteList ? (
          <>
            <NoteHeader noteList={activeNoteList} />
            <div className="notes">
              {activeNoteList && activeNoteList.notes.slice().reverse().map((note) => (
                <NoteItem key={note.id} note={note} />
              ))}
              <CreateNote onSave={handleSaveNote} />
            </div>
          </>
        ) : (
          <div className="right-background-data-main">
            <div id="generalInfo">
              <img src={backgroundImg} alt="Background" id='welcomeImg'/>
              <h1>Pocket Notes</h1>
              <p>
                Send and receive messages without keeping your phone online.<br />
                Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
              </p>
              <p className="end-to-end"><img src={lock} alt="lock" />end-to-end encrypted</p>
            </div>
          </div>
        )}
        {isFormVisible && (
          <div className="popup">
            <NoteListForm onCreate={handleCreateNoteList} onClose={handleCloseForm} />
          </div>
        )}
      </div>
    </div>
  );
}

export default NoteList;
