const map = L.map('map').setView([-5.3599766,105.3141115],16);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

let geojsonLayers = {};

function toggleGroup(groupName) {
  const groupContent = document.querySelector(`#${groupName}-group .group-content`);
  groupContent.classList.toggle('active');
}

fetch('data/map.geojson')
  .then(response => response.json())
  .then(geojsonData => {
    geojsonData.features.forEach(feature => {
      const nama = feature.properties.nama;
      const tipe = feature.geometry.type;
      const jenis = feature.properties.jenis;

      if (tipe === 'Point') {
        const warna = feature.properties.warna || 'green'; 

        geojsonLayers[nama] = L.geoJSON(feature, {
          pointToLayer: function (feature, latlng) {
            if (jenis === 'gedung'){
                return L.marker(latlng, {
                  icon: L.icon({
                    iconUrl: 'building.png', 
                    iconSize: [25, 30], 
                    popupAnchor: [1, -34], 
                  })
                }).bindPopup(nama);
            }
            else if (jenis === 'kesehatan'){
                return L.marker(latlng, {
                  icon: L.icon({
                    iconUrl: 'hospital-buildings.png', 
                    iconSize: [25, 30], 
                    popupAnchor: [1, -34], 
                  })
                }).bindPopup(nama);
            }
            else if (jenis === 'masjid'){
                return L.marker(latlng, {
                  icon: L.icon({
                    iconUrl: 'mosque.png', 
                    iconSize: [25, 30], 
                    popupAnchor: [1, -34], 
                  })
                }).bindPopup(nama);
            }
            else if (jenis === 'lab'){
                return L.marker(latlng, {
                  icon: L.icon({
                    iconUrl: 'laboratory.png', 
                    iconSize: [25, 30],
                    popupAnchor: [1, -34], 
                  })
                }).bindPopup(nama);
            }
            else if (jenis === 'kantin'){
                return L.marker(latlng, {
                  icon: L.icon({
                    iconUrl: 'store.png', 
                    iconSize: [25, 30], 
                    popupAnchor: [1, -34], 
                  })
                }).bindPopup(nama);
            }
          }
        }).addTo(map);
      } else {
        const warna = feature.properties.warna || 'green'; 

        geojsonLayers[nama] = L.geoJSON(feature, {
          style: function (feature) {
            return {
              fillColor: warna,
              color: '#000',
              weight: 1,
              fillOpacity: 0.4
            };
          }
        }).addTo(map);
      }
    });

    function toggleFeature(featureName, checkbox) {
      const layer = geojsonLayers[featureName];
      if (layer) {
        if (checkbox.checked) {
          map.addLayer(layer);
        } else {
          map.removeLayer(layer);
        }
      }
    }

    document.getElementById('poliklinik-checkbox').addEventListener('change', function (e) {
      toggleFeature('Poliklinik Itera', e.target);
    });

    document.getElementById('gedung-a-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung A', e.target);
    });
    document.getElementById('gedung-b-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung B', e.target);
    });
    document.getElementById('gedung-c-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung C', e.target);
    });
    document.getElementById('gedung-d-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung D', e.target);
    });
    document.getElementById('gedung-e-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung E', e.target);
    });
    document.getElementById('gedung-f-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung F', e.target);
    });
    document.getElementById('lab-1-checkbox').addEventListener('change', function (e) {
      toggleFeature('Labtek 1', e.target);
    });
    document.getElementById('lab-2-checkbox').addEventListener('change', function (e) {
      toggleFeature('Labtek 2', e.target);
    });
    document.getElementById('lab-3-checkbox').addEventListener('change', function (e) {
      toggleFeature('Labtek 3', e.target);
    });
    document.getElementById('lab-OZT-checkbox').addEventListener('change', function (e) {
      toggleFeature('Labtek OZT', e.target);
    });
    document.getElementById('galeri2-checkbox').addEventListener('change', function (e) {
      toggleFeature('Galeri 2 Itera', e.target);
    });
    document.getElementById('rk-checkbox').addEventListener('change', function (e) {
      toggleFeature('Kantin RK', e.target);
    });
    document.getElementById('bkl-checkbox').addEventListener('change', function (e) {
      toggleFeature('BKL', e.target);
    });
    document.getElementById('gk1-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung GKU 1', e.target);
    });
    document.getElementById('gk2-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung GKU 2', e.target);
    });
    document.getElementById('tb1-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung Asrama TB-1', e.target);
    });
    document.getElementById('tb2-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung Asrama TB-2', e.target);
    });
    document.getElementById('tb3-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung Asrama TB-3', e.target);
    });
    document.getElementById('tb4-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung Asrama TB-4', e.target);
    });
    document.getElementById('tb5-checkbox').addEventListener('change', function (e) {
      toggleFeature('Gedung Asrama TB-5', e.target);
    });

    document.getElementById('search-button').addEventListener('click', function () {
      const query = document.getElementById('search-input').value.toLowerCase();
      let featureFound = false;

      geojsonData.features.forEach(feature => {
        if (feature.properties.nama.toLowerCase() === query) {
          const coordinates = feature.geometry.coordinates.reverse();
          map.flyTo(coordinates, 18);
          featureFound = true;
        }
      });

      if (!featureFound) {
        alert("Location not found!");
      }
    });
  })
  .catch(error => {
    console.error('Error loading GeoJSON:', error);
  });
  
