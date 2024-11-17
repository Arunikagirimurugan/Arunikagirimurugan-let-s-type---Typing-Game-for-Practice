
let startTime, endTime;
const textToType = document.getElementById('textToType');
const userInput = document.getElementById('userInput');
const result = document.getElementById('result');
const startButton = document.getElementById('startButton');
const resetButton = document.getElementById('resetButton');

startButton.addEventListener('click', () => {
    userInput.value = '';
    userInput.disabled = false;
    userInput.focus();
    result.textContent = '';
    startTime = new Date().getTime();
    textToType.textContent = generateRandomText();
});

userInput.addEventListener('input', () => {
    const typedText = userInput.value;
    if (typedText === textToType.textContent) {
        endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;
        const wordsTyped = typedText.split(' ').length;
        const speed = Math.round((wordsTyped / timeTaken) * 60);
        result.textContent = `Your typing speed is ${speed} words per minute!`;
        userInput.disabled = true;
    }
});

resetButton.addEventListener('click', () => {
    userInput.value = '';
    result.textContent = '';
    userInput.disabled = true;
    textToType.textContent = 'Type this text as fast as you can!';
});

function generateRandomText() {
    const texts = [
        "The quick brown fox jumps over the lazy dog.",
        "A journey of a thousand miles begins with a single step.",
        "To be or not to be, that is the question.",
        "All that glitters is not gold.",
        "In the middle of difficulty lies opportunity."
    ];
    return texts[Math.floor(Math.random() * texts.length)];
}
