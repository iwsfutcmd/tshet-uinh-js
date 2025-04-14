"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.音韻地位 = exports._UNCHECKED = void 0;
const utils_1 = require("./utils");
const ______1 = require("./\u62D3\u5C55\u97F3\u97FB\u5C6C\u6027");
const ______2 = require("./\u97F3\u97FB\u5C6C\u6027\u5E38\u91CF");
const pattern描述 = new RegExp(`^([${______2.所有.母.join('')}])([${______2.所有.呼.join('')}]?)([${______2.所有.等.join('')}]?)` +
    `([${______2.所有.類.join('')}]?)([${______2.所有.韻.join('')}])([${______2.所有.聲.join('')}])$`, 'u');
// for 音韻地位.屬於
const 表達式屬性可取值 = {
    ...______2.所有,
    音: [...'脣舌齒牙喉'],
    攝: [...'通江止遇蟹臻山效果假宕梗曾流深咸'],
    組: [...'幫端知精莊章見影'],
};
const 已知邊緣地位 = new Set([
    // 嚴格邊緣地位
    // 陽韻A類
    '並三A陽上', // 𩦠
    // 端組類隔
    '定開四脂去', // 地
    '端開二庚上', // 打
    '端開二麻上', // 打（麻韻）
    '端開四麻平', // 爹
    '端開四麻上', // 嗲
    '定開二佳上', // 箉
    '端四尤平', // 丟
    // 咍韻脣音（無）
    // 匣母三等（無）
    // 羣邪俟母非三等（無）
    // ----
    // 非嚴格邊緣地位
    // 云母開口
    '云開三C之上', // 矣
    '云開三B仙平', // 焉
]);
exports._UNCHECKED = ['@UNCHECKED@'];
/**
 * 《切韻》音系音韻地位。
 *
 * 可使用字串 (母, 呼, 等, 類, 韻, 聲) 初始化。
 *
 * | 音韻屬性 | 中文名稱 | 英文名稱 | 可能取值 |
 * | :- | :- | :- | :- |
 * | 母<br/>組 | 聲母<br/>組 | initial<br/>group | **幫**滂並明<br/>**端**透定泥<br/>來<br/>**知**徹澄孃<br/>**精**清從心邪<br/>**莊**初崇生俟<br/>**章**昌常書船<br/>日<br/>**見**溪羣疑<br/>**影**曉匣云<br/>以<br/>（粗體字為組，未涵蓋「來日以」） |
 * | 呼 | 呼 | rounding | 開口<br/>合口 |
 * | 等 | 等 | division | 一二三四 |
 * | 類 | 類 | type | ABC |
 * | 韻<br/>攝 | 韻母<br/>攝 | rime<br/>class | 通：東冬鍾<br/>江：江<br/>止：支脂之微<br/>遇：魚虞模<br/>蟹：齊祭泰佳皆夬灰咍廢<br/>臻：真臻文殷魂痕<br/>山：元寒刪山先仙<br/>效：蕭宵肴豪<br/>果：歌<br/>假：麻<br/>宕：陽唐<br/>梗：庚耕清青<br/>曾：蒸登<br/>流：尤侯幽<br/>深：侵<br/>咸：覃談鹽添咸銜嚴凡<br/>（冒號前為攝，後為對應的韻） |
 * | 聲 | 聲調 | tone | 平上去入<br/>仄<br/>舒 |
 *
 * 音韻地位六要素：母、呼、等、類、韻、聲。
 *
 * 「呼」和「類」可為 `null`，其餘四個屬性不可為 `null`。
 *
 * 當聲母為脣音，或韻母為「東冬鍾江模尤侯」（開合中立的韻）之一時，「呼」須為 `null`。
 * 在其他情況下，「呼」須取 `'開'` 或 `'合'`。
 *
 * 當聲母為鈍音（脣牙喉音，不含以母），且為三等韻時，「類」須取 `'A'`、`'B'`、`'C'` 之一。
 * 在其他情況下，「類」須為 `null`。
 *
 * 依切韻韻目，用殷韻不用欣韻；亦不設諄、桓、戈韻，分別併入真、寒、歌韻。
 *
 * 不支援異體字，請自行轉換：
 *
 * * 音 唇 → 脣
 * * 母 娘 → 孃
 * * 母 荘 → 莊
 * * 母 谿 → 溪
 * * 母 群 → 羣
 * * 韻 餚 → 肴
 * * 韻 眞 → 真
 */
