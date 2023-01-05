import './FlashCards.scss';

import React, { useState } from 'react';
import { json, useParams } from 'react-router-dom';

import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useSelector } from 'react-redux';

const FlashCard = () => {
  const { id } = useParams();
  // console.log(id);
  const [cardData, setCardData] = useState({});
  const [nextCard, setnextCard] = useState({});
  const [showFront, setShowFront] = useState(true);
  

  const collection_id = useSelector((state) => state.collection.collection_id);
  const navigate = useNavigate();

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'get',
      withCredentials: true,
      url: `http://localhost:8080/api/cards/${id}`,
    }).then((res) => {
      // console.log(res.data);
      setCardData(res.data);
    });
  }, []);

  useEffect(() => {
    // we cannot use async/await in useEffect without wrapping in outer function
    const response = axios({
      method: 'post',
      withCredentials: true,
      data: {collection_id: collection_id},
      url: `http://localhost:8080/api/cards/nextCard/${id}`,
    }).then((res) => {
      // console.log(res.data);
      // console.log('checking for res.data', res.data);
      setnextCard(res.data);
    });
  }, []);

  const deleteCard = () => {
    const response = axios({
      method: 'delete',
      withCredentials: true,
      url: `http://localhost:8080/api/cards/${id}`,
    }).then((res) => {
      navigate(`/cards`);
    });
  };

  return (
    <div className="card-library-container">
      <div id="card-title-wrapper" className="card-title-wrapper">
        <h1 className="card-title">{cardData.title ?? 'No Title'}</h1>
      </div>

      <div
        id="card-frontCard"
        onClick={() => setShowFront(!showFront)}
        className="card-main-container"
      >
        <p className="card-text">
          {showFront ? cardData.front : cardData.back}
        </p>
      </div>

      <div className="button-container">
        <button
          onClick={() => deleteCard()}
          className="card-button delete-card-btn"
        >
          DELETE CARD
        </button>
        <button
          onClick={() => (window.location.href = `/flashcard/${nextCard}`)}
          className="card-button next-card-btn"
        >
          NEXT CARD
        </button>
      </div>
    </div>
  );
};

export default FlashCard;
