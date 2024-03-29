
exports.validateQuery = (
    method = "",
    controllerName,
    role = "",
    blockRole = [],
    adminBypass = false,
    defaultOptions = {
        admin: {
            fields: "",
            fetchs: "",
            selects: "",
            search: {},
            subPops: "",
        },
        teacher: {
            fields: "",
            fetchs: "",
            selects: "",
            search: {},
            subPops: "",
        },
        student: {
            fields: "",
            fetchs: "",
            selects: "",
            search: {},
            subPops: "",
        }
    },
    options = {
        fields,
        fetchs,
        selects,
        search,
        subPops,
    },
    allowed = {
        fields: [],
        fetchs: [],
        selects: [],
        search: [],
        subPops: {
            method: [],
            fields: [],
        },
    },
    debug = false,
    disableRole = false,
) => {
    const ROLE_AMOUNT = 3
    const NATIVE_OPTIONS = defaultOptions ? defaultOptions : {
        admin: {
            fields: defaultOptions?.admin?.fields ? defaultOptions?.admin?.fields : "",
            fetchs: defaultOptions?.admin?.fetchs ? defaultOptions?.admin?.fetchs : "",
            selects: defaultOptions?.admin?.selects ? defaultOptions?.admin?.selects : "",
            search: defaultOptions?.admin?.search ? defaultOptions?.admin?.search : {},
            subPops: defaultOptions?.admin?.subPops ? defaultOptions?.admin?.subPops : "",
        },
        teacher: {
            fields: defaultOptions?.teacher?.fields ? defaultOptions?.teacher?.fields : "",
            fetchs: defaultOptions?.teacher?.fetchs ? defaultOptions?.teacher?.fetchs : "",
            selects: defaultOptions?.teacher?.selects ? defaultOptions?.teacher?.selects : "",
            search: defaultOptions?.teacher?.search ? defaultOptions?.teacher?.search : {},
            subPops: defaultOptions?.teacher?.subPops ? defaultOptions?.teacher?.subPops : "",
        },
        student: {
            fields: defaultOptions?.student?.fields ? defaultOptions?.student?.fields : "",
            fetchs: defaultOptions?.student?.fetchs ? defaultOptions?.student?.fetchs : "",
            selects: defaultOptions?.student?.selects ? defaultOptions?.student?.selects : "",
            search: defaultOptions?.student?.search ? defaultOptions?.student?.search : {},
            subPops: defaultOptions?.student?.subPops ? defaultOptions?.student?.subPops : "",
        }
    }
    // return options = { fields, fetchs, selects, search, subPops }
    // subPop for sub-populate
    // field for populate
    // fetch field after populate
    // select field in this model
    // search condition
    // NOTE: subPop or field can use 1 field per request (select one in these two) 
    // console.log("NATIVE_OPTIONS:", NATIVE_OPTIONS)

    if (!method) return { success: false, code: 400, message: "No method", options: null }
    let subPops = options.subPops
    let fields = options.fields
    let fetchs = options.fetchs
    let selects = options.selects
    let search = options.search

    // check if role has permission to query from db
    if (Array.isArray(blockRole) && blockRole) {
        if (blockRole.length > ROLE_AMOUNT) return { success: false, code: 500, message: `Block role exceed limit`, options: null }
        for (let i = 0; i < blockRole.length; i++) {
            if (role === blockRole[i]) return { success: false, code: 403, message: `Access denine for ${role}`, options: null }
        }
    }

    // const seperator = new RegExp(",", 'g');
    // if (fields) fields = fields.replace(seperator, " ")
    // if (fetchs) fetchs = fetchs.replace(seperator, " ")
    // if (selects) selects = selects.replace(seperator, " ")

    if (debug) console.log("subPops-> ", subPops)
    if (debug) console.log("fields-> ", fields)
    if (debug) console.log("fetchs-> ", fetchs)
    if (debug) console.log("selects-> ", selects)
    if (debug) console.log("search-> ", search)

    if (debug) console.log("-------------------------------------------------------------------")

    // init variable
    let searchParams = generateSearches(search, allowed.search, adminBypass)
    if (debug) console.log("searchParamsResult: ", searchParams)

    let fieldParams = generateFields(fields, allowed.fields, adminBypass)
    if (debug) console.log("fieldParamsResult: ", fieldParams)

    let subPropsParams = generateSubProps(subPops, allowed.subPops, adminBypass)
    if (debug) console.log("subPropsParamsResult: ", subPropsParams)

    let selectParams = generateSelects(selects, allowed.selects, adminBypass)
    if (debug) console.log("selectParamsResult: ", selectParams)

    let fetchParams = generateFetchs(fetchs, allowed.fetchs, adminBypass)
    if (debug) console.log("fetchParamsResult: ", fetchParams)

    // let subPopParams = {}
    // let updateParams = null
    // let option = { new: true }
    if (fieldParams.data && subPropsParams.data) return { success: false, code: 400, message: "Invalid query parameter pops and field cannot use at the same time", options: null }

    if (!fieldParams.success) return { success: fieldParams.success, code: fieldParams.code, message: fieldParams.message, options: null }
    if (!subPropsParams.success) return { success: subPropsParams.success, code: subPropsParams.code, message: subPropsParams.message, options: null }
    if (!searchParams.success) return { success: searchParams.success, code: searchParams.code, message: searchParams.message, options: null }
    if (!fetchParams.success) return { success: fetchParams.success, code: fetchParams.code, message: fetchParams.message, options: null }
    if (!selectParams.success) return { success: selectParams.success, code: selectParams.code, message: selectParams.message, options: null }

    // console.log("-->> ", searchParams, NATIVE_OPTIONS?.teacher?.search && Object.keys(NATIVE_OPTIONS?.teacher?.search).length === 0, NATIVE_OPTIONS?.teacher?.search)

    // check role for default query
    if (!disableRole) {
        switch (role) {
            case "admin":
                // if(NATIVE_OPTIONS?.admin?.search) {
                //     if(Object.keys(NATIVE_OPTIONS?.admin?.search).length !== 0) {
                //         searchParams = NATIVE_OPTIONS?.admin?.search
                //     }
                //     else {
                //         searchParams = searchParams
                //     }
                // }
                // else {
                //     searchParams = searchParams
                // }
                searchParams = !(NATIVE_OPTIONS?.admin?.search && Object.keys(NATIVE_OPTIONS?.admin?.search).length !== 0) ? searchParams : NATIVE_OPTIONS?.admin?.search
                fieldParams = !NATIVE_OPTIONS?.admin?.fields ? fieldParams : NATIVE_OPTIONS?.admin?.fields
                fetchParams = !NATIVE_OPTIONS?.admin?.fetchs ? fetchParams : NATIVE_OPTIONS?.admin?.fetchs
                subPropsParams = !NATIVE_OPTIONS?.admin?.subPops ? subPropsParams : NATIVE_OPTIONS?.admin?.subPops
                selectParams = !NATIVE_OPTIONS?.admin?.selects ? selectParams : NATIVE_OPTIONS?.admin?.selects
                break;
            case "teacher":
                searchParams = !(NATIVE_OPTIONS?.teacher?.search && Object.keys(NATIVE_OPTIONS?.teacher?.search).length !== 0) ? searchParams : NATIVE_OPTIONS?.teacher?.search
                fieldParams = !NATIVE_OPTIONS?.teacher?.fields ? fieldParams : NATIVE_OPTIONS?.teacher?.fields
                fetchParams = !NATIVE_OPTIONS?.teacher?.fetchs ? fetchParams : NATIVE_OPTIONS?.teacher?.fetchs
                subPropsParams = !NATIVE_OPTIONS?.teacher?.subPops ? subPropsParams : NATIVE_OPTIONS?.teacher?.subPops
                selectParams = !NATIVE_OPTIONS?.teacher?.selects ? selectParams : NATIVE_OPTIONS?.teacher?.selects
                break;
            case "student":
                searchParams = !(NATIVE_OPTIONS?.student?.search && Object.keys(NATIVE_OPTIONS?.student?.search).length !== 0) ? searchParams : NATIVE_OPTIONS?.student?.search
                fieldParams = !NATIVE_OPTIONS?.student?.fields ? fieldParams : NATIVE_OPTIONS?.student?.fields
                fetchParams = !NATIVE_OPTIONS?.student?.fetchs ? fetchParams : NATIVE_OPTIONS?.student?.fetchs
                subPropsParams = !NATIVE_OPTIONS?.student?.subPops ? subPropsParams : NATIVE_OPTIONS?.student?.subPops
                selectParams = !NATIVE_OPTIONS?.student?.selects ? selectParams : NATIVE_OPTIONS?.student?.selects
                break;
            default:
                return { success: false, code: 400, message: "This role does not exist in system", options: null }
        }
    }

    // console.log(
    //     "SSSSSSSSSSSSSSSSSSSSSSSS",
    //     !NATIVE_OPTIONS?.student?.search ? searchParams : NATIVE_OPTIONS.student.search,
    //     !NATIVE_OPTIONS?.student?.fields ? fieldParams : NATIVE_OPTIONS.student.fields,
    //     !NATIVE_OPTIONS?.student?.fetchs ? fetchParams : NATIVE_OPTIONS.student.fetchs,
    //     !NATIVE_OPTIONS?.student?.subPops ? subPropsParams : NATIVE_OPTIONS.student.subPops,
    //     !NATIVE_OPTIONS?.student?.selects ? selectParams : NATIVE_OPTIONS.student.selects,
    //     "xxxxxxxxxxxxxxxxxxxxxxxx",
    // )


    // console.log("-->> ", !NATIVE_OPTIONS?.student?.search)
    // console.log("-->> ", fetchParams)
    // console.log("-->> ", subPropsParams)
    // console.log("-->> ", selectParams)
    if(debug) console.log('validate result:', {
        success: true,
        code: 200,
        message: null,
        options: {
            fieldParams: fieldParams?.data,
            fetchParams: fetchParams?.data,
            selectParams: selectParams?.data,
            searchParams: searchParams?.data,
            subPropsParams: subPropsParams?.data,
        },
    })

    return {
        success: true,
        code: 200,
        message: null,
        options: {
            fieldParams: fieldParams?.data,
            fetchParams: fetchParams?.data,
            selectParams: selectParams?.data,
            searchParams: searchParams?.data,
            subPropsParams: subPropsParams?.data,
        },
    }
}

