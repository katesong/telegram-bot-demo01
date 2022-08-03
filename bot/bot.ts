import { Markup, session, Telegraf } from 'telegraf';
import axios from 'axios';
import * as NodeCache from 'node-cache';
import * as SessionObject from './SessionObject.js'
import { getSscPlayRule, getLoginWarning, getGamesMessage, getSscGamesMessage, getGameButtonIntro, getGameMenus, getK3Message, getK3PlayRule, getTop20WinnerByIndex } from './db/db.js'


const SESSION_EXPIRED_SECONDS = 86400
const cache = new NodeCache()

const USS_CUSTOMER_SESSION = 'http://10.8.90.13:7001/user-service-service/resources/customer_sessions'
const LGW_PREFIX = 'http://10.8.90.22:7001/lgw-service/resources'
const LGW_LAUNCH_GAME = LGW_PREFIX + '/internal/launch_game'
const LGW_GAME_MENU = LGW_PREFIX + '/games/game_menus'

// const BOT_TOKEN = '5373210588:AAHXW7qemfd3xCQ8UgjEiB2PyE5jgymrb4A';
const BOT_TOKEN = "5510481763:AAG9d3EeFzfbcai1Ru7VODpyZNVKkV3BvWE" //test
// const BOT_TOKEN = "5538829192:AAGmxQ3cjgg66nG9vXSOJthA4Te02pXo-1I"
const bot = new Telegraf(BOT_TOKEN)


const MAIN_MENU = "main_menu"
const MAIN_MENU_BUTTON = Markup.button.callback("⇠ Show Main Menu", MAIN_MENU)
const DOWNLOAD_HISTORY = "download_history"
const DOWNLOAD_HISTORY_BUTTON = Markup.button.callback("📈 下載近30期歷史獎號", DOWNLOAD_HISTORY)
const SSC_COMMAND = "时时彩"
const GOTO_SSC_COMMAND_BUTTON = Markup.button.callback('⇠ Back to SSC Games', SSC_COMMAND)
const K3_COMMAND = "快三"
const GOTO_K3_COMMAND_BUTTON = Markup.button.callback('⇠ Back to K3 Games', K3_COMMAND)
const K32_COMMAND = "快三2"
const GOTO_K32_COMMAND_BUTTON = Markup.button.callback('⇠ Back to K3_2 Games', K32_COMMAND)
const TOP_WINNER_COMMAND = "中獎排行榜"

// const NEED_LOGIN_COMMAND = ["/help", "/games", /^menu_/]
const NEED_LOGIN_COMMAND = [""]

// bot.use(Telegraf.log())
bot.on('text', (ctx, next) => {
    console.log(`${ctx.from.id} input text : ${ctx.message.text}`)

    if (isNotLogin(ctx) && NEED_LOGIN_COMMAND.includes(ctx.message.text)) {
        ctx.replyWithMarkdown(getLoginWarning(ctx.from.first_name, ctx.from.last_name), Markup.removeKeyboard())
    } else {
        console.log("check login : pass")
        next()
    }
})
bot.on('callback_query', (ctx, next) => {
    console.log("callback query")
    console.log(ctx)

    next()
})



bot.start(ctx => {

    if (isNotLogin(ctx)) {
        ctx.replyWithPhoto({ source: "./images/TCGIMG.png" },
            {
                caption: getLoginWarning(ctx.from.first_name, ctx.from.last_name),
                parse_mode: 'MarkdownV2',
                ...Markup.forceReply().placeholder("/login <username> <password>")
            }
        )

    } else {
        ctx.replyWithPhoto({ source: "./images/TCGIMG.png" },
            {
                caption: `Hello ${ctx.from.first_name} ${ctx.from.last_name}\\.\nCheck /help to see all this bot can do`,
                parse_mode: 'Markdown'
            }
        )
    }

})

bot.help(ctx => {

    showMainMenu(ctx)
})

bot.action(MAIN_MENU, ctx => {
    try {
        ctx.deleteMessage()
        showMainMenu(ctx)

    } catch (ex) {
        console.log(ex)
    }
})

