function getExif() {
    console.log("Here I am");

    var img1 = document.getElementById("img1");
    EXIF.getData(img1, function () {
        var longitude = EXIF.GPSTags(this,"GPSLongitude");
        var latitude = EXIF.GPSTags(this, "GPSLongitude");
        var author = EXIF.getTag(this, "Copyright");
        var location = document.getElementById("makeAndModel");
        location.innerHTML = longitude + " " + latitude + "by " + author;
    });

    var img2 = document.getElementById("img2");
    EXIF.getData(img2, function () {
        var allMetaData = EXIF.getAllTags(this);
        var allMetaDataSpan = document.getElementById("allMetaDataSpan");
        allMetaDataSpan.innerHTML = JSON.stringify(allMetaData, null, "\t");
    })
};