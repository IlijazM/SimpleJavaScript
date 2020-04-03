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

comb = (name) => { return COMBINATIONS[name] + TOSTRING }

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

index = (i) => { return N[i] }
combIndex = (name, i) => { return `(${comb(name)})[${index(i)}]` }

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
C["m"] = "'m'"
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
C["y"] = "'y'"
C["z"] = "'z'"

/*
 * B:
 * origin: [object Object]
 */

function generateString(input) {
    let out = ""

    for (let i = 0; i < input.length; i++) {
        if (i != 0) out += "+"

        let c = C[input[i]]

        if (c == undefined) c = `"${input[i]}"`

        out += c;
    }

    return out
}