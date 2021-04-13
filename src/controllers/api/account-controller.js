/**
 * Module for the account controller.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se>
 * @version 1.0.0
 */

import createError from 'http-errors'
import { Account } from '../../models/account.js'

/**
 * Encapsulates the account controller.
 */
export class AccountController {
  /**
   * Registers an account.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async register (req, res, next) {
    try {
      const account = await Account.insert({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
      })

      res
        .status(201)
        .json(account)
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
