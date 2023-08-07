// Function to handle the complaint submission
function submitComplaint() {
    const description = document.getElementById('description').value;
    const location = document.getElementById('location').value;

    // Perform any further actions like sending the data to a server or storing it locally
    // For this example, we'll just store the data in the browser's local storage
    const complaint = { description, location };
    storeComplaint(complaint);

    // Clear the input fields after submission
    document.getElementById('description').value = '';
    document.getElementById('location').value = '';

    // Refresh the complaints list
    displayComplaints();
}

// Function to store the complaint in local storage
function storeComplaint(complaint) {
    let complaints = localStorage.getItem('complaints');
    if (complaints) {
        complaints = JSON.parse(complaints);
    } else {
        complaints = [];
    }
    complaints.push(complaint);
    localStorage.setItem('complaints', JSON.stringify(complaints));
}

// Function to display the filed complaints
function displayComplaints() {
    const complaintsList = document.getElementById('complaints-list');
    complaintsList.innerHTML = '';

    const complaints = JSON.parse(localStorage.getItem('complaints'));
    if (complaints) {
        complaints.forEach(complaint => {
            const listItem = document.createElement('li');
            listItem.textContent = `Description: ${complaint.description}, Location: ${complaint.location}`;
            complaintsList.appendChild(listItem);
        });
    }
}

// Attach event listener to the submit button
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitComplaint);

// Display filed complaints on page load
window.addEventListener('load', displayComplaints);