function generateFields(fields = "", allowed = [], adminBypass = false) {
    if (!fields) return { success: true, code: 200, message: "skip field", data: null }
    if (!Array.isArray(allowed)) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (allowed.length === 0) return { success: false, code: 403, message: "Access not allowed", data: null }

    let arrayFields = fields.split(",")
    if (adminBypass) return { success: true, code: 200, message: null, data: arrayFields.join(" ") }

    if (!Array.isArray(arrayFields)) return { success: false, code: 500, message: "1????", data: null }
    if (arrayFields.length > allowed.length) return { success: false, code: 400, message: "Query params exceed limit", data: null }
    if (arrayFields.length < 1) return { success: false, code: 500, message: "2????", data: null }

    for (let i = 0; i < arrayFields.length && !adminBypass; i++) {
        if (!allowed.includes(arrayFields[i])) return { success: false, code: 400, message: "Query params not allowed (array)", data: null }
    }

    return { success: true, code: 200, message: null, data: arrayFields.join(" ") }
    // if (!stringFields) return { success: false, code: 500, message: `Unexpected error in process on ${controllerName}`, options: null }
}

function generateSearches(searches = "", allowed = [], adminBypass = false) {
    if (!searches) return { success: true, code: 200, message: "skip search", data: null }
    if (!Array.isArray(allowed)) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (allowed.length === 0) return { success: false, code: 403, message: "Access not allowed", data: null }

    let arraySearches = searches.split(",")
    let searchParams = {}

    if (!adminBypass) {
        if (!Array.isArray(arraySearches)) return { success: false, code: 500, message: "1????", data: null }
        if (arraySearches.length > allowed.length) return { success: false, code: 400, message: "Query params exceed limit", data: null }
        if (arraySearches.length < 1) return { success: false, code: 500, message: "2????", data: null }
    }

    for (let i = 0; i < allowed.length; i++) {
        if (!arraySearches[i]) break

        const searchSplited = arraySearches[i].split(":")
        const searchMethod = searchSplited[0]
        const searchField = searchSplited[1]

        if (searchField === null) return { success: false, code: 500, message: `Unexpected error in process on searches`, data: null }
        if (!allowed.includes(searchMethod) && !adminBypass) return { success: false, code: 400, message: "Query params not allowed", data: null }

        searchParams[searchMethod] = searchField
    }
    // console.log("from exter: ", searchParams)
    return { success: true, code: 200, message: null, data: searchParams }
    // if (!stringFields) return { success: false, code: 500, message: `Unexpected error in process on ${controllerName}`, options: null }
}

