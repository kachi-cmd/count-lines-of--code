//const fs = require('fs');
const { readdir, readFile } = require('fs/promises');

const { config, env } = require('process');

const getFolderContents = async (startingFolder) => {
	try {
		const dirEntries = await readdir(startingFolder, {encoding: 'utf8', withFileTypes: true});

		const directoryNames = dirEntries.filter(dir => dir.isDirectory()).map(dir => `${startingFolder}/${dir.name}`);

		const fileNames = dirEntries.filter(file => file.isFile()).map(file => `${startingFolder}/${file.name}`);

		return { directoryNames, fileNames };
	} catch (err) {
		console.error(err);

		return {};
	}
};

const getFileNames = async (startingFolder, shouldRecurse, depth) => {
	depth++;

	//console.log(`Scanning folder ${startingFolder} at depth ${depth}`);

	try {
		const dirContents = await getFolderContents(startingFolder);

		const fileNames = dirContents.fileNames;

		for (const iFolder of dirContents.directoryNames) {
			//console.log(iFolder);

			const iFolderFiles = await getFileNames(iFolder, shouldRecurse, depth);

			for (const iFile of iFolderFiles) {
				fileNames.push(iFile);
			}
		}

		return fileNames;
	} catch (err) {
		console.error(err);

		return {};
	}
};

const getFileGroups = async (startingFolder, shouldRecurse, depth) => {
	const fileNames = await getFileNames(startingFolder, shouldRecurse, depth);

	const fileGroups = {
		js: { files: [], lineTotal: 0, lineEmpty: 0, lineBraces: 0, lineComment: 0, lineCode: 0 },
		jsx: { files: [], lineTotal: 0, lineEmpty: 0, lineBraces: 0, lineComment: 0, lineCode: 0 },
		ts: { files: [], lineTotal: 0, lineEmpty: 0, lineBraces: 0, lineComment: 0, lineCode: 0 },
		tsx: { files: [], lineTotal: 0, lineEmpty: 0, lineBraces: 0, lineComment: 0, lineCode: 0 },
	};

	const lineBreakExpression = /\r\n|\r|\n/;

	const braceCharacters = [
		'[', ']', '{', '}', '(', ')', ';'
	];

	for (const fileName of fileNames) {
		if (fileName.indexOf(".") > -1) { //check that there is a period in the filename
			const fileParts = fileName.split("."); //break up the filename into parts by period, accounting for filenames with multiple periods

			const ext = fileParts[fileParts.length - 1]; //the last part will always be the extension

			//pick the group to which this file belongs. Get to it by indexing the property
			const fileGroup = fileGroups[ext];

			//if the file group doesn't exist, it is not a file we want to track or measure.
			if (!(fileGroup === null || fileGroup == undefined)) {
				const fileContent = await readFile(fileName, 'utf8'); //read the file contents

				const fileLines = fileContent.split(lineBreakExpression); //break it up into lines

				const lineTotal = fileLines.length; //get the length of that array to determine the number of lines

				const lineEmpty = 
					fileLines
						.map(line => line.trim()) //trimming removes starting and ending whitespace and linebreaks, leaving only actual textual characters
						.filter(line => line.length === 0 || (line.length === 1 && line[0] === ';')) //if we have an empty string at the end of the trimming, then it was a semantically empty line to begin with
						.length;

	
				const lineBraces = 
					fileLines
						.map(line => line.trim()) //trimming removes starting and ending whitespace and linebreaks, leaving only actual textual characters
						.filter(line => line.length > 0 
										&& !(line.length === 1 && line[0] === ';') 
										&& line.split('').filter(xter => braceCharacters.indexOf(xter) < 0).length === 0 /*any xter other than braces will disqualify the line*/)
						.length;

				const lineComment = 
					fileLines
						.map(line => line.trim()) //trimming removes starting and ending whitespace and linebreaks, leaving only actual textual characters
						.filter(line => line.startsWith('//'))
						.length;
				
				const lineCode = lineTotal - (lineEmpty + lineBraces + lineComment);
	
				// console.log(`${fileName} - ${fileContent.length} - ${fileLines.length}`);

				const iFile = { fileName, lineTotal, lineEmpty, lineBraces, lineComment, lineCode };

				fileGroup.files.push(iFile);

				fileGroup.lineTotal += lineTotal; //get the length of that array to determine the number of lines

				fileGroup.lineEmpty += lineEmpty;

				fileGroup.lineBraces += lineBraces;

				fileGroup.lineComment += lineComment;

				fileGroup.lineCode += lineCode;
			}
		}
	}

	return fileGroups;
};

//  const rootFolder = "files";
// const rootFolder = "C:/Users/User2/Desktop/CODES/ezema/weather-app/src";
const rootFolder = process.argv.slice(2).toString();

// console.log("HOMEDRIVE", env.HOMEDRIVE);
// console.log("HOMEPATH", env.HOMEPATH);
// console.log("USERPROFILE", env.USERPROFILE);

const getFileGroupPromise = getFileGroups(rootFolder, true, 0);

getFileGroupPromise
	.then(groups => {
		//console.log(groups);

		for (const entry of Object.entries(groups))
			console.log(`Number of ${entry[0]} files - `, entry[1]);

		// for (const ext of qualifyingExtensions)
		// 	console.log(`Number of ${ext} files - ${groups[ext].fileNames.length}`);

		// for (const entry of Object.entries(groups))
		// 	console.log(`Number of ${entry[0]} files - ${entry[1].fileNames.length}`);
	});

