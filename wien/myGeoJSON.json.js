/**
 * Created by Sophia on 03.05.2017.
 */
// variable is added to global window-object to be accessible from other locations
window.my_geojson = {
    "type": "FeatureCollection",
    //every feature is an object and therefore written in {]
    "features": [
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", // key-value pair
                "coordinates": [16.316, 48.227] // coordinates in latlng
            },
            "properties": {
                "NAME": "Friedhof Hernals",
                "color": "black"
            }
        },
        {
            "type": "Feature",
            "geometry": {
                "type": "Point", // key-value pair
                "coordinates": [16.326, 48.227] // coordinates in latlng
            },
            "properties": {
                "color": "green"
            }
        }

    ]
    //"type": "Point", // key-value pair
    //"coordinates": [16.316, 48.227] // coordinates in latlng
};