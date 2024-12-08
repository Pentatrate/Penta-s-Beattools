const resultDiv = document.querySelector("#result"),
    runButton = document.querySelector("#runCode"),
    copyButton = document.querySelector("#copyResult"),
    eventsDiv = document.querySelector("#eventsDiv"),
    select = document.querySelector("#selectEvent"),
    addButton = document.querySelector("#addEvent"),
    code = [{
        name: "Text Generator",
        functions: [{
            name: "addText",
            desc: "Creates a text group that you can edit almost as easily as decos",
            params: [
                { name: "time", desc: "", type: "number", required: true, newRow: true },
                { name: "order", desc: "", type: "number", required: false },
                { name: "id", desc: "An identifier unique to this text", type: "string", required: true },
                { name: "text", desc: "Text that you start with", type: "string", required: false },
                { name: "horizontalAnchor", desc: "values: left, middle, right (default: left)", type: "select", values: ["left", "middle", "right"], required: false, newRow: true },
                { name: "verticalAnchor", desc: "values: top, middle, bottom (default: top)", type: "select", values: ["top", "middle", "bottom"], required: false },
                { name: "parentid", desc: "", type: "string", required: false, newRow: true },
                { name: "rotationInfluence", desc: "", type: "number", required: false },
                { name: "orbit", desc: "", type: "boolean", required: false },
                { name: "x", desc: "", type: "number", required: false, newRow: true },
                { name: "y", desc: "", type: "number", required: false },
                { name: "r", desc: "", type: "number", required: false },
                { name: "sx", desc: "", type: "number", required: false, newRow: true },
                { name: "sy", desc: "", type: "number", required: false },
                { name: "kx", desc: "", type: "number", required: false },
                { name: "ky", desc: "", type: "number", required: false },
                { name: "drawLayer", desc: "", type: "select", values: ["bg", "fg", "ontop"], required: false, newRow: true },
                { name: "drawOrder", desc: "", type: "number", required: false },
                { name: "recolor", desc: "", type: "numberSelect", values: [-1, 0, 1, 2, 3, 4, 5, 6, 7], required: false },
                { name: "outline", desc: "", type: "boolean", required: false, newRow: true },
                { name: "effectCanvas", desc: "", type: "boolean", required: false },
                { name: "effectCanvasRaw", desc: "", type: "boolean", required: false }
            ],
            function: (time, order, id, text, horizontalAnchor, verticalAnchor, parentid, rotationInfluence, orbit, x, y, r, sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas, effectCanvasRaw) => {
                text === undefined && (text = ""),
                    horizontalAnchor === undefined && (horizontalAnchor = "left"),
                    verticalAnchor === undefined && (verticalAnchor = "top"),
                    sx === undefined && (sx = 1),
                    sy === undefined && (sy = 1),
                    ky === undefined && (ky = 0),
                    texts.push({ id: id, text: "", horizontalAnchor: horizontalAnchor, verticalAnchor: verticalAnchor, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, r: r, sx: sx, sy: sy, kx: kx, ky: ky, drawLayer: drawLayer, drawOrder: drawOrder, recolor: recolor, outline: outline, effectCanvas: effectCanvas, effectCanvasRaw: effectCanvasRaw, ox: 0, oy: 0 }),
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, sx: 0 }),
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-2", parentid: prefix + "_" + id, x: 0, y: 0, r: r, sx: 0 }),
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", parentid: prefix + "_" + id + "_-2", x: 0, y: (verticalAnchor == "top" ? 0 : (verticalAnchor == "middle" ? -12 / 2 : -12)) * sy, sx: 0 }),
                    runFunction("Text Generator", "changeText", time, order + 1, id, text);
            }
        }, {
            name: "changeText",
            desc: "Edits the letters in the text group",
            params: [
                { name: "time", desc: "", type: "number", required: true, newRow: true },
                { name: "order", desc: "", type: "number", required: false },
                { name: "id", desc: "The identifier unique to this text", type: "string", required: true },
                { name: "text", desc: "The letters to fully replace your previous letters with", type: "string", required: false }
            ],
            function: (time, order, id, text) => {
                text === undefined && (text = "");
                const textObj = texts[getIndexOfText(id)];
                for (let i = 0; i < text.length; i++) {
                    const letter = text[i];
                    if (textObj.text.length <= i) { // New Letter
                        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, sprite: prefix + "#" + getIndexOfLetter(letter), parentid: prefix + "_" + id + "_" + (i - 1), x: getLetterOffset(text[i - 1]) * textObj.sx, y: getLetterOffset(text[i - 1]) * textObj.sy * textObj.ky, sx: letter == " " ? 0 : textObj.sx, sy: textObj.sy, kx: textObj.kx, ky: textObj.ky, drawLayer: textObj.drawLayer, drawOrder: textObj.drawOrder, recolor: textObj.recolor, outline: textObj.outline, effectCanvas: textObj.effectCanvas, effectCanvasRaw: textObj.effectCanvasRaw });
                    } else if (textObj.text[i] != text[i]) { // Replace Letter
                        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, sprite: prefix + "#" + getIndexOfLetter(letter), x: getLetterOffset(text[i - 1]) * textObj.sx, y: getLetterOffset(text[i - 1]) * textObj.sy * textObj.ky, sx: letter == " " ? 0 : textObj.sx });
                    } else if (textObj.text[i - 1] != text[i - 1]) { // Change Offset
                        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, x: getLetterOffset(text[i - 1]) * textObj.sx, y: getLetterOffset(text[i - 1]) * textObj.sy * textObj.ky });
                    }
                }
                for (let i = text.length; i < textObj.text.length; i++) {
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, sx: 0 });
                }
                textObj.horizontalAnchor != "left" && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", x: -getTextLength(text) * textObj.sx * (textObj.horizontalAnchor == "middle" ? 0.5 : 1) }));
                textObj.text = text;
            }
        }, {
            name: "changeAnchor",
            desc: "Seamlessly changes the anchor point of rotations for the text group\nDO NOT use while sx or sy are getting eased, or you will notice stutters within your animation",
            params: [
                { name: "time", desc: "", type: "number", required: true, newRow: true },
                { name: "order", desc: "", type: "number", required: false },
                { name: "id", desc: "The identifier unique to this text", type: "string", required: true },
                { name: "horizontalAnchor", desc: "values: left, middle, right (default: left)", type: "select", values: ["left", "middle", "right"], required: false, newRow: true },
                { name: "verticalAnchor", desc: "values: top, middle, bottom (default: top)", type: "select", values: ["top", "middle", "bottom"], required: false },
            ],
            function: (time, order, id, horizontalAnchor, verticalAnchor) => {
                const textObj = texts[getIndexOfText(id)];
                horizontalAnchor === undefined && (horizontalAnchor = textObj.horizontalAnchor),
                    verticalAnchor === undefined && (verticalAnchor = textObj.verticalAnchor),
                    textObj.ox += (textObj.horizontalAnchor == "left" ? 0 : -getTextLength(textObj.text) * textObj.sx * (textObj.horizontalAnchor == "middle" ? 0.5 : 1)) - (horizontalAnchor == "left" ? 0 : -getTextLength(textObj.text) * textObj.sx * (horizontalAnchor == "middle" ? 0.5 : 1)),
                    textObj.oy -= ((textObj.verticalAnchor == "top" ? 0 : (textObj.verticalAnchor == "middle" ? 12 / 2 : 12)) - (verticalAnchor == "top" ? 0 : (verticalAnchor == "middle" ? 12 / 2 : 12))) * textObj.sy,
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-2", parentid: prefix + "_" + id, x: textObj.ox, y: textObj.oy }),
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", x: (horizontalAnchor == "left" ? 0 : -getTextLength(textObj.text) * textObj.sx * (horizontalAnchor == "middle" ? 0.5 : 1)), y: (verticalAnchor == "top" ? 0 : (verticalAnchor == "middle" ? -12 / 2 : -12)) * textObj.sy }),
                    horizontalAnchor && (textObj.horizontalAnchor = horizontalAnchor),
                    verticalAnchor && (textObj.verticalAnchor = verticalAnchor);
            }
        }, {
            name: "easeText",
            desc: "Animates the text group like a deco event\nDO NOT animate sy and ky overlappingly either with different eases or with overlapping durations, or you will notice stutters within your animation\nYou can animate them both overlappingly ONLY with the same easeText function",
            params: [
                { name: "time", desc: "", type: "number", required: true, newRow: true },
                { name: "order", desc: "", type: "number", required: false },
                { name: "id", desc: "The identifier unique to this text", type: "string", required: true },
                { name: "parentid", desc: "", type: "string", required: false, newRow: true },
                { name: "rotationInfluence", desc: "", type: "number", required: false },
                { name: "orbit", desc: "", type: "boolean", required: false },
                { name: "x", desc: "", type: "number", required: false, newRow: true },
                { name: "y", desc: "", type: "number", required: false },
                { name: "r", desc: "", type: "number", required: false },
                { name: "sx", desc: "", type: "number", required: false, newRow: true },
                { name: "sy", desc: "", type: "number", required: false },
                { name: "kx", desc: "", type: "number", required: false },
                { name: "ky", desc: "", type: "number", required: false },
                { name: "drawLayer", desc: "", type: "select", values: ["bg", "fg", "ontop"], required: false, newRow: true },
                { name: "drawOrder", desc: "", type: "number", required: false },
                { name: "recolor", desc: "", type: "numberSelect", values: [-1, 0, 1, 2, 3, 4, 5, 6, 7], required: false },
                { name: "outline", desc: "", type: "boolean", required: false, newRow: true },
                { name: "effectCanvas", desc: "", type: "boolean", required: false },
                { name: "effectCanvasRaw", desc: "", type: "boolean", required: false },
                { name: "duration", desc: "", type: "number", required: false, newRow: true },
                { name: "ease", desc: "", type: "select", values: ["linear", "inSine", "outSine", "inOutSine", "inQuad", "outQuad", "inOutQuad", "inCubic", "outCubic", "inOutCubic", "inQuart", "outQuart", "inOutQuart", "inQuint", "outQuint", "inOutQuint", "inExpo", "outExpo", "inOutExpo", "inCirc", "outCirc", "inOutCirc", "inElastic", "outElastic", "inOutElastic", "inBack", "outBack", "inOutBack"], required: false }
            ],
            function: (time, order, id, parentid, rotationInfluence, orbit, x, y, r, sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas, effectCanvasRaw, duration, ease) => {
                const textObj = texts[getIndexOfText(id)];
                sx === undefined && (sx = textObj.sx),
                    sy === undefined && (sy = textObj.sy),
                    ky === undefined && (ky = textObj.ky),
                    [parentid, rotationInfluence, orbit, x, y].some(value => value !== undefined) && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, duration: duration, ease: ease })),
                    r !== undefined && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-2", r: r, duration: duration, ease: ease }));
                if ([sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas, effectCanvasRaw].some(value => value !== undefined)) {
                    for (let i = 0; i < textObj.text.length; i++) {
                        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, x: getLetterOffset(textObj.text[i - 1]) * sx, y: getLetterOffset(textObj.text[i - 1]) * sy * ky, sx: textObj.text[i] == " " ? 0 : sx, sy: sy, kx: kx, ky: ky, drawLayer: drawLayer, drawOrder: drawOrder, recolor: recolor, outline: outline, effectCanvas: effectCanvas, effectCanvasRaw: effectCanvasRaw, duration: duration, ease: ease });
                    }
                }
                parentid && (textObj.parentid = parentid),
                    rotationInfluence && (textObj.rotationInfluence = rotationInfluence),
                    orbit && (textObj.orbit = orbit),
                    x && (textObj.x = x),
                    y && (textObj.y = y),
                    r && (textObj.r = r),
                    sx && (textObj.sx = sx),
                    sy && (textObj.sy = sy),
                    kx && (textObj.kx = kx),
                    ky && (textObj.ky = ky),
                    drawLayer && (textObj.drawLayer = drawLayer),
                    drawOrder && (textObj.drawOrder = drawOrder),
                    recolor && (textObj.recolor = recolor),
                    outline && (textObj.outline = outline),
                    effectCanvas && (textObj.effectCanvas = effectCanvas),
                    effectCanvasRaw && (textObj.effectCanvasRaw = effectCanvasRaw);
            }
        }, {
            name: "funnyAnimation",
            desc: "Animates the letters of the text group using @k4kadu's idea\nRandomizes four letters at the same time\nAnimation duration is (longer length of start/end text + 5) / lettersPerBeat",
            params: [
                { name: "time", desc: "", type: "number", required: true, newRow: true },
                { name: "id", desc: "The identifier unique to this text", type: "number", required: true },
                { name: "text", desc: "The letters to fully replace your previous letters with", type: "number", required: false },
                { name: "lettersPerBeat", desc: "How many letters start or end getting animated per beat (default: 1)", type: "number", required: false, newRow: true },
                { name: "letterSubRandomize", desc: "How many randomizations any letter gets before the next letter starts or ends getting randomized (default: 1)", type: "number", required: false }
            ],
            function: (time, id, text, lettersPerBeat, letterSubRandomize) => {
                text === undefined && (text = ""),
                    lettersPerBeat === undefined && (lettersPerBeat = 1),
                    letterSubRandomize === undefined && (letterSubRandomize = 1);
                for (let i = 0; i < text.length + 5; i += 1 / letterSubRandomize) {
                    let newText = texts[getIndexOfText(id)].text.split(""), j = Math.floor(i);
                    text[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] !== undefined && (newText[j] = text[j]),
                        newText = newText.join(""),
                        runFunction("Text Generator", "changeText", time + i / lettersPerBeat, 0, id, newText);
                }
                for (let i = text.length; i < texts[getIndexOfText(id)].text.length + 5; i += 1 / letterSubRandomize) {
                    let newText = texts[getIndexOfText(id)].text.split(""), j = Math.floor(i);
                    text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = " "),
                        newText = newText.join(""),
                        runFunction("Text Generator", "changeText", time + i / lettersPerBeat, 0, id, newText);
                }
                runFunction("Text Generator", "changeText", time + (texts[getIndexOfText(id)].text.length + 5) / lettersPerBeat, undefined, id, texts[getIndexOfText(id)].text.trimEnd());
            }
        }/*, {
            name: "",
            desc: "",
            params: [
                { name: "", desc: "", type: "number", required: true, newRow: true },
                { name: "", desc: "", type: "number", required: false }
            ],
            function: () => {
            }
        }*/]
    }];



