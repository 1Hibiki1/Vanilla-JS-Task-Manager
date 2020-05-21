const form = document.querySelector('form');
const input = document.querySelector('.validate'); 
const taskListElement = document.querySelector('.task-list');

let taskList = [];

let newTaskName = '';

input.addEventListener('keyup', e => {
    newTaskName = e.target.value;
});

taskListElement.addEventListener('click', e => {
    if(e.target.classList.contains('close-button')){
        const index = taskList.indexOf(e.target.parentElement.childNodes[0].childNodes[0].wholeText);
        const store = JSON.parse(localStorage.getItem('tasks'));
        if(store.length === 1) taskListElement.innerHTML = "<p style='color: #999; text-align: center; font-style: italic;'>Wow, such empty <span style='font-style: normal'>༼☯﹏☯༽</span></p>";
        taskList.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        taskListElement.removeChild(e.target.parentElement);
    }
    if(e.target.classList.contains('task-list-item')){
        e.target.classList.toggle('task-done');
        e.target.children[0].classList.toggle('strthrough');
    }
    if(e.target.classList.contains('task-text')){
        e.target.parentElement.classList.toggle('task-done');
        e.target.classList.toggle('strthrough');
    }
});

class Task{
    constructor(name){
        const item = document.createElement('li');
        item.className = 'task-list-item';

        const itemName = document.createElement('p');
        itemName.appendChild(document.createTextNode(name));
        itemName.className = 'task-text';

        item.appendChild(itemName);

        const closeBtn = document.createElement('button');
        closeBtn.appendChild(document.createTextNode('×'));
        closeBtn.className = 'close-button';

        item.appendChild(closeBtn);

        return item;
    }
}

form.addEventListener('submit', e => {
    const store = JSON.parse(localStorage.getItem('tasks')) || [];
    if(store.length === 0) taskListElement.innerHTML = '';
    e.preventDefault();
    if(newTaskName.replace(/\s/g, '') === ''){
        alert("Task name cannot be empty! :)");
        return;
    }
    if(taskList.indexOf(newTaskName) !== -1){
        alert("Task is already added! ;)");
        input.value = '';
        return;
    }
    addTaskToList(newTaskName);
    input.value = '';
    localStorage.setItem('tasks', JSON.stringify(taskList));
});

function addTaskToList(n){
    const li = new Task(n);
    taskList.push(n);
    taskListElement.appendChild(li);
}

const stored = JSON.parse(localStorage.getItem('tasks')) || [];
if(stored.length > 0){
    stored.forEach(el => {
        addTaskToList(el);
    });
}else{
    taskListElement.innerHTML = "<p style='color: #999; text-align: center; font-style: italic;'>Wow, such empty <span style='font-style: normal'>༼☯﹏☯༽</span></p>";
}
