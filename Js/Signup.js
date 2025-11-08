const passwordInput = document.getElementById('password');
const eyeImg = document.getElementById('eyeImg');
const buttonEye = document.getElementById('buttonEye')

buttonEye.addEventListener('click', (e) => {
    e?.preventDefault();
    passwordInput.type = passwordInput.type =='password'? 'text': 'password'
eyeImg.src = passwordInput.type == 'password'? '../assets/eye.svg': '../assets/eyeClosed.svg'
})

