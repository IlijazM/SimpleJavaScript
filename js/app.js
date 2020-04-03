getel = (name) => { return document.getElementById(name) }
getvalue = (name) => { return getel(name).value }

function toText() {
    let text = getvalue("text")
    getel("js").value = generateString(text)
}