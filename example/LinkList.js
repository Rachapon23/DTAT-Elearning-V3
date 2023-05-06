let choices = {
    length: 4,
    head: "k1",
    body: {
        k1: {
            prev: null,
            text: "data1",
            next: "k2"
        },
        k2: {
            prev: "k1",
            text: "data2",
            next: "k3"
        },
        k3: {
            prev: "k2",
            text: "data3",
            next: "k4"
        },
        k4: {
            prev: "k3",
            text: "data4",
            next: null
        },
    },
    tail: "k4"
}

const Ichoice = {
    prev: null | "",
    text: null | "",
    next: null | "",
}

const calculateKey = () => {
    const length = choices.length
    const currentLength = length + 1
    const currentKey = `k${length + 1}`
    const prveKey = choices.body[`k${currentLength - 1}`] ? `k${currentLength - 1}` : null
    const nextKey = choices.body[`k${currentLength + 1}`] ? `k${currentLength + 1}` : null
    return { length: length, currentLength: currentLength, currentKey: currentKey, prveKey: prveKey, nextKey: nextKey }

}

const append = (data) => {
    const { currentKey, prveKey, nextKey } = calculateKey()

    choices.body[currentKey] = {
        prev: prveKey,
        text: data,
        next: nextKey,
    }
    choices.length += 1

    choices.body[prveKey].next = currentKey
    choices.tail = currentKey
}

const pop = () => {
    const { currentKey, prveKey, nextKey } = calculateKey()
    
    return
}

console.log(choices)
append("data5")
append("data6")
append("data7")
append("data8")
console.log(choices)