const Utils = {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    detectInputType(text) {
        // Làm sạch chuỗi trước khi kiểm tra (bỏ ngoặc đơn, ngoặc vuông nếu người dùng nhập vào)
        text = text.trim().replace(/[\(\)\[\]]/g, '');

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
        // Đã làm sạch chuỗi nên Regex này sẽ check chuẩn xác 100%
        return /^-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?$/.test(text);
    },

    isGoogleMaps(text) {
        return /google\.[^/]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl/i.test(text);
    },

    isAppleMaps(text) {
        return /maps\.apple\.com/i.test(text);
    }
};
