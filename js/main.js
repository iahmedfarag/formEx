// sign up vars
// <>

var supContainer = document.querySelector(".signup");
var supNameInput = document.querySelector(".signup form .name");
var supEmailInput = document.querySelector(".signup form .email");
var supPassInput = document.querySelector(".signup form .pass");
var supBtn = document.querySelector(".signup form button");
var supAlert = document.querySelector(".signup form .alert");
var supLink = document.querySelector(".signin form .signupLink a");
var supValid;

//><
// sign in vars
//<>

var sinContainer = document.querySelector(".signin");
var sinEmailInput = document.querySelector(".signin form .email");
var sinPassInput = document.querySelector(".signin form .pass");
var sinBtn = document.querySelector(".signin form button");
var sinAlert = document.querySelector(".signin form .alert");
var sinLink = document.querySelector(".signup form .signinLink a");
var sinValid;

//><
// home vars
//<>

var homeContainer = document.querySelector(".home");
var logoutBtn = document.querySelector(".home nav .logout");
var username = document.querySelector(".home .content h2 span");

// users //

var supUser;
var users = [];
var loggedUser = {};
//
var activePage = {};

// local storage //

// users (local storage)

if (JSON.parse(localStorage.getItem("users"))) {
  users = JSON.parse(localStorage.getItem("users"));
} else {
  users = [];
}
console.log(users);

// logged user (local storage)

if (JSON.parse(localStorage.getItem("loggedUser"))) {
  loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
} else {
  loggedUser = {};
}
username.innerHTML = loggedUser.name;
console.log(loggedUser);

// active page (local storage)

if (JSON.parse(localStorage.getItem("activePage"))) {
  activePage = JSON.parse(localStorage.getItem("activePage"));
} else {
  activePage = { up: true, in: false, home: false };
}
console.log(activePage);

// active page func when reload
activePageFun();

// sign up handle //

function supHandle(e) {
  event.preventDefault();
  //   check inputs
  checkSupInputs();
  //   add user
  addUser();

  console.log("sup func");
}

// check sign up input

function checkSupInputs() {
  if (supNameInput.value && supEmailInput.value && supPassInput.value) {
    supValid = true;
  } else {
    supValid = false;
  }
}

// add user

function addUser() {
  if (supValid) {
    supUser = {
      name: supNameInput.value,
      email: supEmailInput.value,
      pass: supPassInput.value,
    };
    // check if the gmail is already exist
    for (i = 0; i < users.length; i++) {
      if (supEmailInput.value == users[i].email) {
        supAlert.style.display = "block";
        supAlert.innerHTML = "email already exist";
        break;
      } else {
        users.push(supUser);
        localStorage.setItem("users", JSON.stringify(users));
        supAlertFun();
        // active page
        activePage = {
          up: false,
          in: true,
          home: false,
        };
        activePageFun();
      }
    }
  } else {
    supAlertFun();
  }
}

// alert function

function supAlertFun() {
  supAlert.style.display = "block";
  if (supValid) {
    supAlert.innerHTML = "success";
    supAlert.style.color = "green";
  } else {
    supAlert.innerHTML = "all inputs required";
  }
}

// clean alerts function
function clearAlerts() {
  supAlert.style.display = "none";
  sinAlert.style.display = "none";
}

// sign in handle

function sinHandle(e) {
  event.preventDefault();
  checkSinInputs();
  if (sinValid) {
    checkUser();
  } else {
    sinAlertFunc();
  }
  console.log("sin func");
}

// check sign in inputs

function checkSinInputs() {
  if (sinEmailInput.value && sinPassInput.value) {
    sinValid = true;
  } else {
    sinValid = false;
  }
}

// check if the user registered or not

function checkUser() {
  for (i = 0; i < users.length; i++) {
    var useremail = users[i].email;
    var userpass = users[i].pass;
    // user not registered
    if ((sinEmailInput.value == useremail) & (sinPassInput.value == userpass)) {
      loggedUser = {
        name: users[i].name,
        email: users[i].email,
        pass: users[i].pass,
      };
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
      username.innerHTML = users[i].name;
      //   active page
      activePage = {
        up: false,
        in: false,
        home: true,
      };
      activePageFun();
      break;
    } else {
      sinAlertFunc();
    }
  }
}

// alert sign in function

function sinAlertFunc() {
  sinAlert.style.display = "block";
  //   check empty or wrong values
  if (sinValid) {
    sinAlert.innerHTML = "pass | email wrong";
  } else {
    sinAlert.innerHTML = "inputs required";
  }
}

// active page Function

function activePageFun() {
  if (activePage.up) {
    supContainer.style.display = "flex";
    sinContainer.style.display = "none";
    homeContainer.style.display = "none";
  } else if (activePage.in) {
    supContainer.style.display = "none";
    sinContainer.style.display = "flex";
    homeContainer.style.display = "none";
  } else if (activePage.home) {
    supContainer.style.display = "none";
    sinContainer.style.display = "none";
    homeContainer.style.display = "block";
  }
  localStorage.setItem("activePage", JSON.stringify(activePage));
  //   clear alerts
  clearAlerts();
}

// links

sinLink.addEventListener("click", function () {
  activePage = {
    up: false,
    in: true,
    home: false,
  };
  activePageFun();
});

supLink.addEventListener("click", function () {
  activePage = {
    up: true,
    in: false,
    home: false,
  };
  activePageFun();
});

// log out
logoutBtn.addEventListener("click", () => {
  loggedUser = {};
  localStorage.removeItem("loggedUser");
  activePage = {
    up: false,
    in: true,
    home: false,
  };
  localStorage.setItem("activePage", JSON.stringify(activePage));
  activePageFun();
});
