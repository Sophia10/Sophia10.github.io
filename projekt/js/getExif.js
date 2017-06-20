function getExif() {
    console.log("Here I am");

    //var pictures = ["img1", "img2", "img3"];
    var markerGroup = L.featureGroup();

    var pictureIcon = L.icon({
        iconUrl: 'icons/picture.png',
        iconAnchor: [16, 37]
    });
    var makeMarker = function () {
        console.log('For-Schleife' + picLatitude + " " + picLongitude);
        var marker = L.marker([picLongitude, picLatitude], {icon: pictureIcon});
        markerGroup.addLayer(marker);
        return markerGroup;
    };

    var img = document.getElementById("img1");
    //for (var i = 1; i < pictures.length; i++) {


    function getLongitude() {
        var longitude = EXIF.getTag(this, "GPSLongitude");
        console.log(longitude);
        //Decimal Coordinates = degrees + (decimal minutes/60)
        var picLng = longitude[0] + (longitude[1] / 60);
        // add algebraic sign
        if (EXIF.getTag(this, "GPSLongitudeRef") === "W") {
            console.log("longitude: " + picLng * -1);
            picLng = -(longitude[0] + (longitude[1] / 60));
        }
        else {
            console.log("longitude: " + picLng);
        }
        return picLng;
    }

    var picLongitude = EXIF.getData(img, getLongitude());
    console.log(picLongitude);
    //for (var i = 1; i < pictures.length; i++) {
    var picLatitude = EXIF.getData(img, function getLatitude() {
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
    });

    return makeMarker();
}