// Inicializar o dashboard, conquistas e desafios ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("loggedInUser")) {
    loadUserData();
    initializeChallenges();
    displayAchievements();
  }
});

// Função para registrar um novo usuário
function registerUser() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  if (localStorage.getItem(username)) {
    alert("Usuário já existe! Tente outro nome de usuário.");
  } else {
    localStorage.setItem(username, JSON.stringify({ password, points: 0, level: 1 }));
    alert("Registro bem-sucedido! Faça login para acessar o dashboard.");
    document.getElementById("register-form").reset();
    showLogin();
  }
}

// Função para fazer login de um usuário existente
function loginUser() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const storedUser = JSON.parse(localStorage.getItem(username));

  if (storedUser && storedUser.password === password) {
    sessionStorage.setItem("loggedInUser", username);
    document.getElementById("user-name-display").textContent = username;
    showDashboard();
  } else {
    alert("Nome de usuário ou senha incorretos.");
  }
}

// Função para mostrar o dashboard do usuário logado
function showDashboard() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("user-dashboard").style.display = "block";
  loadUserData();
}

// Função para adicionar pontos
function addPoints(points) {
  const username = sessionStorage.getItem("loggedInUser");
  const userData = JSON.parse(localStorage.getItem(username));

  userData.points += points;
  checkLevelUp(userData);
  checkAchievements(); // Verifica se novas conquistas foram desbloqueadas

  localStorage.setItem(username, JSON.stringify(userData));
  loadUserData();
}

// Função para verificar se o usuário subiu de nível
function checkLevelUp(userData) {
  const pointsNeededForLevelUp = userData.level * 100; // Exemplo: 100 pontos para cada nível

  if (userData.points >= pointsNeededForLevelUp) {
    userData.level++;
    alert(`Parabéns! Você alcançou o nível ${userData.level}!`);
  }
}

// Função para verificar e desbloquear conquistas
function checkAchievements() {
  const username = sessionStorage.getItem("loggedInUser");
  const userData = JSON.parse(localStorage.getItem(username));
  
  if (userData.points >= 500 && !userData.achievements?.pointMaster) {
    alert("Conquista desbloqueada: Mestre dos Pontos! Você acumulou 500 pontos.");
    userData.achievements = { ...userData.achievements, pointMaster: true };
  }
  if (userData.level >= 5 && !userData.achievements?.levelUp) {
    alert("Conquista desbloqueada: Alcançou o Nível 5! Continue assim.");
    userData.achievements = { ...userData.achievements, levelUp: true };
  }

  localStorage.setItem(username, JSON.stringify(userData));
  displayAchievements();
}

// Função para exibir conquistas no dashboard
function displayAchievements() {
  const username = sessionStorage.getItem("loggedInUser");
  const userData = JSON.parse(localStorage.getItem(username));
  const achievementsArea = document.getElementById("achievements-area");

  let achievementsHTML = "<h3>Conquistas Desbloqueadas</h3><ul>";
  for (const [key, criteria] of Object.entries({
    pointMaster: { description: "Mestre dos Pontos: Acumule 500 pontos" },
    levelUp: { description: "Suba ao Nível 5" }
  })) {
    const unlocked = userData.achievements && userData.achievements[key];
    achievementsHTML += `<li>${criteria.description} - ${unlocked ? "✅" : "❌"}</li>`;
  }
  achievementsHTML += "</ul>";

  achievementsArea.innerHTML = achievementsHTML;
}

// Função para carregar dados do usuário
function loadUserData() {
  const username = sessionStorage.getItem("loggedInUser");
  const userData = JSON.parse(localStorage.getItem(username));
  document.getElementById("points-display").textContent = `Pontos: ${userData.points} | Nível: ${userData.level}`;
}

// Função para fazer upload de redações
function uploadEssay() {
  const fileInput = document.getElementById("file-upload");
  const uploadStatus = document.getElementById("upload-status");
  const username = sessionStorage.getItem("loggedInUser");

  if (fileInput.files.length === 0) {
    uploadStatus.textContent = "Por favor, selecione um arquivo para enviar.";
    uploadStatus.style.color = "red";
    return;
  }

  const file = fileInput.files[0];
  const fileName = file.name;

  let userEssays = JSON.parse(localStorage.getItem("essays")) || [];
  userEssays.push({ username, fileName, date: new Date().toLocaleDateString() });
  localStorage.setItem("essays", JSON.stringify(userEssays));

  uploadStatus.textContent = `Redação "${fileName}" enviada com sucesso!`;
  uploadStatus.style.color = "green";
  fileInput.value = "";
}

// Função para exibir redações enviadas
function displayEssays() {
  const essayList = document.getElementById("essay-list");
  const essays = JSON.parse(localStorage.getItem("essays")) || [];

  let essayHTML = "<h3>Redações Enviadas</h3><ul>";
  essays.forEach(essay => {
    essayHTML += `<li>${essay.username} - ${essay.fileName} (Enviada em: ${essay.date})</li>`;
  });
  essayHTML += "</ul>";

  essayList.innerHTML = essayHTML;
}
