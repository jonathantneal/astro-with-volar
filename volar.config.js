import { parse } from 'yaml'

export default {
	languages: {
		yaml: {
			createVirtualFile(fileName, snapshot) {
				if (fileName.endsWith('.yaml') || fileName.endsWith('.yml')) {
					return {
						fileName: fileName + '.ts',
						kind: 1,
						snapshot: parseSnapshot(snapshot),
						mappings: [],
						capabilities: {},
						codegenStacks: [],
						embeddedFiles: [],
					}
				}
			},
			updateVirtualFile(yamlFile, snapshot) {
				yamlFile.snapshot = parseSnapshot(snapshot)
			},
		}
	}
}

function parseSnapshot(snapshot) {
	const tsCode = `export default Object as ${JSON.stringify(parse(snapshot.getText(0, snapshot.getLength())))}`
	return {
		getText(start, end) {
			return tsCode.substring(start, end)
		},
		getLength() {
			return tsCode.length
		},
		getChangeRange() {
			return undefined
		},
	}
}
