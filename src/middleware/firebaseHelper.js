import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

let config = {
  apiKey: "AIzaSyAhWRYhAe2pjYQCWV4E_GDGXKuQhd2c2lk",
  authDomain: "ftisland-web.firebaseapp.com",
  databaseURL: "https://ftisland-web.firebaseio.com",
  projectId: "ftisland-web",
  storageBucket: "ftisland-web.appspot.com",
  messagingSenderId: "265443846719",
  appId: "1:265443846719:web:efbdb97a550e5493"
};
firebase.initializeApp(config);

const database = firebase.database();
const storage = firebase.storage();

const firebaseObj =  {
  database: database,
  storage: storage
}
export default firebaseObj;
