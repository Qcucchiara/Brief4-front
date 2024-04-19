const modal = document.querySelector(".modal_authentification");
const buttonAuthentification = document.querySelector(".authentification");

async function createAccount() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const newUser = {
    name: name,
    email: email,
    password: password,
  };
  console.log(newUser);

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(newUser),
  };

  const apiRequest = await fetch(
    "http://localhost:3232/user/register",
    request
  );
  const result = await apiRequest.json();
  console.log(result);
  loginToAccount();
  // if (result.status !== 201) {
  //   registerMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-pink-300 to-pink-400 text-red-800 font-bold">This mail already exist</p>`;
  //   return;
  // } else {
  //   registerMsg.innerHTML = `<p class="mt-7 text-center rounded-lg bg-gradient-to-r from-green-400 to-lime-400 text-lime-800 font-bold">Registration successful, you can now log in</p>`;
  //   setTimeout(() => {
  //     window.location.reload();
  //   }, "3000");
  // }
}

async function loginToAccount() {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const user = {
    email: email,
    password: password,
  };
  console.log(user);

  const request = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(user),
  };

  const apiRequest = await fetch("http://localhost:3232/user/login", request);
  const result = await apiRequest.json();
  console.log(result);

  window.localStorage.setItem("token", result.jwt);
  modal.classList.add("hidden");
}

function authentification() {
  modal.classList.remove("hidden");

  const register = document.querySelector(".button_register");
  const login = document.querySelector(".button_login");

  register.addEventListener("click", (e) => {
    e.preventDefault();
    createAccount();
  });

  login.addEventListener("click", (e) => {
    e.preventDefault();
    loginToAccount();
  });

  if (idk) {
    modal.classList.add("hidden");
  }
}

buttonAuthentification.addEventListener("click", (e) => {
  e.preventDefault();
  authentification();
});
