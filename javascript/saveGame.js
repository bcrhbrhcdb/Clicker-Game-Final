import { gameStats } from "./gameStats.js";
import { upgrades } from "./upgrades.js";
import { displayUpgrade } from "./upgradeFunctions.js"; // Import displayUpgrade function

export function saveGame() {
    const saveData = {
        gameStats,
        upgrades
    };
    localStorage.setItem('clickerGameSave', JSON.stringify(saveData));
    console.log('Game saved!');
}

export function loadGame() {
    const savedData = localStorage.getItem('clickerGameSave');
    if (savedData) {
        const { gameStats: loadedGameStats, upgrades: loadedUpgrades } = JSON.parse(savedData);
        
        // Load game stats
        Object.assign(gameStats, loadedGameStats);
        
        // Load upgrades
        loadedUpgrades.forEach((loadedUpgrade) => {
            const upgrade = upgrades.find(u => u.id === loadedUpgrade.id);
            if (upgrade) {
                upgrade.amount = loadedUpgrade.amount;
                upgrade.cost = loadedUpgrade.cost; // Ensure cost is updated
                upgrade.visible = loadedUpgrade.visible; // Ensure visibility is updated
                
                // If the upgrade is visible, display it
                if (upgrade.visible) {
                    displayUpgrade(upgrade, document.getElementById("upgradeContainer"), (id) => purchaseUpgrade(id, upgrades));
                }
            }
        });

        console.log('Game loaded!');
    } else {
        console.log('No saved game found.');
    }
}

export function resetGame() {
    // Reset game stats
    gameStats.clicks = 0;
    gameStats.totalClicks = 0;
    gameStats.amountPerClick = 1;
    gameStats.autoClicksPerSecond = 0;
    gameStats.clickMultiplier = 1;
    gameStats.goldenClickChance = 0;
    gameStats.goldenClickMultiplier = 1;
    gameStats.amountOfUpgrades = 0;

    // Reset upgrades
    upgrades.forEach(upgrade => {
        upgrade.amount = 0;
        upgrade.cost = Math.floor(upgrade.cost / upgrade.multiplyCost); // Reset cost to initial value
        upgrade.visible = false; // Hide all upgrades
    });

    // Clear saved data from localStorage
    localStorage.removeItem('clickerGameSave');

    console.log('Game has been reset!');
}