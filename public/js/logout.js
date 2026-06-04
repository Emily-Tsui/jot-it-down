const logoutBtn = document.getElementById('logout-btn');

logoutBtn.addEventListener('click', function() {
    localStorage.clear();
    window.location.href = '/html/index.html';

});