const mineflayer = require('mineflayer');

// ===== CONFIG =====
const SERVER_HOST = "play.concordmc.net";
const BOT_NAME = "YourBotName";  // Replace!
const LOGIN_PASSWORD = "";       // Replace if needed
const TPA_TARGET = "Vykeyy";
// ==================

function createBot() {
  console.log("🔄 Attempting to connect to server...");
  const bot = mineflayer.createBot({
    host: SERVER_HOST,
    port: 25565,
    username: BOT_NAME,
    version: "1.21.8"  // Change this to the server's version (e.g., "1.20" if supported)
  });

  bot.wait = ms => new Promise(res => setTimeout(res, ms));

  bot.once('spawn', async () => {
    console.log("✅ Bot joined the server!");

    try {
      if (LOGIN_PASSWORD) {
        bot.chat(`/login ${LOGIN_PASSWORD}`);
        console.log("🔐 Executed login");
        await bot.wait(5000);
      }

      bot.chat('/queue lifesteal');
      console.log("📦 Executed /queue lifesteal");

      await bot.wait(10000);
      bot.chat(`/tpa ${TPA_TARGET}`);
      console.log(`📡 Executed /tpa ${TPA_TARGET}`);

      console.log("🤖 Bot is now AFK.");
    } catch (err) {
      console.error("⚠️ Error during actions:", err.message);
    }
  });

  bot.on('end', () => {
    console.log("❌ Bot disconnected. Reconnecting in 10 seconds...");
    setTimeout(() => createBot(), 10000);
  });

  bot.on('error', (err) => {
    console.error("💥 Bot error:", err.message);
  });
}

createBot();
