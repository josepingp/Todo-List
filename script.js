const ul = document.querySelector('.task-list');
const addBtn = document.querySelector('#add-task');
let id = 0;

document.addEventListener('DOMContentLoaded', recharge());

addBtn.addEventListener('click', (Element)=>{
    
    Element.preventDefault();
    
    if (document.querySelector('#task-box').value){
        saveList();
        addTask();
        id++;
    };

});





/* funcion para añadir tareas */
function addTask() {
    const li = document.createElement('li');
    const text = document.querySelector('#task-box').value
    
        li.setAttribute('id', id);
        li.textContent = text;
        li.appendChild(delBtn());
        ul.appendChild(li);
        document.querySelector('#task-box').value = '';
};


/* Funcion para crear boton de borrar */
function delBtn() {
    const  delBtn = document.createElement('button');
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
function saveList() {

    localStorage.setItem(id, document.querySelector('#task-box').value);
};

/* Recuperar el local storage */
function getStorage() {
    let keyList = [];
    let taskList = [];

    for (let index = 0; index < localStorage.length; index++) {
        let key = localStorage.key(index);
        keyList.unshift(key);    
    };

    for (const key of keyList) {
        taskList.push(localStorage.getItem(key))
    };
        
    return [keyList , taskList];
};

/* Recargar el storage en el HTML */
function recharge() {
    let list = getStorage();
    let keyList = list[0];
    let taskList = list[1];

    for (const i in taskList) {
        const li = document.createElement('li');
        li.textContent = taskList[i];
        li.appendChild(delBtn());
        li.setAttribute('id', keyList[i])
        ul.appendChild(li);
        id++
    }   
};