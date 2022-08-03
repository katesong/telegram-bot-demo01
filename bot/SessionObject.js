// const NodeCache = require('node-cache');

// const { type } = require("@testing-library/user-event/dist/type");

// const EXPIRED_SECONDS = 86400
// const cache = new NodeCache({ stdTTL: EXPIRED_SECONDS });

// class sessionCache {
//     constructor() {
//         this.ttlSeconds = EXPIRED_SECONDS;
//         this.cache = new NodeCache({ stdTTL: EXPIRED_SECONDS });
//     }

//     get(key) {
//         return this.cache.get(key);
//     }

//     set(key, value) {
//         this.cache.set(key, value, this.stdTTL)
//     }

//     del(key) {
//         this.cache.del(key);
//     }
// }


// export default class SessionObject {
class SessionObject {
    constructor(token, merchant) {
        this.token = token;
        this.merchant = merchant;
    }
}

// exports = { SessionObject };
// export default SessionObject;
module.exports = SessionObject;