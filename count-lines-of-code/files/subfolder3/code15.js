//const fs = require('fs');
const fs = require('fs/promises');

const { config, env } = require('process');

const getFileNames = async (startingFolder) => {
	try {
		const dirEntries = await fs.readdir(startingFolder, {encoding: 'utf8', withFileTypes: true});

		const directoryNames = dirEntries.filter(dir => dir.isDirectory()).map(dir => dir.name);

		const fileNames = dirEntries.filter(file => file.isFile()).map(file => file.name);

		return { directoryNames, fileNames };
	} catch (err) {
		console.error(err);

		return {};
	}
};

const rootFolder = "files";

const getFilePromise = getFileNames(rootFolder);

getFilePromise
	.then(entries => console.log(entries));
