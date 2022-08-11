"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var telegraf_1 = require("telegraf");
var axios_1 = require("axios");
var NodeCache = require("node-cache");
var SessionObject = require("./SessionObject.js");
var db_js_1 = require("./db/db.js");
var SESSION_EXPIRED_SECONDS = 86400;
var cache = new NodeCache();
var USS_CUSTOMER_SESSION = 'http://10.8.90.13:7001/user-service-service/resources/customer_sessions';
var LGW_PREFIX = 'http://10.8.90.22:7001/lgw-service/resources';
var LGW_LAUNCH_GAME = LGW_PREFIX + '/internal/launch_game';
var LGW_GAME_MENU = LGW_PREFIX + '/games/game_menus';
var web_link = "https://7b43-114-36-214-175.ap.ngrok.io";
var BOT_TOKEN = "5538829192:AAGmxQ3cjgg66nG9vXSOJthA4Te02pXo-1I"; // for demo
var bot = new telegraf_1.Telegraf(BOT_TOKEN);
bot.telegram.setMyCommands([
    {
        command: '/help',
        description: 'help command'
    }
]);
var MAIN_MENU = "main_menu";
var MAIN_MENU_BUTTON = telegraf_1.Markup.button.callback("⇠ Show Main Menu", MAIN_MENU);
var DOWNLOAD_HISTORY = "download_history";
var DOWNLOAD_HISTORY_BUTTON = telegraf_1.Markup.button.callback("📈 下載近30期歷史獎號", DOWNLOAD_HISTORY);
var SSC_COMMAND = "时时彩遊戲說明";
var GOTO_SSC_COMMAND_BUTTON = telegraf_1.Markup.button.callback('⇠ Back to SSC Games', SSC_COMMAND);
var K3_COMMAND = "快三遊戲說明";
var GOTO_K3_COMMAND_BUTTON = telegraf_1.Markup.button.callback('⇠ Back to K3 Games', K3_COMMAND);
var K32_COMMAND = "K3遊戲說明";
var GOTO_K32_COMMAND_BUTTON = telegraf_1.Markup.button.callback('⇠ Back to K3_2 Games', K32_COMMAND);
var TOP_WINNER_COMMAND = "中獎排行榜";
var BET_COMMAND = "投注";
// const NEED_LOGIN_COMMAND = ["/help", "/games", /^menu_/]
var NEED_LOGIN_COMMAND = [""];
// bot.use(Telegraf.log())
bot.on('text', function (ctx, next) {
    console.log("".concat(ctx.from.id, " input text : ").concat(ctx.message.text));
    next();
    // if (isNotLogin(ctx) && NEED_LOGIN_COMMAND.includes(ctx.message.text)) {
    //     ctx.replyWithMarkdown(getLoginWarning(ctx.from.first_name, ctx.from.last_name), Markup.removeKeyboard())
    // } else {
    //     console.log("check login : pass")
    //     next()
    // }
});
bot.on('callback_query', function (ctx, next) {
    console.log("callback query");
    console.log(ctx);
    next();
});
bot.start(function (ctx) {
    ctx.replyWithPhoto({ source: "./images/TCGIMG.png" }, {
        caption: "Hello ".concat(ctx.from.first_name, " ").concat(ctx.from.last_name, ". \nCheck /help to see all this bot can do"),
        parse_mode: 'Markdown'
    });
    // if (isNotLogin(ctx)) {
    //     ctx.replyWithPhoto({ source: "./images/TCGIMG.png" },
    //         {
    //             caption: getLoginWarning(ctx.from.first_name, ctx.from.last_name),
    //             parse_mode: 'MarkdownV2',
    //             ...Markup.forceReply().placeholder("/login <username> <password>")
    //         }
    //     )
    // } else {
    //     ctx.replyWithPhoto({ source: "./images/TCGIMG.png" },
    //         {
    //             caption: `Hello ${ctx.from.first_name} ${ctx.from.last_name}\\.\nCheck /help to see all this bot can do`,
    //             parse_mode: 'Markdown'
    //         }
    //     )
    // }
});
bot.help(function (ctx) {
    showMainMenu(ctx);
});
bot.action(MAIN_MENU, function (ctx) {
    try {
        ctx.deleteMessage();
        showMainMenu(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
function showMainMenu(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, "Bot Commands", {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
            keyboard: [
                [SSC_COMMAND, K3_COMMAND],
                [K32_COMMAND, TOP_WINNER_COMMAND],
                [BET_COMMAND]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    });
}
bot.hears(BET_COMMAND, function (ctx) {
    try {
        ctx.reply("betting ", {
            reply_markup: {
                keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
                resize_keyboard: true,
                one_time_keyboard: true
            }
        });
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.hears(SSC_COMMAND, function (ctx) {
    try {
        replySscGameList(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.action(SSC_COMMAND, function (ctx) {
    try {
        ctx.deleteMessage();
        replySscGameList(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
function replySscGameList(ctx) {
    var sscGameMenu = (0, db_js_1.getGameMenus)("SSC");
    if (sscGameMenu != null) {
        var gameButtons_1 = [];
        sscGameMenu.forEach(function (game) {
            var button = telegraf_1.Markup.button.callback(game.remark, "sscgame_".concat(game.remark));
            gameButtons_1.push(button);
        });
        var keboardArray = [];
        while (gameButtons_1.length) {
            var chunkSize = 3;
            keboardArray.push(gameButtons_1.slice(0, chunkSize));
            gameButtons_1.splice(0, chunkSize);
        }
        ctx.replyWithPhoto({ source: "./images/SSCIMG.png" }, __assign({ caption: (0, db_js_1.getGamesMessage)("*\u65F6\u65F6\u5F69*"), parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
    }
}
bot.action(/^sscgame_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, remark, caption, keboardArray;
    return __generator(this, function (_a) {
        try {
            if (ctx.match) {
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                remark = textArray[1];
                caption = (0, db_js_1.getGameButtonIntro)("\u65F6\u65F6\u5F69 / *".concat(remark, "*"));
                keboardArray = [
                    [telegraf_1.Markup.button.callback("♥️ 彩种销售说明", "sscgameintro_".concat(remark))],
                    [telegraf_1.Markup.button.callback("♠️ 游戏规则说明", "sscplaymenu_".concat(remark))],
                    [DOWNLOAD_HISTORY_BUTTON],
                    [GOTO_SSC_COMMAND_BUTTON]
                ];
                replySscView(ctx, caption, keboardArray);
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
bot.action(/^sscgameintro_/, function (ctx) {
    try {
        if (ctx.match) {
            ctx.deleteMessage();
            var textArray = ctx.match.input.split("_");
            var remark = textArray[1];
            var caption = (0, db_js_1.getSscGamesMessage)("\u65F6\u65F6\u5F69 / ".concat(remark, " / *\u5F69\u79CD\u9500\u552E\u8BF4\u660E*"));
            var keboardArray = [
                [telegraf_1.Markup.button.callback("♥️ 彩种销售说明", "sscgameintro_".concat(remark))],
                [telegraf_1.Markup.button.callback("♠️ 游戏规则说明", "sscplaymenu_".concat(remark))],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_SSC_COMMAND_BUTTON]
            ];
            replySscView(ctx, caption, keboardArray);
        }
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.action(/^sscplaymenu_/, function (ctx) {
    try {
        if (ctx.match) {
            ctx.deleteMessage();
            var textArray = ctx.match.input.split("_");
            var remark = textArray[1];
            var caption = "\n\u65F6\u65F6\u5F69 / ".concat(remark, " / *\u6E38\u620F\u89C4\u5219\u8BF4\u660E*\n\n\uD83D\uDC47 \u9EDE\u64CA\u73A9\u6CD5\u5217\u8868\uFF0C\u67E5\u770B\u8A73\u7D30\u73A9\u6CD5\u898F\u5247\u8AAA\u660E\n\n");
            var keboardArray = [
                [telegraf_1.Markup.button.callback('两面', "SSCPLAY_\u4E24\u9762_".concat(remark)), telegraf_1.Markup.button.callback('总和大小单双', "SSCPLAY_\u603B\u548C\u5927\u5C0F\u5355\u53CC_".concat(remark))],
                [telegraf_1.Markup.button.callback('前三特殊玩法', "SSCPLAY_\u524D\u4E09\u7279\u6B8A\u73A9\u6CD5_".concat(remark)), telegraf_1.Markup.button.callback('中三特殊玩法', "SSCPLAY_\u4E2D\u4E09\u7279\u6B8A\u73A9\u6CD5_".concat(remark)), telegraf_1.Markup.button.callback('后三特殊玩法', "SSCPLAY_\u540E\u4E09\u7279\u6B8A\u73A9\u6CD5_".concat(remark))],
                [telegraf_1.Markup.button.callback('龙虎斗', "SSCPLAY_\u9F99\u864E\u6597_".concat(remark)), telegraf_1.Markup.button.callback('全五中一', "SSCPLAY_\u5168\u4E94\u4E2D\u4E00_".concat(remark))],
                [telegraf_1.Markup.button.callback('牛牛玩法', "SSCPLAY_\u725B\u725B\u73A9\u6CD5_".concat(remark)), telegraf_1.Markup.button.callback('牛牛大小单双', "SSCPLAY_\u725B\u725B\u5927\u5C0F\u5355\u53CC_".concat(remark))],
                [telegraf_1.Markup.button.callback('梭哈玩法', "SSCPLAY_\u68AD\u54C8\u73A9\u6CD5_".concat(remark)), telegraf_1.Markup.button.callback('百家乐玩法', "SSCPLAY_\u767E\u5BB6\u4E50\u73A9\u6CD5_".concat(remark))],
                [telegraf_1.Markup.button.callback("\u21E0 ".concat(remark), "sscgame_".concat(remark))],
                [GOTO_SSC_COMMAND_BUTTON]
            ];
            replySscView(ctx, caption, keboardArray);
        }
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.action(/^SSCPLAY_/, function (ctx) {
    try {
        if (ctx.match) {
            ctx.deleteMessage();
            var textArray = ctx.match.input.split("_");
            var playName = textArray[1];
            var remark = textArray[2];
            var caption = (0, db_js_1.getSscPlayRule)("\u65F6\u65F6\u5F69 / ".concat(remark, " / \u6E38\u620F\u89C4\u5219\u8BF4\u660E / *").concat(playName, "*"), playName);
            var keboardArray = [
                [telegraf_1.Markup.button.callback("♥️ 彩种销售说明", "sscgameintro_".concat(remark))],
                [telegraf_1.Markup.button.callback("⇠ ♠️ 游戏规则说明", "sscplaymenu_".concat(remark))],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_SSC_COMMAND_BUTTON]
            ];
            replySscView(ctx, caption, keboardArray);
        }
    }
    catch (ex) {
        console.log(ex);
    }
});
function replySscView(ctx, caption, keboardArray) {
    return ctx.replyWithPhoto({ source: "./images/TCGFFC.png" }, __assign({ caption: caption, parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
}
bot.action(DOWNLOAD_HISTORY, function (ctx) {
    ctx.replyWithDocument({ source: "./db/TCGFFC history draw number.txt" });
});
bot.hears(K3_COMMAND, function (ctx) {
    try {
        replyK3GameMenus(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.action(K3_COMMAND, function (ctx) {
    try {
        ctx.deleteMessage();
        replyK3GameMenus(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
function replyK3GameMenus(ctx) {
    var gameMenu = (0, db_js_1.getGameMenus)("K3");
    if (gameMenu != null) {
        var gameButtons_2 = [];
        gameMenu.forEach(function (game) {
            var button = telegraf_1.Markup.button.callback(game.remark, "k3game_".concat(game.remark));
            gameButtons_2.push(button);
        });
        var keboardArray = [];
        while (gameButtons_2.length) {
            var chunkSize = 4;
            keboardArray.push(gameButtons_2.slice(0, chunkSize));
            gameButtons_2.splice(0, chunkSize);
        }
        ctx.replyWithPhoto({ source: "./images/K3IMG.png" }, __assign({ caption: (0, db_js_1.getGamesMessage)("*\u5FEB\u4E09*"), parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
    }
}
bot.action(/^k3game_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, remark, caption, keboardArray;
    return __generator(this, function (_a) {
        try {
            if (ctx.match) {
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                remark = textArray[1];
                caption = (0, db_js_1.getK3Message)("\u5FEB\u4E09 / *".concat(remark, "*"));
                keboardArray = [
                    [telegraf_1.Markup.button.callback("🎲 彩种说明", "k3play_".concat(remark))],
                    [DOWNLOAD_HISTORY_BUTTON],
                    [GOTO_K3_COMMAND_BUTTON]
                ];
                return [2 /*return*/, ctx.replyWithPhoto({ source: "./images/TCGK3.png" }, __assign({ caption: caption, parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)))];
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
bot.action(/^k3play_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, remark, rule1, rule2, rule3, rule4, keboardArray, ex_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                if (!ctx.match) return [3 /*break*/, 5];
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                remark = textArray[1];
                rule1 = (0, db_js_1.getK3PlayRule)(1);
                rule2 = (0, db_js_1.getK3PlayRule)(2);
                rule3 = (0, db_js_1.getK3PlayRule)(3);
                rule4 = (0, db_js_1.getK3PlayRule)(4);
                return [4 /*yield*/, ctx.replyWithMarkdownV2("\uD83C\uDFB2 \u5FEB\u4E09 / *".concat(remark, "* \uD83C\uDFB2\n            ").concat(rule1))];
            case 1:
                _a.sent();
                return [4 /*yield*/, ctx.replyWithMarkdownV2("".concat(rule2))];
            case 2:
                _a.sent();
                return [4 /*yield*/, ctx.replyWithMarkdownV2("".concat(rule3))];
            case 3:
                _a.sent();
                return [4 /*yield*/, ctx.replyWithMarkdownV2("".concat(rule4))];
            case 4:
                _a.sent();
                keboardArray = [
                    [DOWNLOAD_HISTORY_BUTTON],
                    [GOTO_K3_COMMAND_BUTTON]
                ];
                return [2 /*return*/, ctx.reply("\uD83C\uDFB2 \u5FEB\u4E09 / *".concat(remark, "* \uD83C\uDFB2"), __assign({ parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)))
                    // return ctx.replyWithPhoto({ source: "./images/TCGK3.png" },
                    //     {
                    //         caption: caption,
                    //         parse_mode: 'MarkdownV2',
                    //         ...Markup.inlineKeyboard(keboardArray)
                    //     })
                ];
            case 5: return [3 /*break*/, 7];
            case 6:
                ex_1 = _a.sent();
                console.log(ex_1);
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
bot.hears(K32_COMMAND, function (ctx) {
    try {
        replyK32GameMenus(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.action(K32_COMMAND, function (ctx) {
    try {
        ctx.deleteMessage();
        replyK32GameMenus(ctx);
    }
    catch (ex) {
        console.log(ex);
    }
});
function replyK32GameMenus(ctx) {
    var gameMenu = (0, db_js_1.getGameMenus)("K3");
    if (gameMenu != null) {
        var gameButtons_3 = [];
        gameMenu.forEach(function (game) {
            var button = telegraf_1.Markup.button.callback(game.remark, "k32game_".concat(game.remark));
            gameButtons_3.push(button);
        });
        var keboardArray = [];
        while (gameButtons_3.length) {
            var chunkSize = 4;
            keboardArray.push(gameButtons_3.slice(0, chunkSize));
            gameButtons_3.splice(0, chunkSize);
        }
        ctx.replyWithPhoto({ source: "./images/K3IMG.png" }, __assign({ caption: (0, db_js_1.getGamesMessage)("*\u5FEB\u4E092*"), parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
    }
}
bot.action(/^k32game_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, remark, caption, keboardArray;
    return __generator(this, function (_a) {
        try {
            if (ctx.match) {
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                remark = textArray[1];
                caption = (0, db_js_1.getK3Message)("\u5FEB\u4E092 / *".concat(remark, "*"));
                keboardArray = [
                    [telegraf_1.Markup.button.callback("🎲 彩种说明", "k32play_".concat(remark, "_1"))],
                    [DOWNLOAD_HISTORY_BUTTON],
                    [GOTO_K32_COMMAND_BUTTON]
                ];
                return [2 /*return*/, ctx.replyWithPhoto({ source: "./images/TCGK3.png" }, __assign({ caption: caption, parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)))];
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
bot.action(/^k32play_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, remark, page, prePage, nextPage, rule, caption, preButton, nextButton, keboardArray;
    return __generator(this, function (_a) {
        try {
            if (ctx.match) {
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                remark = textArray[1];
                page = Number(textArray[2]);
                prePage = page - 1;
                nextPage = page + 1;
                rule = (0, db_js_1.getK3PlayRule)(page);
                caption = "\uD83C\uDFB2 \u5FEB\u4E09 / *".concat(remark, "* \uD83C\uDFB2\n\n            ").concat(rule);
                preButton = telegraf_1.Markup.button.callback("⇠ Previous", "k32play_".concat(remark, "_").concat(prePage));
                nextButton = telegraf_1.Markup.button.callback("Next ⇢", "k32play_".concat(remark, "_").concat(nextPage));
                if (prePage < 1) {
                    preButton = telegraf_1.Markup.button.callback("", "k32play_".concat(remark, "_").concat(prePage), true);
                }
                if (nextPage > 4) {
                    nextButton = telegraf_1.Markup.button.callback("Next ⇢", "k32play_".concat(remark, "_").concat(nextPage), true);
                }
                keboardArray = [
                    [preButton, nextButton],
                    [DOWNLOAD_HISTORY_BUTTON],
                    [GOTO_K32_COMMAND_BUTTON]
                ];
                return [2 /*return*/, ctx.replyWithPhoto({ source: "./images/TCGK3.png" }, __assign({ caption: caption, parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)))];
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
bot.hears(TOP_WINNER_COMMAND, function (ctx) {
    try {
        var currentPage = 1;
        var data = (0, db_js_1.getTop20WinnerByIndex)(0);
        var caption = "\n\n\uD83C\uDFC6 TOP 1 \uD83C\uDFC6  \n<b>".concat(data.gameDisplayName, "</b>\ncustomer : ").concat(data.customerName, "\nwinAmount : ").concat(data.winAmount, "\n");
        replyTopWinner(ctx, caption, currentPage);
    }
    catch (ex) {
        console.log(ex);
    }
});
bot.action(/^中獎排行榜_/, function (ctx) {
    try {
        if (ctx.match) {
            var currentPage = ctx.match.input.split("_")[1];
            var index = Number(currentPage) - 1;
            var data = (0, db_js_1.getTop20WinnerByIndex)(index);
            var caption = "\n\n\uD83C\uDFC6 TOP ".concat(currentPage, " \uD83C\uDFC6  \n<b>").concat(data.gameDisplayName, " </b>\ncustomer : ").concat(data.customerName, "\nwinAmount : $ ").concat(data.winAmount, "\n");
            ctx.deleteMessage();
            replyTopWinner(ctx, caption, currentPage);
        }
    }
    catch (ex) {
        console.log(ex);
    }
});
function replyTopWinner(ctx, caption, currentPage) {
    var buttonArray = [];
    for (var page = 1; page <= 10; page++) {
        var buttonText = "".concat(page);
        if (page.toString() === currentPage.toString()) {
            buttonText = "\u00B7 ".concat(page, " \u00B7");
        }
        var button = telegraf_1.Markup.button.callback("".concat(buttonText), "".concat(TOP_WINNER_COMMAND, "_").concat(page));
        buttonArray.push(button);
    }
    var keboardArray = [];
    while (buttonArray.length) {
        var chunkSize = 5;
        keboardArray.push(buttonArray.slice(0, chunkSize));
        buttonArray.splice(0, chunkSize);
    }
    return ctx.replyWithPhoto({ source: "./images/TOP20WIN_1.png" }, __assign({ caption: caption, parse_mode: 'HTML' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
}
bot.command('games', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            replyGameMenuButtons(ctx);
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
bot.action('games', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            ctx.deleteMessage();
            ctx.answerCbQuery();
            replyGameMenuButtons(ctx);
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
function replyGameMenuButtons(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var gameMenuButtons, gameMenus, keboardArray, chunkSize, ex_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    gameMenuButtons = [];
                    return [4 /*yield*/, getGameMenu(ctx)];
                case 1:
                    gameMenus = _a.sent();
                    gameMenus.forEach(function (element, index) {
                        var button = telegraf_1.Markup.button.callback(element.labelName, "menu_".concat(element.labelName, "_").concat(index));
                        gameMenuButtons.push(button);
                    });
                    keboardArray = [];
                    while (gameMenuButtons.length) {
                        chunkSize = 3;
                        keboardArray.push(gameMenuButtons.slice(0, chunkSize));
                        gameMenuButtons.splice(0, chunkSize);
                    }
                    console.log(keboardArray);
                    ctx.replyWithPhoto({ source: "./images/SSCIMG.png" }, __assign({ caption: (0, db_js_1.getGamesMessage)("*Game Menu*"), parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
                    return [3 /*break*/, 3];
                case 2:
                    ex_2 = _a.sent();
                    console.log(ex_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
bot.action(/^menu_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, menuLabel, menuSort, gameMenus, gameMenu, games, gameButtons_4, keboardArray, chunkSize, backButton, ex_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!ctx.match) return [3 /*break*/, 2];
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                menuLabel = textArray[1];
                menuSort = textArray[2];
                return [4 /*yield*/, getGameMenu(ctx)];
            case 1:
                gameMenus = _a.sent();
                gameMenu = gameMenus[menuSort];
                games = gameMenu.gameMenus;
                gameButtons_4 = [];
                games.forEach(function (game) {
                    var button = telegraf_1.Markup.button.callback(game.remark, "game_".concat(game.remark, "_").concat(game.gameId, "_").concat(game.gameGroupCode, "_").concat(ctx.match.input));
                    gameButtons_4.push(button);
                });
                keboardArray = [];
                while (gameButtons_4.length) {
                    chunkSize = 3;
                    keboardArray.push(gameButtons_4.slice(0, chunkSize));
                    gameButtons_4.splice(0, chunkSize);
                }
                backButton = [telegraf_1.Markup.button.callback("Back to Game Menu", "games")];
                keboardArray.push(backButton);
                console.log(keboardArray);
                ctx.answerCbQuery();
                ctx.replyWithPhoto({ source: "./images/SSCIMG.png" }, __assign({ caption: (0, db_js_1.getGamesMessage)("Game Menu / *".concat(menuLabel, "*")), parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard(keboardArray)));
                _a.label = 2;
            case 2: return [3 /*break*/, 4];
            case 3:
                ex_3 = _a.sent();
                console.log(ex_3);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
function getGameMenu(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, axios_1["default"].get(LGW_GAME_MENU, {
                        params: {
                            prizeMode: 'Lott'
                        },
                        headers: getHeader(ctx.from.id)
                    }).then(function (resp) { return resp.data; })["catch"](function (ex) {
                        console.log(ex);
                    })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    });
}
bot.command("/test", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var result1, result2, chatId, url1, url2, url2_;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, ctx.replyWithPhoto({ source: "./images/TCGFFC.png" }, {
                    caption: (0, db_js_1.getSscPlayRule)("SSC_GAME_RULE_1").replace("{remark}", "天成分分彩"),
                    parse_mode: 'MarkdownV2'
                })];
            case 1:
                result1 = _b.sent();
                console.log(result1);
                return [4 /*yield*/, ctx.replyWithPhoto({ source: "./images/TCGFFC.png" }, {
                        caption: (0, db_js_1.getSscPlayRule)("SSC_GAME_RULE_2").replace("{remark}", "天成分分彩"),
                        parse_mode: 'MarkdownV2'
                    })
                    // ctx.telegram.editMessageCaption(chatId, result1.message_id)
                ];
            case 2:
                result2 = _b.sent();
                chatId = ctx.from.id;
                url1 = "https://t.me/c/".concat(chatId, "/").concat(result1.message_id);
                url2 = "https://t.me/c/".concat(chatId, "/").concat(result2.message_id);
                url2_ = "https://t.me/c/".concat((_a = result2.from) === null || _a === void 0 ? void 0 : _a.id, "/").concat(result2.message_id);
                return [2 /*return*/];
        }
    });
}); });
bot.action(/^game_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, remark, gameId, gameGroupCode, backToGameCommand;
    return __generator(this, function (_a) {
        try {
            if (ctx.match) {
                ctx.deleteMessage();
                textArray = ctx.match.input.split("_");
                remark = textArray[1];
                gameId = textArray[2];
                gameGroupCode = textArray[3];
                backToGameCommand = ctx.match.input.substring(ctx.match.input.indexOf("menu"));
                if (gameGroupCode === "SSC") {
                    return [2 /*return*/, ctx.replyWithPhoto({ source: "./images/TCGFFC.png" }, __assign({ caption: (0, db_js_1.getGamesMessage)("Game Menu / ".concat(textArray[5], " / *").concat(remark, "*")), parse_mode: 'MarkdownV2' }, telegraf_1.Markup.inlineKeyboard([
                            [telegraf_1.Markup.button.callback('两面', 'PLAYMENU_两面'), telegraf_1.Markup.button.callback('总和大小单双', 'PLAYMENU_总和大小单双')],
                            [telegraf_1.Markup.button.callback('前三特殊玩法', 'PLAYMENU_前三特殊玩法'), telegraf_1.Markup.button.callback('中三特殊玩法', 'PLAYMENU_中三特殊玩法'), telegraf_1.Markup.button.callback('后三特殊玩法', 'PLAYMENU_后三特殊玩法')],
                            [telegraf_1.Markup.button.callback('龙虎斗', 'PLAYMENU_龙虎斗'), telegraf_1.Markup.button.callback('全五中一', 'PLAYMENU_全五中一')],
                            [telegraf_1.Markup.button.callback('牛牛玩法', 'PLAYMENU_牛牛玩法'), telegraf_1.Markup.button.callback('牛牛大小单双', 'PLAYMENU_牛牛大小单双')],
                            [telegraf_1.Markup.button.callback('梭哈玩法', 'PLAYMENU_梭哈玩法'), telegraf_1.Markup.button.callback('百家乐玩法', 'PLAYMENU_百家乐玩法')],
                            [telegraf_1.Markup.button.callback('Back to SSC Games', backToGameCommand)]
                        ])))];
                }
                else {
                }
                // ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
                //     {
                //         caption: GAME_RULES.replace("{remark}", remark),
                //         parse_mode: 'MarkdownV2',
                //         ...Markup.inlineKeyboard([
                //             [Markup.button.callback('Plain', 'plain')],
                //             [Markup.button.callback('Italic', 'italic')]
                //         ])
                //     }
                // )
                // get play_menu
                // let playMenu = await getPlayMenu(ctx, gameId)
                // if (playMenu != null && playMenu.length > 0) {
                //     playMenu[0].playMenuGroups.forEach(data => {
                //         console.log(data)
                //     })
                // }
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
bot.action(/^PLAYMENU_/, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var textArray, playName;
    return __generator(this, function (_a) {
        try {
            if (ctx.match) {
                textArray = ctx.match.input.split("_");
                playName = textArray[1];
                console.log(ctx.match);
                // ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
                //     {
                //         caption: GAME_RULES.replace("{remark}", remark),
                //         parse_mode: 'MarkdownV2',
                //         ...Markup.inlineKeyboard([
                //             [Markup.button.callback('Plain', 'plain')],
                //             [Markup.button.callback('Italic', 'italic')]
                //         ])
                //     }
                // )
            }
        }
        catch (ex) {
            console.log(ex);
        }
        return [2 /*return*/];
    });
}); });
// async function getPlayMenu(ctx, gameId) {
//     let playType = 1
//     let LGW_PLAY_MENU = `${LGW_PREFIX}/games/${gameId}/play_menu/${playType}`
//     return await axios.get(LGW_PLAY_MENU, {
//         headers: getHeader(ctx.from.id)
//     }).then(resp => resp.data
//     ).catch(ex => {
//         console.log(ex)
//     })
// }
bot.command('login', function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var tgId, sessionObj, ex_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                tgId = ctx.from.id;
                sessionObj = cache.get(tgId);
                if (!(sessionObj == null)) return [3 /*break*/, 2];
                return [4 /*yield*/, getSessionObj(ctx)];
            case 1:
                sessionObj = _a.sent();
                _a.label = 2;
            case 2:
                if (sessionObj != null) {
                    ctx.replyWithMarkdown("login success!\nCheck /help to see all this bot can do");
                }
                return [3 /*break*/, 4];
            case 3:
                ex_4 = _a.sent();
                console.log('login failed.' + ex_4);
                ctx.reply('login failed');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
function getSessionObj(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var tgId, ussObj, sessionObj;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tgId = ctx.from.id;
                    return [4 /*yield*/, loginLGW(ctx)];
                case 1:
                    ussObj = _a.sent();
                    if (ussObj != null) {
                        sessionObj = createSessionObj(ussObj);
                        cache.set(tgId, sessionObj, SESSION_EXPIRED_SECONDS);
                        return [2 /*return*/, sessionObj];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
function loginLGW(ctx) {
    return __awaiter(this, void 0, void 0, function () {
        var input, inputArray, myId, username, password, ussResponse_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    input = ctx.message.text;
                    inputArray = input.split(" ");
                    myId = 480880445;
                    if ((inputArray.length < 3) && ctx.from.id === myId) {
                        inputArray = ["", "wannadie", "123qwe"];
                    }
                    if (!(inputArray.length === 3)) return [3 /*break*/, 2];
                    username = "tcgdemov3@" + inputArray[1];
                    password = inputArray[2];
                    return [4 /*yield*/, axios_1["default"].post(USS_CUSTOMER_SESSION, {
                            "clientIp": "127.0.0.1",
                            "clientUserAgent": "Chrome/102.0.5005.63",
                            "customerName": username,
                            "password": password
                        }).then(function (resp) {
                            if (resp === undefined) {
                                console.log('get uss customer session failed. uss response undefined');
                                ctx.reply("Please check your username and password");
                            }
                            return resp.data;
                        })["catch"](function (ex) {
                            console.log(ex);
                        })];
                case 1:
                    ussResponse_1 = _a.sent();
                    return [2 /*return*/, axios_1["default"].post(LGW_LAUNCH_GAME, {
                            "customerName": username,
                            "nickname": "OOXX",
                            "customerId": ussResponse_1.user.customerId,
                            "token": ussResponse_1.token,
                            "merchant": ussResponse_1.user.merchantModel.merchantCode,
                            "trial": "false",
                            "state": "Normal",
                            "settingGroupId": 0,
                            "password": ussResponse_1.user.password,
                            "gameCode": "ARP3D",
                            "view": "betting",
                            "mode": "Traditional",
                            "language": "zh_CN",
                            "backUrl": "https://tcgdemov3.com",
                            "gameGroup": "1",
                            "clientIp": "string"
                        }, {
                            headers: {
                                "merchant": ussResponse_1.user.merchantModel.merchantCode,
                                "Content-Type": "application/json"
                            }
                        }).then(function () {
                            return ussResponse_1;
                        })["catch"](function (ex) {
                            console.log(ex);
                            ctx.reply('lgw login failed.');
                        })];
                case 2:
                    ctx.replyWithMarkdown("Please input /login `<username> <password>`");
                    _a.label = 3;
                case 3: return [2 /*return*/];
            }
        });
    });
}
function createSessionObj(ussObj) {
    return new SessionObject(ussObj.token, ussObj.user.merchantModel.merchantCode);
}
function getHeader(tgId) {
    var sessionObj = cache.get(tgId);
    if (sessionObj != null) {
        var token = sessionObj.token;
        var merchant = sessionObj.merchant;
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
            "Merchant": merchant
        };
    }
}
function isNotLogin(ctx) {
    var sessionObj = cache.get(ctx.from.id);
    if (!sessionObj) {
        return true;
    }
    return false;
}
bot.launch();
// Enable graceful stop
process.once('SIGINT', function () { return bot.stop('SIGINT'); });
process.once('SIGTERM', function () { return bot.stop('SIGTERM'); });
