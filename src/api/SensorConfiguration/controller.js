import mqtt from 'mqtt';

export const create = ({ body }, res, next) => {
  try {
    let client = mqtt.connect(
      process.env.MQTT_BROKER,
      {
        clientId: `server/${body.sensor}`,
        username: process.env.MQTT_USER,
        password: process.env.MQTT_PASSWORD
      }
    );
    var topic = `${body.sensor}/config`;
    client.on('connect', () => {
      client.subscribe(topic, function(err) {
        if (!err) {
          client.publish(
            `${body.sensor}/config`,
            `${body.period}/${body.time}`
          );
        }
      });
    });
    client.on('message', (t, message) => {
      if (topic === t) {
        console.log(message.toString());
        client.end();
        res.status(200).send(body);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
};
