// Architecture that you don't need to understand and shouldn't need to use directly
const availiableLetters = [{ letter: " ", length: 4 }, { letter: "a", length: 8 }, { letter: "b", length: 8 }, { letter: "c", length: 7 }, { letter: "d", length: 8 }, { letter: "e", length: 8 }, { letter: "f", length: 3 }, { letter: "g", length: 8 }, { letter: "h", length: 8 }, { letter: "i", length: 2 }, { letter: "j", length: 2 }, { letter: "k", length: 8 }, { letter: "l", length: 2 }, { letter: "m", length: 11 }, { letter: "n", length: 8 }, { letter: "o", length: 8 }, { letter: "p", length: 8 }, { letter: "q", length: 8 }, { letter: "r", length: 5 }, { letter: "s", length: 7 }, { letter: "t", length: 3 }, { letter: "u", length: 8 }, { letter: "v", length: 8 }, { letter: "w", length: 11 }, { letter: "x", length: 7 }, { letter: "y", length: 8 }, { letter: "z", length: 8 }, { letter: "#", length: 9 }, { letter: "A", length: 8 }, { letter: "B", length: 8 }, { letter: "C", length: 8 }, { letter: "D", length: 8 }, { letter: "E", length: 7 }, { letter: "F", length: 7 }, { letter: "G", length: 9 }, { letter: "H", length: 8 }, { letter: "I", length: 1 }, { letter: "J", length: 3 }, { letter: "K", length: 8 }, { letter: "L", length: 4 }, { letter: "M", length: 11 }, { letter: "N", length: 8 }, { letter: "O", length: 9 }, { letter: "P", length: 8 }, { letter: "Q", length: 9 }, { letter: "R", length: 8 }, { letter: "S", length: 8 }, { letter: "T", length: 7 }, { letter: "U", length: 8 }, { letter: "V", length: 8 }, { letter: "W", length: 11 }, { letter: "X", length: 7 }, { letter: "Y", length: 8 }, { letter: "Z", length: 7 }, { letter: "0", length: 8 }, { letter: "1", length: 1 }, { letter: "2", length: 7 }, { letter: "3", length: 8 }, { letter: "4", length: 8 }, { letter: "5", length: 7 }, { letter: "6", length: 8 }, { letter: "7", length: 6 }, { letter: "8", length: 8 }, { letter: "9", length: 8 }, { letter: "+", length: 5 }, { letter: "-", length: 4 }, { letter: "*", length: 4 }, { letter: "/", length: 3 }, { letter: "\\", length: 3 }, { letter: "%", length: 9 }, { letter: '"', length: 3 }, { letter: "'", length: 1 }, { letter: "&", length: 9 }, { letter: "~", length: 6 }, { letter: ".", length: 1 }, { letter: ",", length: 2 }, { letter: ":", length: 1 }, { letter: ";", length: 2 }, { letter: "_", length: 8 }, { letter: "<", length: 6 }, { letter: ">", length: 6 }, { letter: "|", length: 1 }, { letter: "´", length: 2 }, { letter: "`", length: 2 }, { letter: "^", length: 5 }, { letter: "°", length: 4 }, { letter: "[", length: 2 }, { letter: "]", length: 2 }, { letter: "{", length: 4 }, { letter: "}", length: 4 }], prefix = "digitalDiscoFontIncomplete";
let events = [], texts = [];
function randomValue(min, range) { return Math.floor(Math.random() * (range)) + min; }
function getIndexOfText(id) { for (let i = 0; i < texts.length; i++) { if (texts[i].id == id) { return i; } } return -1; }
function getIndexOfLetter(letter) { for (let i = 0; i < availiableLetters.length; i++) { if (availiableLetters[i].letter == letter) { return i; } } return -1; }
function getLetterOffset(letter) { if (letter === undefined) { return 0; } return availiableLetters[getIndexOfLetter(letter)].length + (letter == "{" ? 0 : 1); }
function getTextLength(text) { return text.split("").reduce((length, letter) => length + getLetterOffset(letter), 0) }



