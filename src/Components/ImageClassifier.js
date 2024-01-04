
// Here we are write the code for add the images for get an the input for the application
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from 'react-dropzone';

const ImageClassifier = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [prediction, setPrediction] = useState('');

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(file);

    const formData = new FormData();
    formData.append('image', file);

    axios.post('http://localhost:3001/classify', formData)
      .then((response) => {
        setPrediction(response.data.prediction);
      })
      .catch((error) => {
        toast.error('Error classifying image. Please try again.');
        console.error(error);
      });
  };

  return (
    <div>
      <Dropzone onDrop={handleFileDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} style={dropzoneStyles}>
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        )}
      </Dropzone>
      {selectedFile && (
        <div>
          <h3>Selected Image:</h3>
          <img src={URL.createObjectURL(selectedFile)} alt="Selected" style={imageStyles} />
        </div>
      )}
      {prediction && (
        <div>
          <h3>Prediction:</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

const dropzoneStyles = {
  border: '2px dashed #cccccc',
  borderRadius: '4px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '300px',
  marginTop: '20px',
};

export default ImageClassifier;
