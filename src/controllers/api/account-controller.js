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

      if (err.code === 11000) {
        // Dublicate keys error.
        err = createError(409)
        err.innerException = error
      } else if (error.name === 'ValidationError') {
        err = createError(400)
        err.innerException = error
      }

      next(err)
    }
  }
}
