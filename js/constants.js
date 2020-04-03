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
C["g"] = "'g'"
C["h"] = "'h'"
C["i"] = combinationIndex("undefined", 5)
C["j"] = combinationIndex("[object Object]", 3)
C["l"] = combinationIndex("false", 2)
C["m"] = zero().constructor().toString().indexOf(11)
C["n"] = combinationIndex("undefined", 1)
C["o"] = combinationIndex("[object Object]", 1)
C["p"] = "'p'"
C["q"] = "'q'"
C["r"] = combinationIndex("true", 1)
C["s"] = combinationIndex("false", 3)
C["t"] = combinationIndex("true", 0)
C["u"] = combinationIndex("true", 2)
C["v"] = "'v'"
C["y"] = newArray().constructor().toString().indexOf(13)

// brackets

C["["] = combinationIndex("[object Object]", 0)
C["]"] = combinationIndex("[object Object]", 14)
C["("] = newArray().constructor().toString().indexOf(14)
C[")"] = newArray().constructor().toString().indexOf(15)
C["{"] = newArray().constructor().toString().indexOf(17)
C["}"] = newArray().constructor().toString().indexOf(33)
C["<"] = emptyString().indexOf("italics").add("()").indexOf(0)
C[">"] = emptyString().indexOf("italics").add("()").indexOf(2)

// upper case

C["A"] = newArray().constructor().toString().indexOf(9)
C["N"] = combinationIndex("NaN", 0)
C["O"] = newObject().constructor().toString().indexOf(9)
C["S"] = emptyString().constructor().toString().indexOf(9)

C["k"] = btoaFunction(19, 2)
C["w"] = btoaFunction(3, 1)

C["x"] = btoaFunction(101, 3)
C["z"] = btoaFunction(30, 1)
C["D"] = btoaFunction(40, 1)
C["E"] = btoaFunction(11, 2)
C["I"] = btoaFunction(12, 2)
C["M"] = btoaFunction(0, 0)
C["N"] = btoaFunction(4, 0)
C["Q"] = btoaFunction(1, 1)
C["T"] = btoaFunction(10, 1)
C["U"] = btoaFunction(15, 2)
C["Y"] = btoaFunction(16, 2)

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
        indexOf: (i) => { return toValue(`(${value})[${getNumberValue(i)}]`) },
        constructor: (i) => { return toValue(`(${value})${CONSTRUCTOR}`) },
        toFunction: () => {
            return toValue(toValue("[]").indexOf("sort").constructor().value + `(${value})()`)
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
function combinationIndex(c, i) { return combination(c).toString().indexOf(i) }

function newArray() { return toValue("[]") }
function newObject() { return toValue("{}") }
function zero() { return toValue("(+[])") }
function emptyString() { return toValue("([]+[])") }
function newFunction(name) { return toValue(name).toFunction() }

function btoaFunction(b, i) { return toValue(generateString(`return btoa(${b})`)).toFunction().toString().indexOf(i) }

function generateString(input) {
    let out = ""

    for (let i = 0; i < input.length; i++) {
        if (i != 0) out += "+"

        let c = C[input[i]]

        if (c == undefined) c = `"${input[i]}"`
        else out += c.value;
    }

    return out
}