const saveColumns = () => {
  localStorage.setItem('columns', JSON.stringify(columns));
};

const loadColumns = () => {
  const storedColumns = localStorage.getItem('columns');

  if (storedColumns) {
    columns = JSON.parse(storedColumns);
    return;
  }

  if (mainBoardElement) {
    columns = [
      { id: 'col-' + Date.now(), name: 'HOME', headerColor: '#4CAF50' },
    ];

    saveColumns();
    return;
  }

  columns = [];
};

const deleteColumnAndItsTasks = (columnId) => {
  columns = columns.filter((col) => col.id !== columnId);
  saveColumns();

  tasks = tasks.filter((task) => task.columnId !== columnId);
  saveTasks();

  renderAllColumns();
};

const renderColumn = (column) => {
  const columnElement = document.createElement('section');
  columnElement.classList.add('board-column');
  columnElement.setAttribute('data-column-id', column.id);

  const headerElement = document.createElement('header');
  headerElement.classList.add('column-header');
  headerElement.style.backgroundColor = column.headerColor;

  const titleElement = document.createElement('h3');
  titleElement.textContent = column.name;

  const deleteColumnButton = document.createElement('button');
  deleteColumnButton.classList.add('delete-column-btn');
  deleteColumnButton.innerHTML = '&#x1F5D1;';
  deleteColumnButton.setAttribute('aria-label', 'Usuń kolumnę');
  deleteColumnButton.addEventListener('click', () => {
    if (
      confirm(
        `Czy na pewno chcesz usunąć kolumnę "${column.name}" i wszystkie jej zadania?`,
      )
    ) {
      deleteColumnAndItsTasks(column.id);
    }
  });

  headerElement.appendChild(titleElement);
  headerElement.appendChild(deleteColumnButton);

  const tasksListElement = document.createElement('div');
  tasksListElement.classList.add('tasks-list');

  const addNewTaskButton = document.createElement('button');
  addNewTaskButton.classList.add('add-new-task');
  addNewTaskButton.textContent = '+ Add new';
  addNewTaskButton.addEventListener('click', () => {
    const taskText = prompt(
      `Wpisz treść nowego zadania dla kolumny "${column.name}":`,
    );
    if (taskText && taskText.trim() !== '') {
      const newTask = {
        id: 'task-' + Date.now(),
        text: taskText.trim(),
        status: 'aktywne',
        columnId: column.id,
        createdAt: new Date().toISOString(), // data utworzenia
      };

      tasks.push(newTask);

      saveTasks();
      renderAllTasksOnBoard();
    }
  });

  columnElement.appendChild(headerElement);
  columnElement.appendChild(tasksListElement);
  columnElement.appendChild(addNewTaskButton);
  boardColumnsContainer.appendChild(columnElement);
};

const renderAllColumns = () => {
  boardColumnsContainer.innerHTML = '';

  if (!columns.length) {
    mainBoardElement.classList.add('no-columns-present');
    return;
  }

  mainBoardElement.classList.remove('no-columns-present');
  columns.forEach((column) => renderColumn(column));

  renderAllTasksOnBoard();
};
