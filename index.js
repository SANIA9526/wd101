let userEntries = [];
const form = document.getElementById("registrationForm");
const emailInput = document.getElementById("email");
const dobInput = document.getElementById("dob");
const emailError = document.getElementById("emailError");
const dobError = document.getElementById("dobError");

// Load existing entries from localStorage
const loadEntries = () => {
  const retrievedData = localStorage.getItem("userEntries");
  if (retrievedData) {
    userEntries = JSON.parse(retrievedData);
    displayEntries();
  }
};

// Display all entries in the table
const displayEntries = () => {
  const tableBody = document.querySelector("#usertable tbody");
  tableBody.innerHTML = ""; // Clear existing rows

  userEntries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${"*".repeat(entry.password.length)}</td>
            <td>${entry.dob}</td>
            <td>${entry.accept ? "Yes" : "No"}</td>
        `;
    tableBody.appendChild(row);
  });
};

// Set age restrictions (18-55 years)
const setAgeRestrictions = () => {
  const currentDate = new Date();
  const maxDate = new Date(currentDate);
  maxDate.setFullYear(currentDate.getFullYear() - 55);
  const minDate = new Date(currentDate);
  minDate.setFullYear(currentDate.getFullYear() - 18);

  dobInput.setAttribute("max", formatDate(minDate));
  dobInput.setAttribute("min", formatDate(maxDate));
};

// Format date as YYYY-MM-DD
const formatDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate age is between 18 and 55
const validateAge = (dob) => {
  const birthDate = new Date(dob);
  const currentDate = new Date();
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1;
  }
  return age;
};

// Form submission handler
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Clear previous errors
  emailError.textContent = "";
  dobError.textContent = "";

  // Get form values
  const name = document.getElementById("name").value;
  const email = emailInput.value;
  const password = document.getElementById("password").value;
  const dob = dobInput.value;
  const accept = document.getElementById("accept").checked;

  // Validate email
  if (!validateEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
    return;
  }

  // Validate age
  const age = validateAge(dob);
  if (age < 18 || age > 55) {
    dobError.textContent = "Age must be between 18 and 55 years.";
    return;
  }

  // Create new entry
  const entry = {
    name,
    email,
    password,
    dob,
    accept,
  };

  // Add to entries and save to localStorage
  userEntries.push(entry);
  localStorage.setItem("userEntries", JSON.stringify(userEntries));

  // Reset form and display entries
  form.reset();
  displayEntries();
});

// Initialize the page
setAgeRestrictions();
loadEntries();
