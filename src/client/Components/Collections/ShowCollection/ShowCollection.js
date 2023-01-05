import './ShowCollection.scss';
import React from 'react';

import {
  setCollectionArr,
  setCollection_id,
  setCollection_title,
} from '../../../Redux/slices/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import { Link } from 'react-router-dom';


const ShowCollection = () => {
  // api/collections
  // post
  // send only user_id
  const user_id = useSelector((state) => state.user.user_id);
  const collectionArr = useSelector((state) => state.collection.collectionArr);
  
  const dispatch = useDispatch();

  useEffect(() => {
    //fetch all the collections of the logged in user
    const url = 'http://localhost:8080/api/collections';
    const requestOption = {
      method: 'POST',
      body: JSON.stringify({ user_id: user_id }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(url, requestOption)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setCollectionArr(data));
      })
      .catch((err) => console.log(err));
  }, []);

  console.log('global state: ', collectionArr);

  const handleClick = e => {
    console.log('should get the collection_id when clicking its button', e.target.value)
  }

  return (
    <div className="collection-list-container">
      {collectionArr.map((collection) => (
        <button className="collection-title" value={collection._id} onClick={handleClick} key={uuid()}>{collection.title}</button>
      ))}
    </div>
  );
};

export default ShowCollection;
