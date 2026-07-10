const Terminal = {
    output: null,
    baseSpeed: 15, // Tốc độ gõ chữ cơ bản (ms)
    queue: Promise.resolve(), // Hàng đợi để ép các dòng phải xếp hàng chạy tuần tự

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
        this.queue = Promise.resolve(); // Reset lại hàng đợi
    },

    // Hàm đứng sau quản lý việc xếp hàng gõ chữ
    async enqueue(action) {
        this.queue = this.queue.then(async () => {
            await action();
        });
        return this.queue;
    },

    async write(text, className = "") {
        // Ép dòng lệnh này phải vào hàng đợi xếp hàng
        return this.enqueue(async () => {
            if (!this.output) this.init();

            const line = document.createElement("div");
            line.className = "terminal-line typing " + className;
            this.output.appendChild(line);

            const prefix = "> ";
            for (let i = 0; i < prefix.length; i++) {
                line.textContent += prefix[i];
                await this.sleep(this.baseSpeed);
            }

            for (let i = 0; i < text.length; i++) {
                line.textContent += text[i];
                // Độ trễ ngẫu nhiên tạo cảm giác phần cứng xử lý thật
                await this.sleep(this.baseSpeed + Math.random() * 20);
            }

            line.classList.remove("typing");
            this.output.scrollTop = this.output.scrollHeight;
            
            // Khoảng nghỉ ngắn giữa các dòng lệnh (từ 0.25 đến 0.5 giây) để trông thật hơn
            await this.sleep(250 + Math.random() * 250);
        });
    },

    async progress(title) {
        return this.enqueue(async () => {
            if (!this.output) this.init();
            
            await this.write(title, "terminal-info");

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

                // Giả lập thanh tiến trình bị khựng lại ngẫu nhiên ở một số đoạn nạp dữ liệu
                let progressDelay = 30 + Math.random() * 40;
                if (current === 4 || current === 11 || current === 17) {
                    progressDelay = 300 + Math.random() * 200; 
                }

                await this.sleep(progressDelay);
                current++;
            }

            line.classList.remove("typing");
            await this.sleep(150);
        });
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
