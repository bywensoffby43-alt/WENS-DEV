async function loadBotStatus(name) {

    try {

        const res = await fetch(
            `/api/monitor/${name}`
        );

        const data =
            await res.json();

        console.log(data);

    } catch (error) {

        console.error(error);
    }

}