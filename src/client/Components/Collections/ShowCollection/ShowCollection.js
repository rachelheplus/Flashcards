import './ShowCollection.scss';

import {
  setCollectionArr,
  setCollection_id,
  setCollection_title,
} from '../../../Redux/slices/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import React from 'react';

const ShowCollection = () => {
  // api/collections
  // post
  // send only user_id
  const user_id = useSelector((state) => state.user.user_id);
  const collectionArr = useSelector((state) => state.collection.collectionArr);

  const [collections, setCollections] = useState([]);
  const collectionsArr = [];
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
        setCollections(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="collection-list-container">
      {collectionArr.map((collection) => (
        <Link to="/cards" style={{ textDecoration: 'none' }}>
          <button className="collection-title">{collection.title}</button>
        </Link>
      ))}
    </div>
  );
};

export default ShowCollection;
