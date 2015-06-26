(function() {
  'use strict';

  var L = (typeof window !== "undefined" ? window.L : typeof global !== "undefined" ? global.L : null);

  L.Routing = L.Routing || {};

  //L.extend(L.Routing, require('./L.Routing.Localization'));  
  L.Routing.Valhalla.Formatter = L.Class.extend({
    options: {
      units: 'metric',
      unitNames: {
        meters: 'm',
        kilometers: 'km',
        yards: 'yd',
        miles: 'mi',
        hours: 'h',
        minutes: 'mín',
        seconds: 's'
      },
      language: 'en',
      roundingSensitivity: 1,
      distanceTemplate: '{value} {unit}'
    },

    initialize: function(options) {
      L.setOptions(this, options);
    },

    formatDistance: function(d /* Number (meters) */) {
      var un = this.options.unitNames,
          v,
        data;

      if (this.options.units === 'imperial') {
        d = d / 1.609344;
        if (d >= 1000) {
          data = {
            value: (this._round(d) / 1000),
            unit: un.miles
          };
        } else {
          data = {
            value: this._round(d / 1.760),
            unit: un.yards
          };
        }
      } else {
        v = d;
        data = {
          value: v >= 1 ? v: v*1000,
          unit: v >= 1 ? un.kilometers : un.meters
        };
      }

       return L.Util.template(this.options.distanceTemplate, data);
    },

    _round: function(d) {
      var pow10 = Math.pow(10, (Math.floor(d / this.options.roundingSensitivity) + '').length - 1),
        r = Math.floor(d / pow10),
        p = (r > 5) ? pow10 : pow10 / 2;

      return Math.round(d / p) * p;
    },

    formatTime: function(t /* Number (seconds) */) {
      if (t > 86400) {
        return Math.round(t / 3600) + ' h';
      } else if (t > 3600) {
        return Math.floor(t / 3600) + ' h ' +
          Math.round((t % 3600) / 60) + ' min';
      } else if (t > 300) {
        return Math.round(t / 60) + ' min';
      } else if (t > 60) {
        return Math.floor(t / 60) + ' min' +
          (t % 60 !== 0 ? ' ' + (t % 60) + ' s' : '');
      } else {
        return t + ' s';
      }
    },

    formatInstruction: function(instr, i) {
      // if (instr.text === undefined) {
      //   return L.Util.template(this._getInstructionTemplate(instr, i),
      //     L.extend({
      //       exitStr: instr.exit ? L.Routing.Localization[this.options.language].formatOrder(instr.exit) : '',
      //       dir: L.Routing.Localization[this.options.language].directions[instr.direction]
      //     },
      //     instr));
      // } else {
      //   return instr.text;
      // }
      return instr.instruction;
    },

    getIconName: function(instr, i) {
      // you can find all Valhalla's direction types at https://github.com/valhalla/odin/blob/master/proto/tripdirections.proto
      switch (instr.type) {
      //case 'Straight':
      case 8:
      case 17:
        return (i === 0 ? 'depart' : 'continue');
      case 9:
      //case 'SlightRight':
        return 'bear-right';
      //case 'Right':
      case 2:
      case 5:
      case 18:
      case 20:
      case 23:
        return 'turn-right';
      //case 'SharpRight':
      case 11:
        return 'sharp-right';
      case 12:
      case 13:
        return 'u-turn';
      //case 'SharpLeft':
      case 14:
        return 'sharp-left';
      case 3:
      case 6:
      case 15:
      case 19:
      case 21:
      case 24:
        return 'turn-left';
      //case 'SlightLeft':
      case 16:
        return 'bear-left';
      case 'WaypointReached':
        return 'via';
      case 26:
      case 27:
        return 'enter-roundabout';
      case 4://'DestinationReached':
        return 'arrive';
      }
    },

    _getInstructionTemplate: function(instr, i) {
      return instr.instruction + " " +instr.length;
    }
  });

 // module.exports = L.Routing;
})();