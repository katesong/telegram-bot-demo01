const { Markup } = require('telegraf')
const { getSscPlayRule, getLoginWarning, getGamesMessage, getSscGamesMessage, getGameButtonIntro, getGameMenus } = require('./db/db.js')

const DOWNLOAD_HISTORY = "download_history"
const DOWNLOAD_HISTORY_BUTTON = Markup.button.callback("📈 下載近30期歷史獎號", DOWNLOAD_HISTORY)
const SSC_COMMAND = "时时彩"
const GOTO_SSC_COMMAND_BUTTON = Markup.button.callback('⇠ Back to SSC Games', SSC_COMMAND)
const K3_COMMAND = "快三"

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

function replySscGameFunction(ctx) {

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

function replySscView(ctx, caption, keboardArray) {

    return ctx.replyWithPhoto({ source: "./images/TCGFFC.png" },
        {
            caption: caption,
            parse_mode: 'MarkdownV2',
            ...Markup.inlineKeyboard(keboardArray)
        })
}

module.exports = {
    replySscGameList: replySscGameList,
    replySscGameFunction: replySscGameFunction
}