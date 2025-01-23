# Penta-s-Beattools
by Pentatrate

for Beatblock

YOU CAN HOVER OVER TOOL/EVENT/PARAMETER NAMES TO GET TOOLTIPS

PING ME (DC: .pentatrate) FOR QUESTIONS/SUGGESTIONS/BUGS, I SHOULD ANSWER...
eventually?

## Tools in Penta's Beattools
1. Beatblock Text Generator using a spritesheet (Use [K4kadu's](https://github.com/K4kadu/Beatblock-Utilities) unless you really need to use this one)
2. Beatblock Untagger (single tag/all tags)
3. [Beatblock Event Randomizer](#beatblock-event-randomizer)
4. Beatblock Deco Checker (and whether they get hidden or not)
5. Beatblock Circle Stream Generator
6. Beatblock Particle Generator
7. [Beatblock Fake Block Generator](#beatblock-fake-block-generator) (includes Sides)

## How to use (Penta's Beattools)
Will get updated to include other tools.

0. Save your level. Beatblock may crash when you make an error here.

1. 1. Download all .png and .json files and copy them into your level files.
	You may choose to not download some assets if you are sure they aren't required for your specific situation.

	2. Download the "Penta's Beattools" folder somewhere on your PC and open "Penta's Beattools.html".
	There is no official way to download a folder directly as far as I know, but it's just 3 files and two are in a subfolder.

		Alternative: Download all files in this repository and unzip them. (Click on Download ZIP)
		
		![image](https://github.com/user-attachments/assets/f4a94209-4fa8-47d7-ac4f-e76db634b2bf)

2. Select the tool you want to use.
3. This step is tool specific. Enter your wished values.
4. Press "Run" and copy the events into an empty tag file ("tags/*tagName*.json") and save it.
5. Use the tag in your level.
	You can immediately playtest your changes ingame.

## Beatblock Event Randomizer

Jumpbeat Instructions:

![Jumpbeat Instructions failed to load](https://github.com/user-attachments/assets/cbad4d15-a595-423d-97cd-a335dbfb1514)

![Min/Max Angle diagram failed to load](https://github.com/user-attachments/assets/f11680ac-a757-4b32-a3ed-77428661f593)

## Beatblock Fake Block Generator

![Randomizer Instructions failed to load](https://github.com/user-attachments/assets/8c5eb0c5-2415-47d5-9e79-8f244559eada)


### How to use (Separate Tools/textGenerator.js)
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

### How to use (Separate Tools/untagger.js)
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
