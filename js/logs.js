const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

const logsContainer =
    document.getElementById(
        "logsContainer"
    );

async function loadLogs() {

    try {

        logsContainer.textContent =
            "Loading logs...";

        const response =
            await fetch(
                "/api/logs",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (
            !data.logs ||
            data.logs.length === 0
        ) {

            logsContainer.textContent =
                "No logs available.";

            return;
        }

        logsContainer.textContent =
            data.logs.join("\n");

    } catch (error) {

        logsContainer.textContent =
            "Failed to load logs.";

        console.error(error);

    }

}

setInterval(
    loadLogs,
    5000
);

loadLogs();