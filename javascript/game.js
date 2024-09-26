import { upgrades } from "./upgrades.js";
import { gameStats } from "./gameStats.js";
import { checkUpgrades, purchaseUpgrade } from "./upgradeFunctions.js";
import { saveGame, loadGame, resetGame } from "./saveGame.js"; 

// DOM elements setup.
const clicker = document.getElementById("clickButton");
const amountPerClickText = document.getElementById("amountPerClick");
const totalClicksDisplay = document.getElementById("totalClicks");
const clicksDisplay = document.getElementById("clicks");
const cpsDisplay = document.getElementById("cps");
const upgradeContainer = document.getElementById("upgradeContainer");
const resetButton = document.getElementById("resetGame"); 

// Load game on startup.
loadGame(); 

// Click function.
clicker.addEventListener('click', () => {
   let additionalClicks = gameStats.amountPerClick;

   // Check for Double Trouble effect.
   if (upgrades[2].amount > 0) { 
       additionalClicks *= upgrades[2].effect.clickMultiplier; 
   }

   // Regular click value application.
   gameStats.clicks += additionalClicks;
   gameStats.totalClicks += additionalClicks;

   // Check if Golden Touch is active.
   if (Math.random() < gameStats.goldenClickChance) {
       const goldenClickValue = additionalClicks * upgrades[3].effect.goldenClickMultiplier; 
       gameStats.clicks += goldenClickValue;
       gameStats.totalClicks += goldenClickValue;
       
       console.log(`Golden Click! Earned ${goldenClickValue} clicks!`);
   }

   updateDisplay();
   checkUpgrades(gameStats.totalClicks, upgrades, upgradeContainer, (id) => purchaseUpgrade(id, upgrades));
   
   saveGame();
});

// Update display function.
function updateDisplay() {
   clicksDisplay.textContent = Math.floor(gameStats.clicks);
   totalClicksDisplay.textContent = Math.floor(gameStats.totalClicks);
   amountPerClickText.textContent = gameStats.amountPerClick.toFixed(1);
   cpsDisplay.textContent = gameStats.autoClicksPerSecond.toFixed(1);
}

// Initial display update and check for available upgrades.
updateDisplay();
checkUpgrades(gameStats.totalClicks, upgrades, upgradeContainer, (id) => purchaseUpgrade(id, upgrades));

// Auto-click function to handle automatic clicking.
setInterval(() => {
   if (gameStats.autoClicksPerSecond > 0) {
       gameStats.clicks += gameStats.autoClicksPerSecond;
       gameStats.totalClicks += gameStats.autoClicksPerSecond;
       
       updateDisplay();
       
       checkUpgrades(gameStats.totalClicks, upgrades, upgradeContainer, (id) => purchaseUpgrade(id, upgrades));
       
       saveGame();
   }
}, 1000);

// Event delegation for handling purchases of upgrades.
upgradeContainer.addEventListener('click', (event) => {
   const upgradeButton = event.target.closest('.upgrade-button');
   
   if (upgradeButton) {
       const upgradeId = parseInt(upgradeButton.id.split('-')[1]);
       
       const purchaseSuccessful = purchaseUpgrade(upgradeId, upgrades);
       
       updateDisplay(); 
        
       saveGame();
       
       if (!purchaseSuccessful) {
           console.log(`Not enough clicks to purchase the following Upgrade : ${upgrades[upgradeId - 1].name}`);
       }
   }
});

// Reset Game Functionality with confirmation dialog.
resetButton.addEventListener('click', () => {
   const isConfirmed = confirm('Are you sure you want to reset the game? This action cannot be undone.');

   if (isConfirmed) {
       resetGame(); 
       alert('Your save was reset.');
       location.reload(); 
   } else {
       alert('Reset canceled.');
   }
});