import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { db } from './firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function App() {
  const [newWorking, setNewWorking] = useState('');
  const [newPortaPotty, setNewPortaPotty] = useState('');
  const [NewQuality, setNewQuality] = useState('');
  const [newTemp, setNewTemp] = useState('');
  const [newBottle, setNewBottle] = useState('');
  const [showPopup1, setShowPopup1] = useState(false); // State for the first popup
  const [showPopup2, setShowPopup2] = useState(false); // State for the second popup

  const [users, setUsers] = useState([]);
  const fountainCollectionRef = collection(db, 'WaterFountain');

  const createUser = async () => {
    await addDoc(fountainCollectionRef, {
      working: newWorking,
      quality: NewQuality,
      temp: newTemp,
      bottle: newBottle,
    });
    setShowPopup1(false); // Close the first popup after creating a new entry
    setShowPopup2(false); // Close the second popup after creating a new entry
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'WaterFountain', id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(fountainCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      {/* Button to open the first popup */}
      <button onClick={() => setShowPopup1(true)}>Enter Water Fountain</button>

      {/* First Popup */}
      <Popup open={showPopup1} onClose={() => setShowPopup1(false)}>
        <div className="popup-content">
          {/* Dropdown menu for "working" */}
          <select
            onChange={(event) => {
              setNewWorking(event.target.value);
            }}
            value={newWorking}
          >
            <option value="">Select working...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          {/* Dropdown menu for "quality" */}
          <select
            onChange={(event) => {
              setNewQuality(event.target.value);
            }}
            value={NewQuality}
          >
            <option value="">Select quality...</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
          </select>

          {/* Input field for "temp" */}
          <input
            placeholder="temp..."
            onChange={(event) => {
              setNewTemp(event.target.value);
            }}
          />

          {/* Dropdown menu for "bottle filler" */}
          <select
            onChange={(event) => {
              setNewBottle(event.target.value);
            }}
            value={newBottle}
          >
            <option value="">Select bottle filler...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <button onClick={createUser}>Add Water Fountain</button>
        </div>
      </Popup>

      {/* Button to open the second popup */}
      <button onClick={() => setShowPopup2(true)}>Enter Bathroom</button>

      {/* Second Popup */}
      <Popup open={showPopup2} onClose={() => setShowPopup2(false)}>
        <div className="popup-content">
          {/* Dropdown menu for "working" */}
          <select
            onChange={(event) => {
              setNewWorking(event.target.value);
            }}
            value={newWorking}
          >
            <option value="">Select working...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {/* put the code here
          {/* Portapotty*/}
          <select
            onChange={(event) => {
              setNewPortaPotty(event.target.value);
            }}
            value={newPortaPotty}
          ></select>
            <option value="">Is it a PortaPotty?</option>
            <select
            onChange={(event) => {
              setNewPortaPotty(event.target.value);
            }}
            value={newPortaPotty}
          ></select>
            <option value="Yes">Yes</option>
            <option value="No">No</option>


          
          
          
          
          
          {/* Dropdown menu for "quality" */}
          <select
            onChange={(event) => {
              setNewQuality(event.target.value);
            }}
            value={NewQuality}
          >
            <option value="">Select quality...</option>
            <option value="Red">Red</option>
            <option value="Yellow">Yellow</option>
            <option value="Green">Green</option>
          </select>

          {/* Dropdown menu for "bottle filler" */}
          <select
            onChange={(event) => {
              setNewBottle(event.target.value);
            }}
            value={newBottle}
          >
            <option value="">Select bottle filler...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <button onClick={createUser}>Add Water Fountain</button>
        </div>
      </Popup>

      {users.map((user) => {
        return (
          <div key={user.id}>
            <h1>working: {user.working}</h1>
            <h1>quality: {user.quality}</h1>
            <h1>temp: {user.temp}</h1>
            <h1>bottle filler: {user.bottle}</h1>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}

export default App;
