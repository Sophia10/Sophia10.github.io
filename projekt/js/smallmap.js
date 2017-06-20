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
        }),
        //TODO: do we need this?
        /*
         gibs: new L.GIBSLayer('MODIS_Aqua_SurfaceReflectance_Bands721', {
         date: new Date('currentDate'),
         transparent: true
         }),*/

        //Source: http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?request=getCapabilities&service=wms&version=1.3.0
        gebco_14: L.tileLayer('http://www.gebco.net/data_and_products/gebco_web_services/web_map_service/mapserv?version=1.3.0&service=WMS&request=GetLegendGraphic&sld_version=1.1.0&layer=GEBCO_LATEST&format=image/png&STYLE=default', {
            attribution: 'Imagery reproduced from the GEBCO Grid, version 2014, <a href="www.gebco.net">www.gebco.net</a>'
        })
    };

// Karte definieren
    var smallmap = L.map('smallmap', {
        layers: [layers.Stamen_Watercolor],
        center: [25.8, 7.4], //center world map
        zoom: 1
    });

// Maßstab hinzufügen
    L.control.scale({
        maxWidth: 200,
        metric: true,
        imperial: false
    }).addTo(smallmap);

var nextProj =[
			L.marker([65.993628, -18.532469],{title:"Island - Philipp", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
			L.marker([52.1682697,-9.7406013],{title:"Irland - Sophia", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
			L.marker([49.7849845, 18.7959109],{title:"Polen - Sophia", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
			L.marker([5.100463,10.107226],{title:"Kamerun - Philipp", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
			];
			
			var nextProjLayer=L.featureGroup();
			for (var i=0; i<nextProj.length; i++) {  
				nextProjLayer.addLayer(nextProj[i]);
			}	
			nextProjLayer.addTo(smallmap);
			/*smallmap.on("zoomend", function(){
				if(smallmap.getZoom()>=15){
					smallmap.addLayer(nextProjLayer);
				} else{
					smallmap.removeLayer(nextProjLayer);
				}*/
	;		
			//});
};