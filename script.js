// Garden Club Dominator — multi-veggie prototype matching DESIGN.md

const VEGGIES = [
  { id: "kale", name: "Kale", unlockPlants: 0, firstCost: 5, baseCycle: 5, sellPrice: 1, unlocked: true },
  { id: "spinach", name: "Spinach", unlockPlants: 10, firstCost: 25, baseCycle: 20, sellPrice: 4, unlocked: false },
  { id: "beets", name: "Beets", unlockPlants: 10, firstCost: 200, baseCycle: 90, sellPrice: 20, unlocked: false },
  { id: "chard", name: "Swiss Chard", unlockPlants: 10, firstCost: 1500, baseCycle: 360, sellPrice: 100, unlocked: false },
  { id: "radishes", name: "Radishes", unlockPlants: 10, firstCost: 10000, baseCycle: 1200, sellPrice: 500, unlocked: false },
  { id: "carrots", name: "Carrots", unlockPlants: 10, firstCost: 75000, baseCycle: 3600, sellPrice: 2500, unlocked: false },
  { id: "broccoli", name: "Broccoli", unlockPlants: 10, firstCost: 500000, baseCycle: 10800, sellPrice: 15000, unlocked: false },
  { id: "peppers", name: "Bell Peppers", unlockPlants: 10, firstCost: 3500000, baseCycle: 21600, sellPrice: 80000, unlocked: false },
  { id: "tomatoes", name: "Heirloom Tomatoes", unlockPlants: 10, firstCost: 25000000, baseCycle: 43200, sellPrice: 500000, unlocked: false },
];

const NEIGHBORS = {
  kale:      { harvest: "Eager Neighbor Kid",      sell: "Kid with a Wagon",     speed: "Kale Growth Serum",        buy: "Allowance Kid" },
  spinach:   { harvest: "Garden Club Volunteer",   sell: "Stand Helper",         speed: "Spinach Turbo Soil",      buy: "Coupon Clipper" },
  beets:     { harvest: "Backyard Botanist",       sell: "Market Runner",        speed: "Beet Booster Blend",      buy: "Bargain Botanist" },
  chard:     { harvest: "Retired Horticulturist",  sell: "Chard Courier",        speed: "Chard Catalyst",          buy: "Cart Filler" },
  radishes:  { harvest: "Weekend Weeder",          sell: "Radish Runner",        speed: "Radish Rocket Fuel",      buy: "Row Shopper" },
  carrots:   { harvest: "Carrot Enthusiast",       sell: "Produce Porter",       speed: "Carrot Growth Cocktail",  buy: "Carrot Quartermaster" },
  broccoli:  { harvest: "Club Secretary",          sell: "Broccoli Broker",      speed: "Broccoli Boost",          buy: "Club Bookkeeper" },
  peppers:   { harvest: "Pepper Pro",              sell: "Pepper Packer",        speed: "Pepper Power Serum",      buy: "Pepper Purchaser" },
  tomatoes:  { harvest: "Master Gardener",         sell: "Tomato Tycoon",        speed: "Heirloom Hyper-Growth Formula", buy: "Tomato Treasurer" },
};

const ART = {
  kale: "art-kale.jpg",
  spinach: "art-spinach.jpg",
  beets: "art-beets.jpg",
  chard: "art-chard.jpg",
  radishes: "art-radish.jpg",
  carrots: "art-carrot.jpg",
  broccoli: "yendy-broccoli.jpg",
  peppers: "art-pepper.jpg",
  tomatoes: "art-tomato.jpg",
};

const NEIGHBOR_ART = {
  "Eager Neighbor Kid": "art-neighbor-eager-kid.jpg",
  "Kid with a Wagon": "art-neighbor-wagon.jpg",
  "Allowance Kid": "art-neighbor-allowance.jpg",
  "Garden Club Volunteer": "art-neighbor-volunteer.jpg",
  "Stand Helper": "art-neighbor-stand-helper.jpg",
  "Coupon Clipper": "art-neighbor-coupon.jpg",
  "Backyard Botanist": "art-neighbor-botanist.jpg",
  "Market Runner": "art-neighbor-market-runner.jpg",
  "Bargain Botanist": "art-neighbor-bargain.jpg",
  "Retired Horticulturist": "art-neighbor-horticulturist.jpg",
  "Chard Courier": "art-neighbor-courier.jpg",
  "Cart Filler": "art-neighbor-cart.jpg",
  "Weekend Weeder": "art-neighbor-weeder.jpg",
  "Radish Runner": "art-neighbor-radish-runner.jpg",
  "Row Shopper": "art-neighbor-row-shopper.jpg",
  "Carrot Enthusiast": "art-neighbor-enthusiast.jpg",
  "Produce Porter": "art-neighbor-porter.jpg",
  "Carrot Quartermaster": "art-neighbor-quartermaster.jpg",
  "Club Secretary": "art-neighbor-secretary.jpg",
  "Broccoli Broker": "art-neighbor-broker.jpg",
  "Club Bookkeeper": "art-neighbor-bookkeeper.jpg",
  "Pepper Pro": "art-neighbor-pepper-pro.jpg",
  "Pepper Packer": "art-neighbor-packer.jpg",
  "Pepper Purchaser": "art-neighbor-purchaser.jpg",
  "Master Gardener": "art-neighbor-master.jpg",
  "Tomato Tycoon": "art-neighbor-tycoon.jpg",
  "Tomato Treasurer": "art-neighbor-treasurer.jpg",
};

function portrait(src) {
  return src ? `<img class="portrait" src="${src}" alt="">` : "";
}

const PRESTIGE_UPS = [
  { id: "betterSoil", name: "Better Soil", cost: 1, desc: "×2 base harvest amount" },
  { id: "enrichedCompost", name: "Enriched Compost", cost: 1, desc: "×1.5 base cycle speed" },
  { id: "ongoingSupport", name: "Ongoing Support", cost: 2, desc: "Keep Auto-Harvest, Auto-Sell, and plant buyers through prestige" },
  { id: "perpetualWinner", name: "Perpetual Winner", cost: 3, desc: "×10 Supportive Neighbor accrual" },
  { id: "springInTheStep", name: "Spring in the Step", cost: 5, desc: "Plots start already planted after a prestige" },
  { id: "blueRibbon", name: "Blue Ribbon Soil", cost: 8, desc: "Another ×2 harvest, stacked with Better Soil" },
  { id: "familiarFaces", name: "Familiar Faces", cost: 12, desc: "Keep Generous speed levels through prestige" },
  { id: "standingOrder", name: "Standing Order", cost: 20, desc: "Keep Market upgrades through prestige" },
  { id: "shoppingList", name: "Shopping List", cost: 30, desc: "Unlock a plant buyer for each veggie" },
  { id: "committeeMinutes", name: "Committee Minutes", cost: 45, desc: "Auto-buy Helpful and Generous upgrades" },
  { id: "monthlyMeeting", name: "Monthly Meeting", cost: 60, desc: "Auto-prestige once a trophy minimum is set" },
  { id: "clubBylaws", name: "Club Bylaws", cost: 80, desc: "Set the auto-prestige trophy minimum and upgrade wait" },
];

