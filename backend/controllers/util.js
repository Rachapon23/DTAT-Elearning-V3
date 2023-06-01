
exports.validateQuery = (method, options = { fields, fetchs, selects, search, subPops }) => {

    // subPop for sub-populate
    // field for populate
    // fetch field after populate
    // select field in this model
    // search condition
    // NOTE: subPop or field can use 1 field per request (select once in these two) 

    if(!method) return null
    let subPops = options.subPops
    let fields = options.fields
    let fetchs = options.fetchs
    let selects = options.selects
    let search = options.search
    
    const seperator = new RegExp(",", 'g');
    if (fields) fields = fields.replace(seperator, " ")
    if (fetchs) fetchs = fetchs.replace(seperator, " ")
    if (selects) selects = selects.replace(seperator, " ")
    if (search) search = search.replace(seperator, " ")

    console.log("subPops-> ", subPops)
    console.log("fields-> ",fields)
    console.log("fetchs-> ",fetchs)
    console.log("selects-> ",selects)
    console.log("search-> ",search)
  
    // init variable
    let searchParams = null
    let updateParams = null
    let option = { new: true }


    // search
    if (search) {
        console.log("req -> search")
        let searchArray = null
        if (search) searchArray = search.split(",")
        console.log(search)
        if (searchArray && Array.isArray(searchArray)) {
            if (searchArray.length > allowedSearch.length) return res.status(400).json({ error: "Invalid search parameter(s)" });
            if (searchArray.length > 0) {
                for (let i = 0; i < allowedSearch.length; i++) {
                    const searchSplited = searchArray[i].split(":")
                    const searchField = searchSplited[0]
                    const searchValue = searchSplited[1]

                    if (searchField === "_id" && searchValue === null) return res.status(400).json({ error: "Invalid search parameter(s)" });
                    if (!allowedSearch.includes(searchField)) return res.status(400).json({ error: "Invalid search parameter(s)" });

                    console.log(searchField, searchValue)
                    searchParams[searchField] = searchValue
                }
            }
        }
        else if (search) {
            if (!allowedSearch.includes(fields)) return res.status(400).json({ error: "Invalid search parameter(s)" });
        }
    }

    // normal populate field
    if (fields) {
        console.log("req -> fields")
        let populateField = null
        if (fields && Array.isArray(fields)) {
            if (fields.length > allowField.length) return res.status(400).json({ error: "Invalid field parameter(s)" });
            if (fields.length > 1) {
                for (let i = 0; i < fields.length; i++) {
                    if (!allowField.includes(fields[i])) return res.status(400).json({ error: "Invalid field parameter(s)" });
                }
            }
            populateField = fields.join(" ")
        }
        else if (fields) {
            // console.log("===>", fields)
            if (!allowField.includes(fields)) return res.status(400).json({ error: "Invalid field parameter(s)" });
            populateField = fields
        }
        if (!populateField) return res.status(500).json({ error: "Unexpected error on list courses" });
    }
    else if (pops) {
        // sub-populate
        let popsParams = []
        let popsArray = null
        if (pops) popsArray = pops.split(",")
        if (popsArray && Array.isArray(popsArray)) {
            if (popsArray.length > allowedProps.length) return res.status(400).json({ error: "Invalid pops parameter(s)" });

            for (let i = 0; i < popsArray.length; i++) {
                let popsLayers = popsArray[i].split("$")

                console.log(popsLayers)

                let popsObject = {}
                for (let j = 0; j < popsLayers.length; j++) {
                    const splitedData = popsLayers[j].split(":")
                    const fieldData = splitedData[0]
                    const valueData = splitedData[1]

                    console.log(allowedProps, valueData)

                    if (req?.user.role !== "admin") {
                        if (!allowedProps.includes(valueData)) return res.status(400).json({ error: "Invalid pops value parameter(s)" });
                        if (!allowedPropsField.includes(fieldData)) return res.status(400).json({ error: "Invalid pops field parameter(s)" });
                    }

                    if (fieldData === "populate") {
                        popsObject[fieldData] = { path: valueData }
                    }
                    else {
                        popsObject[fieldData] = valueData
                    }
                }
                popsParams.push(popsObject)
            }
            populateField = popsParams
        }
        else {
            return res.status(400).json({ error: "Invalid search parameter(s)" });
        }
    }

    if(fetchs) {

    }

    if(selects) {

    }

    // checkrole for default query
    switch (req?.user?.role) {
        case "admin":
            searchParams = searchParams ? searchParams : { _id: req?.params?.id }
            fields = fields ? fields : "quiz"
            break;
        case "teacher":
            searchParams = searchParams ? searchParams : { _id: req?.params?.id, teacher: user_id }
            fields = fields ? fields : "quiz"
            break;
        case "student":
            searchParams = searchParams ? searchParams : { _id: req?.params?.id }
            fields = fields ? fields : "quiz"
            break;
        default:
            return res.status(404).json({ error: "This role does not exist in system" });
    }
}