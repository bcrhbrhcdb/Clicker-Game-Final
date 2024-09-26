// Define upgrade types
export const upgradeTypes = {
    CLICK: 'click',
    PASSIVE: 'passive',
    MULTIPLIER: 'multiplier',
    SPECIAL: 'special',
    ONETIME: 'oneTime', // Added for clarity
    INCREASEPASSIVE: 'increasePassive' // Fixed casing for consistency
};

// Define upgrades
export const upgrades = [
    {
        id: 1,
        name: "Faster Clicks",
        description: "Increases clicks from clicking by 0.5",
        cost: 35,
        multiplyCost: 1.23,
        amount: 0,
        visible: false,
        type: upgradeTypes.CLICK,
        effect: {
            clickValue: 0.5 // Additional value added to each click
        }
    },
    {
        id: 2,
        name: "Auto Clicker",
        description: "Automatically clicks 0.2 per second",
        cost: 100,
        multiplyCost: 1.4,
        amount: 0,
        visible: false,
        type: upgradeTypes.PASSIVE,
        effect: {
            autoClicksPerSecond: 0.2 // Adds to auto-clicks per second
        }
    },
    {
        id: 3,
        name: "Double Trouble",
        description: "Doubles the additional clicks you get from clicking and from upgrades.",
        cost: 1000,
        multiplyCost: 1.23, // Adjusted to be a reasonable multiplier
        amount: 0,
        visible: false,
        type: upgradeTypes.MULTIPLIER,
        effect: {
            clickMultiplier: 2 // Doubles the additional click value
        }
    },
    {
        id: 4,
        name: "Golden Touch",
        description: "5% chance of getting an additional click, at 10X strength.",
        cost: 10000,
        multiplyCost: 1.40,
        amount: 0,
        visible: false,
        type: upgradeTypes.SPECIAL,
        effect: {
            goldenClickChance: 0.05, // Chance to activate
            goldenClickMultiplier: 10 // Multiplier for golden click
       }
    },
    {
       id: 5, 
       name: "Better Auto-Click",
       description: "Doubles Auto Clicker Speed",
       cost: 1000,
       multiplyCost: 123,
       amount: 0,
       visible: false,
       type: upgradeTypes.INCREASEPASSIVE,
       effect: {
           autoClickMultiplier: 2      
       }
   },
   {
       id: 6, // Added a one-time upgrade example
       name: "One-Time Upgrade",
       description: "This upgrade can only be purchased once.",
       cost: 5000,
       multiplyCost: 1.5, 
       amount: 0, 
       visible: false, 
       type: upgradeTypes.ONETIME, 
       effect:{
           clickValueBonus : 5 // Example effect for one-time upgrade
       }
   }
];
