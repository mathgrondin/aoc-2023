import fs from 'fs';

const RED = "red", GREEN = "green", BLUE = "blue";
const COLORS = [RED, GREEN, BLUE];
function getGameFromInput(){
    const inputFilePath = process.cwd() + '\\4\\input.txt';
    const fileStream = fs.readFileSync(inputFilePath).toString('utf-8');
    const lines = fileStream.split("\n");
    return lines.reduce((acc, l) => {
        const values = l.replace("\r", "").split(":");
        const gameId = values[0].toLocaleLowerCase().split('game')[1];
        const subsets = values[1].split(";")
        const subsetStruct = subsets.reduce((s, c) => {
            const values = c.split(",")
            values.forEach(v => {
                COLORS.forEach(color => {
                    if(v.includes(color)){
                        const count = parseInt(v.split(color)[0])
                        s[color] = s[color] ? Math.max(s[color],count) : count;
                    }
                })
            })
            return s;
        }, {})
        acc[gameId] = subsetStruct
        return acc;
    }, {})
}

const getCalcPower = (logger) => (game) => {
    let power = 0;
    if(Object.values(game).length > 0){
        power = Object.values(game).reduce((acc, c) => acc * c, 1);
    }
    logger.write(`${power}\r`)
    return power
}

export default async function main() {
    const logger = fs.createWriteStream(process.cwd() + '\\4\\log.txt')
    const games = getGameFromInput()
    const calcPower = getCalcPower(logger)
    const powers = Object.values(games).map(calcPower)
    const totalPower = powers.reduce((acc, power) => acc += power, 0);
    console.log(totalPower)
    logger.end()
}