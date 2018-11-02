import mqtt from 'mqtt';

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
    console.log(topic);
    console.log(message);
  });
};
