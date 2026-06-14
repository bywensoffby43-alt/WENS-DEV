import pm2 from "pm2";

// Start Bot
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

// Stop Bot
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

// Restart Bot
export const restartBot = (name) => {
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