function beautifyText(text) {
    text = String(text)
    if (text.length < 3) {
        text = text.toUpperCase();
    } else {
        text = text.split("");
        for (let i = 0; i < text.length && i < 1000; i++) {
            const letter = text[i];
            letter === letter.toUpperCase() && (text.push(" ", ...text.splice(i, text.length - i++)));
        }
        text[0] = text[0].toUpperCase(),
            text = text.join("");
    }
    return text;
}
function updatePosition() {
    for (let i = 0; i < eventsDiv.children.length; i++) {
        const lastElementChild = eventsDiv.children[i].lastElementChild.lastElementChild;
        lastElementChild.previousElementSibling.style.display = "",
            lastElementChild.style.display = "";
    }
    eventsDiv.lastElementChild && (
        eventsDiv.firstElementChild.lastElementChild.lastElementChild.previousElementSibling.style.display = "none",
        eventsDiv.lastElementChild.lastElementChild.lastElementChild.style.display = "none"
    );
}
function addEvent(func) {
    const eventDiv = document.createElement("div"), hidden = document.createElement("label"), label = document.createElement("label");
    hidden.innerText = func.name,
        hidden.hidden = true,
        eventDiv.appendChild(hidden),
        label.innerText = beautifyText(func.name),
        label.title = func.desc,
        eventDiv.appendChild(label),
        eventDiv.classList.add("subfield"),
        eventsDiv.appendChild(eventDiv);
    func.params.forEach(param => {
        if (param.newRow) {
            const row = document.createElement("div");
            row.classList.add("row"),
                eventsDiv.lastElementChild.appendChild(row);
        }
        let inputDiv;
        switch (param.type) {
            case "number":
                inputDiv = document.createElement("input"),
                    inputDiv.type = "number";
                break;
            case "string":
                inputDiv = document.createElement("input"),
                    inputDiv.type = "text";
                break;
            case "select":
                inputDiv = document.createElement("select");
                if (true) {
                    const defaultOption = document.createElement("option");
                    defaultOption.innerText = "Undefined",
                        defaultOption.value = "",
                        inputDiv.appendChild(defaultOption);
                }
                for (let i = 0; i < param.values.length; i++) {
                    const option = document.createElement("option");
                    option.innerText = beautifyText(param.values[i]),
                        option.value = param.values[i],
                        inputDiv.appendChild(option);
                }
                break;
            case "boolean":
                inputDiv = document.createElement("select");
                if (true) {
                    const defaultOption = document.createElement("option");
                    defaultOption.innerText = "Undefined",
                        defaultOption.value = "",
                        inputDiv.appendChild(defaultOption);
                }
                for (let i = 0; i < 2; i++) {
                    const option = document.createElement("option");
                    option.innerText = beautifyText(["true", "false"][i]),
                        option.value = ["true", "false"][i],
                        inputDiv.appendChild(option);
                }
                break;
            case "numberSelect":
                inputDiv = document.createElement("select");
                if (true) {
                    const defaultOption = document.createElement("option");
                    defaultOption.innerText = "Undefined",
                        defaultOption.value = "",
                        inputDiv.appendChild(defaultOption);
                }
                for (let i = 0; i < param.values.length; i++) {
                    const option = document.createElement("option");
                    option.innerText = beautifyText(param.values[i]),
                        option.value = param.values[i],
                        inputDiv.appendChild(option);
                }
                break;
            default: throw new Error("DEFAULT PART OF SWITCH REACHED");
        }
        param.required && (inputDiv.classList.add("animColor"));
        const label = document.createElement("label");
        label.innerText = beautifyText(param.name), label.title = param.desc,
            inputDiv.classList.add("subsubfield"),
            eventsDiv.lastElementChild.lastElementChild.append(label, inputDiv);
    });
    const row = document.createElement("div"), removeButton = document.createElement("button"), moveUpButton = document.createElement("button"), moveDownButton = document.createElement("button");
    row.classList.add("row"),
        eventsDiv.lastElementChild.appendChild(row),
        removeButton.innerText = "Remove",
        removeButton.classList.add("subsubfield"),
        removeButton.onclick = () => {
            removeButton.parentElement.parentElement.remove(),
                updatePosition();
        },
        moveUpButton.innerText = "Move Up",
        moveUpButton.classList.add("subsubfield"),
        moveUpButton.onclick = () => {
            removeButton.parentElement.parentElement.previousElementSibling.insertAdjacentElement("beforebegin", eventDiv),
                updatePosition();
        },
        moveDownButton.innerText = "Move Down",
        moveDownButton.classList.add("subsubfield"),
        moveDownButton.onclick = () => {
            removeButton.parentElement.parentElement.nextElementSibling.insertAdjacentElement("afterend", eventDiv),
                updatePosition();
        },
        eventsDiv.lastElementChild.lastElementChild.append(removeButton, moveUpButton, moveDownButton),
        updatePosition();
}
function runFunction(title, name, ...params) {
    code.filter(group => group.name == title)[0].functions.filter(func => func.name == name)[0].function(...params);
}



