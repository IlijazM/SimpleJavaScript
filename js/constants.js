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

C["0"] = `(${N[0]}+[])`
C["1"] = `(${N[1]}+[])`
C["2"] = `(${N[2]}+[])`
C["3"] = `(${N[3]}+[])`
C["4"] = `(${N[4]}+[])`
C["5"] = `(${N[5]}+[])`
C["6"] = `(${N[6]}+[])`
C["7"] = `(${N[7]}+[])`
C["8"] = `(${N[8]}+[])`
C["9"] = `(${N[9]}+[])`


C["a"] = combIndex("false", 1)
C["b"] = combIndex("[object Object]", 2)
C["c"] = combIndex("[object Object]", 5)
C["d"] = combIndex("undefined", 8)
C["e"] = combIndex("undefined", 3)
C["f"] = combIndex("false", 0)
C["g"] = "'g'"
C["h"] = "'h'"
C["i"] = combIndex("undefined", 5)
C["j"] = combIndex("[object Object]", 3)
C["k"] = "'k'"
C["l"] = combIndex("false", 2)
C["m"] = getNumberRaw(0).constructor().toString().indexOf(11)
C["n"] = combIndex("undefined", 1)
C["o"] = combIndex("[object Object]", 1)
C["p"] = "'p'"
C["q"] = "'q'"
C["r"] = combIndex("true", 1)
C["s"] = combIndex("false", 3)
C["t"] = combIndex("true", 0)
C["u"] = combIndex("true", 2)
C["v"] = "'v'"
C["w"] = "'w'"
C["x"] = "'x'"
C["y"] = returnValue("[]").constructor().toString().indexOf(13)
C["z"] = "'z'"

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

function returnValue(value) {
    return {
        value: value,
        inBrackets: () => { return returnValue(`(${value})`) },
        inCurlyBrackets: () => { return returnValue(`{${value}}`) },
        inSquareBrackets: () => { return returnValue(`[${value}]`) },
        toString: () => { return returnValue(value + TOSTRING) },
        indexOf: (i) => { return returnValue(`(${value})[${getNumberValue(i)}]`) },
        constructor: (i) => { return returnValue(`(${value})${CONSTRUCTOR}`) },
        toFunction: () => {
            return returnValue(returnValue("[]").indexOf("sort").constructor().value + `(${value})()`)
        },
        execute: () => {
            eval([]["sort"]["constructor"](value)())
        }
    }
}

function getNumberRaw(n) { return returnValue(N[n]) }
function getNumbersRaw(n) { return returnValue(getNumberValue(n)) }
function getNumber(n) { return getNumberRaw(n).toString() }
function getNumbers(n) { return getNumbersRaw(n); }
function comb(c) { return returnValue(COMBINATIONS[c]) }
function combIndex(c, i) { return comb(c).toString().indexOf(i) }

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