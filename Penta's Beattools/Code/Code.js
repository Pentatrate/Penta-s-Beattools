const version = "1.3",
    toolSelect = document.querySelector("#selectTool"),
    toolButton = document.querySelector("#changeTool"),
    toolLabel = document.querySelector("#toolName"),
    resultDiv = document.querySelector("#result"),
    resultDiv2 = document.querySelector("#result2"),
    runButton = document.querySelector("#runCode"),
    copyButton = document.querySelector("#copyResult"),
    copyButton2 = document.querySelector("#copyResult2"),
    constantsDiv = document.querySelector("#constantsDiv"),
    eventsDiv = document.querySelector("#eventsDiv"),
    eventSelect = document.querySelector("#selectEvent"),
    eventButton = document.querySelector("#addEvent"),
    eventDiv = document.querySelector("#eventDiv"),
    tools = [{
        name: "textGenerator",
        desc: "Generates text groups that you can edit similarly to decos",
        constants: [],
        before: () => { },
        after: () => { },
        functions: [{
            name: "addText",
            desc: "Creates a text group that you can edit almost as easily as decos",
            params: [
                { name: "time", desc: "", type: "number", required: true, newRow: true },
                { name: "order", desc: "", type: "number", required: false },
                { name: "id", desc: "An identifier unique to this text", type: "string", required: true },
                { name: "text", desc: "Text that you start with", type: "string", required: false },
                { name: "horizontalAnchor", desc: "Default: Left", type: "select", values: ["left", "middle", "right"], required: false, newRow: true },
                { name: "verticalAnchor", desc: "Default: Top", type: "select", values: ["top", "middle", "bottom"], required: false },
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
                    events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", parentid: prefix + "_" + id + "_-2", x: (horizontalAnchor == "left" ? 0 : -getTextLength(text) * sx * (horizontalAnchor == "middle" ? 0.5 : 1)), y: (verticalAnchor == "top" ? 0 : (verticalAnchor == "middle" ? -12 / 2 : -12)) * sy, sx: 0 }),
                    runFunction("textGenerator", "changeText", time, order + 1, id, text);
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
                { name: "horizontalAnchor", desc: "Default: Left", type: "select", values: ["left", "middle", "right"], required: false, newRow: true },
                { name: "verticalAnchor", desc: "Default: Top", type: "select", values: ["top", "middle", "bottom"], required: false },
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
                { name: "ease", desc: "", type: "ease", required: false }
            ],
            function: (time, order, id, parentid, rotationInfluence, orbit, x, y, r, sx, sy, kx, ky, drawLayer, drawOrder, recolor, outline, effectCanvas, effectCanvasRaw, duration, ease) => {
                const textObj = texts[getIndexOfText(id)];
                sx === undefined && (sx = textObj.sx),
                    sy === undefined && (sy = textObj.sy),
                    ky === undefined && (ky = textObj.ky),
                    [parentid, rotationInfluence, orbit, x, y].some(value => value !== undefined) && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id, parentid: parentid, rotationInfluence: rotationInfluence, orbit: orbit, x: x, y: y, duration: duration, ease: ease })),
                    r !== undefined && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-2", r: r, duration: duration, ease: ease })),
                    sx !== undefined && textObj.horizontalAnchor != "left" && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", x: -getTextLength(textObj.text) * textObj.sx * (horizontalAnchor == "middle" ? 0.5 : 1), duration: duration, ease: ease })),
                    sy !== undefined && textObj.verticalAnchor != "top" && (events.push({ time: time, order: order, angle: 0, type: "deco", id: prefix + "_" + id + "_-1", y: (verticalAnchor == "middle" ? -12 / 2 : -12) * textObj.sy, duration: duration, ease: ease }));
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
                { name: "lettersPerBeat", desc: "How many letters start or end getting animated per beat\nDefault: 1", type: "number", required: false, newRow: true },
                { name: "letterSubRandomize", desc: "How many randomizations any letter gets before the next letter starts or ends getting randomized\nDefault: 1", type: "number", required: false }
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
                        runFunction("textGenerator", "changeText", time + i / lettersPerBeat, 0, id, newText);
                }
                for (let i = text.length; i < texts[getIndexOfText(id)].text.length + 5; i += 1 / letterSubRandomize) {
                    let newText = texts[getIndexOfText(id)].text.split(""), j = Math.floor(i);
                    text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = availiableLetters[randomValue(0, availiableLetters.length)].letter), j--,
                        text[j] === undefined && newText[j] !== undefined && (newText[j] = " "),
                        newText = newText.join(""),
                        runFunction("textGenerator", "changeText", time + i / lettersPerBeat, 0, id, newText);
                }
                runFunction("textGenerator", "changeText", time + (texts[getIndexOfText(id)].text.length + 5) / lettersPerBeat, undefined, id, texts[getIndexOfText(id)].text.trimEnd());
            }
        }]
    }, {
        name: "untagger",
        desc: "Untags tags in your level\nRequires multiple runs to update input options",
        constants: [
            { name: "level", desc: "The level file that your variant uses", type: "json", required: true, newRow: true },
            { name: "chart", desc: "The chart file of your variant\nLeave empty unless required", type: "json", required: false },
            { name: "selectTag", desc: "Determine whether to untag all tags or select one to untag", type: "boolean", required: true, newRow: true }
        ],
        before: () => {
            if (constants.selectTag) {
                const event = JSON.parse(JSON.stringify(getFirstName(openTool.functions, "selectTag")));
                constants.level.events.forEach(event2 => { event2.type == "tag" && !getFirstName(event.params, "selectTag").values.includes(event2.tag) && (getFirstName(event.params, "selectTag").values.push(event2.tag)) });
                if (eventsDiv.childElementCount != 1 || eventsDiv.firstElementChild.firstElementChild.innerText != "selectTag") {
                    while (eventsDiv.firstElementChild) { eventsDiv.firstElementChild.remove(); }
                    addEvent(event);
                }
            } else {
                const event = JSON.parse(JSON.stringify(getFirstName(openTool.functions, "inputTagEvents")));
                constants.level.events.forEach(event2 => { event2.type == "tag" && !event.params.filter(param => param.name == event2.tag)[0] && (event.params.push({ name: event2.tag, desc: "", type: "json", required: true, newRow: true, dontBeautifyName: true })) }),
                    constants.inputTagEvents = event;
                if (eventsDiv.childElementCount != 1 || eventsDiv.firstElementChild.firstElementChild.innerText != "inputTagEvents") {
                    while (eventsDiv.firstElementChild) { eventsDiv.firstElementChild.remove(); }
                    addEvent(event);
                }
            }
        },
        after: () => {
            if (constants.selectTag) {
                // Do nothing, you're done
            } else {
                console.log(constants.inputTagEventParams, constants.chart);
                console.log("Running untagger.js (modified)"),
                    console.log('If neither "Done!", "Unfinished." or "Aborted." gets logged for a while, an error has occured');
                const belongsToChart = ["block", "hold", "inverse", "mine", "mineHold", "side", "extraTap"];
                let selectedTag, tempTagEvents, needsChartData, status = "untaggingLevel",
                    runTagEventsUntagged = 0, loop = 0,
                    untaggedEvents = [], untaggedRunTagEvents = [], untaggingTags = [], untaggedTags = [], playSongEvents = [];
                untagAll(0);

                function untagAll(recursion) {
                    if (recursion > 1) {
                        console.log("The maximum recursion limit (1) has been reached. Something broke."),
                            status = "unfinished",
                            endRecursion(recursion);
                        return;
                    }
                    console.log(`Starting recursion ${recursion}.`),
                        loop = 0;
                    while ((selectedTag = (recursion == 0 ? constants.level.events : untaggedRunTagEvents).reduce((tag, event) => { return tag ? tag : event.type == "tag" && event.tag != "" && !untaggingTags.includes(event.tag) && event.tag }, false)) !== false && loop <= 100) { // Check for valid Run Tag Event
                        let selectedTag2 = selectedTag;
                        // Require Tag Data
                        console.log(`    (Untagging ${selectedTag}): Start untagging.`),
                            untaggingTags.push(selectedTag),
                            !untaggedTags.includes(selectedTag) && (untaggedTags.push(selectedTag));
                        setTimeout(() => {
                            let tagEvents = constants.inputTagEventParams[selectedTag2];
                            // Warnings
                            if (tagEvents == []) { console.log(`    (Untagging ${selectedTag2}): Nothing in the Tag. Continue deleting Run Tag Events.`); }
                            // Warnings
                            tagEvents.some(event => event.type == "play") && (console.log(`    (Untagging ${selectedTag2}): Play Song Events in Tags may lead to duplicates when untagging. This code will automatically delete duplicates after the first event for you.`)),
                                tagEvents.some(event => event.type == "showResults") && (console.log(`    (Untagging ${selectedTag2}): Show Results Events in Tags may lead to duplicates when untagging.`)),
                                tagEvents.some(event => event.type == "bookmark") && (console.log(`    (Untagging ${selectedTag2}): Bookmark Events don't belong in Tags.`));
                            // Require Chart data
                            needsChartData = tagEvents.some((event => belongsToChart.includes(event.type)));
                            if (constants.chart === undefined && needsChartData) {
                                resultDiv.innerText = "In this case the constant Chart is required", abort = true; return;
                            } else {
                                continueUntagging(selectedTag2, tagEvents, needsChartData);
                            }
                        });
                        loop++;
                    }
                    console.log(`Recursion ${recursion} finished.`);
                    if (loop > 100) {
                        console.log(`The maximum loop limit (100) within the recursion (${recursion}) has been reached. Either something broke or you have over 100 different Tags. Code will continue running.`);
                    } else if (loop == 0) {
                        status = "finished",
                            endRecursion(recursion);
                    }
                    function continueUntagging(selectedTag2, tagEvents, needsChartData2) {
                        // Untagging
                        for (let index = 0; index < constants.level.events.length; index++) {
                            const event = constants.level.events[index];
                            runTagEventsUntagged++;
                            if (event.type != "tag" || event.tag != selectedTag2) { continue; }
                            tempTagEvents = JSON.parse(JSON.stringify(tagEvents)); // Unpointer Code
                            for (const i in tempTagEvents) {
                                tempTagEvents[i].time = tagEvents[i].time + event.time;
                                event.angleOffset && (tempTagEvents[i].angle = tagEvents[i].angle + event.angle);
                            }
                            untaggedEvents.push(...tempTagEvents), constants.level.events.splice(index, 1), index--;
                        }
                        // Update with new data
                        constants.level.events.push(...untaggedEvents.filter((event => !belongsToChart.includes(event.type) && event.type != "tag"))),
                            recursion == 0 && (untaggedRunTagEvents.push(...untaggedEvents.filter((event => event.type == "tag")))),
                            needsChartData2 && (constants.chart.push(...untaggedEvents.filter((event => belongsToChart.includes(event.type))))),
                            untaggingTags.splice(untaggingTags.indexOf(selectedTag2), 1),
                            console.log(`    (Untagging ${selectedTag2}): Untagging complete.`);
                        // json.delete(`tags/${tag}.json`);
                        if (untaggingTags.length == 0) {
                            if (recursion == 0) {
                                untagAll(++recursion);
                            } else if (recursion == 1) {
                                status = "finished",
                                    endRecursion(recursion);
                            }
                        }
                    }
                }
                function endRecursion(recursion) {
                    // Removing Play Song Event duplicates
                    for (let index = 0; index < constants.level.events.length; index++) {
                        const event = constants.level.events[index];
                        if (event.type != "play") { continue; }
                        playSongEvents.push(event), constants.level.events.splice(index, 1), index--;
                    }
                    playSongEvents.length > 0 && (constants.level.events.push(playSongEvents.sort((a, b) => a.time - b.time)[0]));
                    if (playSongEvents.length == 0) {
                        console.log("No Play Song Event in your level.");
                    } else if (playSongEvents.length > 1) {
                        console.log("Multiple Play Song Events in your level. Automatically fixed.");
                    }
                    // Overwrite old data
                    resultDiv.innerText = JSON.stringify(constants.level), needsChartData && (resultDiv2.innerText = JSON.stringify(constants.chart));
                    switch (status) {
                        case "finished": console.log("Done!"); break;
                        case "unfinished": console.log("Unfinished. Something may have broken."); break;
                    }
                    // Additional Info
                    console.log(`Run Tag Events Untagged: ${runTagEventsUntagged}\nTag Events Untagged: ${untaggedTags.join(", ")}\nRecursion depth: ${recursion}`);
                }
            }
        },
        functions: [{
            name: "selectTag",
            desc: "Select the tag to untag",
            params: [
                { name: "selectTag", desc: "Select the tag to untag", type: "select", values: [], required: true, newRow: true, dontBeautifyValues: true },
                { name: "tagEvents", desc: "The contents of the tag file", type: "json", required: true, newRow: true }
            ],
            function: (selectTag, tagEvents) => {
                if (constants.selectTag) {
                    // Declare Vars and require Level Data
                    const belongsToChart = ["block", "hold", "inverse", "mine", "mineHold", "side", "extraTap"];
                    let tags = [], needsChartData = tagEvents.some((event => belongsToChart.includes(event.type))), tempTagEvents, untaggedEvents = [], runTagEventsUntagged = 0;
                    if (tagEvents == "[]") { console.log(`Nothing in the Tag (Continue to remove all ${selectTag} Tags)`); }
                    // Require Chart Data
                    if (needsChartData && constants.chart === undefined) {
                        resultDiv.innerText = "In this case the constant Chart is required", abort = true; return;
                    }
                    // Warnings
                    tagEvents.some(event => event.type == "play") && (window.alert("Play Song Events in Tags may lead to duplicates when untagging")),
                        tagEvents.some(event => event.type == "showResults") && (window.alert("Show Results Events in Tags may lead to duplicates when untagging")),
                        tagEvents.some(event => event.type == "bookmark") && (window.alert("Bookmark Events don't belong in Tags"));
                    // Untagging
                    for (let index = 0; index < constants.level.events.length; index++) {
                        const event = constants.level.events[index];
                        if (event.type != "tag" || event.tag != selectTag) { continue; }
                        tempTagEvents = JSON.parse(JSON.stringify(tagEvents)); // Unpointer Code
                        for (const i in tempTagEvents) {
                            tempTagEvents[i].time = tagEvents[i].time + event.time;
                            event.angleOffset && (tempTagEvents[i].angle = tagEvents[i].angle + event.angle);
                        }
                        untaggedEvents.push(...tempTagEvents), constants.level.events.splice(index, 1), index--, runTagEventsUntagged++;
                    }
                    // Warning
                    if (untaggedEvents.length == 0) { window.alert(`Nothing to untag (Continue to remove all ${selectTag} Tags)`); }
                    // Log new data
                    constants.level.events.push(...untaggedEvents.filter((event => !belongsToChart.includes(event.type)))),
                        resultDiv.innerText = JSON.stringify(constants.level),
                        needsChartData && (
                            window.alert("The first output is the new level data, the second is the new chart data"),
                            constants.chart.push(...untaggedEvents.filter((event => belongsToChart.includes(event.type)))),
                            resultDiv2.innerText = JSON.stringify(constants.chart)
                        );
                    // Log bonus data
                    constants.level.events.forEach(event => { event.type == "tag" && !tags.includes(event.tag) && (tags.push(event.tag)) }),
                        console.log("Run Tag Events Untagged: " + runTagEventsUntagged + "\nLeftover Tag(s): " + tags.join(", "));
                } else {
                    resultDiv.innerText = "Something went wrong: This function shouldnt have been called", abort = true;
                }
            },
            hidden: true
        }, {
            name: "inputTagEvents",
            desc: "Input the contents of all tag files",
            params: [
            ],
            function: (...params) => {
                if (constants.selectTag) {
                    resultDiv.innerText = "Something went wrong: This function shouldnt have been called", abort = true;
                } else {
                    constants.inputTagEventParams = {}
                    constants.inputTagEvents.params.forEach((param, i) => {
                        constants.inputTagEventParams[param.name] = params[i];
                    });
                }
            },
            hidden: true,
            constOverride: true //TF wjat does this do lol
        }],
        dontUseEvents: true
    }, {
        name: "randomizer",
        desc: "Randomizes existing notes in your chart\nType Blocks and Mines don't support multiple blocks/holds at the same time\nDoes support one block/hold and one mine and/or side at the same time",
        constants: [
            { name: "chart", desc: "The chart file that your variant uses", type: "json", required: true, newRow: true },
            { name: "type", desc: "What type of randomizer to run\nReady: Assumes all notes are aligned so you only have to point your paddle to 90° to hit every note without moving", type: "select", values: ["blocks", "mines", "ready"], required: true, newRow: true },
            { name: "mineBehavior", desc: "How mines should be moved when there's a block/hold on the same beat\nOptional when you don't have any mines or set Type to Mines", type: "select", values: ["opposite", "close", "relative"], required: false },
            { name: "blocksOnHolds", desc: "Useful for holdLeniency\nOptional when you don't have any holds or set Type to Mines\nFor Type set to Ready: Whether all holds should have the same amount of additional 360° rotations", type: "boolean", required: false },
            { name: "minTime", desc: "The time the randomizer starts", type: "number", required: false, newRow: true },
            { name: "maxTime", desc: "The time the randomizer ends", type: "number", required: false },
            { name: "startAngle", desc: "The angle the randomizer starts", type: "number", required: false, newRow: true },
            { name: "snap", desc: "The angle snap", type: "number", required: true },
            { name: "minDist", desc: "The minimum angle between two notes", type: "number", required: false },
            { name: "maxDist", desc: "The maximum angle between two notes", type: "number", required: false },
            { name: "minHoldDir", desc: "The minimum angle the hold travels in one beat\nDefault: 0\nFor Type set to Ready: minimum amout of additional 360° rotations", type: "number", required: false, newRow: true },
            { name: "maxHoldDir", desc: "The maximum angle the hold travels in one beat\nDefault: 0\nFor Type set to Ready: maximum amout of additional 360° rotations", type: "number", required: false },
            { name: "sideDir", desc: "The angle between overlapping notes and sides\nAlso used for close mines... for now\n45 is recommended", type: "number", required: false, newRow: true },
            { name: "closeTime", desc: "How close notes should be to be considered close\nDefault: 0", type: "number", required: false, newRow: true },
            { name: "closeDir", desc: "The angle close notes are moved\nDefault: 0", type: "number", required: false },
            { name: "closeBehavior", desc: "How the angle of close notes should behave to their time difference\nDefault: Relative", type: "select", values: ["absolute", "relative"], required: false },
            { name: "holdReorder", desc: "For Type set to Ready: the hold thats set to the highest order", type: "select", values: ["furthestStart", "closestStart", "furthestEnd", "closestEnd"], required: false, newRow: true },
            { name: "forceDefaultHolds", desc: "For Type set to Ready: forces holds to have default behavior instead of jumping. Min/Max Hold Dir will behave like when Type not set to Ready", type: "boolean", required: false }
        ],
        before: () => {
            constants.minHoldDir === undefined && (constants.minHoldDir = 0),
                constants.maxHoldDir === undefined && (constants.maxHoldDir = 0),
                constants.sideDir === undefined && (constants.sideDir = 0),
                constants.closeTime === undefined && (constants.closeTime = 0),
                constants.closeDir === undefined && (constants.closeDir = 0),
                constants.closeBehavior === undefined && (constants.closeBehavior = "relative"),
                constants.holdBehavior === undefined && (constants.holdBehavior = "ontop");
            if (constants.mineBehavior === undefined && constants.type == "blocks" && constants.chart.filter(event => event.time > time && event.time <= constants.maxTime).some(event => event.tpye == "mine")) {
                resultDiv.innerText = "In this case the constant Mine Behavior is required", abort = true; return;
            }
            // Declare Vars and require Chart Data
            let value = constants.startAngle === undefined ? newAngle(constants.snap) : constants.startAngle,
                lastEvent, time, ovlpEvent, holdDir, angles = [], forcedAngles = [];
            time = constants.minTime !== undefined ? constants.minTime - 0.001 : -(10 ** 10),
                constants.maxTime === undefined && (constants.maxTime = 10 ** 10),
                constants.chart.sort((a, b) => a.time - b.time);
            function mineSideBehavior(event, dir) {
                switch (constants.mineBehavior) {
                    case "opposite": return event.type == "side" ? constants.sideDir * dir : 180;
                    case "close": return constants.sideDir * dir * (event.type == "side" ? 1 : -1);
                }
            };
            while (constants.chart.filter(event => (event.time > time && event.time <= constants.maxTime) || (["hold", "mineHold"].includes(event.type) && event.time + event.duration > time && event.time + event.duration <= constants.maxTime)).length > 0) {
                time = Math.min(...[constants.chart.filter(event => event.time > time)[0]?.time, constants.chart.filter(event => ["hold", "mineHold"].includes(event.type) && event.time + event.duration > time).map(event => event.time + event.duration)[0]].filter(time => time !== undefined));
                console.log(time)
                switch (constants.type) {
                    case "blocks":
                        constants.chart.filter(event => event.time == time && ["block", "inverse", "hold"].includes(event.type)).forEach(event => {
                            if (lastEvent) {
                                const prevEvent = constants.chart.filter(event2 => ["block", "inverse", "hold"].includes(event2.type) && event2.time < event.time && event2.time >= event.time - constants.closeTime).sort((a, b) => a.time - b.time).reverse()[0],
                                    preverEvent = prevEvent ? constants.chart.filter(event2 => ["block", "inverse", "hold"].includes(event2.type) && event2.time < prevEvent.time && event2.time >= prevEvent.time - constants.closeTime).sort((a, b) => a.time - b.time).reverse()[0] : undefined;
                                ovlpEvent = constants.chart.filter(event2 => event2.type == "hold" && event2 != event && event2.time <= event.time && event2.time + event2.duration >= event.time)[0]; // No way I'm accounting for multiple overlapping holds
                                switch (true) {
                                    case ovlpEvent && ovlpEvent.time + ovlpEvent.duration == event.time: // Place block on top of hold end
                                        value = ovlpEvent.angle2; break;
                                    case prevEvent: // Blocks too close
                                        value = lastAngle + closeDir * (preverEvent ? lastDir : randomValue(-0.5, 2) * 2) * (constants.closeBehavior == "relative" ? (event.time - prevEvent.time) / constants.closeTime : 1); break;
                                    default:
                                        value = normalizeAngle(newAngle(constants.snap, constants.minDist, constants.maxDist)); break;
                                }
                                lastDir = ((compareAnglesLR(lastAngle, value) == "left") - 0.5) * 2,
                                    lastAngle = value,
                                    event.type == "hold" && (
                                        holdDir = (randomValue(0, 2) - 0.5) * 2,
                                        event.angle2 = event.angle + randomAngle(constants.snap, constants.minHoldDir * event.duration, constants.maxHoldDir * event.duration) * event.duration * holdDir,
                                        lastAngle = event.angle2,
                                        ovlpEvent && (lastDir = holdDir)
                                    );
                            } else {
                                lastAngle = value;
                            }
                            event.angle = value,
                                lastEvent = event;
                        }),
                            constants.chart.filter(event => event.time == time && ["mine", "side"].includes(event.type)).forEach(event => {
                                switch (true) {
                                    case ovlpEvent = constants.chart.filter(event => event.time == time && ["block", "inverse", "hold"].includes(event.type))[0]: // Overlapping block or hold start
                                        event.angle = ovlpEvent.angle + mineSideBehavior(event.type, lastDir); break;
                                    case ovlpEvent = constants.chart.filter(event2 => event2.type == "hold" && event2.time + event2.duration == event.time)[0]: // Overlapping hold end
                                        event.angle = ovlpEvent.angle2 + mineSideBehavior(event.type, holdDir); break;
                                    case constants.blocksOnHolds && (ovlpEvent = constants.chart.filter(event2 => event2.type == "hold" && event2.time <= event.time && event2.time + event2.duration >= event.time)[0]): // Overlapping hold middle - close mines dont make sense here
                                        event.angle = ovlpEvent.angle + (ovlpEvent.angle2 - ovlpEvent.angle) / ovlpEvent.duration * (event.time - ovlpEvent.time) + (event.type == "side" ? constants.sideDir * holdDir : 180); break;
                                    default: // No block or hold to base placement off of
                                        console.log("DAMMIT MINE", event.time), event.angle = newAngle(constants.snap); break;
                                }
                            }); break;
                    case "mines":
                        constants.chart.filter(event => event.time == time && ["mine", "mineHold"].includes(event.type)).forEach(event => {
                            if (lastEvent) {
                                ovlpEvent = constants.chart.filter(event2 => event2.type == "mineHold" && event2 != event && event2.time <= event.time && event2.time + event2.duration >= event.time)[0], // No way I'm accounting for multiple overlapping holds
                                    value = (ovlpEvent && ovlpEvent.time + ovlpEvent.duration == event.time ? (ovlpEvent.angle2) : normalizeAngle(newAngle(constants.snap, constants.minDist, constants.maxDist))), // !blocksOnHolds makes no sense here
                                    lastAngle = value,
                                    event.type == "mineHold" && (
                                        holdDir = (randomValue(0, 2) - 0.5) * 2,
                                        event.angle2 = event.angle + randomAngle(constants.snap, constants.minHoldDir * event.duration, constants.maxHoldDir * event.duration) * event.duration * holdDir,
                                        lastAngle = event.angle2
                                    );
                            } else {
                                lastAngle = value;
                            }
                            event.angle = value,
                                lastEvent = event;
                        }); break;
                    case "ready":
                        const prevEvent = angles.length == 1 && (angles[angles.length - 1].time >= time - constants.closeTime && angles[angles.length - 1]),
                            preverEvent = prevEvent && angles.length == 2 ? angles[angles.length - 2].time >= prevEvent.time - constants.closeTime && angles[angles.length - 2] : undefined,
                            additionalRotations = randomValue(constants.minHoldDir, constants.maxHoldDir - constants.minHoldDir) * randomValue(-0.5, 2) * 2 * 360;
                        constants.chart.filter(event => event.type != "extraTap" && (event.time == time || (["hold", "mineHold"].includes(event.type) && event.time + event.duration == time))).forEach(event => {
                            if (lastEvent) {
                                switch (true) { // Holds ignored, im not insane enough to code that
                                    case prevEvent: // Blocks too close
                                        value = lastAngle + closeDir * (preverEvent ? lastDir : randomValue(-0.5, 2) * 2) * (constants.closeBehavior == "relative" ? (event.time - prevEvent.time) / constants.closeTime : 1); break;
                                    default:
                                        if (angles.length >= 1 && angles[angles.length - 1].time == time) {
                                            value = angles[angles.length - 1].angle;
                                        } else {
                                            value = forcedAngles.reduce((prev, angle) => prev || angle.time == time, false) ? forcedAngles.reduce((prev, angle) => prev || (angle.time == time && angle), false).angle : normalizeAngle(newAngle(constants.snap, constants.minDist, constants.maxDist)),
                                                angles.push({ time: time, angle: value });
                                        } break;
                                }
                            } else {
                                lastAngle = value,
                                    angles.push({ time: time, angle: value });
                            }
                            if (event.time == time) {
                                event.angle = normalizeAngle(event.angle - 90 + value);
                                if (constants.forceDefaultHolds && ["hold", "mineHold"].includes(event.type)) {
                                    !forcedAngles.reduce((prev, angle) => prev || angle.time == time, false) && (forcedAngles.push({ time: time + event.duration, angle: value + randomAngle(constants.snap, constants.minHoldDir * event.duration, constants.maxHoldDir * event.duration) * event.duration * (randomValue(0, 2) - 0.5) * 2 }));
                                }
                            } else {
                                event.angle2 = normalizeAngle(event.angle2 - 90 + value - event.angle),
                                    event.angle2 = event.angle + event.angle2 - (event.angle2 > 180 ? 360 : 0),
                                    event.angle2 += constants.blocksOnHolds ? additionalRotations : randomValue(constants.minHoldDir, constants.maxHoldDir - constants.minHoldDir) * randomValue(-0.5, 2) * 2 * 360;
                            }
                            lastEvent = event;
                        }),
                            lastDir = ((compareAnglesLR(lastAngle, value) == "left") - 0.5) * 2,
                            lastAngle = value; break;
                }
            }
            if (constants.type == "ready" && constants.holdReorder) {
                let order, order2;
                angles.forEach(angle => {
                    order = constants.chart.filter(event => event.time + (["furthestStart", "closestStart"].includes(constants.holdReorder) ? 0 : event.duration) == angle.time && ["hold", "mineHold"].includes(event.type)).sort((a, b) => normalizeAngle(180 + (["furthestStart", "closestStart"].includes(constants.holdReorder) ? a.angle : a.angle2) - angle.angle) - normalizeAngle(180 + (["furthestStart", "closestStart"].includes(constants.holdReorder) ? b.angle : b.angle2) - angle.angle));
                    console.log(order.map(event => (["furthestStart", "closestStart"].includes(constants.holdReorder) ? event.angle : event.angle2) + " " + normalizeAngle(180 + (["furthestStart", "closestStart"].includes(constants.holdReorder) ? event.angle : event.angle2) - angle.angle)).join("\n") + "\n" + angle.angle, angle.time),
                        constants.chart.filter(event => ["hold", "mineHold"].includes(event.type) && event.time + (["furthestStart", "closestStart"].includes(constants.holdReorder) ? 0 : event.duration) == angle.time).forEach(event => {
                            order2 = order,
                                event.angle2 > event.angle && (order2.reverse()),
                                ["closestStart", "closestEnd"].includes(constants.holdReorder) && (order2.reverse()),
                                event.order = order2.indexOf(event);
                            console.log(event.order, event.angle2 > event.angle, event.angle2, event.angle)
                        });
                })
            }
            events = constants.chart
        },
        after: () => { },
        functions: []
    }, {
        name: "decoChecker",
        desc: "Returns the amount of unhidden decos in your level",
        constants: [
            { name: "level", desc: "The level file that your variant uses", type: "json", required: true, newRow: true }
        ],
        before: () => {
            const decos = [], decoEvents = (constants.level.events !== undefined ? constants.level.events : constants.level).sort((a, b) => a.time - b.time).filter(event => event.type == "deco");
            let time = -(10 ** 10);
            function getDecoIndex(id) { return decos.indexOf(decos.filter(event => event.id == id)[0]); }
            while (decoEvents.some(event => event.time > time)) {
                time = decoEvents.filter(event => event.time > time)[0].time;
                const decoNow = decoEvents.filter(event => event.time == time).sort((a, b) => a.order - b.order);
                decoNow.forEach(event => {
                    getDecoIndex(event.id) == -1 && (decos.push({ id: event.id, hide: false, sx: 1, sy: 1 }));
                    const deco = decos[getDecoIndex(event.id)];
                    deco.lastUpdate = event.time,
                        event.hide !== undefined && (deco.hide = event.hide),
                        event.sx !== undefined && (deco.sx = event.sx),
                        event.sy !== undefined && (deco.sy = event.sy),
                        decoNow.filter(deco2 => event !== deco2 && event.id == deco2.id && event.hide === true && deco2.hide === false && !(event.order < deco2.order)).forEach(deco2 => { console.log(event.time, event.order, deco2.order) });
                });
            }
            resultDiv.innerText = "Visible decos:\n" + decos.filter(deco => !deco.hide && deco.sx != 0 && deco.sy != 0).map(deco => ["id:", deco.id, "sx:", deco.sx, "sy:", deco.sy, "lastUpdate:", deco.lastUpdate].join(" ")).join("\n"),
                resultDiv2.innerText = "Unhidden scale 0 decos:\n" + decos.filter(deco => !deco.hide && !(deco.sx != 0 && deco.sy != 0)).map(deco => ["id:", deco.id, "sx:", deco.sx, "sy:", deco.sy, "lastUpdate:", deco.lastUpdate].join(" ")).join("\n"),
                console.log("Amount of unhidden decos:", decos.filter(deco => !deco.hide).length, "/", decos.length);
        },
        after: () => { },
        functions: [],
        dontUseEvents: true
    }, {
        name: "circleStreamGenerator",
        desc: "Generates a path using circles to follow with your mouse\nFirst output will be the eases at the start of the part. You should smoothly transition into them. Untag the first output to be able to edit it the the editor\nSecond output is the tag data for the part",
        constants: [
            { name: "bpm", desc: "", type: "number", required: true, newRow: true, dontBeautifyName: true },
            { name: "length", desc: "How many beats the part should last", type: "number", required: true },
            { name: "lineLength", desc: "How many beats a line segment stays for", type: "number", required: true, newRow: true },
            { name: "spawnOffset", desc: "Parameter for the fake blocks", type: "number", required: true },
            { name: "speed", desc: "Parameter for the fake blocks", type: "number", required: false },
            { name: "scrollSpeed", desc: "Parameter for the fake blocks", type: "number", required: false },
            { name: "entryType", desc: "Determines the axis for the entry animation\nLeave empty to scale in both axis", type: "select", values: ["sx", "sy"], required: false, newRow: true },
            { name: "entryEase", desc: "Easing for entry animation of the fake block", type: "ease", required: false },
            { name: "entryTime", desc: "How long the entry animation of the fake block takes", type: "number", required: false },
            { name: "defaultPaddleSize", desc: "How large the paddle should be under default conditions\nWill change relative to the circle radius", type: "number", required: false, newRow: true },
            { name: "turnSpeed", desc: "How fast you should turn under default conditions\nWill change relative to the circle radius", type: "number", required: true },
            { name: "turnLeeway", desc: "The time inbetween blocks to turn 180° to the next circle\nThe other time will be used to ease p.drawScale\nValues: 0-1", type: "number", required: true },
            { name: "startRadius", desc: "Default: 51", type: "number", required: false, newRow: true },
            { name: "minRadius", desc: "Smallest random radius", type: "number", required: true },
            { name: "maxRadius", desc: "Largest random radius", type: "number", required: true },
            { name: "startX", desc: "Default: 300", type: "number", required: false, newRow: true },
            { name: "startY", desc: "Default: 180", type: "number", required: false },
            { name: "forceDist", desc: "The distance from the center of the screen when the script forces generation toward the center", type: "number", required: true },
            { name: "blocksPerBeat", desc: "", type: "number", required: true, newRow: true },
            { name: "lineSegmentsPerBlock", desc: "Will affect the quality of your circle at the cost of more events\nKeep as low while maintaining smooth circles\nWorks best without decimals", type: "number", required: false },
        ],
        before: () => {
            constants.startEvents = [], lastDir = randomValue(-0.5, 2) * 2, lastAngle = 0;
            let angleDiffDefault = (42 + 9) * constants.turnSpeed, paddleSizeDefault = (42 + 9) * (constants.defaultPaddleSize || 70),
                radius = constants.startRadius || 50,
                blockTimeDiff = 1 / constants.blocksPerBeat, calculationSegments = (constants.lineSegmentsPerBlock || 1), lineSegmentTimeDiff = blockTimeDiff / (constants.lineSegmentsPerBlock || 1),
                x = constants.startX - 300, y = constants.startY - 180, angleDiff = angleDiffDefault / radius, lastX = -angleDiffDefault / radius * blockTimeDiff * lastDir + x, lastY = -radius + y, circles = [], lines = [];
            constants.startEvents.push(
                { time: 0, angle: 0, type: "deco", id: "amogs", sprite: "pixel.png", ox: 0.5, oy: 0.5, sx: 4, sy: 4, x: 300 + x, y: 180 + y, drawOrder: -999 },
                { time: 0, angle: 0, type: "ease", var: "p.x", value: constants.startX },
                { time: 0, angle: 0, type: "ease", var: "p.y", value: constants.startY },
                { time: 0, angle: 0, type: "ease", var: "p.paddleDistance", value: radius - 10 - 9 },
                { time: 0, angle: 0, type: "paddles", paddle: 2, newWidth: paddleSizeDefault / radius },
                { time: 0, angle: 0, type: "ease", var: "p.bodyRadius", value: 0 },
                { time: 0, angle: 0, type: "paddles", paddle: 1, enabled: false },
                { time: 0, angle: 0, type: "paddles", paddle: 2, enabled: true },
                { time: 0, angle: 0, type: "ease", var: "scrollSpeed", value: 1000000 },
                { time: 0, angle: 0, type: "ease", var: "p.lookYOffset", value: 1000000 },
                { time: 0, angle: 0, type: "ease", var: "p.bobI", value: 0, "duration": length }
            ),
                circles.push({ x: x, y: y, r: radius, start: 0, startAngle: lastAngle, dir: lastDir });
            let goal = lastAngle + randomValue(0, 360) * lastDir;
            for (let i = 0, j = 0, lastBlock = 0, prevBlock = 0; i < constants.length; i += blockTimeDiff / calculationSegments, j = (j + 1) % calculationSegments) {
                j == 0 && (events.push({
                    time: i, angle: lastAngle, type: "block"
                }), lastBlock = i),
                    lastAngle += angleDiff * lastDir * blockTimeDiff / calculationSegments,
                    lastBlock != prevBlock && (normalizeAngle(lastAngle - goal) < angleDiff * blockTimeDiff / calculationSegments || normalizeAngle(lastAngle - goal) > 360 - angleDiff * blockTimeDiff / calculationSegments) && (
                        prevBlock = lastBlock,
                        circles[circles.length - 1].end = i, circles[circles.length - 1].endAngle = lastAngle,
                        x += sin(180 - lastAngle) * radius, y += cos(180 - lastAngle) * radius,
                        radius = randomValue(constants.minRadius, constants.maxRadius - constants.minRadius + 1),
                        x += sin(180 - lastAngle) * radius, y += cos(180 - lastAngle) * radius,
                        lastAngle += 180, lastDir *= -1,
                        goal = getDist(x, y) > constants.forceDist ? -90 + getAngle(x, y) : lastAngle + randomValue(angleDiffDefault / radius * blockTimeDiff * 2, 360 - angleDiffDefault / radius * blockTimeDiff * 4) * lastDir,
                        events.push(
                            { time: lastBlock + (0.5 - constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "ease", var: "p.x", value: 300 + x },
                            { time: lastBlock + (0.5 - constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "ease", var: "p.y", value: 180 + y },
                            { time: lastBlock + (0.5 - constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "ease", var: "p.paddleDistance", value: radius - 10.5 - 9 },
                            { time: lastBlock + (0.5 - constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "paddles", paddle: 2, newWidth: 720 },
                            { time: lastBlock + (0.5 + constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "paddles", paddle: 2, newWidth: paddleSizeDefault / radius },
                            { time: lastBlock, angle: 0, type: "ease", var: "p.drawScale", value: 0, duration: (0.5 - constants.turnLeeway / 2) * blockTimeDiff, ease: "inQuad" },
                            { time: lastBlock + (0.5 + constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "ease", var: "p.drawScale", value: 1, duration: (0.5 - constants.turnLeeway / 2) * blockTimeDiff, ease: "outQuad" },
                            { time: lastBlock + (0.5 + constants.turnLeeway / 2) * blockTimeDiff, angle: 0, type: "deco", id: "amogs", x: 300 + x, y: 180 + y }
                        ),
                        angleDiff = angleDiffDefault / radius, circles.push({ x: x, y: y, r: radius, start: i + blockTimeDiff / calculationSegments, startAngle: lastAngle, dir: lastDir })
                    ),
                    i + blockTimeDiff / calculationSegments >= constants.length && (circles[circles.length - 1].end = i, circles[circles.length - 1].endAngle = lastAngle)
            }
            circles.forEach((circle, i) => {
                lastAngle = circle.startAngle;
                for (let i = circle.start; i <= circle.end;) {
                    const dist = getDist(lastX - (circle.x + cos(-90 + lastAngle) * circle.r), lastY - (circle.y + sin(-90 + lastAngle) * circle.r)),
                        x2 = 300 + circle.x + cos(-90 + lastAngle) * circle.r, y2 = 180 + circle.y + sin(-90 + lastAngle) * circle.r,
                        r2 = -90 + getAngle(lastX - (circle.x + cos(-90 + lastAngle) * circle.r), lastY - (circle.y + sin(-90 + lastAngle) * circle.r));
                    let index = lines.indexOf(lines.filter(time => time < i - constants.lineLength)[0]);
                    (index === -1 ? (index = lines.length, lines.push(i)) : lines[index] = i),
                        events.push({
                            time: i - constants.lineLength + (i == circle.start && blockTimeDiff / calculationSegments < lineSegmentTimeDiff ? lineSegmentTimeDiff - blockTimeDiff : 0), angle: 0, type: "deco", order: 0, id: "amogus_" + index, sprite: "pixel.png", recolor: 1, drawOrder: 1,
                            x: x2 + cos(90 + r2) * dist, y: y2 + sin(90 + r2) * dist,
                            ox: 0.5, sy: 0, r: r2
                        }, {
                            time: i - constants.lineLength + (i == circle.start && blockTimeDiff / calculationSegments < lineSegmentTimeDiff ? lineSegmentTimeDiff - blockTimeDiff : 0), angle: 0, type: "deco", order: 1, id: "amogus_" + index,
                            x: x2, y: y2,
                            sy: dist, duration: i == circle.start && blockTimeDiff / calculationSegments < lineSegmentTimeDiff ? blockTimeDiff : lineSegmentTimeDiff
                        }, {
                            time: i - (i == circle.start && blockTimeDiff / calculationSegments < lineSegmentTimeDiff ? blockTimeDiff : lineSegmentTimeDiff), angle: 0, type: "deco", id: "amogus_" + index,
                            sy: 0, duration: i == circle.start && blockTimeDiff / calculationSegments < lineSegmentTimeDiff ? blockTimeDiff : lineSegmentTimeDiff
                        }),
                        lastX = circle.x + cos(-90 + lastAngle) * circle.r, lastY = circle.y + sin(-90 + lastAngle) * circle.r,
                        i += lineSegmentTimeDiff;
                    if (i > circle.end && i - lineSegmentTimeDiff != circle.end) {
                        console.log(i)
                        const dist = getDist(lastX - (circle.x + cos(-90 + circle.endAngle) * circle.r), lastY - (circle.y + sin(-90 + circle.endAngle) * circle.r)),
                            x2 = 300 + circle.x + cos(-90 + circle.endAngle) * circle.r, y2 = 180 + circle.y + sin(-90 + circle.endAngle) * circle.r,
                            r2 = -90 + getAngle(lastX - (circle.x + cos(-90 + circle.endAngle) * circle.r), lastY - (circle.y + sin(-90 + circle.endAngle) * circle.r));
                        index = lines.indexOf(lines.filter(time => time < i - constants.lineLength)[0]);
                        (index === -1 ? (index = lines.length, lines.push(i)) : lines[index] = i),
                            events.push({
                                time: i - constants.lineLength, angle: 0, type: "deco", order: 0, id: "amogus_" + index, sprite: "pixel.png", recolor: 1, drawOrder: 1,
                                x: x2 + cos(90 + r2) * dist, y: y2 + sin(90 + r2) * dist,
                                ox: 0.5, sy: 0, r: r2
                            }, {
                                time: i - constants.lineLength, angle: 0, type: "deco", order: 1, id: "amogus_" + index,
                                x: x2, y: y2,
                                sy: dist, duration: Math.abs(circle.endAngle - lastAngle) / (angleDiffDefault / circle.r)
                            }, {
                                time: circle.end - (circle.end - i + lineSegmentTimeDiff), angle: 0, type: "deco", id: "amogus_" + index,
                                sy: 0, duration: circle.end - i + lineSegmentTimeDiff
                            }),
                            lastX = circle.x + cos(-90 + circle.endAngle) * circle.r, lastY = circle.y + sin(-90 + circle.endAngle) * circle.r,
                            i += lineSegmentTimeDiff;
                    } else {
                        lastAngle += angleDiffDefault / circle.r * circle.dir * lineSegmentTimeDiff;
                    }
                }
                events.push({
                    time: circle.start - constants.spawnOffset, angle: 0, type: "deco",
                    id: "amox_" + i, sx: 0, x: 300 + circle.x, y: 180 + circle.y,
                }), runFunction("fakeBlockGenerator", "fakeBlockPart", events, circle.start, (i == circles.length - 1 ? 800 : circle.end), "amox_" + i, constants.speed, constants.scrollSpeed, constants.spawnOffset, undefined, 0, true, circle.r, constants.appearType, constants.entryEase, constants.entryTime);
            }),
                resultDiv.innerText = JSON.stringify(constants.startEvents),
                resultDiv2.innerText = JSON.stringify(events);
        },
        after: () => { },
        functions: [],
        dontUseEvents: true
    }, {
        name: "particleGenerator",
        desc: "Outputs tag data",
        constants: [],
        before: () => { },
        after: () => { },
        functions: [{
            name: "particleEmitter",
            desc: "Emits particles",
            params: [
                { name: "emitterStart", desc: "", type: "number", required: false, newRow: true },
                { name: "emitterEnd", desc: "", type: "number", required: true },
                { name: "particlesPerBeat", desc: "", type: "number", required: true },
                { name: "particleDuration1", desc: "The range of how long particles stay", type: "number", required: true, newRow: true },
                { name: "particleDuration2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "spawnShape", desc: "What shape the particles will generate in\nAll options other than Point will require four parameters\nPoint: Requires X1 and X2\n-Points: Creates a shape between (X1 | Y1) and (X2 | Y2)\n-Size: Creates a shape with middle (X1 | Y1) and width X2 / height Y2\nLine Dir: Creates a line from (X1 | Y1) in the direction X2 with length Y2", type: "select", values: ["point", "linePoints", "lineDir", "rectanglePoints", "rectangleSize", "circlePoints", "circleSize"], required: true, newRow: true },
                { name: "x1", desc: "", type: "number", required: true },
                { name: "y1", desc: "", type: "number", required: true },
                { name: "x2", desc: "", type: "number", required: false },
                { name: "y2", desc: "", type: "number", required: false },
                { name: "spriteRotationBehavior", desc: "Static: All particles use Rotation1\nRandom: Particles are between Rotation1 and 2\nFollow: DOESNT WORK WITH GRAVITY! Particles rotate in the direction they're moving. Doesnt require parameters", type: "select", values: ["static", "random", "follow"], required: false, newRow: true },
                { name: "rotation1", desc: "", type: "number", required: false },
                { name: "rotation2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "spin1", desc: "Particle rotation per beat", type: "number", required: false },
                { name: "spin2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "movementAngle1", desc: "Direction of particle movement", type: "number", required: false, newRow: true },
                { name: "movementAngle2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "velocity1", desc: "Particle speed", type: "number", required: false },
                { name: "velocity2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "movementEase", desc: "Ease option to fake ac/deceleration", type: "ease", required: false },
                { name: "accelerationAngle", desc: "Direction of acceleration", type: "number", required: false, newRow: true },
                { name: "accelerationFactor", desc: "Strength of acceleration", type: "number", required: false },
                { name: "scaleBehavior", desc: "Whether smaller particles will stay smaller (Relative) or can grow to be bigger (Random)\nNoticable with different start- and endscale ranges", type: "select", values: ["random", "relative"], required: true, newRow: true },
                { name: "scaleStart1", desc: "", type: "number", required: true },
                { name: "scaleStart2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "scaleEnd1", desc: "", type: "number", required: false },
                { name: "scaleEnd2", desc: "Leave empty for the same value\nThis one should have a larger value", type: "number", required: false },
                { name: "entryAxis", desc: "Determines the axis for the entry animation\nLeave empty to scale in both axis", type: "select", values: ["sx", "sy"], required: false, newRow: true },
                { name: "entryEase", desc: "Ease of the entry animation", type: "ease", required: false },
                { name: "entryDuration", desc: "Duration of the entry animation", type: "number", required: false },
                { name: "exitAxis", desc: "Determines the axis for the exit animation\nLeave empty to scale in both axis", type: "select", values: ["sx", "sy"], required: false },
                { name: "exitEase", desc: "Ease of the exit animation", type: "ease", required: false },
                { name: "exitDuration", desc: "Duration of the exit animation", type: "number", required: false },
                { name: "sprite", desc: "", type: "string", required: false, newRow: true },
                { name: "ox", desc: "", type: "number", required: false },
                { name: "oy", desc: "", type: "number", required: false },
                { name: "colors", desc: "Chooses randomly between the list to recolor sprite\nSeparate with ','\nExamples: '0,1,2,3', '-1', '0,0,0,1'", type: "string", required: false },
                { name: "parent", desc: "", type: "string", required: false, newRow: true }
            ],
            function: (emitterStart, emitterEnd, particlesPerBeat, particleDuration1, particleDuration2, spawnShape, x1, y1, x2, y2, spriteRotationBehavior, rotation1, rotation2, spin1, spin2, movementAngle1, movementAngle2, velocity1, velocity2, movementEase, accelerationAngle, accelerationFactor, scaleBehavior, scaleStart1, scaleStart2, scaleEnd1, scaleEnd2, entryAxis, entryEase, entryDuration, exitAxis, exitEase, exitDuration, sprite, ox, oy, colors, parent) => {
                emitterStart === undefined && (emitterStart = 0),
                    particleDuration2 === undefined && (particleDuration2 = particleDuration1),
                    spriteRotationBehavior === undefined && (spriteRotationBehavior = "random"),
                    rotation1 === undefined && (rotation1 = 0),
                    rotation2 === undefined && (rotation2 = rotation1),
                    spin1 === undefined && (spin1 = 0),
                    spin2 === undefined && (spin2 = spin1),
                    movementAngle1 === undefined && (movementAngle1 = 0),
                    movementAngle2 === undefined && (movementAngle2 = movementAngle1),
                    velocity1 === undefined && (velocity1 = 0),
                    velocity2 === undefined && (velocity2 = velocity1),
                    accelerationAngle === undefined && (accelerationAngle = 180),
                    scaleStart2 === undefined && (scaleStart2 = scaleStart1),
                    scaleEnd1 === undefined && (scaleEnd1 = scaleStart1),
                    scaleEnd2 === undefined && (scaleEnd2 = scaleEnd1),
                    entryDuration === undefined && (entryDuration = 0),
                    exitDuration === undefined && (exitDuration = 0),
                    colors = (colors === undefined ? [] : colors.split(",").map(number => Number(number.trim())).filter(number => !isNaN(number) && typeof number == "number")), colors.length == 0 && (colors = [-1]);
                let duration, x, y, spin, dir, v, r, sStart, sEnd, color, random;
                for (i = emitterStart; i <= emitterEnd; i += 1 / particlesPerBeat) {
                    // duration, dir, v, s, color
                    duration = randomValue(particleDuration1, particleDuration2 - particleDuration1),
                        spin = randomValue(spin1, spin2 - spin1),
                        dir = randomValue(movementAngle1, movementAngle2 - movementAngle1),
                        v = randomValue(velocity1, velocity2 - velocity1),
                        sStart = randomValue(scaleStart1, scaleStart2 - scaleStart1),
                        color = randomFromArray(colors),
                        random = Math.random();
                    // startIndex
                    const start = i, end = i + (accelerationFactor ? particleDuration2 : duration);
                    let freeIndex = particles.indexOf(particles.filter(fake => fake.every(active => end < active.start || active.end < start))[0]), startOrder, endOrder;
                    freeIndex == -1 && (freeIndex = particles.length, particles.push([])),
                        startOrder = 0, endOrder = 0,
                        particles[freeIndex].push({ start: start, end: end, startOrder: startOrder, endOrder: endOrder });
                    switch (spawnShape) { // x, y
                        case "point": x = x1, y = y1; break;
                        case "linePoints":
                            if (x2 === undefined || y2 === undefined) { resultDiv.innerText = "Empty X2/Y2 parameters", abort = true; return; }
                            const angle = getAngle(x2 - x1, y2 - y1), dist = getDist(x2 - x1, y2 - y1);
                            x = x1 + cos(angle) * dist * random, y = y1 + sin(angle) * dist * random;
                            break;
                        case "lineDir":
                            if (x2 === undefined || y2 === undefined) { resultDiv.innerText = "Empty X2/Y2 parameters", abort = true; return; }
                            x = x1 + cos(-90 + x2) * y2 * random, y = y1 + sin(-90 + x2) * y2 * random; break;
                        case "rectanglePoints":
                            if (x2 === undefined || y2 === undefined) { resultDiv.innerText = "Empty X2/Y2 parameters", abort = true; return; }
                            x = x1 + (x2 - x1) * Math.random(), y = y1 + (y2 - y1) * Math.random(); break;
                        case "rectangleSize":
                            if (x2 === undefined || y2 === undefined) { resultDiv.innerText = "Empty X2/Y2 parameters", abort = true; return; }
                            x = x1 - x2 / 2 + x2 * Math.random(), y = y1 - y2 / 2 + y2 * Math.random(); break;
                        case "circlePoints":
                            if (x2 === undefined || y2 === undefined) { resultDiv.innerText = "Empty X2/Y2 parameters", abort = true; return; }
                            do { x = x1 + (x2 - x1) * Math.random(), y = y1 + (y2 - y1) * Math.random(); } while (getDist((x - average(x1, x2)) / (x2 - x1), (y - average(y1, y2)) / (y2 - y1)) > 0.5); break;
                        case "circleSize":
                            if (x2 === undefined || y2 === undefined) { resultDiv.innerText = "Empty X2/Y2 parameters", abort = true; return; }
                            do { x = x1 - x2 / 2 + x2 * Math.random(), y = y1 - y2 / 2 + y2 * Math.random(); } while (getDist((x - x1) / x2, (y - y1) / y2) > 0.5); break;
                        default: abort = true; return;
                    }
                    switch (spriteRotationBehavior) { // r
                        case "static": r = rotation1; break;
                        case "random": r = randomValue(rotation1, rotation2 - rotation1); break;
                        case "follow": r = dir; break; // NOT YET
                    }
                    switch (scaleBehavior) { // s
                        case "random": sEnd = randomValue(scaleEnd1, scaleEnd2 - scaleEnd1); break;
                        case "relative": sEnd = (sStart - scaleStart1) / (scaleStart2 - scaleStart1) * (scaleEnd2 - scaleEnd1) + scaleEnd1; break;
                        default: break;
                    }
                    events.push({
                        time: i, angle: 0, type: "deco", order: 0, hide: true,
                        id: particlePrefix + "_" + freeIndex + "_normal", parentid: parent,
                        x: x, y: y, r: 0
                    }, {
                        time: i, angle: 0, type: "deco", order: 1,
                        id: particlePrefix + "_" + freeIndex + "_normal",
                        x: x + cos(-90 + dir) * v * duration, y: y + sin(-90 + dir) * v * duration,
                        duration: duration, ease: movementEase
                    }, {
                        time: i, angle: 0, type: "deco", order: 2, hide: false,
                        id: particlePrefix + "_" + freeIndex + "_sprite", parentid: particlePrefix + "_" + freeIndex + (accelerationFactor ? "_gravity" : "_normal"),
                        sprite: sprite, recolor: color, ox: ox, oy: oy,
                        x: 0, y: 0, r: r, sx: (entryDuration && entryAxis != "sy" ? 0 : sStart), sy: (entryDuration && entryAxis != "sx" ? 0 : sStart)
                    }, {
                        time: i, angle: 0, type: "deco", order: 3,
                        id: particlePrefix + "_" + freeIndex + "_sprite",
                        r: r + spin * duration, sx: (entryDuration || exitDuration) ? undefined : sEnd, sy: (entryDuration || exitDuration) ? undefined : sEnd,
                        duration: duration
                    }, {
                        time: i + duration, angle: 0, type: "deco",
                        id: particlePrefix + "_" + freeIndex + "_sprite",
                        hide: true
                    }),
                        (entryDuration || exitDuration) && (
                            events.push({
                                time: i + entryDuration, angle: 0, type: "deco",
                                id: particlePrefix + "_" + freeIndex + "_sprite",
                                sx: sEnd, sy: sEnd,
                                duration: duration - entryDuration - exitDuration
                            })
                        ),
                        entryDuration && (
                            events.push({
                                time: i, angle: 0, type: "deco", order: 3,
                                id: particlePrefix + "_" + freeIndex + "_sprite",
                                sx: sStart, sy: sStart,
                                duration: entryDuration, ease: entryEase
                            })
                        ),
                        exitDuration && (
                            events.push({
                                time: i + duration - exitDuration, angle: 0, type: "deco",
                                id: particlePrefix + "_" + freeIndex + "_sprite",
                                sx: exitAxis != "sy" ? 0 : sEnd, sy: exitAxis != "sx" ? 0 : sEnd,
                                duration: exitDuration, ease: exitEase
                            })
                        ),
                        accelerationFactor && (
                            events.push({
                                time: i, angle: 0, type: "deco", order: 1, hide: false,
                                id: particlePrefix + "_" + freeIndex + "_gravity", parentid: particlePrefix + "_" + freeIndex + "_normal",
                                x: 0, y: 0, sx: 0, r: 0
                            }, {
                                time: i, angle: 0, type: "deco", order: 2,
                                id: particlePrefix + "_" + freeIndex + "_gravity",
                                x: cos(-90 + accelerationAngle) * accelerationFactor * (particleDuration2 ** 2), y: sin(-90 + accelerationAngle) * accelerationFactor * (particleDuration2 ** 2),
                                duration: particleDuration2, ease: "inQuad"
                            }, {
                                time: i + particleDuration2, angle: 0, type: "deco",
                                id: particlePrefix + "_" + freeIndex + "_gravity",
                                hide: true
                            })
                        );
                }
            }
        }]
    }, {
        name: "fakeBlockGenerator",
        desc: "Outputs tag data",
        constants: [],
        before: () => { },
        after: () => { },
        functions: [{
            name: "fakeBlockPart",
            desc: "Fakes notes within the specified time\nOnly fakes Blocks and Sides for now\nNever expect future updates to include hold fakes support",
            params: [
                { name: "chart", desc: "", type: "json", required: true, newRow: true },
                { name: "start", desc: "", type: "number", required: false, newRow: true },
                { name: "end", desc: "", type: "number", required: true },
                { name: "parent", desc: "", type: "string", required: false, newRow: true },
                { name: "speed", desc: "", type: "number", required: false, newRow: true },
                { name: "scrollSpeed", desc: "", type: "number", required: false },
                { name: "spawnOffset", desc: "", type: "number", required: false },
                { name: "randomDirections", desc: "Whether the notes will come from random directions", type: "boolean", required: false, newRow: true },
                { name: "fakes", desc: "How many fakes per note will appear\nWorks great with Random Directions", type: "number", required: false, newRow: true },
                { name: "onlyInPart", desc: "True: Only the notes within the time will get fully faked\nFalse: Notes will only get faked within the part and will spontaniously appear/dissappear at the start/end", type: "boolean", required: false, newRow: true },
                { name: "radius", desc: "The distance to the player when the blocks hit\nDefault: 51", type: "number", required: false, newRow: true },
                { name: "appearType", desc: "Determines the axis for the entry animation\nLeave empty to scale in both axis", type: "select", values: ["sx", "sy"], required: false, newRow: true },
                { name: "appearEase", desc: "Ease of the entry animation", type: "ease", required: false },
                { name: "appearLength", desc: "Duration of the entry animation", type: "number", required: false }
            ],
            function: (chart, start, end, parent, speed, scrollSpeed, spawnOffset, randomDirections, fakes, onlyInPart, radius, appearType, appearEase, appearLength) => {
                start === undefined && (start = 0),
                    speed === undefined && (speed = 70),
                    scrollSpeed === undefined && (scrollSpeed = 1),
                    spawnOffset === undefined && (spawnOffset = 8),
                    fakes === undefined && (fakes = 0)
                chart.forEach(event => {
                    if (onlyInPart ? event.time <= end && event.time >= start : event.time - spawnOffset < end && event.time > start) {
                        const fakeStart = onlyInPart ? event.time - spawnOffset : Math.max(event.time - spawnOffset, start), fakeEnd = Math.min(event.time, end);
                        switch (event.type) {
                            case "block":
                                newFakeBlock(fakeStart, event.angle, (onlyInPart ? spawnOffset : Math.min(spawnOffset, event.time - start)) * speed * scrollSpeed, (event.time - fakeEnd) * speed * scrollSpeed, fakeEnd - fakeStart, parent, randomDirections ? randomValue(-75, 151) : 0, 0, radius, appearType, appearEase, appearLength);
                                for (let i = 0; i < fakes; i++) {
                                    newFakeBlock(fakeStart, randomValue(0, 360), spawnOffset * speed * scrollSpeed, -spawnOffset * speed * scrollSpeed, spawnOffset * 2, parent, 0, randomValue(10, 190), radius, appearEase, appearLength);
                                } break;
                            case "side":
                                newFakeSide(fakeStart, event.angle, (onlyInPart ? spawnOffset : Math.min(spawnOffset, event.time - start)) * speed * scrollSpeed, (event.time - fakeEnd) * speed * scrollSpeed, fakeEnd - fakeStart, parent, randomDirections ? randomValue(-75, 151) : 0, 0, radius, appearType, appearEase, appearLength);
                                for (let i = 0; i < fakes; i++) {
                                    newFakeSide(fakeStart, randomValue(0, 360), spawnOffset * speed * scrollSpeed, -spawnOffset * speed * scrollSpeed, spawnOffset * 2, parent, 0, randomValue(10, 190), radius, appearEase, appearLength);
                                } break;
                        }
                    }
                });
            }
        }]
    }/*, {
        name: "bpmChanger (UNFINISHED, does nothing)",
        desc: "Returns the amount of unhidden decos in your level",
        constants: [
            { name: "level", desc: "The level file that your variant uses", type: "json", required: true, newRow: true }
        ],
        before: () => {
        },
        after: () => { },
        functions: [],
        dontUseEvents: true
    }*/],
    eases = ["linear", "inSine", "outSine", "inOutSine", "inQuad", "outQuad", "inOutQuad", "inCubic", "outCubic", "inOutCubic", "inQuart", "outQuart", "inOutQuart", "inQuint", "outQuint", "inOutQuint", "inExpo", "outExpo", "inOutExpo", "inCirc", "outCirc", "inOutCirc", "inElastic", "outElastic", "inOutElastic", "inBack", "outBack", "inOutBack"];
let openTool = tools[0],
    constants = {}, abort;
//


// General utility
let events = [], lastAngle = 0, lastDir = 1;
function normalizeAngle(d) { return ((d % 360) + 360) % 360; }
function compareAnglesLR(dMain, dOther) { let tempDiff = normalizeAngle(dOther - dMain); return (180 > tempDiff && tempDiff >= 0 ? "left" : "right"); }
function compareAnglesFB(dMain, dOther) { let tempDiff = normalizeAngle(dOther - dMain); return (90 > tempDiff || tempDiff >= 270 ? "front" : "back"); }
function getAngle(x, y) { return Math.atan2(y, x) / Math.PI * 180; }
function getDist(x, y) { return Math.hypot(x, y); }
function cos(d) { return Math.cos(d * (Math.PI / 180)); }
function sin(d) { return Math.sin(d * (Math.PI / 180)); }

function randomValue(min, range) { return Math.floor(Math.random() * (range)) + min; }
function newAngle(snap, minDist, maxDist) { let angle; do { angle = randomValue(0, snap) * 360 / snap; } while ((minDist !== undefined && (normalizeAngle(angle - lastAngle) < minDist || normalizeAngle(angle - lastAngle) > 360 - minDist)) || (maxDist !== undefined && (normalizeAngle(angle - lastAngle) > maxDist && normalizeAngle(angle - lastAngle) < 360 - maxDist))); return angle; }

function randomAngle(snap, minAngle, maxAngle) { return randomValue(minAngle / 360 * snap, (maxAngle - minAngle) / 360 * snap) * 360 / snap; }
function average(...args) { return args.reduce((prev, current) => prev + current, 0) / args.length }
function randomFromArray(array) { return array[randomValue(0, array.length)]; }

// Text Generator utility
const availiableLetters = [{ letter: " ", length: 4 }, { letter: "a", length: 8 }, { letter: "b", length: 8 }, { letter: "c", length: 7 }, { letter: "d", length: 8 }, { letter: "e", length: 8 }, { letter: "f", length: 3 }, { letter: "g", length: 8 }, { letter: "h", length: 8 }, { letter: "i", length: 2 }, { letter: "j", length: 2 }, { letter: "k", length: 8 }, { letter: "l", length: 2 }, { letter: "m", length: 11 }, { letter: "n", length: 8 }, { letter: "o", length: 8 }, { letter: "p", length: 8 }, { letter: "q", length: 8 }, { letter: "r", length: 5 }, { letter: "s", length: 7 }, { letter: "t", length: 3 }, { letter: "u", length: 8 }, { letter: "v", length: 8 }, { letter: "w", length: 11 }, { letter: "x", length: 7 }, { letter: "y", length: 8 }, { letter: "z", length: 8 }, { letter: "#", length: 9 }, { letter: "A", length: 8 }, { letter: "B", length: 8 }, { letter: "C", length: 8 }, { letter: "D", length: 8 }, { letter: "E", length: 7 }, { letter: "F", length: 7 }, { letter: "G", length: 9 }, { letter: "H", length: 8 }, { letter: "I", length: 1 }, { letter: "J", length: 3 }, { letter: "K", length: 8 }, { letter: "L", length: 4 }, { letter: "M", length: 11 }, { letter: "N", length: 8 }, { letter: "O", length: 9 }, { letter: "P", length: 8 }, { letter: "Q", length: 9 }, { letter: "R", length: 8 }, { letter: "S", length: 8 }, { letter: "T", length: 7 }, { letter: "U", length: 8 }, { letter: "V", length: 8 }, { letter: "W", length: 11 }, { letter: "X", length: 7 }, { letter: "Y", length: 8 }, { letter: "Z", length: 7 }, { letter: "0", length: 8 }, { letter: "1", length: 1 }, { letter: "2", length: 7 }, { letter: "3", length: 8 }, { letter: "4", length: 8 }, { letter: "5", length: 7 }, { letter: "6", length: 8 }, { letter: "7", length: 6 }, { letter: "8", length: 8 }, { letter: "9", length: 8 }, { letter: "+", length: 5 }, { letter: "-", length: 4 }, { letter: "*", length: 4 }, { letter: "/", length: 3 }, { letter: "\\", length: 3 }, { letter: "%", length: 9 }, { letter: '"', length: 3 }, { letter: "'", length: 1 }, { letter: "&", length: 9 }, { letter: "~", length: 6 }, { letter: ".", length: 1 }, { letter: ",", length: 2 }, { letter: ":", length: 1 }, { letter: ";", length: 2 }, { letter: "_", length: 8 }, { letter: "<", length: 6 }, { letter: ">", length: 6 }, { letter: "|", length: 1 }, { letter: "´", length: 2 }, { letter: "`", length: 2 }, { letter: "^", length: 5 }, { letter: "°", length: 4 }, { letter: "[", length: 2 }, { letter: "]", length: 2 }, { letter: "{", length: 4 }, { letter: "}", length: 4 }, { letter: "=", length: 6 }, { letter: "(", length: 2 }, { letter: ")", length: 2 }, { letter: "!", length: 1 }, { letter: "?", length: 8 }], prefix = "digitalDiscoFontIncomplete";
let texts = [];
function getIndexOfText(id) { for (let i = 0; i < texts.length; i++) { if (texts[i].id == id) { return i; } } return -1; }
function getIndexOfLetter(letter) { for (let i = 0; i < availiableLetters.length; i++) { if (availiableLetters[i].letter == letter) { return i; } } return -1; }
function getLetterOffset(letter) { if (letter === undefined) { return 0; } return availiableLetters[getIndexOfLetter(letter)].length + (letter == "{" ? 0 : 1); }
function getTextLength(text) { return text.split("").reduce((length, letter) => length + getLetterOffset(letter), 0) }

// Fake Block Utility
const fakeBlockPrefix = "fakeBlock";
let fakeBlocks = [];
function newFakeBlock(time, r, xStart, x, duration, parent, bonusR, bonusX, radius, appearType, appearEase, appearLength) {
    const start = time, end = time + duration;
    let freeIndex = fakeBlocks.indexOf(fakeBlocks.filter(fake => fake.every(active => end < active.start || active.end < start))[0]), startOrder, endOrder;
    freeIndex == -1 && (freeIndex = fakeBlocks.length, fakeBlocks.push([])),
        startOrder = 0, endOrder = 0,
        fakeBlocks[freeIndex].push({ start: start, end: end, startOrder: startOrder, endOrder: endOrder }),
        radius === undefined && (radius = 51)
    const angle = bonusX ? r + randomValue(-0.5, 2) * 2 * 90 : (bonusR ? r + bonusR : r);
    bonusX === undefined && (bonusX = 0);
    events.push({
        time: time, angle: 0, type: "deco", order: 0, hide: false,
        id: fakeBlockPrefix + "_" + freeIndex, parentid: parent,
        sprite: "block.png",
        x: cos(r - 90) * (radius + bonusX) + cos(angle - 90) * xStart + (parent === undefined ? 300 : 0), y: sin(r - 90) * (radius + bonusX) + sin(angle - 90) * xStart + (parent === undefined ? 180 : 0),
        ox: 9, oy: 9, sx: (appearLength && appearType != "sy" ? 0 : undefined), sy: (appearLength && appearType != "sx" ? 0 : undefined)
    }, {
        time: time, angle: 0, type: "deco", order: 1,
        id: fakeBlockPrefix + "_" + freeIndex,
        x: cos(r - 90) * (radius + bonusX) + cos(angle - 90) * x + (parent === undefined ? 300 : 0), y: sin(r - 90) * (radius + bonusX) + sin(angle - 90) * x + (parent === undefined ? 180 : 0),
        duration: duration
    }, {
        time: time + duration, angle: 0, type: "deco",
        id: fakeBlockPrefix + "_" + freeIndex,
        hide: true
    }),
        appearLength && (events.push({
            time: time, angle: 0, type: "deco", order: 1,
            id: fakeBlockPrefix + "_" + freeIndex,
            sx: 1, sy: 1,
            duration: appearLength, ease: appearEase
        }));
}
function newFakeSide(time, r, xStart, x, duration, parent, bonusR, bonusX, radius, appearType, appearEase, appearLength) {
    const start = time, end = time + duration;
    let freeIndex = fakeBlocks.indexOf(fakeBlocks.filter(fake => fake.every(active => end < active.start || active.end < start))[0]), startOrder, endOrder;
    freeIndex == -1 && (freeIndex = fakeBlocks.length, fakeBlocks.push([])),
        startOrder = 0, endOrder = 0,
        fakeBlocks[freeIndex].push({ start: start, end: end, startOrder: startOrder, endOrder: endOrder }),
        radius === undefined && (radius = 36.5)
    const angle = bonusX ? r + randomValue(-0.5, 2) * 2 * 90 : (bonusR ? r + bonusR : r);
    bonusX === undefined && (bonusX = 0);
    events.push({
        time: time, angle: 0, type: "deco", order: 0, hide: false,
        id: fakeBlockPrefix + "_" + freeIndex, parentid: parent,
        sprite: "side.png",
        x: cos(r - 90) * (radius + bonusX) + cos(angle - 90) * xStart + (parent === undefined ? 300 : 0), y: sin(r - 90) * (radius + bonusX) + sin(angle - 90) * xStart + (parent === undefined ? 180 : 0),
        ox: 7, oy: 10, sx: (appearLength && appearType != "sy" ? 0 : undefined), sy: (appearLength && appearType != "sx" ? 0 : undefined),
        r: r
    }, {
        time: time, angle: 0, type: "deco", order: 1,
        id: fakeBlockPrefix + "_" + freeIndex,
        x: cos(r - 90) * (radius + bonusX) + cos(angle - 90) * x + (parent === undefined ? 300 : 0), y: sin(r - 90) * (radius + bonusX) + sin(angle - 90) * x + (parent === undefined ? 180 : 0),
        duration: duration
    }, {
        time: time + duration, angle: 0, type: "deco",
        id: fakeBlockPrefix + "_" + freeIndex,
        hide: true
    }),
        appearLength && (events.push({
            time: time, angle: 0, type: "deco", order: 1,
            id: fakeBlockPrefix + "_" + freeIndex,
            sx: 1, sy: 1,
            duration: appearLength, ease: appearEase
        }));
}

// Particle Generator
const particlePrefix = "particle";
let particles = [], gravityParticles = [];



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
function getFirstName(list, name) {
    return list.filter(obj => obj.name == name)[0];
}
function runFunction(toolName, funcName, ...params) {
    getFirstName(getFirstName(tools, toolName).functions, funcName).function(...params);
}
function updatePosition() {
    for (let i = 0; i < eventsDiv.childElementCount; i++) {
        const lastElementChild = eventsDiv.children[i].lastElementChild.lastElementChild;
        lastElementChild.previousElementSibling.style.display = "",
            lastElementChild.style.display = "";
    }
    eventsDiv.lastElementChild && (
        eventsDiv.firstElementChild.lastElementChild.lastElementChild.previousElementSibling.style.display = "none",
        eventsDiv.lastElementChild.lastElementChild.lastElementChild.style.display = "none"
    );
}
function addParamInput(param) {
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
                option.innerText = param.dontBeautifyValues ? param.values[i] : beautifyText(param.values[i]),
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
                option.innerText = param.values[i],
                    option.value = param.values[i],
                    inputDiv.appendChild(option);
            }
            break;
        case "json":
            inputDiv = document.createElement("input"),
                inputDiv.type = "text";
            break;
        case "ease":
            inputDiv = document.createElement("select");
            for (let i = 0; i < eases.length; i++) {
                const option = document.createElement("option");
                option.innerText = eases[i],
                    option.value = eases[i],
                    inputDiv.appendChild(option);
            }
            break;
        default: throw new Error(["DEFAULT PART OF SWITCH REACHED", param.type].join(" "));
    }
    param.required && (inputDiv.classList.add("required"))
    return inputDiv;
}
function addConstant(constant) {
    if (constant.newRow) {
        const row = document.createElement("div");
        row.classList.add("row"),
            constantsDiv.appendChild(row);
    }
    const inputDiv = addParamInput(constant), label = document.createElement("label");
    constant.required && (inputDiv.classList.add("required")),
        label.innerText = beautifyText(constant.name), label.title = constant.desc,
        inputDiv.classList.add("subsubfield"),
        constantsDiv.lastElementChild.append(label, inputDiv);
}
function addEvent(func) {
    eventsDiv.style.display = "";
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
        const inputDiv = addParamInput(param), label = document.createElement("label");
        param.required && (inputDiv.classList.add("animColor")),
            label.innerText = param.dontBeautifyName ? param.name : beautifyText(param.name),
            label.title = param.desc,
            inputDiv.classList.add("subsubfield"),
            eventsDiv.lastElementChild.lastElementChild.append(label, inputDiv);
    });
    const row = document.createElement("div"), removeButton = document.createElement("button"), moveUpButton = document.createElement("button"), moveDownButton = document.createElement("button");
    row.classList.add("row"),
        eventsDiv.lastElementChild.appendChild(row);
    if (!func.permanent) {
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
            eventsDiv.lastElementChild.lastElementChild.append(removeButton, moveUpButton, moveDownButton);
    } else {
        eventsDiv.lastElementChild.lastElementChild.style.display = "none";
        eventsDiv.lastElementChild.lastElementChild.append(document.createElement("div"), document.createElement("div"), document.createElement("div"));
    }
    updatePosition();
}
function loadTool(toolName) {
    openTool = getFirstName(tools, toolName);
    if (openTool === undefined) { throw new Error(["INVALID TOOL", toolName].join(" ")); }

    while (constantsDiv.firstElementChild) { constantsDiv.firstElementChild.remove(); }
    while (eventsDiv.firstElementChild) { eventsDiv.firstElementChild.remove(); }
    while (eventSelect.firstElementChild) { eventSelect.firstElementChild.remove(); }
    toolLabel.innerText = beautifyText(toolName),
        toolLabel.title = openTool.desc,
        toolSelect.value = toolName;
    //
    if (openTool.constants[0]) {
        constantsDiv.parentElement.style.display = "";
        for (let i = 0; i < openTool.constants.length; i++) {
            addConstant(openTool.constants[i]);
        }
    } else {
        constantsDiv.parentElement.style.display = "none";
    }
    if (openTool.functions.filter(func => !func.hidden)[0]) {
        eventsDiv.style.display = "",
            eventDiv.style.display = "",
            openTool.functions.filter(func => !func.hidden).forEach(func => {
                const option = document.createElement("option");
                option.innerText = beautifyText(func.name),
                    option.title = func.desc,
                    option.value = func.name,
                    eventSelect.appendChild(option);
            });
    } else {
        eventsDiv.style.display = "none",
            eventDiv.style.display = "none";
    }
}
function convertInput(input, type, element) {
    switch (type) {
        case "number": return Number(input);
        case "string": return input;
        case "boolean": return input == "true" ? true : false;
        case "select": return input;
        case "numberSelect": return Number(input);
        case "json": try { return JSON.parse(input) } catch (error) { element.style.backgroundColor = "red", resultDiv.innerText = "Invalid JSON"; throw new Error(["INVALID JSON", input, type].join(" ")); };
        default: throw new Error(["DEFAULT PART OF SWITCH REACHED", type].join(" "));
    }
}


// Init
resultDiv.innerText = "Hover over some tool, constant, event and parameter names to get tooltips\nThis is version " + version,
    resultDiv2.innerText = "The console may give you additional information when running",
    tools.forEach(tool => {
        const option = document.createElement("option");
        option.innerText = beautifyText(tool.name),
            option.title = tool.desc,
            option.value = tool.name,
            toolSelect.appendChild(option);
    }),
    loadTool(tools[randomValue(0, tools.length)].name),
    toolButton.onclick = () => {
        loadTool(toolSelect.value);
    },
    eventButton.onclick = () => {
        const func = getFirstName(openTool.functions, eventSelect.value);
        addEvent(func);
    },
    runButton.onclick = () => {
        events = [], texts = [], fakeBlocks = [], particles = [], gravityParticles = [], constants = {}, abort = false,
            resultDiv.innerText = "Empty", resultDiv2.innerText = "Empty";
        let i = 0;
        for (let j = 0; j < constantsDiv.childElementCount; j++) {
            const row = constantsDiv.children[j];
            for (let k = 1; k < row.childElementCount; k += 2) {
                let constant = row.children[k].value, constDefault = openTool.constants[i];
                row.children[k].style.backgroundColor = "";
                if (constant == "") {
                    constant = undefined;
                    if (constDefault.required) {
                        row.children[k].style.backgroundColor = "red", resultDiv.innerText = "Empty required input",
                            runButton.style.backgroundColor = "red",
                            setTimeout(() => {
                                runButton.style.backgroundColor = "";
                            }, 1000);
                        return;
                    }
                } else {
                    constant = convertInput(constant, constDefault.type, row.children[k]);
                }
                constants[constDefault.name] = constant, i++;
            }
        }
        openTool.before();
        if (abort) { return; }
        for (i = 0; i < eventsDiv.childElementCount; i++) {
            const event = eventsDiv.children[i], func = getFirstName(openTool.functions, event.firstElementChild.innerText);
            let params = [];
            for (let j = 2; j < event.childElementCount - 1; j++) {
                const row = event.children[j];
                for (let k = 1; k < row.childElementCount; k += 2) {
                    let param = row.children[k].value, paramDefault = func.params[params.length];
                    func.constOverride && (paramDefault = constants[func.name].params[params.length]),
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
                        param = convertInput(param, paramDefault.type, row.children[k]);
                    }
                    params.push(param);
                }
            }
            func.function(...params);
        }
        if (abort) { return; }
        openTool.after();
        if (abort) { return; }
        if (!openTool.dontUseEvents) {
            resultDiv.innerText = JSON.stringify(events),
                console.log("Amount of events:", events.length);
        }
        runButton.style.backgroundColor = "green",
            setTimeout(() => {
                runButton.style.backgroundColor = "";
            }, 1000);
    },
    copyButton.onclick = () => {
        navigator.clipboard.writeText(resultDiv.innerText),
            copyButton.style.backgroundColor = "green",
            console.log("Copied into clipboard!"),
            setTimeout(() => {
                copyButton.style.backgroundColor = "";
            }, 1000);
    },
    copyButton2.onclick = () => {
        navigator.clipboard.writeText(resultDiv2.innerText),
            copyButton2.style.backgroundColor = "green",
            console.log("Copied into clipboard!"),
            setTimeout(() => {
                copyButton2.style.backgroundColor = "";
            }, 1000);
    };