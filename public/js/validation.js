//Testing login form captures values entered
// const form = document.getElementById('form');
// form.addEventListener('submit', function(event) {
//     event.preventDefault();
//     const email = document.getElementById('email-input').value;
//     const password = document.getElementById('password-input').value;
//     console.log(email);
//     console.log(password);
// });

const form = document.getElementById('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('email-input').value;
    const password = document.getElementById('password-input').value;

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
    .then(function(response) {
        return response.json();
    })
    //Store users into local storage so all pages can access the user by id and firstname
    .then(function(data) {
    console.log(data);
    if (data.success) {
        localStorage.setItem(
            'userId',
            data.userId
        );
        localStorage.setItem(
            'firstname',
            data.firstname
        );
        console.log('User saved to localStorage');
    }
    })
    .catch(function(error) {
        console.log('Login error:', error);
    });
});