function showMainMenu(ctx) {
    bot.telegram.sendMessage(ctx.chat.id, "Bot Commands", {
        reply_to_message_id: ctx.message.message_id,
        reply_markup: {
            keyboard: [
                [SSC_COMMAND, K3_COMMAND, K32_COMMAND],
                [TOP_WINNER_COMMAND, "近期訂單查詢", "/games"]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

bot.hears(SSC_COMMAND, ctx => {
    try {
        replySscGameList(ctx)

    } catch (ex) {
        console.log(ex)
    }
})

bot.action(SSC_COMMAND, ctx => {

    try {
        ctx.deleteMessage()
        replySscGameList(ctx)

    } catch (ex) {
        console.log(ex)
    }
})

function replySscGameList(ctx) {
    let sscGameMenu = getGameMenus("SSC")
    if (sscGameMenu != null) {

        let gameButtons = []
        sscGameMenu.forEach(game => {
            let button = Markup.button.callback(game.remark, `sscgame_${game.remark}`)
            gameButtons.push(button)
        })

        var keboardArray = []
        while (gameButtons.length) {
            let chunkSize = 3
            keboardArray.push(gameButtons.slice(0, chunkSize));
            gameButtons.splice(0, chunkSize);
        }

        ctx.replyWithPhoto({ source: "./images/SSCIMG.png" },
            {
                caption: getGamesMessage(`*时时彩*`),
                parse_mode: 'MarkdownV2',
                ...Markup.inlineKeyboard(keboardArray)
            }
        )
    }
}

bot.action(/^sscgame_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]

            let caption = getGameButtonIntro(`时时彩 / *${remark}*`)

            let keboardArray = [
                [Markup.button.callback("♥️ 彩种销售说明", `sscgameintro_${remark}`)],
                [Markup.button.callback("♠️ 游戏规则说明", `sscplaymenu_${remark}`)],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_SSC_COMMAND_BUTTON]
            ]

            replySscView(ctx, caption, keboardArray)
        }

    } catch (ex) {
        console.log(ex)
    }
})

bot.action(/^sscgameintro_/, ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]

            let caption = getSscGamesMessage(`时时彩 / ${remark} / *彩种销售说明*`)

            let keboardArray = [
                [Markup.button.callback("♥️ 彩种销售说明", `sscgameintro_${remark}`)],
                [Markup.button.callback("♠️ 游戏规则说明", `sscplaymenu_${remark}`)],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_SSC_COMMAND_BUTTON]
            ]

            replySscView(ctx, caption, keboardArray)
        }

    } catch (ex) {
        console.log(ex)
    }
})

bot.action(/^sscplaymenu_/, ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]

            let caption = `
时时彩 / ${remark} / *游戏规则说明*

👇 點擊玩法列表，查看詳細玩法規則說明

`
            let keboardArray = [
                [Markup.button.callback('两面', `SSCPLAY_两面_${remark}`), Markup.button.callback('总和大小单双', `SSCPLAY_总和大小单双_${remark}`)],
                [Markup.button.callback('前三特殊玩法', `SSCPLAY_前三特殊玩法_${remark}`), Markup.button.callback('中三特殊玩法', `SSCPLAY_中三特殊玩法_${remark}`), Markup.button.callback('后三特殊玩法', `SSCPLAY_后三特殊玩法_${remark}`)],
                [Markup.button.callback('龙虎斗', `SSCPLAY_龙虎斗_${remark}`), Markup.button.callback('全五中一', `SSCPLAY_全五中一_${remark}`)],
                [Markup.button.callback('牛牛玩法', `SSCPLAY_牛牛玩法_${remark}`), Markup.button.callback('牛牛大小单双', `SSCPLAY_牛牛大小单双_${remark}`)],
                [Markup.button.callback('梭哈玩法', `SSCPLAY_梭哈玩法_${remark}`), Markup.button.callback('百家乐玩法', `SSCPLAY_百家乐玩法_${remark}`)],
                [Markup.button.callback(`⇠ ${remark}`, `sscgame_${remark}`)],
                [GOTO_SSC_COMMAND_BUTTON]
            ]

            replySscView(ctx, caption, keboardArray)
        }

    } catch (ex) {
        console.log(ex)
    }
})

bot.action(/^SSCPLAY_/, ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let playName = textArray[1]
            let remark = textArray[2]

            let caption = getSscPlayRule(`时时彩 / ${remark} / 游戏规则说明 / *${playName}*`, playName)

            let keboardArray = [
                [Markup.button.callback("♥️ 彩种销售说明", `sscgameintro_${remark}`)],
                [Markup.button.callback("⇠ ♠️ 游戏规则说明", `sscplaymenu_${remark}`)],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_SSC_COMMAND_BUTTON]
            ]

            replySscView(ctx, caption, keboardArray)
        }

    } catch (ex) {
        console.log(ex)
    }
})

