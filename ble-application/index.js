var bleno = require('bleno');
var os = require('os');

var SystemInformationService = require('./services/systeminformationservice');
var UartService = require('./services/uartservice');

var systemInformationService = new SystemInformationService();
var uartService = new UartService();

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
