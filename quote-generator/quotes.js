// Store elements on page to variables
const contentBox    = document.querySelector(".content");
const quoteBox      = contentBox.querySelector(".quote");
const authorBox     = contentBox.querySelector(".author");
const linkBtn       = contentBox.querySelector("button.link");
const tweetBtn      = contentBox.querySelector("a.tweet");
const newBtn        = contentBox.querySelector("button.new");

// Background colors
const colors = [
    'rgb(26, 188, 156)', 'rgb(46, 204, 113)', 'rgb(52, 152, 219)', 'rgb(155, 89, 182)', 'rgb(52, 73, 94)', 'rgb(241, 196, 15)', 'rgb(230, 126, 34)', 'rgb(231, 76, 60)', 'rgb(149, 165, 166)', 'rgb(127, 140, 141)', 'rgb(192, 57, 43)', 'rgb(211, 84, 0)', 'rgb(243, 156, 18)', 'rgb(22, 160, 133)', 'rgb(39, 174, 96)', 'rgb(41, 128, 185)', 'rgb(142, 68, 173)', 'rgb(27, 133, 184)', 'rgb(90, 82, 85)', 'rgb(85, 158, 131)', 'rgb(174, 90, 65)'
];

// Quotes API URL
const endpoint = 'https://crossorigin.me/https://talaikis.com/api/quotes/random/';
// Store the current quote object
let currentQuote;

// Fetch a new quote, check it's different, then pass it to processQuote
// If it's the same, get another quote
const newQuote = function () {
    fetch(endpoint)
        .then(blob => blob.json())
        .then(quote => {
            if (quote === currentQuote) {
                newQuote();
            } else {
                processQuote(quote);
            }
        });
};

// Update the elements on page with a new quote
function processQuote(q) {
    newColor();
    quoteBox.textContent = q.quote;
    authorBox.textContent = "~ " + q.author;
    currentQuote = q;
    tweetBtn.href = getTweetHref();
}

function getTweetHref() {
    const tweetPrefix = 'https://twitter.com/intent/tweet?hashtags=quotes&text=';
    // Note: tweet text may go over the 140char limit, but user can edit before sending
    return `${tweetPrefix}"${currentQuote.quote}" ~${currentQuote.author}`;
}

function newColor() {
    // Try to get a new colour until it's different
    const oldColor = document.body.style.background;
    let newColor = oldColor;
    while (newColor === oldColor) {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    }

    // Apply new colour everywhere it's needed
    document.body.style.background = newColor;
    quoteBox.style.color = newColor;
    authorBox.style.color = newColor;
}

// Load a quote when the page first loads
newQuote();

/* Event listeners */
newBtn.addEventListener("click", newQuote);

// Can also press Space for a new quote
document.addEventListener('keyup', e => e.code === "Space" && newQuote());
