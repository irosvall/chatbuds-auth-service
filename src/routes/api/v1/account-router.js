/**
 * Account router.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'
import { AuthService } from '../../../services/auth.js'

export const router = express.Router()

const controller = new AccountController()
const authService = new AuthService()

// ------------------------------------------------------------------------------
//  Routes
// ------------------------------------------------------------------------------

// POST
router.post('/register', (req, res, next) => controller.register(req, res, next))
router.post('/login', (req, res, next) => controller.login(req, res, next))

// DELETE
router.delete('/user',
  (req, res, next) => authService.authenticateJWT(req, res, next),
  (req, res, next) => controller.delete(req, res, next)
)
