window.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("locationInput");
    const button = document.getElementById("generateButton");

    button.addEventListener("click", generate);

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            generate();

        }

    });

});

function generate() {

    Terminal.clear();

    Terminal.printInfo("Initializing...");

    setTimeout(() => {

        Terminal.printInfo("Reading input...");

    }, 500);

    setTimeout(() => {

        Terminal.printSuccess("Waiting for Geocoder...");

    }, 1000);

}
