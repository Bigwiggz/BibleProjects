/*
Leaflet Javascript File
*/

///////////////////////////////////////////
//Create Map with coordinates
///////////////////////////////////////////
let map = L.map('map').setView([31.776121, 35.228164], 13);

// Inject minimal label styling for permanent feature labels (if not already present)
if (!document.getElementById('map-feature-label-style')) {
    const style = document.createElement('style');
    style.id = 'map-feature-label-style';
    style.innerHTML = `
        .map-feature-label {
            background: rgba(255,255,255,0.88);
            color: #0b2a4a;
            padding: 2px 6px;
            border-radius: 4px;
            box-shadow: 0 1px 2px rgba(0,0,0,0.12);
            font-weight: 600;
            font-size: 0.85rem;
            white-space: nowrap;
        }
    `;
    document.head.appendChild(style);
}

///////////////////////////////////////////
//Create Global Variables
///////////////////////////////////////////


// Step 1: Group features by unique property
const groupedFeatures={};
geoJsonData.features.forEach(feature => {
    const key=feature.properties.period_name;
    if (!groupedFeatures[key]) {
        groupedFeatures[key] = [];
    };
    groupedFeatures[key].push(feature);
});

// Helper: highlight / reset for interaction (uses popup instead of tooltip)
function highlightLayer(layer) {
    if (!layer) return;
    // store original style if not stored
    if (layer.feature && layer.feature.properties && !layer.feature.properties._origStyle) {
        layer.feature.properties._origStyle = Object.assign({}, layer.options || {});
        if (layer.options && layer.options.radius) layer.feature.properties._origStyle.radius = layer.options.radius;
    }
    if (layer.setStyle) {
        layer.setStyle({
            color: '#ff7800',
            weight: 3,
            fillOpacity: Math.max((layer.options && layer.options.fillOpacity) || 0.2, 0.6)
        });
    }
    if (layer.setRadius && layer.options && layer.options.radius) {
        layer.setRadius((layer.options.radius || 6) + 3);
    }
    if (layer.bringToFront) layer.bringToFront();
}

function resetLayer(layer) {
    if (!layer) return;
    if (layer.feature && layer.feature.properties && layer.feature.properties._origStyle) {
        const s = layer.feature.properties._origStyle;
        if (layer.setStyle) {
            layer.setStyle({
                color: s.color || '#3388ff',
                fillColor: s.fillColor || s.color || '#3388ff',
                weight: s.weight || 1,
                fillOpacity: s.fillOpacity != null ? s.fillOpacity : 0.9
            });
        }
        if (layer.setRadius && s.radius) layer.setRadius(s.radius);
    } else if (layer.setStyle) {
        // fallback default
        layer.setStyle({
            color: '#3388ff',
            weight: 1,
            fillOpacity: 0.9
        });
        if (layer.setRadius) layer.setRadius(6);
    }
    if (layer.closePopup) layer.closePopup();
}

