import './CreateCollection.scss';

import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCollectionArr, setCollection_id, setCollection_title } from '../../Redux/slices/collectionSlice';
import { useDispatch } from 'react-redux';

const CreateCollection = () => {
  const [title, setTitle] = useState('');

  const user_id = useSelector((state) => state.user.user_id);
  const collectionArr = useSelector((state) => state.collection.collectionArr);

  const dispatch = useDispatch();

  function handleCreate() {
    const url = 'http://localhost:8080/api/collections/create';
    const create = {
      method: 'POST',
      body: JSON.stringify({ user_id, title }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    fetch(url, create)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch(setCollectionArr([...collectionArr,data]))})
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="create-collection-container">
        <div className="create-collection-input">
          <label htmlFor="Title">Title:</label>
          <input
            className="create-collection-title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Collection Title Here"
          ></input>
        </div>

        <button
          className="card-button collection-button"
          onClick={handleCreate}
        >
          Create New Collection
        </button>
      </div>
    </>
  );
};

export default CreateCollection;
