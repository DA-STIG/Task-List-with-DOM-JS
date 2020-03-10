// Define UI Vars

//getting the form by its class
// getting the task lists
//getting the clear button
//grab task filter
//getting the task

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

//DOM Load Event - for the function to add tasks to Local Storage
//now that the task is stored in Local Storage we need to display it inside the ul- -we need another func and an event to be called
//DOM Load Event
document.addEventListener('DOMContentLoaded', getTasks); //event that is called after the DOM is loaded -calling getTasks func()

// Load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);

  //Remove task event
  taskList.addEventListener('click', removeTask);

  //we want to clear task when press Clear task -all go away-
  //we need another eventListener
  //Clear Task  event
  clearBtn.addEventListener('click', clearTasks);

  //Filter Tasks event -filter the tasks
  filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage LS
function getTasks() {
  //we initialize tasks - check if is anything inside -if empty set it to empty arr- -if has data -set it to what is inside -and then we want to loop through the tasks that are there

  let tasks;
  //we need to check local storage if there are any tasks inside
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Local storage can only store strings -so we need to parase it as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    //we create the DOM el - we do this for each task

    // Create li element
    const li = document.createElement('li');
    // Add class
    li.className = 'collection-item';
    //create textNode and append to li
    //the text node is the taskInput.value content
    li.appendChild(document.createTextNode(task)); //instead of taskInput.value we provide the task from the func param
    // Create new link element
    const link = document.createElement('a');
    //add class to link a
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    //append the new li to ul - that is taskList
    taskList.appendChild(li);
  });
}

//we need to put the event listener -but we have multiple tasks -each have a delete class-and they are dynamic - meaning we will add more -we need to use event delegation -so we need to put the eventListener on the task list itself- on to the ul

// Add Task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  }

  //when we add a task - we create a new li item
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'collection-item';
  //create textNode and append to li
  //the text node is the taskInput.value content
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  //add class to link a
  link.className = 'delete-item secondary-content';
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  //append the new li to ul - that is taskList
  taskList.appendChild(li);

  //we want to persist the data to local storage -to stay after we add the data
  //for now data goes away on reload
  //LocalStorage is part of JS
  //Store in Local Storage
  storeTaskinLocalStorage(taskInput.value); //we provide the task that comes from taskInput.value

  // Clear input
  taskInput.value = '';

  e.preventDefault(); //avoid form submit default
}

//Store Task - adding the tasks to Local Storage
function storeTaskinLocalStorage(task) {
  let tasks;
  //we need to check local storage if there are any tasks inside
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    // Local storage can only store strings -so we need to parase it as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task); //we add the task(the paramater) to the array-
  localStorage.setItem('tasks', JSON.stringify(tasks)); // we add the task to local Storage -tasks needs to be a string -to be able to add it
  //now that the task is stored in Local Storage we need to display it inside the ul- -we need another func and an event to be called
}

//function Remove Task
function removeTask(e) {
  // console.log(e.target); //click anywhere inside the ul - we want to target the delete-item-the link -for the x to remove the li -
  //for now when we click x - we get the <i> icon -we want its parent the <a>  that has the delete-item class : target.parentElement if it cotains the class delete-item
  //when we click on x we want the <i> parent -and that is the <a> -and the parent or <a> is the li -that we want to remove : e.target.parentElement.parentElement = li

  if (e.target.parentElement.classList.contains('delete-item')) {
    // console.log(e.target);
    //we want a confirmation before del
    if (confirm('Are u sure u want to del item? ')) {
      e.target.parentElement.parentElement.remove();

      //Remove from ls  - we have tasked stored now in Local Storage LS - we need to remove those we click x on -not to re-appear on reload
      //Remove tasks from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement); //we have to pass in the el that is the li =  e.target.parentElement.parentElement
    }
  }
}

//Remove tasks from Local Storage Ls  -function [-when click x ]
function removeTaskFromLocalStorage(taskItem) {
  // console.log(taskItem);
  //we need to check Local Storage - put it into a var -

  let tasks;
  //we need to check local storage if there are any tasks inside
  if (localStorage.getItem('tasks' === null)) {
    tasks = [];
  } else {
    // Local storage can only store strings -so we need to parase it as JSON
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index) {
    //check if taskItem text content -that is the text of the task [ li] -
    //if it = the current task in the itteration - the one we want to remove
    //we use the index
    if (taskItem.textContent === task) {
      tasks.splice(index, 1); //remove one el at the index
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks)); //we put the new arr -without the el we remove in the local storage
}

//Clear Tasks
function clearTasks(e) {
  // taskList.innerHTML = '';// one way is setting InnerHtml to empty

  // or loop with a while loop and then remove each one
  //Faster : https://jsperf.com/innerhtml-vs-removechild/47
  //firstChild is getting the first el in the task list
  //so saying while there is something in the list

  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //Clear tasks form Local Storage
  clearTasksFromLocalStorage();
}

//Clear Tasks from Local Storage LS function()
function clearTasksFromLocalStorage() {
  localStorage.clear(); //clears all the tasks -li - in the Local storage
}

//if there's still a child left..meaning there are still tasks we remove the task./that child

//Filter Tasks
function filterTasks(e) {
  //we need to get  the input for filter -based on keyup
  const text = e.target.value.toLowerCase(); //lowerCase to match it correctly

  //we get all the list items  by their class
  //and loop through them - [we can because querySelectorAll returns a node list ]
  document.querySelectorAll('.collection-item ').forEach(function(task) {
    const item = task.firstChild.textContent; //we want the content of the firstChild
    if (item.toLowerCase().indexOf(text) !== -1) {
      //-1 is no match
      task.style.display = 'block';
    } else {
      //no match so we want to hide it
      task.style.display = 'none';
    }
  });
}
