// userController.js


const UserServices =require('../../services/user/userServices');


exports.auth =  (req, res) => {return UserServices.auth(req,res)} //auth user

exports.getUsers =  (req, res) => {return UserServices.getUsers(req,res)} //retrieve lists

exports.addUser =  (req, res) => {return UserServices.addUser(req,res)} //addUSer

exports.getUserById =  (req, res) => {return UserServices.getUserById(req,res)} //retrieve certain user 

exports.updateUser =  (req, res) => {return UserServices.updateUser(req,res)} //update user

