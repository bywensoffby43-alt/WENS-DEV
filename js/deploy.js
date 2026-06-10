const token =
    localStorage.getItem("token");

if (!token) {

    window.location.href =
        "login.html";

}

const statusBox =
    document.getElementById(
        "deployStatus"
    );

async function deployGithub() {

    const repoUrl =
        document.getElementById(
            "repoUrl"
        ).value;

    if (!repoUrl) {

        alert(
            "Enter repository URL"
        );

        return;
    }

    try {

        statusBox.innerHTML =
            "Deploying GitHub repository...";

        const response =
            await fetch(
                "/api/deploy/github",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",

                        Authorization:
                            `Bearer ${token}`
                    },

                    body: JSON.stringify({
                        repoUrl
                    })
                }
            );

        const data =
            await response.json();

        statusBox.innerHTML =
            data.message ||
            "Deployment complete";

    } catch (error) {

        statusBox.innerHTML =
            "Deployment failed";

        console.error(error);

    }

}

async function deployZip() {

    const file =
        document.getElementById(
            "zipFile"
        ).files[0];

    if (!file) {

        alert(
            "Select a ZIP file"
        );

        return;
    }

    try {

        statusBox.innerHTML =
            "Uploading ZIP file...";

        const formData =
            new FormData();

        formData.append(
            "zip",
            file
        );

        const response =
            await fetch(
                "/api/deploy/zip",
                {
                    method: "POST",

                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    body: formData
                }
            );

        const data =
            await response.json();

        statusBox.innerHTML =
            data.message ||
            "Deployment complete";

    } catch (error) {

        statusBox.innerHTML =
            "Upload failed";

        console.error(error);

    }

}