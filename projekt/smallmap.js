window.onload = function () {
// WMTS-Layer
    L.TileLayer.Common = L.TileLayer.extend({
        initialize: function (options) {
            L.TileLayer.prototype.initialize.call(this, this.url, options);
        }
    });
    var layers = {
        Stamen_Watercolor : L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 1,
		maxZoom: 16,
		ext: 'png'
	})
		new L.GIBSLayer('MODIS_Aqua_SurfaceReflectance_Bands721', {
		date: new Date('currentDate'),
		transparent: true
	})
     
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

// WMTS-Layer Auswahl hinzufügen
    var layerControl = L.control.layers({
        "Orthofoto (nur &Ouml;sterreich)": layers.Stamen_Watercolor
        //"CloudMade": layers.cloudmade
    }).addTo(map);

// leaflet-hash aktivieren
    var hash = new L.Hash(map);
};