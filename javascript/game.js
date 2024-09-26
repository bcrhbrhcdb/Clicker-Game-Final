import { upgrades } from "./upgrades.js";
import { gameStats } from "./gameStats.js";

const clicker = document.getElementById("clickButton");
const amountPerClickText = document.getElementById("amountPerClick");
const totalClicksDisplay = document.getElementById("totalClicks");
const clicksDisplay = document.getElementById("clicks");

// Click function
clicker.addEventListener('click', () => {
    gameStats.clicks += gameStats.amountPerClick;
    gameStats.totalClicks += gameStats.amountPerClick;
    clicksDisplay.textContent = gameStats.clicks;
    totalClicksDisplay.textContent = gameStats.totalClicks;
    console.log(`Total Clicks: ${gameStats.totalClicks} | Current Clicks: ${gameStats.clicks}`);
});

// Initial display update
clicksDisplay.textContent = gameStats.clicks;
totalClicksDisplay.textContent = gameStats.totalClicks;
amountPerClickText.textContent = gameStats.amountPerClick;

export { gameStats };