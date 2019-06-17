const express = require('express');
// const router = express.Router();
const router = require('express-promise-router')();

const UserController = require('../controllers/users');

router.route('/')
    .get(UserController.index)
    .post(UserController.newUser);

router.route('/:userID')
    .get(UserController.getUser)
    .put(UserController.replaceUser)
    .patch(UserController.updateUser);

router.route('/:userID/cars')
    .get(UserController.getUserCars)
    .post(UserController.newUserCar);

module.exports = router;