import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { db, storage } from './firebase.js';
import { query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


function App() {
  const [newWorking, setNewWorking] = useState(null);
  const [NewQuality, setNewQuality] = useState(null);
  const [newTemp, setNewTemp] = useState(null);
  const [newBottle, setNewBottle] = useState(null);
  const [showPopup1, setShowPopup1] = useState(false);
  const [newImage, setNewImage] = useState(null);

  const [newPortapotty, setNewPortapotty] = useState(null);
  const [newStandalone, setNewStandalone] = useState(null);
  const [newCleanliness, setNewCleanliness] = useState(null);
  const [newToiletPaper, setNewToiletPaper] = useState(null);
  const [newHandicapAccessible, setNewHandicapAccessible] = useState(null);
  const [newUnisex, setNewUnisex] = useState(null);
  const [newDiaperChangingStation, setNewDiaperChangingStation] = useState(null);
  const [newSoap, setNewSoap] = useState(null);
  const [showPopup2, setShowPopup2] = useState(false);
 


  const [queryPortapotty, setQueryPortapotty] = useState(false);
  const [queryStandalone, setQueryStandalone] = useState(false);
  const [queryCleanliness, setQueryCleanliness] = useState('');
  const [queryToiletPaper, setQueryToiletPaper] = useState(false);
  const [queryHandicapAccessible, setQueryHandicapAccessible] = useState(false);
  const [queryUnisex, setQueryUnisex] = useState(false);
  const [queryDiaperChangingStation, setQueryDiaperChangingStation] =
    useState(false);
  const [querySoap, setQuerySoap] = useState(false);




  const [users, setUsers] = useState([]);
  const [entries2, setEntries2] = useState([]); // For the second set of entries
  const fountainCollectionRef = collection(db, 'WaterFountain');
  const entries2CollectionRef = collection(db, 'Entries2');


  const fetchFilteredData = async () => {
  const q = query(fountainCollectionRef,
     where("portapotty", "==", queryPortapotty),
     where("standalone", "==", queryStandalone),
     where("cleanliness", "==", queryCleanliness),
     where("toiletPaper", "==", queryToiletPaper),
     where("handicapAccessible", "==", queryHandicapAccessible),
     where("unisex", "==", queryUnisex),
     where("diaperChangingStation", "==", queryDiaperChangingStation),
     where("soap", "==", querySoap)
     );
  const fountainQueryCollection = await getDocs(q);
  const querySnapshot = await getDocs(q);
  const fetchedData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  setEntries2(fetchedData);
};


 


const createUser = async () => {
  // Create a new object to represent the water fountain entry, including the image
  const newEntry = {
    working: newWorking,
    quality: NewQuality,
    temp: newTemp,
    bottle: newBottle,
    image: newImage, // Include the uploaded image in the entry
  };

  await addDoc(fountainCollectionRef, newEntry);
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
  
  const handleImageUpload = async (file) => {
    try {
      // Create a storage reference
      const storageRef = ref(storage, `images/${file.name}`);
  
      // Upload the file to the storage reference
      await uploadBytes(storageRef, file);
  
      // Get the download URL of the uploaded image
      const imageUrl = await getDownloadURL(storageRef);
  
      // Set the image URL to the state
      setNewImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
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
              <label>
                Working?
                <input type="checkbox" onChange={(e) => setNewWorking(e.target.checked)} checked={newWorking} />
              </label>


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


              <label>
                Bottle filler?
                <input type="checkbox" onChange={(e) => setNewBottle(e.target.checked)} checked={newBottle} />
              </label>
              <label>
      Upload Picture:
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleImageUpload(e.target.files[0])}
      />
    </label>

              <button onClick={createUser}>Add Water Fountain</button>
            </div>
      </Popup>




      <button onClick={() => setShowPopup2(true)}>Enter Restroom</button>


      <Popup open={showPopup2} onClose={() => setShowPopup2(false)}>
        <div className="popup-content">
          <label>
            Portapotty?
            <input type="checkbox" onChange={(e) => setNewPortapotty(e.target.checked)} checked={newPortapotty} />
          </label>


          <label>
            Standalone?
            <input type="checkbox" onChange={(e) => setNewStandalone(e.target.checked)} checked={newStandalone} />
          </label>


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


          <label>
            Toilet paper left?
            <input type="checkbox" onChange={(e) => setNewToiletPaper(e.target.checked)} checked={newToiletPaper} />
          </label>


          <label>
            Handicap accessible?
            <input type="checkbox" onChange={(e) => setNewHandicapAccessible(e.target.checked)} checked={newHandicapAccessible} />
          </label>


          <label>
            Unisex?
            <input type="checkbox" onChange={(e) => setNewUnisex(e.target.checked)} checked={newUnisex} />
          </label>


          <label>
            Diaper changing station?
            <input type="checkbox" onChange={(e) => setNewDiaperChangingStation(e.target.checked)} checked={newDiaperChangingStation} />
          </label>


          <label>
            Soap?
            <input type="checkbox" onChange={(e) => setNewSoap(e.target.checked)} checked={newSoap} />
          </label>


          <button onClick={createUser2}>Add Entry2</button>
        </div>
    </Popup>


      <div className="popup-content">
  <label>
    Portapotty:
    <input
      type="checkbox"
      onChange={(event) => {
        setQueryPortapotty(event.target.checked);
      }}
      checked={queryPortapotty}
    />
  </label>


  <label>
    Standalone:
    <input
      type="checkbox"
      onChange={(event) => {
        setQueryStandalone(event.target.checked);
      }}
      checked={queryStandalone}
    />
  </label>


  <label>
    Level of Cleanliness:
    <select
      onChange={(event) => {
        setQueryCleanliness(event.target.value);
      }}
      value={queryCleanliness}
    >
      <option value="">Select cleanliness level...</option>
      <option value="Disgusting">Disgusting</option>
      <option value="Serviceable">Serviceable</option>
      <option value="Clean">Clean</option>
    </select>
  </label>


  <label>
    Toilet Paper:
    <input
      type="checkbox"
      onChange={(event) => {
        setQueryToiletPaper(event.target.checked);
      }}
      checked={queryToiletPaper}
    />
  </label>


  <label>
    Handicap Accessible:
    <input
      type="checkbox"
      onChange={(event) => {
        setQueryHandicapAccessible(event.target.checked);
      }}
      checked={queryHandicapAccessible}
    />
  </label>


  <label>
    Unisex:
    <input
      type="checkbox"
      onChange={(event) => {
        setQueryUnisex(event.target.checked);
      }}
      checked={queryUnisex}
    />
  </label>


  <label>
    Diaper Changing Station:
    <input
      type="checkbox"
      onChange={(event) => {
        setQueryDiaperChangingStation(event.target.checked);
      }}
      checked={queryDiaperChangingStation}
    />
  </label>


  <label>
    Soap:
    <input
      type="checkbox"
      onChange={(event) => {
        setQuerySoap(event.target.checked);
      }}
      checked={querySoap}
    />
  </label>


  <button onClick={fetchFilteredData}>Apply</button>
</div>


      {users.map((user) => {
        return (
          <div key={user.id} className="boxed-entry">
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
          <div key={entry2.id} className="boxed-entry">
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




/*
get all the values from query using check boxes and drop downs.
 When the user presses apply, it calls the query function and
 passes in the values from the check boxes and drop downs. The
 query function then uses the values to query the database and
 return the results. The results are then displayed on the screen.


 if all the values are null or the apply changes button has not been
 added, then juts use the map function to display all the values which
 we already have the code for.
*/



