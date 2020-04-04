/*
 * []+{}: [object Object]
 * [][+[]]+[] undefined
 * +{}+[] NaN
 * ![]+[] false
 * !![]+[] true
 */

// combinations
const COMBINATIONS = {
    "[object Object]": "{}",
    "undefined": "[][+[]]",
    "NaN": "+{}",
    "false": "![]",
    "true": "!![]"
}

// to string
const TOSTRING = "+[]"
const CONSTRUCTOR = "[({}+[])[+!+[]+!![]+!![]+!![]+!![]]+({}+[])[+!+[]]+([][+[]]+[])[+!+[]]+(![]+[])[+!+[]+!![]+!![]]+(!![]+[])[+[]]+(!![]+[])[+!+[]]+(!![]+[])[+!+[]+!![]]+({}+[])[+!+[]+!![]+!![]+!![]+!![]]+(!![]+[])[+[]]+({}+[])[+!+[]]+(!![]+[])[+!+[]]]"

// numbers
const N = [
    "+[]",
    "+!+[]",
    "+!+[]+!![]",
    "+!+[]+!![]+!![]",
    "+!+[]+!![]+!![]+!![]",
    "+!+[]+!![]+!![]+!![]+!![]",
    "+!+[]+!![]+!![]+!![]+!![]+!![]",
    "+!+[]+!![]+!![]+!![]+!![]+!![]+!![]",
    "+!+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]",
    "+!+[]+!![]+!![]+!![]+!![]+!![]+!![]+!![]+!![]"
]

let C = {}

// numbers

C['#'] = toValue("##########")

C["0"] = getNumber(0).inBrackets()
C["1"] = getNumber(1).inBrackets()
C["2"] = getNumber(2).inBrackets()
C["3"] = getNumber(3).inBrackets()
C["4"] = getNumber(4).inBrackets()
C["5"] = getNumber(5).inBrackets()
C["6"] = getNumber(6).inBrackets()
C["7"] = getNumber(7).inBrackets()
C["8"] = getNumber(8).inBrackets()
C["9"] = getNumber(9).inBrackets()

// lower case

C[" "] = combinationIndex("[object Object]", 7)
C["a"] = combinationIndex("false", 1)
C["b"] = combinationIndex("[object Object]", 2)
C["c"] = combinationIndex("[object Object]", 5)
C["d"] = combinationIndex("undefined", 8)
C["e"] = combinationIndex("undefined", 3)
C["f"] = combinationIndex("false", 0)
C["i"] = combinationIndex("undefined", 5)
C["j"] = combinationIndex("[object Object]", 3)
C["l"] = combinationIndex("false", 2)
C["m"] = zero().constructor().toString().indexAt(11)
C["n"] = combinationIndex("undefined", 1)
C["o"] = combinationIndex("[object Object]", 1)
C["r"] = combinationIndex("true", 1)
C["s"] = combinationIndex("false", 3)
C["t"] = combinationIndex("true", 0)
C["u"] = combinationIndex("true", 2)
C["v"] = newArray().indexAt("sort").toString().indexAt(23)
C["y"] = newArray().constructor().toString().indexAt(13)

/*
 * q w z
 */

// brackets

C["["] = combinationIndex("[object Object]", 0)
C["]"] = combinationIndex("[object Object]", 14)
C["("] = newArray().constructor().toString().indexAt(14)
C[")"] = newArray().constructor().toString().indexAt(15)
C["{"] = newArray().constructor().toString().indexAt(17)
C["}"] = newArray().constructor().toString().indexAt(33)
C["<"] = emptyString().indexAt("italics").add("()").indexAt(0)
C[">"] = emptyString().indexAt("italics").add("()").indexAt(2)
C["/"] = emptyString().indexAt("italics").add("()").indexAt(4)
C["="] = emptyString().indexAt("fontcolor").add("()").toString().indexAt(11)
C['"'] = emptyString().indexAt("fontcolor").add("()").toString().indexAt(12)
C["+"] = newFunction("return 1e100").toString().indexAt(2)
C["."] = newFunction("return 1/2").toString().indexAt(1)

C["g"] = newFunction("return 1n.constructor").toString().indexAt(11)
C["p"] = newFunction("return /a/").constructor().toString().indexAt(14)
C["x"] = newFunction("return /a/").constructor().toString().indexAt(13)

C["?"] = newFunction("return /./.compile()").toString().indexAt(2)
C[":"] = newFunction("return /./.compile()").toString().indexAt(3)

