let userentry = [];
const form = document.getElementById("ll");
const retrievedData = localStorage.getItem("userentry");
if (retrievedData) {
  userentry = JSON.parse(retrievedData);
} else {
  userentry = [];
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  const dob = document.getElementById("dob").value;
  const ACCEPTEDTERMSANDCONDITIONS = document.getElementById("accept").checked;
  const entry = {
    name,
    email,
    password,
    dob,
    accept,
  };
  userentry.push(entry);
  localStorage.setItem("userentry", JSON.stringify(userentry));
  form.reset(); // Reset the form fields
  const users = JSON.parse(localStorage.getItem("userentry")) || [];
  add(entry);
});
const tableBody = document.querySelector("#usertable tbody");

function add(user) {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${
    user.password
  }</td><td>${user.dob}</td><td>${user.accept ? "True" : "False"}</td>`;
  tableBody.appendChild(row);
}
userentry.forEach((user) => {
  const row = document.createElement("tr");
  row.innerHTML = `<td>${user.name}</td><td>${user.email}</td><td>${
    user.password
  }</td><td>${user.dob}</td><td>${user.accept ? "True" : "False"}</td>`;
  tableBody.appendChild(row);
});
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const currentDate = new Date();
const maxDate = new Date(currentDate);
maxDate.setFullYear(currentDate.getFullYear() - 55);
const minDate = new Date(currentDate);
minDate.setFullYear(currentDate.getFullYear() - 18);
dob.setAttribute("min", formatDate(maxDate));
dob.setAttribute("max", formatDate(minDate));
form.addEventListener("close", function () {
  localStorage.clear();
});
