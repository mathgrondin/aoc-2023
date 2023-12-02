import fs from 'fs';

const numberRegex = /(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine)/
const digitRegex = /\d/;

function replaceStringNumberToDigit(line) {
    var modifiedLine = line.toLowerCase()
    modifiedLine = modifiedLine.replaceAll("one", "o1e");
    modifiedLine = modifiedLine.replaceAll("two", "t2o");
    modifiedLine = modifiedLine.replaceAll("three", "t3e");
    modifiedLine = modifiedLine.replaceAll("four", "f4r");
    modifiedLine = modifiedLine.replaceAll("five", "f5e");
    modifiedLine = modifiedLine.replaceAll("six", "s6x");
    modifiedLine = modifiedLine.replaceAll("seven", "s7n");
    modifiedLine = modifiedLine.replaceAll("eight", "e8t");
    modifiedLine = modifiedLine.replaceAll("nine", "n9e");
    return modifiedLine;
}

function getFirstDigitString(line) {
    const firstDigitMatch = digitRegex.exec(line);
    if (firstDigitMatch && firstDigitMatch.length > 0 && firstDigitMatch[0].length > 0) {
        var firstDigitString = firstDigitMatch[0][0]
        return firstDigitString;
    }
    return ""
}
function getLastDigitString(line) {
    const reversedLine = line.split("").reverse().join("")
    return getFirstDigitString(reversedLine);
}

function getLineNumber(line, logger) {
    if (!line) {
        return;
    }
    line = line.split('\r')[0];
    var digitLine = replaceStringNumberToDigit(line)
    var firstDigitString = getFirstDigitString(digitLine)
    var lastDigitString = getLastDigitString(digitLine)
    var digitString = firstDigitString + lastDigitString
    logger.write(line + ' > ' + digitString + '\r');
    return digitString ? parseInt(digitString) : 0;

}

export default async function main() {
    const logger = fs.createWriteStream(process.cwd() + '\\2\\log.txt')
    const inputFilePath = process.cwd() + '\\2\\input.txt';
    const fileStream = fs.readFileSync(inputFilePath).toString('utf-8');
    const allLines = fileStream.split("\n");
    const allLineValues = allLines.map((l) => getLineNumber(l, logger));
    const sum = allLineValues.reduce((sum, current) => sum + current)
    logger.end()
    console.log(sum)
}