// import { registerSettings } from "./settings.js";

// export let debug = (...args) => {
//    if (debugEnabled > 1) console.log("DEBUG: alwayshp | ", ...args);
// };
// export let log = (...args) => console.log("alwayshp | ", ...args);
// export let warn = (...args) => {
//    if (debugEnabled > 0) console.warn("alwayshp | ", ...args);
// };
// export let error = (...args) => console.error("alwayshp | ", ...args);
export let setting = key => {
   return game.settings.get("deadsimplemobile", key);
};

export class AlwaysHP extends Application {

   static get defaultOptions() {
      // let pos = game.user.getFlag("always-hp", "alwayshpPos");
      return foundry.utils.mergeObject(super.defaultOptions, {
         id: "deadsimplemobile",
      });
   }     

   _render(force, options) {
      // find dice-box-canvas, and set z-axis to 20
      let that = this;
      let diceBox = document.querySelector(".dice-box-canvas");
      if (diceBox) diceBox.style.zIndex = 20;
      debug("Rendering test");
   }
}

Hooks.on("renderSettings", (app, html, data) => {
   const button = $(`<button data-tooltip="Set the performance mode to low."><i class="fas fa-bug"></i>iOS Fix</button>`);
   const location = html.find("#settings-game")
   location.append(button);
   button.on('click',async() => { 
       await game.settings.set("core","performanceMode", 0) 
       window.location.reload();
   })
})

Hooks.on('init', () => {
   debug("Initializing test");
   // registerSettings();
});

Hooks.on('ready', () => {
   let r = document.querySelector(':root');
   // dice-box-canvas

   if ((setting("show-option") == 'on' || (setting("show-option") == 'toggle' && setting("show-dialog"))) && (setting("load-option") == 'everyone' || (setting("load-option") == 'gm' == game.user.isGM)))
      // game.AlwaysHP.toggleApp(true);

   if (setting("show-option") == "combat" && game.combats.active && game.combats.active.started && !game.AlwaysHP)
      // game.AlwaysHP.toggleApp(true);
});

Hooks.on("renderSettingsConfig", (app, html, user) => {
   $("input[name='always-hp.heal-dark']", html).replaceWith(`
   <color-picker name="always-hp.heal-light" value="${setting('heal-light') || '#15838d'}"></color-picker>
   <color-picker name="always-hp.heal-dark" value="${setting('heal-dark') || '#4dd0e1'}"></color-picker>
   `);
   $("input[name='always-hp.hurt-dark']", html).replaceWith(`
   <color-picker name="always-hp.hurt-light" value="${setting('hurt-light') || '#ff6400'}"></color-picker>
   <color-picker name="always-hp.hurt-dark" value="${setting('hurt-dark') || '#ff0000'}"></color-picker>
   `);
});
