window.addEventListener("DOMContentLoaded", () => {

    MapManager.init();

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

    await Terminal.info("Searching location...");

    const result = await Geocoder.search(value);

    if (!result.success) {

        await Terminal.error(result.message);

        return;

    }

    await Terminal.success(result.name);

    await Terminal.info("Latitude");
    await Terminal.success(result.lat.toString());

    await Terminal.info("Longitude");
    await Terminal.success(result.lon.toString());

    await Terminal.progress("Preparing Generator");

    const generated = Template.build(result);

    document.getElementById("generatedFile").textContent = generated;

    MapManager.update(result);

    await Terminal.success("Generator Complete");

}