const MARKET_UPS = [
  { id: "farmersMarket", key: "farmers-market", name: "Farmers Market Stand", cost: 1e6, gate: "beets", need: "Needs Beets", mult: 1.5, blurb: "+50% sell price for every veggie" },
  { id: "coopCooler", key: "coop-cooler", name: "Co-op Cooler", cost: 1e9, gate: "carrots", need: "Needs Carrots", mult: 1.5, blurb: "+50% sell price for every veggie" },
  { id: "wholesaleDock", key: "wholesale-dock", name: "Wholesale Dock", cost: 1e12, gate: "tomatoes", need: "Needs Heirloom Tomatoes", mult: 2, blurb: "×2 sell price for every veggie" },
  { id: "distributionHub", key: "distribution-hub", name: "Distribution Hub", cost: 1e15, gate: "prestige", need: "Needs 5 prestiges", mult: 2, blurb: "×2 sell price for every veggie" },
];

function buyNeighborCost(v) {
  return Math.floor(v.firstCost * 100);
}

function trophyLabel(n) {
  return `${n} ${n === 1 ? "trophy" : "trophies"}`;
}

function trophiesThisRun() {
  if (state.supportive < 1) return 0;
  return Math.max(1, Math.floor(Math.sqrt(state.supportive)));
}

function nextPrestigeUpgrade() {
  return PRESTIGE_UPS.find(p => !state.prestigeUpgrades[p.id]) || null;
}

function showFirstPrestige() {
  if (document.getElementById("yendy-overlay")) return;
  state.celebrating = true;
  const overlay = document.createElement("div");
  overlay.id = "yendy-overlay";
  const sparks = Array.from({ length: 10 }, (_, i) => `<span class="fw fw-${i}"></span>`).join("");
  overlay.innerHTML = `
    <div class="fw-layer">${sparks}</div>
    <div class="farm-sign">
      <div class="farm-post"></div>
      <div class="farm-sign-board">Congratulations! You have reached the first Prestige!</div>
      <div class="farm-post"></div>
    </div>`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.remove();
    state.celebrating = false;
  }, 5000);
}

function showYendy() {
  state.yendySpeed = true;
  if (document.getElementById("yendy-overlay")) return;
  state.celebrating = true;
  const overlay = document.createElement("div");
  overlay.id = "yendy-overlay";
  overlay.innerHTML = `
    <div class="yendy-card">
      <img src="yendy-broccoli.jpg" alt="" class="yendy-broccoli">
      <div class="yendy-sign">Yendy's Special Reward!!<span>+50% speed for every veggie</span></div>
    </div>`;
  document.body.appendChild(overlay);
  setTimeout(() => {
    overlay.remove();
    state.celebrating = false;
  }, 5000);
}

function cheapestCoinUpgrade() {
  let best = null;
  const consider = (cost, apply) => {
    if (state.coins < cost) return;
    if (!best || cost < best.cost) best = { cost, apply };
  };
  VEGGIES.forEach(v => {
    if (!v.unlocked) return;
    const plot = state.plots[v.id];
    const up = state.upgrades[v.id];
    const harvestCost = v.id === "kale" ? 100 : Math.floor(v.firstCost * 10);
    const sellCost = v.id === "kale" ? 500 : Math.floor(v.firstCost * 50);
    if (plot.plants >= 1 && !up.harvest) consider(harvestCost, () => { up.harvest = true; plot.autoHarvest = true; });
    if (plot.plants >= 10 && !up.sell) consider(sellCost, () => { up.sell = true; plot.autoSell = true; });
    if (state.prestigeUpgrades.shoppingList && up.harvest && !up.buy) {
      consider(buyNeighborCost(v), () => { up.buy = true; plot.autoBuy = true; });
    }
    const availableSpeed = Math.floor(plot.plants / 10);
    if (availableSpeed > up.speedBought) {
      const cost = Math.floor(v.firstCost * 500 * Math.pow(1.5, up.speedBought));
      consider(cost, () => { up.speedBought++; plot.speedLevels++; });
    }
  });
  const unlockedCount = VEGGIES.filter(v => v.unlocked).length;
  if (unlockedCount >= 3 && unlockedCount % 3 === 0) {
    const teaCost = Math.floor(25000 * Math.pow(1.5, state.globalSpeedLevels));
    consider(teaCost, () => {
      state.globalSpeed *= 1.25;
      state.globalSpeedLevels++;
      VEGGIES.forEach(v => {
        if (v.unlocked && !state.globalSpeedAffected.includes(v.id)) state.globalSpeedAffected.push(v.id);
      });
    });
  }
  return best;
}

function maybeAutoPrestige() {
  if (state.celebrating || !state.prestigeUpgrades.monthlyMeeting || state.autoPrestigeMin == null) return;
  if (state.supportive < 1) return;
  const earned = trophiesThisRun();
  if (earned < state.autoPrestigeMin) return;
  if (state.prestigeUpgrades.clubBylaws && state.waitForNextUpgrade) {
    const next = nextPrestigeUpgrade();
    if (next && state.trophies + earned < next.cost) return;
  }
  prestige();
}

function marketReady(m) {
  if (m.gate === "prestige") return state.prestigeCount >= 5;
  const veg = VEGGIES.find(v => v.id === m.gate);
  return !!veg?.unlocked;
}

const state = {
  coins: 0,
  supportive: 0,
  trophies: 0,
  prestigeUpgrades: {
    betterSoil: false,
    enrichedCompost: false,
    ongoingSupport: false,
    perpetualWinner: false,
    springInTheStep: false,
    blueRibbon: false,
    familiarFaces: false,
    standingOrder: false,
    shoppingList: false,
    committeeMinutes: false,
    monthlyMeeting: false,
    clubBylaws: false,
  },
  marketUpgrades: {
    farmersMarket: false,
    coopCooler: false,
    wholesaleDock: false,
    distributionHub: false,
  },
  marketAffected: {
    farmersMarket: [],
    coopCooler: [],
    wholesaleDock: [],
    distributionHub: [],
  },
  prestigeSeen: false,
  firstNeighborAwarded: false,
  seenFirstPrestige: false,
  prestigeCount: 0,
  yendySpeed: false,
  betterSoil: 1,
  buyMode: 1, // legacy, now per-plot
  globalSpeed: 1,
  globalSpeedLevels: 0,
  globalSpeedAffected: [],
  timeScale: 1,
  plots: {},
  upgrades: {},
  hideOwnedHelpful: false,
  upgradeAutobuy: true,
  autoPrestigeMin: null,
  waitForNextUpgrade: false,
  upgradeBuyCooldown: 0,
  celebrating: false,
  notified: {},
};

VEGGIES.forEach(v => {
  state.plots[v.id] = {
    plants: v.unlocked ? 1 : 0,
    plantCost: v.firstCost,
    inventory: 0,
    progress: 0,
    growing: false,
    ready: false,
    hasStarted: false,
    autoHarvest: false,
    autoSell: false,
    speedLevels: 0,
    buyMode: 1,
    autoBuy: false,
  };
  state.upgrades[v.id] = { harvest: false, sell: false, buy: false, speedBought: 0 };
});

const coinsEl = document.getElementById("coins");
const supportiveEl = document.getElementById("supportive");
const trophiesEl = document.getElementById("trophies");
const plotsEl = document.getElementById("plots");
const helpfulList = document.getElementById("helpful-list");
const generousList = document.getElementById("generous-list");
const prestigeBtn = document.getElementById("prestige-btn");
const prestigeInfo = document.getElementById("prestige-info");

