const csvController = require('../src/controllers/csvController');
const csvService = require('../src/services/csvService');

jest.mock('../src/services/csvService');

describe('CSV Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('should parse CSV file successfully', async () => {
        const mockParsedData = [{ name: 'John', age: 30 }, { name: 'Jane', age: 25 }];

        csvService.parseCSV.mockResolvedValueOnce(mockParsedData);

        const filePath = 'path/to/mock.csv';
        const result = await csvController.parseCSV(filePath);

        expect(result).toEqual(mockParsedData);
        expect(csvService.parseCSV).toHaveBeenCalledWith(filePath);
    });

    test('should handle error during CSV parsing', async () => {
        const mockError = new Error('Mock CSV parsing error');

        csvService.parseCSV.mockRejectedValueOnce(mockError);

        const filePath = 'path/to/mock.csv';
        const result = await csvController.parseCSV(filePath);

        expect(result).toEqual({ error: 'Internal Server Error' });
        expect(csvService.parseCSV).toHaveBeenCalledWith(filePath);
    });
});
