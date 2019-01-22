var bleno = require('bleno');
var os = require('os');
var util = require('util');
var Readline = require('@serialport/parser-readline');
var SerialPort = require('serialport');

var BlenoCharacteristic = bleno.Characteristic;
var port = new SerialPort('/dev/ttyS0', { 
  baudRate: 115200,
  parity: 'none',
  stopBits: 1,
  dataBits: 8
});

var parser = new Readline();
port.pipe(parser);

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
  console.log('EchoCharacteristic - onReadRequest: value = ' + this._value.toString('hex'));
  callback(this.RESULT_SUCCESS, this._value);
};

UartCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  console.log(data);
  port.write(data);

  callback(this.RESULT_SUCCESS, withoutResponse ? null : this._value);
};

util.inherits(UartCharacteristic, BlenoCharacteristic);
module.exports = UartCharacteristic;
