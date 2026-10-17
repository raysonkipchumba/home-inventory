const loginScreen =
    document.getElementById("loginScreen");

const registerScreen =
    document.getElementById("registerScreen");

const dashboardScreen =
    document.getElementById("dashboardScreen");


const loginForm =
    document.getElementById("loginForm");

const registerForm =
    document.getElementById("registerForm");


const loginError =
    document.getElementById("loginError");

const registerError =
    document.getElementById("registerError");


const usernameDisplay =
    document.getElementById("usernameDisplay");


/*
    TEMPORARY STORAGE

    This is only for testing the frontend.

    Later we will replace this with
    SHTTPS SQLite API calls.
*/

let testUser =
    JSON.parse(
        localStorage.getItem("testUser")
    );


/* -----------------------------
   SWITCH TO REGISTER
----------------------------- */

document
    .getElementById("showRegister")
    .addEventListener("click", () => {

        loginScreen.classList.add("hidden");

        registerScreen.classList.remove("hidden");

        loginError.textContent = "";
    });


/* -----------------------------
   SWITCH TO LOGIN
----------------------------- */

document
    .getElementById("showLogin")
    .addEventListener("click", () => {

        registerScreen.classList.add("hidden");

        loginScreen.classList.remove("hidden");

        registerError.textContent = "";
    });


/* -----------------------------
   REGISTER
----------------------------- */

registerForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        registerError.textContent = "";


        const username =
            document
                .getElementById(
                    "registerUsername"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "registerPassword"
                )
                .value;


        const confirmPassword =
            document
                .getElementById(
                    "confirmPassword"
                )
                .value;


        if (password !== confirmPassword) {

            registerError.textContent =
                "Passwords do not match.";

            return;
        }


        if (testUser) {

            registerError.textContent =
                "A test account already exists.";

            return;
        }


        /*
            TEMPORARY

            We are NOT sending this to SQLite yet.
        */

        testUser = {
            username: username,
            password: password
        };


        localStorage.setItem(
            "testUser",
            JSON.stringify(testUser)
        );


        alert(
            "Account created successfully."
        );


        registerForm.reset();

        registerScreen.classList.add("hidden");

        loginScreen.classList.remove("hidden");
    }
);


/* -----------------------------
   LOGIN
----------------------------- */

loginForm.addEventListener(
    "submit",
    async (event) => {

        event.preventDefault();

        loginError.textContent = "";


        const username =
            document
                .getElementById(
                    "loginUsername"
                )
                .value
                .trim();


        const password =
            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        if (!testUser) {

            loginError.textContent =
                "No account exists yet. Register first.";

            return;
        }


        if (
            username !== testUser.username ||
            password !== testUser.password
        ) {

            loginError.textContent =
                "Incorrect username or password.";

            return;
        }


        /*
            Login successful
        */

        localStorage.setItem(
            "loggedIn",
            "true"
        );


        usernameDisplay.textContent =
            username;


        loginForm.reset();


        loginScreen.classList.add("hidden");

        dashboardScreen.classList.remove("hidden");
    }
);


/* -----------------------------
   LOGOUT
----------------------------- */

document
    .getElementById("logoutBtn")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "loggedIn"
        );


        dashboardScreen.classList.add(
            "hidden"
        );

        loginScreen.classList.remove(
            "hidden"
        );
    });


/* -----------------------------
   RESTORE SESSION
----------------------------- */

if (
    localStorage.getItem("loggedIn") === "true"
    && testUser
) {

    usernameDisplay.textContent =
        testUser.username;

    loginScreen.classList.add(
        "hidden"
    );

    dashboardScreen.classList.remove(
        "hidden"
    );
}