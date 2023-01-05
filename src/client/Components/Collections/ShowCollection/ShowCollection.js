import './ShowCollection.scss';

import { useEffect, useState } from 'react';

import React from 'react';
import { useSelector } from 'react-redux';

const ShowCollection = () => {
  // api/collections
  // post
  // send only user_id
  const user_id = useSelector((state) => state.user.user_id);
  const [collections, setCollections] = useState([]);

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
        console.log(data);
        setCollections((collections) => [...collections, data]);
      })
      .catch((err) => console.log(err));
  }, []);

  const collectionsArr = [];
  for (let i = 0; i < collections.length; i++) {
    collectionsArr.push(
      <p className="collection-title">{collections[i].title}</p>
    );
  }
  // console.log('collectionsArr with p tag: ', collectionsArr);

  return <div className="collection-list-container">{collectionsArr}</div>;
};

export default ShowCollection;
