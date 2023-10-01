import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAHWCIxx5ZeFl3L8Qn-WpC4YrqVjWi-g2I",
  authDomain: "waterw-f6f87.firebaseapp.com",
  projectId: "waterw-f6f87",
  storageBucket: "waterw-f6f87.appspot.com",
  messagingSenderId: "578750789816",
  appId: "1:578750789816:web:2bc459b0161b53191d5c4d",
  measurementId: "G-PB5DZ390NR"
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
