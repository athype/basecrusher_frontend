// Define an async function to fetch data from the backend
const modal = document.getElementById("modal");
const modal2 = document.getElementById("modal__edit");

async function fetchData() {
    // Get the index from localStorage
    let index = localStorage.getItem('townhallIndex');
    index = parseInt(index);

    // Update the hero__subtitle and hero__text
    const heroSubtitle = document.querySelector('.hero__subtitle');
    const heroText = document.querySelector('.hero__text');

    if (index !== 7) {
        heroSubtitle.textContent = `Townhall ${index + 10}`;
        heroText.textContent = `Selected townhall ${index + 10}`;
    } else {
        heroSubtitle.textContent = `Reaching strategies`;
        heroText.textContent = `When the opposition is over leveled`;
    }


    const endpoint = `https://localhost:4000/api/townhalls/${index + 1}`;

    try {
        const response = await fetch(`http://localhost:4000/api/strategies/townhalls/${index + 1}`);
        const data = await response.json();

        console.log(data);

        // Select the existing table
        const table = document.querySelector('.townhall__table');

        // Clear the existing table rows, except for the header
        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        // Loop through the strategies in the data
        data.forEach(strategy => {
            // Create a table row and three table data cells
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');
            const cell3 = document.createElement('td');
            const cell4 = document.createElement('td');

            // Insert the data from the backend into the cells
            cell1.textContent = strategy.name;
            cell2.textContent = strategy.short_description;
            cell3.innerHTML = '<a class="btn guide" href="">Guide</a>';
            cell4.innerHTML = '<a class="btn edit" href=""> Edit </a> <a class="btn delete" href="#">Delete</a>';

            // Append the cells to the row
            row.appendChild(cell1);
            row.appendChild(cell2);
            row.appendChild(cell3); // Add this line for the third column
            row.appendChild(cell4);

            // Append the row to the table
            table.appendChild(row);

            // Get the modal
        });

        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];
        const span2 = document.getElementsByClassName("close")[1];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        span2.onclick = function () {
            modal2.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            } else if (event.target === modal2) {
                modal2.style.display = "none";
            }
        }

        // When the user clicks on a "Guide" button, open the modal and fill it with the strategy data
        document.querySelectorAll('.guide').forEach((button, index) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                // Create a string that only includes the values of the strategy
                let strategyData = '';
                for (let key in data[index]) {
                    // Exclude the ID fields, the name field, the author's ID, and the youtube__link
                    if (key !== 'id' && key !== 'th_id' && key !== 'name' && key !== 'author_id' && key !== 'youtube_link') {
                        strategyData += data[index][key] + '<br>';
                    }
                }

                document.getElementById('modal__title').textContent = data[index].name;
                document.getElementById('modal__description').innerHTML = strategyData;
                document.getElementById('modal__embed').src = data[index].youtube_link;

                modal.style.display = "block";
            });
        });


        document.querySelectorAll('.edit').forEach((button, index) => {
            button.addEventListener('click', (event) => {
                event.preventDefault();

                currentStrategyId = data[index].id;
                const strategyName = data[index].name;

                document.getElementById('modal__title__edit').textContent = `Editing ${strategyName}`;

                modal2.style.display = "block";
            });
        });

        document.querySelectorAll('.delete').forEach((button, index) => {
            button.addEventListener('click', async (event) => {

                const strategyToDelete = data[index].id;

                try {
                    const response = await fetch(`http://localhost:4000/api/strategies/${strategyToDelete}`, {
                        method: 'DELETE',
                    });

                    if (response.status === 200) {
                        console.log('Success: Strategy deleted');
                    } else {
                        const data = await response.json();
                        console.error('Error:', data);
                    }

                    fetchData();
                } catch (error) {
                    console.error('Error:', error);
                }
            });
        });

        const addNewButton = document.querySelector('.add-new');
        addNewButton.addEventListener('click', event => {
            // Prevent the button from submitting a form
            event.preventDefault();

            // Clear the current author ID
            currentStrategyId = null;

            // Set the modal title
            document.getElementById('modal__title__edit').textContent = 'Add new strategy';

            // Show the modal
            modal2.style.display = "block";
        });

    } catch (error) {
        console.error('Error:', error);
    }
}

const form = document.getElementById('modal__form__strategy');
const nameInput = document.getElementById('modal__name');
const shortDescriptionInput = document.getElementById('modal__shortdesc');
const typeInput = document.getElementById('modal__type');
const compositionInput = document.getElementById('modal__composition');
const ytLinkInput = document.getElementById('modal__ytlink');
const descriptionInput = document.getElementById('modal__longdescription');
const thIdInput = document.getElementById('modal__th');
const authorIdInput = document.getElementById('modal__author');

form.addEventListener('submit', async function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the new name from the input field
    const newName = nameInput.value;
    const newShortDescription = shortDescriptionInput.value;
    const newType = typeInput.value;
    const newComposition = compositionInput.value;
    const newYtLink = ytLinkInput.value;
    const newDescription = descriptionInput.value;
    const newThId = thIdInput.value;
    const newAuthorId = authorIdInput.value;

    try {
        // If an author is being edited, send a PUT request
        // Otherwise, send a POST request to add a new author
        if (currentStrategyId) {
            const response = await fetch(`http://localhost:4000/api/strategies/${currentStrategyId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                    short_description: newShortDescription,
                    type: newType,
                    composition: newComposition,
                    youtube_link: newYtLink,
                    description: newDescription,
                    th_id: newThId,
                    author_id: newAuthorId,
                }),
            });

            const data = await response.json();
            console.log('Success:', data);
        } else {
            const response = await fetch('http://localhost:4000/api/strategies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                    short_description: newShortDescription,
                    type: newType,
                    composition: newComposition,
                    youtube_link: newYtLink,
                    description: newDescription,
                    th_id: newThId,
                    author_id: newAuthorId,
                }),
            });

            const data = await response.json();
            console.log('Success:', data);
            modal.style.display = "none";
            form.innerText = '';
        }

        // Refresh the authors list
        fetchData();
    } catch (error) {
        console.error('Error:', error);
    }
});

// Call the fetchData function
fetchData();