// Step 2 (REPLACEMENT): Create a L.GeoJSON layer for each PeriodName with visible point rendering
const categoryLayers = {};
Object.entries(groupedFeatures).forEach(([key, features]) => {
  const geojson = { type: "FeatureCollection", features };

  const geojsonLayer = L.geoJSON(geojson, {
    // ensure Points render visibly (use circleMarker or marker)
    pointToLayer: (feature, latlng) => {
      const style = {
        radius: 6,
        fillColor: feature.properties.color || '#3388ff',
        color: '#000',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.9
      };
      // remember original style on the feature
      feature.properties = feature.properties || {};
      feature.properties._origStyle = Object.assign({}, style);
      return L.circleMarker(latlng, style);
    },
    onEachFeature: (feature, layer) => {
      // Build popup content using a couple of useful properties (adjust as needed)
      const props = feature.properties || {};
      const title = props.name || props.scripture_reference || props.period_name || 'Feature';
      const snippet = props.description ? `<p>${props.description}</p>` : '';
      const popupContent = `<strong>${snakeToTitleCase('name') === 'Name' && props.name ? props.name : title}</strong>${snippet}`;

            // Bind a Leaflet popup (will be opened/closed in mouse events)
            layer.bindPopup(popupContent, {autoClose: true, closeOnClick: false});

            // Add a permanent label showing the feature name (if present)
            if (props && props.name) {
                try {
                    layer.bindTooltip(props.name, {permanent: true, direction: 'right', className: 'map-feature-label', offset: [8, 0]});
                } catch (e) {
                    // Some layer types may not support bindTooltip in older Leaflet versions; ignore failures
                    console.warn('Could not bind tooltip for feature', props.name, e);
                }
            }

      // show detail card on click (uses your existing function)
      layer.on('click', function(e) {
        const props = feature.properties || {};
        if (typeof showObjectInfoCard === 'function') showObjectInfoCard(props);
        // open popup on click as well
        if (layer.openPopup) layer.openPopup();
      });

      // Use popup open/close for hover-like interaction but via Leaflet popup API
      layer.on('mouseover', function(e) {
        if (layer.openPopup) layer.openPopup();
        highlightLayer(layer);
      });
      layer.on('mouseout', function(e) {
        if (layer.closePopup) layer.closePopup();
        resetLayer(layer);
      });

      // ensure popup closes when map is clicked elsewhere
      map.on('click', function(){ if (layer.closePopup) layer.closePopup(); resetLayer(layer); });
    }
  });

  // store the geojson layer directly so control/add/remove works as expected
  categoryLayers[key] = geojsonLayer;
});


///////////////////////////////////////////
//Add Map Layers
///////////////////////////////////////////

let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let googleTerrain = L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

let osm=L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let greyblank= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	maxZoom: 16
});

let blockMap= L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});

let OpenStreetMapHOT = L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
});

let Esri_WorldImagery= L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, ' +
        'AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    });
	
let Esri_DarkGrayCanvas = L.tileLayer(
        "http://{s}.sm.mapstack.stamen.com/" +
        "(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/" +
        "{z}/{x}/{y}.png",
        {
            attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, ' +
            'NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
        }
    );

googleStreets.addTo(map);

///////////////////////////////////////////
//Load Selectable Objects List and Periods List
///////////////////////////////////////////
//Load Selectable Periods List
document.getElementById('period-select').innerHTML = periodsList.map(period =>
    `<option value="${period.PeriodName}">${period.PeriodName}</option>`
).join('');

//Make preflood era the default selection
document.getElementById('period-select').value = "Preflood Era";

//Load Selectable Colors List
document.getElementById('objectType-select').innerHTML = colorsList.map(color =>
    `<option value="${color.ObjectType}">${color.ObjectType} <span style="color:${color.Color}">(${color.Description})</span></option>`
).join('');

//Make Battle the default selection
document.getElementById('objectType-select').value = "Battle";


///////////////////////////////////////////
//Add Map Layer Controller
///////////////////////////////////////////

//Base Maps to Layer
let baseMaps={
	"Google Streets": googleStreets,
	"Google Satelite":googleSat,
	"Google Hybrid":googleHybrid,
	"Terrain":Esri_WorldImagery,
	"OSM": osm,
	"OSM-Hot":OpenStreetMapHOT,
	"Block Map": blockMap,
	"Dark Gray": Esri_DarkGrayCanvas,
	"Light Gray": greyblank
};


L.control.layers(baseMaps,categoryLayers).addTo(map);


osm.addTo(map);


///////////////////////////////////////////
//Load JSON Text
///////////////////////////////////////////
function LoadTerritoryJSONText(fg){
	let drawnGeoJSONtext=JSON.stringify(fg,null,2);
};


