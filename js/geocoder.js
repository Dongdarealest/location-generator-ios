const Geocoder = {

    async search(query) {

        try {

            if (Utils.isCoordinate(query)) {

                const parts = query.split(",");

                return {

                    success: true,

                    type: "coordinate",

                    name: "Custom Coordinates",

                    lat: parseFloat(parts[0]),

                    lon: parseFloat(parts[1])

                };

            }

            const url =
                CONFIG.GEOCODER.URL +
                "?q=" +
                encodeURIComponent(query) +
                "&format=" +
                CONFIG.GEOCODER.FORMAT +
                "&limit=" +
                CONFIG.GEOCODER.LIMIT;

            const response = await fetch(url, {
                headers: {
                    "Accept": "application/json"
                }
            });

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

                lat: parseFloat(data[0].lat),

                lon: parseFloat(data[0].lon)

            };

        }

        catch (error) {

            return {

                success: false,

                message: error.message

            };

        }

    }

};
