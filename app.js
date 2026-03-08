import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, push, set, onValue, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// 🔥 YOUR FIREBASE CONFIG (correct)
const firebaseConfig = {
  apiKey: "AIzaSyBgNSn-4Pg8O5aUvwkn3fwb_jZyOfXqzm4",
  authDomain: "smart-medicine-exchange.firebaseapp.com",
  databaseURL: "https://smart-medicine-exchange-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-medicine-exchange",
  storageBucket: "smart-medicine-exchange.firebasestorage.app",
  messagingSenderId: "968345724247",
  appId: "1:968345724247:web:b31b8d14c93e9a5f240a12",
  measurementId: "G-S6RYYVNXJ1"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

//////////////////////////
// 🟢 ADD MEDICINE
//////////////////////////
window.addMedicine = function () {
  const name = document.getElementById("name").value;
  const qty = document.getElementById("qty").value;
  const expiry = document.getElementById("expiry").value;
  const pharmacy = localStorage.getItem("pharmacyName");

  if (!name || !qty || !expiry) {
    alert("Please fill all fields");
    return;
  }

  const medicinesRef = ref(database, 'medicines');
  const newMedicineRef = push(medicinesRef);

  set(newMedicineRef, {
    name: name,
    quantity: qty,
    expiry: expiry,
    pharmacy: pharmacy,
    status: "Available"
  });

  alert("Medicine Uploaded Successfully!");
};

//////////////////////////
// 🔵 SEND REQUEST (NEW)
//////////////////////////
window.submitRequest = function () {
  const name = document.getElementById("medicineName").value;
  const quantity = document.getElementById("quantity").value;
  const pharmacy = localStorage.getItem("pharmacyName");

  if (!pharmacy) {
    alert("Please login first!");
    return;
  }

  if (!name || !quantity) {
    alert("Fill all fields");
    return;
  }

  const requestsRef = ref(database, "requests");

  push(requestsRef, {
    name: name,
    quantity: quantity,
    requestedBy: pharmacy,
    status: "Pending",
    donatedBy: "",
    timestamp: Date.now()
  });

  alert("Request Sent to All Pharmacies Successfully!");

  document.getElementById("medicineName").value = "";
  document.getElementById("quantity").value = "";
};