import { auth, db } from "./firebase-config.js";

import {
createUserWithEmailAndPassword,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
addDoc,
collection,
getDocs,
query,
where
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// clear password
window.onload = function(){

const passwordField=document.getElementById("password");

if(passwordField){
passwordField.value="";
}

};



// signup
window.signup=function(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

createUserWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Account created");
window.location.href="dashboard.html";
})
.catch(error=>alert(error.message));

};



// login
window.login=function(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

signInWithEmailAndPassword(auth,email,password)
.then(()=>{
alert("Login successful");
window.location.href="dashboard.html";
})
.catch(error=>alert(error.message));

};



// logout
window.logout=function(){

signOut(auth)
.then(()=>{
window.location.href="login.html";
})
.catch(error=>alert(error.message));

};



// go to AI page
window.goToAI=function(){

window.location.href="index.html";

};


// SAVE AI RESULT
window.saveAnalysis = async function(type, result){

const user = auth.currentUser;

if(!user){
alert("Login required");
return;
}

await addDoc(collection(db,"analysis"),{

uid:user.uid,
type:type,
result:result,
time:new Date()

});

};




// LOAD USER DATA
window.loadData = async function(){

const user=auth.currentUser;

if(!user) return;

const q=query(
collection(db,"analysis"),
where("uid","==",user.uid)
);

const querySnapshot=await getDocs(q);

let output="";

querySnapshot.forEach((doc)=>{

const data = doc.data();

output += "<b>" + data.type + "</b><br>";
output += data.result + "<br>";
output += "<i>" + new Date(data.time.seconds*1000).toLocaleString() + "</i>";
output += "<br><br>";

});


const display=document.getElementById("dataDisplay");

if(display){
display.innerHTML=output;
}

};



// protect dashboard
onAuthStateChanged(auth,(user)=>{

if(window.location.pathname.includes("dashboard.html")){

if(!user){

window.location.href="login.html";

}else{

loadData();

}

}

});
