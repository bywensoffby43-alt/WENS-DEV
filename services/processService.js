export const startBot = async (req, res) => {

    res.json({
        success: true,
        message: "Bot started"
    });

};

export const stopBot = async (req, res) => {

    res.json({
        success: true,
        message: "Bot stopped"
    });

};

export const restartBot = async (req, res) => {

    res.json({
        success: true,
        message: "Bot restarted"
    });

};