function generateSubProps(subProps = "", allowed = { method: [], fields: [] }, adminBypass = false) {
    if (!subProps) return { success: true, code: 200, message: "skip subProps", data: null }
    if (!Array.isArray(allowed.method)) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (!Array.isArray(allowed.fields)) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (allowed.method.length === 0) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (allowed.fields.length === 0) return { success: false, code: 403, message: "Access not allowed", data: null }

    let arraySubProps = subProps.split(",")
    let subPropsParams = []

    if (!adminBypass) {
        if (!Array.isArray(arraySubProps)) return { success: false, code: 500, message: "1????", data: null }
        if (arraySubProps.length > allowed.length) return { success: false, code: 400, message: "Query params exceed limit", data: null }
        if (arraySubProps.length < 1) return { success: false, code: 500, message: "2????", data: null }
    }

    for (let i = 0; i < arraySubProps.length; i++) {

        let popsLayers = arraySubProps[i].split("$")
        let popsObject = {}

        for (let j = 0; j < popsLayers.length; j++) {
            if (!popsLayers[j]) break

            const splitedData = popsLayers[j].split(":")
            if (splitedData.length !== 2) return { success: false, code: 400, message: "Invalid query params", data: null }
            const method = splitedData[0]
            const fields = splitedData[1]

            // console.log(splitedData)
            // console.log(allowed.fields, fields)

            if (!adminBypass) {
                if (!allowed.fields.includes(fields)) return { success: false, code: 400, message: "Query params value not allowed (string)", data: null }
                if (!allowed.method.includes(method)) return { success: false, code: 400, message: "Query params field not allowed (string)", data: null }
            }

            if (method === "populate") popsObject[method] = { path: fields }
            else popsObject[method] = fields
        }
        subPropsParams.push(popsObject)
    }

    return { success: true, code: 200, message: null, data: subPropsParams }
}

