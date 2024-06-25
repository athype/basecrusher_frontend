// Select all the "Attacks" buttons
const attackButtons = document.querySelectorAll('.selection__th-btn');

async function fetchDataAndNavigate() {
    try {
        // const response = await fetch(`http://localhost:4000/api/townhalls/${index + 1}`);
        // const data = await response.json();
        //
        // // Store the data in localStorage
        // localStorage.setItem('townhallData', JSON.stringify(data));

        // Navigate to townhall.html
        window.location.href = 'townhall.html';
    } catch (error) {
        console.error('Error:', error);
    }
}

// Loop through all the buttons
attackButtons.forEach((button, index) => {
    // Add click event listener to each button
    button.addEventListener('click', (event) => {
        event.preventDefault();
        localStorage.setItem('townhallIndex', index.toString());

        // Fetch data from the backend and navigate
        fetchDataAndNavigate();
    });
});