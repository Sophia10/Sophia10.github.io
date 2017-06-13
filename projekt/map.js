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

        //Source: http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getCapabilities&service=wms&version=1.3.0
        gebco_14: L.tileLayer('http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GEBCO_LATEST&format=image/png&STYLE=default', {
            attribution: 'Imagery reproduced from the GEBCO Grid, version 2014, <a href="www.gebco.net">www.gebco.net</a>'
        })
    };

// Karte definieren
    var map = L.map('map', {
        layers: [layers.osm],
        center: [47.0997, 12.4638],
        zoom: 11
    });

// Maßstab hinzufügen
    L.control.scale({
        maxWidth: 200,
        metric: true,
        imperial: false
    }).addTo(map);
/*
// add height profile with Leaflet Elevation
    var el = L.control.elevation({
        position: "bottomright",
        theme: "steelblue-theme", //default: lime-theme
        width: 600,
        height: 210,
        margins: {
            top: 10,
            right: 20,
            bottom: 30,
            left: 50
        },
        useHeightIndicator: true, //if false a marker is drawn at map position
        interpolation: "linear", //see https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-area_interpolate
        hoverNumber: {
            decimalsX: 3, //decimals on distance (always in km)
            decimalsY: 0, //deciamls on hehttps://www.npmjs.com/package/leaflet.coordinatesight (always in m)
            formatter: undefined //custom formatter function may be injected
        },
        xTicks: undefined, //number of ticks in x axis, calculated by default according to width
        yTicks: undefined, //number of ticks on y axis, calculated by default according to height
        collapsed: false,  //collapsed mode, show chart on click or mouseover
        imperial: false    //display imperial units instead of metric
    });
    el.addTo(map);
*/
// WMTS-Layer Auswahl hinzufügen
    var layerControl = L.control.layers({
        "Orthofoto (nur &Ouml;sterreich)": layers.bmaporthofoto30cm,
        "OpenStreetMap": layers.osm
        //"CloudMade": layers.cloudmade
    }).addTo(map);

    //Exif to geojson
    var ExifImage = require('exif').ExifImage;

    $.get('exif.geojson', function (data) {
        var geojson = null;
        if (typeof data === 'string') {
            geojson = JSON.parse(data)
        } else {
            geojson = data;
        }
        var layer = L.geoJson(geojson, {
            onEachFeature: function(feature, layer) {
                var imgPath = feature.properties.imgPath;
                var html = '<a href="'+imgPath+'" target="_blank">'+imgPath+'<br/><img width="200px" src="'+imgPath+'"</img></a><br/>';
                html += 'GPS Timestamp: <br/><b>' + feature.properties.gpsTimeStr + '</b><br/>';
                html += 'Image Timestamp: <br/><b>' + feature.properties.imgTimeStr + '</b><br/>';
                html += 'Latitude: <br/><b>' + feature.geometry.coordinates[1] + '</b><br/>';
                html += 'Longitude: <br/><b>' + feature.geometry.coordinates[0] + '</b><br/>';
//                    html += JSON.stringify(feature.properties, null, 2);
                layer.bindPopup(html);
            }
        }).addTo(map);
    })
