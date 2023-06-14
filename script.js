// Função para adicionar uma nova tarefa à lista
function newTask(taskInput, taskList) {
  // Verifica se o campo de entrada de tarefa está vazio
  if (taskInput.value.trim() === '') {
    taskInput.classList.add('error');
    return;
  }

  // Remove a classe de erro, caso exista
  taskInput.classList.remove('error');

  // Cria um novo item de lista
  const listItem = document.createElement('li');
  listItem.textContent = taskInput.value;

  // Cria o botão "Excluir" para remover a tarefa
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
  `;

  deleteButton.addEventListener('click', () => {
    listItem.remove();
    saveTasks();
  });

  // Adiciona o botão de exclusão ao item de lista
  listItem.appendChild(deleteButton);

  // Adiciona o item de lista à lista de tarefas
  taskList.appendChild(listItem);

  // Limpa o campo de entrada de tarefa
  taskInput.value = '';

  // Salva as tarefas no armazenamento local
  saveTasks();
}

// Função para carregar as tarefas salvas do armazenamento local
function loadTasks() {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    const taskLists = document.querySelectorAll('.todolist');
    const tasks = JSON.parse(savedTasks);
    taskLists.forEach((taskList, index) => {
      taskList.innerHTML = '';
      tasks[index].forEach((task) => {
        const listItem = document.createElement('li');
        listItem.textContent = task.name;
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
          </svg>
        `;

        deleteButton.addEventListener('click', () => {
          listItem.remove();
          saveTasks();
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
      });
    });
  }
}

// Função para salvar as tarefas no armazenamento local
function saveTasks() {
  const taskLists = document.querySelectorAll('.todolist');
  const tasks = [];
  taskLists.forEach((taskList) => {
    const taskItems = Array.from(taskList.querySelectorAll('li'));
    const taskListData = taskItems.map((taskItem) => {
      return {
        name: taskItem.textContent
      };
    });
    tasks.push(taskListData);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Função para inicializar a aplicação
function init() {
  const taskInputs = document.querySelectorAll('.new-task');
  const addTaskButtons = document.querySelectorAll('.btn-new-task');
  const taskLists = document.querySelectorAll('.todolist');

  addTaskButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      newTask(taskInputs[index], taskLists[index]);
    });
  });

  // Adiciona o evento de tecla para o campo de entrada de tarefa
  taskInputs.forEach((input, index) => {
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault(); // Evita o envio padrão do formulário
        newTask(input, taskLists[index]);
      }
    });
  });

  loadTasks();
}


init();