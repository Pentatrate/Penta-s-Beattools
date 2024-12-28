# Penta-s-Beattools
by Pentatrate

for Beatblock

## Tools in Penta's Beattools
1. Beatblock Text Generator using a spritesheet (Use K4kadu's unless you really need to use this one)
2. Beatblock Untagger (single tag/all tags)

## How to use (Penta's Beattools)
Will get updated to include other tools.

0. Save your level. Beatblock may crash when you make an error here.
1. Download all .png and .json files and copy them into your level files.
	You may choose to not download some assets if you are sure they aren't required.
2. Download the "Penta's Beattools" folder somewhere on your PC and open "Penta's Beattools.html".
	There is no official way to download a folder directly as far as I know, but it's just 3 files and two are in a subfolder.
3. Select the tool you want to use (Right now only Text Generator).
4. Add some events and edit them using the tooltips you get when hovering over some labels.
5. Press "Run" and copy the events into an empty tag file ("tags/*tagName*.json") and save it.
6. Use the tag in your level.
	You can immediately playtest your changes ingame.

## How to use (Separate Tools/textGenerator.js)
Included in Penta's Beattools. You shouldn't use the separate version (this).

You should only use this tool if you know what you're doing as step 3 requires you to have minimal knowledge of how to code.

0. Save your level. Beatblock may crash when you make an error here.
1. Download the digitalDiscoFontIncomplete.png and the digitalDiscoFontIncomplete.json files and copy them into your level files.
2. Copy and paste the contents of the textGenerator.js file into a text editor, preferably a rich text editor like VSCode.
3. Use the commented functions to build and animate your text groups similarly to using deco events.
	The comments and example code will help you.
4. Open a new tab in your browser.
5. Open the console/developer tools there (Ctrl + Shift + I in Google).
6. Copy and paste everything from the text editor into your console and press Enter.
7. Copy and paste the text from the console into an empty tag file ("tags/*tagName*.json") and save it.
8. Use the tag in your level.
	You can immediately playtest your changes ingame.

## How to use (Separate Tools/untagger.js)
Included in Penta's Beattools. You shouldn't use the separate version (this).

You need Node.js for this. The source code that was injected into a Node.js package for the executable.

The code can also be copied and pasted into the console of your browser. You would then need to answer the prompts.
1. Save your level if you are in the editor (Make sure you can play it without errors).
2. Create a copy of your level for the unlikely event where your level breaks afterwards.
3. Download and put the untagger.js file into the folder of your specific level (**not** in the "tags" folder).
4. Open the command prompt and use Node.js to run it. Read the logs to make sure it was successful.
5. Check the "tags" folder of your level. It should be empty.
6. Reopen your level in the editor.
7. Report errors to me.
