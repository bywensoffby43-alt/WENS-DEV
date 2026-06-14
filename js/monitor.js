async function loadMonitor(botId) {

    try {

        const res =
            await fetch(
                `/api/monitor/${botId}`
            );

        const data =
            await res.json();

        const cpu =
            document.getElementById(
                `cpu-${botId}`
            );

        const ram =
            document.getElementById(
                `ram-${botId}`
            );

        const uptime =
            document.getElementById(
                `uptime-${botId}`
            );

        if (cpu)
            cpu.innerText =
                data.cpu || 0;

        if (ram)
            ram.innerText =
                (
                    (data.memory || 0)
                    / 1024
                    / 1024
                ).toFixed(2);

        if (uptime)
            uptime.innerText =
                data.uptime || 0;

    } catch (error) {

        console.error(error);

    }

}