export const upgradeTypes = {
    CLICK: 'click',
    PASSIVE: 'passive',
    MULTIPLIER: 'multiplier',
    SPECIAL: 'special'
};

export const upgrades = [
    {
        id: 1,
        name: "Faster Clicks",
        description: "Increases click value by 1",
        cost: 10,
        multiplyCost: 1.10,
        amount: 0,
        visible: false,
        type: upgradeTypes.CLICK,
        effect: {
            clickValue: 1
        }
    },
    {
        id: 2,
        name: "Auto Clicker",
        description: "Automatically clicks once per second",
        cost: 50,
        multiplyCost: 1.10,
        amount: 0,
        visible: false,
        type: upgradeTypes.PASSIVE,
        effect: {
            autoClicksPerSecond: 1
        }
    },
    {
        id: 3,
        name: "Double Trouble",
        description: "Doubles all click values",
        cost: 100,
        multiplyCost: 1.10,
        amount: 0,
        visible: false,
        type: upgradeTypes.MULTIPLIER,
        effect: {
            clickMultiplier: 2
        }
    },
    {
        id: 4,
        name: "Golden Touch",
        description: "1% chance of getting 10x click value",
        cost: 200,
        multiplyCost: 1.10,
        amount: 0,
        visible: false,
        type: upgradeTypes.SPECIAL,
        effect: {
            goldenClickChance: 0.01,
            goldenClickMultiplier: 10
       }
   }
];