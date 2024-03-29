import  {sign, verify} from 'jsonwebtoken';
import User from '../db/models/user';


const authenticateUser = ({ user, res }) => {
        const token = sign( 
            { userId: user._id }, 
            process.env.AUTHENTICATION_SECRET,
            { expiresIn: "60m"}    
        );
    
        res.cookie("token", token, {
            expires: new Date(Date.now() + 3600000),
            secure: process.env.NODE_ENV == "production", //set true if using https
            httpOnly: false,
            sameSite: "lax",
          });
}

const logOff = ({ res }) => {
    res.clearCookie('token');
}

const getUser = async ({ req }) => {
    const token = req.cookies.token || "";
    if(!token){
        throw new Error ('user is not authenticate');
    }else{
        const data = verify(
                        token,
                        process.env.AUTHENTICATION_SECRET,
                        function(_,decoded){
                                if(decoded) return decoded;
                                throw new Error('user not authenticate')
                        }
                    );

        return await User.findById(data.userId)
    }
}


export {
    authenticateUser,
    getUser,
    logOff
}