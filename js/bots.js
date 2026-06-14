const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

// Load All Bots
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

                <td>
                    ${
                        bot.status === "online"
                        ? "🟢 Online"
                        : "🔴 Offline"
                    }
                </td>

                <td>

                    <div class="monitor-card">

                        <div>
                            CPU:
                            <span id="cpu-${bot._id}">
                                0
                            </span>%
                        </div>

                        <div>
                            RAM:
                            <span id="ram-${bot._id}">
                                0
                            </span>
                            MB
                        </div>

                        <div>
                            UP:
                            <span id="uptime-${bot._id}">
                                0
                            </span>
                        </div>

                    </div>

                </td>

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

        setTimeout(() => {

            bots.forEach(bot => {

                if (
                    typeof loadMonitor ===
                    "function"
                ) {

                    loadMonitor(
                        bot._id
                    );

                }

            });

        }, 500);

    } catch (error) {

        console.error(error);

    }

}

// Create Bot
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

        const data =
            await response.json();

        if (!response.ok) {

            alert(
                data.message ||
                "Failed to create bot"
            );

            return;

        }

        document.getElementById(
            "botName"
        ).value = "";

        loadBots();

    } catch (error) {

        console.error(error);

    }

}

// Delete Bot
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

// First Load
loadBots();