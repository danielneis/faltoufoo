L.Icon.Default.imagePath = '/images';
var map = L.map('map');
map.setView([47.63, -122.32], 11);

L.tileLayer('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
  maxZoom: 18,
  minZoom: 5,
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
}).addTo(map);

var marker = L.marker([47.63, -122.32]);
marker.addTo(map);

var polylinePath = [
  [47.607204675859045, -122.3298454284668],
  [47.60182268729636, -122.32521057128906],
  [47.60095457276622, -122.32349395751952],
  [47.5998260023411, -122.32237815856934],
  [47.59842248977284, -122.32124090194701],
  [47.59655590441905, -122.32023239135741],
  [47.59175167310035, -122.32126235961914],
  [47.588278460128734, -122.32057571411133],
  [47.58329978624572, -122.31997489929199],
  [47.579478622338286, -122.3192024230957],
  [47.57756793579513, -122.3196315765381]
];

var polyline = L.polyline(polylinePath);
polyline.addTo(map);
