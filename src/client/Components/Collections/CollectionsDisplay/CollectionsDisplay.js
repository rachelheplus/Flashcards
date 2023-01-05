import CreateCollection from '../CreateCollection/CreateCollection';
// import Home from '../../Home/Home';
import React from 'react';
import ShowCollection from '../ShowCollection/ShowCollection';

const CollectionsDisplay = (props) => {
  return (
    <div className="collection-container">
      <CreateCollection />
      <ShowCollection />
    </div>
  );
};

export default CollectionsDisplay;
