const csvService = require('./csvService');

async function getAmenityData() {
    try {
        return await csvService.parseCSV('amenity.csv');
    } catch (error) {
        console.error('Error reading CSV:', error);
        throw error;
    }
}

async function getReservationsData() {
    try {
        return await csvService.parseCSV('reservations.csv');
    } catch (error) {
        console.error('Error reading CSV:', error);
        throw error;
    }
}

async function waitForData() {
    try {
        const amenityData = await getAmenityData();
        const reservationsData = await getReservationsData();
        return {amenityData, reservationsData};
    } catch (error) {
        console.error('Error reading data:', error);
        throw error;
    }
}

function getAmenityObjectName(amenityData, amenityId) {
    const amenityObject = amenityData.find((obj) => obj.id === amenityId);
    return amenityObject ? amenityObject.name : '';
}

function minutesToHHMM(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins < 10 ? '0' : ''}${mins}`;
}

async function getBookingsByAmenityAndDay(amenityId, timestamp) {
    const selectedDate = parseInt(timestamp, 10);
    const data = await waitForData();
    const filteredBookings = data.reservationsData.filter(
        (booking) => parseInt(booking.amenity_id) === parseInt(amenityId) && parseInt(booking.date) === parseInt(selectedDate)
    );

    filteredBookings.sort((a, b) => a.start_time - b.start_time);

    return filteredBookings.map((booking) => ({
        reservationId: booking.id,
        userId: booking.user_id,
        startTime: minutesToHHMM(booking.start_time),
        duration: booking.end_time - booking.start_time,
        amenityObjectName: getAmenityObjectName(data.amenityData, booking.amenity_id),
    }));
}

async function getUserBookings(userId) {
    const data = await waitForData();
    const userBookings = data.reservationsData
        .filter((booking) => parseInt(booking.user_id) === parseInt(userId))
        .map((booking) => ({
            reservationId: booking.id,
            amenityId: booking.amenity_id,
            startTime: minutesToHHMM(booking.start_time),
            duration: booking.end_time - booking.start_time,
            amenityObjectName: getAmenityObjectName(data.amenityData, booking.amenity_id),
            date: booking.date,
        }));

    return userBookings.reduce((result, booking) => {
        const dateKey = booking.date.toString();

        if (!result[dateKey]) {
            result[dateKey] = [];
        }

        result[dateKey].push(booking);

        return result;
    }, {});
}

module.exports = {
    getBookingsByAmenityAndDay,
    getUserBookings,
    parseCSV: csvService.parseCSV,
};
