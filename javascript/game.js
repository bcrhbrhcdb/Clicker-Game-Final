import { upgrades } from "./upgrades.js";
import { gameStats } from "./gameStats.js";
import { checkUpgrades, purchaseUpgrade, updateUpgradeDisplay } from "./upgradeFunctions.js";
import { saveGame, loadGame } from "./saveGame.js"; // Import the save/load functions

// DOM elements
const clicker = document.getElementById("clickButton");
const amountPerClickText = document.getElementById("amountPerClick");
const totalClicksDisplay = document.getElementById("totalClicks");
const clicksDisplay = document.getElementById("clicks");
const cpsDisplay = document.getElementById("cps");
const upgradeContainer = document.getElementById("upgradeContainer");

// Load game on startup
loadGame(); // Call loadGame here

// Click function
clicker.addEventListener('click', () => {
    gameStats.clicks += gameStats.amountPerClick;
    gameStats.totalClicks += gameStats.amountPerClick;
    updateDisplay();
    checkUpgrades(gameStats.totalClicks, upgrades, upgradeContainer, (id) => purchaseUpgrade(id, upgrades));
    
    // Save the game after each click
    saveGame();
});

// Update display function
function updateDisplay() {
    clicksDisplay.textContent = Math.floor(gameStats.clicks);
    totalClicksDisplay.textContent = Math.floor(gameStats.totalClicks);
    amountPerClickText.textContent = gameStats.amountPerClick.toFixed(1);
    cpsDisplay.textContent = gameStats.autoClicksPerSecond.toFixed(1);
}

// Initial display update and upgrade check
updateDisplay();
checkUpgrades(gameStats.totalClicks, upgrades, upgradeContainer, (id) => purchaseUpgrade(id, upgrades));

// Auto-click function
setInterval(() => {
    if (gameStats.autoClicksPerSecond > 0) {
        gameStats.clicks += gameStats.autoClicksPerSecond;
        gameStats.totalClicks += gameStats.autoClicksPerSecond;
        updateDisplay();
        checkUpgrades(gameStats.totalClicks, upgrades, upgradeContainer, (id) => purchaseUpgrade(id, upgrades));
        
        // Save the game after each auto-click
        saveGame();
    }
}, 1000);

// Golden click chance
clicker.addEventListener('click', () => {
    if (Math.random() < gameStats.goldenClickChance) {
        const goldenClickValue = gameStats.amountPerClick * gameStats.goldenClickMultiplier;
        gameStats.clicks += goldenClickValue;
        gameStats.totalClicks += goldenClickValue;
        console.log(`Golden Click! Earned ${goldenClickValue} clicks!`);
        updateDisplay();
        
        // Save the game after a golden click
        saveGame();
    }
});

// Event delegation for upgrade purchases
upgradeContainer.addEventListener('click', (event) => {
    const upgradeButton = event.target.closest('.upgrade-button');
    if (upgradeButton) {
        const upgradeId = parseInt(upgradeButton.id.split('-')[1]);
        const purchaseSuccessful = purchaseUpgrade(upgradeId, upgrades);
        
        // Always update the display after trying to purchase an upgrade
        updateDisplay(); 
        upgrades.forEach(upgrade => updateUpgradeDisplay(upgrade));
        
        // Save the game after an attempt to purchase an upgrade
        saveGame();
        
        if (!purchaseSuccessful) {
            console.log(`Not enough clicks to purchase upgrade: ${upgrades[upgradeId - 1].name}`);
        }
    }
});

export { gameStats };