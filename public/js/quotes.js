const hookContainer =
    document.getElementById('hook-container');

fetch('/api/inspo')
    .then(function(response) {

        return response.json();

    })
    .then(function(data) {

        console.log(data);

        hookContainer.innerHTML = `
            <p>"${data.quote}"</p>
            <p><strong>- ${data.author}</strong></p>
        `;

    })
    .catch(function(error) {

        console.log(error);

        hookContainer.textContent =
            'Unable to load quote';

    });
