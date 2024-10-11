document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    function addTask(taskText, save = true) {
        const trimmedTaskText = taskText ? taskText.trim() : taskInput.value.trim();

        if (!trimmedTaskText) {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = trimmedTaskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-btn';
        
        removeButton.onclick = () => {
            taskList.removeChild(li);
            if (save) {
                removeTaskFromStorage(trimmedTaskText);
            }
        };

        li.appendChild(removeButton);
        taskList.appendChild(li);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(trimmedTaskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = '';
    }

    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    addButton.addEventListener('click', () => addTask());
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    loadTasks();
});