function format(n) {
  if (!isFinite(n)) return "∞";
  const sign = n < 0 ? "-" : "";
  n = Math.abs(n);
  if (n < 1000) return sign + Math.floor(n).toString();
  const suffixes = ["", "k", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
  let tier = Math.floor(Math.log10(n) / 3);
  if (tier >= suffixes.length) tier = suffixes.length - 1;
  const scaled = n / Math.pow(1000, tier);
  return sign + scaled.toFixed(1) + suffixes[tier];
}

function formatHarvestRate(perSec) {
  if (!isFinite(perSec) || perSec <= 0) return "0/s";
  if (perSec >= 1) {
    const n = perSec >= 100 ? Math.round(perSec) : perSec >= 10 ? perSec.toFixed(1) : perSec.toFixed(2);
    return `${n}/s`;
  }
  let value = 1 / perSec;
  let label = "s";
  const ladder = [[60, "s", "min"], [60, "min", "hour"], [24, "hour", "day"], [7, "day", "week"], [52, "week", "year"]];
  for (const [size, from, to] of ladder) {
    if (label !== from || value < size) break;
    value /= size;
    label = to;
  }
  const n = value >= 10 ? value.toFixed(1) : value.toFixed(2);
  return `1 / ${n}${label}`;
}

function getSellPrice(veggie) {
  let mult = 1;
  MARKET_UPS.forEach(m => {
    if (state.marketUpgrades[m.id]) mult *= m.mult;
  });
  return veggie.sellPrice * mult;
}

function getYield(plot) {
  const plantMult = Math.pow(1.02, plot.plants);
  let soil = 1;
  if (state.prestigeUpgrades.betterSoil) soil *= 2;
  if (state.prestigeUpgrades.blueRibbon) soil *= 2;
  return plot.plants * soil * plantMult;
}

const SUPPORTIVE_SCALE = 300000;
function addSupportive(veggie, amount) {
  if (!state.firstNeighborAwarded || amount <= 0) return;
  const mult = state.prestigeUpgrades.perpetualWinner ? 10 : 1;
  state.supportive += (amount * veggie.sellPrice * mult) / SUPPORTIVE_SCALE;
}

function getCycleTime(veggie, plot) {
  const batches = Math.floor(plot.plants / 25);
  const plantSpeed = Math.pow(1.02, plot.plants);
  let globalMult = 1;
  if (state.globalSpeedAffected.includes(veggie.id)) {
    globalMult = state.globalSpeed;
  }
  const compost = state.prestigeUpgrades.enrichedCompost ? 1.5 : 1;
  const yendy = state.yendySpeed ? 1.5 : 1;
  const speedMult = (1 + plot.speedLevels * 0.10) * globalMult * plantSpeed * compost * yendy;
  return veggie.baseCycle * Math.pow(0.90, batches) / speedMult;
}

let lastUnlockState = "";

let lastUpgradeState = "";

function updateUI() {
  coinsEl.textContent = format(state.coins);
  if (supportiveEl) supportiveEl.textContent = state.supportive.toFixed(2);
  if (trophiesEl) trophiesEl.textContent = state.trophies;

  // Red dots — only when something is actually affordable and unlocked
  const upgradesDot = document.getElementById("upgrades-dot");
  const helpfulDot = document.getElementById("helpful-dot");
  const generousDot = document.getElementById("generous-dot");

  let helpfulNew = false;
  let generousNew = false;
  let supportiveNew = false;
  VEGGIES.forEach(v => {
    if (!v.unlocked) return;
    const plot = state.plots[v.id];
    const up = state.upgrades[v.id];
    const harvestCost = v.id === "kale" ? 100 : Math.floor(v.firstCost * 10);
    const sellCost = v.id === "kale" ? 500 : Math.floor(v.firstCost * 50);
    if (!up.harvest && state.coins >= harvestCost) helpfulNew = true;
    if (plot.plants >= 10 && !up.sell && state.coins >= sellCost) helpfulNew = true;
    if (state.prestigeUpgrades.shoppingList && up.harvest && !up.buy && state.coins >= buyNeighborCost(v)) helpfulNew = true;
    const availableSpeed = Math.floor(plot.plants / 10);
    if (availableSpeed > up.speedBought) {
      const cost = Math.floor(v.firstCost * 500 * Math.pow(1.5, up.speedBought));
      if (state.coins >= cost) generousNew = true;
    }
  });

  if (state.prestigeSeen) {
    PRESTIGE_UPS.forEach(p => {
      if (!state.prestigeUpgrades[p.id] && state.trophies >= p.cost) supportiveNew = true;
    });
  }

  if (upgradesDot) {
    const any = helpfulNew || generousNew || supportiveNew;
    upgradesDot.style.display = any ? "inline-block" : "none";
    const tabBtn = document.getElementById("upgrades-tab-btn");
    if (tabBtn) tabBtn.classList.toggle("has-upgrade", any);
  }
  if (helpfulDot) helpfulDot.style.display = helpfulNew ? "inline-block" : "none";
  if (generousDot) generousDot.style.display = generousNew ? "inline-block" : "none";
  const supportiveDot = document.getElementById("supportive-dot");
  if (supportiveDot) supportiveDot.style.display = supportiveNew ? "inline-block" : "none";

  const unlockState = VEGGIES.map(v => (v.unlocked ? "1" : "0")).join("");
  const needsRebuild = plotsEl.children.length === 0 || unlockState !== lastUnlockState;
  lastUnlockState = unlockState;

  // ... (plot rebuild logic stays the same)

  if (needsRebuild) {
    plotsEl.innerHTML = "";
    VEGGIES.forEach((v, idx) => {
      if (!v.unlocked) return; // only show unlocked veggies

      const plot = state.plots[v.id];
      const div = document.createElement("div");
      div.className = "plot";
      div.dataset.veggie = v.id;

      div.innerHTML = `
        <div class="plot-head">
          <h3 class="plot-name">${portrait(ART[v.id])}<span>${v.name}</span></h3>
          <button type="button" class="info-btn" data-info="${v.id}" aria-label="Upgrades for ${v.name}">i</button>
          <span class="plant-count"></span>
        </div>
        <div class="progress-container">
          <div class="progress-bar"></div>
          <div class="progress-text"></div>
        </div>
        <div class="button-row">
          <button class="action" data-action="${v.id}"></button>
          <button class="buy" data-buy="${v.id}"></button>
          <button class="buy-mode" data-mode="${v.id}">x1</button>
        </div>
        <button class="sell" data-sell="${v.id}"></button>
        <p class="small stats-info"></p>
        <div class="plot-pop"></div>
      `;
      plotsEl.appendChild(div);
    });

    // Always show next locked veggie once previous is unlocked
    const nextLocked = VEGGIES.find(v => !v.unlocked);
    if (nextLocked) {
      const prev = VEGGIES[VEGGIES.indexOf(nextLocked) - 1];
      if (prev && state.plots[prev.id] && (prev.unlocked || state.plots[prev.id].plants > 0)) {
        const prevPlot = state.plots[prev.id];
        const canUnlock = prevPlot.plants >= nextLocked.unlockPlants && state.coins >= nextLocked.firstCost;
        const div = document.createElement("div");
        div.className = "plot";
        div.innerHTML = `
          <h3 class="plot-name">${portrait(ART[nextLocked.id])}<span>${nextLocked.name} (Locked)</span></h3>
          <p class="small">Unlocks at ${nextLocked.unlockPlants} ${prev.name} plants · First plant: ${format(nextLocked.firstCost)} c</p>
          <button class="buy" data-unlock="${nextLocked.id}" ${canUnlock ? "" : "disabled"}>
            Unlock (${format(nextLocked.firstCost)} c)
          </button>
        `;
        plotsEl.appendChild(div);
      }
    }
  }

  // Update existing plot elements (only unlocked ones are in the DOM)
  VEGGIES.forEach(v => {
    if (!v.unlocked) return;
    const div = plotsEl.querySelector(`[data-veggie="${v.id}"]`);
    if (!div) return;
    const plot = state.plots[v.id];

    const cycle = getCycleTime(v, plot);
    const remaining = plot.growing ? Math.max(0, (1 - plot.progress) * cycle) : 0;
    const yieldAmt = getYield(plot);

    const bar = div.querySelector(".progress-bar");
    const text = div.querySelector(".progress-text");
    const actionBtn = div.querySelector(".action");
    const buyBtn = div.querySelector(".buy");
    const sellBtn = div.querySelector(".sell");
    const yieldInfo = div.querySelector(".stats-info");
    const modeBtn = div.querySelector(".buy-mode");
    const plantCount = div.querySelector(".plant-count");

    if (bar) {
      const perSec = cycle > 0 ? yieldAmt / cycle : 0;
      const fast = plot.hasStarted && perSec >= 10;
      bar.style.width = fast ? "100%" : Math.min(100, plot.progress * 100) + "%";
    }
    if (text) {
      const perSec = cycle > 0 ? yieldAmt / cycle : 0;
      if (!plot.hasStarted) text.textContent = "Ready to plant";
      else if (plot.ready && !plot.autoHarvest) text.textContent = "Ready!";
      else text.textContent = formatHarvestRate(perSec);
    }
    if (actionBtn) {
      actionBtn.textContent = !plot.hasStarted ? "Plant" : "Harvest";
      actionBtn.disabled = plot.growing && !plot.ready;
    }
    if (buyBtn) {
      const mode = plot.buyMode || 1;
      const modeLabel = mode === "max" ? "Max" : `x${mode}`;
      let totalCost = 0;
      let tempCost = plot.plantCost;
      const count = mode === "max" ? 50 : Number(mode) || 1;
      for (let i = 0; i < count; i++) {
        totalCost += tempCost;
        tempCost = Math.max(tempCost + 1, Math.ceil(tempCost * 1.15));
      }
      if (mode === "max") {
        totalCost = 0;
        tempCost = plot.plantCost;
        while (totalCost + tempCost <= state.coins && totalCost < 1e12) {
          totalCost += tempCost;
          tempCost = Math.max(tempCost + 1, Math.ceil(tempCost * 1.15));
        }
        if (totalCost === 0) totalCost = plot.plantCost;
      }
      buyBtn.textContent = `Buy ${modeLabel} (${format(totalCost)} c)`;
      buyBtn.disabled = !plot.hasStarted || state.coins < totalCost;
    }
    if (sellBtn) {
      const veggie = VEGGIES.find(vv => vv.id === v.id);
      sellBtn.textContent = plot.autoSell ? "Auto" : `Sell (${format(plot.inventory * getSellPrice(veggie))} c)`;
      sellBtn.disabled = plot.autoSell || plot.inventory <= 0;
    }
    if (modeBtn) {
      const mode = plot.buyMode || 1;
      modeBtn.textContent = mode === "max" ? "Max" : "x" + mode;
    }
    if (yieldInfo) {
      const perMinute = (yieldAmt / cycle) * 60;
      const incomePerMin = perMinute * getSellPrice(v);
      const usePerSec = perMinute > 1000;
      const rate = usePerSec ? (perMinute / 60).toFixed(1) + "/s" : perMinute.toFixed(1) + "/min";
      const income = usePerSec ? (incomePerMin / 60).toFixed(1) + "/s" : incomePerMin.toFixed(1) + "/min";
      const speedPct = Math.round(plot.speedLevels * 10);
      const globalPct = Math.round((state.globalSpeed - 1) * 100);
      const mults = [];
      if (speedPct > 0) mults.push(`+${speedPct}% spd`);
      if (globalPct > 0) mults.push(`+${globalPct}% global`);
      const multText = mults.length ? ` · ${mults.join(" ")}` : "";
      yieldInfo.textContent = `Inv: ${format(plot.inventory)} · Prod: ${rate} · Income: ${income}${multText}`;
    }
    if (plantCount) plantCount.textContent = format(plot.plants);

    const pop = div.querySelector(".plot-pop");
    if (pop) {
      const up = state.upgrades[v.id];
      const lines = [];
      lines.push(up.harvest ? "Auto-Harvest: on" : "Auto-Harvest: off");
      lines.push(up.sell ? "Auto-Sell: on" : "Auto-Sell: off");
      lines.push(up.speedBought > 0 ? `Speed upgrades: ${up.speedBought} (+${up.speedBought * 10}%)` : "Speed upgrades: none");
      lines.push(`Per plant: ×${Math.pow(1.02, plot.plants).toFixed(2)} harvest and speed`);
      if (state.prestigeUpgrades.betterSoil) lines.push("Better Soil: ×2 harvest");
      if (state.prestigeUpgrades.blueRibbon) lines.push("Blue Ribbon Soil: ×2 harvest");
      if (state.prestigeUpgrades.enrichedCompost) lines.push("Enriched Compost: ×1.5 speed");
      const sellMult = getSellPrice(v) / v.sellPrice;
      if (sellMult > 1.001) lines.push(`Market sell: ×${sellMult.toFixed(2)}`);
      pop.innerHTML = `<strong>${v.name} upgrades</strong>` + lines.map(l => `<div>${l}</div>`).join("");
    }
  });

  // Update unlock button if present
  const unlockBtn = plotsEl.querySelector("[data-unlock]");
  if (unlockBtn) {
    const nextLocked = VEGGIES.find(v => !v.unlocked);
    if (nextLocked) {
      const prev = VEGGIES[VEGGIES.indexOf(nextLocked) - 1];
      const prevPlot = state.plots[prev.id];
      const canUnlock = prevPlot.plants >= nextLocked.unlockPlants && state.coins >= nextLocked.firstCost;
      unlockBtn.disabled = !canUnlock;
    }
  }
  // Dynamic upgrade lists
  const upgradeState = VEGGIES.map(v => 
    `${v.unlocked}:${state.plots[v.id].plants}:${state.upgrades[v.id].harvest}:${state.upgrades[v.id].sell}:${state.upgrades[v.id].buy}:${state.upgrades[v.id].speedBought}`
  ).join("|") + `|${state.hideOwnedHelpful}|${state.prestigeUpgrades.shoppingList}|${state.globalSpeed}|${state.globalSpeedLevels}|${state.marketUpgrades.farmersMarket}`;

  if (upgradeState !== lastUpgradeState) {
    lastUpgradeState = upgradeState;

    let helpfulHTML = "";
    let generousHTML = "";

    VEGGIES.forEach(v => {
      if (!v.unlocked) return;
      const plot = state.plots[v.id];
      const up = state.upgrades[v.id];
      const names = NEIGHBORS[v.id];
      const harvestCost = v.id === "kale" ? 100 : Math.floor(v.firstCost * 10);
      const sellCost = v.id === "kale" ? 500 : Math.floor(v.firstCost * 50);
      const baseSpeedCost = Math.floor(v.firstCost * 500);

      if (plot.plants >= 1 && !(state.hideOwnedHelpful && up.harvest)) {
        helpfulHTML += `
          <div class="upgrade-card card-with-art" data-upgrade="harvest-${v.id}">
            ${portrait(NEIGHBOR_ART[names.harvest])}
            <div>
            <strong>${names.harvest}</strong> ${!up.harvest && state.coins >= harvestCost ? '<span class="red-dot"></span>' : ''}
            <p class="small">Auto-harvests ${v.name}</p>
            <button type="button" class="buy" data-upgrade="harvest-${v.id}" data-cost="${harvestCost}" data-owned="${up.harvest ? "1" : "0"}">
              ${up.harvest ? "Owned" : `Buy (${format(harvestCost)} c)`}
            </button>
            </div>
          </div>`;
      }

      if (plot.plants >= 10 && !(state.hideOwnedHelpful && up.sell)) {
        helpfulHTML += `
          <div class="upgrade-card card-with-art" data-upgrade="sell-${v.id}">
            ${portrait(NEIGHBOR_ART[names.sell])}
            <div>
            <strong>${names.sell}</strong> ${!up.sell && state.coins >= sellCost ? '<span class="red-dot"></span>' : ''}
            <p class="small">Auto-sells ${v.name}</p>
            <button type="button" class="buy" data-upgrade="sell-${v.id}" data-cost="${sellCost}" data-owned="${up.sell ? "1" : "0"}">
              ${up.sell ? "Owned" : `Buy (${format(sellCost)} c)`}
            </button>
            </div>
          </div>`;
      }

      if (state.prestigeUpgrades.shoppingList && up.harvest && !(state.hideOwnedHelpful && up.buy)) {
        const cost = buyNeighborCost(v);
        helpfulHTML += `
          <div class="upgrade-card card-with-art" data-upgrade="buy-${v.id}">
            ${portrait(NEIGHBOR_ART[names.buy])}
            <div>
            <strong>${names.buy}</strong> ${!up.buy && state.coins >= cost ? '<span class="red-dot"></span>' : ''}
            <p class="small">Auto-buys ${v.name} plants</p>
            <button type="button" class="buy" data-upgrade="buy-${v.id}" data-cost="${cost}" data-owned="${up.buy ? "1" : "0"}">
              ${up.buy ? "Owned" : `Buy (${format(cost)} c)`}
            </button>
            </div>
          </div>`;
      }

      const availableSpeed = Math.floor(plot.plants / 10);
      if (availableSpeed > up.speedBought) {
        const cost = Math.floor(baseSpeedCost * Math.pow(1.5, up.speedBought));
        generousHTML += `
          <div class="upgrade-card card-with-art" data-upgrade="speed-${v.id}">
            ${portrait(ART[v.id])}
            <div>
            <strong>${names.speed} ${up.speedBought + 1}</strong> ${state.coins >= cost ? '<span class="red-dot"></span>' : ''}
            <p class="small">+10% speed for ${v.name}</p>
            <button type="button" class="buy" data-upgrade="speed-${v.id}" data-cost="${cost}" data-owned="0">
              Buy Lvl ${up.speedBought + 1} (${format(cost)} c)
            </button>
            </div>
          </div>`;
      }
    });

    const unlockedCount = VEGGIES.filter(v => v.unlocked).length;
    if (unlockedCount >= 3 && unlockedCount % 3 === 0) {
      const teaCost = Math.floor(25000 * Math.pow(1.5, state.globalSpeedLevels));
      generousHTML += `
        <div class="upgrade-card" data-upgrade="global-speed">
          <strong>Neighborhood Compost Tea ${state.globalSpeedLevels + 1}</strong> ${state.coins >= teaCost ? '<span class="red-dot"></span>' : ''}
          <p class="small">+25% speed for veggies unlocked at purchase</p>
          <button type="button" class="buy" data-upgrade="global-speed" data-cost="${teaCost}" data-owned="0">
            Buy (${format(teaCost)} c)
          </button>
        </div>`;
    }

    helpfulList.innerHTML = helpfulHTML || "<p class='small'>Unlock veggies to hire neighbors.</p>";
    generousList.innerHTML = generousHTML || "<p class='small'>Grow plants to unlock speed upgrades.</p>";
  }

  const marketKey = MARKET_UPS.map(m => `${m.id}:${marketReady(m)}:${state.marketUpgrades[m.id]}:${state.prestigeCount}`).join("|");
  const marketUpgradesEl = document.getElementById("market-upgrades");
  if (marketUpgradesEl && marketKey !== marketUpgradesEl.dataset.key) {
    marketUpgradesEl.dataset.key = marketKey;
    marketUpgradesEl.innerHTML = MARKET_UPS.map(m => {
      const unlocked = marketReady(m);
      const owned = state.marketUpgrades[m.id];
      return `
      <div class="upgrade-card card-with-art" data-upgrade="${m.key}">
        ${portrait("art-market.jpg")}
        <div>
        <strong>${m.name}</strong>
        <p class="small">${m.blurb}${unlocked || owned ? "" : ` · ${m.need}`}</p>
        <button type="button" class="buy" data-upgrade="${m.key}" data-cost="${m.cost}" data-owned="${owned ? "1" : "0"}" ${unlocked ? "" : "disabled data-locked=\"1\""}>
          ${owned ? "Owned" : `Purchase (${format(m.cost)} c)`}
        </button>
        </div>
      </div>`;
    }).join("");
  }

  const supportiveList = document.getElementById("supportive-list");
  const prestigeKey = `${state.prestigeSeen}|${state.trophies}|${PRESTIGE_UPS.map(p => state.prestigeUpgrades[p.id]).join("")}`;
  if (supportiveList && prestigeKey !== supportiveList.dataset.key) {
    supportiveList.dataset.key = prestigeKey;
    if (!state.prestigeSeen) {
      supportiveList.innerHTML = `<p class="small">Unlock Broccoli to reveal trophy upgrades.</p>`;
    } else {
      supportiveList.innerHTML = PRESTIGE_UPS.map(p => {
        const owned = state.prestigeUpgrades[p.id];
        return `
        <div class="upgrade-card" data-upgrade="prestige-${p.id}">
          <strong>${p.name}</strong>
          <p class="small">${p.desc}</p>
          <button type="button" class="buy" data-upgrade="prestige-${p.id}" data-cost="${p.cost}" data-currency="trophies" data-owned="${owned ? "1" : "0"}">
            ${owned ? "Owned" : `Buy (${trophyLabel(p.cost)})`}
          </button>
        </div>`;
      }).join("");
    }
  }

  document.querySelectorAll("button[data-cost]").forEach(btn => {
    const owned = btn.dataset.owned === "1";
    const locked = btn.dataset.locked === "1";
    const cost = Number(btn.dataset.cost);
    const purse = btn.dataset.currency === "trophies" ? state.trophies : state.coins;
    btn.classList.toggle("cant-afford", !owned && !locked && purse < cost);
  });

  const broccoliUnlocked = VEGGIES.find(v => v.id === "broccoli")?.unlocked;
  if (broccoliUnlocked) state.prestigeSeen = true;
  const canPrestige = state.supportive >= 1;
  prestigeBtn.disabled = !canPrestige;
  prestigeBtn.classList.toggle("ready", canPrestige);
  const accrualNote = state.prestigeUpgrades.perpetualWinner
    ? "Harvests add Supportive Neighbors at ×10 (yield × sell price / 30,000)."
    : "Harvests add Supportive Neighbors (yield × sell price / 300,000).";
  if (canPrestige) {
    prestigeInfo.textContent = `Prestige available. This run is worth ${trophyLabel(trophiesThisRun())}. ${state.firstNeighborAwarded ? accrualNote : ""}`;
  } else if (state.firstNeighborAwarded) {
    prestigeInfo.textContent = accrualNote;
  } else {
    prestigeInfo.textContent = "The first Supportive Neighbor arrives when you buy your second tomato plant.";
  }
  const firstPrestigeReady = canPrestige && !state.seenFirstPrestige;
  const banner = document.getElementById("prestige-banner");
  if (banner) banner.style.display = firstPrestigeReady ? "block" : "none";
  if (firstPrestigeReady) {
    const tabBtn = document.getElementById("upgrades-tab-btn");
    const supportiveDot = document.getElementById("supportive-dot");
    if (tabBtn) tabBtn.classList.add("has-upgrade");
    if (supportiveDot) supportiveDot.style.display = "inline-block";
    const upgradesDot = document.getElementById("upgrades-dot");
    if (upgradesDot) upgradesDot.style.display = "inline-block";
  }

  const hideBtn = document.getElementById("hide-owned");
  if (hideBtn) hideBtn.classList.toggle("active", state.hideOwnedHelpful);
  const upgradeBuyBtn = document.getElementById("upgrade-autobuy");
  if (upgradeBuyBtn) {
    const on = state.prestigeUpgrades.committeeMinutes;
    upgradeBuyBtn.style.display = on ? "inline-block" : "none";
    upgradeBuyBtn.textContent = state.upgradeAutobuy ? "Upgrade autobuy: on" : "Upgrade autobuy: off";
    upgradeBuyBtn.classList.toggle("active", state.upgradeAutobuy);
  }
  const bylaws = document.getElementById("bylaws");
  if (bylaws) bylaws.style.display = state.prestigeUpgrades.clubBylaws ? "block" : "none";
  const minInput = document.getElementById("auto-min");
  if (minInput && document.activeElement !== minInput && state.autoPrestigeMin != null) {
    minInput.value = state.autoPrestigeMin;
  }
  const waitBox = document.getElementById("wait-upgrade");
  if (waitBox) waitBox.checked = !!state.waitForNextUpgrade;
  const runTrophies = document.getElementById("run-trophies");
  if (runTrophies) {
    const earned = trophiesThisRun();
    runTrophies.textContent = state.prestigeUpgrades.monthlyMeeting
      ? `This run is worth ${trophyLabel(earned)}.`
      : "";
  }
}

function startCycle(id) {
  const plot = state.plots[id];
  if (plot.growing || plot.ready) return;
  plot.growing = true;
  plot.ready = false;
  plot.progress = 0;
  plot.hasStarted = true;
}

function harvest(id) {
  const plot = state.plots[id];
  if (!plot.ready) return;
  const veggie = VEGGIES.find(v => v.id === id);
  const amount = getYield(plot);
  plot.inventory += amount;
  addSupportive(veggie, amount);
  plot.ready = false;
  plot.growing = true;
  plot.progress = 0;
  updateUI();
}

function buyPlant(id, count = 1) {
  const plot = state.plots[id];
  if (!plot.hasStarted) return;
  const veggie = VEGGIES.find(v => v.id === id);
  for (let i = 0; i < count; i++) {
    if (state.coins < plot.plantCost) break;
    state.coins -= plot.plantCost;
    plot.plants++;
    if (veggie.id === "tomatoes" && plot.plants >= 2 && !state.firstNeighborAwarded) {
      state.firstNeighborAwarded = true;
      state.supportive += 1;
    }
    plot.plantCost = Math.max(plot.plantCost + 1, Math.ceil(plot.plantCost * 1.15));
  }
  updateUI();
}

function onPlotClick(e) {
  const action = e.target.dataset.action;
  const buy = e.target.dataset.buy;
  const mode = e.target.dataset.mode;
  const sell = e.target.dataset.sell;
  const unlock = e.target.dataset.unlock;

  if (action) {
    const plot = state.plots[action];
    if (!plot.hasStarted) startCycle(action);
    else if (plot.ready) harvest(action);
  }
  if (buy) {
    const plot = state.plots[buy];
    const modeVal = plot.buyMode || 1;
    let count = 1;
    if (modeVal === "max") {
      let temp = plot.plantCost;
      let total = 0;
      while (total + temp <= state.coins && count < 1000) {
        total += temp;
        temp = Math.max(temp + 1, Math.ceil(temp * 1.15));
        count++;
      }
      count = Math.max(1, count - 1);
    } else {
      count = Number(modeVal);
    }
    buyPlant(buy, count);
  }
  if (mode) {
    const plot = state.plots[mode];
    const modes = [1, 10, 100, "max"];
    const idx = modes.indexOf(plot.buyMode || 1);
    plot.buyMode = modes[(idx + 1) % modes.length];
  }
  if (sell) {
    const plot = state.plots[sell];
    const veggie = VEGGIES.find(v => v.id === sell);
    if (!plot.autoSell && plot.inventory > 0) {
      state.coins += plot.inventory * getSellPrice(veggie);
      plot.inventory = 0;
    }
  }
  if (unlock) {
    const veggie = VEGGIES.find(v => v.id === unlock);
    if (state.coins >= veggie.firstCost) {
      state.coins -= veggie.firstCost;
      veggie.unlocked = true;
      state.plots[unlock].plants = 1;
      if (state.prestigeUpgrades.springInTheStep) {
        state.plots[unlock].hasStarted = true;
        state.plots[unlock].growing = true;
        state.plots[unlock].ready = false;
        state.plots[unlock].progress = 0;
      }
      if (veggie.id === "broccoli") showYendy();
    }
  }
  updateUI();
}

function prestige() {
  if (state.supportive < 1) return;
  const firstTime = !state.seenFirstPrestige;
  state.seenFirstPrestige = true;
  state.prestigeCount += 1;
  state.trophies += trophiesThisRun();
  state.coins = 0;
  state.supportive = 0;
  VEGGIES.forEach(v => {
    if (v.id !== "kale") v.unlocked = false;
    const p = state.plots[v.id];
    p.plants = v.id === "kale" ? 1 : 0;
    p.plantCost = v.firstCost;
    p.inventory = 0;
    p.progress = 0;
    p.growing = false;
    p.ready = false;
    const autoPlant = state.prestigeUpgrades.springInTheStep && v.id === "kale";
    p.hasStarted = autoPlant;
    p.growing = autoPlant;
    if (!state.prestigeUpgrades.familiarFaces) {
      p.speedLevels = 0;
      state.upgrades[v.id].speedBought = 0;
    }
    if (!state.prestigeUpgrades.ongoingSupport) {
      p.autoHarvest = false;
      p.autoSell = false;
      p.autoBuy = false;
      state.upgrades[v.id].harvest = false;
      state.upgrades[v.id].sell = false;
      state.upgrades[v.id].buy = false;
    }
  });
  if (!state.prestigeUpgrades.familiarFaces) {
    state.globalSpeed = 1;
    state.globalSpeedLevels = 0;
    state.globalSpeedAffected = [];
  }
  if (!state.prestigeUpgrades.standingOrder) {
    MARKET_UPS.forEach(m => {
      state.marketUpgrades[m.id] = false;
      state.marketAffected[m.id] = [];
    });
  }
  const marketEl = document.getElementById("market-upgrades");
  if (marketEl) marketEl.dataset.key = "";
  lastUpgradeState = "";
  if (firstTime) showFirstPrestige();
  saveGame();
  updateUI();
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c => c.style.display = "none");
    tab.classList.add("active");
    document.getElementById(tab.dataset.tab + "-tab").style.display = "block";
  });
});

