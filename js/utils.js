const Utils = {

    sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    },

    isCoordinate(text) {

        return /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(text);

    }

};
