import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-node';

export default class rnn {
  constructor(min, max, first, last) {
    this.model = tf.sequential();
    this.energy = max;
    this.dc = min;
    this.window = 1;
    this.first = first;
    this.last = last;
  }

  createAndCompileModel(hiddenLayers) {
    const input_layer_shape = this.window;
    const input_layer_neurons = 10;

    const rnn_input_layer_features = 2;
    const rnn_input_layer_timesteps = Math.floor(
      input_layer_neurons / rnn_input_layer_features
    );

    const rnn_input_shape = [
      rnn_input_layer_features,
      rnn_input_layer_timesteps
    ];
    const rnn_output_neurons = 5;

    const output_layer_shape = rnn_output_neurons;
    const output_layer_neurons = 1;

    this.model = tf.sequential();
    this.model.add(
      tf.layers.dense({
        units: input_layer_neurons,
        inputShape: [input_layer_shape]
      })
    );
    this.model.add(tf.layers.reshape({ targetShape: rnn_input_shape }));

    var lstm_cells = [];
    for (let index = 0; index < hiddenLayers; index++) {
      lstm_cells.push(tf.layers.lstmCell({ units: rnn_output_neurons }));
    }

    this.model.add(
      tf.layers.rnn({
        cell: lstm_cells,
        inputShape: rnn_input_shape,
        returnSequences: false
      })
    );

    this.model.add(
      tf.layers.dense({
        units: output_layer_neurons,
        inputShape: [output_layer_shape]
      })
    );

    const opt = tf.train.adadelta(1e-1);
    this.model.compile({ optimizer: opt, loss: 'meanSquaredError' });

    return this.model;
  }

  async train(input, output) {
    input = input.map(el => (el - this.first) / (this.last - this.first));
    output = output.map(el => (el - this.dc) / (this.energy - this.dc));

    const xs = tf.tensor2d(input, [input.length, 1]);
    const ys = tf.tensor2d(output, [output.length, 1]);

    xs.print(true);
    ys.print(true);

    var stats = await this.model.fit(xs, ys, {
      epochs: 200
    });

    xs.dispose();
    ys.dispose();
    return { model: this.model, stats };
  }

  async predict(steps) {
    var result;
    steps = steps.map(el => (el - this.first) / (this.last - this.first));
    var preds = tf.tensor2d(steps, [steps.length, 1]);

    preds.print(true);

    await tf.tidy(() => {
      result = this.model.predict(preds).dataSync();
      console.log(result);
    });

    preds.dispose();
    result = result.map(el => el * this.energy + this.dc);
    return result;
  }
}
