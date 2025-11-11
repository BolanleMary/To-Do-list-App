// import validator from "https://cdnjs.cloudflare.com/ajax/libs/validator/13.15.15/validator.min.js"
import validator from "https://cdn.jsdelivr.net/npm/validator@13.11.0/+esm";
const nameInput= document.getElementById('name')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password');
const eyeImg = document.getElementById('eyeImg');
const buttonEye = document.getElementById('buttonEye')
const form = document.getElementById('form')
const errorMsg = document.getElementById('errorMsg')
const passwordErrMsg = document.getElementById('passwordErrMsg')


buttonEye.addEventListener('click', (e) => {
    e?.preventDefault();
    passwordInput.type = passwordInput.type =='password'? 'text': 'password'
eyeImg.src = passwordInput.type == 'password'? '../assets/eye.svg': '../assets/eyeClosed.svg'
})

const formCallBack = async (e) =>{
e?.preventDefault()
const email = emailInput.value;
const password = passwordInput.value;
console.log (validator.isEmail(email));
console.log(validator.isStrongPassword(password, {
  minLength: 10,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1, // Require at least 2 symbols
})
);
// console.log(password);
// console.log(email);
const emailCorrect = validator.isEmail(email)
const passwordCorrect = validator.isStrongPassword(password)

if(!emailCorrect){
errorMsg.innerText ="wrong email format"
}else{
  errorMsg.innerText =" "

}
if(!passwordCorrect){
  passwordErrMsg.innerText ="weak password"
}else{
  passwordErrMsg.innerText =" "
}

if (emailCorrect && passwordCorrect){
  alert('Redirecting to login page')

  window.location.href ="../HTML/login.html"
}
}




form.addEventListener('submit', formCallBack)

