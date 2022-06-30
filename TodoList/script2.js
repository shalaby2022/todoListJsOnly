const container = document.getElementById('container');
let input = document.querySelector('#input');
const form = document.getElementById('form');
let tasks = [];


/* -------------------------------------------------------------------------- */
/*                          submting & creating object                          */
/* -------------------------------------------------------------------------- */
form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const newTask = {
        name:input.value,
        id:Math.floor((Math.random() *1000 +1)),
        parent:1
    }
    tasks.push(newTask) 
    appendElementTOSection()
})

container.addEventListener('dragover',(e)=>{
    e.preventDefault()
})

container.addEventListener('drop',(e)=>{
    const currentDraggedElement = document.getElementById(e.dataTransfer.getData('text'))
        if(currentDraggedElement){
            if(!!e.target.getAttribute('id') && e.target.getAttribute('class') === 'tasksSection'){
                const getTask = tasks.find(task => +task.id === +currentDraggedElement.id)
                getTask.parent = +e.target.id
                e.target.append(currentDraggedElement);
        }
    }
    localStorage.setItem('tasks',JSON.stringify(tasks))
        e.preventDefault();    
})

const appendElementTOSection = ()=>{
    localStorage.setItem('tasks',JSON.stringify(tasks)) // storage el tasks
    for ( let i = 0 ; i < tasks.length ; i++){ 
        if(!document.getElementById(tasks[i].id)){  // search for element contain id task index 1
            let task = document.createElement('li') // create
            task.setAttribute('id',tasks[i].id) // id 
            task.setAttribute('draggable',true) // drage 
            task.addEventListener('dragstart',(e)=>{ // lisiner
                e.dataTransfer.setData('text',e.target.id)  
            })
            task.innerHTML = tasks[i].name // task name inner 
            let parentElement = document.getElementById(tasks[i].parent) // search ul contain 1
            parentElement.appendChild(task)
        }
    }
    console.log(tasks)
}

(function (){
    let oldTasks = localStorage.getItem('tasks')
if(oldTasks){
    tasks = JSON.parse(oldTasks);
    appendElementTOSection()
}
})()


