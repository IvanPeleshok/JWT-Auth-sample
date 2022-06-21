const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const { v4 } = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({ email });
        if (candidate) {
            throw Error(`Пользователь с почтовым адресов ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = v4;
        const user = await UserModel.create({ email, password: hashPassword, activationLink });
        await mailService.sendActivationMail(email, activationLink);
        
        const useDtro = UserDto(user);
        const tokens = tokenService.generateTokens({...useDtro});
        await tokenService.saveToken(UserDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();
