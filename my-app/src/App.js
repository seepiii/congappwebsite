import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {db} from './firebase.js';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newWorking, setNewWorking] = useState("");
  const [NewQuality, setNewQuality] = useState("");
  const [newTemp, setNewTemp] = useState("");
  const [newBottle, setNewBottle] = useState("");


  const [users, setUsers] = useState([]);
  const fountainCollectionRef = collection(db, "WaterFountain");

  const createUser = async () => {
    await addDoc(fountainCollectionRef, { working: newWorking, quality: NewQuality, temp: newTemp, bottle: newBottle });
  };

/*
    const updateUser = async (id, whatever field) => {
    const userDoc = doc(db, "WaterFountain", id);
    const newFields = { whatever field: new field value };
    await updateDoc(userDoc, newFields);
  };
*/

  const deleteUser = async (id) => {
    const userDoc = doc(db, "WaterFountain", id);
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
      <input
        placeholder="working..."
        onChange={(event) => {
          setNewWorking(event.target.value);
        }}
      />
      <input
        placeholder="quality..."
        onChange={(event) => {
          setNewQuality(event.target.value);
        }}
      />
      <input
        placeholder="temp..."
        onChange={(event) => {
          setNewTemp(event.target.value);
        }}
      />
      <input
        placeholder="bottle filler..."
        onChange={(event) => {
          setNewBottle(event.target.value);
        }}
      />

      <button onClick={createUser}> Add Water Fountain</button>
      {users.map((user) => {
        return (
          <div>
            {" "}
            <h1>working: {user.working}</h1>
            <h1>quality: {user.quality}</h1>
            <h1>quality: {user.temp}</h1>

          </div>
        );
      })}
    </div>
  );
}

export default App;


/*
function App() {

  const [users, setUsers] = useState([]);
  const fountainCollectionRef = collection(db, "users");
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(fountainCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);


  return (
    
    <form className="add">
      <label htmlFor="bottle">Bottle:</label>
      <input type="checkbox" name="bottle" />
      <label htmlFor="filter">Filter:</label>
      <input type="text" name="filter" />
      <label htmlFor="temp">Temp:</label>
      <input type="text" name="temp" />
      <label htmlFor="working">Working:</label>
      <input type="checkbox" name="working" />
    
      <button>add a new water fountain</button>
    </form>
    
   <div className = "App">
    {users.map((user) => {
      <text> dawdaw </text>

      return (
        <div>
          {" "}
          <h1>quality: {user.quality}</h1>
          <h1>temp: {user.temp}</h1>
          </div>
      );
      })}
    </div>
  );
}

export default App;
*/
