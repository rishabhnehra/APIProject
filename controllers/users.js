const User = require('../models/user')
const Car = require('../models/car')

module.exports = {
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(201).json(user)
    },
    getUser: async (req, res) => {
        const { userID } = req.params
        const user = await User.findById(userID)
        res.status(200).json(user)
    },
    replaceUser: async (req, res) => {
        // Complete replace. So all the attributes needs to be validated
        const { userID } = req.params
        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        res.status(200).json({ sucess: true })
    },
    updateUser: async (req, res) => {
        // Any one attribute is sufficient
        const { userID } = req.params
        const newUser = req.body
        const result = await User.findByIdAndUpdate(userID, newUser)
        res.status(200).json({ sucess: true })
    },
    getUserCars: async (req, res) => {
        const { userID } = req.params
        const user = await User.findById(userID).populate('cars')
        res.status(200).json(user.cars)
    },
    newUserCar: async (req,res) => {
        const { userID } = req.params;
        // Create a new Car
        const newCar = new Car(req.body);
        // Find the user
        const user = await User.findById(userID);
        // Assign user to newCar
        newCar.seller = user;
        // Save the car
        await newCar.save();
        // Add car to seller's(user's) cars list
        user.cars.push(newCar);
        // Save the user
        await user.save();
        res.status(201).json(newCar);
    }
}