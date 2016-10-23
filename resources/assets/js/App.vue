<template>
	<div id="map" class="map"></div>
</template>


<script>

require("./leaflet.js");
require("./romania.js");

var map;
var ajaxRequest;
var plotlist;
var plotlayers=[];

function initmap() {

	// set up the map
	map = new L.Map('map');

	// create the tile layer with correct attribution
	var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
	var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
	var osm = new L.TileLayer(osmUrl, {maxZoom: 10, minZoom: 4, attribution: osmAttrib});

	L.geoJson(dataRo).addTo(map);
	// start the map in Romania
	map.setView(new L.LatLng(45.94, 24.97),7);
	map.addLayer(osm);
}

export default {
    name: 'app',
    mounted() {
    	initmap();
    }
}
</script>