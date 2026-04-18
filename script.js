const tasksSection = document.querySelector('.task-section');

const savedTasks = JSON.parse(localStorage.getItem('tasks'))

let tasks;

if (savedTasks) {
  tasks = savedTasks; 
} else {
  tasks = [];
}

export function renderTasks(enableDeleteButtons, enableCheckboxFunctions) {
  let tasksHTML = '';
  let taskTextClass;

  if (tasks.length !== 0) {
    tasks.forEach((task) => {
      if (task.status === 'checked') {
        taskTextClass = 'checked'
      } else {
        taskTextClass = '';
      }

      tasksHTML += `
        <div class="task">
          <input type="checkbox" ${task.status} class="tick-ticked" data-c-index="${task.index}">
          <p id="task-text${task.index}" class="${taskTextClass}">${task.info}</p>
          <button class="delete-button" data-index="${task.index}">×</button>
        </div>
      `;

      tasksSection.innerHTML = tasksHTML;

      
    });
  } else {
    tasksSection.innerHTML = '';
  }


  enableDeleteButtons();

  enableCheckboxFunctions();
}

export function addDeleteButtonEventListeners() {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const buttonIndex = Number(button.dataset.index);
      
      tasks.forEach((task, taskindex) => {
        if (task.index === buttonIndex) {        
          tasks.splice(taskindex, 1);
          renderTasks(addDeleteButtonEventListeners, enableCheckboxFunctions)
        }
      })

      saveToStorage();
    })
  })
}

export function enableAddButton() {
  const addButton = document.querySelector('.add-button');
  
  addButton.addEventListener('click', displayNewTask);
  document.body.addEventListener('keydown', (key) => {
    if (key.key === 'Enter') {
      displayNewTask();
    }
  })
  
  function displayNewTask() {
    const enteredTask = document.querySelector('.task-input').value;

    if (enteredTask !== '') {
      tasks.push(  {
        status: '',
        info: enteredTask,
        index: tasks.length + 1
      });

      document.querySelector('.task-input').value = "";

      renderTasks(addDeleteButtonEventListeners, enableCheckboxFunctions);
    }

    tasksSection.scrollTop = tasksSection.scrollHeight

    saveToStorage();
  }
}

export function enableCheckboxFunctions() {
  const checkboxes = document.querySelectorAll('.tick-ticked');
  
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('click', () => {
      const checkboxIndex = Number(checkbox.dataset.cIndex);
      
      tasks.forEach((task) => {
        if (task.index === checkboxIndex) {
          if (checkbox.checked) {
            task.status = 'checked';
            renderTasks(addDeleteButtonEventListeners, enableCheckboxFunctions)
          } else {
            task.status = '';
            renderTasks(addDeleteButtonEventListeners, enableCheckboxFunctions)
          }
        }
      })

      saveToStorage();
    })
  })
}

function saveToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}