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

    // Dọn sạch giao diện cũ để không bị lộ kết quả trước
    await Terminal.reset();
    document.getElementById("generatedFile").textContent = ""; 

    if (!value) {
        await Terminal.error("[SYS] No input detected. Process aborted.");
        return;
    }

    // 1. Khởi động hệ thống
    await Terminal.info("Initializing location generator engine v1.0.0...");
    await Terminal.success("Core engine ready.");
    await Terminal.info("Reading user input stream...");
    await Terminal.success(`Input detected: "${value}"`);
    await Terminal.sleep(200);

    // 2. Gửi Request API
    await Terminal.info("Sending HTTP GET request to osm-nominatim server...");
    await Terminal.info("Establishing SSL handshake with remote server...");
    
    // Gọi API chạy ngầm
    const result = await Geocoder.search(value);

    // Tạo độ trễ mạng ngẫu nhiên (0.5s - 0.9s) cho giống đang chờ server phản hồi thật
    const networkLatency = 500 + Math.floor(Math.random() * 400);
    await Terminal.sleep(networkLatency);

    if (!result.success) {
        await Terminal.error(`[NET] Fetch failed: ${result.message}`);
        return;
    }

    await Terminal.success(`Response 200 OK received (${networkLatency}ms)`);
    await Terminal.sleep(150);

    // 3. Xử lý dữ liệu nhận được
    await Terminal.info("Parsing JSON payload response...");
    await Terminal.success(`Target identified: ${result.name}`);
    await Terminal.info("Extracting coordinate metrics...");
    await Terminal.success(`LAT: ${result.lat}`);
    await Terminal.success(`LON: ${result.lon}`);
    await Terminal.sleep(200);

    // 4. Biên dịch và nạp Progress Bar
    await Terminal.info("Compiling Shadowrocket configuration profile...");
    await Terminal.info("Injecting script-path & MITM hostnames...");
    await Terminal.progress("Preparing Generator");

    // 5. Xuất kết quả file (Chỉ xuất khi thanh % đạt 100%)
    await Terminal.info("Writing variables into ios-location-spoofer.sgmodule...");
    
    const generated = Template.build(result);
    document.getElementById("generatedFile").textContent = generated;
    MapManager.update(result);
    
    await Terminal.sleep(300); // Nhịp khựng cuối cùng khi ghi file xong

    // 6. Hoàn tất
    await Terminal.success("Generator Complete! Device profile generated successfully.");
}