function generateSelects(select = "", allowed = [], adminBypass = false) {
    if (!select) return { success: true, code: 200, message: "skip select", data: null }
    if (!Array.isArray(allowed)) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (allowed.length === 0) return { success: false, code: 403, message: "Access not allowed", data: null }

    let arraySelect = select.split(",")
    if (adminBypass) return { success: true, code: 200, message: null, data: arraySelect.join(" ") }


    if (!Array.isArray(arraySelect)) return { success: false, code: 500, message: "1????", data: null }
    if (arraySelect.length > allowed.length) return { success: false, code: 400, message: "Query params exceed limit", data: null }
    if (arraySelect.length < 1) return { success: false, code: 500, message: "2????", data: null }

    for (let i = 0; i < arraySelect.length; i++) {
        if (!allowed.includes(arraySelect[i])) return { success: false, code: 400, message: "Query params not allowed (array)", data: null }
    }

    return { success: true, code: 200, message: null, data: arraySelect.join(" ") }
}

function generateFetchs(fetch = "", allowed = [], adminBypass = false) {
    if (!fetch) return { success: true, code: 200, message: "skip fetch", data: null }
    if (!Array.isArray(allowed)) return { success: false, code: 403, message: "Access not allowed", data: null }
    if (allowed.length === 0) return { success: false, code: 403, message: "Access not allowed", data: null }

    let arrayFetch = fetch.split(",")
    if (adminBypass) return { success: true, code: 200, message: null, data: arrayFetch.join(" ") }

    if (!Array.isArray(arrayFetch)) return { success: false, code: 500, message: "1????", data: null }
    if (arrayFetch.length > allowed.length) return { success: false, code: 400, message: "Query params exceed limit", data: null }
    if (arrayFetch.length < 1) return { success: false, code: 500, message: "2????", data: null }


    for (let i = 0; i < arrayFetch.length; i++) {
        // console.log(allowed, arrayFetch[i])
        if (!allowed.includes(arrayFetch[i])) return { success: false, code: 400, message: "Query params not allowed (array)", data: null }
    }
    return { success: true, code: 200, message: null, data: arrayFetch.join(" ") }
}

exports.getDiffTimePeriod = (diff) => {
    let milliseconds = Math.floor((diff % 1000) / 100)
    let seconds = Math.floor((diff / 1000) % 60)
    let minutes = Math.floor((diff / (1000 * 60)) % 60)
    let hours = Math.floor((diff / (1000 * 60 * 60)) % 24)

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}.${milliseconds}`
} 
