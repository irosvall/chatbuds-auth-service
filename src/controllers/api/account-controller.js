/**
 * Module for the account controller.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se>
 * @version 1.0.0
 */

import fs from 'fs/promises'
import jwt from 'jsonwebtoken'
import createError from 'http-errors'
import { Account } from '../../models/account.js'

/**
 * Encapsulates the account controller.
 */
export class AccountController {
  /**
   * Authenticates an account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async login (req, res, next) {
    try {
      const account = await Account.authenticate(req.body.email, req.body.password)

      // Create a JWT.
      const payload = {
        sub: account.id,
        name: account.username
      }
      const privateKey = await fs.readFile(process.env.PRIVATE_KEY_FILEPATH)
      const accessToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: Number(process.env.ACCESS_TOKEN_LIFE)
      })

      res
        .status(200)
        .json({
          user: account,
          access_token: accessToken
        })
    } catch (error) {
      let err = error
      if (err.name === 'credentialsError') {
        err = createError(401)
        err.innerException = error
      }

      next(err)
    }
  }

  /**
   * Registers an account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      await Account.insert({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })

      res
        .status(201)
        .end()
    } catch (error) {
      let err = error

      // Dublicate keys error.
      if (err.code === 11000) {
        let message = ''

        if (err.keyPattern.email) {
          message = 'The email is already taken'
        } else if (err.keyPattern.username) {
          message = 'The username is already taken'
        }

        err = createError(409, message)
        err.innerException = error
      } else if (error.name === 'ValidationError') {
        err = createError(400)
        err.innerException = error
      }

      next(err)
    }
  }
}
