import pm2 from "pm2";

export const startBot = (name, script) => {
    return new Promise((resolve, reject) => {

        pm2.connect(err => {

            if (err) return reject(err);

            pm2.start(
                {
                    name,
                    script
                },
                (err) => {

                    pm2.disconnect();

                    if (err) return reject(err);

                    resolve(true);
                }
            );

        });

    });
};

export const stopBot = (name) => {
    return new Promise((resolve, reject) => {

        pm2.connect(err => {

            if (err) return reject(err);

            pm2.stop(name, err => {

                pm2.disconnect();

                if (err) return reject(err);

                resolve(true);
            });

        });

    });
};

export const restartBot = (name) => {
    return new Promise((resolve, reject) => {

        pm2.connect(err => {

            if (err) return reject(err);

            pm2.describe(name, (err, process) => {

                pm2.disconnect();

                if (err) return reject(err);

                if (!process || process.length === 0) {
                    return resolve({
                        online: false,
                        cpu: 0,
                        memory: 0,
                        uptime: 0
                    });
                }

                const p = process[0];

                resolve({
                    online:
                        p.pm2_env.status === "online",
                    cpu:
                        p.monit.cpu,
                    memory:
                        p.monit.memory,
                    uptime:
                        p.pm2_env.pm_uptime
                });

            });

        });

    });
};
    return new Promise((resolve, reject) => {

        pm2.connect(err => {

            if (err) return reject(err);

            pm2.restart(name, err => {

                pm2.disconnect();

                if (err) return reject(err);

                resolve(true);
            });

        });

    });
};