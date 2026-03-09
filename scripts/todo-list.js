const userInput = document.querySelector('.js-user-input');
const tasksSection = document.querySelector('.tasks-section');

const tasksList = [];

displayTasks();

function displayTasks() {
  let tasksCode = '';

  for (let i = 0; i < tasksList.length; i++) {
    const code = `
      <input type="checkbox">
      <p>${tasksList[i]}</p>
      <button class="cancel-button" onclick="
        tasksList.splice(${i}, 1);
        displayTasks()
        tasksSection.scrollTop = tasksSection.scrollHeight - tasksSection.scrollHeight;
      ">✖</button>
    `

    tasksCode += code;
  }

  tasksSection.innerHTML = tasksCode;

  userInput.value = '';

  tasksSection.scrollTop = tasksSection.scrollHeight;
}

function addTask() {
  const userInputValue = userInput.value;
  tasksList.push(userInputValue);

  displayTasks();
}

function enterToAddTask(event) {
  if (event.key === 'Enter') {
    addTask();
  }
}