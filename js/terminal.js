const Terminal = {
    output: null,
    queue: Promise.resolve(), // Hàng đợi bắt buộc các lệnh phải chạy tuần tự

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
        this.queue = Promise.resolve(); // Khởi tạo lại hàng đợi sạch
    },

    async enqueue(action) {
        this.queue = this.queue.then(async () => {
            await action();
        });
        return this.queue;
    },

    // Hàm xuất dòng lệnh xuất hiện ngay lập tức nhưng có nhịp phản hồi của máy tính
    async write(text, className = "", delayBeforeNext = 150) {
        return this.enqueue(async () => {
            if (!this.output) this.init();

            const line = document.createElement("div");
            line.className = "terminal-line typing " + className;
            line.textContent = "> " + text;
            this.output.appendChild(line);
            
            this.output.scrollTop = this.output.scrollHeight;

            // Giữ con trỏ nhấp nháy một chút rồi tắt đi
            await this.sleep(delayBeforeNext);
            line.classList.remove("typing");
        });
    },

    // Thanh % tiến trình chạy giật cục thực tế mà bạn thích
    async progress(title) {
        return this.enqueue(async () => {
            if (!this.output) this.init();
            
            // Hiện tiêu đề thanh tiến trình
            const infoLine = document.createElement("div");
            infoLine.className = "terminal-line terminal-info";
            infoLine.textContent = "> " + title;
            this.output.appendChild(infoLine);

            // Tạo dòng chạy %
            const line = document.createElement("div");
            line.className = "terminal-line typing";
            this.output.appendChild(line);

            let current = 0;
            const total = 20;

            while (current <= total) {
                line.textContent =
                    "[" +
                    "█".repeat(current) +
                    "░".repeat(total - current) +
                    "] " + Math.floor((current / total) * 100) + "%";

                this.output.scrollTop = this.output.scrollHeight;

                // Giữ nguyên logic khựng ngẫu nhiên của thanh progress làm bạn thích
                let progressDelay = 20 + Math.random() * 30;
                if (current === 5 || current === 12 || current === 18) {
                    progressDelay = 250 + Math.random() * 200; 
                }

                await this.sleep(progressDelay);
                current++;
            }

            line.classList.remove("typing");
            await this.sleep(100);
        });
    },

    // Các hàm helper gọi lệnh với nhịp độ trễ khác nhau để tạo cảm giác thật
    async info(text) {
        // Các dòng thông báo hệ thống xuất hiện nhanh, nghỉ 100ms
        await this.write(text, "terminal-info", 100);
    },

    async success(text) {
        // Dòng trạng thái thành công, nghỉ 150ms
        await this.write("✓ " + text, "terminal-success", 150);
    },

    async warning(text) {
        await this.write("! " + text, "terminal-warning", 200);
    },

    async error(text) {
        await this.write("✕ " + text, "terminal-error", 200);
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
