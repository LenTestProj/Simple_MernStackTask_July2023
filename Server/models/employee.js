const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const employeSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
    },
    dob: String,
    gender: String,
    address: String,
    country: String,
    city: String,
    isOtherCity: Boolean,
    isAWS: Boolean,
    isDevOps: Boolean,
    isFullStackDeveloper: Boolean,
    isMiddleware: Boolean,
    isQAAutomation: Boolean,
    isWebServices: Boolean,
    creator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", employeSchema);
