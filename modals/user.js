const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const joi = require("joi")

const user = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true, unique: true },
    email: { type: String, required: true, minlength: 6 },
    password: { type: String, default: "" },
    addresses: [{
      address_line: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String }
    }],
    user_role: {type: String, default: "user"}
  },
  { timestamps: true }
);

const validateRegistrationForm = (user) => {
  const schema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });
  return schema.validate(user);
}

const validateLoginForm = (user) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  return schema.validate(user);
}

const validateUpdateForm = (user) => {
  const schema = joi.object({
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    email: joi.string().email().required(),
  });
  return schema.validate(user);
}

const validateAddressForm = (form) => {
  const schema = joi.object({
    address_line: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    country: joi.string().required(),
    zipcode: joi.string().required(),
    phone: joi.string().required(),
  });
  return schema.validate(form);
}

const User = mongoose.model("users", user);

module.exports = {
  User,
  validateRegistrationForm,
  validateLoginForm,
  validateUpdateForm,
  validateAddressForm
}