function replySscView(ctx, caption, keboardArray) {

    return ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
        {
            caption: caption,
            parse_mode: 'MarkdownV2',
            ...Markup.inlineKeyboard(keboardArray)
        })
}

bot.action(DOWNLOAD_HISTORY, ctx => {
    ctx.replyWithDocument({ source: "./db/TCGFFC history draw number.txt" })
})



bot.hears(K3_COMMAND, ctx => {
    try {
        replyK3GameMenus(ctx)

    } catch (ex) {
        console.log(ex)
    }

})
bot.action(K3_COMMAND, ctx => {

    try {
        ctx.deleteMessage()
        replyK3GameMenus(ctx)

    } catch (ex) {
        console.log(ex)
    }
})

function replyK3GameMenus(ctx) {
    let gameMenu = getGameMenus("K3")

    if (gameMenu != null) {

        let gameButtons = []
        gameMenu.forEach(game => {
            let button = Markup.button.callback(game.remark, `k3game_${game.remark}`)
            gameButtons.push(button)
        })

        var keboardArray = []
        while (gameButtons.length) {
            let chunkSize = 4
            keboardArray.push(gameButtons.slice(0, chunkSize));
            gameButtons.splice(0, chunkSize);
        }

        ctx.replyWithPhoto({ source: "./images/K3IMG.png" },
            {
                caption: getGamesMessage(`*快三*`),
                parse_mode: 'MarkdownV2',
                ...Markup.inlineKeyboard(keboardArray)
            }
        )
    }
}

bot.action(/^k3game_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]

            let caption = getK3Message(`快三 / *${remark}*`)

            let keboardArray = [
                [Markup.button.callback("🎲 彩种说明", `k3play_${remark}`)],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_K3_COMMAND_BUTTON]
            ]

            return ctx.replyWithPhoto({ source: "./images/TCGK3.png" },
                {
                    caption: caption,
                    parse_mode: 'MarkdownV2',
                    ...Markup.inlineKeyboard(keboardArray)
                })
        }

    } catch (ex) {
        console.log(ex)
    }
})

bot.action(/^k3play_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]

            let rule1 = getK3PlayRule(1)
            let rule2 = getK3PlayRule(2)
            let rule3 = getK3PlayRule(3)
            let rule4 = getK3PlayRule(4)

            await ctx.replyWithMarkdownV2(`🎲 快三 / *${remark}* 🎲
            ${rule1}`)

            await ctx.replyWithMarkdownV2(`${rule2}`)

            await ctx.replyWithMarkdownV2(`${rule3}`)

            await ctx.replyWithMarkdownV2(`${rule4}`)

            let keboardArray = [
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_K3_COMMAND_BUTTON]
            ]

            return ctx.reply(`🎲 快三 / *${remark}* 🎲`, {
                parse_mode: 'MarkdownV2',
                ...Markup.inlineKeyboard(keboardArray)
            })

            // return ctx.replyWithPhoto({ source: "./images/TCGK3.png" },
            //     {
            //         caption: caption,
            //         parse_mode: 'MarkdownV2',
            //         ...Markup.inlineKeyboard(keboardArray)
            //     })
        }

    } catch (ex) {
        console.log(ex)
    }
})



