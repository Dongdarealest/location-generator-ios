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

    // 1. Dọn sạch terminal cũ và ẩn kết quả Shadowrocket cũ đi để không bị lộ trước
    await Terminal.reset();
    document.getElementById("generatedFile").textContent = ""; 

    if (!value) {
        await Terminal.error("No input detected.");
        return;
    }

    // 2. Giả lập khởi động Engine với khoảng trễ nhẹ
    await Terminal.info("Initializing...");
    await Terminal.sleep(300 + Math.random() * 200);
    await Terminal.success("Engine Ready");
    await Terminal.sleep(200);

    // 3. Đọc dữ liệu đầu vào
    await Terminal.info("Reading input...");
    await Terminal.success(value);
    await Terminal.sleep(300);

    // 4. Bắt đầu tìm kiếm (Chờ API trả kết quả về bộ nhớ đệm trước)
    await Terminal.info("Searching location...");
    const result = await Geocoder.search(value);

    // Tạo một khoảng trễ nhỏ để mô phỏng thời gian mạng phản hồi thật
    await Terminal.sleep(500 + Math.random() * 500);

    if (!result.success) {
        await Terminal.error(result.message);
        return;
    }

    // 5. Terminal hiển thị tuần tự thông tin địa danh tìm được
    await Terminal.success(result.name);
    await Terminal.info("Latitude");
    await Terminal.success(result.lat.toString());
    await Terminal.info("Longitude");
    await Terminal.success(result.lon.toString());

    // 6. Giả lập chạy thanh nạp Progress Bar 100% cực mượt
    await Terminal.progress("Preparing Generator");

    // 7. CHỈ KHI TERMINAL HOÀN THÀNH: Mới được phép render dữ liệu ra màn hình!
    const generated = Template.build(result);
    document.getElementById("generatedFile").textContent = generated;
    MapManager.update(result);

    // Bước cuối cùng đóng gói hệ thống
    await Terminal.success("Generator Complete");
}
