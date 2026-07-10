window.addEventListener("DOMContentLoaded", () => {

    const input = document.getElementById("locationInput");
    const button = document.getElementById("generateButton");

    button.addEventListener("click", runGenerator);

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {

            runGenerator();

        }

    });

});

async function runGenerator() {

    const input = document.getElementById("locationInput");

    const value = input.value.trim();

    await Terminal.reset();

    if (!value) {

        await Terminal.error("No input detected.");

        return;

    }

    await Terminal.info("Initializing...");

    await Terminal.success("Engine Ready");

    await Terminal.info("Reading input...");

    await Terminal.success(value);

    await Terminal.info("Detecting input type...");

    await Terminal.success("Coming in Sprint 1.2");

    await Terminal.progress("Preparing Generator");

    await Terminal.success("Ready.");

}
