function getExif() {
    console.log("Here I am");

    var pictures = ["img1", "img2", "img3"];
    for (var i = 1; i < pictures.length; i++) {
        var img = document.getElementById("img" + i);
        console.log(img);
        EXIF.getData(img, function getLongitude() {
            var longitude = EXIF.getTag(this, "GPSLongitude");
            //var location = document.getElementById("makeAndModel");
            //location.innerHTML = longitude[0] + " " + latitude + " by " + author;
            console.log(longitude);
            var long = longitude[0] + (longitude[1] / 60);
            // add algebraic sign
            if (EXIF.getTag(this, "GPSLongitudeRef") === "W") {
                console.log("longitude: " + long * -1);
                return long * (-1);
            }
            else {
                console.log("longitude: " + long);
                return long;
            }
            //DD = d + (min/60) + (sec/3600)

        });
        EXIF.getData(img, function getLatitude() {
            var latitude = EXIF.getTag(this, "GPSLatitude");
            var lat = latitude[0] + (latitude[1] / 60);
            // add algebraic sign
            if (EXIF.getTag(this, "GPSLatitudeRef") === "S") {
                console.log("Latitude: " + lat * -1);
                return lat * (-1);
            }
            else {
                console.log("latitude: " + lat);
                return lat;
            }
        });
    }

    var img2 = document.getElementById("img2");
    EXIF.getData(img2, function () {
        var allMetaData = EXIF.getAllTags(this);
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
    });
}