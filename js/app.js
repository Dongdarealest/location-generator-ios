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
        await Terminal.error("No input detected.");
        return;
    }

    // Khởi động hệ thống bắn lệnh liên tục
    await Terminal.info("Initializing...");
    await Terminal.success("Engine Ready");
    await Terminal.info("Reading input...");
    await Terminal.success(value);

    // Dừng lại chờ kết nối mạng để tìm kiếm vị trí thật
    await Terminal.info("Searching location...");
    const result = await Geocoder.search(value);

    // Tạo độ trễ mạng ngẫu nhiên (0.4s - 0.8s) y như terminal đang gửi gói tin lên server
    await Terminal.sleep(400 + Math.random() * 400);

    if (!result.success) {
        await Terminal.error(result.message);
        return;
    }

    // Nhận được dữ liệu, toàn bộ thông tin tọa độ bắn ra cực nhanh
    await Terminal.success(result.name);
    await Terminal.info("Latitude");
    await Terminal.success(result.lat.toString());
    await Terminal.info("Longitude");
    await Terminal.success(result.lon.toString());

    // Chạy thanh tiến trình % giật cục nạp dữ liệu
    await Terminal.progress("Preparing Generator");

    // SAU KHI THANH % CHẠY XONG: Bắn file ra và mở hoàn tất hệ thống
    const generated = Template.build(result);
    document.getElementById("generatedFile").textContent = generated;
    MapManager.update(result);

    await Terminal.success("Generator Complete");
}
