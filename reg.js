function validateForm() {
  // Get form inputs
  var name = document.getElementById('name1').value;
  var phoneNumber = document.getElementById('phone1').value;
  var dob = document.getElementById('bd1').value;
  var email = document.getElementById('email1').value;
  const radio = document.querySelectorAll('input[name="Gender"]');
  var isGenderSelected = false;
  var fileInput = document.getElementById('file1').value;
  var checkbox = document.getElementById('check');

  console.log("After getting inputs");

  // Check for empty fields
  if (name == "" || phoneNumber == "" || dob == "" || email == "") {
    alert('Please fill in all fields.');
    console.log("After if alert");
    return false; // Stop form submission
  }

  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      isGenderSelected = true;
      break;
    }
  }

  if (!isGenderSelected) {
    // Handle case when no gender is selected
    alert('Please select a gender.');
    console.log("After if gender");
    return false; // Stop form submission
  }

  if (fileInput.length == 0) {
    // Handle case when no file is selected
    alert('Please select a file.');
    console.log("After if file length");
    return false; // Stop form submission
  }

  if (!checkbox.checked) {
    // Handle case when checkbox is not checked
    alert('Please check the checkbox.');
    return false; // Stop form submission
  }

  // Validate name
  if (!/^[a-zA-Z]/.test(name)) {
    alert('Name cannot start with a number.');
    console.log("After if name test");
    return false; // Stop form submission
  }

  // Validate phone number
  if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
    alert('Phone number should be 10 digits.');
    console.log("After if phonenumber test");
    return false; // Stop form submission
  }

  var selectedGender = "";
  for (var i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      selectedGender = radio[i].value;
      break;
    }
  }


  // Validate date of birth
  var currentYear = new Date().getFullYear();
  var dobYear = new Date(dob).getFullYear();
  if (dobYear > 2017 || currentYear - dobYear < 6) {
    alert('Children younger than 6 years old are not accepted.');
    console.log("After if year");
    return false; // Stop form submission
  }

// Store child's name in local storage
var childInfo = { name: name };
localStorage.setItem('childName', name);

// Check if there are already saved children in local storage
let parentRegisteredKids = JSON.parse(localStorage.getItem("parentRegisteredKids")) || [];

// Add the new child to the list of registered kids
parentRegisteredKids.push(childInfo);

// Update local storage for registered kids
localStorage.setItem("parentRegisteredKids", JSON.stringify(parentRegisteredKids));
  

 // If the form is valid, open a new page with form information
 var formInfo = {
  Name: name,
  Phone: phoneNumber,
  DateOfBirth: dob,
  Email: email,
  Gender: selectedGender,
  File: fileInput
};

// Open a new page with form information
var formInfoPage = window.open('', '_blank');
formInfoPage.document.write('<html><head><title>Form Information</title></head><body>');
formInfoPage.document.write('<h1>Form Information</h1>');
formInfoPage.document.write('<p><strong>Name:</strong> ' + formInfo.Name + '</p>');
formInfoPage.document.write('<p><strong>Phone:</strong> ' + formInfo.Phone + '</p>');
formInfoPage.document.write('<p><strong>Date of Birth:</strong> ' + formInfo.DateOfBirth + '</p>');
formInfoPage.document.write('<p><strong>Email:</strong> ' + formInfo.Email + '</p>');
formInfoPage.document.write('<p><strong>Gender:</strong> ' + formInfo.Gender + '</p>');
formInfoPage.document.write('<p><strong>File:</strong> ' + formInfo.File + '</p>');
formInfoPage.document.write('<button onclick="window.print()">Print</button>');
formInfoPage.document.write('</body></html>');
formInfoPage.document.close();


  return true; // Proceed with form submission
}