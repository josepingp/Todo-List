const ul = document.querySelector('.task-list');
const addBtn = document.querySelector('#add-task');
const selector = document.querySelector('#selector');
let id = 0;

document.addEventListener('DOMContentLoaded', recharge());

addBtn.addEventListener('click', (Element) => {
    
    Element.preventDefault();
    
    if (document.querySelector('#task-box').value) {
        addTask();
        saveTask();
        id++;
    };
});

ul.addEventListener('click', (element) => {
    element.target.classList.toggle('checked');
    
    saveChangeAtribute(element.target)
});

selector.addEventListener('change', filter) 

/* funcion para añadir tareas */
function addTask() {
    const li = document.createElement('li');
    const span = document.createElement('span');
    const text = document.querySelector('#task-box').value

    span.textContent = text;
    li.appendChild(span);
    li.setAttribute('id', id);
    li.appendChild(delBtn());
    ul.appendChild(li);
    document.querySelector('#task-box').value = '';
};

/* Funcion para crear boton de borrar */
function delBtn() {
    const delBtn = document.createElement('button');
    delBtn.textContent = 'x';
    delBtn.classList.add('del-btn')

    /* event lisener para borrar y asi implementa el boton con la funcionalidad */
    delBtn.addEventListener('click', (element) => {
        const pointer = element.target.parentElement;
        const id = element.target.parentElement.getAttribute('id');

        localStorage.removeItem(id);
        ul.removeChild(pointer);
    });

    return delBtn;
};

/*Funcion para guardar tareas en el storage  */
function saveTask() {
    let taskToSave = document.querySelector('.task-list').lastChild;
    let checker = document.querySelector('.task-list').lastChild.classList.contains('checked');

    localStorage.setItem(taskToSave.id, [taskToSave.firstChild.textContent, checker]);
};

/* Funcion para Guardar el atributo checked en el local storage */
function saveChangeAtribute(task) {
    let taskToSave = task;
    let checker = task.classList.contains('checked');
    let id = task.getAttribute('id')
    if (id) localStorage.setItem(id, [taskToSave.firstChild.textContent, checker]);
};

/* Recuperar el local storage */
function getStorage() {
    let keyList = [];
    let taskList = [];

    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index);
        keyList.unshift(key);
        taskList.unshift(localStorage.getItem(key));
    };

    return [keyList, taskList];
};

/* Recargar el storage en el HTML */
function recharge() {

    let list = getStorage();
    let keyList = list[0];
    let taskList = list[1];
    
    for (const i in taskList) {
        const li = document.createElement('li');
        li.textContent = taskList[i].split(',')[0];
        li.appendChild(delBtn());
        li.setAttribute('id', keyList[i]);
        if (taskList[i].split(',')[1] == 'true') li.classList.add('checked');
        ul.appendChild(li);
    }
    id = ul.lastChild.getAttribute('id');
    id++;
    selector.value = 'All';
};

/* Funcion para filtrar las tareas */
function filter(element) {
    const taskList = ul.childNodes;

    taskList.forEach((t) => {
        switch(element.target.value) {
            case 'All':
                t.style.display = 'flex';
                console.log(t.style)
                break;
            case 'Completed':
                if (t.classList.contains('checked')) {
                    t.style.display = 'flex';
                }
                else{
                    t.style.display = 'none';
                }
                break;
            default:
                if (t.classList.contains('checked')) {
                    t.style.display = 'none';
                }
                else{
                    t.style.display = 'flex';
                }
                break;
        }
    });
}; 