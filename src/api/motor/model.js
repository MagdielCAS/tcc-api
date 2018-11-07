import mongoose, { Schema } from 'mongoose';

const motorSchema = new Schema(
  {
    label: {
      type: String,
      required: true
    },
    power: {
      type: String
    },
    location: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

motorSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      label: this.label,
      power: this.power,
      location: this.location,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

const model = mongoose.model('Motor', motorSchema);

export const schema = model.schema;
export default model;