///////////////////////////////////////////
//Turf Functions
///////////////////////////////////////////
function ProcessGeoJSON(geojson){
	
	geojson.features.forEach(feature => {
        const geometry = feature.geometry;

        if (geometry.type === "Polygon") {
            const area = turf.area(feature); // Area in square meters
            const perimeter = turf.length(feature); // Perimeter in kilometers
            const center=turf.centerOfMass(feature).geometry.coordinates; // Center of Polygon            

            // Convert to miles
            feature.properties.areaInSquareMiles = area * 0.00000038610215855; // Conversion factor: sq meters to sq miles
            feature.properties.perimeterInMiles = perimeter * 0.621371; // Conversion factor: km to miles
	    	feature.properties.geographicCenter=center;  //Center of Polygon

        } else if (geometry.type === "LineString") {
            const length = turf.length(feature); // Length in kilometers
            
            // Convert to miles
            feature.properties.lengthInMiles = length * 0.621371; // Conversion factor: km to miles
        }
    });
    return geojson;
};

 
 
///////////////////////////////////////////
//Add Leaflet Drawing Controls 
///////////////////////////////////////////

map.on('pm:create', e => {
  generateGeoJson();
  ClearAllDrawingLayers();
});


map.pm.addControls({  
  position: 'topleft',
  editMode: true,
  removalMode: true,
  drawMarker:true,
  drawPolygon:true,
  drawRectangle:false,
  drawCircle:false,
  drawCircleMarker:false
});


function ClearAllDrawingLayers(){
	map.eachLayer(function(layer){
     if (layer._path != null) {
    layer.remove()
	  }
	});
};


function generateGeoJson(){
	var fg = L.featureGroup();    
	var layers = findLayers(map);
  layers.forEach(function(layer){
  	fg.addLayer(layer);
  });
  	let newgeoJson=ProcessGeoJSON(fg.toGeoJSON());
	LoadTerritoryJSONText(newgeoJson);
	console.log(newgeoJson);
}

function findLayers(map) {
    var layers = [];
    map.eachLayer(layer => {
      if (
        layer instanceof L.Polyline ||
        layer instanceof L.Marker ||
        layer instanceof L.Circle ||
        layer instanceof L.CircleMarker
      ) {
        layers.push(layer);
      }
    });

    // filter out layers that don't have the leaflet-geoman instance
    layers = layers.filter(layer => !!layer.pm);

    // filter out everything that's leaflet-geoman specific temporary stuff
    layers = layers.filter(layer => !layer._pmTempLayer);

    return layers;
};

///////////////////////////////////////////
//Center on Map
///////////////////////////////////////////

document.getElementById('goToMapTopButton').addEventListener('click', function() {
    var element = document.getElementById('map');
    var rect = element.getBoundingClientRect();
    window.scrollTo({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        behavior: 'smooth'
    });
});


document.getElementById('goToMapBottomButton').addEventListener('click', function() {
    var element = document.getElementById('map');
    var rect = element.getBoundingClientRect();
    window.scrollTo({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
        behavior: 'smooth'
    });
});

// Helper: Generate GUID
function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Add a base layer (adjust as needed)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Layer to store drawn items
var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

// Enable Geoman controls
map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawPolyline: true,
    drawPolygon: true,
    editMode: true,
    dragMode: true,
    cutPolygon: false,
    removalMode: true,
});

// Store reference to the last drawn layer
var lastDrawnLayer = null;

// Modal helpers
function showModal() {
    document.getElementById('geometryAttributeModal').style.display = 'block';
    document.getElementById('geometryAttributeModal').classList.add('show');
    document.body.classList.add('modal-open');
    // Add backdrop
    let backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop fade show';
    backdrop.id = 'modal-backdrop';
    document.body.appendChild(backdrop);
}
function hideModal() {
    document.getElementById('geometryAttributeModal').style.display = 'none';
    document.getElementById('geometryAttributeModal').classList.remove('show');
    document.body.classList.remove('modal-open');
    let backdrop = document.getElementById('modal-backdrop');
    if (backdrop) backdrop.remove();
}

