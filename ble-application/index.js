var bleno = require('bleno');
var os = require('os');
var Readline = require('@serialport/parser-readline');
var SerialPort = require('serialport');

var BlenoCharacteristic = bleno.Characteristic;

var SystemInformationService = require('./services/systeminformationservice');
var UartService = require('./services/uartservice');

var port = new SerialPort('/dev/ttyS0', { 
  baudRate: 115200,
  parity: 'none',
  stopBits: 1,
  dataBits: 8
});

var parser = new Readline();
port.pipe(parser);

var systemInformationService = new SystemInformationService();
var uartService = new UartService(port);

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising(os.hostname(), [ uartService.uuid ]);
  }
  else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' +
    (error ? 'error ' + error : 'success')
  );

  if (!error) {
    bleno.setServices([
      systemInformationService,
      uartService
    ]);
  }
});
