// Code for integratr or import the image integrator for apply that code.


/*import React from 'react';
import ImageClassifier from './ImageClassifier';

function App() {
  return (
    <div className="App">
      <h1>Image Classifier App</h1>
      <ImageClassifier/>
    </div>
  );
}

export default App;*/

import { useState } from "react";

function App() {
  const [name, setName] = useState("Akash");

  const f1 = () => {
    setName("Sawant", () => {
      alert(name);
    });
  };

  return (
    <div>
      <h1>{name}</h1>
      <button onClick={f1}>click me</button>
    </div>
  );
}

export default App;


