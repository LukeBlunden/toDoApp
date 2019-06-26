const incompleteSection = document.querySelector("#incompleteSection");
const completeSection = document.querySelector("#completeSection");
const submit = document.querySelector("#submit");

document.querySelector("#inputForm").addEventListener("submit", addToDo);

function fetchBoth(){
    fetchIncompleteList();
    fetchCompleteList();
}

function addToDo(e){
    e.preventDefault();
    let toDo = document.querySelector("#toDo").value;

    let task = {
        taskValue: toDo
    }

    if (localStorage.getItem("incompleteList") === null){
        let incompleteList = [];
        incompleteList.push(task);
        localStorage.setItem("incompleteList", JSON.stringify(incompleteList));
    } else {
        let incompleteList = JSON.parse(localStorage.getItem("incompleteList"));
        incompleteList.push(task);
        localStorage.setItem("incompleteList", JSON.stringify(incompleteList));
    }

    document.querySelector("#inputForm").reset();

    // fetchIncompleteList();
    newIncomplete();
}

function taskFinished(toDoItem){
    let incompleteList = JSON.parse(localStorage.getItem("incompleteList"));
    let completeTask = "";
    incompleteList.forEach(task => {
        if(task.taskValue === toDoItem){
            completeTask = incompleteList.splice(incompleteList.indexOf(task), 1);
        }
    })
    localStorage.setItem("incompleteList", JSON.stringify(incompleteList));

    if (localStorage.getItem("completeList") === null){
        let completeList = completeTask;
        localStorage.setItem("completeList", JSON.stringify(completeList));
    } else {
        let completeList = JSON.parse(localStorage.getItem("completeList"));
        completeList = completeList.concat(completeTask);
        localStorage.setItem("completeList", JSON.stringify(completeList));
    }
    
    const div = document.createElement("div");
    div.innerHTML = `<h3>${toDoItem}</h3>
        <div class="buttons">
            <input class="delete button" onclick="deleteTask(\'${toDoItem}\')" value="X">
            <input class="completed button" value="O">
        </div>`;
    div.classList.add("completeTask");
    completeSection.appendChild(div);
}

function fetchIncompleteList(){
    let incompleteList = JSON.parse(localStorage.getItem("incompleteList"));

    incompleteSection.innerHTML = "";

    incompleteList.forEach(task => {
        let toDoItem = task.taskValue;
        
        incompleteSection.innerHTML += `
            <div class="incompleteTask">
                <h3>${toDoItem}</h3>
                <div class="buttons">
                    <input class="delete button" onclick="deleteTask(\'${toDoItem}\')" value="X">
                    <input class="complete button" onclick="taskFinished(\'${toDoItem}\')" value="O">
                </div>
            </div>
        `;
    })
}

function newIncomplete(){
    let incompleteList = JSON.parse(localStorage.getItem("incompleteList"));

    let toDoItem = incompleteList[incompleteList.length-1].taskValue;
    const div = document.createElement("div");
    div.innerHTML = `<h3>${toDoItem}</h3>
        <div class="buttons">
            <input class="delete button" onclick="deleteTask(\'${toDoItem}\')" value="X">
            <input class="complete button" onclick="taskFinished(\'${toDoItem}\')" value="O">
        </div>`;
    div.classList.add("incompleteTask");
    incompleteSection.appendChild(div);
}

function fetchCompleteList(){
    let completeList = JSON.parse(localStorage.getItem("completeList"));

    completeSection.innerHTML = "";

    completeList.forEach(task => {
        let toDoItem = task.taskValue;
        completeSection.innerHTML += `
            <div class="completeTask">
                <h3>${toDoItem}</h3>
                <div class="buttons">
                    <input class="delete button" onclick="deleteTask(\'${toDoItem}\')" value="X">
                    <input class="completed button" value="O">
                </div>
            </div>
        `;
    })
}

document.querySelector("#sectionContainer").addEventListener("click", e => {
    deleteTaskUI(e.target);
    
})

function deleteTaskUI(el) {
    if(el.classList.contains("delete") || el.classList.contains("complete")){
        el.parentElement.parentElement.classList.add("remove");
        setTimeout(deleteIt,500);
    }
    function deleteIt(){
        el.parentElement.parentElement.remove()
    }
}

function deleteTask(toDoItem){
    let incompleteList = JSON.parse(localStorage.getItem("incompleteList"));

    incompleteList.forEach(task => {
        if(task.taskValue === toDoItem){
            incompleteList.splice(incompleteList.indexOf(task), 1);
            localStorage.setItem("incompleteList", JSON.stringify(incompleteList));
        }
    })

    let completeList = JSON.parse(localStorage.getItem("completeList"));

    completeList.forEach(task => {
        if(task.taskValue === toDoItem){
            completeList.splice(completeList.indexOf(task), 1);
            localStorage.setItem("completeList", JSON.stringify(completeList));
        }
    })
}