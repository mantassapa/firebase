import { firebaseConfig } from "./firebase.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue, child, get, update} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getDatabase()
const auth = getAuth(app);


let emailInput = document.getElementById("email")
let passwdInput = document.getElementById("userName")
let logbtn = document.getElementById("logIn")
let regbtn = document.getElementById("register")
let userForm = document.getElementById("userForm")
let container = document.getElementById('container')
let signOutbtn = document.getElementById("signOut")

regbtn.addEventListener("click", (el) =>{
    el.preventDefault()

    console.log(emailInput.Value, passwdInput.value);
    const email = emailInput.value.trim()
    const password = passwdInput.value.trim()

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);

        const registerTime = new Date()
        set(ref(db,"users/"+user.uid),{
            email:email,
            role:"simple",
            timestamp:`${registerTime}`
        });console.log("New user creeated");

        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})

logbtn.addEventListener("click", (el) =>{
    el.preventDefault()

    console.log(emailInput.Value, passwdInput.value);
    const email = emailInput.value.trim()
    const password = passwdInput.value.trim()

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log("you logged in",user);

        const loginTime = new Date()
        update(ref(db,"users/"+user.uid),{
            timestamp:`${loginTime}`
        });

        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    });
})

onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
    get(child(ref(db),"/users/"+ uid))
    .then((snapshot)=>{
        if (snapshot.exists()){
            const userDataFromDb = snapshot.val()
            const userRole = userDataFromDb.role;

            if(userRole==="admin"){
                const greetingImg = document.createElement("img")
                greetingImg.src="https://image.spreadshirtmedia.com/image-server/v1/products/T1459A839PA3861PT28D1044833769W8333H10000/views/1,width=550,height=550,appearanceId=839,backgroundColor=F2F2F2/admin-squad-administrative-assistant-admin-team-sticker.jpg"
                greetingImg.alt="admin image"
                greetingImg.style.width="500px"
                container.append(greetingImg)
                console.log('tu esi dievas');
            }else{console.log("Tu esi niekas...");
                const greetingImg = document.createElement("img")
                greetingImg.src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*t_G1kZwKv0p2arQCgYG7IQ.gif"
                greetingImg.alt="admin image"
                greetingImg.style.width="500px"
                container.append(greetingImg)
            }
        } else {
        console.log("no data");
    }
    }).catch((error)=>{alert(error);})
    }else{console.log("user is signed out");}
  });

signOutbtn.addEventListener("click", (el)=>{
    signOut(auth)
    .then(() => {
      // Sign-out successful.
      const greetingImg = document.getElementById("img")
      greetingImg.remove()
    }).catch((error) => {});
})




// let form = document.querySelector('form')
// let carBrand = document.getElementById("carBrandInput");
// let carModel = document.getElementById("carModelInput");
// let carYear = document.getElementById("carYearInput");
// let carPrice = document.getElementById("carPriceInput");
// let favCarPhoto = document.getElementById("favoriteCarPhotoInput");
// let container = document.getElementById('container')
// container.style.display="flex"
// container.style.flexWrap="wrap"

// let insertBtn = document.getElementById("insertBtn");
// let updateBtn = document.getElementById("updateBtn");
// let deleteBtn = document.getElementById("deleteBtn");

// insertBtn.addEventListener("click", (event)=>{
//     event.preventDefault()

//     set(push(ref(db, "cars/")), {
//         brand: carBrand.value,
//         model: carModel.value,
//         year: carYear.value,
//         price: carPrice.value,
//         photo: favCarPhoto.value

//     })
//     .then(()=>{alert("Data added succesfully");
//     form.reset()
//     getData()


//     })
//     .catch((error)=>{alert(error)})
// })

// const getData = ()=>{
//     get(child(ref(db), "cars/"))
//     .then((snapshot)=>{
//         if(snapshot.exists()){
//             console.log(snapshot.val());
//             const data = snapshot.val()
//             console.log(data);
        
//             for(const car in data){
//                 const cardata = data[car]
//                 console.log(cardata);
//                 container.innerHTML+=`
//                 <div class="card" style="width:200px; height:300px; border-color:red; text-align:center">
//                 <img src=${cardata.photo}>
//                 <h2>${cardata.brand}<h2>
//                 <h3>${cardata.model}<h3>
//                 <h5>${cardata.year}<h5>
//                 <h6>${cardata.price}e<h6>
//                 </div>`
//             }
        
//         }
//         else{console.log("no data");}
//     }).catch((error)=>{console.log(error);})
// }

// getData()