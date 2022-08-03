const SSC_GAME_RULE_MAP = new Map([
["两面", `
► 两面：指单、双；大、小。
◦ 单、双：号码为双数叫双，如0、2、4、6、8；号码为单数叫单，如1、3、5、7、9。
◦ 大、小：开出之号码大于或等于5为大，小于或等于4为小。
`], 
["总和大小单双", `
► 总和大小单双：指单、双；大、小。
◦ 总和单、双：所有5个开奖号码的数字总和值是单数为总和单，如数字总和值是45、29、31；所有5个开奖号码的数字总和值是双数为总和双， 如数字总和是42、0、30；假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
◦ 总和大、小：所有5个开奖号码的数字总和值23到45为总和大；所有5个开奖号码的数字总和值0到22为总和小。如开奖号码为2、8、7、9、1， 数字总和是27，则总和大。假如投注组合符合中奖结果，视为中奖，其余情形视为不中奖。
◦ 杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖百位千位万位号码为157， 中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
`], 
["前三特殊玩法", `
► 前三特殊玩法
◦ 豹子：中奖号码的百位千位万位数字都相同。如中奖号码为000、111、999等， 中奖号码的百位千位万位数字相同，则投注豹子者视为中奖，其它视为不中奖。
◦ 顺子：中奖号码的百位千位万位数字都相连，不分顺序。（数字9、0、1相连） 如中奖号码为123、901、321、546等，中奖号码百位千位万位数字相连，则投注顺子者视为中奖，其它视为不中奖。
◦ 对子：中奖号码的百位千位万位任意两位数字相同。（不包括豹子） 如中奖号码为001，112、696，中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
◦ 半顺：中奖号码的百位千位万位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连） 如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。
◦ 杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖百位千位万位号码为157， 中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
`], 
["中三特殊玩法", `
► 中三特殊玩法：
◦ 豹子：中奖号码的十位百位千位数字都相同。如中奖号码为000、111、999等，中奖号码的十位百位千位数字相同， 则投注豹子者视为中奖，其它视为不中奖。
◦ 顺子：中奖号码的十位百位千位数字都相连，不分顺序。（数字9、0、1相连）如中奖号码为123、901、321、546等， 中奖号码十位百位千位数字相连，则投注顺子者视为中奖，其它视为不中奖。
◦ 对子：中奖号码的十位百位千位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696， 中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
◦ 半顺：中奖号码的十位百位千位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连） 如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。
◦ 杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖十位百位千位号码为157， 中奖号码位数之间无关联性，则投注杂六者视为中奖，其它视为不中奖。
`],
["后三特殊玩法", `
► 后三特殊玩法：
◦ 豹子：中奖号码的个位十位百位数字都相同。如中奖号码为000、111、999等，中奖号码的个位十位百位数字相同， 则投注豹子者视为中奖，其它视为不中奖。
◦ 顺子：中奖号码的个位十位百位数字都相连，不分顺序。（数字9、0、1相连）如中奖号码为123、901、321、546等， 中奖号码个位十位百位数字相连，则投注顺子者视为中奖，其它视为不中奖。
◦ 对子：中奖号码的个位十位百位任意两位数字相同。（不包括豹子）如中奖号码为001，112、696， 中奖号码有两位数字相同，则投注对子者视为中奖，其它视为不中奖。
◦ 半顺：中奖号码的个位十位百位任意两位数字相连，不分顺序。（不包括顺子、对子，数字9、0、1相连） 如中奖号码为125、540、390、706，中奖号码有两位数字相连，则投注半顺者视为中奖，其它视为不中奖。
◦ 杂六：不包括豹子、对子、顺子、半顺的所有中奖号码。如中奖号码为157，中奖号码位数之间无关联性， 则投注杂六者视为中奖，其它视为不中奖。
`], 
["龙虎斗", `
► 龙虎斗：
◦ 每一个投注台面的左边为龙，右边为虎。如在第1球vs第2球的投注台面，则第一球为龙，第二球为虎；计算公式为：第一球的结果为龙的点数，第二球的结果为虎的点数。 若选择第1球vs第5球台面，则第一球为龙，第五球为虎，以此类推。整合玩法中龙虎和为第1球vs第5球。
◦ 龙、虎：以龙和虎点数大小比较来判断胜负，龙大于虎则投注“龙”者中奖，如龙开8，虎开0；若龙小于虎则投注“虎”者中奖。 其余情形视为不中奖。
◦ 和：龙和虎点数相同，投注“和”者中奖，如龙开8，虎开8。其余情形视为不中奖。
◦ 整合龙虎和：为第一球与第五球的点数大小比较来判断胜负。
`], 
["全五中一", `
► 全五中一：0\\~9任选1号进行投注,当所有5个开奖号码中任一数与所选的号码相同时，即为中奖。
`],
["牛牛玩法", `
► 牛牛玩法：
◦ 根据开奖第一球\\~第五球开出的球数字为基础,任意组合三个号码成0或10的倍数,取剩余两个号码之和为点数,大于10时减去10后的数字作为对奖基数。
◦ 如:00026为牛8,02818为牛9,68628、23500皆为牛10俗称牛牛；26378、15286因任意三个号码都无法组成0或10的倍数,称为没牛， 注:当五个号码相同时,只有00000视为牛牛,其他11111,66666等皆视为没牛。
`],
["牛牛大小单双", `
► 牛牛大小单双：指牛大、牛小、牛单、牛双；
◦ 牛牛大、小：牛大（牛6,牛7,牛8,牛9,牛牛）,牛小（牛1,牛2,牛3,牛4,牛5） 若开出结果为没牛,则投注牛大牛小皆为不中奖。
◦ 牛牛单、双：牛单（牛1,牛3,牛5,牛7,牛9）,牛双（牛2,牛4,牛6,牛8,牛牛） 若开出结果为没牛,则投注牛单牛双皆为不中奖。
`],
["梭哈玩法", `
► 梭哈玩法：
◦ 五条：开奖的五个号码全部相同，例如：22222、66666、88888 投注：五条 中奖，其它不中奖。
◦ 四条：开奖的五个号码中有四个号码相同，例如：22221、66663、88885 投注：四条 中奖，其它不中奖。
◦ 葫芦：开奖的五个号码中有三个号码相同（三条）另外两个号码也相同（一对），例如：22211、66633 投注：葫芦 中奖，其它不中奖。
◦ 顺子：开奖的五个号码位置不限，出现包含下例十组号码：01234、12345、23456、34567、45678、56789、67890、78901、89012、90123，出现以上号码即算中奖。 投注：顺子 中奖，其它不中奖。
◦ 三条：开奖的五个号码中有三个号码相同另外两个不相同，例如：13511、20252、22231、66623、88895 投注：三条 中奖，其它不中奖。
◦ 两对：开奖的五个号码中有两组号码相同，例如：22166、66355、82668 投注：两对 中奖，其它不中奖。
◦ 一对：开奖的五个号码中只有一组号码相同，例如：22168、66315、82968 投注：一对 中奖，其它不中奖。
◦ 高牌：开奖号码不是五条、四条、葫芦、三条、顺子、两对、一对的其它所有开奖号码，例如：23186、13579、21968 投注：高牌 中奖，其它不中奖。
`],
["百家乐玩法", `
► 百家乐玩法：
◦百家乐（无对子）：第一球及第二球的加总取个位数为庄，第四球及第五球的加总取个位数为闲；庄大于闲，投注庄赢；庄小于闲，投注闲赢；庄等于闲，则投注和赢；投注庄或闲，开出和局则庄、闲都为输。
`]

])

