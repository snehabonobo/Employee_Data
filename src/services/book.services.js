import { db } from "../firebase";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
  } from "firebase/firestore";
 

  const empCollectionRef = collection(db, "employee");
 
class Employee {
  addEmp = (newEmp) => {
    return addDoc(empCollectionRef, newEmp);
  };

  updateEmp = (id, updateEmp) => {
    const empDoc = doc(db, "employee", id);
    return updateDoc(empDoc, updateEmp);
  };

  deleteEmp = (id) => {
    const empDoc = doc(db, "employee", id);
    return deleteDoc(empDoc);
  };

  getAllEmp = () => {
    return getDocs(empCollectionRef);
  };

  getEmp = (id) => {
    const empDoc = doc(db, "employee", id);
    return getDoc(empDoc);
  };
}

export default new Employee();