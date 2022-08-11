const { Markup, session, Telegraf } = require('telegraf')
const { getSscPlayRule, getLoginWarning, getGamesMessage, getSscGamesMessage, getGameButtonIntro, getGameMenus, getK3Message, getK3PlayRule, getTop20WinnerByIndex } = require('./db/db.js')


const BOT_TOKEN = "5538829192:AAGmxQ3cjgg66nG9vXSOJthA4Te02pXo-1I" // Tcg demo bot
const bot = new Telegraf(BOT_TOKEN)

bot.telegram.setMyCommands([
    {
        command: '/help',
        description: 'help command'
    }

])


const MAIN_MENU = "main_menu"
const MAIN_MENU_BUTTON = Markup.button.callback("⇠ Show Main Menu", MAIN_MENU)
const DOWNLOAD_HISTORY = "download_history"
const DOWNLOAD_HISTORY_BUTTON = Markup.button.callback("📈 下載近30期歷史獎號", DOWNLOAD_HISTORY)
const SSC_COMMAND = "时时彩遊戲說明"
const GOTO_SSC_COMMAND_BUTTON = Markup.button.callback('⇠ Back to SSC Games', SSC_COMMAND)
const K3_COMMAND = "快三遊戲說明"
const GOTO_K3_COMMAND_BUTTON = Markup.button.callback('⇠ Back to K3 Games', K3_COMMAND)
const K32_COMMAND = "K3遊戲說明"
const GOTO_K32_COMMAND_BUTTON = Markup.button.callback('⇠ Back to K3_2 Games', K32_COMMAND)
const TOP_WINNER_COMMAND = "中獎排行榜"
const BET_COMMAND = "投注測試"


// bot.use(Telegraf.log())
bot.on('text', (ctx, next) => {
    console.log(`${ctx.from.id} input text : ${ctx.message.text}`)
    next()
})
bot.on('callback_query', (ctx, next) => {
    console.log("callback query")
    console.log(ctx)

    next()
})



bot.start(ctx => {

    ctx.replyWithPhoto({ source: "./images/TCGIMG.png" },
        {
            caption: `Hello ${ctx.from.first_name} ${ctx.from.last_name}. \nCheck /help to see all this bot can do`,
            parse_mode: 'Markdown'
        }
    )

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
                [SSC_COMMAND, K3_COMMAND],
                [K32_COMMAND, TOP_WINNER_COMMAND],
                [BET_COMMAND]
            ],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })
}

bot.hears(BET_COMMAND, ctx => {
    try {
        ctx.reply("betting ", {
            reply_markup: {
                keyboard: [[{ text: "web app", web_app: { url: web_link } }]],
                resize_keyboard: true,
                one_time_keyboard: true
            },
        })

    } catch (ex) {
        console.log(ex)
    }
})

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


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))