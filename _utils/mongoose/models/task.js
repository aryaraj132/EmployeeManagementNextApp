import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var task = new Schema({
  userID:{
    type:String,
    required:true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  timeTaken: {
    type: Number,
    required: true
    },
  starTime: {
    type: Date,
    required: true
  },
});

mongoose.models = {};

var Task = mongoose.model('Task', task);

export default Task;