var fs = require("fs");

function readCmudictFile(file){
  return fs.readFileSync(file).toString();
}

var cmuDictFile = readCmudictFile('./cmudict.txt');

function formatData(data){ 
	var library = {};
	var lines = data.toString().split("\n");
	var lineSplit;
	lines.forEach(function(line){
		lineSplit = line.split("  ");
		var word = lineSplit[0];
		var phoneme = lineSplit[1];    
    	var syllables = phoneme.match(/\d/g).length;
    		if((syllables !== null) && (syllables <= 7)){
    			library[word] = syllables;
    		}
	})
	return library;   
}

var dictLibrary = formatData(cmuDictFile);

function makeSyllablesArr(formattedLib){
	var sylArr = [];
	for(var word in formattedLib){
		var idx = formattedLib[word];
		if(sylArr[idx] === undefined){
			sylArr[idx] = [];
			sylArr[idx].push(word);
		} else {
			sylArr[idx].push(word);
		}
	}
	return sylArr;
}

var syllablesArr = makeSyllablesArr(dictLibrary);

function createHaiku(structure, syllablesArr){
	var myHaiku = structure.map(function(lines){
		return lines.map(function(syllables){
			return syllablesArr[syllables][Math.floor(Math.random()*syllablesArr.length)];
		}).join(' ');
	}).join('\n');
}

module.exports = {
	cmuDictFile: cmuDictFile,
	syllablesArr: syllablesArr,
	createHaiku: createHaiku
};

// console.log(module);
