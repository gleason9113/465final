import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
const axios = require("axios");
const initial = Object.freeze({
  username: ""
});


const Join = () => {
  const [formData, updateForm] = React.useState(initial);
  const handleChange = (e) => {
    updateForm({
      [e.target.name]: e.target.value.trim()
    });
  }
  const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(formData);
    axios.get('/join', {
      params: {
        name: e.target.name
      }
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  return (
    <div>
      <div className='Modal'>
        <form onSubmit={handleSubmit}>
          <input type='text' name='name' placeholder='username' />
          <button>Join!</button>
        </form>
      </div>            
    </div>
  ); 
}

export default Join;

/*

*/