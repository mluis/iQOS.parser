# iQOS.parser
A parser library for holder charge status parsing.

` Tested on iQOS 2.4+ and Chrome 76 `

![iQOS commmunity](https://img.shields.io/badge/iQOS-Hacking%20Community-blue) ![npm](https://img.shields.io/npm/v/@0x77/iqos.parser?color=blue&label=%400x77%2Fiqos.parser&logo=npm) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/iQOShacking/iQOS.parser) ![GitHub issues](https://img.shields.io/github/issues/iQOShacking/iQOS.parser) [![Edit iQOS.parser demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/blissful-lamport-475tt?fontsize=14)

## Q&A
### TODO
* Add charger support
* __*Test on iQOS 3.0*__
* Write connection library
* etc... (P.S.: purpose your features on issues)
### Where I can ask the question?
* Welcome to __*issues*__
* [_Telegram_](https://t.me/hex0x77)
### What is this?
* This library contains simple function that *parse the __iQOS holder__ charge status*

### How to know that holder is not inside charger?
* It will return `-1`

### What i need to test it out?
* __Chrome__ that supports __BLE__.
* __Bluetooth-enabled iQOS__ (__*not tested* on *iQOS 3*__)
* A simple code for access __ble and display the status__:
```javascript
import HolderChargeEventHandler from '@0x77/iqos.parser';
let optionalServices = ["daebb240-b041-11e4-9e45-0002a5d5c51b"];
//f8a54120-b041-11e4-9be7-0002a5d5c51b battery status characteristic

console.log('Requesting any Bluetooth Device...');
navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: optionalServices
})
    .then(device => {
        console.log('Connecting to GATT Server...');
        return device.gatt.connect();
    })
    .then(server => {
        console.log('Getting Services...');
        return server.getPrimaryServices();
    })
    .then(services => {
        console.log('Getting Characteristics...');
        let queue = Promise.resolve();
        services.forEach(service => {
            queue = queue.then(_ => service.getCharacteristics().then(characteristics => {
                console.log('> Service: ' + service.uuid);
                characteristics.forEach(characteristic => {
                    // log('> C: ', characteristic.uuid.uuid);
                    console.log(characteristic.uuid);
                    if (characteristic.uuid == "f8a54120-b041-11e4-9be7-0002a5d5c51b") {
                        console.log("characteristic of battery found");
                        characteristic.startNotifications().then(characteristic => {
                            characteristic.addEventListener(
                                'characteristicvaluechanged', handleCharacteristicValueChanged
                            );

                        })
                            .catch(error => { console.log(error); });

                    }
                    console.log("Reinsert holder to begin...");
                });
            }));
        });
        return queue;
    })
    .catch(error => {
        console.log('Argh! ' + error);
    });

const handleCharacteristicValueChanged = (event) => {
    console.log(HolderChargeEventHandler(event));
}
```
  