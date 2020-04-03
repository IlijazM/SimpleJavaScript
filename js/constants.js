const C = {
    "a": "'a'",
    "b": "'b'",
    "c": "'c'",
    "d": "'d'",
    "e": "'e'",
    "f": "'f'",
    "g": "'g'",
    "h": "'h'",
    "i": "'i'",
    "j": "'j'",
    "k": "'k'",
    "l": "'l'",
    "m": "'m'",
    "n": "'n'",
    "o": "'o'",
    "p": "'p'",
    "q": "'q'",
    "r": "'r'",
    "s": "'s'",
    "t": "'t'",
    "u": "'u'",
    "v": "'v'",
    "w": "'w'",
    "x": "'x'",
    "y": "'y'",
    "z": "'z'",
}

function generateString(input) {
    let out = ""

    for (let i = 0; i < input.length; i++) {
        if (i != 0) out += "+"

        let c = input[i]
        out += C[c];
    }

    return out
}