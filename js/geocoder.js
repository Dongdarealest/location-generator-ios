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
            // 1. Sửa lại cách nối chuỗi URL chính xác theo file config.js
            const url = `${CONFIG.GEOCODER.URL}?q=${encodeURIComponent(query)}&format=${CONFIG.GEOCODER.FORMAT}&limit=${CONFIG.GEOCODER.LIMIT}`;

            // 2. Thêm Header User-Agent để không bị OpenStreetMap chặn
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'LocationGeneratorIOS/1.0 (contact: github-username)' // Thay github-username bằng tên github của bạn nếu muốn
                }
            });

            if (!response.ok) {
                return {
                    success: false,
                    message: `API Error: ${response.status}`
                };
            }

            const data = await response.json();

            if (!data || !data.length) {
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
    },,

    async fromGoogle(url) {

    try {

        let lat = null;

        let lon = null;

        const at = url.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

        if (at) {

            lat = Number(at[1]);

            lon = Number(at[2]);

        }

        if (lat === null) {

            const u = new URL(url);

            const q = u.searchParams.get("q");

            if (q && Utils.isCoordinate(q)) {

                const p = q.split(",");

                lat = Number(p[0]);

                lon = Number(p[1]);

            }

        }

        if (lat === null) {

            return {

                success: false,

                message: "Google Maps URL doesn't contain coordinates."

            };

        }

        return {

            success: true,

            type: "google",

            name: "Google Maps",

            lat,

            lon

        };

    }

    catch {

        return {

            success: false,

            message: "Invalid Google Maps URL."

        };

    }

},

    async fromApple(url) {

    try {

        const u = new URL(url);

        const ll = u.searchParams.get("ll");

        if (!ll) {

            return {

                success: false,

                message: "Apple Maps URL doesn't contain coordinates."

            };

        }

        const parts = ll.split(",");

        return {

            success: true,

            type: "apple",

            name: "Apple Maps",

            lat: Number(parts[0]),

            lon: Number(parts[1])

        };

    }

    catch {

        return {

            success: false,

            message: "Invalid Apple Maps URL."

        };

    }

},
