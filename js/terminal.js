const Terminal = {

    output: null,

    init() {

        this.output = document.getElementById("terminalOutput");

    },

    clear() {

        if (!this.output) {

            this.init();

        }

        this.output.innerHTML = "";

    },

    print(text, className = "") {

        if (!this.output) {

            this.init();

        }

        const line = document.createElement("div");

        line.className = "terminal-line " + className;

        line.textContent = "> " + text;

        this.output.appendChild(line);

        this.output.scrollTop = this.output.scrollHeight;

    },

    printInfo(text) {

        this.print(text, "terminal-info");

    },

    printSuccess(text) {

        this.print(text, "terminal-success");

    },

    printWarning(text) {

        this.print(text, "terminal-warning");

    },

    printError(text) {

        this.print(text, "terminal-error");

    }

};
