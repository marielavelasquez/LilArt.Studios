// Handles theme toggling between light and dark modes.
const themeToggleButton = document.getElementById('theme-toggle');

const applyTheme = (theme) => {
  document.body.classList.remove('light-mode', 'dark-mode');
  document.body.classList.add(`${theme}-mode`);
  themeToggleButton.textContent = theme === 'dark' ? '☀️' : '🌙';
};

const savedTheme = localStorage.getItem('theme') || 'light';
applyTheme(savedTheme);

themeToggleButton.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
});