// Init
resultDiv.innerText = "Hover over some event name and parameters to get tooltips",
    code[0].functions.forEach(func => {
        const option = document.createElement("option");
        option.innerText = beautifyText(func.name),
            option.value = func.name,
            select.appendChild(option);
    }),
    addButton.onclick = () => {
        const func = code[0].functions.filter(func => func.name == select.value)[0];
        addEvent(func);
    },
    copyButton.onclick = () => {
        navigator.clipboard.writeText(resultDiv.innerText),
            copyButton.style.backgroundColor = "green",
            console.log("Copied into clipboard!"),
            setTimeout(() => {
                copyButton.style.backgroundColor = "";
            }, 1000);
    },
    runButton.onclick = () => {
        events = [], texts = [];
        for (let i = 0; i < eventsDiv.children.length; i++) {
            const event = eventsDiv.children[i], func = code[0].functions.filter(func => event.firstElementChild.innerText == func.name)[0];
            let params = [];
            for (let j = 2; j < event.children.length - 1; j++) {
                const row = event.children[j];
                for (let k = 1; k < row.children.length; k += 2) {
                    let param = row.children[k].value, paramDefault = func.params[params.length];
                    row.children[k].style.backgroundColor = "";
                    if (param == "") {
                        param = undefined;
                        if (paramDefault.required) {
                            row.children[k].style.backgroundColor = "red", resultDiv.innerText = "Empty required input",
                                runButton.style.backgroundColor = "red",
                                setTimeout(() => {
                                    runButton.style.backgroundColor = "";
                                }, 1000);
                            return;
                        }
                    } else {
                        switch (paramDefault.type) {
                            case "number": param = Number(param); break;
                            case "string": break;
                            case "boolean": param = Boolean(param); break;
                            case "select": break;
                            case "numberSelect": param = Number(param); break;
                            default: throw new Error("DEFAULT PART OF SWITCH REACHED");;
                        }
                    }
                    params.push(param);
                }
            }
            func.function(...params);
        }
        resultDiv.innerText = JSON.stringify(events),
            console.log("Amount of events:", events.length),
            runButton.style.backgroundColor = "green",
            setTimeout(() => {
                runButton.style.backgroundColor = "";
            }, 1000);
    };



