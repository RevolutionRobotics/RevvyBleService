var bleno = require('bleno');
var util = require('util');

var UartCharacteristic = require('../characteristics/uart');

function UartService() {

  bleno.PrimaryService.call(this, {
    uuid: '0000ffe0-0000-1000-8000-00805f9b34fb',
    characteristics: [
      new UartCharacteristic()
    ]
  });
};

util.inherits(UartService, bleno.PrimaryService);
module.exports = UartService;
