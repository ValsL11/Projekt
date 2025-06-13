let tasks = [];
let columns = [];
let reminderSortOrder = 'oldestFirst';

const taskStatuses = {
  active: 'aktywne',
  finished: 'ukończone',
};

const mainBoardElement = document.querySelector('.main-board');
const boardColumnsContainer = document.querySelector('.board-columns');
const addNewColumnButtonGlobal = document.querySelector('.add-new-column-btn');
const completedTasksListContainer = document.querySelector(
  '#completedTasksList',
);
const activeTasksCountDisplayElement = document.querySelector(
  '#activeTasksCountDisplay',
);