bot.hears(K32_COMMAND, ctx => {
    try {
        replyK32GameMenus(ctx)

    } catch (ex) {
        console.log(ex)
    }

})
bot.action(K32_COMMAND, ctx => {

    try {
        ctx.deleteMessage()
        replyK32GameMenus(ctx)

    } catch (ex) {
        console.log(ex)
    }
})
function replyK32GameMenus(ctx) {
    let gameMenu = getGameMenus("K3")

    if (gameMenu != null) {

        let gameButtons = []
        gameMenu.forEach(game => {
            let button = Markup.button.callback(game.remark, `k32game_${game.remark}`)
            gameButtons.push(button)
        })

        var keboardArray = []
        while (gameButtons.length) {
            let chunkSize = 4
            keboardArray.push(gameButtons.slice(0, chunkSize));
            gameButtons.splice(0, chunkSize);
        }

        ctx.replyWithPhoto({ source: "./images/K3IMG.png" },
            {
                caption: getGamesMessage(`*快三2*`),
                parse_mode: 'MarkdownV2',
                ...Markup.inlineKeyboard(keboardArray)
            }
        )
    }
}
bot.action(/^k32game_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]

            let caption = getK3Message(`快三2 / *${remark}*`)

            let keboardArray = [
                [Markup.button.callback("🎲 彩种说明", `k32play_${remark}_1`)],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_K32_COMMAND_BUTTON]
            ]

            return ctx.replyWithPhoto({ source: "./images/TCGK3.png" },
                {
                    caption: caption,
                    parse_mode: 'MarkdownV2',
                    ...Markup.inlineKeyboard(keboardArray)
                })
        }

    } catch (ex) {
        console.log(ex)
    }
})
bot.action(/^k32play_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]
            let page = Number(textArray[2])
            let prePage = page - 1
            let nextPage = page + 1
            
            let rule = getK3PlayRule(page)

            let caption = `🎲 快三 / *${remark}* 🎲

            ${rule}`

            let preButton = Markup.button.callback("⇠ Previous", `k32play_${remark}_${prePage}`)
            let nextButton = Markup.button.callback("Next ⇢", `k32play_${remark}_${nextPage}`)

            if (prePage < 1) {
                preButton = Markup.button.callback("", `k32play_${remark}_${prePage}`, true)
            }

            if (nextPage > 4) {
                nextButton = Markup.button.callback("Next ⇢", `k32play_${remark}_${nextPage}`, true)
            }

            let keboardArray = [
                [preButton, nextButton],
                [DOWNLOAD_HISTORY_BUTTON],
                [GOTO_K32_COMMAND_BUTTON]
            ]

            return ctx.replyWithPhoto({ source: "./images/TCGK3.png" },
                {
                    caption: caption,
                    parse_mode: 'MarkdownV2',
                    ...Markup.inlineKeyboard(keboardArray)
                })
        }

    } catch (ex) {
        console.log(ex)
    }
})



bot.hears(TOP_WINNER_COMMAND, ctx => {
    try {
        
        let currentPage = 1
        let data = getTop20WinnerByIndex(0)
        let caption = `

🏆 TOP 1 🏆  
<b>${data.gameDisplayName}</b>
customer : ${data.customerName}
winAmount : ${data.winAmount}
`
        replyTopWinner(ctx, caption, currentPage)

    } catch (ex) {
        console.log(ex)
    }

})

bot.action(/^中獎排行榜_/, ctx => {
    try {
        if (ctx.match) {
            
            let currentPage = ctx.match.input.split("_")[1]

            let index = Number(currentPage) - 1
            let data = getTop20WinnerByIndex(index)
            let caption = `

🏆 TOP ${currentPage} 🏆  
<b>${data.gameDisplayName} </b>
customer : ${data.customerName}
winAmount : $ ${data.winAmount}
`
            ctx.deleteMessage()

            replyTopWinner(ctx, caption, currentPage)
        
        }
    } catch (ex) {
        console.log(ex)
    }

})

function replyTopWinner(ctx, caption, currentPage) {

    var buttonArray = []
    for (var page = 1; page <= 10; page++) {
        var buttonText = `${page}`

        if (page.toString() === currentPage.toString()) {
            buttonText = `· ${page} ·`
        }

        let button = Markup.button.callback(`${buttonText}`, `${TOP_WINNER_COMMAND}_${page}`)
        buttonArray.push(button)
    }

    var keboardArray = []
    while (buttonArray.length) {
        let chunkSize = 5
        keboardArray.push(buttonArray.slice(0, chunkSize));
        buttonArray.splice(0, chunkSize);
    }

    return ctx.replyWithPhoto({ source: "./images/TOP20WIN_1.png" },
        {
            caption: caption,
            parse_mode: 'HTML',
            ...Markup.inlineKeyboard(keboardArray)
        })
}






