const todoInput = document.querySelector('#task-input');
const addBtn = document.querySelector('#add-task');
const filters = document.querySelectorAll('.filter-buttons button');
const deleteAll = document.querySelector('#delete-all-btn');
const taskListContainer = document.querySelector('.task-list');

let tasks = [];

function renderTasks(filter = 'all') {
    taskListContainer.innerHTML = '';

    tasks.forEach((task, index) => {
        if (filter === 'all' || (filter === 'complete' && task.completed) || (filter === 'incomplete' && !task.completed)) {
            const taskElement = document.createElement('div');
            taskElement.classList.add('task');
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskElement.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <div class="task-actions">
                    <i class="fa fa-check-circle" data-action="complete" data-index="${index}"></i>
                    <i class="fa fa-trash" data-action="delete" data-index="${index}"></i>
                </div>
            `;
            taskListContainer.appendChild(taskElement);
        }
    });
}

addBtn.addEventListener('click', () => {
    const taskText = todoInput.value.trim();
    if (taskText) {
        tasks.push({ text: taskText, completed: false });
        todoInput.value = '';
        renderTasks();
    }
});

taskListContainer.addEventListener('click', (e) => {
    if (e.target.dataset.action === 'complete') {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    } else if (e.target.dataset.action === 'delete') {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
    }
});

filters.forEach((filter) => {
    filter.addEventListener('click', () => {
        filters.forEach((f) => f.classList.remove('active'));
        filter.classList.add('active');
        const filterValue = filter.id.split('-')[0];
        renderTasks(filterValue);
    });
});

deleteAll.addEventListener('click', () => {
    tasks = [];
    renderTasks();
});

renderTasks();
