if (activeTasksCountDisplayElement) {
  console.log(
    'LOG (index.html): Start logiki dla index.html - znaleziono activeTasksCountDisplayElement.',
  );

  if (!tasks.length) {
    console.log(
      'LOG (index.html): Tablica tasks jest pusta, wywołuję loadTasks().',
    );
    loadTasks();
  } else {
    console.log(
      'LOG (index.html): Tablica tasks zawiera już dane lub loadTasks() nie jest potrzebne/dostępne w ten sposób.',
    );
  }

  const activeTasks = tasks.filter(
    (task) => task.status === taskStatuses.active,
  );

  console.log(
    'LOG (index.html): Liczba aktywnych zadań do wyświetlenia:',
    activeTasks.lengths,
  );

  activeTasksCountDisplayElement.textContent = activeTasks.length;
  displayGlobalReminders();
}
