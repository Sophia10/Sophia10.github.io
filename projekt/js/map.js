window.onload = function () {
// WMTS-Layer
    L.TileLayer.Common = L.TileLayer.extend({
        initialize: function (options) {
            L.TileLayer.prototype.initialize.call(this, this.url, options);
        }
    });
    var layers = {
        bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
            subdomains: ['maps', 'maps1', 'maps2', 'maps3', 'maps4'],
            attribution: 'Datenquelle: <a href="http://www.basemap.at/">basemap.at</a>'
        }),
        osm: L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            subdomains: ['a', 'b', 'c'],
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'}),
        ortophoto: L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
        }),
        laender_topo: OpenMapSurfer_Roads = L.tileLayer('http://korona.geog.uni-heidelberg.de/tiles/roads/x={x}&y={y}&z={z}', {
            maxZoom: 20,
            attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }),

        //Source: http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getCapabilities&service=wms&version=1.3.0
        gebco_14: L.tileLayer('http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GEBCO_LATEST&format=image/png&STYLE=default', {
            attribution: 'Imagery reproduced from the GEBCO Grid, version 2014, <a href="www.gebco.net">www.gebco.net</a>'
        })
    };

// Karte definieren
    var map = L.map('map', {
        layers: [layers.osm],
        center: [25.8, 7.4],
        zoom: 1
    });

// Maßstab hinzufügen
    L.control.scale({
        maxWidth: 200,
        metric: true,
        imperial: false
    }).addTo(map);

// WMTS-Layer Auswahl hinzufügen
    var layerControl = L.control.layers({
        "Orthofoto (nur &Ouml;sterreich)": layers.bmaporthofoto30cm,
        "OpenStreetMap": layers.osm,
        "Orthophoto": layers.ortophoto,
        "L&aumlnder-Topographie": layers.laender_topo
        //"CloudMade": layers.cloudmade
    }).addTo(map);

// leaflet-hash aktivieren
    var hash = new L.Hash(map);

    getExif();
    /* URL of the image (must be on the same domain!)
    var file = "img/RussiaSophia-6.jpg";

// define your own callback function
    function mycallback() {
        // either call the ImageInfo.getAllFields([file]) function which returns an object holding all the info

        // or call ImageInfo.getField([file], [field]) to get a specific field
        alert(
            "Format: " + ImageInfo.getField(file, "format") + ", dimensions : " + ImageInfo.getField(file, "width") + "x" + ImageInfo.getField(file, "height")
        );
    }*/

// finally, load the data

    //ImageInfo.loadInfo(file, mycallback);

};