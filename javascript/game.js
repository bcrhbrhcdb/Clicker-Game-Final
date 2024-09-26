import { upgrades } from "./upgrades.js";
import { gameStats } from "./gameStats.js";
import { checkUpgrades, purchaseUpgrade, updateUpgradeDisplay } from "./upgradeFunctions.js";
import { saveGame, loadGame, resetGame } from "./saveGame.js"; // Import the save/load/reset functions

// DOM elements
const clicker = document.getElementById("clickButton");
const amountPerClickText = document.getElementById("amountPerClick");
const totalClicksDisplay = document.getElementById("totalClicks");
const clicksDisplay = document.getElementById("clicks");
const cpsDisplay = document.getElementById("cps");
const upgradeContainer = document.getElementById("upgradeContainer");
const resetButton = document.getElementById("resetGame"); // Get reference to reset button

// Load game on startup
loadGame(); // Call loadGame here

// Click function
clicker.addEventListener('click', () => {
    let additionalClicks = gameStats.amountPerClick; // Base click value

    // Check for Double Trouble effect
    if (upgrades[2].amount > 0) { // Assuming Double Trouble is at index 2
        additionalClicks *= upgrades[2].effect.clickMultiplier; // Double the clicks if purchased
    }

    // Regular click value application
    gameStats.clicks += additionalClicks;
    gameStats.totalClicks += additionalClicks;

    // Check if Golden Touch is active
    if (Math.random() < gameStats.goldenClickChance) {
        const goldenClickValue = additionalClicks * upgrades[3].effect.goldenClickMultiplier; // Assuming Golden Touch is at index 3
        gameStats.clicks += goldenClickValue;
        gameStats.totalClicks += goldenClickValue;
        
        console.log(`Golden Click! Earned ${goldenClickValue} clicks!`);
    }

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

// Reset Game Functionality
resetButton.addEventListener('click', () => {
   const isConfirmed = confirm('Are you sure you want to reset the game? This action cannot be undone.');

   if (isConfirmed) {
       resetGame(); 
       alert('Your save was reset.');
       location.reload(); 
       //make sure their trash save is gone
       saveGame()
   } else {
       alert('Reset canceled.');
        //make sure their trash save is gone
       saveGame()
   }
});

// Exporting Game Stats for other modules.
export { gameStats };