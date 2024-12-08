console.log("Running untagger.js"),
    console.log('If neither "Done!", "Unfinished." or "Aborted." gets logged for a while, an error has occured');

let inBrowser = true, fs;
try {
    window; // A Browser specific variable
} catch (e) {
    inBrowser = false;
}
if (!inBrowser) {
    fs = require("fs"); // If an error occurs here, you didn't run the code with Node.js
}
const json = {
    read: (filepath, callback, ...additionalParams) => {
        if (inBrowser) {
            let jsonData, json, validJSON;
            do {
                jsonData = window.prompt(`Please paste everything from ${filepath} here.`),
                    validJSON = true;
                try {
                    json = JSON.parse(jsonData);
                } catch (e) {
                    console.error(e),
                        validJSON = false;
                }
            } while (!validJSON && jsonData != "");
            callback && callback(jsonData == "" ? "abort" : json, ...additionalParams);
        } else {
            fs.readFile(filepath, (e, jsonData) => {
                if (e) throw e; // If an error occurs here, the most likely error is that the file doesn't exist
                console.log(`        File ${filepath} read.`);
                callback && callback(JSON.parse(jsonData), ...additionalParams);
            });
        }
    },
    overwrite: (filepath, json) => {
        if (inBrowser) {
            console.log(`Please replace everything in ${filepath} with the data logged below.`),
                console.log(JSON.stringify(json)),
                window.alert(`Please replace everything in ${filepath} with the data logged in the console.`);
        } else {
            fs.writeFile(filepath, JSON.stringify(json), e => {
                if (e) throw e;
                console.log(`        File ${filepath} overwritten.`);
            });
        }
    },
    delete: (filepath) => {
        if (inBrowser) {
            window.alert(`Please delete ${filepath}.`);
        } else {
            fs.unlink(filepath, function (e) {
                if (e) throw e;
                console.log(`        File ${filepath} deleted.`);
            });
        }
    }
},
    belongsToChart = ["block", "hold", "inverse", "mine", "mineHold", "side", "extraTap"];
let level, chart, selectedTag, tempTagEvents, needsChartData, status = "untaggingLevel",
    runTagEventsUntagged = 0, loop = 0,
    untaggedEvents = [], untaggedRunTagEvents = [], untaggingTags = [], untaggedTags = [], playSongEvents = [];

function untagAll(recursion) {
    if (recursion > 1) {
        console.log("The maximum recursion limit (1) has been reached. Something broke."),
            status = "unfinished",
            endRecursion(recursion);
        return;
    }
    console.log(`Starting recursion ${recursion}.`),
        loop = 0;
    while ((selectedTag = (recursion == 0 ? level.events : untaggedRunTagEvents).reduce((tag, event) => { return tag ? tag : event.type == "tag" && event.tag != "" && !untaggingTags.includes(event.tag) && event.tag }, false)) !== false && loop <= 100) { // Check for valid Run Tag Event
        // Require Tag Data
        console.log(`    (Untagging ${selectedTag}): Start untagging.`),
            untaggingTags.push(selectedTag),
            !untaggedTags.includes(selectedTag) && (untaggedTags.push(selectedTag)),
            json.read(`tags/${selectedTag}.json`, (tagEvents, selectedTag2, recursion2) => {
                if (tagEvents == "abort") { window.alert("Empty Input. Code aborted."), status = "aborted", endRecursion(recursion2); return; }
                // Warnings
                if (tagEvents == []) { console.log(`    (Untagging ${selectedTag2}): Nothing in the Tag. Continue deleting Run Tag Events.`); }
                // Warnings
                tagEvents.some(event => event.type == "play") && (console.log(`    (Untagging ${selectedTag2}): Play Song Events in Tags may lead to duplicates when untagging. This code will automatically delete duplicates after the first event for you.`)),
                    tagEvents.some(event => event.type == "showResults") && (console.log(`    (Untagging ${selectedTag2}): Show Results Events in Tags may lead to duplicates when untagging.`)),
                    tagEvents.some(event => event.type == "bookmark") && (console.log(`    (Untagging ${selectedTag2}): Bookmark Events don't belong in Tags.`));
                // Require Chart data
                needsChartData = tagEvents.some((event => belongsToChart.includes(event.type)));
                if (chart === undefined && needsChartData) {
                    json.read("chart.json", (chart2, selectedTag3, needsChartData3, recursion3) => {
                        if (chart2 == "abort") { window.alert("Empty Input. Code aborted."), status = "aborted", endRecursion(recursion3); return; }
                        chart === undefined ? (chart = chart2) : (console.log(`    (Untagging ${selectedTag3}): Tried to read Chart data but it has already been read (minor async issue).`)),
                            continueUntagging(selectedTag3, tagEvents, needsChartData3);
                    }, selectedTag2, needsChartData, recursion2);
                } else {
                    continueUntagging(selectedTag2, tagEvents, needsChartData);
                }
            }, selectedTag, recursion),
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
        for (let index = 0; index < level.events.length; index++) {
            const event = level.events[index];
            runTagEventsUntagged++;
            if (event.type != "tag" || event.tag != selectedTag2) { continue; }
            tempTagEvents = JSON.parse(JSON.stringify(tagEvents)); // Unpointer Code
            for (const i in tempTagEvents) {
                tempTagEvents[i].time = tagEvents[i].time + event.time;
                event.angleOffset && (tempTagEvents[i].angle = tagEvents[i].angle + event.angle);
            }
            untaggedEvents.push(...tempTagEvents), level.events.splice(index, 1), index--;
        }
        // Update with new data
        level.events.push(...untaggedEvents.filter((event => !belongsToChart.includes(event.type) && event.type != "tag"))),
            recursion == 0 && (untaggedRunTagEvents.push(...untaggedEvents.filter((event => event.type == "tag")))),
            needsChartData2 && (chart.push(...untaggedEvents.filter((event => belongsToChart.includes(event.type))))),
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
    if (status == "aborted") {
        console.log("Aborted.");
        return;
    }
    // Removing Play Song Event duplicates
    for (let index = 0; index < level.events.length; index++) {
        const event = level.events[index];
        if (event.type != "play") { continue; }
        playSongEvents.push(event), level.events.splice(index, 1), index--;
    }
    playSongEvents.length > 0 && (level.events.push(playSongEvents.sort((a, b) => a.time - b.time)[0]));
    if (playSongEvents.length == 0) {
        console.log("No Play Song Event in your level.");
    } else if (playSongEvents.length > 1) {
        console.log("Multiple Play Song Events in your level. Automatically fixed.");
    }
    // Overwrite old data
    json.overwrite("level.json", level), chart !== undefined && (json.overwrite("chart.json", chart));
    switch (status) {
        case "finished": console.log("Done!"); break;
        case "unfinished": console.log("Unfinished. Something may have broken."); break;
    }
    // Additional Info
    console.log(`Run Tag Events Untagged: ${runTagEventsUntagged}\nTag Events Untagged: ${untaggedTags.join(", ")}\nRecursion depth: ${recursion}`);
}

json.read("level.json", level2 => {
    if (level2 == "abort") { window.alert("Empty Input. Code aborted."), status = "aborted", endRecursion(-1); return; }
    level = level2, untagAll(0);
});