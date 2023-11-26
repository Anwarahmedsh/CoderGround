// Function to populate the dropdown list with saved children's names
function populateChildDropdown() {
    // Retrieve the saved children's information from local storage
    var parentRegisteredKids = JSON.parse(localStorage.getItem("parentRegisteredKids"));

    // Get the dropdown list element
    var dropdownList = document.getElementById('child21');

    // Clear existing options
    dropdownList.innerHTML = '';

    // Check if there are saved children
    if (parentRegisteredKids && parentRegisteredKids.length > 0) {
        // Iterate over the saved children and create options
        parentRegisteredKids.forEach(function(childInfo) {
            var option = document.createElement('option');
            option.value = childInfo.name;
            option.textContent = childInfo.name;
            dropdownList.appendChild(option);
        });
    }
}



document.addEventListener("DOMContentLoaded", function() {
    populateChildDropdown();
    // Define the courses array
    var courses = [
      {
        name: "Scratch",
        tutor: "T.Mona",
        prerequisites: []
      },
      {
        name: "Data Science",
        tutor: "T.Anwar",
        prerequisites: ["Scratch"]
      },
      {
        name: "Robotics",
        tutor: "T.Mona",
        prerequisites: []
      },
      {
        name: "Machine Learning",
        tutor: "T.Anwar",
        prerequisites: ["Scratch"]
      },
      {
        name: "JavaScript",
        tutor: "T.Sarah",
        prerequisites: ["Robotics"]
      },
      {
        name: "Web Development",
        tutor: "T.Sarah",
        prerequisites: ["Machine Learning"]
      },
      {
        name: "Paython",
        tutor: "T.Hussam",
        prerequisites: ["Data Science"]
      },
      {
        name: "Artificial intelligence",
        tutor: "T.Abdullah",
        prerequisites: ["JavaScript"]
      },
      {
        name: "Ruby",
        tutor: "T.fahad",
        prerequisites: []
      }
    ];
  
    // Populate the tutor filter options
    var tutorFilter = document.getElementById("filter-tutor");
    var tutors = [];
    for (var i = 0; i < courses.length; i++) {
      if (!tutors.includes(courses[i].tutor)) {
        var option = document.createElement("option");
        option.value = courses[i].tutor;
        option.text = courses[i].tutor;
        tutorFilter.appendChild(option);
        tutors.push(courses[i].tutor);
      }
    }
  
    // Populate the prerequisite filter options
    var prerequisiteFilter = document.getElementById("filter-prerequisite");
    var prerequisites = [];
    for (var i = 0; i < courses.length; i++) {
      for (var j = 0; j < courses[i].prerequisites.length; j++) {
        if (!prerequisites.includes(courses[i].prerequisites[j])) {
          var option = document.createElement("option");
          option.value = courses[i].prerequisites[j];
          option.text = courses[i].prerequisites[j];
          prerequisiteFilter.appendChild(option);
          prerequisites.push(courses[i].prerequisites[j]);
        }
      }
    }


// Event listener for tutor filter
tutorFilter.addEventListener("change", function() {
    var selectedTutor = tutorFilter.value;
    filterCourses(selectedTutor, null);
  });
  
  // Event listener for prerequisite filter
  prerequisiteFilter.addEventListener("change", function() {
    var selectedPrerequisite = prerequisiteFilter.value;
    filterCourses(null, selectedPrerequisite);
  });
  
  // Function to filter courses based on tutor or prerequisite
  function filterCourses(tutor, prerequisite) {
    // Reset checkboxes
    var checkboxes = document.getElementsByName("courses");
    for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
      checkboxes[i].style.display = "none";
    }
  
    // Filter and display checkboxes
    for (var i = 0; i < courses.length; i++) {
      if ((tutor && courses[i].tutor === tutor) || (prerequisite && courses[i].prerequisites.includes(prerequisite))) {
        var checkbox = document.getElementById("course" + (i + 1));
        checkbox.style.display = "block";
      }
    }
  }




  // Function to validate the form inputs
function validateForm2() {
    // Get the selected child
    var childDropdown = document.getElementById('child21');
    var selectedChild = childDropdown.value;
  
    // Get the selected courses
    var checkboxes = document.getElementsByName('courses');
    var selectedCourses = [];
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        selectedCourses.push({
          name: checkboxes[i].nextSibling.textContent,
          tutor: checkboxes[i].nextSibling.nextSibling.textContent.replace('T.', '')
        });
      }
    }
  
    // Check if child and course selections are empty
    if (selectedChild =='') {
      alert('Please select a child.');
      return false;
    }
  
    if (selectedCourses.length == 0) {
      alert('Please select at least one course.');
      return false;
    }
  
    // Display the enrollment information on the page
    displayEnrollmentInfo(selectedChild, selectedCourses);
  
    // Clear the form
    childDropdown.value = '';
    checkboxes.forEach(function(checkbox) {
      checkbox.checked = false;
    });
  
    return false; // Prevent form submission
  }
  
  // Event listener for form submission
  var form = document.querySelector('form');
  form.addEventListener('submit', validateForm2);


// Function to display enrollment information on the page
function displayEnrollmentInfo(childName, courses) {
    // Clear previous information
    var enrollmentInfo = document.getElementById('enrollment-info');
    enrollmentInfo.innerHTML = '';
  
    // Create heading
    var heading = document.createElement('h3');
    heading.textContent = 'Enrollment Information';
    enrollmentInfo.appendChild(heading);
  
    // Display child name
    var childInfo = document.createElement('p');
    childInfo.textContent = 'Child Name: ' + childName;
    enrollmentInfo.appendChild(childInfo);
  
    // Display courses and tutors
    var coursesInfo = document.createElement('p');
    coursesInfo.textContent = 'Courses:';
    enrollmentInfo.appendChild(coursesInfo);
  
    var coursesList = document.createElement('ul');
    courses.forEach(function(course) {
      var courseItem = document.createElement('li');
      courseItem.textContent = course.name + ' (Tutor: ' + course.tutor + ')';
      coursesList.appendChild(courseItem);
    });
    enrollmentInfo.appendChild(coursesList);
  }
  
  
});