class 音韻地位 {
    /**
     * 初始化音韻地位物件。
     * @param 母 聲母：幫, 滂, 並, 明, …
     * @param 呼 呼：`null`, 開, 合
     * @param 等 等：一, 二, 三, 四
     * @param 類 類：`null`, A, B, C
     * @param 韻 韻母（平賅上去入）：東, 冬, 鍾, 江, …, 祭, 泰, 夬, 廢
     * @param 聲 聲調：平, 上, 去, 入
     * @param 邊緣地位種類 建立邊緣地位時，列明該地位的邊緣地位種類
     * @returns 六要素所描述的音韻地位
     * @throws 待建立之音韻地位會透過{@link 驗證}檢驗音節合法性，不合法則拋出異常
     * @example
     * ```typescript
     * > new TshetUinh.音韻地位('幫', null, '三', 'C', '凡', '入');
     * 音韻地位<幫三C凡入>
     * > new TshetUinh.音韻地位('羣', '開', '三', 'A', '支', '平');
     * 音韻地位<羣開三A支平>
     * > new TshetUinh.音韻地位('章', '開', '三', null, '支', '平');
     * 音韻地位<章開三支平>
     * > new TshetUinh.音韻地位('幫', null, '四', null, '先', '平');
     * 音韻地位<幫四先平>
     * ```
     */
    constructor(母, 呼, 等, 類, 韻, 聲, 邊緣地位種類 = []) {
        /** @ignore 用於 Object.prototype.toString */
        this[_a] = '音韻地位';
        音韻地位.驗證(母, 呼, 等, 類, 韻, 聲, 邊緣地位種類);
        this.母 = 母;
        this.呼 = 呼;
        this.等 = 等;
        this.類 = 類;
        this.韻 = 韻;
        this.聲 = 聲;
    }
    /**
     * 清濁（全清、次清、全濁、次濁）
     *
     * 曉母為全清，云以來日母為次濁。
     *
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.清濁;
     * '全清'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.清濁;
     * '全濁'
     * ```
     */
    get 清濁() {
        const { 母 } = this;
        return ______1.母到清濁[母];
    }
    /**
     * 音（發音部位：脣、舌、齒、牙、喉）
     *
     * **注意**：
     *
     * * 不設半舌半齒音，來母歸舌音，日母歸齒音
     * * 以母不屬於影組，但屬於喉音
     *
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.音;
     * '脣'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.音;
     * '牙'
     * ```
     */
    get 音() {
        const { 母 } = this;
        return ______1.母到音[母];
    }
    /**
     * 攝
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.攝;
     * '咸'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.攝;
     * '止'
     * ```
     */
    get 攝() {
        const { 韻 } = this;
        return ______1.韻到攝[韻];
    }
    /**
     * 韻別（陰聲韻、陽聲韻、入聲韻）
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.韻別;
     * '入'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.韻別;
     * '陰'
     * ```
     */
    get 韻別() {
        const { 韻, 聲 } = this;
        return ______2.陰聲韻.includes(韻) ? '陰' : 聲 === '入' ? '入' : '陽';
    }
    /**
     * 組
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.組;
     * '幫'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.組;
     * '見'
     * ```
     */
    get 組() {
        const { 母 } = this;
        return ______1.母到組[母];
    }
    /**
     * 描述
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.描述;
     * '幫三C凡入'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.描述;
     * '羣開三A支平'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('章開三支平');
     * > 音韻地位.描述;
     * '章開三支平'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫四先平');
     * > 音韻地位.描述;
     * '幫四先平'
     * ```
     */
    get 描述() {
        const { 母, 呼, 等, 類, 韻, 聲 } = this;
        return 母 + (呼 ?? '') + 等 + (類 ?? '') + 韻 + 聲;
    }
    /**
     * 簡略描述。會省略可由「母」或由「韻」直接確定的「呼」「等」「類」。
     *
     * **注意**：此項尚未成為穩定功能，不要依賴其輸出值。
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.簡略描述;
     * '幫凡入'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.簡略描述;
     * '羣開A支平'
     * ```
     */
    get 簡略描述() {
        const { 母, 韻, 聲 } = this;
        let { 呼, 等, 類 } = this;
        if (類 && 類搭配(母, 韻)[0] === 類) {
            類 = null;
        }
        if (呼 === '合' && 母 === '云') {
            呼 = null;
        }
        else if (呼 && ______2.呼韻搭配[呼].includes(韻)) {
            呼 = null;
        }
        if (等 === '三' && [...'羣邪俟'].includes(母)) {
            等 = '';
        }
        else if (______2.等母搭配.三.includes(母) || ![...______2.等韻搭配.一三, ...______2.等韻搭配.二三].includes(韻)) {
            等 = '';
        }
        return 母 + (呼 ?? '') + 等 + (類 ?? '') + 韻 + 聲;
    }
    /**
     * 表達式，可用於{@link 屬於}函數
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.表達式;
     * '幫母 開合中立 三等 C類 凡韻 入聲'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.表達式;
     * '羣母 開口 三等 A類 支韻 平聲'
     * ```
     */
    get 表達式() {
        const { 母, 呼, 等, 類, 韻, 聲 } = this;
        const 呼字段 = 呼 ? `${呼}口 ` : '開合中立 ';
        const 類字段 = 類 ? `${類}類 ` : '不分類 ';
        return `${母}母 ${呼字段}${等}等 ${類字段}${韻}韻 ${聲}聲`;
    }
    /**
     * 三十六字母
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > 音韻地位.字母;
     * '非'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('常開三清平');
     * > 音韻地位.字母;
     * '禪'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('俟開三之上');
     * > 音韻地位.字等;
     * '禪'
     * ```
     */
    get 字母() {
        const { 母, 等, 類 } = this;
        let index;
        if (等 === '三' && 類 === 'C' && (index = [...'幫滂並明'].indexOf(母)) !== -1) {
            return '非敷奉微'[index];
        }
        else if ((index = [...'莊初崇生俟章昌船書常'].indexOf(母)) !== -1) {
            return '照穿牀審禪'[index % 5];
        }
        else if (['云', '以'].includes(母)) {
            return '喻';
        }
        return 母;
    }
    /**
     * 韻圖等
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > 音韻地位.韻圖等;
     * '四'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('常開三清平');
     * > 音韻地位.韻圖等;
     * '三'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('俟開三之上');
     * > 音韻地位.韻圖等;
     * '二'
     * ```
     */
    get 韻圖等() {
        const { 母, 等, 類 } = this;
        if ([...'莊初崇生俟'].includes(母)) {
            return '二';
        }
        else if (類 === 'A' || (等 === '三' && [...'精清從心邪以'].includes(母))) {
            return '四';
        }
        else {
            return 等;
        }
    }
    /**
     * 調整該音韻地位的屬性，會驗證調整後地位的合法性，回傳新的物件。
     *
     * **注意**：原物件不會被修改。
     *
     * @param 調整屬性 可為以下種類之一：
     * - 物件，其屬性可為六項基本屬性中的若干項，各屬性的值為欲修改成的值。
     *
     *   不含某屬性或某屬性值為 `undefined` 則表示不修改該屬性。
     *
     * - 字串，可寫出若干項屬性，以空白分隔各項。各屬性的寫法如下：
     *   - 母、等、韻、聲：如 `'見母'`、`'三等'`、`'元韻'`、`'平聲'` 等
     *   - 呼：`'開口'`、`'合口'`、`'開合中立'`
     *   - 類：`'A類'`、`'B類'`、`'C類'`、`'不分類'`
     * @param 邊緣地位種類 若調整後為邊緣地位，列明其種類
     * @returns 新的 `音韻地位`，其中會含有指定的修改值
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C元上');
     * > 音韻地位.調整({ 聲: '平' }).描述
     * '幫三C元平'
     * > 音韻地位.調整('平聲').描述
     * '幫三C元平'
     * > 音韻地位.調整({ 母: '見', 呼: '合' }).描述
     * '見合三C元上'
     * > 音韻地位.調整('見母 合口').描述
     * '見合三C元上'
     * ```
     */
    調整(調整屬性, 邊緣地位種類 = []) {
        if (typeof 調整屬性 === 'string') {
            const 屬性object = {};
            const set = (屬性, 值) => {
                (0, utils_1.assert)(!(屬性 in 屬性object), () => `duplicated assignment of ${屬性}`);
                屬性object[屬性] = 值;
            };
            for (const token of 調整屬性.trim().split(/\s+/u)) {
                const match = /^(?<kv>開合中立|不分類)$|^(?<v>.)(?<k>[母口等類韻聲])$/u.exec(token);
                (0, utils_1.assert)(match !== null, () => `unrecognized expression: ${token}`);
                const { kv, k, v } = match.groups;
                if (kv) {
                    if (kv === '開合中立')
                        set('呼', null);
                    else if (kv === '不分類')
                        set('類', null);
                }
                else {
                    set(k.replace('口', '呼'), v);
                }
            }
            調整屬性 = 屬性object;
        }
        const { 母 = this.母, 呼 = this.呼, 等 = this.等, 類 = this.類, 韻 = this.韻, 聲 = this.聲 } = 調整屬性;
        return new 音韻地位(母, 呼, 等, 類, 韻, 聲, 邊緣地位種類);
    }
    屬於(表達式, ...參數) {
        if (typeof 表達式 === 'string')
            表達式 = [表達式];
        /** 普通字串 token 求值 */
        const { 母, 呼, 類, 聲, 清濁, 韻別 } = this;
        const evalToken = (token) => {
            let match = null;
            if ((match = /^(陰|陽|入)聲韻$/.exec(token)))
                return 韻別 === match[1];
            if (token === '仄聲')
                return 聲 !== '平';
            if (token === '舒聲')
                return 聲 !== '入';
            if ((match = /^(開|合)口$/.exec(token)))
                return 呼 === match[1];
            if (/^開合中立$/.exec(token))
                return 呼 === null;
            if (/^不分類$/.exec(token))
                return 類 === null;
            if ((match = /^(清|濁)音$/.exec(token)))
                return 清濁[1] === match[1];
            if ((match = /^[全次][清濁]$/.exec(token)))
                return 清濁 === match[0];
            if (token === '鈍音')
                return ______2.鈍音母.includes(母);
            if (token === '銳音')
                return !______2.鈍音母.includes(母);
            if ((match = /^(.+?)([母等類韻音攝組聲])$/.exec(token))) {
                const values = [...match[1]];
                const key = match[2];
                const possibleValues = 表達式屬性可取值[key];
                const invalidValues = values.filter(i => !possibleValues.includes(i));
                if (invalidValues.length) {
                    throw new Error(`unknown ${key}: ${invalidValues.join(', ')}`);
                }
                return values.includes(this[key]);
            }
            throw new Error(`unrecognized test condition: ${token}`);
        };
        const KEYWORDS = ['(', ')', 'not', 'and', 'or'];
        const PATTERNS = [/^\($/, /^\)$/, /^([!~非]|not)$/i, /^(&+|且|and)$/i, /^(\|+|或|or)$/i];
        const tokens = [];
        for (let i = 0; i < 表達式.length; i++) {
            for (const rawToken of 表達式[i].split(/(&+|\|+|[!~()])|\b(and|or|not)\b|\s+/i).filter(i => i)) {
                const match = PATTERNS.findIndex(pat => pat.test(rawToken));
                if (match !== -1) {
                    tokens.push([KEYWORDS[match], rawToken]);
                }
                else {
                    tokens.push([evalToken(rawToken), rawToken]);
                }
            }
            if (i < 參數.length) {
                const arg = LazyParameter.from(參數[i], this);
                tokens.push([arg, String(arg)]);
            }
        }
        (0, utils_1.assert)(tokens.length, 'empty expression');
        // 句法分析
        // 由於是 LL(1) 文法，可用遞迴下降法
        // 基本成分：元（boolean | LazyParameter）、非、且、或、'('、')'
        // 文法：
        // - 非項：非* ( 元 | 括號項 )
        // - 且項：非項 ( 且? 非項 )*
        // - 或項：且項 ( 或 且項 )*
        // - 括號項：'(' 或項 ')'
        let cursor = 0;
        const END = ['end', 'end of expression'];
        const peek = () => (cursor < tokens.length ? tokens[cursor] : END);
        const read = () => (cursor < tokens.length ? tokens[cursor++] : END);
        function parseOrExpr(required) {
            const firstAndExpr = parseAndExpr(required);
            if (!firstAndExpr) {
                return null;
            }
            const orExpr = ['or', firstAndExpr];
            for (;;) {
                // 或 且項 | END | else
                const [token] = peek();
                if (token === 'or') {
                    cursor++;
                    orExpr.push(parseAndExpr(true));
                }
                else {
                    return orExpr;
                }
            }
        }
        function parseAndExpr(required) {
            const firstNotExpr = parseNotExpr(required);
            if (!firstNotExpr) {
                return null;
            }
            const andExpr = ['and', firstNotExpr];
            for (;;) {
                // 且? 非項 | END | else
                const [token] = peek();
                if (token === 'and') {
                    cursor++;
                    andExpr.push(parseNotExpr(true));
                }
                else {
                    const notExpr = parseNotExpr(false);
                    if (notExpr) {
                        andExpr.push(notExpr);
                    }
                    else {
                        return andExpr;
                    }
                }
            }
        }
        function parseNotExpr(required) {
            // 非*
            let seenNotOperator = false;
            let negate = false;
            for (;;) {
                const [token] = peek();
                if (token === 'not') {
                    seenNotOperator = true;
                    negate = !negate;
                    cursor++;
                }
                else {
                    break;
                }
            }
            let valExpr = [negate ? 'not' : 'value'];
            // 元 | 括號項 | else
            const [token, rawToken] = peek();
            if (typeof token === 'boolean' || token instanceof LazyParameter) {
                valExpr.push(token);
                cursor++;
                return valExpr;
            }
            else if (token === '(') {
                cursor++;
                const parenExpr = parseOrExpr(true);
                const [rightParen, rawRightParen] = read();
                if (rightParen !== ')') {
                    throw new Error(`expect ')', got: ${rawRightParen}`);
                }
                if (negate) {
                    valExpr.push(parenExpr);
                }
                else {
                    valExpr = parenExpr;
                }
                return valExpr;
            }
            else if (seenNotOperator || required) {
                const expected = seenNotOperator ? "operand or '('" : 'expression';
                throw new Error(`expect ${expected}, got: ${rawToken}`);
            }
            else {
                return null;
            }
        }
        const expr = parseOrExpr(true);
        const [token, rawToken] = read();
        if (token !== 'end') {
            throw new Error(`unexpected token: ${rawToken}`);
        }
        // 求值
        const evalExpr = (expr) => {
            const [op, ...args] = expr;
            switch (op) {
                case 'value':
                    return evalOperand(args[0]);
                case 'not':
                    return !evalOperand(args[0]);
                case 'and':
                    return args.every(evalOperand);
                case 'or':
                    return args.some(evalOperand);
            }
        };
        const evalOperand = (operand) => typeof operand === 'boolean' ? operand : operand instanceof LazyParameter ? operand.eval() : evalExpr(operand);
        return evalExpr(expr);
    }
    判斷(規則, throws = false, fallThrough = false) {
        const Exhaustion = Symbol('Exhaustion');
        function is規則列表(obj) {
            return Array.isArray(obj);
        }
        const loop = (所有規則) => {
            for (const 規則 of 所有規則) {
                (0, utils_1.assert)(Array.isArray(規則) && 規則.length === 2, '規則需符合格式');
                let 表達式 = 規則[0];
                const 結果 = 規則[1];
                if (typeof 表達式 === 'function')
                    表達式 = 表達式();
                if (typeof 表達式 === 'string' && 表達式 ? this.屬於(表達式) : 表達式 !== false) {
                    if (!is規則列表(結果))
                        return 結果;
                    const res = loop(結果);
                    if (res === Exhaustion && fallThrough)
                        continue;
                    return res;
                }
            }
            return Exhaustion;
        };
        const res = loop(規則);
        if (res === Exhaustion) {
            if (throws === false)
                return null;
            else
                throw new Error(typeof throws === 'string' ? throws : '未涵蓋所有條件');
        }
        return res;
    }
    /**
     * 判斷當前音韻地位是否等於另一音韻地位。
     * @param other 另一音韻地位。
     * @returns 若相等，則回傳 `true`；否則回傳 `false`。
     * @example
     * ```typescript
     * > a = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > b = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > a === b;
     * false
     * > a.等於(b);
     * true
     * ```
     */
    等於(other) {
        return this.描述 === other.描述;
    }
    /** 同 {@link 描述} */
    toString() {
        return this.描述;
    }
    /** @ignore 僅用於 Node.js 呈現格式 */
    [(_a = Symbol.toStringTag, Symbol.for('nodejs.util.inspect.custom'))](...args) {
        const stylize = (...x) => args[1].stylize(...x);
        return `音韻地位<${stylize(this.描述, 'string')}>`;
    }
    /**
     * 驗證給定的音韻地位六要素是否合法。
     *
     * ### 基本取值
     *
     * 母必須為「幫滂並明端透定泥來知徹澄孃精清從心邪莊初崇生俟章昌常書船日見溪羣疑影曉匣云以」之一。
     *
     * 韻必須為「東冬鍾江支脂之微魚虞模齊祭泰佳皆夬灰咍廢真臻文殷元魂痕寒刪山先仙蕭宵肴豪歌麻陽唐庚耕清青蒸登尤侯幽侵覃談鹽添咸銜嚴凡」之一。
     *
     * 當聲母為脣音，或韻母為「東冬鍾江虞模尤幽」（開合中立的韻）時，呼須為 `null`。
     * 在其他情況下，呼須取「開」或「合」。
     *
     * 當聲母為脣牙喉音（不含以母），且為三等韻時，類須取 `A`、`B`、`C` 之一。
     * 在其他情況下，類須為 `null`。
     *
     * ### 搭配
     *
     * 等：
     * - 章組、云以日母：限三等
     * - 羣邪俟母：一般限三等
     * - 匣母：一般限非三等
     * - 端組：限非三等，一般限一四等
     * - 精組（邪母除外）：限一三四等
     * - 知莊組（俟母除外）：限二三等
     * - 此外等當須與韻搭配
     *
     * 呼：
     * - 脣音、或開合中立韻：限 `null`（開合中立）
     * - 云母：除效流深咸四攝外，限非開口
     * - 其餘情形：呼須取「開」或「合」
     *
     * 類：
     * - 限幫見影組三等，其餘情形均須取 `null`（不分類）
     * - 前元音韻（支脂祭真仙宵麻庚清幽侵）：須取 A 或 B，其中清韻限 A 類，庚韻限 B 類
     * - 其餘韻一般須取 C
     * - 蒸韻：須取 C 或 B
     * - 陽韻：限 C 類，但有取 A 類之罕見例外
     * - 云母：限非 A 類
     *
     * 韻：
     * - 凡韻：限脣音
     * - 嚴韻、之魚殷痕韻：限非脣音
     * - 臻韻：限莊組
     * - 真殷韻開口、清韻：限非莊組
     * - 庚韻非二等：銳音限莊組
     *
     * @param 母 聲母：幫, 滂, 並, 明, …
     * @param 呼 呼：`null`, 開, 合
     * @param 等 等：一, 二, 三, 四
     * @param 類 類：`null`, A, B, C
     * @param 韻 韻母（舉平以賅上去入）：東, 冬, 鍾, 江, …, 祭, 泰, 夬, 廢
     * @param 聲 聲調：平, 上, 去, 入
     * @param 邊緣地位種類 若為邊緣地位，列明其種類
     * @throws 若給定的音韻地位六要素不合法，則拋出異常
     */
    static 驗證(母, 呼, 等, 類, 韻, 聲, 邊緣地位種類 = []) {
        const reject = (msg) => {
            throw new Error(`invalid 音韻地位 <${母},${呼 ?? ''},${等},${類 ?? ''},${韻},${聲}>: ` + msg);
        };
        // 驗證取值
        for (const [屬性, 值, nullable] of [
            ['母', 母],
            ['呼', 呼, true],
            ['等', 等],
            ['類', 類, true],
            ['韻', 韻],
            ['聲', 聲],
        ]) {
            if (!((值 === null && !!nullable) || ______2.所有[屬性].includes(值))) {
                const suggestion = {
                    母: { 娘: '孃', 群: '羣' },
                    韻: { 眞: '真', 欣: '殷' },
                }[屬性]?.[值];
                reject(`unrecognized ${屬性}: ${值}` + (suggestion ? ` (did you mean: ${suggestion}?)` : ''));
            }
        }
        // 驗證搭配
        // 順序：搭配規則從基本到精細
        // 聲（僅韻-聲搭配）
        聲 === '入' && ______2.陰聲韻.includes(韻) && reject(`unexpected ${韻}韻入聲`);
        // 等、呼、類（基本）
        // 母-等
        for (const [搭配等, 搭配母] of Object.entries(______2.等母搭配)) {
            if (搭配母.includes(母)) {
                [...搭配等].includes(等) || reject(`unexpected ${母}母${等}等`);
            }
        }
        // 等-韻
        for (const [搭配各等, 搭配各韻] of Object.entries(______2.等韻搭配)) {
            if (搭配各韻.includes(韻)) {
                if ([...搭配各等].includes(等)) {
                    break;
                }
                else if (搭配各等.includes('三') && 等 === '四' && [...'端透定泥'].includes(母)) {
                    break;
                }
                reject(`unexpected ${韻}韻${等}等`);
            }
        }
        // 母-呼（基本）、呼-韻
        if ([...'幫滂並明'].includes(母)) {
            呼 && reject('unexpected 呼 for 脣音');
        }
        else if (______2.呼韻搭配.中立.includes(韻)) {
            呼 && reject('unexpected 呼 for 開合中立韻');
        }
        else if (______2.呼韻搭配.開合.includes(韻)) {
            呼 ?? reject('missing 呼');
        }
        else {
            for (const 搭配呼 of ['開', '合']) {
                if (______2.呼韻搭配[搭配呼].includes(韻)) {
                    if (呼 === 搭配呼) {
                        break;
                    }
                    else if (呼) {
                        reject(`unexpected ${韻}韻${呼}口`);
                    }
                    else {
                        reject(`missing 呼 (should be ${搭配呼})`);
                    }
                }
            }
        }
        // 母-類（基本）、等-類、類-韻（基本）
        if (等 !== '三') {
            類 && reject('unexpected 類 for 非三等');
        }
        else if (!______2.鈍音母.includes(母)) {
            類 && reject('unexpected 類 for 銳音聲母');
        }
        else {
            const [典型搭配類, 搭配類] = 類搭配(母, 韻);
            if (!類) {
                const suggestion = 典型搭配類.length === 1 ? ` (should be ${典型搭配類}${典型搭配類 !== 搭配類 ? ' typically' : ''})` : '';
                reject(`missing 類${suggestion}`);
            }
            else if (!搭配類.includes(類)) {
                if (母 === '云' && 類 === 'A') {
                    reject(`unexpected 云母A類`);
                }
                reject(`unexpected ${韻}韻${類}類`);
            }
        }
        // 母-韻
        if ([...'幫滂並明'].includes(母)) {
            [...'之魚殷痕嚴'].includes(韻) && reject(`unexpected ${韻}韻脣音`);
        }
        else {
            韻 === '凡' && reject(`unexpected 凡韻非脣音`);
        }
        if ([...'莊初崇生俟'].includes(母)) {
            等 === '三' && 韻 === '清' && reject(`unexpected ${韻}韻莊組`);
            呼 === '開' && ['真', '殷'].includes(韻) && reject(`unexpected ${韻}韻開口莊組`);
        }
        else {
            韻 === '臻' && reject(`unexpected 臻韻非莊組`);
            韻 === '庚' && 等 !== '二' && !______2.鈍音母.includes(母) && reject(`unexpected 庚韻${等}等${母}母`);
        }
        // 邊緣搭配
        // 為已知邊緣地位，或特別指定跳過檢查
        if (邊緣地位種類 === exports._UNCHECKED || 已知邊緣地位.has(母 + (呼 ?? '') + 等 + (類 ?? '') + 韻 + 聲)) {
            return;
        }
        const 邊緣地位指定集 = new Set(邊緣地位種類);
        (0, utils_1.assert)(邊緣地位種類.length === 邊緣地位指定集.size, 'duplicates in 邊緣地位種類');
        const marginalTests = [
            ['陽韻A類', true, 韻 === '陽' && 類 === 'A', '陽韻A類'],
            [
                '端組類隔',
                true,
                [...'端透定泥'].includes(母) && (等 === '二' || (等 === '四' && !______2.等韻搭配.四.includes(韻))),
                `${韻}韻${等}等${母}母`,
            ],
            ['咍韻脣音', true, 韻 === '咍' && [...'幫滂並明'].includes(母), `咍韻脣音`],
            ['匣母三等', true, 母 === '匣' && 等 === '三', `匣母三等`],
            ['羣邪俟母非三等', true, 等 !== '三' && [...'羣邪俟'].includes(母), `${母}母${等}等`],
            ['云母開口', false, 母 === '云' && 呼 === '開' && ![...'宵幽侵鹽嚴'].includes(韻), '云母開口'],
        ];
        const knownKinds = marginalTests.map(([kind]) => kind);
        for (const kind of 邊緣地位種類) {
            if (!knownKinds.includes(kind)) {
                throw new Error(`unknown type of marginal 音韻地位: ${kind}`);
            }
        }
        for (const [kind, isStrict, condition, errmsg] of marginalTests) {
            if (condition && !邊緣地位指定集.has(kind)) {
                const suggestion = isStrict ? '' : ` (note: marginal 音韻地位, include '${kind}' in 邊緣地位種類 to allow)`;
                reject(`unexpected ${errmsg}${suggestion}`);
            }
            else if (isStrict && !condition && 邊緣地位指定集.has(kind)) {
                reject(`expect marginal 音韻地位: ${kind} (note: don't specify it in 邊緣地位種類 unless it describes this 音韻地位)`);
            }
        }
    }
    /**
     * 將音韻描述或簡略音韻描述轉換為音韻地位。
     * @param 音韻描述 音韻地位的描述
     * @param 簡略描述 為 `true` 則允許簡略描述，否則須為完整描述
     * @returns 給定的音韻描述或最簡描述對應的音韻地位
     * @example
     * ```typescript
     * > TshetUinh.音韻地位.from描述('幫三C凡入');
     * 音韻地位<幫三C凡入>
     *  > TshetUinh.音韻地位.from描述('幫凡入', true);
     * 音韻地位<幫三C凡入>
     * > TshetUinh.音韻地位.from描述('羣開三A支平');
     * 音韻地位<羣開三A支平>
     * ```
     */
    static from描述(音韻描述, 簡略描述 = false, 邊緣地位種類 = []) {
        const match = pattern描述.exec(音韻描述);
        if (!match) {
            throw new Error(`invalid 描述: ${音韻描述}`);
        }
        const 母 = match[1];
        let 呼 = match[2] || null;
        let 等 = match[3] || null;
        let 類 = match[4] || null;
        const 韻 = match[5];
        const 聲 = match[6];
        if (簡略描述) {
            if (!呼 && ![...'幫滂並明'].includes(母)) {
                if (母 === '云' && ______2.呼韻搭配.開合.includes(韻)) {
                    呼 = '合';
                }
                else {
                    for (const 搭配呼 of ['開', '合']) {
                        if (______2.呼韻搭配[搭配呼].includes(韻)) {
                            呼 = 搭配呼;
                            break;
                        }
                    }
                }
            }
            if (!等) {
                if ([...______2.等母搭配.三, ...'羣邪俟'].includes(母)) {
                    等 = '三';
                }
                else {
                    for (const 搭配等 of ['一', '二', '三', '四']) {
                        if (______2.等韻搭配[搭配等].includes(韻)) {
                            if (搭配等 === '三' && [...'端透定泥'].includes(母)) {
                                等 = '四';
                            }
                            else {
                                等 = 搭配等;
                            }
                            break;
                        }
                    }
                }
            }
            if (!類 && 等 === '三' && ______2.鈍音母.includes(母)) {
                const [典型搭配類] = 類搭配(母, 韻);
                if (典型搭配類.length === 1) {
                    類 = 典型搭配類;
                }
            }
        }
        // NOTE type assertion safe because the constructor checks it
        return new 音韻地位(母, 呼, 等, 類, 韻, 聲, 邊緣地位種類);
    }
}
exports.音韻地位 = 音韻地位;
/**
 * 取得給定條件下可搭配的類，分為「不含邊緣地位」與「含邊緣地位」兩種。
 * 用於 `音韻地位` 的 `.驗證`、`.from描述`、`.簡略描述`。
 */
