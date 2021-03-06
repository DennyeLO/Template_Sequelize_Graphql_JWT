const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../Util/validators');
const User = require('../../Models/User');

function generateToken(user) {
  return jwt.sign(
    {
        id: user.dataValues.id,
        username: user.dataValues.username
    },process.env.SECRET_KEY,{ expiresIn: '8h' });
}

module.exports = {
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = 'User not found';
                throw new UserInputError('User not found', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong crendetials';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                id: user.dataValues.id,
                username : user.dataValues.username,
                token
            };
        },
        async register(_,
        {
            registerInput: { username, password, confirmPassword }
        }){
            // Validate user data
            const { valid, errors } = validateRegisterInput(
                username,
                password,
                confirmPassword
            );
            if (!valid) {
                throw new UserInputError('Errors', { errors });
            }
            // TODO: Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);
            
            return {
                id: res.dataValues.id,
                username : res.dataValues.username,
                token
            };
        }
    }
};