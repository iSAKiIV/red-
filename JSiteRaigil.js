// script.js

document.addEventListener('DOMContentLoaded', () => {
  // Barra de progresso
  const progressBar = document.getElementById('progress-bar');
  const progressText = document.getElementById('progress-text');
  let progress = 0;

  function updateProgress() {
    progress += 10; // Incrementa em 10% por vez
    if (progress > 100) progress = 100; // Limita a 100%
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${progress}% Concluído`;
  }

  // Simulando a atualização do progresso ao clicar nos botões Ver Mais
  document.querySelectorAll('.button').forEach(button => {
    button.addEventListener('click', updateProgress);
  });

  // Quiz Interativo
  const quizForm = document.getElementById('quiz-form');
  const quizFeedback = document.getElementById('quiz-feedback');

  quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const answer = document.getElementById('answer').value.toLowerCase();
    const correctAnswer = "resposta correta"; // Defina a resposta correta aqui

    if (answer === correctAnswer) {
      quizFeedback.textContent = "Parabéns! Resposta correta.";
      quizFeedback.style.color = "green";
    } else {
      quizFeedback.textContent = "Resposta incorreta. Tente novamente.";
      quizFeedback.style.color = "red";
    }
    document.getElementById('answer').value = ""; // Limpa o campo de resposta
  });

  // Menu Mobile
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });
});


