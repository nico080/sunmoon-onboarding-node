// api-routes.js
// Initialize express router
let router = require('express').Router();




router.get('/', function (req, res) {
    res.json({
        status: 'API Running',
        message: 'Welcome to Sample',
    });
});


var userController = require('./controller/user/userController');

router.route('/auth').post(userController.auth)
router.route('/users').get(userController.getUsers)
.post(userController.addUser)
.patch(userController.updateUser)
router.route('/users/:id')
    .get(userController.getUserById)
    





// Export API routes
module.exports = router