/**
 * You need only one of this at the beginning of your code
 */
function startTextGeneration() {
    events = [], texts = [];
}

/**
 * Creates a text group that you can edit almost as easily as decos
 *
 * @param time              required
 * @param order             optional
 * @param id                required   an identifier unique to this text
 * @param text              optional   text that you start with (default: "")
 * @param horizontalAnchor  optional   values: left, middle, right (default: "left")
 * @param verticalAnchor    optional   values: top, middle, bottom (default: "top")
 * @param parentid          optional
 * @param rotationInfluence optional
 * @param orbit             optional
 * @param x                 optional
 * @param y                 optional
 * @param r                 optional
 * @param sx                optional
 * @param sy                optional
 * @param kx                optional
 * @param ky                optional
 * @param drawLayer         optional
 * @param drawOrder         optional
 * @param recolor           optional
 * @param outline           optional
 * @param effectCanvas      optional
 */
function addText(time, order, id, text, horizontalAnchor, verticalAnchor, parentid, rotationInfluence, orbit, x, y, r, sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas) {
    text === undefined && (text = ""),
        horizontalAnchor === undefined && (horizontalAnchor = "left"),
        verticalAnchor === undefined && (verticalAnchor = "top"),
        sx === undefined && (sx = 1),
        sy === undefined && (sy = 1),
        ky === undefined && (ky = 0),
        texts.push({ id: id, text: "", horizontalAnchor: horizontalAnchor, verticalAnchor: verticalAnchor, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, r: r, sx: sx, sy: sy, kx: kx, ky: ky, drawLayer: drawLayer, drawOrder: drawOrder, recolor: recolor, outline: outline, effectCanvas: effectCanvas, ox: 0, oy: 0 }),
        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, sx: 0 }),
        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-2", parentid: prefix + "_" + id, x: 0, y: 0, r: r, sx: 0 }),
        events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", parentid: prefix + "_" + id + "_-2", x: 0, y: (verticalAnchor == "top" ? 0 : (verticalAnchor == "middle" ? -12 / 2 : -12)) * sy, sx: 0 }),
        changeText(time, order + 1, id, text);
}

/**
 * Edits the letters in the text group
 *
 * @param time  required
 * @param order optional
 * @param id    required   the identifier unique to this text
 * @param text  optional   the letters to fully replace your previous letters with (default: "")
 */
function changeText(time, order, id, text) {
    text === undefined && (text = "");
    const textObj = texts[getIndexOfText(id)];
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        if (textObj.text.length <= i) { // New Letter
            events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, sprite: prefix + "#" + getIndexOfLetter(letter), parentid: prefix + "_" + id + "_" + (i - 1), x: getLetterOffset(text[i - 1]) * textObj.sx, y: getLetterOffset(text[i - 1]) * textObj.sy * textObj.ky, sx: letter == " " ? 0 : textObj.sx, sy: textObj.sy, kx: textObj.kx, ky: textObj.ky, drawLayer: textObj.drawLayer, drawOrder: textObj.drawOrder, recolor: textObj.recolor, outline: textObj.outline, effectCanvas: textObj.effectCanvas });
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

/**
 * Seamlessly changes the anchor point of rotations for the text group
 * DO NOT use while sx or sy are getting eased, or you will notice stutters within your animation
 *
 * @param time             required
 * @param order            optional
 * @param id               required   the identifier unique to this text
 * @param horizontalAnchor optional   values: left, middle, right (default: "left")
 * @param verticalAnchor   optional   values: top, middle, bottom (default: "top")
 */
