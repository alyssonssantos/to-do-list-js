const localStorageKey='todo-list'

function validateExistingTask(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-new-task').value
    let existing = values.find(x => x.name == inputValue)

    return !existing ? false : true

}


//add event listener to insert new task when enter is pressed
const input = document.getElementById('input-new-task');

input.addEventListener('keydown', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    newTask();
  }
});


function newTask(){
    let input = document.getElementById('input-new-task')
    input.style.border = ''
    
    //validation
    if(!input.value)
    {
        input.style.border = '1px solid red'    
        alert('Do not forget to enter your task before submitting!')
    }
    else if(validateExistingTask()){
        alert('Oops! Looks like this task is already on your list.')
    }
    else{
        //increment to logalStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey,JSON.stringify(values) )
        showValues()
    }
    input.value = ''
    
}


//Add new task when enter is pressed //



function showValues(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('todo-list')

    list.innerHTML = ''


    for(let i = 0; i < values.length; i++){
        list.innerHTML += `<li>${values[i]['name']}<button id='btn-ok' onclick='removeItem("${values[i]['name']}")'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-lg" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg></button></li>`

    }
}

function removeItem(data)
{
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index,1)
    localStorage.setItem(localStorageKey,JSON.stringify(values) )
    showValues()
}
showValues()