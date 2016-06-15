#! /usr/bin/env node
const fs = require('fs');
const rawData = require('../data/raw.json');
const whitelist = [
  '722316985449c73c810008d22ef165ed', // Gurten Trail
  '6c79a0896f66cf05c1b608d22ef16648', // Lenzerheide Bikepark
  '8bbe7a17958ec2ba230f08d22ef165fe', // Biel Trail
  '74f6a0fbaafcc1e053a108d22ef164e9', // Flims Laax Falera
  'c6ac05868945ccf0334e08d22ef164a4', // Crans Montana Bikepark
  '257266f0e714cced285808d22ef1651a', // Portes du Soleil: Châtel
  'cc2e18c427c7c86740fc08d22ef165f9', // Lac Blanc
  'f4664a69a685cd4ad6f008d22ef164f5', // Uetliberg Trail (Antennentrail)
  'e1569db0cdc7c52910b908d22ef16623', // Wiriehorn Downhill Hot-Trail
  '5b78710326efc8517fbc08d22ef164c1', // Bellwald
  'dec913ac8b49c37d86dc08d22ef165ce', // Portes du Soleil: Champéry, Les Crosets, Morgins
  'bfd214f0f2fccce6e03608d22ef16708', // Gotschna Freeride - Bündner A-Line Klosters Davos
  'ffaa1caa8752c0f0958c08d22ef1669f', // Todtnau
  '4369acf598e3c28fd1a608d22ef165d9', // Mottolino Bikepark Livigno
  '4edd2ebc0d34c87cc0b508d22ef166cc', // Alpenbikepark Chur
  '1c3dec24cdc7cb234c5508d22ef166d5', // Monte Tamaro
  '9b0fd91c8df5c7197bc708d22ef166a2', // Runcatrail
  'e8e317a239d6c6ff7fdf08d22ef166cf', // Chaumont - Neuchâtel
  '6eddb773b3feccb4e35a08d22ef1651e', // Bikepark Leogang
  '1ab04b4537b6cd0c2f1908d22ef16741', // Finale Ligure
  '3c9f9e43fb6ac8327a0f08d22ef16453', // Gigeliwald Trail Luzern
  '18c4fad0f6f0c7df8cc808d22ef16580', // Verbier Bikepark
  'ea83f80f0891cc23537108d22ef16576', // Gempen Trails
  'afb911d10221c0db4dc508d22ef16508', // Portes du Soleil: Les Gets
  'b00a738dd44cc08b7ae108d22ef1645c', // Biketrail Schwanden-Brienz/ IG Bergvelo
  'd435e148c075caac20f808d22ef164c9', // Elif-Trail
  '4f0a7d5820e4c0bec5ab08d22ef16467', // Zürichberg Pumptrack
  '85649f0191aecb92996508d22ef16788', // Freeridetrail Rufiberg/Arth
  'f46f168c4c6cce60235208d22ef167ae', // Hombergegg
  '8786d8cfab0cccdb93c908d22ef166eb', // Hoch-Ybrig
  '8910542f1fa2c58328ea08d22ef165df', // Arosa Hörnli
  '5a734b0f6a10c81c107a08d22ef166df', // St. Chrischona FR/NS
  'e7c3dc86155dc588f79208d22ef1644f', // Bikepark Winterberg
  '5f62c8776b39c3c8dca008d22ef167cf', // Haldi
  '4a6bda6dcf99c1bbef0608d22ef1677b', // Funpark Steffisburg
  'bd56742b09a6c766406a08d22ef16534', // Saalbach Hinterglemm
  '8de85f023d79cdec804e08d22ef16586', // Dirtpark Schiesskanal
  '84202d5266e5c152090a08d22ef166bd', // Wurzelweg
  '968b3b5b436fc6b67c8808d22ef166da', // Bad Wildbad
];

let data = rawData.filter(el => el.conditionEstimation !== 0 || el.headerImage !== null || whitelist.includes(el.id));
let rated = data.map(el => {
  el.conditionEstimation = Math.floor(Math.random() * 5);
  let a = Math.floor(Math.random() * 5) + 1;
  let b = Math.random();
  let c = b > 0.5 ? 5 : 0;
  let d = `${a}.${c}`;

  el.ratingValue = parseFloat(d);

  return el;
});

fs.writeFileSync('../data/filtered.json', JSON.stringify(data));


console.log('Raw Length: ' + rawData.length);
console.log('Filtered Length: ' + data.length);