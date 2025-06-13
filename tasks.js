if (mainBoardElement && boardColumnsContainer) {
  addNewColumnButtonGlobal?.addEventListener('click', () => {
    const columnName = prompt('Wpisz nazwę nowej kolumny:');

    if (columnName && columnName.trim() !== '') {
      const columnColor = prompt(
        'Wpisz kolor nagłówka (np. #FF0000 lub red):',
        '#4CAF50',
      );

      if (columnColor && columnColor.trim() !== '') {
        const newColumn = {
          id: 'col-' + Date.now(),
          name: columnName.trim(),
          headerColor: columnColor.trim(),
        };

        columns.push(newColumn);

        saveColumns();
        renderAllColumns();
      }
    }
  });

  loadColumns();
  loadTasks();
  renderAllColumns();
  displayGlobalReminders();
}
