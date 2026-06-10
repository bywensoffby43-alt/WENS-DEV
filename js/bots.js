const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

async function loadBots() {

    try {

        const response =
            await fetch(
                "/api/bots",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const bots =
            await response.json();

        const table =
            document.getElementById(
                "botsTable"
            );

        table.innerHTML = "";

        bots.forEach(bot => {

            table.innerHTML += `
                <tr>

                    <td>${bot.name}</td>

                    <td>${bot.status}</td>

                    <td>

                        <button
                            class="btn"
                            onclick="deleteBot('${bot._id}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

async function createBot() {

    const name =
        document.getElementById(
            "botName"
        ).value;

    if (!name) {

        alert(
            "Enter bot name"
        );

        return;
    }

    try {

        const response =
            await fetch(
                "/api/bots",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        name
                    })
                }
            );

        await response.json();

        document.getElementById(
            "botName"
        ).value = "";

        loadBots();

    } catch (error) {

        console.error(error);

    }

}

async function deleteBot(id) {

    if (
        !confirm(
            "Delete this bot?"
        )
    ) {
        return;
    }

    try {

        await fetch(
            `/api/bots/${id}`,
            {
                method: "DELETE",

                headers: {
                    Authorization:
                        `Bearer ${token}`
                }
            }
        );

        loadBots();

    } catch (error) {

        console.error(error);

    }

}

loadBots();