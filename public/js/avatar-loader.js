console.log("avatar.js loaded");

const avatar =
    localStorage.getItem(
        'avatar'
    );

if (avatar) {

    const img =
        document.getElementById(
            'avatar-preview'
        );

    if (img) {
        img.src = avatar;
    }

}