const Terminal = {

    output: null,

    speed: 18,

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

        line.className = "terminal-line " + className;

        this.output.appendChild(line);

        const prefix = "> ";

        for (let i = 0; i < prefix.length; i++) {

            line.textContent += prefix[i];

            await this.sleep(this.speed);

        }

        for (let i = 0; i < text.length; i++) {

            line.textContent += text[i];

            await this.sleep(this.speed);

        }

        this.output.scrollTop = this.output.scrollHeight;

        await this.sleep(180);

    },

    async progress(title) {

        await this.write(title, "terminal-info");

        const line = document.createElement("div");

        line.className = "terminal-line";

        this.output.appendChild(line);

        for (let i = 0; i <= 20; i++) {

            line.textContent =

                "[" +

                "█".repeat(i) +

                "░".repeat(20 - i) +

                "]";

            await this.sleep(45);

        }

        await this.sleep(150);

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
