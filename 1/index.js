import fs from 'fs';

const digitRegex = /\d+/;

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

function getLineNumber(line) {
    if (!line) {
        return;
    }
    var firstDigitString = getFirstDigitString(line)
    var lastDigitString = getLastDigitString(line)
    var digitString = firstDigitString + lastDigitString
    return digitString ? parseInt(digitString) : 0;

}

export default async function main() {
    const inputFilePath = process.cwd() + '\\1\\input.txt';
    const fileStream = fs.readFileSync(inputFilePath).toString('utf-8');
    const allLines = fileStream.split("\n");
    const allLineValues = allLines.map(getLineNumber);
    const sum = allLineValues.reduce((sum, current) => sum + current)
    console.log(sum)
}