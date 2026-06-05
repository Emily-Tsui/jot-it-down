const uploadBtn =
    document.getElementById('avatar-btn');

const uploadInput =
    document.getElementById('avatar-upload');

const preview =
    document.getElementById('avatar-preview');

uploadBtn.addEventListener(
    'click',
    async function() {

        const file =
            uploadInput.files[0];

        if (!file) {
            alert('Select an image first');
            return;
        }

        const formData =
            new FormData();

        formData.append(
            'img',
            file
        );

        formData.append(
            'shape',
            'circle'
        );

        formData.append(
            'size',
            '200'
        );

        const response =
            await fetch(
                'http://localhost:7321/shape_avatar',
                {
                    method: 'POST',
                    body: formData
                }
            );

        const blob =
            await response.blob();

        const imageUrl =
            URL.createObjectURL(blob);

        preview.src =
            imageUrl;

        const reader =
            new FileReader();

        reader.onload = function() {

            localStorage.setItem(
                'avatar',
                reader.result
            );

        };

        reader.readAsDataURL(blob);

    }
);


function loadAvatar() {

    const avatar =
        localStorage.getItem(
            'avatar'
        );

    if (!avatar) return;

    const img =
        document.getElementById(
            'avatar-preview'
        );

    img.src = avatar;
}

loadAvatar();