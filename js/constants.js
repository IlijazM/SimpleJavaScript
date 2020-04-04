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
C["h"] = "'h'"
C["i"] = combinationIndex("undefined", 5)
C["j"] = combinationIndex("[object Object]", 3)
C["k"] = undefined
C["l"] = combinationIndex("false", 2)
C["m"] = zero().constructor().toString().indexAt(11)
C["n"] = combinationIndex("undefined", 1)
C["o"] = combinationIndex("[object Object]", 1)
C["q"] = "'q'"
C["r"] = combinationIndex("true", 1)
C["s"] = combinationIndex("false", 3)
C["t"] = combinationIndex("true", 0)
C["u"] = combinationIndex("true", 2)
C["v"] = newArray().indexAt("sort").toString().indexAt(23)
C["y"] = newArray().constructor().toString().indexAt(13)

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
C["+"] = newFunction(generateString("return 1e100")).toString().indexAt(2)
C["."] = newFunction(generateString("return 1/2")).toString().indexAt(1)

C["g"] = newFunction(generateString("return 1n.constructor")).toString().indexAt(11)
C["p"] = newFunction(generateString("return /a/")).constructor().toString().indexAt(14)
C["x"] = newFunction(generateString("return /a/")).constructor().toString().indexAt(13)

C["?"] = newFunction(generateString("return /./.compile()")).toString().indexAt(2)
C[":"] = newFunction(generateString("return /./.compile()")).toString().indexAt(3)

// upper case

C["A"] = newArray().constructor().toString().indexAt(9)
C["B"] = toValue("![]").inBrackets().constructor().toString().indexAt(9)
C["E"] = newFunction(generateString("return /a/")).constructor().toString().indexAt(12)
C["F"] = newArray().indexAt("sort").constructor().toString().indexAt(9)
C["I"] = newFunction(generateString("return 1e1000")).toString().indexAt(0)
C["N"] = combinationIndex("NaN", 0)
C["O"] = newObject().constructor().toString().indexAt(9)
C["R"] = newFunction(generateString("return /a/")).constructor().toString().indexAt(9)
C["S"] = emptyString().constructor().toString().indexAt(9)
C["U"] = newFunction(generateString("return toString(Object.create([]))")).indexAt(8)

C["C"] = newFunction(generateString("return Object.entries(console)")).indexAt(10).indexAt(0).indexAt(5) // find it
C["L"] = newFunction(generateString("return Object.entries(console)")).indexAt(19).indexAt(0).indexAt(4) // find it

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
function newFunction(name) { return toValue(name).toFunction() }

function forceChar(c) {
    c = c.charCodeAt(0)
    console.log(c)

    return c
}

function generateString(input) {
    let out = ""

    for (let i = 0; i < input.length; i++) {
        if (i != 0) out += "+"

        let c = C[input[i]]

        if (c == undefined) out += input[i]
        else out += c.value;
    }

    return out
}