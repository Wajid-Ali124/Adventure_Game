#! /usr/bin/env node

import inquirer from "inquirer";

//Game Vairables
let enemies = ["Skeleton", "Zombie", "Warrior", "Assassin"];
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;

//Player Variables

let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionHealAmount = 30;
let healthPotionDropChance = 50;

let running = true;

console.log("Welcome to the Dungeon!");

GAME: while (running) {
  console.log("--------------------------------------------------------");
  let enemyHealth = Math.ceil(Math.random() * maxEnemyHealth);
  let enemy = enemies[Math.floor(Math.random() * 4)];
  console.log(`\t# ${enemy} appeared! #\n`);

  while (enemyHealth > 0) {
    console.log(`\tYour HP: ${health}`);
    console.log(`\t${enemy}'s HP: ${enemyHealth}`);
    console.log(`\n\tWhat would you like to do?`);
    console.log(`\t1. Attack`);
    console.log(`\t2. Drink Health Potion`);
    console.log(`\t3. Run!`);

    let input = await inquirer.prompt({
      name: "option",
      message: "Your Choice: ",
      type: "number",
    });

    if (input.option === 1) {
      let damageDealt = Math.ceil(Math.random() * attackDamage);
      let damageTaken = Math.ceil(Math.random() * enemyAttackDamage);
      enemyHealth -= damageDealt;
      health -= damageTaken;

      console.log(`\t> You strike the ${enemy} for ${damageDealt} damage`);
      console.log(`\t> You receive ${damageTaken} in retaliation`);

      if (health < 1) {
        console.log("\t> You have taken too much damage, you are too weak to go on!");
        break;
      }
    } else if (input.option === 2) {
      if (numHealthPotions > 0) {
        health += healthPotionHealAmount;
        numHealthPotions--;
        console.log(`\t> You drink a health potion, healing yourself for ${healthPotionHealAmount}.
                                \n\t> You now have ${health} HP.
                                \n\t> You have ${numHealthPotions} health potions left.\n`);
      } else {
        console.log(`You have no health potion left! Defeat enemies for a chance to get one!\n`);
      }
    } else if (input.option == 3) {
      console.log(`\tYou run away from the ${enemy}!`);
      continue GAME;
    } else {
      console.log("\tInvalid Command!");
    }
  }

  if (health < 1) {
    console.log("You limp out of the dungeon, weak from battle");
    break;
  }

  console.log("--------------------------------------------------------");
  console.log(` # ${enemy} was defeated! #`);
  console.log(` # You have ${health} HP left. #`);
  if (Math.ceil(Math.random() * 100) < healthPotionDropChance) {
    numHealthPotions++;
    console.log(` # The ${enemy} dropped a health potion #`);
    console.log(` # You now have ${numHealthPotions} health potion's. #`);
  }
  console.log("--------------------------------------------------------");
  console.log(`What would you like to do now?`);
  console.log(`1. Continue fighting`);
  console.log(`2. Exit Dungeon`);

  let input = await inquirer.prompt({
    name: "option",
    type: "number",
    message: "Your Choice: ",
  });

  while (input.option !== 1 && input.option !== 2) {
    console.log(`Invalid command!`);
    input = await inquirer.prompt({
      name: "option",
      type: "number",
      message: "Your Choice: ",
    });
  }
  if (input.option === 1) {
    console.log("You continue on your adventure");
  } else if (input.option === 2) {
    console.log("You exit the dungeon, successful from your adventure!");
    break;
  }
}

console.log(" ######################");
console.log(" # THANKS FOR PLAYING #");
console.log(" ######################");
