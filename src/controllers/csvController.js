const csvService = require('../services/csvService');

const parseCSV = async (filePath) => {
    try {
        return await csvService.parseCSV(filePath);
    } catch (error) {
        return {error: 'Internal Server Error'};
    }
};

module.exports = {
    parseCSV,
};