document.querySelectorAll(".subtab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".subtab").forEach(t => t.classList.remove("active"));
    document.querySelectorAll(".subpanel").forEach(p => p.style.display = "none");
    tab.classList.add("active");
    document.getElementById(tab.dataset.subtab + "-panel").style.display = "block";
  });
});

plotsEl.addEventListener("click", onPlotClick);
prestigeBtn.addEventListener("click", prestige);

document.getElementById("hide-owned")?.addEventListener("click", () => {
  state.hideOwnedHelpful = !state.hideOwnedHelpful;
  lastUpgradeState = "";
  updateUI();
});
document.getElementById("upgrade-autobuy")?.addEventListener("click", () => {
  state.upgradeAutobuy = !state.upgradeAutobuy;
});
document.getElementById("auto-min")?.addEventListener("change", (e) => {
  const n = Math.max(1, Math.floor(Number(e.target.value) || 1));
  state.autoPrestigeMin = n;
  e.target.value = n;
});
document.getElementById("wait-upgrade")?.addEventListener("change", (e) => {
  state.waitForNextUpgrade = e.target.checked;
});

document.addEventListener("click", (e) => {
  const info = e.target.closest("[data-info]");
  if (info) {
    const pop = info.closest(".plot")?.querySelector(".plot-pop");
    const willOpen = pop && !pop.classList.contains("open");
    document.querySelectorAll(".plot-pop.open").forEach(p => p.classList.remove("open"));
    if (willOpen) pop.classList.add("open");
    return;
  }
  if (!e.target.closest(".plot-pop")) {
    document.querySelectorAll(".plot-pop.open").forEach(p => p.classList.remove("open"));
  }
  const card = e.target.closest("[data-upgrade]");
  if (!card || card.id === "prestige-btn") return;
  const up = card.dataset.upgrade;
  if (!up || up === "1" || up === "0") return;

  if (up.startsWith("harvest-")) {
    const id = up.split("-")[1];
    const v = VEGGIES.find(x => x.id === id);
    const cost = v.id === "kale" ? 100 : Math.floor(v.firstCost * 10);
    if (state.coins >= cost && !state.upgrades[id].harvest) {
      state.coins -= cost;
      state.upgrades[id].harvest = true;
      state.plots[id].autoHarvest = true;
      lastUpgradeState = "";
      updateUI();
    }
  }
  if (up.startsWith("sell-")) {
    const id = up.split("-")[1];
    const v = VEGGIES.find(x => x.id === id);
    const cost = v.id === "kale" ? 500 : Math.floor(v.firstCost * 50);
    if (state.coins >= cost && !state.upgrades[id].sell) {
      state.coins -= cost;
      state.upgrades[id].sell = true;
      state.plots[id].autoSell = true;
      lastUpgradeState = "";
      updateUI();
    }
  }
  if (up.startsWith("buy-")) {
    const id = up.slice(4);
    const v = VEGGIES.find(x => x.id === id);
    const cost = buyNeighborCost(v);
    if (state.prestigeUpgrades.shoppingList && state.upgrades[id].harvest && !state.upgrades[id].buy && state.coins >= cost) {
      state.coins -= cost;
      state.upgrades[id].buy = true;
      state.plots[id].autoBuy = true;
      lastUpgradeState = "";
      updateUI();
    }
  }
  if (up.startsWith("speed-")) {
    const id = up.split("-")[1];
    const v = VEGGIES.find(x => x.id === id);
    const cost = Math.floor(v.firstCost * 500 * Math.pow(1.5, state.upgrades[id].speedBought));
    if (state.coins >= cost) {
      state.coins -= cost;
      state.upgrades[id].speedBought++;
      state.plots[id].speedLevels++;
      lastUpgradeState = "";
      updateUI();
    }
  }
  if (up === "global-speed") {
    const teaCost = Math.floor(25000 * Math.pow(1.5, state.globalSpeedLevels));
    if (state.coins >= teaCost) {
      state.coins -= teaCost;
      state.globalSpeed *= 1.25;
      state.globalSpeedLevels++;
      VEGGIES.forEach(v => {
        if (v.unlocked && !state.globalSpeedAffected.includes(v.id)) {
          state.globalSpeedAffected.push(v.id);
        }
      });
      lastUpgradeState = "";
      updateUI();
    }
  }
  if (up.startsWith("prestige-")) {
    const id = up.slice("prestige-".length);
    const def = PRESTIGE_UPS.find(p => p.id === id);
    if (def && state.prestigeSeen && !state.prestigeUpgrades[id] && state.trophies >= def.cost) {
      state.trophies -= def.cost;
      state.prestigeUpgrades[id] = true;
      if (id === "betterSoil") state.betterSoil = 2;
      if (id === "clubBylaws" && state.autoPrestigeMin == null) state.autoPrestigeMin = 4;
      const list = document.getElementById("supportive-list");
      if (list) list.dataset.key = "";
      updateUI();
    }
  }
  const market = MARKET_UPS.find(m => m.key === up);
  if (market && !state.marketUpgrades[market.id] && state.coins >= market.cost && marketReady(market)) {
      state.coins -= market.cost;
      state.marketUpgrades[market.id] = true;
      const marketEl = document.getElementById("market-upgrades");
      if (marketEl) marketEl.dataset.key = "";
      updateUI();
  }
});