// General utility
let events = [];
function randomValue(min, range) { return Math.floor(Math.random() * (range)) + min; }

// Text Generator utility
const availiableLetters = [{ letter: " ", length: 4 }, { letter: "a", length: 8 }, { letter: "b", length: 8 }, { letter: "c", length: 7 }, { letter: "d", length: 8 }, { letter: "e", length: 8 }, { letter: "f", length: 3 }, { letter: "g", length: 8 }, { letter: "h", length: 8 }, { letter: "i", length: 2 }, { letter: "j", length: 2 }, { letter: "k", length: 8 }, { letter: "l", length: 2 }, { letter: "m", length: 11 }, { letter: "n", length: 8 }, { letter: "o", length: 8 }, { letter: "p", length: 8 }, { letter: "q", length: 8 }, { letter: "r", length: 5 }, { letter: "s", length: 7 }, { letter: "t", length: 3 }, { letter: "u", length: 8 }, { letter: "v", length: 8 }, { letter: "w", length: 11 }, { letter: "x", length: 7 }, { letter: "y", length: 8 }, { letter: "z", length: 8 }, { letter: "#", length: 9 }, { letter: "A", length: 8 }, { letter: "B", length: 8 }, { letter: "C", length: 8 }, { letter: "D", length: 8 }, { letter: "E", length: 7 }, { letter: "F", length: 7 }, { letter: "G", length: 9 }, { letter: "H", length: 8 }, { letter: "I", length: 1 }, { letter: "J", length: 3 }, { letter: "K", length: 8 }, { letter: "L", length: 4 }, { letter: "M", length: 11 }, { letter: "N", length: 8 }, { letter: "O", length: 9 }, { letter: "P", length: 8 }, { letter: "Q", length: 9 }, { letter: "R", length: 8 }, { letter: "S", length: 8 }, { letter: "T", length: 7 }, { letter: "U", length: 8 }, { letter: "V", length: 8 }, { letter: "W", length: 11 }, { letter: "X", length: 7 }, { letter: "Y", length: 8 }, { letter: "Z", length: 7 }, { letter: "0", length: 8 }, { letter: "1", length: 1 }, { letter: "2", length: 7 }, { letter: "3", length: 8 }, { letter: "4", length: 8 }, { letter: "5", length: 7 }, { letter: "6", length: 8 }, { letter: "7", length: 6 }, { letter: "8", length: 8 }, { letter: "9", length: 8 }, { letter: "+", length: 5 }, { letter: "-", length: 4 }, { letter: "*", length: 4 }, { letter: "/", length: 3 }, { letter: "\\", length: 3 }, { letter: "%", length: 9 }, { letter: '"', length: 3 }, { letter: "'", length: 1 }, { letter: "&", length: 9 }, { letter: "~", length: 6 }, { letter: ".", length: 1 }, { letter: ",", length: 2 }, { letter: ":", length: 1 }, { letter: ";", length: 2 }, { letter: "_", length: 8 }, { letter: "<", length: 6 }, { letter: ">", length: 6 }, { letter: "|", length: 1 }, { letter: "´", length: 2 }, { letter: "`", length: 2 }, { letter: "^", length: 5 }, { letter: "°", length: 4 }, { letter: "[", length: 2 }, { letter: "]", length: 2 }, { letter: "{", length: 4 }, { letter: "}", length: 4 }, { letter: "=", length: 6 }], prefix = "digitalDiscoFontIncomplete";
let texts = [];
function getIndexOfText(id) { for (let i = 0; i < texts.length; i++) { if (texts[i].id == id) { return i; } } return -1; }
function getIndexOfLetter(letter) { for (let i = 0; i < availiableLetters.length; i++) { if (availiableLetters[i].letter == letter) { return i; } } return -1; }
function getLetterOffset(letter) { if (letter === undefined) { return 0; } return availiableLetters[getIndexOfLetter(letter)].length + (letter == "{" ? 0 : 1); }
function getTextLength(text) { return text.split("").reduce((length, letter) => length + getLetterOffset(letter), 0) }
