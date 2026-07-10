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
    document.getElementById("generatedFile").textContent = ""; 

    if (!value) {
        await Terminal.error("[SYS] Input empty. Aborted.");
        return;
    }

    // 1. Nhận lệnh và quét mạng
    await Terminal.info(`Fetching data for: "${value}"`);
    
    const result = await Geocoder.search(value);
    
    // Tạo độ trễ mạng tự nhiên
    await Terminal.sleep(400 + Math.random() * 300);

    if (!result.success) {
        await Terminal.error(`[ERROR] ${result.message}`);
        return;
    }

    // 2. Xuất thông tin cốt lõi
    await Terminal.success(`Location resolved: ${result.name}`);
    await Terminal.success(`Coordinates found: ${result.lat}, ${result.lon}`);
    await Terminal.sleep(150);

    // 3. Biên dịch module
    await Terminal.info("Compiling ios-location-spoofer.sgmodule...");
    await Terminal.progress("Building template");

    // 4. Đổ dữ liệu ra ngoài màn hình
    const generated = Template.build(result);
    document.getElementById("generatedFile").textContent = generated;
    MapManager.update(result);
    
    await Terminal.sleep(100);
    await Terminal.success("Shadowrocket module generated!");
}
