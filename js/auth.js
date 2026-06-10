const API_URL = "/api/auth";

// LOGIN

const loginForm =
    document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const email =
                document.getElementById(
                    "loginEmail"
                ).value;

            const password =
                document.getElementById(
                    "loginPassword"
                ).value;

            try {

                const response =
                    await fetch(
                        `${API_URL}/login`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                email,
                                password
                            })
                        }
                    );

                const data =
                    await response.json();

                if (!data.success) {

                    alert(
                        data.message
                    );

                    return;
                }

                localStorage.setItem(
                    "token",
                    data.token
                );

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        data.user
                    )
                );

                window.location.href =
                    "dashboard.html";

            } catch (error) {

                alert(
                    "Login failed"
                );

            }

        }
    );

}

// REGISTER

const registerForm =
    document.getElementById(
        "registerForm"
    );

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        async (e) => {

            e.preventDefault();

            const username =
                document.getElementById(
                    "registerUsername"
                ).value;

            const email =
                document.getElementById(
                    "registerEmail"
                ).value;

            const password =
                document.getElementById(
                    "registerPassword"
                ).value;

            try {

                const response =
                    await fetch(
                        `${API_URL}/register`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify({
                                username,
                                email,
                                password
                            })
                        }
                    );

                const data =
                    await response.json();

                if (!data.success) {

                    alert(
                        data.message
                    );

                    return;
                }

                alert(
                    "Account created successfully"
                );

                window.location.href =
                    "login.html";

            } catch (error) {

                alert(
                    "Registration failed"
                );

            }

        }
    );

}

// LOGOUT

function logout() {

    localStorage.removeItem(
        "token"
    );

    localStorage.removeItem(
        "user"
    );

    window.location.href =
        "login.html";

}