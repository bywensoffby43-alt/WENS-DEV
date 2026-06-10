const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

const statusMessage =
    document.getElementById(
        "statusMessage"
    );

async function loadSettings() {

    try {

        const response =
            await fetch(
                "/api/settings",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        document.getElementById(
            "username"
        ).value =
            data.username || "";

        document.getElementById(
            "email"
        ).value =
            data.email || "";

    } catch (error) {

        console.error(error);

    }

}

async function saveSettings() {

    const username =
        document.getElementById(
            "username"
        ).value;

    const email =
        document.getElementById(
            "email"
        ).value;

    try {

        const response =
            await fetch(
                "/api/settings",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        username,
                        email
                    })
                }
            );

        const data =
            await response.json();

        statusMessage.textContent =
            data.message ||
            "Settings updated";

    } catch (error) {

        statusMessage.textContent =
            "Update failed";

    }

}

async function changePassword() {

    const password =
        document.getElementById(
            "newPassword"
        ).value;

    if (!password) {

        alert(
            "Enter a password"
        );

        return;
    }

    try {

        const response =
            await fetch(
                "/api/settings/password",
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        password
                    })
                }
            );

        const data =
            await response.json();

        statusMessage.textContent =
            data.message ||
            "Password updated";

        document.getElementById(
            "newPassword"
        ).value = "";

    } catch (error) {

        statusMessage.textContent =
            "Password update failed";

    }

}

loadSettings();