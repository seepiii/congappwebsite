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
  const [NewQuality, setNewQuality] = useState('');
  const [newTemp, setNewTemp] = useState('');
  const [newBottle, setNewBottle] = useState('');
  const [showPopup1, setShowPopup1] = useState(false);

  const [newPortapotty, setNewPortapotty] = useState('');
  const [newStandalone, setNewStandalone] = useState('');
  const [newCleanliness, setNewCleanliness] = useState('');
  const [newToiletPaper, setNewToiletPaper] = useState('');
  const [newHandicapAccessible, setNewHandicapAccessible] = useState('');
  const [newUnisex, setNewUnisex] = useState('');
  const [newDiaperChangingStation, setNewDiaperChangingStation] = useState('');
  const [newSoap, setNewSoap] = useState('');
  const [showPopup2, setShowPopup2] = useState(false);

  const [users, setUsers] = useState([]);
  const [entries2, setEntries2] = useState([]); // For the second set of entries
  const fountainCollectionRef = collection(db, 'WaterFountain');
  const entries2CollectionRef = collection(db, 'Entries2');

  const createUser = async () => {
    await addDoc(fountainCollectionRef, {
      working: newWorking,
      quality: NewQuality,
      temp: newTemp,
      bottle: newBottle,
    });
    setShowPopup1(false);
  };

  const createUser2 = async () => {
    await addDoc(entries2CollectionRef, {
      portapotty: newPortapotty,
      standalone: newStandalone,
      cleanliness: newCleanliness,
      toiletPaper: newToiletPaper,
      handicapAccessible: newHandicapAccessible,
      unisex: newUnisex,
      diaperChangingStation: newDiaperChangingStation,
      soap: newSoap,
    });
    setShowPopup2(false);
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
  }, [fountainCollectionRef]);

  useEffect(() => {
    const getEntries2 = async () => {
      const data = await getDocs(entries2CollectionRef);
      setEntries2(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getEntries2();
  }, [entries2CollectionRef]);

  return (
    <div className="App">
      <button onClick={() => setShowPopup1(true)}>Enter Water Fountain</button>

      <Popup open={showPopup1} onClose={() => setShowPopup1(false)}>
        <div className="popup-content">
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

          <input
            placeholder="temp..."
            onChange={(event) => {
              setNewTemp(event.target.value);
            }}
          />

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

      <button onClick={() => setShowPopup2(true)}>Enter Restroom</button>

      <Popup open={showPopup2} onClose={() => setShowPopup2(false)}>
        <div className="popup-content">
          <select
            onChange={(event) => {
              setNewPortapotty(event.target.value);
            }}
            value={newPortapotty}
          >
            <option value="">Portapotty?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            onChange={(event) => {
              setNewStandalone(event.target.value);
            }}
            value={newStandalone}
          >
            <option value="">Standalone?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            onChange={(event) => {
              setNewCleanliness(event.target.value);
            }}
            value={newCleanliness}
          >
            <option value="">Level of cleanliness?...</option>
            <option value="Disgusting">Disgusting</option>
            <option value="Serviceable">Serviceable</option>
            <option value="Clean">Clean</option>
          </select>

          <select
            onChange={(event) => {
              setNewToiletPaper(event.target.value);
            }}
            value={newToiletPaper}
          >
            <option value="">Toilet paper left?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            onChange={(event) => {
              setNewHandicapAccessible(event.target.value);
            }}
            value={newHandicapAccessible}
          >
            <option value="">Handicap accessible?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            onChange={(event) => {
              setNewUnisex(event.target.value);
            }}
            value={newUnisex}
          >
            <option value="">Unisex?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            onChange={(event) => {
              setNewDiaperChangingStation(event.target.value);
            }}
            value={newDiaperChangingStation}
          >
            <option value="">Diaper changing station?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <select
            onChange={(event) => {
              setNewSoap(event.target.value);
            }}
            value={newSoap}
          >
            <option value="">Soap?...</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>

          <button onClick={createUser2}>Add Entry2</button>
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

      {entries2.map((entry2) => {
        return (
          <div key={entry2.id}>
            <h1>Portapotty: {entry2.portapotty}</h1>
            <h1>Standalone: {entry2.standalone}</h1>
            <h1>Cleanliness: {entry2.cleanliness}</h1>
            <h1>Toilet paper left: {entry2.toiletPaper}</h1>
            <h1>Handicap accessible: {entry2.handicapAccessible}</h1>
            <h1>Unisex: {entry2.unisex}</h1>
            <h1>Diaper changing station: {entry2.diaperChangingStation}</h1>
            <h1>Soap: {entry2.soap}</h1>
          </div>
        );
      })}
    </div>
  );
}

export default App;
