var bleno = require('bleno');
var util = require('util');

var UartCharacteristic = function(port) {
 UartCharacteristic.super_.call(this, {
    uuid: '0000ffe1-0000-1000-8000-00805f9b34fb',
    properties: [
      'write',
      'write-without-response',
      'notify'
    ]
  });

 this._port = port;
 this._value = new Buffer(0);
};

UartCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));
  callback(this.RESULT_SUCCESS, this._value);
};

UartCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log(data);
  this._port.write(data);

  callback(this.RESULT_SUCCESS, withoutResponse ? null : this._value);
};

util.inherits(UartCharacteristic, BlenoCharacteristic);
module.exports = UartCharacteristic;
