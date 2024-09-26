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
        cost: 200,
        multiplyCost: 1.23,
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
       cost: 275,
       multiplyCost: 1.4,
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
       description: "You double the amount of clicks you get from upgrades, and your current amount per click.",
       cost: 1000,
       multiplyCost: 100,
       amount: 0,
       visible: false,
       type: upgradeTypes.MULTIPLIER,
       effect: {
           clickMultiplier: 2 // This will double the click value when applied.
       }
   },
   {
       id: 4,
       name: "Golden Touch",
       description: "40% chance of getting 10x click value",
       cost: 200,
       multiplyCost: 1.40,
       amount: 0,
       visible: false,
       type: upgradeTypes.SPECIAL,
       effect: {
           goldenClickChance: 0.40, // Changed to match description.
           goldenClickMultiplier: 10
       }
   }
];