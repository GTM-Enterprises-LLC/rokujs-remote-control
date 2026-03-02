# Roku Remote Control

> Control your Roku TV using NodeJS.

This library allows you to control your Roku TV remotely using NodeJS. It fetches data and sends commands using the [External Control Protocol (ECP) API](https://sdkdocs.roku.com/display/sdkdoc/External+Control+Guide).

> The External Control Protocol (ECP) enables a Roku device to be controlled over a local area network by providing a number of external control services. The Roku devices offering these external control services are discoverable using [SSDP](https://en.wikipedia.org/wiki/Simple_Service_Discovery_Protocol) (Simple Service Discovery Protocol). ECP is a simple RESTful API that can be accessed by programs in virtually any programming environment.

- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Discover nearby Roku devices](#discover-nearby-roku-devices)
  - [Device information](#device-information)
  - [Remote keypress](#remote-keypress)
  - [Apps](#apps)
  - [App icons](#app-icons)
  - [Launch apps](#launch-apps)
  - [TV Channels](#tv-channels)
  - [Type text](#type-text)
- [License](#license)

## Getting Started

### Installation

Clone the repository:

```
$ git clone git@github.com:GTM-Enterprises-LLC/rokujs-remote-control.git
$ cd rokujs-remote-control
$ npm install
```

## Usage

### Discover nearby Roku devices

```javascript
const Roku = require('./lib/roku');

Roku.discover(function (devices) {
  console.log(devices);

  /* example response
  [ { server: 'Roku UPnP/1.0 MiniUPnPd/1.4',
    address: '192.168.2.45',
    location: 'http://192.168.2.45:8060/',
    usn: 'uuid:roku:ecp:2N005M893730' } ]
  */
});
```

**Note: At this point we will assume a Roku instance has been created**

```javascript
const Roku = require('./lib/roku');
const roku = new Roku('roku-address');
```

### Device information

```javascript
roku.deviceInfo(function (info) {
  console.log(info);

  /* example response
  { spec_version: { major: '1', minor: '0' },
  device_id: '4KK585898739',
  device_type: 'urn:roku-com:device:player:1-0',
  friendly_name: 'TCL•Roku TV - 2N005M898759',
  manufacturer: 'Roku',
  manufacturer_url: 'http://www.roku.com/',
  model_name: 'TCL 40FS3811',
  serial_number: '2N005M8987300',
  software_version: '7.2.0',
  power_mode: 'PowerOn',
  language: 'en',
  country: 'US' }
  */
});
```

### Remote keypress

```javascript
roku.press('home');
roku.delay(1000);

roku.press(Roku.keys[6]); // right
roku.delay(1000);

roku.press('volumeup');
```

### Apps

#### Fetch all installed apps

```javascript
roku.apps(function (err, apps) {
  console.log(apps);

  /* example response
  [ { id: 12, name: 'Netflix', version: '4.1.218' },
  { id: 13, name: 'Amazon Video', version: '5.17.10' },
  { id: 2213, name: 'Roku Media Player', version: '4.1.1524' },
  { id: 837, name: 'YouTube', version: '2.0.70100049' } ]
  */
});
```

#### Get information about a single app

**By ID**

```javascript
roku.apps({ id: 12 }, function (err, app) {
  console.log(app);
});
```

**By name**

```javascript
roku.apps({ name: 'Netflix' }, function (err, netflix) {
  console.log(netflix);
});
```

#### Get active app information

```javascript
roku.apps({ active: true }, function (err, app) {
  console.log(app);
});
```

### App icons

```javascript
const ws = fs.createWriteStream(__dirname + '/' + 12 + '.png');
const rs = roku.iconStream(12);

rs.pipe(ws); // => 12.png
```

### Launch apps

**By ID**

```javascript
roku.launch({ id: 50539 }, function (err) {
  if (err) {
    console.log(err);
  }
});
```

**By name**

```javascript
roku.launch({ name: 'twitch'}, function (err) {
  if (err) {
    console.log(err);
  }
})
```

### TV Channels

#### Fetch all TV channels

```javascript
roku.tvChannels(function (channels) {
  console.log(channels);
});
```

#### Get active TV channel information

```javascript
roku.tvChannels({ active: true }, function (channel) {
  console.log(channel);
});
```

### Type text

**Note: Make sure you have an active field ready for input**

```javascript
roku.type('HBO');
```

## License

Copyright (c) 2024-2026 GTM Enterprises LLC. All Rights Reserved.

This software is proprietary and confidential. Unauthorized copying, distribution,
or use of this software, in whole or in part, is strictly prohibited without the
express written permission of GTM Enterprises LLC.

See the [LICENSE](LICENSE) file for full terms.
