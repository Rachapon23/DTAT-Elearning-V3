// const User = require("../models/userModel")

exports.loginValidate = async (payload) => {
    try {
        const validator = {
            employee_ID: "string",
            password: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid login request length ${Object.keys(payload).length}`)
            return {valid: false, data: `Payload must contain data`}
        }
        // console.log("<validate> ",payload)
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 2) {
                console.log(`[-] invalid login body ${payloadKeys.length}`)
                return {valid: false, data: `Length of body in payload does not match`}
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return {valid: false, data: `Please enter ${key}`, field: key}
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${payload.body[key]}`)
                    return {valid: false, data: `${key} is not ${typeof payload.body[key]}`, field: key}
                }

                if(key === "employee_ID") {
                    if(!isNaN(payload.body[key]))  console.log(`[+] ${payload.body[key]} is number`)
                    else {
                        console.log(`[-] ${payload.body[key]} is not a number`)
                        return {valid: false, data: `${key} is must be number`, field: key}
                    }

                    if(payload.body[key].length === 7)  console.log(`[+] ${key} length is correct`)
                    else {
                        console.log(`[-] ${payload.body[key]} length is not correct`)
                        return {valid: false, data: `${key} length is not correct`, field: key}
                    }
                }

                counter++;
            }
            return {valid: true, data: payload}
        }
        return {valid: false, data: "Payload is not an object"}
    }
    catch (err){
        console.log("Unexpected error on validate login")
        return {valid: false, data: `Unexpected error on validate login`}
    }
}

exports.registerValidate = async (payload) => {
    try {
        const validator = {
            employee_ID: "string", 
            department_ID: "string",
            password: "string",
            repassword: "string", 
            email: "string", 
            firstname: "string",
            lastname: "string"
        }
        

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid register request ${Object.keys(payload).length}`)
            return {valid: false, data: `Payload must contain data`}
        }
        // console.log("<validate> ",payload)
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 7) {
                console.log(`[-] invalid login body ${payloadKeys.length}`)
                return {valid: false, data: `Length of body in payload does not match`}
            }
            
            for(let key in validator) {
                
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return {valid: false, data: `Please enter ${key}`, field: key}
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${payload.body[key]}`)
                    return {valid: false, data: `${key} is not ${typeof payload.body[key]}`, field: key}
                }

                if(key === "employee_ID") {
                    if(!isNaN(payload.body[key]))  console.log(`[+] ${payload.body[key]} is number`)
                    else {
                        console.log(`[-] ${payload.body[key]} is not a number`)
                        return {valid: false, data: `${key} is must be number`, field: key}
                    }

                    if(payload.body[key].length === 7)  console.log(`[+] ${key} length is correct`)
                    else {
                        console.log(`[-] ${payload.body[key]} length is not correct`)
                        return {valid: false, data: `${key} length is not correct`, field: key}
                    }
                }
                else if(key === "department_ID") {
                    if(!isNaN(payload.body[key]))  console.log(`[+] ${payload.body[key]} is number`)
                    else {
                        console.log(`[-] ${payload.body[key]} is not a number`)
                        return {valid: false, data: `${key} is must be number`, field: key}
                    }

                    if(payload.body[key].length === 6)  console.log(`[+] ${key} length is correct`)
                    else {
                        console.log(`[-] ${payload.body[key]} length is not correct`)
                        return {valid: false, data: `${key} length is not correct`, field: key}
                    }
                }

                counter++;
            }

            

            return {valid: true, data: payload}
        }
        return {valid: false, data: "Payload is not an object"}
    }
    catch (err){
        console.log("Unexpected error on validate register")
        return {valid: false, data: `Unexpected error on validate login`}
    }
}

exports.sendEmailValidate = async (payload) => {
    try {
        const validator = {
            email: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid send email request ${Object.keys(payload).length}`)
            return {valid: false, data: `Payload must contain data`}
        }
        // console.log("<validate> ",payload)
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)

            if(payloadKeys.length > 1) {
                console.log(`[-] invalid send email body length ${payloadKeys.length}`)
                return {valid: false, data: `Length of body in payload does not match`}
            }

            if(payload.body["email"])  console.log(`[+] ${payloadKeys[0]}`)
            else {
                console.log(`[-] ${payloadKeys[0]}`)
                return {valid: false, data: `Please enter email`, field: "email"}
            }

            if(typeof payload.body["email"] === validator["email"])  console.log(`[+] ${typeof payload.body["email"]}`)
            else {
                console.log(`[-] ${typeof payload.body["email"]}`)
                return {valid: false, data: `${key} is not ${typeof payload.body[key]}`, field: "email"}
            }

            if(payload.body["email"].length !== 0) console.log(`[+] email is not empty`)
            else {
                console.log(`[-] email cannot be empty`)
                return {valid: false, data: `Email cannot be empty`, field: "email"}
            }

            if(payload.body["email"].toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))  console.log(`[+] email is valid`)
            else {
                console.log(`[-] email is not valid`)
                return {valid: false, data: `Email is not in correct form`, field: "email"}
            }

            return {valid: true, data: payload}
        }
        return {valid: false, data: "Payload is not an object"}
    }
    catch (err){
        console.log(err)
        console.log("Unexpected error on send email")
        return {valid: false, data: `Unexpected error on send email`}
    }
}

exports.resetPasswordValidate = async (payload) => {
    try {
        const validator = {
            confirm_new_password: "string",
            email: "string",
            new_password: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid reset password request ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload.body)
        
        
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            let counter = 0;

            if(payloadKeys.length !== 3) {
                console.log(`[-] invalid reset password body length ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.body[key])  console.log(`[+] ${payloadKeys[counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[counter]}`)
                    return null
                }

                if(typeof payload.body[key] === validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${typeof payload.body[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate reset password")
        return null
    }
}

exports.checkTokenValidate = async (payload) => {
    try {
        const validator = {
            authtoken: "string",
        }
        // console.log(Object.keys(User.schema.paths))

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid tiken request ${Object.keys(payload).length}`)
            return null
        }
        // console.log("<validate> ",payload)
        
        
        if(typeof payload.headers === "object") {
            const payloadKeys = Object.keys(payload.headers)
            let counter = 0;
            
            if(payloadKeys.length !== 17) {
                console.log(`[-] invalid token headers length ${payloadKeys.length}`)
                return null
            }

            for(let key in validator) {
                if(payload.headers[key])  console.log(`[+] ${key}`)
                else {
                    console.log(`[-] ${key}`)
                    return null
                }

                if(typeof payload.headers[key] === validator[key])  console.log(`[+] ${typeof payload.headers[key]}`)
                else {
                    console.log(`[-] ${typeof payload.headers[key]}`)
                    return null
                }
                counter++;
            }
            return payload
        }
        return null
    }
    catch (err){
        console.log("Unexpected error on validate check token")
        return null
    }
}

