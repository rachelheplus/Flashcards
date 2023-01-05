import './ShowCollection.scss';

import { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';

const ShowCollection = () => {
  // api/collections
  // post
  // send only user_id
  const user_id = useSelector((state) => state.user.user_id);
  const [collections, setCollections] = useState([]);
  const collectionsArr = [];

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
        setCollections(data);
      })
      .catch((err) => console.log(err));
  }, []);

  for (let i = 0; i < collections.length; i++) {
    collectionsArr.push(
      <Link to="/home" style={{ textDecoration: 'none' }}>
        <button className="collection-title">{collections[i].title}</button>
      </Link>
    );
  }
  return (
    <>
      <div className="collection-list-container">{collectionsArr}</div>
    </>
  );
};

export default ShowCollection;
