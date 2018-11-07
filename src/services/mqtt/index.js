import mqtt from 'mqtt';
import Reading from '../../api/reading/model';

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
    Reading.create({ sensor: split[0], value: message, date: new Date() })
      .then(vibration => vibration.view(true))
      .then(() => {
        console.log(`New ${split[1]} data added to ${split[0]}`);
      })
      .catch(err => {
        console.log(err.message);
      });
  });
};
