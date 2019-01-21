var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var UartCharacteristic = function() {

 UartCharacteristic.super_.call(this, {
    uuid: '0000ffe1-0000-1000-8000-00805f9b34fb',
    properties: [
      'write',
      'write-without-response',
      'notify'
    ]
  });

 this._value = new Buffer(0);
};

UartCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {
    return false;
  }

  console.log('UartCharacteristic - onReadRequest: value = ' +
    this._value.slice(offset, offset + bleno.mtu).toString()
  );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(UartCharacteristic, BlenoCharacteristic);
module.exports = UartCharacteristic;
