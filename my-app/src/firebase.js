import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDr-ND-CzVqJlpC2gPYHCMDJXK553iLt7Q",
  authDomain: "waterworks-e2c58.firebaseapp.com",
  projectId: "waterworks-e2c58",
  storageBucket: "waterworks-e2c58.appspot.com",
  messagingSenderId: "617069228471",
  appId: "1:617069228471:web:042937743a3575b705f832",
  measurementId: "G-017XR6R6RN"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);


  /*
  const db = getFirestore()
  
  const colRef = collection(db, 'WaterFountain');
  
  getDocs(colRef)
  .then((snapshot) => {
      console.log(snapshot.docs)
  }
  )
  console.log(colRef);
  
  
  
  
  //adding documents
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
