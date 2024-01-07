const fs = require('fs');
const csvParser = require('csv-parser');

async function parseCSV(filePath) {
    const jsonArray = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csvParser({separator: ';', renameHeaders: true}))
            .on('data', (row) => jsonArray.push(row))
            .on('end', () => resolve(jsonArray))
            .on('error', (error) => reject(error));
    });
}

module.exports = {
    parseCSV,
};
