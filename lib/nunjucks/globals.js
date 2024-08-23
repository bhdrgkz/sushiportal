let nunjucksGlobals = {};
const _             = require('lodash');
const moment        = require('moment');
const packageJson   = require('../../package.json');

module.exports = (req) => {

    nunjucksGlobals = {
        assetVersion() {
            return _.get(packageJson, 'version');
        },
        userInfo() {
            return _.get(req, 'session.user');
        },
        pairSymbolQuoteParser(pairSymbol) {

            if (!pairSymbol) {
                return false;
            }

            const pairSymbolSplitted = _.split(pairSymbol, '/');
            return _.get(pairSymbolSplitted, '[1]');
        },
        pairSymbolBaseParser(pairSymbol) {

            if (!pairSymbol) {
                return false;
            }

            const pairSymbolSplitted = _.split(pairSymbol, '/');
            return _.get(pairSymbolSplitted, '[0]');
        },
        dateConvertor(date, seconds=true) {

            if (!date) {
                return false;
            }

            const dateLength = date.toString().length;

            if (dateLength == 13) {
                date = eval(date)/1000;
            }

            let formattedDate = moment.unix(date).format("MM-DD-YYYY HH:mm:ss");
            if (!seconds) {
                formattedDate = moment.unix(date).format("MM-DD-YYYY HH:mm");
            }

            return formattedDate;
        },
        dateDiff(date) {
            const now = Date.now();
            let diff = now - date;

            return diff;
        },
        toFixedTrunc(x, n) {

            if (!x) {
                return 0;
            }

            const v = (typeof x === 'string' ? x : x.toString()).split('.');
            if (n <= 0) return v[0];
            let f = v[1] || '';

            if (f.length > n) {
                let first = `${v[0]}.${f.substr(0, n)}`;
                return first;
            }
            while (f.length < n) f += '0';
            let last = `${v[0]}.${f}`;

            return last;
        },
        getTimestampNow() {

            let date = Date.now();
            date = (date-(date%1000))/1000;

            return date;
        },
        getCharacters(x, y, z) {

            if (!x) {
                return false;
            }

            return x.substring(y, z);
        },
        numberWithCommas(x) {
            if (!x) {
                return 0;
            }
            return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
        },
        range(x, y) {
            if (!x || !y) {
                return [];
            }
            const range = _.range(x, y);
            return range;
        },
        numberGroupFormatter(num, digits) {
            const lookup = [
                { value: 1, symbol: "" },
                { value: 1e3, symbol: "K" },
                { value: 1e6, symbol: "M" },
                { value: 1e9, symbol: "G" },
                { value: 1e12, symbol: "T" },
                { value: 1e15, symbol: "P" },
                { value: 1e18, symbol: "E" }
            ];
            const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
            var item = lookup.slice().reverse().find(function(item) {
                return num >= item.value;
            });
            return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
        },
        isMobile() {
            const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
            return regex.test(req.get('User-Agent'));
        },
        hashCode( str ) {
            if (str.length % 32 > 0) str += Array(33 - str.length % 32).join("z");
            var hash = '', bytes = [], i = 0, j = 0, k = 0, a = 0, dict = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','1','2','3','4','5','6','7','8','9'];
            for (i = 0; i < str.length; i++ ) {
                ch = str.charCodeAt(i);
                bytes[j++] = (ch < 127) ? ch & 0xFF : 127;
            }
            var chunk_len = Math.ceil(bytes.length / 32);
            for (i=0; i<bytes.length; i++) {
                j += bytes[i];
                k++;
                if ((k == chunk_len) || (i == bytes.length-1)) {
                    a = Math.floor( j / k );
                    if (a < 32)
                        hash += '0';
                    else if (a > 126)
                        hash += 'z';
                    else
                        hash += dict[  Math.floor( (a-32) / 2.76) ];
                    j = k = 0;
                }
            }
            return hash;
        },
        addNewKeyValueToObject(obj, key, value) {
            obj[key] = value;
            return obj;
        },
        convertIntToRgb(num) {
            num >>>= 0;
            const b = num & 0xFF,
                g = (num & 0xFF00) >>> 8,
                r = (num & 0xFF0000) >>> 16,
                a = 1 ;
            return "rgba(" + [r, g, b, a].join(",") + ")";
        }
    };

    return _.merge(
        nunjucksGlobals
    );
};