import { db } from "../firebase";

import {
    collection,
    addDoc
  } from "firebase/firestore";

  const taskCollectionReff = collection(db, "task");

  class Task {
    addTask = (newTask) => {
      return addDoc(taskCollectionReff, newTask);
    };

   
      
  }
  
  export default new Task();