const GAME_BUTTON_INTRO = 
`
👇 點擊彩种销售说明，檢視游戏介紹
👇 點擊游戏规则说明，查看詳細玩法規則說明
👇 查看游戏走势
👇 點擊下載近30期歷史獎號
`


function getLoginWarning(firstName, lastName) {
    return `Hello ${firstName} ${lastName}！ \nFor using all Bot Command, \nPlease *LOGIN* to connect account by input : 
    _/login username password_ 
    `
}

function getGamesMessage(currentView) {
    return `
${currentView}

*▎彩票遊戲列表*
    
點擊彩種，檢視游戏介紹、玩法規則說明
    
*▎查看游戏走势*

點擊下載近30期歷史獎號
     
`
}

function getGameButtonIntro(currentView) {
    return `

${currentView}
${GAME_BUTTON_INTRO}
    `
}

function getSscGamesMessage(currentView) {
    return `

${currentView}

*▎奖金总览*

彩种单笔最高奖金: 100000元
彩种单期投注最大金额: 100000000元

*▎彩种销售说明*

开奖时间：00:00:00\\~23:59:00
开奖频率：每天1440期，1分一期

${GAME_BUTTON_INTRO}
     
`
}

function getSscPlayRule(currentView, key) {

    let playRule = SSC_GAME_RULE_MAP.get(key)

    return `

${currentView}

*▎游戏规则说明*

► 以下所有投注皆含本金。

► 每期时时彩开奖球数共五粒。

► 每一个号码为一投注组合，假如投注号码为开奖号码并在所投的球位置，视为中奖，其余情形视为不中奖。
${playRule}
${GAME_BUTTON_INTRO}
     
`
}