bot.command('games', async (ctx) => {
    try {
        replyGameMenuButtons(ctx)

    } catch (ex) {
        console.log(ex)
    }
})
bot.action('games', async (ctx) => {
    try {
        ctx.deleteMessage()
        ctx.answerCbQuery()
        replyGameMenuButtons(ctx)

    } catch (ex) {
        console.log(ex)
    }
})
async function replyGameMenuButtons(ctx) {
    try {
        var gameMenuButtons = [];

        let gameMenus = await getGameMenu(ctx)
        gameMenus.forEach((element, index) => {
            let button = Markup.button.callback(element.labelName, `menu_${element.labelName}_${index}`)
            gameMenuButtons.push(button)
        });

        var keboardArray = []
        while (gameMenuButtons.length) {
            let chunkSize = 3
            keboardArray.push(gameMenuButtons.slice(0, chunkSize));
            gameMenuButtons.splice(0, chunkSize);
        }

        console.log(keboardArray)

        ctx.replyWithPhoto({ source: "./images/SSCIMG.png" },
            {
                caption: getGamesMessage(`*Game Menu*`),
                parse_mode: 'MarkdownV2',
                ...Markup.inlineKeyboard(keboardArray)
            }
        )

    } catch (ex) {
        console.log(ex)
    }
}
bot.action(/^menu_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let menuLabel = textArray[1]
            let menuSort = textArray[2]

            let gameMenus = await getGameMenu(ctx)
            let gameMenu = gameMenus[menuSort]
            let games = gameMenu.gameMenus

            let gameButtons = []
            games.forEach(game => {
                let button = Markup.button.callback(game.remark, `game_${game.remark}_${game.gameId}_${game.gameGroupCode}_${ctx.match.input}`)
                gameButtons.push(button)
            })

            var keboardArray = []
            while (gameButtons.length) {
                let chunkSize = 3
                keboardArray.push(gameButtons.slice(0, chunkSize));
                gameButtons.splice(0, chunkSize);
            }

            let backButton = [Markup.button.callback("Back to Game Menu", "games")]
            keboardArray.push(backButton)

            console.log(keboardArray)

            ctx.answerCbQuery()

            ctx.replyWithPhoto({ source: "./images/SSCIMG.png" },
                {
                    caption: getGamesMessage(`Game Menu / *${menuLabel}*`),
                    parse_mode: 'MarkdownV2',
                    ...Markup.inlineKeyboard(keboardArray)
                }
            )

        }
    } catch (ex) {
        console.log(ex)
    }

})



