export const deployZip = async (req, res) => {
    try {

        res.json({
            success: true,
            message: "ZIP deployment started"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

export const deployGithub = async (req, res) => {
    try {

        res.json({
            success: true,
            message: "GitHub deployment started"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};