function getGameMenus(gameLabel) {
    if (gameLabel === "SSC") {
        return getSscGameMenus()
    }
    if (gameLabel === "K3") {
        return getK3GameMenus()
    }
}
function getSscGameMenus() {
    return [
        {
            "gameId": 358,
            "code": "TCGFFC",
            "gameGroupId": 1,
            "remark": "天成分分彩",
            "sorting": 1,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCGFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCGFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "12741739",
            "previousWinningNumber": "66686",
            "lockTime": 10,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 2,
            "remainTime": 7765
        },
        {
            "gameId": 1866,
            "code": "HNFFC",
            "gameGroupId": 1,
            "remark": "河内分分彩",
            "sorting": 2,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/HNFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/HNFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "20220727-1391",
            "previousWinningNumber": "85389",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7764
        },
        {
            "gameId": 1628,
            "code": "TX10FC",
            "gameGroupId": 1,
            "remark": "腾讯10分彩",
            "sorting": 3,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TX10FC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TX10FC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207270140",
            "previousWinningNumber": "53501",
            "lockTime": 30,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658935200000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 2,
            "remainTime": 547764
        },
        {
            "gameId": 1166,
            "code": "QQFFC",
            "gameGroupId": 1,
            "remark": "QQ分分彩",
            "sorting": 6,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/QQFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/QQFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "20220727-1391",
            "previousWinningNumber": "13504",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": false,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7764
        },
        {
            "gameId": 18,
            "code": "BJSSC",
            "gameGroupId": 1,
            "remark": "北京5分彩",
            "sorting": 9,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/BJSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/BJSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "147475",
            "previousWinningNumber": "03610",
            "lockTime": 120,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934900000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 247764
        },
        {
            "gameId": 360,
            "code": "TCGSSC",
            "gameGroupId": 1,
            "remark": "天成5分彩",
            "sorting": 10,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCGSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCGSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "10541198",
            "previousWinningNumber": "43476",
            "lockTime": 120,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1658934900000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 247764
        },
        {
            "gameId": 4930,
            "code": "BABTBFFC",
            "gameGroupId": 1,
            "remark": "币安比特币分分彩",
            "sorting": 11,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/BABTBFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/BABTBFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207271391",
            "previousWinningNumber": "23977",
            "lockTime": 8,
            "country": "Taiwan",
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7764
        },
        {
            "gameId": 3606,
            "code": "YGSSC",
            "gameGroupId": 1,
            "remark": "EOS阳光时时彩",
            "sorting": 13,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/YGSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/YGSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207270696",
            "previousWinningNumber": "54133",
            "lockTime": 120,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934720000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 67764
        },
        {
            "gameId": 24,
            "code": "CASSC",
            "gameGroupId": 1,
            "remark": "加拿大3.5分彩",
            "sorting": 14,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/CASSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/CASSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "2883016",
            "previousWinningNumber": "16352",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": false,
            "isOfficial": true,
            "winningTime": 1658934810030,
            "supportPlayModes": {
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 157794
        },
        {
            "gameId": 1726,
            "code": "HN5FC",
            "gameGroupId": 1,
            "remark": "河内五分彩V2",
            "sorting": 15,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/HN5FC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/HN5FC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "20220727-0279",
            "previousWinningNumber": "27972",
            "lockTime": 25,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934900000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 247764
        },
        {
            "gameId": 1,
            "code": "CQSSC",
            "gameGroupId": 1,
            "remark": "重庆时时彩",
            "sorting": 16,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/CQSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/CQSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "20220727-058",
            "previousWinningNumber": "78368",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658935800000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 1147764
        },
        {
            "gameId": 1627,
            "code": "TX5FC",
            "gameGroupId": 1,
            "remark": "腾讯5分彩",
            "sorting": 17,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TX5FC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TX5FC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207270279",
            "previousWinningNumber": "67019",
            "lockTime": 10,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934900000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 247764
        },
        {
            "gameId": 3246,
            "code": "MMSSC",
            "gameGroupId": 1,
            "remark": "秒秒时时彩",
            "sorting": 21,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/MMSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/MMSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "MMC"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": null,
            "previousWinningNumber": null,
            "lockTime": 10,
            "country": null,
            "region": null,
            "isSale": false,
            "isOfficial": false,
            "winningTime": null,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 0
        },
        {
            "gameId": 1827,
            "code": "ZDHFFC",
            "gameGroupId": 1,
            "remark": "自动化分分彩",
            "sorting": 25,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "11487369",
            "previousWinningNumber": "56974",
            "lockTime": 1,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7764
        },
        {
            "gameId": 1906,
            "code": "ALNFFC",
            "gameGroupId": 1,
            "remark": "阿里分分彩",
            "sorting": 26,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/ALNFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/ALNFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207271391",
            "previousWinningNumber": "35591",
            "lockTime": 1,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7764
        },
        {
            "gameId": 370,
            "code": "TXFFC",
            "gameGroupId": 1,
            "remark": "腾讯分分彩",
            "sorting": 33,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207280001",
            "previousWinningNumber": "03385",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658937660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 3007764
        },
        {
            "gameId": 361,
            "code": "TCGWFC",
            "gameGroupId": 1,
            "remark": "天成1.5分彩",
            "sorting": 35,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCGWFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCGWFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "10114451",
            "previousWinningNumber": "97925",
            "lockTime": 120,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1658934720000,
            "supportPlayModes": {
                "Entertainment": [
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 67764
        },
        {
            "gameId": 3746,
            "code": "CLSSC",
            "gameGroupId": 1,
            "remark": "CLSSC",
            "sorting": 36,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/CLSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/CLSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": null,
            "previousWinningNumber": null,
            "lockTime": 120,
            "country": null,
            "region": null,
            "isSale": false,
            "isOfficial": false,
            "winningTime": null,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 0
        },
        {
            "gameId": 1386,
            "code": "TCT5FC",
            "gameGroupId": 1,
            "remark": "天蝎五分彩",
            "sorting": 37,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCT5FC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCT5FC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "1000371496",
            "previousWinningNumber": "36844",
            "lockTime": 120,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934900000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 247764
        },
        {
            "gameId": 2626,
            "code": "XYFFC",
            "gameGroupId": 1,
            "remark": "幸运分分彩",
            "sorting": 38,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/XYFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/XYFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207271391",
            "previousWinningNumber": "26296",
            "lockTime": 180,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7764
        },
        {
            "gameId": 4612,
            "code": "LJTJTXFFC",
            "gameGroupId": 1,
            "remark": "奇趣分分彩",
            "sorting": 39,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "20220727-1391",
            "previousWinningNumber": "73045",
            "lockTime": 5,
            "country": "Taiwan",
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7763
        },
        {
            "gameId": 4707,
            "code": "TESTFFC",
            "gameGroupId": 1,
            "remark": "測試分分彩",
            "sorting": 40,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "10167595",
            "previousWinningNumber": "50136",
            "lockTime": 10,
            "country": "Taiwan",
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7763
        },
        {
            "gameId": 4746,
            "code": "USHNFFC",
            "gameGroupId": 1,
            "remark": "USHNFFC",
            "sorting": 41,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [
                "HOT",
                "NEW"
            ],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": null,
            "previousWinningNumber": null,
            "lockTime": 10,
            "country": "Taiwan",
            "region": null,
            "isSale": false,
            "isOfficial": false,
            "winningTime": null,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 0
        },
        {
            "gameId": 10,
            "code": "TJSSC",
            "gameGroupId": 1,
            "remark": "天津时时彩XD",
            "sorting": 42,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TJSSC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TJSSC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "20220728-001",
            "previousWinningNumber": "21834",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658971200000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 36547763
        },
        {
            "gameId": 4577,
            "code": "TWBSSC",
            "gameGroupId": 1,
            "remark": "台湾时时彩",
            "sorting": 44,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "111042014",
            "previousWinningNumber": "39880",
            "lockTime": 5,
            "country": "Taiwan",
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934900000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 247763
        },
        {
            "gameId": 4929,
            "code": "BCHSFFC",
            "gameGroupId": 1,
            "remark": "波场哈希分分彩",
            "sorting": 45,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCFFC.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCFFC.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "SSC",
            "numero": "202207271391",
            "previousWinningNumber": "19838",
            "lockTime": 5,
            "country": "Taiwan",
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1658934660000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 7763
        }
    ]
}
function getK3GameMenus() {
    return [
        {
            "gameId": 3346,
            "code": "MMK3",
            "gameGroupId": 8,
            "remark": "秒秒秒K3",
            "sorting": 1,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/MMK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/MMK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [
                "NEW"
            ],
            "categories": [
                "MMC"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": null,
            "previousWinningNumber": null,
            "lockTime": 0,
            "country": null,
            "region": null,
            "isSale": false,
            "isOfficial": false,
            "winningTime": null,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 0
        },
        {
            "gameId": 2398,
            "code": "DFK3",
            "gameGroupId": 8,
            "remark": "大发快三",
            "sorting": 2,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/DFK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/DFK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "202207290925",
            "previousWinningNumber": "243",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": false,
            "isOfficial": true,
            "winningTime": 1659079440000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 31934
        },
        {
            "gameId": 1834,
            "code": "ZDHK3",
            "gameGroupId": 8,
            "remark": "自动化快3",
            "sorting": 3,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/ZDHK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/ZDHK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "11532378",
            "previousWinningNumber": "146",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1659079440000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 31934
        },
        {
            "gameId": 3168,
            "code": "TCBK3",
            "gameGroupId": 8,
            "remark": "TCBK3",
            "sorting": 4,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCBK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCBK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "10835137",
            "previousWinningNumber": "431",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1659079440000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 31934
        },
        {
            "gameId": 3806,
            "code": "YGK3",
            "gameGroupId": 8,
            "remark": "阳光快三",
            "sorting": 5,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/YGK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/YGK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "202207290462",
            "previousWinningNumber": "222",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1659079440000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 31934
        },
        {
            "gameId": 1026,
            "code": "TCGK3",
            "gameGroupId": 8,
            "remark": "天成快三",
            "sorting": 6,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/TCGK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/TCGK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "12218566",
            "previousWinningNumber": "213",
            "lockTime": 8,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": false,
            "winningTime": 1659079440000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott"
                ],
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 31934
        },
        {
            "gameId": 1428,
            "code": "JISUK3",
            "gameGroupId": 8,
            "remark": "极速快三",
            "sorting": 7,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/JISUK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/JISUK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "32405521",
            "previousWinningNumber": "256",
            "lockTime": 5,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1659079455015,
            "supportPlayModes": {
                "Tradition": [
                    "Lott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 46949
        },
        {
            "gameId": 1012,
            "code": "SHK3",
            "gameGroupId": 8,
            "remark": "SHK3",
            "sorting": 8,
            "webIconUrl": "https://images.b51613.com:42666/VD/RC2019/SHK3.png",
            "mobileIconUrl": "https://images.b51613.com:42666/VD/CR2021/SHK3.png",
            "tradPlaySwitch": true,
            "entPlaySwitch": false,
            "liveVideoSwitch": false,
            "tag": [],
            "categories": [
                "VIDEO"
            ],
            "standardBonus": 2000,
            "ui": "t3",
            "mUi": "b1",
            "css": "CSS",
            "gameGroupCode": "K3",
            "numero": "20220729-021",
            "previousWinningNumber": "265",
            "lockTime": 660,
            "country": null,
            "region": null,
            "isSale": true,
            "isOfficial": true,
            "winningTime": 1659080280000,
            "supportPlayModes": {
                "Entertainment": [
                    "Lott",
                    "Elott",
                    "WS"
                ],
                "Tradition": [
                    "Lott",
                    "Elott"
                ]
            },
            "defaultPlayType": 1,
            "remainTime": 871934
        }
    ]
}

const K3_GAME_RULE_MAP = new Map([
    [1, `
*▎奖金总览*

彩种单笔最高奖金: 400元
彩种单期投注最大金额: 300元

*▎彩种销售说明*

开奖时间：00:00:00\\~23:59:00
开奖频率：每天1440期，1分一期

*▎游戏规则说明*

► 以下所有投注皆含本金。

► 每期快三开奖球数共3粒（每个球数分别为1～6）。
`], [2, `
► *和值*：
◦ 以全部开出的三个号码、加起来的总和来判定。
◦ 开奖号码总和值为3、4、5、6、7、8、9、10、11、12、13、14、15、16、17 、18时，即为中奖。
◦ 举例：如开奖号码为1、2、3、总和值为6、则投注「6」即为中奖。

► *和值大小单双*：
◦ 大小：三个开奖号码总和值11\\~18 为大；总和值3\\~10 为小。
◦ 单双：三个开奖号码总和3、5、7、9、11、13、15、17为单；4、6、8、10、12、14、16、18为双。

► *和值组合大小单双*：
◦ 大单（11、13、15、17 ）小单（3 、5、 7 、9 ）小双（4 、6、 8、 10）大双（12、14、 16、18 ），所选状态与开奖号码3个号码总和值状态相同，即中奖。

► *两连*：
◦ 任选一长牌组合、当开奖结果任2码与所选组合相同时，即为中奖。
◦ 举例：如开奖号码为1、2、3、则投注两连12、两连23、两连13皆视为中奖。

`], [3, `
► *独胆*：
◦ 三个开奖号码其中一个与所选号码相同时、即为中奖。
◦ 举例：如开奖号码为1、1、3，则投注独胆1或独胆3皆视为中奖。
◦ 备注：不论当局指定点数出现几次，仅派彩一次（不翻倍）。

► *不出胆*：
◦ 至少选择一个号码投注，投注号码与开奖号码的任意一个号码不相同，即视为中奖。
◦ 举例：投注者购买号码5，当期开奖号码如为：234，则视为中奖。

► *豹子*：开奖号码三字同号、且与所选择的豹子组合相符时，即为中奖。

► *任意豹子*：任意豹子组合、开奖号码三字同号，即为中奖。

► *对子*：
◦ 开奖号码任两字同号、且与所选择的对子组合相符时，即为中奖。
◦ 举例：如开奖号码为1、1、3、则投注对子1、1，即为中奖。
`], [4, `

► *红黑码*：
◦ 红码：对所有二同号进行投注，开奖号码出现对子（不含豹子），投注红码即中奖（例如112、224等）。
◦ 黑码：开出三个不同号即为黑码（例如123、245等）。

► *红黑大小单双*：
◦ 红大红小： 开出奖号属于红码，且和值为大则为红大，若和值为小即为红小。大（11\\-17）小（4\\-10）
◦ 红单红双：开出奖号属于红码，且和值为单则为红单，若和值为双即为红双。
◦ 黑大黑小：开出奖号属于黑码，且和值为大则为黑大，若和值为小即为黑小。大（11\\-15）小（6\\-10）
◦ 黑单黑双：开出奖号属于黑码，且和值为单则为黑单，若和值为双即为黑双。

► *红码组合*：
◦ 投注任意挑选择2\\~6个号码投注，开奖号码其中有两个号码是相同的并且开出的号码全部都在所选的投注号码当中不含豹子
◦ 举例：（例如投注 1234，若开出 112、113、114、223、224、334、344），则视为中奖。


`]
])

function getK3Message(currentView) {
    return `

${currentView}
${GAME_BUTTON_INTRO}
`
}
function getK3PlayRule(key) {
    return K3_GAME_RULE_MAP.get(key)
}

function getTop20WinnerByIndex(index) {
    let winnerList = [
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "3****qr",
            "gameId": 4631,
            "gameDisplayName": "NYKENO",
            "winAmount": 9482,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "9****go",
            "gameId": 4909,
            "gameDisplayName": "Turbo 5m4D",
            "winAmount": 8884,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "8v****k3",
            "gameId": 2966,
            "gameDisplayName": "TCGVN North",
            "winAmount": 8652,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "n****vm",
            "gameId": 2947,
            "gameDisplayName": "TCGNVNC",
            "winAmount": 8630,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "bn****pj",
            "gameId": 3853,
            "gameDisplayName": "TEST30S1VNC",
            "winAmount": 7094,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "a****qh",
            "gameId": 4607,
            "gameDisplayName": "MAUVNCN",
            "winAmount": 6296,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "38*****uw",
            "gameId": 4471,
            "gameDisplayName": "NNNNKENO",
            "winAmount": 6277,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "hw****cp",
            "gameId": 4546,
            "gameDisplayName": "Turbo Keno",
            "winAmount": 5349,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "l****ny",
            "gameId": 4207,
            "gameDisplayName": "TESTSOUTHVNC",
            "winAmount": 5239,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "kt*****7u",
            "gameId": 4666,
            "gameDisplayName": "TESTTHAI",
            "winAmount": 5175,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "9****if",
            "gameId": 4866,
            "gameDisplayName": "Turbo 1m3D",
            "winAmount": 4528,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "t****mj",
            "gameId": 4718,
            "gameDisplayName": "TESTLAO",
            "winAmount": 4334,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "c****nv",
            "gameId": 4666,
            "gameDisplayName": "TESTTHAI",
            "winAmount": 3448,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "ho*****97",
            "gameId": 1406,
            "gameDisplayName": "TCGTHGOV",
            "winAmount": 3018,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "u4*****8v",
            "gameId": 1509,
            "gameDisplayName": "TCGLAO",
            "winAmount": 2501,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "g****ve",
            "gameId": 4911,
            "gameDisplayName": "Turbo 5m6D",
            "winAmount": 2417,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "vh****y9",
            "gameId": 4631,
            "gameDisplayName": "NYKENO",
            "winAmount": 1333,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "d****94",
            "gameId": 2947,
            "gameDisplayName": "TCGNVNC",
            "winAmount": 915,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "x****e2",
            "gameId": 4387,
            "gameDisplayName": "CATEST30SVNC",
            "winAmount": 786,
            "content": null
        },
        {
            "type": "WIN_AMOUNT_LIST",
            "customerName": "h3****8b",
            "gameId": 1509,
            "gameDisplayName": "TCGLAO",
            "winAmount": 729,
            "content": null
        }
    ]

    return winnerList[index]
}

module.exports = {
    getSscPlayRule: getSscPlayRule,
    getLoginWarning: getLoginWarning,
    getGameButtonIntro: getGameButtonIntro,
    getGamesMessage: getGamesMessage,
    getSscGamesMessage: getSscGamesMessage,
    getGameMenus: getGameMenus,
    getK3Message: getK3Message,
    getK3PlayRule: getK3PlayRule,
    getTop20WinnerByIndex: getTop20WinnerByIndex
};