const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

async function loadDashboard() {

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

        const totalBots =
            bots.length;

        const onlineBots =
            bots.filter(
                bot =>
                    bot.status ===
                    "online"
            ).length;

        const offlineBots =
            bots.filter(
                bot =>
                    bot.status ===
                    "offline"
            ).length;

        document.getElementById(
            "totalBots"
        ).textContent =
            totalBots;

        document.getElementById(
            "onlineBots"
        ).textContent =
            onlineBots;

        document.getElementById(
            "offlineBots"
        ).textContent =
            offlineBots;

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
                        ${bot.status}
                    </td>
                </tr>
            `;

        });

    } catch (error) {

        console.error(error);

    }

}

loadDashboard();