const input = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const habitList = document.getElementById('habit-list');

// Cargar hábitos guardados en localStorage
let habits = JSON.parse(localStorage.getItem('habits')) || [];
habits.forEach(addHabitToDOM);

addBtn.addEventListener('click', () => {
  const habit = input.value.trim();
  if (habit) {
    habits.push({ name: habit, completed: false });
    saveHabits();
    addHabitToDOM({ name: habit, completed: false });
    input.value = '';
  }
});

function addHabitToDOM(habit) {
  const li = document.createElement('li');
  li.textContent = habit.name;
  if (habit.completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    habit.completed = !habit.completed;
    saveHabits();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Eliminar';
  deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    habitList.removeChild(li);
    habits = habits.filter(h => h.name !== habit.name);
    saveHabits();
  });

  li.appendChild(deleteBtn);
  habitList.appendChild(li);
}

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}