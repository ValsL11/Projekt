const formatReminderDate = (dateString) => {
  if (!dateString) return '';

  return new Date(dateString).toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
  });
};

const displayGlobalReminders = () => {
  const reminderListOutput = document.getElementById('reminderListOutput');

  if (!reminderListOutput) return;

  const activeTasks = tasks.filter(
    (task) => task.status === taskStatuses.active,
  );

  reminderSortOrder === 'oldestFirst'
    ? activeTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    : activeTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  reminderListOutput.innerHTML = '';

  if (activeTasks.length === 0) {
    reminderListOutput.innerHTML =
      '<li class="no-reminders">Brak aktywnych zadań do przypomnienia.</li>';

    return;
  }

  activeTasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('reminder-list-item');

    const textSpan = document.createElement('span');
    textSpan.classList.add('reminder-task-text');
    textSpan.textContent = task.text;

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('reminder-task-date');
    dateSpan.textContent = `(${formatReminderDate(task.createdAt)})`;

    listItem.appendChild(textSpan);
    listItem.appendChild(dateSpan);

    reminderListOutput.appendChild(listItem);
  });
};
