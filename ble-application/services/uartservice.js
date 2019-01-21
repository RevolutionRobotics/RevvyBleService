var bleno = require('bleno');
var util = require('util');

var LoadAverageCharacteristic = require('../characteristics/loadaverage');
var UptimeCharacteristic = require('../characteristics/uptime');
var MemoryCharacteristic = require('../characteristics/memory');

function UartService() {

  bleno.PrimaryService.call(this, {
    uuid: '0000ffe0-0000-1000-8000-00805f9b34fb',
    characteristics: [
      new LoadAverageCharacteristic(),
      new UptimeCharacteristic(),
      new MemoryCharacteristic()
    ]
  });
};

util.inherits(UartService, bleno.PrimaryService);
module.exports = UartService;
