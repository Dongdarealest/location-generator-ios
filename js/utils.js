const Utils = {

    sleep(ms) {

        return new Promise(resolve => setTimeout(resolve, ms));

    },

    detectInputType(text) {

        text = text.trim();

        if (this.isCoordinate(text)) {

            return {
                type: "coordinate"
            };

        }

        if (this.isGoogleMaps(text)) {

            return {
                type: "google"
            };

        }

        if (this.isAppleMaps(text)) {

            return {
                type: "apple"
            };

        }

        return {
            type: "place"
        };

    },

    isCoordinate(text) {

        return /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(text);

    },

    isGoogleMaps(text) {

        return /google\.[^/]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl/i.test(text);

    },

    isAppleMaps(text) {

        return /maps\.apple\.com/i.test(text);

    }

};