// upper case

C["A"] = newArray().constructor().toString().indexAt(9)
C["B"] = toValue("![]").inBrackets().constructor().toString().indexAt(9)
C["E"] = newFunction("return /a/").constructor().toString().indexAt(12)
C["F"] = newArray().indexAt("sort").constructor().toString().indexAt(9)
C["I"] = newFunction("return 1e1000").toString().indexAt(0)
C["N"] = combinationIndex("NaN", 0)
C["O"] = newObject().constructor().toString().indexAt(9)
C["R"] = newFunction("return /a/").constructor().toString().indexAt(9)
C["S"] = emptyString().constructor().toString().indexAt(9)
C["U"] = newFunction("return toString(Object.create([]))").indexAt(8)

C["k"] = newFunction("return Object.entries(Error)").toString().indexAt(4)
C["h"] = emptyString().indexAt("link").add("()").indexAt(3)

C["C"] = newFunction("return Object.entries(console).find(value => /group.ollapsed/.test(value[0]))").indexAt(0).indexAt(5)
C["L"] = newFunction("return Object.entries(Error)").toString().indexAt(10)
C["T"] = newFunction("return Object.entries(Error)").toString().indexAt(5)

/*
 *  INCLUDED: A B C E F I L N O R S T U
 *  EXCLUDED: D G H I J K M P Q V W X Y Z
 */

function getNumberValue(index) {
    let out = ""
    index = index + ""

    if (index.length == 1) {
        if (!isNaN(parseInt(index[0]))) {
            return N[parseInt(index[0])] + TOSTRING
        } else {
            return C[index[0]] + TOSTRING
        }
    }


    for (let i = 0; i < index.length; i++) {
        if (i != 0) out += "+"
        if (!isNaN(parseInt(index[i]))) {
            out += "(" + N[parseInt(index[i])] + TOSTRING + ")"
        } else {
            out += "(" + C[index[i]].value + TOSTRING + ")"
        }
    }
    return out
}

function toValue(value) {
    return {
        value: value,
        inBrackets: () => { return toValue(`(${value})`) },
        inCurlyBrackets: () => { return toValue(`{${value}}`) },
        inSquareBrackets: () => { return toValue(`[${value}]`) },
        toString: () => { return toValue(value + TOSTRING) },
        indexAt: (i) => { return toValue(`(${value})[${getNumberValue(i)}]`) },
        constructor: (i) => { return toValue(`(${value})${CONSTRUCTOR}`) },
        toFunction: () => {
            return toValue(toValue("[]").indexAt("sort").constructor().value + `(${value})()`)
        },
        add: (other) => { return toValue(value + other) },
        eval: () => {
            console.log(eval(value))
        },
        copy: () => {
            const el = document.createElement('textarea')
            el.value = value.substring(1, value.length - 2)
            document.body.appendChild(el)
            el.select()
            document.execCommand("copy")
            document.body.removeChild(el)

            console.log("copied to clipboard")
        },
        print: () => {
            console.log(value)
        },
        download: (as) => {
            console.log("downloading")
            let blob = new Blob([value], { type: "text/plain" })
            let url = window.URL.createObjectURL(blob)
            const el = document.getElementById("download_link")
            el.download = as
            el.href = url
            el.click()
        }
    }
}

function getNumberRaw(n) { return toValue(N[n]) }
function getNumbersRaw(n) { return toValue(getNumberValue(n)) }
function getNumber(n) { return getNumberRaw(n).toString() }
function getNumbers(n) { return getNumbersRaw(n); }
function combination(c) { return toValue(COMBINATIONS[c]).toString() }
function combinationIndex(c, i) { return combination(c).toString().indexAt(i) }

function newArray() { return toValue("[]") }
function newObject() { return toValue("{}") }
function zero() { return toValue("+[]") }
function emptyString() { return toValue("[]+[]") }
function newFunction(code) { return toValue(generateString(code)).toFunction() }

function forceChar(c) { return newFunction(`return String.fromCharCode(${c.charCodeAt(0)})`) }

function generateString(input) {
    let out = ""

    for (let i = 0; i < input.length; i++) {
        if (i != 0) out += '+'

        let c = C[input[i]]

        if (c == undefined) out += forceChar(input[i]).value
        else out += c.value;
    }

    return out
}

function generateFunction(input) {
    return newFunction(input).value
}