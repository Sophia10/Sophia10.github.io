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
    };

// Karte definieren
    var smallmap = L.map('smallmap', {
        layers: [layers.Stamen_Watercolor],
        center: [25.8, 7.4], //center world map
        zoom: 1
    });

var nextProj =[
			L.marker([65.993628, -18.532469],{title:"Island - Philipp", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
			L.marker([52.1682697,-9.7406013],{title:"Irland - Sophia", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
			L.marker([49.7849845, 18.7959109],{title:"Polen - Sophia", icon: L.icon({iconUrl:'icons/nextProj.png', iconAnchor:[16,37]}) }),
    L.marker([5.100463, 10.107226], {
        title: "Kamerun - Philipp",
        icon: L.icon({iconUrl: 'icons/nextProj.png', iconAnchor: [16, 37]})
    })
			];
			
			var nextProjLayer=L.featureGroup();
			for (var i=0; i<nextProj.length; i++) {  
				nextProjLayer.addLayer(nextProj[i]);
			}	
			nextProjLayer.addTo(smallmap);
};