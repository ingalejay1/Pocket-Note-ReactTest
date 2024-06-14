import React from 'react';
import './Header.css';
import arrow from '../images/arrow.png';

const NoteHeader = ({ noteList, isMobile, onGoBack }) => {
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
    <div className="right-background-data">
      {isMobile && (
        <button className='back-button' onClick={onGoBack}><img src={arrow} alt="back-Btn" /></button>
      )}
      <div className="circle" style={{ backgroundColor: noteList.color || '#ccc' }}>
        <span>{getInitials(noteList.name)}</span>
      </div>
      <h1>{noteList.name}</h1>
    </div>
  );
}

export default NoteHeader;
