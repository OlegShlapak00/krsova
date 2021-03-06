const jwt = require('jsonwebtoken');
const User = require('../models/user');
const RegistrationCredentials = require('../models/registrationCredentials');
const {secret} = require('../configs/auth');


module.exports.register = (request, response) => {
    const {email, password, role} = request.body;
    const createdDate = new Date();
    const user = new User({email, createdDate});
    const regCredential = new RegistrationCredentials({email, password,role});
    regCredential.save()
        .then(() => {
            if (!email || !password || !role) {
                return  response.status(400).json({massage: "Bad request"});
            }
            user.save()
                .catch((err) => {
                    return  response.status(500).json({massage: "Server 2 error", err});
                });
            return  response.json({massage: 'Success'});
        })
        .catch((e) => {
            return  response.status(500).json({massage: "Server 1 error", e});
        });
}

module.exports.login = async (request, response) => {

    const {email, password} = request.body;
    let user;
     await User.findOne({email}).exec()
        .then(selectedUser =>{
            user = selectedUser;
        })
        .catch((err) => response.status(500).json({massage: err} ));

    await RegistrationCredentials.findOne({email, password}).exec()
        .then(selectedUser => {
            if (!selectedUser) {
                return response.status(400).json({massage: "Wrong email or password"});
            }

            let jwtObj = {
                regCred: {
                    _id : selectedUser._id,
                    role: selectedUser.role,
                    password: selectedUser.password,
                    email: selectedUser.email
                },
                user:{
                    _id: user._id,
                    createdDate: user.createdDate,
                    email: user.email
                }
            }
            return  response.status(200).json({massage: 'success', token: jwt.sign(JSON.stringify(jwtObj), secret)});
        })
        .catch((err) => {
            return  response.status(500).json({massage: err + "SSS"});
        });
}
