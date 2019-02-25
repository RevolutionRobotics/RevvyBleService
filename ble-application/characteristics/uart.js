var bleno = require('bleno');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

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
 this._rawData = '';
 this._blocklyList = [];
 this._value = new Buffer(0);
};

UartCharacteristic.prototype.onReadRequest = function(offset, callback) {
  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));
  callback(this.RESULT_SUCCESS, this._value);
};

UartCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log(data);

  var head = data[0];
  switch (head) {
    case 0xff:
      this._port.write(data);
      break;
    case 0xfe:
      this.readSyncedPacket(data.slice(1));
      break;
    default:
      console.warn('Error: Unknown header');
  }

  callback(this.RESULT_SUCCESS, withoutResponse ? null : this._value);
};

UartCharacteristic.prototype.readSyncedPacket = function(data) {
  var isFinalPacket = !!data[0];
  this._rawData += String(data.slice(1));

  if (isFinalPacket) {
    var decoded = decodeURIComponent(this._rawData);
    
    this._blocklyList = JSON.parse(decoded);
    this._rawData = '';

    console.log(this._blocklyList);
  }
};

util.inherits(UartCharacteristic, BlenoCharacteristic);
module.exports = UartCharacteristic;
