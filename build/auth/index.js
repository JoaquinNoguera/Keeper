const sign = require('jsonwebtoken').sign;
const verify = require('jsonwebtoken').verify;

const User = require('../db/models/user');

const config = require('../env');

const { secretAccess , secretRefresh } = config;

module.exports.sendTokens = function sendTokens(req, tokenRefresh, tokenAccess){
    req.session.tokenRefresh = tokenRefresh;
    req.session.tokenAccess = tokenAccess;
}

module.exports.createAccessToken = function createAccessToken(user){
    return sign(
        {userId: user._id}
        ,secretAccess, 
        { expiresIn:"15m"})
}

module.exports.createRefreshToken = function createRefreshToken(user){
    return sign(
        {userId: user._id},
        secretRefresh)
}

module.exports.clearTokens = function clearTokens(req){
    req.session.tokenRefresh = null;
    req.session.tokenAccess = null;
}

module.exports.userAuthenticate = async function userAuthenticate(req) {
    if(!req.session.tokenRefresh){
        throw new Error ('user is not authenticate');
    }
    const data = verify(req.session.tokenRefresh,
                        secretRefresh,
                        function(_,decoded){
                                if(decoded) return decoded;
                        
                                throw new Error('user not authenticate')
    });
    
    return await User.findById(data.userId)
}

module.exports.userAuthorization = async function userAuthorization(req) {
    if(!req.session.tokenAccess){
        throw new Error ('El usuari no esta autorizado');
    }

    const data = verify(
                        req.session.tokenAccess,
                        secretAccess,
                        function(_,decoded){
                            
                            if(decoded) return decoded;
        
                            throw new Error('user not Authorization')
    });
    
    return await User.findById(data.userId)
}

module.exports.isAuthorization = function isAuthorization(req) {
    if(!req.session.tokenAccess){
        return false;
    }
    const valid= verify(
                        req.session.tokenAccess,
                        secretAccess,
                        function(_,decoded){
                            if(decoded) return true;
        
                            return false;
    });

    return valid;
}

module.exports.isAuthenticate =  function isAuthenticate(req) {
    if(!req.session.tokenRefresh){
        return false;
    }

    const valid = verify(
                            req.session.tokenRefresh,
                            secretRefresh,
                            function(_,decoded){
                                if(decoded) return true;
        
                                return false
    });
    return valid;
}