let last = performance.now();
let saveAcc = 0;
function loop(now) {
  const realDt = (now - last) / 1000;
  const dt = realDt * (state.timeScale || 1);
  last = now;

  VEGGIES.forEach(v => {
    const plot = state.plots[v.id];
    if (plot.autoSell && plot.inventory > 0) {
      state.coins += plot.inventory * getSellPrice(v);
      plot.inventory = 0;
    }
  });

  VEGGIES.forEach(v => {
    const plot = state.plots[v.id];
    if (!v.unlocked || !plot.growing || plot.ready) return;
    const cycle = getCycleTime(v, plot);
    if (cycle < 0.01 && plot.autoHarvest) {
      const amount = getYield(plot) * (dt / cycle);
      plot.inventory += amount;
      addSupportive(v, amount);
      plot.progress = 1;
      plot.growing = true;
      plot.ready = false;
      return;
    }
    plot.progress += dt / cycle;
    if (plot.progress >= 1) {
      plot.progress = 1;
      plot.growing = false;
      plot.ready = true;
      if (plot.autoHarvest) harvest(v.id);
    }
  });

  if (state.prestigeUpgrades.shoppingList) {
    for (let i = VEGGIES.length - 1; i >= 0; i--) {
      const v = VEGGIES[i];
      const plot = state.plots[v.id];
      if (!v.unlocked || !plot.autoBuy || !plot.hasStarted) continue;
      const mode = plot.buyMode === "max" ? 1 : (Number(plot.buyMode) || 1);
      if (state.coins >= plot.plantCost) {
        buyPlant(v.id, mode);
        break;
      }
    }
  }

  if (state.prestigeUpgrades.committeeMinutes && state.upgradeAutobuy) {
    state.upgradeBuyCooldown -= dt;
    if (state.upgradeBuyCooldown <= 0) {
      const offer = cheapestCoinUpgrade();
      if (offer) {
        state.coins -= offer.cost;
        offer.apply();
        lastUpgradeState = "";
        state.upgradeBuyCooldown = 3;
      }
    }
  }

  maybeAutoPrestige();

  updateUI();
  saveAcc += realDt;
  if (saveAcc >= 2) {
    saveAcc = 0;
    saveGame();
  }
  requestAnimationFrame(loop);
}

