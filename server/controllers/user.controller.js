const userService = require('../services/user.service.js');
const UserService = new userService.UserService();
const { validationResult } = require('express-validator');

class UserController {
  async signup (req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json(errors);
      }

      await UserService.signup(req.body);
      res.status(201).json({message: 'You have been successfully registered'});
    } catch (e) {
      res.status(400).json(e.message);
    }
  }

  async login (req, res) {
    try {
      const data = await UserService.login(req.body);
      res.status(200).json(data);
    } catch (e) {
      res.status(401).json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const users = await UserService.getAll();
      return res.status(200).json(users);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async getOne(req, res) {
    try {
      const user = await UserService.getOne(req.params.id);
      return res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async update(req, res) {
    try {
      const updatedUser = await UserService.update(req.body);
      return res.status(200).json(updatedUser);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const user = await UserService.delete(req.params.id);
      return res.status(200).json(user);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

module.exports = { UserController: UserController };
