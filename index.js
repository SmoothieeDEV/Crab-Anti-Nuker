import { Player, world } from "mojang-minecraft";


const log = {};


const byPassTag = "staff";

world.events.blockBreak.subscribe(
  ({ block, brokenBlockPermutation, dimension, player }) => {
    const old = log[player.name];
    log[player.name] = Date.now();
    if (old < Date.now() - 50 || player.hasTag(byPassTag)) return;
    dimension
      .getBlock(block.location)
      .setPermutation(brokenBlockPermutation.clone());
    dimension
      .getEntitiesAtBlockLocation(block.location)
      .filter((entity) => entity.id === "minecraft:item")
      .forEach((item) => item.kill());
  }
);

world.events.playerLeave.subscribe((data) => delete log[data.playerName]);
