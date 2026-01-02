export const ITEM_TIERS = {
  1: { name: 'Common', chance: 0.40, color: '#A0A0A0' },
  2: { name: 'Uncommon', chance: 0.20, color: '#33CC33' },
  3: { name: 'Rare', chance: 0.12, color: '#3366FF' },
  4: { name: 'Epic', chance: 0.08, color: '#CC33CC' },
  5: { name: 'Ultra Epic', chance: 0.06, color: '#FF3300' },
  6: { name: 'Legendary', chance: 0.04, color: '#FFD700' },
  7: { name: 'Mythic', chance: 0.03, color: '#00FFFF' },
  8: { name: 'Celestial', chance: 0.02, color: '#FF00FF' },
  9: { name: 'Cosmic', chance: 0.015, color: '#9932CC' },
  10: { name: 'Divine', chance: 0.005, color: '#FFFFFF' }
};

export const ITEMS_LIST = [
  // Tier 1
  { id: 't1_1', tier: 1, name: 'Matte Black Sphere' }, { id: 't1_2', tier: 1, name: 'Brushed Steel Circle' },
  { id: 't1_3', tier: 1, name: 'Concrete Block' }, { id: 't1_4', tier: 1, name: 'Aged Parchment Square' },
  { id: 't1_5', tier: 1, name: 'Burlap Sack Texture' }, { id: 't1_6', tier: 1, name: 'Rusted Metal Plate' },
  { id: 't1_7', tier: 1, name: 'Caution Stripe Pattern' }, { id: 't1_8', tier: 1, name: 'Carbon Fiber Weave' },
  { id: 't1_9', tier: 1, name: 'Denim Patch' }, { id: 't1_10', tier: 1, name: 'Leather Swatch' },
  { id: 't1_11', tier: 1, name: 'Cracked Mud' }, { id: 't1_12', tier: 1, name: 'Mossy Rock' },
  { id: 't1_13', tier: 1, name: 'Water Droplet' }, { id: 't1_14', tier: 1, name: 'Ember Glow' },
  { id: 't1_15', tier: 1, name: 'Ice Cube' }, { id: 't1_16', tier: 1, name: 'Slime Splat' },
  { id: 't1_17', tier: 1, name: 'Oil Slick' }, { id: 't1_18', tier: 1, name: 'Chalk Sketch X' },
  { id: 't1_19', tier: 1, name: 'Spray Paint Dot' }, { id: 't1_20', tier: 1, name: 'Pixel Noise' },
  { id: 't1_21', tier: 1, name: 'Glass Shard' }, { id: 't1_22', tier: 1, name: 'Twisted Wire' },
  { id: 't1_23', tier: 1, name: 'Bolt Head' }, { id: 't1_24', tier: 1, name: 'Gear Cog' },
  { id: 't1_25', tier: 1, name: 'Chain Link' }, { id: 't1_26', tier: 1, name: 'Rope Knot' },
  { id: 't1_27', tier: 1, name: 'Bandage Wrap' }, { id: 't1_28', tier: 1, name: 'Duct Tape Patch' },
  { id: 't1_29', tier: 1, name: 'Cardboard Piece' }, { id: 't1_30', tier: 1, name: 'Burnt Wood' },
  { id: 't1_31', tier: 1, name: 'Ash Pile' }, { id: 't1_32', tier: 1, name: 'Sand Dune' },
  { id: 't1_33', tier: 1, name: 'Pebble Stack' }, { id: 't1_34', tier: 1, name: 'Leaf Skeleton' },
  { id: 't1_35', tier: 1, name: 'Pinecone' }, { id: 't1_36', tier: 1, name: 'Acorn' },
  { id: 't1_37', tier: 1, name: 'Mushroom Cap' }, { id: 't1_38', tier: 1, name: 'Fish Hook' },
  { id: 't1_39', tier: 1, name: 'Anchor Tattoo' }, { id: 't1_40', tier: 1, name: 'Compass Rose' },

  // Tier 2
  { id: 't2_1', tier: 2, name: '8-Ball' }, { id: 't2_2', tier: 2, name: 'Pair of Dice' },
  { id: 't2_3', tier: 2, name: 'Poker Chip' }, { id: 't2_4', tier: 2, name: 'Gold Coin' },
  { id: 't2_5', tier: 2, name: 'Silver Bullion' }, { id: 't2_6', tier: 2, name: 'Bronze Medal' },
  { id: 't2_7', tier: 2, name: 'Heavy Padlock' }, { id: 't2_8', tier: 2, name: 'Skeleton Key' },
  { id: 't2_9', tier: 2, name: 'Dynamite Stick' }, { id: 't2_10', tier: 2, name: 'Grenade' },
  { id: 't2_11', tier: 2, name: 'Kunai Knife' }, { id: 't2_12', tier: 2, name: 'Shuriken' },
  { id: 't2_13', tier: 2, name: 'Brass Knuckles' }, { id: 't2_14', tier: 2, name: 'Baseball Bat' },
  { id: 't2_15', tier: 2, name: 'Skateboard Wheel' }, { id: 't2_16', tier: 2, name: 'Spray Can' },
  { id: 't2_17', tier: 2, name: 'Cassette Tape' }, { id: 't2_18', tier: 2, name: 'Floppy Disk' },
  { id: 't2_19', tier: 2, name: 'VHS Tape' }, { id: 't2_20', tier: 2, name: 'Retro Game Cart' },
  { id: 't2_21', tier: 2, name: 'Arcade Joystick' }, { id: 't2_22', tier: 2, name: 'D-Pad' },
  { id: 't2_23', tier: 2, name: 'Mouse Cursor Hand' }, { id: 't2_24', tier: 2, name: 'Hourglass' },
  { id: 't2_25', tier: 2, name: 'Stopwatch' }, { id: 't2_26', tier: 2, name: 'Pocket Compass' },
  { id: 't2_27', tier: 2, name: 'Magnifying Glass' }, { id: 't2_28', tier: 2, name: 'Lightbulb' },
  { id: 't2_29', tier: 2, name: 'AA Battery' }, { id: 't2_30', tier: 2, name: 'Spark Plug' },

  // Tier 3
  { id: 't3_1', tier: 3, name: 'Neon Heart Outline' }, { id: 't3_2', tier: 3, name: 'Radioactive Glow' },
  { id: 't3_3', tier: 3, name: 'Biohazard Pulse' }, { id: 't3_4', tier: 3, name: 'Electric Bolt' },
  { id: 't3_5', tier: 3, name: 'Flame Icon' }, { id: 't3_6', tier: 3, name: 'Frozen Ice Crystal' },
  { id: 't3_7', tier: 3, name: 'Dripping Acid' }, { id: 't3_8', tier: 3, name: 'Plasma Orb' },
  { id: 't3_9', tier: 3, name: 'Laser Sight Dot' }, { id: 't3_10', tier: 3, name: 'Holographic Reticle' },
  { id: 't3_11', tier: 3, name: 'Radar Sweep' }, { id: 't3_12', tier: 3, name: 'Sonar Ping' },
  { id: 't3_13', tier: 3, name: 'WiFi Signal Strong' }, { id: 't3_14', tier: 3, name: 'Bluetooth Rune' },
  { id: 't3_15', tier: 3, name: 'NFC Tag' }, { id: 't3_16', tier: 3, name: 'QR Code Glitch' },
  { id: 't3_17', tier: 3, name: 'Barcode Scanner Beam' }, { id: 't3_18', tier: 3, name: 'Matrix Code Rain' },
  { id: 't3_19', tier: 3, name: 'Pixel Fire' }, { id: 't3_20', tier: 3, name: 'Low-Poly Skull' },

  // Tier 4
  { id: 't4_1', tier: 4, name: 'Vaporwave Sunset Circle' }, { id: 't4_2', tier: 4, name: 'Cyberpunk Kabuki Mask' },
  { id: 't4_3', tier: 4, name: 'Tactical Helmet NVG' }, { id: 't4_4', tier: 4, name: 'Gas Mask Filter' },
  { id: 't4_5', tier: 4, name: 'Plague Doctor Mask' }, { id: 't4_6', tier: 4, name: 'Ornate Viking Helmet' },
  { id: 't4_7', tier: 4, name: 'Futuristic Visor Shades' }, { id: 't4_8', tier: 4, name: 'Retro Raygun' },
  { id: 't4_9', tier: 4, name: 'Chrome Revolver' }, { id: 't4_10', tier: 4, name: 'Katana with Wrap' },
  { id: 't4_11', tier: 4, name: 'Energy Sword Hilt' }, { id: 't4_12', tier: 4, name: 'Hoverboard Deck' },
  { id: 't4_13', tier: 4, name: 'Jetpack Thruster' }, { id: 't4_14', tier: 4, name: 'Mechanical Arm' },
  { id: 't4_15', tier: 4, name: 'Cyborg Eye Implant' },

  // Tier 5
  { id: 't5_1', tier: 5, name: 'Dragon Head Breather' }, { id: 't5_2', tier: 5, name: 'Phoenix Rising Ash' },
  { id: 't5_3', tier: 5, name: 'Kraken Tentacle Ship' }, { id: 't5_4', tier: 5, name: 'Crystalline Golem Fist' },
  { id: 't5_5', tier: 5, name: 'Wizard Staff Orb' }, { id: 't5_6', tier: 5, name: 'Necromancer Skull Totem' },
  { id: 't5_7', tier: 5, name: 'Runic Lightning Hammer' }, { id: 't5_8', tier: 5, name: 'Energy Shield Emitter' },
  { id: 't5_9', tier: 5, name: 'Gravity Gauntlet' }, { id: 't5_10', tier: 5, name: 'Portal Gun Device' },
  { id: 't5_11', tier: 5, name: 'Time Machine Gadget' }, { id: 't5_12', tier: 5, name: 'Mini Black Hole Emitter' },
  { id: 't5_13', tier: 5, name: 'Orbital Strike Beacon' }, { id: 't5_14', tier: 5, name: 'Mech Suit Helmet' },
  { id: 't5_15', tier: 5, name: 'Alien Artifact Cube' },

  // Tier 6
  { id: 't6_1', tier: 6, name: 'Solid Diamond Skull' }, { id: 't6_2', tier: 6, name: 'Liquid Gold Drip' },
  { id: 't6_3', tier: 6, name: 'Iridescent Sphere' }, { id: 't6_4', tier: 6, name: 'Holographic Prism Shape' },
  { id: 't6_5', tier: 6, name: 'Vantablack Void Object' }, { id: 't6_6', tier: 6, name: 'Bioluminescent Creature' },
  { id: 't6_7', tier: 6, name: 'Celestial Clockwork' }, { id: 't6_8', tier: 6, name: 'Ancient Rune Stone' },
  { id: 't6_9', tier: 6, name: 'Cursed Artifact' }, { id: 't6_10', tier: 6, name: 'Divine Halo' },

  // Tier 7
  { id: 't7_1', tier: 7, name: 'The Singularity' }, { id: 't7_2', tier: 7, name: 'Tesseract Hypercube' },
  { id: 't7_3', tier: 7, name: 'Nebula Trapped in Glass' }, { id: 't7_4', tier: 7, name: 'Quantum Entanglement' },
  { id: 't7_5', tier: 7, name: 'Soul Lantern' }, { id: 't7_6', tier: 7, name: 'Concept of Entropy' },
  { id: 't7_7', tier: 7, name: 'Digital Ascension' }, { id: 't7_8', tier: 7, name: 'Zero-Point Energy' },
  { id: 't7_9', tier: 7, name: 'Antimatter Field' }, { id: 't7_10', tier: 7, name: 'Temporal Rift' },

  // Tier 8
  { id: 't8_1', tier: 8, name: 'Cosmic Horror Eye' }, { id: 't8_2', tier: 8, name: 'Biblically Accurate Angel' },
  { id: 't8_3', tier: 8, name: 'Golden Ratio Spiral' }, { id: 't8_4', tier: 8, name: 'Bottled Aurora' },
  { id: 't8_5', tier: 8, name: 'Supernova' },

  // Tier 9
  { id: 't9_1', tier: 9, name: "Schrödinger's Cat Box" }, { id: 't9_2', tier: 9, name: 'The Simulation Glitch' },
  { id: 't9_3', tier: 9, name: "The Architect's Hand" },

  // Tier 10
  { id: 't10_1', tier: 10, name: 'The Developer’s Grail' }, { id: 't10_2', tier: 10, name: 'The Ban Hammer' },
  { id: 't10_3', tier: 10, name: 'Kobe #24 Jersey' }, { id: 't10_4', tier: 10, name: 'Michael Jordan #23 Jersey' },
  { id: 't10_5', tier: 10, name: 'Golf Ball with Wings' }
];
