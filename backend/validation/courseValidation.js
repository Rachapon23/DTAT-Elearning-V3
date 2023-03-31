
exports.createCourseValidate = async (payload) => {
    try {
        console.log(payload.body.body)
        const structure_validator = {
            head: "object",
            body: "object",
        }

        const data_head_validator = {
            name: "string",
            description: "string",
            course_number: "string",
            password: "string",
            room: "string",
            teacher: "string",
            // status: "string",
        }

        const data_body_validator = {
            title: "string",
            description: "string",
            text: "object",
            link: "object",
            quiz: "object",
        }

        console.log(payload.body)
        // for(let i in payload.body) {
        //     console.log(typeof i)
        // }
        console.log(typeof payload.body.body)

        if(Object.keys(payload).length === 0) {
            console.log(`[-] invalid login request length ${Object.keys(payload).length}`)
            return {valid: false, data: `Payload must contain data`}
        }
        // console.log("<validate> ",payload)
        
        // structure level validation
        if(typeof payload.body === "object") {
            const payloadKeys = Object.keys(payload.body)
            

            if(payloadKeys.length !== 2) {
                console.log(`[-] invalid login body ${payloadKeys.length}`)
                return {valid: false, data: `Length of body in payload does not match`}
            }

            for(let key in structure_validator) {
                
                let structure_counter = 0;
                if(payload.body[key])  console.log(`[+] ${payloadKeys[structure_counter]}`)
                else {
                    console.log(`[-] ${payloadKeys[structure_counter]}`)
                    return {valid: false, data: `Please enter ${key}`, field: key}
                }

                if(typeof payload.body[key] === structure_validator[key])  console.log(`[+] ${typeof payload.body[key]}`)
                else {
                    console.log(`[-] ${payload.body[key]}`)
                    return {valid: false, data: `${key} is not ${typeof payload.body[key]}`, field: key}
                }
                structure_counter++;
            }
            
            // data level validation
            const structure_key = Object.keys(payload.body)
            const data_obj_size = Object.keys(data_head_validator).length
            for(let i = 0; i < data_obj_size; i++) {
                if(
                    typeof payload.body[structure_key[i]] === "object" &&
                    structure_key[i] === "head"
                ) {
                    
                    const data_key = Object.keys(payload.body[structure_key[i]])
                    let data_counter = 0;
        
                    if(data_key.length !== 6) {
                        console.log(`[-] invalid head in data level ${data_key.length}`)
                        return {valid: false, data: `Length of body in head does not match`}
                    }
    
                    
                    for(let key in data_head_validator) {
                        
                        if(payload.body[structure_key[i]][key]) console.log(`[+] ${data_key[data_counter]}`)
                        else if(key === "password" && payload.body[structure_key[i]][key] === "") console.log(`[+]-> ${data_key[data_counter]}`)
                        else {
                            console.log(`[-] ${data_key[data_counter]}`)
                            return {valid: false, data: `Please enter ${key}`, field: key}
                        }
    
                        if(typeof payload.body[structure_key[i]][key] === data_head_validator[key])  console.log(`[+] ${typeof payload.body[structure_key[i]][key]}`)
                        else {
                            console.log(`[-] ${payload.body[structure_key[i]][key]}`)
                            return {valid: false, data: `${key} is not ${typeof payload.body[structure_key[i]][key]}`, field: key}
                        }
    
                        // if(key === "employee_ID") {
                        //     if(!isNaN(payload.body[key]))  console.log(`[+] ${payload.body[key]} is number`)
                        //     else {
                        //         console.log(`[-] ${payload.body[key]} is not a number`)
                        //         return {valid: false, data: `${key} is must be number`, field: key}
                        //     }
    
                        //     if(payload.body[key].length === 7)  console.log(`[+] ${key} length is correct`)
                        //     else {
                        //         console.log(`[-] ${payload.body[key]} length is not correct`)
                        //         return {valid: false, data: `${key} length is not correct`, field: key}
                        //     }
                        // }
                        data_counter++;
                    }
                }
                else if(
                    typeof payload.body[structure_key[i]] === "object" &&
                    structure_key[i] === "body"
                ) {
                    const data_body = payload.body[structure_key[i]]
                    if(data_body.length > 50) {
                        console.log(`[-] invalid body in data level ${data_body.length}`)
                        return {valid: false, data: `Length of body exceed limit `}
                    }

                    data_body.forEach(item => {
                        const data_key = Object.keys(item)
                        let data_counter = 0;      
                        console.log(data_key)

                        if(Object.keys(item).length === 5)  console.log(`[+] body length is correct`)
                        else {
                            console.log(`[-] body length is not correct`)
                            return {valid: false, data: `body length is not correct`}
                        }

                        for(let key in data_body_validator) {

                            if(item[key]) console.log(`[+] ${data_key[data_counter]} `)
                            else {
                                console.log(`[-] ${data_key[data_counter]}`)
                                return {valid: false, data: `Please enter ${key}`, field: key}
                            }
        
                            if(typeof item[key] === data_body_validator[key])  console.log(`[+] ${typeof item[key]}`)
                            else {
                                console.log(`[-] ${item[key]}`)
                                return {valid: false, data: `${key} is not ${typeof item[key]}`, field: key}
                            }
        
                        //     // if(key === "employee_ID") {
                        //     //     if(!isNaN(payload.body[key]))  console.log(`[+] ${payload.body[key]} is number`)
                        //     //     else {
                        //     //         console.log(`[-] ${payload.body[key]} is not a number`)
                        //     //         return {valid: false, data: `${key} is must be number`, field: key}
                        //     //     }
        
                        //     //     if(payload.body[key].length === 7)  console.log(`[+] ${key} length is correct`)
                        //     //     else {
                        //     //         console.log(`[-] ${payload.body[key]} length is not correct`)
                        //     //         return {valid: false, data: `${key} length is not correct`, field: key}
                        //     //     }
                        //     // }
                            data_counter++;
                        }
                    });
                }
            }
            return {valid: true, data: payload}
        }
        return {valid: false, data: "Payload is not an object"}
    }
    catch (err){
        console.log(err)
        console.log("Unexpected error on validate login")
        return {valid: false, data: `Unexpected error on validate login`}
    }
}