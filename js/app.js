getel = (name) => { return document.getElementById(name) }
getvalue = (name) => { return getel(name).value }

function toText() {
    let text = getvalue("input")
    getel("outputjs").value = generateString(text)
}

function toJS() {
    let text = getvalue("input")
    getel("outputjs").value = generateFunction(text)
}

function obfuscate() {
    if (getel("textselector").checked) {
        toText();
    } else if (getel("jsselector").checked) {
        toJS();
    } else {
        getel("outputjs").value = "Please select input type!"
    }
    getel("outputdiv").style.display = "";
}

function updateplaceholder() {
    if (getel("textselector").checked) {
        getel("input").placeholder = "Enter some Text...";
    } else if (getel("jsselector").checked) {
        getel("input").placeholder = "Enter some JavaScript...";
    } else {
        getel("input").placeholder = "Please select input type!"
    }
}
updateplaceholder();