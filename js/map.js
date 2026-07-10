const MapManager = {

    map: null,

    marker: null,

    initialized: false,

    init() {

        if (this.initialized) return;

        this.map = L.map("map", {
            zoomControl: true
        }).setView([21.0285, 105.8542], 5);

        L.tileLayer(
            "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
                maxZoom: 19
            }
        ).addTo(this.map);

        this.initialized = true;

    },

    update(location) {

        if (!this.initialized) return;

        const latlng = [location.lat, location.lon];

        if (!this.marker) {

            this.marker = L.marker(latlng, {
                draggable: true
            }).addTo(this.map);

        } else {

            this.marker.setLatLng(latlng);

        }

        this.map.flyTo(latlng, 15, {
            animate: true,
            duration: 1.4
        });

    }

};
