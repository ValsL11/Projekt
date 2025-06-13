if (completedTasksListContainer) {
  console.log('LOG (completed.html): Start logiki dla completed.html');

  loadTasks();

  console.log(
    'LOG (completed.html): Wczytana tablica tasks po loadTasks():',
    JSON.parse(JSON.stringify(tasks)),
  );

  renderCompletedTasksPage();
  displayGlobalReminders();
}
