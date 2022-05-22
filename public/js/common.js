const submit = document.querySelector('button.submit');
const form = document.querySelector('form');
const taskList = document.querySelector('.tasks');
const btnsDelete = document.querySelectorAll('.btn-delete');

const SERVER_API = '/api/v1/tasks';

async function getAllTasks() {
    try {
        const response = await fetch(SERVER_API);
        const { tasks } = await response.json();
        const templates = tasks.map((task) => {
            return `
                <div class="task col-md-12 ${task.completed? 'task-completed': 'task-uncompleted'}">
                    <div class="card">
                        <div class="card-body px-5 d-flex justify-content-between align-items-center">
                            <h2 class="text-center fw-light m-0">${task.name}</h2>
                            <div class="d-grid gap-2 d-md-flex">
                                <a href="edit.html?id=${task._id}" class="me-md-2 p-0">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </a>
                                <button class="btn btn-link btn-delete p-0" data-id="${task._id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clipboard2-x" viewBox="0 0 16 16">
                                        <path d="M9.5 0a.5.5 0 0 1 .5.5.5.5 0 0 0 .5.5.5.5 0 0 1 .5.5V2a.5.5 0 0 1-.5.5h-5A.5.5 0 0 1 5 2v-.5a.5.5 0 0 1 .5-.5.5.5 0 0 0 .5-.5.5.5 0 0 1 .5-.5h3Z"/>
                                        <path d="M3 2.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 0 0-1h-.5A1.5 1.5 0 0 0 2 2.5v12A1.5 1.5 0 0 0 3.5 16h9a1.5 1.5 0 0 0 1.5-1.5v-12A1.5 1.5 0 0 0 12.5 1H12a.5.5 0 0 0 0 1h.5a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-12Z"/>
                                        <path d="M8 8.293 6.854 7.146a.5.5 0 1 0-.708.708L7.293 9l-1.147 1.146a.5.5 0 0 0 .708.708L8 9.707l1.146 1.147a.5.5 0 0 0 .708-.708L8.707 9l1.147-1.146a.5.5 0 0 0-.708-.708L8 8.293Z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `
        }).join('');
        taskList.innerHTML = templates;
    } catch (error) {
        console.log(error);
    }
}

getAllTasks();

async function sendForm() {
    try {
        const dataForm = Object.fromEntries(new FormData(form).entries());
        const response = await fetch('/api/v1/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForm)
        });
        const data = await response.json();
        console.log(data);
        getAllTasks();
    } catch (error) {
        console.log(error);
    }
}

async function deleteTask(el) {
    if(el.parentElement.classList.contains('btn-delete')) {
        const id = el.parentElement.dataset.id;
        try {
            const response = await fetch(`/api/v1/tasks/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            console.log(data);
            getAllTasks();
        } catch (error) {
            console.log(error);
        }
    }
}

// Listeners
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendForm();
});

taskList.addEventListener('click', (e) => deleteTask(e.target)); 