import pm2 from "pm2";

export const getBotStatus = (name) => {
    return new Promise((resolve, reject) => {

        pm2.connect((err) => {

            if (err) {
                return reject(err);
            }

            pm2.describe(name, (err, process) => {

                pm2.disconnect();

                if (err) {
                    return reject(err);
                }

                if (!process || process.length === 0) {
                    return resolve({
                        online: false,
                        cpu: 0,
                        memory: 0,
                        uptime: 0
                    });
                }

                const bot = process[0];

                resolve({
                    online:
                        bot.pm2_env.status === "online",

                    cpu:
                        bot.monit.cpu || 0,

                    memory:
                        bot.monit.memory || 0,

                    uptime:
                        bot.pm2_env.pm_uptime || 0
                });

            });

        });

    });
};