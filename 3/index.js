import fs from 'fs';

const RED = "red", GREEN = "green", BLUE = "blue";
const COLORS = [RED, GREEN, BLUE];
const cubeCounts = {
    [RED]: 12,
    [GREEN]: 13,
    [BLUE]: 14
}

function getGameFromInput(logger){
    const inputFilePath = process.cwd() + '\\3\\input.txt';
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
        logger.write(`${gameId}: ${JSON.stringify(subsetStruct)}\r`);
        acc[gameId] = subsetStruct
        return acc;
    }, {})
}

function filterValidGames(count, id, game){
    const isValid = COLORS.reduce((isValide, color) => {
        if(isValide && game[color] && game[color] > cubeCounts[color]){
            isValide = false;
        }
        return isValide;
    }, true)
    if(isValid){
        const value = parseInt(id)
        count += value;
    }
    return count;
}

export default async function main() {
    const logger = fs.createWriteStream(process.cwd() + '\\3\\log.txt')
    const games = getGameFromInput(logger)
    const validGamesSum = Object.keys(games).reduce((sum, id) => {
        return filterValidGames(sum, id, games[id])
    }, 0)
    console.log(validGamesSum)
    logger.end()
}