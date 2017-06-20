window.onload = function () {
// WMTS-Layer
    L.TileLayer.Common = L.TileLayer.extend({
        initialize: function (options) {
            L.TileLayer.prototype.initialize.call(this, this.url, options);
        }
    });
	
    var layers = {
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
		/*borders: L.GIBSLayer('Reference_Features', {
            date: new Date('20.06.2017'),
            transparent: true
          })*/
		/*NASA: new L.GIBSLayer('MODIS_Aqua_SurfaceReflectance_Bands721', {
		setDate(date: '2015/04/01'),
		transparent: true
		})*/
    };

// Karte definieren
    var map = L.map('map', {
        layers: [layers.osm],
        center: [25.8, 7.4],
        zoom: 2
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
        "L&aumlnder-Topographie": layers.laender_topo,
		//"NASA": layers.borders
    }).addTo(map);

// leaflet-hash aktivieren
    var hash = new L.Hash(map);

    //load image data
    getExif();


};