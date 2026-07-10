const Terminal = {

    output: null,
    baseSpeed: 16, // Tốc độ gõ cơ bản

    init() {
        this.output = document.getElementById("terminal");
        if (!this.output) {
            console.error("Terminal element not found.");
        }
    },

    async reset() {
        if (!this.output) {
            this.init();
        }
        this.output.innerHTML = "";
    },

    async write(text, className = "") {
        if (!this.output) {
            this.init();
        }

        const line = document.createElement("div");
        // Thêm class 'typing' để CSS tạo hiệu ứng con trỏ nhấp nháy cho dòng đang chạy
        line.className = "terminal-line typing " + className;
        this.output.appendChild(line);

        const prefix = "> ";
        for (let i = 0; i < prefix.length; i++) {
            line.textContent += prefix[i];
            await this.sleep(this.baseSpeed);
        }

        for (let i = 0; i < text.length; i++) {
            line.textContent += text[i];
            // TẠO ĐỘ TRỄ NGẪU NHIÊN: Giúp chữ chạy lúc nhanh lúc chậm cực kỳ thật
            const randomDelay = this.baseSpeed + Math.random() * 25;
            await this.sleep(randomDelay);
        }

        // Chạy xong dòng nào thì xóa class 'typing' để tắt con trỏ nhấp nháy ở dòng đó
        line.classList.remove("typing");
        this.output.scrollTop = this.output.scrollHeight;
        
        // Trễ ngẫu nhiên một chút trước khi kết thúc lệnh để chuyển sang dòng tiếp theo
        await this.sleep(200 + Math.random() * 200);
    },

    async progress(title) {
        await this.write(title, "terminal-info");

        const line = document.createElement("div");
        line.className = "terminal-line typing"; // Thêm con trỏ cho thanh progress
        this.output.appendChild(line);

        let current = 0;
        const total = 20;

        while (current <= total) {
            line.textContent =
                "[" +
                "█".repeat(current) +
                "░".repeat(total - current) +
                "] " + Math.floor((current / total) * 100) + "%"; // Hiện thêm số % cho thật

            this.output.scrollTop = this.output.scrollHeight;

            // GIẢ LẬP ĐỘ TRỄ TIẾN TRÌNH: Tạo các đoạn khựng ngẫu nhiên (ví dụ đến 40% hoặc 85% bị đứng hình 1 nhịp)
            let progressDelay = 30 + Math.random() * 50;
            if (current === 5 || current === 14 || current === 18) {
                progressDelay = 250 + Math.random() * 300; // Khựng lại từ 0.2 - 0.5 giây
            }

            await this.sleep(progressDelay);
            current++;
        }

        line.classList.remove("typing");
        await this.sleep(200);
    },

    async info(text) {
        await this.write(text, "terminal-info");
    },

    async success(text) {
        await this.write("✓ " + text, "terminal-success");
    },

    async warning(text) {
        await this.write("! " + text, "terminal-warning");
    },

    async error(text) {
        await this.write("✕ " + text, "terminal-error");
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
