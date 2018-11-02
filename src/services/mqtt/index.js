import mqtt from 'mqtt';
import Vibration from '../../api/vibration/model';
import Temperature from '../../api/temperature/model';

let client = mqtt.connect(
  process.env.MQTT_BROKER,
  {
    clientId: 'server',
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSWORD
  }
);

export default () => {
  client.on('connect', function() {
    console.log('Connected to MQTT server');
    client.subscribe('#');
  });

  client.on('message', (topic, message) => {
    var split = topic.split('/');
    if (split[1] === 'vibration') {
      Vibration.create({ sensor: split[0], value: message, date: new Date() })
        .then(vibration => vibration.view(true))
        .then(() => {
          console.log(`New vibration data added to ${split[0]}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
    if (split[1] === 'temperature') {
      Temperature.create({ sensor: split[0], value: message, date: new Date() })
        .then(temperature => temperature.view(true))
        .then(() => {
          console.log(`New temperature data added to ${split[0]}`);
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  });
};
