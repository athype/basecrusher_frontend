//let data = [];

const modal = document.getElementById("modal");

async function fetchAuthors() {
    try {
        const response = await fetch('http://localhost:4000/api/authors');
        const data = await response.json();

        const table = document.querySelector('.author__table');

        while (table.rows.length > 1) {
            table.deleteRow(1);
        }

        data.forEach(author => {
            const row = document.createElement('tr');
            const cell1 = document.createElement('td');
            const cell2 = document.createElement('td');

            cell1.textContent = author.name;
            cell2.innerHTML = '<a class="btn edit" href="#"> Edit </a> <a class="btn delete" href="#">Delete</a>';

            row.appendChild(cell1);
            row.appendChild(cell2);

            table.appendChild(row);
        });


        // Get the <span> element that closes the modal
        const span = document.getElementsByClassName("close")[0];

        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }

        document.querySelectorAll('.edit').forEach((button, index) => {
            button.addEventListener('click', (event) => {
                // Get the author's name and ID from the data
                const authorName = data[index].name;
                currentAuthorId = data[index].id; // Store the author's ID

                // Set the modal title
                document.getElementById('modal__title').textContent = `Editing ${authorName}`;

                modal.style.display = "block";
            });
        });

        document.querySelectorAll('.delete').forEach((button, index) => {
            button.addEventListener('click', async (event) => {

                const authorToDelete = data[index].id;

                try {
                    const response = await fetch(`http://localhost:4000/api/authors/${authorToDelete}`, {
                        method: 'DELETE',
                    });

                    if (response.status === 200) {
                        console.log('Success: Author deleted');
                    } else {
                        const data = await response.json();
                        console.error('Error:', data);
                    }

                    fetchAuthors();
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
            currentAuthorId = null;

            // Set the modal title
            document.getElementById('modal__title').textContent = 'Add new author';

            // Show the modal
            modal.style.display = "block";
        });

    } catch (error) {
        console.error(error);
    }
}

const form = document.getElementById('modal__form');
const nameInput = document.getElementById('modal__name');

form.addEventListener('submit', async function(event) {
    // Prevent the form from being submitted normally
    event.preventDefault();

    // Get the new name from the input field
    const newName = nameInput.value;

    try {
        // If an author is being edited, send a PUT request
        // Otherwise, send a POST request to add a new author
        if (currentAuthorId) {
            const response = await fetch(`http://localhost:4000/api/authors/${currentAuthorId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                }),
            });

            const data = await response.json();
            console.log('Success:', data);
        } else {
            const response = await fetch('http://localhost:4000/api/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: newName,
                }),
            });

            const data = await response.json();
            console.log('Success:', data);
            modal.style.display = "none";
            form.innerText = '';
        }

        // Refresh the authors list
        fetchAuthors();
    } catch (error) {
        console.error('Error:', error);
    }
});

fetchAuthors();