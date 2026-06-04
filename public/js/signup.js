const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const firstname =
        document.getElementById('firstname-input').value;
    const email =
        document.getElementById('email-input').value;
    const password =
        document.getElementById('password-input').value;

    fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstname: firstname,
            email: email,
            password: password
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        alert('Account created successfully!');
        window.location.href = '/html/login.html';
    })
    .catch(function(error) {
        console.log(error);
    });
});