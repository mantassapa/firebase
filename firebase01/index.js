"use strict"
import { app } from "./firebase.js"
import { getFirestore, doc, setDoc, collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
const db = getFirestore(app)
console.log(db);
const settingDoc = async()=>{
    await setDoc(doc(db, "cars", "1"), {
        brand: "Toyota",
        model: "Yaris",
        years: 2000,
        consuption: 1.5
    }).then(()=>{alert("added succes")
    }).catch((error)=>{console.log(error);})
}
// settingDoc()
const addDocument = async()=>{
    await addDoc(collection(db, "cars"), {
        brand: "Mercedez",
        model: "Benz",
        years: 1995,
        consuption:7
    }).then(()=>{alert("added succes")
    }).catch((error)=>{console.log(error);})
}
// addDocument()

const getOne = async()=>{
    const docSnap = await getDoc(doc(db, "cars", "5ALR9cYS0o3j9F32qsY1"))
    console.log("document data", docSnap.data());
}
// getOne()

const getAll = async()=>{
    const querySnapshot = await getDocs(collection(db, "cars"));
    querySnapshot.forEach(el=>console.log(el.data()))
    const array =[]
    querySnapshot.forEach(el=>array.push(el.data()))
    console.log(array);

}
// getAll()

const update = async()=>{
    await updateDoc(doc(db, "cars", "5ALR9cYS0o3j9F32qsY1"),{
        model: "yes",
        consuption:2
    }).then(()=>{alert("added succes")
    }).catch((error)=>{console.log(error);})
}
// update()
const deleter = async()=>{
    await deleteDoc(doc(db, "cars", "5ALR9cYS0o3j9F32qsY1"
    )).then(()=>{alert("Delete succes")
}).catch((error)=>{console.log(error);})
}
deleter()