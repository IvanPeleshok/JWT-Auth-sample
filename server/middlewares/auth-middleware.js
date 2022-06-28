const ApiError = require('../exceptions/api-error');
const tokenService = require('../service/token-service');

module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            console.log(1);
            return next(ApiError.UnauthorizedError());
        }
        
        const accessToken = authorizationHeader.split(" ");
        if (!accessToken.length == 2) {
            console.log(2);
            return next(ApiError.UnauthorizedError());
        }

        const userData = tokenService.validateAccessToken(accessToken[1]);
        if (!userData) {
            console.log(3);
            return next(ApiError.UnauthorizedError());
        }

        req.user = userData;
        next();
    } catch (error) {
        console.log(error)
        return next(ApiError.UnauthorizedError());
    }
}