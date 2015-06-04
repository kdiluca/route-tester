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
var timeBtn = document.getElementById("time_btn");
var dateBtn = document.getElementById("date_btn");

var time = new Date();
var day = time.getDate();
if (day < 10) {
  day = '0' + day;
}
var month = time.getMonth() + 1;
if (month < 10) {
  month = '0' + month;
}
var year = time.getFullYear();
var hour = 12;
var minute = 15;
dateStr = year + "-" + month + "-" + day + "T" + hour + ":" + minute;

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
  rr.route({
    transitmode: 'multimodal',
    date_time: dateStr});
});

timeBtn.addEventListener('click', function (e) {
  var newTime = prompt("Set time to depart (24 hour clock)", "HH:mm");
  var newHour = newTime.substring(0,2);
  hour = (newHour <= 24 && newHour >= 0) ? newHour : hour;
  var newMin = newTime.substring(3,5);
  minute = (newMin < 60  && newMin >= 0) ? newMin : minute;
  dateStr = year + "-" + month + "-" + day + "T" + hour + ":" + minute;
  multiBtn.click();
});

dateBtn.addEventListener('click', function (e) {
  var newMonth = prompt("Enter new month of departure", "MM");
  if (newMonth > 0 && newMonth <= 12) {
    if (newMonth < time.getMonth() + 1) {
      year++;
    } else {
      year = time.getFullYear();
    }
    month = newMonth;
    var newDay = prompt("Enter new day of month", "dd");
    if (newDay > 0 && newDay <= 31) {
      day = newDay;
    }
  } else if (newMonth === "reset" || newMonth === "r") {
    year = time.getFullYear();
    month = time.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    var day = time.getDate();
    if (day < 10) {
      day = '0' + day;
    }
  } 
  dateStr = year + "-" + month + "-" + day + "T" + hour + ":" + minute;
  multiBtn.click();
});

