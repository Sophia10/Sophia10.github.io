function getExif() {
    console.log("Here I am");

    //var pictures = ["img1", "img2", "img3"];
    var markerGroup = L.featureGroup();

    var pictureIcon = L.icon({
        iconUrl: 'icons/picture.png',
        iconAnchor: [16, 37]
    });
    var makeMarker = function () {
        console.log('For-Schleife' + getLatitude() + " " + getLatitude());
        //var marker = L.marker([getLatitude(), getLatitude()], {icon: pictureIcon});

        var popup = '<a href="img/RussiaSophia-6.jpg"><img src="img/RussiaSophia-6.jpg" id="img1" width = "200px"/></a>';
        popup += '<br/>Sophia Paul';

        var marker = L.marker([(59 + 57 / 60 + 0.4 / 60),
            (30 + 20 / 60 + 54.3 / 60)], {icon: pictureIcon})
            .bindPopup(popup);
        markerGroup.addLayer(marker);
        return markerGroup;
    };


    //for (var i = 1; i < pictures.length; i++) {


    /*function getLongitude() {
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
     console.log(picLongitude);*/
    //for (var i = 1; i < pictures.length; i++) {

    return makeMarker();
}