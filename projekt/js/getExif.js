function getExif() {
    console.log("Here I am");

    var pictures = ["img1", "img2", "img3"];
    var markerGroup = L.featureGroup();

    var pictureIcon = L.icon({
        iconUrl: 'icons/picture.png',
        iconAnchor: [16, 37]
    });

    for (var i = 1; i < pictures.length; i++) {
        var img = document.getElementById("img" + i);
        console.log(img);
        var picLng = EXIF.getData(img, function getLongitude() {
            var longitude = EXIF.getTag(this, "GPSLongitude");
            console.log(longitude);
            //Decimal Coordinates = degrees + (decimal minutes/60)
            var picLng = longitude[0] + (longitude[1] / 60);
            // add algebraic sign
            if (EXIF.getTag(this, "GPSLongitudeRef") === "W") {
                console.log("longitude: " + picLng * -1);
                -Math.abs(picLng);
            }
            else {
                console.log("longitude: " + picLng);
            }
            return picLng;
        });

        var picLat = EXIF.getData(img, function getLatitude() {
            var latitude = EXIF.getTag(this, "GPSLatitude");
            var picLat = latitude[0] + (latitude[1] / 60);
            // add algebraic sign
            if (EXIF.getTag(this, "GPSLatitudeRef") === "S") {
                console.log("Latitude: " + picLat * -1);
                -Math.abs(picLat);
            } else {
                console.log("latitude: " + picLat);
            }
            return picLat
        });
        var marker = L.marker([picLng, picLat], {icon: pictureIcon});
        markerGroup.addLayer(marker)
    }

    return markerGroup;


    /*var img2 = document.getElementById("img2");
    EXIF.getData(img2, function () {
        var allMetaData = EXIF.getAllTags(this);
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
     });*/
}