document.getElementById("reset-game")?.addEventListener("click", () => {
  const dialog = document.getElementById("reset-dialog");
  if (dialog) dialog.style.display = "flex";
});
document.getElementById("reset-cancel")?.addEventListener("click", () => {
  const dialog = document.getElementById("reset-dialog");
  if (dialog) dialog.style.display = "none";
});
document.getElementById("reset-confirm")?.addEventListener("click", () => {
  allowSave = false;
  localStorage.removeItem("garden-club-v1");
  location.reload();
});

document.getElementById("time-scale")?.addEventListener("click", (e) => {
  const scale = e.target.dataset.scale;
  if (!scale) return;
  state.timeScale = Number(scale);
  document.querySelectorAll("#time-scale button[data-scale]").forEach(b => {
    b.style.background = b.dataset.scale == scale ? "#3b82f6" : "#475569";
    b.style.color = "white";
  });
});
document.querySelectorAll("#time-scale button[data-scale]").forEach(b => {
  b.style.background = b.dataset.scale === "1" ? "#3b82f6" : "#475569";
  b.style.color = "white";
});

function formatCycle(seconds) {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${seconds / 60}m`;
  return `${seconds / 3600}h`;
}

function renderPriceList() {
  const el = document.getElementById("price-list");
  if (!el || el.dataset.ready) return;
  el.dataset.ready = "1";
  const vegRows = VEGGIES.map((v, i) => {
    const prev = VEGGIES[i - 1];
    const unlock = prev ? `10 ${prev.name}` : "Start";
    return `<tr><td>${v.name}</td><td>${unlock}</td><td>${format(v.firstCost)} c</td><td>${formatCycle(v.baseCycle)}</td><td>${format(v.sellPrice)} c</td></tr>`;
  }).join("");
  const neighborRows = VEGGIES.map(v => {
    const n = NEIGHBORS[v.id];
    const harvest = v.id === "kale" ? 100 : Math.floor(v.firstCost * 10);
    const sell = v.id === "kale" ? 500 : Math.floor(v.firstCost * 50);
    return `<tr><td>${v.name}</td><td>${n.harvest} (${format(harvest)} c)</td><td>${n.sell} (${format(sell)} c)</td><td>${n.buy} (${format(buyNeighborCost(v))} c)</td></tr>`;
  }).join("");
  el.innerHTML = `
    <h3>Veggies</h3>
    <table><thead><tr><th>Veggie</th><th>Unlock</th><th>First plant</th><th>Cycle</th><th>Sell</th></tr></thead><tbody>${vegRows}</tbody></table>
    <h3>Helpful Neighbors</h3>
    <table><thead><tr><th>Veggie</th><th>Harvest</th><th>Sell</th><th>Buyer</th></tr></thead><tbody>${neighborRows}</tbody></table>
    <p class="small">Speed upgrades start at 500× the first plant and rise 50% each level. Compost Tea starts at 25k c. Buyers appear after Shopping List.</p>`;
}

document.getElementById("price-list-toggle")?.addEventListener("click", () => {
  const el = document.getElementById("price-list");
  if (!el) return;
  renderPriceList();
  const open = el.style.display === "none";
  el.style.display = open ? "block" : "none";
});

let allowSave = true;
function saveGame() {
  if (!allowSave) return;
  const data = {
    coins: state.coins,
    supportive: state.supportive,
    trophies: state.trophies,
    prestigeUpgrades: state.prestigeUpgrades,
    marketUpgrades: state.marketUpgrades,
    marketAffected: state.marketAffected,
    prestigeSeen: state.prestigeSeen,
    firstNeighborAwarded: state.firstNeighborAwarded,
    seenFirstPrestige: state.seenFirstPrestige,
    prestigeCount: state.prestigeCount,
    yendySpeed: state.yendySpeed,
    betterSoil: state.betterSoil,
    globalSpeed: state.globalSpeed,
    globalSpeedLevels: state.globalSpeedLevels,
    globalSpeedAffected: state.globalSpeedAffected,
    hideOwnedHelpful: state.hideOwnedHelpful,
    upgradeAutobuy: state.upgradeAutobuy,
    autoPrestigeMin: state.autoPrestigeMin,
    waitForNextUpgrade: state.waitForNextUpgrade,
    unlocked: VEGGIES.filter(v => v.unlocked).map(v => v.id),
    plots: state.plots,
    upgrades: state.upgrades,
  };
  try { localStorage.setItem("garden-club-v1", JSON.stringify(data)); } catch (e) {}
}

function loadGame() {
  let data;
  try { data = JSON.parse(localStorage.getItem("garden-club-v1") || "null"); } catch (e) { return; }
  if (!data || typeof data !== "object") return;
  ["coins", "supportive", "trophies", "betterSoil", "globalSpeed", "globalSpeedLevels", "autoPrestigeMin", "prestigeCount"].forEach(key => {
    if (typeof data[key] === "number" || data[key] === null) state[key] = data[key];
  });
  ["prestigeSeen", "firstNeighborAwarded", "seenFirstPrestige", "hideOwnedHelpful", "upgradeAutobuy", "waitForNextUpgrade", "yendySpeed"].forEach(key => {
    if (typeof data[key] === "boolean") state[key] = data[key];
  });
  if (data.prestigeUpgrades) Object.assign(state.prestigeUpgrades, data.prestigeUpgrades);
  if (data.marketUpgrades) Object.assign(state.marketUpgrades, data.marketUpgrades);
  if (data.marketAffected) Object.assign(state.marketAffected, data.marketAffected);
  if (Array.isArray(data.globalSpeedAffected)) state.globalSpeedAffected = data.globalSpeedAffected;
  if (Array.isArray(data.unlocked)) {
    VEGGIES.forEach(v => { v.unlocked = v.id === "kale" || data.unlocked.includes(v.id); });
  }
  VEGGIES.forEach(v => {
    if (data.plots && data.plots[v.id]) Object.assign(state.plots[v.id], data.plots[v.id]);
    if (data.upgrades && data.upgrades[v.id]) Object.assign(state.upgrades[v.id], data.upgrades[v.id]);
  });
  if (state.prestigeSeen) state.yendySpeed = true;
}

window.addEventListener("beforeunload", saveGame);
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") saveGame();
});

loadGame();
updateUI();
requestAnimationFrame(loop);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("./sw.js").catch(() => {});
}
