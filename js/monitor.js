async function loadBotStatus(name) {

    try {

        const res =
            await fetch(
                `/api/monitor/${name}`
            );

        const data =
            await res.json();

        document.getElementById(
            "botStatus"
        ).innerText =
            data.online
                ? "🟢 Online"
                : "🔴 Offline";

        document.getElementById(
            "cpu"
        ).innerText =
            data.cpu;

        document.getElementById(
            "ram"
        ).innerText =
            (
                data.memory /
                1024 /
                1024
            ).toFixed(2);

        document.getElementById(
            "uptime"
        ).innerText =
            Math.floor(
                (Date.now() -
                data.uptime)
                / 1000
            ) + " sec";

    } catch (error) {

        console.error(error);

    }

}

setInterval(() => {

    loadBotStatus("KING");

}, 5000);

loadBotStatus("KING");