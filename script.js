// Array to store booking information
let bookings = [];


// Ticket price
const ticketPrice = 200;


// Get booking form
const bookingForm = document.getElementById("bookingForm");


// Get ticket input
const ticketsInput = document.getElementById("tickets");


// Calculate total amount when ticket number changes
ticketsInput.addEventListener("input", function() {

    const tickets = Number(ticketsInput.value);

    const total = tickets * ticketPrice;

    document.getElementById("totalAmount").textContent =
        "₹" + total;

});


// Form submit event
bookingForm.addEventListener("submit", function(event) {

    // Stop page refresh
    event.preventDefault();


    // Clear previous errors
    clearErrors();


    // Get values
    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const mobile =
        document.getElementById("mobile").value.trim();

    const movie =
        document.getElementById("movie").value;

    const date =
        document.getElementById("date").value;

    const time =
        document.getElementById("time").value;

    const tickets =
        Number(document.getElementById("tickets").value);


    let valid = true;


    // ---------------------------
    // Name Validation
    // ---------------------------

    if (name === "") {

        document.getElementById("nameError").textContent =
            "Please enter your name.";

        valid = false;

    }
    else if (!/^[A-Za-z ]+$/.test(name)) {

        document.getElementById("nameError").textContent =
            "Name should contain only letters.";

        valid = false;
    }


    // ---------------------------
    // Email Validation
    // ---------------------------

    if (email === "") {

        document.getElementById("emailError").textContent =
            "Please enter your email.";

        valid = false;

    }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {

        document.getElementById("emailError").textContent =
            "Please enter a valid email.";

        valid = false;
    }


    // ---------------------------
    // Mobile Validation
    // ---------------------------

    if (mobile === "") {

        document.getElementById("mobileError").textContent =
            "Please enter mobile number.";

        valid = false;

    }
    else if (!/^[0-9]{10}$/.test(mobile)) {

        document.getElementById("mobileError").textContent =
            "Mobile number must contain 10 digits.";

        valid = false;
    }


    // ---------------------------
    // Movie Validation
    // ---------------------------

    if (movie === "") {

        document.getElementById("movieError").textContent =
            "Please select a movie.";

        valid = false;
    }


    // ---------------------------
    // Date Validation
    // ---------------------------

    if (date === "") {

        document.getElementById("dateError").textContent =
            "Please select a date.";

        valid = false;
    }


    // ---------------------------
    // Time Validation
    // ---------------------------

    if (time === "") {

        document.getElementById("timeError").textContent =
            "Please select show time.";

        valid = false;
    }


    // ---------------------------
    // Ticket Validation
    // ---------------------------

    if (!tickets || tickets < 1 || tickets > 10) {

        document.getElementById("ticketsError").textContent =
            "Please enter tickets between 1 and 10.";

        valid = false;
    }


    // Stop if validation failed
    if (!valid) {

        return;
    }


    // Calculate total
    const totalAmount =
        tickets * ticketPrice;


    // Create booking object
    const booking = {

        id: Date.now(),

        customerName: name,

        email: email,

        mobile: mobile,

        movie: movie,

        date: date,

        time: time,

        tickets: tickets,

        totalAmount: totalAmount
    };


    // Add booking to Array
    bookings.push(booking);


    // Convert Array to JSON
    const bookingJSON =
        JSON.stringify(bookings);


    // Display JSON in console
    console.log("Booking Data in JSON:");

    console.log(bookingJSON);


    // Success message
    document.getElementById("successMessage").textContent =
        "🎉 Ticket booked successfully!";


    // Display bookings
    displayBookings();


    // Clear form
    bookingForm.reset();


    // Reset total
    document.getElementById("totalAmount").textContent =
        "₹0";

});


// ------------------------------------
// Clear Error Messages
// ------------------------------------

function clearErrors() {

    document.getElementById("nameError").textContent = "";

    document.getElementById("emailError").textContent = "";

    document.getElementById("mobileError").textContent = "";

    document.getElementById("movieError").textContent = "";

    document.getElementById("dateError").textContent = "";

    document.getElementById("timeError").textContent = "";

    document.getElementById("ticketsError").textContent = "";

    document.getElementById("successMessage").textContent = "";
}


// ------------------------------------
// Display Bookings
// ------------------------------------

function displayBookings() {

    const bookingList =
        document.getElementById("bookingList");


    bookingList.innerHTML = "";


    // If no bookings
    if (bookings.length === 0) {

        bookingList.innerHTML =
            '<p class="no-booking">No bookings available.</p>';

        return;
    }


    // Display every booking
    bookings.forEach(function(booking, index) {

        const card =
            document.createElement("div");


        card.className = "booking-card";


        card.innerHTML = `

            <h3>🎬 ${booking.movie}</h3>

            <p>
                <strong>Customer:</strong>
                ${booking.customerName}
            </p>

            <p>
                <strong>Email:</strong>
                ${booking.email}
            </p>

            <p>
                <strong>Mobile:</strong>
                ${booking.mobile}
            </p>

            <p>
                <strong>Date:</strong>
                ${booking.date}
            </p>

            <p>
                <strong>Show Time:</strong>
                ${booking.time}
            </p>

            <p>
                <strong>Tickets:</strong>
                ${booking.tickets}
            </p>

            <p>
                <strong>Total Amount:</strong>
                ₹${booking.totalAmount}
            </p>

            <button
                class="cancel-btn"
                onclick="cancelBooking(${index})">

                Cancel Booking

            </button>
        `;


        bookingList.appendChild(card);

    });
}


// ------------------------------------
// Cancel Booking
// ------------------------------------

function cancelBooking(index) {

    bookings.splice(index, 1);


    displayBookings();


    console.log("Updated Booking JSON:");

    console.log(JSON.stringify(bookings));
}


// Display empty booking message when page loads
displayBookings();