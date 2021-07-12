//const fs = require('fs');
const { readdir } = require('fs/promises');

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
		js: { fileNames: [], lineCountTotal: 0, lineCountEmpty: 0, lineCountBraces: 0, lineCountCode: 0 },
		jsx: { fileNames: [], lineCountTotal: 0, lineCountEmpty: 0, lineCountBraces: 0, lineCountCode: 0 },
		ts: { fileNames: [], lineCountTotal: 0, lineCountEmpty: 0, lineCountBraces: 0, lineCountCode: 0 },
		tsx: { fileNames: [], lineCountTotal: 0, lineCountEmpty: 0, lineCountBraces: 0, lineCountCode: 0 },
	};

	for (const iFile of fileNames) {
		if (iFile.indexOf(".") > -1) { //check that there is a period in the filename
			const fileParts = iFile.split("."); //break up the filename into parts by period, accounting for filenames with multiple periods

			const ext = fileParts[fileParts.length - 1]; //the last part will always be the extension

			//if (qualifyingExtensions.indexOf(ext) > -1) {
				fileGroups[ext]?.fileNames.push(iFile);
			//}
		}
	}

	return fileGroups;
};

const rootFolder = "files";

// console.log("HOMEDRIVE", env.HOMEDRIVE);
// console.log("HOMEPATH", env.HOMEPATH);
// console.log("USERPROFILE", env.USERPROFILE);

const getFileGroupPromise = getFileGroups(rootFolder, true, 0);

getFileGroupPromise
	.then(groups => {
		console.log(groups);

		// for (const ext of qualifyingExtensions)
		// 	console.log(`Number of ${ext} files - ${groups[ext].fileNames.length}`);

		for (const entry of Object.entries(groups))
			console.log(`Number of ${entry[0]} files - ${entry[1].fileNames.length}`);
	});

