import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

const TestAdd = () => {
  const [imageUpload, setImageUpload] = useState();
  const [previewImage, setPreviewImage] = useState();

  const uploadFile = () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
      });
    });
  };

  const handleImageUpload = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);

      setImageUpload(selectedFile);
    }
  };

  return (
    <div className="App">
      <input type="file" onChange={handleImageUpload} />
      {previewImage && (
        <div>
          <p>Preview:</p>
          <img src={previewImage} alt="Preview" style={{ maxWidth: "100%" }} />
        </div>
      )}
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default TestAdd;
