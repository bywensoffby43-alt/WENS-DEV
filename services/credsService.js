export const getLogs = async (req, res) => {

    res.json({
        success: true,
        logs: []
    });

};

export const getBotLogs = async (req, res) => {

    res.json({
        success: true,
        botId: req.params.botId,
        logs: []
    });

};