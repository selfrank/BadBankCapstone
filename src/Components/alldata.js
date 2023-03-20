
import React from 'react';
import {UserContext} from '../App';

export default function AllData(){
  const ctx = React.useContext(UserContext);
  return (
    <>
     <h1>Hello world</h1>
    <h5>All Data in Store</h5>
    {JSON.stringify(ctx)}<br/>
    </>
  );
}
