import { upgradeTypes } from "./upgrades.js";
import { gameStats } from "./gameStats.js";

// Function to display an upgrade in the UI.
export function displayUpgrade(upgrade, upgradeContainer, purchaseFunction) {
    const upgradeElement = document.createElement('button');
    upgradeElement.id = `upgrade-${upgrade.id}`;
    upgradeElement.className = 'upgrade-button';
    
    upgradeElement.innerHTML = `
        <h3>${upgrade.name}</h3>
        <p>${upgrade.description}</p>
        <p>Cost : ${upgrade.cost} clicks</p>
        <p>Owned : ${upgrade.amount}</p>
    `;
    
    // Disable button if it's a one-time purchase and already purchased
    if (upgrade.type === upgradeTypes.ONETIME && upgrade.amount > 0) {
      upgradeElement.disabled = true; 
      upgradeElement.innerHTML += `<p>This upgrade has already been purchased.</p>`;
    }

    upgradeContainer.appendChild(upgradeElement);
    
    // Add event listener for purchasing the upgrade
    upgradeElement.addEventListener('click', () => purchaseFunction(upgrade.id));
    
    console.log(`Displaying upgrade : ${upgrade.name}`);
}

// Function to check available upgrades based on total clicks.
export function checkUpgrades(totalClicks, upgrades, upgradeContainer, purchaseFunction) {
    upgrades.forEach(upgrade => {
        if (totalClicks >= upgrade.cost && !upgrade.visible) {
            upgrade.visible = true;
            displayUpgrade(upgrade, upgradeContainer, purchaseFunction);
            console.log(`Upgrade "${upgrade.name}" is now available!`);
        }
    });
}

// Function to purchase an upgrade.
export function purchaseUpgrade(upgradeId, upgrades) {
    const upgrade = upgrades.find(u => u.id === upgradeId);
    
    if (upgrade && gameStats.clicks >= upgrade.cost) {

      // Check if it's a one-time purchase and already owned
      if (upgrade.type === upgradeTypes.ONETIME && upgrade.amount >= 1) {
          console.log(`Already purchased the one-time upgrade : ${upgrade.name}`);
          return false; // Prevent further purchases of this one-time upgrade
      }

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
      console.log(`Purchased upgrade : ${upgrade.name}`);
      
      return true; // Indicate successful purchase
      
   } else {
      console.log(`Not enough clicks to purchase the following Upgrade : ${upgrades[upgradeId - 1].name}`);
      return false; // Indicate failed purchase
   }
}

// Function to apply effects of an upgraded.
export function applyUpgradeEffect(upgrade) {
    switch (upgrade.type) {
        
         case upgradeTypes.CLICK:
             gameStats.amountPerClick += upgrade.effect.clickValue; 
             break;
             
         case upgradeTypes.PASSIVE:
             gameStats.autoClicksPerSecond += upgrade.effect.autoClicksPerSecond; 
             break;

         case upgradeTypes.INCREASEPASSIVE:
             gameStats.autoClickMultiplier *= upgrade.effect.autoClickMultiplier;
             break;

         case upgradeTypes.MULTIPLIER:
             gameStats.amountPerClick *= upgrade.effect.clickMultiplier; 
             break;
             
         case upgradeTypes.SPECIAL:
             gameStats.goldenClickChance = Math.min(gameStats.goldenClickChance + (upgrade.effect.goldenClickChance || 0), .99); 
             gameStats.goldenClickMultiplier = Math.min(gameStats.goldenClickMultiplier * (upgrade.effect.goldenClickMultiplier || 1), .99); 
             break;
             
         case upgradeTypes.ONETIME:
             gameStats.amountPerClick += (upgrade.effect.clickValueBonus || 0); 
             break;
     }
}

// Function to update the UI for an upgraded.
export function updateUpgradeDisplay(upgrade) {
     const upgradeElement = document.getElementById(`upgrade-${upgrade.id}`);
     
     if (upgradeElement) {
          if (upgrade.type === upgradeTypes.ONETIME && upgrade.amount > 0) {
              return; // Do not update display for one-time purchases that are already owned.
          }
          // Update cost and owned amount in UI  
          upgradeElement.querySelector('p:nth-child(3)').textContent = `Cost : ${upgrade.cost} clicks`;  
          upgradeElement.querySelector('p:nth-child(4)').textContent = `Owned : ${upgrade.amount}`;  
     }
}