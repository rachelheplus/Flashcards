import './CreateCard.scss';

// import axios from 'axios';
import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const CreateCard = () => {
  const [front, setFront] = useState('');
  const [back, setback] = useState('');
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  function cb() {
    fetch('http://localhost:8080/api/cards', {
      method: 'POST',
      body: JSON.stringify({ front, back, title }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => navigate('/library'));
  }

  return (
    <div className="new-card-container">
      <input
        className="card-title"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter Card Title Here"
      ></input>
      <input
        className="card-front"
        onChange={(e) => setFront(e.target.value)}
        placeholder="Enter Question Here"
      ></input>
      <input
        className="card-back"
        onChange={(e) => setback(e.target.value)}
        placeholder="Enter Answer Here"
      ></input>
      
      <button className="card-button add-card-btn" onClick={cb}>
        Add Card <span>&#43;</span>
      </button>
    </div>
  );
};

export default CreateCard;
