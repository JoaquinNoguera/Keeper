const Schema = require('mongoose').Schema;
const model = require('mongoose').model;
const createHash = require('crypto').createHash;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    section: {
        type: [{
            color: {
                type: String,
                required: true,
                default: "AMARILLO"
            },
            icon: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            cards:{
                type:[{
                    title: {
                        type: String,
                        required: true
                    },
                    description: {
                        type: String,
                        required: true,
                        default: ""
                    },
                    color: {
                        type: String,
                        required: true,
                        default: "AMARILLO",
                    }
                }],
                required: true,
                default: []
            }
        }],
        required: true,
        default: [],
    },
    recoveryCode: String,
    
});

userSchema.methods.generateHash =  function (password) {
    return createHash("sha256")
                                .update(password)
                                .digest("hex");
}

userSchema.methods.validPassword = function (password){
    return (createHash("sha256")
                                .update(password)
                                .digest("hex") 
                === 
            
                this.password);
}

userSchema.methods.generateHashRecoveryCode =  function (code) {
    return createHash("sha256")
                                .update(code)
                                .digest("hex");
}

userSchema.methods.validRecoveryCode = function (code){
    return (createHash("sha256")
                                .update(code)
                                .digest("hex") 
                === 
            
            this.recoveryCode);
}

module.exports = model('User',userSchema);