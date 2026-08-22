// Get the registration form

const registrationForm =
    document.getElementById("registrationForm");


// Get the registrations section

const registrationsList =
    document.getElementById("registrationsList");


// Get the message area

const message =
    document.getElementById("message");


// Get existing registrations from localStorage

let registrations =
    JSON.parse(localStorage.getItem("registrations")) || [];


// When the user clicks the Register button
// inside an event card

function selectEvent(eventName) {

    // Select that event in the dropdown

    document.getElementById("event").value = eventName;


    // Move the screen to the registration form

    document
        .querySelector(".registration-section")
        .scrollIntoView({
            behavior: "smooth"
        });
}


// When the form is submitted

registrationForm.addEventListener("submit", function(event) {

    // Stop the page from refreshing

    event.preventDefault();


    // Get the values entered by the user

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const selectedEvent =
        document.getElementById("event").value;


    // Check whether all fields are filled

    if (
        name === "" ||
        email === "" ||
        phone === "" ||
        selectedEvent === ""
    ) {

        message.textContent =
            "Please fill in all the details.";

        message.style.color = "red";

        return;
    }


    // Create a registration object

    const registration = {

        name: name,

        email: email,

        phone: phone,

        event: selectedEvent
    };


    // Add the registration to the array

    registrations.push(registration);


    // Save registrations in browser storage

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    // Show success message

    message.textContent =
        "Registration successful!";

    message.style.color = "green";


    // Clear the form

    registrationForm.reset();


    // Show updated registrations

    displayRegistrations();

});


// Function to display registrations

function displayRegistrations() {

    // Clear the current list

    registrationsList.innerHTML = "";


    // Check if there are no registrations

    if (registrations.length === 0) {

        registrationsList.innerHTML =
            "<p>No registrations yet.</p>";

        return;
    }


    // Loop through every registration

    registrations.forEach(function(registration, index) {

        // Create a new div

        const registrationItem =
            document.createElement("div");


        registrationItem.className =
            "registration-item";


        // Add registration information

        registrationItem.innerHTML = `

            <h3>${registration.name}</h3>

            <p>
                <strong>Email:</strong>
                ${registration.email}
            </p>

            <p>
                <strong>Phone:</strong>
                ${registration.phone}
            </p>

            <p>
                <strong>Event:</strong>
                ${registration.event}
            </p>

            <button
                class="delete-button"
                onclick="deleteRegistration(${index})"
            >
                Delete
            </button>

        `;


        // Add the registration to the page

        registrationsList.appendChild(
            registrationItem
        );

    });
}


// Delete a registration

function deleteRegistration(index) {

    // Remove the selected registration

    registrations.splice(index, 1);


    // Update localStorage

    localStorage.setItem(
        "registrations",
        JSON.stringify(registrations)
    );


    // Display the updated list

    displayRegistrations();

}


// Display registrations when the page loads

displayRegistrations();