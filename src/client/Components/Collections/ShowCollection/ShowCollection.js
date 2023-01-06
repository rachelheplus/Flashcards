import './ShowCollection.scss';

import {
  setCollectionArr,
  setCollection_id,
  setCollection_title,
} from '../../../Redux/slices/collectionSlice';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import React from 'react';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';

const ShowCollection = () => {
  // api/collections
  // post
  // send only user_id
  const user_id = useSelector((state) => state.user.user_id);
  const collectionArr = useSelector((state) => state.collection.collectionArr);

  const collection_id = useSelector((state) => state.collection.collection_id);
  //Got rid of [collection, setCollection] because we have collectionArr as global state now
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

  // console.log('global state: ', collectionArr);

  const handleClick = (e) => {
    dispatch(setCollection_id(e.target.value));
  };

  const handleDelete = (e) => {
    console.log(
      'when clicking delete we should get collection_id',
      e.target.value
    );
    dispatch(setCollection_id(+e.target.value));
    const url = 'http://localhost:8080/api/collections';
    const requestOption = {
      method: 'DELETE',
      body: JSON.stringify({
        collection_id: collection_id,
        user_id: user_id,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    console.log('inside handleDelete:', collection_id);
    fetch(url, requestOption)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        //probably we need to update some kind of state here
        dispatch(setCollectionArr(data));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="collection-list-container">
      {collectionArr.map((collection) => (
        <div>
          <Link to="/cards" style={{ textDecoration: 'none' }}>
            <button
              className="collection-title"
              value={collection._id}
              onClick={handleClick}
              key={uuid()}
            >
              {collection.title}
            </button>
          </Link>
          <button className="delete-collection" value={collection._id} onClick={handleDelete} key={uuid()}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShowCollection;
