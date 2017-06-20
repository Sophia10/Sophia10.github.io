function getLatitude() {
    var img = document.getElementById("img1");
    return EXIF.getData(img, function getLatitude() {
        var latitude = EXIF.getTag(this, "GPSLatitude");
        var picLat = latitude[0] + (latitude[1] / 60);
        // add algebraic sign
        if (EXIF.getTag(this, "GPSLatitudeRef") === "S") {
            console.log("Latitude: " + picLat * -1);
            -Math.abs(picLat);
        } else {
            console.log("latitude: " + picLat);
        }
        return picLat;
    })
}