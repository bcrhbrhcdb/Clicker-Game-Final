import { gameStats } from "./gameStats.js";
import { upgrades } from "./upgrades.js";
import { displayUpgrade } from "./upgradeFunctions.js"; 

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
        const { gameStats : loadedGameStats, upgrades : loadedUpgrades } = JSON.parse(savedData);
        
        // Load game stats
        Object.assign(gameStats, loadedGameStats);
        
        // Load upgrades
        loadedUpgrades.forEach((loadedUpgrade) => {
            const upgrade = upgrades.find(u => u.id === loadedUpgrade.id);
            if (upgrade) {
                // Update each property accordingly.
                Object.assign(upgrade, loadedUpgrade);
                
                // If the upgraded is visible, display it.
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
   // Reset game stats.
   Object.assign(gameStats, { 
       clicks :0 , 
       totalClicks :0 , 
       amountPerClick :1 , 
       autoClicksPerSecond :0 , 
       clickMultiplier :1 , 
       goldenClickChance :0 , 
       goldenClickMultiplier :1 ,
       amountOfUpgrades :0 
   });

   // Reset upgrades.
   upgrades.forEach(upgrade => {
       Object.assign(upgrade, { amount :0 , cost : Math.floor(upgrade.cost / upgrade.multiplyCost), visible : false });
   });

   // Clear saved data from localStorage.
   localStorage.removeItem('clickerGameSave');

   console.log('Game has been reset!');
}