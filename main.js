/* Vim autosave = send socket update
augroup cookieupdate
    autocmd BufWritePost <buffer> execute 'silent !node ./update.js'
augroup END

silent !node ./forcereload.js
silent !node ./reload.js
*/

// Useful icons: file:///G:/Steam/steamapps/common/Cookie%20Clicker/resources/app/src/img/icons.png?v=2.042
// [21,3]: blue heart
// [16,5]: wrench

tmpGeekCode = {
    // Mod global
    loaded: false,
    ws: {},

    init:function(){

        this.wsConnect();

        Game.registerHook("logic", geekCode.logic);


        // Register function to run every logic tick
        if (!this.loaded) {
            Game.Notify("GeekCode loaded", "Automate everything.", [16,5], 2);

            // Disable cookie click sound
            Game.playCookieClickSound = function() { return false; };

            this.loaded = true;
        }
    },
    save:function(){
        //use this to store persistent data associated with your mod
    },
    load:function(str){
        //do stuff with the string data you saved previously.
    },

    logic: function() {

        // Most cost effective building buy


        // Adds a tooltip to help with hitting Lucky Digit goals
        var AscendTooltip = document.querySelector("#ascendTooltip");

        var extraInfo = document.querySelector("#ascendTooltip div#extraAscendInfo");

        if (!extraInfo) {
            // Add dividing line first
            linebreak = document.createElement("div");
            linebreak.classList.add("line");

            AscendTooltip.appendChild(linebreak);

            extraInfo = document.createElement("div");
            extraInfo.setAttribute("id", "extraAscendInfo");
            extraInfo.innerHTML = "Do I exist?";

            AscendTooltip.appendChild(extraInfo);
        }

        var nextAscendLevel = (Game.prestige + Game.ascendMeterLevel);
        var nextAscendLevelStr = nextAscendLevel.toString();


        extraInfo.innerHTML = "";

        extraInfo.innerHTML = `<div>Next prestige level: <b>${nextAscendLevelStr}</b></div>`;
        extraInfo.innerHTML += "<br />";

        var outputString;

        if (!Game.Upgrades["Lucky digit"].bought) {
            outputString = "";
            if (nextAscendLevelStr.substr(-1) == "7") {
                outputString += `<div style="color:#009966">`;
            }
            amount = 7 - (nextAscendLevel - (Math.floor(nextAscendLevel / 10) * 10));
            outputString += `Ascend in <b>${amount}</b> levels for 7.`;
            if (nextAscendLevelStr.substr(-1) == "7") {
                outputString += `</div>`;
            }

            extraInfo.innerHTML += outputString;
        }


        if (!Game.Upgrades["Lucky number"].bought) {
            outputString = "";
            if (nextAscendLevelStr.substr(-3) == "777") {
                outputString += `<div style="color:#009966">`;
            }
            amount = 777 - (nextAscendLevel - (Math.floor(nextAscendLevel / 1000) * 1000));
            outputString += `Ascend in <b>${amount}</b> levels for 777.`;
            if (nextAscendLevelStr.substr(-3) == "777") {
                outputString += `</div>`;
            }

            extraInfo.innerHTML += outputString;
        }

        if (!Game.Upgrades["Lucky payout"].bought) {
            outputString = "";
            if (nextAscendLevelStr.substr(-6) == "777777") {
                outputString += `<div style="color:#009966">`;
            }
            amount = 777777 - (nextAscendLevel - (Math.floor(nextAscendLevel / 1000000) * 1000000));
            outputString += `Ascend in <b>${amount}</b> levels for 777,777.`;
            if (nextAscendLevelStr.substr(-3) == "777777") {
                outputString += `</div>`;
            }

            extraInfo.innerHTML += outputString;
        }

        // Adds a trio of timers that let you know the time remaining on challenge runs.
        if (Game.ascensionMode == 1 || Game.prestige == 0) {

            var extraTimer = document.querySelector("div#timeTillChallenge");

            if (!extraTimer) {

                extraTimer = document.createElement("div");
                extraTimer.setAttribute("id", "timeTillChallenge");
                extraTimer.classList.add("title");
                extraTimer.innerHTML = "Do I exist?";


                CookieCount = document.querySelector("div#cookies.title")
                CookieCount.parentNode.insertBefore(extraTimer, CookieCount);

            }

            extraTimer.style.position = "absolute";
            extraTimer.style.left = "0px";
            extraTimer.style.top = CookieCount.offsetTop + CookieCount.offsetHeight + 10 + "px";
            extraTimer.style.width = "100%";
            extraTimer.style.textAlign = "center";
            extraTimer.style.background = "rgba(0,0,0,0.4)";
            extraTimer.style.zIndex = "200";
            extraTimer.style.padding = "5px 0";
            extraTimer.style.textShadow = "1px 0px 0px #000,-1px 0px 0px #000,0px 1px 0px #000,0px -1px 0px #000,0px 1px 4px #000";
            extraTimer.style.fontSize = "16px";

            extraTimer.innerHTML = "";

            if (!Game.Achievements["Neverclick"].won && Game.cookieClicks <= 15) {

                var timeTill = (1e6 - Game.cookiesEarned) / Game.cookiesPsRaw;
                var timeTillStr = Math.floor(timeTill / 60 / 60) + "h";
                timeTillStr += Math.floor(timeTill / 60 % 60) + "m";
                timeTillStr += Math.ceil(timeTill % 60) + "<b>s</b>";

                extraTimer.innerHTML += `<div>Neverclick unlocked in ${timeTillStr}</div>`;

            } else if (!Game.Achievements["Neverclick"].won && Game.cookieClicks > 15) {

                extraTimer.innerHTML += `<div style="color:#f66">Neverclick failed.</div>`;

            } else if (Game.Achievements["Neverclick"].won) {

                extraTimer.innerHTML += `<div style="color:#6f6">Neverclick achieved.</div>`;

            }

            if (!Game.Achievements["True Neverclick"].won && Game.cookieClicks == 0) {

                var timeTill = (1e6 - Game.cookiesEarned) / Game.cookiesPsRaw;
                var timeTillStr = Math.floor(timeTill / 60 / 60) + "h";
                timeTillStr += Math.floor(timeTill / 60 % 60) + "m";
                timeTillStr += Math.ceil(timeTill % 60) + "<b>s</b>";

                extraTimer.innerHTML += `<div>True Neverclick unlocked in ${timeTillStr}</div>`;

            } else if (!Game.Achievements["True Neverclick"].won && Game.cookieClicks > 0) {

                extraTimer.innerHTML += `<div style="color:#f66">True Neverclick failed.</div>`;

            } else if (Game.Achievements["True Neverclick"].won) {

                extraTimer.innerHTML += `<div style="color:#6f6">True Neverclick achieved.</div>`;

            }

            // (Game.ascensionMode == 1 || Game.prestige == 0)
            if (!Game.Achievements["Hardcore"].won) {

                var timeTill = (1e9 - Game.cookiesEarned) / Game.cookiesPsRaw;
                var timeTillStr = Math.floor(timeTill / 60 / 60) + "<b>h</b>";
                timeTillStr += Math.floor(timeTill / 60 % 60) + "<b>m</b>";
                timeTillStr += Math.ceil(timeTill % 60) + "<b>s</b>";

                extraTimer.innerHTML += `<span>Hardcore unlocked in ${timeTillStr}</span>`;

            }

        }


    },

    // Custom functions
    reload: function() {
        // Rerun the init code.
        this.init();

        Game.Notify("GeekCode updated", "GeekCode was updated remotely through a socket call.", [16,5], 2);
    },
    // Prior to reloading unload everything
    unload: function() {
        // Close websocket?
        this.ws.close();

        // Remove existing hooks?
        Game.removeHook("logic", geekCode.logic);

        Game.Notify("GeekCode updated", "GeekCode was updated remotely through a socket call.", [16,5], 2);
    },
    wsConnect: function() {

        this.ws = new WebSocket("ws://localhost:5069");

        this.ws.onopen = (e) => {
            //socket.sent("Cookie clicker client connected.");
            //Game.Notify("Connected to socket.", "", [16,5]);
            //geekCode.ws.send({ action: "msg", message: "Cookie clicker client connected."});
        };

        this.ws.onclose = (e) => {
            //Game.Notify("Websocket closed", "Trying to track things", [16,5], 2);
        }

        this.ws.onmessage = (e) => {

            //Game.Notify("Recieved message.", "", [16,5]);
            //geekCode.ws.send({ action: "msg", message: "Received update."});

            var data = JSON.parse(e.data);

            // Try to decode the message to see if it's a reload request.
            if (data.hasOwnProperty("action") && data.action == "update") {
                // Unload the mod regardless of what we do
                geekCode.unload();

                var tryFail = false;
                try {
                    eval(data.newObj.toString());
                } catch (e) {
                    tryFail = true;

                    // Try to error gracefully.
                    try {
                        Game.Notify("GeekCode error", e.toString() + "<br /><br /><code>" + e.stack + "</code>", [1,7]);
                    } catch (e) {
                        Game.Notify("GeekCode hard to describe error", "Unable to describe this error, it doesn't want to be converted to a string.", [0,7]);
                    }
                }

                if (!tryFail) {

                    delete geekCode;
                    geekCode = tmpGeekCode;

                    geekCode.reload();

                }

            } else if (data.hasOwnProperty("action") && data.action == "reload") {
                Game.toSave = true;
                Game.toReload = true;
            } else if (data.hasOwnProperty("action") && data.action == "forcereload") {
                if (!App){location.reload();}else{App.reload();}
            }

        };

    }
}

geekCode = tmpGeekCode;


if (!geekCode.loaded && typeof Game.mods["geekcode"] === "undefined" && typeof Game !== "undefined") {
    Game.registerMod("geekcode", geekCode);
}

