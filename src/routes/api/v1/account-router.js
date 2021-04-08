/**
 * Account router.
 *
 * @author Ida Rosvall <ir222gn@student.lnu.se>
 * @version 1.0.0
 */

import express from 'express'
import { AccountController } from '../../../controllers/api/account-controller.js'

export const router = express.Router()

const controller = new AccountController()

// Map HTTP verbs and route paths to controller actions.
router.post('/register', (req, res, next) => controller.register(req, res, next))
