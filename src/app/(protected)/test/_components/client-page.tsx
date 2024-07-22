'use client';

import React from 'react'
import axios from 'axios'

const ClientPage = () => {

  const handleButtonClick = async () => {
    console.log('button clicked')
    const res = await axios(`http://172.233.40.227:8080/generate_key?name=QHCHW88JD6HCDHR4&seed=13090022`)
    console.log(res)
  } 

  return (
    <div>
      ClientPage
      <button onClick={handleButtonClick}>Click me</button>  
    </div>
  )
}

export default ClientPage