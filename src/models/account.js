/**
 * Mongoose model account.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se>
 * @version 1.0.0
 */

import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Create a schema.
const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: 'The email is already in use.',
    required: [true, 'Email is required.'],
    trim: true,
    maxlenght: [320, 'The email has extended the limit of {MAXLENGTH} characters.'],
    validate: [validator.isEmail, 'The email is not an valid email address.']
  },
  username: {
    type: String,
    unique: 'The username is already in use.',
    required: [true, 'Username is required.'],
    trim: true,
    minlength: [2, 'The username must contain at least {MINLENGTH} characters.'],
    maxlenght: [24, 'The username has extended the limit of {MAXLENGTH} characters.'],
    validate: [validator.isAlphanumeric, 'The username is only allowed to contain numbers and letters (a-z)']
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: [10, 'The password must be of minimum length {MINLENGTH} characters.'],
    maxlenght: [1000, 'The password has extended the limit of {MAXLENGTH} characters.']
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    /**
     * Performs a transformation of the resulting object to remove sensitive information.
     *
     * @param {object} doc - The mongoose document which is being converted.
     * @param {object} ret - The plain object representation which has been converted.
     */
    transform: function (doc, ret) {
      delete ret._id
      delete ret.password
    },
    virtuals: true // ensure virtual fields are serialized
  }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

// Salts and hashes the password before save.
schema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})

/**
 * Authenticates a account.
 *
 * @param {string} username - The account's username.
 * @param {string} password - The account's password.
 * @returns {Promise<Account>} A promise that resolves into an object representing the account.
 */
schema.statics.authenticate = async function (username, password) {
  const account = await this.findOne({ username })

  // If no account is found or password is wrong, throw an error.
  if (!account || !(await bcrypt.compare(password, account.password))) {
    const error = new Error()
    error.name = 'credentialsError'
    throw error
  }

  return account
}

/**
 * Creates and inserts a new account.
 *
 * @param {object} accountData - The account data.
 * @param {string} accountData.email - Required account email.
 * @param {string} accountData.username - Required account username.
 * @param {string} accountData.password - Required account password.
 * @returns {Promise<Account>} The Promise to be fulfilled.
 */
schema.statics.insert = async function (accountData) {
  const account = new Account(accountData)
  return account.save()
}

// Create a model using the schema.
export const Account = mongoose.model('Account', schema)
