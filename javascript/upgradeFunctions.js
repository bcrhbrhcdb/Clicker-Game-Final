import { upgradeTypes } from "./upgrades.js";
import { gameStats } from "./gameStats.js";

export function displayUpgrade(upgrade, upgradeContainer, purchaseFunction) {
    const upgradeElement = document.createElement('button');
    upgradeElement.id = `upgrade-${upgrade.id}`;
    upgradeElement.className = 'upgrade-button';
    upgradeElement.innerHTML = `
        <h3>${upgrade.name}</h3>
        <p>${upgrade.description}</p>
        <p>Cost: ${upgrade.cost} clicks</p>
        <p>Owned: ${upgrade.amount}</p>
    `;
    upgradeContainer.appendChild(upgradeElement);
    upgradeElement.addEventListener('click', () => purchaseFunction(upgrade.id));
    console.log(`Displaying upgrade: ${upgrade.name}`);
}

export function checkUpgrades(totalClicks, upgrades, upgradeContainer, purchaseFunction) {
    upgrades.forEach(upgrade => {
        if (totalClicks >= upgrade.cost && !upgrade.visible) {
            upgrade.visible = true;
            displayUpgrade(upgrade, upgradeContainer, purchaseFunction);
            console.log(`Upgrade "${upgrade.name}" is now available!`);
        }
    });
}

export function purchaseUpgrade(upgradeId, upgrades) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    
    if (upgrade && gameStats.clicks >= upgrade.cost) {
        // Deduct cost and increment owned amount
        gameStats.clicks -= upgrade.cost; 
        upgrade.amount++;
        
        // Increment the total number of upgrades purchased
        gameStats.amountOfUpgrades++; 
        
        // Update cost for next purchase
        upgrade.cost = Math.floor(upgrade.cost * upgrade.multiplyCost); 
        
        // Apply effect of the purchased upgrade
        applyUpgradeEffect(upgrade); 
        
        // Update UI for the purchased upgrade
        updateUpgradeDisplay(upgrade); 
        console.log(`Purchased upgrade: ${upgrade.name}`);
        
        return true; // Indicate successful purchase
    } else {
        console.log(`Not enough clicks to purchase upgrade: ${upgrade.name}`);
        
        return false; // Indicate failed purchase
    }
}

export function applyUpgradeEffect(upgrade) {
    switch (upgrade.type) {
        case upgradeTypes.CLICK:
            // Update amount per click directly
            gameStats.amountPerClick += upgrade.effect.clickValue; 
            break;
        case upgradeTypes.PASSIVE:
            // Ensure this adds correctly to auto-clicks per second
            gameStats.autoClicksPerSecond += upgrade.effect.autoClicksPerSecond; 
            break;
        case upgradeTypes.MULTIPLIER:
            // Apply multiplier effect properly
            gameStats.amountPerClick *= upgrade.effect.clickMultiplier; 
            break;
        case upgradeTypes.SPECIAL:
            // Special effects for golden click chance etc.
            gameStats.goldenClickChance = upgrade.effect.goldenClickChance; 
            gameStats.goldenClickMultiplier = upgrade.effect.goldenClickMultiplier; 
            break;
    }
}

export function updateUpgradeDisplay(upgrade) {
    const upgradeElement = document.getElementById(`upgrade-${upgrade.id}`);
    
    if (upgradeElement) {
        // Update cost and owned amount in UI
        upgradeElement.querySelector('p:nth-child(3)').textContent = `Cost: ${upgrade.cost} clicks`; 
        upgradeElement.querySelector('p:nth-child(4)').textContent = `Owned: ${upgrade.amount}`; 
    }
}