function changeAnchor(time, order, id, horizontalAnchor, verticalAnchor) {
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

/**
 * Animates the text group like a deco event
 * DO NOT animate sy and ky overlappingly either with different eases or with overlapping durations, or you will notice stutters within your animation
 * You can animate them both overlappingly ONLY with the same easeText function
 *
 * @param time              required
 * @param order             optional
 * @param id                required   the identifier unique to this text
 * @param parentid          optional
 * @param rotationInfluence optional
 * @param orbit             optional
 * @param x                 optional
 * @param y                 optional
 * @param r                 optional
 * @param sx                optional
 * @param sy                optional
 * @param kx                optional
 * @param ky                optional
 * @param drawLayer         optional
 * @param drawOrder         optional
 * @param recolor           optional
 * @param outline           optional
 * @param effectCanvas      optional
 * @param duration          optional
 * @param ease              optional
 */
function easeText(time, order, id, parentid, rotationInfluence, orbit, x, y, r, sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas, duration, ease) {
    const textObj = texts[getIndexOfText(id)];
    sx === undefined && (sx = textObj.sx),
        sy === undefined && (sy = textObj.sy),
        ky === undefined && (ky = textObj.ky),
        [parentid, rotationInfluence, orbit, x, y].some(value => value !== undefined) && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, duration: duration, ease: ease })),
        r !== undefined && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-2", r: r, duration: duration, ease: ease }));
    if ([sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas].some(value => value !== undefined)) {
        for (let i = 0; i < textObj.text.length; i++) {
            events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_" + i, x: getLetterOffset(textObj.text[i - 1]) * sx, y: getLetterOffset(textObj.text[i - 1]) * sy * ky, sx: textObj.text[i] == " " ? 0 : sx, sy: sy, kx: kx, ky: ky, drawLayer: drawLayer, drawOrder: drawOrder, recolor: recolor, outline: outline, effectCanvas: effectCanvas, duration: duration, ease: ease });
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
        effectCanvas && (textObj.effectCanvas = effectCanvas);
}

/**
 * You need only one of this at the end of your code
 */
function endTextGeneration() {
    console.log(JSON.stringify(events)),
        console.log("Amount of events:", events.length);
}

/**
 * Animates the letters of the text group using @k4kadu's idea
 * Randomizes four letters at the same time
 * Animation duration is (longer length of start/end text + 5) / lettersPerBeat
 *
 * @param time               required
 * @param id                 required   the identifier unique to this text
 * @param text               optional   the letters to fully replace your previous letters with (default: "")
 * @param lettersPerBeat     optional   how many letters start or end getting animated per beat (default: 1)
 * @param letterSubRandomize optional   how many randomizations a letter gets before the next letter starts or ends getting randomized (default: 1)
 */
function funnyAnimation(time, id, text, lettersPerBeat, letterSubRandomize) {
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
            changeText(time + i / lettersPerBeat, 0, id, newText);
    }
    for (let i = text.length; i < texts[getIndexOfText(id)].text.length + 5; i += 1 / letterSubRandomize) {
        console.log("e", i)
        let newText = texts[getIndexOfText(id)].text.split(""), j = Math.floor(i);
        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
            text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
            text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
            text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
            text[j] === undefined && newText[j] !== undefined && (newText[j] = " "),
            newText = newText.join(""),
            changeText(time + i / lettersPerBeat, 0, id, newText);
    }
    changeText(time + (texts[getIndexOfText(id)].text.length + 5) / lettersPerBeat, undefined, id, texts[getIndexOfText(id)].text.trimEnd());
}



// Example Code:
startTextGeneration(),
    addText(0, 0, "test", "", "middle", "middle", undefined, undefined, undefined, 300, 50, undefined, 2, 2, undefined, undefined, undefined, undefined, 2, undefined, undefined),
    funnyAnimation(0, "test", "testing 1 hello", 10, 4),
    easeText(2, undefined, "test", undefined, undefined, undefined, undefined, 360 - 50, 360, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, "outQuad"),
    funnyAnimation(2, "test", "testing 2 omagawd", 10, 4),
    changeAnchor(5, undefined, "test", "left", "top"),
    easeText(5, undefined, "test", undefined, undefined, undefined, undefined, undefined, 0, undefined, undefined, undefined, undefined, undefined, undefined, 1, undefined, undefined, 2, "outQuad"),
    funnyAnimation(7, "test", "testing 3 e", 10, 4),
    endTextGeneration();
