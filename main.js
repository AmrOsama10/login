var Name = document.querySelector("#name");
var email = document.querySelector("#email");
var password = document.querySelector("#password");
var validUp = document.querySelector("#validUp");
var signUpBtn = document.querySelector("#signUpBtn");
var validSignIn = document.querySelector(".valid-signIn");
var VisitHome = document.querySelector(".Visit-home ");
var inputSignInEm = document.querySelector(".input-signInEm ");
var inputSignInPas = document.querySelector(".input-signInPas");
var logOut = document.querySelector(".log-out ");
var welcomeMessage = document.querySelector(".Welcome-message ");

var storedData = JSON.parse(localStorage.getItem("list")) || [];

if (signUpBtn) {
  signUpBtn.addEventListener("click", function (e) {
    e.preventDefault();
    setValueFun();
  });
}
if (VisitHome) {
  VisitHome.addEventListener("click", function (e) {
    e.preventDefault();
    setValueSignInFun();
  });
}
if (logOut) {
  logOut.addEventListener("click", function (e) {
    window.location.href = "../signin.html";
  });
  display();
}

function setValueFun() {
  if (Name.value === "" || email.value === "" || password.value === "") {
    validUp.classList.replace("d-none", "d-block");
    validUp.classList.add("text-danger");
    validUp.classList.remove("text-success");
    validUp.innerHTML = "All inputs is required";
  } else {
    var emailExists = storedData.some(function (item) {
      return item.Email === email.value;
    });
    if (emailExists) {
      validUp.classList.replace("d-none", "d-block");
      validUp.classList.add("text-danger");
      validUp.classList.remove("text-success");
      validUp.innerHTML = "Email already exists";
    } else {
      userData();
      validUp.classList.replace("d-none", "d-block");
      validUp.classList.remove("text-danger");
      validUp.classList.add("text-success");
      validUp.innerHTML = "success";
      display();
    }
  }
}

function setValueSignInFun() {
  if (inputSignInEm.value === "" || inputSignInPas.value === "") {
    validSignIn.classList.replace("d-none", "d-block");
    validSignIn.classList.add("text-danger");
    validSignIn.classList.remove("text-success");
    validSignIn.innerHTML = "All inputs is required";
  } else {
    signInValid();
  }
}

function signInValid() {
  var user = storedData.find(function (item) {
    return (
      item.Email === inputSignInEm.value.trim() &&
      item.Pas === inputSignInPas.value.trim()
    );
  });
  if (user) {
    window.location.href = "./html/home.html";
  } else {
    validSignIn.classList.replace("d-none", "d-block");
    validSignIn.innerHTML = "Incorrect email or password";
  }
}

function userData() {
  var data = {
    Name: Name.value,
    Email: email.value,
    Pas: password.value,
  };
  storedData.push(data);
  localStorage.setItem("list", JSON.stringify(storedData));
}

function display() {
  box = "";
  for (var i = 0; i < storedData.length; i++) {
    box = `
    welcome ${storedData[i].Name}
    `;
  }
  welcomeMessage.innerHTML = box;
}
