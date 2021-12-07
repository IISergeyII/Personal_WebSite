const input = document.querySelector('#todo-table-input');
const inputButton = document.querySelector('#todo-table-input-button');
const tasks_list = document.querySelector('#todo-table-list');

function getStorage() {
    let todoTableStorage = localStorage.getItem('todo-table');
    if (todoTableStorage == null) {
        localStorage.setItem('todo-table', JSON.stringify({}));
    }
    todoTableStorage = JSON.parse(localStorage.getItem('todo-table'));
    return todoTableStorage;
}

function addToStorage(id, task) {
    const todoTableStorage = getStorage();
    todoTableStorage[id] = task;
    localStorage.setItem('todo-table', JSON.stringify(todoTableStorage));
}

function removeFromStorageById(id) {
    const todoTableStorage = getStorage();
    delete todoTableStorage[id];
    localStorage.setItem('todo-table', JSON.stringify(todoTableStorage));
}


function newListItem(id, content) {
    const div_elem = document.createElement('div');
    div_elem.setAttribute('todo-id', id);

    const span_elem = document.createElement('span');
    span_elem.innerText = content;

    div_elem.appendChild(span_elem);
    div_elem.innerHTML +=  "<a class=\"todo-table-delete\">\n" +
        "   <div class=\"fa fa-times\"></div>\n" +
        "</a>";

    div_elem.querySelector('.todo-table-delete').onclick = function() {
        const elem_to_delete = document.querySelector('[todo-id="' + id + '"]');
        elem_to_delete.parentElement.removeChild(elem_to_delete);
        removeFromStorageById(id);
    };

    return div_elem;
}

function addNewItem() {
    if (input.value !== "") {
        tasks_list.appendChild(newListItem(+ new Date(), input.value))
        addToStorage(+ new Date(), input.value);
        input.value = "";
    }
}


document.querySelector("#todo-table-form").addEventListener('submit', event => {
    addNewItem(event);
    return false;
});

inputButton.onclick = addNewItem;

const todoTableStorage = getStorage();
for (const i in todoTableStorage) {
    tasks_list.appendChild(newListItem(i, todoTableStorage[i]))
}