async function getGameMenu(ctx) {
    return await axios.get(LGW_GAME_MENU, {
        params: {
            prizeMode: 'Lott'
        },
        headers: getHeader(ctx.from.id)
    }).then(resp => resp.data
    ).catch(ex => {
        console.log(ex)
    })
}
const web_link = "https://9aa6-114-36-201-58.ap.ngrok.io"
bot.command("/test", async ctx => {

    let result1 = await ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
        {
            caption: getSscPlayRule("SSC_GAME_RULE_1").replace("{remark}", "天成分分彩"),
            parse_mode: 'MarkdownV2'
        }
    )

    console.log(result1)

    let result2 = await ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
        {
            caption: getSscPlayRule("SSC_GAME_RULE_2").replace("{remark}", "天成分分彩"),
            parse_mode: 'MarkdownV2'
        }
    )

    // ctx.telegram.editMessageCaption(chatId, result1.message_id)
    let chatId = ctx.from.id
    let url1 = `https://t.me/c/${chatId}/${result1.message_id}`
    let url2 = `https://t.me/c/${chatId}/${result2.message_id}`
    let url2_ = `https://t.me/c/${result2.from?.id}/${result2.message_id}`

    // ctx.telegram.editMessageCaption(chatId, result1.message_id, undefined, 
    //     GAME_RULES.replace("{remark}", "天成分分彩") + `*1* • [2](${url2}) • [22](${url2_}) `, 
    //     {parse_mode: 'MarkdownV2'})



    // ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
    //     {
    //         caption: GAME_RULES3.replace("{remark}", "天成分分彩"),
    //         parse_mode: 'MarkdownV2',
    //         ...Markup.inlineKeyboard([
    //             [Markup.button.callback('Plain', 'plain')],
    //             [Markup.button.callback('Italic', 'italic')]
    //         ])
    //     }
    // )
})
bot.action(/^game_/, async ctx => {
    try {
        if (ctx.match) {
            ctx.deleteMessage()

            let textArray = ctx.match.input.split("_")
            let remark = textArray[1]
            let gameId = textArray[2]
            let gameGroupCode = textArray[3]
            let backToGameCommand = ctx.match.input.substring(ctx.match.input.indexOf("menu"))

            if (gameGroupCode === "SSC") {

                return ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
                    {
                        caption: getGamesMessage(`Game Menu / ${textArray[5]} / *${remark}*`),
                        parse_mode: 'MarkdownV2',
                        ...Markup.inlineKeyboard([
                            [Markup.button.callback('两面', 'PLAYMENU_两面'), Markup.button.callback('总和大小单双', 'PLAYMENU_总和大小单双')],
                            [Markup.button.callback('前三特殊玩法', 'PLAYMENU_前三特殊玩法'), Markup.button.callback('中三特殊玩法', 'PLAYMENU_中三特殊玩法'), Markup.button.callback('后三特殊玩法', 'PLAYMENU_后三特殊玩法')],
                            [Markup.button.callback('龙虎斗', 'PLAYMENU_龙虎斗'), Markup.button.callback('全五中一', 'PLAYMENU_全五中一')],
                            [Markup.button.callback('牛牛玩法', 'PLAYMENU_牛牛玩法'), Markup.button.callback('牛牛大小单双', 'PLAYMENU_牛牛大小单双')],
                            [Markup.button.callback('梭哈玩法', 'PLAYMENU_梭哈玩法'), Markup.button.callback('百家乐玩法', 'PLAYMENU_百家乐玩法')],

                            [Markup.button.callback('Back to SSC Games', backToGameCommand)]
                        ])
                    })

            } else {



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

    } catch (ex) {
        console.log(ex)
    }
})
bot.action(/^PLAYMENU_/, async ctx => {
    try {
        if (ctx.match) {
            let textArray = ctx.match.input.split("_")
            let playName = textArray[1]

            console.log(ctx.match)

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

    } catch (ex) {
        console.log(ex)
    }
})


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




bot.command('login', async (ctx) => {
    try {
        let tgId = ctx.from.id
        let sessionObj = cache.get(tgId)

        if (sessionObj == null) {
            sessionObj = await getSessionObj(ctx)
        }

        if (sessionObj != null) {
            ctx.replyWithMarkdown(`login success!\nCheck /help to see all this bot can do`)
        }

    } catch (ex) {
        console.log('login failed.' + ex)
        ctx.reply('login failed')
    }
})
async function getSessionObj(ctx) {
    let tgId = ctx.from.id
    let ussObj = await loginLGW(ctx)

    if (ussObj != null) {
        let sessionObj = createSessionObj(ussObj)
        cache.set(tgId, sessionObj, SESSION_EXPIRED_SECONDS)
        return sessionObj
    }

    return null
}
async function loginLGW(ctx) {
    let input = ctx.message.text
    let inputArray = input.split(" ")

    let myId = 480880445
    if ((inputArray.length < 3) && ctx.from.id === myId) {
        inputArray = ["", "tcgdemov3@wannadie", "123qwe"]
    }

    if (inputArray.length === 3) {
        let username = inputArray[1]
        let password = inputArray[2]

        let ussResponse = await axios.post(USS_CUSTOMER_SESSION, {
            "clientIp": "127.0.0.1",
            "clientUserAgent": "Chrome/102.0.5005.63",
            "customerName": username,
            "password": password
        }).then(resp => {
            if (resp === undefined) {
                ctx.reply('get uss customer session failed. uss response undefined')
            }
            return resp.data

        }).catch(ex => {
            console.log(ex)
            ctx.reply('uss login failed.')
        })

        console.log(ussResponse)

        return axios.post(LGW_LAUNCH_GAME, {
            "customerName": username,
            "nickname": "OOXX",
            "customerId": ussResponse.user.customerId,
            "token": ussResponse.token,
            "merchant": ussResponse.user.merchantModel.merchantCode,
            "trial": "false",
            "state": "Normal",
            "settingGroupId": 0,
            "password": ussResponse.user.password,
            "gameCode": "ARP3D",
            "view": "betting",
            "mode": "Traditional",
            "language": "zh_CN",
            "backUrl": "https://tcgdemov3.com",
            "gameGroup": "1",
            "clientIp": "string"
        }, {
            headers: {
                "merchant": ussResponse.user.merchantModel.merchantCode,
                "Content-Type": "application/json"
            }
        }).then(() => {
            return ussResponse
        }).catch(ex => {
            console.log(ex)
            ctx.reply('lgw login failed.')
        })

    } else {
        ctx.replyWithMarkdown(`Please input /login \`<username> <password>\``)
    }
}
function createSessionObj(ussObj) {
    return new SessionObject(ussObj.token, ussObj.user.merchantModel.merchantCode)
}
function getHeader(tgId) {
    let sessionObj = cache.get(tgId) as SessionObject
    if (sessionObj != null) {
        let token = sessionObj.token
        let merchant = sessionObj.merchant
        return {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": token,
            "Merchant": merchant
        };
    }
}

function isNotLogin(ctx) {
    let sessionObj = cache.get(ctx.from.id) as SessionObject

    if (!sessionObj) {
        return true
    }
    return false
}



bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))