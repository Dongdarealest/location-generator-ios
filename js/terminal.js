const Terminal = {
    output: null,

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

    async write(text, className = "", delay = 80) {
        if (!this.output) this.init();

        const line = document.createElement("div");
        line.className = "terminal-line typing " + className;
        line.textContent = "> " + text;
        this.output.appendChild(line);
        
        this.output.scrollTop = this.output.scrollHeight;

        await this.sleep(delay);
        line.classList.remove("typing");
    },

    async progress(title) {
        if (!this.output) this.init();
        
        await this.write(title, "terminal-info", 100);

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

            let progressDelay = 20 + Math.random() * 30;
            if (current === 4 || current === 11 || current === 17) {
                progressDelay = 200 + Math.random() * 150; 
            }

            await this.sleep(progressDelay);
            current++;
        }

        line.classList.remove("typing");
        await this.sleep(100);
    },

    async info(text) {
        await this.write(text, "terminal-info", 60);
    },

    async success(text) {
        await this.write("✓ " + text, "terminal-success", 80);
    },

    // Hàm xuất dữ liệu màu vàng hổ phách nổi bật kết quả
    async data(text) {
        await this.write("✓ " + text, "terminal-data", 80);
    },

    async warning(text) {
        await this.write("! " + text, "terminal-warning", 100);
    },

    async error(text) {
        await this.write("✕ " + text, "terminal-error", 100);
    },

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
};
