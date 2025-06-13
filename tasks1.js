const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayGlobalReminders();
};

const loadTasks = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
};

const renderTaskCardOnBoard = (task) => {
  const columnTasksList = boardColumnsContainer.querySelector(
    `.board-column[data-column-id="${task.columnId}"] .tasks-list`,
  );

  if (!columnTasksList) return;

  const taskCard = document.createElement('article');
  taskCard.classList.add('task-card');
  taskCard.setAttribute('data-task-id', task.id);

  const paragraph = document.createElement('p');
  paragraph.classList.add('task-text');
  paragraph.textContent = task.text;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('task-card-buttons');

  const completeButton = document.createElement('button');
  completeButton.classList.add('task-action-btn', 'complete-btn');
  completeButton.innerHTML = '&#x2713;';
  completeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    markTaskAsCompleted(task.id);
  });

  const editButton = document.createElement('button');
  editButton.classList.add('task-action-btn', 'edit-btn');
  editButton.innerHTML = '&#x270E;';
  editButton.addEventListener('click', (e) => {
    e.stopPropagation();
    editTaskTextOnBoard(task.id);
  });

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('task-action-btn', 'delete-btn');
  deleteButton.innerHTML = '&#x2715;';
  deleteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    deleteTask(task.id);
  });

  buttonsContainer.appendChild(completeButton);
  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(deleteButton);
  taskCard.appendChild(paragraph);
  taskCard.appendChild(buttonsContainer);
  columnTasksList.appendChild(taskCard);
};

const renderAllTasksOnBoard = () => {
  document
    .querySelectorAll('.board-columns .tasks-list')
    .forEach((list) => (list.innerHTML = ''));
  tasks
    .filter((task) => task.status === taskStatuses.active)
    .forEach((task) => renderTaskCardOnBoard(task));
};

const markTaskAsCompleted = (taskId) => {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) return;

  tasks[taskIndex].status = taskStatuses.finished;
  tasks[taskIndex].completedAt = new Date().toISOString();

  saveTasks();

  mainBoardElement && renderAllTasksOnBoard();
  completedTasksListContainer && renderCompletedTasksPage();
};

const editTaskTextOnBoard = (taskId) => {
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex === -1) {
    console.error('Nie znaleziono zadania do edycji.');
    return;
  }

  const currentText = tasks[taskIndex].text;
  const newText = prompt('Edytuj treść zadania:', currentText);

  if (
    newText !== null &&
    newText.trim() !== '' &&
    newText.trim() !== currentText
  ) {
    tasks[taskIndex].text = newText.trim();
    saveTasks();
    renderAllTasksOnBoard();
  } else if (newText === null) {
    console.log('Edycja anulowana.');
  }
};

const deleteTask = (taskId) => {
  if (confirm('Czy na pewno chcesz usunąć to zadanie?')) {
    tasks = tasks.filter((t) => t.id !== taskId);

    saveTasks();

    mainBoardElement && renderAllTasksOnBoard();
    completedTasksListContainer && renderCompletedTasksPage();
  }
};

const reactivateTask = (taskId) => {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  task.status = taskStatuses.active;
  saveTasks();

  completedTasksListContainer && renderCompletedTasksPage();
  alert('Zadanie przywrócone do aktywnych!');
};

const renderCompletedTaskCard = (task) => {
  const dateLocale = 'pl-PL';
  const dateLocaleSettings = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };

  console.log(
    'LOG (completed.html): Renderowanie karty dla ukończonego zadania:',
    task,
  );

  if (!completedTasksListContainer) return;

  const taskCard = document.createElement('article');
  taskCard.classList.add('task-card', 'completed-task-card');
  taskCard.setAttribute('data-task-id', task.id);

  const paragraph = document.createElement('p');
  paragraph.classList.add('task-text');
  paragraph.style.textDecoration = 'line-through';
  paragraph.textContent = task.text;

  const datesContainer = document.createElement('div');
  datesContainer.classList.add('task-dates');

  if (task.createdAt) {
    const createdAtDate = new Date(task.createdAt);
    const createdAtElement = document.createElement('p');

    createdAtElement.classList.add('task-date-created');
    createdAtElement.textContent = `Utworzono: ${createdAtDate.toLocaleDateString(
      dateLocale,
      dateLocaleSettings,
    )}`;

    datesContainer.appendChild(createdAtElement);
  }

  if (task.completedAt) {
    const completedAtDate = new Date(task.completedAt);
    const completedAtElement = document.createElement('p');

    completedAtElement.classList.add('task-date-completed');
    completedAtElement.textContent = `Ukończono: ${completedAtDate.toLocaleDateString(
      dateLocale,
      dateLocaleSettings,
    )}`;

    datesContainer.appendChild(completedAtElement);
  }

  const buttonsContainer = document.createElement('div');
  buttonsContainer.classList.add('task-card-buttons');

  const reactivateBtn = document.createElement('button');
  reactivateBtn.classList.add('task-action-btn', 'reactivate-btn');
  reactivateBtn.innerHTML = '&#x1F504;';
  reactivateBtn.setAttribute('aria-label', 'Przywróć zadanie');
  reactivateBtn.addEventListener('click', () => {
    reactivateTask(task.id);
  });

  const permanentDeleteBtn = document.createElement('button');
  permanentDeleteBtn.classList.add('task-action-btn', 'delete-btn');
  permanentDeleteBtn.innerHTML = '&#x1F5D1;';
  permanentDeleteBtn.setAttribute('aria-label', 'Usuń trwale');
  permanentDeleteBtn.addEventListener('click', () => {
    deleteTask(task.id);
  });

  buttonsContainer.appendChild(reactivateBtn);
  buttonsContainer.appendChild(permanentDeleteBtn);

  taskCard.appendChild(paragraph);
  taskCard.appendChild(datesContainer);
  taskCard.appendChild(buttonsContainer);

  completedTasksListContainer.appendChild(taskCard);
};

const renderCompletedTasksPage = () => {
  console.log('LOG (completed.html): Wywołano renderCompletedTasksPage');

  if (!completedTasksListContainer) return;

  completedTasksListContainer.innerHTML = '';

  const completed = tasks.filter(
    (task) => task.status === taskStatuses.finished,
  );

  console.log(
    'LOG (completed.html): Zadania odfiltrowane jako "ukończone":',
    completed,
  );

  if (!completed.length) {
    console.log(
      'LOG (completed.html): Brak zadań o statusie "ukończone" do wyświetlenia.',
    );

    completedTasksListContainer.innerHTML = '<p>Brak ukończonych zadań.</p>';
    return;
  }

  completed.forEach((task) => renderCompletedTaskCard(task));
};
