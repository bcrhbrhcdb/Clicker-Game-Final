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