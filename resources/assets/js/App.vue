<template>
<div>
	<div class="columns">
		<div class="column">
			<multiselect
		      placeholder="Boala"
		      :selected="selected"
		      :options="options"
		      @input="updateSelected">
		    </multiselect>
		</div>
		<div class="column">
			<multiselect
		      placeholder="An"
		      :selected="selectedYear"
		      :options="years"
		      @input="updateSelectedYear">
		    </multiselect>
		</div>
	</div>
	<div id="map" class="map"></div>
</div>
</template>


<script>

require("./leaflet.js");

var map;
function initmap(judete) {
var judete = judete;
map = L.map('map').setView([45.94, 24.97], 7);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.light'
	}).addTo(map);


	// control that shows state info on hover
	var info = L.control();

	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	};

	info.update = function (props) {
		this._div.innerHTML = '<h4>Data info</h4>' +  (props ?
			'<b>' + props.name + '</b><br />' + props.diseaseValue + ' incidente'
			: 'Pune mouse-ul pe un judet');
	};

	info.addTo(map);


	// get color depending on population density value
	function getColor(d) {
		return d > 1000 ? '#800026' :
				d > 500  ? '#BD0026' :
				d > 200  ? '#E31A1C' :
				d > 100  ? '#FC4E2A' :
				d > 50   ? '#FD8D3C' :
				d > 20   ? '#FEB24C' :
				d > 10   ? '#FED976' :
							'#FFEDA0';
	}

	function style(feature) {
		return {
			weight: 2,
			opacity: 1,
			color: 'white',
			dashArray: '3',
			fillOpacity: 0.7,
			fillColor: getColor(feature.properties.diseaseValue)
		};
	}

	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 2,
			color: '#666',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}

		info.update(layer.feature.properties);
	}

	var geojson;

	function resetHighlight(e) {
		geojson.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight,
			click: zoomToFeature
		});
	}

	console.log('init judete');
	console.log(judete);

	geojson = L.geoJson(judete, {
		style: style,
		onEachFeature: onEachFeature
	}).addTo(map);

	map.attributionControl.addAttribution('Data &copy; <a href="http://data.gov.ro">Data Gov</a>');


	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

		var div = L.DomUtil.create('div', 'info legend'),
			grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			labels = [],
			from, to;

		for (var i = 0; i < grades.length; i++) {
			from = grades[i];
			to = grades[i + 1];

			labels.push(
				'<i style="background:' + getColor(from + 1) + '"></i> ' +
				from + (to ? '&ndash;' + to : '+'));
		}

		div.innerHTML = labels.join('<br>');
		return div;
	};

	legend.addTo(map);
}


import Multiselect from 'vue-multiselect'
export default {
	components: { Multiselect },
    name: 'app',
    data () {
    	return {
    		selected: null,
    		selectedYear: null,
    		options: ['Cancer'],
    		years: ['2012', '2013'],
    		judete: {}
    	}
    },
    mounted() {
    	initmap();
    	const self = this;
    	this.$http.get('/values/diseases').then((response) => {
			// success callback

			var el = JSON.parse(response.body);
			console.log(response.body);
			//self.options = el;
		}, (response) => {
		// error callback
		});
		this.$http.get('/values/diseaseYears').then((response) => {
			// success callback
			// self.years = response.json();
		}, (response) => {
		// error callback
		});
    },
    methods: {
		updateSelected (newSelected) {
    	const self = this;
			this.selected = newSelected
			// console.log(newSelected)
			this.updateData();

		},
		updateSelectedYear (newSelected) {
    	const self = this;
			this.selectedYear = newSelected
			this.updateData();
		},

		updateData(){
			this.$http.get('/values/valueByDiseaseAndYear/'+this.selected+'/' + this.selectedYear).then((response) => {
			// success callback
			self.judete = JSON.parse(response.body);
			// console.log(self.judete)
			map.remove();
			initmap(self.judete)
			}, (response) => {
			// error callback
			});
		}
	}
}
</script>