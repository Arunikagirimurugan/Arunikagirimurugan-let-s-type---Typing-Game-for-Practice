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
    const randomText = generateRandomText();
    textToType.innerHTML = randomText;
    highlightText(randomText); // Highlight the text at the beginning
});

userInput.addEventListener('input', () => {
    const typedText = userInput.value;
    let correctCount = 0;
    const spans = textToType.querySelectorAll('span');

    // Loop through the typed text and highlight accordingly
    for (let i = 0; i < typedText.length; i++) {
        if (spans[i]) {
            if (typedText[i] === spans[i].textContent) {
                spans[i].style.color = '#4a90e2'; // Correct letter color
                spans[i].style.backgroundColor = 'transparent';
                correctCount++;
            } else {
                spans[i].style.color = '#e94e77'; // Incorrect letter color
                spans[i].style.backgroundColor = 'rgba(233, 78, 119, 0.2)'; // Highlight incorrect letters
            }
        }
    }

    // Check if all letters are typed correctly
    if (correctCount === typedText.length && typedText === textToType.textContent) {
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
    textToType.innerHTML = 'Type this text as fast as you can!';
    highlightText('Type this text as fast as you can!'); // Reset and highlight the default sentence
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

// Function to highlight each character (including spaces)
function highlightText(text) {
    const spanText = text.split('').map(char => {
        // Check if the character is a space, and wrap it in a span
        return char === ' ' ? '<span class="space"> </span>' : `<span>${char}</span>`;
    }).join('');
    textToType.innerHTML = spanText;
}
