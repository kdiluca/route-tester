var map = L.map('map',{
  //tangram support
  inertia: false
});

  L.tileLayer('http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>',
      maxZoom: 18
  }).addTo(map);
  //new L.Control.Zoom({ position: 'topright' }).addTo(map);
  //L.control.locate({ position: 'topright', keepCurrentZoomLevel: true }).addTo(map);
  //L.control.modes({ position: 'topright', keepCurrentZoomLevel: true, map:map, mode_icons: mode_icons }).addTo(map);

var rr = L.Routing.control({
    routeWhileDragging: false,
    router: L.Routing.valhalla('valhalla-T_YY31g','auto'),
    summaryTemplate:'<div class="start">{name}</div><div class="info {transitmode}">{distance}, {time}</div>'

}).addTo(map);


rr.setWaypoints([L.Routing.waypoint(L.latLng(40.645244,-73.9449975)),L.Routing.waypoint( L.latLng(40.7590615,-73.969231))]);
var driveBtn = document.getElementById("drive_btn");
var bikeBtn = document.getElementById("bike_btn");
var walkBtn = document.getElementById("walk_btn");
var multiBtn = document.getElementById("multi_btn");

driveBtn.addEventListener('click', function (e) {

    // var newWayPoints = new L.Routing.Waypoint([
    //     L.latLng(39.645244,-73.9449975),
    //     L.latLng(39.7590615,-73.969231)
    // ]);
    // rr.setWaypoints(newWayPoints);

    rr.route({transitmode: 'auto'});
});

bikeBtn.addEventListener('click', function (e) {
  rr.route({transitmode: 'bicycle'});
});
walkBtn.addEventListener('click', function (e) {
  rr.route({transitmode: 'pedestrian'});
});

multiBtn.addEventListener('click', function (e) {
  rr.route({transitmode: 'multimodal'});
});

