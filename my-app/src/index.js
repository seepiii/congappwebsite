import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from 'firebase/app'
import{
	getFirestore, collection, getDocs,
	addDoc
}from 'firebase/firestore'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
	<App />
  </React.StrictMode>
);
/*

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDr-ND-CzVqJlpC2gPYHCMDJXK553iLt7Q",
  authDomain: "waterworks-e2c58.firebaseapp.com",
  projectId: "waterworks-e2c58",
  storageBucket: "waterworks-e2c58.appspot.com",
  messagingSenderId: "617069228471",
  appId: "1:617069228471:web:042937743a3575b705f832",
  measurementId: "G-017XR6R6RN"
};

initializeApp(firebaseConfig)

const db = getFirestore()

const colRef = collection(db, 'WaterFountain');

getDocs(colRef)
.then((snapshot) => {
	console.log(snapshot.docs)
}
)
console.log(colRef);



document.addEventListener('DOMContentLoaded', () => {
  const addWaterFountain = document.querySelector('.add');
  
  if (addWaterFountain) {
    addWaterFountain.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        bottle: addWaterFountain.querySelector('input[name="bottle"]').checked,
        filter: addWaterFountain.querySelector('input[name="filter"]').value,
        temp: addWaterFountain.querySelector('input[name="temp"]').value,
        working: addWaterFountain.querySelector('input[name="working"]').checked,
      };

      addDoc(colRef, formData)
        .then(() => {
          addWaterFountain.reset();
          console.log('Document added successfully');
        })
        .catch((error) => {
          console.error('Error adding document:', error);
        });
    });
  }
});
*/