// Helper: get elevation (feet) from an elevation service (open-elevation)
async function getElevationFeet(lat, lon) {
    const metersToFeet = 3.28084;
    // Use Open-Elevation public API (no API key). Response: { results: [ { elevation: <meters>, ... } ] }
    const url = `https://api.open-elevation.com/api/v1/lookup?locations=${encodeURIComponent(lat)},${encodeURIComponent(lon)}`;

    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout
        const resp = await fetch(url, { signal: controller.signal });
        clearTimeout(timeout);
        if (!resp.ok) throw new Error(`Elevation request failed: ${resp.status}`);
        const data = await resp.json();
        if (data && Array.isArray(data.results) && data.results.length > 0 && typeof data.results[0].elevation === 'number') {
            const meters = data.results[0].elevation;
            return meters * metersToFeet;
        }
        throw new Error('Elevation data unavailable');
    } catch (err) {
        console.warn('Elevation lookup failed:', err);
        return null;
    }
}

// Listen for new geometry creation
map.on('pm:create', function(e) {
    lastDrawnLayer = e.layer;
    drawnItems.addLayer(lastDrawnLayer);

    var geojson = lastDrawnLayer.toGeoJSON();
    var guid = generateGUID();

    // Hide all specific fields
    document.getElementById('pointFields').style.display = 'none';
    document.getElementById('lineFields').style.display = 'none';
    document.getElementById('polygonFields').style.display = 'none';

    // Fill and show fields based on geometry type
    if (geojson.geometry.type === 'Point') {
        document.getElementById('pointFields').style.display = '';

        const lat = geojson.geometry.coordinates[1];
        const lon = geojson.geometry.coordinates[0];

        document.getElementById('latitude').value = lat.toFixed(6);
        document.getElementById('longitude').value = lon.toFixed(6);

        // Autopopulate elevation (feet) from lat/lon
        const elevInput = document.getElementById('elevation');
        if (elevInput) {
            elevInput.value = 'Fetching...';
            getElevationFeet(lat, lon).then(ft => {
                if (ft === null) {
                    elevInput.value = '';
                } else {
                    elevInput.value = Math.round(ft); // integer feet
                }
            });
        }
    } else if (geojson.geometry.type === 'LineString') {
        document.getElementById('lineFields').style.display = '';
        var length = turf.length(geojson, {units: 'miles'});
        document.getElementById('lineLength').value = length.toFixed(3);
        document.getElementById('numPoints').value = geojson.geometry.coordinates.length;
    } else if (geojson.geometry.type === 'Polygon') {
        document.getElementById('polygonFields').style.display = '';
        var perimeter = turf.length(turf.polygonToLine(geojson), {units: 'miles'});
        var area = turf.area(geojson) * 0.000000386102; // m² to mi²
        document.getElementById('perimeter').value = perimeter.toFixed(3);
        document.getElementById('area').value = area.toFixed(3);
    }

    // Set GUID
    document.getElementById('objectId').value = guid;

    // Clear text fields
    document.getElementById('scriptureReference').value = '';
    document.getElementById('geometryDescription').value = '';

    // Show modal
    showModal();
});

