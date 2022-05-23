const taskId = document.getElementById('taskId');
const nameTask = document.getElementById('nameTask');
const completed = document.getElementById('completed');
const form = document.querySelector('form');
const submit = document.querySelector('.btn-submit');

const alertSucc = document.querySelector('.form-alert__succ');
const alertWrong = document.querySelector('.form-alert__wrong');

async function getDataTask() {
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });

    const id = params.id;

    try {
        const response = await fetch(`/api/v1/tasks/${id}`, {
            method: 'GET',
        });
        const { task } = await response.json();
        console.log(task);

        // set data to the task form
        taskId.value = task._id;
        nameTask.value = task.name;

        if(task.completed) {
            completed.setAttribute('checked','');
        }

    } catch (error) {
        console.log(error);
        submit.setAttribute('disabled','');
    }

}

getDataTask();

async function updateTask() {
    const dataForm = Object.fromEntries(new FormData(form).entries());
    const updatedTask = {
        name: dataForm.name,
        completed: dataForm.completed == 'on' ? true : false
    }

    try {
        const response = await fetch(`/api/v1/tasks/${dataForm.id}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(updatedTask)
        });

        alertWrong.classList.remove('d-block');
        alertSucc.classList.add('d-block');

        console.log(response);
    } catch (error) {
        console.log(error);
        alertSucc.classList.remove('d-block');
        alertWrong.classList.add('d-block');
    }
}

// Listeners
submit.addEventListener('click', (e) => {
    e.preventDefault();
    updateTask();
});