/*// leaflet-hash aktivieren
    var hash = new L.Hash(map);

//add icons
    var hutIcon = L.icon({
        iconUrl: 'icons/hut.png',
        iconAnchor: [16, 37]
    });
    var start = L.icon({
        iconUrl: 'icons/start.png',
        iconAnchor: [16, 37]
    });
    var finish = L.icon({
        iconUrl: 'icons/finish.png',
        iconAnchor: [16, 37]
    });

    var markers = [
        L.marker([47.08111, 12.42563], {title: "Badener Hütte", icon: hutIcon}),
        L.marker([47.12388, 12.45134], {title: "Venedigerhaus", icon: hutIcon}),
        L.marker([47.1190453, 12.4965305], {title: "Matreier Tauernhaus", icon: hutIcon})
    ];

    var startFinish = [
        L.marker([47.081220061570853, 12.425527399026949], {title: "Start", icon: start}),
        L.marker([47.11900448608926, 12.496790516942312], {title: "Ziel", icon: finish})
    ];

// feature group to add to map
    var hutsLayer = L.featureGroup();
    for (var i = 0; i < markers.length; i++) {
        hutsLayer.addLayer(markers[i]);
    }
//hutsLayer.addTo(map); -> only at certain zoom level, see below
    var startFinishLayer = L.featureGroup();
    for (var j = 0; j < startFinish.length; j++) {
        startFinishLayer.addLayer(startFinish[j]);
    }
    startFinishLayer.addTo(map);

//show huts only at certain zoom level
    map.on("zoomend", function () { // zoom end xD
            if (map.getZoom() >= 13) {
                map.addLayer(hutsLayer);
            }
            else {
                map.removeLayer(hutsLayer);
            }
        }
    );


     // add geoJSON
     L.geoJSON(window.etappeO5, {
     onEachFeature: el.addData.bind(el) //Leaflet Elevation
     }).addTo(map);*/
    /*function loadTrack(currentTrack) {
        document.getElementById("title").innerHTML = window.ETAPPENINFO[currentTrack].titel;
        document.getElementById("shortText").innerHTML = window.ETAPPENINFO[currentTrack].text;
        document.getElementById("description").innerHTML = window.ETAPPENINFO[currentTrack].beschreibung;

        // GPX track import with Leaflet Omnivore
        var track = omnivore.gpx('data/' + currentTrack).addTo(map);
        //Little Comment
        // add popup, bounds and height profile
        track.on('ready', function () {
            // Popup hinzufügen
            var markup = '<h3>' + window.ETAPPENINFO[currentTrack].titel + '</h3>';
            markup += '<i>' + window.ETAPPENINFO[currentTrack].text + '</i>';
            markup += '<li>Ausgangspunkt: ' + window.ETAPPENINFO[currentTrack].ausgangspunkt + '</li>';
            markup += '<li>Endpunkt:' + window.ETAPPENINFO[currentTrack].endpunkt + '</li>';
            markup += '<li>Höhenmeter bergauf: ' + window.ETAPPENINFO[currentTrack].auf + '</li>';
            markup += '<li>Höhenmeter bergab: ' + window.ETAPPENINFO[currentTrack].ab + '</li>';
            markup += '<li>Höchster Punkt: ' + window.ETAPPENINFO[currentTrack].max + '</li>';
            markup += '<li>Schwierigkeitsgrad: ' + window.ETAPPENINFO[currentTrack].schwierigkeit + '</li>';
            markup += '<li>Streckenlänge (in km): ' + window.ETAPPENINFO[currentTrack].laenge + '</li>';
            markup += '<li>Gehzeit (in Stunden): ' + window.ETAPPENINFO[currentTrack].zeit + '</li>';
            markup += '<li>Einkehrmöglichkeiten: ' + window.ETAPPENINFO[currentTrack].einkehr + '</li>';
            markup += '<li><a href="http://www.tirol.at/reisefuehrer/sport/wandern/wandertouren/a-adlerweg-etappe-o5-badener-huette-matreier-tauernhaus">Weitere Informationen</a></li>';

            // set bounds
            map.fitBounds(track.getBounds());

            // generate height profile
            el.clear();
            track.eachLayer(function (layer) {
                el.addData(layer.feature);
                // get points from feature to further use them
                var pts = layer.feature.geometry.coordinates;
                //console.log(pts);
                // read coordinate pairs from points-layer (start with second point/first pair)
                for (var i = 1; i < pts.length; i++) {
                    //console.log(pts[i]); // current point
                    //console.log(pts[i-1]); // previous point
                    // calculate distance
                    var dist = map.distance(
                        [pts[i][1], pts[i][0]], // lat and lng values per point
                        [pts[i - 1][1], pts[i - 1][0]]
                    ).toFixed(2); //round to zero decimal points
                    // calculate height difference
                    var delta = (pts[i][2] - pts[i - 1][2]).toFixed(2);

                    // calculate slope
                    var slopeRad = Math.atan(delta / dist);
                    var slope = (slopeRad * (180 / Math.PI)).toFixed(2); //in degrees
                    //console.log(delta, " Höhenmeter auf ", dist, "m Distanz, also", slope, "Grad Steigung.");

                    // color definitions
                    //rot: ['#ffffb2','#fed976','#feb24c','#fd8d3c','#f03b20','#bd0026'] //from colorbrewer.org
                    //grün: ['#edf8e9','#c7e9c0','#a1d99b','#74c476','#31a354','#006d2c']

                    // add switch-statement to change colors according to the steepness of the terrain
                    var color;

                    switch (true) { // checks if condition is true, not for certain values of a variable
                        case (slope >= 20):
                            color = "#bd0026";
                            break;
                        case (slope >= 15):
                            color = "#f03b20";
                            break;
                        case (slope >= 10):
                            color = "#fd8d3c";
                            break;
                        case (slope >= 5):
                            color = "#feb24c";
                            break;
                        case (slope >= 1):
                            color = "#fed976";
                            break;
                        case (slope >= -1):
                            color = "#ffffff";
                            break; // white instead of "yellow"
                        case (slope >= -5):
                            color = "#d9f0a3";
                            break;
                        case (slope >= -10):
                            color = "#addd8e";
                            break;
                        case (slope >= -15):
                            color = "#78c679";
                            break;
                        case (slope >= -20):
                            color = "#31a354";
                            break;
                        case (slope < -20):
                            color = "#006837";
                            break;
                    }
                    //console.log(slope + " " + color);

                    // add new polyline with slope colors
                    var pointA = new L.LatLng(pts[i][1], pts[i][0]);
                    var pointB = new L.LatLng(pts[i - 1][1], pts[i - 1][0]);
                    var pointList = [pointA, pointB];

                    var polyline = new L.Polyline(pointList, {
                        color: color,
                        weight: 6,
                        opacity: 1,
                        smoothFactor: 1
                    });
                    polyline.addTo(map).bindPopup(markup, {maxWidth: 450});
                }
            });
        });
    }

// change stages
    var stageSelector = document.getElementById("stages");
    stageSelector.onchange = function (evt) {
        console.log("Change event: ", evt);
        var selectedTrack = stageSelector[stageSelector.selectedIndex].value;
        console.log("GPX Track laden: ", stageSelector[stageSelector.selectedIndex].value);
        loadTrack(stageSelector[stageSelector.selectedIndex].value);
    };
    loadTrack('AdlerwegEtappe01.gpx');*/

};