// Handle form submission
document.getElementById('geometryAttributeForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!lastDrawnLayer) return;

    var geojson = lastDrawnLayer.toGeoJSON();
    var props = {};

    // Common fields
    props['name'] = document.getElementById('geometryName').value || 'Unnamed Geometry';
    props['web_link'] = document.getElementById('geometryWebLink').value || '';
    props['period_name'] = document.getElementById('period-select').value || 'Modern Times';
    props['object_type'] = document.getElementById('objectType-select').value || 'Other';
    props['color'] = document.getElementById('geometryColor').value || '#000000';
    props['scripture_reference'] = document.getElementById('scriptureReference').value;
    props['description'] = document.getElementById('geometryDescription').value;
    props['object_id'] = document.getElementById('objectId').value;

    // Geometry-specific fields
    if (geojson.geometry.type === 'Point') {
        props['latitude'] = parseFloat(document.getElementById('latitude').value);
        props['longitude'] = parseFloat(document.getElementById('longitude').value);
        props['elevation'] = parseFloat(document.getElementById('elevation').value) || 0; // Optional elevation 
    } else if (geojson.geometry.type === 'LineString') {
        props['length_miles'] = parseFloat(document.getElementById('lineLength').value);
        props['num_points'] = parseInt(document.getElementById('numPoints').value);
    } else if (geojson.geometry.type === 'Polygon') {
        props['perimeter_miles'] = parseFloat(document.getElementById('perimeter').value);
        props['area_sq_miles'] = parseFloat(document.getElementById('area').value);
    }

    // Attach properties to layer
    lastDrawnLayer.feature = lastDrawnLayer.feature || {};
    lastDrawnLayer.feature.type = "Feature";
    lastDrawnLayer.feature.properties = props;

    // Hide modal
    hideModal();
    lastDrawnLayer = null;
});

// Modal close button
document.querySelectorAll('#geometryAttributeModal .close').forEach(function(btn) {
    btn.addEventListener('click', function() {
        hideModal();
        lastDrawnLayer = null;
    });
});

// Save all to GeoJSON
document.getElementById('saveGeoJsonBtn').addEventListener('click', function() {
    var allFeatures = [];
    drawnItems.eachLayer(function(layer) {
        if (layer.toGeoJSON) {
            var gj = layer.toGeoJSON();
            // Attach properties if present
            if (layer.feature && layer.feature.properties) {
                gj.properties = layer.feature.properties;
            }
            allFeatures.push(gj);
        }
    });
    var geojson = {
        type: "FeatureCollection",
        features: allFeatures
    };
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(geojson, null, 2));
    var dlAnchor = document.createElement('a');
    dlAnchor.setAttribute("href", dataStr);
    dlAnchor.setAttribute("download", "map_features.geojson");
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
});

// Show info card for a map object
function showObjectInfoCard(properties) {
    const card = document.getElementById('objectInfoCard');
    const body = document.getElementById('objectInfoCardBody');
    // Clear previous content
    body.innerHTML = '';
    // Add property list
    const ul = document.createElement('ul');
    ul.className = "list-group list-group-flush";
    for (const key in properties) {
        const li = document.createElement('li');
        li.className = "list-group-item";
        li.innerHTML = `<strong>${snakeToTitleCase(key)}:</strong> ${properties[key]}`;
        ul.appendChild(li);
    }
    body.appendChild(ul);
    card.style.display = '';
    // Scroll to card
    card.scrollIntoView({behavior: "smooth"});
}

// Hide info card
function hideObjectInfoCard() {
    document.getElementById('objectInfoCard').style.display = 'none';
    document.getElementById('objectInfoCardBody').innerHTML = '';
}

// Close button event
document.getElementById('closeObjectInfoCard').addEventListener('click', hideObjectInfoCard);

// Add click event to drawn items
drawnItems.on('click', function(e) {
    // e.layer is the clicked layer
    let props = (e.layer.feature && e.layer.feature.properties) ? e.layer.feature.properties : {};
    showObjectInfoCard(props);
    document.getElementById('objectInfoCard').style.display = '';
});

/*
// Optionally, hide card when clicking elsewhere on the map
map.on('click', function(e) {
    hideObjectInfoCard();
});
*/

// Converts snake_case to Title Case with spaces
function snakeToTitleCase(snake) {
    return snake
        .replace(/_/g, ' ')
        .replace(/\w\S*/g, function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
}


//selects color based on object type
document.getElementById('objectType-select').addEventListener('change', function() {
    const selectedType = this.value;
    const colorEntry = colorsList.find(c => c.ObjectType === selectedType); 
    const colorInput = document.getElementById('geometryColor');
    if (colorEntry) {
        colorInput.value = colorEntry.Color;
    } else {
        colorInput.value = '#000000'; // default to black if not found
    }
});

