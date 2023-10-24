import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJyHf4QWQhrF_kPWxDqQ20LLrQiwmrY5I",
  authDomain: "waterworks-14abb.firebaseapp.com",
  projectId: "waterworks-14abb",
  storageBucket: "waterworks-14abb.appspot.com",
  messagingSenderId: "593186564784",
  appId: "1:593186564784:web:5bca4a944129f2ebf22975",
  measurementId: "G-8RHRS44352"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { db, storage };


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
