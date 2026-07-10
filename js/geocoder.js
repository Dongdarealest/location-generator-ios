const Geocoder = {

    async search(query) {

        const input = Utils.detectInputType(query);

        switch (input.type) {

            case "coordinate":

                return this.fromCoordinate(query);

            case "google":

                return this.fromGoogle(query);

            case "apple":

                return this.fromApple(query);

            default:

                return this.fromPlace(query);

        }

    },

    async fromCoordinate(text) {

        const parts = text.split(",");

        return {

            success: true,

            type: "coordinate",

            name: "Custom Coordinates",

            lat: parseFloat(parts[0]),

            lon: parseFloat(parts[1])

        };

    },

    async fromPlace(query) {

        try {

            const url =
                CONFIG.GEOCODER.URL +
                "?q=" +
                encodeURIComponent(query) +
                "&format=jsonv2&limit=1";

            const response = await fetch(url);

            const data = await response.json();

            if (!data.length) {

                return {

                    success: false,

                    message: "Location not found."

                };

            }

            return {

                success: true,

                type: "place",

                name: data[0].display_name,

                lat: Number(data[0].lat),

                lon: Number(data[0].lon)

            };

        }

        catch (e) {

            return {

                success: false,

                message: e.message

            };

        }

    },

    async fromGoogle(url) {

        return {

            success: false,

            message: "Google Maps parser will be added in Sprint 1.3"

        };

    },

    async fromApple(url) {

        return {

            success: false,

            message: "Apple Maps parser will be added in Sprint 1.3"

        };

    }

};
