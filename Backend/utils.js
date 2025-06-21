const validator = require("validator");

function validateuser(data){

        const mandatoryField = ["email","password"];
        const isAllowed = mandatoryField.every((keys)=>Object.keys(data).includes(keys));

        if(!isAllowed)
            throw new Error(" Fields missing");

        if(!validator.isEmail(data.email))
            throw new Error(" Invalid Email");

        if(!validator.isStrongPassword(data.password))
            throw new Error(" weak password");

        
}

module.exports = validateuser;