function 類搭配(母, 韻) {
    let 搭配 = null;
    for (const [搭配類, 搭配韻] of [
        ['C', [...'東鍾之微魚虞廢殷元文歌尤嚴凡']],
        ['AB', [...'支脂祭真仙宵麻幽侵鹽']],
        ['A', [...'清']],
        ['B', [...'庚']],
        ['BC', [...'蒸']],
        ['CA', [...'陽']],
    ]) {
        if (搭配韻.includes(韻)) {
            搭配 = [搭配類 === 'CA' ? 'C' : 搭配類, 搭配類];
            break;
        }
    }
    if (搭配 === null) {
        throw new Error(`unknown 韻: ${韻}`);
    }
    if (母 === '云') {
        return 搭配.map(x => x.replace(/A/g, ''));
    }
    return 搭配;
}
/**
 * 惰性求值參數，用於 `音韻地位.屬於` 標籤模板形式
 */
class LazyParameter {
    constructor(inner, 地位) {
        this.inner = inner;
        this.地位 = 地位;
    }
    static from(param, 地位) {
        switch (typeof param) {
            case 'string':
                return 地位.屬於(param);
            case 'function':
                return new LazyParameter(param, 地位);
            default:
                return !!param;
        }
    }
    eval() {
        if (typeof this.inner === 'function') {
            this.inner = this.inner.call(undefined);
            if (typeof this.inner === 'string') {
                this.inner = this.地位.屬於(this.inner);
            }
        }
        return (this.inner = !!this.inner);
    }
    toString() {
        return String(this.inner);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi6Z+z6Z+75Zyw5L2NLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi/pn7Ppn7vlnLDkvY0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG1DQUFpQztBQUNqQyxrRUFBK0M7QUFDL0Msa0VBQTBEO0FBRTFELE1BQU0sU0FBUyxHQUFHLElBQUksTUFBTSxDQUMxQixNQUFNLFVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLFVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLFVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLO0lBQy9ELEtBQUssVUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsVUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sVUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFDbEUsR0FBRyxDQUNKLENBQUM7QUFFRixjQUFjO0FBQ2QsTUFBTSxRQUFRLEdBQUc7SUFDZixHQUFHLFVBQUU7SUFDTCxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBVTtJQUN4QixDQUFDLEVBQUUsQ0FBQyxHQUFHLGtCQUFrQixDQUFVO0lBQ25DLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFVO0NBQzVCLENBQUM7QUE4QkYsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUM7SUFDckIsU0FBUztJQUNULE9BQU87SUFDUCxPQUFPLEVBQUUsS0FBSztJQUNkLE9BQU87SUFDUCxPQUFPLEVBQUUsSUFBSTtJQUNiLE9BQU8sRUFBRSxJQUFJO0lBQ2IsT0FBTyxFQUFFLFFBQVE7SUFDakIsT0FBTyxFQUFFLElBQUk7SUFDYixPQUFPLEVBQUUsSUFBSTtJQUNiLE9BQU8sRUFBRSxJQUFJO0lBQ2IsTUFBTSxFQUFFLElBQUk7SUFDWixVQUFVO0lBQ1YsVUFBVTtJQUNWLGFBQWE7SUFDYixPQUFPO0lBQ1AsVUFBVTtJQUNWLE9BQU87SUFDUCxRQUFRLEVBQUUsSUFBSTtJQUNkLFFBQVEsRUFBRSxJQUFJO0NBQ2YsQ0FBQyxDQUFDO0FBRVUsUUFBQSxVQUFVLEdBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUVwRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxNQUFhLElBQUk7SUE2RmY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FzQkc7SUFDSCxZQUFZLENBQVMsRUFBRSxDQUFnQixFQUFFLENBQVMsRUFBRSxDQUFnQixFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsU0FBbUIsRUFBRTtRQXVvQmpILDJDQUEyQztRQUNsQyxRQUFvQixHQUFHLE1BQU0sQ0FBQztRQXZvQnJDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDbEMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ1gsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDWCxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2IsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsSUFBSSxFQUFFO1FBQ0osTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNuQixPQUFPLFlBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsSUFBSSxDQUFDO1FBQ0gsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNuQixPQUFPLFdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNoQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sV0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksRUFBRTtRQUNKLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3RCLE9BQU8sV0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxJQUFJLENBQUM7UUFDSCxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE9BQU8sV0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxJQUFJLElBQUk7UUFDTixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7WUFDNUIsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUNYLENBQUM7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQzNCLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDWCxDQUFDO2FBQU0sSUFBSSxDQUFDLElBQUksWUFBSSxDQUFDLENBQWMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2pELENBQUMsR0FBRyxJQUFJLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN4QyxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1QsQ0FBQzthQUFNLElBQUksWUFBSSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsWUFBSSxDQUFDLEVBQUUsRUFBRSxHQUFHLFlBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUN2RSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQ1QsQ0FBQztRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQy9DLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksR0FBRztRQUNMLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNsQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUNsQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDekIsSUFBSSxLQUFhLENBQUM7UUFDbEIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDdEUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdkIsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLFlBQVksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDekQsT0FBTyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVCLENBQUM7YUFBTSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQ2xDLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUNELE9BQU8sQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsSUFBSSxHQUFHO1FBQ0wsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdCLE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQzthQUFNLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDakUsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO2FBQU0sQ0FBQztZQUNOLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNILENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTRCRztJQUNILEVBQUUsQ0FBQyxJQUFxQixFQUFFLFNBQW1CLEVBQUU7UUFDN0MsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBaUQsRUFBRSxDQUFDO1lBQ2xFLE1BQU0sR0FBRyxHQUFHLENBQXlCLEVBQUssRUFBRSxDQUFVLEVBQUUsRUFBRTtnQkFDeEQsSUFBQSxjQUFNLEVBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyw0QkFBNEIsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUM7WUFFRixLQUFLLE1BQU0sS0FBSyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQztnQkFDOUMsTUFBTSxLQUFLLEdBQUcsNENBQTRDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN2RSxJQUFBLGNBQU0sRUFBQyxLQUFLLEtBQUssSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLDRCQUE0QixLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUNsRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsTUFBTyxDQUFDO2dCQUNuQyxJQUFJLEVBQUUsRUFBRSxDQUFDO29CQUNQLElBQUksRUFBRSxLQUFLLE1BQU07d0JBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzt5QkFDN0IsSUFBSSxFQUFFLEtBQUssS0FBSzt3QkFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUN4QyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBaUIsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDOUMsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLEdBQUcsUUFBUSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDeEYsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBaUZELEVBQUUsQ0FBQyxHQUErQixFQUFFLEdBQUcsRUFBYTtRQUNsRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVE7WUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUV6QyxvQkFBb0I7UUFDcEIsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3BDLE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFXLEVBQUU7WUFDM0MsSUFBSSxLQUFLLEdBQTJCLElBQUksQ0FBQztZQUN6QyxJQUFJLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hFLElBQUksS0FBSyxLQUFLLElBQUk7Z0JBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDO1lBQ3JDLElBQUksS0FBSyxLQUFLLElBQUk7Z0JBQUUsT0FBTyxDQUFDLEtBQUssR0FBRyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFBRSxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUM7WUFDNUMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFBRSxPQUFPLENBQUMsS0FBSyxJQUFJLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQUUsT0FBTyxFQUFFLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9ELElBQUksS0FBSyxLQUFLLElBQUk7Z0JBQUUsT0FBTyxXQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksS0FBSyxLQUFLLElBQUk7Z0JBQUUsT0FBTyxDQUFDLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNoRCxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQTBCLENBQUM7Z0JBQzlDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxJQUFJLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxXQUFXLEdBQUcsS0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDakUsQ0FBQztnQkFDRCxPQUFPLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBRSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELE1BQU0sSUFBSSxLQUFLLENBQUMsZ0NBQWdDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDM0QsQ0FBQyxDQUFDO1FBS0YsTUFBTSxRQUFRLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFVLENBQUM7UUFDekQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxlQUFlLENBQVUsQ0FBQztRQUMvRixNQUFNLE1BQU0sR0FBc0IsRUFBRSxDQUFDO1FBQ3JDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7WUFDcEMsS0FBSyxNQUFNLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHVDQUF1QyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDNUYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDakIsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUMvQyxDQUFDO1lBQ0gsQ0FBQztZQUNELElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0gsQ0FBQztRQUNELElBQUEsY0FBTSxFQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztRQUUxQyxPQUFPO1FBQ1AsdUJBQXVCO1FBQ3ZCLGdEQUFnRDtRQUNoRCxNQUFNO1FBQ04sc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQixvQkFBb0I7UUFDcEIsbUJBQW1CO1FBQ25CLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNmLE1BQU0sR0FBRyxHQUFvQixDQUFDLEtBQUssRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO1FBQzFELE1BQU0sSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbkUsTUFBTSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBT3JFLFNBQVMsV0FBVyxDQUFDLFFBQWlCO1lBQ3BDLE1BQU0sWUFBWSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2xCLE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQztZQUNELE1BQU0sTUFBTSxHQUFVLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzNDLFNBQVMsQ0FBQztnQkFDUixvQkFBb0I7Z0JBQ3BCLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxLQUFLLEtBQUssSUFBSSxFQUFFLENBQUM7b0JBQ25CLE1BQU0sRUFBRSxDQUFDO29CQUNULE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBR0QsU0FBUyxZQUFZLENBQUMsUUFBaUI7WUFDckMsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFDbEIsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1lBQ0QsTUFBTSxPQUFPLEdBQVUsQ0FBQyxLQUFLLEVBQUUsWUFBWSxDQUFDLENBQUM7WUFDN0MsU0FBUyxDQUFDO2dCQUNSLHFCQUFxQjtnQkFDckIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUN2QixJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUUsQ0FBQztvQkFDcEIsTUFBTSxFQUFFLENBQUM7b0JBQ1QsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEMsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDWixPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN4QixDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxPQUFPLENBQUM7b0JBQ2pCLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBR0QsU0FBUyxZQUFZLENBQUMsUUFBaUI7WUFDckMsS0FBSztZQUNMLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQztZQUM1QixJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDbkIsU0FBUyxDQUFDO2dCQUNSLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxLQUFLLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ3BCLGVBQWUsR0FBRyxJQUFJLENBQUM7b0JBQ3ZCLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztvQkFDakIsTUFBTSxFQUFFLENBQUM7Z0JBQ1gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE1BQU07Z0JBQ1IsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLE9BQU8sR0FBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNoRCxpQkFBaUI7WUFDakIsTUFBTSxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLFlBQVksYUFBYSxFQUFFLENBQUM7Z0JBQ2pFLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3BCLE1BQU0sRUFBRSxDQUFDO2dCQUNULE9BQU8sT0FBTyxDQUFDO1lBQ2pCLENBQUM7aUJBQU0sSUFBSSxLQUFLLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLE1BQU0sRUFBRSxDQUFDO2dCQUNULE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxVQUFVLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLGFBQWEsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZELENBQUM7Z0JBQ0QsSUFBSSxNQUFNLEVBQUUsQ0FBQztvQkFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUMxQixDQUFDO3FCQUFNLENBQUM7b0JBQ04sT0FBTyxHQUFHLFNBQVMsQ0FBQztnQkFDdEIsQ0FBQztnQkFDRCxPQUFPLE9BQU8sQ0FBQztZQUNqQixDQUFDO2lCQUFNLElBQUksZUFBZSxJQUFJLFFBQVEsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLFFBQVEsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUM7Z0JBQ25FLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxRQUFRLFVBQVUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUMxRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDO1FBQ0gsQ0FBQztRQUVELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQixNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDO1FBQ2pDLElBQUksS0FBSyxLQUFLLEtBQUssRUFBRSxDQUFDO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELEtBQUs7UUFDTCxNQUFNLFFBQVEsR0FBRyxDQUFDLElBQVcsRUFBVyxFQUFFO1lBQ3hDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDM0IsUUFBUSxFQUFFLEVBQUUsQ0FBQztnQkFDWCxLQUFLLE9BQU87b0JBQ1YsT0FBTyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlCLEtBQUssS0FBSztvQkFDUixPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixLQUFLLEtBQUs7b0JBQ1IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNqQyxLQUFLLElBQUk7b0JBQ1AsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDSCxDQUFDLENBQUM7UUFFRixNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQWdCLEVBQVcsRUFBRSxDQUNoRCxPQUFPLE9BQU8sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxZQUFZLGFBQWEsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFakgsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEIsQ0FBQztJQWdERCxFQUFFLENBQUksRUFBYSxFQUFFLFNBQTJCLEtBQUssRUFBRSxXQUFXLEdBQUcsS0FBSztRQUN4RSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDeEMsU0FBUyxNQUFNLENBQUMsR0FBa0I7WUFDaEMsT0FBTyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxDQUFDLElBQWUsRUFBeUIsRUFBRTtZQUN0RCxLQUFLLE1BQU0sRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUN0QixJQUFBLGNBQU0sRUFBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakIsSUFBSSxPQUFPLEdBQUcsS0FBSyxVQUFVO29CQUFFLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDM0MsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSyxFQUFFLENBQUM7b0JBQ2xFLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO3dCQUFFLE9BQU8sRUFBRSxDQUFDO29CQUMzQixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7b0JBQ3JCLElBQUksR0FBRyxLQUFLLFVBQVUsSUFBSSxXQUFXO3dCQUFFLFNBQVM7b0JBQ2hELE9BQU8sR0FBRyxDQUFDO2dCQUNiLENBQUM7WUFDSCxDQUFDO1lBQ0QsT0FBTyxVQUFVLENBQUM7UUFDcEIsQ0FBQyxDQUFDO1FBRUYsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3JCLElBQUksR0FBRyxLQUFLLFVBQVUsRUFBRSxDQUFDO1lBQ3ZCLElBQUksTUFBTSxLQUFLLEtBQUs7Z0JBQUUsT0FBTyxJQUFJLENBQUM7O2dCQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sTUFBTSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RSxDQUFDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEVBQUUsQ0FBQyxLQUFXO1FBQ1osT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELG1CQUFtQjtJQUNuQixRQUFRO1FBQ04sT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFLRCwrQkFBK0I7SUFDL0IsT0FIVSxNQUFNLENBQUMsV0FBVyxFQUczQixNQUFNLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQWU7UUFDM0QsTUFBTSxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQVksRUFBRSxFQUFFLENBQUUsSUFBSSxDQUFDLENBQUMsQ0FBMEMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNyRyxPQUFPLFFBQVEsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNERztJQUNILE1BQU0sQ0FBQyxFQUFFLENBQ1AsQ0FBUyxFQUNULENBQWdCLEVBQ2hCLENBQVMsRUFDVCxDQUFnQixFQUNoQixDQUFTLEVBQ1QsQ0FBUyxFQUNULFNBQW1CLEVBQUU7UUFFckIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRTtZQUM3QixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDdEYsQ0FBQyxDQUFDO1FBRUYsT0FBTztRQUNQLEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsUUFBUSxDQUFDLElBQUk7WUFDOUIsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ1IsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQztZQUNkLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztZQUNSLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUM7WUFDZCxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFDUixDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDQSxFQUFFLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLFVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBRSxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN6RCxNQUFNLFVBQVUsR0FDZDtvQkFDRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUU7b0JBQ3JCLENBQUMsRUFBRSxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRTtpQkFFeEIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUUsQ0FBQyxDQUFDO2dCQUNaLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxtQkFBbUIsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0YsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPO1FBQ1AsZ0JBQWdCO1FBRWhCLFlBQVk7UUFDWixDQUFDLEtBQUssR0FBRyxJQUFJLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUU3RCxZQUFZO1FBQ1osTUFBTTtRQUNOLEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQUksQ0FBQyxFQUFFLENBQUM7WUFDOUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ3BCLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUQsQ0FBQztRQUNILENBQUM7UUFDRCxNQUFNO1FBQ04sS0FBSyxNQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsWUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNoRCxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQzFCLE1BQU07Z0JBQ1IsQ0FBQztxQkFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ3RFLE1BQU07Z0JBQ1IsQ0FBQztnQkFDRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQyxDQUFDO1FBQ0gsQ0FBQztRQUNELGNBQWM7UUFDZCxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUM1QixDQUFDLElBQUksTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDckMsQ0FBQzthQUFNLElBQUksWUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMvQixDQUFDLElBQUksTUFBTSxDQUFDLHdCQUF3QixDQUFDLENBQUM7UUFDeEMsQ0FBQzthQUFNLElBQUksWUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMvQixDQUFDLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7YUFBTSxDQUFDO1lBQ04sS0FBSyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQVUsRUFBRSxDQUFDO2dCQUN0QyxJQUFJLFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7d0JBQ2QsTUFBTTtvQkFDUixDQUFDO3lCQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQ2IsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ2xDLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixNQUFNLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxDQUFDLENBQUM7b0JBQ3pDLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQ0Qsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ2QsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7YUFBTSxJQUFJLENBQUMsV0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVCLENBQUMsSUFBSSxNQUFNLENBQUMsdUJBQXVCLENBQUMsQ0FBQztRQUN2QyxDQUFDO2FBQU0sQ0FBQztZQUNOLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsTUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsS0FBSyxHQUFHLEtBQUssS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDekcsTUFBTSxDQUFDLFlBQVksVUFBVSxFQUFFLENBQUMsQ0FBQztZQUNuQyxDQUFDO2lCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7b0JBQzNCLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUM1QixDQUFDO2dCQUNELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7UUFDSCxDQUFDO1FBRUQsTUFBTTtRQUNOLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzVCLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzRCxDQUFDO2FBQU0sQ0FBQztZQUNOLENBQUMsS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDMUMsQ0FBQztRQUNELElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBQzdCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsQ0FBQzthQUFNLENBQUM7WUFDTixDQUFDLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3hDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNsRixDQUFDO1FBRUQsT0FBTztRQUVQLG9CQUFvQjtRQUNwQixJQUFJLE1BQU0sS0FBSyxrQkFBVSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMvRSxPQUFPO1FBQ1QsQ0FBQztRQUVELE1BQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hDLElBQUEsY0FBTSxFQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssT0FBTyxDQUFDLElBQUksRUFBRSxzQkFBc0IsQ0FBQyxDQUFDO1FBRS9ELE1BQU0sYUFBYSxHQUFHO1lBQ3BCLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsTUFBTSxDQUFDO1lBQzlDO2dCQUNFLE1BQU07Z0JBQ04sSUFBSTtnQkFDSixDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1RSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHO2FBQ2xCO1lBQ0QsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUM7WUFDNUQsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxNQUFNLENBQUM7WUFDOUMsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNwRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUM7U0FDcEUsQ0FBQztRQUVYLE1BQU0sVUFBVSxHQUFhLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRSxLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQzFCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7Z0JBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMsa0NBQWtDLElBQUksRUFBRSxDQUFDLENBQUM7WUFDNUQsQ0FBQztRQUNILENBQUM7UUFFRCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNoRSxJQUFJLFNBQVMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDcEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLG1DQUFtQyxJQUFJLHVCQUF1QixDQUFDO2dCQUNsRyxNQUFNLENBQUMsY0FBYyxNQUFNLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUM5QyxDQUFDO2lCQUFNLElBQUksUUFBUSxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDdkQsTUFBTSxDQUFDLHlCQUF5QixJQUFJLG1FQUFtRSxDQUFDLENBQUM7WUFDM0csQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUFDLElBQVksRUFBRSxJQUFJLEdBQUcsS0FBSyxFQUFFLFNBQW1CLEVBQUU7UUFDN0QsTUFBTSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDWCxNQUFNLElBQUksS0FBSyxDQUFDLGVBQWUsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ25CLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQztRQUN6QixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNuQixNQUFNLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbkIsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNULElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxZQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUNyQyxDQUFDLEdBQUcsR0FBRyxDQUFDO2dCQUNWLENBQUM7cUJBQU0sQ0FBQztvQkFDTixLQUFLLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBVSxFQUFFLENBQUM7d0JBQ3RDLElBQUksWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUMxQixDQUFDLEdBQUcsR0FBRyxDQUFDOzRCQUNSLE1BQU07d0JBQ1IsQ0FBQztvQkFDSCxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUNQLElBQUksQ0FBQyxHQUFHLFlBQUksQ0FBQyxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDdEMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztnQkFDVixDQUFDO3FCQUFNLENBQUM7b0JBQ04sS0FBSyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBVSxFQUFFLENBQUM7d0JBQ2hELElBQUksWUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDOzRCQUMxQixJQUFJLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dDQUMzQyxDQUFDLEdBQUcsR0FBRyxDQUFDOzRCQUNWLENBQUM7aUNBQU0sQ0FBQztnQ0FDTixDQUFDLEdBQUcsR0FBRyxDQUFDOzRCQUNWLENBQUM7NEJBQ0QsTUFBTTt3QkFDUixDQUFDO29CQUNILENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7WUFFRCxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksV0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN2QyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUN2QixDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNaLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUVELDZEQUE2RDtRQUM3RCxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQXRoQ0Qsb0JBc2hDQztBQUVEOzs7R0FHRztBQUNILFNBQVMsR0FBRyxDQUFDLENBQVMsRUFBRSxDQUFTO0lBQy9CLElBQUksRUFBRSxHQUE0QixJQUFJLENBQUM7SUFDdkMsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJO1FBQ3ZCLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzVCLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN6QixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDZixDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7UUFDaEIsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0tBQ1IsRUFBRSxDQUFDO1FBQ1gsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEIsRUFBRSxHQUFHLENBQUMsR0FBRyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDckMsTUFBTTtRQUNSLENBQUM7SUFDSCxDQUFDO0lBQ0QsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFLENBQUM7UUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2QsT0FBTyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQWMsQ0FBQztJQUN2RCxDQUFDO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLGFBQWE7SUFDakIsWUFDVSxLQUFjLEVBQ2QsRUFBUTtRQURSLFVBQUssR0FBTCxLQUFLLENBQVM7UUFDZCxPQUFFLEdBQUYsRUFBRSxDQUFNO0lBQ2YsQ0FBQztJQUVKLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBYyxFQUFFLEVBQVE7UUFDbEMsUUFBUSxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ3JCLEtBQUssUUFBUTtnQkFDWCxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDdEIsS0FBSyxVQUFVO2dCQUNiLE9BQU8sSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3RDO2dCQUNFLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNuQixDQUFDO0lBQ0gsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ3hDLElBQUksT0FBTyxJQUFJLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRSxDQUFDO2dCQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN0QyxDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQUNGIn0=