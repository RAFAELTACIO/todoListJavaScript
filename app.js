// let bank = [
//     {'task': 'ESTUDAR JS','status': ''},
//     {'task': 'netflix', 'status': 'checked'}
// ];



const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));

const createItem = (task, status, indice) =>{
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
                    <input type="checkbox" ${status} data-indice=${indice}>
                    <div>${task}</div>
                   <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const renderScreen = () => {
    cleanTasks();
    const bank = getBank();
    bank.forEach((item, indice) => createItem(item.task, item.status, indice));
}
const addTask = (evento) => {
    const tecla = evento.key;
    const text = evento.target.value
    if (tecla === 'Enter'){
        const bank = getBank();
        bank.push({'task': text, 'status': ''})
        setBank(bank);
        renderScreen();
        evento.target.value = '';
    }
}

const removeItem = (indice) => {
    const bank = getBank();
    bank.splice(indice,1);
    setBank(bank);
    renderScreen();
}

const renderitem = (indice) => {
    const bank = getBank();
    bank[indice].status = bank[indice].status === '' ? 'checked' : '';
    setBank(bank);
    renderScreen();
}

const clickItem = (evento) => {
    const elementHtml = evento.target;
    if (elementHtml.type === 'button'){
        const indice = elementHtml.dataset.indice;
        removeItem(indice);
    }else if (elementHtml.type === 'checkbox'){
        const indice = elementHtml.dataset.indice;
        renderitem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', addTask);
document.getElementById('todoList').addEventListener('click', clickItem);

renderScreen();