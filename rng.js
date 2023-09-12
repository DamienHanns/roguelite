function getRandomNumber(min, max) {
    // Generate a random decimal number between 0 and 1
    const randomDecimal = Math.random();

    // Scale the random number to fit the desired range
    return Math.floor(randomDecimal * (max - min + 1)) + min;
}

export default getRandomNumber;