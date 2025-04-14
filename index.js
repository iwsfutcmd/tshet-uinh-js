(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.TshetUinh = {}));
})(this, (function (exports) { 'use strict';

    function assert(condition, errorMessage) {
        if (!condition) {
            throw new Error(typeof errorMessage === 'function' ? errorMessage() : errorMessage);
        }
    }
    function insertInto(map, key, value) {
        if (!map.has(key)) {
            map.set(key, [value]);
        }
        else {
            map.get(key).push(value);
        }
    }
    function prependValuesInto(map, key, values) {
        if (!map.has(key)) {
            map.set(key, [...values]);
        }
        else {
            map.set(key, [...values, ...map.get(key)]);
        }
    }

    // prettier-ignore
    const 母到清濁 = {
        幫: '全清',
        端: '全清', 知: '全清',
        精: '全清', 心: '全清', 莊: '全清', 生: '全清', 章: '全清', 書: '全清',
        見: '全清', 影: '全清', 曉: '全清',
        滂: '次清',
        透: '次清', 徹: '次清',
        清: '次清', 初: '次清', 昌: '次清',
        溪: '次清',
        並: '全濁',
        定: '全濁', 澄: '全濁',
        從: '全濁', 邪: '全濁', 崇: '全濁', 俟: '全濁', 常: '全濁', 船: '全濁',
        羣: '全濁', 匣: '全濁',
        明: '次濁',
        泥: '次濁', 孃: '次濁', 來: '次濁', 日: '次濁',
        疑: '次濁', 云: '次濁', 以: '次濁',
    };
    // prettier-ignore
    const 母到組 = {
        幫: '幫', 滂: '幫', 並: '幫', 明: '幫',
        端: '端', 透: '端', 定: '端', 泥: '端',
        知: '知', 徹: '知', 澄: '知', 孃: '知',
        精: '精', 清: '精', 從: '精', 心: '精', 邪: '精',
        莊: '莊', 初: '莊', 崇: '莊', 生: '莊', 俟: '莊',
        章: '章', 昌: '章', 船: '章', 書: '章', 常: '章',
        見: '見', 溪: '見', 羣: '見', 疑: '見',
        影: '影', 曉: '影', 匣: '影', 云: '影',
        來: null, 日: null, 以: null,
    };
    // prettier-ignore
    const 母到音 = {
        幫: '脣', 滂: '脣', 並: '脣', 明: '脣',
        端: '舌', 透: '舌', 定: '舌', 泥: '舌',
        知: '舌', 徹: '舌', 澄: '舌', 孃: '舌',
        來: '舌',
        精: '齒', 清: '齒', 從: '齒', 心: '齒', 邪: '齒',
        莊: '齒', 初: '齒', 崇: '齒', 生: '齒', 俟: '齒',
        章: '齒', 昌: '齒', 常: '齒', 書: '齒', 船: '齒',
        日: '齒',
        見: '牙', 溪: '牙', 羣: '牙', 疑: '牙',
        影: '喉', 曉: '喉', 匣: '喉', 云: '喉',
        以: '喉',
    };
    // prettier-ignore
    const 韻到攝 = {
        東: '通', 冬: '通', 鍾: '通',
        江: '江',
        支: '止', 脂: '止', 之: '止', 微: '止',
        魚: '遇', 虞: '遇', 模: '遇',
        齊: '蟹', 佳: '蟹', 皆: '蟹', 灰: '蟹', 咍: '蟹', 祭: '蟹', 泰: '蟹', 夬: '蟹', 廢: '蟹',
        真: '臻', 諄: '臻', 臻: '臻', 文: '臻', 殷: '臻', 魂: '臻', 痕: '臻',
        元: '山', 寒: '山', 桓: '山', 刪: '山', 山: '山', 先: '山', 仙: '山',
        蕭: '效', 宵: '效', 肴: '效', 豪: '效',
        歌: '果', 戈: '果',
        麻: '假',
        唐: '宕', 陽: '宕',
        庚: '梗', 耕: '梗', 清: '梗', 青: '梗',
        登: '曾', 蒸: '曾',
        侯: '流', 尤: '流', 幽: '流',
        侵: '深',
        覃: '咸', 談: '咸', 鹽: '咸', 添: '咸', 咸: '咸', 銜: '咸', 嚴: '咸', 凡: '咸',
    };

    /** 全部六要素之枚舉 */
    const 所有 = {
        母: [...'幫滂並明端透定泥來知徹澄孃精清從心邪莊初崇生俟章昌常書船日見溪羣疑影曉匣云以'],
        呼: [...'開合'],
        等: [...'一二三四'],
        類: [...'ABC'],
        韻: [...'東冬鍾江支脂之微魚虞模齊祭泰佳皆夬灰咍廢真臻文殷元魂痕寒刪山先仙蕭宵肴豪歌麻陽唐庚耕清青蒸登尤侯幽侵覃談鹽添咸銜嚴凡'],
        聲: [...'平上去入'],
    };
    /** 幫見影組聲母，在三等分ABC類 */
    const 鈍音母 = [...'幫滂並明見溪羣疑影曉匣云'];
    const 陰聲韻 = [...'支脂之微魚虞模齊祭泰佳皆夬灰咍廢蕭宵肴豪歌麻侯尤幽'];
    /** 依可搭配的等列出各韻 */
    const 等韻搭配 = {
        一: [...'冬模泰灰咍魂痕寒豪唐登侯覃談'],
        二: [...'江佳皆夬刪山肴耕咸銜'],
        三: [...'鍾支脂之微魚虞祭廢真臻文殷元仙宵陽清蒸尤幽侵鹽嚴凡'],
        四: [...'齊先蕭青添'],
        一三: [...'東歌'],
        二三: [...'麻庚'],
    };
    /** 依可搭配的呼列出各韻 */
    const 呼韻搭配 = {
        開合: [...'支脂微齊祭泰佳皆夬廢真元寒刪山先仙歌麻陽唐庚耕清青蒸登'],
        開: [...'之魚咍臻殷痕蕭宵肴豪幽侵覃談鹽添咸銜嚴'],
        合: [...'虞灰文魂凡'],
        中立: [...'東冬鍾江模尤侯'],
    };
    /** 依可搭配的等列出各母，包含邊緣搭配 */
    const 等母搭配 = {
        一二三四: [...'幫滂並明來見溪羣疑影曉匣'],
        二三: [...'知徹澄孃莊初崇生俟'],
        一三四: [...'精清從心邪'],
        三: [...'章昌常書船日云以'],
        一二四: [...'端透定泥'],
    };

    var _a;
    const pattern描述 = new RegExp(`^([${所有.母.join('')}])([${所有.呼.join('')}]?)([${所有.等.join('')}]?)` +
        `([${所有.類.join('')}]?)([${所有.韻.join('')}])([${所有.聲.join('')}])$`, 'u');
    // for 音韻地位.屬於
    const 表達式屬性可取值 = {
        ...所有,
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
    const _UNCHECKED = ['@UNCHECKED@'];
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
            return 母到清濁[母];
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
            return 母到音[母];
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
            return 韻到攝[韻];
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
            return 陰聲韻.includes(韻) ? '陰' : 聲 === '入' ? '入' : '陽';
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
            return 母到組[母];
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
            else if (呼 && 呼韻搭配[呼].includes(韻)) {
                呼 = null;
            }
            if (等 === '三' && [...'羣邪俟'].includes(母)) {
                等 = '';
            }
            else if (等母搭配.三.includes(母) || ![...等韻搭配.一三, ...等韻搭配.二三].includes(韻)) {
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
                    assert(!(屬性 in 屬性object), () => `duplicated assignment of ${屬性}`);
                    屬性object[屬性] = 值;
                };
                for (const token of 調整屬性.trim().split(/\s+/u)) {
                    const match = /^(?<kv>開合中立|不分類)$|^(?<v>.)(?<k>[母口等類韻聲])$/u.exec(token);
                    assert(match !== null, () => `unrecognized expression: ${token}`);
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
                    return 鈍音母.includes(母);
                if (token === '銳音')
                    return !鈍音母.includes(母);
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
            assert(tokens.length, 'empty expression');
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
                    assert(Array.isArray(規則) && 規則.length === 2, '規則需符合格式');
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
                if (!((值 === null && !!nullable) || 所有[屬性].includes(值))) {
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
            聲 === '入' && 陰聲韻.includes(韻) && reject(`unexpected ${韻}韻入聲`);
            // 等、呼、類（基本）
            // 母-等
            for (const [搭配等, 搭配母] of Object.entries(等母搭配)) {
                if (搭配母.includes(母)) {
                    [...搭配等].includes(等) || reject(`unexpected ${母}母${等}等`);
                }
            }
            // 等-韻
            for (const [搭配各等, 搭配各韻] of Object.entries(等韻搭配)) {
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
            else if (呼韻搭配.中立.includes(韻)) {
                呼 && reject('unexpected 呼 for 開合中立韻');
            }
            else if (呼韻搭配.開合.includes(韻)) {
                呼 ?? reject('missing 呼');
            }
            else {
                for (const 搭配呼 of ['開', '合']) {
                    if (呼韻搭配[搭配呼].includes(韻)) {
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
            else if (!鈍音母.includes(母)) {
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
                韻 === '庚' && 等 !== '二' && !鈍音母.includes(母) && reject(`unexpected 庚韻${等}等${母}母`);
            }
            // 邊緣搭配
            // 為已知邊緣地位，或特別指定跳過檢查
            if (邊緣地位種類 === _UNCHECKED || 已知邊緣地位.has(母 + (呼 ?? '') + 等 + (類 ?? '') + 韻 + 聲)) {
                return;
            }
            const 邊緣地位指定集 = new Set(邊緣地位種類);
            assert(邊緣地位種類.length === 邊緣地位指定集.size, 'duplicates in 邊緣地位種類');
            const marginalTests = [
                ['陽韻A類', true, 韻 === '陽' && 類 === 'A', '陽韻A類'],
                [
                    '端組類隔',
                    true,
                    [...'端透定泥'].includes(母) && (等 === '二' || (等 === '四' && !等韻搭配.四.includes(韻))),
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
                    if (母 === '云' && 呼韻搭配.開合.includes(韻)) {
                        呼 = '合';
                    }
                    else {
                        for (const 搭配呼 of ['開', '合']) {
                            if (呼韻搭配[搭配呼].includes(韻)) {
                                呼 = 搭配呼;
                                break;
                            }
                        }
                    }
                }
                if (!等) {
                    if ([...等母搭配.三, ...'羣邪俟'].includes(母)) {
                        等 = '三';
                    }
                    else {
                        for (const 搭配等 of ['一', '二', '三', '四']) {
                            if (等韻搭配[搭配等].includes(韻)) {
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
                if (!類 && 等 === '三' && 鈍音母.includes(母)) {
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

    var raw資料 = `\
#東
EAA德紅東春方也說文曰動也从日在木中亦東風菜廣州記云陸地生莖赤和肉作羹味如酪香似蘭吳都賦云莫則東風扶留又姓舜七友有東不訾又漢複姓十三氏左傳魯鄉東門襄仲後因氏焉齊有大夫東郭偃又有東宮得臣晉有東關嬖五神仙傳有廣陵人東陵聖母適杜氏齊景公時有隱居東陵者乃以爲氏世本宋大夫東鄉爲人賈執英賢傳云今高密有東鄉姓宋有員外郎東陽無疑撰齊諧記七卷昔有東閭子甞富貴後乞於道云吾爲相六年未薦一士夏禹之後東樓公封于杞後以爲氏莊子東野稷漢有平原東方朔曹瞞傳有南陽太守東里昆何氏姓苑有東萊氏德紅切十七|菄東風菜義見上注俗加艹（春方也說文曰動也从日在木中亦東風菜廣州記云陸地生莖赤和肉作羹味如酪香似蘭吳都賦云莫則東風扶留又姓舜七友有東不訾又漢複姓十三氏左傳魯鄉東門襄仲後因氏焉齊有大夫東郭偃又有東宮得臣晉有東關嬖五神仙傳有廣陵人東陵聖母適杜氏齊景公時有隱居東陵者乃以爲氏世本宋大夫東鄉爲人賈執英賢傳云今高密有東鄉姓宋有員外郎東陽無疑撰齊諧記七卷昔有東閭子甞富貴後乞於道云吾爲相六年未薦一士夏禹之後東樓公封于杞後以爲氏莊子東野稷漢有平原東方朔曹瞞傳有南陽太守東里昆何氏姓苑有東萊氏德紅切十七）|鶇鶇鵍鳥名美形出廣雅亦作𪂝|䍶獸名山海經曰秦戲山有獸狀如羊一角一目目在耳後其名曰䍶又音陳音棟|𠍀儱𠍀儜劣皃出字諟|倲上同（儱𠍀儜劣皃出字諟）|𩜍地理志云東郡館名|𢘐古文見道經|涷瀧涷沾漬說文曰水出發鳩山入於河又都貢切|蝀螮蝀虹也又音董|凍凍凌又都貢切|鯟魚名似鯉|𢔅行皃|崠崠如山名|埬上埬地名|𧓕蛞𧓕科斗蟲也案爾雅曰科斗活東郭璞云蝦蟆子也字俗從䖵|䰤醜皃
GAA徒紅同齊也共也輩也合也律歷有六同亦州春秋時晉夷吾獻其西河地於秦七國時屬魏秦并天下爲內史之地漢武更名馮翊又有九龍泉泉有九源同爲一流因以名之又羌複姓有同蹄氏望在勃海徒紅切四十五|仝古文出道書|童童獨也言童子未有室家也又姓出東莞漢有琅邪內史童仲玉|僮僮僕又頑也癡也又姓漢有交阯刺史僮尹出風俗通|銅金之一品|桐木名月令曰清明之日桐始華又桐廬縣在睦州亦姓有桐君藥錄兩卷|峒崆峒山名|硐磨也|𦨴𦨴船|𧱁獸似豕出泰山|筒竹筒又竹名射筒吳都賦曰其竹則桂箭射筒|瞳目瞳|㼧㼧瓦|𤭁上同（㼧瓦）|罿車上網又音衝|犝犝牛無角|筩竹筩|潼水名出廣漢郡亦關名又通衝二音|曈曈曨日欲明也又他孔切|洞洪洞縣名在晉州北又徒弄切|侗楊子法言云倥侗顓蒙|橦木名花可爲布出字書又鍾幢二音|烔熱氣烔烔出字林|䴀鸏䴀水鳥黃喙喙長尺餘南人以爲酒器出劉欣期交州記|挏引也漢官名有挏馬又音動|酮馬酪又音動|鮦爾雅云鰹大鮦又直冢直柳二切|㼿井甓一云甃也|𦏆無角羊|𦍻上同（無角羊）|眮目眶又徒摠切|蕫草名又多動切|穜穜稑先種後熟謂之穜後種先熟謂之稑又音重|衕通街也|𩍅靫具飾也|𢈉地下應聲|䆚通䆚也|哃哃𠹔大言|𢏕弓飾|絧布名|𨚯鄉名|𨝯地名又姓|𪔜鼓聲|𩦶黑虎|𪒿黑皃
JBA陟弓中平也成也宜也堪也任也和也半也又姓漢少府鄉中京出風俗通又漢複姓有七氏漢有諫議大夫中行彪晉中行偃之後虞有五英之樂掌中英者因以爲氏古有隱者中梁子漢書藝文志有室中周著書十篇賈執英賢傳云路中大夫之後以路中爲氏張晏云姓路爲中大夫何氏姓苑有中壘氏中野氏陟弓切又陟仲切四|衷善也正也適也中也又衷衣褻衣也|忠無私也敬也直也厚也亦州名本漢臨江縣屬巴郡後魏置臨州貞觀爲忠州|𦬕草名又音沖
LBA直弓蟲爾雅曰有足曰蟲無足曰豸又姓漢功臣表有曲成侯蟲達直弓切七|沖和也深也|种稚也或作沖亦姓後漢司徒河南种暠|盅器虛也又敕中切|爞爾雅云爞爞炎炎熏也|𦬕草名又音中|翀直上飛也
XBA職戎終極也窮也竟也又姓漢有濟南終軍又漢複姓二氏東觀漢記有終利恭何氏姓苑云今下邳人也左傳殷人七族有終葵氏職戎切十五|眾又之仲切|潀小水入大水又徂紅在冬二切|𣧩歿也|螽螽斯蟲也|𧑄上同（螽斯蟲也）|鼨豹文鼠也|蔠蔠葵蘩露也|柊木名又齊人謂椎爲柊楑也|𩅧小雨|䶱字書云龜名也|鴤鳥名|䈺篋䈺戎人呼之|泈水名在襄陽|䝦獸如豹
KBA敕中忡憂也敕中切三|浺浺瀜水平遠之皃又音蟲|盅器虛也又音蟲
UBA鋤弓崇高也敬也就也聚也又姓鋤弓切四|崈上同（高也敬也就也聚也又姓鋤弓切四）|㓽鍤屬|𩞉饞𩞉貪食也出古今字音
QBA息弓嵩山高也又山名又姓史記有嵩極玄子或作崧息弓切九|崧上同（山高也又山名又姓史記有嵩極玄子或作崧息弓切九）|𪀚似鷹而小能捕雀也|娀有娀氏女簡狄帝嚳次妃吞乙卵生契|菘菜名|硹地名在遼|㣝姓也|𧊕蟲名|䯷細毛
cBA如融戎戎狄亦助也說文作𢦦兵也又姓漢宣帝戎婕妤生中山哀王竟如融切九|𢦦上同（戎狄亦助也說文作𢦦兵也又姓漢宣帝戎婕妤生中山哀王竟如融切九）|茙茙葵蜀葵也又虜姓後魏書官氏志云南方有茙眷氏改爲茙氏也|㭜木名|駥馬八尺也|𥬪小竹可爲矢|𠈋𠈋人身有三角也|狨細布|絨上同（細布）
dBM居戎弓弓矢釋名曰弓穹也張之穹穹然也其末曰簫又謂之弭以骨爲之滑弭弭也中央田弣弣撫也人所撫持也簫弣之聞曰淵淵宛也言曲宛然也世本曰黃帝臣揮作弓墨子曰羿作弓孫子曰倕作弓又姓魯大夫叔弓之後居戎切六|躳身也親也又姓出姓苑|躬上同（身也親也又姓出姓苑）|㴦縣名在酒泉|宮白虎通曰黃帝作宮室以避寒暑宮之言中也世本曰禹作宮亦官名漢書曰少府官有守宮令主御筆墨紙封書泥也又姓左傳虞有宮之奇|匑謹敬之皃又音穹
lBA以戎融和也朗也說文曰炊气上出也又姓世本云古天子祝融之後以戎切四|肜祭名又敕林切|瀜沖瀜大水皃
kBM羽弓雄雄雌也亦姓舜友有雄陶羽弓切二|熊獸名似豕魏略曰大秦之國出玄熊亦姓左傳賢者熊宜僚又漢複姓左傳楚大夫熊率且比
DBM莫中瞢目不明莫中切六|夢說文曰不明也又武仲切|鄸邑名在曹郡|懜慙也國語云君使臣懜|𦫰𦫰𦫰醜皃|𧲎獸似豕目在耳出崐崘
eBM去宮穹高也去宮切七|𢞏憂也|焪乾也|芎芎藭香草根曰芎藭苗曰蘪蕪似蛇牀|𦵡上同（芎藭香草根曰芎藭苗曰蘪蕪似蛇牀）|匑謹敬之皃|𥳎𥳎籠也又去龍切
fBM渠弓窮窮極也又窮奇獸名聞人鬬乃助不直者渠弓切三|藭芎藭|𥨪羿所封國
CBM房戎馮馮翊郡名又姓畢公高之伸食采於馮城因而命氏出杜陵乃長樂房戎切七|堸蟲室|汎浮也又孚劒切|芃草盛也又音蓬|𨝭姬姓之國|渢弘大聲也|梵木得風皃又防泛切
ABM方戎風教也佚也告也聲也河圖曰風者天地之使元命包曰陰陽怒而爲風方戎切七|飌古文（教也佚也告也聲也河圖曰風者天地之使元命包曰陰陽怒而爲風方戎切七）|楓木名子可爲式爾雅云楓有脂而香孫炎云欇欇生江上有奇生枝高三四尺生毛一名楓子天旱以泥泥之即雨山海經曰黃帝殺蚩尤棄其桎梏變爲楓木脂入地千年化爲虎魄|猦猦母狀如猿逢人則叩頭小打便死得風還活出異物志|偑地名|檒檒梵聲也|𧆉竹名出南海
BBM敷空豐大也多也茂也盛也又酒器豆屬又姓鄭公子豐之後敷空切八|酆邑名亦姓左傳有狄相酆舒|蘴蕪菁苗也|灃水名在咸陽|寷大屋|麷煑麥|㒥偓㒥仙人|㠦山名
YBA昌終充美也塞也行也滿也昌終切七|珫珫耳玉名詩傳云充耳謂之瑱字俗從玉|茺茺蔚草也|㤝心動|䘪䘪襌衣也|𪎽黃色又音統|㳘水聲
IBA力中隆盛也豐也大也力中切六|癃病也亦作𤸇|𪔳鼓聲俗作𪔴|窿穹隆天勢俗加穴|霳豐隆雷師俗加雨|㚅多㚅礼天
eAA苦紅空空虛書曰伯禹作司空又漢複姓有空桐空相二氏苦紅切十四|箜箜篌樂器釋名云師延所作靡靡之音出桑閒濮上續漢書云靈帝胡服作箜篌也|崆崆峒|椌器物朴也又丘江切|硿硿青色石也|䅝稻稈|悾悾悾信也愨也|埪土埪龕也|倥倥侗|涳涳濛小雨又口江切|鵼怪鳥出字統|𦱇𦱇心草也|𢃐衣袂|𧌆蟬脫𧌆皮
dAA古紅公通也父也正也共也官也三公論道又公者無私也從八從厶厶音私八背意也背厶爲公也亦姓漢有主爵都尉公儉又漢複姓八十五氏左傳魯有公冉務人公斂陽公何藐公父歜公賓庚公思展公鉏極公甲叔子費宰公山弗櫌公甲叔公巫召伯衛有公文要戰國策齊威王時有左執法公旗蕃左傳齊悼子公旗之後左傳季武子庶子公沮後以爲氏孟子有公行子著書左傳晉成公以卿之庶子爲公行大夫其後氏焉孔子家語魯有公冶長又公索氏將祭而亡其牲者魯有公慎氏出婬妻又有公罔之裘揚觶者孔子弟子齊人公晳哀陳人公良儒公西赤公祖句兹公肩定漢書藝文志有公檮子著書又有公勝生著書濟南公玉帶上明堂圖功臣表有公師壹晉穆公子成師之後又有公扈滿意後漢有零陵太守公仇稱晉穆公子仇之後又弘農令北海公沙穆山陽公堵恭魏志有公夏浩晉書有征虜長史太山公正羣成都王帳下督公帥蕃本姓公師避晉景帝諱改爲公帥氏前趙錄有大中大夫公帥式子夏門人齊人公羊高作春秋傳列女傳有公乘之姒墨子魯有公輸班衛大夫公叔文子史記有魯相公儀休孔子門人公休哀又有公祈哀禮記魯大夫公明儀何氏姓苑云今高平人衛大夫公南文子魯有公荊皎衛大夫公子荊之後魯大夫公襄昭魯襄公太子野之後魯大夫公伯寮何氏姓苑云彭城人趙平陵太守公休勝魯士官公爲珍魯昭公子公爲之後楚大夫公朱高宋公子子朱之後公車氏秦公子伯車之後淮南子有公牛哀病七日化爲虎齊公子牛之後呂氏春秋有邴大夫公息忘孟子稱公都子有學業楚公子田食采於都邑後氏焉公劉氏后稷公劉之後古今人表有公房皮楚公子房之後郭泰別傳有渤海公族進階衛大夫有公上王世本有魯大夫公之文晉蒲邑大夫公佗世鄉秦公子金之後有公金氏齊公子成之後有公牽氏何氏姓苑云公右氏今琅邪人公左氏今高平人又有公言公孟公獻公留公石公旅公仲等氏又左傳衛有庾公差以善射聞祭公謀父出自姜姓申公子福楚申公巫臣之後衛有尹公佗楚大夫逢公子仲楚白公勝之後有白公氏文字志云魏文侯時有古樂人竇公氏獻古文樂書一篇秦有博士黃公庇古今人表神農之後有公幹仕齊爲大夫其後氏焉世本有大公叔穎又有公紀氏衛有大夫左公子洩右公子職漢四晧有園公先生尚書僕射東郡成公敞古紅切十三|功功績也說文曰以勞定國曰功又漢複姓何氏姓苑云漢營陵令成功恢禹治水告成功後爲氏俗作㓛|工官也又工巧也|疘文字集略云脫疘下部病也|蚣蜈蚣蟲|玒王名又音江|釭車釭說文曰車轂中鐵也又古雙切|魟䱑魟江蟲形似蟹可食又音烘|攻攻擊|㓚銍穫也|愩憒也|碽擊聲|篢篢笠方言
DAA莫紅蒙覆也奄也爾雅釋草曰蒙王女也莫紅切二十七|冡說文覆也|濛涳濛細雨|𩦺驢子曰𩦺|艨艨艟戰船又武用切|䑃大皃|矇矇瞽|饛盛食滿皃|䰒馬垂鬣也|檬似槐華黃|𨢊麴生衣皃|䴿上同（麴生衣皃）|𨣘亦上同（麴生衣皃）|鸏鸏䴀鳥也|幪覆也蓋衣也又幪縠|罞爾雅曰麋罟謂之罞|𢄐說文云蓋衣也又莫弄切|髳爾雅釋詁曰覭髳茀離也|蠓蠛蠓似蚊又莫孔切|𦿏草可爲帚|雺天氣下地不應曰雺又莫侯切|霿（天氣下地不應曰雺又莫侯切）|霚並上同（天氣下地不應曰雺又莫侯切）|朦朦朧月下|䀄器滿|懜心悶闇也|靀小雨
IAA盧紅籠西京雜記曰漢制天子以象牙爲火籠盧紅切又力董切二十七|豅大谷|㰍說文云房室之疏也亦作櫳|朧朦朧|𡃡大聲|龓馬龓頭|䪊上同（馬龓頭）|瀧瀧涷沾漬說文曰雨瀧瀧也|聾耳聾左傳云不聽五聲之和曰聾釋名曰聾籠也如在蒙籠之內不可察也|𨏠軸頭|礱磨也|䆍禾病|𪚗上同（禾病）|嚨喉嚨|蘢蘢古草名又音龍|櫳檻也養獸所也|𤮨字書云築土𤮨穀|巃巃嵸山皃嵸祖紅切又音竉摠|襱襱裙|𧙥上同（襱裙）|瓏玲瓏玉聲|曨日欲出也|鸗鳥名|𩟭𩟭餅|蠪蠪蛭如狐九尾虎爪音如小兒食人一名䗁蠪又爾雅曰蠪朾螘郭璞云赤駁蚍蜉|㟅崆㟅山皃|屸山形
jAA戶公洪大也亦姓共工氏之後本姓共氏後改爲洪氏戶公切二十二|鉷弩牙|訌潰也詩曰蟊賊內訌|紅色也又姓|虹螮蝀也又古巷切|仜身肥大也|鴻詩傳云大曰鴻小曰鴈又姓左傳衛大夫鴻聊魋|葒水草一曰蘢古詩云隰有游龍傳曰龍即紅草也字或從艹|葓上同（水草一曰蘢古詩云隰有游龍傳曰龍即紅草也字或從艹）|谼大壑又谼谷寺在相州|䉺陳赤米也|烘字林云燎也又呼紅切|洚說文曰水不遵道一曰下也又戶冬下江二切|渱潰渱水沸湧也|𨹁從𨹁山名在雲南|魟魟白魚又音烘|䧆坑也|䪦大聲|𦏺飛聲|䫹大風|䂫石聲|𨾊鳥肥大𨾊唯然
PAA徂紅叢聚也徂紅切五|藂俗（聚也徂紅切五）|䕺草䕺生皃|潀水會也|𥵫籠𥵫取魚器俗
hAA烏紅翁老稱也亦鳥頸毛又姓漢書貨殖傳有翁伯販脂而傾縣邑烏紅切八|螉蠮螉蟲名細𦝫𧒒也|䱵魚名|蓊蓊鬱草木盛皃又烏桶切|䈵竹盛皃|䩺吳人靴靿曰䩺|㮬水㮬子果名出南州|𩔚頸毛也
OAA倉紅悤速也倉紅切十五|忩俗（速也倉紅切十五）|蔥葷菜|樬尖頭擔也|䡯轞車載囚|聰聞也明也察也聽也殷仲堪父患耳聰聞牀下蟻動謂之牛鬬出晉書|𦇎色青黃又細絹|璁石似玉也|驄馬青白雜色|蟌蜻蜓淮南子曰蝦蟆爲鶉水蠆爲蟌|囪竈突|𨣼𨣼𨢊濁酒|鏓大鑿平木器|熜熅也又子孔切|𢊕屋階中會又子孔切
FAA他紅通達也三禮圖曰通天冠一名高山冠上之所服也亦州名本漢宕渠縣內有地萬餘頃因名爲萬州後魏以萬州居四達之路改爲通州又姓出姓苑他紅切九|蓪蓪草藥名中有小孔通氣|侗大也|恫痛也|痌上同（痛也）|曈曈曨欲明之皃|俑俑偶人又音勇|𧳆獸名似豕出泰山又音同|𨀜走皃
NAA子紅葼木細枝也子紅切二十一|鬷釜屬又姓左傳鄭大夫鬷明|嵕九嵕山名|猣犬生三子|豵豕生三子|鯼石首魚名|椶椶櫚一名蒲葵|騣馬鬣|𩮰上同（馬鬣）|䗥螉䗥蟲名|嵸巃嵸又作孔切|艐書傳云三艐國名說文云船著沙不行也|蝬三蝬蛤屬出臨海異物志|堫種也|𥓻石也|翪聳翅上下皃|緵縷也又作弄切|㚇飛而斂足又子貢切|㣭數也|稯禾束|鬉毛亂
CAA薄紅蓬草名亦州名周割巴州之伏虞郡於此置蓬州因蓬山而名之薄紅切十|𥭗車軬|篷織竹夾箬覆舟也|髼髼䯳髮亂皃|蜂蟲名出蒼頡篇又音峯|芃芃芃草盛皃又音馮|𧚋爾雅曰困衱𧚋亦作袶又音降|韸鼓聲|䮾充塞皃又音龍瀧|𩖛風皃又步留切
iAA呼東烘火皃呼東切又音紅六|叿叿叿市人聲|魟河魚似鼈|谾谷空皃出字林|𩐠𩐠䪦大聲|𩗄大風
gAA五東㟅崆㟅山皃五東切又魚江切一
QAA蘇公𣞷小籠蘇公切又先孔切三|𢤄惺𢤄了慧人也|㬝白皃出聲譜
#冬
ECA都宗冬四時之末尸子曰冬爲信北方爲冬冬終也又姓前燕慕容皝左司馬冬壽都宗切七|𠔙古文（四時之末尸子曰冬爲信北方爲冬冬終也又姓前燕慕容皝左司馬冬壽都宗切七）|苳草名|鴤鴤鳥好入水食似鳧形小|笗竹名|𩂓雨皃|𧲴獸如豹有角
GCA徒冬彤赤也丹飾也亦姓彤伯爲成王宗伯徒冬切二十二|疼痛也|佟姓也北燕錄有遼東佟萬以文章知名|炵火盛皃又他冬切|䳋鳥名䳋渠狀如山雞黑身赤足出山海經也|鼕鼓聲|𢥞𢥞𢥞憂也出楚詞|𢾮擊空聲|爞旱熱|㤏惶也|痋動病|䂈剌矛|鉵大鉏|𧹝赤色|𩦶黑虎|浵水名亦水皃|䶱龜名又音終|𠩁楚云深屋|鉖鈞鉖|𨜳古國名|㠽戎云幡也|赨赤蟲
PCA藏宗賨戎稅說文曰南蠻賦也藏宗切十一|琮說文云琮瑞玉大八寸似車釭周禮曰以黃琮禮地|悰慮也一曰樂也|潀小水入大水也又徂紅職戎二切|淙水聲又士江切|慒謀也又似由切|鬃高髻又士江切|㼻甖屬又士江切|孮爲族盛孮鄉|誴謀誴樂也|𢃏帛𢃏又布名
HCA奴冬農田農也說文作農耕也亦官名漢書曰治粟內史秦官也景帝更名大司農又姓風俗通云神農之後又羌複姓有蘇農氏奴冬切十二|䢉上同（田農也說文作農耕也亦官名漢書曰治粟內史秦官也景帝更名大司農又姓風俗通云神農之後又羌複姓有蘇農氏奴冬切十二）|辳古文（田農也說文作農耕也亦官名漢書曰治粟內史秦官也景帝更名大司農又姓風俗通云神農之後又羌複姓有蘇農氏奴冬切十二）|𨑋籀文（田農也說文作農耕也亦官名漢書曰治粟內史秦官也景帝更名大司農又姓風俗通云神農之後又羌複姓有蘇農氏奴冬切十二）|𩟊䭢𩟊強食䭢女耕切|噥多言不中|𩅽露多|憹㦀憹悅也|㺜多毛犬也又乃刀切|儂我也|𧗕說文曰腫血也|膿上同（說文曰腫血也）
dCA古冬攻治也作也擊也伐也古冬切二|釭燈也又音江
jCA戶冬䃔䃔䃧石落聲戶冬切四|洚說文曰水不遵道一曰下也孟子曰洚水警子|㗢歌也又胡宋徒送二切|𩘎大風
ICA力冬䃧力冬切三|𪔢鼓聲|𣫣聲也
NCA作冬宗眾也本也尊也亦官名漢書宗正秦官也掌親屬亦姓周鄉宗伯之後出南陽又漢複姓二氏前漢有宗伯鳳南燕錄有宗正謙善卜相作冬切二|倧上古神人
QCA私宗鬆髼鬆髮亂皃私宗切三|䯳上同（髼鬆髮亂皃私宗切三）
FCA他冬炵火色他冬切一
#鍾
XDA職容鍾當也酒器也又量名左傳曰釜十則鍾亦姓出潁川又漢複姓有鍾離氏世本云與秦同祖其後因封爲姓職容切十八|鐘樂器也呂氏春秋云黃帝命伶倫鑄寸二器世本曰垂作鐘|蚣䘀螽蟲|忪心動皃|䇗長節竹也|蹱躘蹱小兒行皃|彸征彸行皃|衳小褌也|伀志及眾也|橦字㨾云本音同今借爲木橦字|籦籠籦竹名廣志云可爲笛|妐夫之兄也|㕬眾口也|𧢸舉角也|炂熱化也|𦬘草名|𨳗門外開𨳗|鈆鐵鈆
IDA力鍾龍通也和也寵也鱗蟲之長也易曰雲從龍又姓舜納言龍之後力鍾切九|𪚝圭爲龍文|躘躘蹱|鸗鳥名|驡野馬|𪚠巫也|籠𥳎籠竹車軬亦籦籠竹又力東力董二切|𦪽小船上安蓋者|蘢蘢古草
aDA書容舂世本曰雍父作舂呂氏春秋曰赤冀作舂書容切六|𧐍蜙蝑俗呼𧐍𧑓|摏撞也|蹖蹋也|𪄻𪇆𪄻鳥名|憃愚也
RDA祥容松木名玄中記曰松脂淪入地千歲爲茯苓亦州名舜竄三苗於三危河關之西南羌是也後魏末始統其城改置州焉祥容切四|㮤古文（木名玄中記曰松脂淪入地千歲爲茯苓亦州名舜竄三苗於三危河關之西南羌是也後魏末始統其城改置州焉祥容切四）|凇凍落皃又先恭切|訟爭獄又徐用切
YDA尺容𧘂當也向也突也說文曰通道也尺容切十一|衝上同（當也向也突也說文曰通道也尺容切十一）|罿網也又音童|憧憧憧往來皃|䡴陷陣車|艟艨艟戰船|潼河潼又音同|褈褈褣衣也|𠟍剌也|𠝤同上（剌也）|䂌短矛也
lDA餘封容盛也儀也受也爾雅曰容謂之防郭璞云形如今牀頭小曲屏風唱䠶者所以自防隱司馬法云軍容不入國國容不入軍是也又州名又姓入凱仲容之後禮記有徐大夫容居餘封切三十五|溶水皃又音勇|滽水名出宜蘇山|庸常也用也功也和也次也易也又姓漢有庸光|𦤘古文（常也用也功也和也次也易也又姓漢有庸光）|𧴄獸似牛領有肉也|㺎（獸似牛領有肉也）|𤛑並上同（獸似牛領有肉也）|墉城也垣也|鎔鎔鑄|鏞大鐘|銿上同說文與鐘同（大鐘）|鄘國名|傭傭賃又丑凶切|𪅟𪅟𪆫鳥名似鴨雞足也|㼸甖也|𤮇同上（甖也）|鱅魚名又音慵|蓉芙蓉|䗤𧌁䗤色如黃蛇有羽|傛傛華縣也又漢書婦官有傛華|褣𧝎褣|搈不安|瑢瑽瑢佩玉行也|䈶䈶䇯又矢|嵱山名在容州山下有鬼市|頌形頌又似用切|㝐㝐盛也說文云古文容|䡆車行皃|㟾㟾山在建州|𨲟餝𨲟|𪃾𪃾鸀|槦㮧槦木中箭笴|㣑重影一曰形㣑|𢧳𢧳戣兵器
ADM府容封大也國也厚也爵也亦姓望出渤海本姜姓炎帝之後封鉅爲黃帝師又望出河南後魏官氏志云是賁氏後改爲封氏府容切五|𡉚古文（大也國也厚也爵也亦姓望出渤海本姜姓炎帝之後封鉅爲黃帝師又望出河南後魏官氏志云是賁氏後改爲封氏府容切五）|犎野牛|葑菜名詩云采葑采菲|崶山名一名龍門山在封州大魚上化爲龍上不得點額流血水謂丹色也
iDM許容胷膺也亦作匈𦙄許容切十|凶凶禍|𣧑古文（凶禍）|銎懼也又斤斧柄孔又曲恭切|洶水勢也|恟懼也|𧧗訟也|兇惡也|訩眾語|匈匈奴
gDM魚容顒仰也爾雅云顒顒邛邛君之德也說文云大頭也魚容切四|𩤛上同見廣蒼（仰也爾雅云顒顒邛邛君之德也說文云大頭也魚容切四）|鰅魚名說文曰皮有文出樂浪又音隅|喁噞喁
hDM於容邕說文曰四方有水自邕成池者是也於容切十六|雍和也與邕略同又雍奴縣名在幽州水經云四方有水曰雍不流曰奴亦姓左傳有雍糾又於用切|噰鳥聲|嗈上同（鳥聲）|郺郺𨑊多皃|澭水名在宋|灉上同爾雅曰水自河出爲灉（水名在宋）|癰癰癤|罋汲器|廱辟廱天子教宮|饔熟食|壅塞又音擁|雝爾雅曰䳭鴒雝渠|𪄉上同（爾雅曰䳭鴒雝渠）|㻾玉器|𧴗獸似猨也
MDA女容醲厚酒女容切八|𨑊郺𨑊|濃厚也|襛襛華又衣厚皃又而容切|穠花木厚又而容切|檂木名|𪒬𪒒𪒬|𨲳多也
LDA直容重複也曡也直容切又直勇直用二切六|穜先種晚熟曰穜|緟說文云增益也|褈複也|䳯䳯𪄹鳥名|蝩蠶晚生者
PDA疾容從就也又姓漢有將軍從公何氏姓苑云今東莞人疾容切又即容七恭秦用三切三|从古文說文曰相聽也|𩀰方言云南楚人謂雞
KDA丑凶蹱躘蹱丑凶切七|傭均也直也又音容|𦟛上同（均也直也又音容）|𨙔馬不行也|䝑土精如㹠在地下也|𨤩地名又直容切|𪒒深穴中𪒒黑也
CDM符容逢值也迎也符容切八|縫紩又音俸|漨水名|䩼鼓聲|𥎌𥎌𥎂矛也|夆掣曳也又敷恭切|𥛝大黃負山神能動天地氣昔孔甲遇之|捀說文曰奉也又符用切
BDM敷容峯山峯也敷容切十六|鋒劒刃鋒也|丰丰茸美好說文本作𡴀草盛𡴀也從生上下達也|𡴀上同（丰茸美好說文本作𡴀草盛𡴀也從生上下達也）|𢓱使也|妦好也|蠭說文曰螫人飛蟲也孝經援神契曰蠭䘍垂芒爲其毒在後|蜂上同（說文曰螫人飛蟲也孝經援神契曰蠭䘍垂芒爲其毒在後）|𧒒古文（說文曰螫人飛蟲也孝經援神契曰蠭䘍垂芒爲其毒在後）|蘴菜名又音豐|桻木上|㷭㷭火夜曰㷭晝曰燧|烽上同（㷭火夜曰㷭晝曰燧）|莑草牙始生出音譜|仹仙人|㸼㸼牛
NDA即容縱縱橫也即容切又子用切九|𣯨毾㲪也|蹤蹤跡|䡮車跡|樅木名又七恭切|磫磫𥗫礪石|豵豕生三子|熧火行穴中|𧺣急行也又此從切
cDA而容茸草生皃而容切十|䩸毳飾|𩮙髮多亂皃|䇯竹頭有文|襛華皃又厚衣皃又女容切|穠花木厚也又女容切|搑擣也|𥎂𥍮𥎂矛也|榵木名似檀|穁禾梋
fDM渠容蛩蛩蛩巨虛獸也說文云一曰秦謂蟬蛻曰蛩渠容切十六|邛勞也病也又臨邛縣亦邛僰又姓列仙傳有周封史邛疏|舼舼船|𦨰上同（舼船）|筇竹名可爲杖張鶱至大宛得之|輁輁軸所以支棺也又音拱|𦭭蓂莢實也|𥳎𥳎籠|䂬水㠀石也又居勇切|蛬蟋蟀又音拱|𠌖𠌖倯可憎之皃|𩬰𩬰鬆髮亂也|桏柜柳|䅃稰也又巨壠切|𤤶𤤶佩|𩢽獸如馬而青一走千里也
ZDA蜀庸鱅魚名似牛音如豕蜀庸切又音庸三|慵嬾也|𩌨通俗文云牽乾也
dDM九容恭恭敬也說文本作𢙄肅也又姓晉太子申生號恭君其後氏焉出國語九容切陸以恭蜙樅等入冬韻非也十|龔姓也漢有龔遂|供奉也具也設也給也進也又居用切|珙璧也又音拱|䢼邑名出異苑又亭名出晉書|共共城縣在衛州又渠用切|𤱨㽤也|廾竦手也說文本居竦切|髸髸䯳|䳍鳥似雉鳴自呼
QDA息恭蜙蜙蝑蟲名息恭切六|淞水名在吳又音松|凇凍落之皃|鬆髮亂皃亦作䯳|倯倯恭怯皃|𢔋小行恐皃
ODA七恭樅木名松葉栢身七恭切又音蹤十二|鏦短矛又音窻|從從容又疾容秦用二切|暰光也張景陽七命云怒目電暰是也|䗥螉䗥小蜂生牛馬皮中也|瑽瑽瑢佩玉行皃|摐打也又音窻|䐫肥病|𥡬治禾𥡬移|𧺣急行也又音蹤|鬆髮亂又息恭切|𨑪𨑪遷
eDM曲恭銎斤斧受柄處也曲恭切又許容切二|𥳎𥳎籠
#江
dEA古雙江江海書有九江尋陽記云烏江蚌江烏白江嘉靡江畎江沔江𥐙江提江菌江亦姓出陳留本顓頊玄孫伯益之後爵封於江陵爲楚所滅後以國爲氏古雙切十一|扛舉鼎說文云扛橫關對舉也秦武王與孟說扛龍文之鼎脫臏而死|杠旌旗飾一曰牀前橫木|茳茳蘺香草|釭燈又音工|矼石矼石橋也爾雅曰石杠謂之徛字俗從石|豇豇豆蔓生白色|肛胮肛脹大又許江切|玒玉名又音工|𧢸舉角|䜫䜫谷在南郡
DEA莫江厖厚也大也莫江切十四|駹黑馬白面|狵犬多毛亦作尨|尨上同（犬多毛亦作尨）|浝水名|哤語雜亂曰哤|牻牛白黑雜|娏女神名|䵨陰私事也|㟌五帋山名在蜀|蛖蛖螻螻蛄類|𥆙目不明|痝病困|𠈵不媚
MEA女江𦗳耳中聲也女江切八|𣰊髮多|涳姓出纂文又音羫|噥噥嗔語出字林|𩟊強食|鬞亂髮|䁸目不明|𪆯鴻𪆯
TEA楚江囪說文曰在牆曰牖在屋曰囪楚江切九|窻說文作窗通孔也釋名曰窻聰也於內見外之聰明也|牕上同（說文作窗通孔也釋名曰窻聰也於內見外之聰明也）|窓俗（說文作窗通孔也釋名曰窻聰也於內見外之聰明也）|䎫種也|堫上同（種也）|摐打鐘鼓也|鏦短矛也|𥎋上同（短矛也）
AEA博江邦國也又姓出何氏姓苑博江切四|𤰫古文（國也又姓出何氏姓苑博江切四）|梆木名|垹土精如手在地中食之無病
jEA下江栙降䉶帆未張下江切八|䜶䜶䝄胡豆|降降伏又古巷切|缸甖缸|瓨上同（甖缸）|洚說文曰水不遵道一曰下也又古巷切|夅服也|跭跭𨇯豎立也
BEA匹江胮胮脹匹江切又音龐五|𤵸上同（胮脹匹江切又音龐五）|𩐨鼓聲|𪔔上同（鼓聲）|𪐿黑皃
IEA呂江瀧南人名湍亦州在嶺南呂江切又音雙二|䮾充塞之皃
VEA所江雙偶也兩隻也又姓出姓苑後魏有將軍雙仕洛所江切七|艭舽艭船名|䉶帆也|𢥠懼也左傳云駟氏𢥠|䝄豆也|瀧水名在郴州界|𨇯跭𨇯立也
CEA薄江龐姓也出南安南陽二望本周文王子畢公高後封於龐因氏焉魏有龐涓薄江切五|逄姓也出北海左傳齊有逄丑父|胮胮肛脹大皃|𩐨鼓聲|舽舽舡船名
iEA許江肛許江切四|啌啌瞋語出聲譜|谾空谷皃|舡舽舡船皃名
hEA握江胦胦肛不伏人握江切一
eEA苦江腔羊腔也苦江切十二|𤟄上同（羊腔也苦江切十二）|羫古文（羊腔也苦江切十二）|控打也又苦貢切|椌椌楬|悾信也愨也又音空|跫蹋地聲|涳直流|崆崆㟅山皃又音空|𩩝𩪘𩩝尻骨|㾤喉中病|㼹㼹甎𤮇也
LEA宅江幢旛幢釋名曰幢幢也其皃幢幢然也宅江切六|撞撞突也學記曰善待問者如撞鐘撞擊也|橦木名又音鍾童|𣃘旌旗杠皃出說文又丑善切|噇喫皃|𩪘𩪘𩩝尻骨
KEA丑江憃愚也丑江切又丑龍切又抽用切五|䚎視不明也一曰直視又丑巷切|𥡟黍𥡟不實也|䄝祠不敬也|𧜧短敝衣也
JEA都江樁橛也都江切二|𣻛深水立𣻛
gEA五江㟅五江切一
UEA士江淙水流皃士江切又才宗切四|鬃髻高皃|㼻甖也出方言|𩞐饞𩞐愛食
#支
XFQ章移支支度也支持也亦姓何氏姓苑云琅邪人後趙錄有司空支雄又漢複姓莊子有支離益善屠龍章移切二十九|𥾣縴𥾣挽船繩也|只專辝又之爾切|汥水都名|㲍㲔㲍者輕毛皃|巵酒器|梔梔子木實可染黃|枝枝柯又漢複姓左傳楚大夫枝如子弓|衹適也又巨支切|㽻疾也|衼衹衼尼法衣也衹音歧|肢肢體|胑（肢體）|𨈛並上同（肢體）|禔福也又是支切|馶馬強|氏月氏國名又閼氏匈奴皇后也又精是二音|疻毁傷|㩼多也又音寘|鳷鳥名漢武帝造鳷鵲觀在雲陽甘泉宮外|䧴上同（鳥名漢武帝造鳷鵲觀在雲陽甘泉宮外）|觶本音寘今作奉觶字|榰爾雅曰榰柱也謂相榰柱也|㯄玉篇云木盛|𪂅土精如鴈一足黃色毁之殺人|𧌔蟲名似蜥蜴能吞人|眵目汁凝尺支切|䡋䡋軝長轂|𩍲皮鞁
lFQ弋支移遷也遺也延也徙也易也說文曰禾相倚移也又官曹公府不相臨敬則爲移書箋表之類也亦姓風俗通云漢有弘農太守移良弋支切三十二|䄬上同（遷也遺也延也徙也易也說文曰禾相倚移也又官曹公府不相臨敬則爲移書箋表之類也亦姓風俗通云漢有弘農太守移良弋支切三十二）|迻說文遷也|𠩗說文歠也|杝木名|鉹方言云涼州呼甑又音侈|袲宋地名又音侈|箷衣架|𥠥上同又榻前几|㥴忯㥴不憂事|詑詑詑自得皃又淺意也|簃樓閣邊小屋又音池|䔟萎䔟草|熪燫熪火不絕皃|扅扊扅戶扃|衪衣袖|暆東暆縣在樂浪|迆逶迆又移爾切|𤝻獸名似犬尾白目喙赤出則大兵|栘扶栘木名又成兮切|歋歋𢋅手相弄人亦作擨又以遮切|酏酒也又羊氏切|匜杯匜似桸可以注水又羊氏切|拸加也|謻埤蒼云冰室門名|𠗺上同（埤蒼云冰室門名）|蛇蜲蛇莊子所謂紫衣而朱冠又蛇丘縣名又神遮切|虵俗（蜲蛇莊子所謂紫衣而朱冠又蛇丘縣名又神遮切）|螔爾雅曰蚹蠃螔蝓注謂即蝸牛也|𠐀𠐀𢋅|𣣢笑𣣢|䬁小旋風咸陽有之小䬁於地也
kFo薳支爲爾雅曰作造爲也說文曰母猴也又姓風俗通云漢有南郡太守爲昆薳支切又王僞切六|為俗（爾雅曰作造爲也說文曰母猴也又姓風俗通云漢有南郡太守爲昆薳支切又王僞切六）|潙水名在新陽|䧦阪名在鄭又王詭切|鄬地名|𩻟大魚又許爲切
dFo居爲嬀水名亦州春秋時屬燕秦爲上谷郡漢爲潘縣武德初置北燕州貞觀改爲嬀州因木爲名又姓文士傳有嬀覽居爲切二|潙水名又音爲
iFo許爲𪎮說文曰旌旗所以指𪎮也亦作麾許爲切六|麾上同（說文曰旌旗所以指𪎮也亦作麾許爲切六）|噅口不言正|撝說文曰裂也易曰撝謙注謂指撝皆謙也|𩻟大魚又音爲|䧦鄭地
hFo於爲逶逶迆於爲切十一|𣨙枯死|萎蔫也|㮃田器|覣好視|蜲蜲蛇|痿痹濕病也|倭順皃|委委委佗佗美也|䴧鹿肉|蟡涸水精一身兩頭似蛇以名呼之可取魚鼈
DFI靡爲糜糜粥靡爲切九|縻繫也又縻爵易作靡|㸏㸏爛|𪎕散也|蘼薔蘼虋冬也又世彼切|䊳䊳碎|𪎭𪎭穄別名|𦗕乘輿金耳|醿酴醿酒也
iFk許規隓毀也說文曰敗城𨸏曰隓許規切九|墮上同（毀也說文曰敗城𨸏曰隓許規切九）|隳俗（毀也說文曰敗城𨸏曰隓許規切九）|眭眭盱健皃又息爲切盱音吁|觿角錐童子佩之說文曰觿角銳耑可以解結也又戶圭切|睢仰目也|䜐相毀之言|鑴大鍾又戶圭切|蘳華黃也又果實也
LFg直垂鬌髮落直垂切又大果切三|錘八銖又馳僞切|甀甖也
ZFg是爲𡍮幾也疆也說文曰遠邊也是爲切十|垂上同（幾也疆也說文曰遠邊也是爲切十）|陲邊也說文危也|倕重也黃帝時巧人名倕|𦈼小口甖也|𨿠鴟鳥|圌山名在吳都又市緣切|篅盛榖圓𥫱|𥳙上同（盛榖圓𥫱）|𠃀草木華葉縣
IFg力爲羸瘦也力爲切二|𡰠膝病
YFg昌垂吹吹噓昌垂切又尺僞切三|炊炊爨|䶴習管古文作龡又尺僞切
BFI敷羈鈹大針也又劒如刀裝者敷羈切十二|帔又芳髮切|鮍魚鮍|披又作翍開也分也散也|𤱍耕也|耚上同（耕也）|狓狓猖皃出新字林|翍羽張之皃|旇旗靡|秛禾租|𤿎器破而未離又皮美切|㱟開肉又匹靡切
AFI彼爲陂書傳云澤障曰陂彼爲切十一|詖辯辝又音祕|碑釋名曰本葬時所設臣子追述君父之功美以書其上|羆爾雅曰羆如熊黃白文孝經援神契曰赤羆見則姦宄自遠也|𥀍古文（爾雅曰羆如熊黃白文孝經援神契曰赤羆見則姦宄自遠也）|𨰟玉篇云耜屬也|𤜑牛名又音皮|𨧦鋸鉏也|𥶓竹名|襬關東人呼裙也|藣草名又彼義切
RFg旬爲隨從也順也又姓風俗通云隨侯之後漢有博土隨何後漢有扶風隨蕃旬爲切三|隋國名本作隨左傳曰漢東之國隨爲大漢初爲縣後魏爲郡又改爲州隋文帝去辵|𥶻𥶻籠
eFo去爲虧缺也俗作𧇾去爲切一
eFk去隨闚小視去隨切二|窺上同（小視去隨切二）
fFY渠羈奇異也說文作奇又虜複姓後魏書奇斤氏後改爲奇氏渠羈切又居宜切十|琦玉名|騎說文曰跨馬也又其寄切|鵸鵸䳜鳥似烏三首六尾自爲牝牡善笑䳜音余出山海經|弜強也又其丈切|鬾小兒鬼|碕曲岸又巨支切|𢺷木別生也|㩽上同又橫首枝皃（木別生也）|錡釜屬又魚綺切
fFU巨支祇地祇神也巨支切二十五|示上同見周禮本又時至切（地祇神也巨支切二十五）|衹衹衼尼法衣|岐山名亦州春秋及戰國時爲秦都漢爲右扶風後魏置雍城鎮又改爲岐州因山而名又姓黃帝時有岐伯|歧歧路|𨙸邑名在扶風|馶勁皃|疧病也詩云俾我疧兮|蚑蚑蚑蟲行皃又長蚑蠨蛸別名出崔豹古今注|忯爾雅云忯忯惕惕愛也|䞚說文曰緣大木也一曰行皃|翄翄翄飛皃|𢻚弓硬皃|軝說文曰長轂之軝以朱約之詩曰約軝錯衡|𩉬上同（說文曰長轂之軝以朱約之詩曰約軝錯衡）|芪藥草說文曰芪母也|汥說文曰水都也又音支|跂行皃又音企|䲬雞又云鴈|蚔蟲也|䉻赤米|𦭲繰絲鉤緒|伎舒散又音技|𨱜長𨱜國名髮長於身|𠁭參差也
iFY許羈犧犧牲書傳曰色純曰犧許羈切十八|羲姓風俗通云堯鄉羲仲之後|焁焁欨貪者欲食皃|桸枸也|巇巇嶮|羛地名在魏|戲於戲歎辝又姓虙戲氏之後又喜義切|𤃪水名在新豐|曦日光|𢹍擊也|𧕆蠡名|䚙角匕又火元切|䖒古陶器也|㺣獸名又曰豕也|𣤴吹嚱口聲|𢨛相笑之皃|㚀毁也|隵上同（毁也）
eFY去奇㩻不正也去奇切十一|觭角一俯一仰也|踦腳跛又腒綺切|㱦死也說文棄也俗語謂死曰大㱦|崎崎嶇|𦖊一隻|碕石橋|𤘌虎牙|㥓𢜩㥓儉意|䗁長腳鼅鼄|攲宗廟宥座之器說文又居宜切持去也
gFY魚羈宜說文本作𡧗所安也俗作宜亦姓出姓苑魚羈切十一|宐上同（說文本作𡧗所安也俗作宜亦姓出姓苑魚羈切十一）|𠣨（說文本作𡧗所安也俗作宜亦姓出姓苑魚羈切十一）|㝖並古文（說文本作𡧗所安也俗作宜亦姓出姓苑魚羈切十一）|儀儀容又義也正也亦州名本漢涅縣地秦爲上黨郡武德爲遼州又爲箕州今爲儀州亦姓左傳徐大夫儀楚|𥫃上同（儀容又義也正也亦州名本漢涅縣地秦爲上黨郡武德爲遼州又爲箕州今爲儀州亦姓左傳徐大夫儀楚）|䣡地名在徐|䴊鵕䴊神鳥|轙車上環轡所貫也又音蟻|涯水畔也又五佳切|崖崖岸又五佳切
CFI符羈皮皮膚也釋名曰皮被也被覆體也亦姓出下邳符羈切六|疲勞也乏也|郫郫縣名在蜀|罷倦也亦止也又音矲|㯅木下交支皃又符支切|犤下小牛也
ZFQ是支提羣飛皃是支切又弟泥切十二|𦑡上同（羣飛皃是支切又弟泥切十二）|㖷鳥鳴|匙匕也|䈕說文曰簧屬|堤堤封頃畝漢書作提顏師古曰提封者大舉其封疆也提音題|禔福也亦安也喜也又音支|𦳚𦳚母即知母草出字林|忯愛也|姼姼母也又尺氏切|眂眂眂役目|𣏚碓衡
cFQ汝移兒嬰兒又虜姓官氏志云賀兒氏後改爲兒氏汝移切四|𠒆上同（嬰兒又虜姓官氏志云賀兒氏後改爲兒氏汝移切四）|唲曲從皃楚詞云喔咿嚅唲|婼前漢西域傳有婼羌
IFQ呂支離近曰離遠曰別說文曰離黃倉庚鳴則蠶生今用鸝爲鸝黃借離爲離別也又姓孟軻門人有離婁呂支切三十七|籬笊籬又爾雅曰樊藩也郭璞云謂藩籬也|醨酒薄|罹心憂|璃琉璃|酈魯地名又音歷|𣀷陳也又力米切|驪馬深黑色又姓驪戎國之後|𪖂𪖂𪕭小鼠相銜行也|樆山梨|鸝鸝黃|鵹上同（鸝黃）|𪅆上同又𪂈𪅆自爲牝牡（鸝黃）|縭婦人香纓|褵玉篇云衣帶也|蘺江蘺蘪蕪別名|䕻草木附地生也|麗東夷國名又盧計切|离明也又卦名案易本作離又丑知切|䍦接䍦白帽|㰚柴㰚也|蠡匈奴傳有谷蠡也谷音鹿|䅻長沙人謂禾二把爲䅻|孋孋姬本亦作驪|漓水滲入地|灕淋灕秋雨也|𧕯蚰蜒別名|㷰帷中火也又丑知切|𧕮螹𧕮蟲名|攡太玄經云張也|黐黏也又丑知切|矖矖瞜也|穲穲穲黍稷行列|𢟢多端又思之也|𢥗上同（多端又思之也）|謧弄言|劙分破也
PFQ疾移疵黑病疾移切八|骴殘骨又音自|玼玉病又七禮切|茈𦽏茈草|𣐑無𣐑木一名棆|胔人子腸名|飺嫌食皃|鴜𪇳鴜水鳥似魚虎蒼黑色又即知切
NFQ即移貲貨也財也即移切十六|頿說文云口上須俗作髭|鴜𪇳鴜又疾移切|𪕊鼠名似雞|鮆魚名又才禮切|訾思也又姓何氏姓苑云今齊人本姓蔡氏漢元帝功臣表有樓虛侯訾順|鄑鄑城名海在北|㠿布名|媊說文云甘氏星經曰太白上公妻曰女媊居南斗食厲天下祭之曰明星又音翦|𨚖谷名|㰣歐也又子賜切|鈭鈭錍斧也又千支切|姕婦人皃又疾支此移二切|𦺱菜名|䖪蟲似蟬|觜觜星爾雅曰娵觜之口營室東壁也又遵誅切
dFY居宜羈馬絆也又馬絡也居宜切九|畸殘田|羇寄也|掎掎角又居綺切|攲以箸取物也說文曰持去也又起宜切|奇不偶也又虧也又渠羈切|㱦棄也又丘奇切|妓妓姕態皃又渠綺切|躸躸身單皃
AFE府移卑下也賤也亦姓蔡邕胡太傅碑有太傅掾鴈門卑整府移切十一|鵯鵯鶋鳥又音匹|椑木名似柹荊州記曰宜都出大椑潘岳閑居賦云烏椑之柹|箄取魚竹器|裨裨補也增也與也附也助也又音陴|鞞牛鞞縣在蜀又薄迷脯鼎二切|𩔹須髮半白|庳下也又音婢|渒水名|錍鈭錍斧也|𢃍冕也
CFE符支陴城上女牆也符支切十五|𩫫籀文（城上女牆也符支切十五）|焷缹也|脾說文曰土藏也釋名曰脾裨也在胃下裨助胃氣主化榖也|䴽麴餅|埤附也增也又音婢|裨副將又姓鄭有大夫裨竈|蜱爾雅曰蟷蠰其子蜱蛸郭璞云蟷蠰螗螂別名|𧓎上同（爾雅曰蟷蠰其子蜱蛸郭璞云蟷蠰螗螂別名）|螷爾雅曰蜌蠯螷即蚌屬也又薄佳切又薄猛切|蠯上同（爾雅曰蜌蠯螷即蚌屬也又薄佳切又薄猛切）|㯅木下枝也|郫郫邵晉邑亦姓出姓苑|𪌈𪌈䴻麥麵|紕飾緣邊也
aFQ式支䌳繒似布說文曰粗緒也式支切十二|絁俗（繒似布說文曰粗緒也式支切十二）|施施設亦姓左傳魯大夫施伯何氏姓苑云今沛人又式豉以寘二切|葹卷葹草名拔心不死|䙾𧠪䙾面柔也本亦作戚施|鍦短矛|鉈上同說文本食遮切（短矛）|鸍似鴨而小又音彌|𪓿𪓰𪓿蟾蜍別名|䗐米榖中蟲|𧠜誘𧠜|𢻫說文敷也
QFQ息移斯此也說文曰析也詩曰斧以斯之又姓吳志賀齊傳有剡縣史斯從息移切二十六|虒似虎有角能行水中|𩆵小雨|榹榹桃山桃|㴲涯也又水名出趙國|廝廝養也役也使也|㒋上同（廝養也役也使也）|凘凌凘|磃館名|㾷痠㾷疼痛又斯齊切|傂傂祁地名在絳西臨汾水本亦作虒|謕數諫也諒也|鼶鼠名又音啼|𪆁鸒𪆁雅烏|蟴爾雅曰蟔蛅蟴郭璞曰蛓屬也今青州人呼蛓爲蛅蟴蛓音剌|㽄甕破|螔守宮別名|䫢𩓨䫢頭不正也𩓨音精|䌳經緯不同又式支切|䔮草名生水中其花可食|菥葴菥草似燕麥|𥕶𥕶磨|蜤爾雅曰蜤螽蜙蝑郭璞云蜙䗥也俗呼𧐍𧑓|燍火焦臭也|禠福也|鐁平木器名
TFQ楚宜差次也不齊等也楚宜切又楚佳楚懈二切四|嵯㠁嵯山不齊又在河切|齹齒參差|縒參縒也
KFQ丑知摛舒也丑知切九|螭螭無角如龍而黃北方謂之地螻|誺不知又洛代切|魑魑魅|黐所以粘鳥又呂支切|㷰火焱|离猛獸說文作𡴥山神獸也又呂知切|𡴥上同（猛獸說文作𡴥山神獸也又呂知切）|彲獸名文王卜獵于渭陽所獲非龍非彲
DFE武移彌益也長也久也亦姓三輔決錄有新豐彌升又羌複姓後秦將軍彌姐婆觸武移切十七|𢏏上同（益也長也久也亦姓三輔決錄有新豐彌升又羌複姓後秦將軍彌姐婆觸武移切十七）|鸍鴆鳥名又名沈鳧似鴨而小也又式支切|镾長久|䍘罟也|𥹄上同（罟也）|𥉓𥉓汙面皃又莫結切|瓕玉名|獼獼猴|𥸀竹篾亦作籩|檷檷枸山名|麊縣名在交趾|冞深入也冒也周行也|㜷齊人呼母|䥸青州人云鐮|𥎖矛也|瀰渺瀰大水皃
OFQ此移雌牝也說文曰鳥母也此移切五|胔小腸|姕婦人皃又即移疾移二切|鈭鈭錍斧也又即移切|𦍧說文曰羊名蹏皮可以割黍
JFQ陟離知覺也欲也陟離切六|䵹說文曰䵹鼄蟊也|鼅上同（說文曰䵹鼄蟊也）|蜘亦同|䣽酒也|䝷質當也亦作𧸅
hFY於離漪於離切水文也十一|猗長也倚也施也又犗犬出字林或作犄|椅木名校實桐皮|旖旖旎旗舒皃又音上聲|禕美也珍也|陭陭氏縣名|欹歎辝|㾨身急又弱也|犄犗也|𩕲美容皃也|檹說文曰木檹施也賈侍中說檹即椅木可作琴
LFQ直離馳馳騖也疾驅也又姓出姓苑直離切十四三|趍說文曰趍趙夊也|池停水曰池廣雅曰沼也又姓漢有中牟令池瑗出風俗通又有池仲魚城門失火仲魚燒死故諺曰城門失火殃及池魚|簃連閣又音移|篪樂器以竹爲之長尺四寸小者尺二寸七孔世本曰蘇成公所作也|䶵上同（樂器以竹爲之長尺四寸小者尺二寸七孔世本曰蘇成公所作也）|踟踟躕|褫蓐衣又曰褫氈說文曰奪衣也又敕爾直爾二切|䪧咸䪧黃帝樂名樂記作池|䶔齒齗|誃別也亦作謻|傂佌傂參差也又息移除爾二切|䞾輕薄皃
QFg息爲眭姓也出趙郡息爲切一
gFo魚爲危疾也隤也不正也不安也魚爲切四|㕒厜㕒|洈水名在南郡|峗三峗山名
iFU香支詑自多皃俗作訑香支切又湯何切二|焁焁欨乞人見食皃
VFQ所宜釃下酒所宜切又山爾切七|簁下物竹器又所綺切|欐梁棟別名又禮麗二音|襹𧞬襹毛羽衣皃|褷上同（𧞬襹毛羽衣皃）|𧕯蚰蜒別名|籭𥂖也又山佳切
VFg山垂䪎鞍鞘一曰垂皃山垂切二|䭨小餟之皃
cFg人垂痿濕病一曰兩足不能相及人垂切又於隹切二|䬐風緩之皃
NFg姊規厜厜㕒山巔狀姊規切六|觜星名|纗細繩|惢善也說文曰心疑也又桑果才捶二切|嫢盈姿皃|㭰鳥喙
dFk居隋𩓸說文曰小頭𩓸𩓸也居隋切七|𩓡上同（說文曰小頭𩓸𩓸也居隋切七）|槻木名堪作弓材|規圓也字統云丈夫識用必合規矩故規從夫也|鬹三足釜有柄也|𨾚鷤䳏鳥名|摫裁摫方言曰梁益閒裂帛爲衣曰摫
NFg遵爲劑券也遵爲切又在細切六|㭰廣雅云石針也|𦸺地䓴|臇臇𦞦也又子兗切|𤎱（臇𦞦也又子兗切）|㷷並上同（臇𦞦也又子兗切）
TFg楚危衰小也減也殺也楚危切又所危切二|夊夊行遟皃
JFg竹垂腄瘢胝竹垂切三|箠節也又之累切|㩾𢻆㩾不齊
XFg子垂䮔馬小皃子垂切又之累切一
YFQ叱支眵目汁凝也叱支切二|䌳粗緒又式支息移二切
SFQ側宜齜開口見齒側宜切一
BFE匹支𤿎器破也匹支切一
lFg悅吹䔺悅吹切藍蓼莠又羊箠切六|𩁌說文云飛也|蠵觜蠵大龜|欈觜欈木名實可食也|𧲚小豶也|䝐上同（小豶也）
UFQ士宜齹士宜切齒參差亦作𪙉又楚宜切一
#脂
XGQ旨夷脂脂膏也釋名曰脂砥也著面軟滑如砥石也說文云戴角者脂無角者膏又姓魏略有中大夫京兆脂習字元升旨夷切十|祗敬也俗從互餘同|泜水名又音遲|砥石細於礪又音旨|栺栺栭木名亦栺栭柱|鴲小青雀也|㴯水名|疻積血腫皃|䓜䓜菹也|𥁼上同（䓜菹也）
lGQ以脂姨母之姊妹又爾雅曰妻之姊妹同出爲姨以脂切二十六|彝常也法也亦酒樽也|寅敬也亦辰名爾雅云太歲在寅曰攝提格又引人切|夷夷猶等也滅也易也說文平也从大弓又曰南蠻從虫北狄從犬西羌從羊唯東夷從大大人也俗仁而壽有君子不死之國亦姓齊大夫夷仲年又漢複姓六氏史記范蠡適齊爲鴟夷子左傳宋公子目夷之後以目夷爲氏祝融後董父之胤其後以融夷爲氏淮夷虎夷皆國名後並爲氏秦末虎夷渠帥助番君攻秦世本云宋襄公子墨夷須爲大司馬其後有墨夷皋|峓嵎峓山名書作嵎夷傳云東表之地|恞悅樂|眱熟視不言|㰘木名|珆石似玉也|蔩菟瓜又羊善弋仁二切|𡰥陽𡰥地名本古文夷字|痍瘡痍|䧅隇䧅險阻|荑莁荑|桋木名|蛦𧏿蛦蟲名又𧒀蛦山雞也|胰夾脊肉也|鮧鱁鮧鹽藏魚腸又魚名也|羠廣雅云犍羊也|羨沙羨邑名在江夏出地理志又羊箭祥面二切|鏔戟之無刃者出方言|𢓡說文曰行平易也|鴺鴺𪀕一名飛生|𡱐𡱐踞|跠上同（𡱐踞）|洟易曰齎咨涕洟又他計切
VGQ疏夷師師範也眾也亦官名大戴禮曰昔者周成王幼在繈褓之中太公爲太師也又姓晉有師曠又漢複姓十二氏左傳衛大夫褚師圃馬師頡鄭有鄉校子產云是吾師也其後以校師爲氏陳悼太子偃師其後以王父字爲氏扶風傳有范師利蔓世本云鄭有子師僕殷時掌樂有太師摯少師陽宋有樂人師延世掌樂職後有宋大夫師延宜風俗通云有牧師氏春秋釋例楚有師祁黎後漢末有南陽師宜官善篆疏夷切六|鰤老魚|蒒草名出玉篇|篩篩竹一名太極長百丈南方以爲船出神異經又竹器也|獅大生二子|螄螄螺
CGE房脂𣬈說文曰人臍也今作毗通爲𣬈輔之毗房脂切二十三|毗義見上注（說文曰人臍也今作毗通爲𣬈輔之毗房脂切二十三）|比和也並也又匕鼻邲三音|琵琵琶釋名曰推手爲琵引手爲琶取其鼓時以爲之名也|㮰楣又方奚切|芘蔾芘荊蕃藩|沘水名在楚|貔獸名|豼上同（獸名）|膍牛百葉也又鳥膍胵也又步迷切|肶上同（牛百葉也又鳥膍胵也又步迷切）|蚍蚍蜉大螘|𧖈上同（蚍蜉大螘）|枇枇杷果木冬花夏熟|仳仳倠醜女|𨈚䠸𨈚體柔|魮文魮魚名狀如覆銚鳥首而翼魚尾音如磬生珠出山海經|鈚犁錧別名|𦳈蒿也|𦊁篝筌|阰山名在楚南|𧑜蟲名|鵧鳥名
NGQ即夷咨嗟也謀也即夷切十五|資助也機也貨也又姓陳留風俗傳云黃帝之後|粢祭飯|𪗉上同（祭飯）|𪗋𪗋縗經典通用齊|𧞓上同（𪗋縗經典通用齊）|諮諮謀|姿姿態|齍黍稷在器|澬水名在邵陵又音茨|𣳩具𣳩山在滎陽出山海經|齎齎持也又子兮切|蒫蒫薺實也|𩆂雨聲|𩄚上同（雨聲）
dGY居夷飢飢餓也又姓左傳殷人七族有飢氏居夷切四|机木名似榆又音几|肌肌膚|虮密虮蟲名
YGQ處脂鴟一名鳶也處脂切七|𨾦上同（一名鳶也處脂切七）|𪀒亦同|胵膍胵鳥藏|𩶅魚名|𧪡怒也|𨒬走皃
KGQ丑飢絺細葛也丑飢切七|辴笑皃又敕辰抽敏二切|郗邑名又姓出高乎|𥭘竹器|脪𦚈脪牛馬子腸|瓻酒器大者一石小者五斗古之借書盛酒瓶|訵陰知也出字林
OGQ取私郪縣名在梓州取私切又七西切九|趑趑趄趨不進也|𨌅說文作䡨連車也一曰郤車抵堂又士佳疾資二切|趀說文云倉卒也|𧾒上同（說文云倉卒也）|𧠥盜視|𡰾上同亦此也（盜視）|𡳠此也|蠀蝎化也
PGQ疾資茨茅茨又姓後漢有茨充亦漢複姓晉有茨芘仲疾資切十三|薋蒺蔾詩作茨說文又作薺|薺上同又才禮切（蒺蔾詩作茨說文又作薺）|餈飯餅也|𩜴上同（飯餅也）|垐以土增道|䆅積禾|蠐蠐螬又疾兮切|瓷瓦器|澬水名在常山郡又涔澬久雨又音資|𥿆𥿆補|𨌅連車又七茨切又士佳切|𩆂涔𩆂久雨
MGQ女夷尼和也女夷切八|柅木名又女履切|怩忸怩心慙也|蚭字林云北燕人謂蚰蜒爲䖡蚭也|跜躨跜虯龍動皃見文選|呢言不了呢喃也|𩚯餌𩚯|䝚獸名
LGQ直尼墀說文云墀塗地也禮天子有赤墀漢典職曰以丹漆地故稱丹墀漢書曰王根作赤墀直尼切十五|𡎰上同（說文云墀塗地也禮天子有赤墀漢典職曰以丹漆地故稱丹墀漢書曰王根作赤墀直尼切十五）|坻小渚俗從互餘同|泜水名在常山陳餘死處也又旨夷切|遲徐也久也緩也亦姓晉湘東太守遲超又虜姓後魏書尉遲氏後改爲尉氏又音稺|遟上同（徐也久也緩也亦姓晉湘東太守遲超又虜姓後魏書尉遲氏後改爲尉氏又音稺）|蚳蟻卵|岻山名|彽彽徊猶徘徊也|阺字統云秦謂陵阪爲阺也|荎爾雅云櫙荎今之刺榆也|菭水衣也又徒來切|謘語諄謘也|莉姓也出淮南|貾貝之黃質有曰白點者
QGQ息夷私不公也說文曰禾也息夷切五|鋖平木器也亦作鐁|厶自營爲厶也說文曰姦衺也|𦮺說文曰茅秀也|㺨石似玉者
aGQ式脂尸主也陳也利也又姓秦有尸佼爲商君師著書式脂切四|鳲鳲鳩鴶鵴今布穀也詩疏云鳩之養其子朝從上下暮從下上食之平均如一也|屍禮記曰在牀曰屍在棺曰柩|蓍蒿屬筮者以爲策說文云蓍生千歲三百莖易以爲數天子蓍九尺諸侯七尺大夫五尺士三尺
fGU渠脂鬐馬項上鬐也渠脂切十一|𦓀方言云長也說文云老也左傳云強也禮記音義云至也言至老境也|耆上同（方言云長也說文云老也左傳云強也禮記音義云至也言至老境也）|愭畏也敬也|𧡺視也|𥉙上同（視也）|䅲麥下種也|祁盛也縣名在太原左傳晉大夫祁奚之邑因以名之又姓出太原黃帝二十五子之一也何氏姓苑云今扶風人|𨪌衛軸鐵也|鰭魚脊上骨|鮨鮓也
hGU於脂伊惟也因也侯也亦水名又州本伊吾廬地在燉煌之北大磧之外秦末有之漢爲伊吾屯隋爲郡貞觀初慕化內附置伊州焉又姓伊尹之後今山陽人於脂切五|咿喔咿|蛜蛜蝛𧑓負蟲也|黝縣名屬歙州又於九切|黟上同（縣名屬歙州又於九切）
IGQ力脂棃果名魏文詔云真定御棃大如拳甘如蜜力脂切十四|梨上同（果名魏文詔云真定御棃大如拳甘如蜜力脂切十四）|𠠍直破|秜稻死來年更生|蜊蛤蜊|蔾蒺蔾|犂牛駁又郎奚切|刕姓也出蜀刀逵之後避難改爲刕氏也出字書|𢤂說文恨也一曰怠也|鯬魚名|鑗金屬|䴻𪌈䴻餅也|蟍螏蟍蝍蛆蜈蚣|𨟀國名
fGk渠追葵說文曰菜也常傾葉向日不令照其根渠追切八|鄈鄈丘地在陳留又在河東漢祭后土處|楑柊楑|𩹍魚名|𢜽悚也又祇癸切|𦝢䑏𦝢醜也|䳫䳫鳩鳥|𧍜蟲名
JGg陟隹追逐也隨也陟隹切三|䨨雷也出韓詩|娺疾也
dGo居追龜說苑曰靈龜五色似玉似金背陰向陽上高象天下平法地易号爲龜大戴禮曰甲蟲三百六十而神龜爲之長居追切六|𪚦上同（說苑曰靈龜五色似玉似金背陰向陽上高象天下平法地易号爲龜大戴禮曰甲蟲三百六十而神龜爲之長居追切六）|𠃾古文（說苑曰靈龜五色似玉似金背陰向陽上高象天下平法地易号爲龜大戴禮曰甲蟲三百六十而神龜爲之長居追切六）|䟸曲脛|螝爾雅云蠶蛹|騩馬淺黑色
cGg儒隹蕤葳蕤草木華垂皃又蕤賓五月律儒隹切七|甤說文曰草木實甤甤也|緌緌纓|擩染也又而樹切|桵白桵木也|䅑禾四把也又息遺切|捼摧也又奴禾切俗作挼
VGg所追衰微也所追切三|榱屋橑說文曰秦名爲屋椽周謂之榱齊魯謂之桷|𤸬病也說文減也一曰耗也
lGg以追惟謀也思也以追切十二|𣄧旌也|維豈也隅也持也繫也說文曰車蓋維也|遺失也亡也贈也加也又姓急就章有遺餘又以醉切|濰水在琅邪|壝埒也壇也又以癸切|𥌰目病|蓶菜名似韮而黃|䜅就也又十隹切|琟石似玉也|唯獨也又以癸切|𧔥蜰𧔥神蛇一首兩身六足四翼見則其國大旱湯時見於陽山出山海經
IGg力追㶟水名在鴈門力追切十三|纍纍索也亦作縲又姓晉七輿大夫纍虎|虆蔓草|欙山行乘欙亦作樏|𤜖求子牛|𡿔㟪𡿔又力罪切|㠥上同（㟪𡿔又力罪切）|𡤯𡤯祖黃帝妃亦作嫘|瓃玉器|𥍔視皃|鸓飛生鳥也又力水切|儽嬾懈皃亦作傫又力罪切|纝網絡論語注云黑索也亦作縲
QGg息遺綏安也說文曰車中靶也又州名春秋時爲白翟所居秦并天下爲上郡後魏廢郡置州取綏德縣以爲名息遺切十二|雖語助也本蟲名似蜥蜴而有文|荾明荾香菜博物志曰張騫西域得胡荾石虎鄴中記曰石勒改胡荾爲香荾|荽上同（明荾香菜博物志曰張騫西域得胡荾石虎鄴中記曰石勒改胡荾爲香荾）|䒘亦同|葰亦同說文曰薑屬可以香口|浽浽溦小雨|奞說文曰鳥張毛羽自奮奞也又戌閏切|夊行遲皃又楚危切|睢水名在梁郡又許葵切|濉上同（水名在梁郡又許葵切）|䅑禾四把長沙云又儒隹切
fGo渠追逵隱也爾雅曰九達謂之逵渠追切十九|夔夔龍亦州名春秋時魚國漢爲魚復縣梁隋皆爲巴東郡唐初改爲信州又改爲夔州取夔國名之又獸名似牛一足無角其音如雷皮可以冒鼓|𣦞俗（夔龍亦州名春秋時魚國漢爲魚復縣梁隋皆爲巴東郡唐初改爲信州又改爲夔州取夔國名之又獸名似牛一足無角其音如雷皮可以冒鼓）|馗說文曰九達道也與逵同又鍾馗俗以辟惡|戣兵器戟屬|鍨上同（兵器戟屬）|騤強也盛也又馬行皃|犪犪牛出岷山肉重數千斤出山海經|躨躨跜見文選|𦝢䑏𦝢醜也|艽埤蒼云遠荒又音求|䟸左脛曲也|𠊾左右視也|𨾎顧皃|頯小頭|𠐽使也|𧢦淫視又丘韋切|𢌳持也|頄面顴也又音求
DGI武悲眉說文作睂目上毛也武悲切二十|睂見上注（說文作睂目上毛也武悲切二十）|嵋山形|湄釋名曰湄眉也臨水如眉也爾雅曰水草交爲湄|𤃱上同（釋名曰湄眉也臨水如眉也爾雅曰水草交爲湄）|鶥鳥名爾雅曰鶬麋鴰今呼鶬鴰字林作鶥|楣戶楣釋名云楣近前各兩若面之有眉|瑂石似玉也|矀伺視|覹上同（伺視）|䉠竹名又音微|黴黴黧垢腐皃又莫背切|麋鹿屬冬至解其角又姓蜀將東海麋竺也|蘪蘪蕪香草即江蘺也|郿縣名在岐州|㵟爾雅曰谷者㵟郭璞云通於谷也|薇爾雅曰薇垂水謂生於水邊|𦗕金飾馬耳又武卑切|葿䒲葿草|攗水芰名也
AGI府眉悲痛也府眉切一
XGg職追錐說文銳也職追切八|隹說文曰鳥之短尾者總名|𪋇鹿一歲|騅馬蒼白雜毛又姓左傳晉七輿大夫騅㪜也|㮅木名似桂|䶆鼠名|萑萑蓷茺蔚又名益母|鵻鳥名
ZGg視隹誰何也視隹切三|䜅就也又以隹切|脽說文𡱂也亦汾脽巨靈所坐也
kGo洧悲帷說文曰在旁曰帷釋名曰帷圍也所以自障圍也洧悲切一
CGI符悲邳下邳縣名在泗州又姓風俗通云奚仲爲夏車正自薛封邳其後爲氏後漢有信都邳彤符悲切六|鉟刃戈又音丕|䲹鶚也|岯山再成也|魾大鱯也又音丕|䫠說文云短須髮皃又音丕
BGI敷悲丕大也亦姓左傳晉大夫丕鄭敷悲切十二|㔻上同（大也亦姓左傳晉大夫丕鄭敷悲切十二）|伾有力|秠黑黍一稃二米又匹几切|䪹大面|駓桃花色馬|怌怌怌恐也|䫠短須髮皃|豾貍子|髬髬髵猛獸奮鬣皃|魾大鱯|鉟刃戈
iGk許維倠仳倠醜面許維切六|婎上同（仳倠醜面許維切六）|睢睢盱視皃|眭眭盱健皃|𢊄姿𢊄
LGg直追鎚金鎚又權也文字音義云從垂亦通直追切五|椎椎鈍不曲橈亦棒椎也又椎髻|槌上同又直累切（椎鈍不曲橈亦棒椎也又椎髻）|桘俗（上同又直累切）|顀項顀
YGg尺隹推排也尺隹切又尺湯回切二|蓷萑蓷又湯回切
JGQ丁尼胝皮厚也俗作𦙁丁尼切四|疷上同（皮厚也俗作𦙁丁尼切四）|秪穀始熟也|氐氐池縣名又音低
BGE匹夷紕繒欲壞也匹夷切六|𢻹（繒欲壞也匹夷切六）|𦀘二同（繒欲壞也匹夷切六）|𧧺謬也|悂上同（謬也）|𢞗惡性也
NGg醉綏嶉高皃醉綏切二|檇以木有所擣又地名左傳越敗吳於檇李又音醉
eGo丘追巋小山而眾丘追切又丘誄切二|蘬蘢古大者曰蘬
gGY牛肌狋犬怒皃牛肌切又巨圓切一
iGU喜夷咦笑皃喜夷切五|忾廣雅云喜皃|䐅臀之別名|𣢂呻吟聲|屎上同（呻吟聲）
#之
XHQ止而之適也往也閒也亦姓出姓苑止而切四|臸到也又如一切|芝芝草論衡曰芝生於土土氣和故芝草生古瑞命記曰王者慈仁則芝草生也|㞢篆文象芝草形蚩從此也
lHQ與之飴𩛿也與之切二十七|𩛛籀文（𩛿也與之切二十七）|䬮古文（弓名出韻略）|怡和也悅也又姓周書怡峯傳云本姓默台避難改焉|弬弓名出韻略|媐說文云悅樂也|异已也又音異|㼢㽃㼢甎也|𣐵船欿水斗|鏔戟無刃也|圯土橋名在泗州|貽貺也遺也|巸長也美也廣𦣞也|洍水名詩云江有洍又音似毛詩作汜|𦣞說文曰顄也|𩠢籀文（說文曰顄也）|頤頤養也說文亦上同（玉名）|詒贈言|㺿玉名|沶水名|宧室東北隅|𦚟豕息肉今謂之豬𦚟|䱌鯸䱌魚也|姬王妻別名本又音基|台我也又姓出姓苑又音胎|眙盱眙縣在楚州|瓵爾雅云甌瓿也
ZHQ市之時辰也廣雅曰時伺也又善也中也是也又姓良吏傳有時苗何氏姓苑云今鉅鹿人市之切七|旹古文（辰也廣雅曰時伺也又善也中也是也又姓良吏傳有時苗何氏姓苑云今鉅鹿人市之切七）|塒穿垣棲雞|鼭鼠名|榯樹木立也|蒔蒔蘿子又音示|鰣魚名似魴肥美江東四月有之
gHc語其疑不定也恐也惑也嫌也語其切三|嶷九嶷山名亦作疑又魚力切|觺觺觺獸角皃又魚力切
QHQ息兹思思念也息兹切又息吏切十五|恖上同（思念也息兹切又息吏切十五）|司主也亦姓左傳鄭有司臣又漢複姓八氏司馬氏本自重黎程伯休甫之後出河內世本士丏弟佗爲晉司功因官爲氏及司徒司寇司空並以官爲氏漢有朝議郎司國吉諫議大夫司鴻儀左傳宋大夫司城子䍐其後氏焉|罳罘罳屏也崔豹古今注云罘罳復思也謂臣來朝君行至內屏外復思惟故曰罘罳也|伺伺候又息吏切|絲說文云蠶所吐也又一蠶爲忽十忽爲絲淮南子曰蠶餌絲則商弦絕|緦緦麻|𥯨竹名有毒傷人即死|禗不安欲去|覗覰也|㺇辯獄相察|𥄶姦視|蕬菟蕬草名案爾雅云女蘿菟絲字不从艹|偲論語曰朋友切切偲偲|楒相楒木
THQ楚持輜楚持切又側持切義見下文二|颸風也
fHc渠之其辝也亦姓陽阿侯其石是也又漢複姓六氏左傳邾庶其之後以庶其爲氏世本楚大夫涉其帑漢清河都尉祝其承先王僧孺百家譜蘭陵蕭休緒娶高密侍其義叔女何氏姓苑有行其氏今其氏渠之切又音基三十|期期信也會也限也要也又姓風俗通有期思國又漢複姓二氏後漢梁鴻改姓運期氏古仙人有安期生賈執英賢傳云今琅邪人|旗旌旗釋名曰熊虎爲旗將軍所建象其猛如虎與眾期之於下也戰國策曰建七星之旗天子之位也又姓齊卿子旗之後漢有九江太守旗光|綦履飾又蒼白色巾也詩曰縞衣綦巾又姓何氏姓苑云義興人|綨上同（履飾又蒼白色巾也詩曰縞衣綦巾又姓何氏姓苑云義興人）|𢃛俗（履飾又蒼白色巾也詩曰縞衣綦巾又姓何氏姓苑云義興人）|萁豆萁|𧯯上同（豆萁）|蜝蟛蜝似蟹而小晉蔡謨食之殆死也|琪玉也|麒麒麟|騏騏驥|淇水名出沮洳之山說文曰淇水出河內共北山東入河|䳢鳥名|錤鎡錤鋤別名也|藄紫藄似蕨菜|棊博物志曰舜造圍棊丹朱善之|櫀上同（博物志曰舜造圍棊丹朱善之）|碁亦同|𤪌弁飾|璂上同（弁飾）|鯕鯿魚|蘄州名漢蘄春縣也晉孝武鄭后諱春改爲蘄陽周平淮南改爲州因蘄水以爲名又姓也|祺祥也吉也|禥籀文（祥也吉也）|踑踑馴跡也|𦪆𦪆艃舟名|䑴上同（𦪆艃舟名）|𢍁舉也|䶞齧也
aHQ書之詩說文曰志也詩序云發言爲詩釋名曰詩之也志之所之也書之切六|邿地名|齝說文曰吐而噍也又敕釐切|𪗪（說文曰吐而噍也又敕釐切）|呞並上同（說文曰吐而噍也又敕釐切）|䀢䀢的也見聲類
cHQ如之而語助說文曰頰毛也如之切二十一|栭木名子似栗而小一曰梁上柱也|𣚊木耳別名|𨼏地名又夔險也|陾上同又音仍（地名又夔險也）|陑上同（上同又音仍）|髵須也髬髵也|峏山名|𨎪喪車|輀上同（喪車）|𦠌煑熟|胹（煑熟）|𦓒並上同（煑熟）|𩰴籀文（並上同）|洏漣洏涕流皃|鮞魚子|耏獸多毛亦作髵又姓左傳宋有耏班|咡吻又音餌|䎠丸之熟也又音丸|誀誘也又音餌|鴯莊子云鳥莫智於鷾鴯鷾鴯玄鳥也
eHc去其欺詐也去其切十一|娸姓一曰醜也|䫥大頭|䫏方相說文曰醜也今逐疫有䫏頭|𠐾上同（方相說文曰醜也今逐疫有䫏頭）|魌亦同|僛醉舞皃|𪅾鵋𪅾鵂鶹鳥亦作䳢|𡖾廣雅云多|䶞齧也|抾把挹也又丘之切
dHc居之姬周姓也居之切十二|朞周年又復時也|稘上同（周年又復時也）|基經也業也址也始也設也|箕箕帚也世本曰箕帚少康作也又姓左傳晉有大夫箕鄭|萁菜似蕨又音期|䇫可以取蟣也|諅謀也說文忌也本渠記切|其不其邑名在琅邪又人名漢有酈食其|錤鎡錤大鉏|居語助見禮|諆謀也說文欺也本去其切
RHQ似兹詞請也說也告也說文曰意內而言外也似兹切七|祠祭名|柌鎌柄|辭辭訟說文曰辭說也|辤上同說文曰不受也受辛宜辤之（辭訟說文曰辭說也）|辝籀文（上同說文曰不受也受辛宜辤之）|𥿆補也
IHQ里之釐理也一曰福也里之切二十|貍野猫|狸俗（野猫）|氂十豪|嫠無夫|剺剝也|梩徙土轝出六韜又都皆切|犛犛牛又音茅|𣁟字統云微畫也|倈倈來見楚詞|艃䑴艃船名|𣮉毛起也又音來|孷孷孳雙生子也|𢟤愁憂之皃|𩭇髬𩭇髮起|㾖病也又音里|筣竹名|斄說文曰強曲毛也可以著起衣|𠩬古文（說文曰強曲毛也可以著起衣）|𠭰引也
SHQ側持菑說文曰不耕田也爾雅曰田一歲曰菑側持切又音栽十五|甾上同又說文曰東楚名缶曰甾（說文曰不耕田也爾雅曰田一歲曰菑側持切又音栽十五）|𦸜亦同（上同又說文曰東楚名缶曰甾）|淄水名亦州名春秋時屬齊漢爲濟南郡宋文帝改清河郡隋置淄州因水以名焉古通用菑|㿳手足生皮堅也|茬茬丘名案漢書地理志泰山郡有茬縣顏師古曰又士疑切亦姓|輜輜軿車|錙錙銖|鶅東方雉也|緇黑色繒也|䊷上同（黑色繒也）|椔木立死|鯔魚名|䎩耕也|䣎鄉名
iHc許其僖樂也又姓姓苑云彭城人許其切十五|歖卒喜|熙和也廣也長也|嬉美也一曰游也|禧福也吉也|媐善也悅也|譆痛聲|𠩺坼也|瞦目睛|㶼火盛|熹盛也博也熱也熾也或作熺|嘻噫嘻歎也|𣢑喜笑|娭婦人賤稱出蒼頡篇|誒說文云可惡之詞也
hHc於其醫醫療也亦官名漢太常屬官有太醫令續漢書曰秩六百石有藥丞主藥方說文曰巫彭初作醫於其切五|毉上同（醫療也亦官名漢太常屬官有太醫令續漢書曰秩六百石有藥丞主藥方說文曰巫彭初作醫於其切五）|譩忿也|㿄羸也又乙賣切|噫恨聲
KHQ丑之癡不慧也丑之切四|齝牛吐食而復嚼也|笞捶擊|痴痴㾻不達之皃
LHQ直之治水名出東萊亦理也直之切三|持執持|莉姓也姓苑云淮南人
YHQ赤之蚩蟲名亦輕侮字從㞢赤之切七|嗤笑也俗又作𣣷|妛輕侮|媸媸妍|𦐉羽盛|𣍆告也又乃經切|𥉍目汁凝
PHQ疾之慈愛也亦州名春秋時晉之屈邑夷吾所居西魏改爲汾州開皇初爲耿州武德改爲慈州因慈氏縣名之疾之切五|礠礠石可引針也|鶿鸕鶿鳥亦作鷀不卵生口吐其鶵又子之切|濨澗水名也|兹龜兹國名龜音丘
NHQ子之兹此也又姓左傳魯大夫兹無還子之切十四|孳孳息|嵫崦嵫山名日所入劇|孜處也力篤愛也|滋水名出高麗山又旨也蒔也多也蕃也液也|嗞嗞嗟憂聲也|𪑿染黑|鎡鎡錤|孖雙生子也|鼒小鼎|鰦魚名|仔克也|鶿鸕鶿鳥|稵禾生皃
UHQ士之茬說文曰草皃濟北有茬平縣俗作茌士之切一
WHQ俟甾漦涎沫也又順流也俟甾切一
e8f丘乏抾挹也丘之切一
aHQ式其䀵眴也式其切一
#微
DIM無非微妙也細也少也說文曰隱行也無非切八|𢼸說文曰妙也|㵟浽㵟小雨|薇菜也|䉠竹名又武悲切|䥩埤蒼云懸物鉤|癓三蒼云足上瘡|矀伺視又武悲切
iIs許歸揮揮霍亦奮也灑也振也動也許歸切十三|煇光也|輝上同（光也）|暉亦同又日色|徽美也又三糾繩也|翬飛皃又雉五色備也|褘后祭服也|鰴魚有力也|楎橛也在牆曰楎又犁頭也|幑幡也|瀈竭也|㫎動旗|𤟤山𤟤獸名似犬見人則笑行疾如風又胡昆切
kIs雨非幃香囊也一說單帳也雨非切又許歸切十五|韋柔皮也又姓出自顓頊大彭之後夏封於豕韋苗裔以國爲氏因家彭城至楚太傅韋孟遷于魯孟玄孫賢爲漢丞相始遷京兆之杜陵也|闈宮中門也|圍守也圜也遶也|䙟重衣|𩎯束也|違背也|湋水名|囗文字音義云回也象圍帀之形也|鍏方言云宋魏呼臿也|潿水不流濁皃|婔江婔神女|𧝕裹也|𠆎衺也|𢾁戾𢾁
BIM芳非霏雪皃芳非切九|䬠上同（雪皃芳非切九）|妃嘉偶曰妃說文匹也又音配|菲芳菲又芳尾切|䩁細毛|婓婓婓往來皃一曰醜|騑騑騑馬行皃|裶衣長皃|𥇖大目又方巾切
AIM甫微猆姓左傳晉有猆豹甫微切十二|飛飛翔亦漢複姓史記有飛廉氏古通用蜚|扉戶扉|緋絳色|𩙲獸如牛白首一目|非不是也責也違也亦姓風俗通有非子伯益之後|馡香也|𩹉魚名|騛騛兔馬而兔足|騑驂旁馬也又音菲|誹誹謗又方未切|餥糇也又方尾切
CIM符非肥肥腯說文曰多肉也亦姓戰國策有肥義符非切十一|腓腳腨腸也|䈈竹名|淝水名在廬江本作肥|𤷂風𤷂病也|痱上同（風𤷂病也）|蜰蟲名即負盤蟲|䨽蠹䨽鳥名如梟人面一足冬見夏蟄著其毛令人不畏雷出山海經|蟦蠐螬|賁姓也出姓苑又布昆彼義符文三切|裴即裴縣名案漢書地理志在魏郡應劭音非本又音陪
hIs於非威威儀又姓風俗通云齊威王之後於非切八|葳葳蕤|隇隇䧅險也|嵔嵔㠥也又於鬼烏罪二切|蝛蛜蝛蟲也一名𧑓蝜|鰄魚名|媁美也|楲決塘木也又楲窬褻器也
fIc渠希祈求也報也告也渠希切十九|頎長皃|旂爾雅曰有鈴曰旂釋名曰交龍曰旂旂倚也畫作兩龍相依倚也通以赤爲之無文彩諸侯所建也|𩴆鬼俗|畿王畿|㙨上同（王畿）|崎曲岸|碕上同（曲岸）|圻亦上同又書傳爲京圻字又魚斤切（曲岸）|刏以血塗門又居依古對二切|𧰙危也說文曰訖事之樂也又公哀切|𦠄頰肉|俟虜複姓北齊有特進万俟普万音墨|幾近也又居依居豈二切|蚚蟲也爾雅云強蚚|玂犬生一子|蟣爾雅云蛭蟣又居豈切|岓山傍石也|𪙧齒危
dIc居依機會也萬機也說文云主發謂之機書曰若虞機張傳云機弩牙也居依切十六|譏諫也誹也譴也問也|蘄縣名在徐州亦草名又音其芹|嘰口醜說文云小食也|𦺬菹𦺬草|磯大石激水|鞿繫馬|饑穀不熟|禨祥也|幾庶幾又祈蟣二音|䟇走也|鐖鉤逆鋩淮南子曰無鐖之鉤不可以得魚|僟精也明堂月令曰歲將僟終|璣珠不圓也|刏斷切也剌也刲傷也|𧗇血祭
iIc香衣希止也望也散也施也爾雅罕也又姓三輔決錄有希海字子江香衣切十一二|晞日氣乾也|莃菟葵|鵗北方名雉|睎視也眄也望也|稀稀疎|豨豬也又虛豈切|𧻶走皃|桸木名汁可食|悕願也又悲也|俙依俙|欷說文曰歔也又喜既切
hIc於希依倚也祿也於希切八|郼殷國名也|衣上曰衣下曰裳世本曰胡曹作衣白虎通云衣者隱也裳者障也所以隱形自障蔽也又姓出姓苑|譩痛聲|㛄女字|㐆說文曰歸也从反身|䧇天䧇縣在酒泉|㥋念痛聲也
gIc魚衣沂水名出泰山魚衣切二|凒凒凒霜皃
gIs語韋巍高大皃語韋切二|犩爾雅云犩牛郭璞曰即犪牛也如牛而大肉數千斤
dIs舉韋歸還也公羊傳曰婦人謂嫁曰歸亦州名古夔子國武德初割夔州之秭歸巴東二縣置州取歸國爲名也舉韋切三|㱕籀文（還也公羊傳曰婦人謂嫁曰歸亦州名古夔子國武德初割夔州之秭歸巴東二縣置州取歸國爲名也舉韋切三）|騩大騩山
eIs丘韋蘬馬蓼似蓼而大也丘韋切又丘追丘誄二切二|𧢦視也
#魚
gJc語居魚說文曰水蟲也亦姓出馮翊風俗通云宋公子魚賢而有謀以字爲族又漢複姓二氏左傳晉有長魚矯史記有修魚氏語居切十|𩺰說文曰二魚也|漁說文云捕魚也尸了曰燧人之世天下多水故教民以漁也又水名在漁陽|𩼪上同（說文云捕魚也尸了曰燧人之世天下多水故教民以漁也又水名在漁陽）|䰻上同（說文云捕魚也尸了曰燧人之世天下多水故教民以漁也又水名在漁陽）|䱷䱷獵亦上同（說文云捕魚也尸了曰燧人之世天下多水故教民以漁也又水名在漁陽）|齬齒不相值又魚舉切|鋙鋤屬又音語|䁩爾雅曰馬二目白魚字或從目|衙說文曰衙衙行皃又音牙
TJQ楚居初舒也始也從刀衣蓋裁衣之初楚居切二|𠿝呵叱人也
aJQ傷魚書世本曰沮誦蒼頡作書釋名曰書庶也紀庶物也亦言著也著之簡紙水不滅也傷魚切七|鵨鳥似鳧也|瑹美玉名案禮記注云笏也本亦作荼|舒緩也遟也伸也徐也敘也亦州名春秋時晥國晉於皖縣置懷寧縣武德改爲舒州亦姓何氏姓苑云廬江人|𦺗魚薺|紓緩也|𨛭地名在廬江
dJc九魚居當也處也安也九魚切十四|𡨢𡨢儲|据手病詩云予手拮据毛萇曰拮据撠挶也|裾衣裾|琚玉名|䝻貯也|鶋鶢鶋海鳥|車車輅又昌遮切|蜛蜛蠩|崌崌崍山也|椐木名|涺水名|𦱅苴𦱅草也|腒鳥腊又音渠
fJc強魚渠溝渠也亦州名宋置宕渠郡周仍爲郡武德初改置州亦有宕渠山又姓左傳衛有渠孔御戎強魚切二十六|𨎶車輞|𦄽履飾|璩玉也|磲硨磲美石次玉|蕖芙蕖|籧籧篨|𥴧飤牛筐|淭淭挐方言云杷宋魏之閒謂之淭挐|醵合錢飲酒又巨略切|腒鳥腊|𪆫𪄉𪆂鳥|螶說文云螶𧎾也一曰蜉蝣朝生暮死者爾雅作渠略|蟝上同（說文云螶𧎾也一曰蜉蝣朝生暮死者爾雅作渠略）|䝣䝣獀獸名食猛獸出山海經|豦獸名說文曰鬬相丮不解也从豕虍豕虍之鬬不相捨司馬相如說豦封豕之屬一曰虎兩足舉又音據|蘧蘧麥又姓|鐻鐻耳之傑|璖耳環|𨞙聚名|㯫㯫栫藩籬名|䟊小走皃|𦼫𦼫菜似蘇又音巨|䆽穴類|𧝔繫𧝔|懅怯也又音遽
lJQ以諸余我也又姓風俗通云秦由余之後何氏姓苑云今新安人以諸切三十|蜍蜘蛛又常魚切|藇芞藇香草|㶛水名|餘殘也賸也皆也饒也又姓晉有餘頠又漢複姓三氏晉卿韓宣子之後有名餘子者奔於齊號韓餘氏又傳餘氏本自傅說說既爲相其後有留於傅巖者因號傅餘氏秦亂自清河入吳漢興還本郡餘不還者曰傅氏今吳郡有之風俗通云吳公子夫摡奔楚其子在國以夫餘爲氏今百濟王夫餘氏也|輿車輿又多也又權輿始也續漢書輿服志曰上古聖人觀轉蓬始以爲輪輪行不可載因物生智後爲之輿又姓周大夫伯輿之後|旟周禮曰鳥隼曰旟州里所建也爾雅曰錯革鳥曰旟郭璞云此謂合剝鳥皮毛置之竿頭|鵌鳥名與鼠同穴又大都切|璵魯之寶玉|艅艅艎吳王船名|畬田三歲也|𤰩上同（田三歲也）|㶛水名|歟說文云安气也又語末之辝亦作與|與上同本又餘佇切（說文云安气也又語末之辝亦作與）|譽稱也又音預|嬩女字|舁對舉|擧上同（對舉）|妤婕妤婦人官也亦作倢伃|伃上同（婕妤婦人官也亦作倢伃）|㦛恭敬|𪋮說文云似鹿而大又弋庶切|予我也又餘佇切|㺞獸名|𩦡馬行皃|𧾚𧾚𧾚安行皃|狳獸名山海經云餘我之山有獸如兔鳥喙鴟目蛇尾遇人則眠名曰犰徐見則有螽蝗爲害也|鸒爾雅云鸒斯雅烏又羊庶切|雓爾雅曰鷄大者蜀蜀子雓
QJQ相居胥相也說文曰蟹醢也又姓晉有大夫胥童何氏姓苑云琅邪人也俗作𦙃相居切又息呂切十一|䱬魚名|䈝竹名|稰落也|楈木名|藇姓出纂文本又音序|諝有才智之稱又息呂切|㥠上同（有才智之稱又息呂切）|湑露皃又息呂切|蝑蜙蝑蟲|揟取水具也
OJQ七余疽癰疽也七余切十六|岨石山戴土|砠上同（石山戴土）|䢸鄉名在鄠縣又子余切|趄趑趄|苴履中藉又子魚切|沮止也非也又水名在房陵所謂沮漳書云漆沮既從並在北地又子魚側魚疾與子預四切|狙猿也又七預切|䏣蟲在肉中|蛆俗（蟲在肉中）|雎雎鳩鳥|蒩苞蒩又則吾切|𣻐說文云水出北地直路西東入洛|伹拙人|坥螾場又七預切|𡳆此也
UJQ士魚鉏誅也又田器釋名曰鉏助也去穢助苗也說文曰立薅斫也又姓左傳有鉏麑士魚切六|鋤上同（誅也又田器釋名曰鉏助也去穢助苗也說文曰立薅斫也又姓左傳有鉏麑士魚切六）|耡周禮曰以興耡利氓又音助|豠豕屬|𧱑上同（豕屬）|𪆷𪅖𪆷鳥白鷺也爾雅作舂鉏
KJQ丑居攄舒也丑居切四|㯉惡木|筡竹篾名也|摴摴蒱戲又姓史記秦相摴里疾
VJQ所葅疏通也除也分也遠也窻也又姓漢有太子太傅東海疏廣或作𤕟俗作疎所葅切又所助切十一|梳梳櫛說文曰理髮也|綀綀葛|蔬菜蔬|疎稀疎|𥿇𥿇繼|釃下酒|𦌿上同（下酒）|𤕟通也|㽰青疏|疋足也古爲雅字
iJc朽居虛空虛也亦姓出何氏姓苑朽居切又音袪六|驉駏驉畜似騾也|歔歔欷|噓吹噓|魖魖耗鬼又夔魖罔象才石之怪也|𥛳上同出字書（魖耗鬼又夔魖罔象才石之怪也）
RJQ似魚徐緩也說文安行也亦州名古之彭國禹爲徐州秦屬泗水郡漢爲郡復置徐州又姓自顓頊之後春秋時徐偃王行仁義爲楚文王所滅其後氏焉出東海高平東莞琅邪濮陽五望似魚切四|䣄地名又音徒|䍱野羊|俆說文緩也
hJc央居於居也代也語辝也又商於地名亦姓今淮南有之央居切又音烏五|扵俗（居也代也語辝也又商於地名亦姓今淮南有之央居切又音烏五）|箊竹名|淤淤泥又依倨切|唹笑皃
JJQ陟魚豬爾雅曰豕子豬陟魚切六|䐗上同（爾雅曰豕子豬陟魚切六）|猪俗（爾雅曰豕子豬陟魚切六）|瀦水所停也|櫫楬櫫有所表識|藸藸蒘草又音除
IJQ力居臚皮臚腹前曰臚又鴻臚寺漢書曰典客秦官武帝更名大鴻臚韋昭曰鴻大也臚陳序也欲以禮大陳序賓客也力居切十七|閭侶也居也又閭閻周禮曰五家爲比使之相保五比爲閭使之相受也又姓出衛國頓丘二望又漢複姓四氏凡閭氏出自晉唐叔賈執英賢傳云今東莞有之林間氏出自嬴姓文字志云後漢有蜀郡林閭翁孺博學善書藝文志云古有將閭子名菟好學著書晉有寧州剌史樂安辟閭彬|䰕毛也說文鬣也|廬寄也舍也周禮曰凡國十里有廬廬有飲食亦州名春秋時舒地秦爲合肥縣梁以爲合州隋爲廬州又山名廬山記云周威王時有匡俗廬君故山取其號|蘆漏蘆草又音盧|櫚栟櫚木名有葉無枝博雅曰栟櫚椶也|驢畜也|藘蕠藘草|䕡菴䕡草|爈火燒山界|𤁵浘𤁵海水洩處案莊子作尾閭|㠠玉篇云山名|櫖諸攄山櫐爾雅作慮|璷字林云玉名|䮉傳馬名|𥶆𥶆䈝竹名|𢣻𢣻憂也
XJQ章魚諸之也旃也辯也非一也又姓漢有洛陽令諸於出風俗通又漢複姓有諸葛氏吳書曰其先葛氏本琅邪諸縣人徙陽都先姓葛時人謂徙居者爲諸葛氏因爲氏焉風俗通云葛嬰爲陳涉將有功而誅孝文追錄封其孫諸縣侯因并氏焉章魚切七|櫧木名|㶆水名在北嶽|藷藷蔗甘蔗|𧄔薯蕷別名|䃴礛䃴青礪也|蠩蜛蠩一頭數尾長二三尺左右有腳狀如蠶可食也
LJQ直魚除階也又去也直魚切十三|躇躊躇|儲儲副又姓後漢有儲太伯|涂水名在堂邑又直胡切|篨籧篨蘆䕠也|𦿀籌𦿀蔥名|宁門屏閒又音佇|㾻瘢也|著爾雅云太歲在戊曰著雍又直略陟慮陟略三切|滁水名出簸箕山入海亦州春秋時楚地梁爲南譙州齊改爲臨滁郡開皇改爲滁州|蒢草名可染又蕖蒢口柔也|屠匈奴傳有休屠王又音徒|藸爾雅曰菋荎藸郭璞云五味也蔓生子叢在莖頭
cJQ人諸如而也均也似也謀也往也若也又姓晉中經部魏有陳郡丞馮翊如淳注漢書又虜姓後魏書如羅氏後改爲如氏人諸切八|蕠蕠藘草也亦作茹|𨚴地名|洳水名在南郡又人慮切|鴽䳺也|𨾵上同（䳺也）|𡫽假寐也又如與切|茹恣也相牽引皃也易曰拔茅連茹又虜複姓後魏書普陋茹氏後改爲茹氏又如慮切又而與切
NJQ子魚且語辝也說文薦也子魚切又七也切四|蛆蝍蛆食蛇蟲蜈蚣是也爾雅曰蒺藜蝍蛆郭璞云似蝗大腹長角能食蛇腦|苴苞苴亦姓漢書貨殖傳有平陵苴氏又音疽|沮虜複姓有沮渠氏其先世爲匈奴左沮渠遂以官爲氏沮渠蒙遜以後魏天興四年僭號於張掖稱北涼
eJc去魚虛說文曰大丘也去魚切又許魚切十二|墟上同（說文曰大丘也去魚切又許魚切十二）|𥬔飯器|袪袖也舉也|阹依山谷爲牛馬之圈|椐木名又音居|胠腋下又胠篋莊子篇名|魼比目魚他合切|㠊㠊崎山路|𢴮擊也|㭕板置驢上負物|䒧草器
SJQ側魚菹說文曰酢菜也亦作葅側魚切四|𧗘上同（說文曰酢菜也亦作葅側魚切四）|䶥齒不齊皃|沮人姓世本云沮誦蒼頡作書並黃帝時史官
ZJQ署魚蜍蟾蜍也署魚切又音余二|𧄔似薯蕷而大或作稌
MJQ女余袽易曰繻有衣袽女余切又音如六|帤幡巾|𣭠犬多毛也|蒘藸蒘草名|𣖹藸𣖹杷名|挐牽引
#虞
gKs遇俱虞度也說文曰騶虞仁獸白虎黑文尾長於身不食生物俗作𩦢又周禮有山虞澤虞掌山澤之官也亦姓出會稽濟陽二望風俗通云凡氏之興九事一氏於號唐虞夏殷是也遇俱切二十|𩦢俗見上注（度也說文曰騶虞仁獸白虎黑文尾長於身不食生物俗作𩦢又周禮有山虞澤虞掌山澤之官也亦姓出會稽濟陽二望風俗通云凡氏之興九事一氏於號唐虞夏殷是也遇俱切二十）|愚愚惷說文曰戇也从心禺禺母猴屬獸之愚者|娛娛樂|湡齊藪名亦作隅爾雅曰齊有海湡又水名在襄國|堣堣夷日所出處書亦作嵎|𪃍鳥名狀如梟人面四目而有耳見則天下大旱出山海經|嵎山名在吳|髃骨名在膊前又五苟切|禺番禺縣在南海亦姓出姓苑本又音遇母猴屬也|隅角也陬也|䴁鳥似禿鶖|鰅魚名有文出樂浪|鍝鋸也|澞爾雅曰山來水澗陵夾水澞|𧍪搜神記曰𧑒𧍪似蟬而長味辛美可食一名青蚨異物志云𧑒𧍪子如蠶子著草葉得其子母自飛來就之|㷒拔器煑食|齵齵齒重生|鸆鸅鸆一名婟澤|𨜖地名
TKg測隅芻芻豢說文云刈草也俗作蒭亦姓出何氏姓苑測隅切二|犓養牛曰犓
DKM武夫無有無也亦漢複姓二氏楚熊渠之後號無庸其後爲氏又有無鉤氏出自楚姓武夫切二十一|毋止之辝亦姓母丘或爲母氏又漢複姓八氏漢書貨殖傳有母鹽氏巨富齊母鹽邑大夫之後漢有執金吾東海母將隆將作大匠母兵興風俗通有樂安母車伯奇爲下邳相有主簿步邵南時人稱母車府君步主簿何氏姓苑有母終氏左傳魯大夫兹母還晉大夫綦母張漢書有巨母霸王莽改爲巨母氏|瞴瞴瞜又亡撫切|膴無骨腊又荒烏亡甫二切|蕪荒蕪|誣誣枉|巫巫覡周禮春官曰司巫掌羣巫之政令若國大旱則帥巫而舞雩亦山名又姓風俗通云氏於事巫卜陶匠是也漢有冀州刺史巫捷|莁莁荑|璑三采玉|𨼊地名在弘農|䉑黑皮竹也|鷡鷡鴽鳥名|𦌬罟屬又音武|蝥爾雅云鼅鼄鼄蝥又音牟|𢜮爾雅云愛也又音武|无虛无之道又漢複姓左傳莒有大夫无婁修胡|𢃀嵌空之皃|譕譕誘詞也|墲冢也|鵐鳥名雀屬|憮空也又音武|䍢雉網也
kKs羽俱于曰也於也說文本作亏凡從于者作亏同又姓周武王子邘叔子孫以國爲氏其後去邑單爲于漢有丞相東海于定國又望出河南者即後魏書万忸于氏後改爲于氏凡諸姓望在後而稱河南者皆虜姓後魏孝文詔南遷者死不得還北即葬洛陽故虜姓皆稱河南焉又漢複姓五氏後漢特進漁陽鮮于輔袁紹大將軍淳于瓊劉元海太史令宣于修之何氏姓苑有多于氏鬬于氏羽俱切二十|迂遠也曲也又憂俱切|盂盤盂說文曰飯器也又姓左傳晉有盂丙|邘地名在河內又姓漢有邘侯爲上谷太守|雩請雨祭名又況于切|𦏴飛皃說文曰雩羽舞也或从羽同上（請雨祭名又況于切）|竽笙竽世本曰隨作竽|玗玉名|芋草盛皃又王遇切|汙水名又屋孤烏故二切|䣿宴也|杅因杅匈奴地名|釪錞釪形如鐘以和鼓|𧘘袌衣|骬𩩲骭缺盆骨也|𠌶說文云草木華也本音吁|謣妄言|䩒車環靼也|䢓窻䢓牀也|𦱃葅𦱃似韭
iKs況于訏大也況于切二十|吁歎也|雩雩婁古縣名在廬江|欨焁欨一曰笑意又況字切|㽳病也|盱舉目又盱眙縣在楚州|𧙆大袑衣也|𥈈𥈈瞜笑皃|姁姁媮美態|𦀒殷冠名又音詡|扜說文云指麾也又憶俱切|𠌶草木華也|荂上同又音敷（草木華也）|𢖳憂也|䣿宴也|旴日始出皃|䩒䩒靼|㰭㰭樂|虖虎吼又虎乎切|𣚏臿屬又矩于切
fKs其俱衢街衢爾雅曰四達謂之衢其俱切三十六|劬勞也|軥車軶|氍聲類曰氍毹毛席也風俗文云織毛褥謂之氍毹亦作𣰠|胊䀯也一曰屈也亦山名在東海又姓出姓苑|䧁地名在河東|臞瘠也|癯上同（瘠也）|鴝鴝鵒亦作鸜周禮曰鸜鵒不踰濟|鸜上同亦鸜鵲又漢複姓莊子有鸜鵲子（鴝鵒亦作鸜周禮曰鸜鵒不踰濟）|灈水名在汝南|躣行皃楚詞曰右蒼龍之躣躣|忂上同（行皃楚詞曰右蒼龍之躣躣）|𩢳馬左足白爾雅云馬後足皆白本作翑|鼩鼱鼩小鼠|蘧蘧麥又巨居切|斪鉏屬|句冤句縣名在曹州又九遇古侯二切|蠷蠷螋蟲|瞿鷹隼視也又姓王僧孺百家譜曰裴桃兒取蒼梧瞿寶女又有瞿曇氏西國姓又九遇切|欋釋名曰齊魯閒謂四齒杷爲欋|葋爾雅云葋艼熒|翵鳥羽|𦐛上同（鳥羽）|蚼蚼蛘蚍蜉|𪓞𪓷屬說文云頭有兩角出遼東亦作𪓟𪓷音奚|𧾱走顧之皃|䞤上同（走顧之皃）|𠣪脯名|絇履頭飾也|𡱺上同（履頭飾也）|𥃔聲類云樹種也|𥗫磫𥗫青礪|戵戟屬|鑺上同（戟屬）|姁姁然樂也又況羽切
cKg人朱儒柔也人朱切十六|獳朱獳獸名似狐而魚翼出則國有恐又女侯切|濡水名出涿郡又霑濡|襦說文云短衣也俗作𧝄|懦弱也又乃亂切|嚅囁嚅多言|鱬朱鱬魚名魚身人面|𪋯鹿子又相俞切|嬬妻名|繻易曰繻有衣袽亦見周禮注又音須|顬顳顬耳前動|䞕火色|臑嫩耎皃|醹厚酒又音乳|㼱柔皮又而兗切|䰰鬼魅聲䰰䰰不止又乃侯切
QKg相俞須意所欲也說文曰面毛也俗作鬚又姓風俗通云太昊之後史記魏有須賈又漢複姓左傳遂人四族有須遂氏又虜複姓匈奴貴姓有須卜氏相俞切十四|鬚俗（意所欲也說文曰面毛也俗作鬚又姓風俗通云太昊之後史記魏有須賈又漢複姓左傳遂人四族有須遂氏又虜複姓匈奴貴姓有須卜氏相俞切十四）|嬃女字|𩓣待也|𥪥上同（待也）|繻傳符帛|𢄼頭𢄼|𪋯鹿子也又音儒|需卦名|娶荀卿子曰閭娶子奢莫之媒也又七句切|緰衫緰帛也|蕦蕵蕪別名|鑐鎖中鑐也|隃北陵名又式注式朱二切
JKg陟輸株木根也陟輸切十一|誅責也釋名曰罪及餘曰誅如誅大樹枝葉盡落|邾國名|鼄鼅鼄網蟲亦作蜘蛛|蛛上同（鼅鼄網蟲亦作蜘蛛）|跦行皃|袾字統云朱衣曰袾又昌朱切|列殊殺字從歹歹五割切|㦵上同（殊殺字從歹歹五割切）|鴸鳥名似鴟人首|𪏿黏皃
KKg敕俱貙獸名似貍敕俱切二|𤠾俗（獸名似貍敕俱切二）
ZKg市朱殊異也死也市朱切十二|銖錙銖八銖爲錙二十四銖爲兩|洙水名在魯|茱茱萸|㼡小甖|殳兵器釋名曰殳殊也長一丈二尺無刃有所撞挃於車上使殊離也詩云伯也執殳又姓舜典有殳折|𢎦上同出道書（兵器釋名曰殳殊也長一丈二尺無刃有所撞挃於車上使殊離也詩云伯也執殳又姓舜典有殳折）|㸡㸡𤗬所以遏水|𦤂八觚杖也|陎陎𨻻縣名|𠘧說文云鳥之短羽飛𠘧𠘧也象形|杸說文曰軍中士所持殳也司馬法曰執羽從杸
lKg羊朱逾越也羊朱切四十五|踰上同（越也羊朱切四十五）|窬門邊小竇又穿窬也|臾善也亦須臾又姓左傳晉大夫臾駢|楰木名又音庾|腴肥腴|諛諂諛|隃隃麋古縣在扶風|鄃地名在涿郡又音輸|覦覬覦欲得|𨵦窺也|俞然也荅也說文作俞空中木爲舟也又姓又恥呪切|歈巴歈歌也|愉悅也和也樂也|𢋅邪𢋅舉手相弄或作歋歈|揄揄揚詭言也又動也說文引也|褕褕狄后衣又由昭切|瑜玉名|崳崳次山在鴈門|㥚憂也|羭黑羝|蝓𧓗蝓蝸牛|榆木名說文曰白枌也春秋元命包曰三月榆莢落|萸茱萸|堬方言云墳堬培塿埰埌塋壟皆冢別名|牏築垣短版|渝渝變也亦州名本巴國漢爲巴郡之江州縣梁於巴郡置楚州隋改爲渝州因渝水爲名|媮靡也又音偷|𤜹𤜹𤜹呼犬子也|㳛汙㳛|𤧙美石次玉|瘉病也|螸爾雅云蠭醜螸|蕍澤蕮|𦺮草也|䩱䩱餘也出字林|䜽變色豆也|萮䓵萮花皃|蘛上同（䓵萮花皃）|舀曰也又音由又代兆切|㼶瓶也|騟紫馬|𢔢行皃|𥯮黑竹|𥔢石次玉也
eKs豈俱區具區吳藪名又禮曰草木茂區萌達注云屈生曰區亦姓後漢末有長沙區星豈俱切八|鰸魚名出遼東似蝦無足|驅驅馳也|敺古文（驅馳也）|嶇崎嶇|軀身也|摳褰裳又苦侯切|䧢䧢隅不安皃
XKg章俱朱赤也說文曰赤心木松柏屬也又姓出沛國義陽吳郡河南四望本自高陽後周封于邾後爲楚所滅子孫乃去邑氏朱焉亦漢複姓莊子有朱泙漫郭象注云朱泙姓也章俱切十|珠珠玉白虎通曰德至深淵則海出明珠|侏侏儒短人|絑繒純赤色|祩詛也又音注|咮讋咮多言皃|鴸鳥名似鴟人首|鮢似蝦無足|𤝹𤝹獳|硃硃研朱砂
OKg七逾趨走也七逾切三|趍俗本音池|鯫淺鯫小人不耐事皃又士后切
IKg力朱慺悅也力朱切又落侯切十六|蔞蔞蒿又虜姓官氏志云一那蔞氏後改爲蔞氏|氀毛布|瞜瞴瞜又落侯切|䱾魚名|嶁山頂|䝏求子豬也又落侯切|㺏上同（求子豬也又落侯切）|摟曳也|鷜鵱鷜野鵝又落侯切|鏤屬鏤劒名又盧豆切|䣚鄉名又落侯切|婁詩曰弗曳弗婁傳曰婁亦曳也又落侯切|瘻痀瘻曲脊|𤗬㸡𤗬所以遏水|膢飲食祭也冀州八月楚俗二月
CKM防無扶扶持也佐也漢三輔有扶風郡扶助也風化也魏爲岐州又扶州在隴右元魏置管同昌怡夷二縣又姓漢有廷尉扶嘉防無切二十六|𢻳古文（扶持也佐也漢三輔有扶風郡扶助也風化也魏爲岐州又扶州在隴右元魏置管同昌怡夷二縣又姓漢有廷尉扶嘉防無切二十六）|芙芙蓉|符符契河圖曰玄女出兵符與黃帝戰蚩尤說文曰符信也漢制以竹長六寸分而相合又姓魯頃公之孫雅仕秦爲符璽令因而氏焉琅邪人也|颫颫風大風|鳧野鴨|榑榑桑海外大桑日所出也|苻苻鬼目草又姓晉有苻洪武都氐人本姓蒲氏因其孫堅背文有草付之祥改姓苻氏洪子健以晉穆帝永和七年僭号於長安稱秦|蚨青蚨蟲子母不相離|夫語助又府符切|𦽏𦽏茈草也案爾雅曰芍鳧茈不從艹|𣿆水名|枹枹罕縣名在河州罕音漢|瓿甌瓿瓶也|𧥱𧥱詞|枎枎疏盛也|坿白石英也|泭水上泭漚說文曰編木以渡也本音孚或作𣻜|𣻜見上注（水上泭漚說文曰編木以渡也本音孚或作𣻜）|𤱽小畚器也|𣘧草木子房|𣻥水名其中有神古人|𢞦心明|𦑹飛皃|𥄑望也|玸玉名
UKg仕于䅳稷穰仕于切四|雛鵷鶵爾雅曰生噣雛謂鳥子能自食俗作𨿊噣音卓|鶵籀文（鵷鶵爾雅曰生噣雛謂鳥子能自食俗作𨿊噣音卓）|媰崔子玉清河王誄云惠於媰孀說文曰婦人姙娠也本側鳩切
SKg莊俱㑳纂文云偛㑳小人皃莊俱切偛側洽切二|搊解也
BKM芳無敷散也說文从尃施也芳無切三十六|麩麥皮也|麱上同（麥皮也）|孚信也|𣞒木名|郛郛郭|鄜鄜州漢鄜縣今鄜城是隋改作鄜州|鋪又普胡切|筟織緯者|俘囚也|痡病也|殍餓死|怤思也悅也|䎔翮下羽也|𧀮花葉布也|孵卵化|豧豕息|尃布也|䱐魚名|罦車上網以捕鳥|稃穀皮|𥹃上同（穀皮）|莩漢書云非有葭莩之親張晏云莩者葭中白皮|泭小木栰也說文云編木以渡也|郙鄉名又云亭名在汝南又方矩切|㕊石閒見也|桴屋棟又音浮|䒀䒀艇船也|㩤張也|姇姇悅|荂華榮之皃又音吁|紨布也又細紬也|䓵䓵萮花皃|㲗毛解|䓏花盛|秿禾穳也又扶甫切
NKg子于諏謀也子于切又子侯切七|㖩𡄑㖩不廉|𡸨𡸨嵎|娵娵觜星名|陬陬隅又子侯切|嶉高皃|掫擊也又子侯切
AKM甫無跗足上也甫無切二十一|趺上同又跏趺大坐（足上也甫無切二十一）|膚皮膚又美也傅也|肤上同（皮膚又美也傅也）|邞古縣名在琅邪|鈇鈇鉞|衭衣前襟|㠸上同（衣前襟）|玞珷玞美石次玉|𩿧䳤𩿧鳥名三首六足六目三翼|𧀴地𧀴藥名|簠簠簋祭器又方羽切|夫丈夫又羌複姓後秦建威將軍夫蒙大羌|鳺䳕鳩鳥|柎攔足|扶公羊傳云扶寸而合注云側手曰扶案指曰寸|𩬙𩬙髻本也|𩵩𩵩鯕魚名|䄮里䄮玉篇云再生稻也|䃿祭名|妋玉篇云貪皃
hKs憶俱紆縈也曲也詘也勞也又姓後秦有肥鄉侯始平紆邈憶俱切十二|䩒鞶革又音于|陓陽陓澤名|扜說文云指麾也|䩽鞬也|䙔編枲頭衣又烏侯切|蓲草名又去鳩烏侯二切|迂曲也又音于|䣿能者飲不能者止也又音于|㝼盤旋|虶蚰蜓別名|䨕䨕注雨皃
aKg式朱輸盡也寫也墮也說文曰委輸也式朱切又式注切三|鄃縣名在貝州|隃北陵名又相俞式注二切
YKg昌朱樞本也爾雅曰樞謂之椳郭璞云門戶扉樞也昌朱切五|姝美好|𩪍𩪍骨|袾朱衣|䇬䇬策
LKg直誅廚說文曰庖屋也俗作廚直誅切五|躕踟躕行不進皃|趎人名莊子有南榮趎|幮帳也似廚形也出陸該字林|裯襌衣也又直休切
dKs舉朱拘執也舉朱切十四|駒馬駒|䀠左右視也|眗上同（左右視也）|岣岣嶁衡山別名|㪺挹也酌也|𨞜上同（挹也酌也）|捄盛土詩云捄之陾陾|跔手足寒也|鮈𩶭鮈魚名|俱皆也具也又姓南涼錄有將軍俱延|痀曲脊|𥇛說文目邪也|𥗫磫𥗫礪石
VKg山芻毹氍毹也山芻切四|㡏裂繒|橾說文曰車轂中空也|螋蠷螋蟲又所留切
#模
DLA莫胡模法也形也規也莫胡切十二|橅上同出漢書（法也形也規也莫胡切十二）|摸以手摸也亦作摹又音莫|嫫嫫母黃帝妻皃甚醜亦作𡠜|㡔車衡上衣|𨡭𨡭䤅榆子醬也䤅大胡切|謨謀也亦作謩|𠻚古文（謀也亦作謩）|墲規墓度地曰墲|无南无出釋典又音無|䉑竹名|膜膜拜胡禮拜也
CLA薄胡酺大酺飲酒作樂周禮注云蓋亦爲壇位如雩禜云族長無飲酒之禮因祭酺而與其民以長幼相獻酬焉又漢律禁三人以上羣飲酒故賜酺得會聚飲食也薄胡切十|匍匍匐|蜅蛤蜅|荹荹攎收亂草也|樸樸𠟼縣名在武威𠟼音還|菩梵言菩提漢言王道|䔕膊魚亦雉有䔕𠟼也|蒲草名似藺可以爲席亦州名舜所都蒲坂秦爲河東郡後魏爲雍州又改爲秦州周改爲蒲州因蒲坂以爲名又姓風俗通漢有詹事蒲昌又苻洪之先家池中蒲生長五丈如竹形時咸謂之蒲家因以爲氏又漢複姓有蒲姑蒲城蒲圃三氏出何氏姓苑|蒱摴蒱戲也博物志曰老子入胡作摴蒱|䈻竹笪沈水取魚之具
jLA戶吳胡何也又胡虜說文曰牛頷垂也亦姓出安定新蔡二望又漢複姓二氏齊宣王母弟別封母鄉遠本胡公近娶母邑故爲胡母氏又胡公之後有公子非因以胡非爲氏又虜複姓南涼錄禿髮壽闐之母姓胡掖氏戶吳切三十|𩑶牛頷垂也|𠴱上同（牛頷垂也）|壺酒器也禮記投壺篇云壺頸脩七寸腹脩五寸口徑三寸半容斗五升亦姓風俗通云漢有諫議大夫壺遂|狐狐狢說文曰妖獸也鬼所乘有三德其色中和小前豐後死則首丘又姓左傳晉有狐氏代爲卿大夫|瓳㽃瓳博雅曰㼾甎也|餬寄食又糜也使餬其口於四方是也或作𩚩|瑚瑚璉|湖江湖廣曰湖也|鶘鵜鶘鳥名|猢獑獸名似猨|醐醍醐酥屬|𪏻黏也|䊀上同（黏也）|𪍒（黏也）|糊並俗（黏也）|弧弓也|乎極也辝也|𠂞古文（極也辝也）|𪕱𪖎𪕱似猨身白𦝫手有長白毛善超坂絕巖也亦作𪕮|瓠瓠𤬜瓢也又音護|葫葫瓜又草名|㾰㾰𤻙物在喉中|魱當魱魚名|箶箶簏箭室又竹名|䉉稜也|𥶜𥶜被也出韻略|𧛞𧛞䘸|㯛棗名也大而銳上者本作壺見爾雅|虖歎也
dLA古胡孤孤子又虜複姓有獨孤溫孤步鹿孤步六孤乙速孤氏古胡切二十八|苽說文曰雕苽一名蔣也|菰上同（說文曰雕苽一名蔣也）|胍胍𦘴大腹|𡗷大皃|姑舅姑又父之姊妹也|辜罪也|呱啼聲|泒水在鴈門|酤酤酒又胡五昆互二切|觚酒爵|蛄螻蛄蟲|箛竹名|鴣鷓鴣鳥|橭木名|𠷞漢書越王巫𠷞祠在雲陽亦小兒病鬼也|沽水名在高密|柧枛棱|𨬟字林曰𨮓𨬟魯矢左傳作僕姑|䉉方也本亦作觚|𧇡𧇡息禮記作姑|盬陳楚人謂鹽池爲盬出方言又音古|嫴說文曰保任也|罛魚罟|軱大骨也出莊子又盤骨|箍以篾束物出異字苑|䐻䐻脯|㼋瓜也
GLA同都徒黨也又步行也空也隷也同都切三十一|𨑒上同（黨也又步行也空也隷也同都切三十一）|屠殺也裂也刳也尸子曰屠者割𠟼知牛之長少史記樊噲少屠狗亦姓左傳晉有屠岸賈又音除|瘏病也|塗塗泥也路也亦姓風俗通云漢諫議大夫塗惲|途道也|酴酒名|駼騊駼馬山海經曰北海有獸狀如馬名曰騊駼|𤙛黃牛虎文|鵌鳥名與鼠同穴|涂水名在益州|梌木名|㭸上同（木名）|荼苦菜|圖爾雅曰謀也說文曰畫計難也|啚俗本音鄙|廜廜㢝草菴通俗文曰屋平曰廜㢝|䣝鄉名|菟菟丘地名又音吐|捈捈引|䣄邾下邑地名|䅷穗也|嵞嵞山古國名禹所娶也說文云會稽山也一曰九江當嵞也亦作峹又書作塗|峹上同（嵞山古國名禹所娶也說文云會稽山也一曰九江當嵞也亦作峹又書作塗）|𣘻楸木別名|鍍以金飾物又音度|䤅𨡭䤅醬也|蒤虎杖|䖘烏䖘楚謂虎也左傳作於菟|鷵爾雅曰鸄鶶鷵郭璞云似烏蒼白色|筡爾雅曰簢筡中言其中空竹類
HLA乃都奴人之下也乃都切七|㚢古文（人之下也乃都切七）|砮礪也|駑体馬字林曰駘也|帑說文曰金幣所藏也又他朗切|孥妻孥書傳云孥子也|笯鳥籠
iLA荒烏呼喚也說文曰外息也又姓列仙傳有仙人呼子先又虜複姓二氏前趙錄匈奴貴姓有呼延氏後漢書匈奴四姓有呼衍氏荒烏切又火故切十七|嘑哮嘑周禮曰雞人掌大祭祀夜嘑旦以嘂百官|虖姓也說文曰哮虖也|𧦝亦喚也|歑溫吹氣息也|戲古文呼字（溫吹氣息也）|謼大叫又火故切|膴無骨腊又音無|幠大也|葫大蒜也張騫使大宛所得之食之損人目|恗怯也|軤姓也|虍字林云虎文也|苸草多|雐鳥名|䰧鬼皃|滹滹池水名周禮作虖池
gLA五乎吾我也漢改中尉爲執金吾吾御也執金革以御非常亦姓漢有廣陵令吾扈又漢複姓五氏鄭公子有食采於徐吾之鄉後以爲氏左傳有鍾吾子其後氏焉昆吾氏昆吾國之後由吾氏秦相由余之後古有肩吾子隱者五乎切二十一|鼯似鼠一曰飛生亦作𪁙𧋋|𪁙（似鼠一曰飛生亦作𪁙𧋋）|𧋋並上同（似鼠一曰飛生亦作𪁙𧋋）|吳吳越又姓本自太伯之後始封於吳因以命氏後季札避國子孫家于魯衛之閒今望在濮陽|浯水名|䓊草名似艾|㹳猿屬|㻍琨㻍美石|珸上同（琨㻍美石）|蜈蜈蚣|郚鄉名在東莞|齬齟齬又音語|鯃魚名|娪美女|鋘錕鋘山名出金色赤如火作刀可切玉出越絕書|梧梧桐木名又姓|峿區峿山名|麌牝麕也又音俁|𦨼船名|祦福也
NLA則吾租積也稅也則吾切二|蒩茅藉封諸侯蒩以茅又子余切
ILA落胡盧說文曰飯器也亦姓姜姓之後封於盧以國爲氏出范陽又漢複姓八氏列子有長盧子孟子有屋盧子著書古尊盧氏後氏焉古蒲盧胥善弋亦姜姓左傳齊大夫盧蒲嫳後漢諫議大夫東郡索盧放何氏姓苑云盧妃氏濟陽人又有湛盧氏亦虜複姓五氏周書豆盧寧傳云其先慕容氏支庶後魏書有吐盧沓盧呼盧東盧等氏又三字姓有吐伏盧奚計盧莫胡盧三氏俗作盧落胡切三十四|鑪酒盆又鑪冶也|壚土黑而疏|籚籚西竹出會稽|蘆蘆葦之未秀者又蘆菔菜名亦虜姓後魏書莫蘆氏後改爲蘆氏|顱頭顱|髗上同（頭顱）|鱸魚名|攎攎斂|櫨𣝍櫨柱也又木名|轤𨏔轤圓轉木也|黸黑甚|獹韓獹犬名|鸕鸕鶿|艫舟後|纑布縷|瀘水名亦州名在蜀|瓐玉名|爐火牀出玉篇漢官典職曰尚書郎給女史二人著潔衣服執香爐燒熏|玈黑弓也|𢐸俗（黑弓也）|㢚廡也又力古切|𤮧酒器|嚧呼豬聲也|矑目童子也|㿖集略云癰類|㭔黃㭔木可染也|䰕䰕鬣|𧇄飯器說文曰缻也|𧆨上同（飯器說文曰缻也）|罏籀文（飯器說文曰缻也）|蠦蠦蜰一名蜚又名蝜蠜|㪭㪆也㪆音邸|𦿊𦿊會藥名
QLA素姑蘇紫蘇草也蘇木也滿也悞也又姓出扶風武邑二望素姑切四|穌息也舒悅也死而更生也|㢝廜㢝草菴又廜㢝酒元日飲之可除瘟氣|酥酥酪
PLA昨胡徂往也昨胡切四|䢐上同（往也昨胡切四）|殂死也|𣨐古文（死也）
hLA哀都烏安也語辝也說文曰孝烏小也爾雅曰純黑而返哺者謂之烏小而不返哺者謂之鵶又姓左傳齊大夫烏枝鳴又虜姓周上開府烏丸泥又虜三字姓北齊有烏那羅愛後魏書有烏石蘭氏烏落蘭氏哀都切二十一|嗚嗚呼|洿說文曰濁水不流者|汚上同又一故切（說文曰濁水不流者）|杇泥鏝|圬（泥鏝）|釫並上同（泥鏝）|鰞鰞鰂魚月令云九月有寒烏入水化爲烏鰂魚|歍口相就也|鎢鎢錥溫器|𢎰滿挽弓有所向|於古作於戲今作嗚呼|瑦美石|鄔縣名又音塢|盓盤盓旋流也又憂俱切|螐蚅螐蠋蟲也大如指白色|惡安也|扝引也|𦶀𦶀蓲荻也|㮧㮧椑青柹|鴮鴮鸅鵜鶘別名俗謂之掏河也
ALA博孤逋逋懸也博孤切十三|餔說文云申時食也音步|𥂈籀文（說文云申時食也音步）|晡申時|庯屋上平|陠上同（屋上平）|鵏鵏敊鳥名|𧻷䞮𧻷伏地|峬峬峭好形皃出字林|誧諫也|秿刈禾治秿|鯆鯆䱐魚名亦作𩶉|抪展舒也又布也
eLA苦胡枯枯朽也苦胡切十一|刳剖破又判也屠也|扝揚也|郀地名|軲車也又山名亦姓出字統|㱠㱠瘁說文枯也|跍跍蹲皃|挎空也坼也|𢎰又汙乎切|橭木四布也|鮬婢妾魚名
OLA倉胡麤說文云行超遠也又字統云警防也鹿之性相背而食慮人獸之害也故從三鹿倉胡切六|麁疎也大也物不精也本亦作麤|𧆓說文云草履也|𥼡米不精也|觕公羊傳曰觕者曰侵精者曰伐|𤿚皮皵惡也
FLA他胡㻌美玉他胡切十二|稌稻也又他古切|悇廣雅云懷憂皃|嶀山名|㻯玉名|𡸂山名|庩庯庩屋不平也|䞮𧻷䞮伏地|梌銳也|㻬㻬琈玉名|捈臥引|䩣𩍿䩣屧
ELA當孤都都猶摠也尚書大傳十邑爲都帝王世紀曰天子所宮曰都又姓蔡有臨漢侯都稽何氏姓苑云今吳興人當孤切七|𥳉竹名|闍闉闍城上重門又市遮切|𦘴𦘴胍大腹|𧷿賭勝出新字林|醏𨣱醏醬也|䩲折皮具牛牽船出通俗文
BLA普胡𥠵豆𥠵也普胡切十二|鋪鋪設也陳也布又音孚|鯆魚名又江豚別名天欲風則見|𩹲上同（魚名又江豚別名天欲風則見）|𨁏馬蹀跡也|痡病也又音孚|誧諫也又音普|𧱹豕名|陠衺也|墲規墓地也|䮒馬名|𢼹𢾱𢼹屋壞
#齊
PMQ徂奚齊整也中也莊也好也疾也等也亦州名春秋時齊國秦爲郡後魏置州因齊地以名之又姓風俗通氏姓篇序曰四氏於國齊魯宋衛是也徂奚切九|臍膍臍說文作𣬈𪗇|麡麡狼似麋而角向前入林則挂其角故常在淺草中逐入林則搏之出異物志又隮豺二音|蠐蠐螬蟲|𪗍等也|懠詩云天之方懠懠怒也又音劑|䶒好皃又子兮側皆二切|癠病也又音劑|𨥦利也又子兮切
IMQ郎奚黎眾也又姓黎侯國之後郎奚切二十一|犁墾田器亦耕也山海經曰后稷之孫叔均所作魏略曰皇甫隆爲燉煌太守教民作樓犁也|𤛿上同（墾田器亦耕也山海經曰后稷之孫叔均所作魏略曰皇甫隆爲燉煌太守教民作樓犁也）|莉芘莉織荊|黧黑而黃也|藜藜藿|鯬鯬鯠|𦃇縴𦃇惡絮|盠以瓢爲飲器也|邌徐行皃|𨛫亭名在上黨|廲廲廔綺窻|蔾蔾蘆藥名|筣竹名|驪穆天子駿馬名盜驪綠耳又力知切|瓈玻瓈寶玉|𥌛𥌛視|𩧋馬屬亦作𩥴|㦒㦒忚欺慢之語出方言|謧弄言又力支切|𨿯𨿯黃鳥
OMQ七稽妻齊也七稽切又七計切十|萋草盛皃|淒雲皃又千弟切|凄寒也|悽悲也痛也|鶈鳥名|郪縣名在梓州|緀緀裴文章相錯皃|齌說文云炊餔疾本子兮切又才細切|霋說文云霽謂之霋
EMQ都奚低低昂也俛也重也都奚切俗作仾二十三|氐氐羌說文至也|袛袛裯短衣|磾漢有金日磾說文云染繒黑石出琅邪山|鞮革履|腣腣胿胅腹胿音奚|羝羝羊|眡視也|隄防也|堤上同（防也）|岻山名|䧑纂文云姓也|奃大也|趆趨也|𡰖說文云㝿不能行爲人所引曰𡰖𡰢|鍉歃血器|柢木根也又音帝|䐎𦠓䐎強脂|䚣獸角不正|𥿄絲滓|揥指也|㓳剅㓳以刀解物|䬫䬫餬
GMQ杜奚嗁泣也說文曰號也杜奚切六十|啼（泣也說文曰號也杜奚切六十）|㖒並上同（泣也說文曰號也杜奚切六十）|蹏足也|蹄上同（足也）|𥶛竹名|提提攜|詆訶也又音底|瑅玉名|隄隄封漢書作提|桋樹之長條|題書題說文頟也|媞美好皃爾雅云媞媞安也說文又時尒切諦也一曰妍黠|𧡨視也說文顯也|綈厚繒也|罤兔網|𣹲研米槌也|𣖅上同（研米槌也）|締結又音悌|蕛爾雅曰蕛苵也郭璞云蕛似稗布地生穢草也或作稊|稊易曰枯楊生稊稊楊之秀也|𦯔草也|䬾餹䬾|醍醍醐|褆衣服好皃又是豸二音|鵜鵜鶘|荑荑秀|禔福也|䱱魚黑色|崹崥崹山皃|緹周禮注緹衣古兵服之遺色又音禮|鷤鷤䳏鳥又音遰|鼶爾雅曰鼶鼠夏小正曰鼶鼬則穴又音斯|騠駃騠馬名又丁奚切|折禮記云吉事欲其折折爾謂安舒貌|䨑霽雲出字林|銕字林云鐵名又說文云古鐵字|䱱魚四足者|䖙臥也又音梯|𥉘𥉘視困皃|䬫字木云寄食|䚣獸角不正又音低|𢔭久待|謕轉語又他兮切|𡰄㝿行皃|厗磄厗石也|𪂿𪂿鴂鳥春三月鳴也|鶙鶙鵳鳥|𡰖又音低|蝭蝭蟧又音帝|𨪉器也|鴺鷩鴺山雞名|㡗㡗帷|銻鎕銻火齊|鮷大鱧|趧趧鞻四夷樂也|𧋘螗𧋘小蟬|鮧鮎也|鯷上同（鮎也）|睼近視也又坐見
AMA邊兮豍豆名邊兮切十六|㡙車㡙|螕牛蝨|㯅㯅㯕小樹又樹裁也|𦱔𦱔麻|蓖上同（𦱔麻）|𦀘謬也又芳脂切|篦眉篦|梐門外行馬又防啓切|𥏠𥏠𥎬短皃|𨻼說文曰牢也所以拘罪也|狴上同又狴犴獸也（說文曰牢也所以拘罪也）|箄冠飾|鎞鎞釵|悂誤也|䚜橫角牛名
dMQ古奚雞說文曰知時畜也易曰巽爲雞古奚切十|鷄籀文（說文曰知時畜也易曰巽爲雞古奚切十）|稽考也同也當也留止也又山名亦姓呂氏春秋有秦賢者稽黃|枅承衡木也|笄女十有五而笄也|㮷㮷風扶枃木也|䗗螢火|卟字書云問卜也|𥝌木不長也又音礙|𨪴堅也
jMQ胡雞奚何也說文曰大腹也又東北夷名亦姓夏車正奚仲又虜複姓後魏書有達奚薄奚紇奚吐奚等四氏胡雞切十八|豯豕生三月|徯有所望也又胡禮切|㜎女奴|蹊徑路|螇螇螰似蟬|榽榽蘇木名似檀|騱馬前足白又驒騱野馬名驒音壇|胿腣胿|𡗞獸跡亦邑名在洛陽|郋里名|𪓷水蟲|傒東北夷名|嵇山名亦姓出譙郡河南二望|兮語助|鼷鼠名一名甘口鼠食人及鳥獸至盡皆不痛|蒵草名|貕幽州藪澤曰貕養出周禮
hMQ烏奚鷖鳧屬烏奚切十二|翳蔽也又烏計切|𧫦相然應辝|嫛人始生曰嫛婗出釋名|黳小黑|𦎣黑羊|㙠塵埃|䃜美石黑色|黟說文黑木也丹陽有黟縣|繄是也辝也又赤黑繒亦戟衣也|䚷誠也又於米切|𣕁𣕁㯕弩楔木也
gMQ五稽倪莊子云天倪自然之分亦姓後漢有楊州刺史倪諺五稽切十八|蜺似蟬而小|霓雌虹又五結五繫二切|郳郳城在東海|齯老人齒落復生|婗嫛婗|輗車轅端持衡木|棿上同（車轅端持衡木）|猊狻猊師子屬一走五百里|麑上同（狻猊師子屬一走五百里）|貎亦同|鯢雌鯨|兒姓也漢御史大夫兒寬千乘人|䘽衣裗謂之䘽也又妍啓切|𠆵𠆵㑮佯不知皃|觬角不正皃又研啓切|𣕁𣕁㯕弩楔|㪒㪏㪒毀又五禮切
iMQ呼雞醯酢味也俗作䤈呼雞切六|䒊痛聲|𦫬黃病色也|㡗𢅰㡗赤紙出埤蒼|橀橀木名|忚欺慢之皃
QMQ先稽西秋方說文曰鳥在巢上也日在西方而鳥西故因以爲東西之西篆文作㢴象形亦州名本漢車師國之地至貞觀討平以其地爲西州亦姓又漢複姓十一氏左傳秦帥西乞術宋大夫西鉏吾西鄉錯出世本又黃帝娶西陵氏爲妃名纍祖史記魏文侯鄴令西門豹周末分爲東西二周武公庶子西周爲氏晉有北海西郭陽何承天以爲西朝名士慕容廆以北平西方虔爲股肱何氏姓苑有西野氏西宮氏王符潛夫論姓氏志曰如有東門西郭南宮北郭皆是因居也先稽切十六|卤籀文（秋方說文曰鳥在巢上也日在西方而鳥西故因以爲東西之西篆文作㢴象形亦州名本漢車師國之地至貞觀討平以其地爲西州亦姓又漢複姓十一氏左傳秦帥西乞術宋大夫西鉏吾西鄉錯出世本又黃帝娶西陵氏爲妃名纍祖史記魏文侯鄴令西門豹周末分爲東西二周武公庶子西周爲氏晉有北海西郭陽何承天以爲西朝名士慕容廆以北平西方虔爲股肱何氏姓苑有西野氏西宮氏王符潛夫論姓氏志曰如有東門西郭南宮北郭皆是因居也先稽切十六）|𠧧古文（鳥棲說文曰或从木妻）|棲鳥棲說文曰或从木妻|栖上同（鳥棲說文曰或从木妻）|㽄瓦破聲|犀犀牛似豕角生鼻上又姓秦有犀首|嘶馬嘶|撕提撕|㾷痠㾷疼痛亦作廝|𤺊上同（痠㾷疼痛亦作廝）|㯕椑㯕|屖瓠屖說文遟也|𧬊悲聲|粞碎米|𠞂𠞮𠞂
FMQ土雞梯說文云木階也土雞切九|睇視也又徒計切|鷈𪇊鷈似鳧而小|𠥸臥也|䖙上同（臥也）|㔸匾㔸薄也|𨁃𨁃蹋|謕轉相誘語|𩤽匾㔸
CMA部迷鼙騎上鼓釋名曰鼙裨也裨助鼓節也呂氏春秋曰帝嚳令人作鼙鼓之樂也部迷切七|鞞上同（騎上鼓釋名曰鼙裨也裨助鼓節也呂氏春秋曰帝嚳令人作鼙鼓之樂也部迷切七）|椑圓榼漢書云美酒一椑|膍膍臍說文曰牛百葉也一曰鳥膍胵也亦作肶又音毗|崥崥崹|㼰瓦器|笓取蝦竹器
BMA匹迷磇磇霜石藥出道書匹迷切七|𨻼牢也所以拘罪人也|𠜱𠜱斫|𪄆𪄆鵊鳥名|錍錍斧又方支切|批擊也推也轉也示也|鈚鈚箭
NMQ祖稽齎持也付也遺也裝也送也祖稽切十五|賷俗（持也付也遺也裝也送也祖稽切十五）|䪡薑蒜爲之|齏上同（薑蒜爲之）|𧆌𧆌菜俗|𨥦利也又徂兮切|櫅櫅榆堪作車轂爾雅云白棗也|䂑𥏠䂑|擠排擠|齌炊餔疾也又才細切|躋登也升也又音霽|隮上同（登也升也又音霽）|麡又音齊音豺義見齊字中|𢥎𢥎疑人方言云吳人云之|啙弱也又此比切
DMA莫兮迷惑也莫兮切六|𡝡齊人呼母|䤍醭䤍醬上白也|麛鹿子|𧠠病人視皃|𪓬𪓬𪓹似龜堪啖多膏
HMQ奴低泥水和土也說文云水出北地郁郅北蠻中詩疏云泥中衛之小邑又姓出姓苑奴低切又奴計切四|埿塗也俗|屔受水丘也爾雅曰水潦所止爲屔丘郭璞云頂上汚下者亦作泥|臡雜骨醬也
eMQ苦奚谿爾雅曰水注川曰谿苦奚切八|嵠（爾雅曰水注川曰谿苦奚切八）|溪（爾雅曰水注川曰谿苦奚切八）|磎並上同（爾雅曰水注川曰谿苦奚切八）|鸂鸂鷘水鳥|檕爾雅云朹檕梅子如小柰也|螇土螽似蝗|𤳤小畚
dMg古攜圭圭璧說文曰瑞玉也上圜下方公執桓圭九寸侯執信圭伯執躬圭皆七寸子執穀璧男執蒲璧皆五寸周禮以青圭禮東方又孟子曰六十四黍爲一王十圭爲一合古攜切十五|珪古文（圭璧說文曰瑞玉也上圜下方公執桓圭九寸侯執信圭伯執躬圭皆七寸子執穀璧男執蒲璧皆五寸周禮以青圭禮東方又孟子曰六十四黍爲一王十圭爲一合古攜切十五）|邽下邽縣在馮翊上邽縣在隴西|閨閨閤|袿釋名曰婦人上服曰袿廣雅曰袿長襦也|窐甑下孔楚詞云珪璋雜於甑窐又音攜亦作𤮰|鮭魚名又音奎|𪊧鹿屬|洼姓也漢有大鴻臚洼丹又音哇|𨾴𨾴谷名|𡌲𡌲𧯠裂也|胿腣胿|𦓯田器|㰪邪也又紆佳切|茥缺盆草也又音睽
eMg苦圭睽異也乖也外也說文云目少睛苦圭切十五|奎星名|湀泉水通川又古比切|刲割剌又作𠝥|𠝥上同（割剌又作𠝥）|茥缺盆草|䯓肩骨|聧說文云耳不相聽方言云聾之甚者秦晉之閒謂之聧|鮭漢複姓漢有博士鮭陽鴻|䖯蠆也|蝰蛹也|㨒中鉤|楏橿也|藈藈𤬏亦作𤬉|𡐠說文曰盾握也
jMg戶圭攜提也離也又姓出何氏姓苑戶圭切二十四三|携俗（提也離也又姓出何氏姓苑戶圭切二十四三）|蠵大龜|鑴大鑊|窐甑下孔|𩰳上同（甑下孔）|畦菜畦|驨似馬一角|𪈥子𪈥鳥出蜀中|巂上同又子巂鳥出蜀中（似馬一角）|酅地名在東安平|𢥘離心也|𦋅姓也梁四公子𦋅闖之後|𣫴姓也|𡸔姓出纂文|纗說文曰維綱中繩也|讗說文曰自是也|㔒廣雅云挑剜刲㔒剈|䙵姓出說文|黊說文云鮮明黃也|𡰢𡰖𡰢也|眭目深惡視|觿角錐童子所佩又儇規切|䀘䀘能視也
cNQ人兮臡有骨醢也人兮切又音泥一
ZNQ成臡栘棠栘木也成臡切又余一以支二切一
hMg烏攜烓說文曰行竈也爾雅曰煁烓郭璞云今之三隅竈烏攜切三|𧟼上同（說文曰行竈也爾雅曰煁烓郭璞云今之三隅竈烏攜切三）|𤮰甑下孔
iMg呼攜睳目瞢呼攜切一
#佳
dPQ古膎佳善也大也好也古膎切二|街道也說文云街四通道也風俗通云街攜也離也四出之路攜離而別也
jPQ戶佳㥟心不平又恨也戶佳切八|鮭魚名出吳志|膎脯也𠟼食肴也|鞵屩也|鞋上同（屩也）|㨙挾物|䙎袖也|榽榽橀
CPA薄佳牌牌牓也薄佳切七|䱝魚名廣雅云黑鯉謂之䱝|𥱼大桴曰𥱼|郫縣名在蜀又音皮|蠯江東呼蚌長而狹者爲蠯|棑棑筏又音敗|犤牛也
dPg古蛙媧女媧伏羲之妹古蛙切七|緺青緺綬也|𧬭𧬭惰|腡手理也|蝸蝸牛小螺|騧馬淺黃色|歄歄𣢉
hPg烏媧蛙蝦蟆屬烏媧切二|鼃上同又戶媧切（蝦蟆屬烏媧切二）
ePg苦緺咼口戾也苦緺切六|喎上同（口戾也苦緺切六）|絓惡絲|䓙䓙雜離斜絕|𦹬𦹬斜|䦱斜開門國語云䦱門而與之言又王詭切
UPQ士佳柴薪也又姓高柴之後士佳切八|祡祭天燔柴|𪗶𪗶𪘲齒不正也|茈茈葫藥名|㧘積也詩云助我舉㧘|㾹瘦也|𨌅連車也一曰卻車抵堂也|查查郎又士瑕切
TPQ楚佳釵婦人岐笄也楚佳切九|靫鞴靫盛箭室鞴音步|𩑐頷𩑐頤傍|叉兩枝也說文曰手指相錯也|芆鬼芆草名|䐤䐤腵脯腊|㼮㼮㼽屑瓦洗器|差差殊又不齊|𠞊小矛又㔆𠞊也
iPg火媧竵物不正火媧切四|𦶎舛雜之皃|𠿎口偏|𩝨𩝨消食
MPQ㚷佳䍲羺䍲胡羊㚷佳切三|掜掜搦皃|誽言不正也
gPQ五佳崖高崖也五佳切七|涯水際|啀犬鬬|𪘲𪗶𪘲|猚說文云鳥名又水名在睢陽|厓山邊|𩂢雨聲
hPQ於佳娃美女皃於佳切五|洼水名|哇淫聲|㰪邪皃又音圭|唲唲嘔小兒言也
VPQ山佳崽呼彼之稱山佳切又山皆切三|籭竹器|諰語失也又思耳切
iPQ火佳㗨笑皃火佳切二|㰨㰰㰨氣逆病㰰昏狹切
KPQ丑佳扠以拳加人亦作搋丑佳切一
DPA莫佳䁲視皃莫佳切二|𩍃𩍃鞵履也
jPg戶媧鼃蛙屬戶媧切一
#皆
dQQ古諧皆說文作皆俱詞也古諧切十九|偕俱也|䕸麻稈|稭上同又古八切（麻稈）|喈鳥聲|階階級也說文曰階陛釋名曰階梯也如梯之有等差也|𦝨瘦也|薢薢茩藥名決明子是也又音懈|荄草根|痎瘧疾二日一發|堦堦砌|楷說文云木名孔子冢蓋樹也廣志云孔子冢上特多楷樹|鶛爾雅云鷯鶉其雄鶛|湝水流皃又戶皆切|街又音佳|𤭧牡瓦|𩘅疾風|蝔蟲名淮南子曰蝔知雨至蝔蟲大如筆管長三寸代謂之猥彴知天雨則於草木下藏其身又音諧|鍇䥫也
hQQ乙諧𢰇推也亦背負皃乙諧切一
jQQ戶皆諧和也合也調也偶也戶皆切九|𩤠馬性和也|骸骸骨|瑎黑石|湝風雨不止|龤說文曰樂和龤也|蝔又音皆|鞋履也又音膎|䓳䓳菔草
CQA步皆排推排釋名曰彭排軍器也彭帝也在旁排敵御攻也步皆切六|俳俳優|輫車箱|牌又薄佳切|猈短頭狗也|𩑢曲頤皃
dQg古懷乖睽也離也戾也背也古懷切四|𦮃上同（睽也離也戾也背也古懷切四）|𠦬說文曰背呂也𦟝字從此|㾩惡瘡
jQg戶乖懷抱也和也來也思也亦州名春秋時野王邑漢爲河內郡武德初於桐崖城置懷州又姓吳志顧雍傳有尚書郎懷敘戶乖切十二|褱俠也苞也歸也|櫰爾雅云槐大葉而黑曰櫰|槐木名又音回|㜳和也|𪊉戎狄鹽|㠢崴㠢不平皃|𤜄似牛四角人目|淮水名出桐栢又姓也|褢說文藏也|𧞷上同（說文藏也）|瀤北方水名
eQg苦淮匯澤名苦淮切又胡罪切三|㨤揩摩|㔞劥㔞人有力也
UQQ士皆豺狼屬禮記云仲秋之月豺乃祭獸士皆切四|儕等也輩也類也|麡又音齊音隮義見齊字中|𡺵山名在平林
TQQ楚皆差簡也楚皆切又楚宜楚牙楚懈三切二|䞗起去也
iQg呼懷虺虺尵馬病呼懷切又灰毁二音一
LQg杜懷尵杜懷切二|𩓬頭胅也出聲類
DQA莫皆埋瘞也藏也莫皆切四|薶上同（瘞也藏也莫皆切四）|霾爾雅曰風而雨土爲霾釋名曰霾晦也如物塵晦之色也|㦟慧也
SQQ側皆齋齋潔也亦莊也敬也經典通用齊也側皆切一
hQg乙乖崴崴㠢乙乖切四|碨碨䃁不平也䃁音鴉|䴜鹽也亦作𪊉|溾溾涹穢濁
JQQ卓皆𪘨齧也卓皆切二|榸枯木根出聲類
ITQ賴諧唻唱歌聲賴諧切一
eQQ口皆揩揩搱摩拭口皆切四|𦂄木絲|𢔡俳𢔡行惡|𥻄米之別名
MQQ諾皆搱諾皆切一
VQQ山皆崽方言云江湘閒凡言是子謂之崽自高而侮人也山皆切又山佳切二|𥳧𥳧籮古以玉爲柱故字從玉今俗作簁
gQQ擬皆𩂢雨聲擬皆切二|娾醜女皃
KQQ丑皆搋以拳加物丑皆切一
iQQ喜皆俙訟也喜皆切一
IQg力懷䐯䐯膗形皃惡力懷切一
UQg仕懷膗仕懷切二|𢶀𢶀倒損出方言
#灰
iSg呼恢灰說文曰死火也淮南子云女媧積蘆灰而止淫水呼恢切六|䖶豕掘地也|鼿上同（豕掘地也）|豗相豗擊|㾯馬病|虺虺尵
eSg苦回恢大也苦回切八|詼詼調|悝病也憂也一曰悲也亦大也又音里|魁魁帥一曰北斗星|䈛箭竹|㷇多也|顝大頭|盔盔器盂盛者也
hSg烏恢隈水曲也烏恢切十一|煨煻煨火|䋿五色絲飾|渨渨沒|椳戶樞|偎愛也亦國名|䬐風低皃|揋揋掎|𧤖角曲中也|葨山草|鰃魚也
jSg戶恢回違也轉也邪也又回中地名亦姓古賢者方回之後戶恢切十三|洄逆流|迴還也|槐木名五經通義曰士之冢樹槐春秋說題辝曰槐木者虛星之精也又姓魯大夫富槐之後|徊徘徊|瑰玟瑰火齊珠也又古回切|蚘人腹中長蟲|蛕上同（人腹中長蟲）|佪玉篇云佪佪惛也|烠光色|𤜡鄉名在睢陽|𩢱馬名|茴茴香草名
DSA莫杯枚枝也亦姓漢有淮南枚乘莫杯切十五|梅果名又姓出汝南本自子姓殷有梅伯爲紂所醢漢有梅鋗|媒媒衒說文曰謀也謀合二姓也|玟玟瑰|煤炱煤灰集屋也炱杜來切|脢脊側之𠟼又亡代切|脄上同（脊側之𠟼又亡代切）|腜孕始兆也|禖郊禖求子祭也|䍙雉網|莓莓莓美田也|塺塵也|鋂大鐶詩傳云一環貫二|䊈酒母|䤂醋之別名
dSg公回傀大皃又美也盛也偉也亦怪異公回切十|𤪿上同（大皃又美也盛也偉也亦怪異公回切十）|𠐤亦同|瑰瓊瑰石次玉又音回|瓌上同（瓊瑰石次玉又音回）|鞼說文云韋繡也又求位切|櫰山海經云中曲山有木如棠而圓葉赤實如木瓜食之多力又音懷|膭肥皃|䐩畜胎|䕇菜名又乎罪切
ISg魯回雷說文作靁云陰陽薄動靁雨生物者也又姓後漢有雷義魯回切十三|𩂩古文（說文作靁云陰陽薄動靁雨生物者也又姓後漢有雷義魯回切十三）|儡儡同|㔣勉也又盧對切|瓃玉器|櫑說文曰龜目酒尊刻木作雲雷之象象施不窮也|罍上同（說文曰龜目酒尊刻木作雲雷之象象施不窮也）|鑘劒首飾也亦作櫑|𦌵百囊魚網|鐳瓶也壼也|𤮚屋楝瓦也|畾田閒|轠轠轤不絕
GSg杜回穨暴風也杜回切十三|頹禿|㿉陰病|隤下墜也|墤上同（下墜也）|㢈壓也|魋獸似熊而小又人名|尵虺尵|蘈爾雅曰藬牛蘈郭璞云高尺餘許方莖葉長而銳有穗穗閒有華紫縹色|𧮓譟也|𧝋棺覆|蹪躓仆|𤗴𤗯𤗴屋破狀
OSg倉回崔姓也齊丁公之子食采於崔因以爲氏出清河博陵二望倉回切六|催迫也|縗喪衣長六寸博四寸亦作衰|𨻵𨻵崩隤也|𢕘行急皃|𧽠逼也
ESg都回磓落也亦作塠都回切十五|塠上同（落也亦作塠都回切十五）|頧母頧夏冠名禮記作追|䭔餅也|堆聚土|鴭雀屬|𢈹𢈹撲物也亦作𢮒|鎚治玉也周禮作追|搥摘也|䜃上同（摘也）|嵟高也|𩈜䩇𩈜醜面|𠂤說文曰小阜也|敦詩曰敦彼獨宿|𡏩𡏩坐皃出聲譜
QSg素回𤗯𤗯𤗴素回切六|挼擊也|䪎鞍邊帶也|毸毰毸鳳舞出楚詞|嗺嗺送歌|蓑蓑蓑蘂下垂皃本又音莎
PSg昨回摧折也阻也昨回切五|崔崔嵬又音催|慛傷也憂也|槯木名堪作杖|檇木有所擣也
CSA薄回裴衣長皃又姓伯益之後封于𨛬鄉因以爲氏後徙封解邑乃去邑從衣至燉煌太守裴遵始自雲中徙居河東本亦作裵薄回切十二|徘徘徊|培益也隄也助也治也隨也重也|陪陪廁也|𨛬鄉名在聞喜|䣙鄉名在扶風|婄婦人皃|棓姓也前漢爰盎之棓生所問占又龐項切|毰毰毸鳳舞|𤗏版也|𩑢曲頤也又音牌|輫車箱
ASA布回桮說文曰㔶也布回切三|杯上同（說文曰㔶也布回切三）|盃俗（說文曰㔶也布回切三）
BSA芳杯肧懷胎一月芳杯切八|坯未燒瓦也|㾦弱也|醅酒未漉也|衃說文曰凝血也|𩵣魚名|𤬃瓜𤬃|抔披抔
gSg五灰鮠魚名似鮎五灰切五|桅小船上檣竿也|嵬崔嵬|磑磨也又五內切|峞高皃
FSg他回𨌴車盛皃他回切七|𨋱上同（車盛皃他回切七）|㷟㷟燖毛出字林|蓷草名|推又昌隹切|藬牛蘈草也|㞜履屬有頸曰㞜
HSg乃回𢆃古之善塗者乃回切三|捼手摩物也又如和切|𨡌一𨡌飯出字林
NSg臧回嗺字書云口嗺頹臧回切四|脧赤子陰也|䘒上同見老子（赤子陰也）|𡱥上同出聲類（上同見老子）
#咍
iTQ呼來咍笑也呼來切三|㾂病也|𨸜㱾𨸜笑聲也
eTQ苦哀開開解亦州名本漢胊䏰縣地蜀置漢豐縣後魏置開州領東關東岡二郡又姓呂氏春秋云衛公子開方衛公說文作開經典亦作闓苦哀切五|㱾㱾𨸜|侅奇侅非常又古哀切|奒大皃|㚊多也
hTQ烏開哀悲哀也又姓漢有哀章烏開切六|埃塵埃|唉慢譍又於其切|㶼熱甚|欸歎也|毐說文云人無行也本又烏改切
GTQ徒哀臺土高四方曰臺又姓漢有侍中臺崇徒哀切十五|擡擡舉|菭魚衣濕者曰濡菭亦作苔說文曰菭水衣|苔上同又蘚也（魚衣濕者曰濡菭亦作苔說文曰菭水衣）|炱炱煤|嬯鈍劣|薹蕓薹|䈚竹萌|儓輿儓|檯木名|駘駑馬|𪒴𪑚𪒴大黑之皃又都來切|籉可禦雨也|跆蹋跆連手唱歌|𩿡鳥名
dTQ古哀該備也咸也兼也皆也又軍中約也古哀切二十|豥豕四蹄白|垓八極又垓下隄名沛在郡項羽敗處也|荄草根又古諧切|郂鄉名在陳留|㱯羊胎又音敳|剴大鎌一曰摩也又五哀切|陔殿階次之序|姟數也十冓曰姟|絯挂也出淮南子|晐備也兼也|峐爾雅云山無草木峐|祴祴夏樂章名|侅奇侅|賅上同又贍也（奇侅）|㨟㨟觸也|胲足大指毛𠟼也|䬵飴也|䶣牙也|䐩肥也
PTQ昨哉裁裁衣昨哉切九|纔僅也又藏代切|財貨也賄也|才用也質也力也文才也說文作才艸木之初也|材木梃也|䴭麴也|溨水名|鼒爾雅注鼎斂上而小口又音兹|𦬁蔽前草箭
ITQ落哀來至也及也還也又姓後漢來歙光武姑子蜀志云荊楚名族有黃門侍郎來桓俗作来洛哀切二十五|萊藜草亦州名漢掖縣屬東萊郡秦屬齊郡後魏分青州置光州取界內光水爲名隋改爲萊州又姓左傳晉與秦戰于郩萊駒爲右|郲地名|騋馬高七尺|崍崍嵦山也|斄鄉名在扶風又力之切|𤦃說文云瓄玉也亦作琜|𧳟貍也|猍上同（貍也）|淶水名出涿郡|鯠魚名|鶆鶆鳩鷹出埤蒼|䅘䅘麰之麥一麥二稃周受此瑞麥出埤蒼|𣮉毛起|䋱上同（毛起）|庲舍也|㾢惡病|棶棶椋木名|犛關西有長氂牛又音釐音茅|逨至也又力代切|𪎂小麥|麳上同（小麥）|𤲓耕外舊場|𪑚𪑚𪒴大黑|徠還也又力代切
NTQ祖才烖天火曰烖祖才切十二|灾上同（天火曰烖祖才切十二）|災籀文（天火曰烖祖才切十二）|𤆎古文（語助）|栽種也|哉語助|𡿧說文曰害也|菑上同亦作菑見經典（說文曰害也）|𢦏說文曰傷也烖字類從之省文|𦳦𦳦蒔|渽水名出蜀|睵睽也或作𥅰
OTQ倉才猜疑也恨也倉才切四|偲多才能也|睵睽也|䞗說文曰疑之等䞗而去也
CSA扶來𤗏版也扶來切二|㯁姓出姓苑
FTQ土來胎始也說文曰婦孕三月也土來切七|孡上同（始也說文曰婦孕三月也土來切七）|鮐魚也|台三台星又天台山名|邰地名后稷所封在始平或作斄|𧉟說文云黑貝亦珠𧉟|𩬠𩬠𩬳婦人僞髻出證俗文
jTQ戶來孩始生小兒戶來切八|咳小兒笑皃|頦頤下|㨟觸也|𧻲留意|䠽長身|䱺𩷕䱺雄蟹也|豥豕四蹄白
QTQ蘇來鰓魚頰蘇來切八|揌擡揌|粞碎米|䚡角中骨|顋顋頷俗又作腮|愢意不合也|𪃄鳥名|毢毰也
gTQ五來皚霜雪白皃五來切七|嵦崍嵦|敳有所理又隤敳八元名|㱯殺羊出胎|隑企立|剴又音垓|獃獃癡象犬小時未有分別
HTQ奴來能爾雅謂三足鼈也又獸名禹父所化也奴來切又奴登切二|㾍病也
ETQ丁來𪒴𪑚𪒴大黑皃丁來切二|懛懛獃失志皃
YyA昌求㹗昌來切牛羊無子一
BSA普才𡜊好色皃普才切一
#真
XVQ職鄰真真僞也又姓風俗通云漢有太尉長史真祐俗作真職鄰切十六|甄姓也陳留風俗傳云舜陶甄河濱其後爲氏出中山河南二望又舉延切|振又之刃切|禛以真受福|稹說文云穜穊也又之忍切|磌柱下石也|畛田界又之忍切|籈爾雅云所以鼓敔|侲字林云養馬者|桭屋梠|蒖茆也|唇驚也|㖘上同（驚也）|帪馬篼囊也|薽茢薽豕首草也|㲀擊也又音辰
KVQ丑人𤣆犬走草狀丑人切三|胂申也|縝縝紛
hVU於真因託也仍也緣也就也亦姓左傳遂人四族有因氏俗作囙於真切二十三|茵茵褥說文曰車重席也詩曰文茵暢轂文茵虎皮也|鞇上同（茵褥說文曰車重席也詩曰文茵暢轂文茵虎皮也）|禋祭也敬也𥛛籀文|𥛛籀文（祭也敬也𥛛籀文）|闉闉闍城上重門|駰白馬黑陰又於巾切|湮落也沈也|烟烟熅天地氣易作絪縕|氤氤氳元氣盛也|絪絪縕麻臬|垔塞也|陻（塞也）|㘻並上同（塞也）|堙亦上同又土山也（並上同）|洇水名|姻婚姻白虎通曰婦人因人而成故曰姻也字林云婚婦家姻壻家|婣古文出周禮（婚姻白虎通曰婦人因人而成故曰姻也字林云婚婦家姻壻家）|諲敬也|裀玉篇云衣身|𦎣黑羊|歅秦穆公時有九方歅一名皋善相馬也或作諲|㧢就也
QVQ息鄰新新故也亦姓國語晉大夫新穆子又複姓二氏何氏姓苑有新和氏陳留風俗傳云畢公封於新垣後因氏焉魏將新垣衍改爲梁垣氏息鄰切三|辛薑味也爾雅云太歲在辛曰重光又姓夏啓封支子于莘莘辛聲相近遂爲辛氏漢初辛蒲爲趙魏名將及徙家隴西便爲隴西人|薪柴也周禮委人掌祭祀之薪詩云翹翹錯薪
ZVQ植鄰辰辰象也又辰時也爾雅曰太歲在辰曰執徐植鄰切十三|晨早也明也|䢅古文（早也明也）|敐擊聲|宸屋宇天子所居|鷐鷐風鸇也|麎牝麋|桭兩楹閒又音真|茞草名|屒重脣|臣伏也男子賤稱春秋說曰正氣爲帝閒氣爲臣孝經說曰臣者堅也|䢻地名|䣅姓也
cVQ如鄰仁仁賢莊子曰愛人利物謂之仁釋名曰仁忍也好生惡殺善惡含忍也又姓姓苑云彭城人也如鄰切三|朲屋上閒朲|人天地人爲三才亦漢複姓十氏左傳有寺人披齊有徒人費周有王人子突魯有雍人高宋有廚人僕鄭有大夫子人九國語吳有行人儀孔子弟子左人郢漢司空掾封人嬰後漢司徒聞人襲
bVQ食鄰神靈也易繫辭曰陰陽不測之謂神亦姓風俗通云神農之後漢有騎都尉神曜何氏姓苑云今琅邪人食鄰切二|晨又植鄰切
OVQ七人親愛也近也說文至也七人切三|寴（愛也近也說文至也七人切三）|𡪔並古文（愛也近也說文至也七人切三）
jfR下殄礥鞭也下珍切又下憐切三|𧥺誑也|㘋難也
aVQ失人申身也伸也重也容也篆文作申又辰名太歲在申曰涒灘亦州名春秋時屬楚秦南陽郡後魏爲郢州周爲申州又姓出魏郡亦漢複姓四氏莊子有申徒狄漢丞相申屠嘉長沙太傳申章昌左傳齊有申鮮虞失人切十六|伸舒也理也直也信也|紳大帶|娠孕也又脂刃切|呻呻吟|𣢘（呻吟）|𠲳並上同（呻吟）|眒鳥獸驚皃|胂脢也|㑗說文曰神也又姓出姓苑|𩉼革帶|𠭙引也|身親也躬也|柛爾雅木自𡚁曰柛謂𡚁踣也|䰠山海經云青要山䰠也說文曰神也|訷訷說信也
AVE必鄰賓敬也迎也列也遵也服也說文作賓所敬也又姓左傳齊有大夫賓須無必鄰切十|𧶉古文（敬也迎也列也遵也服也說文作賓所敬也又姓左傳齊有大夫賓須無必鄰切十）|濱水際|檳檳榔|䚔䚔𧢜暫見|顮頭憤懣也|儐敬也又音殯|鑌鑌鐵爲刀甚利|矉說文曰恨張目也|𩴱鬼皃
IVQ力珍㷠鬼火說文曰兵死及牛馬之血爲㷠今作粦同力珍切又力刃切二十三|燐上同（鬼火說文曰兵死及牛馬之血爲㷠今作粦同力珍切又力刃切二十三）|鄰近也親也說文曰五家爲鄰俗作隣|轔車聲|嶙嶙峋深崖狀也|粼水在石閒亦作磷又力刃切|磷上同（水在石閒亦作磷又力刃切）|疄田壟|麟仁獸爾雅云麕身牛尾一角|麐上同（仁獸爾雅云麕身牛尾一角）|鱗魚甲又姓左傳宋大夫鱗朱|璘璘㻞文皃|駗馬色|翷翷𦐈飛皃|𧲂獸名似豕黃身白首出埤蒼|瞵視皃|獜獜獜犬健也出說文|驎騏驎白馬黑脊|壣菜畦|𩻜魚名|鏻健皃又力丁切|繗紹也|潾水名
fVY巨巾𥎊矛柄也又鉏耰也古作矜巨巾切五|㨷拭也|堇黏土|墐上同（黏土）|魿蟲魚連行又力丁切
JVQ陟鄰珍貴也重也寶也俗作珎陟鄰切三|鎮戍也又陟刃切|填壓也又音田
LVQ直珍陳陳列也張也眾也布也故也亦州名本太昊之墟畫八卦之所周武王封舜後胡公滿於陳楚滅陳爲縣漢爲淮陽國隋爲陳州又姓胡公滿之後子孫以國爲氏出潁川汝南下邳廣陵東海河南六望又虜三字姓後魏書有侯莫陳氏直珍切又直刃切五|敶古文說文本直刃切𠛱也（陳列也張也眾也布也故也亦州名本太昊之墟畫八卦之所周武王封舜後胡公滿於陳楚滅陳爲縣漢爲淮陽國隋爲陳州又姓胡公滿之後子孫以國爲氏出潁川汝南下邳廣陵東海河南六望又虜三字姓後魏書有侯莫陳氏直珍切又直刃切五）|䍶獸名似羊目在耳後|趁越履|塵說文本作𪋻鹿行揚土也
NVQ將鄰津說文作𣸁水渡也將鄰切五|𦪉古文（說文作𣸁水渡也將鄰切五）|璡美石次玉|濜氣之液也本亦作𧗁|𦘔飾也
YVQ昌真瞋怒也說文曰張目也又作嗔昌真切六|嗔上同本又音填（怒也說文曰張目也又作嗔昌真切六）|謓亦上同說文恚也（上同本又音填）|䐜𠟼脹起也|𣞟纑也|縝上同（纑也）
PVQ匠鄰秦州名古西戎地春秋時爲秦國後并天下爲隴西郡漢武分置天水郡後魏改爲秦州因邑以爲名又姓秦自顓頊後子嬰既滅支庶以爲秦氏也匠鄰切三|螓螓蜻似蟬而小|𤚩牛名
lVQ翼真寅辰名說文作𡩟翼真切又以之切六|夤夤緣連也又敬惕也|𦟘脊𦟘|蔩蔩菟瓜|螾寒蟬|𡐔𡐔場
MVQ女鄰紉單繩女鄰切一
BVE匹賓繽繽紛匹賓切五|䎙飛皃|𩴱說文云鬼皃又音頻|𢣐敬也|𩰝𩰝爭說文作𩰝鬬也
CVE符真頻數也急也比也說文作𩔤水厓人所賓附𩔤蹙不前而止又姓風俗通云漢有酒泉太守頻暢符真切十四|蘋大萍也又作薲|薲上同（大萍也又作薲）|嬪婦也一曰妻死曰嬪|㰋木名|玭珠也又步田切|蠙珠母又步田切|獱獺之別名|顰顰眉蹙也|𧭹多言|嚬笑也|𩴱鬼皃|𦇖擣衣|𡤉𡤉姿
gVY語巾銀周禮荊州其利銀爾雅曰白金謂之銀鍾山之寶有銀燭謂有精光如燭銀重八兩爲一流也語巾切十六|㹞犬聲|狺上同（犬聲）|䖜兩虎爭聲|檭木名色白|鄞縣名在會稽又音齗|圁圁陽縣名在西河|誾和也又誾誾中正之皃又姓何氏姓苑云今廣平人|訔上同（和也又誾誾中正之皃又姓何氏姓苑云今廣平人）|嚚愚也|䓄亭名在江夏|珢說文云石之似玉者|䴦獸名似貉而八目出山海經|垠垠岸也|𪛊大篪|泿水名
dVY居銀巾釋名曰巾謹也二十成人士冠庶人巾當自謹修於四教居銀切一
dVo居筠麏鹿屬居筠切六|麇（鹿屬居筠切六）|麕並上同（鹿屬居筠切六）|頵大頭|莙爾雅云莙牛薻似薻而葉大又渠殞切|汮水名
kVo爲贇筠竹皮之美質也爲贇切四|囩田十二頃說文回也|縜綱細|荺藕根小者
eVo去倫囷倉圓曰囷去倫切又咎倫渠殞二切七|箘桂又竹名又渠殞切|箟箭竹|輑車軸相逢|蜠大貝又渠殞切|峮嶙峮山相連皃|𡈋說文曰宮中道又苦本切
DVI武巾珉美石次玉亦作玟琘琘武巾切十九|岷山名江水所出亦州名秦隴西郡之臨洮縣也後魏置岷州因山以爲名|罠彘網|閩閩越蛇種也又音文|緍錢貫亦絲緒釣魚綸也又姓出何氏姓苑|䪸強也|笢竹膚又亡忍切|旻仁覆愍下謂之旻天|旼和也|痻病也|闅亭名在汝南|汶汶山郡又音問|捪撫也|忞自勉強也|盿視皃|睧上同（視皃）|錉筭稅也|𪂆鳥似翠而赤喙|鈱鈱稅
CVI符巾貧乏也少也符巾切二|𡧋古文（乏也少也符巾切二）
hVY於巾𪔗鼓聲於巾切三|鼘上同又烏玄切（鼓聲於巾切三）|駰馬陰淺黑色又音因
hVo於倫贇美好也於倫切四|奫泉水|頵說文曰頭頵頵大也|蝹蝹蝹龍皃
AVI府巾彬文質雜半說文云古文份也府巾切十三|斌上同（文質雜半說文云古文份也府巾切十三）|份說文曰文質備也|玢文采狀也|豳地名本豳國之地又有豳城公劉所邑蓋此地也因以名州亦作邠又姓出姓苑|邠州名|汃西方極遠之國|霦璘霦玉光色|㻞上同（璘霦玉光色）|𥇖大目皃|攽說文分也博雅減也|虨虎文俗作𧈇又普巾方閑二切|砏水名又石
DVE彌鄰民說文曰眾萌也彌鄰切五|闅低目視也|睧視皃又音旻|泯沒也又亡忍切|怋亂也
#諄
XVg章倫諄至也誠懇皃也章倫切五|惇心實也又音敦|𥇜鈍目也又音稕|肫鳥藏|訰亂言之皃
KVg丑倫椿木名丑倫切八|楯木名|輴載柩車也|䡅上同（載柩車也）|鶞爾雅云春鳸鳻鶞鳻音汾|杶書曰杶榦栝柏|櫄說文同上（書曰杶榦栝柏）|瑃玉名
LVg直倫䣩純美酒也直倫切又常倫切二|㡒布貯曰㡒
QVg相倫荀草名又姓本姓郇後去邑爲荀今出潁川相倫切十四|郇地名在河東解縣周文王子封於郇後以爲氏王莽時有郇越|詢咨也|眴眩又音舜|峋嶙峋|珣玉名|𣖼說文曰大木也可以爲鉏柄又祥勻切|洵水名在晉陽|恂信也|畇爾雅曰畇畇田也謂墾辟也又音勻音旬|檈承食案也|槆杶木別也|姰狂也又音縣|㰬氣逆也又信也
ZVg常倫純篤也至也好也文也大也常倫切十三|蓴蒲秀|蒓水葵|醇厚也醲也|鶉䳺鶉也莊子曰田鼠化爲鶉淮南子曰蝦蟆化爲鶉字林作𨿡|𦎫說文曰孰也凡從𦎫者今作享同|陙小阜名也|𢗋憂悶|錞樂器鳴之所以和鼓|淳清也朴也又姓何氏姓苑云今吳人|𡗥大也|焞明也又他昆切|䣩美也
cVg如勻犉黃牛黑脣如勻切四|𩀋鷚鷄晚生者|瞤目動|眴上同（目動）
bVg食倫脣口脣食倫切五|漘水際|䔚牛䔚草似蘭青黑色|㸪牛行遟也又音巡|紃環綵絛也又音巡
IVg力迍淪沒也力迍切十五|倫等也比也道也理也又姓風俗通曰黃帝樂人伶倫氏之後|論言有理出字書又盧昆切|䑳船䑳|輪車輪周禮曰軫之方以象地蓋之圜以象天輪輻三十以象日月|陯山阜陷也|鯩魚名|蜦神蛇能興雲雨文字集略云蝦蟆大如屨能食蛇也又力計切|棆木名|綸絲綸又姓魏志公孫文懿臣綸直又音鰥|惀欲曉知也|侖說文思也|踚行也|掄擇也周禮曰凡邦工入山林材而掄不禁又力昆切|䈁䈁子船具
JVg陟綸屯難也厚也陟綸切又徒渾切四|窀窀穸下棺|迍迍邅本亦作屯易曰屯如邅如|㡒布貯
OVg七倫逡逡巡退也七倫切十|竣止也倨也一曰改也|皴皮細起也|㕙東郭㕙古之狡兔也又音俊|壿舞皃|捘推也左傳云捘衛侯之手又子寸切|竴喜也|踆退也|𠣟上同（退也）|夋倨也
NVg將倫遵循也率也行也習也將倫切五|跧蹙也又阻圓切|僎鄉飲酒禮僎者降席而遵法也或作遵又音撰|嶟山皃|鷷西方雉名
YVg昌脣春四時之首尚書大傳曰春出也萬物之出也春秋說題辭曰春蠢也蠢興也春秋繁露曰春喜氣又姓何氏姓苑云春申君黃歇之後昌脣切一
PVg昨旬鷷西方雉名昨旬切一
lVg羊倫勻徧也齊也說文少也从勹二羊倫切二|畇詩曰畇畇原隰又音荀音旬
RVg詳遵旬十日曰旬詳遵切十七|𠣙古文（十日曰旬詳遵切十七）|巡逡巡說文曰視行也|馴擾也從也善也|循善也|揗手相安慰|㸪牛行遟又音脣|紃環綵絛又食綸切|䋸縫也|𪀠𪀠䳦小鳥出字統|洵均也龕也|楯楯闌檻也|灥三泉相通|㽦均也|𧾩說文曰走皃也|畇墾田|䖲蟲名
dVk居勻均平也又學曰成均亦州名春秋及戰國時並屬楚秦屬南陽郡隋爲均州取汮水以名之居勻切四|鈞二三十斤也又姓風俗通云楚大夫元鈞之後漢有侍中鈞喜|袀戎衣也左傳曰均服振振字書從衣|汮水名出析縣北山入沔今作均
fVU渠人𧼒行也渠人切又去忍切一
BVI普巾砏砏磤大雷普巾切又布巾切二|虨虎文也俗作𧈇
#臻
SWQ側詵臻至也乃也側詵切十一|蓁草盛皃|搸聚也又琴瑟音|溱水名在河南|潧水名在鄭國出說文此水南入洧詩作溱洧誤|𣓀𣓀栗|榛上同（𣓀栗）|樼亦同（𣓀栗）|瀙字林云水名在豫州|𨬖埤蒼云小鑿|轃說文曰大車簀也
VWQ所臻莘地名在虢又姓所臻切二十|㜪有㜪國名|扟從上擇取物也|駪馬多|籸粉滓|䯂眾盛皃|甡眾多皃|兟進也|詵眾人言也|侁行皃詩云侁侁征夫|𩺵魚尾長也詩云有莘其尾字書從魚|屾說文云二山也|𨐔多也|燊熾也|𦐹羽多|𢓠往來之皃|𣘘方言云杠東齊海岱之閒謂之𣘘杠牀前橫也|阠八陵東名阠又息進切|姺女字|㾕寒病
UWQ士臻𦿒木叢生士臻切三|㲀呂氏春秋注云㲀㲀動而喜皃又音真|帘幕也又音廉
#文
DXM無分文文章也又美也善也兆也亦州名禹貢梁州之域自戰國時宋及齊梁皆諸羌所據後魏平蜀始置州亦姓漢有廬江文翁無分切十六|聞說文曰知聲也又音問|𦖞古文（說文曰知聲也又音問）|彣青與赤雜|紋綾也|雯雲文|馼馬赤鬣縞身目如黃金文王以獻紂|蟁爾雅曰鷏蟁母郭璞云似烏𪇰而大黃白雜文鳴如鴿今江東呼爲蚊母俗說此鳥常吐蚊因名云說文曰齧人飛蟲也|蚊上同（爾雅曰鷏蟁母郭璞云似烏𪇰而大黃白雜文鳴如鴿今江東呼爲蚊母俗說此鳥常吐蚊因名云說文曰齧人飛蟲也）|䘇亦同出漢書|䰚摩也|鳼鳥也爾雅曰鶉子鳼|闅俗作閿說文曰低目視也弘農湖縣有闅鄉汝南西平有闅亭|汶黏唾又音旻問|鼤班鼠|閩閩越也又音旻
kXs王分雲說文云山川气也从雨云象雲回轉形河圖曰雲者天地之本傅子曰以雲母飾車謂之雲母車臣不得乘之又姓縉雲氏之後又後魏書宥連氏後改爲雲氏王分切二十二|芸香草也說文云似目宿淮南王說芸草可以死復生雜禮圖曰芸蒿也葉似邪蒿香美可食也|蕓蕓薹菜名|𦔐說文曰除苗閒穢也|𦓷上同（說文曰除苗閒穢也）|耘亦同|鄖國名|妘女字又姓|紜紛紜|溳水名在南陽一云在美蔡陽|澐江水大波|云辝也言也說文古文雲字亦姓出自祝融之後|篔篔簹竹名|䢵邑名|員益也說文作員物數也又音圓又音運姓也|𪔅籀文（益也說文作員物數也又音圓又音運姓也）|愪憂也|沄說文云轉流也|𧶊亂也|耺耳中聲|橒木名|䉙竹名
hXs於云熅烟熅天地氣也易作絪縕於云切十|氳氤氳元氣|縕亂麻又於粉切|馧香也|蒕葐蒕盛皃|𥠺上同（葐蒕盛皃）|䡝轒䡝兵車又於粉切|蘊蘊積也又於粉切|蝹龍皃|㚃鬱也
CXM符分汾水名在太原本漢兹氏縣地屬西河郡魏於兹氏縣置西河郡今州城是也符分切三十七|墳墳籍又墓也|氛氛氳祥氣|𣱦俗（氛氳祥氣）|鼖大鼓周禮鼓人掌六鼓以鼖鼓鼓軍事|䩿上同（大鼓周禮鼓人掌六鼓以鼖鼓鼓軍事）|𪔵亦同|濆水際也又水名|焚焚燒|燌上同（焚燒）|羒白羝羊也|豶豕也|頒魚大首亦眾皃又布還切|羵土中怪羊|䴅似鵠白身三目赤尾六足|枌白榆木名|鳻春鳸鳻鶞亦作𩿈又說文曰鳥聚皃一曰飛皃|蕡草木多實|萉古文（草木多實）|橨枰仲木別名出埤蒼|棼複屋棟也|賁三足龜|葐葐蒕|魵魚名|𧮱谷名在臨汾|妢周禮考工記云妢胡之笴|棻香木名也|梤上同（香木名也）|肦大首皃|䫶醜皃|鐼飾也說文曰鐵類讀若薰又音訓|馩馩馧香氣|馚上同（馩馧香氣）|㞣草初生香分布也又音芬|鼢田中鼠又音憤|蚡上同（田中鼠又音憤）|轒轒䡝兵車
AXM府文分賦也施也與也說文別也府文切六|饙一蒸飯也|餴上同（一蒸飯也）|扮握也|𡊅埽棄之也又方問切|𣯻𣯻毭罽也
fXs渠云羣羣隊也說文輩也亦作群渠云切五|帬說文曰下裳也釋名曰帬羣也連接羣幅也|裠上同亦作裙（說文曰下裳也釋名曰帬羣也連接羣幅也）|宭羣居也又音君|𤸷𤹝也
iXs許云薰香草韻略曰薰陸香出大秦國亦姓出何氏姓苑許云切十二|曛日入也又黃昏時|勳功勳也|勛古文（功勳也）|熏火氣盛皃|燻上同（火氣盛皃）|獯北方胡名夏曰獯鬻周曰獫狁漢曰匈奴|纁三染絳|醺著酒|葷臭菜|焄禮曰焄蒿悽愴鄭玄云焄謂香臭也|臐儀禮鄭玄注云羊曰臐豕曰膮皆香美之名膮呼堯切
dXs舉云君白虎通曰君者羣也羣下之所歸心也荀卿子曰君者儀也民者影也儀正則影正君者盤也民者水也盤圓則水圓又君者民之源也源清則流清源濁則流濁舉云切八|軍軍旅也周禮夏官司馬曰凡制軍萬有二千五百人爲軍王六軍大國三軍次國二軍小國一軍軍將皆命卿又漢複姓二氏禮記有將軍文子晉有太傅參軍襄城冠軍夷|皸足拆|桾桾櫏木也|䇹竹名|莙牛藻菜也|宭羣居|鮶蟲名水鮶如魚乘焉
BXM撫文芬芬芳又姓戰國策晉有大夫芬質撫文切十三|紛紛紜眾也亂也|𢁥巾也亦作帉|𣬩毛落|衯說文曰長衣皃|𦐈翻翷𦐈飛皃|棻說文云香木也|砏砏汃水石|㞣草木初生香分布也|氛氛侵妖氣|雰上同又霧氣也（氛侵妖氣）|𩰟𩰝𩰟之皃|錀埤蒼云兔奄錀
#欣
iYc許斤欣喜也亦州名本漢陽曲縣地隋置欣州因欣口爲名許斤切六|忻上同（喜也亦州名本漢陽曲縣地隋置欣州因欣口爲名許斤切六）|昕日欲出也|訢喜也|炘熱皃|邤邤鄰地名
hYc於斤殷眾也正也大也中也說文从㐆殳作樂之盛稱殷亦姓武王剋紂子孫分散以殷爲氏出陳郡於斤切四|慇慇懃|㶏水名在潁川|溵上同（水名在潁川）
fYc巨斤勤勞也盡也巨斤切八|芹水菜食之宜丈夫呂氏春秋曰菜之美者雲夢之芹|懃慇懃|慬憂哀|懄上同（憂哀）|瘽病也|𥎊矛柄古作矜|蘄草也又巨希切
dYc舉欣斤十六兩也說文曰斫木也又虜複姓二氏後魏書去斤氏後改爲艾氏奇斤氏後改爲奇氏舉欣切四|筋筋骨也說文曰𠟼之力也从力𠟼竹竹物之多筋者又姓出姓苑|䈥俗（筋骨也說文曰𠟼之力也从力𠟼竹竹物之多筋者又姓出姓苑）|釿說文云劑斷也本宜引切
gYc語斤䖐虎聲語斤切十二|㹜犬相吠也|圻圻堮又岸也|垠上同（圻堮又岸也）|齗齒根𠟼也|齦上同（齒根𠟼也）|䴦獸似貉也|斦二斤|𪛊大篪|䓄亭名在江夏郡|狺犬爭|鄞縣名在會稽郡
#元
gZs愚袁元大也始也長也氣也又姓左傳衛大夫元咺又後魏孝文改拓拔爲元氏望在河南愚袁切二十二|原廣平曰原亦州名漢高平縣後魏爲鎮州又改原州蓋取高平曰原爲名又姓孔子弟子有原憲說文本作𨙅原即與𠫐同|𨙅周禮有𨙅師注云𨙅地之廣平者|源水原曰源又姓禿髮傉檀之子賀入後魏魏太武謂之曰與鄉同源可爲源氏說文本作𠫐篆文省作原後人加水|厵上同（水原曰源又姓禿髮傉檀之子賀入後魏魏太武謂之曰與鄉同源可爲源氏說文本作𠫐篆文省作原後人加水）|杬木名出豫章煎汁藏果及卵不壞|嫄姜嫄帝嚳元妃|沅水名在武陵郡鐔成西亦云在牂牁|騵赤馬白腹|黿似鼈而大紀年曰穆王三十七年起師至九江以黿爲梁|羱羱羊角大者可爲器又五丸切|蚖蠑蚖蜥蜴也一名守宮字林云在壁曰蝘蜓在洲曰蜥蜴|𧔞晚蠶周禮禁原蠶鄭注云原再也俗從䖵|芫草名有毒可爲藥也|邧地名|榞實如甘蕉而皮可食|謜徐語孟子云故謜謜而來|㹉獸如牛也|䬧䬧餌又五丸切|獂豕屬又音桓|阮五阮郡出史記又元遠切|蒝莖葉布也
kZs雨元袁姓出陳郡汝南彭城三望本自胡公之後雨元切十六|爰於也行也爲也哀也引也亦姓出濮陽亦舜裔胡公之後袁或作爰|垣垣墉也又姓漢西河太守洛陽垣恭也|𩫧籀文（垣墉也又姓漢西河太守洛陽垣恭也）|園園圃亦姓|援援引也又爲眷切|榬絡絲籰|轅車轅方言云轅楚衛謂之輈又姓左傳陳大夫轅濤塗之後又漢複姓有軒轅氏|鶢鶢鶋海鳥|媛嬋媛枝相連引又爲眷切|洹水名亦縣名在相州又音桓|溒纂文云姓也玉篇云水流皃|𧻚易田名也|蝯蝯猴五百歲化爲玃爾雅曰猱蝯善援|猨上同（蝯猴五百歲化爲玃爾雅曰猱蝯善援）|猿俗（蝯猴五百歲化爲玃爾雅曰猱蝯善援）
CZM附袁煩勞也說文曰熱頭痛也附袁切三十八|番說文曰獸足謂之番經典作番又翻盤潘三音書亦音波|𨆌足有文也說文同上（說文曰獸足謂之番經典作番又翻盤潘三音書亦音波）|蹯亦同上見左傳（足有文也說文同上）|繁穊也多也|蘩皤蒿|薠似蘋而大|樊樊籠亦姓周宣王封仲山甫於樊後因氏焉今在南陽|𢶃𢶃捼也|繙繙㠾亂取㠾於元切|燔炙也|膰祭餘熟𠟼|瀿水名玉篇云水暴溢也|羳羊黃腹也|𩐏百合蒜也|鷭鷭䳇鳥|蟠𧑓負又扶干切|蕃茂也息也滋也又音藩|蠜䘀螽|礬礬石|𪖇鼠名|𨟄鄉名在京兆杜陵|鐇廣刃斧|璠璠璵魯之寶玉|笲竹器禮記云婦執笲|𥢌稻也出齊人種術|㺕犬鬬也|襎襎裷幭也|袢絺綌詩云是紲袢也|棥藩屏|䋣馬飾名也|𥿋上同（馬飾名也）|墦冢也|𢐲生養也|䮳上同（生養也）|旛旐也|𧢜䚔𧢜|藩𧂇䒞葉如韭又音翻
BZM孚袁飜覆也飛也孚袁切十|翻上同（覆也飛也孚袁切十）|旛旌旐摠名|番數也遞也又盤潘煩三音|幡說文曰書兒拭觚布俗通爲幡|𤄫大波|𤄜米汁|轓車大箱也|繙繽繙風吹旗皃|反斷獄平反又方晚切
iZs況袁暄溫也況袁切十九|煖上同（溫也況袁切十九）|喛恐懼|萱忘憂草說文又作藼蕿|䁔大目|諼詐也|塤說文作壎樂器也以土爲之六孔釋名曰塤宣也聲濁喧然世本曰暴辛公作塤|壎上同（說文作壎樂器也以土爲之六孔釋名曰塤宣也聲濁喧然世本曰暴辛公作塤）|䳦䳦鴝鳥名|吅喚聲又私全切|貆獸名詩云有縣貆兮又丸歡二音|喧大語也|諠諠譁亦作喧讙|愋恨也|讙讙囂皃也|翧飛來|䚭揮角|䚙角匕又許羈切|蝖蠀螬
hZs於袁鴛鴛鴦匹鳥於袁切十八|冤屈也枉也曲也又冤句縣在曹州句音劬|㠾繙㠾|鵷鵷鶵似鳳|𣹠水名|惌惌枉|䥉鋤頭曲鐵|宛屈草自覆又宛縣在南陽又音苑|蜿蜿蜿龍狀也又音苑|𩝸貪也|蒬棘蒬草名|怨怨讎又於願切|𡟰𡟰𡟰美也|葾敗也|䡝兵車|䩩量物之具又於阮切|裷襎裷|眢目空皃又一丸切
gZc語軒言言語也字林云直言曰言荅難曰語釋名曰言宣也宣彼之意也又姓孔子弟子有言偃語軒切五|琂石似玉|甗無底甑也又語戰切|䇾大簫|䓂草名
eZc丘言攑舉也丘言切二|䞿走皃又虛言切
iZc虛言軒軒車又姓軒轅之後漢有諫大夫軒和虛言切六|掀以手高舉|鶱飛舉皃|䡣車前輕也|蓒蓒芋草名|䞿走皃
dZc居言𢳚𢳚子摴蒱采名居言切十二|𣘖上同（𢳚子摴蒱采名居言切十二）|靬乾革又驪靬縣在張掖又下憚切又口旦切|鞬馬上盛弓矢器|𩎀上同（馬上盛弓矢器）|㓺以刀去牛勢或作犍|犍犗牛名又犍爲郡|腱筋也一曰筋頭|騝騮馬黃脊曰騝|䭈粥也亦作飦|𩱡上同（粥也亦作飦）|𩱤籀文（粥也亦作飦）
hZc謁言蔫蔫菸也謁言切二|焉安也又不言也
AZM甫煩蕃蕃屏甫煩切六|藩籬也亦藩屏也|轓車箱又音幡|鱕魚有橫骨在鼻前如斤斧|籓大箕一曰蔽也|鐇廣刃斧也
fZc巨言𥴤筋鳴也巨言切二|赶獸舉尾走
DZM武元樠松心又木名也武元切又莫昆切一
#魂
jag戶昆䰟魂魄也白虎通曰魂者沄也猶沄沄行不休也魄者迫也猶迫迫然著於人也淮南子曰天氣爲䰟地氣爲魄又反魂樹名在西海中聚窟洲上花葉香聞數百里狀如楓香煎其汁可爲丸名曰震靈丸亦名反生香又名卻死香死屍在地聞氣乃活出十洲記戶昆切二十四|㮯大木未剖|䮝獸名|𤟤似犬人面見人則笑行疾如風|餛餛飩|餫上同（餛飩）|䴷不破麥也|鼲鼠名|楎三爪犁曰楎一曰犁上曲木也|渾渾濁益部耆舊傳曰漢武時洛下閎明曉天文於地中轉渾天定時節亦姓左傳鄭大夫渾罕又胡本切|沄水流皃|忶埤蒼云心悶也|𦺊蒲也又胡官切|俒全也|㑮女字又五昆切|䡣還也車相避也|𡍦里名在洛陽|𢣒𢣒悶|𣝂𣝂榾|㨡㨡推|煇赤色|顐𩒱顐禿也|𧡡𧡡視|琿玉名
dag古渾昆兄也後也同也又姓夏諸侯昆吾之後戰國策有齊賢者昆辨古渾切二十|晜上同（兄也後也同也又姓夏諸侯昆吾之後戰國策有齊賢者昆辨古渾切二十）|𥊽上同說文云周人謂兄曰𥊽（兄也後也同也又姓夏諸侯昆吾之後戰國策有齊賢者昆辨古渾切二十）|菎香草|㡓褻衣說文幒也|褌上同（褻衣說文幒也）|崐崐崘山名|琨琨㻍玉名|鵾鵾雞|鶤上同（鵾雞）|鯤北溟大魚|䖵說文曰蟲之總名也|蜫上同（說文曰蟲之總名也）|惃亂也|㱎㱎干不可知也|錕錕鋙鐵赤色可爲劒|瑻同琨|𪋆鹿屬|猑獸名|騉騉駼馬名牛蹄能升高山
hag烏渾𥁕說文曰仁也从皿以食囚也今作昷同烏渾切十三|溫水名出犍爲又和也善也良也柔也暖也又姓唐叔虞之後受封於河內溫因以命氏又卻至食采於溫亦号溫季因以爲族出大原又漢複姓二氏莊子有溫伯雪子姓苑又有溫稽氏|轀轀輬車也|薀薀藻節中生葉又於殞切|𩥈𩥈驪駿馬|殟病也|鴛鴛鴦匹鳥又音冤|𨜵鄉名出蜀志|豱豕名|縕禮曰一命縕韍|韞赤色又於粉切|㼔瓜名|𪉸戎狄云鹽
DaA莫奔門問也聞也字從兩戶亦姓周禮云公卿之子入王端之左教以六藝謂之門子其後氏焉又漢複姓十四氏左傳魯卿東門襄仲宋樂大心爲右師居桐門後因氏焉伍子胥抉眼吳門因謂子胥門子孫乃以胥門爲氏吳有胥門巢世本晉大夫下門牕齊臨淄大夫車門遽陳有鬬門氏戰國策有雍門周魏侯嬴爲夷門抱關者後姓夷門氏呂氏春秋有陽門介夫後以陽門爲氏古今人表有逢門子豹宋諸公子食采於木門者後遂爲氏漢書儒林傳有闕門慶忌何氏姓苑云弋門氏今漁陽人又有剌門氏莫奔切十三|捫以手撫持|樠木名|虋赤粱粟也俗作𧄸|璊玉色赤也|亹浩亹地名出漢書地理志云浩音鴿|𤅣上同（浩亹地名出漢書地理志云浩音鴿）|怋怋怋不明又亂也|䫒頭多殟䫒|𣯩赤色罽名|䟂行遟|䊟粥凝|𪈿比翼鳥也
Qag思渾孫爾雅釋親曰凡子之子爲孫孫之子爲曾孫曾孫之子爲玄孫玄孫之子爲來孫來孫之子爲晜孫晜孫之子爲仍孫仍孫之子爲雲孫又岱謂之天孫又姓周文王子康叔封于衛至武公子惠孫曾耳爲衛上卿因氏焉後有孫武孫臏俱善兵法各撰書凡太原東莞吳郡安樂四望又漢複姓二十三氏左傳秦大夫逢孫氏魯卿有臧孫辰仲孫何忌魯桓公之子慶父之後有孟孫氏叔孫氏季孫氏同出桓公号爲三桓子孫代爲魯之上卿秦下大夫楊孫氏齊大夫長孫修世本云食邑於唐其孫仕晉後号唐孫氏衛有王孫賈出自周頃王之後王孫賈之子自以去王室久改爲賈孫氏晉濟南太守魚孫瑋出自宋魚石奔楚其孫在國者因以魚孫爲氏漢有烏孫昆彌後漢有士孫瑞古封公之後自皆稱公孫故其姓多非一族也孔子弟子有顓孫師國語晉公子利孫夫之後以利孫爲氏何氏姓苑有經孫新孫古孫牟孫室孫長孫叔孫等氏望稱河南之者是虜姓也思渾切六|蓀香草|飧說文餔也|蕵烏蕵草又蕵蕪酸可食也|猻猴猻|搎捫搎摸𢱢也
Nag祖昆尊尊卑又重也高也貴也敬也君父之稱也說文曰酒器也本又作𢍜周禮有司尊彝從土從缶從木後人所加亦姓風俗通云尊盧氏之後祖昆切五|罇（尊卑又重也高也貴也敬也君父之稱也說文曰酒器也本又作𢍜周禮有司尊彝從土從缶從木後人所加亦姓風俗通云尊盧氏之後祖昆切五）|樽並見上注（尊卑又重也高也貴也敬也君父之稱也說文曰酒器也本又作𢍜周禮有司尊彝從土從缶從木後人所加亦姓風俗通云尊盧氏之後祖昆切五）|嶟山皃|繜衣也
Pag徂尊存在也察也恤問也徂尊切五|蹲坐也說文踞也|拵据也|𨚲𨚲䣕縣在戎州|袸爾雅云衿謂之袸袸小帶也又音荐
Eag都昆敦迫也亦厚也又姓敦洽衛之醜人也都昆切七|惇厚也|弴畫弓也天子弴弓又丁僚切|弤上同（畫弓也天子弴弓又丁僚切）|驐去畜勢出字林|墩平地有堆|𤭞器似甌瓿
Fag他昆暾日出皃他昆切七|燉火色|涒涒灘歲在申也|𪏆禮記孺子𪏆之喪也魯公子名亦黃色也|噋詩云大車噋噋噋噋重遟皃|𧑒𧑒𧍪蟲名|黗黃黑色也
Gag徒渾屯聚也又姓後蜀錄有法部尚書屯度徒渾切二十二|豚豕子|㹠（豕子）|豘並上同（豕子）|窀火見穴中又音迍|臀廣雅云臀謂之脽亦謂之臎也說文作尻髀也|𡱂（廣雅云臀謂之脽亦謂之臎也說文作尻髀也）|𦞠（廣雅云臀謂之脽亦謂之臎也說文作尻髀也）|𩪡並同上見說文（廣雅云臀謂之脽亦謂之臎也說文作尻髀也）|軘兵車|飩餛飩|𥴫榜也|坉以草裹土築城及填水也|沌水勢|邨地名亦音村|燉火熾又燉煌郡燉大煌盛也|忳悶也|啍口氣|芚菜似莧也|庉風與火爲庉又徒損切|𪎶黃色|𤫭㼔𤫭瓜名
Oag此尊村墅也此尊切一
gag牛昆㑮女字又姓出纂文牛昆切又戶昆切四|瘒癡皃|顐𩒱顐禿無髮也|梱爾雅釋木曰髡梱
CaA蒲奔盆瓦器亦作瓫爾雅曰盆謂之缶說文曰盎也又姓風俗通云盆成括仕齊孟軻知其必死其子逃難改氏成焉蒲奔切四|葐覆葐草|𪂽𪂽鳩鳥|湓水名在尋陽一曰水涌也
AaA博昆奔奔走也說文作奔博昆切四|賁勇也周禮有虎賁氏掌先後王而趨以卒伍軍旅會同亦如之舍則守王閑閑梐枑也書云武王伐紂戎車三百兩虎賁三百人亦姓古有勇士賁育又肥祕墳三音|䴅䴅如鵲三目六足白身|犇牛驚出文字集略
Iag盧昆論說也議也思也盧昆切又力旬盧鈍二切四|崘崐崘|掄說文擇也一曰貫也|菕菕虂草也
eag苦昆坤乾坤苦昆切七|𡿦古文（乾坤苦昆切七）|髡去髮|𩒱𩒱顐|臗體也臀也|髖上同（體也臀也）|豤齧也
iag呼昆昏說文曰日冥也亦作昬呼昆切七|惛不明|婚婚姻嫁也禮娶以昏時婦人陰也故曰婚|棔合棔木名朝舒夕斂|閽守門人也|殙病也又未立名而死|𣣏不可知也
BaA普䰟濆潠也普䰟切三|噴上同（潠也普䰟切三）|歕吐也又吹氣也
Hag奴昆黁香也亦人名姚興太史令郭黁奴昆切一
#痕
jbQ戶恩痕瘢也戶恩切四|鞎車革前飾|拫急引|㯊所以平量斗斛
dbQ古痕根根柢也亦姓根牟子古賢者著書出風俗通古痕切四|跟足後踵也|𣥦上同（足後踵也）|珢石次玉又音銀
hbQ烏痕恩恩澤也惠也愛也隱也亦姓前燕慕容皝東庠祭酒恩茂風俗通云陳大夫成仲不恩之後烏痕切三|𤇯說文炮炙也以微火溫𠟼|煾上同（說文炮炙也以微火溫𠟼）
FbQ吐根吞咽也吐根切又音天一
gbQ五根垠垠㓵五根切又語斤切三|圻上同（垠㓵五根切又語斤切三）|泿水名
#寒
jcQ胡安寒寒暑也釋名曰寒捍也捍格也亦姓後漢博士魯國寒朗武王子寒侯之後也胡安切十二|𩏑亦作韓井垣也亦國名又姓出自唐叔虞之後曲沃桓叔之子萬食邑於韓因以爲氏代爲晉卿後分晉爲國韓爲秦滅復以國爲氏出潁川後韓騫避王莽亂移居南陽故有潁川南陽二望|𦺦𦺦蔣草也|翰天雞羽有五色又音扞|鶾上同（天雞羽有五色又音扞）|邯邯鄲縣名又漢複姓漢有衛尉邯鄲義風俗通云因國爲姓也|邗邗溝水名在廣陵|虷虷蟹一名蜎蟲|汗可汗蕃王稱又音犴|𧃙白𧃙草也又何旦切|䮧䮂䮧蕃大馬出異字苑
gcQ俄寒豻胡地野狗似狐而小或作犴俄寒切又音岸四|犴上同（胡地野狗似狐而小或作犴俄寒切又音岸四）|雃雃䲽鳥一名雝𪆂䲽音石|𡽜山形也
EcQ都寒單單複也又大也亦虜姓阿單氏後改爲單氏都寒切又常演切十|襌襌衣|鄲邯鄲|丹赤也說文曰巴越之赤石也亦州名春秋時白翟所居後魏置汾州廢帝三年以河東汾州同乃改爲丹州亦姓晉有大夫丹木出風俗通|殫盡也|簞簞笥小篋|匰宗廟盛主器出字書|㠆㠆孤山名|癉火癉小兒病也|䐷大腹
hcQ烏寒安安徐也寧也止也平也亦州名春秋時鄖國漢屬江夏郡宋分江夏郡爲安陸郡武德四年討平王世充改爲安州有鄖水亦姓風俗通云漢有安成爲太守廬山記有安息國王子安高又漢複姓有安都氏烏寒切五|䀂䀂𥂫大盂|鞌鞌韉|䢿地名在當陽|侒說文宴也
HcQ那干難艱也不易稱也又木難珠名其色黃生東夷曹植樂府詩曰珊瑚閒木難又姓百濟人說文作𪇠鳥也本又作𩁘那干切又奴汗切四|𪇼見上注（艱也不易稱也又木難珠名其色黃生東夷曹植樂府詩曰珊瑚閒木難又姓百濟人說文作𪇠鳥也本又作𩁘那干切又奴汗切四）|𩁚（見上注）|𩁢並古文（見上注）
OcQ七安餐說文吞也七安切三|湌上同俗作飡（說文吞也七安切三）|䉔䉔笒出異字苑
FcQ他干灘水灘爾雅云太歲在申曰涒灘他干切十|嘽馬喘|嘆長息與歎同又音炭|擹擹蒱賭博|譠譠慢欺慢言也|痑力極|攤開也亦緩也|𦧴𦧴𦧝言不正也|嬗緩也|㨏搫㨏婉轉
QcQ蘇干𦙱脂肪蘇干切五|跚蹣跚跛行皃|珊珊瑚廣雅曰珊瑚珠也說文曰珊瑚生海中而色赤也|姍誹也|䈀竹器
GcQ徒干壇封土祭處徒干切十五|檀木名亦州名春秋時及戰國並爲燕地漢屬漁陽郡隋置檀州取白檀縣爲名又姓太公爲灌檀宰後氏焉禮記魯有檀弓今檀城在瑕丘瑕丘屬山陽晉改山陽爲高平郡檀氏望在高平也|鷤鸛鷤如鵲短尾射之銜矢射人說文爾雅並作鸛鷒|癉風在手足病又都彈切|撣觸也太玄經云揮繫其名|彈糾也射也亦彈棊梁冀傳云冀好彈棊也又徒案切|驒連錢驄一曰青驪白文又丁年切驒騱匈奴畜似馬而小|驙白馬黑脊又知連切|但語辝亦姓何氏姓苑云漢有但巴爲濟陰太守又徒旱切又徒旦切|胆胆口脂澤出證俗文|繟寬緩|儃態也又市連切|聅軍法以矢貫耳曰聅|唌歎也|貚貙屬
PcQ昨干殘餘也說文賊也昨干切七|䏼禽獸食餘又徂贊切|㱚上同（禽獸食餘又徂贊切）|戔傷也又戔戔束帛皃易曰束帛戔戔|𥂫䀂𥂫大盂|𣦼穿也|帴帗也
dcQ古寒干求也犯也觸也亦姓左傳宋有干犨又漢複姓何氏姓苑漢有干己衍爲京兆尹古寒切十六|乾字樣云本音虔今借爲乾濕字又姓出何氏姓苑|漧古文（字樣云本音虔今借爲乾濕字又姓出何氏姓苑）|竿竹竿|肝木藏|奸以淫犯也|鳱鳱鵲鳥名知未來事噪則行人至鵲字或作䧼䧼古沃切|玕琅玕美石次玉|邗越別名又音寒江名也|汗餘汗縣名又寒翰二音|迀進也|㿻盤也又大盌名|𢧀𢧀盾|忓說文極也|𨝌地名|𡯋𡯋股
IcQ落干蘭香草亦州名古西羌地隋文帝置蘭州取皋蘭山爲名又姓漢有武陵太守蘭廣落干切十一二|瀾大波|闌晚也牢也遮也希也又飲酒半罷曰闌|讕逸言又力誕切|攔階際木句攔亦作闌|𨷻妄入宮門|籣盛弩矢人所負也|䪍上同（盛弩矢人所負也）|欄木名|躝踰也|幱幱衫幱裙|㘓㘓哰𠍽挐語不可解
ecQ苦寒看視也苦寒切七|𥉏古文（視也苦寒切七）|栞槎木也|𣓁上同（槎木也）|靬弓衣|臤堅也又口閒口耕二切|刊削也剟也
icQ許干頇顢頇大面皃許干切二|鼾臥氣激聲
Hcg乃官濡水名出涿郡乃官切一
#桓
jcg胡官桓桓桓武也又姓本自姜姓齊桓公後因諡爲氏望出譙郡後漢有太子太傅桓榮胡官切二十九|完全也|䴟鹿一歲|𩾞𩾞䳜鳥烏喙蛇尾也|丸彈丸|瓛圭名說文曰桓圭公所執|紈紈素|𦻃𦻃葦易亦作萑俗作雚雚本自音灌|雈木兔鳥也|洹水名在鄴又干元切|汍汍瀾泣淚|絙緩也|芄芄蘭草名|豲豕屬又豲道縣在夫水亦作獂|梡木名出蒼梧子可食|荁堇類|莞似藺而圓可爲席又音官|綄船上候風羽楚謂之五兩|𦏊山羊細角而形大也|萈上同見說文（山羊細角而形大也）|貆說文曰貉之類又音歡|狟大犬也周書曰尚狟狟|峘爾雅云小山岌大山曰峘又戶登切|㿪皮病|䎠丸屬|垸漆加骨灰上也|寏周垣|院上同（周垣）|捖揳刮摩也
gcg五丸岏巑岏五丸切十|刓圓削|园上同（圓削）|忨貪也|蚖毒蛇|䯈䯊䯈|羱羱野羊角大又語袁切|黿黿似鼈又音元|抏挫也|𠒢𠒢䨲
Ecg多官端正也直也緒也等也亦姓出姓苑又漢複姓孔子弟子端木賜也多官切十一|褍衣長也又衣正幅也|剬齊也|𧤗角𧤗獸名狀如豕角善爲弓李陵以此遺蘇武|耑說文曰物初生之題也上象生形下象其根也|鍴鑽也|𥵣竹名出南嶺|竱齊也又之耎切|𦾸草名|𥠄禾垂皃又丁果切|偳抄偳又音湍
hcg一丸剜刻削也一丸切六|眢井無水一曰目無精|豌豆也|蜿蟠蜿龍皃|帵帵子裁餘|婠德好皃又古旦切
Fcg他端湍急瀨也他端切又音專六|貒似豕而肥又他畔切|䵎黃黑色|𪏆黃色又湯門切|煓火盛|偳人名又多丸切
Qcg素官酸醋也素官切五|狻狻猊師也猛獸|䝜上同（狻猊師也猛獸）|痠痠疼|𩆑小雨
Gcg度官團團圓度官切十二|慱詩云勞心慱慱|篿竹器|剸截也|鄟邾䣚之邑|𧐕魚似鮒而豕尾|敦詩云有敦瓜苦又都昆切|漙詩云零露漙兮|鷒爾雅曰鸛鷒鶝鶔如鵲短尾射之銜矢射人|𪆃鳶之別名詩亦作鶉傳云雕也|摶說文曰圜也禮云無搏飯|𩅂露皃
Pcg在丸欑木叢也在丸切九|巑巑岏小山皃|𩎈車縛軏也又借官切|菆菆塗見禮|襸襸補|酇酇聚也又音纂音贊|穳秿也又刈禾積也|𥣚上同（秿也又刈禾積也）|劗剃髮也又子欑切
dcg古丸官官宦左傳曰黃帝以雲紀官炎帝以火紀官大暤以龍紀官少暤以鳥紀官又君也法也事也又複姓三氏左傳晉王官無地御戎魯先賢傳云孔子妻并官氏楚莊王少子爲上官大夫以上官爲氏古丸切十|悹憂也又古玩切|莞草名可以爲席亦云東莞郡名又姓姓苑云今吳人又胡官切|棺棺椁禮記曰有虞氏瓦棺夏后氏堲周殷人棺椁說文曰關也所以掩屍也|觀視也又音灌|貫穿也又音灌|冠首飾說文曰絭也所以絭髮弁冕之總名也亦姓風俗通云古賢者鶡冠子之後又音灌|涫樂涫縣在酒泉|倌倌人主駕說文曰小臣也詩云命彼倌人|毌穿物持也
Icg落官鑾鑾鈴崔豹古今注云五輅衡上金雀者朱鳥也口銜鈴鈴謂之鑾也或謂朱鳥鸞也鸞口銜鈴故謂之鑾落官切十四|鸞春秋元命包曰离爲鸞孫氏瑞應圖曰鸞者赤神之精鳳皇之佐也山海經曰女牀山有鳥狀如翟而五采文名曰鸞見則天下太平安寧|巒小山而銳|欒木名說文曰木似欄禮天子樹松諸侯柏大夫欒士楊又曲枅亦姓代爲晉卿出左傳|羉彘罟|𧄶𦽏葵一曰茆也|䜌南䜌縣在鉅鹿|㱍迷惑不解理一曰欠皃|臠臠臠病瘠皃|灤水名|灓說文曰漏流也水沃也漬也|𤼙病也瘦也|圝團圝圓也|曫日夕昬時
icg呼官歡喜也呼官切十三|懽上同又音貫（喜也呼官切十三）|驩馬名|貆貉屬|貛牡狼|𪈩𪈩鷤鳥射之則銜矢射人說文爾雅並云𪈩鷒|鴅鳥名人面鳥喙|酄魯郡邑名|獾野豚|犿上同（野豚）|𡚊化也始也出方言|讙讙諠|𠂄𠂄兜四凶名古文尚書作𦝲
ecg苦官寬愛也裕也緩也苦官切二|髖髖兩股閒也
Ncg借官鑽刺也借官切又借玩切六|𩎑說文曰車衡三束也曲轅𩎈縛直轅𨏮縳|𩎈（說文曰車衡三束也曲轅𩎈縛直轅𨏮縳）|䡽並上同（說文曰車衡三束也曲轅𩎈縛直轅𨏮縳）|𣀶姓出姓苑|劗剃髮
CcA薄官槃器名薄官切二十二|盤籀文（器名薄官切二十二）|鎜古文（瘡痕）|柈俗（器名薄官切二十二）|瘢瘡痕|磻磻溪太公釣處|幋大巾|磐大石|䰉䰉頭屈髮爲之又臥髻也又音班|般樂也又博干切釋典又音鉢|蹣蹣跚跛行皃|搫搫㨏婉轉|鞶鞶革說文曰大帶也|繁繁纓馬飾見左傳|𪄀𪄀𪃑異鳥人面出山海經|𥈼轉目視也|媻奢也一曰小妻又媻媻來往皃|縏番和縣名在涼州|蟠鼠負蟲又龍蟠也|𪒀下色|䈲篾也|𤠍𤠍狐大也
DcA母官瞞目不明也說文曰平目也曹操一名瞞又姓風俗通云瞞氏荊蠻之後本姓蠻其枝裔隨音變改爲瞞氏母官切二十四|顢顢頇大面皃|謾欺也慢也|蹣踰牆|䊡䊡頭餅也|饅俗（䊡頭餅也）|慲忘也|鏝泥鏝|槾（泥鏝）|墁並上同（泥鏝）|㒼無穿孔狀|鞔鞔鞋履|樠木名松心|鰻鰻䱊魚也|曼路遠|蔓蔓菁菜也|䜱䜱䜪亭名在上艾䜪音求|𤡁獸似狸也|䟂行遟皃|𦔔種遍皃|芇相當也又亡殄武仙二切|悗惑也|鬗長髮|絻連也
BcA普官潘淅米汁又姓周文王子畢公之子季孫食采於潘因氏焉出廣宗河南二望普官切六|㽃㽃瓳大甎|番番禺縣在廣州|拌弃也俗作𢬵|㢖峙居也|𤺏弃𤺏
AcA北潘𤳖部黨北潘切四|般般運|䈲捕魚笱其門可入不可出|𠦒弃糞器名又姓出姓譜
#刪
VdQ所姦刪除削也又定也所姦切又所晏切五|訕謗也|潸出涕皃|𣧱單于別名|狦說文曰惡健大也又所晏切
ddg古還關說文曰以木橫持門戶也聲類曰關所以閉也又姓風俗通云關令尹喜之後蜀有前將軍關羽河東解人古還切六|関俗（說文曰以木橫持門戶也聲類曰關所以閉也又姓風俗通云關令尹喜之後蜀有前將軍關羽河東解人古還切六）|癏病也|擐貫也又音患出文字指歸|𠴨二鳥和鳴|𢇇織貫杼也
hdg烏關彎說文曰持弓關矢也烏關切五|灣水曲|䘎䗡䘎蟲名|𩅦吳主孫休長子名見吳志|潫奫潫
Vdg數還𣟴關門機出通俗文數還切一
jdg戶關還反也退也顧也復也戶關切又音旋二十|環玉環爾雅曰𠟼好若一謂之環又姓古有楚賢者環淵後有環濟撰要略一部|𠟼樸𠟼縣名在武威樸音蒲|鬟髻鬟|寰王者封畿內縣又玄甸切|闤闤闠崔豹古今注云闤市垣也闠市門也|糫膏糫粔籹|鍰六兩曰鍰鍰黃鐵也一曰錢也|圜圜圍又王權切|鐶指鐶|轘轘轅又地名也|𡍦里名在洛陽|䍺獸名似羊而黑色無口不可殺也|𦏖上同（獸名似羊而黑色無口不可殺也）|郇姓出絳州又音荀|澴水名|𩙽𩙽飛遶皃|䭴馬一歲又音弦|㡲屋牡瓦名|𦣴堅𦣴
AdA布還班說文曰分瑞玉俗作𤦦亦姓出扶風風俗通云楚令尹鬬班之後布還切十三|頒布也賜也又音汾|鳻大鳩|肦大首又音汾|螌螌蝥毒蟲|斑駮也文也|辬上同見說文（駮也文也）|䰉髮半白又音盤|般還師亦作班師又盤𤳖鉢三音|斒斕斒|鯿魚名又音編|扳挽也公羊傳云扳隱而立又音攀|𠔯賦事之皃
DdA莫還蠻南夷名亦姓莫還切七|𪈮似鳧一目一足一翼相得乃飛即比翼鳥也|獌狼屬又莫干晚販二切|鬘衣出釋典|謾方言曰謾台脅鬩懼也燕代之閒曰謾台齊楚之閒曰脅鬩台音怡|䅼赤䅼稻名|𪑪畫車輪也
gdQ五姦顏顏容亦顏額又姓出琅邪本自魯伯禽支庶有食采顏邑者因而著族又邾武公名夷字曰顏故公羊傳稱顏公後遂爲氏五姦切二|楌木名似橦
ddQ古顏姦私也詐也古顏切俗作姧四|菅草名又姓出趙郡或作蕳|葌香草|䔵上同（香草）
BdA普班攀引也普班切三|扳上同又音班（引也普班切三）|眅目多白皃
Mdg奴還奻訟也奴還切一
gdg五還𤸷𤸷痺五還切二|頑頑愚
edQ丘姦馯姓也漢書有江東馯臂字子弓傳易丘姦切一
edQ可顏豻胡地野犬似狐而小黑喙可顏切又我悍俄寒二切二|鬜鬢禿皃
Sdg阻頑跧跧伏阻頑切一
#山
VeQ所閒山廣雅曰山產萬物說文曰山宣也宣气散生萬物又姓周有山師之官掌山林後以官爲氏或云古烈山氏之後望出河內所閒切三|疝腹疝痂病山|邖地名出地理志
deg古頑鰥鰥寡鄭氏云六十無妻曰鰥五十無夫曰寡又魚名古頑切三|䤽䤽犁釬也|綸爾雅釋草曰綸似綸東海有之說文曰青絲綬也又音倫
deQ古閑閒隙也近也又中閒亦姓出何氏姓苑古閑切又閑澗二音六|艱艱難|囏古文（艱難）|靬黎靬國名在西域其人善眩幻又犍看二音|蕳蘭也|覸視皃
jeQ戶閒閑闌也防也禦也大也法也習也暇也戶閒切九|嫺嫺雅|癇小兒瘨|𩦂馬一目白|蛝蟲名|瞯人目多白又姓史記濟南瞯氏|鷴白鷴似雉而尾長四五尺|藖莖莝餘又音莧|憪心靜說文愉也
eeQ苦閑慳悋也苦閑切八|𧢞人名出孟子齊景公勇臣成𧢞說文曰很視也|顅頭髮少皃|掔爾雅云固也莊子注牢也|鬜鬢禿皃又苦八切|羥羊名|臤堅也又口耕切|𩋆堅破聲
UeQ士山虥虎淺毛皃士山切又音棧又昨閑切七|潺潺湲水流又士連切|孱孱劣皃又士連切|僝僝惡罵也|䡲䡲輞又士連切|𨬖小鑿名又士連切|𡎻𡎻門聚又昨閑切
ieQ許閒羴羊臭許閒切又失然切一
geQ五閑訮爭也五閑切四|𤡥犬鬬聲也亦作狠|㗴訟詞|虤虎怒
heQ烏閑黰染色黑也烏閑切五|𦎣黑羊|殷赤黑色也左傳云左輪朱殷|㸶牛尾色也|黫黑色出字林
AeA方閑斒斒斕色不純也方閑切二|虨虎文又甫巾切
IeQ力閑斕斒斕力閑切四|𣁣上同（斒斕力閑切四）|𢛓地名出玉篇|潾水皃又力人切
MeQ女閑嘫語聲女閑切二|㬮暍㬮煖狀
TeQ充山㺗噬也充山切一
heg委鰥𡣬媚容也委鰥切一
Leg墜頑窀穴中見火墜頑切又陟倫切一
IFg力頑𡰠𡰠𡰝𦝫膝痛也力頑切一
fgo跪頑𡰝跪頑切一
JeQ陟山譠謾也陟山切又他單切二|㣶廣蒼云走也藏也
LeQ直閑𤣆獸走皃直閑切又丑連切一
jeg獲頑湲水流皃獲頑切一
UeQ昨閑虥虎淺毛皃昨閑切二|𡎻𡎻門聚
#先
QfQ蘇前先先後也又姓左傳晉有先軫蘇前切又蘇薦切四|躚蹁躚旋行皃|蹮上同（蹁躚旋行皃）|𥑻石次玉也
PfQ昨先前先也昨先切六|歬古文（先也昨先切六）|騚馬四蹄皆白也|湔湔葫藥名|𥮒說文曰蔽絮簀也或作𥮓𥷰上同|𥷰上同（說文曰蔽絮簀也或作𥮓𥷰上同）
OfQ蒼先千十百也又漢複姓有千乘氏出何氏姓苑蒼先切九|圱三里爲圱|阡阡陌南北爲阡東西爲陌|汘水名|仟千人之長也又仟眠廣遠也|芊草盛|谸說文曰望山谷之谸青也|迁伺候也進也又迁葬又標記也|杄木名
NfQ則前箋說文曰表識書也則前切十五|牋上同（說文曰表識書也則前切十五）|㮍古文（說文曰表識書也則前切十五）|瀳水名說文曰水至也又才薦切|帴小兒藉也|韉鞍韉|淺淺淺流疾皃又倉翦切|湔水名出蜀郡玉壘山|𢃬旛幟|𣚙小栗名趙魏閒語也|轃大車簀也|濺濺疾流皃又子賤切|籛楚人革馬簻鞍韉又彭祖姓|𣝕香木|𨔥埤蒼云至也說文云自進極也
FfQ他前天上玄也說文曰顛也至高無上从一大也爾雅曰春爲蒼天夏爲昊天秋爲旻天冬爲上天他前切六|𠀘（上玄也說文曰顛也至高無上从一大也爾雅曰春爲蒼天夏爲昊天秋爲旻天冬爲上天他前切六）|䒶並古文（上玄也說文曰顛也至高無上从一大也爾雅曰春爲蒼天夏爲昊天秋爲旻天冬爲上天他前切六）|𦧝𦧝𦧴語不正也|吞姓也漢有吞景雲又湯門切|訮訮訶皃
dfQ古賢堅固也長也強也又姓漢二十八將有揚化將軍潁川堅鐔古賢切十七|鋻剛也又古宴切|𢮂縣名在東萊又音弦|㡉布名|幵說文曰平也兩干對舉又羌名今作开同又音牽|肩項下又任也克也作也媵也又姓出姓苑|鳽鵁鶄鳥名又五革五堅二切|豜大豕也一曰豕三歲|𧱚上同（大豕也一曰豕三歲）|猏俗（大豕也一曰豕三歲）|菺茙葵也今蜀葵|𪊑鹿有力又音牽|麉上同（鹿有力又音牽）|鵳鶙鵳鷂屬|鰹鮦大曰鰹小曰鮵鮵音奪|䶬說文曰龍鬐脊上䶬䶬|䌑緊也
jfQ胡田賢善也能也大也亦姓胡田切十七|臤古文又口閒切（善也能也大也亦姓胡田切十七）|弦弓弦五經文字曰其琴瑟弦亦用此字作絃者非說文作𢎺又姓風俗通云弦子後左傳鄭有商人弦高晉有弦超|絃俗見上注（弓弦五經文字曰其琴瑟弦亦用此字作絃者非說文作𢎺又姓風俗通云弦子後左傳鄭有商人弦高晉有弦超）|舷船舷|胘肚胘牛百葉也|蚿馬蚿蟲一名百足|𢛆亭名在密縣說文云急也|𠛑自刎頸也|伭說文作𠆺泿也|𢮂縣名又音堅|𦱁草名|婱婦人守志|𧼏疾走|礥艱險又剛強也|痃痃癖病|㘋難也
hfQ烏前煙火氣也烏前切十二|烟上同（火氣也烏前切十二）|𡨾古文（火氣也烏前切十二）|𤎟籀文（火氣也烏前切十二）|燕國名亦州又姓邵公奭封燕爲秦所滅子孫以國爲氏漢有燕倉又於薦切|咽咽喉|橪橪支香草|驠馬竅白|湮爾雅云落也又音因|胭胭項|𥷀竹名|閼閼氏單于適妻也氏音支
IfQ落賢蓮爾雅云荷芙蕖其實蓮落賢切八|憐愛也又哀矜也|怜俗（愛也又哀矜也）|嗹連嘍言語繁挐皃|縺縺縷寒具|𪍴𪍴𪍣餅也|𨏩𨏩𨻻縣在交趾|零漢書云先零西羌也本力不切
GfQ徒年田釋名曰土已耕者曰田田填也五稼填滿其中也又姓出北平敬仲自陳適齊後改田氏九代遂有齊國徒年切十九|佃作田也說文云中也春秋傳曰乘中佃一轅車古輕車也又音甸|畋取禽獸也又音甸|畇地名在絳|填塞也加也滿也又陟陳切|窴上同字統云窴顏府在北州（塞也加也滿也又陟陳切）|闐轟轟闐闐盛皃|䟧蹋地聲|𦧴𦧴𦧝語不正也又他丹切|鈿金花又音甸|䡘䡘䡘眾車聲|沺字林云沺沺水勢廣大無際之皃|磌柱礎|鷏蚊母鳥也|嗔說文曰盛气也|𨌈呂氏春秋云天子𨌈𨌈敐敐莫不載悅敐音軫|滇滇㴐大水皃又都年切|貚貙屬|搷擊也
HfQ奴顛秊穀熟曰秊奴顛切三|年上同（穀熟曰秊奴顛切三）|𨚶鄉名在馮翊
EfQ都年顛頂也又姓左傳晉有顛頡都年切十五|㒹上同（頂也又姓左傳晉有顛頡都年切十五）|齻牙齻儀禮曰右齻左齻鄭玄云齒堅也|𩥄馬額白今戴星馬|槙木上|瘨病也|癲上同（病也）|滇滇池在建寧|𧽍走頓|巔山頂也|驒驒騱野馬|𠑘𠑘隕也又倒也|傎同上（𠑘隕也又倒也）|蹎蹎仆說文跋也|厧厧家
efQ苦堅牽引也挽也連也亦姓晉有牽秀何氏姓苑云武邑人苦堅切九|縴縴𦃇惡絮|邢地名在河內|汧水名在安定說文曰水出扶風西北入渭爾雅云汧出不流又苦薦切|蚈螢火又古奚切|𪊑鹿之絕有力者亦作麉|掔固也厚也持也又音慳|岍山名在京兆書曰導岍及岐|雃說文曰石鳥一名雝𪆂一曰精𠛱又秦公子名士鳽
gfQ五堅妍淨也美也好也五堅切八|鳽鵁鶄也又古賢五革二切|研磨也|𥓋上同（磨也）|揅揧破|㿼醆也|趼獸跡|俓急也又牛耕切
DfA莫賢眠寐也莫賢切七|瞑上同說文曰翕目也又音麵（寐也莫賢切七）|䏃埤蒼云注意而聽也|矏爾雅曰密也|𥌂上同（爾雅曰密也）|䰓燒煙畫眉|㝰不見
CfA部田蹁蹁蹮旋行皃部田切十二|蠙蠙珠|骿并肋|軿四面屏蔽婦人車又房丁切|駢并駕二馬|㼐黃瓜名|胼胼胝皮上堅也|跰上同（胼胝皮上堅也）|楄木名食不噎又杜預云楄部棺中露牀也|賆益也|玭蚌珠或與蠙同|琕上同（蚌珠或與蠙同）
hfg烏玄淵深也管子曰水出而不流曰淵又姓世本有齊大夫淵湫烏玄切十|𠝃上同（深也管子曰水出而不流曰淵又姓世本有齊大夫淵湫烏玄切十）|囦古文（深也管子曰水出而不流曰淵又姓世本有齊大夫淵湫烏玄切十）|㾓骨節疼也|弲弓勢|剈曲翦|鼘鼓聲|𨓯行皃|䨊鳥羣|蜎蜎蠉入毆泫切
dfg古玄涓說文曰小流也又姓列仙傳有齊人涓子古玄切八|睊視皃|蠲除也潔也明也說文曰馬蠲蟲明堂月令曰腐草爲蠲|𦮻草名|䅌麥莖|鵑杜鵑鳥|焆明也|鞙鞙馬尾也又胡犬切
ifg火玄鋗銅銚火玄切五|駽爾雅曰青驪駽郭璞云今之鐵驄|㘣規也又辭沿切|梋椀屬|矎直視
AfA布玄邊畔也又邊陲也近也厓也方也又姓出陳留北平二望陳留風俗傳云祖于宋平公布玄切十四|籩竹器|𤄺水名出番侯山|甂小盆|蝙蝙蝠仙鼠又名伏翼|猵獺屬|𥣰籬上豆也又北典切|編次也又方泫切|萹萹竹草又北泫切|𨇱足趾不正|𠑟身不正也|牑牀上版也|䟍說文走意|蹁行不正皃又薄邊切
jfg胡涓玄黑也寂也幽遠也又姓列仙傳有玄俗河閒人無影胡涓切十三|縣說文云繫也相承借爲州縣字|懸俗今通用（說文云繫也相承借爲州縣字）|眩亂也又胡練切|䮄馬一歲|玹石次玉|玆說文曰黑也春秋傳曰何故使吾水玆本亦音滋按本經只作滋|𧟨吳王次子名|𥌭自童子也|伭說文很也|盷目大皃|胘牛百葉又音弦|訇說文云漢中西城有訇鄉
ifQ呼煙祆胡神官品令有祆正呼煙切二|訮訶也怒也
@@@崇玄𤜼獸似豹而少文崇玄切一
#仙
QgQ相然仙神仙釋名曰老而不死曰仙仙遷也遷入山也故字從人旁山相然切十二|僊上同又僊僊舞皃（神仙釋名曰老而不死曰仙仙遷也遷入山也故字從人旁山相然切十二）|𠑗古文（上同又僊僊舞皃）|㲔㲔㲍罽也|䉳竹名又音癬|苮草名似莞|躚舞皃|秈秈稻|鮮鮮潔也善也又鮮卑山因爲國号亦水名水經曰北鮮之山鮮水出焉又姓後蜀錄李壽司空鮮思明又漢複姓鮮于氏|硟衧繒石也|鱻說文曰新魚精也|廯倉廩
PgQ昨仙錢周禮注云錢泉也其藏曰泉其行曰布取名於水泉其流行無不徧也又姓晉有歷陽太守錢鳳昨仙切二|𧔢方言云鳴蟬也
OgQ七然遷去下之高也詩云遷于喬不七然切八|𨙙古文（去下之高也詩云遷于喬不七然切八）|𠨧上同（去下之高也詩云遷于喬不七然切八）|𨝍地名|櫏桾櫏木名|䉦䇹䉦竹名|韆鞦韆繩戲|㿊痛也
NgQ子仙煎熟煑子仙切四|湔洗也一曰水名出蜀玉壘山|葏草茂皃出字林|鬋女鬢垂皃
cgQ如延然語助又如也是也說文曰燒也俗作燃又姓左傳楚有然丹何氏姓苑云今蒼梧人如延切九|燃俗見上注（語助又如也是也說文曰燒也俗作燃又姓左傳楚有然丹何氏姓苑云今蒼梧人如延切九）|𤡮猓𤡮獸名似猿白質黑文|㜣姓也|肰犬𠟼|繎絲勞皃|𥳚竹名|䕼草名|𤓉陸佐公石闕銘云刑酷𤓉炭
lgQ以然延稅也遠也進也長也陳也言也亦州漢高奴縣隋改延川爲延安郡又姓漢有延篤南陽人爲京兆尹殺梁冀使者以然切十三|埏際也地也又墓道亦地有八極八埏又音羶|筵席也鋪陳曰筵藉之曰席|狿獌狿大獸名|郔地名在鄭|綖冠上覆也|蜒蚰蜒|䘰㠾䘰牛領上衣|鋋小矛又市連切|䀽相顧視也|𢌨上同（相顧視也）|䢭行皃|莚草名
XgQ諸延𩜾厚粥也諸延切八|饘上同（厚粥也諸延切八）|旃之也爾雅曰因章爲旃郭璞云以帛練爲旒因其文章不復畫之也世本曰黃帝作旃亦曲柄旗以招士眾也或作旜又姓出姓苑|旜上同（之也爾雅曰因章爲旃郭璞云以帛練爲旒因其文章不復畫之也世本曰黃帝作旃亦曲柄旗以招士眾也或作旜又姓出姓苑）|栴栴檀香木|氈席也周禮曰秋斂皮冬斂革供其毳毛爲氈|鸇晨風鳥|𩔣江湘閒人謂額也
dgU居延甄察也一曰免也居延切又章鄰切三|薽草名一曰豕首又名彘盧|籈竹器
JgQ張連邅迍邅也又移也張連切又直連雉戰二切五|𧾍同上行難也說文曰趁也又直然切（迍邅也又移也張連切又直連雉戰二切五）|驙馬載重行難又白馬黑脊曰驙又徒安切|鱣詩云鱣鮪發發江東呼爲黃魚|𩼼上同（詩云鱣鮪發發江東呼爲黃魚）
UgQ士連潺潺湲水流皃士連切五|孱不肖也漢書曰吾王孱王也|𨬖小鑿|䡲軒輞|𡎻門聚
agQ式連羶羊臭也式連切八|埏打瓦也老子注云和也|挻柔也繫也和也取也長也或作煽|扇扇涼又式戰切|煽火盛也又式戰切|鯅魚醬|脠生𠟼醬又丑延切|䘰㠾䘰牛領上衣又音延
KgQ丑延脠魚醢也說文云𠟼醬丑延切四|梴木長|鏈鉛礦也又力延切|㢟說文曰安步㢟㢟也
ZgQ市連鋋小矛方言曰五湖之閒謂矛爲鋋市連切又以然切九|單單于又丹善二音|蟬蜩也禮記仲夏之月蟬始鳴孟秋之月寒蟬鳴援神契曰蟬無力故不食也|撣撣援牽引|儃態也|僤上同（態也）|禪靜也又市戰切|澶杜預云澶淵地名在頓丘縣南又音纏|嬋嬋娟好皃
LgQ直連纏繞也又姓漢書藝文志有纏子著書直連切十|緾俗餘皆倣此（繞也又姓漢書藝文志有纏子著書直連切十）|躔日月行也說文曰踐也|瀍水名在河南|鄽市鄽|𨷭市門|𧾍移也又張連切|𧔊守宮別名|廛居也說文曰一畮半也一家之居也|㙻上同（居也說文曰一畮半也一家之居也）
igY許延嘕笑皃許延切四|仚輕舉皃說文曰人在山上也|嫣長皃好皃又於建於遠二切|𦒜飛皃
IgQ力延連合也續也還也又姓左傳齊有連稱又虜複姓六氏西秦丞相出連乞都後魏書官氏志云南方宥連氏後改爲雲氏是連氏改爲連氏費連氏改爲費氏綦連氏改爲綦氏又有赫連氏力延切十三|聮聮綿不絕說文作䏈|漣漣漪風動水皃|翴翴翩飛相及皃|鰱魚名|𤣆𤣆猭兔走皃|令漢書云金城郡有令居縣顏師古又音零|鏈鉛礦又丑延切|䃛上同（鉛礦又丑延切）|㦁說文曰泣下也|槤簃也又橫關柱又木名|𪚀齒露也|㶌㶌水名出王屋山
BgE芳連篇篇什也又姓周大夫史篇之後芳連切七|偏不正也鄙也衺也又姓急就章有偏呂張|翩飛皃|媥身輕便皃|㾫身枯|扁小舟|萹萹茿可食又補殄切
CgE房連便辯也僻也安也又姓漢有少府便樂成房連切又去聲九|緶縫也|楩木名|平書傳云平平辨治也又皮明切|諞巧言又符蹇切|㛹㛹娟美好|箯竹輿|𧍲𧍲䗠沙蝨也亦作𧍻|楄木名食之不咽
DgE武延緜精曰緜麤曰絮說文曰䏈微也又姓晉張方以綿思爲腹心武延切十七|綿上同（精曰緜麤曰絮說文曰䏈微也又姓晉張方以綿思爲腹心武延切十七）|棉屋聮棉又木棉樹名吳錄云其實如酒杯中有綿如蠶綿可作布又名曰緤羅浮山記曰正月花如芙蓉結子方生葉子內綿至蠶成即熟廣州記云枝似桐枝葉如胡桃葉而稍大也|謾欺也|矊瞳子黑又矊眇遠視|蝒馬蜩蟬中最大者|𧉄上同說文曰𧉅蚗蟬屬（馬蜩蟬中最大者）|矏密緻皃|𢣔忘也|芇說文曰相當也今人賭物相折謂之芇|宀深屋|䫵雙生|櫋說文曰屋聮櫋也|𣏜木名|臱視遠之皃|㮌木名|𣡠𣡠密也
Pgg疾緣全完也具也又姓吳有大司馬全琮疾緣切七|㒰上同見說文（完也具也又姓吳有大司馬全琮疾緣切七）|泉水源也又錢別名|𧍭貝也白質黃文|牷牛全色書傳云體完曰牷|䀬目眇視皃|葲𦭵葲草也
Qgg須緣宣布也明也徧也通也緩也散也須緣切九|揎手發衣也|㩊上同（手發衣也）|䳦𪀠䳦小鳥𪀠音旬|愃吳人語快說文曰寬嫺心腹皃|𡈣面圓也|𩕖頭圓也|瑄爾雅曰璧大六寸謂之瑄郭璞曰漢書所云瑄玉是也|𩤡𩤡額
Ngg子泉鐫鑽也斲也子泉切四|鋑古文（鑽也斲也子泉切四）|脧縮肭|剶𠜖也又丑全切
igk許緣翾小飛許緣切九|儇智也疾也利也慧也又舞皃|弲角弓皃|蠉蟲行皃|𧾎疾走皃|嬛便嬛輕麗皃又音娟音瓊|譞智也|頨頨妍美頭|𥌭目童子也
cgg而緣堧江河邊地又廟垣或從需餘同而緣切六|䙇促衣縫也|𤲬城下田也|瑌瑌珉也玉佩也|撋摧物也|繎繎絲難理
Ygg昌緣穿通也孔也昌緣切三|川山川也蔡邕月令章句曰眾流注海曰川釋名曰川者穿也穿地而流也|灥三泉
lgg與專沿從流而下也與專切十二|㳂上同（從流而下也與專切十二）|鉛說文曰青金也一曰錫之類也|鈆上同（說文曰青金也一曰錫之類也）|櫞枸櫞樹皮可作粽埤蒼云果名似橘|捐弃也|鳶鴟類也|蝝蝗子一曰蟻子|緣緣由又羊絹切|䱲魚名|𦿂郭璞云𦿂尾草一名射干|𦛔短也
Rgg似宣旋還也疾也似宣切十七|檈圜案|璿玉名|𤩅上同（玉名）|𤫀籀文（玉名）|䗠𧍲䗠沙蝨|㳬回㳬|琁美石次玉|璇上同（美石次玉）|𣟳說文曰𣟳味稔棗也|蜁蜁蝸蝸螺也|㔯漉米竹器|還還返|㘣規也又火玄切|䁢好皃|嫙上同（好皃）|鏇圓轆轤也
hgk於緣娟便娟舞皃嬋娟好姿態皃於緣切七|嬛身輕便皃|悁悁憂悒也|蜎蠋皃又狂兗切|𡷡山曲|潫水深|𡣬娥眉說文曰好也
bgg食川船方言曰關西謂之船關東謂之舟又姓出姓苑食川切二|舩上同（方言曰關西謂之船關東謂之舟又姓出姓苑食川切二）
AgE卑連鞭馬策也卑連切六|鯾魚名|鯿上同（魚名）|編次也又布千方典二切|箯竹輿|揙揙擊
RgQ夕連㳄口液也夕連切二|涎上同（口液也夕連切二）
Ogg此緣詮平也說文具也此緣切十九|銓銓衡也又量也次也度也|硂上同（銓衡也又量也次也度也）|痊病瘳|佺偓佺仙人|悛改也止也|駩白馬黑脣|筌取魚竹器|絟細布|譔善言|謜言語和悅|縓爾雅曰一染謂之縓今之紅也又采選切|恮謹皃|荃香草|𠛮剔也|峑山巔|𠥙簙也又竹器名|鐉說文曰所以鉤門戶樞也一曰治門戶器也|拴揀也俗（說文曰所以鉤門戶樞也一曰治門戶器也）
Xgg職緣專擅也單也政也誠也獨也自是也亦姓吳刺客專諸職緣切十二|甎甎瓦古史考曰烏曹作甎|顓顓頊又姓神仙傳有太玄女姓顓頊名和|篿楚詞云索瓊茅以筳篿兮王逸云折竹卜曰篿又音團|嫥可愛之皃|諯說文曰數也一曰相讓又尺絹市專二切|湍水名在鄧州又音煓|膞膞鳥胃也|鱄魚名專諸吳刺客或作鱄|鷒鳥名又徒端切|𩠹𩠹斷首出玉篇|鄟邾䣚邑名
Zgg市緣遄速也疾也市緣切八|篅說文曰以判竹圜以盛穀也|圌上同（說文曰以判竹圜以盛穀也）|諯又職緣尺絹二切|輲無輪車名|輇上同（無輪車名）|椯木名|歂字林云口氣引也又姓史記有歂師
kgo王權員說文作員物數也王權切又云運二音四|圜天體|圓上同（天體）|湲潺湲
Sgg莊緣恮曲卷也莊緣切四|跧屈也伏也蹴也|䀬目眇視也|蟤蜿蟤蛇名
Vgg山員栓木丁也山員切二|𨏉𨏉車軸也
Kgg丑緣猭𤣆猭兔走皃丑緣切二|剶去木枝也
fgY渠焉乾天也君也堅也渠焉切又音干九|虔恭也固也殺也說文曰虎行皃又姓陳留風俗傳云虔氏祖於黃帝|犍犍爲縣在嘉州|鰬魚名|𨜻聚名在河東聞喜也|騝騮馬黃脊|榩廩也構木爲之|鍵鑰也又音件|揵舉也
egY去乾愆過也去乾切十|䇂古文（過也去乾切十）|諐籀文（過也去乾切十）|𠍴俗（虧少一曰馬腹縶亦姓風俗通云閔子騫之後吐谷渾視熊博士金城騫包）|褰褰衣|騫虧少一曰馬腹縶亦姓風俗通云閔子騫之後吐谷渾視熊博士金城騫包|䙭齊魯言袴又己偃切|𧽐蹇足跟也|攐縮也|㗔方言曰㗔㗔歡皃
fgo巨員權權變也反常合道又宜也秉也平也稱錘也又爾雅曰權黃華又姓出天水本顓頊之後楚武王使鬭緍尹權後因氏俗作槯巨員切二十三|拳屈手也廣雅云拳拳憂也又拳拳奉持之皃又姓衛大夫拳彌|狋狋氏縣在代郡氏音精|觠曲角|顴頰骨|踡踡跼不行|婘美皃|孉上同（美皃）|䠰曲脊行也|𤷄手屈病也|犈牛黑耳又音卷|蠸食瓜葉黃甲蟲|齤齒曲|卷曲也又九免九院二切|𪈻𪈻鵒也|𥆗大視皃又音倦|𥁠盌也|𢑆弓曲|鬈髮好也又胡人髮也又音棬|䟒曲走皃|䑏䑏𦝢醜皃|蜷蟲形詰屈|捲說文云气勢也國語曰予有捲勇
Lgg直攣椽屋桷也直攣切二|傳轉也又持戀切又丁戀切
Igg呂員攣攣綴呂員切三|𤼙病也亦作𤼣|䜌南䜌縣在鉅鹿
ego丘圓弮古縣名在滎陽丘圓切五|㒽小幘|棬器似升屈木作|鬈髮好皃|𨟠鄉名在聞喜
hgY於乾焉何也又鳥雜毛說文曰鳥黃色出江淮閒於乾切五|閼閼氏單于妻又音遏|蔫物不鮮也|嫣長皃又人名|鄢人姓又鄢陵縣名又於晚切亦作傿
kgY有乾漹水名出西河也有乾切三|䗡䗡䘎蟲名|焉語助也又於乾切
hgo於權𡣬娥眉皃於權切二|潫水深皃
YgQ尺延燀火起皃尺延切一
@@@丁兮𡰝行不正皃丁全切一
dgo居員勬強健也居員切一
#蕭
QhQ蘇彫蕭蒿也詩云采蕭穫菽亦縣名在沛郡新語云蕭斧名又姓出蘭陵廣陵二望本自宋支子食采於蕭後因爲氏漢侍中蕭彪始居蘭陵彪玄孫望之居杜陵望之孫紹復還蘭陵紹十一代孫整始過江爲廣陵人風俗通云宋樂叔以討南宮萬立御說之功受封於蕭列附庸之國漢相國蕭何即其後氏也蘇彫切十六|簫樂器風俗通云舜作簫其形參差以象鳳翼|彇弓弭|蟰蟰蛸蟲一名長蚑出崔豹古今注|橚橚槮樹長皃|潚水名|𩙚涼風|踃跳踃|㩋擊也又把也|箾舞箾說文云以竿擊人也又音朔|𦐺羽翼敝皃|㲖上同（羽翼敝皃）|艘船摠名又音騷|瞍目無眸子曰瞍又音藪|翛翛翛飛羽聲|撨擇也
FhQ吐彫祧遠祖廟也吐彫切十一|佻輕佻爾雅曰佻偷也|挑挑撥|朓月見西方又吐了切|恌輕薄|𣂁斗旁耳又爾雅云𣂁謂之疀古田器也郭音鍫|庣不滿之皃|銚田器|趒雀行又他弔切|聎耳疾|蓧苗也
EhQ都聊貂鼠屬出東北夷又姓出姓苑都聊切二十二|䯾小兒留髮|𠚥斷穗|刁軍器纂文曰刁斗持時鈴也又姓出渤海風俗通云齊大夫豎刁之後俗作刀|琱琱琢|凋凋落|鯛魚名|䂏短尾犬也|雕鶚屬又姓漢武帝功臣表有雕延年|鵰籀文（鶚屬又姓漢武帝功臣表有雕延年）|蛁蛁蟟茆中小蟲|彫彫刻亦作雕|𧜣說文云短衣也|𧘨死人衣|芀葦華也又音調|𦶌𦶌葫茭實|𦨣吳船|𩾗𩾗鷯剖葦求蟲食似雀青班色|㚋大也多也|奝上同（大也多也）|弴天子弓也說文曰畫弓也詩又作敦又丁昆切|瞗熟視
GhQ徒聊迢迢遰徒聊切二十二|條小枝也貫也教也爾雅云柚條似橙而實酸又姓左傳殷人七族有條氏後趙錄冉閔司空條攸姓苑云安定人|樤柚條或從木|髫小兒髮俗作齠|跳躍也|鋚紖頭銅飾|𧌁𧌁䗤狀如黃蛇魚翼出入有光見則大旱出山海經|蜩大蟬|佻獨行皃詩曰佻佻公子|趒說文曰雀行也|苕苕菜詩云邛有旨苕|芀葦華|調和也又姓周禮有調人其後氏焉又徒料切|鮡魚名|岧岧嶤山高皃|䯾多髮皃又音凋音綢|䩦革轡詩云䩦革沖沖|嬥聲類云細腰皃|𠤼田器|𣬸𣬸㲖毛皃|𠧪草木實垂𠧪𠧪然也|鰷白鰷魚名
dhQ古堯驍驍武也古堯切九|梟說文云不孝鳥也故日至捕梟磔之从鳥頭在木上又姓隋煬帝誅楊玄感改其姓爲梟氏|𥄉到懸首漢書曰三族令先黥劓斬左右趾𥄉首葅其骨謂之具五刑|澆沃也薄也|憿憿幸或作儌又作僥倖|釗覿也遠也亦弩關一云周康王名又作䙼又指遙切|邀遮也又於宵切|蟂水蟲似蛇四足能害人也|徼求也抄也又音叫
IhQ落蕭聊語助也亦姓風俗通有聊倉爲漢侍中著子書又有聊氏爲潁川太守著萬姓譜落蕭切四十二|𦗖耳中鳴也又力刀切|膋腸閒脂也|膫上同（腸閒脂也）|飉風也|遼遠也又水名|憀無憀賴也|竂穿也|寥空也又寂寥也寥廓也|料料理也量也又郎弔切|㙩周垣|橑蓋骨亦椽也又力道切|撩取物又理也|摷擊也又側交切|廖人名左傳有辛伯廖又力救切|僚同官爲僚又姓左傳晉陽氏大夫僚安|寮上同（同官爲僚又姓左傳晉陽氏大夫僚安）|鐐有孔鑪又紫磨金也爾雅曰白金曰銀其美謂之鐐|簝宗廟盛𠟼方竹器|豂空谷|鷯鷦鷯|𥲊竹名|璙玉名|嫽相嫽戲也又力弔切|漻水清也|蟟蛁蟟|瞭目明也|䜮谷名|𧂏草木疎莖|𩯊細長|嶚嶚𡻝山皃|翏高飛皃|繚繚綾經絲出字林|憭空皃|獠夜獵也又知卯盧皓二切|髎臗骨名|𡽐崖虛|蟧馬蟧大蟬|𦿌草器力戈切|敹揀擇|嘹嘹亮聞遠聲又力弔切|熮說文曰火皃
ghQ五聊堯至高之皃謚法曰翊善傳聖曰堯五聊切五|嶢嶕嶢山危|僥僬僥國名人長一尺五寸一云三尺|垚土高皃|顤頭高長皃
ihQ許幺膮豕羹也許幺切七|嘵懼聲詩曰予維音之嘵嘵|憢憢憢懼也|㚠長大皃|𦞵𦠎𦞵腫欲潰也|䎄䎄㲖毛皃|䫞大額又去遙切
hhQ於堯幺幺麼小也於堯切五|怮怮怮憂也又一虯切|葽草盛皃|䱂魚名|㫐望遠也
ehQ苦幺鄡鄡陽縣名在鄱陽又姓出何氏姓苑苦幺切五|郻縣名在鉅鹿郡|𢿣玉篇云擊也|墽地名說文磽也|𡩇𡩇寥空也
#宵
QiQ相邀宵夜也相邀切二十|消滅也盡也息也|霄近天氣也|捎搖捎動也又使交切|逍逍遙|痟痟渴病也司馬相如所患|綃生絲繒也|銷鑠也|焇上同（鑠也）|硝硭硝藥名|蛸螵蛸蟲也爾雅注云一名䗚蟭亦姓南齊武帝改其子巴東主子響爲蛸氏又所交切|莦草名又使交切|哨口不正也又七笑切|𦐺鳥毛羽也|鮹魚名又所交切|𤞚狂也出文字集略|䴛煎鹽|揱長臂又交色角二切|奞張羽又先準切|魈山魈出汀州獨足鬼
KiQ敕宵超說文曰跳也又姓漢有太僕超喜敕宵切六|怊悵恨|欩健也|𢁾細絲|𠰉鳴也|䫿涼風
JiQ陟遙朝早也又旦至食時爲終朝又朝鮮國名亦姓左傳有蔡大夫朝吳陟遙切又直遙切二|𦩻古文（早也又旦至食時爲終朝又朝鮮國名亦姓左傳有蔡大夫朝吳陟遙切又直遙切二）
LiQ直遙鼂蒼頡篇云蟲名亦姓風俗通云衛大夫史𪓙之後漢有𪓙錯直遙切又陟遙切五|晁上同（蒼頡篇云蟲名亦姓風俗通云衛大夫史𪓙之後漢有𪓙錯直遙切又陟遙切五）|鼂古文（蒼頡篇云蟲名亦姓風俗通云衛大夫史𪓙之後漢有𪓙錯直遙切又陟遙切五）|朝朝廷也禮記曰諸侯於天子五年一朝又姓唐有拾遺朝衛|潮潮水
iiY許嬌囂喧也許嬌切又五刀切十|枵玄枵虛危之次|歊熱氣說文曰歊歊氣出皃|毊大磬也爾雅注云形如犁錧以玉石爲之又音喬|獢猲獢短喙犬也|㺧犬黃白色|藃草皃又火交切|呺呺然大皃|𩱴炊氣|䖀白芷別名
PiQ昨焦樵柴也說文木也昨焦切十五|𦿕上同（柴也說文木也昨焦切十五）|劁刈草|憔憔悴瘦也|顦上同（憔悴瘦也）|䏆耳中聲又音曹|譙國名又姓蜀有譙周|嶕嶕嶢|𡻝嶚𡻝山高皃又音巢|鐎又音焦|𨝱縣名|僬又音焦|䩌面枯皃又音焦|撨取也|菬草名
diY舉喬驕馬高六尺舉喬切九|嬌女字亦態|憍憐也恣也本亦作驕|穚禾秀|鷮鷮似雉而小走鳴長尾|蕎藥名一名大戟|喬爾雅云句如羽喬郭璞曰樹枝曲卷似鳥毛羽|簥大管名也|撟舉手
NiQ即消焦傷火也又姓周武王封神農之後於焦後以國爲氏出南安即消切十七|𤓪籀文（傷火也又姓周武王封神農之後於焦後以國爲氏出南安即消切十七）|㲬兜鍪上毛飾|蕉芭蕉|膲人之三膲|鷦鷦鵬南方神鳥似鳳又鷦鷯小鳥|𩾗上同（鷦鵬南方神鳥似鳳又鷦鷯小鳥）|椒木名爾雅云檓大椒又椒榝醜莍莍實也應劭漢官儀曰皇后稱椒房以椒塗壁取其溫也又山巔亦姓楚有大夫椒舉|茮上同（木名爾雅云檓大椒又椒榝醜莍莍實也應劭漢官儀曰皇后稱椒房以椒塗壁取其溫也又山巔亦姓楚有大夫椒舉）|噍啁噍聲|鐎刁斗也溫器三足而有柄|蟭䗚蟭螗蜋卵也|䩌面䩌枯也|𪚱灼龜不兆也亦作𪚰|僬義見僥字|燋傷火說文曰所以然持火也|䌭生枲也
ciQ如招饒益也飽也餘也又姓風俗通云漢有饒斌爲漁陽太守如招切六|橈楫也又女教切|襓劒衣|㹛牛馴伏又而沼切|蟯人腹中蟲|蕘芻蕘
aiQ式招燒火也然也式招切又式照切二|𤬖瓜名
liQ餘昭遙遠也行也餘昭切三十六|媱美好|傜使也役也又喜也或作㑾|繇於也由也喜也詩云我歌且繇|颻飄颻|𣣳氣出皃|窯燒瓦窯也|窰上同（燒瓦窯也）|䔄蒲葉也又草也|𦾺𦾺芅萇楚今羊桃也爾雅作銚|珧玉珧蜃甲|鰩文鰩魚鳥翼能飛白首赤喙常游西海夜飛向北海|銚燒器亦古田器又姓後漢衛尉潁川銚期又徒弔切|姚姚悅美好皃又舜姓今出吳興南安二望左傳有鄭大夫姚句耳|搖動也作也又姓東越王搖句踐之後|謠謠歌也爾雅云徒歌謂之謠|軺說文曰小車也又音韶|愮憂也悸也邪也惑也|恌上同（憂也悸也邪也惑也）|𨙂疾行又音由或作繇|陶皋陶舜臣又徒刀切|蘨草茂也又音由|𤬖瓜也|鷂大雉名爾雅云青質五彩皆備成章曰鷂又音曜|洮五湖名風土記云陽羨縣西有洮湖別名長塘湖義興記曰太湖射湖貴湖陽湖洮湖是爲五湖|烑光也|㿁痤也|𢑄弓利|㫍旗旒|榣木名|嗂樂也說文喜也|䠛跳䠛行步皃|瑤美玉|猺獸名又獏猺狗種也|餆餆餌食|褕褕狄后衣亦作揄
ZiQ市昭韶舜樂也紹也市昭切十|㲈上同（舜樂也紹也市昭切十）|佋廟佋穆也或作昭父昭子穆孝經疏云昭明也穆敬也故昭南向穆北向孫從父坐又市沼切|𦯐草名|𠧙十問|玿美玉|𢃳擊也|軺使車又音遙|柖說文曰樹搖皃又射的也|㸛㸛牀別名
XiQ止遙昭明也光也著也覿也又姓楚詞昭屈景三族戰國策楚有昭奚恤止遙切七|鵃鶻鵃鳥也又竹交切|鉊淮南人呼鎌|招招呼也來也又姓漢有大鴻臚招猛|釗遠也見也勉也亦弩牙又周康王名|盄玉篇器也|皽皮上𦞙膜
AiE甫遙飆風也俗作飈甫遙切十五|標舉也又木杪也又必小切|猋群犬走皃|杓北斗柄星天文志云一至四爲魁五至七爲杓又音漂|瘭瘭疸病名|幖頭上幟也|熛飛火|㠒山峯|𧽤輕行|蔈爾雅曰黃華蔈郭璞云苕華色異名亦不同也|驫眾馬走皃|𦠎𦠎𦞵腫欲潰也|𣄠旌旗飛揚皃|贆貝居陸也|髟髮長皃又所銜切
AiI甫嬌鑣馬銜甫嬌切七|𧥍上同（馬銜甫嬌切七）|臕脂臕肥皃|儦行皃詩云行人儦儦|瀌雪皃詩云雨雪瀌瀌|𦔩除田薉也亦作穮|藨萑葦秀爾雅云猋藨芀
CiE符霄瓢瓠也方言云蠡或謂之瓢論語曰一瓢飲符霄切六|飄老子曰飄風不終朝注云疾風也|剽爾雅云中鏞謂之剽又小輕也或作𠠧|薸方言云江東謂浮萍爲薸|㯱橐也又公混切|螵螵蛸蟲名又撫招切
DiE彌遙蜱蟲名彌遙切五|䖢蠶初生也|篻竹名|㠺玉篇云細網也|𪃦工雀
DiI武瀌苗田苗亦夏獵曰苗又求也眾也禾秀也亦姓風俗通云楚大夫伯棼之後賁皇奔晉食采於苗因而氏焉武瀌切五|描描畫也又音茅|緢說文曰旄絲也|貓獸捕鼠又爾雅曰虎竊毛謂之虦貓又武交切|猫俗（獸捕鼠又爾雅曰虎竊毛謂之虦貓又武交切）
hiU於霄要俗言要勒說文曰身中也象人要自臼之形今作腰又姓吳人要離之後漢有河南令要兢於霄切又一笑切九|腰見上注亦作𦝫（俗言要勒說文曰身中也象人要自臼之形今作腰又姓吳人要離之後漢有河南令要兢於霄切又一笑切九）|葽秀葽草也|喓蟲聲|𧍔蛇名|䙅䙅襻|邀邀遮又音梟|䳩鳥名似山鷄而長尾|蟯腹中蟲又如消切
kiY于嬌鴞鴟鴞于嬌切二|𨚙鄉名在淯
fiY巨嬌喬高也說文曰高而曲也又虜姓前代錄云匈奴貴姓喬氏代爲輔相巨嬌切十六|橋水梁也又姓出梁國後漢有太尉橋玄|趫善走又去遙切|僑寄也客也|㝯上同（寄也客也）|鐈似鼎長足|鷮雉名又音驕|嶠亦作㠐山銳而高又其廟切|毊大磬又虛驕切|轎小車|嬌廣雅云禹妃之名又音驕|蕎蕎麥又音驕|蟜蠪蟜螘也蠪音龍|蹻驕也慢也又巨虐切|䎗飛皃|䀉盂也
OiQ七遙鍫臿也亦作𣂁七遙切十|鐰上同（臿也亦作𣂁七遙切十）|篍吹竹筩又音秋|幧斂髮謂之幧頭亦作幓|㡑上同（斂髮謂之幧頭亦作幓）|𣟼生麻|𣖄抄飯匙也
hiY於喬妖妖豔也說文作𡝩巧也今從夭餘同於喬切五|祅祅災|枖說文云木盛皃詩云桃之枖枖本亦作夭|訞巧言皃|夭和舒之皃又乙矯切
eiU去遙蹻舉足高去遙切又其略切六|繑說文云絝紐也|趬行輕皃|蹺揭足|䫞額大皃又火幺切|㚠長大皃又火條切
YiQ尺招怊奢也尺招切又敕朝切二|弨弓弛皃詩云彤弓弨兮
BiE撫招𤐫說文曰火飛也周禮注云輕𤐫土地之輕脃也今作票同撫招切二十一|漂浮也亦作𣿖|杓北斗柄星|𩙒𩙒𩙂風吹皃|嫖身輕便皃|旚旌旗動皃|犥牛黃白色也又敷沼切|鏢刀劒鞘下飾也|僄輕也又匹妙切|𪅃鳥飛|飄飄颻|慓急也|彯彯彯長組之皃|摽字統云擊也|𧽤說文曰輕行也|𨄏上同（說文曰輕行也）|翲高飛|瞟瞟睽明視|螵螵蛸|嘌疾吹之皃|𦠎𦠎𦞵腫欲潰也
fiU渠遙翹舉也懸也危也又鳥尾也渠遙切六|荍草名今荊葵也|𧄍蓮𧄍草也|嘺不知|䎗側飛|𤖻几也
IiQ力昭燎庭火也力昭切又力照切二|髎髖骨也又音聊
eiY起囂趫善走又緣木也起囂切又巨憍切四|𢄹絝也|橇蹋樀行又禹所乘也|鞽上同（蹋樀行又禹所乘也）
#肴
jjQ胡茅肴骨體也又葅也凡非穀而食曰肴亦啖也胡茅切十九|餚上同（骨體也又葅也凡非穀而食曰肴亦啖也胡茅切十九）|崤崤函山名在弘農|𦺔茅根|殽溷殽雜也和也亂也|洨水名出常山又縣名在沛郡|筊竹索|姣姣婬|猇虎聲又縣名在濟南又直支切|㮁㮁桃梔子|爻易卦六爻|淆混淆濁水|笅小簫一十六管|㬵字書云胶聲也|𨠦沽也|䋂黃色|倄痛聲|㤊快也|䂚石名
djQ古肴交戾也共也合也領也古肴切二十二|蛟龍屬漢書曰武帝元封五年自於尋陽浮江親射蛟江中獲之|茭說文曰乾芻也又爾雅曰茭牛蘄郭璞云今馬蘄葉細銳似芹亦可食|鵁鵁鶄鳥|膠膠漆亦太學也又姓史記紂臣膠鬲|鮫魚名皮有文可飾刀|咬鳥聲|郊邑外曰郊|䍊樂器以土爲之雙相黏爲䍊也|轇轇轕戟形|㶀㶀㵧水皃|䢒說文會也|教效也又古孝切|䉰竹圍索名|𥹜𥹜𥺝米餅|摎束也撓也又音留|鉸鉸刀又古卯切|佼交也又古卯切|𦫶秦𦫶藥名|詨誇語也又音哮|嘐詩云雞鳴嘐嘐|𩎔囊也
UjQ鉏交巢說文曰鳥在木上曰巢在穴曰窠爾雅曰大笙謂之巢又縣名在廬江亦姓有巢氏之後左傳楚有巢牛臣鉏交切八|轈兵車高若巢以望敵也|勦輕捷也又子小切|𡻝山高皃|𣝞蒜束|樔說文曰澤中守艸樓|𡏮地名在聊城|鄛鄉名在南陽
MjQ女交鐃鐃似鈴無舌女交切九|呶喧呶|譊爭也又恚呼也|怓心亂|䴃鳭䴃鳥名也鳭音嘲|𣲿𣲿沙藥名|䃩上同（𣲿沙藥名）|𡽧𡽧崒也|㺜犬多毛又奴刀切
VjQ所交梢船舵尾也又枝梢也所交切十七|捎蒲捎良馬名也亦芟也又音宵|髾髮尾|輎兵車|旓旌旗旒也|弰弓弰|䈰飯帚|筲斗筲竹器|鞘鞭鞘|蛸蠨蛸喜子|鮹海魚形如鞕鞘|䘯衣袵|綃帆維又音宵|颵風聲|莦說文惡草皃又音消|娋小娋偷也|𡡏齊人呼姊
DjA莫交茅草名左氏傳曰前茅慮無明又姓史記秦有茅焦莫交切八|蝥螌蝥蟲名|貓又武瀌切|犛牛名又力之切|罞麋罟也|鶜鶜鴟鳥也|描打也出玉篇|媌美好皃
ijQ許交虓虎聲許交切十六|猇上同（虎聲許交切十六）|髇髇箭|藃禾傷肥又音嚻|穘上同（禾傷肥又音嚻）|窙高氣|嗃嗃謈恚也|䬘風䬘䬘也|哮哮闞|庨庨豁宮殿形狀|灱乾也又熱也|涍水名在河南郡|嘐誇語也|顤䫜顤胡人面也|𩾾鴟𩾾似鳧腳近後不能行|㹲豕驚
AjA布交包包裹亦姓楚大夫申包胥之後後漢有大鴻臚包咸布交切五|胞胞胎又匹交切|枹爾雅注曰樹木叢生枝節盤結詩云枹有三枿又楊枹菜|苞叢生也豐也茂也又苞筍又姓|勹包也象曲身皃
BjA匹交胞胞胎匹交切九|𨚔邑名說文布交切地名|䍖覆車網也又縛謀切|脬腹中水府|拋拋擲|泡水上浮漚說文曰水出山陽平樂東北入泗又音庖|𠐋盛也|𢿏擊也|𦫶藥名
ejQ口交敲擊頭也口交切十一|跤脛骨近足細處|骹上同（脛骨近足細處）|𥉾面不平也|㤍㤍㤉伏態皃|磽石地|䂭䂭磝城戍名今濟州是也出音譜|礉上同（䂭磝城戍名今濟州是也出音譜）|鄗邑名又杜預云山名在滎陽縣西北又音郝|墝墝埆瘠土|頝頝䫜頭不媚也
gjQ五交聱不聽也五交切又五勞語彪二切四|謷不肖也又五勞切|磝䂭磝|𢿣蒼頡篇云擊也
SjQ側交𦗔耳中聲側交切五|罺抄網|抓抓掐|𠿈小兒聲|摷擊也
JjQ陟交嘲言相調也陟交切五|䞴䞴趟跳躍趟竹窅切|啁說文曰啁嘐也|鳭鳭䴃黃鳥|鵃鶻鵃似山鵲而小短尾至春多聲
TjQ楚交䜈代人說也楚交切六|抄略也又初教切|鈔上同（略也又初教切）|𦾱𦾱取|訬健也|䰫疾皃
CjA薄交庖食廚也薄交切十七|咆咆虓熊虎聲|匏瓠也可爲笙竽|炮合毛炙肉也一曰裹物燒|炰上同（合毛炙肉也一曰裹物燒）|鉋鉋刷|瓟似瓠可爲飲器|麃獸名似鹿|掊手掊|颮風聲|鞄鞄皮說文云柔革工也|狍獸名羊身人面目在腋下|跑足跑地也|捊引取亦作抱|尥牛脛相交也又力釣切|泡水名又匹交切|㯡赤黑之漆
hjQ於交䫜頭凹也於交切九|㕭㕭咋多聲|坳地不平也|窅深目皃又烏了切|軪軪軋奇皃又車聲也|眑面目不平又於糾切|咬淫聲|梎梎柌鐮柄|𠣑目深
KjQ敕交䫸熱風敕交切二|嘮嘮呶讙也
IjQ力嘲顟顤顟胡人面狀力嘲切四|𠐋盛也|窌深空之皃|賿謎語云錢又力絞切
LjQ直交䄻禾穭生直交切穭音呂一
#豪
jkQ胡刀豪豪俠說文曰豕鬣如筆管者亦州名屬九江郡古鍾離國與吳爭桑而滅隋改爲州山海經云渠猪之山多豪魚赤尾赤喙有羽胡刀切十三|號大呼也又哭也詩云或號或呼易云先號咷而後笑又乎到切|毫長毛|嗥熊虎聲|獆上同（熊虎聲）|濠城濠又水名|壕上同（城濠又水名）|䫧𩕯䫧大面皃𩕯音刀|𣘫木名|崤山名在弘農又胡交切|𨚙鄉名在南陽|𠢕俊健|𨼍𨼍壑
dkQ古勞高上也崇也遠也敬也又姓齊太公之後食采於高因氏焉出渤海漁陽遼東廣陵河南五望又漢複姓高堂氏出泰山古勞切二十一|膏脂也元命包曰膏者神之液也又澤也肥也|皐高也局也澤也詩云鶴鳴九皋言九折澤也又姓皋陶之後左傳有越大夫皋如|皋上同（高也局也澤也詩云鶴鳴九皋言九折澤也又姓皋陶之後左傳有越大夫皋如）|羔羊子|餻餻糜|㟸㟸㟉古亭|櫜韜也一曰車上囊|咎皋陶舜臣古作咎繇|鼛役事車鼓長丈二尺詩曰鼓鐘伐鼛傳云鼛大鼓也|鷎𪁜鷎鳥名|篙進船竿|槔桔槔|䚌見也|䔌葛之白花|㤒局知也|䆁今之餹䬾曰𥡅|𣓌木名|倃毀也|䓘白䓘草食之不飢|䣗鄉名在范陽
IkQ魯刀勞倦也勤也病也又姓後漢有琅邪勞丙魯刀切二十二|澇水名在京兆又郎到切|牢養牛馬圈亦堅也固也又蒲牢獸名又姓孔子弟子琴牢之後漢石顯之黨有牢梁|窂上同（養牛馬圈亦堅也固也又蒲牢獸名又姓孔子弟子琴牢之後漢石顯之黨有牢梁）|簩竹名一枝百葉有毒|䝁野豆|𧰉上同（野豆）|蟧小蟬一曰虭蟧蟪蛄也|醪濁酒|撈取也|㟉㟸㟉|㗦㗦嘈聲也|髝髝髞高皃|憥苦心皃|𦗖耳鳴又力彫切|䜮䜰䜮深谷皃|𨦭𨦭鑪錍也|𤩂玉名|嫪妬也又力報切|哰囒哰撦挐|𣘪木名|簝宗廟盛𠟼竹器又音寮
ikQ呼毛蒿蓬蒿又姓出姓苑呼毛切七|䜰䜰䜮深谷皃|撓攪也又奴巧切|薧死人里又音考|薅除田草也|茠（除田草也）|𣐾並上同（除田草也）
DkA莫袍毛說文曰眉髮之屬及獸毛也亦姓本自周武王母弟毛公後以爲氏本居鉅鹿避讎滎陽也莫袍切一十|髦髦鬣也髦俊也|芼菜也又音耄|𣹪水名出諸與山|旄旄鉞書曰武王右秉白旄史記曰昴星曰旄頭星徐爰釋疑曰乘輿黃麾內羽仗班弓箭左罼右䍐執罼者冠熊皮冠謂之髦頭也|氂犛牛尾也犛音猫|㮘冬桃|枆上同（冬桃）|酕酕醄醉也|堥前高後下丘名
FkQ土刀饕貪財曰饕土刀切二十八|洮水名出西羌又清汰也|韜藏也寬也說文曰劒衣也|縚上同（藏也寬也說文曰劒衣也）|謟疑也|滔漫也又水流皃|叨叨濫|弢弓衣|𩥓馬行皃|㹗牛羊無子又昌來切|𤘸牛行遟皃|慆悅樂|絛編絲繩也|幍上同（編絲繩也）|𠌪目通白也|槄木名爾雅云槄山榎今山楸也|蜪爾雅曰蝝蝮蜪郭璞曰蝗子未有翅者又音陶|夲說文曰進趣也从大十大十者猶兼十人也|𠦂上同（說文曰進趣也从大十大十者猶兼十人也）|綢爾雅曰素錦綢杠郭璞曰以白地錦韜旗之竿又音紬|搯搯捾周書云師乃搯捾捾烏活切|翢羽葆幢又徒刀切|瑫玉名|𠬢𠬢滑也又𦝫鼓大頭名|䈱牛𥴧|𠚡古器|詜詜䛬言不節|挑挑達往來相見皃詩曰挑兮達兮又條了切
EkQ都牢刀釋名曰刀到也以斬伐到其所也說文云兵也都牢切七|魛魚名|忉憂心皃|裯說文曰祗裯短衣又直流切襌被也|舠小船|𩕯𩕯䫧大面皃|朷木心
QkQ蘇遭騷愁也蘇遭切十三|搔瓟刮|繅繹繭爲絲|繰上同俗又作縿縿本音衫（繹繭爲絲）|臊腥臊|鰠魚名|溞淅米|颾風聲|鱢鯹臭|㮴說文曰船總名也亦作𣔱|艘上同亦作䑹（說文曰船總名也亦作𣔱）|𠋺驕也|慅恐懼
CkA薄襃袍長襦也薄襃切三|袌上同（長襦也薄襃切三）|軳戾也又車軫也
AkA博毛襃進揚美也說文作𧛙衣博裾也又姓禹後因國爲氏博毛切四|褒俗（進揚美也說文作𧛙衣博裾也又姓禹後因國爲氏博毛切四）|𠅬吳主四子字名盟也|𨚔地名
GkQ徒刀陶陶甄尸子曰夏桀臣昆吾作陶周書神農作瓦器又陶正官名齊職儀曰左右甄官署掌塼瓦之作也又喜也正也化也亦姓陶唐之後今出丹陽徒刀切二十五|䛬詜䛬言不節說文曰往來言也一曰小兒未能正言也一曰祝也|䛌上同（詜䛬言不節說文曰往來言也一曰小兒未能正言也一曰祝也）|咷號咷|桃果木名鄴中記石虎苑中有句鼻桃重二斤又姓何氏姓苑云今西陽人後趙石勒將有桃豹|綯爾雅曰綯絞也謂糾絞繩索也|燾覆燾也又徒到切|逃去也避也亡也|鼗大者謂之麻小者謂之料又小鼓著柄者|鞀（大者謂之麻小者謂之料又小鼓著柄者）|鞉並上同（大者謂之麻小者謂之料又小鼓著柄者）|濤波濤|掏掏擇|檮春秋傳云檮杌杜預曰凶頑無儔匹之皃|騊說文曰騊駼北野之良馬又山海經曰北海有獸狀如馬名騊駼|萄蒲萄|翿纛也亦作翢舞者所執也又音導|䬞大風|匋養也|啕多言|翢羽葆幢六音𠬢|錭錭鈍也|駣馬四歲也|蜪蝗子|裪𧝃裪衣袖
NkQ作曹糟粕也作曹切九|𦵩上同（粕也作曹切九）|醩俗（粕也作曹切九）|遭遭逢|㷮火餘木也|槽果華實相半也又才刀切|傮終也|𣩒上同（終也）|㡟藉也
gkQ五勞敖游也說文作𢾕亦姓顓頊大敖之後或作遨五勞切二十五|遨上同（游也說文作𢾕亦姓顓頊大敖之後或作遨五勞切二十五）|翱翱翔|聱不聽又五交切|驁駿馬|熬煎也|嶅山多小石|獒犬高四尺|滶水名出南陽魯陽縣|蔜繁縷蔓生或曰雞腸草也|鷔不祥鳥白身赤口也|鼇海中大鼈|螯蟹屬|謷不肖語也又哭不止悲|嗸眾口愁也|嗷上同（眾口愁也）|䫨高頭也|𢧴戟鋒|摮擊皃|嫯慢也|䦋長大皃|𣘢船接頭木|𦪈上同（船接頭木）|𩪋蟹大腳也|鰲魚名
PkQ昨勞曹曹局也又輩也眾也群也亦州名蓋取古國以名之又姓本自顓頊玄孫陸終之子六安是爲曹姓周武王封曹挾於邾故邾曹姓也魏武作家傳自云曹叔振鐸之後周武王封母弟振鐸於曹後以國爲氏出譙國彭城高平鉅鹿四望昨勞切十四|𣍘古文（曹局也又輩也眾也群也亦州名蓋取古國以名之又姓本自顓頊玄孫陸終之子六安是爲曹姓周武王封曹挾於邾故邾曹姓也魏武作家傳自云曹叔振鐸之後周武王封母弟振鐸於曹後以國爲氏出譙國彭城高平鉅鹿四望昨勞切十四）|槽馬槽|螬蠐螬蟲|嘈喧嘈|鐰鐵剛折也|䄚祭豕先也|艚船艚|䏆耳鳴|𩫥高也|䐬䐬脃|蓸草名|漕衛邑名又水運曰漕又昨到切|褿帬也
hkQ於刀𤏶埋物灰中令熟於刀切三|䥝銅瓫說文云溫器也|鏖上同（銅瓫說文云溫器也）
HkQ奴刀猱猴也奴刀切八|㺜長毛犬又音鐃|𤣜上同（長毛犬又音鐃）|巎山名|嶩平嶩山名在齊出地理志|峱上同（平嶩山名在齊出地理志）|𤫕玉名|獿獸名
ekQ苦刀尻說文𦞠也苦刀切二|訄戲言
OkQ七刀操操持七刀切又七到切四|幧所以裹髻又七搖切|𢿾平持|㡟藉也
BkA普袍㯱囊張大皃普袍切四|藨醋莓可食|䫽輕皃|㲏毛起皃出聲譜
#歌
dlQ古俄歌禮記曰舜作五弦之琴以歌南風釋名曰人聲曰歌歌者柯也以聲吟詠上有下如草木之有柯葉兗冀言歌聲如柯古俄切十一|謌上同（禮記曰舜作五弦之琴以歌南風釋名曰人聲曰歌歌者柯也以聲吟詠上有下如草木之有柯葉兗冀言歌聲如柯古俄切十一）|柯枝柯又斧柯又姓吳公子柯盧之後何氏姓苑云吳人也又虜姓後魏書柯拔氏後改爲柯氏望在河南|妿女師以教女子|㤎法也楷也|渮澤水在山陽湖陵縣|牁所以繫舟又牂牁郡名|戕陸云上同（所以繫舟又牂牁郡名）|滒多汁|哥古作歌字今呼爲兄也|鴚鴚鵝
OlQ七何蹉蹉跌也七何切七|瑳玉色鮮白也又七可切|搓手搓碎也|磋治象牙曰磋|溠水名在義陽|傞舞不止皃又素何切|𪘓齒𪘓跌出字統
ElQ得何多眾也重也又貝多樹名葉如枇杷葉得何切三|𦰿姓也漢有𦰿宗|𦷛上同（姓也漢有𦰿宗）
QlQ素何娑婆娑舞者之容素何切十一|挱摩挱|挲上同（摩挱）|傞舞不止皃又千何切|𩊮𩊮鞄樂器亦謂馬尾|獻獻罇見禮記亦作犧|䓾䓾蔢草木盛皃|𠈱行也又舞不止|桫桫欏木名出崐崘山|䤬䤬鑼銅器|𥆝偷視也
GlQ徒河駝駱駝外國圖云大秦國人長一丈五尺好騎駱駝俗從也餘同徒河切二十三|駞俗（駱駝外國圖云大秦國人長一丈五尺好騎駱駝俗從也餘同徒河切二十三）|鼉說文曰水蟲也似蜥蜴而長大|𡩆𡩆負|紽絲數詩云素絲五紽|鮀魚名|陀陂陀不平之皃陂普河切|驒連錢驄說文曰驒騱野馬也又丁年切|䍫似羊四耳九尾|沱滂沱大雨也詩云月離于畢俾滂沱矣又爾雅云江爲沱謂江水出別爲沱也|跎蹉跎|詑欺也|池虖池水名在并州界出周禮又音馳|酡飲酒朱顏皃|㼠瓦盌|馱馱騎也|迱逶迱行皃|鼧鼠名又託何切|袉裾也又達可切|𩉺𩉺緧|䡐疾馳|𧕛如人羊角虎爪|佗委委佗佗美也又託何切
PlQ昨何醝白酒也昨何切十九|㽨殘薉田也|瘥病也又初介切|䣜䣜縣名在譙郡或作酇酇本音贊|𣩈小疫病也|鹺禮云鹽曰鹹鹺|嵯嵯峨|蒫薺實又子邪切|𥰭籠屬|艖小舸|蔖爾雅曰蓾蔖郭璞曰作履苴草又采古切蓾音魯|䴾穀麥淨也|䑘擣也|䠡蹋也|躦上同（蹋也）|虘虎不柔也又才都切|𪘓齒跌|齹齒本|䰈髮多皃
glQ五何莪草名似䔑蒿詩云蓼蓼者莪五何切十三|哦吟哦|娥美好也又姓後魏將軍娥清|䄉上同（美好也又姓後魏將軍娥清）|峨嵯峨|鵝說文曰鴚鵝也|俄俄頃速也|𩒰齊也|蛾蠶蛾又姓左傳晉大夫蛾析禮記又音蟻|睋視也|涐水名在出汶江|誐嘉善也詩云誐以謐我|硪說文曰石巖也
FlQ託何佗非我也亦虜三字姓後魏書佗駱拔氏後改爲駱氏託何切七|他俗今通用（非我也亦虜三字姓後魏書佗駱拔氏後改爲駱氏託何切七）|拕曳也俗作拖|它說文曰虫也从虫而長象冤曲垂尾形上古艸居患它故相問無它乎|蛇說文同上今市遮切（說文曰虫也从虫而長象冤曲垂尾形上古艸居患它故相問無它乎）|痑馬病又力極也又叨丹切|鼧鼠名
IlQ魯何羅羅綺也古者芒氏初作羅爾雅鳥罟謂之羅又姓出長沙本自顓頊末胤受封於羅國今房州也爲楚所滅子孫以爲氏魯何切十|蘿女蘿|籮篩籮|儸儸出玉篇|饠饆饠|𤄷汨𤄷水名屈原沈處|欏桫欏木名出崐崘山|囉囉歌詞又嘍囉也亦小兒語也|鑼䤬鑼器也|剆擊也
HlQ諾何那何也都也於也盡也詩云受福不那那多也亦朝那縣名在安定又姓西魏揚州刺史那椿諾何切九|㔮獸名似鼠班頭食之明目|𤘟似牛白尾|挪搓挪|儺驅疫|𠹈上同（驅疫）|𡖔多也|𩴓纂文云人值鬼驚聲|臡麋鹿骨醬
jlQ胡歌何辝也說文儋也又姓出自周成王母弟唐叔虞後封於韓韓滅子孫分散江淮閒音以韓爲何字隨音變遂爲何氏出廬江東海陳郡三望胡歌切七|河水名出積石山海經云河出崐崘西北隅發源注海亦州取水以名之爾雅有九河徒駭太史馬頰覆釜胡蘇簡絜鉤盤鬲津|荷爾雅曰荷芙蕖又胡哿切|菏菏菔草也|苛政煩也怒也說文曰小艸也|蚵蜉蠪|魺魚名
ilQ虎何訶責也怒也虎何切五|呵上同（責也怒也虎何切五）|𩑸傾頭|㱒止也|抲擔抲俗
elQ苦何珂馬腦苦何切四|𠳌開口聲|䯊膝骨|軻又苦賀切
hlQ烏何阿曲也近也倚也爾雅云大陵曰阿亦姓風俗通云阿衡伊尹号其後氏焉又虜三字姓四氏後魏書云阿伏于氏後改爲阿氏阿鹿桓氏後改爲鹿氏又有阿史那氏阿史德氏烏何切七|娿媕娿不決媕音庵|痾亦作疴病也|妸女字|妿女師又音哥|䋪繒之細者|鈳鈳䥈小釜
#戈
dlg古禾戈干戈說文云平頭戟也天授年置司戈八品武職古禾切十五|過經也又過所也釋名曰過所至關津以示之也或曰傳過也移所在識以爲信也亦姓風俗通云過國夏諸侯後因爲氏漢有兗州刺史過栩|渦亦作濄水名出淮陽扶溝浪蕩渠又姓三輔決錄有扶風太守渦尚|鍋溫器|𨍋車盛膏器|楇上同一曰紡車收絲具（車盛膏器）|瘑瘡也|㽿上同（瘡也）|𩰫說文曰秦名土釜曰𩰫|𩰬上同（說文曰秦名土釜曰𩰫）|㗻小兒相應也又音禾|緺綬名|堝甘堝|𩾷鳥名|𧒖螗蜋別名
Olg七戈遳脃也七戈切一
Elg丁戈𨹄𨹄堆丁戈切二|𣑫木𣑫也
Qlg蘇禾莎草名亦樹似桄榔其樹出麪蘇禾切十二|魦魚名|莏手挼莏也|𢘿𢘿題縣名在涿郡|趖趖疾|蓑草名可爲雨衣|唆㗻唆小兒相應|𧨀佞也|髿鬖髿髮皃|梭織具晉書陶侃少時漁於雷澤嘗網得一梭以挂於壁上須臾雷雨暴至乃化爲龍而去|𣜤上同（織具晉書陶侃少時漁於雷澤嘗網得一梭以挂於壁上須臾雷雨暴至乃化爲龍而去）|㛗女字穆天子傳云盛姫喪天子三女叔㛗爲主也
ClA薄波婆老母稱也薄波切九|媻說文曰奢也|鄱鄱陽縣名在饒州|皤老人白也|𩕏𩕏𩕏勇舞皃說文同上（老人白也）|繁姓也左傳殷人七族有繁氏漢有御史大夫繁延壽又音煩|搫除也潘岳射雉賦云搫場拄翳又披散也亦音盤|蔢蔢䓾草木盛皃|碆纜繳石又音盤
Glg徒和㸰牛無角也徒和切三|碢碾碢|堶飛塼戲也
DlA莫婆摩研摩又滅也隱也迫也莫婆切十一|𩞁𩞁食也出異字苑|𥂓杯也又莫加切|𡡉𡡉尼|魔鬼魔|䯢偏病|磨磨礪爾雅曰石謂之磨|劘削也|𦟟漏病|𦣆上同（漏病）|䭩哺皃
Plg昨禾矬短也昨禾切五|痤癤也|銼銼𨰠小釜|㭫爾雅云座椄慮李今麥李也或從木|睉小目
glg五禾訛謬也化也動也五禾切七|譌（謬也化也動也五禾切七）|吪並上同（謬也化也動也五禾切七）|鈋刓也去角也|囮網鳥者媒|魤魚名|𠂬木節
Flg土禾詑欺也說文曰兗州謂欺曰詑土禾切五|𧦭俗（欺也說文曰兗州謂欺曰詑土禾切五）|涶水在西河|䛢䛢詆|䜏退言
Ilg落戈𩼊獸名魚身鳥翼落戈切十六|摞理也|騾騾馬也蜀志云後主乘騾車降鄧艾也|驘上同（騾馬也蜀志云後主乘騾車降鄧艾也）|𦿌盛土草器|鸁桑飛鳥也|𣜄木名可爲箭笴|螺蜯屬|蠃上同（蜯屬）|𥢵穀積也或作𥡜|𥡜上同（穀積也或作𥡜）|𧄿草名生水中|𨰠銼𨰠小釜也或作鏍|覼覼縷委曲|腡手指文也|蠡瓠瓢也又禮鹿二音
Hlg奴禾捼捼莏說文曰摧也一曰兩手相切摩也俗作挼奴禾切二|䎠丸熟
AlA博禾波波浪博禾切六|皤老人白皃又音婆|紴錦類又絛屬也|嶓嶓冢山名|番書曰番番良士爾雅曰番番矯矯勇也|碆石可爲矢鏃也
BlA滂禾頗說文曰頭偏也滂禾切又匹我切四|坡坡坂|𨸭𨸭陀不平|玻玻瓈玉西國寶
jlg戶戈和爾雅云笙之小者謂之和和順也諧也不堅不柔也亦州名在淮南漢九江都尉居之屬九江郡齊爲和州又姓出汝南河南二望本自羲和之後一云卞和之後晉有和嶠又虜複姓和稽氏後改爲緩氏戶戈切九|咊古文（爾雅云笙之小者謂之和和順也諧也不堅不柔也亦州名在淮南漢九江都尉居之屬九江郡齊爲和州又姓出汝南河南二望本自羲和之後一云卞和之後晉有和嶠又虜複姓和稽氏後改爲緩氏戶戈切九）|𤖱棺頭|禾粟苗|龢諧也合也或曰古和字|鉌鉌鑾亦作和|䒩草名|㗻小兒相應|盉調五味器
elg苦禾科程也條也本也品也科斷也苦禾切又苦臥切十四|窠窠窟又巢|薖草名又寬大皃|稞青稞麥名|萪萪藤生海邊葉肕可爲篾也|蝌蝌蚪蟲名爾雅曰科斗活東蝦蟆子也字林從虫|㸰牛無角也|犐上同（牛無角也）|課課差又苦臥切|簻簻軸又陟爪切|䈖竹名|㽿禿瘡又古禾切|髁膝骨說文口臥切髀骨也|𠏀美也
hlg烏禾倭東海中國烏禾切七|濄水回|渦水坳|涹濁也|𡑟地𡑟窟也|踒躅也|𥟿燕人云多
ims許𦚢鞾鞾鞋釋名曰鞾本胡服趙武靈王所服許𦚢切四|靴上同（鞾鞋釋名曰鞾本胡服趙武靈王所服許𦚢切四）|𢪎撝也|㗾道經疏云吐氣聲也
hms於靴𦚢𦚢𩨭手足曲病於靴切二|𠏃𠏃𠋧癡皃出釋典
ems去靴𩨷手足疾皃去靴切二|𩨭上同（手足疾皃去靴切二）
fmc求迦伽伽藍求迦切三|茄茄子菜可食又音加|枷刑具又音加
emc丘伽佉丘伽切四|呿張口皃|㰦欠去|𠋧𠏃𠋧
dmc居伽迦釋迦出釋典居伽切又音加一
Olg醋伽脞脃也醋伽切二|㛗訬疾
Nlg子𩨷侳安也子𩨷切二|𩛠骨𩛠出異字苑
fms巨靴瘸腳手病巨靴切一
Img縷𩨷𦣛驢腸胃也縷𩨷切一
#麻
DnA莫霞麻麻紵亦姓風俗通云齊大夫麻嬰之後漢有麻達注論語莫霞切八|犘犘牛重千斤出巴中|蟆蝦蟆亦作蟇|𪓹𪓬𪓹似𪓟鼊生海邊沙中肉甚美多膏|𩔶𩔶䫗難語出陸善經字林|痲痳風熱病|𥂓杯也又莫何切|㦄㦄愍
YoQ尺遮車古史考曰黃帝作車引重致遠少昊時加牛禹時奚仲加馬周公作指南車又姓出魯國南平淮南河南四望本自舜後陳敬仲奔齊爲田氏至漢丞相田千秋以年老得乘小車出入省中時人謂之車丞相子孫因以爲氏漢末避地於魯又複姓二氏世本有齊臨淄大夫車遽氏又有車成氏亦虜複姓魏獻帝命疎屬車焜氏後改爲車氏尺遮切又音居二|硨硨磲
aoQ式車奢張也侈也勝也式車切三|賒不交也|畬燒榛種田又音余
loQ以遮邪琅邪郡名俗作耶瑘亦語助以遮切又似嗟切十三|耶（琅邪郡名俗作耶瑘亦語助以遮切又似嗟切十三）|瑘並見上注（琅邪郡名俗作耶瑘亦語助以遮切又似嗟切十三）|釾鏌釾|鎁上同（鏌釾）|椰椰子木名出交州其葉背面相似|擨擨歈舉手相弄|斜斜谷在武功西南入谷百里而至說文抒也又似嗟切|䓉草名|𦰳木名皮可爲索|䔑穗也|𦭿枲屬|𥯘竹名生臨海
XoQ正奢遮斷也正奢切四|𠌮𠌮儸健而不德|㸙吳人呼父|諸姓也漢有洛陽令諸於何氏姓苑云吳人又職余切
NoQ子邪嗟咨也子邪切十二|𧨁上同（咨也子邪切十二）|罝兔罟也詩有兔罝篇|蒫薺實又昨何切|謯說文𧨹也|瘥爾雅云病也又在何切|𨲠長歎|袓縣名似與切|㜘憍也|怚上同（憍也）|𣩈小疫|䦈䦈丘山在東海
boQ食遮蛇毒蟲又姓後秦錄姚萇后蛇氏也南安人食遮切又音它三|虵俗（毒蟲又姓後秦錄姚萇后蛇氏也南安人食遮切又音它三）|荼爾雅云蔈荂荼即芀也又音徒荂音吁
jng戶花華草盛也色也說文作䔢榮也崔豹古今注曰堯設誹謗木今之華表也西京記謂交午柱戶花切又呼瓜戶化二切十|驊驊騮周穆王馬|鷨鳥名似雉|𧑍蟲名似蛇字林云𧑍大蛇也出魏興啖小蛇及蝮但張口小蛇自入也|鋘鋘鍫|鏵上同（鋘鍫）|釫亦同上（鋘鍫）|樺木名又戶化切|崋西嶽名也又戶化切|划太撥進船也
dng古華瓜說文蓏也廣雅云龍蹄虎掌羊骹兔頭桂髓蜜筩小青大班皆瓜名亦州名本古西戎地左傳范宣子數戎子駒支曰昔秦人迫逐乃祖吾離于瓜州又漢複姓王莽傳有盜賊臨淮瓜田儀古華切七|騧黃馬黑喙|緺青緺綬也|婐女侍又於果切|蝸蝸牛小螺|媧古女后也|㧓引也擊也
ing呼瓜華爾雅云華荂也呼瓜切四|花俗今通用（爾雅云華荂也呼瓜切四）|譁諠譁|𧪮上同（諠譁）
eng苦瓜誇大言也苦瓜切八|䠸䠸𨈚體柔也爾雅作夸毗|夸奢也|姱姱奢皃|跨吳人云坐|胯兩股閒也|𠇗𠇗邪離絕之皃|䯞額上骨也
MnQ女加拏牽也女加切九|詉𧬅詉語皃𧬅張加切|挐絲絮相牽又女書切|摣取也|蒘藸蒘草|𧘽衣敝|𧦮絲𧦮語不解也|𤓷爬𤓷以收除也|笯鳥籠又乃胡切
dnQ古牙嘉善也美也又姓左傳晉大夫嘉父古牙切二十六|家居也爾雅云扆內謂之家又姓風俗通漢有家羨爲劇令|加增也上也陵也|葭葭蘆也說文曰葦之未秀者又音遐|笳笳簫卷蘆葉吹之也|麚牡鹿|䴥上同（牡鹿）|豭豕也子路佩豭說文曰牡豕也|猳俗（豕也子路佩豭說文曰牡豕也）|痂瘡痂|鴐鴐鵞鳥|枷枷鎖又連枷打穀具|袈袈裟|𣮫𣮫㲚毛衣|跏跏趺坐也|𨔣不得進也|𤠙𤠙玃|𧉪米中黑蟲|茄荷莖又漢複姓有茄羅氏|迦漢複姓有迦葉氏又居伽切|珈婦人首飾|瘕病也|犌牛絕有力|幏說文曰南郡蠻夷賨布|貑貑羆又貑貜也並見爾雅注|蟼爾雅云蟼蟆蛙類也又音荊
jnQ胡加遐遠也胡加切十四|蝦蝦蟆|鍜錏鍜|霞赤氣騰爲雲又漢複姓有霞露氏|瑕玉病也過也又姓左傳周大夫瑕禽又漢複姓有瑕呂氏|騢馬赤白雜色|鰕大鯢|䠍腳下|䫗䫛䫗言語無度|碬礪石也春秋傳曰鄭公孫碬字子石|䪗履跟後帖|𩋥上同（履跟後帖）|赮日朝赤色|蕸荷葉
BnA普巴葩花也又草花白亦作皅普巴切七|鈀方言云江東呼鎞箭|妑字林云女字也|蚆貝也爾雅曰蚆博而頯郭璞云頯者中央廣兩頭銳|吧吧呀大口皃|舥舥腳船也|𧣃牛角闊也
hnQ於加鴉烏別名於加切八|鵶上同（烏別名於加切八）|錏錏鍜|㝞㝞𡨀作姿態皃𡨀音宅加切|椏方言云江東言樹枝爲椏杈也|丫象物開之形|䃁碨䃁地形不平|𠜲自刎
AnA伯加巴巴蜀又州取國以名焉三巴記云閬白水東南流曲折三迴如巴字亦蟲名又姓後漢有楊州刺史巴祗伯加切八|鈀兵車又音葩|笆有刺竹籬|豝豕也|芭芭蕉|㿬㿬皻鼻病|蚆又匹加切義見上文|吧吧呀小兒忿爭
TnQ初牙叉交手初牙切九|杈杈杷田器說文曰杈枝也|差擇也又差舛也|靫靫鞴弓箭室也|鎈錢異名出字諟|䐤腵䐤脯也|𠞊㔆物|艖上同（㔆物）|䑡小船名
VnQ所加鯊魚名今之吹沙小魚是也所加切十一|魦上同（魚名今之吹沙小魚是也所加切十一）|沙沙汰說文曰水散石也爾雅曰潁爲沙謂大水溢出別爲小水之名亦州取沙角山爲名即三秦記鳴沙山也又姓何氏姓苑云東莞人又漢複姓二氏左傳齊有夙沙衛神農時夙沙氏之後漢書功臣表有昭沙掉尾又百濟有沙吒氏|砂俗（沙汰說文曰水散石也爾雅曰潁爲沙謂大水溢出別爲小水之名亦州取沙角山爲名即三秦記鳴沙山也又姓何氏姓苑云東莞人又漢複姓二氏左傳齊有夙沙衛神農時夙沙氏之後漢書功臣表有昭沙掉尾又百濟有沙吒氏）|裟袈裟|㲚𣮫㲚毛衣|桬桬棠木名出崐崘山|紗絹屬一曰紡纑也|髿髮髿垂皃|𩊮𩌍𩊮𩌈𩍜履也|硰硰石地名見漢書
gnQ五加牙牙齒又牙旗吳志曰孫權因瑞作黃龍大牙常在軍中諸軍進退視其所向又姓風俗通云周大司徒君牙之後五加切七|衙縣名在馮翊亦衙府又姓秦穆公子食采於衙因氏焉蜀志有晉督護衙傳又音語音魚|芽萌芽|齖䶥齖齒不平正|呀吧呀|枒杈枒|吾漢書金城郡有允吾縣允音鉛
SnQ側加樝似梨而酸或作柤側加切十二|柤上同又煎藥滓（似梨而酸或作柤側加切十二）|𦳏芹楚葵生水中|㪥以指按也|䶥䶥齖|皻皰鼻|抯說文挹也|溠水名出義陽又側稼切|渣上同（水名出義陽又側稼切）|𤹡瘡痂甲也|𥡧赤𥡧稻名|浾棠汁
LnQ宅加𡨀㝞𡨀宅加切十五|䠧䠧跱行難皃|荼苦菜又音徒|䣝亭名在郃陽|𣘻春藏草葉可以爲飲巴南人曰葭𣘻|茶俗（春藏草葉可以爲飲巴南人曰葭𣘻）|秅說文曰秭也周禮云聘禮曰十斗曰斛十六斗曰籔十籔曰秉四秉曰筥十筥曰稯十稯曰秅|𡝐美也|𤶠瘢𤶠瘡痕|𦛝含舌皃|𥥸窊𥥸深皃|塗塗飾又音徒|𨼑丘名|梌吳人云刺木曰梌也|䅊開張屋也又縣名說文作㢉
RoQ似嗟衺不正也似嗟切四|斜上同（不正也似嗟切四）|邪鬼病亦不正也論語曰思無邪|䔑䔑蒿
ZoQ視遮闍闉闍城上重門也視遮切又德胡切五|余姓也見姓苑出南昌郡|鉈短矛又音夷|鍦（短矛又音夷）|𥍸並上同（短矛又音夷）
hng烏瓜窊凹也說文曰汚衺下也烏瓜切六|洼深也亦渥洼水名又於佳切|畖畖留地名在絳州|蛙蝦蟆屬也|窪深也說文曰清水也一曰窊也又水名|哇婬聲
Sng莊華髽婦人喪髻莊華切一
Jng陟瓜檛棰也左氏傳曰繞朝贈之以策杜預云馬檛也或作簻陟瓜切四|簻上同（棰也左氏傳曰繞朝贈之以策杜預云馬檛也或作簻陟瓜切四）|𥬲亦同|膼膇也
CnA蒲巴爬搔也或作把又姓本杞東樓公之後避難改焉西魏襄州刺史把秀蒲巴切三|杷枇杷木名說文曰收麥器也|琶琵琶樂器
UnQ鉏加楂水中浮木又姓出何氏姓苑鉏加切六|查（水中浮木又姓出何氏姓苑鉏加切六）|槎二同（水中浮木又姓出何氏姓苑鉏加切六）|䶥䶥齖又音樝|㢒壞也淮南子云㢒屋之下不可坐也|苴詩傳云水中浮草也
KnQ敕加侘侘傺失意敕加切傺丑例切四|哆張口也|𤵾𤵾癡皃也|㗬緩口又厚脣也
JnQ陟加奓張也陟加切八|𧬅𧬅詉語不正也|觰角上廣也|䅊開張屋也又縣名|𤶠瘡痕|咤達利咤出釋典本音去聲|𪗭噍聲|䐒不密又黏也
inQ許加煆火氣猛也許加切又呼嫁切六|呀唅呀張口皃又呀呷也|谺字統云谽谺谷中大空皃|疨疨病|岈㟏岈山深之狀|颬吐氣又風皃
enQ苦加䶗大齧也苦加切三|㤉㤍㤉伏態之皃㤍苦交切|𡤫㝞𡤫女作姿態
PoQ才邪㚗大口皃才邪切一
coQ人賒若蜀地名出巴中記人賒切又惹弱二音二|婼婼羌西域國名
QoQ寫邪些少也寫邪切一
EoQ陟邪爹羌人呼父也陟邪切一
gng五瓜𣢉歄𣢉猶歄姽也五瓜切二|𩨾䯞𩨾髂骨
enQ乞加𣘟乞加切一
#陽
lpQ與章陽陰陽說文曰高明也爾雅云山東曰朝陽山西曰夕陽又姓出右北平本自周景王封少子於陽樊後裔避周之亂適燕家於無終因邑命氏秦置右北平子孫仍屬焉又漢複姓二十二氏歐陽氏越王句踐之後封于烏程歐陽亭後因爲氏望出長沙呂氏春秋有辯士高陽魋帝顓頊高陽氏之後漢有東海王中尉青陽精少昊青陽氏之後又有御史孫陽放秦穆公時孫陽伯樂之後魯之公族有名子陽者及衛公子趙陽之後並以名爲氏漢有周陽由淮南王舅周陽侯趙兼之後又駙馬都尉涇陽準秦涇陽君之後世本云偪陽妘姓國爲晉所滅子孫因氏焉左傳晉有梗陽巫皋衛有戲陽速漢有博士中山鮭陽鴻又有葉陽氏秦葉陽君之後列仙傳有沛國陵陽子明止陵陽山得仙其後因山爲氏漢有揚州刺史鮮陽戩後漢有櫟陽侯景丹曾孫汾避亂隴西因封爲氏又長沙太守濮陽逸陳留人也神仙傳有太陽子白日升天春秋釋例周有老陽子修黃老術漢有安陽護軍河東成陽恢何氏姓苑有朱陽氏索陽氏與章切三十二|暘日出暘谷|楊赤莖柳爾雅曰楊蒲柳又姓出弘農天水二望本自周宣王子尚父幽王邑諸楊号曰楊侯後并於晉因爲氏也|揚舉也說也導也明也又州名禹貢曰淮海惟揚州李巡曰江南之氣躁勁厥性輕揚故曰揚州|颺風所飛颺|昜飛也又曲昜縣在交阯|羊牛羊禮記凡祭羊曰柔毛崔豹古今注云羊一名髯須主簿又姓出泰山本自羊舌大夫之後戰國策有羊千者著書顯名又漢複姓二氏列士傳有羊角哀左傳晉大夫有羊舌職|样廣雅云样槌也方言曰懸蠶柱齊謂之样|眻美目又餘亮切|佯詐也或作詳|詳上同本音祥（詐也或作詳）|徉忀徉徙倚|洋水流皃又海名又音祥|烊焇烊出陸善經字林|煬釋金又音恙|鍚兵名又馬額飾|𩋬馬額上靻|輰輰䡵車也|敭明敭|瘍瘍傷也說文云瘍頭瘡也周禮療瘍以五毒攻之|鴹𪄲鴹一足鳥舞則天下雨出字統|鰑赤鱺|鸉白鷢|蛘蟲名|禓道上祭一曰道神又舒羊切|崵說文曰崵山在遼西|諹讙也又音恙|瑒玉名|𥂸杯也|𦭵𦭵葲藥名|𦍹多也
RpQ似羊詳審也論也諟也似羊切八|洋水名出齊郡臨胊縣北亦州名本漢成固縣秦爲漢中郡魏置洋州|翔翱翔|庠說文曰禮官養老夏曰校商曰庠周曰序|祥吉也善也|𨀘趨行|𦍙女鬼古作祥禫字|痒病也
IpQ呂張良賢也善也首也長也又姓左傳鄭大夫良霄鄭穆公之子子良之後呂張切十八|梁梁棟又州名書曰華陽黑水惟梁州晉太康記云梁者言西方金剛之氣強梁故因名之舜置也秦爲漢中郡後其地入蜀魏末克蜀分廣漢三巴涪陵以北七郡爲梁州梁大同年復移在南鄭亦姓出安定天水河南三望本自秦仲平王封其少子康於夏陽梁山是爲梁伯後爲秦并子孫奔晉以國爲氏又漢複姓十二氏左傳有梁其踁魯伯禽庶子梁其之後又魯有仲梁懷晉有梁餘子養梁由靡秦有強梁皋莊子有卜梁倚楚文王庶子有食邑諸梁者其後爲氏魯有穀梁赤治春秋史記有將梁氏漢光武時有侍御史梁垣烈新垣衍之後漢明帝時有梁成恢善歷數|粱稻粱廣志曰遼東有赤粱魏武以爲粥也俗作梁|粮粮食|糧上同（粮食）|涼薄也亦寒涼也又州名禹貢雍州之域古西戎地也六國時至秦屬戎狄月氏居焉秦置三十六郡西北唯有隴西北地二郡於漢屬涼州部至武帝改雍州爲涼州後獻帝分渭川河西四郡爲雍州建安十八年復改爲涼州又姓魏志有太子太傅山陽涼茂|凉俗（薄也亦寒涼也又州名禹貢雍州之域古西戎地也六國時至秦屬戎狄月氏居焉秦置三十六郡西北唯有隴西北地二郡於漢屬涼州部至武帝改雍州爲涼州後獻帝分渭川河西四郡爲雍州建安十八年復改爲涼州又姓魏志有太子太傅山陽涼茂）|𩗬北風也又力向切|量量度又力向切|蜋蜣蜋蟲一名蛣蜣又音郎|踉跳踉也又音郎|椋木名|䝶賦也|綡冠纚|𣄴薄也又力尚切|㹁牻牛駁色|䣼漿水|輬轀輬車名
ipc許良香說文作𪏰芳也漢書云尚書郎懷香握蘭許良切五|皀稻香|薌穀氣|鄉鄉黨釋名曰萬二千五百家爲鄉鄉向也眾所向也又姓出姓苑|膷牛羹
apQ式羊商金音度也張也降也常也亦州名即古商國後魏置洛州周爲商州取商於地爲名又姓家語有商瞿式羊切十八|𧶜說文曰行賈也典籍通用商漢書曰通財鬻貨曰商白虎通云居賣曰賈通物曰商俗作𧷞|傷傷損|𥏻傷也又且羊切|殤殤夭|慯憂皃|觴酒器俗作𨢩|湯湯湯流皃本他郎切|蔏蔏陸草也|𪄲𪄲鶊又𪄲鴹也|螪螪羊蟲|㲽水名|䵮說文云赤黑色又餘諒切|禓道上祭也又以章切|饟饋也又式尚切|䵼煑也亦作𩰱|塲耕塲|𤳈上同（耕塲）
CpM符方房房室亦州名即春秋時防渚也秦爲房陵郡唐武德爲房州又姓出清河濟南河南三望本自堯子丹朱舜封爲房邑侯子陵以父封爲氏陵四十八代孫雅王莽末爲清河太守始居清河雅十九代孫諶隨慕容德南遷因居濟南郡生四子豫坦邃熙号四龍今稱四祖房氏符方切七|防防禦也隄防也|坊上同見禮又音方（防禦也隄防也）|魴魚名|方方與縣名又府良切|肪脂肪又音方|鴋澤鸆也又音方
XpQ諸良章篇章又章甫殷冠名禮記曰孔子長居宋冠章甫之冠又明也采也程也又姓秦將有章邯諸良切十五|漳水名山海經曰漳水出荊山南注于沮水|樟豫樟木名|慞懼也|璋半珪曰璋詩云乃生男子載弄之璋|彰明也|墇壅也又之尚切|障隔也又丘山頂上平又音去聲|麞鹿屬|獐上同（鹿屬）|鄣邑名在紀|蔁蔁柳當陸別名|𪅂吳人呼水雞爲𪅂渠|𩌬𩌬泥鞍飾|暲日明
YpQ尺良昌盛也說文曰美言也一曰日光也又姓後漢有東海相昌稀尺良切八|裮衣披不帶|倡樂也優也又音唱|猖猖狂|閶閶闔|琩耳璫|鯧鯧鯸魚名|菖菖蒲藥也
epc去羊羌章也強也發語端也說文云西戎牧羊人字从人羊又姓晉有石冰將羌迪去羊切四|猐上同或從犬（章也強也發語端也說文云西戎牧羊人字从人羊又姓晉有石冰將羌迪去羊切四）|𡸓古文（上同或從犬）|蜣蜣蜋
dpc居良薑菜名說文云御濕之菜史記云千畦薑韭與千戶侯等居良切十五|𧅁上同（菜名說文云御濕之菜史記云千畦薑韭與千戶侯等居良切十五）|畺說文界也|疆上同（說文界也）|壃俗（說文界也）|畕說文曰比田也|㹔牛長脊一曰白脊牛|繮馬組|韁上同（馬組）|殭死不朽也|礓礓石|橿一名檍萬年木又云鋤橿鋤柄也|姜姓也出天水齊姓本自炎帝居於姜水因爲氏漢初以豪族徙關中遂居天水也|䗵蠶白死|僵仆也
LpQ直良長久也遠也常也永也直良切又直向丁丈二切八|萇萇楚蔓生如桃又姓左傳周有大夫萇弘|腸腸胃釋名曰腸暢也通暢胃氣也|場祭神道處又治穀地也|䠆䠆跪方言曰東齊北燕之閒謂跪曰䠆|㙊道也|䗅蚰蜒別名|瓺瓶也又除向切
JpQ陟良張張施也又姓出清河南陽吳郡安定燉煌武威范陽犍爲沛國梁國中山汲郡河內高平十四望本自軒轅第五子揮始造弦寔張網羅世掌其職後因氏焉風俗傳云張王李趙黃帝賜姓也陟良切四|餦餦餭餳也|粻食米|漲水大皃又音帳
cpQ汝陽穰禾莖也又姓齊將穰苴之後何氏姓苑云今高乎人汝陽切十七|禳除殃祭也|攘以手禦又竊也除也逐也止也揎袂出臂曰攘又音讓|𣀮盜也|鑲鉤鑲兵器又息羊切|𨟚縣名在南陽|躟疾行|瀼露濃皃|𩆶上同（露濃皃）|獽戎屬|儴爾雅曰因也|蘘蘘荷|䉴䉴䉛𥂖米竹器|鬤𩬹鬤亂毛|勷劻勷迫皃|瓤瓜實也又女良切|孃亂也又女良切
ApM府良方四方也正也道也比也類也法術也亦官名續漢書曰尚方令掌上手工巧作御刀劒諸好器物也又姓史記周大夫方叔之後府良切十三|汸併船也說文本作方或從水|坊坊巷亦州名本上郡地周於今州界置馬坊武德初置坊州因馬坊爲名漢官宮有太子坊坊亦省名又音房|蚄虸蚄蟲名|肪脂肪|邡什邡縣在漢州|鴋鷝鴋鳥名人面鳥身|枋木名可以作車又蜀以木偃魚爲枋|鈁鑊屬|牥牛名|趽研也說文曰曲脛馬也|䄱禾名|匚受物之器又一斗曰匚也
QpQ息良襄除也上也駕也返也亦州名本楚之西津魏武置襄陽郡西魏改爲襄州因水立名又姓魯莊公子襄仲之後子孫以諡爲氏後漢有襄楷息良切十三|廂廊也亦曰東西室|湘水名在零陵|相共供也瞻視也崔豹古今注云相風烏夏禹作亦相思木名又姓出姓苑又息亮切|緗淺黃|纕馬腹帶國語云懷挾纓纕|忀忀徉|驤馬騰躍又速也低昂也馳駕也|鑲兵器又女羊切|瓖馬帶飾東京賦曰鉤膺玉瓖|欀欀木皮中有如白米屑擣之可爲麵|箱箱籠|葙青葙子也
NpQ即良將送也行也大也助也辝也又姓後趙錄有常山太守將容即良切又子諒切六|漿漿水|鱂鰪鱂魚名鰪烏盍切|蔣菰蔣草又音獎|螿寒螿蟬屬|𢪇說文云扶也字林又作摪
TpQ初良創說文曰傷也禮曰頭有創則沐今作瘡初良切又初亮切三|瘡上同（說文曰傷也禮曰頭有創則沐今作瘡初良切又初亮切三）|𠛂俗（說文曰傷也禮曰頭有創則沐今作瘡初良切又初亮切三）
DpM武方亡無也滅也逃也說文正作亾武方切十二一|芒草端也|莣爾雅曰莣杜榮郭璞云今莣草似茅可以爲繩索履屩|鋩刃端|硭硭硝|杗屋梁又莫郎切|朚惡也又莫郎切|邙縣名在沛郡又洛北山名又音忙|𨛌郡名也又鄉名|望看望又音妄|朢弦朢又音妄
MpQ女良孃母稱女良切四|娘少女之号|瓤瓜實也又音穰|鑲兵器
UpQ士莊牀簀也易曰遜于牀下士莊切三|床俗（簀也易曰遜于牀下士莊切三）|疒病也又女戹切
SpQ側羊莊嚴也又莊田爾雅曰六達謂之莊亦姓莊周著書也側羊切五|㽵俗（嚴也又莊田爾雅曰六達謂之莊亦姓莊周著書也側羊切五）|妝女字又飾也|裝裝束又側亮切|䊋粉飾也
ZpQ市羊常倍尋曰常又官名漢書曰奉常秦官掌宗廟禮儀景帝六年更名太常也釋名曰九旂之名日月爲常謂畫日月於其端天子所建言常明也亦姓出河內漢有常惠市羊切十|尚尚書官名又時仗切|裳上曰衣下曰裳|甞試也曾也說文本作嘗口味之也又姓風俗通云齊孟甞君之後|嘗上同（試也曾也說文本作嘗口味之也又姓風俗通云齊孟甞君之後）|鋿車鋿輪鐵|𩼝魚名|償報也還也當也復也又音尚|𪄹䳯𪄹鳥名|徜徜徉猶徘徊也
VpQ色莊霜凝露也又姓色莊切七|鸘鷫鸘|鷞上同（鷫鸘）|孀寡婦|驦驌驦良馬|騻上同（驌驦良馬）|蠰爾雅云齧桑蝎也又傷餉二音
PpQ在良牆垣牆爾雅云牆謂之墉說文曰牆垣蔽也在良切十|廧上同（垣牆爾雅云牆謂之墉說文曰牆垣蔽也在良切十）|墻俗（垣牆爾雅云牆謂之墉說文曰牆垣蔽也在良切十）|佯弱也|嬙嬪嬙婦人官名|檣船檣|薔薔薇又東薔子十月熟可食出河西子虛賦云東薔彫胡|蘠上同（薔薇又東薔子十月熟可食出河西子虛賦云東薔彫胡）|戕殺也又他國臣來殺君也|𤞛妄強犬也又徂朗切
OpQ七羊鏘鏗鏘七羊切十二|瑲玉聲|槍矟也通俗文云剡葦傷盜謂之槍說文曰歫也|蹌說文曰動也詩曰巧趨蹌兮|蹡行皃|𨄚上同（行皃）|斨斧斨說文云方銎斧也|牄說文云鳥獸來食聲|嶈山高皃|𨶆門聲和也|𥏻傷也又式羊切|搶拒也突也
eps去王匡輔助也正也又姓風俗通云匡魯邑也句須爲之宰其後氏焉漢有匡衡去王切十三|邼邑名說文曰河東聞喜鄉也|筐筐籠|䖱海中大蝦|框棺門|恇怯也|劻劻勷|𩬹𩬹鬤|洭水名出桂陽含洭縣|軭車戾|眶目眶|䒰草名|𩢼耳曲
kps雨方王大也君也字林云三者天地人一貫三爲王天下所法又姓出太原琅邪周靈王太子晉之後北海陳留齊王田和之後東海出自姫姓高平京兆魏信陵君之後天水東平新蔡新野山陽中山章武東萊河東者殷王子比千爲紂所害子孫以王者之後号曰王氏金城廣漢長沙堂邑河南共二十一望又漢複姓五氏左傳晉有樂王鮒小王桃甲賈執英賢傳云東莞有五王氏史記云出齊威王至建王五王之後風俗通云漢有中郎威王弼出自楚威王後漢有新豐令王史音雨方切又雨誑切四|蚟虴孫蟲名又蜻蛚即今促織也|𩵭𩵭鮹魚名|彺急行
hpc於良央中央一曰久也於良切九|鴦鴛鴦匹鳥又烏郎切|殃禍也咎也罰也敗也|䄃上同（禍也咎也罰也敗也）|鉠鈴聲又音英|秧蒔秧又於丈切|霙霙霙白雲皃又音英|胦脖胦|泱水流皃又烏朗切
fpc巨良強健也暴也說文曰蚚也又姓後漢有強華奉赤伏符巨良切四|彊與強通用說文曰弓有力也|䲔鯨魚別名又其京切|勥迫也
KpQ褚羊𦳝草名褚羊切三|倀失道皃又狂也|鼚鼓聲
BpM敷方芳芬芳亦州地多芳草故以名之置在常芳縣又姓風俗通云漢幽州刺史芳乘敷方切三|妨妨害|淓水名
fps巨王狂病也韓子曰心不能審得失之地則謂之狂也巨王切五|軖紡車也|軭說文曰車戾也又去王切|鵟鴟屬|㞷草木妄生狂匡往皆從此
#唐
GqQ徒郎唐說文曰大言也又州春秋時楚地戰國時屬晉後入於韓秦屬南陽郡後魏爲淮州隋爲顯州貞觀改爲唐州因唐城山爲名即高鳳隱所亦姓唐堯之後子孫氏焉出晉昌北海魯國三望徒郎切四十|啺（說文曰大言也又州春秋時楚地戰國時屬晉後入於韓秦屬南陽郡後魏爲淮州隋爲顯州貞觀改爲唐州因唐城山爲名即高鳳隱所亦姓唐堯之後子孫氏焉出晉昌北海魯國三望徒郎切四十）|𥏬並古文（說文曰大言也又州春秋時楚地戰國時屬晉後入於韓秦屬南陽郡後魏爲淮州隋爲顯州貞觀改爲唐州因唐城山爲名即高鳳隱所亦姓唐堯之後子孫氏焉出晉昌北海魯國三望徒郎切四十）|煻煻煨火|糖飴也|糛上同（飴也）|堂堂除亦屋白虎通曰夭子之堂高九尺天子尊故極陽之數九尺也堂之爲言明也所以明禮義也禮記曰天子之堂九尺諸侯七尺大夫五尺士三尺又姓風俗通云堂楚邑大夫五尚爲之宰其後氏焉|坣古文（堂除亦屋白虎通曰夭子之堂高九尺天子尊故極陽之數九尺也堂之爲言明也所以明禮義也禮記曰天子之堂九尺諸侯七尺大夫五尺士三尺又姓風俗通云堂楚邑大夫五尚爲之宰其後氏焉）|𪕹䶈𪕹鼠一月三易腸|棠棠棃又桬棠木生崐崘山黃色赤實味如李食之使人不溺亦姓左傳齊大夫棠無咎又漢複姓吳王闔閭弟夫溉奔楚爲棠谿氏|搪搪揬|蓎蓎蒙女蘿案爾雅作唐蒙不從艹|瑭玉名|餹餹䬾黍膏䬾杜兮切|篖筕篖竹笪|螗蜩螗|𤚫𤚫牛|𤛋上同（𤚫牛）|螳螳蜋禮記仲夏月螳蜋生|塘陂塘|碭芒碭山名又音宕|鶶鶶鷵鳥名似烏蒼白色|𩹶魚名|踼碭跌頓伏皃又吐郎切|闛說文曰闛闛盛皃又他郎切|赯赯赤色|磄磄厗石也|溏池也|䣘地名|傏傏𠊲不遜|隚殿基|䧜隄䧜|𨶈高門也|鎕鎕銻火齊|䉎罩也|𨍴𨍴䡙軘軨|橖車橖|榶榶棣木名案爾雅曰唐棣栘不從木|㲥㲥毦罽也|㼺瓷器
IqQ魯當郎官名又魯邑又姓出中山魏郡二望魯當切三十|蓈說文曰禾粟之穗生而不成者謂之蕫蓈|稂草名似莠說文同上（說文曰禾粟之穗生而不成者謂之蕫蓈）|桹桄桹木名|廊廡也文穎曰廊殿下外屋也|榔檳榔|鋃鋃鐺鎖頭一曰鍾聲|硠硠磕石聲|𪁜𪁜鷎鳥名|浪滄浪水名又盧宕切|䯖䯑䯖股肉䯑苦光切|蜋螳蜋|𩷕魚脂|琅琅玕玉名爾雅曰西北之美者有崐崘璆琳琅玕焉又琅邪郡名今沂州也又姓齊有大夫琅過|瑯琅邪郡名俗作瑯瑘|㝗㝩㝗宮室空皃|狼犲狼說文曰犲似犬銳頭而白頰高前廣後帝王世紀曰有神牽白狼銜鉤入殷朝又姓左傳晉有大夫狼瞫|欴欴㰠貪皃|𦵧𦵧毒藥名|踉踉䠙行皃|莨草名|㟍峻㟍山名冬日所入|䡙𨍴䡙軘軨|艆海中大船|駺馬尾白|躴躴躿身長皃|筤車籃一名𥫵𥫵音替|𥍫短矛|閬高門又盧宕切|哴哴吭吹皃
EqQ都郎當敵也直也主也值也亦州本羌地周置同昌郡隋改爲嘉城鎮貞觀中改爲當州蓋取燒當羌以名之又姓也都郎切十一|鐺鋃鐺|簹篔簹竹名|襠兩襠衣|璫耳珠|𨎴車𨎴|檔木名出文字音義|儅止也又丁宕切|𦡁耳𦡁耳下|㼕㼕瓤瓜中|蟷蟷蠰螗蜋別名亦作𧒾
OqQ七岡倉倉庾也亦官名齊職儀曰大倉令周司徒屬官有廩人倉人則其職也釋名曰倉藏也藏穀物也漢書曰耿壽昌奏設常平倉又姓黃帝史官倉頡之後七岡切七|蒼蒼色也又姓漢江夏太守蒼英|鶬鶬鶊鳥名|𩀞𩀞鴰說文同上（鶬鶊鳥名）|滄滄浪亦州後魏所置蓋取滄海爲名|凔寒皃|𠥐古器也出說文
dqQ古郎岡爾雅曰山脊岡古郎切十六|崗又作堽並俗（爾雅曰山脊岡古郎切十六）|剛強也|㓻俗（強也）|掆舉也|笐說文曰竹列也又爾雅曰仲無笐竹類也|鋼鋼鐵|綱綱紀說文曰維紘繩也|亢星名一曰亢父縣說文人頸也|犅特牛|堈甕也|𤭛上同（甕也）|牨水牛|苀爾雅釋草曰苀東蠡又音杭|魧魚名爾雅云大貝本杭沆二音|迒獸跡又音杭
QqQ息郎桑木名史記曰齊魯千畝桑麻其人與千戶侯等又姓秦大夫子桑之後漢有御史大夫桑弘羊息郎切六|桒俗（木名史記曰齊魯千畝桑麻其人與千戶侯等又姓秦大夫子桑之後漢有御史大夫桑弘羊息郎切六）|𠸶亡也死𠸶也又姓楚大夫𠸶左又息浪切|喪上同（亡也死𠸶也又姓楚大夫𠸶左又息浪切）|𦅇淺黃|𩦌馬色
eqQ苦岡康和也樂也又姓衛康叔之後亦西胡姓苦岡切十四|穅穀皮|糠俗（穀皮）|㱂穀不升謂之㱂|㝩㝩㝗|槺槺梁虛梁也見文選長門賦|𨻷爾雅云虛也本亦作漮|䗧眏𧉅蜻蛉|𥉽䀹𥉽目皃|邟邟城在陽翟|漮說文云水虛也|𤮊瓦也|㼹上同（瓦也）|躿躿躴身長
iqg呼光荒荒蕪又姓呼光切十四|𥡃果蓏不熟又說文曰虛無食也|肓心上鬲下|衁血也|𩣐馬奔|鄺人姓何氏姓苑云今廬江人|𥿼絲曼延也|㠵幭也|𧧢夢言|䀮目不明又狼䀮南夷國名人能夜市金|𣆖旱熱|㡆蒙掩|巟說文曰水廣也|𣺬上同（說文曰水廣也）
jqg胡光黃中央色也亦官名有乘黃令晉官主乘輿金根車也又州名古邾國地秦屬南郡漢西陵縣也隋爲黃州取古黃城爲名亦姓出江夏陸終之後受封於黃後爲楚所滅因以爲氏漢末有黃霸胡光切三十三二|皇君也美也天也說文作皇大也又姓左傳鄭大夫皇頡|璜說文曰半璧也周禮以玄璜禮北方|惶懼也恐也遽也|遑急也|潢說文云積水池也|堭堂堭合殿|煌火狀|餭餦餭餳也|騜馬黃白色|艎艅艎吳王舟名|簧笙簧|隍城池也有水曰池無水曰隍|癀病也|𨝴古國名|湟水名出金城|徨彷徨|篁竹名|鱑魚名|蝗蟲蝗爲災|凰鳳凰本作皇詩傳云雄曰鳳雌曰皇|偟偟暇|媓女媓堯妻|獚犬名|蟥蛂蟥蛢甲蟲也|韹韹樂鐘聲也又音橫|𨜔古縣名|䍿羽舞名|䅣䅭䅣穄名|𤯷榮也|葟上同（榮也）|趪趪趪武皃又張設皃
dqg古黃光明也亦州名漢西陽縣地屬江夏郡梁置光州因浮光山爲名又姓田光之後秦末子孫避地以光爲氏晉有樂安光逸古黃切十四|灮上同（明也亦州名漢西陽縣地屬江夏郡梁置光州因浮光山爲名又姓田光之後秦末子孫避地以光爲氏晉有樂安光逸古黃切十四）|洸水名又烏光切|桄桄桹木名|胱膀胱水府|垙垙陌|𨎩車下橫木|輄上同（車下橫木）|橫長安門名又戶觥切|𩧉決𩧉馬旋毛在脊也|恍武也|茪𦯊茪草名|僙僙僙武皃|侊盛皃
FqQ吐郎湯熱水又姓宋有沙門湯休有文集吐郎切十一|簜水名在鄴今簜陰縣單作湯|鏜以鐵貫物說文曰鼓鐘聲也|闛盛皃又音唐|𧼮𧼮走皃|踼踼跌又杜郎切|盪盪突又徒朗切|蝪蛈蝪蟲名|鼞鼓聲|薚蓫薚馬尾|𦳝上同（蓫薚馬尾）
BqA普郎滂滂沱普郎切七|鎊鎊削|霶霶霈大雨|雱雨雪盛皃詩曰雨雪其雱|䨦上同（雨雪盛皃詩曰雨雪其雱）|磅石聲|𣂆量溢也
hqg烏光汪水深廣又姓汪芒氏之胤姓苑云新安人也烏光切五|尢曲脛俗作尢|尪尪弱說文同上（曲脛俗作尢）|洸水名又音光|𪁘雉鳴
hqQ烏郎鴦鴛鴦匹鳥烏郎切又一良切七|佒體不申也|咉噟聲|𧲱貉屬|㹧上同（貉屬）|眏眏𥉽目皃|姎女人自稱又烏朗切
iqQ呼郎炕煑胘呼郎切又苦朗切四|㰠欴㰠|䐠狼䐠南夷國名|忼咉忼很戾
jqQ胡郎航船也胡郎切十八|筕筕篖|桁械也|行伍也列也又戶庚戶浪戶孟三切|迒獸迹又古郎切|𨁈上同（獸迹又古郎切）|頏頡頏詩傳云飛而上曰頡飛而下曰頏說文音剛與亢同|𦐄飛高下也|魧魚名又大貝|胻脛也|邟餘邟縣名在吳興又音伉|杭州名古於潛餘邟皆別名今餘杭於潛縣並在杭州|沆渡也又胡朗切|蚢爾雅蚢蕭繭郭璞曰食蕭葉者皆蠶類|肮肮犬大脈也|苀東蠡草名|抗舉也又苦浪切|吭鳥喉又下浪切
DqA莫郎茫滄茫莫郎切十四|吂不知也|䀮目不明也|汒谷名在京兆|恾怖也|忙上同（怖也）|朚遽也|邙北邙山名又武方切|芒草端亦姓史記有魏相芒卯又音亡|𥐞𥐞碭山名史記本只作芒|杗大梁又武方切|蘉勉也|𡩩寐語|𨛌鄉名在藍田
NqQ則郎臧善也厚也又姓出東莞本自魯孝公子臧僖伯之後則郎切六|匨古文（善也厚也又姓出東莞本自魯孝公子臧僖伯之後則郎切六）|牂牝羊|戕戕牁亦作牂|贓納賄曰贓|样槌也出廣雅
HqQ奴當囊袋也說文曰囊橐也又姓楚莊王子子囊之後以王父字爲氏奴當切二|蠰蟷蠰即螗蜋也
CqA步光傍亦作旁側也說文曰近也又羌姓步光切十三|彷彷徨|膀膀胱|髈上同（膀胱）|䠙踉䠙急行|趽腳脛曲皃|房阿房宮名|旁爾雅曰上達謂之歧旁謂歧道旁出也說文曰溥也|篣竹箕又薄庚切|𨜷亭名在汝南|螃螃蟹本只名蟹俗加螃字|䅭䅭䅣穄名|騯馬盛皃又甫盲簿庚二切
gqQ五剛卬高也我也又姓漢有御史大夫卬祗五剛切又魚兩切七|䭹千里駒說文又五浪切䭹䭹馬怒皃|枊繫馬柱也劉備縛督郵者又五浪切|昂舉也|䒢昌蒲別名又魚兩切|㭿飛㭿斜桷|䩕履頭
PqQ昨郎藏隱也匿也昨郎切又徂浪切一
eqg苦光䯑䯑䯖苦光切一
AqA博旁幫衣治鞋履出文字集略博旁切五|縍上同（衣治鞋履出文字集略博旁切五）|㨍捍也衛也|𨢐加杯上酒|鞤鞋革皮也
#庚
drQ古行庚更也償也爾雅云太歲在庚曰上章又姓唐有太常博士庚季良又漢複姓莊子有庚桑楚古行切十二|鶊鶬鶊|更代也償也改也又古孟切|䢚兔徑|秔秔稻|稉上同（秔稻）|粳俗（秔稻）|賡續也經也償也|羹羹𦞦爾雅曰肉謂之羹|𩱧古文（羹𦞦爾雅曰肉謂之羹）|埂秦人謂坑也|浭水名出北平
erQ客庚阬爾雅曰虛也郭璞云阬壍也客庚切六|坑上同（爾雅曰虛也郭璞云阬壍也客庚切六）|硎亦同|𥉸𥉸𥌯視不分明|砊砊硠石聲|劥劥㔞有力
DrA武庚盲目無童子武庚切八|蝱蟲也|鄳縣名在江夏|𥋝𥋝盯直視|莔貝母草|𨞚古縣名在義陽|䥰䥰銷|𥭮竹名
jrg戶盲橫縱橫也又姓風俗通云韓王子成號橫陽君其後爲氏戶盲切十六|黌學也|蝗蟲又音皇|鐄大鐘|瑝玉聲說文音皇|喤泣聲|鍠和也樂也又鐘聲說文音皇|䬝䬝䫻暴風|㶇方舟也一曰荊州人呼渡津舫爲㶇或作𦪗|䄓䄘䄓祭名|𧝒𧝒褡小被|𤮏瓦也|𪏓織也|𢘌憕𢘌|韹聲也|彋弸彋帷帳起皃
ArA甫盲閍宮中門也一曰巷門甫盲切六|祊廟門傍祭|𥛱上同（廟門傍祭）|騯騯騯馬行又音傍音彭|嗙喝聲|㔙大也
irg虎橫諻語聲虎橫切五|䎕䎕然飛聲|謍謍謍小聲|嚝鼓鐘聲|喤喤呷也又音橫
drg古橫觵兕角爲酒器受七升罰失禮者古橫切六|觥上同（兕角爲酒器受七升罰失禮者古橫切六）|侊小皃春秋國語曰侊飯不及壼湌|𩃙吳主孫休二子名|䍔網滿|𣘯上同（網滿）
CrA薄庚彭行也道也盛也說文曰鼓聲也又姓大彭之後左傳楚有令尹彭仲爽漢有大司空彭宣薄庚切十七|澎地名又擊水勢又撫庚切|膨膨脝脹皃|蟚蟚螖似蟹而小|䰃䰃鬤亂髮皃鬤乃庚切|棚棧也閣也|榜說文曰所以輔弓弩也又甫孟切|䄘䄘䄓祭名|搒笞打說文又北孟切掩也|蒡菜一名隱荵似蘇可爲葅|篣籠又音旁|𩡕𩡕馞大香|騯馬行盛皃|憉憉惇自強|𣂆量溢|輣兵車又樓車也|𨍩上同（兵車又樓車也）
irQ許庚脝膨脝脹也許庚切三|悙憉悙自強|亨通也或作亯又匹庚許兩二切
KrQ丑庚瞠直視皃丑庚切五|橕撥也又橕柱也|樘上同說文曰衺柱也（撥也又橕柱也）|䟓字書跉䟓行遟皃|竀正視
TrQ楚庚鎗鼎類楚庚切四|鐺俗本音當|槍欃槍祅星|琤玉聲
UrQ助庚傖楚人別種也助庚切五|䚘角長皃|𩫿𩫿鬡亂髮皃|鬇上同（𩫿鬡亂髮皃）|崢崢嶸山皃
hsY於驚霙雨雪雜也於驚切十|鉠鈴聲|韺五韺高陽氏樂亦作英|渶水名出青丘山|鶧繼鶧鳥名|英華也榮而不實曰英也又英俊亦姓漢有英布|瑛玉光|㿮青皃|媖女人美稱|楧楧梅今之雀梅
BrA撫庚磅小石落聲撫庚切四|恲滿也|亨煑也俗作烹又許庚許兩二切|澎澎滜水皃又音彭
CsI符兵平正也和也易也亦州名古山戎孤竹白狄肥子二國之地秦爲遼西郡隨爲北平郡武德初爲平州有盧龍塞又姓齊相晏平仲之後漢有丞相平當又漢複姓何氏姓苑云有平陵乎寧二氏符兵切八|評評量亦評事大理寺官唐初置十二員又音病|苹葭一曰蒲白又曰萍別名又云藾蕭也|枰枰仲木名又博局也|泙水名說文谷也|坪地平|胓牛羊脂也|蚲蚌蚲
dsY舉卿驚懼也說文曰馬駭也舉卿切七|京大也廣雅曰四起曰京風俗通曰京非人力所成天地性自然也京師義亦取此公羊曰京者大也師者眾也天子之居必以眾大之辝言之又姓風俗通云鄭武公子段封於京號京城大叔其後氏焉漢有京房|荊荊楚亦木名可染又州名夏及周並爲州秦爲南郡即郢都之渚宮又姓燕刺客荊軻|麠獸名一角似麃牛尾|麖上同（獸名一角似麃牛尾）|鶁羌鶁鳥|蟼蟼蛙
DsI武兵明光也昭也通也發也又姓出平原河南山公集有平原明普武兵切五|盟盟約殺牲歃血也周禮有司盟|𥁰上同（盟約殺牲歃血也周禮有司盟）|䳟鷦䳟似鳳南方神鳥|鳴嘶鳴又姓出姓苑
LrQ直庚棖門兩旁木直庚切七|盯𥋝盯視皃|澄水清定又音懲|掁掁觸|𣥺距也周禮曰唯角𣥺之|挰舉也|憕憕𢘌失志又音懲
JrQ竹盲趟䞴趟躍跳竹盲切䞴陟交切二|𩘽䬝𩘽狂風
kso永兵榮榮華又姓漢有榮啓期永兵切六|禜祭名又音詠|蠑蠑螈蜥蝪別名|瑩玉色詩云充耳秀瑩母烏定切|揘拔也|嶸崢嶸又戶萌切
AsI甫明兵戎也周禮有司兵掌五兵五盾世本曰蚩尤以金作兵器也甫明切一
iso許榮兄爾雅男子先生曰兄說文長也許榮切一
esY去京卿說文章也公卿春秋漢含孳曰三公象五岳九卿法河海三公法三台九卿法北斗釋名曰漢置十二卿正卿九太常光祿衛尉太僕廷尉鴻臚宗正司農少府又姓風俗通云趙相虞卿之後去京切一
VsQ所庚生生長也易曰天地之大德曰生又姓出姓苑所庚切十|笙樂器也禮記女媧造笙簧釋名曰笙生也象物貫地而生也又簟也吳都賦曰桃笙象簟|牲犧牲|猩猩猩能言似猿聲如小兒也|狌上同（猩猩能言似猿聲如小兒也）|鉎鐵鉎|甥外甥又姓風俗通云晉大夫呂甥之後|䴤獸名大如兔也|鼪鼪鼬鼠也|珄金色
fsY渠京擎舉也渠京切十一|勍強|黥黑刑在面|䵞（黑刑在面）|剠並上同（黑刑在面）|䲔大魚雄曰䲔雌曰鯢|鯨上同（大魚雄曰䲔雌曰鯢）|檠所以正弓|樈鑿柄|葝山薤|䫆頸也
gsY語京迎逢也語京切一
jrQ戶庚行行步也適也往也去也又姓周有大行人之官其後氏焉戶庚切又戶剛戶浪下孟三切十|衡橫也平也又姓風俗通云阿衡伊尹之後又云公衡魯公子後乃氏焉|䯒牛脊後骨|胻牛勢胻也|洐溝水也|筕筕篖竹笪|珩佩上玉|桁屋桁|蘅杜蘅香草大者曰杜若也爾雅注曰杜衡似葵而香字不從艹|𦣍熟肉
MrQ乃庚鬤䰃鬤亂髮皃乃庚切六|㲰犬多毛皃|𤕦說文云亂也一曰窒𤕦|獰惡也|𥣗穀芒長也|𧂘說文曰牂𧂘可以作縻綆
#耕
dtQ古莖耕犁也周書曰神農之時天雨粟神農耕田而種之古莖切一
etQ口莖鏗鏗鏘金石聲也口莖切十五|銵上同（鏗鏘金石聲也口莖切十五）|䡰車鞕又車堅牢|鳽雝渠鳥名|誙莊子曰誙誙如也|牼牛膝骨又人名宋有司馬牼|𡷨或作硎谷名在麗山昔秦密種瓜處|硻說文云餘堅也|殸敵也|㧶琴聲|䡩車聲|硜硜硜小人皃|摼撞也|㰢㰠㰢|羥羊名
DtA莫耕甍屋棟也莫耕切十一|𣞑上同（屋棟也莫耕切十一）|䉚竹筒|萌萌牙|氓民也|甿上同（民也）|嫇嫈嫇新婦皃|蕄爾雅云存存蕄蕄在也又莫登切本亦作萌又作𢡗|𥋝𥋝盯|𧂛苕可爲帚|𥌯𥉸𥌯視不分明
AtA布耕浜布耕切安船溝又布耿切三二|㙃冢口穴也
jtg戶萌宏大也戶萌切十六|紘冠卷也又八紘|紭網紭|閎爾雅曰衖門謂之閎郭璞云閎衖頭門又曰所以止扉謂之閎郭璞云門辟旁長橛也又姓漢有閎孺|嶸崢嶸山峻|嵤上同（崢嶸山峻）|𧮯谷中響一曰谷名也|耾耳語|翃蟲飛|浤浤浤汨汨水波之勢|竑量度周禮考工曰故竑其輻|宖屋響又烏宏切|鈜金聲|吰噌吰鐘音|𥐪玉篇云石聲也|彋弸彋開張也
jtQ戶耕莖草木榦也戶耕切三|䪫樂名亦作莖|牼牛膝下骨又苦耕切
JtQ中莖朾伐木聲也中莖切七|丁上同詩曰伐木丁丁（伐木聲也中莖切七）|玎玎玲玉聲又齊太公子伋諡玎公出說文也|𠑅𠑅𠊰不仁也出聲譜|𧯫𧯫設幕出字林|䟓跉䟓腳細長也|䆸䆸宏闊大皃
htQ烏莖甖瓦器烏莖切十三|罌上同（瓦器烏莖切十三）|罃說文曰備火長頸缾也|鶯鳥羽文也|嚶鳥聲|櫻含桃|嫈嫈嫇又於營切又乙諍切|鸚鸚鵡能言之鳥|譻譻𧭈小聲|鸎黃鸎|褮鬼衣|𠠜芟除林木也出齊人要術|莖爾雅釋草云姚莖涂薺
UtQ士耕崢崢嶸士耕切六|𦱊𦱊薴草亂皃|鬇鬇鬡毛髮亂皃|埩魯城北門池也說文作淨|鏳鏳鎗玉聲|崝淮南子云崝陗也
TtQ楚耕琤玉聲楚耕切五|錚金聲|凈冷也出字書|棦木束|噌噌吰鐘音
MtQ女耕儜困也弱也女耕切七|薴𦱊薴|鬡鬇鬡|𧭈譻𧭈|鑏鐵鑏|䭢充食|嬣嬣体
BtA普耕怦心急又中直皃普耕切十一|姘齊與女交罰金四兩曰姘蒼頡篇曰男女私合曰姘|閛門扉聲|𤘾牛色駁如星也|伻使人|弸弸彋也|䍬使羊|㛁急也|匉匉訇大聲|抨撣也|砰砰磕如雷之聲
itg呼宏轟群車聲呼宏切十|輷上同（群車聲呼宏切十）|䎕群鳥弄翅|揈擊聲|訇匉訇大聲又姓蜀錄關中流人訇琦訇廣|鍧鏗鍧鐘鼓聲相雜也|渹水石聲又大也|𦑟飛聲|𥕗石落聲|𢝁㥊𢝁好嗔皃
AtA北萌繃束兒衣墨子云禹葬會稽桐棺三寸葛以繃束也北萌切五|絣振繩墨也|𢆸上同（振繩墨也）|拼爾雅云使也又從也|䑫艣䑫舟具
LtQ宅耕橙柚屬宅耕切十二|揨撞也觸也|𢾊（撞也觸也）|𢿦並上同（撞也觸也）|湞水名出南海|朾爾雅曰蠪朾螘郭璞云赤駁蚍蜉|虰上同（爾雅曰蠪朾螘郭璞云赤駁蚍蜉）|憕失志皃又音澄|瞪直視皃|䆵䆵𥥈響也|䁎安審視也|䆑小突
htg烏宏泓水深也烏宏切四|謍謍𧭈|宖屋響又戶萌切|𩰎試力士錘
CtA薄萌輣兵車薄萌切五|棚棧也|弸弓弱皃|㥊㥊𢝁好嗔皃|庄平也亦作□
gtQ五莖娙身長好皃漢書曰娙娥婦官也武帝邢夫人號娙娥五莖切二|俓急也
StQ側莖爭競也引也側莖切七|箏樂器秦蒙恬所造|埩理也治也|綪禮云齊則綪結佩|䋫縈也|猙獸名似豹一角五尾又音淨|䱢魚名
#清
OuQ七情清山海經曰太畤之山清水出焉釋名曰清青也去濁遠穢色如青也又靜也澄也潔也七情切二|圊廁也
PuQ疾盈情靜也說文曰人之陰气有所欲也疾盈切五|晴天晴|請受也又在性七井二切|夝說文曰雨而夜除見星也|䝼䝼受賜也
NuQ子盈精明也正也善也好也說文曰擇也易曰純粹精也子盈切十五|氏狋氏縣名狋音權|菁蕪菁菜也|鶄鵁鶄鳥也|蜻蜻𧊿蟋䗿也|晶光也|鼱鼱鼩小鼠|婧竦立也又慈性切|睛目珠子也|𣻒水名在南郡|旌旌旗周禮曰析羽爲旌爾雅注云曰注旄首曰旌|旍上同見禮（旌旗周禮曰析羽爲旌爾雅注云曰注旄首曰旌）|箐笭箐小籠|𩓨䫢𩓨頭不正也|聙聰聽也
luQ以成盈充也滿也又姓出姓苑以成切十二|嬴秦姓|㜲美好皃|瀛大海亦州名漢河閒王國後魏於此立瀛州蓋以瀛海爲名|籝籠也說文笭也漢書曰遺子黃金滿籝不如教子一經亦作籝|楹柱也孔子曰夢奠於兩楹|贏利也益也有餘也財長也|𤟣似狐色黃|䕦菊花一名帝女花|𨜏姓也出姓苑|𦝚魯大夫名|攍擔也
lug余傾營造也度也說文曰市居也亦州名舜分青州爲營州爾雅曰齊曰營州今青州也又姓風俗通云周成王卿士營伯之後漢有京兆尹營郃余傾切六|鎣采鐵又音瑩|塋墓域|䁝惑也又戶扃切|濴波勢回皃|謍說文曰小聲也引詩云謍謍青蠅
huU於盈嬰蒼頡篇云女曰嬰男曰兒又姓風俗通云晉大夫季嬰之後於盈切七|瓔瓔珞|纓冠纓禮記玉藻曰玄冠朱組纓|攖亂也|𨟙地名又一井切|賏貝飾|蘡蘡薁藤也
JuQ陟盈貞正也陟盈切六|楨楨榦題曰楨旁曰榦又女楨冬不凋木也|禎善也祥也|𨜓地名又直貞切|湞湞陽縣名湞水所出|𨺟丘名
KuQ丑貞檉木名說文云河柳也丑貞切八|偵偵候又丑鄭切|赬赤色俗作頳|䞓上同（赤色俗作頳）|䟓跉䟓行不正|竀正視|蟶蚌屬|虰螘也
ZuQ是征成畢也就也平也善也亦州名古西戎地州南八十里有仇池山晉改爲仇池郡後爲南秦州梁廢帝改爲成州又姓出上谷東郡二望本自周文王子成伯之後又漢複姓十五氏莊子有務成子廣成子顏成子游伯成子高韓子有容成子列子有考成子國語晉郤犫食采苦成後因以爲氏世本曰宋有大夫老成方盆成括仕於齊晉有英成僖子漢有廣漢太守古成雲古音枯高祖功臣有陽成延後漢有密縣上成公白曰升天晉戊己校尉燉煌車成將古成氏之後史記有形成氏是征切十|𢦩古文（畢也就也平也善也亦州名古西戎地州南八十里有仇池山晉改爲仇池郡後爲南秦州梁廢帝改爲成州又姓出上谷東郡二望本自周文王子成伯之後又漢複姓十五氏莊子有務成子廣成子顏成子游伯成子高韓子有容成子列子有考成子國語晉郤犫食采苦成後因以爲氏世本曰宋有大夫老成方盆成括仕於齊晉有英成僖子漢有廣漢太守古成雲古音枯高祖功臣有陽成延後漢有密縣上成公白曰升天晉戊己校尉燉煌車成將古成氏之後史記有形成氏是征切十）|城城郭崔豹古今注云城者盛也所以盛受民物也又淮南子曰鮌作城亦姓風俗通云氏於事者城郭園池是也|誠審也敬也信也|宬屋容所受也|郕地名也在東平|筬筬筐織具|盛盛受也黍稷在器也又時正切|珹珠類|䫆頸也
LuQ直貞呈示也平也見也直貞切七|程期也式也限也品也又姓出廣平安定二望本自顓頊重黎之後周宣王時程伯休父入爲大司馬封于程後遂爲氏與司馬氏同|酲酒病|𨜓地名又音貞|珵玉名|䇸筵也|裎佩帶又恥領切
auQ書盈聲聲音又姓左傳蔡太夫聲子書盈切一
XuQ諸盈征行也諸盈切十三|𨒌上同（行也諸盈切十三）|鯖煑魚煎食曰五侯鯖又倉經切|𨢹（煑魚煎食曰五侯鯖又倉經切）|𦙫並上同（煑魚煎食曰五侯鯖又倉經切）|鉦鐃也似鈴|怔怔忪懼皃|正正朔本音政|鴊方言云齊魯閒謂題肩爲鴊鳥|䋊乘輿馬飾|眐獨視皃|𧘿𧘿衳小兒衣出字林|佂佂伀遽行皃
euU去盈輕輕重去盈切三|𨆪一足跳行|鑋說文曰金聲也
DuE武并名名字春秋說題辭曰名成也大也功也号也說文曰自命也从夕口夕者冥不相見故以口自名也又姓左傳楚大夫彭名之後武并切二|洺水名在易陽亦州名春秋時爲赤狄之地後屬晉秦爲邯鄲郡周於此置名州以洺水爲名
IuQ呂貞跉跉䟓呂貞切二|令使也又呂鄭郎丁二切
AuE府盈并合也亦州名舜分冀州爲幽州并州春秋時爲晉國後屬趙秦爲太原郡魏復置并州又姓出姓苑府盈切四|栟栟櫚木名|箳箳篂車轓|屏屏盈徬徨又餅萍二音
euk去營傾側也伏也敧也去營切二|頃西頃地名出地理志說文曰頭不正也又去潁切
RuQ徐盈𩛿飴也徐盈切一
huk於營縈繞也於營切五|褮說文云鬼衣也|嫈小心態又烏莖切|䪯聲也|𢄋覆也
fuk渠營瓊玉名渠營切十七|璚上同（玉名渠營切十七）|煢獨也一曰迴飛也|焭上同（獨也一曰迴飛也）|睘驚視|惸無弟兄也|𢶇博𢶇子一名投子|藑藑茅草也|嬛好也|𡞦上同（好也）|赹獨行皃|憌憂也|𢗋上同（憂也）|𦽓草旋|𦾵上同（草旋）|𨍶車輮規一曰輪車也|㒌特也
Qug息營騂馬赤色也息營切四|𤙡上同（馬赤色也息營切四）|垶赤土|觪角弓
fuU巨成頸項也頸在前項在後巨成切又居郢切四|𩷏魚名|葝鼠尾草又山薤又音擎|𦳲上同（鼠尾草又山薤又音擎）
iuk火營𧵣𧵣貨也火營切一
#青
OvQ倉經青東方色也亦州名九州之一禹貢曰海岱惟青州又男青女青皆木名出羅浮山記亦姓出何氏姓苑又漢複姓三氏風俗通云漢有青烏子善數術又有青牛氏青陽氏倉經切五|鶄鶄鶴鳥也出南海又音精|鯖魚名又諸盈切|蜻蜻蜓蟲方言曰蜻蛉謂蝍蛉也六足四翼又音精|靘䒌靘無色
dvQ古靈經常也絞也徑也亦經緯又姓出何氏姓苑古靈切又音徑四|涇水名淮南子云涇水出薄落之山|鵛鸒鵛鷋也|巠直波爲巠說文曰水脈也
jvQ戶經㓝說文曰罰辠也今只用下文刑戶經切十七|刑法也禮曰刑者侀也侀者成也一成而不可變故君子盡心焉說文剄也|形容也常也|邢地名在鄭亦州名古邢侯國也項羽爲襄國隋爲邢州取國以名之又姓出河閒也本周之胤邢侯爲衛所滅後遂爲氏漢有侍中邢辟直道忤時讁爲河閒鄚令因家焉|𤬐小瓜|䣆鄉名在密|桯牀前長几又音廳|鉶祭器|型鑄鐵模也又作𠜚|陘連山中絕又姓陘晉邑也其大夫氏焉今有井陘縣|侀成也|硎砥石|娙女長皃又五莖切|鈃酒器似鐘而長頸也|㼛（酒器似鐘而長頸也）|𤭓並同上（酒器似鐘而長頸也）|鋞說文曰溫器也圜而直上
GvQ特丁庭門庭又直也亦州名即漢車師後王庭之地本烏孫國土也其前王庭即交河縣是也特丁切二十一|停息也定也止也|鼮鼮鼠豹文漢武帝得此鼠孝廉郎終軍識之賜絹百匹|莛草莖|葶葶藶|筳竹筳|亭今亭子名釋名曰亭停也人所停集也漢典職曰洛陽二十街街一亭十二城門門一亭也|聤耳出惡水|霆雷霆|渟水止|𩹇魚名|綎綬也|娗好皃|㼗甎也|𧖧定息|挺縣名在膠東又徒頂切|楟山棃木名|蜓蜻蜓亦蟪蛄別名|廷風俗通云廷者平也又正也國家朝廷也釋名曰廷停也人所停集之處漢書曰廷尉秦官也應劭曰古官也|㹶猱㹶猨屬|𧓴埤蒼云蠶二眠
EvQ當經丁當也亦辰名爾雅云太歲在下曰強圉又姓本自姜姓齊太公子伋諡丁公因以命族出濟陽濟陰二望當經切八|釘又都定切|玎玉聲|䦺丘名|靪補履下也|虰爾雅曰虰蛵負勞郭璞云或曰即蜻蛉也|仃伶仃獨也|叮叮嚀
ivQ呼刑馨香也呼刑切三|𠷓說文聲也|蛵虰蛵
QvQ桑經星星宿說文曰萬物之精上爲列星淮南子曰日月之淫氣精者爲星辰也又姓羊氏家傳曰南陽太守羊續娶濟北星重女桑經切十二|曐上同出說文（星宿說文曰萬物之精上爲列星淮南子曰日月之淫氣精者爲星辰也又姓羊氏家傳曰南陽太守羊續娶濟北星重女桑經切十二）|腥豕息肉又先定切|胜犬膏臭也|鮏說文云魚臭也|鯹上同（說文云魚臭也）|𥠀稀程|醒酒醒又思挺先定二切|鉎鐵鉎|篂箳篂別駕車轓|猩說文曰猩猩犬吠聲又音生|惺惺𢤄了慧皃出聲類
BvA普丁竮竛竮行不正亦作伶俜普丁切八|俜見上注又匹正切（竛竮行不正亦作伶俜普丁切八）|甹甹夆掣曳說文曰亟詞也或曰甹俠也三輔謂輕財者爲甹|𢖊使也|艵縹色|頩面色又普冷切|姘男女會合|覮淮南子云覮然能聽
IvQ郎丁靈神也善也巫也寵也福也亦州名漢北郡富平縣地赫連勃勃之果園也後魏置靈州取靈武縣名爲之又姓風俗通云齊靈公之後或云宋公子靈圍龜之後晉有餓者靈輒郎丁切八十七|霛（神也善也巫也寵也福也亦州名漢北郡富平縣地赫連勃勃之果園也後魏置靈州取靈武縣名爲之又姓風俗通云齊靈公之後或云宋公子靈圍龜之後晉有餓者靈輒郎丁切八十七）|𩆈並古文（神也善也巫也寵也福也亦州名漢北郡富平縣地赫連勃勃之果園也後魏置靈州取靈武縣名爲之又姓風俗通云齊靈公之後或云宋公子靈圍龜之後晉有餓者靈輒郎丁切八十七）|𩆜廣雅曰玉名說文曰巫以玉事神也與靈同|舲舟上有窻|齡年也|麢大羊|𦏰上同（大羊）|囹囹圄|鴒䳭鴒|䉁竹名|蛉蜻蛉|鈴似鐘而小|霝落也墮也說文曰雨𩂣也从雨𠱠象雨𩂣形或作零|醽淥酒|苓茯苓|櫺窻櫺又櫺檻階際欄|柃說文木也|𩆚空也|伶樂人|泠清泠水也又水名出丹陽又姓左傳周大夫泠州鳩|瓴瓴甋一曰似甖有耳|𧕅說文曰螟𧕅桑蟲也或作蛉|拎手懸捻物|刢刢利使性人也|𧆺似虎而小出南海|𤣘通俗文云猪糞曰𤣘|𤫲小瓜名出安南|玲玲瓏玉聲|𦉢似瓶有耳|𩖊瘦也|㾉上同（瘦也）|聆以耳取聲|竛竛竮|𠄖字類撞𠄖|蘦菜名似葵可食|軨車闌|䡼上同（車闌）|笭笭箐小籠|零落也說文曰徐雨也又姓出姓苑|孁女字|令漢複姓有令狐氏本自畢萬之後國語云晉大夫令狐文子即魏顆也自漢已後世本太原至邁爲王莽所誅邁少子始居燉煌也|𪕌𪕍𪕌班鼠|灵字類云小熱皃|𩟃食飽|𩵀山海經曰神名人面獸身或作龗一曰龍名|龗說文龍也|翎鳥羽|閝門上小窻出崔浩女儀|鹷壃鹷|䴇䴇鳥鶴別名也|昤昑曨日光出道書|駖駖蓋車騎聲|𧖜螢也|𩆮器名又人名也|蕶草蕶落也|酃地名在湘東|詅詅音相次出異字音|彾彾𢓳行皃|䯍𩨾骨|呤埤蒼云呤呤語也|跉徐行不正皃出異字音|狑犬名|𤣤上同（犬名）|爧火光皃|冷冷凙吳人云冰凌又力頂切|怜心了黠皃|𠱠眾鳥也從三口|𦫊𦫊艦有屋舟名|𢺰插空又力定切|澪水名|鏻健也|𥤞草莖疎也|秢穗熟玉篇云年也|䕘鼠耳草也本亦作苓|獜玉篇云獜獜犬聲又力仁切|岭山深皃|魿魚連行皃|𣬹毛結不理玉篇云長毛也|𩚹餌也|紷綼絲一百升又絮名|䉹竹名|砱石砱|阾阪名|羚羊子|姈女字|㸳牛名
HvQ奴丁寧安也說文曰願詞也亦州名禹貢古西戎地秦爲北地郡亦爲豳州又爲寧州奴丁切九|寍說文曰安也从宀心在皿上皿人之食飲器所以安人也|鸋爾雅曰鴟鴞鸋鴂又曰鴽子鸋|䆨天也|𣍆告也又乃定切|𨚶鄉名在馮翊谷口又奴顛切|𧕝螻蛄|嚀叮嚀|聹耳垢又乃鼎切
FvQ他丁汀水際平沙也他丁切十四|訂平議也又徒頂他頂二切|桯碓桯|綎絲綬帶綎|聽聆也又湯定切|廳廳屋|町田處又徒頂切|艼草名|𦉬罟也|䩠皮帶䩠也|鞓上同（皮帶䩠也）|䋼縚屬說文緩也|𦀚上同（縚屬說文緩也）|庁平庁
DvA莫經冥暗也幽也又姓禹後因國爲氏風俗通云漢有冥都爲丞相史莫經切十五|榠榠樝果木|銘銘記釋名曰銘名也記名其功也|鄍晉邑|溟溟濛小雨又溟海也|䫤眉目閒也|螟螟蛉桑蟲說文曰蟲食穀葉者吏冥冥犯法即生螟|𧱴小豚|猽上同（小豚）|蓂蓂莢堯時生於庭隨月彫榮|瞑合目瞑瞑又亡千切|𥹆潰米|嫇好皃|覭小見也又爾雅曰覭髳茀離也又莫的切|暝晦暝也
CvA薄經瓶汲水器也又姓風俗通云漢有太子少傅瓶守後趙錄有北海瓶子然二姓蓋別薄經切十五|缾上同（汲水器也又姓風俗通云漢有太子少傅瓶守後趙錄有北海瓶子然二姓蓋別薄經切十五）|蛢以翼鳴蟲|䶄鼠子說文云䶄令鼠|屏三禮圖曰扆從廣八尺畫斧文今之屏風則遺象也又必郢切|荓荓馬帚以蓍又荓翳雨師名也|䈂竹名|軿輜軿兵車|萍水上浮萍|蓱上同（水上浮萍）|竮竛竮又普經切|郱郱城在東莞|𤳊織蒲爲器|洴莊子曰有洴澼絖造絮者也|箳箳篂別駕車名
jvg戶扃熒光也明也戶扃切六|褮衣開孔也又音縈鬼衣也|螢螢火禮記云季夏月腐草爲螢一名丹良又名蚈|滎小水也又水名在鄭州|䁝䁝惑也又余傾切|𧵣貨也
dvg古螢扃戶外閉關古螢切八|駉駿馬也詩曰駉駉牡馬傳云良馬腹幹肥張也|駫馬肥盛也|坰野外曰林林外曰坰|冋古文（野外曰林林外曰坰）|𪕍𪕍𪕌班鼠|絅引急也|𣕄木名
#蒸
XwQ煑仍蒸眾也進也君也又麁曰薪細曰蒸說文曰析麻中幹也又爾雅曰冬祭曰蒸經典亦作烝煑仍切七|䒱說文同上（眾也進也君也又麁曰薪細曰蒸說文曰析麻中幹也又爾雅曰冬祭曰蒸經典亦作烝煑仍切七）|烝說文曰火氣上行也|𦚦熟也|䕄葅也|篜玉篇云竹也|脀癡皃
ZwQ署陵承次也奉也受也又姓後漢有承宮署陵切二三|丞佐也翊也物理論曰高祖定天下置丞相以統文德立大司馬以整武事爲二府也|𨋬軺車後登也出字林
LwQ直陵澂清也直陵切五|澄上同（清也直陵切五）|瞪直視也又直庚切|憕平也又竹萌切|懲戒也上也
IwQ力膺陵大阜曰陵釋名曰陵崇也體崇高也又犯也侮也侵也遟也又漢複姓六氏吳延陵季子之後有延陵氏高士傳有於陵子仲戰國策有安陵丑呂氏春秋有鉛陵卓子漢有高陵顯秦昭王弟高陵君之後楚有公子食采於鄧陵後以爲氏力膺切十八|淩歷也又水名出臨淮亦姓吳將有淩統|夌說文越也|綾綾紈|凌冰凌|𠗲上同（冰凌）|蔆芰也|菱（芰也）|䔖並同（芰也）|㥄怜也|鯪臨海風土記曰鯪魚腹背皆有刺如三角蔆也|崚崚嶒山皃|㱥㱥殑鬼出皃|𡕮去也|𩜁說文曰馬食穀多氣流四下也本力甑切|掕止也又力證切|祾祭名神靈之福|𣣋欺𣣋俗
hwc於陵膺胷也親也於陵切四|應當也又姓出南頓本自周武王後左傳曰邘晉應韓武之穆也漢有應曜隱於淮陽山中與四皓俱徵曜獨不至時人語之曰南山四皓不如淮陽一老八代孫劭集解漢書|𧕄寒蟬|鷹鳥名月令曰驚蟄之日鷹化爲鳩
CwI扶冰凭依几也扶冰切五|馮周禮馮相氏鄭玄云馮乘也相視也世登高臺以視天文又防戎切|憑憑託|淜說文曰無舟渡河也|㵗水聲
AwI筆陵冫水凍也說文本作仌筆陵切三|冰上同說文本魚陵切（水凍也說文本作仌筆陵切三）|掤說文曰所以覆矢也詩云抑釋掤忌
lwQ余陵蠅蟲也詩云營營青蠅余陵切一
bwQ食陵繩直也又繩索俗作䋲食陵切十二|譝稱舉|憴上同（稱舉）|鱦小魚|乘駕也勝也登也守也說文作椉覆也又姓漢有乘昌爲煑棗侯|椉上同（駕也勝也登也守也說文作椉覆也又姓漢有乘昌爲煑棗侯）|𠅞古文（駕也勝也登也守也說文作椉覆也又姓漢有乘昌爲煑棗侯）|澠水名在齊在傳云有酒如澠又泯緬二音|溗波前後相淩也|塍稻田畦也畔也|塖上同（稻田畦也畔也）|騬犗馬
awQ識蒸升十合也成也又布八十縷爲升識蒸切五|昇日上本亦作升詩曰如日之升升出也俗加日|陞登也躋也|勝任也舉也說文本从舟經典省作月他皆倣此又漢複姓何氏姓苑有勝屠公爲河東太守又書證切|抍上舉易曰抍馬壯吉說文音蒸上聲
cwQ如乘仍因也就也重也頻也又姓出何氏姓苑如乘切七|艿草名謂陳根草不芟新草又生相因艿也所謂燒火艿者也|䚮厚也|辸往也|礽福也|扔引也|㭁木名
dwc居陵兢兢兢戒慎居陵切二|矜本矛柄也巨巾切字㨾借爲矜憐字
JwQ陟陵徵召也明也成也證也經典省作徵又姓吳太子率更令河南徵崇陟陵切四|𨟃古國名|癥腹病|𣃘旌旗柱說文本丑善切旌旗杠皃
PwQ疾陵繒繒帛又姓漢功臣表有繒賀疾陵切六|鄫國名也在琅邪|驓馬名四骹皆白|橧豕所寢也|竲高皃|嶒崚嶒山皃
gwc魚陵凝水結也又成也魚陵切一
iwc虛陵興盛也舉也善也說文曰起也从舁从同同力也亦州名戰國時爲白馬氐之地漢置武都郡魏立東益州梁爲興州因武興山而名虛陵切又許應切三|𨞾說文曰地名也
YwQ處陵稱知輕重也說文曰銓也又姓漢功臣表有新山侯稱忠處陵切又昌證切三|爯并舉也|偁宣揚美事又言也好也揚也舉也足也
fwc其矜殑殑㱡欲死狀其矜切又其拯切二|䔷草名根可緣竹器又音琴
VwQ山矜㱡殑㱡山矜切一
ewY綺兢硱硱磳石皃綺兢切又苦本切一
KwQ丑升僜醉行皃丑升切三|庱亭名在吳興孫權射虎處又丑拯切|睖睖瞪直視
UwQ仕兢磳硱磳仕兢切一
BwI披冰砯水擊山巖聲披冰切一
#登
ExQ都滕登成也升也進也眾也說文曰上車也亦州名漢文帝封悼惠王子爲牟平侯即此地也周爲登州取文登山而名又姓蜀有關中流人始平登定都滕切八|璒石似玉也|燈燈火|簦長柄笠也|㲪毾㲪|䔲金䔲草|㽅瓦器|䳾䳾鶛鳥也
IxQ魯登楞四方木也魯登切六|棱上同又威棱又柧棱木也（四方木也魯登切六）|稜俗（上同又威棱又柧棱木也）|輘車聲|倰倰儯長皃|祾祭也福也靈也
QxQ蘇增僧沙門也梵音云僧伽蘇增切三|鬙鬅鬙髮短|䒏䒐䒏神不爽也
AxA北滕崩說文云山壞也北滕切一
NxQ作滕增益也加也重也又埋幣曰增作滕切十二|憎憎疾|磳硱磳石皃又士殑切|曾則也亦姓曾參之後漢有尚書曾偉古作曾又音層|矰弋射矢也|罾魚網|熷蜀人取生𠟼於竹中炙|䎖舉也又飛鳥皃|竲巢高|橧禮運曰夏則居橧巢|譄加言也|𦼏菎草
DxA武登瞢目不明武登切四|蕄爾雅云存存蕄蕄在也|䒐䒐䒏神不爽也|𦱟穢也
PxQ昨棱層重屋也昨棱切又作滕切三|曾經也又作滕切|䁬目小作態瞢䁬也
CxA步崩朋朋黨也五貝曰朋書云武王悅箕子之對賜十朋也步崩切六|堋射堋|鵬大鳥|棚棚閣又薄庚切|倗輔也又姓漢書王尊傳云南山羣盜倗宗等又匹等切|鬅鬅鬙被髮
jxg胡肱弘大也又姓衛有弘演胡肱切三|鞃𩉦鞃軾中靶也|苰藤苰胡麻也
dxg古弘肱臂也古弘切二|𩉦軾中靶也
ixg呼肱薨說文云公侯卒也呼肱切五|𠐿說文曰惛也|𩖎惛迷也|𩙛𩙛𩙛大風也|𤃫水聲
HxQ奴登能工善也又獸名熊屬足似鹿亦賢能也奴登切又奴代奴來二切一
GxQ徒登騰馳也躍也說文曰傳也一曰犗馬也徒登切十一二|滕國名亦姓滕侯之後以國爲氏|縢行縢|幐囊可帶者|螣螣蛇或曰食禾蟲|藤藤苰又藤蘿|謄移書謄上|𧈜黑虎也|儯倰儯長也|𤻴𤻴痛|鰧魚名蒼身赤尾|𥉋美目皃
jxQ胡登恆常也久也亦州名春秋時鮮虞國地漢爲恆山郡周武帝置恆州因山以爲名爾雅曰恆山爲北嶽又姓楚有大夫恆思公胡登切三|𢛢古文（常也久也亦州名春秋時鮮虞國地漢爲恆山郡周武帝置恆州因山以爲名爾雅曰恆山爲北嶽又姓楚有大夫恆思公胡登切三）|峘爾雅曰小山岌大山峘郭璞云岌謂高過
dxQ古恆揯急也淮南子云大弦揯則小弦絕也古恆切三|緪大索|絙上同（大索）
FxQ他登鼟鼟鼟鼓聲他登切四|膯飽也吳人云出方言|𤃶小水相添益皃|𧰥上同（小水相添益皃）
BxA普朋漰漰渤水擊聲普朋切二|堋堋振動皃
#尤
kyM羽求尤過也甚也怨也多也說文異也又姓出姓苑羽求切九|𣏞木名|腄縣名在東萊|疣結病也釋名曰疣丘也出皮上聚高如地之有丘也|肬上同（結病也釋名曰疣丘也出皮上聚高如地之有丘也）|𪐤籀文（結病也釋名曰疣丘也出皮上聚高如地之有丘也）|沋水名在高密|郵境上舍亦督郵古官号釋名曰督郵主諸縣罰負郵殿糾攝之又姓西京雜記有郵長倩|訧過也博雅曰惡也
hyM於求憂愁也又姓出姓苑於求切十七|優饒也亦優倡又姓史記楚賢臣優孟|瀀瀀渥|𢖒𢖒游本亦作優詩云慎爾優游|麀牝鹿|𪋎上同（牝鹿）|櫌鉏也又打塊槌|鄾邑名在鄧|𢆶微小|怮含怒不言|嚘欭嚘歎也|耰覆種出玉篇|獶獶獀犬名|𧀥菜名|纋笄中|㱊氣逆|妋鼻目閒恨
IyA力求劉剋也陳也殺也亦劉子木名實如棃核堅味酸美出交阯又姓出彭城沛國弘農河閒中山梁郡頓丘南陽東平高平東莞平原廣陵臨淮琅邪蘭陵東海丹陽宣城南郡高堂高密竟陵長沙河南等二十五望並自陶唐氏既衰其後劉累學擾龍事孔甲范氏其後也唯河南一望即虜姓也後魏書官氏志獨孤氏後改爲劉氏力求切四十四|留住也止也說文作畱亦姓出會稽本自衛大夫留封人之後後漢末避地會稽遂居東陽爲郡豪族吳志有左將留贊|蒥蒥荑藥名|勠并力也又力逐切|摎絞縛殺也又姓魏有河內太守摎尚|鶹鶹離鳥名少美長醜亦作流|騮驊騮周穆王馬|駠赤馬黑髦尾|疁田不耕而火種|𥹷粰𥹷饊也|流演也求也覃也放也說文曰水行也|㳅古文（演也求也覃也放也說文曰水行也）|飂高風也|飀上同（高風也）|瘤𠟼起疾也釋名曰瘤流也流聚而生腫也|榴石榴果名博物志云張騫使西域迴所得|瑬美金說文曰垂玉也冕飾今典籍用下文旒|旒旗旒廣雅天子十二旒至地諸侯九旒至軫大夫七旒至轂士三旒至肩|瑠瑠璃|𪕋食竹根鼠又音柳|𤠑上同（食竹根鼠又音柳）|䉧說文云竹聲也又音柳|𥰣竹名出玉篇|瀏水清又音柳|䬟風行聲又音柳|䱖魚名|鰡同上（魚名）|嵧岣嵧羅君山峯|𣠚扶𣠚藤名緣木生其味辛可食其花實似蒟醬|鎦殺也|𦃓綺別名也|𢷶斬刺|䰘殺也|懰㤠也|餾飯氣蒸也又力救切|䖻蜉䖻蟲本作蜉蝣蝣音游|裗爾雅曰衣裗謂之䘽郭璞云衣縷也齊人謂之攣或曰袿衣之飾|𪆱飛鸓鳥名|𪎣麻也|硫石硫黃藥名|遛逗遛|䚧觩䚧角皃|憀悲恨也又音聊|鏐美金曰鏐即紫磨金也
OyA七由秋春秋說文曰禾穀熟也又姓宋中書舍人秋當七由切十七|秌古文（春秋說文曰禾穀熟也又姓宋中書舍人秋當七由切十七）|鞧車鞧|緧上同說文曰馬紂也（車鞧）|𦃈上同周禮曰必𦃈其牛後（上同說文曰馬紂也）|鞦亦上同又鞦韆繩戲古今蓺術圖曰鞦韆北方山戎戲以習輕趫者（上同周禮曰必𦃈其牛後）|湫水池名北人呼|鶖禿鶖鳥亦作𪀖|鰍魚屬亦作鰌|楸木名|萩蕭似蒿也|𪓰爾雅曰鼁𪓰蟾諸郭璞云似蝦蟆居陸地淮南謂之去蚥|䵸上同（爾雅曰鼁𪓰蟾諸郭璞云似蝦蟆居陸地淮南謂之去蚥）|蟗爾雅曰次蟗鼅鼄|䨂雞雛|篍說文云吹筩也玉篇云吹簫也|趥說文曰行皃
lyA以周猷謀也已也圖也若也道也說文曰玃屬一曰隴西謂犬子爲猷以周切四十五|猶上同又尚也似也（謀也已也圖也若也道也說文曰玃屬一曰隴西謂犬子爲猷以周切四十五）|悠遠也遐也思也憂也|油水名出武陵又油脂|由從也經也用也行也又姓史記有由余|攸所也又姓北燕尚書攸邁|蕕水蕕草又臭草|浟水流皃|𠧴氣行皃或作逌|𢋅歋𢋅以手相弄|冘冘豫不定|𨙂行也|輶輶車又易受移授二切|蘨草盛也|秞禾盛皃|蚰蚰蜒|蝣蜉蝣朝生夕死|櫾木名出崐崘山|楢積也又音酉|𦳷水草一名軒于|斿旌旗之末垂者|游浮也放也又姓出馮翊廣平前燕慕容廆以廣平游邃爲股肱|遊上同（浮也放也又姓出馮翊廣平前燕慕容廆以廣平游邃爲股肱）|𨒰古文（浮也放也又姓出馮翊廣平前燕慕容廆以廣平游邃爲股肱）|卣中樽樽有三品上曰彝中曰卣下曰罍|䚻從也|鮋鮂鮋小魚|鯈上同（鮂鮋小魚）|抌抒臼出周禮|揄上同又音俞（抒臼出周禮）|舀上同又以沼切（上同又音俞）|偤侍也出文字辨疑|䍃瓦器|𤪎遺玉又弋九切|邮亭名在高陵|繇猶也|㳛皁也|㾞病也又息惡𠟼|囮鳥媒|㘥上同（鳥媒）|庮久屋木周禮曰牛夜鳴則庮鄭司農云庮朽木臭也又弋久切|㕀空也說文云木生條也引書云若顛木之有㕀枿又胡感切|𣔴上同（空也說文云木生條也引書云若顛木之有㕀枿又胡感切）|𧡹下視深也|𦵵說文草也
gyM語求牛大牲也世本曰黃帝臣胲作服牛史記曰紂倒曳九牛又姓出隴西本自殷周封微子於宋其裔司寇牛父帥師敗狄長丘死之子孫以王父字爲氏風俗通云漢有牛崇爲隴西主簿馬文淵爲太守羊喜爲功曹涼部云三牲備具語求切一
NyA即由遒盡也即由切又自秋切十一|鮂烏化爲魚頂上有細骨如禽毛|䎿耳鳴聲|蝤蝤蛑似蟹而大生海邊也又自秋切|啾啾唧小聲|逎縣名在燕又迫也促也|𩭓接髮|揂聚也|揫束也聚也|湫水名又子小切|𣟼聚也又束枲也
PyA自秋酋長也說文曰繹酒也禮有大酋掌酒官也自秋切十|㥢慠也|遒盡也又即由切|䎿耳中聲也又即由切|崷崷崪山峻皃|鰌魚名二月有之|蝤蝤蠐蝎也|煪煪熮|𧤕隿射收繳角也|𦵩𦵩液周禮音糟
QyA息流脩脯也又長也又姓漢有屯騎校尉脩炳姓苑云今臨川人息流切七|修理也說文飾也|羞恥也進也又致滋味爲羞|𩛢𩛢饙|𩝧上同（𩛢饙）|䡭䡭䡜載喪車|樇木名
KyA丑鳩抽拔也引也或作紬紬引其端緒也丑鳩切八|𢭆上同（拔也引也或作紬紬引其端緒也丑鳩切八）|㨨上同見說文（拔也引也或作紬紬引其端緒也丑鳩切八）|婤好皃又音周|𥈌失意視皃|惆惆悵|瘳病愈|妯詩曰憂心且妯妯動也悼也
e0Y去秋𠁫戾也去秋切三|惆上同（戾也去秋切三）|𣪘𣪘屈
YyA赤周犫白色牛說文曰牛息聲也又姓風俗通云晉大夫郤犫之後呂氏春秋云陳有惡人焉曰敦洽犫糜狹顙廣額顏色如漆陳侯悅之赤周切二|犨上同（白色牛說文曰牛息聲也又姓風俗通云晉大夫郤犫之後呂氏春秋云陳有惡人焉曰敦洽犫糜狹顙廣額顏色如漆陳侯悅之赤周切二）
XyA職流周周帀也又至也備也徧也密也又姓出汝南廬江尋陽臨川陳留沛國泰山河南等八望本自周平王子別封汝川人謂之周家因氏焉一云赧王爲秦所滅黜爲庶人百姓稱爲周家因而氏焉魏官氏志獻帝次兄普氏後改爲周氏又漢複姓魏初徵士燉煌周生烈晉武帝中經簿云周生姓烈名職流切十|州州郡周禮曰五黨爲州又姓左傳晉大夫州綽|𥺝𥹜𥺝米粉餅出字林|輖重載也|洲洲渚也爾雅曰水中可居曰洲|賙贍也|喌呼雞聲又音祝|舟舟船墨子曰工倕作舟呂氏春秋曰虞姁作舟世本曰共鼓貨狄作舟二人並黃帝臣又姓左傳晉大夫舟之僑|郮黃帝後所封國|婤女字左傳衛襄公有嬖人婤姶又音抽
ZyA市流讎匹也仇也市流切十|𣫐懸擊也|𣀓上同說文棄也（懸擊也）|鮋魚名又直留切|酬周也報也以財貨曰酬又酬酢|醻上同說文本作𨢫主人進客也（周也報也以財貨曰酬又酬酢）|詶以言荅之又之又切|雔說文曰雙鳥也又爾雅曰雔由樗繭郭璞云食樗葉俗作㘜|魗惡也棄也又音醜|𨞪蜀江原地又音儔
cyA耳由柔順也說文曰木曲直也耳由切十六|鍒鐵之耎也|㽥良田|騥馬青驪也|蝚爾雅云蛭蝚至掌又云蝚蛖螻蛭音質|蹂踐穀又而九切|葇香葇菜|鞣熟皮|鰇魚名|瑈玉名也見聲類|腬肥皃|鶔鶝鶔鳥|揉捻也又順也詩曰揉此萬邦又汝又切|䰆馬之繁鬣|𨛶鄉名|䐓面和
ayA式州收斂也捕也又夏冕名史記曰堯黃收純衣俗作収式州切一
eyM去鳩丘聚也空也大也又丘陵爾雅非人爲之曰丘郭璞云地自然生說文作丠亦姓出吳興河南二望風俗通曰魯左丘明之後又云齊太公封於營丘支孫以地爲氏代居扶風漢末丘俊持節江淮屬王莽篡位遂留江左居吳興也又漢複姓四十四氏左傳齊有藉丘子鉏梁丘據閭丘嬰莒有著丘公渠丘公後並因邑爲氏晉有虞丘書爲乘馬御祖氏家記有太中大夫東安於丘淵史記有狐丘子林楚有苞丘先生齊桓公至麥丘麥丘人年八十三祝桓公封於麥丘其後氏焉孟子齊有曼丘不擇又有咸丘蒙隱居列仙傳有浮丘公梁州刺史莊丘黑魯莊公庶子食采於瑕丘其後氏焉齊有勇士葘丘訢神仙傳漢有稷丘子又有廩丘充隱居齊魯之閒楚有列威將軍何丘寄楚文王庶子食采於軒丘其後爲氏周宣王支庶食采於謝丘其後爲氏漢有趙人吾丘壽王又有曹丘先生侍御史余丘炳鉅鹿太守莊丘勝以勇力聞安丘望之注老子列仙傳有高邑人商丘子胥藝文志有桑丘公漢有吳人龍丘萇隱居不屈濟北蛇丘惑爲河內太守魏有幽豫二州刺史母丘儉吳有平原陶丘洪晉有雍丘洛以武力聞何氏姓苑云漢有司隷校尉水丘岑古有蔡丘欣喪馬淮陽東海北丘氏又有羌丘常丘崎丘獻丘陽丘逢丘厚丘泥丘等氏又虜複姓二氏後魏獻帝次弟丘敦氏後改爲丘氏丘林氏後改爲林氏去鳩切六|丠古文（聚也空也大也又丘陵爾雅非人爲之曰丘郭璞云地自然生說文作丠亦姓出吳興河南二望風俗通曰魯左丘明之後又云齊太公封於營丘支孫以地爲氏代居扶風漢末丘俊持節江淮屬王莽篡位遂留江左居吳興也又漢複姓四十四氏左傳齊有藉丘子鉏梁丘據閭丘嬰莒有著丘公渠丘公後並因邑爲氏晉有虞丘書爲乘馬御祖氏家記有太中大夫東安於丘淵史記有狐丘子林楚有苞丘先生齊桓公至麥丘麥丘人年八十三祝桓公封於麥丘其後氏焉孟子齊有曼丘不擇又有咸丘蒙隱居列仙傳有浮丘公梁州刺史莊丘黑魯莊公庶子食采於瑕丘其後氏焉齊有勇士葘丘訢神仙傳漢有稷丘子又有廩丘充隱居齊魯之閒楚有列威將軍何丘寄楚文王庶子食采於軒丘其後爲氏周宣王支庶食采於謝丘其後爲氏漢有趙人吾丘壽王又有曹丘先生侍御史余丘炳鉅鹿太守莊丘勝以勇力聞安丘望之注老子列仙傳有高邑人商丘子胥藝文志有桑丘公漢有吳人龍丘萇隱居不屈濟北蛇丘惑爲河內太守魏有幽豫二州刺史母丘儉吳有平原陶丘洪晉有雍丘洛以武力聞何氏姓苑云漢有司隷校尉水丘岑古有蔡丘欣喪馬淮陽東海北丘氏又有羌丘常丘崎丘獻丘陽丘逢丘厚丘泥丘等氏又虜複姓二氏後魏獻帝次弟丘敦氏後改爲丘氏丘林氏後改爲林氏去鳩切六）|蓲烏蓲草名|蚯蚯蚓蟲名禮記孟夏月蚯蚓出|邱地名|訄迫也
ByM匹尤䬌風吹皃匹尤切七|秠一稃二米又芳鄙切|𡫺寐作聲|衃凝血|肧孕一月又普回普來二切|紑說文云白鮮衣皃又甫鳩切|醅醉飽又普裴切
dyM居求鳩鳥名又聚也居求切十|𦫶秦𦫶藥名又居由切|𠠳大力|朻高木又居虯切|䡂車軫長也|㽱腹中急痛又古巧切|鬮鬮取也又音糾|丩相糾繚也|龜又居危切|勼說文聚也
AyM甫鳩不弗也又姓晉書有汲郡人不準盜發六國時魏王冢得古文竹書今之汲冢記也甫鳩切又甫九甫救二切五|哹吹氣|紑詩傳云潔鮮貌|䍍未燒瓦器|鴀鴀鳩鳥也
VyA所鳩𢯱索也求也聚也所鳩切十七|搜上同凡從叜者作叟同（索也求也聚也所鳩切十七）|餿飯壞|颼颼飋風皃|溲小便|鎪馬金耳飾|廋匿也論語曰人焉廋哉|蒐茅蒐草又春獵曰蒐|䕅鷄腸草也|獀獶獀南越人名犬|䐹乾魚|鄋北方國名|螋蛷螋蟲亦名蠷螋|騪𩢸騪蕃中大馬|犙牛三歲也又息含切|醙白酒|𧽏𧻖𧽏不進
TyA楚鳩搊手搊楚鳩切七|𢬆俗餘倣此|篘酒篘|醔上同（酒篘）|㮲板木不正|𥻤𥻤粉|謅謅䜉陰私小言
SyA側鳩鄒縣名屬兗州又姓漢有鄒陽側鳩切十四|鄹上同（縣名屬兗州又姓漢有鄒陽側鳩切十四）|郰說文云孔子之鄉也論語作鄹|騶廏御亦騶虞仁獸又姓越王之後|齱齱齵齒偏|陬鄉名一曰隅也|緅青赤色也又子侯切|䑼艆䑼海船名|𨃘獸足也|菆草名又矢之善者說文曰麻蒸也一曰蓐也|棷薪之別名又叉茍切|箃竹柴別名|𠿈小兒聲|黀聚麻
UyA士尤愁憂也悲也苦也士尤切二|㵞腹中有水氣也
iyM許尤休美也善也慶也息也又木名許尤切十三|貅貔貅猛獸|㹯上同（貔貅猛獸）|鵂鵂鶹鳥也|𩢮馬名|㾋下病|庥爾雅曰庇庥廕也郭璞曰今俗呼樹蔭爲庥|脙瘠也俗作䏫又音求|𦜵上同（瘠也俗作䏫又音求）|髤周禮駹車有髤飾注謂髤漆赤多黑少也或作髹|䰍上同（周禮駹車有髤飾注謂髤漆赤多黑少也或作髹）|咻口病聲也|㵻汗面或作膄
RyA似由囚拘也繫也似由切六|泅人浮水上|汓古文（人浮水上）|苬苬芝瑞草一歲三華又音由|慒慮也又在冬切|鮂白鯈
LyA直由儔儔侶也直由切二十七|檮剛木也|躊躊躇|幬說文作𢅂襌帳也|𢃖上同（說文作𢅂襌帳也）|裯襌被|𠷎咨也說文誰也又作𠾉|疇誰也等也壅也田疇也又疇昔說文作𤲮耕治之田也|紬大絲繒又音抽|綢綢繆猶纏綿也|稠穊也多也|燽著也|薵薵藸蔥名|鯈魚子又魚名也|籌籌筭|𪆇雉爾雅云南方曰𠷎字或從鳥|𪇘上同（雉爾雅云南方曰𠷎字或從鳥）|棸字統云姓也又側鳩切|椆木名不凋|怞朗也|𦡴𦡴腊脯也|懤愁毒皃|鮋魚名又音由|䬞風颸|菗荼菜|𨞪蜀江原地又上牛切|𥲅說文云籌箸也
JyA張流輈車轅也張流切十一|盩盩厔縣在京兆府水曲曰盩山曲曰厔又云引擊也|啁啁噍鳥聲|譸譸張誑也爾雅亦作侜|侜壅蔽也|𩢸𩢸騪蕃中大馬|調朝也詩云惄如調飢本又音條|咮曲喙又張救切|𧻖𧻖𧽏行不進也|𥎻射鳥箭也|矪上同（射鳥箭也）
fyM巨鳩𧚍皮衣詩云取彼狐狸爲公子𧚍又姓本作仇避讎改作𧚍巨鳩切四十四|裘上同（皮衣詩云取彼狐狸爲公子𧚍又姓本作仇避讎改作𧚍巨鳩切四十四）|仇讎也又姓左傳宋大夫仇牧之後又漢複姓有章仇仇尼二氏隋有章仇大翼善天文|叴漢書地理志叴猶縣屬臨淮郡又詩曰叴矛鋈錞傳云叴三隅矛又說文曰氣高也|厹上同（漢書地理志叴猶縣屬臨淮郡又詩曰叴矛鋈錞傳云叴三隅矛又說文曰氣高也）|求索也又姓三輔決錄云漢有求伸|𡨃上同（索也又姓三輔決錄云漢有求伸）|頄頰閒骨也又求龜切|蛷蛷螋蟲|𧒔上同說文云多足蟲也（蛷螋蟲）|逑匹也|球美玉說文曰玉磬也|璆上同又渠幽切（美玉說文曰玉磬也）|艽遠荒之地詩云至于艽野又獸蓐也|鼽月令云人多鼽嚏說文云病寒鼻寒也|莍椒也|䣇地名|賕財賄|殏𣧩也|梂說文曰櫟實也一曰鑿首|朹爾雅曰朹檕梅郭璞云朹樹狀似梅子如指頭赤色似小㮈可食|㭝荊㭝亭名|俅戴也|脙瘠也又音休|𦜵上同（瘠也又音休）|馗爾雅曰中馗菌今土菌可食又音逵|䊵急引也|絿上同（急引也）|䜪䜱䜪亭名|扏緩也|銶鑿屬|𩒮廣蒼云戴也|𥭑籠也|毬毛毬打者|䟵䟵蹋也|犰犰狳獸似魚蛇尾豕目見人則佯死|𧻱違也|訅安也謀也|釚弩牙|捄長麕皃詩曰有捄棘麕傳云捄長皃|肍乾𠟼醬也|𢛃怨仇也又其九切|𦬖白荳|訄迫也又去牛切
CyM縛謀浮汎也縛謀切二十四|哹吹氣又拂謀切|桴齊人云屋棟曰桴也|枹鼓槌|𥰛竹有文者|罦覆車綱也|䍖上同（覆車綱也）|琈玉名|粰粰𥹷|䳕䳕鳩|罘兔罟|䱐魚名|涪水名在巴西|芣芣苢車前也江東謂之蝦蟆衣|蜉蚍蜉大螘|烰火氣爾雅曰烰烰烝也郭璞云氣出盛|鉜鉜鏂大釘|𡦄多也|𦮹姓也出纂文|艀舟也|棓杖也又音棒|掊把也|䍌小缶|䨗雨雪皃
DyM莫浮謀謀計也又姓風俗通云周卿士祭公謀父之後莫浮切二十四|䱕魚名|雺天氣下地不應又莫貢切又莫紅切|眸目童子|牟說文曰牛鳴又過也陪也進也大也亦牟平縣屬登州又姓風俗通云牟子國祝融之後後因氏焉漢有太尉牟融又漢複姓三氏東萊先賢傳有兗州刺史平昌曹牟君卿禮記云魯有賓牟賈何氏姓苑有彌牟氏|侔等也均也齊也|矛戈矛說文曰酋矛也建於兵車長二丈象形吳越春秋曰越王以屈盧之矛步光之劒獻於吳王|𢦧古文（戈矛說文曰酋矛也建於兵車長二丈象形吳越春秋曰越王以屈盧之矛步光之劒獻於吳王）|鍪兜鍪首鎧說文曰鍑屬也|鞪上同漢書云鞮鞪（兜鍪首鎧說文曰鍑屬也）|麰大麥又短粒麥|𦭷上同（大麥又短粒麥）|堥堆堥小隴|劺勉也|𨡭𨡭䤅榆人醬|蝥食穀蟲說文本又作蟊蟲食艸根者吏抵冒取民財則生|蟊上同說文曰𧖀蟊也（食穀蟲說文本又作蟊蟲食艸根者吏抵冒取民財則生）|鷚鷚鸙鳥也|𩭾髮至眉或作髳|䋷縛也|恈愛也|鴾鶉之別名|蛑蝤蛑似蟹而大|繆絲干累
#侯
jzA戶鉤侯候也何也美也辝也爾雅曰公侯君也又乃也又周禮司裘氏王大射則共虎侯熊侯豹侯諸侯則共熊侯豹侯卿大夫則共麋侯皆設其鵠鄭司農云方十尺曰侯四尺曰鵠說文本作矦从人从厂象張布之狀矢在其下又姓出上谷河南二望亦漢複姓八氏夏侯氏出自夏禹之後杞簡公爲楚所滅其弟佗奔魯魯悼公以佗出自夏后氏受爵爲侯謂之夏侯國而命氏後有去魯之沛者分沛立譙遂有譙魯二望羅國爲楚所滅其後号羅侯氏韓詩外傳云周宣王大夫韓侯子有賢德史記魏有屈侯鮒左傳曹有豎侯獳漢有尚書郎桓侯儁吳有張昭師白侯子安又虜三字姓二氏周書有侯莫陳氏侯崇傳云其先魏之別部也又周有大將軍伏侯龍氏名恩戶鉤切二十四|矦見上注（候也何也美也辝也爾雅曰公侯君也又乃也又周禮司裘氏王大射則共虎侯熊侯豹侯諸侯則共熊侯豹侯卿大夫則共麋侯皆設其鵠鄭司農云方十尺曰侯四尺曰鵠說文本作矦从人从厂象張布之狀矢在其下又姓出上谷河南二望亦漢複姓八氏夏侯氏出自夏禹之後杞簡公爲楚所滅其弟佗奔魯魯悼公以佗出自夏后氏受爵爲侯謂之夏侯國而命氏後有去魯之沛者分沛立譙遂有譙魯二望羅國爲楚所滅其後号羅侯氏韓詩外傳云周宣王大夫韓侯子有賢德史記魏有屈侯鮒左傳曹有豎侯獳漢有尚書郎桓侯儁吳有張昭師白侯子安又虜三字姓二氏周書有侯莫陳氏侯崇傳云其先魏之別部也又周有大將軍伏侯龍氏名恩戶鉤切二十四）|𥎦古文（見上注）|帿射侯見上注俗從巾|鄇地名|䫛䫛䫘大言|鍭箭鏃|銗鏂銗錏鍜|猴獼猴猱也|糇糇粮|翭說文曰羽本也一曰羽初生皃|翵上同（說文曰羽本也一曰羽初生皃）|餱乾食|喉咽喉|篌箜篌|鯸鯸䱌魚名|㮢㮢桃又㮢櫟木也|𧮶谷名在成皋亦作𧯁|瘊疣癭|䗔蟲名|葔葔莎草|骺骨骺|睺半盲又胡遘切|䙈䙈褕小衫
hzA烏侯謳吟也歌也烏侯切十六|嘔嘔唲小兒語也|歐歐陽複姓出長沙郡|甌瓦器亦甌閩又姓出姓苑|區姓也古善劒區冶子之後今郴州有之|漚浮漚|鷗水鳥說文云水鴞也|䁱深目皃又䒓侯切|瞘上同（深目皃又䒓侯切）|櫙木名爾雅曰櫙荎今之刺榆|蓲上同（木名爾雅曰櫙荎今之刺榆）|醧酒甘|剾剾㓱又恪侯切|䙔小兒涎衣|鏂鏂銗|膒久脂
HzA奴鉤羺羺䍲胡羊奴鉤切四|獳犬怒|䨲兔子|䰰鬼鬽聲䰰䰰不止也出說文
IzA落侯樓亦作婁重屋也亦姓夏少康之裔周封爲東樓公子孫因氏焉漢末樓秦自譙徙居會稽因以東陽爲望也又虜複姓有蓋樓氏賀樓氏落侯切二十九|婁空也又星名亦姓邾婁國之後漢有婁敬又漢複姓五氏左傳齊大夫工婁灑漢書藝文志有齊隱士贛婁子著書何氏姓苑云母婁氏今琅邪人又有精婁氏邾婁氏又虜複姓二氏後魏獻帝次弟爲伊婁氏又有匹婁氏後並改爲婁氏說文作婁今作婁並同|䣚鄉名又力于切|𨻻縣名|𧁾𦸈𧁾士瓜|蔞爾雅曰購蔏蔞蔞蒿也生下田初出可啖詩云言采其蔞又力朱切|𠞭剅𠞭小穿|䝏求子豬也|𦎹土𦎹似羊四角其銳難當觸物則斃食人出山海經|僂傴僂又力主切|艛舟名|耬種具|髏髑髏|膢八月祭名又力于切|𤬏𤫱𤬏苦𤬏|廔廲廔綺窻|剅小穿又音兜|摟探取|嘍嘍唳鳥聲|瞜視皃|螻螻蛄一名仙蛄一名石鼠爾雅曰螜天螻又曰蝚蛖螻|簍籠也|鞻鞮鞻氏掌四夷之樂|慺慺慺謹敬之皃|鷜爾雅曰鵱鷜鵞即今之野鵞|䱾魚名|褸衣襟又力主切|遱說文曰連遱也|謱說文云謰謱也
QzA速侯涑澣也速侯切八|鏉刻鏤|䩳軟皮|𩌱上同（軟皮）|𩮶𩮷𩮶白頭人也|摗摟摗取也出陸氏字林|𠘂冷𠘂|𡠼女字
ezA恪侯彄弓彄恪侯切八|摳摳衣挈衣也|剾剜裏也又乙侯切|韝射韝臂捍也又古侯切|𢂁指𢂁|滱水名在北地又音寇|夠多也|䁱目深瞘䁱
izA呼侯齁齁䶎鼻息也呼侯切二|𪅺𪅺鳥青色似䳕鳩也
NzA子侯𣠏麻幹也子侯切五|緅青赤色也再染曰緅三入成纁|陬隅也又聚居|棷薪別名|掫說文云夜戒守有所擊也
FzA託侯偷盜也爾雅云佻偷也謂苟且託侯切四|鍮鍮石似金陶之則分|鋀上同（鍮石似金陶之則分）|媮薄也又巧黠也
GzA度侯頭說文云頭首也釋名云頭獨也於體高而獨也度侯切十五|㓱剾㓱足節又刀剜物|投託也弃也合也說文擿也亦姓郇伯周畿內侯桓王伐鄭投先驅以策其後氏焉漢有光祿投調又漢複姓有投壺氏風俗通云晉中行穆子相投壺因以氏焉姓苑云東莞人也|𪎨字書云麻一絜說文云檾屬或作䵉|骰骰子博陸采具出聲譜|𣪌遙擊皃|坄陶窻|牏築垣短版又羊朱切|䤅𨡭䤅醬也|㢏㢏行圊廁|揄引也又欲朱切|窬穿也又羊朱切|緰布也|歈歌也又羊朱切|𪁞鴢頭鵁似鳧腳近尾
gzA五婁齵齱齵五婁切又牛俱切一
dzA古侯鉤曲也又劒屬字㨾句之類並無著厶者古侯切十八|𠛎說文云關西呼鎌爲𠛎也|溝溝渠爾雅云水注谷曰溝釋名曰田閒之水曰溝溝搆也縱橫相交構也|褠襌衣|韝臂捍又苦侯切|緱緱氏縣屬河南府又姓孝子傳陳留緱氏女名玉亦刀劒頭纏絲爲緱|篝燻籠|𥴴𥴴𥵣桃枝竹名|𪓞𪓟鼊似龜說文其俱切𪓷屬頭有兩角出遼東亦作𪓞|㗕唱㗕|𤫱𤫱𤬏|䑦䑦𦪇船名|冓數名十秭曰冓|枸曲木又木名也|句說文曲也又高句驪遼東國名又句龍社神名亦姓史記有句疆又九遇古候二切|軥車軥心木又夏后之輅曰軥也|夠多也|鴝鴝鵒鳥又音衢
EzA當侯兜兜鍪首鎧也當侯切十|侸佔侸垂下皃佔丁兼切|吺輕出言也|篼飼馬籠也|𥆖眵目汁凝眵赤支切|剅小穿又音婁或作𧯠|𧡸說文云目蔽垢也|𧯠小裂皃|郖說文云弘農縣庾地|𩮷𩮷𩮶白頭
PzA徂鉤㔌細斷徂鉤切二|鯫魚名又七士苟切又小人之皃也
CzA薄侯裒聚也薄侯切九|䯽說文云髮皃|捊說文云引取也|抔手掬物也|掊詩曰曾是掊克謂聚斂也|䏽豕𠟼醬也|𩚭𩚭饇曰食也|䍌說文云小缶也|箁說文云竹箁也
OGg千隹䜅就也千侯切一
DzA亡侯呣慮也亡侯切一
#幽
h0U於虯幽深也微也隱也亦州名釋名曰幽州在北幽昧之地故曰幽禹貢冀州之域舜以冀州南北廣大分燕北爲幽州又北方曰幽都又姓出姓苑於虯切七|泑澤在崐崘山下|呦鹿鳴|𣢜上同（鹿鳴）|𧍘𧍘蟉龍皃又一糾切|怮說文憂皃|𢆶微也
f0U渠幽虯無角龍也渠幽切又居幽切七|觩匕曲皃|璆玉名|觓角爵皃|鷚爾雅云鷚天鸙郭璞云大如鷃雀色似鶉好高飛作聲又音繆|蟉𧍘蟉龍皃|𤙠角皃
A0I甫烋彪虎文也甫烋切三|髟髮垂皃又標彡二音|驫馬走皃又音標
I0Q力幽鏐紫磨金也力幽切二|蟉𧍘蟉又翹糾切
d0U居虯樛說文曰下句曰樛詩曰南有樛木傳云木下曲也居虯切五|𠃚說文曰相糾繚也今作丩同|𦱠草之相糾繚也|朻說文云高木也|㽱腹急病也
C0I皮彪淲水流皃亦作滮皮彪切三|瀌雨雪皃又音鑣|𩖛風皃
NHQ子絲稵禾生也子幽切一
Q2Q山函犙牛三歲山幽切一
g0U語虯聱聱耴魚鳥狀語虯切又五苞切一
i0U香幽i0Y香幽飍a驚風香幽切又風幽切二|烋b美也福祿也慶善也出玉篇又火交切
D0I武彪繆詩傳云綢繆猶纏緜也說文曰枲十絜也武彪切又目謬二音三|鷚天鸙鳥也又音虯|䋷縛也
#侵
O1Q七林侵漸進也說文作㑴又姓三輔決錄有侵恭七林切七|𢔀上同（漸進也說文作㑴又姓三輔決錄有侵恭七林切七）|駸馬行疾也|浸浸淫也又子鴆切|䜷野生豆也|𥍯錐也|綅說文曰絳綫也詩曰貝冑朱綅又子心息廉二切
R1Q徐林尋長也又尋常六尺曰尋倍尋曰常山海經曰尋木長千里生河邊又姓晉有尋曾字子貢徐林切十六|𢒫上同出說文（長也又尋常六尺曰尋倍尋曰常山海經曰尋木長千里生河邊又姓晉有尋曾字子貢徐林切十六）|鐔劒鼻又姓漢有鐔顯又覃淫二音|潯傍深又水涯也|鱏魚名口在腹下又音淫|樳木名似槐|鄩地名在鞏又姓左傳有周大夫鄩肸|𨼔小堆阜也|𣎟姓也出纂文|𩖣姓也姓苑云汝南人|襑衣博大也|枔木葉|撏取也|灊水名出巴郡又才心昨鹽二切|鬵鼎大上小下又才心昨鹽二切|𦅀續也
I1Q力尋林林木爾雅曰野外謂之林說文曰平土有䕺木曰林又姓風俗通曰林放之後力尋切八|琳玉名|淋以水沃也|臨莅也大也監也又姓後趙錄有秦州刺史臨深也|痳痳病|箖箖箊竹名|瀶水出皃說文云谷也一曰寒也|霖久雨
K1Q丑林琛琛寶也丑林切七|棽木枝長又林森二音|䑣船行|𧡬私出頭視也又丑鴆切|綝繕也|郴縣名在桂陽又姓陶偘別傳有江夏郴寶|賝賝賮也
X1Q職深斟斟酌也益也又姓國語云祝融之後侯伯八姓斟姓無後賈逵注云斟姓是曹姓之後又漢複姓有斟弋氏出史記職深切九|針針線|鍼上同說文曰所以縫也（針線）|𪈁𪈁鴜鳥名|箴箴規也又姓風俗通云有衛大夫箴莊子|葴酸蔣草也|瑊廣雅曰瑊石次玉也郭璞云瑊玏似玉之石司馬相如子虛賦曰其石則瑊玏玄礪|鱵魚名|㘰㘰鄩古國名
L1Q直深沈沒也說文曰陵上滈水也又漢複姓魯有沈猶氏常朝飲其羊何氏姓苑云今泰山人直深切又尸甚切九|沉俗（沒也說文曰陵上滈水也又漢複姓魯有沈猶氏常朝飲其羊何氏姓苑云今泰山人直深切又尸甚切九）|𤘣水牛|莐爾雅曰𧂇莐藩郭璞云生山上葉如韭|䒞上同又羊針都敢二切（爾雅曰𧂇莐藩郭璞云生山上葉如韭）|霃久陰|湛漢書曰且從俗浮湛又徒減切|枕繫牛杙也|鈂鍤屬
J1Q知林碪擣衣石也知林切五|砧上同（擣衣石也知林切五）|椹鈇椹斫木質文字指歸俗用爲桑椹字非|枮上同（鈇椹斫木質文字指歸俗用爲桑椹字非）|坫權安厝也
Z1Q氏任諶誠也爾雅云信也氏任切七|愖上同（誠也爾雅云信也氏任切七）|訦上同說文曰燕代東齊謂信曰訦（誠也爾雅云信也氏任切七）|忱上同（上同說文曰燕代東齊謂信曰訦）|煁煁烓行竈烓烏珪切|瘎腹內故病|㽸上同（腹內故病）
c1Q如林任堪也保也當也又姓出樂安黃帝二十五子十二人各以德爲姓第一七爲任氏如林切七|鵀戴勝鳥也頭上毛似勝又女今切|恁信也又音荏|壬佞也又辰名爾雅曰太歲在壬曰玄黓|紝織紝亦作䋕|銋銋濡廣雅韏也|䛘信也念也
a1Q式針深遠也又水名出桂陽南平式針切二|𦸂蒲蒻
l1Q餘針淫久雨曰淫書曰罔淫于樂傳云淫過也餘針切十五|霪久雨|婬婬蕩|𥮍竹名|蟫白魚蟲|鷣鷂之別名|䒞熱也|冘行皃|𢓕上同（行皃）|䤁熟麴又昨淫切|撢探也|𨟏地名|㸒貪也又延求切|鐔劒鼻又尋覃二音|鱏魚名又徐林切
Q1Q息林心火藏釋名曰心纖也所識纖微無不貫也息林切四|𦁍久緩皃|𨊳車軥𨊳木|杺木名其心黃
h1U挹淫愔靖也挹淫切二|韾聲和靖也
N1Q子心祲曰傍氣也子心切又子禁切九|梫木名|兓銳意|埐說文地也又昨淫切|𩀿雞之別名|𪖼高鼻|綅縫線|𥍯錐也|𩻛魚名
P1Q昨淫𩷒大魚曰鮓小魚曰𩷒一曰北方曰鮓南方曰𩷒昨淫切十|䰼上同見說文（大魚曰鮓小魚曰𩷒一曰北方曰鮓南方曰𩷒昨淫切十）|鬵說文曰大釜也一曰鼎大上小下若甑曰鬵|嶜嶜喦|梣木名|埐地名又子心切|𣜣掘也|鈂上同又直林切（掘也）|灊水名出巴郡|䤁熟麴又餘針切
M1Q女心䛘䛘詉喉聲女心切三|䋻䋻織也齊也或作紝|鵀戴勝
f1Y巨金琴樂器神農作之本五弦周加文武二弦白虎通曰琴禁也以禁止淫邪正人心也又姓左傳琴張也巨金切二十二|㩒急持|捦上同（急持）|擒亦同|黔黑而黃亦姓齊有黔熬又巨炎切|禽二足而羽者曰禽又姓高士傳有禽慶|芩黃芩藥名|𨙽亭名|檎林檎果名|㕋說文云石地也|鵭鶨鳥亦作鳹|䔷草名根可緣竹器出玉篇|澿水名|凜寒狀又力甚切|庈人名庈父|雂鳥名又巨炎切|㪁持也|㱽禁也又竹甚切|黚黃黑色又巨炎切|䅾禾欲秀也|耹音也|靲靲鞻四夷樂也
e1Y去金欽敬也又姓何氏姓苑云吳人也去金切五|菳草名似蒿|衾被也|嶔嶔崟|顉曲頤又五感切
g1Y魚金吟歎也說文云呻吟也魚金切十|訡上同（歎也說文云呻吟也魚金切十）|䪩古文（歎也說文云呻吟也魚金切十）|唫亦古吟字說文又巨錦切|崟嶔崟|荶水菜似蒜|碞僭差|𩂢霖雨又牛皆切|乑眾立皃|𠪚崟𠪚山崖狀也又口敢切
i1Y許金歆神食氣也許金切四|廞爾雅曰興也亦陳車服也亦廞巇山險皃又許錦切|嬜愛也又火甘切|㽎火盛皃
d1Y居吟金金寶說文曰五色金也黃爲之長久薶不生衣百鍊不輕从革不違西方之行生於土亦州名周爲附庸國魏於安康縣置東梁州後周改金州又金鼓釋名曰金禁也爲進退之禁也又姓古天子金天氏之後也又漢複姓有金留氏出姓苑居吟切九|今對古之稱說文云是時也|黅黃色|衿衣小帶也又其禁切|襟袍襦前袂|䘳上同（袍襦前袂）|禁力所加也勝也又居蔭切|㦗心㦗皃|𪑙淺黃色說文云黃黑也又古咸切
h1Y於金音說文曰聲也生於心有節於外謂之音宮商角徵羽聲也絲竹金石匏土革木音也於金切八|陰陰陽也說文作陰闇也水之南山之北也又姓出武威風俗通云管修自齊適楚爲陰大夫其後氏焉|隌爾雅云闇也注謂隌然冥貌又烏感切|瘖瘖瘂文子曰皋陶瘖|霠雲覆日又姓出纂文|䜾䜷豆|喑極啼無聲又於含切|䤃醉聲又於南切
V1Q所今森長木皃所今切十|參參星亦姓世本云祝融之後又蒼含切|曑上同（參星亦姓世本云祝融之後又蒼含切）|蔘人蔘藥也|薓古文（人蔘藥也）|槮樹長皃|襳襳襹毛羽衣皃|𥥍突也|穼上同（突也）|棽木枝長也又丑林切
U1Q鋤針岑山小而高又姓出南陽風俗通云古岑子國之後後漢有岑彭鋤針切九|涔涔陽地名又管涔山名又蹄涔不容尺鯉蹄牛馬跡|㞥入山深皃|梣青皮木名又子心切|𣠟上同（青皮木名又子心切）|𩅨雨聲|𩻛魚名|䅾禾欲秀|笒竹名
S1Q側吟兂說文曰首笄也側吟切四|簪上同（說文曰首笄也側吟切四）|㻸石似玉也|撍速也
T1Q楚簪嵾嵾差不齊皃亦作參楚簪切六|參上同（嵾差不齊皃亦作參楚簪切六）|梫梫桂木花白也又音寢|𥤇字書云禾長皃|駸馬行疾皃|槮木長皃
Y1Q充針𧡪說文云內視也充針切一
#覃
G2Q徒含覃及也延也又姓梁東寧州刺史覃元先徒含切二十|𨝸𨝸城縣名|潭水名出武陵郡鐔成縣東入鬱林又深水皃|曇雲布|藫水衣|橝木名灰可染也|蟫白魚蟲又音淫|譚大也又姓漢有河南尹譚閎|𧽼䟃𧽼走皃|燂火爇|壜甒屬|鐔劒口又音尋|眈視近而志遠又音耽|㽎㽎㽎室深皃|𦗡聒也|𩡝馣𩡝香氣|𧂇草名爾雅曰𧂇莐藩|蕁上同（草名爾雅曰𧂇莐藩）|䊤糝也|㽑長味又徒紞切
O2Q倉含參參承參覲也俗作叅倉含切五|驂驂馬|䟃䟃𧽼|傪好皃|㜗玉篇云婪㜗也
H2Q那含南火方亦果名臨海異物志云多南子大如指紫色味甘似梅又姓魯大夫南遺也又漢複姓九氏左傳齊有南史氏其後爲姓又魯有南宮敬叔晉國高士全隱於南鄉因以爲氏六國時有南公子著書言五行陰陽事莊子有南郭子綦又有南榮趎古有善暴背於南榮之者獻之於君其後爲氏又有南伯子蔡姓苑有南野氏又有南門氏那含切七|男男子也又所封爵也環濟要略曰男任詔事受王命爲君|柟木名又人詹切|楠俗（木名又人詹切）|抩併持也又他含切|䶲龜有距也又如詹切|𤱣上同（龜有距也又如詹切）
h2Q烏含諳記也憶也烏含切十二|䳺䳺鶉字林作䳺𨿡|媕媕娿不決|庵小草舍也|腤煑魚肉也|菴菴䕡草又菴羅果也|㞄蹇跛之皃|馣香也|嬜貪愛|韽聲小又於林切|盦說文曰覆蓋也|喑啼泣無聲
j2Q胡男含說文銜也胡男切二十二|涵涵泳|䈄實中竹名|筨上同（實中竹名）|梒梒桃禮亦作含|䤴鎧別名孟子云矢人豈不仁於䤴人哉矢人唯恐不傷人䤴人唯恐傷人|函容也禮云席閒函丈|顄顄頤|𩔞上同（顄頤）|蜬爾雅云蠃小者曰蜬|頷說文曰面黃也又胡感切|𣹢水澤多皃|鋡受也|𤭙似瓶有耳|𠥴船沒|䶃鼠屬又古南切|圅銜也說文舌也|肣排囊柄也說文同上（銜也說文舌也）|䨡久雨|𩄙上同（久雨）|𢎘說文曰嘾也艸木之華未發圅然象形又下感切|𠗴寒皃
I2Q盧含婪貪也盧含切六|惏上同（貪也盧含切六）|燣焦色|嵐州名近太原因岢嵐山爲名有渥洼池出良馬亦山氣也|葻草得風皃|啉酒巡匝曰啉出酒律亦作𠵂
P2Q昨含蠶吐絲蟲俗作蚕非昨含切四|撏取也|䣟亭名|𨅔上也
N2Q作含簪作含切又側岑切七|撍盡也|篸所以綴衣又作憾切|𥸢𥸢𥯖|䐶腤䐶|䍼羊腌|鐕無蓋釘也
F2Q他含探取也說文作𢲘遠取之也他含切三|撢周禮有撢人|貪貪婪也𥼶名曰貪探也探入他分也
E2Q丁含耽說文曰耳大垂也又耽樂也詩曰無與士耽或作躭丁含切九|湛湛樂亦見詩|眈視近而志遠也|酖嗜酒|妉妉樂|甔大甖可受一石|媅婬過說文樂也|𧡪內視又大含切|𡖓多也
e2Q口含龕塔也亦一曰龍皃又云塔下室口含切十|𢦟殺也刺也|𩑟醜皃|堪任也勝也克也說文曰地突也又姓風俗通云八元仲堪之後|戡勝也克也|𤯍和也又紅談古三二切|嵁嵁崿又五男切|𤬪瓦器|撖柱也|㪁敧多也
i2Q火含㟏大谷也火含切八|𩈣面紅|馠小香|𣢺含笑皃|谽谽谺谷空|唅唅呀|𡬖不脫冠帶而寐也|𡪶上同（不脫冠帶而寐也）
Q2Q蘇含毿長毛皃蘇含切三|蔘蔘綏垂皃|犙牛也
d2Q古南弇同也蓋覆也後漢有耿弇古南切又音掩五|䶃鼠名|淦水入船中又最也泥也汲也又甘暗切吉州有新淦縣水淦所出入湖或作汵|䌠持意也又呼兼切|蜬蠃小者又貝居水者肉如科斗但有頭尾
g2Q五含䜙不惠也又謔弄言五含切三|𡪁寐中言語|嵁嵁㟧又苦男切
#談
G3Q徒甘談談話又言論也戲調也又姓蜀錄云晉有征東將軍談巴徒甘切十一|郯國名其後以國爲姓春秋時郯子入魯辨古官與孔子相遇姓苑云沛人|惔憂也|錟長矛|淡水皃又徒覽徒濫二切|痰胷上水病|澹漢複姓孔子弟子有澹臺滅明又徒覽徒濫二切|倓恬也安也靜也又徒濫徒坎二切|餤進也詩曰亂是用餤又徒濫切|𥰨刮馬篦也|㶣小熱
d3Q古三甘說文作目美也又隴右州本月支國漢匈奴觻得王所居後魏爲張掖郡又改爲州取甘峻山名之界有弱水祁連山上有松栢五木美水茂草冬溫夏涼又有仙樹人行山中飢即食之輒飽不得持去平居時亦不可見也又姓武丁臣甘盤之後又漢複姓有甘莊甘士甘先三氏古三切七|柑木名似橘|䇞䇞竹|苷苷草藥出洮州|泔米汁|𤯍和也|媣媣媞也
E3Q都甘擔擔負釋名曰擔任也任力所勝也都甘切五|儋說文何也亦姓左傳周有大夫儋翩|聸說文曰垂耳也南方有聸耳之國|頕頰緩|甔小甖
Q3Q蘇甘三數名又漢複姓五氏三閭氏三閭大夫屈原之後也沛上計三烏群三烏大夫之後也三飯尞之後有三飯氏三州孝子之後有三州氏後單姓州蜀志有三丘務蘇甘切五|參上同又七南所今二切俗作叄（數名又漢複姓五氏三閭氏三閭大夫屈原之後也沛上計三烏群三烏大夫之後也三飯尞之後有三飯氏三州孝子之後有三州氏後單姓州蜀志有三丘務蘇甘切五）|弎古文（上同又七南所今二切俗作叄）|𢁘衣破襤𢁘|鬖䰐鬖毛垂
I3Q魯甘藍染草又姓戰國策有中山大夫藍諸魯甘切十一|襤襤褸|䰐鬢髮疎皃|擥㩜持|籃籃籠|𩈵𩈵𩈻長面|𪇖𪇖鷜鳥名今俗呼郭公也|懢懢貪皃|䆾䆾䆱薄大|儖儖儳形皃惡也|蘫瓜葅
e3Q苦甘坩坩甒苦甘切一
F3Q他酣舑吐舌也他酣切九|聃耳漫無輪又老氏名又姓左傳周大夫聃啓|𨈭俗（耳漫無輪又老氏名又姓左傳周大夫聃啓）|緂色鮮|㘱水衝岸壞|䔜蔥別名|䆱䆾䆱薄大|㴂㴥㴂峻波也|𦸁蘫𦸁瓜葅
P3Q昨甘慙愧也昨甘切五|慚上同（愧也昨甘切五）|鏨小鑿|䳻鶚別名|㨻說文暫也
j3Q胡甘酣酣飲應劭曰洽也張晏曰中酒曰酣又樂也胡甘切八|甝白虎|䗣桑蟲|魽蛤也|𤯍和也又口含古三二切|煔火上行皃|炶上同（火上行皃）|邯江湘人言也又音寒
D3A武酣姏老女稱武酣切一
N3Q作三𩈻長面皃作三切一
i3Q呼談蚶蚌屬爾雅曰魁陸本草云魁狀如海蛤員而厚外有文縱橫即今蚶也亦作魽呼談切五|𧵊戲乞人物亦作歛|嬜貪妄又一含切|歛欲也|憨癡也
#鹽
l4Q余廉鹽說文曰鹹也古者宿沙初作煑海爲鹽亦州近北鹽池因以名之又姓魯國先賢傳有北海相鹽津余廉切十五|塩俗（說文曰鹹也古者宿沙初作煑海爲鹽亦州近北鹽池因以名之又姓魯國先賢傳有北海相鹽津余廉切十五）|𣡶木名|閻里中門又姓出天水河南二望|壛壛榻也說文同上（里中門又姓出天水河南二望）|阽臨危|檐屋檐說文曰檐㮰也|簷上同（屋檐說文曰檐㮰也）|櫩亦同|𣡞步𣡞長廊也|㶄說文云海岱之閒謂相汙曰㶄|𪂈𪂈離鳥自爲牝牡也|䦲語林云大夫向䦲而立說文曰䦲謂之樀樀廟門也|㿕病走|𤅸進也
I4Q力鹽廉廉儉也釋名曰廉斂也自檢斂也亦姓趙有廉頗力鹽切二十|鐮刀鐮也釋名曰鐮廉也薄其所刈似廉也|鎌上同（刀鐮也釋名曰鐮廉也薄其所刈似廉也）|𩄡久雨|㡘㡙㡘帷也|簾簾箔釋名曰簾廉也自障蔽爲廉恥也三秦記曰明光宮以金玉珠璣爲簾箔|薕薑也說文蒹也|薟白薟藥又音斂|蘞蔓草說文同上又音斂（白薟藥又音斂）|匳盛香器也又鏡匳也俗作奩|籢上同（盛香器也又鏡匳也俗作奩）|𥖝赤礪石|獫犬長喙又力劒切又音險獫狁也|蠊蜚蠊蟲名說文作螊海蟲也長寸而白可食|䆂禾名|𨎷車輞|𣀃𣀃鼓鼓初打也|帘青帘酒家望子|鬑鬋也一曰長皃|覝察也
A4I府廉砭以石刺病府廉切又方驗切二|𥐗古文（以石刺病府廉切又方驗切二）
Q4Q息廉銛銛利也說文曰臿屬纂文曰鐵有距施竹頭以擲魚爲銛也息廉切十三|暹日光進也|枮木名|綅白經黑緯|𦃌上同（白經黑緯）|韱韱細又山韭也今通作韱凡從韱者倣此|襳小襦|纖細也微也|憸利口|孅銳也細也|䯹髮也|彡毛飾又所銜切|𢘁疾利口也
O4Q七廉籤說文驗也一曰銳也貫也七廉切十|臉臉𦞦也|䑎上同（臉𦞦也）|鹼水和鹽又工斬切|槧削皮又才敢七豔二切|憸㤿憸詖也㤿音猒|僉咸也皆也|𠠃𠠃切割也|㡨幖㡨記出字林|譣譣詖
X4Q職廉詹至也應劭漢官曰詹事秦官也又姓楚詞有詹尹俗作𦧕職廉切六|瞻瞻視|占視兆也亦姓陳大夫子占之後又章豔切|蟾蟾蠩蝦蟆也張衡靈憲曰羿請不死之藥於西王母桓娥竊之奔月宮遂託身於月是爲蟾蠩抱朴子云蟾蠩壽三千歲者頭上有角頷下有丹書八字玄中記云蟾蠩頭生角者食之壽千歲也|噡噡言語也|厃說文云仰也一曰屋怊也秦謂之桷齊謂之厃本魚毀切
Z4Q視占棎果名似柰而酸視占切三|撏撏取也|蟾蟾光月彩又職廉切
a4Q失廉苫草覆屋又凶服者以爲覆席也又姓左傳魯季氏家臣苫夷失廉切三|痁病又音店|𡝫𡝫妗善笑皃又丑廉切
Y4Q處占䪜屏也處占切十一|㚲㚲姼輕薄皃又尺涉切|幨幨幃釋名曰牀前帷曰幨|襜襜褕蔽膝|裧上同（襜褕蔽膝）|𤎥𤎥𤎥衣動皃|㾆皮剝也|緂衣色鮮|妗妗𡝫善笑皃又許兼切|𢛈𢛈懘音不和也禮記作怗|𢃔㡙也
c4Q汝鹽𩓾說文曰頰須也汝鹽切十二|髯上同（說文曰頰須也汝鹽切十二）|蚺大蛇|呥噍皃|柟梅也子如杏而醋|𧦦多言|蛅爾雅曰蟔蛅蟴郭璞云蛓屬也今青州人呼蛓爲蛅蟴|冉說文云毛冉冉也亦作月|袡衣緣|䶲有距龜|㾆皮剝又處占切|舑舚舑長舌
M4Q女廉黏黏麴女廉切三|粘俗（黏麴女廉切三）|䬯南楚呼食麥粥
k4Y于廉炎熱也說文曰火光上也于廉切一
J4Q張廉霑霑濕也又濡也漬也張廉切三|沾水名在上黨說文他兼切|𪏉黃也
K4Q丑廉覘闚視也丑廉切又丑豔切二|𡝫𡝫妗喜皃
h4Y央炎淹漬也滯也久留也敗也央炎切六|菴菴䕡草又音諳|崦崦嵫山下有虞泉日所入又於檢切|醃鹽醃又葅也|䣍邑名|閹男無勢精閉者
e4Y丘廉𢜩𢜩㥓意不安也丘廉切二|𨦄𨦄曲頭鑿
g4Y語廉𪙊齒差語廉切一三
N4Q子廉尖銳也子廉切十一|殲盡也滅也|瀸漬也沒也洽也又泉水出微皃|㡨拭也|𡄑𡄑㖩不廉又將豔切㖩子俱切|漸入也漬也又慈染切|虃百足草|熸火滅|㦰刺也銳意也又持戈說文絕也|𩅼小雨又霑也|鑯說文曰鐵器也一曰鐫也|鋟以爪刻櫃版也|𩃔漬也或作𩃔又所咸切
P4Q昨鹽潛水伏流又藏也亦水名又姓姓苑云臨川人昨鹽切九|朁於朁縣名屬杭州今作潛|鬵甑也又才林切|𥮒漂絮簀又音前|灊水名在巴郡宕渠又古縣名在廬江又才林切|䁮閉目內思|燂周禮注云炙爛也|𤎢古文（周禮注云炙爛也）|螹螹𧕮蟲名
f4Y巨淹箝鎖頭亦作鉗晉律曰鉗重二斤翹長一尺五寸又羌複姓有鉗耳氏說文籋也巨淹切十二|鉗上同說文曰以鐵有所劫束也（鎖頭亦作鉗晉律曰鉗重二斤翹長一尺五寸又羌複姓有鉗耳氏說文籋也巨淹切十二）|𢁮絹𢁮|鉆持鐵者說文又敕淹切鐵銸也一曰膏車鐵鉆|黚淺黃黑色又古黚陽縣在武陵又巨今切|拑脅持也|黔黑黃色說文曰黎也秦謂民爲黔首謂黑色也周謂之黎民又音琴|羬羊六尺爲羬|鳹白喙鳥|雂上同（白喙鳥）|鍼鍼虎人名又之林切|鈐兵鈐以閉房神府以備非常又鉤鈐星名說文曰鈐𨬍大犁也
h4U一鹽懕安也一鹽切七|猒飽也又於豔切|饜上同（飽也又於豔切）|嬮和靜|㤿㤿憸|䅧䅧䅧苗美也|𨣻含怒也又魚檢切
R4Q徐鹽燅說文曰湯中爚肉也徐鹽切九|𤍙說文同上（說文曰湯中爚肉也徐鹽切九）|燖（說文同上）|爓（說文同上）|𦢨並同上（說文同上）|䕭山菜|𢸧摰摘物出字諟及聲類|㰊木細葉也|𢅮小巾
V4Q史炎襳襳褷毛羽衣史炎切一
L4Q直廉㶣字林云小熱也直廉切三|𪏂埤蒼云赤黃色|誗言利美也又人名字書無
f4U巨鹽鍼巨鹽切又音針一
#添
F5Q他兼添益也他兼切四|沾說文曰水出壼關東入淇一曰沾益也|黇黃色|舚舚舑吐舌
E5Q丁兼𩬑𩬑鬑鬢髮疎薄皃丁兼切八|敁敁敠稱量|佔佔侸輕薄也|詀轉語|㡇衣領又丁頰切|𧚊上同（衣領又丁頰切）|𦕒耳小垂|䀡目垂又丁念切
G5Q徒兼甜甘也徒兼切五|恬靖也|湉水靖|菾菜名|𦳇藥名
I5Q勒兼鬑𩬑鬑勒兼切六|薕薕蒹未秀荻草|熑煣軔說文曰火煣車網絕也|溓大水中絕小水出也說文曰薄水也一曰中絕小水|濂薄也|燫火不絕皃
e5Q苦兼謙敬也讓也苦兼切二|䌠堅持意又呼廉切
d5Q古甜兼說文曰并也兼持二禾秉持一禾又姓衛公子兼之後古甜切七|縑絹也說文曰并絲繒也|鶼比翼鳥|𥻧青稻白米|蒹荻未秀|𦋰絲網|鰜比目魚
j5Q戶兼嫌說文曰不平於心一曰疑也戶兼切一二|稴稻不黏者又力兼切
H5Q奴兼鮎魚名奴兼切三|䬯說文曰相謁食麥也|拈指取物也
i5Q許兼馦香氣許兼切七|㾾㾰㾾病也|䵌赤黃色|㽐香美|欦貪慾也又笑也|䌠堅持意又契兼切|妗美也
#咸
j6Q胡讒咸皆也同也悉也亦姓姓苑云巫咸之後今東海有之胡讒切十一|鹹不淡|醎俗（不淡）|函函谷關名又函書亦姓漢有豫章太守函熙又漢複姓漢末有黃門侍郎函治子覺又音含|𩤥𩤥驩古縣名漢書只作咸|諴和也|鰜魚名|稴不黏稻也|椷杯也|㮭上同（杯也）|輱車聲
d6Q古咸緘減封古咸切七|䌠慳悋文堅持意口閉也|瑊美石次玉|玪上同（美石次玉）|尲尲尬行不正也|黬釜底黑也|𪒹說文曰雖晳而黑也古人名𪒹字晳
V6Q所咸攕女手皃所咸切十一|摻上同詩曰摻摻女手又所減切（女手皃所咸切十一）|檆木名似松爾雅又作煔|杉上同（木名似松爾雅又作煔）|櫼上同說文音尖楔也（木名似松爾雅又作煔）|𩃔雨皃說文曰微雨也或作𩆷又子廉切|𩁺微雨|䀐瞻視又所儳切|𨏪車聲|𩌰鞍𩌰垂皃|㺑犬容頭進也
h6Q乙咸𤟟犬吠聲乙咸切又乙陷切三|淊淊沒|黯深黑也又乙減切
g6Q五咸嵒巖也又嶃喦山高皃亦地名五咸切十|䫡面長皃又丘檻切|黬釜底黑也又音緘|羬山羊|𧇱熊虎絕有力也|麙上同（熊虎絕有力也）|𪙊齒皃|碞僣差又牛金切|㺂羊有力也|𧬌和也又戲言也
i6Q許咸㰹笑皃許咸切五|𧍧似蛤出海中也|妗喜皃又香兼切|𧮰𧮰谺谷空皃|䩂出頭皃
J6Q竹咸詀詀諵語聲竹咸切又尺涉切四|䩇䩇䩂出頭皃|鵮鳥啄物也又苦咸切|𪉜鹹味
M6Q女咸諵詀諵也女咸切二|喃上同（詀諵也女咸切二）
U6Q士咸讒譖也士咸切又士銜切十三|獑獑猢似猿而曰又士銜切|鏨小鑿又才三切|饞不廉|毚狡兔|㺥上同（狡兔）|𪗂鼻高皃|欃檀木別名|攙刺也又楚銜切|𪖎鼠名又埤蒼云鼠皃|𢽝鳥𢽝物也|儳儖儳皃惡也又仕陷切|酁宋地名
e6Q苦咸鵮鳥鵮物苦咸切五|𢽣上同（鳥鵮物苦咸切五）|嵁嵁巖不平正皃|厱山崖空穴閒皃|𠔺𠔺䫡長面
#銜
j7Q戶監銜說文曰馬勒口中从金从行銜行馬者戶監切二|甉乾瓦屋也
U7Q鋤銜巉險也鋤銜切八|嶃嶃嵒山皃|劖刺也說文曰斷也一曰剽也|艬合木船|鑱吳人云犁鐵說文銳也又士懺切|獑獑猢又士咸切|毚又士咸切|嚵嚵氣說文曰小𠻜也一曰喙也又音懺
g7Q五銜巖峯也險也峻廊也五銜切三|礹上同（峯也險也峻廊也五銜切三）|𡆑呻吟
T7Q楚銜攙攙搶祅星爾雅作欃槍楚銜切又士咸切一
V7Q所銜衫衫衣所銜切八|纔帛青色又音裁|髟屋翼也又長髮皃|縿絳帛說文曰旌旗游也|彡毛長|芟刈草|穇稴穇穗不實見齊人要術|𩌰又所咸切
d7Q古銜監領也察也說文云臨下也古銜切又古懺切五|礛礛䃴青礪|𥌈視也|鑑鑑諸以取月中水又明也|㔋細切
C7A白銜𨂝步渡水白銜切一
e7Q口銜嵌嵌巖山也口銜切一
#嚴
g8c語𩏩嚴嚴毅也威也敬也說文曰教令急也亦姓本姓莊避漢明帝諱改姓嚴語𩏩切二|䉷射翳
i8c虛嚴𩏩胡被也虛嚴切五|杴鍬屬古作𣞘或作㸝方言云青齊呼意所好爲杴|㿌㿌𤻙物在喉也|𥟕禾傷肥也|蘞芋之辛味曰蘞
h8c於嚴醃鹽漬魚也於嚴切二|腌上同（鹽漬魚也於嚴切二）
e8c丘嚴㪁㪁欹不齊丘嚴切又丘广切二|厱山側空處也
#凡
C9M符䒦凡常也皆也輕也非一也又姓周公子凡伯之後姓苑云晉陵人符䒦切七|帆船上幔也亦作颿又扶汎切|𠆩輕也又孚劒切|𦨲船舷|氾國名又姓出燉煌濟北二望皇甫謐云本姓凡氏遭秦亂避地於氾水因改焉漢有氾勝之撰書言種植之事子輯爲燉煌太守子孫因家焉又音汎|颿馬疾步|柉木皮可以爲索
B9M匹凡䒦草浮水皃匹凡切二|𣢲多智慧也丘凡切
#董
EAB多動董督也正也固也又姓飂叔安裔子董父實甚好龍帝舜嘉焉賜姓曰董出隴西濟陰二望多動切七|蝀螮蝀虹也又音東|箽亦姓又竹器也|𢤦懵𢤦心亂|蕫薡蕫草似蒲而細又藕根|䵔攏䵔不上|𧄓𧄓𧄓鼓鳴也
DAB莫孔蠓列子曰蠛蠓生朽壤之上因雨而生覩陽而死莊子謂之醯雞莫孔切七|𤾬物上白醭|鸏水鳥又音蒙|濛濛澒大水又莫紅切|䑃大皃|曚暡曚日未明也|懵心亂皃
eAB康董孔孔穴也又空也甚也亦姓殷湯之後本自帝嚳次妃簡狄吞乙卵生契賜姓子氏至成湯以其祖吞乙卵而生故名履字太天乙後代以子加乙始爲孔氏至宋孔父嘉遭華父督之難其子奔魯故孔子生於魯康董切二|倥倥傯事多
QAB先孔㪌搏擊先孔切三|䉥箸桶|𣞷上同又蘇公切（箸桶）
FAB他孔侗直也一曰長大他孔切四|桶木桶又音動|曈曈曨欲曙又音童聾|捅捅進前也
NAB作孔總聚束也合也皆也眾也作孔切十五|摠上同（聚束也合也皆也眾也作孔切十五）|𢝰俗（聚束也合也皆也眾也作孔切十五）|嵸巃嵸山皃|㢔眾立|𩮰𩮰角本亦作總|蓯菶蓯草皃|鬷爾雅云軌鬷一名素華|猣犬生三子|翪鳥飛竦翅上下也所謂鵲鶪醜其飛也翪|䁓方言云南人竊視|熜熅也說文曰然麻蒸也又青公切|𢊕屋階中會又且公切|𨍈關西呼輪曰𨍈|傯倥傯
jAB胡孔澒說文曰丹沙所化爲水銀也又濛澒大水胡孔切五|鴻鴻濛又音紅|𧋔𧋔蟲甲類|𠳃鳴聲𠳃𠳃也|汞水銀滓
hAB烏孔蓊蓊鬱烏孔切九|滃大水皃|暡氣盛皃|郺郺𨑊多皃又音邕濃|勜勜劜屈強皃劜音軋|䈵竹盛又音翁|䐥䐥臭皃出字林|塕塕埲塵起|𤌏𤌏然煙氣
HAB奴動𨑊奴動切一
AAB邊孔琫佩刀飾也邊孔切四|菶草盛|𦂌小皃皮屨又巴講切|俸屏俸又扶用切
IAB力董曨曈曨力董切九|襱袴也又直隴切|巃巃嵸|竉孔竉|籠竹器又龍聾二音|攏攏略又拗攏籌也出酒律|𢤱𢤱悷不調|儱儱侗未成器也|龓乘馬又牽也說文兼有也
iAB呼孔嗊羅嗊歌曲出告幼童文呼孔切二|𢦅𢦅𢦅心神恍忽皃
GAB徒摠動躁也出也作也搖也徒摠切九|𨔝古文（躁也出也作也搖也徒摠切九）|酮酒壞又音同|姛項直皃|眮瞋目|詷訂詷訂音挺|桶木器又他孔切|挏推引也漢有挏馬官作酒又音同|硐安硐鏓硐見馬融長笛賦
CAB蒲蠓菶蒲蠓切草盛皃又方孔切三|唪大笑也|埲塕埲塵起
#腫
XDB之隴腫疾也說文癰也釋名曰腫鍾也寒熱氣鍾聚也之隴切六|種種類也又之用切|踵足後又繼也趾也頻也說文追也一曰往來皃|歱說文跟也|㣫相跡也|喠喠𠹍欲吐
KDB丑隴寵寵愛也丑隴切三|𧼙小皃行皃|埫埫塎不安
IDB力踵隴說文云天水大坂也亦州漢汧縣後魏置東秦州又改爲隴州因山名之力踵切三|壠說文曰丘壠也方言曰秦晉之閒家謂之壠亦作壟書傳曰畝壟也|㙙塗也
hDN於隴擁手擁說文作𢹬抱也又擁劒蟲形似蟹崔豹古今注云一名執火其螯赤故謂之執火於隴切三|𢶜上同（手擁說文作𢹬抱也又擁劒蟲形似蟹崔豹古今注云一名執火其螯赤故謂之執火於隴切三）|壅壅堨亦塞也障也又音邕
cDB而隴宂宂散也亦官名續漢志曰先臘一日大儺逐疫鬼宂從僕射將之逐鬼于禁中俗作冗而隴切十二|𡦼上同（宂散也亦官名續漢志曰先臘一日大儺逐疫鬼宂從僕射將之逐鬼于禁中俗作冗而隴切十二）|穁稻穁䅌|䢇不肖也一曰傝䢇劣也或作㩉茸又作㲩𣯏|𣭲鳥細毛也|氄上同（鳥細毛也）|軵推車或作搑|𤘺水牛|𪕎𪕎鼠|𢫨拒也亦作軵|𨍷輕也|搑推擣皃也又而容切
LDB直隴重多也厚也善也慎也直隴切又直龍直用二切四|𢝆遟也|襱袴也又來公力董二切又作𧙥|鮦魚名又直柳切
JDB知隴冢大也周禮天官冢宰說文曰高墳也釋名曰冢腫也象山頂之高腫起知隴切二|塚俗（大也周禮天官冢宰說文曰高墳也釋名曰冢腫也象山頂之高腫起知隴切二）
CDN扶隴奉與也獻也祿也說文承也扶隴切二|唪口高皃出埤蒼
BDN敷奉捧兩手承也敷奉切一
lDB余隴勇猛也說文作勈气也余隴切十五|恿古文（猛也說文作勈气也余隴切十五）|涌涌泉說文曰滕也一曰涌水在楚國|甬草花欲發皃亦甬道周禮云舞上謂之甬甬鐘柄也|踊跳也又踊刖者以之接足晏子曰踊貴屨賤|慂方言云慫慂勸也|𧻹說文曰喪躃𧻹也經典作踊同|塎埫塎不安|悀心喜也又出也|埇地名在淮泗|溶水皃又音容|蛹蠶化爲之|傛說文曰不安也又音容|俑木人送葬設關而能跳踊故名之出埤蒼|𧗴巷道出蒼頡篇
eDN丘隴恐懼也丘隴切又丘用切三|𢖶古文（懼也丘隴切又丘用切三）|𦶐䕞𦿆也
ZDB時宂尰足腫病亦作𡰒時宂切三|𤺄上同出說文（足腫病亦作𡰒時宂切三）|𢡹自要𢡹出聲譜
dDN居悚拱手抱也又斂手也居悚切十八|拲兩手共械周禮曰上罪梏拲而桎|䂬水邊大石|鞏以皮束物又縣名在河南亦姓左傳晉大夫鞏朔|蛬蟋蟀又巨容切|孒孑孒井中小蟲|珙璧也|廾說文曰竦手也篆文作𠬞弄具奐丞字並从此篆同而隷異也|𢪒說文曰楊雄說廾从兩手也|㤨戰慄也又戶工切|𢸁姓也|㼦缻也|㧬抱持說文𢹬也|䡗輞也|䱋鯤魚子也|巩抱也說文作㧬恐鞏類並从此|栱爾雅云杙大者謂之栱|輁輁軸所以支棺
QDB息拱悚怖也息拱切十|竦敬也國語云竦善抑惡|慫驚也|聳高也說文曰生而聾曰聳|𦄼絆前兩足|㩳執也|駷何休云馬搖銜走也|愯懼也亦作𢥠|傱傱傱走意又先項切|䙕禪衣
iDN許拱洶洶溶水皃許拱切三|詾詾嚇也又音凶|兇恐懼說文曰擾恐也左傳曰曹人兇懼又音凶
ADN方勇覂覆也或作𢇫又作泛此覂駕之馬非良者說文曰反覆也方勇切二|𢇫上同（覆也或作𢇫又作泛此覂駕之馬非良者說文曰反覆也方勇切二）
ECB都𪁪湩都𪁪切濁多也此是冬字上聲一
DCB莫湩𪁪莫湩切𪁪鴟鳥又莫項切二|䏵豐大
fDN渠隴䅃穫也渠隴切又渠恭切一
YDB充隴𨿿小鳥飛也充隴切二|喠氣急之皃
ODB且勇幒說文曰㡓也職勇切二|𢃓上同又且勇切（說文曰㡓也職勇切二）
NDB子冢䙕子冢切襌衣又息拱切一
#講
dEB古項講告也謀也論也說文曰和解也古項切四|港水派|傋𠈵傋不媚皃又虛項切|耩耕也
CEB步項㭋杖也打也步項切八|棒上同（杖也打也步項切八）|棓上同魏志云曹操爲北部尉門左右縣五色棓各十枚（杖也打也步項切八）|玤周邑地名又珠次玉|𢗒𢗒慃很戾|蚌蛤也|蜯上同（蛤也）|䎧䎧䥯器出埤蒼
hEB烏項慃𢗒慃很戾烏項切一
DEB武項𠈵𠈵傋武項切二|𪁪𪁪鴟鳥
jEB胡講項頸項說文曰頭後也釋名曰項确也堅硧受枕之處又姓本姬姓國公羊曰爲齊桓公所滅子孫以國爲氏項燕爲楚將生梁梁兄子籍號霸王胡講切二|缿說文云受錢器古以瓦今以竹又大口切
AEB巴講𦂌小兒皮屨巴講切又補孔切一
iEB虛慃傋虛慃切𠈵傋二|𢞡慃𢞡
#紙
XFR諸氏紙釋名曰紙砥也平滑如砥石也後漢蔡倫以魚網木皮爲紙又姓後魏書官氏志云渴侯氏後改爲紙氏諸氏切十六|帋上同（釋名曰紙砥也平滑如砥石也後漢蔡倫以魚網木皮爲紙又姓後魏書官氏志云渴侯氏後改爲紙氏諸氏切十六）|只語辤|坻隴坂也又直尼當禮二切|軹縣名在河內又字書云車輪之穿爲道絏子嬰於軹途是也|枳木名周禮曰橘踰淮北而爲枳又居帋切|咫咫尺賈逵云八寸曰咫|扺扺掌說文云側手擊也|𣲵水名出枸扶山|砥平也直也均也礪石也書傳云砥細於礪皆磨石也|坁說文云坁著也|汦著止|抧開也|恀怙也又音是|䅩曲枝果也|䳅䳅䳜鳥如烏赤足可以禦火見山海經
ZFR承紙是是非也說文曰直也又姓吳志云是儀本姓氏孔融嘲之曰氏字民無上乃改爲是焉又虜複姓四氏西魏有開府是云寶後魏書又有是連是婁是賁三氏承紙切十|氏氏族又支精二音|媞江淮呼母也又音啼|諟理也正也諦也審也|恀爾雅曰恀怙恃也一云恃事曰恀|徥行皃又池爾切|𤜣𤜣狼|褆衣服端正|姼方言云南楚人謂婦妣曰母姼也|䟗䟗尌也謂立也積聚也
DFJ文彼靡無也偃也又靡曼美色也說文曰披靡也文彼切七|𨇻行皃|𪎓𪎓𪎓猶遟遟也|骳骳屈曲也|𦗕乘輿金耳又美爲切|𡬍熟寐也又莫禮切|蘼薔蘼藥名又亡爲切
AFJ甫委彼對此之稱甫委切五|㗗相分解也|柀木名爾雅云柀煔|佊埤蒼云佊邪也|𠐌停𠐌
CFJ皮彼被寢衣也又姓呂氏春秋有大夫被瞻皮彼切又皮義切二|罷遣有罪又平陂薄解二切
iFp許委毀壞也破也缺也虧也許委切十|燬火盛|檓爾雅云檓大椒|毇說文曰米一斛舂爲八斗|𥶵上同（說文曰米一斛舂爲八斗）|𠷏又於詭切義見下文|譭謗也譖也|㩓手擊傷也|烜周禮有司烜氏以陽燧取火於日以鑒取水於月|𡢕說文曰惡也一曰人皃
hFp於詭委委曲也亦委積又屬也棄也隨也任也又姓漢有太原太守委進出風俗通於詭切五|骫骨曲又姓出纂文|𠷏說文曰鷙鳥食已吐其皮毛如丸又許委切|蜲黍負爾雅云蛜威委黍字或從虫|䍴羊相䍴𦎸
eFp去委跪拜也去委切又渠委切二|𣄲刖一足
dFp過委詭詐也又橫財物爲詭遇也過委切十九|垝垝垣毁垣也又作陒|陒上同（垝垣毁垣也又作陒）|䣀陸䣀山名出山海經|攱枕也|䤥戾鋸齒也說文曰臿屬一曰瑩鐵也|觤羊角不齊|恑變也悔也|蛫蟹也|祪毁廟之祖|庪爾雅云祭山曰庪縣|䃽（爾雅云祭山曰庪縣）|庋並上同（爾雅云祭山曰庪縣）|洈水名出南郡東洈山至華容縣入江也|蟡長八尺一首二身似蛇以名呼之可取魚鼈|𪀗子規玉篇云布榖也|姽宋玉神女賦曰既姽嫿於幽靜說文曰閑體行姽姽也|桅短矛或作𥍨說文曰桅黃木可染|佹戾也
QFh息委髓說文作𩪦骨中脂也息委切五|嶲越嶲郡|靃靃靡草木弱皃|䭉餹䬾方言云餅|𣿂滑也
IFh力委絫說文曰增也十黍之重也力委切六|累上同又良僞切（說文曰增也十黍之重也力委切六）|樏似盤中有隔也又音縲|䉂法者䉂可以網人心|厽說文曰絫坺土爲牆壁|垒說文曰垒墼也
fFZ渠綺技藝也說文巧也渠綺切六|妓女樂|徛立也|伎侶也|錡釜也又魚綺切|䗁蟬也
hFZ於綺倚依倚也又姓楚左史倚相於綺切五|猗猗狔猶窈窕也又於羈切|椅椅柅又於宜切|旖旖旎旌旗從風皃|輢車輢
dFZ居綺掎牽一脚說文云偏引也居綺切七|剞剞劂曲刀|庋食閣又音詭|㞆一足又作踦|踦公羊傳曰相與踦閭而語閉一扇開一扇一人在內一人在外|㱦弃也又丘知九奇二切|攲持去也又居宜切
eFZ墟彼綺文繒又姓漢四皓有綺里季墟彼切七|婍皃好|碕碕礒石皃又起宜巨支二切|䞚行皃|㥓𢜩㥓又去奇切儉意也|觭牛角又丘奇切|㾨痤也喪也又於蟹切
gFZ魚倚螘爾雅曰蚍蜉大螘小者螘魚倚切十二|蟻上同（爾雅曰蚍蜉大螘小者螘魚倚切十二）|蛾上同見禮（爾雅曰蚍蜉大螘小者螘魚倚切十二）|錡三足釜一曰蘭錡兵藏又姓武王分殷人六族有錡氏後漢有錡嵩|礒碕礒|齮齧也|艤整舟向岸|檥上同說文魚羈切榦也（整舟向岸）|㠖岌㠖山高皃|轙說文曰車衡載轡者|羛羛陽鄉名在魏郡|䰙釜也亦作鈘說文曰三足鍑也一曰滫米器也
kFp韋委蔿草也又姓左傳晉大夫蔿伯韋委切九|鄬地名|儰不安也|䧦地名|蘤花也榮也|𤺉口咼|䦱闢也國語曰䦱門與之言又姓|薳草又姓左傳楚有薳氏代爲大夫|寪說文云屋皃
NFh即委觜喙也即委切二|㭰上同說文識也一曰藏也（喙也即委切二）
cFh如累蘂花外曰萼花內曰蘂如累切四|蕊草木叢生皃|甤說文曰草木實甤甤也又人隹切|繠茸也垂也又佩垂皃
OFR雌氏此止也雌氏切九|跐蹈也又阻買切|佌小舞皃|玼玉色鮮又千禮切|泚水清又千禮切|𩢑馬名|𠈈小皃|𧺼淺渡也|𡘌直大也說文火介切瞋大聲也
LFR池爾豸蟲豸爾雅云有足曰蟲無足曰豸說文云獸長𦟝行豸豸然欲有所伺殺形池爾切十二|褫奪衣易曰以訟受服終朝三褫之|陊山崩也說文大可切落也|䊓黏也|踶踶跂用心力皃莊子曰踶跂爲義|傂佌傂參差皃|杝析薪又敕氏切|阤落也說文云小崩也|䚦角端不正說文敕豕切角傾也|廌解廌又宅買切又作𧣭|褆好衣|徥行皃朝鮮語也
QFR斯氏徙移也斯氏切五|壐說文曰王者印也所以主土从土爾聲|璽籀文（說文曰王者印也所以主土从土爾聲）|𠈈𠈈小皃詩云𠈈𠈈彼有屋本亦作佌佌又音此|𢇌小皃又千禮切
lFR移爾酏酏酒移爾切九|迆邐迆連接|匜杯匜有柄可以注水又音移|衪衣中袖也|肔引腸莊子云萇弘肔崔譔注云肔裂也又敕紙切|崺峛崺沙丘狀峛音邐|扡加也又離也又弋支切或作拸|㥴不憂事也又弋支切|孈多態
IFR力紙邐邐迆力紙切三|峛峛崺|㸚㸚尒布明白象形也
VFR所綺躧躧步也又作蹝說文曰舞履也所綺切十|𩎉上同（躧步也又作蹝說文曰舞履也所綺切十）|灑灑埽又所買切|纚韜髮者又颯纚長紳皃|縰上同（韜髮者又颯纚長紳皃）|釃分也見漢書溝洫志說文曰下酒也一曰醇也|𩌦鞮屬|屣履不躡跟|矖視也|簁籮也說文曰簁箄竹器也
AFF并弭𢔌使也從也職也并弭切十|俾上同說文曰益也一曰俾門侍人（使也從也職也并弭切十）|鞞刀鞞又蒲迷補茗二切|箄竹器又卑篦二音|𪐄黍屬又蒲賣切|髀股也又步米切|崥山足|𦸣爾雅曰𦸣鼠莞郭璞曰亦莞屬纖細似龍須可以爲席|𠬈客|𢳋扶持
cFR兒氏爾汝也說文作爾云麗爾猶靡麗也兒氏切四|尒義與爾同說文曰詞之必然也又虜姓二氏尒朱氏本北秀容人也居尒朱川因以爲氏後魏書官氏志尒綿氏後改爲綿氏也|邇近也|𨒛上同（近也）
DFF綿婢渳水皃說文㱃也綿婢切十一|弭弓末又息也亦無緣弓也|濔水流皃|瀰詩曰河水瀰瀰水盛皃也|羋羊鳴一曰楚姓|敉撫也愛也安也|侎上同（撫也愛也安也）|葞爾雅云葞春草本草云芒草也|䖹爾雅注云今米榖中蠹小黑蟲是也|𩰞力褊又乃禮切|㥝止也
CFF便俾婢女之下也便俾切二|庳下也或作埤又音卑說文曰中伏舍也一曰屋庳
YFR尺氏侈奢也泰也大也尺氏切十五|姼㚲姼輕薄皃又美也㚲吐涉切|𡚼上同（㚲姼輕薄皃又美也㚲吐涉切）|鉹甑也|誃說文曰離別也|㢋廣也國語曰俠溝而㢋我|㢁上同（廣也國語曰俠溝而㢋我）|垑恃土地也|懘又昌厲切|㶴盛也|袳衣張亦作袲又宋地名|袲上同（衣張亦作袲又宋地名）|𧰲豕也|恀恃也又音帋|哆張口又丑加昌者二切
aFR施是弛釋也說文云弓解也施是切三|豕豬也|阤壞也又音豸
NFR將此紫閒色也又姓出何氏姓苑將此切九|訿訿毁|訾上同（訿毁）|啙窳也又子西切|𣸆水名在長沙|跐行皃|茈茈薑又茈草也|呰口毁說文苛也|㧗捽也又子禮側買二切
XFh之累捶擊也之累切五|箠策也|𦓝小巵出說文|䮔馬小皃又子垂切|沝二水又音資
TFh初委揣度也試也量也除也初委切又丁果切二|㪜試也
RFh隨婢𤢍牸豚或作𤡪隨婢切一
bFR神帋舓以舌取物神帋切四|𦧇上同（以舌取物神帋切四）|舐俗（以舌取物神帋切四）|𤜣獸名似狐出則有兵
SFR側氏㧗拳加人也側氏切又音紫二|跐蹈也又音紫
BFJ匹靡㱟披析匹靡切三|紴水波錦文又補柯切|披開也又偏羈切
BFF匹婢諀諀訾惡言匹婢切六|庀具也|疕瘡上甲亦頭瘍又卑履切|仳仳離別之意|䚹具也|吡訾也出莊子
lFh羊捶䓈雞頭也北燕謂之䓈羊捶切六|䔺草木葉初出皃|芛爾雅云蕍芛葟華榮|撱撱棄又撞也|䝐小豶亦作𧱞|𤼒瘡裂
PFh才捶惢疑也才捶切一
eFl丘弭跬舉一足丘弭切四|䞨上同（舉一足丘弭切四）|頍弁皃又舉頭皃|䠑䠑踽開足之皃
MFR女氏狔猗狔從風皃女氏切三|旎旖旎|柅椅柅
gFp魚毀硊磈硊石皃魚毀切四|頠閑習容止|姽好皃又過委切|𪀗布榖鳥
fFp渠委跪䠆跪亦作𧻜渠委切又去委切一
KFR敕豸褫敕豸切衣絮偏也又池豸二音一
JFR陟侈㨖指也說文刺也陟侈切二|𧛢䘢𧛢
iFZ興倚𪖥去涕也興倚切一
eFV丘弭企企望也丘弭切又去智切二|跂踶跂山海經云有跂踵國人行腳跟不著地如人之跂足也又去智巨支二切
ZFh時髓菙周禮有菙氏燋焌用荊菙之類時髓切二|㥨㜇不悅也
dFV居帋枳木名似橘居帋切又諸氏切一
#旨
XGR職雉旨說文云美也从匕甘又志也亦作𣅀見經典職雉切八|指手指也又示也斥也|恉意也|祁地名|䛗訐發人之惡|厎平也致也說文云柔石也|砥砥礪也說文同上（平也致也說文云柔石也）|茋茋蒻小苹
ZGR承矢視比也瞻也效也承矢切三|眡（比也瞻也效也承矢切三）|眎並古文（比也瞻也效也承矢切三）
DGJ無鄙美好色說文曰甘也从羊从大羊在六畜主給膳也美与善同意無鄙切五|媺上同周禮地官云一曰媺宮室（好色說文曰甘也从羊从大羊在六畜主給膳也美与善同意無鄙切五）|𤛎獸似牛|渼渼陂在京兆鄠縣|媄字㨾云顏色姝好也
AGJ方美鄙陋也又邊鄙也方美切四|啚說文嗇也|娝姓出何承天纂文|痞病也又音否
RGR徐姊兕爾雅曰兕似牛郭璞曰一角青色重千斤徐姊切七|𧰽上同（爾雅曰兕似牛郭璞曰一角青色重千斤徐姊切七）|𠒅古文（爾雅曰兕似牛郭璞曰一角青色重千斤徐姊切七）|𠒃俗（爾雅曰兕似牛郭璞曰一角青色重千斤徐姊切七）|羠犍羊又以脂切|薙燒草又直履他計二切|䒨蒿也
dGZ居履几案屬周禮司几筵掌五几凡朝覲大饗射封國命諸侯設左右玉几祀先王亦如之諸侯祭祀右彫几筵國賓于牖前左彤几甸役右漆几喪事右素几吉事變几凶事仍几或作机居履切九|𪊨爾雅云𪊨大麕旄毛狗足|麂上同（爾雅云𪊨大麕旄毛狗足）|㞦女㞦山名弱水所出|机說文曰木也山海經曰族蔨之山多松栢机桓|䢳地名|𤜝獸名如兔喙蛇尾是則有蝗災|㞛赤𩍆㞛也|䂹石墮聲也
NGR將几姊爾雅曰男子謂女子先生爲姊將几切二|秭千億也亦秭歸縣在歸州袁山松云屈原此縣人被放姊來因名其地姊與秭同音風俗通云千生万万生億億生兆兆生京京生秭秭生垓垓生壤壤生溝溝生澗澗生正正生載載地不能載也
AGF卑履匕匕匙通俗文曰匕首劒屬其頭類匕短而便用故曰匕首卑履切十|妣爾雅曰父曰考母曰妣又甫至切|秕穅秕|比校也並也爾雅曰北方有比肩民焉迭食而迭望蓋半體人也又毗鼻邲三音|䃾以豚祀司命也|沘水名出廬江灊縣入芍陂今謂之渒淠水也|枇禮記注云所以載牲體|朼上同（禮記注云所以載牲體）|疕頭瘍|髀股外又旁禮切
dGp居洧軌法也車跡也說文曰車轍也居洧切十二|簋簠簋祭器受斗二升內圓外方曰簋|朹古文（簠簋祭器受斗二升內圓外方曰簋）|晷日影也又規也|厬厬泉或作𣷾爾雅云水醮曰厬謂水醮盡也|𣷾上同（厬泉或作𣷾爾雅云水醮曰厬謂水醮盡也）|宄內盜也|匭匣也唐垂拱元年置匭於朝令上表者投之有延恩通玄招諫申冤等四匭也|𠥗古文說文云匭𠥗皆古文簋字|頯小頭又巨追切|氿水涯枯土爾雅曰氿泉穴出穴出仄出也|𧗝𧗝跡
kGp榮美洧水名在鄭榮美切四|鮪魚名|痏瘡痏|䵋黃色
aGR式視矢陳也誓也正也直也說文曰弓弩矢也古者夷牟初作矢式視切四|𠂕又作𥬘並俗（陳也誓也正也直也說文曰弓弩矢也古者夷牟初作矢式視切四）|𦳊說文曰糞也本亦作矢俗作屎|屎俗本許伊切
LGR直几雉爾雅曰雉絕有力奮謂最健鬬也又陳也度也王肅云城高一丈曰堵三堵曰雉直几切三|滍水名在魯陽|薙芟草又辛薙辛夷別名又音替
QGR息姊死說文曰澌也人所離也息姊切一
CGF扶履牝扶履切又毗忍切一
IGR力几履踐也祿也幸也福也字書云草曰屝麻曰屨皮曰履黃帝臣於則所造又姓出姓苑力几切一
aGh式軌水說文曰準也北方之行也釋名曰水準也準平物也式軌切一
IGh力軌壘說文曰軍壁也又重壘亦姓後趙錄有壘澄本姓裴氏力軌切十四|蜼似猴仰鼻而尾長尾端有歧說文惟季切又音柚|猚上同（似猴仰鼻而尾長尾端有歧說文惟季切又音柚）|櫐藤爾雅曰諸慮山櫐|蘽上同（藤爾雅曰諸慮山櫐）|㶟水出鴈門|𡻭𡻭㠑山皃|轠轠轤車屬|鸓飛生鳥名飛且乳一曰鼯鼠毛紫赤色似蝙蝠而長|藟葛藟葉似艾或作虆|誄銘誄誄壘也壘述前人之功德周禮曰小史掌卿大夫之喪讀誄也說文曰誄諡也|耒田器又盧對切|讄禱也|𤢹飛𤢹獸
fGl求癸揆度也求癸切五|楑木名又音葵|𢜽悸也又巨隹切|嫢細也又聚惟切|湀泉出也說文曰湀辟深水處也
OGh千水趡走也又魯地名千水切三|踓蹵|𨿐細頸
MGR女履柅絡絲柎易曰繫于金柅女履切又音尼一
dGl居誄癸辰名爾雅太歲在癸曰昭陽古作癸又姓姓苑云出齊癸公後居誄切二|湀通流
CGJ符鄙否塞也符鄙切又方久切八|痞腹內結痛|圮岸毀又覆也|仳離也又芳比切|殍草木枯落也又音孚|𢁦㡜裂|䤏覆也或作𡺮|𢻹方言云器破而未離南楚之閒謂之𢻹又匹支芳鄙二切
PGh徂累㠑𡻭㠑山皃徂累切一
BGJ匹鄙嚭大也匹鄙切五|秠一稃二米又孚悲切|疕頭瘍|𡺮崩也|𢻹又匹支符鄙二切
cGh如壘蕊草木實節生如壘切三|甤說文曰草木實甤甤也|繠垂也
lGh以水唯諾也以水切又音惟八|蓶草似馬韭而黃可食|䲊蟹子又他果切|壝埒也又音遺|瀢魚盛皃|孈愚戇多態又尤卦切|撱棄也|踓走也又千水切
hGZ於几㰻㰻㰳驢鳴於几切一
NGh遵誄濢汁漬也遵誄切四|噿鳥噿|嶉山狀|臎肥皃
JGR豬几黹鍼縷所紩周禮祭社稷五祀則用黹冕也豬几切四|𢾫剌|夂後至也|㨖挃也
KGR楮几𡳭移蠶就寬楮几切一
XGR止姊𧿲止姊切一
iGl火癸䁤恚視火癸切又火季切一
fGp暨軌䣀山名暨軌切一
fGZ暨几跽䠆跽暨几切一
eGp丘軌巋巋然高峻皃又小山而眾曰巋丘軌切二|蘬蘢古大者曰蘬
#止
XHR諸市止停也足也禮也息也待也留也諸市切十|畤說文云天地五帝所基止祭地右扶風有五畤又時止切|沚釋名曰沚止也小可以止息其上說文曰小渚曰沚|洔上同說文曰水暫益且止未減也（釋名曰沚止也小可以止息其上說文曰小渚曰沚）|茝香草字林云蘪蕪別名又昌待切|趾足也|址基址|阯交阯郡劉欣期交州記云交阯之人出南定縣足骨無節身有毛臥者更扶始得起山海經云交脛國爲人交脛郭璞曰腳脛曲戾相交所以謂雕題交阯也|芷白芷藥名又芷陽縣名|厎定也又厎柱也
ZHR時止市說文云買賣所之也周禮曰司市掌市之治教政刑量度禁令大市日側而市百族爲主朝市朝時而市商賈爲主夕市夕時而市販夫販婦爲主古史考曰神農作市世本曰祝融作市時止切三|恃依也賴也|畤又諸市切
JHR陟里徵五音配夏亦作徵見經典省陟里切又竹凌切三|𧩼𧩼言也出方言|㨖指也
iHd虛里喜喜樂又聞喜縣在絳州漢武帝幸左邑聞南越破遂改爲聞喜縣禮記曰人喜則斯陶陶斯咏虛里切又香忌切三|憙悅也又許忌切|蟢蟢子蟲名
dHd居理紀極也會也事也理也識也亦經紀又十二年曰紀又姓出丹陽居理切四|己身己爾雅曰太歲在己曰屠維|妀說文云女字也|𠮯說也
lHR羊己以用也與也爲也古作㠯羊己切七|㠯古文（用也與也爲也古作㠯羊己切七）|已止也此也甚也訖也又音似|苡薏苡蓮實也又芣苡馬蕮也又名車前亦名當道好生道閒故曰當道江東呼爲蝦蟆衣山東謂之牛舌|苢上同（薏苡蓮實也又芣苡馬蕮也又名車前亦名當道好生道閒故曰當道江東呼爲蝦蟆衣山東謂之牛舌）|佁癡也說文讀若騃又夷在切|攺大堅說文曰㱾攺大剛卯以逐鬼鬽也
RHR詳里似嗣也類也象也詳里切十五|佀上同（嗣也類也象也詳里切十五）|祀年也又祭祀|𥘰（年也又祭祀）|禩並上同（年也又祭祀）|姒夏姓一曰娣姒長婦曰姒幼婦曰娣|巳辰名爾雅曰太歲在巳曰大荒落|耜耒耜世本曰倕作耜古史考曰神農作耜|𦓨上同（耒耜世本曰倕作耜古史考曰神農作耜）|汜水名在河南成皋縣說文曰水別復入水也一曰汜窮瀆也詩曰江有汜|洍說文曰水也一曰詩曰江有洍|泤上同（說文曰水也一曰詩曰江有洍）|攺又羊己切|鈶鋌鈶|𪊍鹿一歲曰𪋇二歲曰𪊍
VHR疎士史史籍說文作㕜記事者也亦姓周卿史佚之後出建康又漢複姓五氏世本衛有史朝朱駒漢書藝文志有青史氏著書又有新豐令王史音吳有東萊太守太史慈晉有東萊侯史光疎士切四|使役也令也又疎事切|駛疾也又音去聲|𩰢香之美者
cHR而止耳辝也說文云主聽也而止切五|洱水名出罷谷山又而志切|駬騄駬周穆王馬名|䋙䋙䋙轡盛皃|𪕔鼠名
IHR良士里周禮五家爲鄰五鄰爲里風俗通云五家爲軌十軌爲里里者止也五十家共居止也又姓左傳晉大夫里克又漢複姓有相里氏良士切十|裏中裏說文曰衣內也|鯉魚名|悝憂也詩云悠悠我悝又口回切|李果名亦行李又姓風俗通云李伯陽之後出隴西趙郡頓丘渤海中山襄城江夏梓潼范陽廣漢梁國南陽十二望|㾖病也|理料理義理又正也文也說文曰治玉也亦姓皋陶爲大理因官氏焉殷有理徵|娌妯娌|俚賴也聊也又南人蠻屬也|𨛋亭名在西鄂一曰邑名
QHR胥里枲麻有子曰枲無子曰苴也胥里切七|𦱓胡𦱓|𤟧不安皃又作偲|䈚竹萌也又音待|葸質愨皃又畏懼也|諰言且思之|𠪙說文曰石利也
aHR詩止始初也詩止切一
LHR直里歭說文䠧也歭䠧不前也直里切九|跱上同（說文䠧也歭䠧不前也直里切九）|峙具也又峻峙|痔病也|偫待也儲也具也又看所望而往|洔水中高土又音止|畤儲|秲稻名秲𥣬|庤詩曰庤乃錢鎛庤具也亦作𤲵
eHd墟里起興也作也立也發也又姓出何氏姓苑墟里切六|邔縣名在南郡又渠記切|杞木名又苟杞春名天精子夏名苟杞葉秋名卻老枝冬名地骨根又國名夏之後也亦姓杞梁是也|屺山無草木|玘佩玉|芑白梁粟也
UHR鉏里士說文曰事也數始於一終於十从一十孔子曰推十合一爲士又姓左傳晉大夫士蔿又漢複姓二氏古今人表有士思癸又士貞氏晉康公庶子士貞之後鉏里切五|仕仕官|柹果名|𢨪砌也閾也|戺上同（砌也閾也）
WHR牀史俟待也亦作竢又姓風俗通云有俟子古賢人著書又虜複姓二氏後魏書云俟畿氏後改爲畿氏俟奴氏後改爲俟氏又虜三字姓三氏俟力伐氏後改爲鮑氏俟伏斤氏後改爲伏氏周書太祖賜韓襃姓俟呂陵氏牀史切又音祈七|竢上同（待也亦作竢又姓風俗通云有俟子古賢人著書又虜複姓二氏後魏書云俟畿氏後改爲畿氏俟奴氏後改爲俟氏又虜三字姓三氏俟力伐氏後改爲鮑氏俟伏斤氏後改爲伏氏周書太祖賜韓襃姓俟呂陵氏牀史切又音祈七）|涘水岸涯也|騃趨行皃西京賦曰羣獸駓騃又吾駭切|𥾩繩履|𥏳不來也說文引詩曰不𥏳不來从來矣聲|𢓪說文同上（不來也說文引詩曰不𥏳不來从來矣聲）
NHR即里子子息環濟要略曰子猶孳也孳恤下之稱也亦辰名爾雅云太歲在子曰困敦又殷姓又漢複姓十一氏左傳鄭大夫子人九魯大夫子服氏子家羈莊子有子桑扈皇子告敖何氏姓苑有子乾子仲子工子革子臧子師等氏即里切八|㜽古文（子息環濟要略曰子猶孳也孳恤下之稱也亦辰名爾雅云太歲在子曰困敦又殷姓又漢複姓十一氏左傳鄭大夫子人九魯大夫子服氏子家羈莊子有子桑扈皇子告敖何氏姓苑有子乾子仲子工子革子臧子師等氏即里切八）|仔說文克也本又音兹|虸虸蚄蟲|耔擁苗本也|秄上同（擁苗本也）|梓木名楸屬|杍工木匠或作梓
kHd于紀矣說文云語已詞也于紀切二|𦮸蒿也
gHd魚紀擬度也魚紀切六|儗僭也|薿草盛皃又魚力切|孴盛也|譺議也欺也調也又魚記切|𥣖禾盛
YHR昌里齒齒錄也年也又牙齒昌里切二|䊼績苧一䊼出新字林
KHR敕里恥慙也敕里切三|祉福也祿也|褫徹衣又奪衣又直追池耳二切
TWT初乙TRi初夬㓼a割聲初紀切三|欼b齧也|㱀b上同（齧也）
SHR阻史滓澱也阻史切五|笫牀簀又側几切|胏脯有骨曰胏易曰食乾胏|䔂說文云羹菜也|𠂔止也從市一橫止之出文字音義說文即里切
hHd於擬譩恨也又噟也於擬切又於其切二|醷梅漿
MHR乃里伱秦人呼傍人之稱乃里切二|聻指物皃也
#尾
DIN無匪尾首尾也易曰履虎尾又姓史記有尾生無匪切八|亹美也爾雅亹亹勉也|斖俗（美也爾雅亹亹勉也）|浘水流皃又浘𤁵海水洩處案莊子作尾閭字不从水|娓美也說文順也又音美音媚|䞔人名鄭大夫蔡䞔也|䅏饘也|䬿微也
hId於豈扆戶牖閒也禮疏云如綈素屏風畫斧文也於豈切六|㥋痛聲|偯哭餘聲|㕈藏也|僾僾俙看不了皃又烏代切|靉靉霼不明皃出海賦又烏代切
eId袪豨豈安也焉也曾也袪豨切二|䔇菜似蕨生水中
dId居豨蟣蟣蝨居豨切四|幾幾何又既稀切|穖禾穖|𩴆鬼俗吳人曰鬼越人曰𩴆又音祈
BIN敷尾斐文章皃敷尾切七|菲薄也微也又菜名又音妃|朏月三日明生之名|悱口悱悱也|𩦎馬名|奜大也|䨽鳥如梟也說文別也又平利切
AIN府尾匪非也易曰匪寇婚媾說文曰器如竹篋今從竹爲筐篚字府尾切八|篚竹器方曰筐圓曰篚|棐輔也|餥餱也一曰相請食|榧木名子可食療白蟲|蜰爾雅云蜚蠦蜰即負盤臭蟲又音肥|䕁草也|蜚蟲名咸蜚又扶沸切
kIt于鬼韙是也于鬼切十三|煒光煒|暐暐曄|偉大也|瑋玉名|葦蘆葦|椲木名可屈爲盂|韡華盛皃|𩘚大風皃|媁醜也|愇字書云恨也|鍏方言云臿宋魏之閒或謂之鍏|𢯷逆追
dIt居偉鬼鬼之爲言歸也居偉切一
iIt許偉虺蛇虺許偉切五|𤈦齊人云火|𩄁震雷也|虫鱗介摠名|卉百草摠名又音諱
gId魚豈顗靖也樂也說文曰謹莊皃魚豈切二|螘螘子蟲
iId虛豈豨楚人呼猪亦作狶虛豈切五|俙僾俙|𪖥𪖥鼻又虛几切|霼靉霼|唏哀而不泣
hIt於鬼磈磈硊石山皃又危也於鬼切二|嵔嵔崔山高曲下
CIN浮鬼膹𦞦多汁浮鬼切六|䆏稻紫莖不黏也又扶畏切|橨船邊木也|蟦蠀螬別名又符沸切|陫陋也又作厞又符沸切|䒈船䒁釘鐼
#語
gJd魚巨語說文論也魚巨切十二|篽說文曰禁苑也|籞上同又池水中編竹籬養魚（說文曰禁苑也）|圉養馬又姓左傳有大夫圉公陽|敔柷敔樂器釋名曰敔衙也衙止也所以止樂也|圄囹圄周獄名又守也|衙行皃楚詞云導飛廉之衙衙又音牙|齬齟齬不相當也或作鉏鋙說文曰齬齒不相值也|鋙鉏鋙不相當也|䥏上同（鉏鋙不相當也）|禦禁也止也應也當也說文祠也|蘌蘌翳
IJR力舉呂字林云脊骨也說文作呂又作膂亦姓太嶽爲禹心呂之臣故封呂侯後因爲氏出東平力舉切十二三|膂上同（字林云脊骨也說文作呂又作膂亦姓太嶽爲禹心呂之臣故封呂侯後因爲氏出東平力舉切十二三）|旅師旅說文曰軍五百人也亦姓漢功臣表有旅卿封昌平侯俗作𢬜|𥰠筲器|祣祭山川名案論語只作旅|穭自生稻也|梠桷端連綿木名說文楣也|儢儢拒心不欲爲也出文字指歸|侶伴侶|㭚木名可爲箭笴|郘亭名|絽絣也|𢈚晉大夫名
LJR直呂佇久立也直呂切九|竚上同（久立也直呂切九）|芧草也可以爲繩|苧上同（草也可以爲繩）|紵麻紵|杼說文曰機之持緯者又神與切|羜生羔五月|宁門屏之閒禮云天子當宁而立|眝說文曰長眙也一曰張眼也
lJR余呂與善也待也說文曰黨與也余呂切又余譽二音七|与上同（善也待也說文曰黨與也余呂切又余譽二音七）|𢌱古文（善也待也說文曰黨與也余呂切又余譽二音七）|歟歎也又音余|予郭璞云予猶與也又弋諸切|藇蕃蕪亦作穥又徐呂切|㦛說文曰趣步㦛㦛也
XJR章与䰞說文曰亨也章与切亨普庚切四|煑上同（說文曰亨也章与切亨普庚切四）|陼丘也說文曰如渚者陼丘水中高者也|渚沚也釋名曰小洲曰渚渚遮也能遮水使旁迴也又水名出常山
cJR人渚汝尒也亦水名山海經曰汝水出天息山亦州名春秋時爲王畿及鄭楚之地左傳楚襲梁及霍漢爲梁縣後魏屬汝北郡隋移伊州於陸渾縣北遂改爲汝州又姓左傳晉有汝寬人渚切六|肗魚不鮮|茹乾菜也臭也貪也雜糅也又而恕切|㼋乾菜|𪏮𪏮黏也|𡫽楚人呼寐
aJR舒呂暑熱也舒呂切五|鼠小獸名善爲盜說文曰穴蟲之總名也|黍說文云禾屬而黏也引孔子曰黍可爲酒故从禾入水也|𧑓𧑓蝜|癙癙病
YJR昌與杵世本曰雍父作杵臼昌與切二|處居也止也制也息也留也定也說文又作処亦姓風俗通云漢有北海太守處興
JJR丁呂貯居也積也丁呂切九|𡪄上同（居也積也丁呂切九）|𢁼棺衣|褚裝衣|𤲑說文曰㡒也所載以盛米也|䍆上同（說文曰㡒也所載以盛米也）|著著任又張慮直略二切|詝有所知也|䘢敝衣
QJR私呂諝才智之稱私呂切九|胥上同又思余切（才智之稱私呂切九）|㥠上同（上同又思余切）|稰熟穫|醑簏酒|湑露皃|糈說文云糧也又音所|楈木也|𥚩祭具
KJR丑呂楮木名丑呂切三|柠上同（木名丑呂切三）|褚姓出河南本自殷後宋恭公子石食采於褚其德可師号曰褚師因而命氏也又張呂切
MJR尼呂女禮記曰女者如也如男子之教尼呂切又尼慮切二|籹粔籹
iJd虛呂許許可也與也聽也亦州名本爲許國大嶽之胤周武王伐紂所封漢爲潁川郡周爲許州又姓出高陽汝南本自姜姓炎帝之後大嶽之胤其後因封爲氏虛呂切二|鄦地名也出史記
fJd其呂巨大也亦姓漢有巨武爲荊州刺史其呂切十八|拒拒捍也又格也違也|秬秬黑黍也|距鷄距|𧣒上同（鷄距）|炬火炬|粔新字解訓曰粔籹膏糫|𧇽飛𧇽天上神獸鹿頭龍身說文曰鍾鼓之柎也飾爲猛獸釋名曰橫曰栒縱曰𧇽|虡上同俗作簴（飛𧇽天上神獸鹿頭龍身說文曰鍾鼓之柎也飾爲猛獸釋名曰橫曰栒縱曰𧇽）|鐻上同（上同俗作簴）|鉅澤名又大也|苣苣蕂胡麻|駏駏驉|𦼫苦𦼫江東呼爲苦蕒|𦊐罟也|詎豈也又音遽|歫書傳云至也|䶙齗腫
VJR疎舉所說文云伐木聲也詩曰伐木所所又處所也詩曰獻于公所亦姓漢有諫議大夫所忠疎舉切七|𠩄俗（說文云伐木聲也詩曰伐木所所又處所也詩曰獻于公所亦姓漢有諫議大夫所忠疎舉切七）|糈祭神米也|齭齒傷醋也說文音楚|疋記也又山於切|盨說文曰㯯盨負戴器也|䝪齎財問卜
TJR創舉楚萇楚亦荊楚又州本漢射陽縣地春秋時屬吳秦屬九江郡晉爲山陽縣武德初改爲楚州又姓左傳趙襄子家臣楚隆創舉切八|礎柱下石也|齭齒傷醋也|齼上同（齒傷醋也）|𪓐說文曰會五綵鮮皃引詩云衣裳𪓐𪓐|䙘埤蒼云鮮也一曰美好皃|憷痛也出音譜|濋水名
SJR側呂阻隔也憂也側呂切二|俎俎豆
UJR牀呂齟齟齬牀呂切二|鉏鉏鋙不相當也
PJR慈呂咀咀嚼慈呂切六|沮止也又七余子預二切|怚憍也又子據切|袓㜺也說文曰事好也又子邪切|跙行不進皃|𧽟邪出前也又前結切
hJd於許𢮁擊也於許切二|𩩘肩骨
dJd居許舉擎也又立也言也動也說文本作擧又姓出姓苑居許切十|莒草名亦國名又姓嬴姓之後漢有緱氏令莒誦|櫸木名|筥筐筥|𥴧飤牛筐|𧺹行皃|弆藏也|柜柜柳|䢹亭名在長沙郡|𠢈共舉皃
RJR徐呂敘次弟爾雅曰敘緒也又姓徐呂切十一|緒基緒說文曰絲耑也亦姓|藇姓也已上三字並出何氏姓苑|序庠序又爾雅曰東西牆謂之序|漵水浦也|抒渫水俗作汿又神呂切|嶼海中洲也|鱮魚名|𨣦酒之美也本亦作藇詩云釃酒有藇|𥎗矛也|𡱣履屬
eJd羌舉去除也說文从大口也羌舉切又丘據切五|麮麥粥汁|弆藏也又音莒|𧉧𧉧蚥|𥿇繼入也又音疎
bJR神與紓緩也神與切又音舒三|抒左傳云難必抒矣抒除也又音序|杼橡也
ZJR承與野田野承與切又與者切二|墅田廬
OJR七與𤿚皴𤿚皮裂七與切一
NJR子與苴履中草子與切又子余切三|咀㕮咀漬藥也又慈呂切㕮音甫|䃊𥒰䃊場外名也
#麌
gKt虞矩麌牡鹿又麌麌羣聚皃虞矩切三|俁俁俁容皃大也詩曰碩人俁俁|噳噳噳笑皃
kKt王矩羽舒也聚也亦鳥長毛也又官名羽林監應劭漢官儀曰羽林者言其爲國羽翼如林盛也皆冠鶡冠亦姓左傳鄭大夫羽頡又虜姓後魏書羽弗氏後改爲羽氏又音芋王矩切十五|禹舒也字林云蟲名又姓夏禹之後王僧孺百家譜云蘭陵蕭道遊娶禹氏女|雨元命包曰陰陽和爲雨大戴禮云天地之氣和則雨說文云水从雲下也一象天冂象雲水霝其閒也|宇宇宙也又大也說文曰屋邊也易曰上棟下宇亦姓出何氏姓苑又虜複姓宇文氏出自炎帝其後以有甞草之功鮮卑呼草爲俟汾遂号爲俟汾氏後世通稱宇文蓋音訛也代爲鮮卑單于|㝢上同（宇宙也又大也說文曰屋邊也易曰上棟下宇亦姓出何氏姓苑又虜複姓宇文氏出自炎帝其後以有甞草之功鮮卑呼草爲俟汾遂号爲俟汾氏後世通稱宇文蓋音訛也代爲鮮卑單于）|瑀石似玉也|祤祋祤縣名在馮翊又況羽切|栩栩陽地名又況羽切|鄅鄅子國在琅耶其後以國爲姓|頨孔子頭反頨也說文云頭妍也又讀若翩|楀木名又矩|萭說文艸也|䣁亭名在南陽|聥張耳有所聞又音矩|䨞雨皃
PKh慈庾聚眾也共也斂也說文會也邑落云聚慈庾切二|鄹亭名在新豐
AKN方矩甫始也大也我也眾也說文曰男子之美稱也字从父用又姓風俗通云甫侯之後方矩切十九|脯乾脯東方朔云乾肉爲脯禮記曰牛脩鹿脯田豕脯|斧斧鉞周書曰神農作陶冶斤斧|頫說文低頭也太史公書頫仰字如此|俯上同漢書又作俛今音免（說文低頭也太史公書頫仰字如此）|府官府說文曰府文書藏也風俗通曰府聚也公卿牧守道德之所聚也又舍也亦姓風俗通云漢有司徒掾府悝|腑藏腑本作府俗加月|簠簠簋又音膚|黼白黑文也爾雅曰斧謂之黼謂畫斧形因名云|蜅小蟹|莆萐莆堯之瑞草|𧉊爾雅曰蠸輿父守瓜郭璞云今瓜中黃甲小蟲喜食瓜葉故曰守瓜字或从虫|俌俌輔也出埤蒼|㕮㕮咀|父尼父尚父皆男子之美稱又漢複姓三氏孔子弟子有罕父黑漢有臨淄主父偃左傳宋有皇父充石宋之公族也漢初有皇父鸞自魯徙居茂陵改父爲甫後漢安定太守儁始居安定朝那代爲西州著姓又徙居京兆又音釜|𥒰𥒰䃊|蚥蜛蚥螳蜋別名|鯆大魚|郙亭名也在上蔡
DKN文甫武止戈爲武又迹也曲禮曰堂上接武又州名本自白馬玄氏地魏文徙武都郡於美陽今好畤縣界武都古城是也後魏平仇池山築城置武都鎮即今州是也亦姓風俗通云宋武功之後漢有武臣又漢複姓六氏漢有乘黃令武安恭出自武安君白起之後風俗通云漢武強侯王梁其後因封爲氏世本云夏時有武羅國其後氏焉何氏姓苑有廣武氏出自陳餘之後又武成氏武仲氏又虜複姓西秦錄有武都氏文甫切二十四|舞歌舞左傳曰舞所以節八音而行八風也周禮曰樂師掌國學之政以教國子小舞也山海經曰帝後俊八子始爲舞又姓出何氏姓苑|儛上同（歌舞左傳曰舞所以節八音而行八風也周禮曰樂師掌國學之政以教國子小舞也山海經曰帝後俊八子始爲舞又姓出何氏姓苑）|嫵嫵媚|侮侮慢也侵也輕也|𦌬牕中網也|憮憮然失意皃說文愛也一曰不動也|㒇上同（憮然失意皃說文愛也一曰不動也）|珷珷玞石次玉|碔上同（珷玞石次玉）|廡堂下也|𢋑籀文（堂下也）|甒甖甒|潕水名在南陽|鵡鸚鵡鳥名能言|䳇上同（鸚鵡鳥名能言）|𢜮愛也說文撫也|膴土地腴美膴膴然也|瞴微視之皃|娬好也|敄彊也|䒉長艇船也|䍙雉網|𣞤蕃滋生長說文豐也隷省作無今借爲有無字
CKN扶雨父說文曰父矩也家長率教者扶雨切十五|輔毗輔又助也弼也亦姓左傳晉大夫輔躒又智果以智伯必亡其宗改爲輔氏|䩉頰骨|𩒺上同（頰骨）|腐朽也敗也說文爛也|𩾿𩾿鳼越鳥|滏水名在鄴山海經云神箘之山釜水出焉|䭸牡馬|㕮㕮咀嚼也又音甫|蚥蟾蜍別名|㾈病腫也說文俛病也|秿禾穳積也|鬴說文鍑屬又覆鬴九河之一名|釜上同古史考云黃帝始造釜（說文鍑屬又覆鬴九河之一名）|䪔尻衣
BKN芳武撫安存也又持也循也芳武切十三|𢻬上同（安存也又持也循也芳武切十三）|弣弓把中也|𠛺上同說文又方九切刀握也（弓把中也）|拊拍也說文揗也|殕食上生白毛|䋨䋨綿|俌輔也又音甫|剖判也又普厚切|䌗絲|䯽說文云髮皃又步侯切|𦵿𦵿草|䞤健也亦作𠹪
LKh直主柱廣雅曰楹謂之柱又姓出何氏姓苑直主切三|跓停足|嵀天嵀案爾雅曰霍山爲南嶽郭璞云即天柱山字俗從山
iKt況羽詡和也普也遍也大也禮云詡謂敏而有勇況羽切十二|𦀒殷冠名|冔上同（殷冠名）|姁呂氏春秋云姁姁然相樂也又漢高后字娥姁說文嫗也|栩柞木名說文云杼也其實皁一曰樣樣音象|珝玉名|欨說文吹也一曰笑意本火于切|祤祋祤縣在馮翊|咻噢咻病聲|喣呈示|䧁鄉名在安邑|煦溫也又香句切
ZKh臣庾豎立也又童僕之未冠者又姓左傳鄭有大夫豎拊臣庾切四|竪俗（立也又童僕之未冠者又姓左傳鄭有大夫豎拊臣庾切四）|樹扶樹|裋敝布襦也
lKh以主庾倉庾又姓出潁川新野二望本自堯時爲掌庾大夫因氏焉以主切十二|窳器中空亦病也|𥦠上同（器中空亦病也）|抌刺也|㥚懼也|𦺮百𦺮草|愈差也賢也勝也|瘉病也說文曰病瘳也|㼌微弱本不勝末|貐獸名龍首食人說文曰䝟貐似貙虎爪食人迅走也|楰鼠梓似山楸而黑也|斞說文量也
XKh之庾主掌也領也典也守也君也說文曰鐙中火主又姓出姓苑之庾切五|麈鹿屬華陽國志曰郪縣宜君山出麈尾|枓斟水器也|宔說文曰宗廟宔祏或作砫|炷燈炷又音注
hKt於武傴不伸也尪也荀卿子曰周公傴背於武切三|噢噢咻病聲|迂曲迴皃
eKt驅雨齲齒病後漢梁冀妻能爲愁眉帝䊋齲齒笑折𦝫步驅雨切三|踽䠑踽又獨行皃|竘巧也又音口
JKh知庾拄拄從旁指知庾切四|柱柱夫草一名搖車也|丶說文曰有所絕止而識之也|𪐴𪐴點義與上同（說文曰有所絕止而識之也）
cKh而主乳柔也而主切三|擩擩取物也|醹厚酒
fKt其矩窶貧無禮也其矩切二|貗爾雅云貒子貗
VKh所矩數說文計也所矩切又所句所角二切二|籔簍籔四足几也
dKt俱雨矩法也常也俱雨切十一|榘上同說文又其呂切（法也常也俱雨切十一）|踽獨行又驅雨切|枸木名出蜀子可食江南謂之木蜜其木近酒能薄酒味也|萭姓漢有萭章又音禹|聥張耳有所聞|䅓曲枝果也|𦐛曲羽又求俱切|楀楀氏木名又音禹|蒟蒟醬出蜀其葉似桑實似椹又音句|椇枳椇
OKh七庾取收也受也七庾切一
IKh力主縷絲縷力主切十三|𨻻𨏩𨻻縣名在交阯|僂僂傴疾也|褸襤褸衣敝說文衽也|簍小筐|嶁岣嶁衡山別名|謱覼謱委曲|慺姓出纂文|漊說文曰雨漊漊也一曰汝南人謂㱃酒習之不醉爲漊|𪈜𪇖𪈜鳥今云郭公也|㜢女人惡稱|𦭯小蒿草|蔞草可亨魚又力俱切
QKh相庾𦄼絆前兩足相庾切二|䅡草名
UKh鶵禹䝒小母豬也鶵禹切二|𧱛上同（小母豬也鶵禹切二）
#姥
DLB莫補姥老母或作姆女師也亦天姥山也又姓出何承天纂文莫補切六|莽宿草又音蟒|䥈鈷䥈又音蟒|媽母也|峔慈母山名在丹陽亦作姥俗從山|𢜮愛也又音武
FLB他魯土釋名曰土吐也吐萬物也文字指歸無點他魯切四|吐口吐亦虜複姓三氏後魏書有吐奚吐難吐萬氏又虜三字姓三二氏慕容廆庶長兄吐谷渾後將所部居西零以西甘松之南極乎白蘭數千里其孫葉延曰禮云孫子得以王父字爲氏遂以吐谷渾爲氏又後魏書吐伏盧氏|稌稌稻|芏草名似莞生海邊可爲席
GLB徒古杜甘棠子似棃又塞也澀也又杜仲藥名亦姓本自帝堯劉累之後出京兆濮陽襄陽三望漢有御史大夫杜周以南陽豪族徙茂陵始居京兆徒古切九|靯韝靫別名一云靯𩍿|𤬪瓶也|𡍨填也|𢾅塞也閉也|肚腹肚又當古切|𥀁桑皮|荰杜衡香草似葵山海經云可以治癭帶之令人便馬馬亦善走根葉都而氣小異字俗從廾|土土田地主也本音吐
ILB郎古魯鈍也又國名伯禽之後以國爲姓出扶風又羌複姓有魯步氏郎古切十七|櫓城上守禦望樓釋名曰櫓露也露上無覆屋也說文云大盾也|滷鹹滷|虜虜掠又獲也服也|擄虜掠或從手|㢚庵舍|𢲸搖動|樐彭排|艣所以進船|鐪釜屬|蓾杜衡別名|𧀦上同（杜衡別名）|鹵鹵簿令|㔪匐也|鏀鏀以木爲刀柄|㭔木名可染繒|䲐魚名
OLB采古蔖草死爾雅曰蓾蔖郭璞云作履苴草采古切二|𧆓草履
ELB當古覩見也當古切十一|睹上同（見也當古切十一）|暏詰朝欲明|賭戲賭|堵垣堵又姓左傳鄭有堵叔又音者|肚腹肚又徒古切|帾幡也標記物之處也|㕆美石又音怙|楮木名又音褚|𥀁桑皮又音杜|䁈梁公子名仉䁈
dLB公戶古故也又姓周太王去邠適岐稱古公其後氏焉蜀志有廣漢功曹古牧又漢複姓晏子春秋有齊勇士古冶子又虜三字姓後漢書有古口引氏公戶切二十一|皷說文曰郭也春分之音萬物郭皮甲而出故謂之皷周禮六皷靁皷靈皷路皷鼖皷鼛皷晉皷亦作鼔|鼓說文曰擊皷也|瞽無目|股髀股|𦙶上同（髀股）|罟網罟|蠱疑也又蠱毒也又卦名蠱事也|估市稅|盬鹽池又左傳曰盬其腦杜預云盬𠯗也又詩傳云盬不固也|鈷鈷䥈|羖羖䍽羊說文曰夏羊牡曰羖|𦍩俗（羖䍽羊說文曰夏羊牡曰羖）|詁詁訓|牯牯牛|賈商賈又古下切|夃多貨利也又古乎切|沽屠沽|焸人名出漢書|𠑹壅蔽|𥂩器也說文作䀇
gLB疑古五數也又姓左傳有五奢亦漢複姓四氏漢有五鹿充宗風俗通云氏於職焉三烏五鹿是也趙有將軍五鳩盧國語云楚昭王時有五參蹇姓苑有五里氏疑古切五|午交也又辰名爾雅云太歲在午曰敦牂|旿明也|伍行伍說文曰相參伍也周禮曰五人爲伍|仵偶敵又伍仵皆姓出姓苑
CLB裴古簿簿籍又車駕次第爲鹵簿裴古切二|部部伍又部曲
PLB徂古粗麤也略也徂古切又于胡切五|麆大也|駔駿馬又祖朗切|伹淺也|觕牛角直下
NLB則古祖祖禰又始也法也本也上也又姓祖巳之後出范陽則古切六|珇珪上起又美好|組瑑組綬又綸組東海中草名|蒩茅藉|䔃說文菜也|靻靻勒名
iLB呼古虎獸名說文曰虎山獸之君淮南子曰虎嘯谷風至又姓風俗通曰漢有合浦太守虎旗其先八元伯虎之後呼古切七|琥發兵符有虎文周禮云白琥禮西方|戽戽斗舟中渫水器又音戶|滸水岸|𨛵地名|萀虎豆名俗加艹|䗂蠅虎蟲俗加虫
hLB安古隖村隖亦壁壘說文曰小障也一曰庳城也安古切十|塢上同通俗文曰營居曰塢戴延西征記曰蠡城川南有金門塢（村隖亦壁壘說文曰小障也一曰庳城也安古切十）|鄔縣名又姓晉大夫司馬彌牟之後因以爲氏|瑦石似玉也|䃖小障也出埤蒼|𢄓頭巾|溩水溩|䛩相毀皃|𧽋走輕|䡧車頭中骨
eLB康杜苦麤也勤也患也說文曰大苦苓也康杜切二|𥯶竹名
HLB奴古怒恚也奴古切又奴故切五|弩弓弩古史考曰黃帝作弩|砮石可爲矢鏃又乃胡切|努努力|𧉭水弩蟲俗從虫
jLB侯古戶說文云戶護也半門爲戶侯古切二十三|楛木名堪爲矢榦書云荊州所貢詩疏云東夷之所貢|扈跋扈猶強梁也又有扈國名亦姓風俗通云趙有扈輒又虜三字姓有扈地干氏|怙恃怙|鄠縣名在京兆府本夏之扈國秦爲鄠縣也|帍巾也|祜福也|昈文彩狀又明也|𡻮山卑而大曰𡻮|岵山多草木|芐地黃|雇說文曰九雇農桑候鳥扈民不婬者也春雇鳻鶞夏雇竊玄秋雇竊藍冬雇竊黃棘雇竊丹行雇唶唶宵雇嘖嘖桑雇竊脂老雇鴳也|𩿇上同亦作鳸（說文曰九雇農桑候鳥扈民不婬者也春雇鳻鶞夏雇竊玄秋雇竊藍冬雇竊黃棘雇竊丹行雇唶唶宵雇嘖嘖桑雇竊脂老雇鴳也）|𪄮亦冂|𨛸西京賦云枹杜含鄠|婟婟惜又音互|戽抒也|㕆美石又丁古切|洿洿深皃|𡜂貪也|酤一宿酒又音姑|滬靈龜負書出玄滬水|簄海中取魚竹罔曰簄
BLB滂古普博也大也徧也又姓後魏十姓獻帝次兄爲普氏亦虜複姓周書辛威賜姓普屯氏又虜三字姓周書楊忠賜姓普六如氏後魏書有普陋如氏滂古切五|溥大也廣也|誧文字音義云大也助也|浦風土記云大水有小口別通曰浦說文濱也又姓晉起居注有浦選|烳火行皃
ALB博古補補綴說文曰完衣也博古切三|譜籍錄|圃園圃說文種菜曰圃亦姓又博故切
#薺
PMR徂禮薺甘菜徂禮切五|鮆魚名常以春時出九江|鱭上同（魚名常以春時出九江）|癠病也方言曰生而不長也|啙弱也又子西兹此二切
IMR盧啓禮說文曰履也所以事神致福也釋名曰禮體也得其事體也又姓左傳有衛大夫禮孔盧啓切十六|礼古文（說文曰履也所以事神致福也釋名曰禮體也得其事體也又姓左傳有衛大夫禮孔盧啓切十六）|𥴡竹名|蠡蠡吾縣名在涿郡又彭蠡澤名|𦫈大舟也|澧水名在武陵又水名出衡山亦姓出何氏姓苑|醴醴酒亦醴泉縣屬京兆府本漢谷口縣也屬馮翊至後魏置寧夷縣隋改醴泉因周醴泉宮名也|鱧說文鱯也|鱺上同（說文鱯也）|𩽵說文鮦也|欚江中大船名亦作𦫈|盠簞也|劙刀刺又力移切|豊行禮之器|𣀷布也說文數也又音離|欐小船又力計切
FMR他禮體體身也又生也他禮切八|軆俗（體身也又生也他禮切八）|醍醍酒又音啼|涕目汁|䪆䪆𩋪輭皃|挮去淚|緹纁又音啼|𣈡橫首杖名
BMB匹米䫌傾頭匹米切一
NMR子禮濟定也止也齊也亦濟濟多威儀皃又水名出王屋亦州本齊地秦屬東郡宋於此置碻磝戍後魏於此置濟北郡周武帝置肥城郡武德改爲濟州或作泲又姓出姓苑襄城人也子禮切又音霽五|㧗殺也又側買切|䍤手搦酒又作擠|癠生而不長|𠨍事之制也說文音卿
EMR都禮邸舍也所姓風俗通云漢上郡太守邸杜俗從互餘同都禮切十三|底下也止也作底非也|詆呰也訶也|䏄耳膿|坻隴阪又支氏切|抵擠也擲也|牴角觸|觝上同（角觸）|柢本也根也|弤埤蒼云舜弓名|㪆隱也|堤滯也|軧大車後也
GMR徒禮弟兄弟爾雅曰男子先生爲兄後生爲弟徒禮切又特計切七|娣娣姒|悌愷悌詩作豈弟毛萇云豈樂也弟易也|䑯䑯船|遞更代也又亭繼切|㼵小瓫|媞好人安詳之容皃又啼是二音
HMR奴禮禰祖禰亦姓出平原魏有禰衡亦作𥙄餘同奴禮切十三|嬭楚人呼母又奴蟹切|𩰞智少力劣|苨薺苨|𩋪䪆𩋪輭皃|𦰫𦰫𦰫濃露也亦作泥|瀰水流也|坭地名|𩯨髮皃|薾華茂也|檷絡絲柎也|鑈上同（絡絲柎也）|𩍦轡垂也
QMR先禮洗洗浴又姓先禮切又音銑二|洒上同又所賣切（洗浴又姓先禮切又音銑二）
OMR千禮泚水清也千禮切四|玼玉色|緀帛文皃|皉白色
eMR康禮啓開也發也別也刻也說文教也俗作啓康禮切十二|棨兵欄說文曰傳信也|綮戟支一曰戟衣|卟問卜也又工兮切|䭬首至地也|稽上同又古兮切（首至地也）|晵說文云雨而晝晴也又姓後燕有將軍晵倫或作啓|闙埤蒼與啓亦同|启說文開也|䏿腓腸又口系切|㒅開衣領也|䡔至也礙也
jMR胡禮徯待也胡禮切八|謑恥辱|𥰥所以安重船又音系|𦩶上同（所以安重船又音系）|涀水名在高陵|𧧹說文待也|匸有所藏也|𥉐目動
DMB莫禮米穀實說文作米又胡姓莫禮切七|眯物入目中|䋛繡文如聚米出說文|洣水名在荼陵|蔝蔝子菜|𡬍寐不覺|䱊魚子
CMB傍禮陛階陛也傍禮切八|梐梐枑行馬|髀髀股|䯗上同（髀股）|㙄下也|𦸣𦸣鼠莞見爾雅可爲席又必鼻切|𤙞𤙞𤙞牛馬行|𠈺㒅開腳行也
hMR烏弟𠯋可也尒也烏弟切二|䚷噟聲
gMR研啓堄埤堄女墻研啓切六|㪒㪏㪒擊聲|掜不從也|觬角曲|䘽裗䘽袿衣飾也|晲明也亦作𣅸
AMB補米㪏補米切二|𤽊明白
#蟹
jPR胡買蟹水蟲仙方云投於漆中化爲水服之長生以黑犬血灌之三日燒之諸鼠畢至胡買切七|䲒說文上同（水蟲仙方云投於漆中化爲水服之長生以黑犬血灌之三日燒之諸鼠畢至胡買切七）|解曉也又解廌仁獸似牛一角亦姓自唐叔虞食邑於解今解縣也晉有解狐解楊出鴈門又虜複姓魏書有解批氏又佳買古賣二切|獬字林字樣俱作解廌廣雅作𧳊𧳋陸作獬豸也|澥渤澥|嶰山澗閒又嶰谷名案漢書只作解谷|𨼬小谿
DPB莫蟹買說文市也莫蟹切五|嘪羊聲|蕒吳人呼苦𦼫|㵋水名|鷶鷶𪀗鳥名
ePR苦蟹䒓戾也苦蟹切三|𡢖意難|𦝨瘦皃
LPR宅買廌解廌宅買切三|豸（解廌宅買切三）|𧳋上同（解廌宅買切三）
MPR奴蟹嬭乳也奴蟹切二|㚷上同（乳也奴蟹切二）
CPB薄蟹罷止也休也薄蟹切六|矲矲𥏪短也|猈犬短脛一曰案下狗也|䥯太鐵杖|𢞎疲劣|㔥㔥𠢲惡怒
hPR烏蟹矮短皃烏蟹切三|㢊坐倚皃又作躷|躷上同（坐倚皃又作躷）
APB北買擺擺撥北買切二|捭上同鬼谷子有捭闔篇（擺撥北買切二）
dPR佳買解講也說也脫也散也佳買切三|薢爾雅曰薢茩芵茪|檞松樠
VPR所蟹灑灑水爾雅云大瑟謂之灑長八尺一寸廣一尺八寸二十七弦所蟹切又所綺切三|𩌦履屬|躧颯躧
dPh乖買𠁥𠁥𠁥羊角開皃乖買切又工瓦切三|𡐠𡐠盾屬也說文苦圭切盾握也|枴老人拄杖也
deT丈黠㧳攙㧳㧳物出聲譜丈夥切一
jPh懷𠁥夥多也懷𠁥切又胡果切一
deT花黠扮亂扮也花夥切一
GPR乖蟹dPh乖蟹箉a竹具用之魚笱竹器也求蟹切二|拐b手腳之物枝也
#駭
jQR侯楷駭驚也又九河名一曰徒駭出爾雅孫炎云禹疏九河功眾懼不成故曰徒駭侯楷切四|絯大絲又音該|侅無侅人名又音該|駴駴擊
eQR苦駭楷模也式也法也說文曰木也孔子冢蓋樹之者又姓苦駭切四|𠢲㔥𠢲|𥏪矲𥏪|鍇鐵好
gQR五駭騃癡也五駭切又音俟四|𤶗𤶗疾|娾喜樂|𧡋笑視
hQR於駭挨打也於駭切二|唉飽聲又於來切
#賄
iSh呼罪賄財也又贈送也呼罪切七|𧶅上同（財也又贈送也呼罪切七）|䏨𦞙䏨大腫皃𦞙都罪切|燘熟皃又亡罪切|悔悔吝|蛕土蛕毒蟲|㷄南人呼火也
hSh烏賄猥犬聲又鄙也烏賄切十|腲腲脮肥皃|嵔嵔𡾋|鍡鍡鑘不平|㛱㛱娞好皃|碨碨磊石皃|𥓔上同（碨磊石皃）|㱬㱬𣨙不知人也|㞇㞇㞂行病|𨝀𨝀郲不平
ISh落猥磥眾石皃落猥切十六|磊上同（眾石皃落猥切十六）|癗痱癗皮外小起|𡾋𡾋峞山狀|礧礧硌大石|䣂䣂陽縣名在桂陽|鑘鍡鑘|㵽水名在右北平|郲𨝀郲不平|𡼊𡼊㠑山狀又力水切|蕾蓓蓓蕾花綻皃|儡傀儡戲|𨻾𨻾𡑈果實垂又力追切|𦢏𦢏𦞙腫皃|頛頭不正皃|櫑櫑劒古木劒也
GSh徒猥錞矛戟下銅鐏或作鐓徒猥切又徒對切五|瀢瀢沱水汎沙動皃|陮陮隗不平狀|𨯝鍊𨯝車轄|𦶏草名
PSh徂賄辠文字音義云辠從自辛也言辠人蹙鼻辛苦之憂始皇以辠字似皇乃改爲罪也徂賄切三|罪上同（文字音義云辠從自辛也言辠人蹙鼻辛苦之憂始皇以辠字似皇乃改爲罪也徂賄切三）|㠑𡼊㠑山皃
DSB武罪浼水流平皃武罪切六|潣上同（水流平皃武罪切六）|每雖也辝也頻也說文作𡴋艸盛上出也|挴貪也|燘燘爛也又呼猥切|䜸豆碎萁也
FSh吐猥骽骽股也吐猥切八|腿俗（骽股也吐猥切八）|聉聉顡癡瘨皃說文五滑切無知意也顡音隗|僓長好皃|脮腲脮|㟎㟎㠑山高皃|㱣㱬㱣|㞂㞇㞂行病
jSh胡罪瘣木病無枝胡罪切九|溾溾浽穢濁也|㱱㱱㱣|䜋列也玉篇云譯也說文胡對切中止也|匯回也|廆晉有大單于遼東郡公慕容廆|䕇爾雅云䕇懷羊又音瑰|輠車轉之皃|𨝀𨝀郲不平
eSh口猥䫥大頭說文曰頭不正也口猥切五|㚍㚍㚍多皃|傀俗作傀儡子也|顝首大骨又口兀切|磈磈礧石也
ESh都罪𦞙𦢏𦞙亦作䏨都罪切五|䇏木實垂皃|𡑈𨻾𡑈重皃|頧頭不正皃|謉謉諢謔言出聲譜
HSh奴罪餧飢也一曰魚敗曰餧奴罪切八|餒上同（飢也一曰魚敗曰餧奴罪切八）|浽溾浽|娞㛱娞|𩗔風動皃|鮾魚敗|脮上同（魚敗）|㼏傷瓜
ESh陟賄𩬳陟賄切假髮髻也一
gSh五罪頠頭也一曰閑習五罪切又五毀切七|顡聉顡說文音聵癡顡不聰明也|隗陮隗高也亦姓出天水後漢有隗嚻|峞峞𡾋山皃|嵬山皃又玉回切|䫥頭不正也又口猥切|䃬眾石皃
OSh七罪皠霜雪白狀七罪切八|𣿒新水狀也|𣿓上同（新水狀也）|漼水深皃|璀玉名|𥼺物粗也|䊫赤米|鏙鏙錯鱗甲皃
CSB蒲罪琲珠五百枚蒲罪切三|痱痱癗|𢳁𢳁起令虛
NSh子罪嶊山林崇積皃子罪切二|洅說文云雷震洅洅本作代切
kUt于罪倄痛而叫也于罪切一
#海
iTR呼改海說文曰天池也以納百川者亦州禹項徐州之域七國時屬楚秦爲薛郡漢爲東海郡後魏爲海州亦姓呼改切二三|醢肉醬亦作醯|橀榽橀木名似檀齊人諺云上山斫檀榽橀先殫
eTR苦亥愷樂也康也左氏傳云八愷苦亥切九|凱上同（樂也康也左氏傳云八愷苦亥切九）|颽南風亦作凱|塏爽塏高地爽明塏燥也|暟美|鎧甲之別名|闓開也亦音開|䐩肉美|輆輆軩不平
NTR作亥宰冢宰又制也亦姓孔子弟子宰予作亥切四|縡載也|䏁半聾字林云秦晉聽而不聰聞而不達曰䏁|載年也出方言又音再
GTR徒亥駘疲也鈍也駘蕩春色皃亦宮名徒亥切又音臺十一|殆危也近也|待待擬也俟也|怠懈怠|迨及也|𨽿上同（及也）|紿欺言詐見又絲勞也|䈚竹筍|詒相欺|軩輆軩不平|𠷂言不止
HTR奴亥乃語辭也汝也奴亥切三|迺古文（語辭也汝也奴亥切三）|鼐鼎大者曰鼐又奴代切
dTR古亥改更也又姓秦有大夫改產古亥切三|頦頰頦又戶垓切|絠解繩說文云彈彄也
jTR胡改亥辰名爾雅云太歲在亥曰大淵獻亦姓孟子有亥唐胡改切四|侅奇侅非常|㧡動也|𥩲豎𥩲神人
BSB匹愷啡出唾聲匹愷切一
OTR倉宰采事也又取也亦姓風俗通云漢有度遼將軍采晧倉宰切七|採取也俗（事也又取也亦姓風俗通云漢有度遼將軍采晧倉宰切七）|綵綾綵|寀寮寀官也|彩光彩|䰂髮䰂又七代切|㥒恨也
YUR昌紿茝香草也昌紿切一
ETR多改等齊也多改切又多肯切一
DSB莫亥䆀禾傷雨也莫亥切又莫代切二|挴貪
PTR昨宰在居也存也昨宰切一
BSB普乃俖不肯也普乃切二|朏說文云月未盛之明又音斐
hTR於改欸相然譍也於改切四|㕈藏也|毐嫪毐秦人名又音哀|挨擊也
lUR夷在佁癡也夷在切一
FTR他亥㘆㘆𠷂言不止他亥切一
HTR如亥疓病也見尸子如亥切一
ITR來改𨦂連絲釣曰𨦂出字苑來改切二|唻囉唻歌聲又力諧切
lUR與改䑂肥也與改切二|𦚪上同（肥也與改切二）
CSB薄亥倍子本等也薄亥切三|菩說文曰草也|蓓黃蓓草也
#軫
XVR章忍軫動也車後橫木也又姓今吳縣有之俗從尒餘同章忍切二十三|縝結也單也又丑珍切|胗𤻘胗皮外小起說文曰脣瘍也又音緊|疹籀文（𤻘胗皮外小起說文曰脣瘍也又音緊）|畛田閒道又音真|賑隱賑說文富也又之刃切|㐱說文曰稠髮也引詩曰㐱髮如雲亦作鬒|鬒上同（說文曰稠髮也引詩曰㐱髮如雲亦作鬒）|槙木密又丁堅切|紾單衣或作縝|縝上同（單衣或作縝）|𦕑告也|診候脈又視也驗也|袗說文云玄服也亦作裖|裖上同（說文云玄服也亦作裖）|敐𨌈𨌈敐敐喜悅皃𨌈音田|眕目有所恨而止又厚重也|䪾顏色䪾䫰慎事也|黰黑皃|駗馬色也|𣞟纑也|稹緻也又聚物|𠘱新生羽而飛也
KVR丑忍辴大笑丑忍切一
ZVR時忍腎五藏之一也時忍切六|蜃大蛤說文曰雉入水所化又時刃切|祳祭餘肉說文云社肉盛之以蜃故謂之裖天子所以親遺同姓|脤上同（祭餘肉說文云社肉盛之以蜃故謂之裖天子所以親遺同姓）|㰮指而笑也|鋠玉篇云圓鐵
cVR而軫忍強也有所含忍而軫切三|荵說文曰荵冬草也爾雅曰蒡隱荵郭璞云似蘇有毛|涊水名在上黨
aVR式忍矤說文曰況也詞也从矢取詞之所之如矢也式忍切六|矧（說文曰況也詞也从矢取詞之所之如矢也式忍切六）|訠並上同（說文曰況也詞也从矢取詞之所之如矢也式忍切六）|哂笑也|弞笑不壞顏|頣舉眉視人
IVR良忍嶙嶾嶙山高皃良忍切五|僯慙恥|𩕔少髮皃|橉門限也又牛車絕橉又力進切|撛扶也
LVR直引紖牛紖直引切四|䏖杖痕腫處說文音酳瘢也一曰遽也|䀕瞋怒目皃|眹目童子也又吉凶形兆謂之兆眹
dVV居忍緊紉急也居忍切四|胗脣瘍也又之忍切|𦜌（脣瘍也又之忍切）|𤷌並俗（脣瘍也又之忍切）
PVR慈忍盡竭也終也慈忍切又即忍切二|濜濜溳水流急皃
NVR即忍㯸埤蒼云盂也即忍切二|盡曲禮曰虛坐盡前虛坐盡後虛坐盡前又慈忍切
CVF毗忍牝牝牡毗忍切又扶履切四|髕去膝蓋骨刑名|臏上同（去膝蓋骨刑名）|猵獺屬又音邊
gVZ宜引釿齊也說文曰劑斷也宜引切五|磭大脣|𪙤齒齊|齗犬爭皃|听口大皃
kVp于忍笉笑皃七忍切一
fVp渠殞窘急迫也渠殞切十|僒上同（急迫也渠殞切十）|莙牛藻也|㖥吐皃|㻒玉名|箘竹名|菌地菌又姓出姓苑|䐃腸中脂也|蔨爾雅曰蔨鹿𧆑郭璞云今鹿豆也葉似大豆根黃而香蔓延生|蜠爾雅曰貝大而險者曰蜠又音囷
lVR余忍引爾雅曰長也說文曰開弓也余忍切又餘刃切十四|𢎢上同玉篇云挽弓也（爾雅曰長也說文曰開弓也余忍切又餘刃切十四）|蚓蚯蚓又余刃切|螾螾衍蚰蜒又餘刃切說文上同（蚯蚓又余刃切）|弞笑不壞顏|𠻤大笑又音衍|𢯼申布也又布也|䏖當脊肉也|濥水門又引水也說文曰水脈行地中濥濥也|廴長行之皃|戭長槍也又弋淺切|縯齊武王名|鈏爾雅曰錫謂之鈏|靷說文曰引軸也又餘刃切
DVJ眉殞愍悲也憐也眉殞切十四|慜聰也|憫憫默亦憂也|閔傷也病也又姓孔子弟子閔損|敏疾也敬也聰也達也|敃說文強也|𢽹上同（說文強也）|潣水流浼浼皃|簢竹名可以爲席爾雅曰簢筡中言其中空筡音塗或作𥴲|𥴲上同（竹名可以爲席爾雅曰簢筡中言其中空筡音塗或作𥴲）|𤛎獸如牛也|𦌡細罔|𨏵車𨋩兔下革也|鰵海魚
DVF武盡泯水皃亦滅也盡也武盡切又彌鄰切十|𤿕細理|僶僶俛|笢竹膚|黽黽池縣在河南府俗作黾又音緬|澠上同又音繩（黽池縣在河南府俗作黾又音緬）|䟨蹄甲|刡刡削|𨌲車𨋩兔下軶也|脗脗合
kVp于敏殞歿也于敏切七|溳濜溳波相次也|磒石落|隕墜也落也|霣說文雨也齊人謂靁爲霣一曰雲轉起也|愪憂也|荺爾雅云荺茭蔈葦根可食者曰茭茭胡狡切
#準
XVh之尹準均也平也度也又樂器名狀如瑟長丈而十三弦隱九尺以應黃鐘之律之尹切又音拙四|准俗（均也平也度也又樂器名狀如瑟長丈而十三弦隱九尺以應黃鐘之律之尹切又音拙四）|埻射的周禮或作準|純緣也又音淳
lVh余準尹正也誠也進也說文治也又姓出天水河閒周有尹吉甫又漢複姓齊定王時有尹文子著書又漢書百官表曰內史周官秦因之掌治京師武帝更名曰京兆尹應劭曰河南尹所以治周地秦兼天下置三川守河洛伊地漢更名河南太守也世祖徙都雒陽改爲尹余準切八|䪳面斜|允信也|狁獫狁|馻馬毛逆|玧充耳王|𡴞進也|𧉃蟲名
QVh思尹筍竹萌思尹切九|笋俗（竹萌思尹切九）|𠣬驚詞|鵻說文曰祝鳩也|隼鷙鳥也說文同上（說文曰祝鳩也）|箰箰箻以捕鳥|簨簨虡釋名曰所以懸鐘鼓者橫曰簨簨峻也在上高峻也縱曰虡虡舉也在旁舉簨也|𥯗上同（簨虡釋名曰所以懸鐘鼓者橫曰簨簨峻也在上高峻也縱曰虡虡舉也在旁舉簨也）|𣕍亦同又作栒（簨虡釋名曰所以懸鐘鼓者橫曰簨簨峻也在上高峻也縱曰虡虡舉也在旁舉簨也）
cgh而兖蝡淮南子曰蠉飛蝡動或作蠕而允切又而兗切一
YVh尺尹蠢出也爾雅云作也動也蠢不愻也尺尹切九|𢧨古文（出也爾雅云作也動也蠢不愻也尺尹切九）|䐏肥也|踳踳駮相乖舛也|惷惷惷擾動皃|𦚧漢𦚧䏰縣名在巴東郡地下濕多𦚧䏰蟲䏰音閏|偆厚也富也又癡準切|僢相背|𢾎亂也
bVh食尹盾于盾也食尹切四|揗摩也|吮吮舐也|楯欄檻
KVh癡準偆厚也富也癡準切一
IVh力準耣束也力準切二|𦓾上同（束也力準切二）
cVh而尹𣯍毛聚而尹切一
eVp丘尹𦃢束縛丘尹切一
eVV弃忍螼蚯蚓也爾雅曰螼蚓蜸蚕弃忍切三|𤿳皮厚皃|𧼒行皃又去刃切
aVh式允賰賱賰富有式允切一
iVZ興腎脪腫起興腎切二|㾙上同（腫起興腎切二）
UWR鉏紖濜濜溳水勢鉏紖切一
JVR珍忍屒重脣黏好說文伏皃一曰屋宇珍忍切一
#吻
DXN武粉吻口吻武粉切七|𦝮上同（口吻武粉切七）|刎刎頸|抆拭也|伆離也又武弗切|勽覆也|𦮶蘠𦮶
AXN方吻粉博物志曰燒鉛成胡粉又曰紂作粉方吻切三|黺黺綵文|扮扮動又握也又房吻切
CXN房吻憤懣也房吻切十四|𢤬上同（懣也房吻切十四）|扮握也|㿎病悶|鼢字林云地中行鼠百勞所化亦作蚡|蚡上同（字林云地中行鼠百勞所化亦作蚡）|墳土膏肥也|魵鰕又音忿|鱝鱝魚圓如盤口在腹下尾上有毒|弅莊子有隱弅之丘也|轒轒䡝車名|膹切熟肉也|𢅯盛穀囊滿而裂也|坌說文曰塵也一曰大防也又步寸切
BXN敷粉忿怒也敷粉切又敷問切二|魵鰕別名
hXt於粉惲謀也議也亦厚重也於粉切十|薀藏也說文曰積也春秋傳曰薀利生孽俗作蘊|蘊俗（藏也說文曰積也春秋傳曰薀利生孽俗作蘊）|韞韞櫝|縕枲麻|褞褞袿|䡝轒䡝車名|賱賱賰富也|醞釀也又於問切|搵沒也
gXt魚吻齳無齒魚吻切五|𪘩上同（無齒魚吻切五）|夽大也|喗大口|𧼐走皃又丘粉切
kXt云粉抎有所失云粉切四|䫟說文曰面色顛䫟皃|𪏚上同（說文曰面色顛䫟皃）|𤸫病也
eXt丘粉𧼐走皃丘粉切二|𦄐左傳云羅無勇𦄐之束縛也
#隱
hYd於謹隱藏也痛也私也安也定也又微也又姓吳志有廷尉左監隱蕃於謹切十一|磤雷聲|𤻘𤻘胗皮外小起|䌥縫衣相著|㥯謹也|櫽說文括也|嶾嶾嶙山皃|𠃊匿也|㶏水名|㐆歸依也又於機切|𨏈車聲
dYd居隱謹絜也慎也居隱切十一|𪏴黏皃|㹏牛馴也|槿木槿櫬也又名蕣一曰朝華一曰日及亦曰王蒸又曰赤堇|堇菜也說文作𡏳黏土也又音芹|𡏳上同（菜也說文作𡏳黏土也又音芹）|漌清也|慬愨也|巹以瓢爲酒器婚禮用之也|𧯷上同（以瓢爲酒器婚禮用之也）|菦菜名
SWR仄謹𧤛角齊多皃仄謹切二|𣓀草木眾齊本又音臻
eYd丘謹赾跛行皃丘謹切一
fYd其謹近迫也幾也其謹切又其靳切二|瘽病也
TWR初謹齔毀齒俗作齔初謹切又初靳切一
gYd牛謹听笑皃牛謹切一
iYd休謹䘆蚯蚓也吳楚呼爲寒䘆休謹切又虛偃切一
#阮
gZt虞遠阮姓出陳留虞遠切三|𡯱小皃|邧秦邑名說文云鄭邑也
kZt雲阮遠遙遠也雲阮切二|𩔃面不正
hZd於幰偃偃仰又息也說文僵也又姓左傳舒庸舒鳩並偃姓於幰切十二|㫃旗旌之旒|䞁物相當也|鶠鳳也|郾縣名|褗衣領|堰壅水也又於建切|匽隱也|鄢鄭楚地名左傳曰晉侯鄭伯戰于鄢陵|鼴鼴鼠似鼠形大如牛好偃河而飲水也|蝘蜩螗別名又爾雅云蝘蜓守宮也|鰋魚名
dZd居偃湕水名居偃切五|𥍹矛|㔓㔓吃語也|揵難也舉也|蹇跛也屯難也亦封名又居免切
fZd其偃寋女字亦姓今蜀人有之其偃切四|楗關楗|鍵上同（關楗）|𠐻倨也
eZd去偃𧥛言言脣急皃去偃切一
gZd語偃𧥜語偃切四|巘山形如甑|𪗛露齒說文作𪗙|屵屵磭又大脣皃磭音綽
iZd虛偃幰蒼頡篇云帛張車上爲幰虛偃切四|攇手約物|䘆寒䘆又休謹切|䜢䜢摶很戾
DZN無遠晚暮也無遠切七|娩婉娩媚也又忙件切|挽引也|輓上同（引也）|㿸皮脫也又無願切|㝃子母相解又音免|脕色肥澤又音曼
AZN府遠反反覆又不順也府遠切六|䡊車耳曰䡊|阪大陂不平|坂上同（大陂不平）|返還也|橎木名
fZt求晚𧯦黃豆求晚切四|圈獸闌又姓後漢末圈稱字幼舉撰陳留風俗傳圈氏本氏於其國又其卷切|菌蕈也又求敏切|卷風俗傳云陳留太守琅邪徐焉改圈姓卷氏字異音同
hZt於阮婉順也美也於阮切二十|菀紫菀藥名又菀茂木也又姓左傳齊大夫菀何忌|苑園苑白虎通云苑囿所以在東方者謂養萬物東方物所生也|踠體屈|蜿蜿蟺蚯蚓也亦作䖤|䖤上同（蜿蟺蚯蚓也亦作䖤）|畹田三十畝王逸云十二畝也|琬珪也|宛宛然說文曰屈艸自覆也又姓左傳有宛春|惌說文同上又周禮注云惌小孔貌（宛然說文曰屈艸自覆也又姓左傳有宛春）|倇歡樂|䩩䩩量物之䩩也|𩌑上同（䩩量物之䩩也）|䘼襪也又安院切|夗臥轉皃|𩎺䩩底履名|晼晼晚|睕乖也又無嫵媚也|𤗍船𤗍木|䛄慰也又於万切
eZt去阮䅚相近皃去阮切六|綣繾綣謹慎|虇蘆筍|裷幭也|䊎粉也|𪐂黏𪐂
iZt況晚暅日氣況晚切又古鄧切七|䁔大目|咺兒啼不止朝鮮云也|烜光明|愃寬心又音宣|𧡩大視|諼詐也
CZN扶晚飯餐飯禮云三飯是扶晚切又扶万切四|軬車軬|笲竹器所以盛棗脩|䪻無髮
#混
jah胡本混混流一曰混沌陰陽未分胡本切十六|鯶魚名|渾渾元又戶昆切|緷大束|焜火光說文煌也|倱倱伅四凶之一春秋作混沌|棍木名|䫟頭面形圓也|睔大目又古悶切|㮯木未破也|䚠角圓皃亦上司|𨡫醨酒相沃|䧰大阜|掍掍同|睴視皃|煇煇煌光又音揮
BaB普本翉飛起又走也普本切一
Oah倉本忖思也倉本切三|𢩭截也|刌細切又割也
AaB布忖本本末又始也下也舊也說文曰木下曰本从木一在其下俗作夲夲自音叨布忖切六|畚草器|𤲙上同（草器）|笨竹裏又蒲本切|㡷戎姓|苯苯䔿草叢生也
Qah蘇本損減也傷也蘇本切四|㾕㾕㾊惡寒|䐣臏屬|𦠆切熟肉更煑也
Nah兹損𠟃𠟃減也兹損切六|撙挫趨禮曰恭敬撙節鄭玄云撙猶趨也|噂噂𠴲|譐上同（噂𠴲）|䔿草叢生皃|僔眾也
hah烏本穩治穀聚亦安穩烏本切三|𡁋𡁋喗小口|㒚㒚隱
Gah徒損囤小廩也徒損切九|𥫱籧也說文篅也|盾趙盾人名|沌混沌|坉上同（混沌）|庉樓牆|遁遁逃又音鈍|遯上同（遁逃又音鈍）|㡒貯也又張倫丈旬二切
Pah才本鱒說文曰赤目魚也才本切一
dah古本𩩌禹父名亦作𩨬尚書本作鯀古本切十二|㯻大束|袞天子服也|緄帶也|鯀說文曰魚也亦作鮌|輥車轂齊等皃|緷爾雅云百羽也|蔉穮蔉壅養苗|惃惃亂|丨上下相通|䃂高聲聲|錕車釭
Fah他袞畽畽㤻行無廉隅他袞切四|𤊯𤊯肉|吨氣相衝也|黗黑狀
eah苦本閫閫門限也苦本切十|壼居也廣也又宮中道|𡈋篆文|稇成熟又縛衣也|裍成就|悃至誠|𩑔禿頭又口沒切|梱樴弋門橛|齫齫齦齒起皃|硱硱碖石落皃
Iah盧本㤻畽㤻行無廉隅盧本切四|惀心思求曉事|睔睔目皃|碖碅碖石落皃
CaB蒲本獖守犬蒲本切四|笨竹裏又晉書有兗州四伯豫章太守史疇以大肥爲笨伯|㮥車弓|体麤皃又劣也
DaB模本懣愁悶也模本切又亡頓莫旱二切一
Hah乃本㶧㶧熱也乃本切一
iah虛本𦃕結也虛本切二|惛惛懣忽疾皃也
#很
jbR胡墾很佷戾也俗作狠胡墾切二|䓳䓳似蓍花青白
ebR康很墾力也耕也治也康很切四|懇懇惻至誠也又信也|齦齧也|豤豕食皃
dbR古很䫀頰後古很切二|詪難語皃
#旱
jcR胡笴旱不雨胡笴切五|𡷛山名在南鄭|皔白皃|䓍草名|䛞大言
EcR多旱亶信也厚也大也多穀也穀也俗作亶多旱切又遮連切八|𤺺病也|嬗媛也|笪持也笞也又都達切|疸黃病又音旦|觛小觶又音但|狚獦狚獸|担笞也
FcR他但坦平也安也明也寬也他但切二|䦔闑也門傍之橛所以止扉
QcR蘇旱散散誕說文作𢽳分離也又作𢿱雜肉也今通作散又姓史記文王四犮散宜生蘇旱切又蘇汗切十一|𢽳（散誕說文作𢽳分離也又作𢿱雜肉也今通作散又姓史記文王四犮散宜生蘇旱切又蘇汗切十一）|𢿱並見上注（散誕說文作𢽳分離也又作𢿱雜肉也今通作散又姓史記文王四犮散宜生蘇旱切又蘇汗切十一）|饊饊飯|糤上同（饊飯）|鏾弩牙緩也|繖繖絲綾今作繖蓋字|䉈䈓䉈桃支竹名|傘傘蓋|𩀼鳥形又思盰切|𢄻𢄻扇
GcR徒旱但語辝又空也徒也徒旱切十一|蜑南方夷|袒袒裼又除鴈切|襢上同又陟扇切（袒裼又除鴈切）|誕大也育也欺也信也|潬水中沙出爲潬今河陽縣南有中潬城|䩥馬帶|繵束𦝫大帶|膻說文云肉膻也|僤疾也本音去聲|觛小觶
PcR藏旱瓚圭瓚秬鬯宗廟之盛禮周禮云祼圭有瓚以肆先王藏旱切三|趲散走又則捍切|禶祭
dcR古旱笴箭笴古旱切又音哿十二|簳上同（箭笴古旱切又音哿十二）|皯面黑又工旦切|䵟上同（面黑又工旦切）|𤿊亦同|稈禾莖|秆上同（禾莖）|仠仠長|𦼮眾草莖也|矸矸擊|衦摩展衣也又音幹|𥾍上同（摩展衣也又音幹）
IcR落旱嬾惰也落旱切五|懶俗（惰也落旱切五）|𥻂上同（惰也落旱切五）|𥽭飯相著也|讕謾讕
ecR空旱侃強直也又侃侃和樂皃空旱切二|衎信言又苦汗切
icR呼旱䍐希也亦鳥網又姓左傳鄭有䍐氏出自穆公以王父字爲氏代爲卿大夫又羌複姓有䍐幵氏說文作䍐或作罕呼旱切七|蔊菜味辛也|厂說文云山石之崖巖|灘水濡而乾說文呼旰他丹二切|暵日乾也又呼旴切|焊火乾也|熯上同又呼旰人善二切（火乾也）
NcR作旱䰖髮皃作旱切一
#緩
jch胡管緩舒也又虜姓緩稽氏後改爲緩氏胡管切十四|澣濯也|浣上同（濯也）|綄候風羽出淮南子又音桓|㬊玉篇云㬊明也又姓晉有西中郎將㬊清|䁔目𦙼說文火晚切大目也|𧡩大視|梡木名又束薪又苦管切|棵斷木|𧶲䝹𧶲小有財也|鰀魚名|嵈山名|晥縣名|䈠𥮩䈠簡也
Ech都管短促也不長也都管切四|𢭃上同（促也不長也都管切四）|斷斷絕俗作𣂾断又徒管切|𢷖轉籰
hch烏管椀器物烏管切三|盌上同（器物烏管切三）|䝹䝹𧶲小有財
Fch吐緩疃說文曰禽獸所踐處也詩曰町疃鹿場毛萇云町疃鹿迹也亦作畽吐緩切四|𤲫上同（說文曰禽獸所踐處也詩曰町疃鹿場毛萇云町疃鹿迹也亦作畽吐緩切四）|瘓痶瘓皃|䠪行速
Qch蘇管算物之數也蘇管切三|匴器也冠箱也|篹籮屬
dch古滿管樂器也主當也又姓出平原周文王子管叔之後古滿切十二|筦上同（樂器也主當也又姓出平原周文王子管叔之後古滿切十二）|脘胃府|輨車轂端鐵|盥洗也又公玩切|琯玉管又姓|痯病也郭璞云賢人失志懷憂病也|悹悹悹憂無告也詩傳云悹悹無所依又音灌|䩪車鞁具也|錧車具|䗆雨下蟲名|䘾袴襱也
Ich盧管卵說文曰凡物無乳者卵生盧管切一
ech苦管款誠也叩也至也重也愛也苦管切八|歀上同（誠也叩也至也重也愛也苦管切八）|欵俗（誠也叩也至也重也愛也苦管切八）|窾空也|䥗䥗縫|梡虞俎名形有足如案|棵斷木也|䲌魚名
Hch乃管煗說文曰溫也乃管切七|㬉上同（說文曰溫也乃管切七）|暖亦同|煖火氣亦上同又音暄（亦同）|餪女嫁三日送食曰餪|渜湯也|稬方言云沛國呼稻也
Nch作管纂集也作管切八|䂎鋋也又子筭切|纘繼也|儹聚也|籫竹器|酇五百家也又五鄉爲酇周禮曰四里爲酇五酇爲鄙又子旰切|繤繤組本亦作纂|𦆈古文（繤組本亦作纂）
CcB蒲旱伴侶也依也蒲旱切三|㚘說文云並行也从兩夫輦字从此|拌弃也又音潘
DcB莫旱滿盈也充也亦姓出山陽風俗通荊蠻有瞞氏音舛變爲滿魏有滿寵莫旱切五|懣煩悶|𢟮古文（煩悶）|𥲈竹器|鏋金精
AcB博管粄屑米餅也博管切五|䉽（屑米餅也博管切五）|䬳並上同（屑米餅也博管切五）|瓪牝瓦也又音板|昄均大也又扶板布綰二切
PKh辝矩鄹字林云亭名在新豐辝纂切一
Gch徒管斷絕也徒管切三|𩏇履後帖也|緞上同（履後帖也）
HcR奴但攤按也奴但切一
BcB普伴坢平坦坢也普伴切二|𧺾走皃
#潸
VdR數板潸淚下皃數板切又音刪一
hdh烏板綰繫也烏板切一
AdB布綰版說文判也布綰切六|板上同（說文判也布綰切六）|蝂蝂蝜蟲|瓪瓪瓦|昄大也又扶板切|鈑鉼金
SdR側板䩆䩆𩈶面皺側板切三|拃拃摸|䎒鷙飛
MdR奴板赧慙而面赤俗作𧹞奴板切四|𩈶䩆𩈶|㫱溫濕|戁悚懼又音蹨
jdR下赧僩武猛皃一曰寬大下赧切又音簡五|憪寬大|𤡥猛也|捍捍摌搖動|橌大木也
jdh戶板睆大目也戶板切七|睅目出皃|𪍺黃蒸子玉篇餅也|鯇魚名又胡本切|䴷䴷子麥麴類|皖明星|莞莞爾而笑
CdB扶板阪破別名扶板切又音返三|昄大也又音板|魬魚名
DdB武板矕視皃武板切二|𦺖草可染子可食
UdR士板𪘪𪘪𪗙齒不正士板切二|䗃蟲名
gdR五板𪗙五板切一
TdR初板㹽齧也初板切一
BdB普板眅目中白皃普板切一
Udh雛鯇撰撰述雛鯇切二|饌盤饌
#產
VeR所簡產生也又大籥似笛三孔而短又姓何氏姓苑云彭城人所簡切十|簅大籥或從竹|摌以手㧡物|㹌畜㹌畜牲|嵼𡾰嵼|汕魚浮水上|滻水名在京兆|㦃全德又音剗|䊲粟䊲|𩥮馬名
jeR胡簡限度也齊也界也胡簡切五|硍石聲|䁂𥇅䁂無畏視也|㹂牛㹂很不從牽|䦘門閾又作𢩆𣐻並俗本只作限
DeB武簡𥇅武簡切一
deR古限簡札也牒也略也釋名曰簡閒也編之扁扁有閒也又姓左氏傳魯大夫簡叔蜀志簡雍傳云本幽州人姓耿後音訛改爲簡古限切七|㶕洗米|僩武猛皃|𧟉帬襵|柬分別也一曰縣名在新寧說文本从束八八分也|暕陰旦日明|揀揀擇
TeR初限剗剗削初限切六|鏟平木器也|丳炙肉丳也|羼說文曰羊相廁也从羴在尸下尸屋也一曰相出前也|㦃全德|䐮皮䐮
UeR士限棧閣也亦姓魏有任城棧潛士限切八|㟞山皃也|嶘上同（山皃也）|轏車名士所乘也|孱孱陵古縣名在武陵又士連切|𠊩書傳云見也說文云具也|輚埤蒼云臥車也亦兵車又儀禮注云載柩車也|虥虎竊毛謂之虥
geR五限眼眼目也五限切一
SeR阻限醆酒濁微清阻限切四|琖玉琖小杯|盞（玉琖小杯）|𧣴並上同（玉琖小杯）
Teh初綰㦃全德初綰切二|䊲䃺粟
eeR起限齦齒聲起限切一
#銑
QfR蘇典銑說文曰金之澤者一曰小鑿一曰鐘兩角謂之銑蘇典切十一|洗姑洗律名|跣跣足|毨書曰鳥獸毛毨傳云毨理也毛更生整理|姺古國名|燹字統云野火也|箲洗帚飯具|筅上同（洗帚飯具）|㭠棗木|𦭶草名|𩶤魚名
FfR他典腆厚也善也忘也至也他典切十五|痶痶瘓病也|圢坦也|淟淟涊熱風|町町疃鹿迹|𤲖上同（町疃鹿迹）|錪小釜|靦面慙|㥏說文曰青徐謂慙曰㥏|琠玉名|蚕爾雅曰螼蚓蜸蚕郭璞云即䖤蟺也江東呼寒蚓|䠄行跡|𨆁行皃|賟賟富|晪玉篇云明也
EfR多殄典主也常也法也經也又姓魏志有典韋多殄切五|蕇葶藶|䫀頰後也又古很切|錪小釜又他典切|𥮏大篋
hfR於殄蝘蝘蜓於殄切五|躽身向前也|𥈔視也|宴安也又烏見切|嬿嬿婉又烏見切
GfR徒典殄絕也俗作𣧠徒典切三|蜓蝘蜓一名守宮博物志云以器養之食以朱沙體盡赤重七斤擣萬杵以點女人體終身不滅婬則點滅故号守宮漢武試之驗也又音廷|跈蹈也
dfR古典繭蠶繭古典切十三|絸古文（蠶繭古典切十三）|蠒俗（蠶繭古典切十三）|𥀹皮起|趼上同（皮起）|𢆞小束|𡘸俗（小束）|垷塗泥又大坂在隴西|筧以竹通水|襺纊著衣也|𢺃拭面|挸上同（拭面）|𢹕古文（拭面）
jfR胡典峴峻嶺胡典切十三|臔肉急|哯小兒歐乳也又不顧而吐|晛日出好皃又乃見切|垷又古典切|蜆爾雅曰蜆縊女郭璞云小黑蟲赤頭喜自經死故曰縊女|俔譬喻又苦甸切|顈顈綴|䵤黑皃|睍小目皃|詪爭語|㦓意難|嫢細𦝫皃
ifR呼典顯明也著也光也覿也又姓風俗通云有顯甫爲周卿呼典切五|韅在背曰韅在胷曰靷在腹曰鞅在足曰絆|蜆小蛤|抮引戾|𣊡眾明也微妙也從日中見絲今作㬎又五合切
DfB彌殄㨠塗也彌殄切四|芇相當也又亡弦切|丏不見也|眄斜視又亡見切
HfR乃殄撚以指撚物乃殄切四|涊淟涊|蹨蹂蹨又而善切|跈蹈也
AfB方典編編綃方典切一曰次第也又卑連切十一|匾匾㔸薄也㔸湯奚切|緶褰裳|𦄒上同（褰裳）|萹萹茿草|𥣰豆名|𥤓上同（豆名）|惼愝惼性狹|碥乘車石也|扁扁署門戶|糄燒稻作米
jfh胡畎泫露光又泫然涕流皃胡畎切十四|鉉鼎耳說文云舉鼎也|琄玉皃|贙獸名似犬多力出西海一曰對爭也到一虎者非也|埍女牢也亦作妶又姑泫切|繯韋昭云繯繫也|䀏說文云目搖也|𥌭目童子又胡涓切|鞙䪎鞙刀鞘也說文曰大車縛軶靼也|䩙上同（䪎鞙刀鞘也說文曰大車縛軶靼也）|䧎坑也|𨊼車𨊼|𩉥上同（車𨊼）|䭴馬一歲也
dfh姑泫𡿨水小流也深尺廣尺曰𡿨姑泫切八|畎上同（水小流也深尺廣尺曰𡿨姑泫切八）|𤰝古文（水小流也深尺廣尺曰𡿨姑泫切八）|詃誘也|埍女牢|罥挂也|羂上同（挂也）|汱爾雅云墜也又伏水也
CfB薄泫辮說文交也薄泫切七|艑吳船|𪉱蜀人呼鹽|扁姓也盧醫扁鵲是也又方典切|㲢㲢㲫毛領|𤻶骨風病也|𩩯骨𩩯生皃
efh苦泫犬狗有懸蹄者曰犬廣雅云殷虞晉獒楚獚韓獹宋㹱並良犬苦泫切一
efR牽繭𥧬不動牽繭切四|豤齧也|䵖穄別名也|蜸蜸蚕蚯蚓
gfR研峴齞開口見齒研峴切一
#獮
QgR息淺獮秋獵曰獮獮殺也息淺切十三|𤣗𤣗|𥙮並上同見說文（𤣗）|鮮少也|尠俗（少也）|尟寡也|癬癬疥|燹字林云逆燒又音銑|𤐨上同（字林云逆燒又音銑）|䉳𥳐䉳今人戶版籍也𥳐音牽上聲|廯屋廩|𧕇𧕇蛇|蘚苔蘚
lgR以淺演廣也亦水長流皃以淺切八|衍達也亦姓字統云水朝宗於海故從水行|縯長也|蔩土瓜|𠻤大笑|戭長槍又檮戭八元名|𧍢螾𧍢蟲|𧊔上同（螾𧍢蟲）
PgR慈演踐蹋踐慈演切七|諓諂也|餞酒食送人又疾箭切|俴淺也|𤷃小痒|𧗸蹈也|㣤跡也
JgR知演展舒也整也審也適也說文作㞡轉也又姓魯孝公之子子展之後知演切十|㞡上同（舒也整也審也適也說文作㞡轉也又姓魯孝公之子子展之後知演切十）|搌束縛又丑善切|皽皮寬|輾輾轉又虜複姓後魏輾遟氏改爲展氏|紾轉繩也又音軫|㠭極巧視之又視戰切|㜊㜊奵好皃|𧎰蟲名|襢襢衣皃
XgR旨善𦗢耳門旨善切十七|𠟉以槌去牛勢|樿木名禮記用之爲杓|𩕊說文曰倨視人也|饘饘粥又音氊|醆杯又側限切|皽皮寬又知善切|燀又昌善切義見下文|䆄束也|䡀裸形無可蔽也|䁴說文曰視而不止|𥊳上同（說文曰視而不止）|橏木瘤|䎒武也又鷙鳥擊勢也|㔊擊也|𨭖上同（擊也）|嫸偏忮
MgR尼展趁踐也亦作蹍尼展切三|𨋚車轢物或作碾|㞋柔弱
OgR七演淺不深也七演切一
YgR昌善闡大也明也開也昌善切九|燀說文曰炊也春秋傳曰燀之以薪又然也又章善切|繟寬綽|䵐黃色|幝車敝詩曰檀車幝幝|𨼒魯邑名|灛汶水爲灛|嘽寬綽名也樂記曰其聲嘽以緩|𦆀偏緩又徐翦切
egV去演遣送也縱也去演切八|繾繾綣不相離皃又黏也|䭤乾麪餅也|𥳐𥳐䉳戶籍|㹂牛很不從引也|𠳋小塊說文作𨺫|𨺫見上注（小塊說文作𨺫）|𩝡黏也
dgZ九輦蹇跛也屯難也又姓秦有蹇叔九輦切十一|謇吃又止言|搴取也|𢷘上同（取也）|𠐻偃𠐻傲也|𢵈𢵈搌醜長皃搌丑輦切|𦂇𦂇縮|𡾰𡾰嵼山屈曲也|藆爾雅釋草云藆藅|𩽜魚名|䙭䙭袴
ZgR常演善良也大也佳也說文作譱吉也又姓呂氏春秋云善卷堯師常演切十一|譱見上注篆文又作善（良也大也佳也說文作譱吉也又姓呂氏春秋云善卷堯師常演切十一）|墠除地曰墠|鱓魚名異苑云死人髮化也|蟺䖤蟺蚯蚓|單單父縣名亦姓出周卿士單襄公之後又丹禪二音|僐說文云作姿也|鄯州名本漢之破羌縣地屬金城郡後魏孝昌二年置鄯州又鄯善西域國也本名樓蘭又音擅|墡白土|磰上同（白土）|𪍶大麥新熟作𪍶𪍦也
NgR即淺翦截也齊也殺也勤也俗作剪即淺切十四|剪俗（截也齊也殺也勤也俗作剪即淺切十四）|揃揃搣|戩福祥也|錢錢銚田器|媊明星又子離切|俴淺也|帴狹也|𦺍王蔧草名|鬋髮垂|𥰸𥰸䉳|𥳟竹名|籛竹名又姓|㨵切也俗
cgR人善蹨踐也續也執也緊也人善切五|橪橪棗木名|戁懼也又音赧|熯乾皃又音漢又音䍐|㒄意脃也又式善切
RgR徐翦𦆀緩也徐翦切一
IgR力展輦人步挽車又姓出何氏姓苑力展切九|𪍦大麥𪍶𪍦|𤑿小然火也|璉瑚璉|鄻地名在周|僆畜雙生子|摙擔運物也|蓮蓮芍縣名在馮翊又音憐|膦膦輭無力
ggZ魚蹇齴齒露魚蹇切七|巘山峯|遃行皃|嵃㟞嵃山形|讞議獄|𤫣玉甑|甗器也周禮曰陶人爲甗甗無底甑也
fgZ其輦件分次也其輦切四|𡾰𡾰嵼又音蹇|鍵管籥|鑳上同（管籥）
CgJ符蹇辯別也理也慧也說文治也符蹇切五|𧦪俗（別也理也慧也說文治也符蹇切五）|辡罪人相訟又方免切|辨別也說文判也又蒲莧切|諞巧佞言也又符沔切
DgF彌兗緬遠也說文曰微絲也彌兗切十|沔漢水別名亦州名春秋鄖國之地戰國時屬楚秦屬南郡武德初平朱粲置沔州|汅俗（漢水別名亦州名春秋鄖國之地戰國時屬楚秦屬南郡武德初平朱粲置沔州）|湎沈湎|愐思也|黽黽池縣名在河南府俗作澠又忘忍切|𩋠靼靻名也|偭背也|勔勉也|𢃮幕出玉篇
AgF方緬褊衣急方緬切二|㦚憂也亦曰急也
Ngh子兗臇𦞦少汁也子兗切三|𤎱上同（𦞦少汁也子兗切三）|𧕣蟲食
Pgh徂兗雋鳥肥也又姓漢有雋不疑徂兗切五|隽俗（鳥肥也又姓漢有雋不疑徂兗切五）|𤺻大痒|吮欶也又徐兗切|𦼱葍𦼱菜名
AgJ方免辡罪人相訟方免切又符蹇切四|䁵蔽目說文曰兒初生蔽目者|覸視皃|鴘埤蒼云鷹鷂二年色又云人姓
lgh以轉兗州名尚書禹貢曰濟河惟兗州武王封周公於曲阜爲魯公秦爲薛郡後魏置南兗州於譙城又置西兗州於定陶城隋改爲魯州武德初平徐圓朗復爲兗州又姓出姓苑以轉切十|渷濟水別名出王屋山|沇上同（濟水別名出王屋山）|𢯻動也|抁上同（動也）|𦳆草名|馻馬逆毛|㕣山澗泥也|𦁙紖𦁙|𩘍小風
Igh力兗臠肉臠說文曰臞也一曰切肉也力兗切四|孌美好|𡡗從也|脟割也
Jgh陟兗轉動也運也陟兗切二|𣓧乘𣓧
dgp居轉卷卷舒說文曰膝曲也居轉切六|菤菤耳苓耳|韏爾雅曰革中辨謂之韏車上所用皮也辨音片|𨹵河東安邑聚名|捲捲衣|埢冢土
fgp渠篆圈說文曰養畜閑也渠篆切又求晚切三|蔨爾雅曰蔨鹿𧆑|𦳆耎也
cgh而兗輭柔也或从需餘同而兗切十七|軟俗（柔也或从需餘同而兗切十七）|蝡蟲動|㮕紅藍又㮕棗也|䓴木耳|碝碝石次玉|瑌上同（碝石次玉）|愞愞弱又奴亂反|腝脚疾|䞂䞂小有財物也|耎說文曰稍前大也|𢘎弱皃|㞋弱也又尼展切|偄敬也亦弱也|㼱柔韋又作𠤦見經典|𤲬城下田也|緛衣縫也
Ygh昌兗舛剝也說文曰對臥也從夂㐄相背夂中几切㐄口瓦切昌兗切四|喘喘息說文曰疾息也|荈茗草名|㪜揣也又初委切
Zgh市兗膞切肉市兗切七|腨腨腸|鄟地名|𡭐說文曰小巵有蓋也|歂口氣引皃|踹腳跟|𦺲草名生處無魚
Lgh持兗篆篆書持兗切七|瑑璧上文也|沌水名在江夏又徒混切|摶周禮百羽爲摶十摶爲緷緷音渾又音鮌|𦁆上同亦作縳（周禮百羽爲摶十摶爲緷緷音渾又音鮌）|䧘道邊埤也|堟耕土卷也
Xgh旨兗剸細割旨兗切九|剬上同（細割旨兗切九）|孨孤露可憐說文曰謹也又莊眷切|鱄魚名美也出洞庭湖|竱等也|膞切肉又市兗切|𨷱開閉門利|𡇰囚刑固出古今音字|𦓝小巵也又之累切
Qgh思兗選擇也思兗切又思絹切又思管切三|𦌔罟也|𥶷竹緣
Ugh士免撰述也定也持也士免切五|僎具也數也持也又子倫切|𩔊具也見也|𩻝魚名|譔專教也又音詮
fgl狂兗蜎爾雅曰蜎蠉郭璞云井中小蛣蟩赤蟲一名孑孒又姓漢藝文志有老子弟子楚人蜎淵著蜎子十三篇狂兗切一
igl香兗蠉香兗切二|𧾣走皃
CgF符善楩木名符善切又父綿切四|㦚急也|諞巧言|扁又辮篇二音
DgJ亡辨免止也黜也脫也去也亦姓左傳衛大夫免餘亡辨切八|娩婉娩媚也又音挽|勉勖也勸也強也|俛俯俛|鮸魚名|㝃生子㝃身|冕冠冕|絻上同又音問（冠冕）
KgR丑善搌搌𢵈丑善切七|𨩪𨩪物令長|𣃘旌旗柱又幢徵二音|蕆備也一曰去貨|𧈪伸行|㢟安步行也又丑延切|䩶驂具又丑井切
BgJ披免鴘埤蒼云鷹鷂二年色披免切一
agR式善㒄說文曰意膬也式善切三|㜣女恣態又奴見切|䁴視面色變也
hgZ於蹇㫃旌旗之皃於蹇切三|䟍走也|嫣長皃
LgR除善邅移行除善切一
UgR士免棧士免切棚也一
#篠
QhR先鳥篠細竹也先鳥切七|筱上同（細竹也先鳥切七）|𩵌魚名|𧩮誘爲善也又小也|謏上同（誘爲善也又小也）|䃤黑砥石也又思六切|㩋打也
dhR古了皎月光詩云月出皎兮古了切十二|璬佩玉|𢅎行縢𢅎脛布也|䥵鐵文又呼了切|㿟白也又匹白切|皦明也皎也又珠玉白皃|恔恔憭慧也|繳纏也又音酌|䰘喪之降殺|晈光明|䘨小袴|儌儌抄
EhR都了鳥說文曰長尾禽總名也象形都了切九|𢁕絹布頭也|㣿垂心|蔦樹上寄生|釕釕鈌帶頭飾出聲譜|扚扚擊|𧜣短衣|䄪禾穗垂皃|𠄏懸皃
IhR盧鳥了慧也訖也盧鳥切十四|蓼辛菜|瞭目睛明也|镽镽𨲭長皃𨲭臣夭切|鄝地名|繚繚繞纏也|憭照察|䑠玉篇云小船也|爒火炙|𢄺拭也|𥗀𥗀𢁕石垂皃|撩抉也又力凋切|𤁸水清又小水也|𧘈袴也
FhR土了朓月行疾出西方土了切三|窱窈窱深遠皃|䠷身長皃
ihR馨皛䥵鐵文馨皛切四|曉曙也明也慧也知也|皢白也|膮豕羹
hhR烏晈杳冥也深也寬也烏晈切十五|窅深目皃|窈窈窱深也靜也|偠偠㒟好皃|騕騕褭神馬日行千里|𩡻上同（騕褭神馬日行千里）|𨱧𨱧䦊長而不勁|葽爾雅云遠志也|㫏旗類|鴢爾雅曰鴢頭鵁郭璞云似鳧腳近尾略不能行又音拗|婹婹㜵細弱|㫐合也|䆞遠也隱也說文冥也|𡧮說文曰戶樞聲也室之東南隅也|苭草長
HhR奴鳥嬲戲相擾奴鳥切九|嫋長弱皃|䦊𨱧䦊|㒟偠㒟|褭騕褭|嬈苛酷也又擾戲弄也又音遶|㜵婹㜵|䃵䃵䂪|𢸣摘也
jhR胡了皛明也胡了切五|㵿水渺㵿皃|芍鳧茈草又市若切|𦯪上同（鳧茈草又市若切）|𠄔修續譜云相誑也玉篇音患
GhR徒了窕美色曰窕詩注云窈窕幽閒也徒了切八|𤕷𤕷牀子|𤱩疁田中穴|誂弄也俗作挑說文曰相呼誘也|掉搖尾又動|嬥嬥嬥往來皃韓詩云嬥歌巴人歌也|挑挑戰亦弄也輕也|䂽磽䂽
ehR苦皎磽山田亦作䂪苦皎切二|䂪上同（山田亦作䂪苦皎切二）
NhR子了湫湫隘子了切又子攸切五|劋截也說文絕也|㭂木忽高也|㡑凶首飾|𧂈似薺菜
#小
QiR私兆小微也私兆切三|𩵖魚名|䒕䒕草遠志也
LiR治小肈始也正也敏也長也治小切十一|肁開也又姓戰國策趙有大夫肁賈|兆十億曰兆說文分也又姓|趙少也久也字林云趍也亦州名春秋屬晉秦屬邯鄲郡後魏以廣阿城置殷州至齊改爲趙州又姓本自伯益孫造父善御幸於周穆王賜以趙城因封爲氏簡襄始大列爲諸侯今出天水南陽金城下邳潁川五望|旐旗旐爾雅曰長尋曰旐郭璞云帛全幅長八尺𥼶名曰龜蛇爲旐旐兆也龜知氣兆之吉凶建之於後察事宜之形兆也|狣犬有力也|䍮羊子|鮡魚名似鮎而大|駣馬四歲|垗葬地|𠧞灼龜坼出文字指歸
XiR之少沼池沼之少切三|菬菬子草|䈃竹緣
hiZ於兆夭屈也於兆切四|殀歿也|芺爾雅曰鉤芺郭璞云大如拇指中空莖頭有臺似薊初生可食|仸仸僑不伸又尪弱皃
KiR丑小巐意氣息皃丑小切一
aiR書沼少不多也書沼切又式照切三|䒚草名|𨙹說文地名
ciR而沼擾亂也順也說文作𢹎煩也而沼切七|𢹎上同（亂也順也說文作𢹎煩也而沼切七）|繞纏繞又姓左傳秦大夫繞朝|遶圍遶|嬈亂也|𤛾牛馴說文作㹛牛柔謹也|𧳨爾雅注云即蒙貴也狀如蜼而小紫黑色可畜之健捕鼠亦作猱又諾高切
CiF符少摽落也又拊心也字統云合此𦭼符少切八|𢹰上同見說文今從票餘同（落也又拊心也字統云合此𦭼符少切八）|鰾魚鰾可作膠|慓急性|顠髮白又孚小切|𩮳上同（髮白又孚小切）|膘脅前又孚小切|𦭼𦭼草又零落也
YiR尺沼𪍑糗也尺沼切五|麨上同（糗也尺沼切五）|弨弓反曲又昌招切|楢赤木名又音猶音酉|眧弄人眧目也
BiF敷沼縹青黃色也敷沼切八|醥清酒|犥牛黃白色|顠髮白|皫鳥變色也|篻實中竹名|瞟埤蒼云一目病|膘脅前又音𦭼
DiF亡沼眇說文曰一目小也亡沼切十|渺渺㵿水皃|訬耰也一曰訬獪|𦳥草細|淼大水|杪梢也木末也|秒禾芒|藐字書藐遠又亡角切|吵雉聲|篎笙管
ZiR市沼紹繼也又姓出何氏姓苑市沼切五|綤古文（繼也又姓出何氏姓苑市沼切五）|佋佋介|袑袴上|䙼玉篇云見也
diZ居夭矯詐也說文曰揉箭箝也又姓左傳晉大夫矯文居夭切十二|鱎白魚別名|䚩角長|敽繫盾也|撟說文曰舉手也一曰撟擅也|嬌女字又居喬切|𥃧目重瞼也|蟜山海經云野人身有獸文說文曰蟲也又姓後漢有蟜慎字彥仲|譑多言|𨝰國名|孂竦身|蹻驕也又其虐切
AiJ陂矯表明也亦牋表釋名云下言於上曰表說文作𧘝上衣也古者衣裘以毛爲表也又姓出姓苑陂矯切四|𧘝上同（明也亦牋表釋名云下言於上曰表說文作𧘝上衣也古者衣裘以毛爲表也又姓出姓苑陂矯切四）|𧞧古文（明也亦牋表釋名云下言於上曰表說文作𧘝上衣也古者衣裘以毛爲表也又姓出姓苑陂矯切四）|䔸草名
AiF方小褾袖端方小切四|𧢄字林云目有所察|標標杪木末|㟽峯頭
CiJ平表藨草名可爲席平表切八|𦳤上同（草名可爲席平表切八）|殍餓死又音孚|莩上同又音孚（餓死又音孚）|𠬪物落皃|㰶歐吐|㹾獪也|𧴎似狐善睡
lGh以水liR以沼鷕a雉鳴也以沼切又羊水切七|溔b浩溔大水皃|舀b說文曰抒臼也|𦥨b（說文曰抒臼也）|抭b並上同（說文曰抒臼也）|𩨴b肩骨|䁘b眇䁘目皃
OiR親小悄悄悄憂皃親小切三|愀容色變也|釥好也又淨
NiR子小剿絕也子小切八|劋上同出說文（絕也子小切八）|勦勞也又音巢|漅水名|𨙹魯地|𤃭𥂖酒|膘又符小切|𢄺拭也
fiZ巨夭𨲭镽𨲭長皃巨夭切一
IiR力小繚繚繞力小切九|燎說文曰放火也左傳曰若火之燎于原|𢻢長皃|璙好皃|憭慧也又音聊|爒爒炙也|僚朋也又音平聲|䩍䩍䩍面白|嫽嫽嫽好皃
BiJ滂表麃蒼頡篇云鳥毛變色本作皫滂表切又經典釋文云徐房表切劉普保切一
hiV於小闄隔也於小切一
#巧
ejR苦絞巧好也能也善也苦絞切又巧僞苦教切二|䲾䲾婦鳥案爾雅注云鷦𪃧桃雀也俗呼爲巧婦字俗從鳥
jjR下巧澩動水聲下巧切說文音學六|㺒事露又奴巧切說文音哮|䕧草根亦竹筍也或作茭又音狡|佼庸人之敏說文交也又古巧切|䀊溫器又公巧切|䉰竹筍
AjB博巧飽食多也博巧切三|𩜿（食多也博巧切三）|𩛁並古文（食多也博巧切三）
MjR奴巧㺒擾亂奴巧切三|撓撓亂又音蒿|獿犬驚說文又奴交切
DjB莫飽卯辰名爾雅曰太歲在卯曰單閼晉書樂志云正月之辰謂之寅寅津也謂物之津塗二月卯卯茂也言陽氣生而孳茂三月辰辰震也謂時物盡震而長四月巳已起也物至此時畢盡而起五月午午長也大也言物皆長大六月未未味也言時物向成有滋味七月申申身也言時物身體皆成就八月酉酉緧也謂時物皆緧縮也九月戌戌滅也謂時物皆衰滅十月亥亥劾也言陰氣劾殺萬物十一月子子孳也謂陽氣至此更孳生十二月丑丑紐也謂終始之際故以結紐爲名也莫飽切七|戼篆文|緢旄也又絲名|泖水名在吳華亭縣|媌好皃又莫交切|昴星名|茆鳧葵說文作𦯄音柳
djR古巧絞縛也又姓出何氏姓苑古巧切十五|狡狂也猾也疾也健也說文曰少狗也匈奴地有狡犬巨口黑身|佼女字|攪手動說文亂也|䕧郭璞云江東呼藕根亦作茭又下巧切|筊竹索也又音爻|𢯴𢯴接物也|鉸鉸刀|𥂔器也|姣妖媚|烄烄交木然也|𤉧上同（烄交木然也）|䀊濁也說文器也又胡巧切|䉰竹筍|㽱腹中急痛俗作㽲
SjR側絞爪說文曰丮也覆手曰爪象形丮音戟側絞切八|㕚古文說文曰手足甲也（說文曰丮也覆手曰爪象形丮音戟側絞切八）|䝖䝖獠|瑵玉名說文曰車蓋玉瑵|笊笊籬|𢁬𢁬頭|抓亂搔搯也|𦬔草也
hjR於絞拗手拉於絞切五|鴢鴢頭鵁似鳧而腳近尾|𢂊靴韈𢂊亦從革|𥄀深目|狕獸名
CjB薄巧鮑鮑魚又姓出東海泰山河南三望本自夏禹之裔因封爲氏薄巧切四|骲骨鏃|𡂟臿地|鞄柔革名
gjR五巧齩齧也五巧切一
UjR士絞䰫黠也士絞切二|㑿㑿㑿長皃出聲譜
TjR初爪煼熬也初爪切七|𩱦（熬也初爪切七）|𤌉（熬也初爪切七）|炒並上同（熬也初爪切七）|謅相弄|𩱈乾也|吵聲也本音眇
JjR張絞䝤夷別名張絞切又盧晧切二|獠上同（夷別名張絞切又盧晧切二）
VjR山巧㪢擊也一云攪也亦作𢾐山巧切一
#晧
jkR胡老晧光也明也日出皃也胡老切十六|昊昊天說文作昦|昦上同（昊天說文作昦）|暤明也旰也曜也亦太暤又姓本出武落鍾離山黑穴中者見蜀錄|鎬鎬京|浩浩汗大水皃又姓漢青州剌史浩賞又漢複姓魯人浩星公治榖梁|顥大也又天邊氣說文曰白皃楚詞曰天白顥顥商山四顥白首人也今或作晧|灝灝溔水勢遠也|鰝大鰕|夰說文放也昦奡字從此本音杲|薃薃侯莎|鄗光武立處邑名|𨛴上同（光武立處邑名）|𧇼土釜亦作㙱|𥢑網綴|滈水名在京兆
CkB薄浩抱持也說文曰引取也薄浩切一
IkR盧晧老耆老亦姓左傳宋有老佐盧晧切十四|䝤西南夷名|獠上同（西南夷名）|轑車軸|橑屋橑簷前木一曰蓋骨一曰欄也說文曰椽也|潦雨水|䕩乾梅|栳栲栳柳器也|𣠼木名|𩔇廣大皃|恅愺恅心亂|𡂕𠹊𡂕無人|䵏黃色|澇水名又力到切
FkR他浩討治也誅也他浩切三|套長也|槄山楸又他刀切
GkR徒晧道理也路也直也眾妙皆道也說文曰所行道也一達謂之道徒晧切七|衟（理也路也直也眾妙皆道也說文曰所行道也一達謂之道徒晧切七）|𡬹並古文（理也路也直也眾妙皆道也說文曰所行道也一達謂之道徒晧切七）|稻秔稻禮記曰凡祭宗廟之禮稻曰嘉蔬又姓何氏姓苑云今晉陵人|駣馬四歲又音兆|䆃禾一莖六穗也出字林|𨱵镺𨱵長皃又奴晧切
HkR奴晧堖頭堖奴晧切九|腦上同或從□餘同（頭堖奴晧切九）|𠜶亦同出同禮|惱懊惱|碯碼碯寶石|𨱵镺𨱵長皃|㺁雌狢|𧳦上同（雌狢）|㛴相㛴亂也說文曰有所恨痛也
QkR蘇老㛮兄㛮蘇老切七|嫂上同（兄㛮蘇老切七）|㛐俗（兄㛮蘇老切七）|燥乾燥|埽埽除|掃上同（埽除）|䕅蔜䕅草
EkR都晧倒仆也都晧切十一|擣擣築|㨶俗（擣築）|島說文曰海中往往有山可依止也又音鳥|禂牲馬祭也|䮻上同（牲馬祭也）|檮說文曰斷木也又音陶|禱請也求福也|㿒病也|壔高土|懤憂也
OkR采老草說文作艸百卉也經典相承作草采老切七|艸篆文隷變作艹|懆憂心|慅上同（憂心）|騲牝馬曰騲|𠹊𠹊𡂕無人|愺愺恅心亂
NkR子晧早晨也子晧切十二|澡澡洗|藻文藻說文同下|薻水草也|𧎮齧人跳蟲抱朴子曰𧎮蝨攻君臥不獲安|蚤上同又古借爲早暮字（齧人跳蟲抱朴子曰𧎮蝨攻君臥不獲安）|䲃魚名似鯉雞足|璪玉名|璅石次玉者|棗果名史記曰楚莊王時有所愛馬啖以脯棗漢書曰安邑千樹棗等千戶侯又姓出潁川文士傳云棗氏本姓棘避難改焉|繰紺色曰繰|繅雜五綵文
PkR昨早皁皁隷又槽屬亦黑繒俗作皂昨早切四|𦯑𦯑斗櫟子|造造作又七到切|艁艁舟以舟爲橋說文云古文造（造作又七到切）
dkR古老暠明白也古老切十一|𣓌木名|杲日出又明白也|稾禾稈又稾本草刱之本|藁俗（禾稈又稾本草刱之本）|夰說文放也|縞素也又音告|槀槀本藥|㚖大白澤也|菒乾草|𥓖女𥓖石似玉
ikR呼晧好善也美也呼晧切又呼号切二|𡚽人姓
DkB武道蓩毒草武道切又地名又亡毒切四|䓮細草叢生|媢夫妬婦也說文音冒|𠔼重覆
AkB博抱寶珍寶又瑞也符也道也禮記曰地不藏其寶又天寶晉灼云天寶雞頭人身又姓出何氏姓苑博抱切十五|珤古文（珍寶又瑞也符也道也禮記曰地不藏其寶又天寶晉灼云天寶雞頭人身又姓出何氏姓苑博抱切十五）|保任也安也守也說文作𠈃養也亦姓呂氏春秋云楚有保申爲文王傅|𡥀古文（任也安也守也說文作𠈃養也亦姓呂氏春秋云楚有保申爲文王傅）|堢堢障小城|堡上同（堢障小城）|褓襁褓|緥說文曰小兒衣|鴇鳥名亦作䳈𪁣䳰|葆草盛皃又羽葆|駂郭璞云今烏驄|䎂彩羽|宲藏也|賲有也|𠤏相次也
hkR烏晧襖袍襖烏晧切十四|镺镺𨱵長也|懊懊惱|䐿藏肉又烏到切|芺苦芺|䴠麋子|媼女老稱|燠甚熱又音郁|夭禮曰不殀夭本又於矯切|㤇㤇正之皃|郩邑名|蝹蟲名如猿常地下食人腦|䯠藏骨|𪁾鳥名
ekR苦浩考校也成也引也亦瑕釁淮南子云夏后氏之璜不能無考是也又姓出何氏姓苑苦浩切十|攷古文（校也成也引也亦瑕釁淮南子云夏后氏之璜不能無考是也又姓出何氏姓苑苦浩切十）|栲木名山樗也|槀木枯也說文作槀|祰禱也說文曰告祭也|洘水乾|燺火乾|丂氣欲舒皃|䯪䯪𩑤大頭|薧乾魚周禮曰辨魚物爲鱻薧注云薧乾也亦作槁又薧里字音蒿
gkR五老𦽀瓜蔓苗頭五老切二|𩑤䯪𩑤大頭
#哿
dlR古我哿嘉也古我切四|舸楚以大船曰舸|笴箭莖也又公旱切|𥰮筍𥰮出南中
OlR千可瑳王色鮮白千可切三|䰈髮好皃也又昨何切|硰硰石地名
ElR丁可嚲垂下皃丁可切五|䯬古文（垂下皃丁可切五）|哆語聲又昌者切下脣垂皃|癉勞也又怒也|䫂醜皃
QlR蘇可縒鮮潔皃也蘇可切又楚宜切三|娑馺娑殿名又蘇哥切|褨衣長皃
GlR徒可爹北方人呼父徒可切九|柁正舟木也俗從㐌餘同|舵上同（正舟木也俗從㐌餘同）|陊下坂皃又落也|袉裾也|拕引也|沱瀢沱沙水往來皃又徒河切|𣵻上同（瀢沱沙水往來皃又徒河切）|詑輕也
glR五可我己稱又姓我子古賢者著書五可切五|騀駊騀馬搖頭皃|𩒰側弁也|㧴差也|硪砐硪山高皃
FlR吐可袉長舒皃吐可切又徒可切一
IlR來可㰁㰁椏樹斜來可切九|𨬅𨬅鈞出異字苑|攞裂也|砢磊砢石皃|㦬㦬𢣗慙也玉篇又作𩉙𩉌|曪色光明出釋典|𣂞相擊也亦斫也|剆上同（相擊也亦斫也）|𠻡𠻡哆脣垂皃
HlR奴可橠𣘨橠木盛皃奴可切六|娜妸娜美皃|㡅宬也|𢄴上同（宬也）|那俗言那事本音儺|袲𧙃袲衣好皃
jlR胡可荷負荷也胡可切又戶哥切二|何上同（負荷也胡可切又戶哥切二）
ilR虛我㰤大笑虛我切五|㗿上同（大笑虛我切五）|㪃擊也|㪋上同（擊也）|𩑸傾頭皃又音訶
elR枯我可許可也又虜複姓三氏周太保王雄賜姓可頻氏梁有河南王可沓振又有可達氏又虜三字姓三氏後魏書可地延氏改爲延氏又并州刺史男可朱渾買奴前燕慕容儁皇后可足渾氏枯我切四|岢岢嵐鎮在嵐州|軻轗軻又音珂|坷坎坷
hlR烏可𨵌𨵌砢欲傾皃烏可切七|椏㰁椏樹斜|𣘨𣘨橠|妸妸娜亦作婀|娿人姓莊子有娿荷甘又音痾|㫊旌旗㫊皃又猗蟻切|𧙃𧙃袲
NlR臧可左左右也亦姓齊之公族有左右公子後因氏焉又漢複姓二氏左傳宋公子目夷爲左師其後爲氏趙有左師觸龍晉先蔑爲左行其後爲氏漢有御史左行恢臧可切三|㝾㝿㝾又子賀切|𠂇戾也說文曰左手也象形
#果
dlh古火果果敢又勝也定也剋也亦木實爾雅曰果不熟爲荒俗作菓古火切十一|菓見上注（果敢又勝也定也剋也亦木實爾雅曰果不熟爲荒俗作菓古火切十一）|猓猓然獸名|輠車脂角又音禍|鐹刈鉤又古臥切|划划刈|裹苞裹又纏也|蜾蜾蠃蟲也|惈蒼頡篇果敢作此惈|䴹餅䴹食|粿淨米
Elh丁果埵土埵丁果切十五|鬌小兒翦髮爲鬌|挆稱量|𦀉冕前垂也|朵木上垂也|朶上同（木上垂也）|綞綞子綾出字林|揣搖也又初委切|鍺車鐧|𨹄小崖|䤪鈌也|𥠄禾垂皃又丁官切|㪜試也又初委切|𩊜履跟緣也|褍衣正幅也
Qlh蘇果鎖鐵鎖也俗作鏁蘇果切十二|瑣青瑣漢舊儀曰黃門令日暮入對青瑣丹墀拜名曰夕郎又瑣小皃|溑水名|葰葰人縣在上黨又蘇瓦切|䈗竹名|䵀說文曰小麥屑之覈|𩹳魚名|𥔭小石|䣔亭名在河南|惢心疑也又醉隨才捶二切|𢱡動也|𧴪貝聲
Glh徒果墮落也徒果切又他果切十四|垛射垛亦作𨹄|𤬾長沙呼甌也|䅜小積|𥬲竹名|𥳔上同（竹名）|𩊜履跟緣也或作𩎫|䤻車轄又犁錧出玉篇|憜嬾憜也說文曰不敬也|惰上同（嬾憜也說文曰不敬也）|嫷美也說文曰南楚人謂好曰嫷又吐臥切|鬌又丁果切|䲊魚子已生又他果弋水二切|嶞山高
Flh他果妥安也他果切九|嫷好也|隋裂肉也又徒果切|䲊魚子已生|㟎山長皃|墮倭墮鬌也又徒果切|橢器之狹長|𨼰山皃|鵎鳥名
DlB亡果麼幺麼細小亡果切三|𣋟𣋟曪日無色|懡懡㦬人慙
Plh徂果坐釋名曰坐挫也骨節挫屈也徂果切二|𡋲古文（釋名曰坐挫也骨節挫屈也徂果切二）
glh五果㛂好皃五果切二|𠂬木節也亦作𠨳
Ilh郎果裸赤體說文曰袒也郎果切九|躶（赤體說文曰袒也郎果切九）|𧝹（赤體說文曰袒也郎果切九）|臝並上同（赤體說文曰袒也郎果切九）|卵又力管切|瘰瘰癧病筋結也|𤼠上同（瘰癧病筋結也）|蓏果蓏說文曰木上曰果地上曰蓏應劭云木實曰果草實曰蓏張晏云有核曰果無核曰蓏|蠃蜾蠃蒲盧郭璞云細𦝫蜂也負螟蛉之子於空木中七日而成其子法言云螟蛉之子殪而逢蜾蠃祝曰類我類我久則肖之
hlh烏果婐婐㛂身弱好皃烏果切三|倭倭墮又烏戈切|𥟿多也
Hlh奴果㛂奴果切二|𢫷𢫷擿
AlB布火跛跛足布火切又彼義切四|簸簸揚又布箇切|駊駊騀馬惡行又音叵|㝿㝿㝾行不正也
BlB普火叵不可也普火切四|駊駊騀|頗又普波切|𡽠𡽠峩山皃
jlh胡果禍害也胡果切七|𥚁上同（害也胡果切七）|夥楚人云多也|𡖿上同（楚人云多也）|𣄸說文云逆惡之驚詞|輠車脂角又音果|𨘌𨘌過也秦人呼過爲𨘌也
ilh呼果火河圖挺左輔曰伏羲禪於伯牛鑽木作火說文曰燬也南方之行炎而上象形呼果切二|邩玉篇云地名
elh苦果顆小頭苦果切三|堁堀堁塵起也|敤研理又音課
ClB捕可爸父也捕可切一
Olh倉果脞書傳云叢脞細碎無大略也倉果切二|䂳碎石
OlR作可硰硰石地名作可切一
#馬
DnB莫下馬說父曰怒也武也象頭髦尾四足之形尚書中候曰稷爲大司馬釋名曰大司馬馬武也大摠武事也亦姓扶風人本自伯益之裔趙奢封馬服君後遂氏焉秦滅趙徙奢孫興於咸陽爲右內史遂爲扶風人又漢複姓五氏漢馬宮本姓馬矢氏功臣表有馬適育溝洫志有諫議大夫乘馬延年何氏姓苑云今西陽人孔子弟子有巫馬期風俗通有白馬氏莫下切七|碼碼碯石似玉|䣕郁䣕縣名在犍爲|罵罵詈又莫霸切|𥧓穴𥧓在燕野|鷌異鳥|鰢魚名
XoR章也者語助章也切三|赭赤土|堵縣名又姓左傳鄭有堵女父堵狗又音覩
loR羊者野田野說文云郊外也羊者切五|𡐨古文（田野說文云郊外也羊者切五）|也語助辝之終也|冶銷也尸子曰蚩尤造九冶又妖冶亦姓左傳衛大夫冶廑|虵羌複姓有虵咥氏又食遮切嫺都結切
gnR五下雅正也嫻雅也說文曰楚烏也一名鸒一名卑居秦謂之雅五下切五|疋正也待也說文所葅切足也古文以爲詩大雅字又山呂切|庌廳也說文曰廡也周禮曰夏庌馬|厊厏厊不合|㿿酒器
dnR古疋檟山楸古疋切十|榎上同（山楸古疋切十）|嘏大也福也|假且也借也非真也說文又作徦至也又姓漢有假倉|叚說文借也|賈姓也出河東本自周賈伯之後又音古|斝玉爵禮記曰夏后氏以醆商以斝周以爵|瘕久病腹內又古牙切|椵爾雅曰櫠椵郭璞云柚屬子大如盂皮厚二三寸中似枳食之少味|婽好也
VnR砂下灑灑水也砂下切一
hnR烏下啞不能言也烏下切又乙革切三|瘂（不能言也烏下切又乙革切三）|𤺘並上同（不能言也烏下切又乙革切三）
RoR徐野灺燭㶳徐野切三|抯取也|䵦䵦墁汚也出文字辨疑
jnR胡雅下賤也去也後也底也降也胡雅切四|丅古文（賤也去也後也底也降也胡雅切四）|夏大也又諸夏亦州名秦屬上郡漢分置朔方郡晉末赫連勃勃於州稱大夏爲後魏所滅置鎮又改爲夏州又胡駕古下二切|廈廈屋
QoR悉姐寫憂也除也程也盡也又轉本曰寫悉姐切四|𣞐案之別名|瀉瀉水|𣬕獸名
Snh𩛠瓦𡎬𡎬𡎬好皃𩛠瓦切一
DoF彌也乜蕃姓彌也切一
OoR七也且語辝七也切又子余切一
inR許下㗿大笑許下切三|閜大裂|襾說文曰覆也覆覈賈類皆從此
ZoR常者社社稷又漢複姓二氏風俗通云齊昌徙居社南因以爲氏何氏姓苑云右扶風有焉又有社比氏常者切三|𥁹器名|𣝒宜𣝒善夢神見仙經
enR苦下跒跁跒行皃苦下切一
CnB傍下跁傍下切三|䇑短人立也|笆竹名出蜀又音巴
aoR書冶捨釋也書冶切五|舍止息亦上同又音赦（釋也書冶切五）|騇牝馬|䬷䬼飫|𩜉上同（䬼飫）
NoR兹野姐羌人呼母一曰慢也兹野切三|抯取也又才也切|飷食無味也
AnB博下把持也執也博下切一
jnh胡瓦踝足骨也胡瓦切十一|稞淨榖|䋀青絲履又繩履|𦖍地名|黊鮮明黃色|蘳說文曰黃華又音壞|觟牝䍧羊生角者又楚冠名|𩸄魚似鮎也|𢦚大口又聲說文曰擊踝也|輠轂頭轉皃|䴹麴名
dnh古瓦寡鰥寡說文少也古瓦切八|冎剔人肉置其骨|剮俗（剔人肉置其骨）|𣑍老人柱杖|𠊰㒀𠊰行皃|𠁥羊角皃|䈑䈅䈑收絲具|𧤐觰𧤐牛角開
gnh五寡瓦古史考曰夏時昆吾氏作瓦也五寡切二|邷衛地
coR人者若乾草又般若出釋典又虜複姓二氏周書若干惠傳曰其先與魏俱起以國爲姓後燕錄有步兵校尉若久和人者切又人勺切三|惹亂心|𠰒譍聲也
SnR側下鮓釋名曰鮓葅也以鹽米釀魚以爲葅側下切五|厏厏厊不合|謯謯訝訶皃|𥰭炭籠也又音鹺|痄痄瘡不合
JnR都賈觰牛角橫都賈切又竹加切一
UnR士下槎逆斫木士下切又仕加切二|厏厏厊
YoR昌者奲寬大也昌者切五|㨋擊也|䰩醜䰩|哆脣下垂皃又當可切|撦裂開
JnR竹下䋾䋾䋈相著皃竹下切一
MnR奴下䋈奴下切一
enh苦瓦髁𦝫骨苦瓦切七|跨𦝫跨又苦化切|骻上同（𦝫跨又苦化切）|㡁㡁衿袍也|銙帶飾|𢄳帛衣|㐄跨步又口化切
Tnh叉瓦䂳好雌黃叉瓦切又七火切一
Knh丑寡䊬䊬榖南人食之或云茙葵丑寡切一
Vnh沙瓦葰葰人縣名沙瓦切三|𧫝強事言語|傻傻俏不仁
KnR丑下奼嬌奼也丑下切又陟嫁切一
InR盧下藞玉篇云藞槎泥不熟皃盧下切一
#養
lpR餘兩養育也樂也飾也字從羊食又姓孝子傳有養奮餘兩切七|痒皮痒|癢上同（皮痒）|瀁滉瀁水皃|蝆蟻名說文曰搔蝆也|勨勉也又音象|𧓲蟲名
RpR徐兩像似也徐兩切十一|象說文曰象長鼻牙南越大獸三季一乳象耳牙四足之形爾雅曰南方之美者有梁山之犀象|蟓桑上繭|橡櫟實|襐未笄冠者之首飾也|勨勉也又音養|鱌魚名似魟白鼻長也|潒潒遠|𨖶行也|𦺨草名|嶑山名
NpR即兩㢡勸也助也成也譽也厲也即兩切六|獎上同說文本作獎嗾犬厲之也（勸也助也成也譽也厲也即兩切六）|䉃剖竹未去節也又秦杖切|槳檝屬|㯍上同（檝屬）|蔣國名亦姓風俗通云周公之胤又漢複姓漢有曲陽令蔣匠熙又子羊切
IpR良㢡㒳說文曰再也易云參天㒳地今通作兩良㢡切八|兩上同說文曰二十四銖爲一兩（說文曰再也易云參天㒳地今通作兩良㢡切八）|脼膎脼|𣓈松脂|緉雙履|蜽蛧蜽蟲名說文曰蛧蜽山川之精物也國語曰木石之怪夔蛧蜽亦作魍魎|魎見上注（蛧蜽蟲名說文曰蛧蜽山川之精物也國語曰木石之怪夔蛧蜽亦作魍魎）|㔝㔝勥力拒
hpd於兩鞅牛羈也說文頸靼也於兩切十一|柍木名|秧秧穰禾稠也又音央|䬬飽皃|詇早知也|岟岟山足|駚駚驡馬皃|炴火光|𧵌無貲量謂無極限也|怏怏悵也又於亮切|紻冠纓
fpd其兩勥迫也勉力也其兩切五|彊說文云弓有力也或作強又姓前秦錄有將軍強求又其良切|弜弓有力也|誩競言|滰乾米之皃
gpd魚兩仰偃仰也說文舉也魚兩切三|䒢昌蒲別名|卬望也欲有所度
TpR初兩磢瓦石洗物初兩切六|㼽上同（瓦石洗物初兩切六）|𠞮皮傷|搶頭搶地見史記又七良七養二切|漺凈也|愴愴怳失意皃又音創
QpR息兩想思想也息兩切二|鯗乾魚腊也
XpR諸兩掌手掌又姓晉有琅耶掌同前涼有燉煌掌據諸兩切三|仉姓梁公子仉䁈後也|𤓯反爪
VpR疎兩𤕤明也差也烈也猛也貴也疎兩切九|爽上同（明也差也烈也猛也貴也疎兩切九）|𦄍屩中絞繩|鷞鷞鳩|塽塽塏高也|樉木名|㼽半瓦|漺凈也又初兩切|䫪醜皃
ipd許兩響聲也許兩切八|饗歆饗|蠁說文曰知聲蟲也|䖮上同（說文曰知聲蟲也）|亯獻也祭也臨也向也歆也書傳云奉上謂之亯|亨上同亦作享（獻也祭也臨也向也歆也書傳云奉上謂之亯）|嚮爾雅兩階閒謂之嚮本亦作鄉又音向|曏不久也又音向
YpR昌兩敞高也昌兩切七|𢠵𢠵怳驚皃|氅鶖鳥毛也|𪅶上同（鶖鳥毛也）|廠屋也出方言又音唱|䟫踞也又主尚直庚二切|僘僘寬也
dpd居兩繈絲有纇又孟康曰繈錢貫也俗作鏹居兩切五|鏹俗見上注（絲有纇又孟康曰繈錢貫也俗作鏹居兩切五）|襁襁褓負兒衣博物志云襁織縷爲之廣八寸長二尺以約小兒於背上|膙筋頭|憼敬也說文音景
LpR直兩丈說苑曰十尺爲丈直兩切四|杖說文曰持也大戴禮曰武王踐阼爲杖之銘曰惡乎失道於嗜慾惡乎相忘於富貴呂氏春秋曰孔子見弟子抱杖而問其父母柱杖而問其兄弟曳杖而問其妻子尊卑之差也禮曰苴杖竹也削杖桐也|仗憑仗本又音去聲|㽴病也
KpR丑兩昶通也明也舒也丑兩切二|鋹利也
dpt居往獷獷平縣在漁陽居往切又居猛切一
cpR如兩壤土也書傳曰無塊曰壤風土記曰擊壤者以木作之前廣後銳長尺三四寸其形如履臘節僮少以爲戲也逸士傳曰堯時有壤父擊於康衢藝經曰擊壤古戲又漢複姓孔子弟子有壤駟赤如兩切八|䖆䖆菜爲葅|䑋肥蜀人云|穰豐穰又汝羊切|蠰蟲名似雞而小|攘擾攘又汝羊切|躟躟躟行疾皃|𥗝惡雌黃
apR書兩賞賜也又吳姓有賞氏書兩切五|𩞧日西食|𩞃上同（日西食）|饟周人呼餉食|曏少時也又火亮切
BpN妃兩髣髣髴亦作彷彿妃兩切六|彷彷彿俗（髣髴亦作彷彿妃兩切六）|仿說文曰相似也|紡績紡|鶭鸅鸆鳥蒼黑色常在澤中俗呼爲護澤|鴋上同（鸅鸆鳥蒼黑色常在澤中俗呼爲護澤）
DpN文兩网网罟說文曰网庖羲所結繩以田以漁也世本曰庖羲臣芒所作五經文字作罔俗作冈文兩切十二|網上同（网罟說文曰网庖羲所結繩以田以漁也世本曰庖羲臣芒所作五經文字作罔俗作冈文兩切十二）|罔上同又無也（网罟說文曰网庖羲所結繩以田以漁也世本曰庖羲臣芒所作五經文字作罔俗作冈文兩切十二）|輞車輞|棢上同（車輞）|惘惘然失志皃|菵菵草|誷誷誣|𡔞上同（誷誣）|𦖉耳疾|蛧蛧蜽|魍魍魎上同（蛧蜽）
ApN分网昉明也分网切四|倣學也|放上同（學也）|瓬周禮有瓬人爲簋者蓋摶埴之工又音甫
hpt紆往枉邪曲也亦姓今虢州有之紆往切四|𢼟曲侵|𣢫佞人|汪汪陶縣在鴈門又烏光切
kpt于兩往之也去也行也至也于兩切二|暀德也是也光也爾雅曰暀暀皇皇美也
ipt許昉怳𢠵怳許昉切二|𧧢夢中言也又火光切
OpR七兩搶七兩切又初兩七羊二切二|摤上同（七兩切又初兩七羊二切二）
JpR知丈長大也又漢複姓晉有長兒魯少事智伯智伯絕之三年其後死智伯之難知丈切又直張切一
ZpR時掌上登也升也時掌切又音尚二|丄古文（登也升也時掌切又音尚二）
fpt求往俇楚詞注云俇俇遑遽皃求往切一
dpt俱往臩說文曰驚走也一曰往來皃俱往切四|迋欺怨|𠏤載器也出埤蒼|逛走皃
CpF毗養𩦠姓也毗養切一
TpR初丈䫪醜也初丈切二|傸惡也
#蕩
GqR徒朗蕩大也又水名出湯陰又姓宋之公族也徒朗切十二|崵山名漢高帝隱處|婸淫戲皃|𥯕大竹筩|潒水大之皃又洸潒也|𢠽放𢠽或作婸|愓不憂|璗玉名說文曰金之美與玉同色者也|盪滌盪搖動皃說文曰滌器也又吐浪切|䑗舂也冶米精也|簜大竹|嵣嵣㟐山皃
QqR蘇朗顙頟也蘇朗切四|𣞙鼓匡木也|𣡆上同（鼓匡木也）|磉柱下石也
dqh古晃廣大也闊也古晃切二|鄺姓出廬江
AqB北朗榜木片北朗切六|牓題牓|𣮧毛𣮧罽文|螃陸居蝦蟆|蒡牛蒡菜|䰃䰃鬤亂毛
NqR子朗駔會馬市人又牡馬也子朗切三|驡駚驡馬容|髒骯髒體盤
HqR奴朗曩久也奴朗切二|灢泱灢水不淨見海賦
jqR胡朗沆沆瀣氣也胡朗切六|骯骯髒體盤|䟘伸脛也|𡕬直項之皃|蚢貝大者如車輞爾雅作魧|吭聲也
FqR他朗曭日不明他朗切十二|儻倜儻不羈又他浪切|偒長皃|戃戃慌失意皃|矘矘䁳目無精|𥯕說文曰大竹筩也|帑金帛舍又音奴|爣爣朗火光寬明|𣎲𣎲㬻月不明也|㼒大瓜名又㼒㼒長皃|㿩白㿩|攩攩㨪搥打
DqB模朗莽草莽說文曰南昌謂犬善逐兔於艸中爲莽又姓前漢反者馬何羅後漢明德馬后恥與同宗改爲莽氏模朗切又莫古切十|茻說文曰眾艸也|壾吳主孫休子名見吳志|䁳無一睛|䒎䒍䒎無色狀|㬒日無光|䥈鈷䥈又莫古切|蟒蛇最大者|漭漭沆水大|㟐嵣㟐山皃
EqR多朗黨釋名曰五百家爲黨黨長也一聚所尊長也又輩也美也累也說文曰不鮮也多朗切五|讜直言|欓木名|䣣地名說文作䣊|𧅗草名
IqR盧黨朗明也亦姓出姓苑盧黨切七|朖（明也亦姓出姓苑盧黨切七）|誏並上同（明也亦姓出姓苑盧黨切七）|俍俍偒長皃|崀嵻崀山空|榔木名|㝗㝩㝗空虛
hqR烏朗坱塵埃也烏朗切十|姎女人自稱姎我又烏郎切|映映㬒不明|泱滃泱水皃|咉咉咉咽悲也|醠濁酒|䇦竹名玉篇云䇦無色也|盎盆也又烏浪切|駚駚驡馬容|軮軮軋聲也
eqR苦朗慷慷慨竭誠也苦朗切七|忼上同（慷慨竭誠也苦朗切七）|𡻚𡻚崀山空|骯骯髒體盤|䡉車䡉之名|㝩㝩㝗空虛|懬大也又丘廣切說文又口謗切
hqh烏晃㳹大水烏晃切二|瀇水深廣皃
jqh胡廣晃明也暉也光也亦作晄胡廣切七|幌帷幔也晉惠起居注云有雲母幌|櫎兵欄|榥讀書牀也|滉滉瀁水皃|攩搥打又吐朗切|皝人名前燕慕容皝也
BqB匹朗髈髀吳人云髈匹朗切二|䒍䒍䒎無色
iqh呼晃慌戃慌呼晃切七|爌爌朗寬明也又苦晃切|𡧽𡧽㝗也|䁜䁳䁜目疾出新字林|㬻𣎲㬻月不明皃|𣆖日旱熱也|𧧢夢言也
dqR各朗䴚鹽澤也各朗切四|𨟼（鹽澤也各朗切四）|㽘並上同（鹽澤也各朗切四）|䟘伸脛也
gqR五朗䭹馬怒驚驡䭹也五朗切一
PqR徂朗奘大也徂朗切一
OqR麁朗蒼莽蒼麁朗切一
iqR呼朗汻姓今涇州有之呼朗切三|酐苦酒|𤰟鹵𤰟
eqh丘晃懬大也寬也怨也丘晃切三|䡉䡉䡉𨋕也|爌爌朗寬明也又火光
#梗
drR古杏梗梗直也又桔梗藥名古杏切九|挭挭槩大略|哽哽咽|郠邑名在莒|綆井索|鯁刺在喉又骨鯁謇諤之臣|埂堤封吳人云也|骾骨骾|𧋑蟲名
AsJ兵永丙辰名爾雅云太歲在丙曰柔兆又光也明也又姓風俗通云齊有大夫丙歜兵永切九|昞亮也亦作昺|怲憂也|邴邑名在泰山又姓左傳晉有大夫邴預又音柄|炳炳煥明也|秉執持又十六斗曰藪十藪曰秉又姓漢書有秉漢|窉爾雅云三月爲窉本亦作寎又兄病孚命區詠三切|苪著也|蛃蛃蟲名
dsZ居影警寤也戒也居影切八|儆上同（寤也戒也居影切八）|景大也明也像也光也炤也又姓齊景公之後後漢有景丹|境界也|璥玉名|蟼蛙屬|檠所以正弓出周禮亦作檠|憼敬也
hsZ於丙影形影於丙切八|璟玉光彩出埤蒼|璄上同（玉光彩出埤蒼）|䭘飽亦作䭊|摬中擊|㲟毛車|𠝟玉篇云刺也|𩘑高風
VsR所景省省署漢書曰舊名禁中避元后諱改爲省中又姓左傳宋大夫省臧所景切又息井切九|眚過也災也|㾪瘦㾪|𡞞減也|䚇䚇腳露也|𨵥𨵥府今爲省字|㼳㼬㼳耳瓶|渻水名亦丘名|𨜜上同（水名亦丘名）
ksp于憬永長也引也遠也遐也亦姓出何氏姓苑于憬切二|栐木可爲笏
isp許永𦬺小風許永切一
DsJ武永皿器皿武永切三|𥥊𥥊戶土穴|𥁰盟也
dsp俱永憬遠也俱永切六|囧光也|煚火也|璟玉光|臩驚走皃|暻明也曲礼悟也
jrR何梗杏果名廣志曰滎陽有白杏鄴有赤杏黃杏何梗切三|莕莕菜|荇上同（莕菜）
DrB莫杏猛勇猛又嚴也害也惡也亦姓左傳宋大夫猛獲之後莫杏切六|𥋝𥋝盯視皃|蜢虴蜢蟲|艋舴艋小船舴陟格切|鱦蛙屬|鄳縣名在江夏
drh古猛礦金璞也古猛切七|鑛上同（金璞也古猛切七）|𨥥古文（金璞也古猛切七）|𪍿𪍿麥|䵃上同（𪍿麥）|獷犬也又居往切獷平縣名在漁陽|穬榖芒又曰稻不熟
ArB布梗浜浦名布梗切又布耕切三|㑟詐僞人也|𧚭𧚭急皃
JrR張梗盯盯𥋝張梗切一
LrR徒杏瑒祀宗廟圭名長一尺二寸徒杏切又音暢一
hrh烏猛䁝清潔烏猛切三|㴄㴄澋水回旋也|奣六合清朗
ErR德冷打擊也德冷切又都挺切一
IrR魯打冷寒也魯打切又魯頂切一
jrh乎䁝卝金玉未成器也乎䁝切二|澋㴄澋水回旋也
CrB蒲猛鮩鮊魚別名蒲猛切一
erh苦礦𥉁𥉁然舉目也苦礦切又音句一
MrR拏梗檸木皮入酒浸治風拏梗切一
#耿
dtR古幸耿耿介也又耿耿不安也又姓晉大夫趙夙滅耿因封焉遂以國爲氏古幸切三|𦵸芋莖也|𥉔𥉔䁅視皃
DtB武幸䁅武幸切三|鼆句鼆魯邑名|黽蛙屬
jtR胡耿幸說文作𡴘吉而免凶也从屰从夭夭死之事故死謂之不𡴘胡耿切四|𡴘見上注（說文作𡴘吉而免凶也从屰从夭夭死之事故死謂之不𡴘胡耿切四）|倖儌倖|㼬㼬㼳瓶有耳
CtB蒲幸𠊧俱也或作併羅列也蒲幸切四|𩶁蛤𩶁|蠯上同（蛤𩶁）|螷亦同
BtB普幸皏皏㿣薄皃普幸切一
#靜
PuR疾郢靜安也謀也和也息也疾郢切十|睜眳睜不悅視也|𩇕清飾|靖立也思也理也審也又姓齊靖郭君之後風俗通云單靖公之後|妌女人貞絜也|婧上同（女人貞絜也）|穽坑也|阱上同（坑也）|猙獸如狐有翼又音爭|竫亭安
XuR之郢整正也齊也之郢切二
KuR丑郢逞通也疾也盡也丑郢切六|騁馳騁又走也|裎襌衣|悜慏悜意不盡也|䩶驂具又丑善切|睈視也又意不盡
luR以整郢楚地以整切三|浧泥也|梬梬棗似柿而小
fuV巨郢痙風強病也巨郢切二|𠗊玉篇云寒也
luh餘頃潁水名在汝南亦州名禹貢豫州之境春秋時沈丘也秦爲潁川郡漢爲汝南郡之汝陰後魏置潁州餘頃切二|穎禾末也穗也又姓左傳有穎考叔
IuR良郢領理也錄也說文頃也良郢切六|嶺山坡也裴潛廣州記云大庾始安臨賀桂陽揭陽爲五嶺與鄧德明南康記云別也|阾古文（山坡也裴潛廣州記云大庾始安臨賀桂陽揭陽爲五嶺與鄧德明南康記云別也）|柃木名灰可染|袊衣袊禮云左執領不從衣|䕘草名
duV居郢頸項也居郢切又巨成切一
AuF必郢餅必郢切五|屏蔽也爾雅曰屏謂之樹又廣雅曰罘罳謂之屏風俗通云鄉大夫帷士以廉以自鄣蔽|鉼鉼金謂之鈑周禮祭五帝則供鉼金|併併合和也又必姓切|䴵索䴵出食苑
eul去潁頃田百畝也去潁切六|𩒵古文（田百畝也去潁切六）|㩩竟也|檾枲草|苘（枲草）|䔛並上同（枲草）
NuR子郢井說文曰八家一井象構韓形·𦉥之象也古者伯益初作丼今作井見經典省又姓姜子牙之後也左傳有井伯子郢切二|𨙷𨙷邢地名
huV於郢廮安也又廮陶縣名在趙州於郢切五|𨟙地名|癭瘤也博物志云山居之人多癭疾|𣤵𣤵氣|𦡺滯氣
OuR七靜請乞也求也問也謁也七靜切又疾盈疾姓二切二|睛眳睛不悅目皃出字林又音精
QuR息井省察也審也息井切六|渻說文曰少減也一曰水門又水出丘前謂之渻丘|睲睲睲照視|惺惺悟出字林|㮐俎几名|𢜫𢜫悟皃俗
DuF亡井眳眳睛亡井切二|慏慏悜意不盡也
LuR丈井徎雨後徑也丈井切一二|塣通也
#迥
jvh戶頂迥遠也戶頂切五|冋空也|炯光也明也又音熲|泂詩云泂酌|𦳖草名
dvh古迥熲光也又輝也古迥切八|炅光也又古惠切|炯火明皃又音迥|𠖷凔寒|㯋篋名|𩚱𩚱飽|𥉁目驚皃|𧍮𧍮𧑗似蛙
DvB莫迥茗茗草莫迥切七|嫇嫇奵自持也|酩酩酊|瀴瀴涬大水皃|溟上同（瀴涬大水皃）|眳眳睛|姳姳好
EvR都挺頂頂𩕳頭上說文顛也都挺切十三|𩠑上同（頂𩕳頭上說文顛也都挺切十三）|𩕢籀文（頂𩕳頭上說文顛也都挺切十三）|奵嫇奵|耵耵聹耳垢|鼎說文云鼎三足兩耳和五味之寶器禹收九牧之金鑄鼎荊山之下|薡草名|酊酩酊|濎濎濘水皃|葶葶䔭毒草|靪補履又音丁|打擊也又都冷切|㞟展也
GvR徒鼎挺挺出說文拔也徒鼎切十二|艇小船|鋌金鋌|梃木片|娗長好皃|町田畝又音汀|霆疾雷又音庭|莛草莖又音庭|涏涇寒|蜓蟲名又徒典切|訂平議|誔詭言
FvR他鼎珽玉名說文曰大圭長三尺杼上終葵首他鼎切十二|圢平也|脡脯胊|侹長也直也代也敬也|頲直也|徎徑也|𡈼善也|町田塸|艼葋也又禿鈴切|𤱹田器|𦉬𦉬𦊓小網|𨳝門上關
PvR徂醒汫汫濙小水皃徂醒切一
hvh烏迥濙汫濙烏迥切一
evR去挺謦謦欬也去挺切一
HvR乃挺𩕳頂𩕳乃挺切五|聹耵聹|䗿似蛙|濘泥也又乃定切|䔭葶䔭
jvR胡頂婞很也胡頂切七|涬瀴涬大水皃|𩷏魚名|鋞似鐘而長|脛腳脛又胡定切|𢙼𢙼恨|緈絓緈
QvR蘇挺醒醉歇也蘇挺切二|箵箵笭篝籠
AvB補鼎鞞刀室補鼎切一
evh口迥褧褧衣說文檾也口迥切六|檾枲屬|苘上同（枲屬）|烓行竈又烏圭切|顈襌也|絅衣
dvR古挺剄斷首古挺切二|烴焦臭
BvB匹迥頩斂容匹迥切一
hvR烟涬巊巊溟山水烟涬切三|𩳍誣厭|瀴瀴涬大水皃
IvR力鼎笭篝笭籠也力鼎切三|𦊓𦉬𦊓小網|冷寒也又姓前趙錄有徐州刺史冷道字安義又盧打切
CvB蒲迥竝比也蒲迥切四|並上同（比也蒲迥切四）|鮩白魚名也|併立並又必姓切
ivh火迥詗明悟了知也火迥切一
gvR五剄䀴直視皃也五剄切二|矨小皃
#拯
XwR@@拯救也助也無韻切音蒸上聲五|抍（救也助也無韻切音蒸上聲五）|撜並上同見說文（救也助也無韻切音蒸上聲五）|𨋬軺車後登出字林|氶晉譙王名
KwR丑拯庱亭名在吳晉陵丑拯切又恥陵切一
fwd其拯殑殑㱡欲死也其拯切一
VwR色庱㱡殑㱡色庱切一
#等
ExR多肯等齊也類也比也輩也多肯切一
BxB普等倗不肯也普等切二|䣙穆天子傳云西征至䣙郭璞云國名也前漢書有䣙成侯
exR苦等肯可也說文作肎骨閒肉肎肎著也一曰骨無肉苦等切二|肎上同（可也說文作肎骨閒肉肎肎著也一曰骨無肉苦等切二）
HxR奴等能夷人語奴等切本又奴登切一
#有
kyN云久有有無又果也取也質也又也又姓孔子弟子有若又漢複姓有男氏禹後分封以國爲姓出史記云久切九|右左右也又漢複姓五氏左傳宋樂大心爲右師其後因官爲氏漢有中郎右師譚晉賈華爲右行因官爲氏漢有御史中丞右行綽何氏姓苑有右閭右扈右南等氏|䳑鳥名似雉|友朋友同志爲友|㕛上同出說文（朋友同志爲友）|䀁器也又于救切|𥁓上同（器也又于救切）|栯木名服之不妬又於六切|䒴草名
IyB力久柳木名說文作桺小楊也从木丣聲丣古文酉餘倣此又姓出河東本自魯孝公子展之孫以王父字爲展氏至展禽食采於柳因爲氏魯爲楚滅柳氏入楚楚爲秦滅乃遷晉之解縣秦置河東郡故爲河東解縣人力久切十四|罶魚梁|𦊑上同（魚梁）|懰好也|珋石之有光璧珋也說文本音留|𩖴䬀𩖴風皃|嬼妖美又嫠婦也|䉧竹聲|𪕋似鼠而大又音留|熮火爛|瀏水清|綹十絲爲綹|𨋖載柩車也|茆𦽏葵水草詩云言采其茆即蒓菜也又莫飽切
MyB女久狃相狎也女久切十一|紐結也|鈕印鼻又姓何氏姓苑云今吳興人東晉有鈕滔也|杻木名|莥玉篇云鹿豆也|禸爾雅云貍狐貒貈跡也|扭扭手轉皃|𢔟習也|䏔食肉|𨙺地名|𦱙蔨實亦作𦶆
KyB敕久丑辰名爾雅曰太歲在丑曰赤奮若敕久切三|杻杻械|杽古文（杻械）
JyB陟柳肘臂肘陟柳切四|疛說文曰小腹病|𤶡上同（說文曰小腹病）|扭扭按也又音紐
iyN許久朽腐也許久切四|㱙上同（腐也許久切四）|㽲病也|殠臭也
dyN舉有久長久也舉有切七|九數也又漢複姓二氏何氏姓苑云昔岱縣人姓九百名里爲縣小吏而功曹姓萬縣中語曰九百小吏萬功曹列子秦穆公時九方皋一名歅善相馬也|玖玉名|灸灸灼也又居又切|韭說文曰菜名也一種而久者故謂之韭象形在一之上一地也俗作韮|𡚮女字也亦作奺|𨾉姓出纂文
ayB書九首頭也始也書九切六|𩠐上同（頭也始也書九切六）|𦣻人頭象形|手手足|䭭人初產子|守主守亦姓出姓苑
YyB昌九醜類也竅也釋名曰醜臭也如物臭穢也又虜複姓西秦錄有下將軍醜門于弟昌九切三|𧃝瑞草也|魗弃也惡也又市籌切
PyB在九湫洩水瀆也在九切又子由子小切二|愀變色也又鍬小切
CyN房久婦說文曰婦服也从女持帚洒埽也房久切十五|䘀䘀螽|負擔也荷也又受貸不償曰負背恩忘德曰負也|萯王萯草|蝜𧑓蝜|阜陵阜釋名曰土山曰阜阜厚也言高厚也廣雅曰無石曰阜|𨸏上同（陵阜釋名曰土山曰阜阜厚也言高厚也廣雅曰無石曰阜）|𪃓鷂別名也|偩禮云禮樂偩天地之情|𦰺香草|𩣸盛也亦作䧞|䧞上同（盛也亦作䧞）|㷆㷆熾|菩香草又步乃切|𧌈鼠𧌈
AyN方久缶瓦器鉢也史記云秦王趙王會于澠池藺相如使秦王擊缶是也詩疏云缶者瓦器也所以盛酒漿秦人鼓之以節歌方久切八|缹蒸缹|否說文不也又房彼切|不弗也說文作𠀚鳥飛上翔不下來也从一一天也象形又甫鳩甫救二切|鴀䳕鳩|痞病也|殕物敗也|𡜊好皃也
eyN去久糗乾飯屑也孟子曰舜飯糗茹草又姓風俗通漢有糗宗爲嬴長去久切一
cyB人九蹂踐也人九切十|楺屈木|煣上同（屈木）|輮車輞|沑說文曰水吏也又溫也|禸獸跡又女九切|葇葇䖆菜不切也|𥠊禾𥠊|韖車軔|粈粽粈
fyN其九舅夫之父也亦母之兄弟又姓左傳秦大夫舅犯其九切十一|倃說文毀也|臼杵臼世本曰雍父作臼又姓左傳宋華貙家臣臼任|齨齒齨亦馬八歲俗作𩣅|麔牝麋|䳎鳥名似鳩有冠|咎愆也惡也過也災也從人各各者相違也|䊆糗米|𤷑病也|𢛃怨𢛃|䛮毀也
LyB除柳紂殷王号也方言云自關而東謂䋺曰紂俗作𩋰除柳切六|䈙竹易根而死也|鮦鮦陽縣在汝南又直冢切|葤裹也|棸姓也襄州有之又音籌|𦡴小腹痛又腿後
lyB與久酉飽也老也就也首也又辰名爾雅曰太歲在酉曰作噩又姓魏有酉牧與久切二十一|丣古文（飽也老也就也首也又辰名爾雅曰太歲在酉曰作噩又姓魏有酉牧與久切二十一）|誘導也引也教也進也說文曰相訹呼也|㕗（導也引也教也進也說文曰相訹呼也）|䛻上同並見說文（導也引也教也進也說文曰相訹呼也）|牖道也向也說文曰牖穿壁以木爲交窻也禮曰蓽門閨竇蓬戶甕牖|卣中形罇又音由|槱積木燎以祭天也|𥙫上同（積木燎以祭天也）|莠草也|羑羑里文王所囚處又有羑水並在湯陰又姓也|庮久屋木也周禮曰牛夜鳴則庮鄭司農曰庮朽木臭也|蜏朝生暮死蟲名|㝌字書云貧病也|𣣸說文云言意也|琇玉名又音秀|梄柞梄木|𤪎遺玉|輶輕車又音由|𨣆𨣆酒|𦏇水名
ZyB殖酉受容納也承也盛也得也繼也殖酉切五|壽壽考又州名楚考烈王自陳徙都壽春号曰郢秦爲九江郡魏爲淮南郡梁爲南豫州周爲揚州隋平陳爲壽州亦靈壽木名生日南又姓王莽兗州牧壽良又漢複姓前漢燕王遣壽西長之長安蘇林云壽西姓也又承呪切|𨞪水名在蜀亦地名也|璹玉名又音孰|綬組綬禮云天子玄公侯朱大夫純世子綦士縕應劭漢官曰綬長一丈二尺法十二月廣三尺法天地人也
QyB息有滫溲麵說文曰久泔也息有切四|糔糔溲|醙白酒|𦄼絆前兩足又相主切
hyN於柳䬀䬀𩖴於柳切三|䱂魚名|懮懮受舒遟皃
NyB子酉酒酒醴戰國策曰帝女儀狄作而進於禹亦云杜康作元命包曰酒乳也又酒泉縣在肅州匈奴傳云水甘如酒因以名之亦姓也子酉切一
VyB疎有溲溲麪亦作𣸈疎有切一
XyB之九帚少康作箕帚之九切五|箒俗（少康作箕帚之九切五）|鯞鱖鯞魚名|晭明晭|𧳜猛獸
ByN芳否㤱小怒芳否切三|紑鮮也又孚丘切|𩂆霧𩂆
SyB側九掫持物相著側九切三|搊搊扇別名|𧌗蟲名
UyB士九𥣙聚名士九切一
TyB初九𩋄𩋄束初九切二|𩌄上同（𩋄束初九切二）
ByN芳婦秠爾雅曰一稃二米此亦黑黍漢和帝時任城生黑黍或三四實實二米得黍三斛八斗是芳婦切又匹几孚悲二切一
#厚
jzB胡口厚厚薄又重也廣也說文作𠪀曰山陵之𠪀也又姓出姓苑胡口切七|垕古文（厚薄又重也廣也說文作𠪀曰山陵之𠪀也又姓出姓苑胡口切七）|後先後說文遟也又胡豆切|𨒥古文（先後說文遟也又胡豆切）|后君也又姓漢有少府后倉又音候|郈鄉名在東平又姓左傳魯大夫郈昭伯|㖃欲吐又呼后切
DzB莫厚母父母老子注云母道也蒼頡篇云其中有兩點象人乳形豎通者即音無莫厚切十四|牡牝牡|某詔前人之言也|拇大拇指也|胟上同（大拇指也）|畝司馬法六尺爲步步百爲畝秦孝公之制二百四十步爲畝也|畮（司馬法六尺爲步步百爲畝秦孝公之制二百四十步爲畝也）|畞並古文（司馬法六尺爲步步百爲畝秦孝公之制二百四十步爲畝也）|莽草莽|𤝕猦𤝕獸名|𤵝病𤵝|踇踇偶山名|𧿹行皃|䳇鸚䳇能言之鳥又音武
CzB蒲口部署也又姓出姓苑蒲口切十|培培塿小阜或作㟝|犃犃㸸偏高又牛短頸|䏽豕肉醬|瓿瓿甊小甖|䍌小缶|䴺䴺𪌘餅|篰牘也|蔀蔀菜魚薺也易云豐其蔀王弼曰蔀覆曖鄣光明之物亦音剖|婄婦人皃又音剖
EzB當口斗說文作斗十升也有柄象形石經作斗當口切八|㪷俗（說文作斗十升也有柄象形石經作斗當口切八）|枓柱上方木|蚪蝌蚪蟲也|阧阧峻|陡上同（阧峻）|抖抖擻舉皃|襡衣袖又音蜀
FzB天口𪌘䴺𪌘天口切九|飳上同（䴺𪌘天口切九）|妵人名左傳有華妵說文女字也|黈冕前纊也|𩿢水鳥黑色又大口切|蘣好皃又木苗出|斢斢㪹兵奪人物出字書|鈄姓出姓苑|䱏魚名
dzB古厚苟苟且又姓出河內河南西河三望國語云本自黃帝之子漢有苟參古厚切十三|玽石似玉|狗狗犬|垢塵垢|笱笱屚縣名在交阯又魚笱取魚竹器|𦊒上同（笱屚縣名在交阯又魚笱取魚竹器）|耇耇老壽也|詬詬恥也又呼候切|枸枸杞|茩薢茩|岣岣嶁山巔|敂敂扣打也|豿熊虎之子
gzB五口藕爾雅曰荷芙蕖其根藕五口切六|蕅上同（爾雅曰荷芙蕖其根藕五口切六）|偶合也匹也二也對也諧也|耦耦耕也亦姓風俗通云宋卿華耦之後漢有侍中耦嘉|髃肩前髃也|㼴盎名
AzB方垢㨐衣上擊也方垢切二|掊擊也
HzB乃后㝅乳也乃后切六|㳶說文水也|陾眾陾|𡝦𡝦㛘女肥皃|啂啂食物出新字林|𡭾小皃
QzB蘇后叜老叜蘇后切十五|叟上同（老叜蘇后切十五）|傁上同亦從叜餘倣此（老叜蘇后切十五）|嗾使犬聲|𠻛上同（使犬聲）|瞍瞽瞍舜父|謏謏訹誘辝|擻抖擻舉也|藪藪澤爾雅有十藪魯大野晉大陸秦楊陓宋孟諸楚雲夢吳越具區齊海隅燕昭余祁鄭圃田周焦護又十六斗曰藪|籔漉米器也|䏂字林云聰總名也|廋廣雅云隈也|棷薪也|駷馬搖銜走又思隴切|橾車轂中空
izB呼后吼牛鳴呼后切七|吽上同（牛鳴呼后切七）|呴亦同|㸸夔牛子也|𤘽上同（夔牛子也）|蚼蚍蜉名也又渠俱切|㖃厚怒聲
BzB普后剖判也破也普后切五|婄婦人皃|蔀小席又音部|䳝䳝雀名|䯽髮皃
hzB烏后歐吐也或作嘔烏后切又烏侯切七|嘔上同（吐也或作嘔烏后切又烏侯切七）|毆毆擊也俗作敺|㸸特牛又吼口二音|𠙶山名在溧陽縣|塸聚沙|䙔㳄衣也又於侯切
IzB郎斗塿培塿郎斗切十|嘍連嘍煩皃又力侯切|簍籠也周禮作簝|甊瓿甊甖|𪍣𪍴𪍣糫餅|嶁文字音義云山巔也|㪹斢㪹兵奪人物出新字林|謱謰謱小兒語又力侯切|漊溝通水漊也|䅹耕畦
NzB子苟走趨也子苟切又音奏一
ezB苦后口說文曰人所以言食也亦姓今同州有之苦后切九|扣扣擊也亦作叩|㸸犃㸸|𤘘上同（犃㸸）|釦金飾|叩叩頭|𧥣先相𧥣可|𨙫鄉名|竘健也又驅甫切
GzB徒口䕆圓草褥也徒口切六|𨪐酒器也或作鍮|𠁁水盥皃也說文同上（酒器也或作鍮）|揄揄引|𩿢水鳥又他口切|襡短衣
PzB仕垢鯫魚名一曰姓漢有鯫生又淺鯫小人仕垢切又士溝切一
OzB倉苟趣趣馬書傳云趣馬掌馬之官也倉苟切又士屢切三|取又七庾切|棷棨也又側溝切
#黝
h0V於糾黝黑也於糾切又於夷切七|怮憂皃|䬀䬀颼風聲又於柳切|蚴蚴蟉龍皃|泑崑崙山下澤也|眑幽靜之皃|𣢜愁皃
d0V居黝糾督也恭也急也戾也俗作糺居黝切四|赳武皃詩曰赳赳武夫|朻爾雅曰朻者聊又居幽切|鬮鬮取皃
f0V渠黝蟉蚴蟉龍皃渠黝切一
#寑
O1R七稔寑室也臥也七稔切九|𡪢上同見說文（室也臥也七稔切九）|寢上同見經典（上同見說文）|梫木名桂也|㾛㾛痛又皃醜也|𡬓說文曰病臥也|𦯈覆也|鋟爪刻鏤版又子廉切|䤐小甜
L1R直稔朕我也秦始皇二十六年始爲天子之稱直稔切六|𦩎古文|鰧魚名似鰕赤文出廣雅|螣螣蛇|栚說文曰槌之橫者關西謂之㯢|顩顩頤醜皃
e1Z丘甚坅坎也丘甚切一
I1R力稔廩倉有屋曰廩力稔切八|㐭上同（倉有屋曰廩力稔切八）|懍敬也畏也|菻菻蒿|凜寒凜|顲顲然作色皃|𤎭火舒|癛粟體
Q1R斯甚罧積柴取魚斯甚切二|伈伈伈恐皃
K1R丑甚踸踸踔行無常皃丑甚切三|鍖鍖銋|䫖䫖䫴自愞劣皃
N1R子朕䤐小甜也子朕切四|寖漸也漬也又子鴆切|䭙濕通上也|䐶䐶脣病也
c1R如甚荏菜也又荏苒如甚切十四|飪熟食|餁上同（熟食）|䭃亦同又玉篇云飽也|稔年也亦歲熟廣雅曰稔秋穀熟也|栠木弱皃|恁念也|袵文字音義云臥席也|䏕肉汁|䇮字書云單席|棯果木名爾雅云還味棯棗|𢆉稍甚|銋鍖銋|腍味好
X1R章荏枕枕席又姓出下邳章荏切又之賃切三|䪴頭骨後|䫬頭銳長也
a1R式荏沈國名古作邥亦姓出吳興本自周文王第十子聃季食采於沈即汝南平輿沈亭是也子孫以國爲氏式荏切又丈林切十四|邥古文（國名古作邥亦姓出吳興本自周文王第十子聃季食采於沈即汝南平輿沈亭是也子孫以國爲氏式荏切又丈林切十四）|宷說文曰悉也知寀諟也|審詳審也說文同上亦姓漢有辟陽侯審食其（說文曰悉也知寀諟也）|㰂木名山海經云煑其汁味甘可爲酒|瞫竊視又姓後漢書云武落鍾離山有黑穴出四姓瞫氏相氏樊氏鄭氏也|諗告也謀也深諫也又如甚切|䰼大魚|魫魚子|淰淰㴸水動也禮運曰龍以爲畜故魚鮪不淰淰之言閃也|㜤志下|䀢瞚也|𩶇大魚|𧀯草名
b1R食荏葚說文曰桑實也食荏切二|𣞵上同俗又作椹椹本音砧（說文曰桑實也食荏切二）
Z1R常枕甚劇過也說文曰尤安樂也常枕切二|訦信也又市林切
Y1R昌枕瀋汁也昌枕切一
T1R初朕墋土也初朕切三|醦酢甚|磣食有沙磣
M1R尼凜拰拰搦尼凜切一
f1Z渠飲噤寒而口閉渠飲切四|䫴切齒怒也|凚玉篇云寒極也|唫說文云口急也
d1Z居飲錦釋名曰錦金也作之用功重其價如金故字從金帛居飲切一
P1R慈荏蕈菌生木上慈荏切一
g1Z牛錦僸仰頭皃牛錦切又音禁二|趛低頭疾行
V1R疎錦㾕寒病疎錦切三|瘮上同（寒病疎錦切三）|槮木實名也
A1J筆錦稟供穀又與也筆錦切一
h1Z於錦㱃說文曰㱃也於錦切三|飲上同（說文曰㱃也於錦切三）|𤃷大水至又於感切
B1J丕飲品官品又類也眾庶也式也法也二口則生訟三口乃能品量又姓出何氏姓苑丕飲切一
e1Z欽錦𩖄𩒣𩖄醜皃欽錦切二|顉曲頤之皃又五感切
i1Z許錦廞大喪廞裘也也許錦切又羲今切一
J1R張甚戡少斫也張甚切又音堪二|㱽深擊說文曰下擊上也
l1R以荏潭潭濼水動搖皃以荏切又徒南切一
e1Z丘㾕𩒣𩒣𩖄醜皃士㾕切一
#感
d2R古禫感動也古禫切十一|𥸡竹名亦作篢|鱤魚名|灝豆汁|贑水名在南康又音紺|䤗酒味淫也|贛水名在豫章|㔶方言云箱類又云覆頭也又音貢|𧆐薏苡|䃭石篋見封禪議|灨水名
G2R徒感禫除服祭名徒感切十六|䊤糣䊤滓也|䨢䨢䨴雲皃|黮黭黮雲黑又他感切|窞坎傍入也易曰入于坎窞|髧髮垂|萏菡萏荷花未舒|𧂄上同（菡萏荷花未舒）|倓安也|𥥍竈突說文深也|𧡪徐視|醰長味|嘾莊子曰大甘而嘾說文曰含深也|贉買物先入直也|譚大也又姓|𣛱木名
h2R烏感晻晻藹暗也冥也烏感切九|黭黭黮|揞手覆|唵手進食也|隌隌闇|罯魚網|黤青黑色也|㞄㞄跛又蹇也|𤃷大水至
H2R奴感腩煑肉奴感切六|湳水名在西河又姓|䈒竹弱|䎃羽弱|揇揇搦|萳草長弱皃
F2R他感襑衣大他感切五|𧖺𧖺醢亦作醓|䏙肉汁|嗿眾聲|黮黭黮黑也又徒感切
P2R徂感歜昌蒲葅徂感切四|㣅弓弦㣅又作𢏵|䰼大魚又才枕切|㔆𠞊㔆又割翦出也
O2R七感慘慘慼也說文毒也七感切八|憯痛也|朁說文會也|黲暗色說文曰淺青黑也又倉敢切|㜗說文婪也|傪好皃又音平聲|噆銜也又子盍切|䫩顉䫩搖頭又素慘切
g2R五感顉顉䫩五感切三|㜝含怒皃|嵁嵁崿山形
N2R子感昝姓也子感切三|寁速也|撍手動
Q2R桑感糂羹糂墨子曰孔子戹陳藜羹不糂也或作糝桑感切八|糝上同（羹糂墨子曰孔子戹陳藜羹不糂也或作糝桑感切八）|糣糣䊤滓也|𢕕顉𢕕|㧲撼㧲搖動也|槮郭璞云叢木於水中魚寒入其裏因以箔取之|䫩顉䫩搖頭皃|䊉蜜藏木瓜
e2R苦感坎險也陷也又小罍也形似壼苦感切十|歁食未飽也|惂憂困也又恨也|輡輡𨎹車行不平|錎字書云瑣連環也|轗轗軻多迍|埳埳陷|顑顑顲瘦也|竷舞曲名|臽小穽名也
j2R胡感頷漢書曰班超虎頭燕頷說文曰面黃也胡感切十六|頜說文曰顄也|㜝㜝害惡性也|撼撼動也|淊水和泥或作涵|菡菡萏|欿欲得|蜭爾雅云蜭毛蠹|涵水入船又胡南切|肣牛腹又音含|𢎘說文曰嘾也草木之華未發函然象形|𢇞𢇞嘾乳汁狀出莊子|𢃗壅耳|莟花開|顄頤也又胡南切|𡻡𡻡崿
I2R盧感壈坎壈盧感切八|燣黃焦色|𨎹輡𨎹|浨藏梨汁也出字林|醂桃葅|顲面黃醜說火曰面顑顲也又力稔切|𠓭愁皃|漤鹽漬果
E2R都感黕滓垢也黑也都感切十|耽虎視又丁含切|𡖓玉篇云多也又丁含切|衴埤蒼云被緣也|䪴顲䪴醜也|丼姓也|瓭瓦屬|抌刺也擊也也又音由|䉞箱屬又作𥴶|𥴶上同（箱屬又作𥴶）
i2R呼唵䫲食不飽呼唵切一
#敢
d3R古覽敢勇也犯也說文作𠭖進取也古覽切七|𠭖上同（勇也犯也說文作𠭖進取也古覽切七）|𣪏籀文（勇也犯也說文作𠭖進取也古覽切七）|𢽤古文（澉䭕食無味）|橄橄欖果木名出交阯|澉澉䭕食無味|䇞竹名實中
@@@賞敢㶒果決勇也賞敢切一
I3R盧敢覽視也又姓何氏姓苑云彭城人盧敢切六|爁火爁|擥手擥取|攬上同（手擥取）|欖橄欖|罱罱網
F3R吐敢𦵹說文曰蒮之初生一名薍一名鵻吐敢切八|菼上同（說文曰蒮之初生一名薍一名鵻吐敢切八）|緂青黃色說文充三切白鮮衣皃|𤎥上同（青黃色說文充三切白鮮衣皃）|毯毛席|𦃖毳衣說文曰帛騅色也引詩曰毳衣如𦃖|裧俗（毳衣說文曰帛騅色也引詩曰毳衣如𦃖）|𠪚𠪚崯也又五今切
E3R都敢膽肝膽都敢切六|紞冕前垂也說文曰冕冠塞耳者|䃫石䃫藥名出玉篇|黵大汚垢黑|䒞𧂇䒞藩又音沈|𪆻應禍鳥名
G3R徒敢噉噉食或作啖又姓前秦錄有將軍噉鐵徒敢切八|啖上同（噉食或作啖又姓前秦錄有將軍噉鐵徒敢切八）|啗亦同|澹澹淡水皃淡音琰又恬靜又徒濫切|𥲄竹名|淡淊淡水滿皃又薄味也又徒濫切|憺安緩又徒濫切|惔上同（安緩又徒濫切）
O3R倉敢黲日暗色倉敢切一
D3B謨敢㛧鄉名在河東徛氏縣亦作□謨敢切二|𩛎吳人呼哺兒也
N3R子敢䭕澉䭕子敢切一
P3R才敢槧削版牘才敢切又七廉切七豔切四|鏨鏨鑿也又音慙|嵌開張山皃出蒼頡篇|㟛上同（開張山皃出蒼頡篇）
i3R呼覽喊聲也呼覽切四|嚂上同（聲也呼覽切四）|壏壏土地之堅也|㯺上同周禮注云強㯺地之堅者又音檻（壏土地之堅也）
h3R烏敢埯坑今之窊埯是烏敢切二|揜手揜物也
e3R口敢𠪚𠪚嶮側穴口敢切二|䖔甝屬
#琰
l4R以冉琰玉名周禮曰琰圭九寸以冉切十一|剡削也利也亦姓又時冉切|𨁹疾行|棪木名實似柰可食|燄燄燄火初著也|淡澹淡水皃又徒敢切|扊扊扅戶牡所以止扉或作剡移|淊㶘淊水滿|夵上大下小|䎦䎦耜|䌪續也
I4R良冉斂收也又姓姚秦錄有輔國將軍斂憲良冉切十三|撿說文拱也|薟白薟藥名又力瞻切|蘞上同（白薟藥名又力瞻切）|瀲瀲灩水溢皃或作澰|獫犬長喙也又音險|溓薄冰也|嬚女字|䭑廉也又小食也|羷羊角三觠羷也|䌞懸蠶簿也|㰈善美之名|㯬功勤之稱
i4Z虛檢險危也阻也難也虛檢切八|獫獫狁|玁上同（獫狁）|㛍㛍姱性不端良又棄葉切少氣也|譣譣詖說文息廉切問也|憸憸詖又息廉切|𩏩胡被又音杴|嶮嶮巇
A4J方斂貶損也方斂切二|𦥘說文曰傾覆也或同上（損也方斂切二）
X4R占琰颭風吹落水占琰切一
e4Z丘檢𩑳𩑳顩不平丘檢切二|嵰山高
g4Z魚檢顩𩑳顩魚檢切七|广因巖爲屋|隒山形似重甑|嬐嬐然齊也|䲓䲓鰅魚名出樂浪|嶮嵰嶮山不平|噞噞喁魚口上下皃
f4Z巨險儉約也少也饑饉也又姓出姓苑巨險切二|芡說文云鷄頭也方言曰南楚謂之鷄頭北燕謂之䓈青徐淮泗之間謂之芡
d4Z居奄檢書檢印窠封題也又檢校俗作撿撿本音斂又姓出姓苑居奄切二|瞼眼瞼
h4V於琰黶面有黑子於琰切八|𥜒𥜒禳|檿山桑|厭厭魅也又於豔切|魘睡中魘也又於協切|厴蟹腹下厴|擪持也又一牒切|酓酒味苦也
c4R而琰冉冉冉行皃又姓孔子弟子冉有而琰切十|姌長好皃也又奴簟切|苒草盛皃又荏苒猶展轉也|染染色周禮染人掌染絲帛又姓石勒時有染閔|𩃵濡也|䎃䎃弱羽也|柟木名|䣸䤔䣸味薄|𥬕竹弱之皃|媣諟也
a4R失冉陝縣名在弘農亦州名周爲二伯分陝之地即虢國之上陽也秦屬三川郡漢弘農之陝縣後魏改爲陝州失冉切八|睒暫見|閃出門皃|𧴭蕃姓亦作𧵏|覢蒼頡篇云覢覢視皃|㴸水動皃|㚒盜竊懷物|𡟨不媚
K4R丑琰諂諂諛丑琰切二|讇上同（諂諛丑琰切二）
h4Z衣儉奄忽也止也藏也取也遽也說文覆也大有餘也又姓左傳秦三良奄息衣儉切十七|𩃗雲狀|䣍國名|㭺㭺柰|閹閹閽|掩閉取也說文云斂也小上曰掩|揜說文曰自關以東謂取曰揜一曰覆也|裺衣縫緣也|晻晻晻日無光|渰雲雨皃詩云有渰淒淒|罨鳥網又於劫烏合二切|弇蓋也|𣃰掩也|媕女有心媕媕也|𤗎屋𤗎雀也|𡹮𡹮嵫山日沒處|𣄉掩光又於葉切
P4R慈染漸漸次也進也稍也事之端先覩之始也地理志有漸江今之浙江也慈染切十|𥕌𥕌㘙|蔪說文曰艸相蔪苞也|𦾶埤蒼曰麥秀皃|䟅說文進也|嚵小食又初咸切|䤔䤔䣸味薄|鏨小鑿名|螹說文曰螹離也|槧說文曰牘樸也
O4R七漸憸憸詖七漸切二|䤘醋味
N4R子冉𩟗食薄味也子冉切一
e4V謙琰脥腹下謙琰切一
Z4R時染剡縣名屬會稽時染切一
#忝
F5R他玷忝辱也他玷切五|䄼鄉名在濟北蛇丘縣|栝說文云炊竈木也|銛取也又鍤屬又音纖|悿悿弱
H5R乃玷淰水流皃乃玷切四|㜤弱也|𨸱亭名在鄭|姌纖細又音冉
E5R多忝點點畫多忝切五|玷玉瑕|𦒻老人面有黑子|㓠斫|䍄說文缺也
G5R徒玷簟竹席徒玷切六|扂閉戶|𠂼上同（閉戶）|驔驪馬黃脊|㶘㶘淊水滿|橝屋梠名又音潭
e5R苦簟嗛猿藏食處苦簟切四|歉食不飽又苦減切|慊慊恨|膁𦝫左右虛肉處
I5R力忝稴禾稀力忝切三|溓薄冰|𤬓瓜名
j5R胡忝鼸鼠名胡忝切二|㺌犬吠又胡斬切
O5R青忝憯憯悽青忝切又七感切一
d0V居黝孂竦身皃兼玷切一
D5B明忝𡕢腦蓋也俗作𡕫明忝切又亡犯切二|厸張口
#儼
g8d魚埯儼敬也說文曰昂頭也一曰好皃魚埯切七|广因巗爲屋|𠆲掩𠆲癡|㢂陖㢂|礹𥕌礹|𢇘齊𢇘|曮日行
e8d丘广欦欠崖丘广切三|𩒣𩒣醜|䇜小竹
h8d於广埯土覆於广切二|𣃳𣃳翳
#豏
j6R下斬豏豆半生也下斬切八|減減耗又古斬切|㺝犬齧物聲|喊喊聲|㺌犬吠不止|𡞣健皃|𥻇𥻇塗也|甉瓦屋
L6R徒減湛水皃又沒也安也亦姓後漢有大司農湛重徒減切又直心切三|㴴古文（水皃又沒也安也亦姓後漢有大司農湛重徒減切又直心切三）|偡偡然齊整
e6R苦減㦿牖也一曰小戶苦減切七|𢜩𢜩𢜩意不安也|歉食不飽|撖撖危|䫡面長|𣓅不安|槏牖傍柱也
d6R古斬鹼鹵也古斬切又七廉切四|鹻鹹也|減損也又姓漢有減宣|𥳒竹名出玉篇
U6R士減瀺瀺灂士減切三|嶃高峻又士咸切|嵁嵁絕山皃
I6R力減臉臉䑎羹屬也力減切二|醶醶䤘醋味
S6R側減斬周禮曰秋官掌戮掌斬側減切一
T6R初減䑎初減切二|䤘酢味
i6R火斬鬫虎聲火斬切又苦暫切二|欦笑也
V6R所斬摻擥也詩曰摻執子之袪兮所斬切四|㺑㺑㺝犬吠又山檻切|醦酢味|𧀵芟林木也
h6R乙減黯黯然傷別皃說文云深黑也乙減切一
i6R呼豏喊聲也呼豏切一
M6R女減𦊔捕魚網也女減切三|𦌫上同（捕魚網也女減切三）|淰水無波也又乃玷切
K6R丑減𠐩癡也丑減切二|旵日光照也
#檻
j7R胡黤檻闌也說文曰櫳也一曰圈胡黤切十|艦禦敵船四方施板以禦矢狀如牢|壏堅土|𥽏䊤也|㔋利也|濫泉正出也又盧暫切|𨏊網車|轞車聲|㺝惡犬吠不止也|撖姓也姓苑云今河內有之
e7R丘檻䫡長面皃丘檻切又五咸切一
V7R山檻㨻斬取山檻切二|㺑㺝㺑犬聲
h7R於檻黤青黑色於檻切二|𪒠黃𪒠人名說文曰𪒠者忘而息也
T7R初檻醶酢漿初檻切一
i7R荒檻㺖小犬吠荒檻切二|豃開險皃
U7R仕檻巉峻巉皃仕檻切一
#范
C9N防錽范姓也出南陽濟陽二望本自陶唐氏之後隋會爲晉大夫食采於范其後氏焉防錽切六|範法也常也式也前也|軓說文云車軾前也周禮曰立當前軓|笵說文云法也从竹竹簡書也|犯干也侵也僭也勝也|𧍙蜂也案禮云范則冠而蟬有緌字不從虫
D9N亡范錽馬首飾西京賦云金錽鏤錫亡范切三|𡕢腦蓋也俗作𡕩又明忝切|𢨔刃也
A9N府犯𦜒今河東謂淫腫爲𦜒府犯切一
e8d丘犯凵張口皃丘犯切二|㧄以手㧄物
B9N峯犯釩釩拂峯犯切一
K8R丑犯𠑆𠑆行丑犯切二|𨇧𨀣足望
#送
QAC蘇弄送遣也蘇弄切三|鬆𩭩鬆髮皃|凇凍凇冰也
CBO馮貢鳳爾雅曰鶠鳳其雌皇郭璞云瑞應鳥雞頭蛇頸燕頷龜背魚尾五彩色高六尺許孔演圖曰鳳爲火精說文曰神鳥也亦州在秦隴西郡地漢改雍州爲涼州魏其地沒蜀蜀平屬雍州本自白馬氏羌所居晉爲仇池國後魏置固道郡又爲南岐州又改爲鳳州馮貢切二|𠤈古文（爾雅曰鶠鳳其雌皇郭璞云瑞應鳥雞頭蛇頸燕頷龜背魚尾五彩色高六尺許孔演圖曰鳳爲火精說文曰神鳥也亦州在秦隴西郡地漢改雍州爲涼州魏其地沒蜀蜀平屬雍州本自白馬氏羌所居晉爲仇池國後魏置固道郡又爲南岐州又改爲鳳州馮貢切二）
dAC古送貢獻也薦也又姓漢有琅邪貢禹古送切十|贛賜也|𣹟水名出豫章|虹縣名在泗州今音絳|羾至也甘泉宮賦云登椽欒而羾天門|𨹁從𨹁山名又戶工切|䇨杯笿名|㔶小杯名又音感|㯯格木說文同上（小杯名又音感）|𧆐薏苡別名
IAC盧貢弄說文玩也盧貢切七|𢙱𢙱戇愚也|梇梇棟古縣名在益州|礱磨礱又音聾|哢郭云鳥吟|㢅㢅屏|㳥水名
EAC多貢涷瀑雨又水名出發鳩山多貢切又音東七|凍冰凍又音東|棟屋棟爾雅曰棟謂之桴|湩乳汁巨蒐民取牛馬湩以洗穆天子之足|㼯㼯𤮭|𩭩𩭩鬆髮皃|䍶獸名似羊一角一目出秦戲山又音東
eAC苦貢控引也告也苦貢切六|倥倥傯困皃|悾誠心又苦紅切|鞚馬鞚|空空缺又苦紅切|𤗇穿垣出文字集略
NAC作弄糉蘆葉裏米作弄切七|粽俗（蘆葉裏米作弄切七）|䁓竊視|傯倥傯|㚇斂足而飛又子紅切|鯼石首魚又子工切|緵小魚罟也又子工切
hAC烏貢瓮說文罌也烏貢切五|甕上同（說文罌也烏貢切五）|𦉥瓶也說文曰源缾也|罋上同（瓶也說文曰源缾也）|𪖵鼻塞曰𪖵
OAC千弄謥謥詷言急俗作𧩟千弄切二|憁憁恫
GAC徒弄洞空也又洞庭湖徒弄切十六|恫憁恫不得志|眮轉目|絧相通之皃|㓊冷也|峒磵深|詷謥詷|胴大腸|慟慟哭哀過也|筒簫達又音同|駧馬急走也|衕通街|迵過也說文迭也|㢥船纜所繫|㗢大歌聲出埤蒼又戶冬戶宋二切|𩐵鐘聲
FAC他貢痛病也傷也亦姓出姓苑他貢切一
LBC直眾仲中也爾雅曰中籥謂之仲亦姓風俗通云凡氏於字伯仲叔季是也湯左相有仲虺又漢複姓四氏左傳衛大夫仲叔圉魯有仲顏莊叔宋有司馬仲行寅後漢有山陽仲長統直眾切三|蟲蟲食物又音沖或作蚛|𩿀鳥名
ABO方鳳諷諷刺方鳳切二|風上同見詩（諷刺方鳳切二）
eBO去仲焪火乾物也去仲切三|䛪䛪多言也又詢問也|䠻使役也亦作㑋
DBO莫鳳㝱寐中神游說文云寐而有覺周禮以日月星辰占六㝱之吉凶一曰正㝱無所感動平安自㝱二曰愕㝱驚愕而㝱三曰思㝱覺時所思念之而㝱四曰寤㝱覺時所道之而㝱五曰喜㝱喜悅而㝱六曰懼㝱恐懼而㝱亦作夢莫鳳切五|夢上同又亡中切（寐中神游說文云寐而有覺周禮以日月星辰占六㝱之吉凶一曰正㝱無所感動平安自㝱二曰愕㝱驚愕而㝱三曰思㝱覺時所思念之而㝱四曰寤㝱覺時所道之而㝱五曰喜㝱喜悅而㝱六曰懼㝱恐懼而㝱亦作夢莫鳳切五）|瞢雲瞢澤在南郡亦作夢|鄸邑名在曹|䠢䠢𧽒疲行皃
iBO香仲𧽒䠢𧽒香仲切二|䠗跳皃又丘幼切
DAC莫弄𢄐𢄐縠蓋巾也莫弄切三|霿天氣下地不應曰霿|艨艨艟戰船又音蒙
OBC千仲趥行皃千仲切一
BBO撫鳳賵賵賻撫鳳切二|麷熬麥
PAC徂送𣀒敠𣀒不迎自來徂送切二|𠏭聚也
JBC陟仲中當也陟仲切又陟沖切二|衷又陟沖切
jAC胡貢哄唱聲胡貢切五|烘火皃|港港洞開通|鬨兵鬬也又下降切俗作𩰓|蕻草萊心長
HAC奴凍齈多涕鼻疾奴凍切二|癑痛也
XBC之仲眾多也三人爲眾又姓左傳魯大夫眾仲之仲切又音終一
YBC充仲銃銎也充仲切一
UBC仕仲㓽鍤屬仕仲切一
iAC呼貢烘火乾也呼貢切二|戇𢙱戇愚人
#宋
QCC蘇統宋州也即閼伯之商丘也微子封宋二十餘世爲齊楚魏所滅魏得其梁陳留齊得濟陰東平楚得沛梁即今郡地是也隋置宋州爾雅曰宋有孟諸之藪今爲睢陽縣地又姓取微子之所封遂爲氏出西河廣平燉煌河南扶風五望蘇統切一
NCC子宋綜織縷子宋切三|䝋牡豕|錝金毛
FCC他綜統摠也紀也又姓他綜切二|𪎽黃色
DCC莫綜雺天氣下地不應莫綜切一
jCC乎宋䃔石聲乎宋切二|㗢大聲
#用
lDC余頌用使也貨也通也以也庸也又姓漢有用蚪爲高唐令余頌切一
RDC似用頌歌也詩云吉甫作頌穆如清風又姓出何氏姓苑似用切四|誦讀誦|訟爭罪曰獄爭財曰訟|吅爭言也出文字音義又宣喧二音
CDO扶用俸俸秩扶用切四|㡝款書|縫衣縫又房容切|捀灼龜視兆也說文父容切奉也
fDO渠用共同也皆也渠用切一
ADO方用葑菰根也今江東有葑田方用切亦作湗二|封又方容切
dDO居用供設也居用切又居容切二|龏又九容切
hDO於用雍九州名雍擁也東崤西漢南商北居庸四山之所擁翳也又姓風俗通云文王子雍伯之後於用切又於容切三|灉河水決出還入爲灉又於容切|壅加土壅田
JDC竹用湩乳汁竹用切又都貢切三|堹池塘塍埂|諥言相觸也
NDC子用縱放縱說文緩也一曰舍也子用切又子容切二|瘲病也
KDC丑用蹱躘蹱行不正也丑用切二|憃愚也又丑江切
cDC而用䩸毳鞌飾而用切三|𩉪上同（毳鞌飾而用切三）|𩼅鮐魚
XDC之用種種埴也之用切又之隴切三|偅儱偅不遇皃|㼿甕屬
LDC柱用重更爲也柱用切又直容切三|緟繒縷|𨉢婦人娠也
IDC良用贚貧也良用切三|躘躘踵|儱儱偅
eDO區用恐疑也區用切三|𢖶古文（疑也區用切三）|𦶐䕞𦿆
PDC疾用從隨行也疾用切又才容切一
MDC穠用𢫨推也穠用切一
#絳
dEC古巷絳赤色又州詩譜云晉穆侯遷都於絳曾孫孝侯改爲翼翼晉之舊都後獻公又命爲絳邑秦爲河東郡後魏置東雍州周爲絳州又姓古巷切五|虹又音紅|降下也歸也落也又音缸伏也|𡲣上同（下也歸也落也又音缸伏也）|洚水流不遵道
jEC胡絳巷街巷又姓詩云巷伯胡絳切三|衖上同亦作𨜕（街巷又姓詩云巷伯胡絳切三）|鬨說文云鬬也孟子鄒與魯鬨俗作𩰓
JEC陟降戇愚也陟降切一
LEC直絳䡴衝城戰車直絳切六|憧戇憧兇頑皃又尺容切|𢤤上同（戇憧兇頑皃又尺容切）|幢后妃車幰又宅江切|撞撞鐘又直江切|艟短船名
KEC丑絳𥈄直視丑絳切二|䚎視不明也又丑江切
UEC士絳漴水所衝也士絳切一
BEC匹絳肨脹臭皃匹絳切一
TEC楚絳䎫不耕而種楚絳切一
VEC色絳淙水出皃色絳切二|㦼捍船木也
#寘
XFS支義寘止也置也廢也支義切八|忮懻忮害心說文很也|伎傷害也詩云鞫人伎忒亦作忮|觶爵受四升或作觗𧣨|伿惰也又以智切|䚳快也|㩼多也|𡽆山名
CFG毗義避違也迴也毗義切一
XFi之睡惴憂心也之睡切三|𦥻杵擊|𦦇上同（杵擊）
IFS力智詈罵詈力智切六|荔荔支樹名葉綠實赤味甘高五六丈子似石榴出廣志又音隷|離去也又力知切|㿛瘦黑又力計切|珕刀飾也又力計切|𥶾䉣𥶾
ZFS是義豉鹽豉廣志云苦李作豉是義切六|𢻃上同（鹽豉廣志云苦李作豉是義切六）|𢐂青州人云彈𢐂|鯷魚名重千斤郭璞云鮎之別名又音提音是|䩃䩃𩈭面皃出新字林|䊓黏皃
NFS子智積委積也子智切又子昔切四|㰣歐也|𧂐草名|𦎸羊相䍴𦎸
QFS斯義賜與也惠也又姓世本云齊大夫簡子賜之後斯義切六|𧀩草名|澌盡也禮注云死之言澌也|𣩠上同（盡也禮注云死之言澌也）|儩上同（盡也禮注云死之言澌也）|杫𠟼机後漢書尚書郎無被枕杫也
kFq于僞爲助也于僞切又允危切一
dFq詭僞䞈賭也詭僞切五|垝坫堂隅可致物|㩻瘦極又去奇切|攱攱戴物又居委切|𢈌毀也
BFK披義帔衣帔披義切三|秛禾租|襬衣也
AFK彼義賁卦名賁飾也亦姓漢有賁赫彼義切又肥墳奔三音七|佊衺也論語云子西佊哉|詖譣詖又慧也佞也|貱益也|陂傾也易曰無平不陂又音碑|跛偏任又波我切|藣草名又旄牛尾舞者所執又音陂
CFK平義髲頭髮也南越志云開平縣出髲平義切六|被被服也覆也書曰光被四表又平彼切寢衣也|鞁裝束鞁馬|㢰㢰弓|旇埤蒼云旌旗又衣服皃|𤿙𤿙𧛸
IFi良僞累緣坐也良僞切一
dFa居義寄寄附說文託也居義切三|䐀𠟼四䐀|徛石杠聚石以爲步渡
AFG卑義臂肱也卑義切一
fFa奇寄芰菱也奇寄切八|騎騎乘又姓燕有騎劫又音奇|鬾鬼服又音奇|輢枕輢又於綺切|䝸䝸貝四向用也|㧘積也又前智切|汥水戾|䛋謀也
OFS七賜刺針刺爾雅曰刺殺也釋名曰書姓名於奏白曰刺漢武帝初置部刺史掌奉詔察州成帝更名牧哀帝復爲刺史七賜切又七亦切十|刾俗（針刺爾雅曰刺殺也釋名曰書姓名於奏白曰刺漢武帝初置部刺史掌奉詔察州成帝更名牧哀帝復爲刺史七賜切又七亦切十）|㢀偏㢀舍也|朿木芒|㡹人相依㡹|𧧒數諫也|莿草木針也|庛周禮車人爲耒庛長尺有一寸鄭玄云耒下前曲接耜者|蛓毛蟲|䛋謀也
lFS以豉易難易也簡易也又禮云易墓非古也易謂芟除草木以豉切又以益切六|㑥相輕慢也|貤物之重次也|伿惰也|㒾㒾𠕦面衣又失智切|敡輕簡爲敡
gFa宜寄議謀也擇也評也語也宜寄切六|誼人所宜也又善也|竩上同（人所宜也又善也）|𥫃正也止也|𩈭䩃𩈭面皃出新字林|義仁義釋名曰義者宜也裁制事物使合宜也又姓漢有義縱又複姓西戎義渠爲秦所滅後因氏焉漢有光祿大夫義渠安國
BFG匹賜譬說文諭也匹賜切二|㵨蜀漢人呼水洲曰㵨
PFS疾智漬浸潤又漚也疾智切八|眥目眥又在計切|𦎸䍴𦎸|㧘說文積也一曰搣頰旁也|㱴骨也又獸死|髊髊枯骨見呂氏春秋|骴鳥鼠殘骨|胔上同又骨有𠟼也（鳥鼠殘骨）
JFS知義智知也又姓晉有智伯知義切三|𣉻古文（知也又姓晉有智伯知義切三）|潪水名
hFa於義倚侍也因也加也於義切又於蟻切三|輢車輢|陭陭氏縣在上黨又於奇切
LFi馳僞縋繩懸也馳僞切七|膇重膇病或作㾽|槌蠶槌|錘稱錘或作鎚又直危切|腄縣名在車萊|甀小口甖|硾鎮也呂氏春秋云硾之以石
YFi尺僞吹鼓吹也月令曰命樂正習吹尺僞切又尺爲切三|䶴古文（鼓吹也月令曰命樂正習吹尺僞切又尺爲切三）|𥞃䄲糶
iFa香義戲戲弄也施也謔也歇也說文曰三軍之偏也一曰兵也又姓魏志有潁川戲志才香義切二|嚱聲也
eFW去智企望也去智切六|𢺵傾也|跂垂足坐又舉足望也|𨑤避也|蚑蟲行|吱行喘息皃
hFW於賜縊自經死也於賜切三|㱲物凋死又脚手小病|螠螠女蟲案爾雅曰蜆縊女郭璞云小黑蟲赤頭喜自經死故曰縊女字俗從虫
aFS施智翅鳥翼施智切十三|翄（鳥翼施智切十三）|𦐊並上同（鳥翼施智切十三）|施易曰雲行雨施又式支切|馶馬強|啻不啻|鍦短矛|䗐爾雅曰蛄䗐強䖹郭璞云今米穀中蠹小黑蟲是也建平人呼爲䖹子|䧴鳥名本又音支|卶有大度也|𤖻几也|㒾㒾𠕦面衣|翨鳥翮又居豉切
VFS所寄屣履不躡跟孟子曰舜去天下如脫敝屣所寄切又所綺切五|灑灑埽說文汛也|𩌦靴屬|襹褷襹毛羽衣皃|曬暴也
eFm窺瑞觖望也窺瑞切又音決一
hFq於僞餧餧飯也於僞切四|萎萎牛|䍴羊相䍴𦎸又音委|𣨙禮記注益州有鹿𣨙
gFq危睡僞假也欺也詐也危睡切一
iFq況僞毀男八歲女七歲而毀齒況僞切一
hFm於避恚怒恨也於避切二|㜇說文曰不說也
ZFi是僞睡眠睡是僞切四|瑞祥瑞也符也應也說文曰以玉爲信又姓出姓苑|𨿠鴟鳥別名又音垂|䅜小積
dFW居企馶強也居企切二|翨鳥翮說文云鳥之彊羽猛者周禮翨氏掌攻猛鳥又音翅
cFi而瑞䄲內也而瑞切一
YFS充豉卶充豉切有大慶也一
QFi思累䅗禾四把也思累切二|瀡滑也
JFi竹恚娷竹恚切飢聲二|諈諈諉累也
lFi以睡瓗玉名以睡切四|纗絃中絕也|䜜䜜恨也言|贀贀㛪也
MFi女恚諉諈諉累也女恚切三|㨅內也又姓|㢻㢰㢻弓皃
dFm規恚瞡規恚切視也一
SFS爭義𧙁爭義切衣不展也二|𤿙𤿙皺皮不展也
iFm呼恚孈呼恚切過也一
eFa卿義㞆跛也卿義切二|掎跛也說文曰偏引也又居綺切
#至
XGS脂利至到也說文曰鳥飛从高下至地也篆文象形脂利切十三|摯國名亦持也又姓左傳周禮有摯荒|贄執贄也周禮云以禽作六贄以等諸臣孤執皮帛卿執羔大夫執鴈士執雉庶人執鶩工商執鷄本亦作摯|鷙擊鳥|礩柱下石又音質|䥍田器說文曰羊箠也端有鐵又先列切|鴲雀鷇|懥怒也|䲀魚名|𩊝杠絲名亦作𩊞|𩊞上同（杠絲名亦作𩊞）|𢄢禮巾|𡠗至也
kGq于愧位正也列也莅也中庭之左右謂之位于愧切一
DGK明祕郿縣名在岐州明祕切又音眉十|媚嫵媚|魅魑魅|鬽上同（魑魅）|篃竹名|蝞蝞似蝦寄生龜殼中食之益人顏色|嚜嚜杘小兒多詐獪|䉋笋冬生名|煝焅熱|娓從也又音眉音尾
RGi徐醉遂達也進也成也安也止也往也從志也又州名又姓出姓苑徐醉切二十四|彗帚也一曰妖星又音歲又囚芮切|隧埏隧墓道也俗作𡑞|襚贈襚|旞羽繫旌上|璲玉也詩曰鞙鞙佩璲鄭玄謂以瑞玉爲佩|檖陽檖木名一曰赤羅子似梨小酢可食詩云隰有樹檖|𣔾上同（陽檖木名一曰赤羅子似梨小酢可食詩云隰有樹檖）|𤓫說文曰塞上亭守㷭火者|𤎩上同（說文曰塞上亭守㷭火者）|燧上同又論語云鑽燧改火（說文曰塞上亭守㷭火者）|澻田閒小溝|䡵輰䡵車也|鐆陽鐆可取火於日中|鐩上同（陽鐆可取火於日中）|穟禾秀說文曰禾穗之皃|𦼯上同（禾秀說文曰禾穗之皃）|蔧王蔧草|𦂁佩玉緣也|㒸從意也|𥝩禾稷成皃說文曰禾成秀人所收从爪禾|穗上同（禾稷成皃說文曰禾成秀人所收从爪禾）|䉌籧篨|𩏚囊組名或作韢
NGi將遂醉說文曰醉卒也各卒其度量不至於亂也將遂切二|檇左氏傳曰越敗吳於檇李又遵爲切
QGi雖遂邃深也遠也雖遂切九|祟禍祟|誶言也詩云歌以誶止|粹易曰純粹精也|睟視皃又潤澤皃|𠭥說文云楚人謂卜問吉凶曰𠭥|賥貨也|譢讓也諫也告也問也|𢢝意思深也
IGi力遂類善也法也等也種也說文云種類相似唯犬爲甚从犬頪力遂切九|淚涕淚俗作㴃|瓃王器又力追切|𦝭血祭說文音律|垒垒塹也出字林|蘱爾雅曰蘱薡蕫郭璞云似蒲而細|纍係也|䇐臨也又力地切|禷祭名
AGK兵媚祕密也神也視也勞也又姓西秦錄有僕射祕宜俗作秘兵媚切十五|毖告也慎也一曰遠也|閟閟閉|轡馬轡說文作𦆕|柲戟柄左傳有鏚柲|鉍上同（戟柄左傳有鏚柲）|泌泉皃|鄪邑名在魯|費上同（邑名在魯）|䀣直視也|䪐弓絏|𠨘好皃|粊惡米又魯東郊地名說文作䉾|䉾上同（惡米又魯東郊地名說文作䉾）|𡛗女子
fGq求位匱竭也乏也說文曰匣也又姓何氏姓苑云今廬江人求位切十一|蕢草器也|臾上同今作𠀐貴𠳋皆從之（草器也）|饋餉也|餽上同（餉也）|𦆠織餘|櫃櫃篋|樻木名又腫節名又口愧切|鞼繡韋也盾綴革也亦作𩏡|簣土籠|𩌃馬韁
BGK匹備濞水聲匹備切六|嚊喘聲|䑄盛肥|㿙氣滿|𦤢敗皃又魚名|淠水名在汝南
CGK平祕備備具也防也咸也皆也副也慎也成也又姓風俗通云宋封人備之後平祕切十七|俻俗（備具也防也咸也皆也副也慎也成也又姓風俗通云宋封人備之後平祕切十七）|𤰇說文具也|𤰈古文（說文具也）|𡚤怒也又一曰迫也|奰上同見經典省（怒也又一曰迫也）|䑄壯大|糒糗也|犕牛具齒|絥說文曰車絥也|鞴上同（說文曰車絥也）|𩎓上同（說文曰車絥也）|贔贔屓壯士作力皃|𣖾木名出蜀其穗可食|㣁以筋帖弓|䨽鳥如梟又孚尾切|㸢牑模
dGq俱位媿慙媿俱位切六|愧（慙媿俱位切六）|聭（慙媿俱位切六）|謉並上同（慙媿俱位切六）|騩馬色淺黑|䁛大視
VGi所類帥將帥也曹憲文字指歸云佩巾也所類切又所律切二|率鳥網也又所律切
eGq丘愧喟大息也丘愧切又苦拜切九|嘳上同（大息也丘愧切又苦拜切九）|樻樻梧椐木腫節可爲杖|䯣膝加地也|䰎髻屈髮也|腃筋節急也|䙡紐也俗又作𧝷|尯㝿也|𨌗地名在洛陽
iGq許位豷豕息也許位切二|燹火也字統音銑
ZGS常利嗜嗜慾常利切六|𩝙（嗜慾常利切六）|𨢍並上同（嗜慾常利切六）|視看視又音是|眎（看視又音是）|眡並古文（看視又音是）
IGS力至利吉也說文銛也亦州名華陽國志昔蜀王封弟於漢中号曰苴侯因命其邑曰葭萌秦滅蜀置巴蜀二郡先主改葭萌爲漢壽屬梓潼郡晉爲晉壽南齊分置東晉壽郡於烏奴今州城是又於其郡置西益州梁改爲黎州元帝又改爲利州又舍利獸名亦姓風俗通云漢有利乾爲中山相力至切八|𥝢古文（吉也說文銛也亦州名華陽國志昔蜀王封弟於漢中号曰苴侯因命其邑曰葭萌秦滅蜀置巴蜀二郡先主改葭萌爲漢壽屬梓潼郡晉爲晉壽南齊分置東晉壽郡於烏奴今州城是又於其郡置西益州梁改爲黎州元帝又改爲利州又舍利獸名亦姓風俗通云漢有利乾爲中山相力至切八）|䬆烈風說文音栗|莅臨也亦作涖|涖涖涖水聲|痢病也|䚕求也|䇐臨也
MGS女利膩肥膩女利切四|𦡸上同出道書（肥膩女利切四）|䁊目深皃又一活切|䣵重釀酒也
BGG匹寐屁氣下洩也匹寐切二|䊧上同（氣下洩也匹寐切二）
gGa魚器劓割鼻漢文帝除𠟼刑劓者笞三百魚器切一
JGS陟利致至也說文曰送詣也陟利切十五|懫止也|疐礙不行也又頓也詩曰載疐其尾疐跲也|𢷟（礙不行也又頓也詩曰載疐其尾疐跲也）|𨆫並俗（礙不行也又頓也詩曰載疐其尾疐跲也）|躓礙也頓也說文跲也|𨎌車前重也|輊上同（車前重也）|騺馬腳屈也|䞃賑也亦貝也|𣱐仆也又於進切|懥怒也恨也|㨖刺也又劫財也|質交質又物相贅又之日切|駤𩧅駤
eGW詰利棄說文捐也詰利切五|弃古文（說文捐也詰利切五）|夡夡多|㞓身欹坐一曰尻|蟿蟿螽蟲名
LGS直利緻密也直利切十二|稚幼稚亦小也晚也又姓史記云湯後因國爲姓|遟待也又直尸切|稺晚禾|𦃘刺𦃘針縫也|𩹈魚名|治理也又直之切|𠊷會物|𢴧當也對也|謘語謘|𩋩履𩋩底也|𦥐上同（履𩋩底也）
DGG彌二寐寢也臥也息也彌二切二|媢夫妬婦又音冒
KGS丑利杘籰柄也又嚜杘多詐丑利切八|𣐉上同（籰柄也又嚜杘多詐丑利切八）|誺不知|𦥊叨𦥊也|訵陰知亦作呬|𡳭分蠶|跮跮踱乍前乍卻|𧩼笑也
dGa几利冀九州名爾雅曰兩河閒曰冀州續漢書安平國故信都郡光武師自薊南行太守任光開門出迎今州城是又姓左傳晉大夫冀芮几利切八|兾上同見經典省（九州名爾雅曰兩河閒曰冀州續漢書安平國故信都郡光武師自薊南行太守任光開門出迎今州城是又姓左傳晉大夫冀芮几利切八）|覬覬覦希望|穊稠也|驥騏驥|𩥉上同（騏驥）|洎𠟼汁又音臮|懻強力皃
fGa具冀臮眾與詞也具冀切七|暨及也至也与也|鱀魚名鼻在頟上又音忌|洎潤也及也|垍堅土|塈息也又仰塗也|𣽍水名
fGm其季悸心動也其季切五|𠊾左右兩視也|猤壯勇皃|痵病中恐也|𡬄熟寐也
OGi七醉翠字林云青羽雀又翠微亦姓急就章有翠鴛鴦七醉切三|濢下濕|臎鳥尾上𠟼
cGS而至二說文云地之數也而至切五|弍古文（說文云地之數也而至切五）|貳副也亦攜貳變異也疑也敵也又姓後秦錄有後魏平陽太守貳塵|樲酸棗|髶髮飾
NGS資四恣縱也資四切二|𣣌說文曰戰見血曰傷亂或爲惛死而復生爲𣣌又七利切
OGS七四次次第也亦三宿曰次又姓呂氏春秋荊有勇士次非七四切九|䳐鳥名似梟人面山居所經國國必亡出山海經|佽佽飛漢武官名又助也利也代也遞也及也|䰍以漆塗器|絘績所未緝者|𩾔鳥名|𧊒蟲似蜘蛛|𣣌又資四切義見上文|䯸髮也
hGa乙冀懿美也大也溫柔聖克也又姓後秦錄有吏部郎懿橫秦錄有吏部熱懿橫乙冀切七|饐食傷熟也|㙪陰皃|欭喑欭歎也|鷧鷧鸕鶿鳥|撎拜舉手左傳注云若今之揖|亄貪也
QGS息利四說文曰陰數也象四分之形息利切十四|亖籀文（說文曰陰數也象四分之形息利切十四）|𦉭古文（說文曰陰數也象四分之形息利切十四）|肆陳也恣也極也放也說文从隶極陳也又姓何氏姓苑有漁陽太守肆敏|𩬶上同（陳也恣也極也放也說文从隶極陳也又姓何氏姓苑有漁陽太守肆敏）|柶角匕大喪用之|泗水名在魯說文曰受沛水東入淮又涕泗也|牭牛四歲|𧳙爾雅云狸子𧳙|㣈鼠名說文曰㣇屬㣇羊至切俗作𨽼|駟一乘四馬|𦞤腦蓋|蕼堇也說文曰赤蕼也|肂埋棺坎下
eGa去冀器器皿史記曰舜作什器於壽丘又姓出姓苑去冀切一
dGm居悸季昆季也又少也小稱也亦姓左傳魯有季友又漢複姓四氏晉有唐邑大夫季連齊有鬼方氏第六子名季連其後氏焉晉有祁邑大夫季瓜忽宋有季隨逢世本云周有八士季隨季騧之後騧或作瓜又有魯大夫齊季窺昔齊公子季奔于楚楚遂号爲齊季氏居悸切二|瞡視皃
CGG毗至鼻說文曰引气自畀也毗至切十|比近也又阿黨也又房脂必履扶必三切|枇細櫛|𤹝足氣不至|坒地相次比也亦音邲|襣司馬相如著犢襣裩|䃾以豚祠司命也|䫁首子|䑄盛也|芘草名
iGm香季䁤恚視也香季切三|婎醜也又許葵切|睢恣睢暴戾又許葵切
AGG必至痹腳冷濕病必至切六|畀与也|庇庇廕|𦸣鼠莞可爲席|䃾以豚祠司命也|比近也併也
PGi秦醉萃集也聚也秦醉切六|顇顦顇|悴憔悴憂愁|㱖止㱖|䆊稻禾黏也|瘁病也
GGS徒四地土地說文曰元气初分輕清陽爲天重濁陰爲地萬物所陳𠛱也元命包曰地者易也言養萬物懷任交易變化含吐應節故其立字土力於一者爲地又虜複姓有地連氏地倫氏徒四切二|墬籀文（土地說文曰元气初分輕清陽爲天重濁陰爲地萬物所陳𠛱也元命包曰地者易也言養萬物懷任交易變化含吐應節故其立字土力於一者爲地又虜複姓有地連氏地倫氏徒四切二）
iGa虛器齂鼻息也虛器切六|㕧呻也又火尸切|屓贔屓|呬息也又丑致切陰知也|𤡬夏后氏有澆𤡬寒浞子名|䨳說文云見雨而止息曰䨳
lGS羊至肄習也嫩條也羊至切八|殔釋名曰假葬於道曰殔說文云瘞也|㡼倉也|貤重物次第|勩勞也|隶本也及也又音代|㣇說文曰脩豪獸一曰河內名豕也又徒計切爾雅作貄|𥿫重多
bGS神至示垂示神至切五|諡易名又申也說文作謚|謚上同又音益（易名又申也說文作謚）|眎呈也|貤重物次第
PGS疾二自從也用也由也率也疾二切二|嫉妬也又音疾
LGi直類墜落也直類切三|懟怨也|鎚好銅半熟
YGi尺類出尺類切又昌律切一
lGi以醉遺贈也以醉切又音惟七|𤀷𤀷清侯出漢書王子侯表|𢣘忘也出廣雅|蜼爾雅曰蜼仰鼻而長尾蜼似獮猴鼻露向上尾長數尺末有歧雨即自縣於樹以尾塞鼻又余救切|瞶目疾|𧔥蜰𧔥|䗽蛘䗽蟲名
iGm火季侐靜也詩云閟宮有侐火季切又火逼切一
JGi追萃轛車橫軨追萃切一
YGS充自痓惡也充自切一
aGS矢利屍似皴皃也矢利切二|詄詄志
TGi楚愧㿷粟體楚愧切一
aGi釋類㽷病皃釋類切二|𥤼方言云深也趙魏閒語
#志
XHS職吏志意慕也詩云在心爲志爾雅曰骨鏃不翦羽謂之志職吏切七|娡有莘氏之女𩨬娶之謂之女娡|䓌遠䓌|誌記誌|痣黑子|織織文錦綺屬又音職|識標識見禮本音式
LHS直吏值持也措也捨也當也直吏切五|植種也又巿力切|治理也又丈之切|㨁㨁投|𠍜或也
RHS祥吏寺寺者司也官之所止有九寺釋名曰寺嗣也治事者相嗣續於其內又漢西域白馬駝經來初止於鴻臚寺遂取寺名剏置白馬寺祥吏切五|嗣繼也又姓風俗通云衛嗣君後|孠古文（繼也又姓風俗通云衛嗣君後）|飤食也|飼上同（食也）
OHS七吏蛓蛓毛蟲有毒七吏切四|蚝（蛓毛蟲有毒七吏切四）|螆（蛓毛蟲有毒七吏切四）|𧉠並上同（蛓毛蟲有毒七吏切四）
QHS相吏笥篋也圓曰簞方曰笥竹器也相吏切四|伺伺候也察也|思念也又音司|覗覗覰也
aHS式吏試用也式吏切四|弑大逆亦作殺|幟旗幟又音熾|僿史記云小人以僿
SHS側吏胾大臠也側吏切六|椔木立死亦作檣|事事刃又作剚倳|剚上同（事刃又作剚倳）|倳上同又置也（事刃又作剚倳）|鶅東方雉名又音甾
IHS力置吏說文曰治人者也力置切二|𢟤憂也
PHS疾置字春秋說題辝曰字者飾也說文乳也又愛也疾置切六|牸牝牛|孳孳尾乳化曰孳交接曰尾|茡爾雅曰茡麻母郭璞云苴麻成子者|芓上同（爾雅曰茡麻母郭璞云苴麻成子者）|孖雙生子又音咨
KHS丑吏眙直住視丑吏切五|佁佁儗不前|䰡癘鬼|𦥊忿戾|誺不知
cHS仍吏餌食也說文粉餅也仍吏切十六|𩱓上同（食也說文粉餅也仍吏切十六）|珥耳飾|衈開刑書殺雞血祭名周禮注云割牲耳血及毛祭以爲刉衈|毦氅毦羽毛飾也|咡口吻|刵截耳|佴次也|誀誘也|洱水名|䎶以牲告神神欲聽曰䎶也|㛅女字|䏪筋腱|䣵重釀|眲耳目不相信也|𦖢聽音不敢言也
VHS疎吏駛疾也疎吏切七|使又色里切|𣳪水名在河南|𧳅郭璞曰今江東呼貉爲𧲱𧳅|𩰢烈也|𨽄山阜突也|𥥥穴也
THS初吏廁說文圊也釋名曰廁雜也言人雜廁其上也又閒也次也初吏切一
lHS羊吏異奇也說文分也羊吏切七|异异哉歎也退也舉也|潩水名在河南密縣出文字音義|食人名漢有酈食其又音蝕|已過事語辝又去也弃也成也|䔬連翹草名|廙恭也敬也
JHS陟吏置安置也驛也設也說文赦也陟吏切二|𢐂青州呼彈弓
ZHS時吏侍近也從也承也時吏切三|蒔種蒔|秲上同（種蒔）
UHS鉏吏事使也立也由也鉏吏切又側吏切二|𩛌玉篇云嗜食
fHe渠記忌忌諱又畏也敬也止也憎惡也亦姓周公忌父之後出風俗通渠記切十三|邔古縣名在襄陽|惎教也一曰謀也說文毒也|䋟連針|鱀魚名又音臮|鵋鵋䳢鵂鶹鳥今之角鴟|𧳙狸子也又音四|誋告也信也說文誡也|諅志也說文忌也周書曰上不諅于凶德|梞梞柎|𢍁舉也說文音其|帺繫也又音其|𥭜竹名
YHS昌志熾盛也昌志切八|饎方言云熟食也說文云酒食也|𩜮說文同上（方言云熟食也說文云酒食也）|糦大祭亦稷也說文同上（說文同上）|幟又音試音志|𡑠赤土|哆哆聲|埴黏土
hHe於記意志也又姓於記切四|鷾鷾鴯玄鳥也出莊子|亄貪也又音乙|䵝深黑
dHe居吏記記志也說文疏也居吏切一
iHe許記憙好也許記切二|嬉可嬉美姿顏也又音熙
gHe魚記䰯恐也魚記切六|豙豕怒毛豎也出說文|㘈唭㘈無聞見也|譺啁譺|㽈大甖|儗佁儗不前
eHe去吏亟數也遽也去吏切又紀力切三|唭唭㘈無聞見也|䀈䀈居獸名似蝟而赤尾
#未
DIO無沸未辰名爾雅曰太歲在未曰協洽無沸切八|味五味酸醎甘苦辛周禮瘍醫以酸養骨以辛養筋以醎養脉以苦養氣以甘養𠟼以滑養竅|菋五味子藥名五行之精|𩑵面前|䊊饘也亦作𥹹|沬水名|鮇魚名|𡶎山名
dIu居胃貴尊也高也釋名曰貴歸也物所歸仰也說文作䝿亦姓出自陸終之後風俗通有貴遷爲廬江太守居胃切三|瞶極視|𠐽使也
kIu于貴胃腸胃說文作𦞅穀府也于貴切十七|謂言也告也說文報也|㥜怫㥜不安也|媦楚人呼妹公羊傳曰楚王之妻媦|𦩝運船|緯經緯又姓|彙類也說文作𢑷蟲也似豪豬而小爾雅曰彙毛刺是也|蝟說文同上（類也說文作𢑷蟲也似豪豬而小爾雅曰彙毛刺是也）|渭水名亦州名書曰終南敦物至于鳥鼠鳥鼠山名渭所出也秦伐義渠始置隴西郡後魏莊帝置渭州因水爲名也|煟火光|𩹂魚名山海經曰樂游之山桃水多𩹂魚似蛇而四足|𨾂獸似鼠|緭緭繒也|𢍚草木𢍚孛也|𦳢草名|䬑大風|圍繞也又音韋
gIu魚貴魏魏闕又州名夏觀扈之國春秋時晉地秦爲東郡隋爲武陽郡武德初平竇建德改置魏州亦姓本自周武王母弟受封於畢至畢萬仕晉封魏城後因氏焉出鉅鹿任城二望魚貴切二|犩犪牛𠟼數千斤又魚歸切
AIO方味沸詩曰觱沸檻泉箋云觱沸者謂泉涌出皃方味切十一|疿熱生小瘡|芾毛萇詩傳曰蔽芾小皃|茀上同（毛萇詩傳曰蔽芾小皃）|誹謗人又音非|鯡魚子|㹃覆耕|𩰾湯𩰾|𧙂蔽膝|䛍言急|䟛行疾
BIO芳未費耗也惠也芳未切又房未冰備二切六|髴髣髴|靅靉靅雲布狀也|𣙿木名|昲日光又物乾也|䊧失氣
eIu丘畏𥽂細米丘畏切三|䙡䙡紐|𧝷俗（䙡紐）
hIu於胃尉候也說文作㷉云从上案下也从𡰥又持火所以申繒也通俗文曰火斗曰尉俗作熨又尉氏縣鄭大夫尉氏邑也亦云鄭之別獄又姓左傳鄭大夫尉止於胃切又紆物切十二|㷉出說文|熨俗見上注（出說文）|慰安慰|畏畏懼|罻罻網|犚牛也|蔚茺蔚|螱飛蟻|𧕈上同（飛蟻）|褽衣袵也|䲁魚名
iIu許貴諱說文誋也許貴切四|卉草摠名詩曰卉木萋萋又音虺|芔古文（草摠名詩曰卉木萋萋又音虺）|泋水波汶也
CIO扶沸𥝋獸名說文曰周成王時州靡國獻𥝋人身反踵自笑笑即上脣掩其目食人北方謂之土螻爾雅曰狒狒如人被髮迅走一名梟羊俗謂之山都今交州南康山中有之郭璞讚云狒狒怪獸披髮握竹獲人則笑脣蔽其目終乃號咷反爲我戮扶沸切二十四|𦦔（獸名說文曰周成王時州靡國獻𥝋人身反踵自笑笑即上脣掩其目食人北方謂之土螻爾雅曰狒狒如人被髮迅走一名梟羊俗謂之山都今交州南康山中有之郭璞讚云狒狒怪獸披髮握竹獲人則笑脣蔽其目終乃號咷反爲我戮扶沸切二十四）|狒並上同（獸名說文曰周成王時州靡國獻𥝋人身反踵自笑笑即上脣掩其目食人北方謂之土螻爾雅曰狒狒如人被髮迅走一名梟羊俗謂之山都今交州南康山中有之郭璞讚云狒狒怪獸披髮握竹獲人則笑脣蔽其目終乃號咷反爲我戮扶沸切二十四）|㵒㵒渭水溢|腓又音肥|怫怫㥜又扶物切|菲菜可食又霏斐二音|屝草屩黃帝臣於則所造也|蜚蜚盧蟲也一名蜰即負盤臭蟲也又獸名山海經曰蜚如牛白首一目蛇尾行水則竭行草則枯見則有兵役郭璞讚云蜚之爲名體似無害所經枯竭甚於鴆厲萬物攸懼思尒遐逝|𧕿上同（蜚盧蟲也一名蜰即負盤臭蟲也又獸名山海經曰蜚如牛白首一目蛇尾行水則竭行草則枯見則有兵役郭璞讚云蜚之爲名體似無害所經枯竭甚於鴆厲萬物攸懼思尒遐逝）|䨾隱也陋也|翡赤羽雀也|𡌦塵也|萉枲屬|𩇪𩇪隱|痱熱瘡|䠊刖足亦作剕|㔗壯勇之皃|䆏稻不黏也|費姓也夏禹之後出江夏後漢汝南費長房孫盛蜀譜云益州諸費有名位者多又後魏書費連氏後改爲費氏|蜰蜰𧔥神蛇|𥄱目不明或作䀟|黂爾雅曰黂枲實禮曰苴麻之有黂又音肥|蟦𧓉螬蟲也
dIe居豙既已也盡也又姓吳王夫既之後居豙切七|暨諸暨縣在越州又其冀切|禨福祥|溉溉灌又古代切|𣢆幸也不便言也|旡飲食逆氣不得息也|蔇說文曰艸多皃
gIe魚既毅果敢也魚既切七|𢖫怒也|豙豕怒毛豎也|𧅙說文曰煎茱萸也|藙上同（說文曰煎茱萸也）|顡說文曰癡顡不聰明也|䉨竹名
eIe去既氣氣息也去既切說文本音欷五|炁同上出道書（氣息也去既切說文本音欷五）|气与人物也說文曰雲气也今作乞又去訖切|盵姓也出纂文|䀈䀈居獸似蝟尾赤也
iIe許既欷歔欷許既切十八|唏啼也|塈仰塗|愾大息也又苦愛切|氣說文曰饋客芻米春秋傳曰齊人來氣諸侯|餼（說文曰饋客芻米春秋傳曰齊人來氣諸侯）|䊠並上同見說文（說文曰饋客芻米春秋傳曰齊人來氣諸侯）|鎎怒戰|𢟪息也|熂燹火|黖黖菲黑也|霼靉霼雲狀|摡拭也|䀈獸名又音氣|𧱲豕息|䮎馬走|犔牛病|忥靜也說文曰癡皃
fIe其既䤒秫酒名其既切二|幾未已又音蟣音機
hIe於既衣衣著於既切又音依一
#御
gJe牛倨御理也侍待也進也使也又姓左傳有大夫御叔牛倨切三|馭使馬也|語說也告也又魚巨切
IJS良倨慮思也又姓良倨切九|勴助也|𥶌舟中簀𥶌見方言|𠣊助也導也|鑢錯也|櫖林櫖山林又山櫐也|𩥆傳馬|𡾅山名|𦊼網𦊼
dJe居御據依也持也引也案也亦姓出姓苑居御切十|鋸刀鋸古史考曰孟莊子作鋸|倨倨傲|踞蹲又踑踞大坐|椐靈壽木名又居祛二音|鐻樂器形以夾鐘削木爲之出埤蒼說文与虡同|澽乾水又音遽|𧣻角似雞距|䱟魚名|豦獸大如狗似猴多𩓾好奮迅其頭能投石擲人出建平山又音渠
OJS七慮覰伺視也七慮切六|䁦上同（伺視也七慮切六）|刞耕土起亦作耝|坥螾場又七余切|䏣蠅䏣又七余切|蜡周禮有蜡氏又音乍
eJe丘倨㰦欠去丘倨切九|去離也又卻呂切|麮麥汁|呿張口皃|鼁鼁𪓰似蝦蟆居陸地|胠脅也又去魚切|㧁閉也又口荅切|䒧草名|𩿟鳥名
ZJS常恕署書也厂解署部署也常恕切四|藷藷藇又音諸|薯薯蕷俗（藷藇又音諸）|曙曉也
aJS商署恕仁恕商署切四|庶眾也冀也侈也幸也又庶幾也亦姓|樜木名|㵂水名
JJS陟慮著明也處也立也補也成也定也陟慮切又張略長略二切二|箸上同（明也處也立也補也成也定也陟慮切又張略長略二切二）
XJS章恕䬡飛舉也章恕切九|翥上同（飛舉也章恕切九）|𤳯筐𤳯|䭖犬糜又豕食|䘄蟲名爾雅云翥醜罅剖母背而生或作䘄|庶周禮有庶氏掌除毒蟲又音恕|𤳐畚也|𡻠番山|㫂斫也
VJS所去疏記也亦作疎所去切三|捒裝捒又色句切|㫹明也
hJe依倨飫飽也厭也賜也說文本作𩜈燕食也依倨切十|𩜏上同（飽也厭也賜也說文本作𩜈燕食也依倨切十）|瘀血瘀|鄔縣名在太原又音塢|醧私醼|𢮁𢮁擊|淤濁水中泥也又音於|菸臭草|棜無足樽也|𡫽假寐也
LJS遟倨箸匙箸遟倨切四|筯上同（匙箸遟倨切四）|㾻痴㾻不達又丑御切|除去也見詩
fJe其據遽急也疾也亦戰慄也窘也卒也其據切五|勮勤務也又懼也疾也|詎又其呂切|醵斂錢飲酒又音渠又其虐切|澽乾澽
QJS息據絮說文曰敝緜也息據切又抽據尼恕二切一
UJS牀據助佐也益也牀據切三|耡又士魚切|麆爾雅云麕牡麌牝麋其子麆
NJS將預怚憍也將預切二|沮沮洳漸濕亦作𣶝
SJS莊助詛呪詛亦作𥛜莊助切二|阻馬阻蹄又莊所切
cJS人恕洳沮洳說文作𣹤漸濕也人恕切三|茹飯牛又菜茹也|如又尒諸切
lJS羊洳豫逸也備先也辨也早也安也猒也敘也又州名尚書禹貢曰荊河爲豫州釋名云豫州在九州中京師東常安豫也秦爲三川郡漢爲河南郡後魏置司州又改爲豫州亦獸名象屬又姓晉有豫讓羊洳切二十|預安也先也廁也樂也佚也猒也怠也|譽稱美也又姓晉書有平原太守譽粹又音余|礜礜石藥名蠶食之肥鼠食之死|𩦡馬疾行皃|輿車輿又方輿縣名又音余|鸒爾雅曰鸒斯鵯鶋郭璞曰雅烏也小而多羣腹下白|悆悅也|𪋮大鹿|𣝑舁食者或作轝|藇藷藇又音序|蕷薯蕷俗（藷藇又音序）|穥穥穥黍稷美也|𡱣履屬|忬安也|歟歎也又音余|悇憂懼|與參與也|澦灩澦水名|𡒊高平
iJe許御噓吹噓許御切又音虛一
MJS尼據女以女妻人也尼據切二|絮姓也漢有絮舜
TJS瘡據楚楚利又木名出歷山瘡據切又瘡所切二|儊儊不滑也
YJS昌據處處所也昌據切又音杵二|䖏俗（處所也昌據切又音杵二）
KJS抽據絮和調食也抽據切三|悇憛悇憂也|㾻痴㾻不達
RJS徐預𡱣履屬徐預切一
#遇
gKu牛具遇不期而會又姓何氏姓苑云東莞人風俗通云漢有遇沖爲河內太守牛具切七|寓寄也|庽上同（寄也）|媀媀妬也女子妬男子|𤸒疣病|禺獸名毋猴屬也又音愚|䴁䴁鼠鳥名
hKu衣遇嫗老嫗也衣遇切三|蓲荎也|饇飽饇
ZKi常句樹木摠名也立也又姓姓苑云今江東有之後魏官氏志樹洛干氏後改爲樹氏常句切五|𦒸老人行皃|澍時雨又音注|尌立也又音住|𠊪上同（立也又音住）
LKi持遇住止也又姓出姓苑持遇切三|牏築垣短板|逗姓也出何承天纂文又音豆
CKO符遇附寄附又姓晉書有附都符遇切十一|坿白坿說文益也|祔祭名亦合葬也|賻贈死也助也|駙駙馬都尉官名漢武帝置掌駙馬晉尚公主者並加之駙副馬也一曰近也又疾也|鮒魚名|䠵䠵䠼著衣也|蚹蚹蛇腹下橫鱗可行者又爾雅曰蚹蠃螔蝓即蝸牛也|跗古之醫人俞跗出史記|𠪻小巵有蓋|胕肺胕心膂
XKi之戍注灌注也又注記也之戍切十六|疰疰病|罜小罟|㹥黃犬黑頭|鑄鎔鑄又姓堯後以國爲氏|馵馬後左足白|註註射出埤蒼又音駐|炷燈炷|澍時雨又殊遇切|霔霖霔|㺛鄉名在河南|䎷䎷𩕏又音赴|祩詛也祝也|𠴦邑名|䪒皮袴|蛀蛀蟲
dKu九遇屨履屬方言曰履自關而西謂之屨九遇切十|句章句又音溝音構|蒟蒟醬又音矩|絇絲絇|瞿視皃又音衢|𥉁目驚𥉁𥉁然出埤蒼|怐恐怐|䈮竹名|邭邑名|䀠左右視也
iKu香句昫日光說文曰日出溫也北地有昫衍縣香句切六|煦上同（日光說文曰日出溫也北地有昫衍縣香句切六）|酗醉怒亦作䣱|呴吐沫|姁姁嫗|𧏺幺蠶
aKi傷遇戍遏也舍也從人荷戈也傷遇切八|腧五藏腧也|輸送也又式朱切|𧼯馬𧼯前也|䩱刀䩙|隃鴈門|䠼䠵䠼|㲓㲓毛
lKi羊戍裕饒也道也容也寬也羊戍切七|䘱上同（饒也道也容也寬也羊戍切七）|覦覬覦又音俞|諭譬諭也諫也又姓東晉有諭歸撰西河記二卷何承天云喻音樹豫章人|喻上同（譬諭也諫也又姓東晉有諭歸撰西河記二卷何承天云喻音樹豫章人）|籲呼也又和也見書傳|𠕦面衣
cKi而遇孺稚也爾雅曰屬也說文曰乳子也一曰輸孺尚小也而遇切四|𡦗俗（稚也爾雅曰屬也說文曰乳子也一曰輸孺尚小也而遇切四）|擩擩莝手進物也|㹘牛莖
BKO芳遇赴奔赴爾雅曰至也說文曰趨也芳遇切十一|𠓗急疾也|䞯上同（急疾也）|䎷䎷𩕏也又音注|豧豕聲|簠簠簋又甫于方武二切|訃告喪也又至也|䞳僵也說文音匐|仆僵說文曰頓也|䟔說文曰趣越皃|婏兔子曰婏又孚万切
DKO亡遇務事務也又強也遽也趣也又姓列仙傳有務光亡遇切十四|婺婺女星名|霧元命包曰陰陽亂爲霧爾雅曰地氣發天不應曰霧釋名曰霧冒也氣蒙冒覆地之物也|霚上同見說文（元命包曰陰陽亂爲霧爾雅曰地氣發天不應曰霧釋名曰霧冒也氣蒙冒覆地之物也）|騖馳也奔也驅也|𦎦六月生羔|䨁雞雛|蝥蠡名亦作𧐙|𨂣長跪又拜|𦆞繅淹餘也|㡔髮巾|嵍丘也|敄說文強也|鶩鳥名又音目
NKi子句緅青赤色子句切又子侯切二|足足添物也本音入聲
fKu其遇懼怖懼其遇切四|具備也辦也又姓左傳有具丙|埧堤塘|臞瘦又音瞿
kKu王遇芋一名蹲鴟廣志云蜀漢以芋爲資凡十四等有君子芋大如斗魁如杵𥰠其車轂鋸子旁巨青邊四等多子王遇切五|雨詩曰雨雪其霶又音禹|羽鳥翅也又五聲宮商角徵羽晉書樂志云宮中也中和之道無往而不理商強也謂金性之堅強角觸也象諸陽氣觸動而生徵止也言物盛則止羽舒也陽氣將復萬物孳育而舒生又音禹|䨒說文曰水音也|吁疑怪辭也
PKi才句埾垛也才句切二|聚又秦雨切
VKi色句捒裝捒色句切又所據切三|數筭數周禮有九數方田粟米差分少廣商功均輸方程贏不足旁要也世本曰隷首作數又色矩色角二切又音速|㡏裁殘帛也
AKO方遇付与也方遇切六|賦賦頌詩有六義二曰賦釋名曰敷布其義謂之賦漢書曰不歌而誦曰賦又斂也量也班也稅也|傅相也亦姓本自傅說出傅巖因以爲氏出北地清河二望|𩬙露髻|陚丘名|搏擊也又布莫切
OKi七句娶說文曰取婦也七句切二|趣趣向又親足七俱倉苟三切
JKi中句註解也中句切又音注九|鉒置也又送死人物也|駐止馬|軴車軴|住停手又長句切|𨙔不行|壴說文云陳樂也|咮鳥聲|亍步止也
eKu區遇驅區遇切又羌愚切二|𤛐牛名
TKi芻注菆鳥窠芻注切三|䜴䜴勇|䐢膳也
KKi丑注𨳳直開也丑注切二|𢨸同上（直開也丑注切二）
QgR思典尠思句切少也又息淺切一
IKi良遇屢數也疾也良遇切二|𡀿𡀿𡀿吳人呼狗方言也
#暮
DLC莫故暮日晚也冥也又姓出何氏姓苑莫故切六|慕思慕又虜複姓二氏前燕錄云昔高辛氏游於海濱留少子厭越以居北夷邑于紫蒙之野号曰東胡秦西漢之際爲匈奴所敗分保鮮卑山因山爲号至魏初莫護跋率部落入居遼西時燕代多冠步搖冠跋好之乃斂髮襲冠諸部因謂之步搖後音訛爲慕容焉跋孫涉歸進拜單于遵循華俗自云慕二儀之德繼三光之容以爲氏歸子廆據遼東稱王僭号燕後又有將軍慕輿虔|募召也|墓墳墓|慔勉也|𥰻竹筥
GLC徒故渡濟也過也去也徒故切五|斁猒也一曰終也詩云服之無斁又音亦|鍍金飾物也|度法度又姓出後漢荊州刺史度尚又徒各切|𥯖蠶𥯖
ILC洛故路道路亦大也周禮曰合方氏掌達天下之道路爾雅曰一達謂之道路又姓本自帝摯之後出陽平襄城陳留安定東陽河南等六望洛故切十三|露說文曰露潤澤也五經通義曰和氣津凝爲露也蔡邕月令曰露者陰之液也又露見也亦姓風俗通云漢有上黨都尉露平|潞水名又州名春秋時初爲黎國後爲狄境古黎亭也周爲潞州隋爲韓州又爲上黨郡唐爲潞州開元中陞爲大都督府又縣名在幽州|輅車輅釋名曰天子乘玉輅以玉飾車也輅亦車也謂之輅者言行於道路也|鷺爾雅曰鷺春鉏郭璞云白鷺也頭翅背上皆有長翰毛江東人取以爲睫㰚名之曰白鷺縗|璐玉名|賂遺賂也|簬竹名|簵上同（竹名）|虂蔠葵蘩虂|𤻱𤸵𤻱痞病|㿖上同（𤸵𤻱痞病）|𦌕𦌕䍛取魚具也
ELC當故妒妬忌當故切十二|妬上同（妬忌當故切十二）|秅禾束又縣名在濟陰或作秺|秺上同（禾束又縣名在濟陰或作秺）|奼美女|𦘴𦘴胍腹大|𤴱乳病|㓃奠酒爵也|蠹食木蟲也|螙古文（食木蟲也）|殬敗也|斁上同（敗也）
FLC湯故菟菟絲草名又虜複姓後魏書有菟賴氏湯故切四|兔獸名崔豹古今注云兔口有缺尻有九孔論衡曰兔舐毫而孕及其生子從口而出說文云象踞後其尾形兔頭與㲋頭同|吐歐也又湯古切|鵵木鵵鳥有毛角
dLC古暮顧迴視也眷也又姓出吳郡古暮切十五|頋俗（迴視也眷也又姓出吳郡古暮切十五）|雇本音戶九雇鳥也相承借爲雇賃字|稒稒陽縣在五原|故舊也事也常也又姓出姓苑|酤賣也又旨姑|沽上同（賣也又旨姑）|痼太病|固堅也一也常也故也四塞也|錮錮鑄又禁錮也亦鑄塞也|㽽小兒口瘡|鯝魚肚中腸|䍛𦌕䍛取魚具也|棝射鼠斗也|凅凝也閉也
gLC五故誤謬誤五故切十四|悞上同（謬誤五故切十四）|寤覺寤|忤逆也|啎上同（逆也）|迕遇也|遻上同（遇也）|晤明也朗也|悟心了|逜干逜|窹廣雅云竈名|捂斜柱也又枝捂也|娛娛樂也又五于切|䎸聽也
jLC胡誤護救也助也胡誤切十七|瓠匏也又瓠子隄名亦姓淮南子有瓠巴善鼓琴|嫭美好|婟婟嫪戀惜也出聲類|頀大頀湯樂周禮作濩|互差互俗作㸦餘倣此|濩布濩|䇘所以收絲|冱寒凝|枑門外行馬|䨼青屬|韄佩刀飾也|𧥮誌也認也|鱯魚名|擭布擭猶分解也|𦊂兔網|𦬚草名
QLC桑故訴訟也毁也說文作𧩯告也桑故切十五|愬譖也說文同上（訟也毁也說文作𧩯告也桑故切十五）|𧪜向也說文同上（譖也說文同上）|泝逆流而上廣雅曰泝斗舟中抒水斗|遡說文同上（逆流而上廣雅曰泝斗舟中抒水斗）|素列子曰太素者質之始也又空也故也帛也說文作𦃃白緻繒也又虜複姓二氏後趙錄有宜陽公素和明又後魏書云素黎氏後改爲黎氏|傃向也|嗉鳥嗉|膆上同（鳥嗉）|𤤐玉名|塑塑像也出周公夢書|塐捏土容出古今奇字|䛾諳䛾|𤢘牲白也亦作素|㨞暗取物也
PLC昨誤祚福也祿也位也昨誤切七|胙祭餘|阼阼階東階|𧃘魚醬|飵相謁食也|𧇿往也|秨禾稼皃又音昨
HLC乃故笯盛鳥籠也乃故切又音奴二|怒恚也又音努
ALC博故布布帛也又陳也周禮錢行之曰布藏之曰泉又姓陶侃列傳有江夏布興博故切六|圃園圃說文曰種菜曰圃又音補|佈佈徧也|抪抪持|𠜙裁刀|𧉩𧉩蝜蟲也
hLC烏路汙染也說文穢也烏路切又音烏四|惡憎惡也又烏各切|噁喑噁怒皃|䜑相毁說文作䛩
BLC普故怖惶懼也普故切五|悑上同見說文（惶懼也普故切五）|鋪設也又普胡切|誧謀也|𤸵𤸵𤻱痞病又音步
OLC倉故厝置也倉故切五|措舉也投也說文置也|醋醬醋說文作酢|錯金塗又姓宋太宰之後又千各切|㳻壅水
eLC苦故絝說文曰脛衣也苦故切七|袴上同（說文曰脛衣也苦故切七）|庫貯物舍也又姓風俗通云古守庫大夫之後以官爲氏後漢輔義侯庫鈞亦虜複姓二氏周有少師庫狄峙又有庫門氏亦虜三字姓前燕錄有岷山桓公庫傉官泥|胯股也韓信出於胯下|䔯醋葅|苦困也今人苦車是|跨踞也
CLC薄故捕捉也薄故切十三|哺食在口也|步行步爾雅曰堂下謂之步白虎通曰人踐三尺法天地人再舉足步備陰陽也又姓左傳晉有步揚食采於步後因氏焉又虜三字姓三氏後魏書步六孤氏後改爲陸氏又西方步鹿根氏後改爲步氏北齊書有步大汗薩|鞴鞴靫盛箭室|餔餹餔又作䊇|鮬魚名|𩣝𩣝馬習馬案左傳曰左師見夫人之步馬字不從馬|䒀艇船|𨛒亭名|鵏鵏豉鳥|𤸵𤸵𤻱痞病又音怖|荹亂草說文曰亂稾也|𩢕馬名
iLC荒故謼號謼亦作呼荒故切又火姑切二|戽戽斗舀水器也
NLC臧祚作造也臧祚切一
#霽
NMS子計霽雨止也子計切八|隮升也又子奚切|躋上同（升也又子奚切）|濟渡也定也止也又卦名既濟又子禮切|擠排盪又將西反|䰏婦人束小髻也又音祭音節|䶓䶓緝麻紵名出異字苑|穧穫也又音劑
EMS都計帝說文曰諦也王天下之號也爾雅曰君也都計切二十三|諦審也|嚏鼻氣也|啑俗（鼻氣也）|柢木根柢也|蔕草木綴實|螮螮蝀|蝃上同見詩（螮蝀）|摕撮取|𦨢𦨢艡水戰船出字林|䠠姓也漢書王莽傳有中常侍䠠惲|疐疐柢也爾雅棗李曰疐之謂去柢也|骶背也|僀俊也|𢰂兩手急持人也|䟡蹋也|𤬵𤬵瓽大瓮|偙偙儶|腣胅腹皃又當兮切|趆趨走皃|蝭寒蟬又音啼|䩚補履下也|渧埤蒼云渧𤃀漉也
PMS在詣嚌甞至齒也在詣切十|劑分劑又子隨切|穧刈禾把數|𨣧鹹也|眥目際又才賜切|齊火齊似雲母重沓而開色黃赤似金出日南又齊和又徂兮切|齌炊餔疾也|癠病也|懠怒也|䶩䶩𪗷
FMS他計替廢也代也滅也說文本作暜廢一偏下也他計切二十|𤾕（廢也代也滅也說文本作暜廢一偏下也他計切二十）|暜（廢也代也滅也說文本作暜廢一偏下也他計切二十）|㬱並上同出說文（廢也代也滅也說文本作暜廢一偏下也他計切二十）|鬀說文曰𩮜髮也大人曰髡小兒曰鬀盡及身毛曰𩮜|剃上同（說文曰𩮜髮也大人曰髡小兒曰鬀盡及身毛曰𩮜）|戻輜車旁推戶也|𣧂𣧂𣧎|揥揥枝整髮釵也|涕涕淚|洟鼻洟|䎮不耕而種|𡲕履中薦也亦作屟屜|达足滑|薙除草|𢝹寧𢝹心安|𧛒補也|殢極困|𣤢唾聲|𥫵車筤也
GMS特計第次第說文本作弟韋束之次弟也今爲兄弟字又漢複姓二氏後漢書第五倫傳云齊諸田徙園陵者多故以次第爲氏有第五第八等氏特計切二十九|弟見上注又音上聲（次第說文本作弟韋束之次弟也今爲兄弟字又漢複姓二氏後漢書第五倫傳云齊諸田徙園陵者多故以次第爲氏有第五第八等氏特計切二十九）|遰迢遰又底隷切去也避也|髢髲也|鬀上同說文音剃（髲也）|締結也|睇睇視|悌孝悌又音上聲|娣娣姒|禘大祭五年一禘|軑說文曰車輨也|釱以鎖加足說文鐵鉗也又音大|鷤鷤鴂鳥又音啼|棣車下李又常棣子似櫻桃可食又姓王莽司馬棣並|杕木盛皃|踶蹋|題又徒雞切|遞更遞|𧡨視皃|㣇說文曰脩豪獸也一曰河內名豕也|𢰂兩手急持人|摕取也|𧫚𧫚審|慸極也又恥厲切|鯷鮎魚別名|𪂿𪂿䳏鳥又音啼|墆墆貯也又墆翳隱蔽皃又徒結切|𥶛竹名|逮逮及也又徒戴切
OMS七計砌階砌也七計切八|切眾也又千結切|𥉻視也|妻以女妻人又七兮切|摖挑取|䏅耳聰|䀙目䀙|𦕀耳聰
QMS蘇計細小也蘇計切六|𥿳古文（小也蘇計切六）|些可也此也辝也何也楚音又蘇箇切|栖雞所宿也又先奚切|壻女夫|𣳦水出汝南新郪入潁
gMS五計詣至也五計切十一|𢏗古能射人名說文曰帝嚳射官也夏少康滅之|羿上同（古能射人名說文曰帝嚳射官也夏少康滅之）|𦐧說文曰羽之羿風亦古諸侯也一曰射師|睨睥睨|栺枍栺殿名|盻恨視又下戾切|𧡎旁視|甈破罌|堄埤堄女牆也見博雅|霓虹又音倪
dMS古詣計籌計說文會也筭也又姓後漢有計子勳古詣切十二|係連係|繼紹繼俗作継|繫縛繫又口奚胡計二切|薊草名爾雅曰朮山薊又縣名又州開元十八年以漁陽縣爲薊州又姓後漢有薊子訓俗作葪|髻綰髮|𨜒燕都|檕爾雅曰朹檕梅說文云繘耑木也|檵枸杞|蘻狗毒草也|轚舟車轚互序而行也|㲅係也盡也
jMS胡計蒵屧蒵胡計切十四|䐼喉脈|𦝜上同（喉脈）|系緒也又姓楚有系益|𦃟籀文（緒也又姓楚有系益）|妎心不了也說文妬也又音害|禊祓除不祥也又禊飲|繫易之繫辭|瘛小兒病又尺制切|慀恨足也|㨙㨙換|盻恨視又五計切|䦏門扇又胡介切|稧稧事換秧
eMS苦計契契約苦計切又苦結切十|栔刻也|罊說文云器中盡|䏿字林云腨腸|蟿蟿螽螇蚸|𦩣舟名|𢢞劇也又怖也|𡢖難也|䫔恐也|䁈省視
hMS於計翳羽葆也又隱也奄也障也又鳥名似鳳於計切十七|曀陰風詩曰終風且曀|枍枍栺|瘱靜也安也恭也|㝣安也靜也|㙠塵也|殪殪死|瞖目瞖|医藏弓弩矢器|嫕婉嫕柔順皃|蘙蘙薈|縊自縊|豷豕息|繄是也賴縚走絲也|㙪天陰塵也|𧬇𧬇諦|殹擊中聲也
DMC莫計謎隱言也莫計切二|㩢裁也
AMC博計閉掩閉說文曰闔門也博計切五|閇俗（掩閉說文曰闔門也博計切五）|嬖愛也卑也妾也|箅甑箅也說文蔽也所以蔽甑底又必至切|㪏㪏㪒毁也又補米切
jMi胡桂慧解也胡桂切十三|憓憓愛也|潓水名|惠仁也亦惠然順也又姓出琅邪周惠王之後梁有惠施|蟪蟪蛄|蕙香草蘭屬|橞木名|繐繐帳又音歲|㩨㩨裂|儶偙儶|譓多謀智曰譓也|鏸銳也又三隅矛|𦒎羽𦒎
dMi古惠桂木名叢生合浦巴南山峯閒無雜木葉長尺餘冬夏長青其花白山海經曰八樹成林又姓後漢太尉陳球碑有城陽炅橫漢末被誅有四子一守墳墓姓炅一子避難居徐州姓昋一子居幽州姓桂一子居華陽姓炔此四字皆九畫古惠切九|昋（木名叢生合浦巴南山峯閒無雜木葉長尺餘冬夏長青其花白山海經曰八樹成林又姓後漢太尉陳球碑有城陽炅橫漢末被誅有四子一守墳墓姓炅一子避難居徐州姓昋一子居幽州姓桂一子居華陽姓炔此四字皆九畫古惠切九）|炅（木名叢生合浦巴南山峯閒無雜木葉長尺餘冬夏長青其花白山海經曰八樹成林又姓後漢太尉陳球碑有城陽炅橫漢末被誅有四子一守墳墓姓炅一子避難居徐州姓昋一子居幽州姓桂一子居華陽姓炔此四字皆九畫古惠切九）|炔並見上注（木名叢生合浦巴南山峯閒無雜木葉長尺餘冬夏長青其花白山海經曰八樹成林又姓後漢太尉陳球碑有城陽炅橫漢末被誅有四子一守墳墓姓炅一子避難居徐州姓昋一子居幽州姓桂一子居華陽姓炔此四字皆九畫古惠切九）|筀竹名|罣挂也|𤱾𤱾𤳤|𣧎𣧎𣧎殛殀也死皃也|䳏𪂿䳏即杜鵑也
iMi呼惠嘒聲急說文小聲也亦作嚖呼惠切三|嚖上同（聲急說文小聲也亦作嚖呼惠切三）|暳小星詩亦作嘒
BMC匹詣媲配也匹詣切七|䠘上同見管子（配也匹詣切七）|睥睥睨|淠水名在汝南|濞水名又芳備切|𣹮水聲|𠞇𠞇斫
CMC蒲計薜薜荔蒲計切五|𨫔所以理苗殺草|𥴬弋鳥具也|𨢡醬也|𣘥木名
IMS郎計麗美也著也又姓出姓苑郎計切三十三|戾乖也待也利也立也罪也來也至也定也又很戾說文曲也从犬出戶下戾者身戾曲也|㑦很㑦俗（乖也待也利也立也罪也來也至也定也又很戾說文曲也从犬出戶下戾者身戾曲也）|隸僕隷|隷上同俗作𣜩（僕隷）|儷伉儷|盭綠色又綬名或作綟又云弼也|綟草色衣也|劙割破|𠠫上同（割破）|唳鶴鳴曰唳|蜧大蝦蟆也|䓞紫草|沴妖氣說文曰水不利也|荔薜荔香草又羌複姓有荔非氏|捩琵琶撥也|欐梁棟之名也又師禮二音|𤃀埤蒼云渧𤃀漉也|𥶾札也|涖汔也又力二切|悷𢤱悷多惡又懍悷悲吟也|栛小槤木名|丽本也又鹿皮|蜦神蛇又音倫|㸚止也系也|珕方飾又力智切|𣛒竊視也|㿛瘦黑又力翅切|䚕求視又師蟻切|䕻草木生亞土也|𩘡急風|離漢書云附離著也|𣟌木名
KJQ丑居𥱻竹名也丑戾切又杖胡切一
HMS奴計泥滯陷不通語云致遠恐泥奴計切又奴低切五|埿俗（滯陷不通語云致遠恐泥奴計切又奴低切五）|𢤇𢤇𢘬音慢又相𢤇摩也|迡近也|濘濘陷
iMS呼計㰥氣越名呼計切三|㚛肥大|殢殢極困也
#祭
NNS子例祭享也祀也薦也至也察也子例切七|際邊也畔也會也|穄黍穄呂氏春秋曰飯之美者有山陽之際說文曰𪎭也𪎭音縻|鰶魚名|䰏露髻又音霽|㦣寐言|穧穫也又才計切
QNi相銳歲釋名曰歲越也越故限也從步戌相銳切四|櫘小棺又篲衛二音|𦄑布縷細也|繐上同（布縷細也）
kNq于歲衛護也垂也加也亦州名殷所都也本衛國爲翟所滅齊桓公伐翟遷衛于河南秦屬東郡魏文置朝歌郡晉爲汲郡東魏爲義州周武改爲衛州亦官名漢書曰衛尉秦官掌宮門衛屯兵又姓周文王子衛康叔之後國滅因氏焉出河東陳留二望又精衛鳥名山海經云狀如鳥白首赤喙其鳴目呼取西山木石以填東海于歲切十三|軎說文曰車軸耑也从車象形|轊上同（說文曰車軸耑也从車象形）|璏劒鼻王莽碎玉劒璏|𥶽竹名|𧲝豚屬|𧲔上同（豚屬）|槥小棺|彗日中必彗|㦣寐言|讆上同（寐言）|𤜂牛蹄|熭曬乾
cNi而銳芮草生狀又姓周司徒芮伯之後而銳切六|汭水曲說文曰水相入皃|枘柄枘|蜹蚊蜹又音爇|笍竹名|鈉銳鈉
XNi之芮贅贅肉也又最也聚也又贅衣官名也之芮切二|𠭥卜問吉凶
VNi山芮𠻜小歠也山芮切一
ONi此芮毳細手也又姓出姓苑此芮切又楚稅切十二|韢囊屬以盛賊頭又音遂|脃說文曰小耎易斷也|膬上同又七劣切（說文曰小耎易斷也）|脆俗（上同又七劣切）|帨佩巾又音稅|竁葬穿壙也又楚稅切|𣃍斷也|𧑎蟲名|㓹小割|㯔重擣又楚稅切|𤂳飲也
lNi以芮銳利也又姓姓苑云升平中鮮卑有御史中丞銳管以芮切六|銴銅生五色|叡聖也|睿上同（聖也）|䓲草生狀|蜹毒蟲又而稅切
JNi陟衛綴連綴陟衛切又丁劣切十一|醊祭也|畷禮注云井田閒道吳都賦云畛畷無數又張劣切|笍小車具也|䄌重祭|啜甞也|餟說文曰祭酹也司馬貞曰漢志作腏字通|腏上同又皮腏著也（說文曰祭酹也司馬貞曰漢志作腏字通）|錣針也|卂釣也|輟車小缺也
aNi舒芮稅斂也舍也又姓盛弘之荊州記云建平信陵縣有稅氏舒芮切九|說說誘|裞衣送死也又禮注云日月已過乃聞喪而服曰裞又他活切又他外切|蛻蛻皮又他臥切又他外切|帨佩巾也又音脃|𢄢說文曰禮巾也|涗溫水又清也|䬽小餟也又郎外切|䭨上同（小餟也又郎外切）
CNG毗祭弊困也惡也說文曰頓仆也俗作弊毗祭切五|斃死也說文同上（困也惡也說文曰頓仆也俗作弊毗祭切五）|幣幣帛|㡀說文曰敗衣也从巾象敗衣之形又匹世切|敝說文曰帗也一曰敗衣也又姓左傳齊有敝無存
TNi楚稅㯔重擣楚稅切四|𣃍𣃍斷|竁葬穿壙也|毳細毛
RNi祥歲篲埽帚爾雅曰葥王篲本亦從艹祥歲切九|𥱵古文（埽帚爾雅曰葥王篲本亦從艹祥歲切九）|鏏大鼎|彗星名又音遂|䵻小鼎|槥小棺|軎車軸頭也又音衛|轊上同（車軸頭也又音衛）|𢅫布巾
ANG必袂蔽掩也必袂切四|鄨縣名在牂牁又音鷩|鷩爾雅曰鷩雉郭璞云似山雞而小冠周禮云王享先公饗射則鷩冕又音鼈|彆弓彆
dNq居衛劌傷也割也居衛切六|鱖魚名大口細鱗有班文一曰婢魚也|𠜾剖𠜾斷割也|𨇙爾雅云𨇙洩苦棗亦作蹶|蹶行急遽皃曲禮曰足無蹶又居月切|𤜂踶𤜂牛展足
DNG彌弊袂袖也彌弊切一
VNS所例㡜殘帛所例切三|鎩矛戟類又所戒切|蔱椒蔱又所八切
YNS尺制掣掣曳尺制切又尺折切八|瘛小兒驚|懘㥈懘音不和也㥈樂記作帖|痸郭璞云癩病|𤸪上同（郭璞云癩病）|𢜳說文曰小怒也|銐除利也|𤢻狂犬別名
XNS征例制禁制又斷也止也勝也說文作𠛐裁也从刀从未物有滋味可裁斷也征例切十八|𠛐見上注（禁制又斷也止也勝也說文作𠛐裁也从刀从未物有滋味可裁斷也征例切十八）|𦜗魚醬亦作𨡐|淛水名|製製作又裁也|䎺入意一曰聞也|晢星光也亦作晣又音折|䇽方言云自關而西謂簟或謂之䇽|㛳婦孕病兒|㝂蝗子|䱥魚名可爲醬|䀸目光也又丑世切|狾狂犬|𥍭矛也|䩢刀鞞|䭁臭敗之味|䠠古人姓|迣迾也度也
ZNS時制逝往也行也去也時制切十三|忕忕習|觢牛角豎也|噬齧噬|誓誓約|𣂯古文（誓約）|筮龜曰蓍曰筮巫咸作筮筮決也|簭上同見周禮（龜曰蓍曰筮巫咸作筮筮決也）|澨水名書曰過三澨|銴車樘結一曰銅生五色又音銳|遾逮也|𧻸踰也|𦚨割𠟼
lNS餘制曳牽也引也餘制切二十九|裔邊也苗裔也又容裔也說文曰衣裾也俗作𧚞|𤤺石之次玉也|勩勞也|泄水名在九江又音薛|洩上同（水名在九江又音薛）|𤵺病也|䎈鳥飛|枻檝枻|詍多言|𢘽明也一曰習也|𦒎鳳六翮|靾以馬鞍贈亡人|跇超踰又丑例切|𠂆施明也又身皃|袣長被又衣長皃|䄿白䄿稻名|𪀕鳥名|㵝溶㵝水皃|㑜合板㑜縫|抴數也|㛳婦人病胎|䇩長也|㹭狸子|丿至地|㵩蒸也又蔥㵩也|𢂼裂也|呭呭樂說文曰多言也亦作㖂|䕍草名
hNa於罽䋵急也一曰不成也於罽切五|瘞埋也|餲又於葛於介二切|𦝲𦝲臆|䔽清也又音藹
gNW魚祭藝才能也靜也常也準也又姓出姓苑魚祭切八|埶說文穜也周禮音世|蓺上同（說文穜也周禮音世）|寱睡語|㦣上同（睡語）|囈亦同|槸樹枝相摩|褹字林云複襦也
LNS直例滯廢也止也凝也久也直例切七|彘豕也又姓左傳有彘恭子|蹛蹛林又音帶|銐除利也|璏劒鼻玉也|𦭮草補缺|𩻼魚名
INS力制例比也皆也力制切二十五|厲惡也亦嚴整也烈也猛也又姓漢有魏郡太守厲溫|礪砥石|勵勸勉|禲無後鬼也|癘疫癘|㾐上同（疫癘）|鮤魚名又音列|濿以衣渡水由膝已上爲濿亦作厲詩曰深則厲淺則揭說文又作砅履石渡水也|砅義見上注（以衣渡水由膝已上爲濿亦作厲詩曰深則厲淺則揭說文又作砅履石渡水也）|蠣牡蠣蚌屬|蠇上同（牡蠣蚌屬）|櫔木名|𩧃馬馳|𩢾上同（馬馳）|䅀黍穰|𥣭上同（黍穰）|𧸱𧸱貨|糲麤也又力達切|巁巍也|犡牛白脊|栵栭栗又音列|𢂥帛餘亦作㡂|𢤆恐人|洌清水又音列
eNa去例憩息也去例切六|𡳅上同（息也去例切六）|䔾䔾車草|愒爾雅貪也說文息也|揭褰衣渡水由膝已下曰揭|甈爾雅康瓠謂之甈郭璞云瓠壺也賈誼曰寶康瓠是也
aNS舒制世代也又姓風俗通云戰國時有秦大夫世鈞舒制切三|勢形勢|貰賒也貸也又時夜切
dNa居例猘狂犬宋書云張收嘗爲猘犬所傷食蝦蟆膾而愈居例切八|𦇧氈類織毛爲之說文曰西胡毳布也|罽上同說文曰魚网也（氈類織毛爲之說文曰西胡毳布也）|𣯅亦同|瀱泉出皃|訐持人短又居列切|彐彙類說文作彑云豕之頭象其銳而上見也|蘮蘮蒘似芹
JNS竹例㿃赤白痢亦作䐭竹例切又音帶一
fNa其憩偈偈句其憩切一
ZNi嘗芮啜甞也嘗芮切又臣劣切一
KNS丑例跇跳子踰也丑例切十一二|𧼪上同（跳子踰也丑例切十一二）|傺侘傺侘敕加切|𢘽習也|慸困劣|㑜㑜刻|䀸瞥也|䚢𧢷也又丑列切|揥佩飾|䟷躍皃|𨂰渡也|𥉻視也
LNi除芮𨧨曲刀也削竹也除芮切一
gNa牛例㓷去鼻也牛例切一
NNi子芮蕝束茅表位子芮切又子悅切三|𧑎蟲名又作會切|㨹裂也
BNG匹蔽潎魚游水也匹蔽切一
eUu丘吠𥏙𥏙䂕短皃丘吠切一
iUu呼吠䂕短皃呼吠切一
#泰
FOS他蓋泰大也通也古作太他蓋切四|忕奢也又逝大二音|太甚也大也通也周禮曰太史掌建邦之六典宋書曰太史掌歷數靈臺專候日月星氣焉經典本作大亦漢複姓六氏漢有尚書太叔雄古今人表有太師庇何氏姓苑云太征氏下邳人太士氏永嘉人又有太室氏太祝氏|汰太過也
dOS古太蓋覆也掩也通俗文曰張帛也禮記曰敝蓋不棄爲埋狗也又發語端也說文曰苫也俗作盖古太切三|匃乞也|丐上同本又音緬
gOS五蓋艾草名一名冰臺又老也長也養也亦姓風俗通云龐儉母艾氏五蓋切三|𧰿𧰿猳豕|鴱巧婦別名
hOS於蓋藹晻藹樹繁茂又姓晉南海太守藹奐於蓋切十|壒塵也|馤香也|靄雲狀又於葛切|𣋞日色|䔽覆也清也微也說文蓋也|𣩱死也|𢣏清謹|𪕭𪖂𪕭小鼠相銜而行|曖曖隱
HOS奴帶柰果木名廣志曰柰有青赤白三種俗作㮏奴帶切五|奈如也遇也那也本亦作柰又奴箇切|㲡𣬪㲡多毛|𩹟魚名|渿說文曰沛之也
GOS徒蓋大小大也說文曰天大地大人亦大故大象人形又漢複姓五氏晉獻公娶大狐氏楚襄王時有黃邑大夫大心子成史記秦將軍大羅洪周禮大羅氏掌鳥獸者其後氏焉又大庭氏古天子之号其後氏焉又有大叔氏又虜複姓後魏末有南州剌史大野拔又虜三字姓周書蔡祐賜姓大利稽氏周末有尉回將軍大莫于玄章後魏書南方大洛稽氏後改爲稽氏徒蓋切八|汏濤汏說文曰淅㶕也|軑車轄|釱鉗也又大計切|䲦鳥也|𪐝黑跡|忕奢忕|㐲地名在海中
jOS胡蓋害傷也胡蓋切四|𡕗相遮也|妎字林云疾妎妬也|𢞐快也
EOS當蓋帶衣帶說文曰紳也男子鞶革婦人鞶絲象繫佩之形帶有巾故从巾易曰或錫之鞶帶又蛇別名莊子云蝍蛆甘帶也當蓋切七|跢倒跢|㿃㿃下病也|蹛匈奴傳有蹛林又音滯|𢄔𢄔方山名|艜艇船|㯂槌也
AOC博蓋貝說文曰海介蟲也居陸名贆在水名蜬象形古者貨貝而寶龜亦州名春秋時屬晉七國屬趙秦爲鉅鹿郡漢爲清河郡周置貝州以貝丘爲名博蓋切十四|沛郡名又姓出姓苑又匹蓋切|𨙶上同（郡名又姓出姓苑又匹蓋切）|鋇鋇柔鋌也|芾小皃又方味切|䟺步行蠟跋|狽狼狽|㸬牛二歲也爾雅云體長㸬|伂顛伂本亦作沛|䰽魚名食之殺人|茷草木葉多|𣬪𣬪㲡多毛|𥄔目不明皃又音霈|𢂏行皃
BOC普蓋霈霶霈普蓋切五|浿水在樂浪|沛流皃亦滂沛又水名出遼東又音貝|𥄔𥄔眛目不眀也|㤄恨怒
jOi黃外會合也古作會亦州秦屬隴西郡漢分爲金城郡周爲防隋爲鎮武德初平李軌置會州又姓漢有會祤黃外切又音儈五|䢈說文曰日月合宿爲䢈|𨘇說文云無違也|禬除殃祭也又古外切|繪繪五采也
GOi杜外兌突也又卦名說文本作兌說也又姓杜外切五|𩊭補𩊭|綐細紬|銳矛也又弋稅切|㟋山名
dOi古外儈合市也晉令儈賣者皆當著巾白帖頟言所儈賣及姓名一足白履一足黑履古外切十八|膾魚膾說文曰細切肉也|鱠上同（魚膾說文曰細切肉也）|襘說文曰帶所結也|禬福祭|檜栢葉松身又古活切|旝木置石投敵也|巜說文曰水流澮澮也方百里有巜廣二尋深二仞|澮上同爾雅曰水注溝曰澮又水名在平陽（說文曰水流澮澮也方百里有巜廣二尋深二仞）|鄶國名在滎陽|廥芻槀藏也|䯤五綵束髮說文曰骨擿之可會髮者詩云䯤弁如星|鬠上同（五綵束髮說文曰骨擿之可會髮者詩云䯤弁如星）|劊說文曰斷也|會會稽山名又黃外切|䐴𦝫痛|𢶒收也|獪狡獪小兒戲
NOi祖外最極也俗作㝡祖外切三|𢃒五色采也|𧑎蟲也又山芮切
iOi呼會𧬨眾聲呼會切六|噦鳥聲|翽鳥飛聲|鐬鈴聲|渙水名在譙又音喚|濊說文曰水多皃又烏會切
eOi苦會𥢶麤糠苦會切一
IOi郎外酹以酒沃地郎外切五|頪說文曰難曉也一曰鮮白|㲕馬色班也|䬽門祭|㱻疫病又力臥切
gOi五會外表也遠也五會切一
EOi丁外祋祋祤縣名在馮翊又祋殳也丁外切一
hOi烏外懀惡也烏外切七|濊汪濊深廣又呼會切|薈草盛|嬒婦人名也|䶐息也|瞺眉目之閒|䵳淺黑色
POi才外蕞小皃才外切二|𥳣𥳣䇻
QOi先外𥕸小石先外切三|𣩡瘦病|𥊴流盻
OOi麤最襊衣游縫也麤最切三|𨅎行𨅎|𥨒塞外道也
COC蒲蓋旆旗也繫旐曰旆蒲蓋切三|䟺賴䟺行不正也|軷祭道神又蒲葛切
eOS苦蓋磕硠磕石聲苦蓋切九|䳚䳚鴠鳥又音渴|轄車聲|愒貪也公羊傳云不及時而葬曰愒愒急也|溘船著沙也|𥎆矛屬|𩫀擊也|㪡伐也擊也|𨜴地名或作𨞨
OOS倉大蔡龜也亦國名又姓出濟陽周蔡叔之後也倉大切三|𣞖古文（龜也亦國名又姓出濟陽周蔡叔之後也倉大切三）|𪇭𪇭鳩鳥
IOS落蓋賴蒙也利也善也幸也恃也又姓風俗通云漢有交阯太守賴先落蓋切十四|籟籥三孔也|癩疾也說文作癘惡疾也今爲疫癘字|瀨湍瀨|糲麤米又力達切|䄤墮壞|藾藾蒿|䓶上同（藾蒿）|犡牛名說文曰牛白脊|䲚魚名|𨇆跛𨇆行皃|㸊火之毒皃|鵣鳥名|𡂖聲𡂖
iOS呼艾餀食臭呼艾切五|𦤦上同（食臭呼艾切五）|㺔獸名出音譜|𤵽𤵽病|𩹄魚名
FOi他外娧好皃他外切五|蛻蛇易皮又音稅|駾奔突也詩云昆夷駾矣|毻鳥易毛又音唾|裞送死衣也
DOC莫貝眜𥄔眛目不明也莫貝切三|沫水名|枺木名
OOi七外𦦣𦦣小舂也七外切一
#卦
dPi古賣卦說文曰筮也易疏云挂也懸挂萬象於其上八卦者八方之卦也乾坎艮震巽离坤兌古賣切六|挂懸挂又剛挂弩矢鏃名潘岳射雉賦云出剛挂以潛擬|掛俗（懸挂又剛挂弩矢鏃名潘岳射雉賦云出剛挂以潛擬）|詿誤也又胡卦切|𡐠盾握也|罣罣礙又胡卦切
dPS古隘懈懶也怠也古隘切六|解除也|繲繲浣衣出埤蒼|廨公廨|薢薢茩藥名|㾏病也
hPS烏懈隘陝也陋也烏懈切六|𨽴古文（陝也陋也烏懈切六）|阸阻塞又阸㠔山形或與隘同|㿄病聲|䅬稻小把也|賹賹記人物
jPS胡懈邂邂逅胡懈切二|解曲解亦縣名在蒲州又古賣古買胡買三切
DPC莫懈賣說文作𧷓出物也莫懈切一
jPi胡卦畫釋名曰畫挂也以五色挂物象也俗作𦘕胡卦切又胡麥切九|詿礙也|罣同上（礙也）|絓絲結|澅水名在齊|黊鮮黃色|繣徽繣乖違|纗紘中繩也|孈愚戇又多態也
TPS楚懈差病除也楚懈切又楚宜楚皆初牙三切七|瘥上同又音醝（病除也楚懈切又楚宜楚皆初牙三切七）|衩衣衩|杈杈杷平田具也又音又|㳗浦㳗|訍訍持短又疑心名也|𧪘異言
gPS五懈睚目際又睚眦怨也五懈切又五佳切一
iPS火懈謑怒言火懈切又胡禮切一
APC方卦𢈕到別方卦切一
CPC傍卦粺精米傍卦切四|稗稻也又稗草似榖|𪐄黍屬又音俾|杷田具又音琶
UPS士懈㾹疾也士懈切二|眦睚眦
BPC匹卦派分流也俗作沠匹卦切七|𠂢說文曰水之衺流別也|𥿯未緝麻也說文曰散絲也|𣏟麻紵|㵺說文曰水在丹陽|㭛藤屬蜀人以織布出埤蒼|𣎳分枲皮也又匹刃切
SPS側賣債徵財側賣切一
ePS苦賣𡢖難也苦賣切又音契二|𨛖鄉名
VPS所賣曬暴也所賣切又所寄丑離二切五|䵘不黏之皃或與曬同|𨢦簀酒|汛水皃說文灑也本又音信|洒洒埽又先禮切
iPi呼卦諣疾言呼卦切一
APC方賣㠔阸㠔山形方賣切一
JPS竹賣膪亦作䐱腏𠟼也竹賣切又竹惡切𦜖膪肥皃二|𢕮𢕮步立皃出聲譜
#怪
dQi古壞怪怪異也古壞切八|恠俗（怪異也古壞切八）|𥑋𥑋石似玉|𦳋草名|𣀤毀也|壞上同又胡怪切（毀也）|𡌪大皃|㧔訬也
hQS烏界噫噫氣烏界切二|呝不平聲
SQS側界瘵病也側界切三|祭周大夫邑名又姓周公第五子祭伯其後以爲氏|𨝋說文曰周邑也
dQS古拜誡言警也古拜切二十三|戒慎也具也備也警也易注云洗心曰齋防患曰戒|界境也垂也|介大也助也佑也甲也閱也耿介也說文作介畫也俗作□又姓介之推是|屆至也舍也說文曰行不便也一曰極也|疥瘡疥|玠大珪長尺二寸|㝏獨居|㠹幘也|砎硬也|魪比目魚也|尬尲尬行不正尲音緘|价善也又佋价也|䯰簪結|悈飾也司馬法曰有虞氏悈於中國|䲸䲸雀也似鶡而青出羌中|艐爾雅云至也亦云古屆字|䁓怒也|芥辛菜名又草芥|衸布衣幅也又胡介切|丯草介|𠨴𠨴到|𩡺𩡺馬馬尾結也
MQS女介褹紩布襦女介切一
iQS許介譮怒聲許介切九|欸上同（怒聲許介切九）|㖑喝㖑|齂鼻息|噧高聲皃又多言|䜕譀䜕|㞒臥息|𢗊說文曰忽也孟子曰孝子心不若是𢗊|𡘌說文曰瞋大聲也
jQS胡介械器械又杻械胡介切十一|䪥葷菜也葉似韭|薤俗（葷菜也葉似韭）|齘䫴齘切齒怒䫴于禁切|䦏門扇|瀣沆瀣北方夜半之氣又胡代切|㒠陜也|韰韰惈猶果敢也|𤡧雌狢|衸𧙞膝裙也說文袥也|㳦水名
gQS五介𦗐不聽五介切四|譺誡譺|𢟰忦𢟰慳悋人也|𧏹蟲名𠯗食草木葉也
eQi苦怪蒯茅類又姓出襄陽漢有蒯通或作𦰵苦怪切九|喟歎也又丘愧切|嬇女字|㕟太息|䈛箭竹名也|簣籠也|嘳譏他人也|蕢杜蕢蕢尚並見禮記|墤俗云土塊本音隤
AQC博怪𢷎周禮曰大祝辯九𢷎一曰稽首二曰頓首三曰空首四曰振動五曰吉𢷎六曰凶𢷎七曰奇𢷎八曰襃𢷎九曰肅𢷎博怪切三|拜上同（周禮曰大祝辯九𢷎一曰稽首二曰頓首三曰空首四曰振動五曰吉𢷎六曰凶𢷎七曰奇𢷎八曰襃𢷎九曰肅𢷎博怪切三）|扒拔也詩云勿剪勿扒案本亦作拜
BQC普拜湃滂湃普拜切二|浿水名在樂浪
jQi胡怪壞自破也胡怪切三|𡎯古文（自破也胡怪切三）|蘾蘾烏蕵草
gQi五怪聵聾也五怪切三|𦖥說文同上（聾也五怪切三）|𩔀說文曰頭蒯𩔀
CQC蒲拜𢞎病也說文𢢞也蒲拜切八|憊（病也說文𢢞也蒲拜切八）|𤸶並同上（病也說文𢢞也蒲拜切八）|韛韋囊吹火|𣡖上同（韋囊吹火）|𦩋船後𦩋木|棑木名|㶔水波
DQC莫拜䀛䀛眼久視莫拜切三|𧱘𧱘𧱳頑惡|韎東夷樂也
iQi火怪𧱳𧱘𧱳火怪切五|躗過也|𣟉木名皮可牽船|𣸎水聲|咶鼻息
VQS所拜鎩翦翮說文曰鈹有鐔也所拜切又所八切四|𧜁衣𧘪縫也|殺殺害又疾也猛也亦降殺周禮注云殺衰小之也又所八切|閷上同亦見周禮（殺害又疾也猛也亦降殺周禮注云殺衰小之也又所八切）
eQS苦戒烗熾也盛也苦戒切四|𤈪上同（熾也盛也苦戒切四）|劾勤力作也|揩鼓名又客皆切
JQi迍怪顡顏惡也迍怪切說文五怪切癡顡不聰明也一
#夬
dRi古邁夬決也亦卦名古邁切三|獪狡獪|䈛䈛竹名
eRi苦夬快稱心也喜也可也又姓漢有快欽苦夬切五|噲咽也又人名漢有樊噲又姓孝子傳有噲叄鵠銜珠與之|𥢶麤穅|駃駃馬日行千里|璯人名晉有錢璯
DRC莫話邁行也遠也莫話切四|勱勉也強也|䜕誇誕又火犗切|佅僸佅
jRi下快話語話說文作䛡合會善言也下快切一
CRC薄邁敗自破曰敗說文毀也薄邁切又北邁切四|贁籀文（自破曰敗說文毀也薄邁切又北邁切四）|䢙散走|唄梵音
hRi烏快䵳淺黑色烏快切又烏外切三|䶐喘息聲又烏外切|懀惡皃
TRi楚夬嘬一舉盡臠曲禮曰無嘬炙楚夬切四|䴝南方呼醬|𣤌齧也|𠽶上同（齧也）
dRS古喝犗犍牛古喝切二|𧜅衣上也亦作𧛾
KRS丑犗蠆毒蟲丑犗切二|慸極也劣也慸芥
hRS於犗喝嘶聲於犗切五|餲飯臭又於罽切|嗄聲敗又所嫁切|䬵通食氣也|欬上同（通食氣也）
VRS所犗𠱡喝𠱡所犗切一
LRS除邁𦤧大臭又事露也除邁切一
iRS火犗䜕譀䜕火犗切譀火懺切二|𦤬𦤬𦤧臭皃
iRi火夬咶息聲火夬切一
ARC補邁敗破他曰敗補邁切又音唄一
TRi倉夬啐啗也倉夬切一
URS豺夬寨羊栖宿處豺夬切二|砦山居以木柵
jRS何犗㕢纔然何犗切一
#隊
GSi徒對隊羣隊徒對切十二|䨴霮䨴雲狀|薱草盛|憝怨也惡也周書曰元惡大憝|憞上同（怨也惡也周書曰元惡大憝）|譈亦同|鐓矛下銅也曲禮曰進矛戟者前其錞|錞上同（矛下銅也曲禮曰進矛戟者前其錞）|䃍礧䃍物墜也|䯟𩪁䯟愚人|𩐌齏也|濧漬也濡也
CSC蒲昧佩玉之帶也說文曰大帶佩也从人从凡从巾佩必有巾巾謂之飾禮曰凡帶必有佩玉蒲昧切十二|珮玉珮俗（玉之帶也說文曰大帶佩也从人从凡从巾佩必有巾巾謂之飾禮曰凡帶必有佩玉蒲昧切十二）|孛星也又蒲沒切|鄁紂之畿內國名東曰衛南曰鄘北曰鄁|邶上同（紂之畿內國名東曰衛南曰鄘北曰鄁）|偝向借|誖言亂又補內蒲沒二切|悖心亂又蒲沒切|背弃背又姓也又補妹切|琲埤蒼云珠百枚曰琲孫權貢珠百琲琲貫也又云珠五百枚也亦作㻗又蒲罪切|𢂤拂取|苝爾雅曰苝山䪥案本亦作葝葝音勍
DSC莫佩妹姊妹莫佩切十一|昧暗昧|眛目暗|每數也又武罪切|痗病也又音晦|瑁瑇瑁亦作𤲰蝐又莫沃切|黴點筆又武悲切|莓莓子木名似葚又莫杯切|䍙鳥網|脢背肉也又莫杯切|䆀禾傷雨則生黑班也
BSC滂佩配匹也合也滂佩切四|昢向曙色也|妃妃偶也又匹非切|嶏崩聲
iSi荒內誨教訓也荒內切十一|悔改悔|晦冥也又月盡也|𠧩易卦上體|靧洗面|頮上同（洗面）|秏稻名出南海又火号切|痗病也|𩔁面肥也|詯休市|𣴵大清說文曰青黑皃今作㳷
ESi都隊對荅也當也配也楊也應也古作𡭊漢文責𡭊而面言多謂非誠𡭊故去其口以從土也都隊切六|𡭊見上注（荅也當也配也楊也應也古作𡭊漢文責𡭊而面言多謂非誠𡭊故去其口以從土也都隊切六）|碓杵臼廣雅曰𥕐碓也通俗文云水碓曰轓車杜預作連機碓孔融肉刑論曰水碓之巧勝於聖人之斷木掘地|𣝉車箱考工記云立曰𣝉橫曰軹|轛上同（車箱考工記云立曰𣝉橫曰軹）|𠏮帀市
OSi七內倅副也七內切五|淬染也犯也寒也|焠作刀鋻也天官書曰火與水合爲焠|䃀䃀磨|啐甞入口又先對切
NSi子對晬周年子也子對切七|祽月祭名也|𪓌說文曰會五綵繒也|綷上同（說文曰會五綵繒也）|𢃒亦同|捘推也|夎失容節拜又子臥切
hSi烏繢𩲄𩲄𡯵癈風苦熱烏繢切三|㕈隱翳|隈字林云隩隈也
FSi他內退卻也說文作𢓴他內切五|𢓴上同（卻也說文作𢓴他內切五）|𨓤古文（卻也說文作𢓴他內切五）|㥆肆也又他沒切|𡯵𩲄𡯵
dSi古對憒心亂也古對切十|幗婦人喪冠又古獲切|刏刏刀使利|慖恨也|䵋黃色又于鄙切|䐴𦝫忽痛也|簂筐也亦作槶|䈐篷也|𪏤病皃|蔮儀禮注云滕薛名蔮爲頍
jSi胡對潰逃散又亂也胡對切十三|迴曲也又音回又作匯|繢畫也|嬇女字|殨肉爛|闠闤闠市門|䔇草名呂氏春秋云菜之美者有雲夢之䔇|螝蟲蛹|詯胡市|膭肥大|僓長也|䜋覺悟說文曰中止也司馬法曰師多則民䜋䜋止也|䛛市䛛
eSi苦對塊土塊苦對切三|凷上同說文曰墣也禮曰寢苫而枕由（土塊苦對切三）|堁塵起又於臥切
QSi蘇內碎細破也蘇內切五|𤭢說文破也|誶告也|啐送酒聲|繀織繀說文曰著絲於筟車
HSi奴對內入也奴對切一
ISi盧對纇麤絲也盧對切十四|耒耜世本曰倕作耒古史考曰神農作耒說文云手耕曲木也|儽極困也|攂攂鼓|酹酹酒|蘱草名似蒲一云似茅|㔣推也|䒹耕多草|𥣬秲𥣬稻名|𡔇𡔇塊土皃|礧礧䃍重也|䣂䣂陽縣漢書作耒|銇銇鑽|錑平板
ASC補妹背脊背補妹切三|輩等輩又比也類也俗作輩|誖亂也
gSi五對磑磨也世本曰公輸般作之五對切一
jSi胡輩蚚爾雅曰強蚚胡輩切又音析一
#代
GTS徒耐代更代年代亦州名春秋時屬晉其後趙襄子以銅斗擊殺代王取其地至秦隷太原郡漢置雲中鴈門代郡魏爲州又姓史記趙有代舉徒耐切十三|岱泰山|黛眉黛|黱上同（眉黛）|逮及也又徒帝切|埭以土堨水|𡍖上同（以土堨水）|帒囊屬|袋上同（囊屬）|𤮼甘也|酨醋也又昨代切|瑇瑇瑁亦作蝳𣫹異物志云如龜生南海大者如籧篨背上有鱗鱗大如扇有文章將作器則煑其鱗如柔皮俗又作玳又徒督切|靆靉靆雲狀
NTS作代載年也事也則也乘也始也盟辭也又姓風俗通云姬姓之後作代切又材代切六|再重也兩也|縡事也出字林|𨚵古國名|𩛥說文曰設餁也|䵧染䵧
DSC莫代䆀禾傷雨莫代切又莫亥切二|脄背側肉也
QTS先代賽報也先代切四|簺格五戲說文云行棊相塞故曰簺也|塞邊塞又蘇則切|𢞝寬也實也
FTS他代貸借也施也假也他代切四|儓儓儗癡皃|態意態亦作㑷|曃曖曃不明皃出玉篇
dTS古代溉灌也又水名出東海桑瀆縣覆甑山古代切六|概平斗斛木|摡滌也詩云摡之釜鬵|㕢深堅意又偶也|𠌰主也|㧉磨也
eTS苦愛慨慷慨苦愛切六|愾大息|欬欬瘶|鎧甲也管子曰葛盧之山發而出黃金蚩尤制以爲鎧也|闓開也又音開|嘅嘅嘆
gTS五溉礙止也距也五溉切七|硋上同（止也距也五溉切七）|䙷釋典云无䙷也|閡外閉|儗儓儗|懝騃也|𥝌木曲頭不出又音稽
hTS烏代愛憐也說文作𢙴行皃烏代切九|㤅惠也|𢟪古文（惠也）|曖日不明又晻曖暗皃|僾隱也|𥴨隱也爾雅作薆|靉靉靆雲狀|薆薆薱草盛|璦珠璦玉篇云美玉也
jTS胡概瀣沆瀣氣也胡概切三|㤥患苦|劾椎劾
HTS奴代耐忍也奴代切七|螚小䖟蟲也|鼐大鼎|能技能又姓何氏姓苑云長廣人|佴姓也山公隻有佴湛|𣉘日無光也|耏𩓣也又如之切
ETS都代戴荷戴又姓出濟比本自宋戴穆公之後風俗通云凡氏於諡戴武宣穆是也都代切一
ITS洛代賚與也賜也洛代切九|萊草也又音來|睞旁視|徠勞也|勑上同（勞也）|㾢惡病|誺誤也|䚅內視|逨就也又音來
OTS倉代菜草可食者皆名菜倉代切五|埰古者鄉大夫食采地郭璞云采地葬之因以名|棌木名|䰂髻也|䐆大腹
PTS昨代載運也昨代切七|裁製裁|纔僅也|在所在|酨醋醬|栽築牆長板|𣿐測也
iTS海愛儗儓儗癡也海愛切又音礙一
#廢
AUO方肺廢止也大也方肺切九|癈固病|𤼺賦斂|橃木似柚也|祓福也除惡祭也又敷物切|𥳊蘆𥳊|䉬上同（蘆𥳊）|䚨說文云弋射收繳具也|砩以石遏水曰砩
BUO芳廢肺金藏芳廢切四|杮斫木札也|㤄怒也|䑔䑗也又音伐
hUu於廢穢惡也於廢切六|薉荒薉說文蕪也|濊濊貊夫餘國名或作獩貊又汪濊又烏外切|獩見上注（濊貊夫餘國名或作獩貊又汪濊又烏外切）|饖飯臭|䮹䮹䮭馬怒
CUO符廢吠犬聲符廢切四|茷草葉多也又方大切|𩵥魚名|鼣鼠名如犬吠也
iUu許穢喙口喙許穢切又昌芮切六|𤸁困極也詩云昆夷𤸁矣本亦作喙|𣨶上同（困極也詩云昆夷𤸁矣本亦作喙）|𧾣行走之皃|餯飯臭|顪頰也
fUu渠穢𤜂牛觸人渠穢切一
gUe魚肺刈刈穫魚肺切八|乂才也|㲼水名|㣻困患爲戒|𩾘爾雅云桃蟲鷦其雌𩾘俗呼爲巧婦亦作鴱又音艾|艾治也見詩|䖊虎皃|䢃才人名
#震
XVS章刃震雷震也又動也懼也起也威也章刃切十一|振奮也裂也舉也整也救也又之人切|賑贍也|娠妊娠又音身|侲侲子逐厲鬼童子也|挋說文云給也一曰約也又爾雅曰挋拭刷清也|袗玄服|䪾䪾𩕔頭少髮說文曰顏色䪾䫰慎事也頁皆在左|䟴動也|䢻地名又音辰|䳲䳲鷺
QVS息晉信忠信又驗也極也用也重也誠也又姓魏信陵君無忌之後又漢複姓何氏姓苑有信都信平二氏息晉切十一|訊問也告也|訙上同（問也告也）|迅疾也又私閏切|囟說文曰頭會腦蓋也|顖上同（說文曰頭會腦蓋也）|卂疾飛而羽不見|汛說文灑也|𤜢小獸有臭居澤色黃食鼠|奞奮奞也|阠八陵名爾雅曰東陵阠又所臻切
cVS而振刃刀刃而振切十一|認識也|肕牢肕|韌柔韌亦與肕同|仞七尺曰仞|軔礙車輪木|牣滿也詩曰於牣魚躍|杒木名|訒難言|𢂻枕巾|䀼眩懣
lVS羊晉胤繼也嗣也亦姓羊晉切十一|酳酒漱口也|靷引軸|引又羊忍切|朄小鼓在大鼓上擊之以引樂亦作𣍃|濥說文云水脉行地中濥濥然|䏖春肉又直忍切|𢯼伸也|洕小水|鈏鐵鈏|𨋙車名
IVS良刃遴行難也又姓良刃切二十八|吝悔吝又惜也恨也俗作𠫤|悋鄙悋本亦作吝|磷薄石|閵閵鵲鳥名似鴝鵒而黃|𥳞竹名堅中|粦說文作㷠鬼火也兵死及牛馬血爲之|燐上同（說文作㷠鬼火也兵死及牛馬血爲之）|藺草名莞屬亦縣名在西河又姓出西河本自有周晉穆公少子成師封韓韓獻子玄孫曰康食邑於藺因氏焉|轥轥轢車踐|轔上同（轥轢車踐）|䗲螢火|𩕔𩒉𩕔一曰頭少髮|𠄈獸名似彘身黃尾白|麐牡麟又音鄰|䉮植也|𦺸草名|瞵視不明皃|橉木名|鏻鏻健|甐器也|𧶆貪也|𧖔蟁也|𤌎火皃|疄田壟|撛扶也又力盡切|粼水在石閒|躙蹂躙
AVG必刃儐儐相也說文導也必刃切七|擯擯斥|殯殯殮|鬢頰上髮也|覕不相見也|𧸈上同（不相見也）|䚔䚔𧢜又匹人切
LVS直刃敶列也直刃切五|陳上同見經典（列也直刃切五）|陣俗今通用（上同見經典）|診候脉又之忍切|𨳌登也
ZVS時刃慎誠也謹也亦姓古有慎到著書又漢複姓家語魯有慎潰氏奢侈逾法時刃切三|昚古文亦姓（誠也謹也亦姓古有慎到著書又漢複姓家語魯有慎潰氏奢侈逾法時刃切三）|蜃蛟蜃又縣名
aVS試刃眒張目試刃切三|阠東方陵名|抻抻物長也
eVW去刃菣香蒿可煑食去刃切又苦見切三|𧼒行皃|臤堅也
PVS疾刃賮琛賮又財貨也會禮也徐刃切又疾刃切六|燼燭餘|㶳上同（燭餘）|藎進也詩云王之藎臣一曰草名|濜水名|璶石似玉
gVa魚覲憖且也一曰傷也又曰問也魚覲切三|猌犬張齗怒皃|垽滓也
NVS即刃晉進也又州名堯所都平陽禹貢冀州之域春秋時晉地秦屬河東郡後魏爲唐州又爲晉州爾雅晉有大陸之藪今鉅鹿是也亦姓本自唐叔虞之後以晉爲氏魏有晉鄙即刃切十|㬜上同出說文（進也又州名堯所都平陽禹貢冀州之域春秋時晉地秦屬河東郡後魏爲唐州又爲晉州爾雅晉有大陸之藪今鉅鹿是也亦姓本自唐叔虞之後以晉爲氏魏有晉鄙即刃切十）|搢搢紳之士搢笏而垂紳又插也|縉淺絳色又古有縉雲氏|䗯蟲名又蛤屬|進前也善也升也登也又姓出何氏姓苑|枃凡織先經以枃梳絲使不亂出埤蒼|瑨美石次玉|璡上同又音津（美石次玉）|𦎷羊名又亭名切
iVa許覲衅牲血塗器祭也許覲切三|釁上同又罪也瑕釁也（牲血塗器祭也許覲切三）|舋俗（上同又罪也瑕釁也）
JVS陟刃鎮壓也周禮有四鎮楊州之會稽青州之沂山幽州之醫無閭冀州之霍山又姓出姓苑陟刃切三|瑱玉充耳又吐甸切|填定也亦星名又音田
fVa渠遴僅餘也纔也劣也少也渠遴切十一|覲見也|殣埋也|瑾美玉名|饉無榖曰饑無菜曰饉|㝻少也|廑小屋|瘽病也|墐塗也詩曰塞向墐戶|𠞱𠞱割也又去槿切|歏歏欠
TWS初覲櫬空棺也初覲切七|瀙水名|嚫嚫施|䞋上同（嚫施）|襯近身衣|儭裏也|齔說文曰毀齒也男八月而齒生八歲而齔女七月而齒生七歲而齔俗作齔又初忍切
hVW於刃印符印也印信也亦因也封物相因付又漢官儀曰諸侯玉黃金橐駝鈕文曰璽列侯黃金龜鈕文曰章御史大夫金印紫綬文曰章中二千石銀印龜鈕文曰章千石至四百石皆銅印文曰印又姓左傳鄭大夫印段出自穆公子印以王父字爲氏於刃切四|鮣魚名身上如印|𣱐㲳又音致|𩂥氣行
KVS丑刃疢病也俗作𤵜丑刃切二|趁趁逐俗作趂
BVG匹刃𣎳麻片匹刃切三|𩰗鬭也|䚔暫見
OVS七遴親親家七遴切又七鄰切四|寴屋空皃說文至也|儭至也又畏也|瀙水名
eVW羌印螼螼蚓一名蜸蠶蚯蚓也羌印切蜸苦典切一
dVm九峻呁吐也九峻切二|𧥺欺言
#稕
XVi之閏稕束稈也之閏切六|𦽑上同（束稈也之閏切六）|諄告之丁寧|𥇜鈍目|盹上同（鈍目）|訰訰訰亂也
QVi私閏𡺲高也長也險也峭也速也私閏切十三|峻上同（高也長也險也峭也速也私閏切十三）|濬深也|浚水名在衛亦浚儀縣名|陖亭名在馮翊說文曰陗高也|埈上同（亭名在馮翊說文曰陗高也）|迅疾也又音信|鵕鵕䴊似鳳說文曰鷩也漢初侍中服鵕䴊冠|𢏤弓彇|奞奮奞鳥張羽毛也|𧸩𧸩益|晙早也又音俊|迿出表詞出
RVi辭閏殉以人送死辭閏切四|徇自衒名行|侚以身從物|𢓈巡師宣令又從也或作徇
NVi子峻儁智過千人曰儁又羌複姓有儁蒙氏子峻切十二|俊上同（智過千人曰儁又羌複姓有儁蒙氏子峻切十二）|晙早也|餕食餘|畯田畯農夫詩傳曰田大夫也|駿馬之俊周穆王有八駿驊騮騄駬赤驥白兔犧渠黃踰盜驪山子又音峻|㕙㕙古東郭之狡兔名又音逡|𪕞石鼠出蜀毛可作筆|寯人中最才|焌然火|㼱獵之韋袴說文曰柔韋也又音耎|𤮪上同又而隴切（獵之韋袴說文曰柔韋也又音耎）
aVi舒閏舜虞舜仁聖盛明曰舜說文作䑞艸也楚謂之䔰葍秦謂之藑蔓地連華象形舒閏切八|䑞見上注（虞舜仁聖盛明曰舜說文作䑞艸也楚謂之䔰葍秦謂之藑蔓地連華象形舒閏切八）|蕣木槿|瞬瞬目目動也|瞚（瞬目目動也）|眴並上同（瞬目目動也）|䀢亦同見公羊傳|鬊毛皃禮注云亂髮也
cVi如順閏閏餘也易曰五歲再閏史記曰黃帝起消息正閏餘漢書音義曰以歲之餘爲閏如順切三|潤潤澤也又益也|䏰漢𦚧䏰縣名地下濕多𦚧䏰蟲𦚧音蠢
bVi食閏順從也食閏切二|揗說文摩也
#問
DXO亡運問訊也又姓今襄州有之亡運切十一|璺破璺亦作㼂方言曰秦晉器破而未離謂之璺|絻喪服亦作免|汶水名|紊亂也|聞名達詩曰令聞令望|莬新生草也|脕上同詩曰薇亦柔止鄭玄云柔謂脃脕之時（新生草也）|抆拭也|鼤鼠文|娩生也又音免
kXu王問運遠也動也轉輸也國語云廣運百里東西爲廣南北爲運又姓出姓苑又漢複姓二氏史記云秦後以國爲姓有運奄氏後漢梁鴻改姓爲運期氏王問切十六|暈日月傍氣|餫野餉|䩵治鼓工考工記云䩵人爲皋陶皋陶鼓木也又況万切|韗上同（治鼓工考工記云䩵人爲皋陶皋陶鼓木也又況万切）|鄆邑名又州名魯太昊之後風姓禹貢兗州之域即魯之附庸須句國也秦爲薛郡地漢爲東平國武帝爲大河郡隋爲鄆州亦姓魯大夫食采於鄆後因氏焉|員姓也前涼錄有金城員敞唐有棣州刺史員半千|䲰鳥名似烏一名同力|忶心悶|鶤雞三尺曰鶤又音昆|𧶊物數亂也|韻韻和也|䚋眾視|𧡡上同（眾視）|𤸫病也又尤粉切|緷說文緯也
iXu許運訓誡也男曰教女曰訓又姓許運切五|爋火乾物|臐羊羹|薰薰香又許云切|鐼鐵類
BXO匹問湓含水潠也匹問切四|忿怒也|魵小魚|瀵水浸也又音奮
AXO方問糞穢也方問切八|𥻔上同（穢也方問切八）|𡊅𡊅掃除也|拚上同見禮（𡊅掃除也）|僨僵也|奮揚也鳥張毛羽奮奞也又姓左傳楚有司馬奮揚|瀵水名有三眼一在蒲州泉眼大如車輪濆沸湧出一在同州界夾黃河一在河中央皆潛通大小並相似俱深不測又音湓|㱵殨也
hXu於問醞醞釀於問切又於刎切四|慍怒也|縕亂麻|薀習也俗作蘊又音上聲
dXu居運攈說文拾也居運切五|捃上同（說文拾也居運切五）|皸足坼又居云切|𧱝豕求食也又衢物切|䝍小野豕名
fXu渠運郡說文曰周制天子地方千里分爲百縣縣有四郡故春秋傳曰上大夫受郡是也至秦初置三十六郡以監其縣釋名曰郡羣也人所羣聚也渠運切一
CXO扶問分分劑扶問切又方文切五|㿎㿎㾙瘡悶|𢅯囊滿而裂|秎穧秎穫也|坌塵也又房粉切
#焮
iYe香靳焮火氣香靳切六|炘上同（火氣香靳切六）|㾙瘡中冷|𤴾（瘡中冷）|𦜓並上同（瘡中冷）|脪說文曰瘡肉反出也
dYe居焮靳靳固又姓楚有大夫靳尚居焮切五|斤爾雅曰明明斤斤察也又居勤切|㧆覆巾名|㨷說文拭也|劤多力皃
fYe巨靳近附也巨靳切又巨隱切一
hYe於靳㒚依人也於靳切八|懚上同（依人也於靳切八）|隱隈隱之皃又於謹切|檼屋脊又棟也|𤔌所依據也|㥯說文謹也|㶏水名又於覲勤切|㡥㡥裹相著
gYe吾靳垽爾雅曰澱謂之垽吾靳切一
#願
gZu魚怨願欲也念也思也說文云大頭也魚怨切四|𩕾上同說文云顛頂也（欲也念也思也說文云大頭也魚怨切四）|傆說文黠也|愿敬也善也謹也
hZu於願怨恨也說文恚也於願切二|䛄從也說文慰也又於阮切
AZO方願販買賤賣貴也方願切二|畈田昄
eZu去願券券約說文契也釋名曰券綣也相約束繾綣以限也去願切六|絭束腰繩也|勸獎勸也勉也助也教也又姓|虇萌荀又蘆牙|綣繾綣志盟又去阮切|韏典也又革中辨也說文又九萬切
DZO無販万十千又虜三字姓二氏西魏有柱國万紐于謹周書唐瑾樊深並賜姓万紐于氏無販切十八|萬萬舞字林云萬蟲名也亦州名自漢及梁猶爲𦚧䏰縣地後魏分置萬川郡及魚泉縣武德初割信州南浦置浦州貞觀改爲萬州又姓孟軻門人萬章|輓輓車也亦作挽本又音晚|蔓瓜蔓又姓左傳楚有蔓成然|曼長也|蟃螟蛉蟲|鰻魚名|𨞼蜀有𨞼鄉|娩纂文云姓也古萬字|獌獌㹶獸長百尋說文曰狼屬也爾雅曰貙獌似狸|䝡貙獌似狸或作此䝡|𩆊姓梁公子𩆊杰之後|𦂔挽舟繩也|贎贈貨|䡬戰車以遮矢也|㿸皮帨又無遠切|脕肌澤|鬗髮長
CZO符万飯周書云黃帝始炊榖爲飯符万切六|𩚳上同俗又作飰（周書云黃帝始炊榖爲飯符万切六）|閞門欂櫨也|𥹇粉𥹇|㶗泉水|𧉤蟲名
BZO芳万嬎嬎息也一曰鳥伏乍出說文曰生子齊均也或作㛯芳万切十|㽹吐㽹|𨠒一宿酒|𡗹上同（一宿酒）|𣀔小舂|㤆急性|婏說文云兔子也婏疾也|奿說文云其義闕|㪻量也又居願切|汳水在睢陽
dZe居万建立也樹也至也又木名在弱水直上百仞無枝又姓楚王子建之後漢元后傳有建公又州名居万切二|旔捷也
hZe於建堰堰水也於建切十|鄢地名在楚|郾上同（地名在楚）|䞁引與爲價又於面切|傿上同（引與爲價又於面切）|褗郭璞云衣領也|㰽大呼用力|漹水名在襄陽宜城入漢江也|嫣長皃|𡙷說文曰大皃也
iZe許建獻進也禮云大曰羹獻又姓風俗通有秦大夫獻則許建切四|憲法也又姓出姓苑|𧾨走意|瀗水名
iZu虛願楥靴履楥又法也虛願切四|楦俗（靴履楥又法也虛願切四）|韗攻皮治鼓工也亦作䩵又音運|𩋢俗（攻皮治鼓工也亦作䩵又音運）
fZe渠建健伉也易曰天行健渠建切二|腱筋本也
TZi叉万𣀔小舂也亦作䊲叉万切一
kZu于願遠離也于願切一
gZe語堰𤬝瓢也語堰切二|鬳鬲屬
fZu臼万圈邑名臼万切一
dZu居願卛卛物也說文曰抒滿也居願切二|絭弦也
#慁
jai胡困慁悶亂也說文憂也一曰擾也又禮云儒有不慁君王慁猶辱也亦作㥵胡困切四|溷濁也|俒全也|圂廁也一云豕所居也
Eai都困頓說文云下首也亦姓魏志華佗傳有督郵頓子獻都困切三|扽撼扽|敦豎也又都昆徒官二切
Qai蘇困巽卦名說文具也亦作𢁅蘇困切六|顨說文云巽也此易顨卦爲長女爲風者|潠潠水|𠹀上同（潠水）|遜遁也從也伏也恭也|愻順也
eai苦悶困亂也逃也病之甚也悴也極也苦悶切四|𣏔古文（亂也逃也病之甚也悴也極也苦悶切四）|涃水名|𩒱耳門又苦昆切
Hai奴困嫩弱也奴困切四|媆上同（弱也奴困切四）|腝肉腝|抐搵抐按物水中
hai烏困搵烏困切二|䭡相謁食又於恨切
DaC莫困悶說文曰懣也易曰遯世無悶莫困切二|懣煩也又莫緩亡損二切
Pai徂悶鐏說文曰柲下銅也曲禮曰進戈者前其鐏徂悶切五|臶人名魏時張臶又至也|栫木名|𦪚船底孔也|鱒魚名又魚入泥
dai古困睔大目露睛古困切七|睴視皃|琯玉出光也又音管|璭俗（玉出光也又音管）|㴫水名|𧬪摩人也|謴順言謔弄皃出聲譜
BaC普悶噴吐氣普悶切三|歕上同（吐氣普悶切三）|湓水聲
Gai徒困鈍不利也頑也徒困切五|遁逃也隱也去也|遯上同（逃也隱也去也）|鶨癡鳥|𩔂𩔂顐
Oai倉困寸說苑曰度量衡以粟生之十粟爲一分十分爲一寸十寸爲一尺家語云孔子曰布指知寸倉困切二|䍎瓦器又千見切
CaC蒲悶坌塵也亦作坋蒲悶切二|𣴞水聲
gai五困顐禿也五困切二|諢玉篇云弄言
Iai盧困論議也盧困切又虜昆切三|溣水中曳船曰溣|碖大小勻皃又盧本切
AaC甫悶奔甫悶切又音犇一
iai呼悶惛迷忘也呼悶切又呼昆切一
Nai子寸焌然火周禮云遂龡其焌子寸切三|𩯄委髮也|捘左傳曰涉佗捘衛侯之手
#恨
jbS胡艮恨怨也胡艮切一
dbS古恨艮卦名也止也說文限也古恨切四|茛草名|珢石次玉|詪語也
gbS五恨䭓飽也五恨切一
hbS烏恨䭡䭡䭓飽也烏恨切一
#翰
jcS侯旰翰鳥羽也高飛也亦詞翰說文曰天雞赤羽也又姓左傳曹大夫翰胡侯旰切二十五|捍抵捍|扞以手扞又衛也|鼾鼾睡|螒螒天雞爾雅注云小蟲黑身赤頭一名莎雞|垾小堤|豻野狗又音岸|釬釬金銀今相著亦作銲|汗熱汗|悍猛悍|瀚瀚海北海|閈里也居也垣也說文曰閭也門汝南平輿里門曰閈|𤿧射𤿧以皮𤿧臂|駻馬高六尺說文曰馬突也|雗雗鵲鷽別名|䮧馬毛長也|馯姓也|𧃙草名又音寒|䏷䑇䏷刀箭瘡藥出古兵格|忓善也|㢨拒也又關名在巫縣|矸磓也|㲦長毛|㪋說文止也|𩹼魚名
FcS他旦炭火炭又姓西京雜記有長安炭虯他旦切六|歎歎息|嘆上同（歎息）|湠湠漫水廣皃出字林|𣁗𣁗𣁜無文章皃|㛶㛶𡞟無宜適也
hcS烏旰按抑也止也烏旰切七|案几屬也史記曰高祖過趙趙一張敖自持案進食又曹公作欹案臥視書又察行也考也驗也|洝說文曰渜水也|晏晚也又於諫切|荌草也|䢿里名|䅁轢禾
EcS得按旦早也得按切八|疸黃病|鴠䳚鴠鳥名|觛小觶又丁但切|狚獦狚獸名似狼|怛傷也|笪笞也|㡺小舍
GcS徒案憚難也又忌惡也徒案切六|彈行丸又徒丹切|澶澶漫|僤疾也周禮云句兵欲無僤|但辤也又徒亶切|撣撣觸也又徒于切
dcS古案旰日晚也晏也古案切十一|榦楨榦築垣板|倝說文曰日始出光倝倝也俗作𣉙|幹莖幹又強也又姓|杆檀木|𧹳赤色也|盰說文曰目多白也一曰張目也|骭脅也|涆滮滮涆涆水流疾皃|𢁗布袋|矸石淨
gcS五旰岸水涯高者五旰切九|犴獄也又五干切|豻野狗|頇頭無髮也|䮗𩢔䮗馬行又馬白頟至脣|㷳說文云火色也讀若鴈|𡹼厝也|喭弔失國又五弁切|𨲊長大
ecS苦旰侃正也苦旰切又苦旱切六|偘上同（正也苦旰切又苦旱切六）|靬乾革|看又苦干切|衎樂也|䳚䳚鴠鳥名
icS呼旰漢水名又姓姓苑云東莞人呼旰切九|暵日氣乾|𤳉耕田|熯火乾又人善切|䍐枹䍐縣在河州亦作罕枹音扶|𡅽呼也|𤅩水濡乾也|䎯冬耕地|厂山石之崖
IcS郎旰爛火熟又明也郎旰切七|爤上同見說文（火熟又明也郎旰切七）|瀾波也又音蘭|𢒞粲𢒞文章皃|糷飯相著爾雅曰摶者謂之糷|鑭光鑭|讕逸言又蘭嬾二音
HcS奴案攤按攤也奴案切又他丹切六|灘水奔又他丹切|難患也又奴丹切|𦍀縕也|㬮說文曰安㬮溫也|𢆃巾捫撋又塗著也
OcS蒼案粲鮮好皃又優也察也明也亦作㛑又姓出姓苑蒼案切六|㛑詩傳云三女爲㛑又美好皃詩本亦作粲說文又作𡛝|燦明淨皃|璨美玉又璀璨|薒草可爲席|𪆶鳥名
QcS蘇旰繖蓋也蘇旰切又蘇旱切六|𢿱分離也布也說文作𢽳分離也散雜肉也今通作散又蘇旱切|散見上注（分離也布也說文作𢽳分離也散雜肉也今通作散又蘇旱切）|帴二幅說文帬也|䈀說文曰竹器也|𩀼說文曰繳𩀼也一曰飛散也
NcS則旰贊佐也出也助也見也說文本作贊則旰切十一|讚稱人之美|酇縣名在南陽|饡羹和飯也|趲散走|灒水濺|𩛻食也|㜺女從|䰖髮光澤也|襸衣好皃|攢訟也
PcS徂贊㜺不謹也一曰美好皃徂贊切五|䏼禽獸食餘|𣧻同上（禽獸食餘）|穳禾肥死又在丸切|囋譏囋嘲也又才葛切
#換
jci胡玩換易也胡玩切九|逭逃也迭也轉也步也周也|𩁧上同（逃也迭也轉也步也周也）|肒皰肒|垸漆骨垸也|䯘上同（漆骨垸也）|漶漫漶不可知也|䀓睕䀓轉目又大目皃|𤴯癰疽屬也
Nci子筭䂎鋋也子筭切二|鑽錐鑽
hci烏貫惋驚歎烏貫切六|腕手腕|𢯲上同（手腕）|捥亦同|睕睕䀓大目|琬琬圭又於阮切
dci古玩貫事也穿也累也行也又姓漢有趙相貫高古玩切二十八|矔張目|祼祭名說文曰灌祭也|館館舍也周禮五十里有市市有館館有積以待朝聘之客俗作舘|瓘玉升左傳曰瓘斚玉瓚杜預云瓘珪也|罐汲水器也|𤼐病也|痯上同（病也）|灌水名在廬江又聚也澆也漬也又姓漢有灌嬰|雚雚雀鳥|鸛上同（雚雀鳥）|樌木叢生也|鏆臂鐶|㷄楚人云火|懽憂無告也|錧車軸頭鐵一曰江南人呼犁刃|爟烽火說文曰取火於日官名舉火曰爟周禮曰司爟掌行火之政令|遦行也|冠冠束白虎通曰男子幼娶必冠女子幼嫁必笄又姓列仙傳有仙人冠先又音官|觀樓觀釋名曰觀者於上觀望也說文曰諦視也爾雅曰觀謂之闕亦姓左傳楚有觀起又音官|涫沸也|悹憂也|悺上同（憂也）|盥說文曰澡手也从臼水臨皿也春秋傳曰奉匜沃盥|棺殮屍又音官|毌穿也|婠好皃|䘾袴別名
Oci七亂竄逃也誅也放也藏也匿也從鼠在穴中七亂切五|鑹小矟|爨炊爨又姓華陽國志云昌寧大姓有爨習蜀志云建寧大姓蜀錄有交州刺史爨深|殩殩孝秦人云饋喪家食|䂎鋋也本音鑽俗爲槍䂎字
gci五換玩弄也五換切五|貦說文上同（弄也五換切五）|翫習也|妧好皃|忨忨貪
Gci徒玩段分段也又姓出武威本自鄭共叔段之後風俗通云段干木之後段氏有出遼西者本鮮卑檀石槐之後晉將段匹磾徒玩切三|毈毈壞|椴木名
Ici郎段亂理也又兵寇也不理也俗作乱郎段切四|灓絕水渡也亦作亂|𢿢煩也|𤔔理也
Eci丁貫鍛打鐵丁貫切六|腶籤脯|碫礪石|斷決斷俗作𣂾断|瑖石之似玉|踹足踹
Fci通貫彖易有彖象通貫切四|褖后衣|貒野豚|湪水名
ici火貫喚呼也火貫切八|嚾上同（呼也火貫切八）|𡅽上同出說文（呼也火貫切八）|煥火光|奐文彩明皃又姓|渙水散又音翽|𥈉國在流沙東|喛恚也又虛元切
Qci蘇貫筭計也數也說文曰筭長六寸計歷數者也又有九章術漢許商杜忠吳陳熾魏王粲並善之世本曰黃帝時隷首作數蘇貫切四|蒜葷菜也張騫使西域得大蒜胡荽|笇竹器|祘明也
DcC莫半縵說文曰繒無文也漢律曰賜衣者縵表白裏莫半切十|幔帷幔|漫大水|𣁜𣁗𣁜|𦔔不蒔之田也|獌狼屬又音萬|䝢上同（狼屬又音萬）|墁所以塗飾牆又莫干切|鏝上同又鏝刀工人器（所以塗飾牆又莫干切）|謾欺也又莫干切
AcC博漫半物中分也博漫切七|絆羈絆|靽上同（羈絆）|姅傷孕|𩢔𩢔䮗馬行|㪵五升|𠯘𠯘喭失容
BcC普半判剖判又分也普半切八|泮泮宮禮記作頖|頖見上注（泮宮禮記作頖）|沜水涯|胖牲之半體|姅傷孕又音半|冸冰散|牉牉合夫婦也本亦作判周禮云媒氏掌萬民之判
CcC薄半叛奔他國薄半切四|𡞟㛶𡞟無宜適也|畔田界也|伴伴奐見詩
Hci奴亂偄偄弱也奴亂切五|愞上同（偄弱也奴亂切五）|稬稻稬也|渜浴餘汁也|𪋐說文曰鹿麛也
Pci在玩攢聚也在玩切一
eci口喚䥗燒鐵炙也口喚切二|䲌魚撞罩聲
#諫
ddS古晏諫諫諍直言以悟人也又姓風俗通云漢有治書侍御史諫忠古晏切三|澗溝澗爾雅曰山夾水澗亦作磵𡼏|鐧車閒鐵也
gdS五晏鴈禮曰孟春之月鴻鴈來賓白虎通曰贄用鴈者取其隨時五晏切六|鳫上同（禮曰孟春之月鴻鴈來賓白虎通曰贄用鴈者取其隨時五晏切六）|雁鳥也出說文|贗僞物|偐上同（僞物）|𤜵逐獸犬
hdS烏澗晏柔也天清也又晚也又姓左傳齊有晏氏代爲大夫烏澗切五|騴馬尾白也|䁙目相戲也|鴳爾雅曰鳸鴳郭璞云今鴳雀|鷃上同（爾雅曰鳸鴳郭璞云今鴳雀）
VdS所晏訕謗也所晏切又所攀切七|汕魚乘水上|狦獸名似狼說文曰惡健犬也|𦌔取魚網也|疝病也又所姦切|柵籬柵又又革切|䴮餅麴
jdS下晏骭脛骨下晏切又音旰二|娨慢也
DdC謨晏慢怠也倨也易也俗作𢢔謨晏切五|嫚侮易|謾欺謾|縵緩縵|㾺牛馬病又莫駕切
hdi烏患綰鉤繫烏患切三|贃支財貨出文字指歸|𩈬面曲皃
jdi胡慣患病也亦禍也憂也惡也苦也又姓出何氏姓苑胡慣切九|𢠶古文（病也亦禍也憂也惡也苦也又姓出何氏姓苑胡慣切九）|擐擐甲|宦仕宦亦閹宦又學也左傳云宦三年矣|轘車裂人又音還|豢穀養畜又牛馬曰芻犬豕曰豢|䍺獸名似羊無口出山海經|槵無槵木名|繯縞文
ddi古患慣習也古患切六|丱𩮰角也幼稚也|摜摜帶|倌主駕官也又音官|串穿也習也|矔矔眮轉目
Vdi生患㝈雙生子亦作孿生患切又所眷切二|涮涮洗也
Tdi初患篡奪也逆也初患切一
gdi五患薍菼薍五患切一
UdS士諫輚臥車又寢車亦作轏士諫切五|棧木棧道又士限切|虥虎淺毛又士限切|𧮺谷在上艾|䗃馬䗃蟲名
BdC普患襻衣襻普患切一
Mdi女患奻訟也女患切一
TdS初鴈鏟削木器又初限切|䴼穀麥䴼也|羼羊相閒也初鴈切三
KdS丑晏㬄赤色也丑晏切三|㾺牛馬病
#襇
deS古莧襇襇裙古莧切六|𤜵逐虎犬|閒廁也瘳也代也送也迭也隔也又音平聲|覸視也|𨣉醎也|𧙧古衣
jeS侯襇莧菜名侯襇切三|藖莝餘|粯粉頭粯子
CeC蒲莧瓣瓜瓠瓣也蒲莧切五|辨具也周禮曰以辨民器又步免切|辦俗（具也周禮曰以辨民器又步免切）|𥌊小見|釆說文云辨別也象獸指爪分別也
BeC匹莧盼美目匹莧切二|𥌊小兒白眼視也
jei胡辨幻幻化胡辨切一
DeC亡莧蔄人姓亡莧切一
LeS丈莧袒衣縫解又作䘺丈莧切三|綻上同（衣縫解又作䘺丈莧切三）|䋎補縫
AeC晡幻扮打扮晡幻切一
dei古幻鰥鰥視古幻切一
#霰
QfS蘇佃霰雨雪雜又作䨘𩆵釋名曰霰星也水雪相搏如星而散說文云霰稷雪也蘇佃切九|䨘（雨雪雜又作䨘𩆵釋名曰霰星也水雪相搏如星而散說文云霰稷雪也蘇佃切九）|𩆵並上同（雨雪雜又作䨘𩆵釋名曰霰星也水雪相搏如星而散說文云霰稷雪也蘇佃切九）|㪇散也|𢊰舍也亦作𪎘|先先後猶娣姒又姓出河東又蘇前切|汛灑汛又所隘息進二切|軐轉軐車迹|𥰳紡𥰳也
OfS倉甸蒨草盛倉甸切十三|茜草名可染絳色|輤載柩車蓋大夫以布士以葦席|綪青赤色|倩倩利又巧笑皃|芊芊菄草木相雜皃|䛹䛹數|棈木名|𢂺䛹當音絢也又幧頭|𧚫𧛸也|䍎紡錘說文曰瓦器也又七鈍切|䑶輕舟|篟青竹
ifi許縣絢文彩皃許縣切八|絃上同（文彩皃許縣切八）|敻營求也又休娉切|眴目動又音舜|駽青驪馬也|𧾣走皃|㧦擊也|讂流言有所求也又古縣切
jfi黃練縣郡縣也釋名曰縣懸也懸於郡也古作寰楚莊王滅陳爲縣縣名自此始也又姓孔子門人縣單父黃練切十五|寰古文（郡縣也釋名曰縣懸也懸於郡也古作寰楚莊王滅陳爲縣縣名自此始也又姓孔子門人縣單父黃練切十五）|袨好衣|眩瞑眩書曰若藥弗瞑眩厥疾弗瘳|炫明也火光也|衒自媒|𧗳上同（自媒）|䝮行䝮賣|贙獸名又音泫|𩑹顋後|迿出表辝|姰狂也又相倫切|玹玉名|䀏目搖|眴上同（目搖）
dfi古縣睊視皃古縣切十一|讂流言|瓹盆底孔|䣺說文曰𨢌酒也𨢌音歷|𦌾鳥羅|罥綰也|懁急性|䡓車搖|獧躍也|狷急也又音絹|㢾𩪧也
GfS堂練電陰陽激曜釋名曰電殄也乍見則殄滅也堂練切十八|殿宮殿風俗通曰殿堂象東井形刻爲荷菱荷菱水物所以厭火又都甸切|奠設奠禮注云薦也陳也書傳云定也|畋平皃|澱澱滓亦藍澱也|淀陂淀泊屬|甸郊甸書曰五百里甸服|佃營田|鈿寶鈿以寶飾器又音田|闐于闐國在西域或作窴又音田|涏美好皃|𪑩藍𪑩染者也|填塞填|窴上同（塞填）|壂堂基|㞟偫也又音頂|𡱂髀也|𧽍走也
FfS他甸瑱玉名說文曰以玉充耳也詩曰玉之瑱也他甸切又音田四|顛上同（玉名說文曰以玉充耳也詩曰玉之瑱也他甸切又音田四）|滇滇㴐大水又音田|睼迎視又音啼
IfS郎甸練白練又姓何氏姓苑云南康人郎甸切十五|浰水疾流皃|鍊鍊金|揀揀擇|楝木名鵷鶵食其實|㼑瓜㼑|鰊魚名似鱦|僆雞未成也|萰草名|堜堜塘墟名在吳郡|湅熟絲也周禮曰㡛氏湅絲|𣿊熟𣿊|㪝搥打物也|𣞰䉛蠶|𤗛木解理也
dfS古電見視也又姓出姓苑古電切又胡電切二|鋻鋻鐵
HfS奴甸晛日光奴甸切四|㬗上同（日光奴甸切四）|㜣姓也|㲽說文曰水也
efS苦甸俔罄也譬也苦甸切八|牽牽挽也又苦堅切|菣爾雅曰蒿菣又去刃切|蜆爾雅曰蜆縊女郭璞曰小黑蟲赤頭喜自經故曰縊女又音哯|㯠橫㯠木|涀水名|汧泉出不流|䵖穄也又口典切
jfS胡甸見露也胡甸切四|現俗（露也胡甸切四）|涀水名|𨘇無違
gfS吾甸硯筆硯釋名云硯研也研墨使和濡也吾甸切六|研磨研又音平聲|𨁍行不正也|𤜵逐虎犬也|豜爾雅云麕絕有力豜|趼趼骨
hfS於甸宴安也息也於甸切十三|驠馬名|燕說文云玄鳥也作巢避戊己|鷰俗今通用（說文云玄鳥也作巢避戊己）|醼醼飲周禮云以饗燕之禮親四方之賓客詩云鹿鳴燕羣臣嘉賓也古無酉今通用亦作宴|讌讌會本亦同上（醼飲周禮云以饗燕之禮親四方之賓客詩云鹿鳴燕羣臣嘉賓也古無酉今通用亦作宴）|嬿嬿婉並也又於典切|嚥吞也|咽上同（吞也）|㬫星無雲出說文|溎大水皃|酀邑名|𥉛視也或作𥍂
NfS作甸薦薦席又薦進也說文曰獸之所食艸古者神人以廌遺黃帝帝曰何食何處曰食薦夏處川澤冬處松柏又姓出姓苑作甸切廌丈買切二|𧲛畜食
DfC莫甸麪束晳麪賦云重羅之麪塵飛雪白莫甸切八|麵上同（束晳麪賦云重羅之麪塵飛雪白莫甸切八）|瞑瞑眩|眄斜視|㴐滇㴐水大皃|𡧍冥合|𩈹𩈹炫汗血|𥻩屑米
BfC普麵片半也判也析木也普麵切三|䏒半體也|㸤爾雅革中絕謂之㸤革車轡勒也本亦作辨
PfS在甸荐重也仍也再也在甸切七|洊水荒曰洊亦再也易曰洊雷震|臶重至又魏有高士張臶戴鵀之鳥巢其門陰者又徂悶切|栫圍也左傳云栫之以棘|瀳水名|袸小帶|𨷳門次
hfi烏縣䬼饜飽烏縣切四|裫廣雅云衣衿袖曲處|噮甘不猒也|肙小蟲也又空也
EfS都甸殿軍在前曰啓後曰殿又殿最漢書音義云上功曰最下功曰殿都甸切又堂練切三|唸唸㕧呻也亦作𠿍𣢁經典又作殿屎|𠿍見上注（唸㕧呻也亦作𠿍𣢁經典又作殿屎）
ifS呼甸𩎌在背曰𩎌亦作韅呼甸切又呼典切一
#線
QgS私箭線線縷也周禮云縫人掌王宮縫線之事以役女御縫王及后衣服私箭切四|綫細絲出文字指歸說文同上（線縷也周禮云縫人掌王宮縫線之事以役女御縫王及后衣服私箭切四）|惗思惗|鮮姓也本音平聲
XgS之膳戰懼也恐也又姓之膳切二|顫四支寒動
ZgS時戰繕補也時戰切十二|鄯鄯善西域國名|擅專也|膳食也|饍上同（食也）|僐廣雅云姿態|禪封禪又禪讓傳受|䄠古文（封禪又禪讓傳受）|單單父縣亦姓|𤮜器緣|𦉕上同（器緣）|嬗說文緩也一曰傳也漢書霍去病子名嬗
gga魚變彥美士魚變切六|唁弔失國說文曰弔生也詩曰歸唁衛侯|喭上同（弔失國說文曰弔生也詩曰歸唁衛侯）|甗甑也|諺俗言|這迎也
egW去戰譴問也責也怒也讓也亦姓去戰切五|遣人臣賜車馬曰遣車又去尠切|䪈𦝫帶|晵雨而晝止|繾又去演切
dgm吉掾絹縑也廣雅曰䋷𦇎鮮支縠絹也吉掾切五|狷褊急又古縣切|鄄鄄城縣在濮州|㯞㯞青木皮葉可作衣似絹出西域焉耆國|䚈視也
kgq王眷瑗玉名王眷切又于願切五|援接援救助也亦姓|媛淑媛|褑佩帶|院垣院
DgG彌箭面向也前也說文作𡇢顏前也俗作靣彌箭切二|偭說文曰鄉也禮少儀云尊壺者偭其鼻
Ygi尺絹釧鐶釧續漢書曰孫程十九人立順帝各賜金釧指鐶尺絹切四|竁穿也又初稅切|穿貫也又音川|諯相讓也
lgi以絹掾宮名以絹切四|緣衣緣|𢐄弓𢐄|𩘍再揚穀又小風也
JgS陟扇𩥇馬土浴陟扇切三|𧝑周禮王后之六服其一曰𧝑衣|襢上同（周禮王后之六服其一曰𧝑衣）
cgi人絹𤲬城下田人絹切又而兗切一
NgS子賤箭箭竹高一丈節閒三尺可爲矢爾雅曰東南之美者有會稽之竹箭子賤切九|𥳭古文（箭竹高一丈節閒三尺可爲矢爾雅曰東南之美者有會稽之竹箭子賤切九）|鬋女鬢垂皃|葥草名|湔水名在蜀|榗木名|籛陸終子名又子田切|濺濺水又作甸切|煎甲煎又將仙切
YgS昌戰硟展繒石昌戰切一
agS式戰扇崔豹古今注舜作五明扇說文扉也式戰切四|煽火盛皃又音羶|傓熾盛|𧎥蠅動翅也說文曰蠅醜𧎥|𦶋草名|𥰢竹
hgW於扇躽怒瞋於扇切三|𥈔視皃又於殄切|堰堰埭
dgq居倦眷眷屬說文顧也居倦切十五|睠上同（眷屬說文顧也居倦切十五）|捲西捲縣名在日南|弮曲也又書弮今作卷|卷上同（曲也又書弮今作卷）|桊牛拘|帣囊也亦三斛爲一帣|絭連弩三十絭共一臂|犈爾雅云牛腳黑犈又音權|觠爾雅云羊屬角三觠羷郭璞云觠角三匝|𧯦黃豆又求晚切|餋祭名|䖭䖭蠾蜘蛛別名|𢍏說文曰摶飯也隷省作龹眷字類從此俗作灷|勬勤也又居員切
fgq渠卷倦疲也猒也懈也說文又作劵勞也或作勌渠卷切五|𣜨緣鞾縫也|韏上同（緣鞾縫也）|襈重繒|淃水名
Igi力卷戀慕也力卷切四|灓又音亂|䜌何承天云姓也漢有䜌秘爲汝南郡太守|孌順也
Kgi丑戀猭獸走草丑戀切二|鶨鳥名又音彖
AgK彼眷變化也通也易也又姓出姓苑彼眷切一
Vgi所眷𨏉𨏉車軸所眷切二|㝈一乳兩子亦作孿又生患切
Ogi七絹縓絳色七絹切又七全切三|諯相責|𥆊更視見皃說文作𢌨相顧視而行也又弋絹切
CgK皮變卞縣名在魯又姓出濟陰本自有周曹叔振鐸之後曹之支子封于卞遂以建族皮變切十五|拚擊手|抃上同（擊手）|弁周冠名|㝸上同（周冠名）|汴水名在陳留亦州名秦屬三川郡漢爲陳留郡留鄭邑爲陳所并遂名之東魏置梁州周改爲汴州|㺕犬鬭聲|閞門欂櫨又音飯|昪日光皃|匥笥也|䒪雀草|笲竹器|㺹玉名|忭喜皃|䪻䪻冠
Rgi辝戀㳬回泉辝戀切九|鏇轉軸裁器|縼長繩繫牛馬放|𢳄上同（長繩繫牛馬放）|旋遶也|嫙好皃|䍻羊也|𧾩走也|𦛔𦛔短者
Qgi息絹選息絹切八|𤂳飲也|𤂿口含水濆|䍻羊也|𦌔罥獸足網|䠣上同（罥獸足網）|繏索也|渲小水
Ugi士戀䉵說文曰具食也士戀切九|饌上同（說文曰具食也士戀切九）|𦠆上同見儀禮（說文曰具食也士戀切九）|襈緣也|僎具也|譔專敬|𤩄珍𤩄|僝見也具也|𠨎具也
Sgi莊眷孨謹也莊眷切一
Lgi直戀傳訓也釋名曰傳傳也以傳示後人也直戀切又直專丁戀二切二|𦁆𦁆繞也
PgS才線賤輕賤又姓風俗通云漢有北平太守賤瓊才線切三|諓巧讒皃|餞酒食送人
RgS似面羨貪慕又餘也又姓列仙傳有羨門似面切二|䢭遮也
BgG匹戰騗躍上馬匹戰切二|偏又音篇
Zgi時釧𢮨縣繩望時釧切二|叀說文曰專小謹也
MgS女箭輾水輾女箭切二|碾上同（水輾女箭切二）
Jgi知戀囀韻也又鳥吟知戀切三|傳郵馬釋名曰傳傳也人所止息去後人復來轉轉相傳無常人也又直專直戀二切|轉流轉又張兗切
lgS予線衍水也溢也豐也予線切又以淺切八|莚蔓莚不斷|羨延也進也|狿獌狿大獸名長八尺|延曼延不斷其莚也|涎湎涎水流|䢭移也|𠻤大笑
CgG婢面便利也婢面切又音平聲一
LgS持碾邅逐也持碾切又張連切二|纏纏繞物也
IgS連彥𤹨疰𤹨惡病也連彥切二|摙按摙之皃
egq區倦䄐祭祀區倦切三|絭臂繩|䠣罺網
Xgi之囀剸切肉皃之囀切一
AfC方見徧周也說文帀也方見切二|遍俗（周也說文帀也方見切二）
#嘯
QhS蘇弔嘯說文曰吹聲也蘇弔切五|歗籀文（說文曰吹聲也蘇弔切五）|㩋打也|䐹切肉合糅|熽火皃
FhS他弔糶賣米也他弔切十|𥺋俗（賣米也他弔切十）|眺視也|覜周禮曰大夫眾來曰覜寡來曰聘|趒越也|咷叫咷楚聲又音桃|頫薛琮云低頭聽本又音府|窱䆞窱深邃皃|鋽鉎鋽|絩綺絲數也
EhS多嘯弔弔生曰唁弔死曰弔多嘯切又音的七|伄伄儅不當皃|瘹瘹星狂病|釣釣魚淮南子曰詹公釣千歲之鯉詹公古善釣者呂氏春秋曰太公釣於滋泉以遇文王|窵窵窅深也|蔦寄生草|𨑩至也又音的
dhS古弔叫呼也古弔切十二|訆說文曰大呼也|徼循也小道也|𢅎行縢又古鳥切|譥訐也又痛聲也|激水急又古歷切|噭噭噭深聲|嘂大壎說文曰高聲也一曰大呼|獥狼子|㰾歌也|鸄爾雅云鸄鶶鷵似烏而蒼白色|𨎬𨎬車轊
HhS奴弔尿小便也或作溺奴弔切二|㞙古文（小便也或作溺奴弔切二）
GhS徒弔藋藜藋也徒弔切七|銚燒器又音姚|掉振也搖也又徒了切|調選也韻調也又音苕|莜草田器又音苕|𥁮上同（草田器又音苕）|嬥嬥嬈不仁又徒了切
ehS苦弔竅穴也苦弔切二|𢶡旁擊亦作撽
IhS力弔𩕐𩕐顤長頭力弔切九|尥牛脛交|嫽嫽悷又音僚|料料度量也又音僚|嘹病呼|鐐美金又音僚|璙玉名|𦌒魚網|炓火光
ghS五弔顤五弔切五|獟狂犬|澆韓浞子名又音梟|鼼仰鼻又牛救切|嘄叫也
hhS烏叫窔隱暗處亦作㝔東南隅謂之㝔俗作穾烏叫切二|䆞䆞窱幽深皃又音杳
iwf火即ihS火弔㱇a說文云悲意也火弔切三|嬈b嬥嬈不仁又而沼切|娎b娎㛍喜皃
#笑
QiS私妙笑欣也喜也亦作笑私妙切五|㗛俗（欣也喜也亦作笑私妙切五）|肖似也小也法也像也|韒刀韒|鞘上同（刀韒）
XiS之少照明也之少切五|炤上同（明也之少切五）|詔上命釋名曰詔照也照人暗不見事以此示之使昭然也又告也教也|𨹸隄也界也|𠧙卜問也又音邵
liS弋照燿熠燿說文照也弋照切十七|鷂鷙鳥也莊子曰鷂爲鸇鸇爲布穀此物變也|搖搖動又音遙|覞普視說文曰並視也|𧡷上同（普視說文曰並視也）|耀光耀|曜日光也又照也|𧢢視誤也|𥌺上同（視誤也）|㞁行不正也|𤪎遺玉又音由|筄屋上薄也|趭走也|鷣一名負雀|䔄菟絲也又帝女花也|艞對艞江中大船|讑誤言皃
hiW於笑要約也於笑切又於招切三|葽草盛皃又於招切|約又於略切
LiS直照召呼也直照切一
ZiS寔照邵邑名又姓出魏郡周文王子邵公奭之後寔照切七|召上同（邑名又姓出魏郡周文王子邵公奭之後寔照切七）|劭自強也|𠧙卜問也又音韶|𠣫倒懸鉤也|䬰小食又尺邵切|卲高也
fia渠廟嶠山道又山銳而高渠廟切又音喬二|轎𨋕車也又音喬
BiG匹妙剽強取又輕也匹妙切十一|彯彯𦘕|㬓置風日中令乾|漂水中打絮韓信寄食於漂母又撫招切|僄僄狡輕迅|翲飛皃|䏇聽纔聞出字林|勡劫也|摽摽落|嫖身輕便也|慓急疾
PiS才笑噍嚼也才笑切又子幺子由二切四|誚責也|劁刈也|趭走也
DiG彌笑妙好也彌笑切三|玅上同（好也彌笑切三）|篎爾雅云小管也
OiS七肖陗山峻亦作峭七肖切八|峭上同（山峻亦作峭七肖切八）|篍竹簫洛陽亭長所吹又七流切|㴥峻波|哨壺口黯者名也|俏俏措好皃|帩帩縛|𪑊𪑊䵴
IiS力照尞說文曰祡祭天也凡從尞者作𡨶同力照切八|燎照也一曰宵田又放火也又力小切|㙩周垣|𤻲𤻲病說文治也|療上同（𤻲病說文治也）|熮火皃|膫炙也|鷯爾雅云鶉一名鷯其雄曰鵲又音僚
eia丘召趬行輕皃丘召切五|𠿕𠿕𧇠不安|㢗玉篇云高屋|譑譑弄|㚁高㚁
gia牛召𧇠𠿕𧇠牛召切一
NiS子肖醮祭也子肖切十一|𥛲上同（祭也子肖切十一）|釂飲酒盡也|皭白色|潐盡也|爝火|䩌面不光|僬行容止皃禮曰庶人僬僬|趭走皃|𥡤物縮小又作癄|䂃目瞑
DiK眉召廟皃也齊職儀曰周有守禮之官掌先王之宗廟也亦作庿眉召切二|庿上同（皃也齊職儀曰周有守禮之官掌先王之宗廟也亦作庿眉召切二）
CiG毗召驃驃騎官名又馬黃白色毗召切又卑笑匹召二切一
aiS失照少幼少漢書曰少府秦官掌山海池澤之稅以給供養又漢複姓五氏說苑趙簡子御有少室周魯惠公子施叔之後有少施氏家語魯有少正卯孔子弟子有少叔乘何氏姓苑有少師氏失照切又失沼切二|燒放火又失昭切
KiS丑召脁祭也丑召切一
AiK方廟裱領巾也方廟切二|俵俵散
fiW巨要翹尾起也巨要切又巨堯切一
ciS人要饒益饒人要切又人招切二|繞卷取物皃
#效
jjS胡教效具也學也象也又效力效驗也胡教切八|効俗（具也學也象也又效力效驗也胡教切八）|校校尉官名亦姓周禮校人之後又音教|斅學也書曰惟斅學半|㤊快也出孟子|傚教也詩曰是則是傚毛萇云言可法傚也|𣱓誤也|詨詨叫
djS古孝教教訓也又法也語也元命包云天垂文象人行其事謂之教教之爲言傚也古孝切十一|𢼂古文（教訓也又法也語也元命包云天垂文象人行其事謂之教教之爲言傚也古孝切十一）|窖倉窖|校檢校又考校|鉸鉸刀又裝鉸|酵酒酵|覺睡覺又音角|膠膠黏物又音交|較不等又音角|𡥈又音交|珓杯珓古者以玉爲之
ijS呼教孝孝順爾雅曰善父母爲孝孝經左契曰元氣混沌孝在其中天子孝龍負圖庶人孝林澤茂又姓風俗通云齊孝公之後呼教切六|哮喚也又音虓|涍水名在河南|嗃大嗥又呼各切|詨上同（大嗥又呼各切）|𡦳解廌屬又音教
JjS都教罩竹籠取魚具也都教切五|䈇上同（竹籠取魚具也都教切五）|䍜說文曰覆鳥令不得飛走也|䞴䞴趟跳皃|鵫鵫雉今白雉也
AjC北教豹獸名崔豹古今注曰豹尾車周制也象君子豹變尾言謙也古軍正建之今唯乘輿建焉廣志曰狐死首丘豹死首山又姓風俗通曰八元叔豹之後北教切五|𧭤𧭤譟惡怒吏也|𢖔𢖔直史官|爆火裂又音駮|䶂鼠屬能飛食虎豹出胡地又音酌
ejS苦教敲擊也苦教切又苦交切三|礉礉磽又口交切|巧巧僞山海經曰義均始爲巧倕作百巧也又苦絞切
DjC莫教皃儀皃莫教切七|䫉說文同上（儀皃莫教切七）|貌籀文（說文同上）|䡚引也|𢂹幗也|緢旄雜絲也說文音苗|𢅉綵雜文也
BjC匹皃奅起釀亦大也匹皃切六|窌上同說文窖也（起釀亦大也匹皃切六）|炮灼皃又步交切|拋拋車又普交切|皰面生氣也又旁教切|礮礮石軍戰石也
KjS丑教趠行皃丑教切二|踔猨跳
VjS所教稍均也小也說文曰出物有漸也所教切七|潲豕食又雨濺也|揱木上小或作𣕇|𣕇上同（木上小或作𣕇）|娋小娋侵也|𨛍大夫食邑|𦓴𦔔種
LjS直教棹檝也直教切四|櫂上同（檝也直教切四）|濯浣衣又直角切|㷹火急煎皃
MjS奴教橈木曲奴教切又如昭切四|淖泥淖|𠆴不靜又猥也擾也|鬧上同（不靜又猥也擾也）
SjS側教抓爪刺也側教切三|癄縮也小也亦作㾭|笊笊籬
CjC防教靤面瘡防教切五|皰面生氣也|鞄治皮|鉋鉋刀治木器也|骲手擊
TjS初教抄略取也初教切八|鈔上同（略取也初教切八）|縐惡絹也又初爪切又側救切|耖重耕田也|仯仯仯小子|觘角上也|𦨖船不安也|罺小網
hjS於教靿靴靿於教切五|袎襪袎|㑃很也戾也出字林|箹竹節又於角切|軪車有機
gjS五教樂好也五教切又岳洛二音三|磽礉磽又五交切|𩳔醜皃
UjS士稍巢棧閣也士稍切又士交切一
#号
jkS胡到号号令又召也呼也諡也亦作號胡到切六|號上同又乎刀切（号令又召也呼也諡也亦作號胡到切六）|𤩭石似玉也|㙱上釜|䜂相欺|𡟷女字
GkS徒到導引也徒到切十四|翿舞者所執|纛左纛以犛牛尾爲之大如斗繫於左騑馬軶上|悼傷悼|蹈踐也|盜盜賊|燾覆也又徒刀切|幬上同（覆也又徒刀切）|䆃嘉禾一莖六穗|儔隱也|𨱵長皃|𠺛年九十或作𡄒|䊭黏也|䌦不青不黃
EkS都導到至也又姓出彭城本自高陽氏楚令尹屈到之後漢有東平太守到質都導切六|禱祭也請也文字音義云得福曰祠求福曰禱又當老切|倒倒懸又當老切|𤓾姓也出河內|𧛔衣背縫|菿大也
dkS古到誥告也謹也古到切七|郜國名在濟陰又姓晉有高昌長郜玖|告報也說文作𠰛又音梏|縞白縑又音藁|膏膏車又音高|𣝏苦木|烄交木然也
gkS五到傲慢也倨也說文作敖餘倣此五到切八|嫯慢也|䫨頭長|鏊餅鏊|驁馬名|奡陸地行舟人也|謷志遠皃|鷔鷔鳦魚鳥狀也
DkC莫報冃說文曰小兒蠻夷頭衣也莫報切十九|帽頭帽|耄老耄亦作𦒷見經典省|𧂕上同見說文（老耄亦作𦒷見經典省）|芼菜食又擇也搴也謂拔取菜也芼以蘋蘩爲羹亦草覆蔓|眊目少睛|瑁圭名天子所執|𤣽古文（圭名天子所執）|冒覆也涉也又莫北切|𥈆低目細視|旄狗足旄尾毛|毛毛鷹鷂鸇|媢夫妬婦出說文|𩿂鳥輕毛|𢯾手扶之也|覒邪視也亦作㲘|㲝鳥毛盛也|䋃刺也絹帛毛起如刺也|𣔺說文曰門樞之橫梁
IkS郎到嫪悋物又姓郎到切八|澇淹也又水名或作潦|潦上同（淹也又水名或作潦）|勞勞慰又郎刀切|僗俗（勞慰又郎刀切）|髝髝髞麤急皃又音牢|癆癆痢惡人說文曰朝鮮謂飲藥毒曰癆|𣟽麻莖大也又施絞於𣝜也
OkS七到操持也又志操七到切又七刀切七|造至也又昨早切|艁古文（至也又昨早切）|慥言行急|㿷米穀雜|糙上同（米穀雜）|鄵鄭地名
CkC薄報暴侵暴猝也急也又晞也案說文作曓疾有所趣也又作㬥晞也今通作暴亦姓漢有繡衣使者暴勝之薄報切九|虣上同周禮曰以刑教中則民不虣（侵暴猝也急也又晞也案說文作曓疾有所趣也又作㬥晞也今通作暴亦姓漢有繡衣使者暴勝之薄報切九）|曝曝乾俗|瀑瀑雨|勽說文覆也|菢鳥伏卵|袍衣前襟又云今朝服垂衣又薄高切|𤔣姓也出姓苑|𪇰鳥名又博木切
AkC博秏報報告下婬曰報博秏切一
PkS在到漕水運穀在到切二|𢲵手攪也
hkS烏到奧深也內也主也藏也爾雅曰西南隅謂之奧烏到切十一|懊懊悔|䐿藏肉埤蒼云鳥胃也|𩟇妬食|隩說文曰水隈崖也|燠燠釜以水添釜|䜒語也|镺長也|墺四墺四方土又於六切|𩼈小鰌名|澳澳深又水名
QkS蘇到喿羣鳥聲蘇到切九|譟羣呼|噪上同（羣呼）|瘙疥瘙|㿋上同（疥瘙）|髞髝髞|埽埽灑說文棄也又桑道切|掃上同（埽灑說文棄也又桑道切）|𢤁情性疎皃
ekS苦到𩝝餉軍苦到切五|犒上同（餉軍苦到切五）|稾槀飫書篇名|靠相違也|䯪䯪䫨大頭
NkS則到竈淮南子曰炎帝作火死而爲竈則到切三|躁動也|趮疾也
ikS呼到秏減也亦稻屬呂氏春秋云飯之美者南海之秏又姓出何氏姓苑俗作耗呼到切四|好愛好亦璧孔也見周禮又姓出纂文又呼老切|𡚽姓也或作𡥆|藃藃縮也
HkS那到腝臂節那到切三|𨱵長皃|腦優皮也
#箇
dlS古賀箇箇數又枚也凡也古賀切三|个明堂四面偏室曰左个也|個偏也
jlS胡箇賀慶也擔也勞也加也亦姓出會稽河南二望本齊之公族慶封之後漢侍中慶純避安帝諱改爲賀氏又虜複姓九氏北俗謂忠貞爲賀若魏孝文以其先祖有忠貞之稱遂以賀若爲氏周書賀蘭祥傳曰其先與魏俱起有紇伏者爲賀蘭莫何弗因以爲氏賀拔勝傳云其先與魏俱出陰山代爲酋長北方謂土爲拔爲其摠有地土時人相賀因爲賀拔氏後自武川徙居河南也南燕錄有輔國大將軍賀賴盧後魏書有賀葛賀婁賀兒賀遂賀悅等氏胡箇切四|𧝂䘸袖也|袔上同（䘸袖也）|㵑水名
NlS則箇佐助也則箇切六|左左右又作可切|𠡃副也|㝾行不正也|袏襌衣|作造也本臧洛切
ElS丁佐跢小兒行也丁佐切四|癉勞也|痑病也|哆語助聲
IlS郎佐邏游兵也郎佐切三|𧟌婦人衣|㿚病也
elS口箇坷坎坷不平也口箇切四|軻轗軻不遇也孟子居貧轗軻故名軻字子居又苦哥切|蚵爾雅商蚵蟲一名蛶又胡哥切|艐船著沙不行也
glS五个餓不飽也五个切一
GlS唐佐馱負馱唐佐切二|大又唐蓋切
HlS奴箇奈奈何奴箇切又奴帶切二|那語助又奴哥切
QlS蘇箇些楚語辝蘇箇切又音細一
ilS呼箇呵噓氣呼箇切又呼哥切二|㰤㰤㰤大笑
FlS吐邏拖牽車吐邏切一
#過
dli古臥過誤也越也責也度也古臥切七|裹包也又音果|鐹鎌也亦作划|划上同（鎌也亦作划）|𧒖蟷蠰也即螗蜋|㳀水名|𩟂食也出玉篇
jli胡臥和聲相應胡臥切又音禾三|盉調味|俰和也
Nli則臥挫摧也則臥切三|夎拜失容又詐也經典作蓌|侳安也有也
eli苦臥課稅也試也第也苦臥切七|堁堀堁塵起皃|敤研治|髁髀骨也|𡱼上同（髀骨也）|㾧禿㾧|科滋生也又音窠
Fli湯臥唾說文云口液也湯臥切七|涶上同（說文云口液也湯臥切七）|毻鳥易毛也|蛻蛇去皮|嫷好皃|毤落毛|𧝍無袂衣也
AlC補過播揚也放也弃也說文種也一曰布也又姓播武殷賢人補過切五|𢿥古文（揚也放也弃也說文種也一曰布也又姓播武殷賢人補過切五）|簸簸揚又布火切|番獸走|譒敷也謠也
Oli麤臥剉破也麤臥切二|莝斬草|銼蜀呼鈷䥈
DlC摸臥磨磑也摸臥切又莫采切四|䃺上同（磑也摸臥切又莫采切四）|塺塵也|摩按摩又莫禾切
Hli乃臥愞弱也或從需下文同乃臥切又乃亂切四|堧沙土又而緣如兗二切|稬秫名|𤲬城下田又隍池內也
BlC普過破破壞又虜三字姓三氏北齊書有破六韓常後魏書有北境賊破六汗拔陵又西方破多羅氏後改爲潘氏普過切二|頗又普禾切
Pli徂臥座牀座徂臥切二|坐被罪又藏果切
gli吾貨臥寢也釋名曰臥化也精氣變化不與覺時同也說文曰休也从人臣取其伏也吾貨切一
OlS千過諎諎磨千過切二|𢯽拭𢯽
ili呼臥貨財也蔡氏化清經曰貨者化也變化反易之物故字有化也呼臥切一
Gli徒臥惰惰懈也徒臥切四|媠嬾婦人也|𧝍無袂衣也|𧱫猪別名也
CmO符臥縛符臥切一
Ili魯過䇔痿病也魯過切七|𢺑擊物之名|䌴不紃也又不均也|㱻畜產疫病|𡰠膝病|摞理也|𠏢𠏢弱也
Eli都唾𣑫木本都唾切四|㛊量也|剁剁斫剉也|挆落帆
OlS七過磋磨磋治象牙七過切一
Qli先臥䐝䑁膏也先臥切一
hlS安賀侉痛呼也安賀切一
hli烏臥涴泥著物也亦作汚烏臥切又烏官切又於阮切一
#禡
DnC莫駕禡師旅所止地祭名莫駕切九|榪牀頭橫木|鬕婦人結帶|㾺牛馬病又音慢說文曰目病一曰惡气著身也一曰蝕創|罵惡言|䧞增益又巧也|䣕縣名在犍爲又音馬|𧪨多言|傌齊大夫名
dnS古訝駕行也乘也說文曰馬在軶中也古訝切十二|稼稼穡種曰稼斂曰穡|嫁家也故婦人謂嫁曰歸|瘕腹病|架架屋亦作枷禮記曰不同椸枷|椵舉閣|價價數|假借也至也易也休假也又古雅切|幏蠻夷賨布|𢉤𢉤屋閒也|𦙺𦙺䐒不密|賈賈人知善惡
hnS衣嫁亞次也就也醜也衣嫁切十|俹倚俹|𣇩姓也|㰳欭㰳驢鳴欭乙利切|稏𥝧稏稻名|𦜖𥝧膪肥皃|啞啞啞鳥聲|婭爾雅曰兩壻相謂爲亞或作婭|䢝次第行|襾覆也覆覈覂賈從此又許下切
inS呼訝嚇笑聲呼訝切又呼格切八|罅孔罅|唬虎聲|𧫒誑𧫒|㙤地名在晉|謑怒言|煆赫也熱也乾也|㗿詬㗿責怒
gnS吾駕迓迎也吾駕切六|訝嗟訝亦上同（迎也吾駕切六）|犽獸名|齖齰齖不相得也|枒木名一云車輞合處|砑碾砑
KnS丑亞詫誑也丑亞切三|侘侘傺失志見楚詞|𧬮相誤
JnS陟駕吒吒歎說文曰噴也叱怒也陟駕切十二|咤上同禮記曰無咤食（吒歎說文曰噴也叱怒也陟駕切十二）|奼美女又丁故切|灹火聲|哆哆㕦大口|奓張也開也又陟加切|䐒䐒䏧相黏也|𢕮𢕮步立也|膪𦜖膪肥也|䒲䒲葿黃芩別名|㓃祭奠酒爵又丁故切|𨶃上同（祭奠酒爵又丁故切）
SnS側駕詐僞也側駕切六|溠周禮職方氏云河南曰豫州其浸波溠春秋傳云楚子除道梁溠|咋咋語聲|笮笮酒器也|醡壓酒具也出證俗文|榨打油具也出證俗文
UnS鋤駕乍鋤駕切五|䄍年終祭名或作蜡廣雅曰夏曰清祀殷曰嘉平周曰大䄍秦曰臘也|蜡上同（年終祭名或作蜡廣雅曰夏曰清祀殷曰嘉平周曰大䄍秦曰臘也）|齰齰齖|𧧻說文曰慙語也
RoS辝夜謝辝謝又姓出陳郡會稽二望辝夜切三|榭臺榭爾雅曰有木者謂之榭|㴬水名
enS枯駕髂𦝫骨枯駕切六|𩩱上同（𦝫骨枯駕切六）|疴小兒驚|𧩶𧩶詬巧言才也|㰤大笑|𠳌歎聲
jnS胡駕暇閑也書曰不敢自暇自逸俗作睱胡駕切四|夏春夏又胡雅切|下行下又胡雅切|芐蒲苹草
PoS慈夜褯小兒褯慈夜切五|藉以蘭茅藉地又慈亦切|躤踐也|䤳鏡䤳|䣠亭名在貝丘
loS羊謝夜舍也暮也君子有四時朝以聽政晝以訪問夕以修令夜以安身又姓羊謝切三|射僕射|鵺鳥名似雉
YoS充夜䞣怒也一曰牽也充夜切又丑格切二|斥山名爾雅曰東北之美者有斥山之文皮焉又音尺
QoS司夜蝑鹽藏蟹司夜切又司余切四|卸卸馬去鞍|瀉吐瀉又音寫|䉣笘䉣
XoS之夜柘木名亦姓之夜切七|樜上同（木名亦姓之夜切七）|鷓鷓鴣鳥似雉南飛|䗪𧑓蝜蟲名亦作蟅|嗻多語之皃|炙炙肉周書曰黃帝始燔肉爲炙又之石切|蔗甘蔗
NoS子夜唶歎聲子夜切二|借假借又將昔切
aoS始夜舍屋也又姓古作舍始夜切五|赦赦宥|騇牡馬|涻文字音義云涻水出北嚻山也|厙姓也出姓苑今台括有之又昌舍切
boS神夜射白矢參連剡注襄尺井儀射白勻參遠剡注讓尺井儀又姓三輔決錄云漢末有大鴻臚射咸本姓謝名服天子以爲將軍出征姓謝名服不祥改之爲射氏名咸神夜切又音石又音夜僕射也四|䠶上同見說文（白矢參連剡注襄尺井儀射白勻參遠剡注讓尺井儀又姓三輔決錄云漢末有大鴻臚射咸本姓謝名服天子以爲將軍出征姓謝名服不祥改之爲射氏名咸神夜切又音石又音夜僕射也四）|麝獸名爾雅曰麝父麕足又翠山之陰多麝|貰貫賒也貸也
AnC必駕霸國語曰霸把也把持諸侯之權又姓益部耆舊傳有霸相必駕切七|𧟶俗（國語曰霸把也把持諸侯之權又姓益部耆舊傳有霸相必駕切七）|弝弓弝|欛刀柄名|靶轡革|灞水名|垻蜀人謂平川爲垻
BnC普駕帊帊幞通俗文曰帛三幅曰帊帊衣幞也普駕切二|怕怕懼
jni胡化摦寬也大也胡化切七|㕦大口|崋崋山西嶽亦州名春秋時秦晉之分境後魏置東雍州改爲崋州又姓出平原殷湯之後宋戴公考父食采於其崋後氏焉|華上同（崋山西嶽亦州名春秋時秦晉之分境後魏置東雍州改爲崋州又姓出平原殷湯之後宋戴公考父食采於其崋後氏焉）|樺木名|鱯魚名似鮎白大|檴亦木名又胡郭切
ini呼霸化德化變化禮記曰田鼠化爲鴽紀年曰周宣王時馬化爲狐又姓呼霸切六|𠤎變也從到人|諣疾言|𩲏鬼變|𩵏魚名|杹木名皮可爲索
eni苦化跨越也又兩股閒苦化切三|胯兩股閒也|㐄一步也又口瓦切
Vni所化誜枉也所化切二|傻傻偢不仁
CnC白駕𤝡獸名似狼白駕切六|杷田器又白巴切|𩹏海魚|𦫙色不真也|跁跁踦短人|𥝧𥝧稏稻名
MnS乃亞䏧膩也乃亞切二|絮絲結亂也
OoS遷謝笡斜逆也遷謝切二|䞣䞣脚立也
VnS所嫁嗄老子曰終日號而不嗄注云聲不變也所嫁切又於介切三|𦔯姓也|沙周禮云鳥皫色而沙鳴注云沙嘶也又所加切
dni古罵坬土埵古罵切二|𧬮相𧬮誤也
LnS除駕䖳水母也一名蟦形如羊胃無目以蝦爲目除駕切二|䅊開張屋皃
gni五化瓦泥瓦屋五化切一
hni烏㕦攨吳人云牽亦爲攨也烏㕦切三|窊𢈈下處也|䠚䠚蹃踏地用力
#漾
lpS餘亮漾水名在隴西餘亮切十二|恙憂也病也又噬蟲善食人心也|羕長大也|颺風飛|煬炙也向也暴也|㨾式㨾|養供養|眻美目兒|諹謹也讙也|䭐餌也|㺊㺊獸如師子食虎豹及人|瀁水溢蕩皃
IpS力讓亮朗也導也亦姓出姓苑力讓切十五|諒信也相也佐也又姓後漢有諒輔|掠笞也奪也取也治也|悢悢悢悲也|緉履屐雙也|㹁牛色雜也|兩車數|踉踉蹡行不迅也|量合斗斛|𣄴字統云事有不善曰𣄴薄|𩗬北風又音涼|䁁目病|䀶上同（目病）|哴唴哴啼也|涼薄也又呂張切
UpS鋤亮狀形狀鋤亮切一
cpS人㨾讓退讓責讓又交讓木名兩樹相對一枯則一生岷山有之人㨾切四|欀道木|攘文字指歸云揖攘又音穰|懹憚也
apS式亮餉餉饋式亮切十|傷未成人死或作殤又音商|向人姓出河內本自有殷宋文公支子向文旰旰孫戍以王父字爲氏又許亮切|蟓桑繭即桑蠶也|曏少時也不久也|慯憂也|𤵼上同（憂也）|饟爾雅曰饁饟饋也又自家之野曰饟|蠰食桑蟲似天牛|珦玉名
JpS知亮帳帷帳釋名曰小帳曰斗帳形如覆斗也漢書曰東方朔云陛下誠能用臣朔之計推甲乙之帳知亮切五|脹脹滿|痮上同（脹滿）|漲大水又陟良切|張張施又陟良切
KpS丑亮悵失志丑亮切十|暢通暢又達也亦姓陳留風俗傳曰暢氏出齊|鬯匕鬯又香草|韔弓衣|䩨上同（弓衣）|𧀄草盛|昶達也日長也通也遠也又丑兩切|畼不生也|𥠴穧也|𥇔失志
ipe許亮向對也窻也說文曰北出牖也从宀口詩云塞向墐戶許亮切八|珦玉名又音餉|曏又音餉|䦳門頭也說文曰門響也|蠁蛹中蟲也又許兩切|萫萫芼食|𧬰非美言也|嚮與向通用
LpS直亮仗器仗也又持也直亮切三|長多也又直良切|瓺瓶也又音腸
MpS女亮釀醞酒女亮切三|𥽬雜也|䖆菜也又如養切
PpS疾亮匠工匠漢書曰將作少府秦官掌理宮室又姓風俗通云凡氏於事巫卜陶匠是也疾亮切三|䞪行皃|𪀘自關以東謂桑飛爲女𪀘郭璞云工雀今謂之巧婦也
XpS之亮障界也隔也又步障也王君夫作絲巾步障三十里石崇作錦障五十里以敵之之亮切五|㢓上同（界也隔也又步障也王君夫作絲巾步障三十里石崇作錦障五十里以敵之之亮切五）|墇墇塞|嶂峯嶂|瘴熱病
ZpS時亮尚庶幾亦高尚又飾也曾也加也佐也韻略云凡主天子之物皆曰尚尚醫尚食等是也又姓後漢高士尚子平又漢複姓有尚方氏時亮切四|上君也猶天子也又時兩切|丄古文（君也猶天子也又時兩切）|償備也還也又音常
SpS側亮壯大也側亮切三|裝行裝又側良切|𣴣𣴣米入甑
hpe於亮怏情不足也於亮切四|䬬飽也|詇智也又早知也|㿮青面
fpe其亮弶張取獸也其亮切又魚兩切一
YpS尺亮唱發歌又導也亦作誯倡尺亮切四|𪛋籀文（發歌又導也亦作誯倡尺亮切四）|廠露舍|倡導引先又音昌
TpS初亮刱初也說文曰造法刱業也初亮切四|創上同又初良切（初也說文曰造法刱業也初亮切四）|愴悽愴|凔寒也
NpS子亮醬說文作酱醢也漢書武帝使唐蒙風曉南越南越食蒙蜀蒟醬子亮切四|𨡰籀文（說文作酱醢也漢書武帝使唐蒙風曉南越南越食蒙蜀蒟醬子亮切四）|𨟻古文（轎𨋕魚向切二）|將將帥
gpe魚向𨋕轎𨋕魚向切二|仰又魚兩切
BpO敷亮訪謀也敷亮切三|妨妨礙又敷方切|邡邑名
DpO巫放妄虛妄又亂也誣也巫放切六|望看望說文曰出亡在外望其還也亦祭名又姓何氏姓苑云魏興人又音亡|朢弦朢說文曰月滿與日相望似朝君也又音亡|忘遺忘又音亡|汒谷名在京兆也|𧫢責也
ipu許訪況匹擬也善也矧也說文曰寒水也亦脩況琴名又姓何氏姓苑云今廬江人許訪切四|况俗（匹擬也善也矧也說文曰寒水也亦脩況琴名又姓何氏姓苑云今廬江人許訪切四）|𣍦山名|貺賜也與也
dpu居況誑欺也居況切四|㤮㤮惑也|俇往也又遠行也|臦乖也
kpu于放迋往也勞也于放切五|旺美光|暀上同（美光）|㤮誤人|王霸王又盛也又于方切
ApO甫妄放逐也去也甫妄切四|舫並兩船又音謗|趽曲脛馬名|𨾔鳥名
QpS息亮相視也助也扶也仲虺爲湯左相漢書曰相國丞相皆秦官金印紫綬掌丞天子助理万物亦州名春秋時屬晉秦邯鄲郡地魏初以東部爲陽平郡西部爲廣平郡兼魏王都爲三魏後魏置相州取河亶甲居相之義周自故鄴移於安陽城也又姓後秦錄有馮翊相雲作德獵賦又漢複姓三氏前趙錄有偏將軍相里覽又務相氏廩君之姓也晉惠時空相機殺平南將軍孟觀息亮切又息良切一
dpe居亮殭屍勁硬也居亮切一
epe丘亮唴唴哴小兒啼也丘亮切三|𥇉䁁𥇉目病|羻陳桓子名
OpS七亮蹡踉蹡行不正皃七亮切一
fpu渠放狂輒爲也渠放切二|誆謬言
CpO符況防守禦也符況切一
#宕
GqS徒浪宕洞室一曰過也亦州名禹貢梁州之域秦漢魏晉諸羌處之後魏內附置蕃鎮周爲宕州也徒浪切七|踼跌踼行失正又音唐|碭石又山名又縣名在梁郡又音唐|逿過也|𦿆䕞𦿆毒藥|𡇈碎石聲|嵣嵣㟐山皃
IqS來宕浪波浪謔浪游浪又姓晉永嘉末張平保青州爲其下浪逢所殺來宕切又魯當切五|閬高門又閬中地名在蜀又閬風崑崙峯名也|埌冢也|䕞䕞𦿆|蒗蒗蕩渠名在譙
jqS下浪吭鳥咽下浪切三|行次第|笐衣架
hqS烏浪盎盆也又姓出姓苑烏浪切二|醠濁酒
gqS五浪枊繫馬柱五浪切三|䭹馬怒又五郎五朗二切|𡵙山名在越剡縣界
NqS則浪葬葬藏也則浪切一
CqC蒲浪傍蒲浪切又蒲郎切二|徬徬附
PqS徂浪藏通俗文曰庫藏曰帑徂浪切又徂郎切三|奘說文曰駔大也|𨌄修車
EqS丁浪譡言中理丁浪切六|儅不中|瓽大甕一曰井甃說文云大盆也又姓姚弋仲將瓽耐虎|當主當又底也亦音蟷|擋摒擋|闣閃闣人
eqS苦浪抗以手抗舉也縣也振也苦浪切十二|閌閌閬門高|炕火炕|犺猰犺不順|伉伉儷敵也又姓漢有伉喜爲漢中太守出風俗通|亢高也旱也亦姓出姓苑|蚢蟲名爾雅云蚢蕭繭|砊砊硠石聲|邟邑名|𪎵黃色|阬門也又口庚切|頏咽頏
AqC補曠螃蟲名似蝦蟆補曠切四|搒棹船一歇|舫舫人習水者也|謗誹謗
FqS他浪儻倖也他浪切六|摥排摥|湯熱湯也又他郎切|蕩蒗蕩渠又土郎徒朗二切|盪盪行又度朗切|鐋工人治木器
eqi苦謗曠空明也遠也大也久也又姓苦謗切五|爌上同（空明也遠也大也久也又姓苦謗切五）|矌目無䀕也|壙墓宂|纊絮也又細緜也禹貢豫州厥貢厥篚纖纊又作絖
HqS奴浪儾緩也奴浪切三|灢泱灢濁|㚂坱㚂塵
QqS蘇浪喪亡也蘇浪切又音桑二|𠸶上同（亡也蘇浪切又音桑二）
jqi乎曠攩廣雅云搥打也乎曠切四|擴上同（廣雅云搥打也乎曠切四）|潢釋名曰染書也又音黃|暀暀明
dqi古曠桄織機桄古曠切又古黃切二|光上色又古黃切
dqS古浪鋼古浪切又古郎切二|掆捎掆舁也出字林
iqi呼浪荒草多皃呼浪切一
DqC莫浪漭漭浪大野莫浪切三|吂老人不知|㟐嵣㟐山皃
hqi烏浪汪水臭也烏浪切二|䤑潑䤑酒
#映
hsa於敬映明也隱也於敬切四|暎上同（明也隱也於敬切四）|賏頸飾|詇早知也又音怏
dsa居慶敬恭也肅也慎也又姓陳敬仲之後出平陽風俗通後漢有揚州刺史敬歆居慶切四|竟窮也終也又姓出何氏姓苑|鏡拾遺錄曰穆王時渠國貢火齊鏡廣三尺六寸暗中視如晝人向鏡語則鏡中響應之晉鎮南大將軍甘卓照鏡不覩其頭視庭樹而頭在樹上|獍獸名食人
fsa渠敬競爭也強也逐也高也遽也渠敬切七|𥪰俗（爭也強也逐也高也遽也渠敬切七）|誩爭言|倞強也|檠檠子曡名|儆儆慎又音警|曔明也
esa丘敬慶賀也福也亦州名周之先不窋之所居春秋爲義渠戎國城本漢郁郅縣魏文置朔州隋爲慶州州立嘉名也亦姓左傳齊大夫慶封又漢複姓有慶師慶忌慶父三氏出姓苑丘敬切一
drS古孟更易也改也說文作㪅古孟切又古衡切一
DsK眉病命使也教也道也信也計也召也眉病切一
CsK皮命病憂也苦也說文曰疾加也皮命切四|評平言又音平|坪地名說文作坪地平也|枰獨坐版牀一曰投博局又音平
DrC莫更孟長也勉也始也又姓出平昌武威二望本自周公魯桓公之子仲孫之胤仲孫爲三桓之孟故曰孟氏莫更切四|䁅䁅盯瞋目|朚朚倀失道皃又音忙倀猪孟切|盟盟津又音明
jri戶孟蝗蟲名戶孟切又音皇三|㶇說文曰小津也一曰以船渡也|橫非理來又音宏
AsK陂病柄本也權也柯也陂病切六|棅說文同上（本也權也柯也陂病切六）|怲憂心也|邴邑名又姓左傳魯大夫邴洩|鈵堅鈵|寎驚病
ksq爲命詠歌也爲命切五|咏上同（歌也爲命切五）|泳潛行水中|禜祭名周禮禜門用瓢齎又永兵切|醟酗酒
jrS下更行景迹又事也言也下更切又胡郎胡浪胡庚三切五三|絎刺縫|胻脛也
hrS於孟瀴瀴㵾冷也於孟切一
TsS楚敬㵾冷也楚敬切一
JrS猪孟倀朚倀失道猪孟切又丑良切五|趟䞴趟行皃|偵廉視|㡧開張畫繒也出文字指歸|𩏠張皮也
KrS他孟牚邪柱也他孟切一
ArC北孟榜榜人船人也北孟切三|𧻓走也|跰史記云歲星晨出爲跰踵
LrS除更鋥磨鋥出劒光或作䂻除更切三|𥊼住視|䂻塞也
VsS所敬生所敬切又所京切三|鼪鼬鼠|貹財富
gsa魚敬迎迓也魚敬切一
CrC蒲孟膨脹也蒲孟切一
irS許更䛭瞋語許更切一
hri烏橫𥥈小水皃烏橫切一
#諍
StS側迸諍諫諍也止也亦作爭側迸切一
AtC北諍迸散也北諍切一
CtC蒲迸𠊧皆也俱也蒲迸切一|䨻雷䨻䨻聲
htS鷖迸䙬文字集略云襇錯綵郭璞江賦云䙬以蘭紅鷖迸切二|嫈小心態
gtS五爭鞕堅牢五爭切二|硬上同（堅牢五爭切二）
iti呼迸轟眾車聲也呼迸切又呼宏切二|輷上同（眾車聲也呼迸切又呼宏切二）
#勁
duW居正勁勁健也居正切一
OuS七政倩假倩也七政切又七見切二|凊溫凊
XuS之盛政政化釋名曰政正也下所取正也亦姓出姓苑之盛切四|正正當也長也定也平也是也君也亦姓左傳宋上卿正考父之後魏志有永昌太守正帛又漢複姓漢有郎中正令宮又之盈切|証諫証|鴊雞也又之盈切
auS式正聖生也通也聲也風俗通云聖者聲也言聞聲知情故曰聖式正切一
LuS直正鄭鄭重慇懃亦州名秦屬三川郡史記管叔鮮之所封也宋武置司州於武牢皆魏爲北豫州周爲滎州隋罷滎州於管城置鄭州又姓滎陽彭城安陸壽春東陽五望本自周宣王封母弟友於鄭及韓滅鄭子孫以國爲氏今之望多滎陽直正切三|呈自媒衒又音程|㽀甖也
KuS丑鄭遉邏候也丑鄭切三|偵偵問|𩇜覗也
QuS息正性性行也息正切二|姓姓氏說文云姓人所生也古之神聖母感天而生子故稱天子从女生聲又姓漢書貨殖傳臨菑姓偉貲五千万
IuS力政令善也命也律也法也力政切又力盈切又歷丁切二|詅自街賣也
BuG匹正聘聘問也訪也匹正切三|娉娶也|俜伶俜
ium休正敻遠也休正切四|詗自言長|醟酗酒又爲命切|矎直視皃
AuG畀政摒摒除也畀政切三|併兼也並也皆也|并專也
CuG防正偋偋隱僻也無人處字統云廁也防正切又蒲徑切二|庰上同（偋隱僻也無人處字統云廁也防正切又蒲徑切二）
PuS疾政淨無垢也疾政切八|㵾古文（無垢也疾政切八）|穽陷穽又音靜|䝼䝼賜|靚裝飾也古奉朝請亦作此字|請延請亦朝請漢官名張禹首爲之又秦盈親井二切|婧竦立|𩓞𩓞首說文好皃
ZuS承正盛多也長也又姓後漢西羌傳有北海太守盛苞其先姓奭避元帝諱改姓盛承正切又音成三|墭塸器|晟明也熾也器也
DuG彌正詺詺目或單作名彌正切一
euW墟正輕墟正切又去盈切一
i2Q許含iuW許令𣢝a含笑也許令切二|𩈡b面𩈉𩈡也
NuS子姓精強也子姓切又音旌一
#徑
dvS古定徑步道古定切七|經經緯又古靈切|逕近也|𠲮猿聲|俓直也|𩰹隔也|桱桱木似杉而硬
HvS乃定甯邑名亦姓說文作甯所願也乃定切四|佞諂也一曰才也俗作侫|濘泥濘|鸋爾雅鸋鴂鴟屬也楚詞云鸋鴞之鳴
QvS蘇佞腥豕息肉肉中似米蘇佞切又音星三|醒酒醒又蘇丁先頂二切|睲目睲
jvS胡定脛腳脛釋名曰脛莖也直而長似物莖也胡定切二|踁上同（腳脛釋名曰脛莖也直而長似物莖也胡定切二）
GvS徒徑定安也亦州名帝堯始封唐國之城秦爲趙郡鉅鹿二郡漢爲中山郡後魏置安州又改爲定州以安定天下爲名徒徑切四|掟天掟出道書|廷朝廷又音亭|錠錫屬
EvS丁定矴矴石丁定切九|釘又得庭切|訂字林云逗遛也|定題額詩云定之方中定營室也又徒徑切|飣貯食|奠上同（貯食）|𦘭亦同|顁題顁|錠豆有足曰錠無足曰鐙
evS苦定罄盡也說文曰器中空也苦定切七|𥥻說文空也|磬磬石樂器周禮曰磬人爲磬|殸籀文（磬石樂器周禮曰磬人爲磬）|𪊑爾雅云鹿絕有力又堅牽二音|𨆪一足行|鑋金聲
FvS他定聽待也聆也謀也他定切又音廳三|汀汀瀅不遂志又音廳|侹俓侹直也代也儆也
OvS千定靘䒌靘青黑千定切二|掅捽也
DvC莫定䒌莫定切二|暝夕也
hvi烏定鎣鎣飾也烏定切四|瑩上同說文曰玉色一曰石之次玉者（鎣飾也烏定切四）|𢣙志恨也|瀅小水
IvS郎定零零落郎定切又魯丁切三|𢺰插空皃又魯丁切|令令支縣在遼西郡
#證
XwS諸應證驗也諸應切二|烝熱又音蒸
lwS以證孕懷孕以證切七|䵴面黑子|賸增益一曰送也又物相贈|媵送女從嫁|㑞㑞送行也|鱦小魚|膡大視又雙也
bwS實證乘車乘也實證切又食陵切七|鱦魚子|媵又音孕|𣎜孕也|嵊山名在剡縣也|賸又音孕|剩剩長也
cwS而證認認物而證切又而振切四|扔強牽引又音仍|芿草不翦|㭁上車又木名
hwe於證應物相應也說文作應當也於證切又音膺三|譍以言對也|噟上同（以言對也）
NwS子孕甑古史考曰黃帝始作甑子孕切四|䰝上同（古史考曰黃帝始作甑子孕切四）|𩱭籀文（古史考曰黃帝始作甑子孕切四）|䙢汗襦
iwe許應興許應切又許陵切三|臖腫起|嬹悅也喜也
awS詩證勝勝負又加也克也亦州名春秋時戎狄地戰國時晉趙地漢雲中五原也隋置榆林鎮屬雲州唐武德中改爲勝州詩證切又詩陵切四|膡美目|蕂苣蕂胡麻|榺織機榺也
LwS丈證瞪直視皃陸本作眙丈證切三|𪒘米黑壞|𪑬雲色
IwS里甑𩜁馬食穀多氣流四下也里甑切一
CwK皮證凭依几也皮證切又皮陵切二|靐靐靐雷聲也
YwS昌孕稱愜意又是也等也銓也度也俗作秤云正斤兩也昌孕切又昌陵切二|秤俗（愜意又是也等也銓也度也俗作秤云正斤兩也昌孕切又昌陵切二）
gwe牛𩜁凝牛𩜁切又牛凌切一
ZwS常證丞縣名在沂州匡衡所居常證切又音承一
KwS丑證覴直視丑證切一
fwe其𩜁殑釋典殑伽其𩜁切又其陵切一
#嶝
ExS都鄧嶝小坂都鄧切八|鐙鞍鐙|隥梯隥|橙几橙|凳牀凳出字林|𧄼𧄼𧀧|𩞬祭食|磴巖磴
PxS昨亙贈玩也好也相送也昨亙切二|𪒟皯𪒟
dxS古鄧亙通也遍也竟也出方言古鄧切六|堩路|揯急引又古登切|緪急張亦作絚|䱍魚名|𥔂石連皃
OxS千鄧蹭蹭蹬千鄧切二|𠟂刀割過也
GxS徒亙鄧國名周爲申國平王母申后之家戰國時地楚昭襄王取韓置南陽郡釋名曰在中國之南而居陽地故以爲名始皇三十六郡即其一焉隋以南陽爲縣改爲鄧州取鄧國名之又姓出南陽安定二望殷王武丁封叔父於河北是爲鄧侯後因氏焉徒亙切六|蹬蹭蹬|僜倰僜不著事|𣩟㱥𣩟困病|䮴行欲倒也|幐囊屬
DxC武亙懵悶也武亙切五|䲛魚名|懜不明|𨮒重鐶|𧀧𧀧𧄼新睡起
AxC方隥𥦜束棺下之說文作堋喪葬下土也方隥切二|堋上同又壅江水灌溉曰堋（束棺下之說文作堋喪葬下土也方隥切二）
CxC父鄧倗輔也父鄧切一
IxS魯鄧踜踜蹬行皃魯鄧切二|㱥㱥𣩟
NxS子鄧增剩也子鄧切一
QxS思贈𡬙𡬙𧀧睡覺思贈切一
FxS台鄧𤃶小水相益台鄧切一
#宥
kyO于救宥寬也于救切十六|又又猶更也|佑佐也助也|右左右又于久切|祐神助|䀁抒水器也|𥁓上同（抒水器也）|酭報也|𩑣說文顫也|𤴨上同（說文顫也）|囿說文曰苑有垣一曰禽獸不囿又于目切|姷偶也|忧動曰也|䞥走皃|侑勸食爾雅曰酬酢侑報也|𦳩草名
dyO居祐救護也止也又姓風俗通漢有諫議大夫救仁居祐切十一|灸灼也又居有切|廏馬舍釋名曰廏聚也生馬之所聚也又灸廏並姓出姓苑俗作廏|究窮也深也謀也盡也|㝌說文云貧病也|疚病也|𣪘強擊|匓說文飽也|𧧷文字音義云止也禁也助也|猶爾雅云猶如麂善登木又音由音柚|𨖏恭謹行也
LyC直祐胄胄子國子也說文曰裔也又姓出姓苑直祐切十三|冑介冑說文曰兜鍪也|𩊄古文（介冑說文曰兜鍪也）|酎三重釀酒|宙宇宙|繇卦兆辝也|籀史籀周宣王太史名造大篆|伷系也|䛆詶也|疛心腹疾也|㿒上同（心腹疾也）|駎競馳馬也|懤愁毒
JyC陟救晝日中又姓晝邑大夫之後因氏焉出風俗通陟救切三|咮鳥口又鬬卓二音|噣上同（鳥口又鬬卓二音）
ayC舒救狩冬獵舒救切五|獸說文曰守備者周禮曰獸人掌罟田獸辨其物名字林曰兩足曰禽四足曰獸|守太守|首自首前罪|收穫多
YyC尺救臭凡氣之摠名俗作臰尺救切二|殠腐臭
RyC似祐岫山有穴曰岫似祐切四|𥥉籀文（山有穴曰岫似祐切四）|袖衣袂也亦作褏褎|牰牛黑眥
iyO許救齅以鼻取氣亦作嗅許救切三|嘼嘼㹌亦作畜|珛朽玉
XyC職救呪呪詛職救切四|䯾髮多|椆木椆船篙木也|祝說文曰祭主贊詞又音粥
fyO巨救舊故也亦姓出姓苑巨救切三|柩尸曲禮注曰在牀曰尸在棺曰柩|匶古文（尸曲禮注曰在牀曰尸在棺曰柩）
VyC所祐𤸃𤸃損說文臞也所祐切四|瘦上同（𤸃損說文臞也所祐切四）|漱漱口|鏉鐵鉎鏉
SyC側救皺面皺俗作𤿥側救切五|㾭縮小|甃井甃|縐衣不申又絺之細者|䐢字書云䐢脯也
ByO敷救副貳也佐也又虜姓後魏書副呂氏後改爲副氏敷救切七|仆前倒|𩯅假髻又敷六切|覆蓋也又敷六切|𤸑病重發也|㤱小怒也|褔衣一福今作副
TyC初救簉簉倅一曰齊也初救切三|䔏上同又草根（簉倅一曰齊也初救切三）|遚不進
AyO方副富豐於財又姓左傳周大夫富辰方副切四|輻輻湊競聚又音福|鍑釜而大口一曰小釜|䔰爾雅云䔰葍大葉白華根如指白可食詩云言采其葍葍音福
KyC丑救畜六畜丑救切又許宥許六丑六三切二|俞姓漢有司徒椽俞連又羊朱切
IyC力救溜水溜力救切十九|廖姓周文王子伯廖之後後漢有廖湛|霤中霤神名|嬼美好|鷚雞子一曰鳥子|餾餾飯|瘤赤瘤腫病也出文字集略|窌地名左傳云與之石窌之田|留宿留停待也宿音秀|㙀壣土曰㙀|僇癡行皃|廇屋梁杗也|畂百畝|𥛅留祀祝𥛅|飂高風又古國在南陽湘陽|勠併力又力竹切|翏高飛皃又力幺切|塯瓦飯器也|㽌檼也又力回切
QyC息救秀出也榮也息救切五|繡五色備也尚書大傳曰未命爲士不得衣繡又姓漢書游俠傳有馬領繡君賓|蜏蟲名|琇玉名|宿星宿亦宿留又音夙
NyC即就僦僦賃即就切三|䅢稻稔實又稅也|媨醜老嫗皃
UyC鋤祐驟馬疾步也奔也鋤祐切三|㑳妊身人也|僽僝僽惡言罵也
PyC疾僦就成也迎也即也說文曰就高也从京尢尤異於凡也又姓後魏書菟賴氏後改爲就氏疾僦切四|鷲鳥名黑色多子|殧殧殄又子六切|㠇山名又嶺名
MyC女救糅雜也女救切五|𩚖雜飯亦作粈|腬嘉膳|猱爾雅曰猱蝯善援又奴刀切|狃習也就也又狐狸也
CyO扶富復又也返也往來也安也白也告也扶富切又音服八|𢕒古文（又也返也往來也安也白也告也扶富切又音服八）|𤸑再病|伏鳥菢子又音服|椱機持繒者|𨺅兩阜閒也|覆伏兵曰覆|複重複
lyC余救狖獸名似猨余救切十四|貁上同（獸名似猨余救切十四）|鼬蟲名似鼠|槱積薪燒之|柚似橘而大廣志曰成都柚大如斗爾雅注柚似橙而醋酢出江南|蜼似獼猴鼻露向上尾長四五尺有歧雨則自縣於樹以尾塞鼻又以季切|褎服飾盛皃|油雚子桐花曰油|猶獸似麂善登|𪕏𪕏鼠|櫾木名|輶輶車又音由|牰牛黑眥|蜏不知晦朔又音酉
ZyC承呪授付也又姓出何氏姓苑承呪切六|詶荅也又市州切|㖟口㖟|壽壽考|售賣物出手|綬綵衣皃
cyC人又輮車輞人又切四|蹂蹂踐|煣蒸木使曲也|鞣柔皮又音柔
DyO亡救莓覆盆草也亡救切一
gyO牛救鼼仰鼻牛救切一
eyO丘救𪖛𪖛鼼仰鼻丘救切一
OyC七溜䞭進也七溜切一
#候
jzC胡遘候伺候又姓周禮有候人其後氏焉胡遘切十五|鮜魚名|鄇地名在晉|逅邂逅|訽罵訽|睺半盲|后君也皇后也|後方言云先後猶娣姒|堠今封堠也|鱟郭璞注山海經云冠青黑色形如惠文二足長五六尺似蟹雌常負雄漁者取之必得其雙子如麻子南人爲醬|鍭爾雅曰金鏃翦羽|厚厚薄|䞧蹇行又蒲北切|䞀䞀𧷡貪財之皃|𥀃石蜜膜也
ezC苦候寇鈔也暴也又姓出馮翊河南二望陳留風俗傳云浚儀有寇氏黃帝之後風俗通云蘇忿生爲武王司寇後以官爲氏苦候切十|滱水名在代郡|怐怐愗愚皃|扣扣擊|鷇鳥子亦作㲉生而須哺曰鷇自食曰鶵|㜌㜌瞀無暇|䍍說文曰未燒瓦器也|簆織具|瞉瞉瞀|詬罵又巧言
DzC莫候茂卉木盛也古作懋莫候切十五|貿交易也市賣也又姓出姓苑東莞人|鄮縣名在會稽亦姓出姓苑|戊辰名|愗怐愗|袤廣袤東西曰廣南北曰袤|楙爾雅曰楙木瓜實如小瓜味酢可食|懋美也勉也|瞀瞉瞀|䓮細草叢生|姆女師說文作娒|苺苺子即覆盆|𦼪草名|𠔼重覆又亡保切|雺天氣下地不應
BzC匹候仆倒也匹候切又匐覆二音五|踣上同（倒也匹候切又匐覆二音五）|䞳僵也|㰴語而不受|豧豕息
GzC徒候豆穀豆物理論云菽者眾豆之名也又姓後魏有將軍豆代田徒候切十六|竇空也穴也水竇也又姓出扶風觀津河南三望風俗通云夏帝相遭有窮氏之難其妃方娠逃出自竇而生少康其後氏焉|窬禮曰蓽門圭窬又音俞|逗逗遛又住也止也|酘酘酒|荳荳蔻|脰項脰|郖地名|梪籩豆或作豆古食肉器也|餖飣餖|浢水名|䄈祭福|毭𣯻罽|𩊪車鞁具|𤀨水名|㛒嫗㛒語帖也
EzC都豆鬥說文曰兩士相對兵杖在後象鬥之形凡從鬥者今與門戶字同都豆切九|鬬鬬競說文遇也又姓左傳楚有大夫鬬伯比|鬪俗（鬬競說文遇也又姓左傳楚有大夫鬬伯比）|噣鳥口或作咮又丁救切|䛠䛠譳不能言也|𧱦𧱦尾張衡東京賦云日月會於龍𧱦|斣斠也角力走也又相易物俱等|襡衣袖又時燭切|䬦䬦飣
HzC奴豆槈說文曰薅器也纂文曰耨如鏟柄長三尺刃廣二寸以刺地除草奴豆切六|鎒上同亦出說文（說文曰薅器也纂文曰耨如鏟柄長三尺刃廣二寸以刺地除草奴豆切六）|耨上同五經文字云經典相承從耒久故不可改（上同亦出說文）|𣫌乳也|擩搆擩不解事|譳䛠譳
QzC蘇奏瘶欬瘶蘇奏切七|嗽上同（欬瘶蘇奏切七）|欶上氣|漱漱口又音瘦|鏉𨫒利|謏諵謏怒言也|嗾使狗
NzC則候奏進也說文作𡴝則候切二|走釋名曰疾趨曰走又祖苟切
FzC他候透跳也他候切又書育切五|咅說文作㕻相與語唾而不受也隷變如上|㰯說文同上俗又作哣（說文作㕻相與語唾而不受也隷變如上）|䟝索彄䟝也|𧺢目投下或作𣪌
hzC烏候漚久漬也烏候切三|䙔頭衣|𠹝地名又市由切
dzC古候遘遇也古候切二十|構架也合也成也蓋也亂也|媾重婚|覯見也|姤卦名姤遇也又偶也|購購贖|䝭稟給|雊雉鳴|彀張弓|𤚼取牛羊乳亦作𦎯|句句當又姓華陽國志云王平句扶張翼廖化並爲大將軍時人曰前有王句後有張廖俗作勾|軥軥槅挽車也|㝤夜也|搆搆擩也|怐怐愗愚皃又苦候切|煹舉火也|䃓甃井也又罰也|冓數也|㝅說文曰乳也一曰㝅瞀也|𢄇綿𢄇
OzC倉奏輳輻輳亦作湊倉奏切八|腠膚腠|湊水會也聚也|嗾使犬|𪉮南夷名鹽|蔟太蔟律名又倉谷切|楱橘屬|𧱪溫豕
IzC盧候陋疎惡也說文曰阸陝也盧候切十三|漏漏刻說文曰漏以銅受水刻節晝夜百刻爾雅曰西北隅謂之屋漏又禹耳三漏|鏤彫鏤書傳云鏤剛鐵也又鏤漏並姓出何氏姓苑又力誅切|屚說文曰屋穿水下也从雨在尸下尸屋也一曰笱屚縣名在交阯|瘻瘡也|𦸢𦸢蘆|𧷡䞀𧷡貪財|𨫒鏉𨫒|蔄姓也|𣤋𣤋㰯小兒兇惡|𧫞𧫞詬忽怒|𠞭𠞭㔌細切|僂僂佝短醜皃
izC呼漏蔻荳蔻呼漏切十|豞豕聲|䪷字統云勤作|詬怒也|訽上同（怒也）|吼聲也又呼後切|㰯𣤋㰯|㖃恥辱|佝僂佝|怐上同（僂佝）
CzC蒲候䏽豕肉醬也蒲候切二|𩌏尻衣
gzC五遘偶不期也五遘切一
PzC才奏㔌細切才奏切三|楱𨫒楱鐵齒杷名|䠫醉倒皃出埤蒼
#幼
h0W伊謬幼少也伊謬切一
D0K靡幼謬誤也詐也差也欺也靡幼切二|繆紕繆又姓漢書儒林傳有申公弟子繆生
e0W丘謬䠗䠗蹌行皃丘謬切一
f0W巨幼𧾻𧾻䠗醜行之皃巨幼切一
#沁
O1S七鴆沁水名在上黨亦州名本漢穀遠縣後魏置沁源縣武德初置州因沁水以名之七鴆切四|𠖶𠖶冷|吣犬吐|䈜䈜墨工人具
N1S子鴆浸漬也漸也子鴆切四|濅上同出說文（漬也漸也子鴆切四）|𥧲上同出字林（上同出說文）|祲祅氣也又子心切
c1S汝鴆妊妊身懷孕汝鴆切五|絍織絍亦作紝䋕|鵀戴鵀鳥|任已上四字並又音壬|衽衣衿
L1S直禁鴆鳥名廣志云其鳥大如鴞紫綠色有毒頸長七八寸食蛇蝮雄名運日雌名陰諧以其毛歷飲食則殺人直禁切三|沈又直壬切|㼉青皮瓜名
X1S之任枕枕頭也論語曰飲水曲肱而枕之之任切又之稔切二|針又之林切
f1a巨禁𦧈牛舌下病巨禁切十|䶖（牛舌下病巨禁切十）|𤘡並上同（牛舌下病巨禁切十）|噤說文曰口閉也|𦨽蜀人呼舟|紟紟帶或作襟又音今|鈙說文云持止也讀若琴亦作㯲|凚寒凚|笒笒籛|齽齒向裏
d1a居蔭禁制也謹也止也避王莽家諱改曰省又姓何氏姓苑云今吳興人居蔭切三|僸北夷樂名又居林切|㯲格也
M1S乃禁賃傭賃也借也乃禁切一
h1a於禁蔭說文曰草陰地也於禁切七|䅧苖美|窨地屋|喑聲也|𤷜心中病亦作癊|廕庇廕|飲又於錦切
V1S所禁滲滲漉所禁切二|罧爾雅曰槮謂之涔郭璞云今之作罧者聚積柴木於水中魚得寒入其裏藏隱因以簿圍捕取之又息甚切槮與罧同也
K1S丑禁闖馬出門皃丑禁切二|𧡬私出頭視
S1S莊蔭譖讒也毀也莊蔭切一
T1S楚譖讖讖書釋名曰讖纖也其義纖微楚譖切一
g1a宜禁吟長詠宜禁切一
J1S知鴆揕擬擊史記曰右手揕其胷知鴆切二|㓄掘地㓄又赤黑色
I1S良鴆臨哭臨又偏向良鴆切又音林二|𠐼𠐼侺頭向前
Z1S時鴆甚太過時鴆切二|侺𠐼侺
k1a于禁䫴䫴齘切齒怒皃于禁切二|𪔰鼓聲見兵書
a1S式禁深不淺也式禁切又式今切二|𢊖廕𢊖大屋
#勘
e2S苦紺勘校也苦紺切七|䘓凝血|𧗀上同（凝血）|𪉯鹹味厚|轗轗軻坎壈也|竷擊也|磡巖崖之下
d2S古暗紺青赤色也古暗切五|淦新淦縣在豫章|𧆐薏苡別名|灨縣名南康記云章貢二水合流因其處立縣便以爲名在南康郡亦作贑|贛贛榆縣在琅邪郡
j2S胡紺憾恨也胡紺切七|琀送死口中玉亦作含|浛水和物|唅哺唅|蜭有毛之蟲|莟苗莟心欲秀也|䐄食肉不猒
h2S烏紺暗日無光又默也深也貪也不明也烏紺切二|闇冥也說文曰閉門也
F2S他紺僋僋俕癡皃他紺切八|㶒㶒汛水浮皃|撢深取|㐁無光又舌出皃又吐念切|傝傝儑不自安又吐盍切|䐺食味美|憛憛悇懷憂|誩競言也又渠仰渠政二切
Q2S蘇紺俕僋俕蘇紺切四|閐閐覆蓋也|㤾憛㤾失志|䫅顉䫅搖頭皃
O2S七紺謲怒也七紺切三|參參鼓俗作叅|㽩田隴聮也
G2S徒紺醰酒味不長徒紺切又音譚五|贉買物預付錢也|𤁡沈水底沒𤁡|瞫䀨也又徒南切|𧗜羊血凝
g2S五紺儑傝儑五紺切一
E2S丁紺馾冠幘一曰馬步近前丁紺切三|𩈉頑劣皃|𩾺𩾺鳥
H2S奴紺妠取也奴紺切一
I2S郎紺顲面色黃皃郎紺切三|僋僋伸皃又僋俕不淨|𤃨𤃨㶒浮皃
i2S呼紺䫲面虛黃色呼紺切二|𩞿食不飽也
N2S作紺篸以針篸物作紺切二|撍手撼
#闞
e3S苦濫闞魯邑亦視也又姓左傳齊大夫闞止苦濫切五|瞰視也|𣊟日出皃|嚂呵也又工覽切|𪉿味苦
I3S盧𣊟濫叨濫汎濫盧𣊟切九|㔋刀利|𨣨𨣨觴說文曰泛齊行酒也|纜維舟吳書曰甘寧常以繒錦維舟去輒割弃以示奢|爁火皃|㜮貪也失禮也過差也俗作從水|懢貪也|䆾䆾䆱不平|嚂食皃
F3S吐濫賧夷人以財贖罪吐濫切七|𪊇𪉦𪊇無味|䆱䆾䆱不平|𪉧無味|睒候視|澉薄味|舕舚舕舌出
d3S古蹔𪉦𪉦𪊇無味古蹔切二|𪉿味苦
i3S呼濫𧵊乞戲物或作斂呼濫切三|蘫瓜葅也出說文|䖔虎怒
j3S下瞰憨害也果決也下瞰切又呼甘切六|㺖犬吠聲|譀誇誕東觀漢記曰雖誇譀猶令人熱又呼甲切|䗣瓜蟲|䐄炙令熟或作𤎡|𤎡上同（炙令熟或作𤎡）
G3S徒濫憺恬靜徒濫切又徒敢切八|惔上同（恬靜徒濫切又徒敢切八）|澹水搖動皃|腅相飯也或作啖|淡水味|啗噉也食也|啖誑也|倓安也靜也恬也亦作澹
P3S藏濫暫左傳云婦人暫而免諸國暫猶卒也藏濫切三|蹔上同（左傳云婦人暫而免諸國暫猶卒也藏濫切三）|鏨鐫石又音蠶
E3S都濫擔負也都濫切二|甔甔石大甖又都甘切
Q3S蘇暫三三思蘇暫切又蘇甘切一
#豔
l4S以贍豔美色也以贍切九|艷俗（美色也以贍切九）|爓光也|焰上同（光也）|焱火華也|𢴵豔也|鹽以鹽醃也本音平聲|𤅸上同（以鹽醃也本音平聲）|灩瀲灩水波動皃
Z4S時豔贍賙也時豔切一
c4S而豔染而豔切又如檢切二|髯髯頷毛又人占切
h4W於豔厭論語曰食不厭精於豔切五|𢜰快也又於驗切|猒飽也又於廉切|饜上同（飽也又於廉切）|嬮嬮嬱美女
A4K方驗窆下棺方驗切又方亙切二|砭石針說文曰以石刺病也又甫廉切
g4a魚窆驗證也徵也效也說文云馬名也魚窆切三|噞噞喁魚口|𣄝證也
a4S舒贍閃說文曰闚頭門中也舒贍切又舒斂切四|煔火行皃|苫以草覆屋|掞舒藻
N4S子豔𡄑𡄑㖩不廉子豔切又子廉切一
O4S七豔壍坑也遶城水也七豔切四|塹上同出說文（坑也遶城水也七豔切四）|槧插也論衡曰斷木爲槧釋名曰槧版長三尺者也槧漸也言漸漸然長也又七廉切又才敢切|嬱嬮嬱美女皃
I4S力驗殮殯殮力驗切七|斂聚也又力琰切|瀲泛瀲一曰水波也亦作澰|爁爁焱火延|𧸘市先入值也|𩅼小雨|獫長喙犬名
K4S丑豔覘候也說文云闚視也春秋傳曰公使覘之丑豔切二|䀡視也
Y4S昌豔䠨音譜云馬急行昌豔切八|幨披衣或作襜裧|襜（披衣或作襜裧）|裧並上同（披衣或作襜裧）|韂鞍小障泥|䪜上同（鞍小障泥）|㙴蔽也|䦲闚䦲
h4a於驗𢜰快也於驗切亦作㤿二|俺大也
P4S慈豔潛藏也慈豔切一
X4S章豔占固也章豔切又職鹽切一
#㮇
F5S他念㮇火杖他念切六|舚舌出皃|忝辱也又他玷切|𨸱亭名在京兆|煔火光|㐁無光說文曰舌皃
H5S奴店念思也又姓西魏太傅念賢奴店切二|𦁤字林云挽船篾也
E5S都念店店舍崔豹古今注云店置也所以置貨鬻物也都念切十一|坫墇也屏也|沾水名在上黨說文他兼切|痁病也又式詹切|墊下也又墊江在巴陵又徒協切|𩅀早霜寒|唸呻吟|㝪窮也說文曰屋傾下也|埝下也|𦒻老人面黑皃|䀡目垂皃又丁炎切
Q5S先念䃸䃸磹電光先念切二|䆎禾草不實稴䆎之皃
G5S徒念磹徒念切二|㼭支也出通俗文
d5S紀念趝疾行皃紀念切一
h5S於念酓苦味於念切一
N5S子念僭擬也差也子念切一
P5S漸念䁮閉目思也漸念切一
d5S古念兼古念切又古嫌切二|䱤魚名
e5S苦念傔傔從苦念切一
I5S力店稴稴䆎力店切一
#釅
g8e魚欠釅酒醋味厚魚欠切二|𪙊齒皃
i8e許欠脅妨也許欠切二|姭好皃
e8e丘釅㪁厓下也丘釅切二|𤬯似瓶有耳
D9O亡劒𦲯草木蕪蔓也亡劒切一
#陷
j6S戶韽陷入地隤也戶韽切五|䱤魚名又古念切|臽小坑|䐄說文云食肉不猒也又膇䐄也|錎車鐶
h6S於陷韽下入聲俗作𪛏於陷切四|𤟟犬吠又乙咸切|淊水沒|揞吳人云拋也
S6S莊陷蘸以物內水莊陷切一
J6S陟陷𪉜鹹多陟陷切三|站俗言獨立又作𥩠|𣳤江岸上地名也出活州記
e6S口陷歉歉喙口陷切又口咸切二|䫡䫡顑面長皃又公陷切
L6S佇陷𧸖重買佇陷切三|詀被誑|譧俗（被誑）
U6S仕陷儳輕言仕陷切三|𨼮陷也|䪌韉之短者
d6S公陷𪉦鹹味公陷切二|䫡䫡胡劑面也
M6S尼𧸖諵尼𧸖切一
g6S玉陷顑顑長面也玉陷切一
#鑑
d7S格懺鑑鏡也誡也照也亦作監格懺切又古銜切五|鑒上同（鏡也誡也照也亦作監格懺切又古銜切五）|監領也亦姓風俗通云衛康叔爲連屬之監其後氏焉又古銜切|𥌈瞻也|㔋利也又細切也
T7S楚鑒懺自陳悔也楚鑒切六|儳雜言又倉陷切|摲投也|𤮭甖屬|㺖小犬聲|嚵試人食
S7S子鑑覱覱㒈高危皃子鑑切三|𩈻長面皃又昨三切|𩅼以物內水中出音譜
V7S所鑑釤大鎌所鑑切三|䀐暫見|㣌相接物也又利也出字諟
i7S許鑑㒈覱㒈許鑑切三|譀譀𧭡𧭡呼戒切|闞犬聲
C7C蒲鑑埿深泥也蒲鑑切二|湴上同（深泥也蒲鑑切二）
j7S胡懺㽉大瓮似盆續漢書云盜伏於㽉下胡懺切二|㯺大櫃又下斬切
U7S士懺鑱鑱土具士懺切又士銜切六|䪌䪌韉|欃水門又作㸥|䳻似雕而斑白出音譜|讒譖也又士衫切|艬艬船
h7S@@𪒠叫呼仿佛𪒠然自得音黯去聲一
#梵
C9O扶泛梵梵聲扶泛切三|帆船使風又音凡|颿上同說文曰馬疾步也（船使風又音凡）
B9O孚梵汎浮皃孚梵切八|泛上同（浮皃孚梵切八）|𠆩輕也|䀀杯也|𥁔上同（杯也）|氾濫也|䒦草浮水皃又匹凡切|姂好皃
d8e居欠劒釋名曰劒檢也所以防檢非常也廣雅曰龍泉太阿干將鏌鋣斷蛇魚腸純鈞燕支蔡倫屬鹿干隊堂谿墨陽巨闕辟閭並劒名也崔豹古今注云吳大皇帝有寶劒六一曰白虹二曰紫電三曰辟邪四曰流星五曰青冥六曰百里列子云孔周有三劒一曰含光二曰承影三曰霄練吳王賜子胥屬鏤之劒而死周穆王有錕鋙劒切玉如泥居欠切一
e8e去劒欠欠伸說文曰張口气悟也今借爲欠少字去劒切二|㐸俗（欠伸說文曰張口气悟也今借爲欠少字去劒切二）
h8e於劒俺大也於劒切八|㤿甘心|淹沒也又繅絲一淹也|𦑎劒羽|㛪誣挐|裺衣寬|䛳䛳匿|覎覎口墟名在富春渚上也
#屋
hAD烏谷屋舍也具也淮南子曰舜築牆茨屋風俗通曰屋止也亦虜複姓後魏書官氏志云屋引氏後改爲房氏烏谷切七|𡲃籀文（舍也具也淮南子曰舜築牆茨屋風俗通曰屋止也亦虜複姓後魏書官氏志云屋引氏後改爲房氏烏谷切七）|𦤿古文（地名）|剭鄭玄注周禮云剭誅謂所殺不於市而以適甸師氏又音握|𨜘地名|𪑱墨刑名又音握|䑁䑁膏肥皃
GAD徒谷獨說文曰大相得而鬬也羊爲羣大爲獨一曰獨𤞞獸名如虎白身豕鬣馬尾出北嚻山𤞞音欲亦單獨又虜複姓有獨孤氏後魏書云西方獨孤渾氏後改爲杜氏徒谷切三十|黷垢也蒙也黑也|讟謗讟|髑髑髏|䫳上同（髑髏）|殰殤胎|讀讀誦|櫝函也又曰小棺|牘簡牘|儥見也動也又音育|㾄字書云怨痛也|贕卵敗|碡磟碡田器|䢱媟䢱|䮷騼䮷野馬|皾滑也|𤟩獸名如鼠|襡襡韜藏又音蜀|韣弓衣又之蜀切|瓄圭名|瀆說文曰溝也一曰邑中溝爾雅曰江河淮濟爲四瀆|𨽍說文曰通溝以防水|豄古文（說文曰通溝以防水）|韇箭筩|嬻媟慢|犢牛犢|鸀鸀𪂹鳥也|罜罜䍡魚罟|㒔㒔㑛短醜皃|匵匵匱
dAD古祿穀五穀也又生也祿也善也說文曰續也百穀之總名今經典省作穀餘從㱿者並同古祿切十七|糓俗（五穀也又生也祿也善也說文曰續也百穀之總名今經典省作穀餘從㱿者並同古祿切十七）|轂車轂|榖木名|瀔水名|谷山谷亦養也窮也又姓漢有谷永又欲鹿二音|瑴玉名又音角|𪇗布𪇗鳥案爾雅只作穀|𣨍𣨍殐死皃出廣雅|𪕸鼠名|䜼豆名|𧣡𧣡𡖯多也|䐨足跗|𤞞獸如赤豹五尾又音欲|𥆌動目|䀰大目|唂鳥鳴又作唃
jAD胡谷縠羅縠胡谷切十四|槲木名|斛十斗又虜複姓二氏後魏有尚書斛斯延齊有丞相咸陽王斛律金|螜螻蛄|𧂔水菜可食|礐說文云石聲也|觳周禮注云受二三斗又苦角切|蔛石蔛|𨢋酒濁|𣹬水聲|䶜齒聲|㽇瓦坏|䈸箱䈸|焀火皃
eAD空谷哭哀聲空谷切八|䍍未燒瓦|㲉卵也|𪍠餅麴|䧊大阜|䵈枲未績者|㲄土墼|𣫓麻𣫓
FAD他谷禿說文云無髮也从人上象禾粟之形文字音義云蒼頡出見禿人伏於禾中因以制字又國語云史伯曰祝融之後八姓己董彭禿妘曹斟芉是也又虜複姓有禿髮氏其先壽闐之在孕其母胡掖氏因寢而產於被中鮮卑謂被爲禿髮因而姓焉禿髮烏孤以後魏元興元年稱王遷于樂都号涼及國滅入魏賜姓源氏他谷切五|𣬜籀文（說文云無髮也从人上象禾粟之形文字音義云蒼頡出見禿人伏於禾中因以制字又國語云史伯曰祝融之後八姓己董彭禿妘曹斟芉是也又虜複姓有禿髮氏其先壽闐之在孕其母胡掖氏因寢而產於被中鮮卑謂被爲禿髮因而姓焉禿髮烏孤以後魏元興元年稱王遷于樂都号涼及國滅入魏賜姓源氏他谷切五）|䛢詆䛢狡猾|𢬳杖指|鵚鵚鶖鳥也
EAD丁木豰豰𣫎丁木切八|啄啄木鳥|䐁尾下竅也|𡰪俗（尾下竅也）|𧞐衣至地也說文音斲|𢽚擊聲|竺竺厚|剢刀鋤
QAD桑谷速疾也召也戚也徵也桑谷切十八|遬籀文（疾也召也戚也徵也桑谷切十八）|𧫷古文（鼎實）|蔌郭璞云菜茹之摠名也詩云其蔌維何傳謂菜肴也|餗鼎實|𩱖說文同上（鼎實）|𧐒䗱𧐒蟲|樕槲樕木|𣫎豰𣫎動物豰丁木切|㑛㒔㑛又音束|梀赤梀木名|𪋝麋鹿跡也|藗白茅也|殐𣨍殐|嗽吮也|𡖯𧣡𡖯多也|棴棴常樹名|涑水名在河東
IAD盧谷祿俸也善也福也錄也又姓紂也祿父之後盧谷切四十七|鹿獸名國語曰周穆王征犬戎得四白鹿四白狼而荒服不至又姓風俗通云漢有㔾郡太守鹿旗|漉滲漉又瀝也說文浚也一曰水下皃|淥說文同上（滲漉又瀝也說文浚也一曰水下皃）|觻觻得縣名在張掖|睩視皃|䚄笑視|龣東方音|𨏔𨏔轤圓轉木也或作樚|轆上同（𨏔轤圓轉木也或作樚）|㼾㼾甎|𦪇舟名|琭玉名老子曰琭琭如玉注云琭琭喻少|簏箱簏說文云竹高篋也|箓說文同上（箱簏說文云竹高篋也）|螰螇螰蟲𨎥蛄也|䍡罜䍡|麓山足穀梁曰林屬於山曰麓|㯟古文（山足穀梁曰林屬於山曰麓）|碌多石皃|盝去水也瀝也瀝也或作漉|𥂖上同（去水也瀝也瀝也或作漉）|騼野馬|磟磟碡又音六逐|簶弧簶箭室也出音譜|𧌍𧌍聽似蜥蜴居樹上輒上齧人上樹垂頭聽聞吠聲乃去出字林|谷漢書匈奴傳有谷蠡王蠡音离|娽埤蒼云顓頊妻名說文云隨從也史記毛遂入楚謂十九人曰公等娽娽可謂因人成事耳又力玉切案史記亦作錄|𥉶𥌮𥉶眼淨也|摝振也周禮曰摝鐸鄭玄云掩上振之爲摝|𥛞祭也|𦌟捕魚具也|𥂇吳王孫休三子名|𤽺白獸|廘賈逵曰廘庾也|角角里先生漢時四皓名又音覺|𥪋見鬼|彔本也亦刻木也|濼水名又音扑|鏕鉅鏕郡名案漢書只作鹿|趢趢趗局小|䎑水上飛也|𨌠車聲|㪖剝聲|𩅄大雨|蔍蔍蔥草|鄜地名
iAD呼木嗀歐聲呼木切七|豰獸名似豹而小食獼猴又名黃𦝫案說文作㺉犬屬𦝫已上黃𦝫已下黑食母猴|熇熱皃|𦞦羹𦞦又火各切|𧹲日出赤皃|㷤上同（日出赤皃）|嚛大歠聲
PAD昨木族宗族昨木切三|銼銼𨰠釜屬|鑿鑿鏤花葉又音昨
OAD千木瘯瘯瘰皮膚病也千木切六|䃚碌䃚石皃|蔟蠶蔟又千候切|趗趢趗小皃|梀短椽說文丑錄切|簇小竹
NAD作木鏃箭鏃作木切二|鎐姓也出彭城
CAD蒲木暴日乾也蒲木切十二|曝俗（日乾也蒲木切十二）|瀑瀑布水流下也|䗱䗱𧐒蟲名|㲫㲢㲫毛不理也|樸爾雅云樕樸心又音卜|僕侍從人也|䑑古文（侍從人也）|𥐁短人又倉候切|菐瀆菐|𡰿行皃|穙穙𥡜也
BAD普木扑打也普木切十一|醭醋生白醭|濼齊魯閒水名左傳云公會齊侯于濼|墣說文云塊也又匹角切|𥣜草生穊也|𪔿𪖈𪔿鼠名|攴擊也凡從攴者作攵同|撲拂著|骲骨鏃名也|𪐙淺黲黑也|䴆鳥也
AAD博木卜卜筮龜曰卜蓍曰筮又姓孔子弟子卜商博木切十四|濮水名出陳留郡入鉅野亦州名古昆吾之墟左傳齊桓公會諸侯於鄄今鄄城縣是後漢獻帝時兗州刺史治於此後魏爲濮陽郡隋初置濮州又姓出何氏姓苑|䧤彭䧤蠻夷國名|轐車伏兔|𡡐昌意妻也|樸棫樸叢木又音僕樸樕小木也|獛獛鉛南極之夷尾長數寸巢居山林出山海經|蹼足指閒相著爾雅云鳧鴈醜其足蹼|纀爾雅曰裳削幅謂之纀郭璞云削殺其幅深衣之裳|襆上同（爾雅曰裳削幅謂之纀郭璞云削殺其幅深衣之裳）|𩯏須髯|䪁䪁絡頭繩|鳪鳪雉|𪇰烏𪇰水鳥似鶂而短頸腹翅紫白背上綠色又音剝
DAD莫卜木樹木說文曰木冒也冒地而生東方足行又姓木華字玄虛作海賦莫卜切十二三|沐沐浴說文曰濯髮也禮記曰頭有創則沐又姓風俗通曰漢有東平太守沐寵又漢複姓有沐簡氏何氏姓苑云今任城人|朷朷桑|毣思皃一曰毛濕也|鶩鳧屬|霂霢霂|𨍎車轅名也|㡔轅上絲也|蓩毒草|艒小艖|鞪說文曰車軸束也|楘屋架五楘詩曰五楘梁輈傳云楘歷錄也|蚞螇螰蟲
ABP方六福德也祐也方六切十七|腹腹肚|複重衣|幅絹幅又姓也|輻車輻|𠋩優𠋩|葍葍𦼱爾雅曰葍䔰又葍藑茅|蝠說文曰蝙蝠伏翼也崔豹古今注云一名仙鼠|𥳇實竹|鍑說文云釜而大口者或作鍢又音富|鶝戴勝別名|踾踾踧聚皃|輹車軸縛也|菐瀆菐|偪偪陽宋國|楅束以木逼於牛角不令牴觸人|𦿁草名
CBP房六伏匿藏也伺也隱也歷忌釋曰伏者何金氣伏藏之日金畏火故三伏皆庚日又姓出平昌本自伏犧之後漢有伏勝文帝蒲輪徵不至房六切三十三|復返也重也亦州名古音陵縣春秋時屬楚秦屬南郡隋爲江陽郡武德初爲復州|虙古虙犧字說文云虎皃又姓虙子賤是也|服服事亦衣服又行也習也用也整也亦姓漢有江夏太守服徹|𦨈古文（服事亦衣服又行也習也用也整也亦姓漢有江夏太守服徹）|茯茯苓|馥香氣芬馥|鵩不祥鳥|鞴韋囊步靫|蕧旋蕧藥名|輹車輹兔|𨋩上同（車輹兔）|澓澓流又姓漢宣帝時有東海澓仲翁|椱織椱卷繒者|洑洄流|箙盛弓弩器|𩋟上同（盛弓弩器）|𨌥車笭閒皮篋也|𤸑音譜云病重發也|𪃃𪃃鶝即戴勝也|𩢰馬也|𥨍地室|棴木出崐崘山也|复行故道也說文作𡕨|畐滿也|𩊙車具|絥（車具）|𩎧並上同（車具）|菔蘆菔菜也|匐匍匐伏地皃又蒲北切|鰒海魚名|𥪋見鬼皃|栿梁栿
VBD所六縮斂也退也短也亂也所六切十三|莤說文曰禮祭束茆加于祼圭而灌鬯酒是爲莤象神歆之也一曰榼上塞也|𩘹風聲|𧽏趜𧽏體不伸也趜渠六切|樎馬櫪|謖起也|䎘鳥飛|㩋擊聲|蹜文字音義云烏鵲醜其飛掌蹜在腹下也|摍抽也顏叔也納鄰之嫠婦執燭燭盡摍屋以繼之|𧐴蝍𧐴尺蠖|摵到也又子六切|謏小也又蘇了切
IBD力竹六數也力竹切二十二|陸高平曰陸又高也厚也亦陸離參差也又姓出吳郡河南二望本自古天子陸終後|戮刑戮說文殺也爾雅病也|剹上同（刑戮說文殺也爾雅病也）|勠勠力併力也又音留|稑穜稑先種後熟曰穜後種先熟曰稑|穋上同（穜稑先種後熟曰穜後種先熟曰稑）|鵱鵱鷜野鵝|蓼蓼莪詩傳云蓼長大貌|𦾷上同（蓼莪詩傳云蓼長大貌）|𩣱𩣱良健馬|鯥魚名似牛蛇尾出山海經|𦸐蔏𦸐|磟磟碡|𧌉魁𧌉|淕凝雨澤也|䡜轓䡜車箱|坴大塊|𡴆地蕈|踛翹踛也|僇癡行又音溜|𥚊見也
LBD直六逐追也驅也從也疾也強也走也直六切十二|軸車軸|碡磟碡田器又音祿獨|妯妯娌|舳舳艫|鱁鱁鮧|𧏿馬蚿蟲|筑水名出房陵漢有筑陽縣蕭何妻封邑也|蓫馬尾草|柚杼柚機具又由舊切|䮱馬䮱獸名|篴竹名
dBP居六菊草名禮記季秋之月菊有黃華說文曰大菊蘧麥也居六切三十三|鞠推窮也養也告也盈也禮記曰天子乃薦鞠衣於先帝鄭玄云鞠衣名蓋黃桑之服又姓出東萊風俗通曰漢有尚書令平原鞠譚又音麴又渠六切|蘜爾雅曰蘜治牆郭璞云今之秋華菊也|𧃓說文曰日精也似秋華|㥌謹慎|𡙳說文撮也|掬上同（說文撮也）|匊物在手|𥷚說文曰窮治辠人也|𥱩上同（說文曰窮治辠人也）|鞫上同（說文曰窮治辠人也）|𡫬說文窮也|𥩁上同（說文窮也）|㹼石㹼獸名食猴|𪈓說文曰秸𪈓尸鳩爾雅作鴶鵴郭璞云今之布穀也|鵴上同（說文曰秸𪈓尸鳩爾雅作鴶鵴郭璞云今之布穀也）|𨸰曲岸水外曰𨸰|㘲上同（曲岸水外曰𨸰）|㽤韭畦|䱡郭璞云魚名有兩乳|椈爾雅曰柏椈禮云鬯𦥑以椈|巈山高皃|𦥑兩手奉物|䳔鳥名|𩛺饘也|諊法用|𩬜亂髮|踘踘蹋也|閰閑閰|𣐊木名|𧿻足也|泦水名文|趜困人又巨竹切
eBP驅匊麴麴糵又姓出西平漢有麴演驅匊切五|𥶶上同說文曰酒母也（麴糵又姓出西平漢有麴演驅匊切五）|𩍔上同（上同說文曰酒母也）|鞠姓也又居六切|𠤄曲脊又渠六切
ZBD殊六熟成也殊六切八|孰誰也|淑善也|塾門側堂崔豹古今注云臣來朝君至門外更詳熟所應對之事塾之言熟也|𨷙上同（門側堂崔豹古今注云臣來朝君至門外更詳熟所應對之事塾之言熟也）|璹玉名|婌後宮女官名|䃞石聲
YBD昌六俶始也厚也作也動也昌六切五|柷柷敔柷作樂也俗作拀又音祝|琡璋大八寸曰琡又音祝|𣥹至也|埱氣出於地一曰始也
lBD余六育養也長也余六切二十四|毓稚也本亦同上（養也長也余六切二十四）|鬻賣也亦作粥亦姓周有鬻熊爲文王師案說文鬻本音麋䭈也|粥上同（賣也亦作粥亦姓周有鬻熊爲文王師案說文鬻本音麋䭈也）|𩱱說文鬻也|䋭青經白緯淯陽所織|𧷗賣也重也長也也動也說文衒也或作儥|儥上同（賣也重也長也也動也說文衒也或作儥）|棛車覆欄也|錥鎢錥溫器|煜火光又燿也|焴上同（火光又燿也）|昱日光|蒮爾雅云蒮山韭|淯水名出攻離山|蜟復蜟蟬未蛻者出論衡|𢌻兩手捧物說文音匊|堉地土肥也|喅音聲|𤳕生田|𥉑望也又目明皃|逳步也轉也行也|𦱀草名|蘛茂也
fBP渠竹驧馬跳躍也說文曰馬曲脊也渠竹切十二|𩣽上同（馬跳躍也說文曰馬曲脊也渠竹切十二）|趜趜𧽏|䱡魚名|鵴鴶鵴鳲鳩又音菊|𪁁上同（鴶鵴鳲鳩又音菊）|鞠蹋鞠以革爲之今通謂之毬子又菊麴二音|毱皮毛丸也|䗇說文曰䗇鼀蟾蠩以脰鳴者也|踘踘蹋也|䜯谷名在上艾|𠤄曲脊皃
OBD七宿鼀䗇鼀七宿切三|蹴蹋蹴|殧終也
cBD如六肉骨肉如六切俗作𡧢三|衄鼻出血俗作衂又尼六切|鮞魚子一曰魚名
XBD之六粥糜也之六切五|喌呼鷄聲亦作𠱙|祝巫祝又太祝令官名周禮曰太祝掌六祝之辭以事鬼神祈福祥求永貞亦音呪又姓後漢有司徒中山祝恬|柷祝敔又音俶又爾雅曰柷州木髦柔英本亦作祝|琡璋大八寸又音俶
aBD式竹叔季父亦姓左傳魯公子叔弓之後光武破虜將軍叔壽又漢複姓二氏後漢有犍爲叔先雄左傳魯有大夫叔仲小式竹切十三|儵青黑繒|倏倏忽犬走疾也|透驚也又他豆切|虪爾雅云虪黑虎又音育|跾疾也長也|鮛爾雅曰鮥鮛郭璞云鮪鱣屬也大者名王鮪小者名鮛鮪|掓拾也|𢞣疾也|翛飛疾之皃又音蕭|尗豆也|菽上同（豆也）|㶖水波
iBP許竹蓄蓄冬菜也許竹切又丑六切十|稸上同（蓄冬菜也許竹切又丑六切十）|畜養也說文曰田畜也淮南子曰玄田爲畜又丑六許救二切|𤲸上同說文云魯郊禮畜从田从兹兹益也（養也說文曰田畜也淮南子曰玄田爲畜又丑六許救二切）|㜅媚也|鄐晉邢侯邑又姓漢有鄐熙爲東海太守|荲羊蹄菜又丑六切|蓫上同（羊蹄菜又丑六切）|慉起也詩云不我能慉|𥈆細視
JBD張六竹說文作竹冬生草也象形下垂者菩箬也史記曰渭川千畮竹其人與千戶侯等亦姓本姜姓封爲孤竹君至伯夷叔齊之後以竹爲氏今遼西孤竹城是後漢有下邳相竹曾張六切六|竺天竺國名又姓出東莞後漢擬陽侯竺晏本姓竹報怨有仇以冑姓名賢不改其族乃加二字以存夷齊而移於琅邪莒縣也又冬毒切厚也俗作笁|筑筑似箏十三弦高漸離善擊筑說文曰以竹爲五弦之樂也又爾雅曰筑拾也又音逐水名|築擣也|𥴁古文（擣也）|茿萹茿也似藜赤莖生道傍可食
NBD子六蹙迫也促也近也急也子六切十七|踧踧踖行而謹敬|𧑙蝍𧑙蚇蠖也|𠴫說文嗼也本音寂|㗤㗤咨慙也|噈歍噈口相就也|摵到也|槭木可作大車輮|殧𣧩也|𣤶取氣皃說文本才六切歍𣤶也|𥷼笡也|縬縮也又繒文也又側六切|𣢰欻悲皃|𦟠䐚𦟠膏澤也|顣顣頞鼻頤促皃|䙘好衣皃|蹴蹋也又七六切
TBD初六珿齊也初六切六|矗直皃又敕六切|𪘏廉謹皃|𨴖眾也出字統或作閦|𧯩小豆|䎌飛皃
MBD女六朒朔而月見東方謂之縮朒女六切八|恧慙也|𦗂上同（慙也）|忸忸怩|衄鼻出血又挫也又音肉|䖡䖡蚭即蚰蜒也|䂇刺也|沑蹜沑水文聚
SBD側六縬縬文也側六切二|𡎺塞也
BBP芳福蝮蝮蛇又姓乾封元年詔改武惟良爲蝮氏芳福切八|覆反覆又敗也倒也審也又敷救切|蕧蕧葐草又音服|𩯅廣雅曰假髻也|副剖也又敷救切|㙏地室|𥨍上同（地室）|䔰䔰𦼱草名又音富
hBP於六郁文也亦郁郅縣在北地又姓魯相有郁貢又虜三字姓二氏後魏書云蠕蠕姓郁久閭氏又北方郁原甄氏後改爲甄氏於六切二十|戫有文章也|彧上同（有文章也）|燠熱也又音奧|栯栯李又音有俗作㮋|噢噢咿悲也|墺墺壤|䐿鳥胃|薁蘡薁|澳隈也水內曰澳|隩上同又音奧（隈也水內曰澳）|䉛可以漉米|𣢜愁皃|𨞓姓出姓苑|𪑝羔裘之縫又于逼切|稶黍稷盛皃|懊貪也愛也又音奧|㰲吹氣也|𠸹喉聲|𨪎溫器
QBD息逐肅恭也敬也戒也進也疾也又州名古月氏國地漢匈奴昆邪王殺休屠王并其眾來降遂置酒泉郡後魏以酒泉爲甘州隋分福祿縣置肅州亦姓出姓苑息逐切二十三|宿素也大也舍也說文作㝛止也左傳曰一宿爲舍再宿爲信又姓風俗通云漢有鴈門太守宿詳又虜複姓後魏末有賊帥勤宿明達又虜三字姓後魏書宿六斤氏後改爲宿氏又息救切|蓿苜蓿史記云大宛國馬嗜目宿漢使所得種於離宮|夙早也說文作𡖊早敬也从丮持事雖夕不休早敬者也丮音戟又姓魯大夫季孫夙之後|𠉦（早也說文作𡖊早敬也从丮持事雖夕不休早敬者也丮音戟又姓魯大夫季孫夙之後）|𠈇並古文出說文（早也說文作𡖊早敬也从丮持事雖夕不休早敬者也丮音戟又姓魯大夫季孫夙之後）|玊朽玉又琢玉工又姓後漢有玉況字文伯光武以爲司徒|鷫說文曰鷫鷞也五方神鳥也東方發明南方焦明西方鷫鷞北方幽昌中央鳳皇|𪂸上同（說文曰鷫鷞也五方神鳥也東方發明南方焦明西方鷫鷞北方幽昌中央鳳皇）|蟰蟰蛸俗呼喜子詩曰蟰蛸在戶又音蕭|驌驌騻馬名|䎘䎘䎘鳥羽聲又音縮|𩘹風聲|鱐魚腊|䃤黑砥石又音篠|𤥔朽玉又姓也|潚深清也亦姓漢有潚河|橚木長皃|㩋擊也|䑿艒䑿船名|㑉傗㑉不伸|璛姓也|㪩打也
DBP莫六目釋名曰目默也默而內識也說文曰人眼象形重童子也莫六切十一|睦親也敬也又和睦也亦西胡姓|穆和也美也敬也厚也清也又姓漢有穆生|苜苜蓿|𦱒𦱒蓿見爾雅注|牧養也放也使也察也司也食也說文曰養牛人也又姓風俗通云漢有越嶲太守牧稂|㙁㙁野殷近郊地名古文尚書作此㙁說文作坶|繆禮記有繆公又姓也又靡幼切|萺萺𦸚菜|㣎說文曰細文也今作㣎同|㾇㾇病
kBP于六囿園囿于六切又于救切二|哊吐聲
KBD丑六蓄蓄冬菜詩曰我有旨蓄鄭玄云蓄聚美菜以禦冬月乏無時也本亦作畜丑六切十|稸上同（蓄冬菜詩曰我有旨蓄鄭玄云蓄聚美菜以禦冬月乏無時也本亦作畜丑六切十）|滀水聚|苖蓨也又他六徒歷二切蓨音挑又音剔|荲羊蹄菜|蓫上同（羊蹄菜）|敊病敊皃|傗傗㑉不伸|鄐地名在晉|矗直也齊也
gBP魚菊砡齊頭皃魚菊切一
PBD才六𣤶說文曰歍𣤶也才六切一
#沃
hCD烏酷沃灌也說文作𣵽又姓太甲子沃丁之後出風俗通烏酷切七|鋈白金|鱟魚名又音候|䑁膏膜又音屋|䁷瞋目|觷治角也又戶角切|䮸馬腹下聲
GCD徒沃毒痛也害也苦也憎也說文作𡹆厚也害人之草往往而生徒沃切八|𡹆見上注（痛也害也苦也憎也說文作𡹆厚也害人之草往往而生徒沃切八）|𦺇萹茿草|蝳蝳蜍似蜘蛛|瑇瑇瑁又音代|纛左纛又徒号切|𢃶上同（左纛又徒号切）|碡碌碡田器
ECD冬毒篤厚也說文曰馬行頓遟冬毒切十一|竺地名說文厚也|督率也勸也正也說文察也一曰目痛也又姓風俗通云漢有五原太守督□俗作𣈉|𧝴衣背縫也|𧛔（衣背縫也）|𧞶並上同（衣背縫也）|錖觼舌|𤬂瓠𤬂|𥓍𥓍矺玉篇云落石也|裻新衣聲又先篤切|𡰪凥𡰪俗
eCD苦沃酷虐也說文曰酒味厚也苦沃切六|焅熱氣|𥞴禾熟|嚳帝嚳高辛氏也說文曰急告之甚也|硞碌硞石狀|𡷥山皃
jCD胡沃鵠鳥名又姓姓苑云今東海人胡沃切八|㿥鳥白也|翯鳥肥澤也詩云白鳥翯翯又音學|隺高也|𤌍灼也|頶鼻高皃|𨴬門聲|礐石礐
CCD蒲沃僕僮僕說文曰給事者也漢書曰太僕秦官掌輿馬亦姓風俗通云漢有渾梁侯僕多又虜複姓魏書僕蘭氏後改爲僕氏蒲沃切六|䑑古文（僮僕說文曰給事者也漢書曰太僕秦官掌輿馬亦姓風俗通云漢有渾梁侯僕多又虜複姓魏書僕蘭氏後改爲僕氏蒲沃切六）|鏷鏷𨬟矢名案左傳曰魯莊公以金僕姑射南宮長萬字不從金|䗱䗱蠃又䗱𧐒蟲|轐車𨋩兔也|䴆䴆𪇰
QCD先篤洬雨聲先篤切二|裻新衣聲
dCD古沃梏手械紂所作也古沃切九|牿牛馬牢也|䧼鳱䧼鳥名似鵲|䅵禾皮又地名|告又音誥告上曰告發下曰誥|郜國名又音誥|祰說文云告祭也|䧊說文云大阜也|䶜治象牙也
DCD莫沃瑁瑇瑁莫沃切又莫代切五|𣔺門樞橫梁|媢夫妬婦|艒艒䑿船名|萺草也
iCD火酷熇熱也火酷切四|臛羹臛又音郝|嚛食新也|歊氣出皃又音嚻
HCD內沃褥小兒衣也內沃切又而蜀切四|傉虜三字姓有庫傉官氏|耨釋典云阿耨|搙捻搙
NCD將毒傶邑名又姓將毒切三|𣪲穿也|錊姓也
ACD博沃襮黼領博沃切三|犦犎牛出合浦郡|𪇰鵅烏𪇰水鳥名
ICD盧毒濼水名在濟南盧毒切又力各切一
gCD五沃𤛹白牛五沃切又音岳一
#燭
XDD之欲燭燈燭也禮曰嫁女之家三日不息燭世本曰石季倫以蠟燭炊又姓左傳鄭大夫燭之武之欲切十三|屬付也足也會也官眾也儕等也經典作屬又音蜀|属俗（付也足也會也官眾也儕等也經典作屬又音蜀）|矚視也|䌵綴帶|囑託也|鸀鸀鳿鳥|䟉小兒行皃|㰲吹氣也|噣噣𪁞鳥名|蠾蚤也方言云鼅鼄自關而東趙魏之郊或謂之蠾蝓又音蜀|韣弓衣又大谷切|蠋螐蠋
gDP魚欲玉白虎通曰玉者象君子之德燥不輕濕不重是以君子寶之禮記曰執玉不趨又烈火燒之不熱者真玉也說文本作王隷加點以別王字魚欲切四|獄皋陶所造說文确也从㹜从言二犬所以守也|鳿鸀鳿鳥|頊人姓頊䪴又音勖
iDP許玉旭說文曰日旦出皃一曰明也許玉切五|頊顓頊高陽氏也又謹敬皃|勖勉也|𩔴𩔴顱出聲譜|𩪉上同（𩔴顱出聲譜）
dDP居玉輂禹所乘直轅車說文曰大車駕馬也居玉切十二|絭纕臂繩也又居願切|鋦以鐵縛物|挶持也|𦥑斂手|梮舉食器也|䡞說文曰直轅車𩎈縛也|㮂舉食者名|䋰靴䋰子纏連者說文約也|拲兩手共梏又己奉切|𦅽𦅽屬|𧤑曲角
fDP渠玉局曹局又分也說文促也渠玉切五|跼踡跼又曲也俛也促也|駶馬立不定|侷侷促短小|䎤耕也
ZDD市玉蜀巴蜀說文曰葵中蟲也淮南子云蠶與蜀相類而愛憎異也亦作蠋市玉切十二|韣弓衣又徒谷切|蠾蠾蝓蜘蛛|㯮木似柳葉大也|䙱玉篇云長襦也連𦝫衣也|襩上同（玉篇云長襦也連𦝫衣也）|㒔㒔㑛動皃|襡短衣又大口切|屬附也類也又音燭|属俗（附也類也又音燭）|㻿玉㻿|鐲溫器又直角切
YDD尺玉觸突也尺玉切四|觕古文（突也尺玉切四）|歜怒氣亦人名齊宣王時有高士顏歜或作斶|臅狼臅膏也
cDD而蜀辱恥辱又汚也惡也又姓出姓苑而蜀切十一|蓐草蓐又薦也說文曰陳草復生也一曰蔟也|褥氈褥|鄏郟鄏地名在河南|縟文采|溽溽暑濕熱|㦺矛戟枝也|媷懈惰也|嗕囑嗕憐皃又西羌名|𪑾黑垢|𩱨大鼎
aDD書玉束縛也又姓本自疎氏避難除足姓束左傳晉有束晳書玉切二|㑛㒔㑛
lDD余蜀欲貪欲也余蜀切九|浴洗浴說文曰洒身也洒先禮切|鵒鴝鵒|𩀑上同（鴝鵒）|鋊炭鉤又銅屑也漢書曰磨錢取鋊|輍車枕前也|慾嗜慾|𤞞獨𤞞獸|谷山谷爾雅曰水注谿曰谷說文曰泉出通川爲谷亦虜三字姓吐谷渾氏又音穀
LDD直錄躅躑躅直錄切三|䠱上同（躑躅直錄切三）|蠋𧓸蠋蟲名
IDD力玉錄采錄說文曰金色也又錄事職官要錄云總錄眾事力玉切十七|淥淥水名在湘東又姓何氏姓苑有淥圖爲顓頊師|䚄眼曲䚄也|綠青黃色永徽二年始七品六品服綠飾以銀八品九品服青飾以鍮石至文明元年又改青服碧色|醁美酒|騄騄駬駿馬名|娽隨從又音鹿|菉菉蓐草|逯謹也又姓風俗通云漢有大司空逯並後趙錄有金紫光祿大夫廣平逯明西征記有逯明壘云是石勒十八騎中人|䱚魚名|籙圖籙|碌碌石綵色本又音祿|䟿恭䟿也|𧨹謯也|趢趢𧼙兒行|㫽日暗|㪖剝㪖又聲㪖
eDP丘玉曲委曲說文作曲象器曲受物之形又姓晉穆侯子成師封於曲沃後氏焉漢有代郡太守曲謙丘玉切四|䱡魚名|䒼蠶薄漢書周勃織溥䒼爲生亦作筁|匤匤匣也
JDD陟玉瘃寒瘡也陟玉切七|𤷚上同（寒瘡也陟玉切七）|孎謹也又陟角切|斸斫也又钁也|钃上同（斫也又钁也）|欘枝上曲一曰斤柄|𢒔豕行皃又丑足切
NDD即玉足爾雅云趾足也又滿也止也從口止即玉切又將喻切二|哫楚詞云哫訾憟斯王逸謂承顏色也
bDD神蜀贖說文貿也神蜀切又音樹三|𩌮𩌮鞮也又似足切|䴬姓也梁四公子䴬䵎之後
CDP房玉幞帊也又幞頭周武帝所制裁幅巾出四腳以幞頭乃名焉亦曰頭巾房玉切二|襆上同（帊也又幞頭周武帝所制裁幅巾出四腳以幞頭乃名焉亦曰頭巾房玉切二）
ODD七玉促近也速也至也迫也七玉切六|誎飾也|趗趗速|𤗁迫也|𦠁丳𦠁炙具|㹱宋良大又七雀切
RDD似足續繼也連也又姓舜七友有續牙似足切四|俗風俗說文習也|藚藚斷藥名一曰牛脣又名水藛|𩌮白𩌮鞮也
QDD相玉粟禾實也淮南子曰昔蒼頡作書而天雨粟又姓袁紹魏郡太守粟攀相玉切七|𥻆上同見說文（禾實也淮南子曰昔蒼頡作書而天雨粟又姓袁紹魏郡太守粟攀相玉切七）|憟憟斯|涑水名在河東又蘇侯切|𣯼𣯼㲨罽毛|玊西番國名亦姓又香救切又新菊切|㔄細切
ADP封曲䪁絡牛頭封曲切一
KDD丑玉梀梀樗木名丑玉切七|亍彳亍|𥹵字書曰𥻿𥹵損米|𧼙趢𧼙兒行|𢒔豕行皃又知足切|㙇牛馬所蹈之處|豖說文曰豕絆足行豖豖也
#覺
dED古岳覺曉也大也明也寤也知也古岳切又古孝切十八|斠平斗斛|角芒也競也觸也說文曰獸角也又角抵戲漢武故事曰未央庭中設角抵戲角抵者六國時所造也使角力相抵觸亦大角軍器徐廣車服儀制曰角前世書記所不載或云本出羌胡以驚中國之馬也又姓後漢有角善叔|桷椽也|較車箱又直也略也又古孝切|䡈說文曰車輢上曲銅也|珏二玉相合爲一珏|瑴上同（二玉相合爲一珏）|䮸馬腹下聲|䚫飾杖頭骨又胡歷切|榷以木渡水今之略彴也|捔掎捔|搉揚搉大舉又音確|䁷明也|梏直也又古沃切|傕後漢有李傕|䮤馬白額|龣樂器
gED五角嶽五嶽也五角切八|岳上同（五嶽也五角切八）|樂音樂周禮有六樂雲門咸池大韶大夏大濩大武又姓出南陽本自有殷微子之後守戴公四世孫樂莒爲大司寇|鸑鸑鷟鳳屬國語曰周之興也鸑鷟鳴于岐山俗作𩁓|𩓥說文云面前岳岳也|觷爾雅云角謂之觷治角也或作礨又音學|捳抨捳|㹊說文曰白牛也
UED士角浞水濕士角切十二|丵叢生草|鋜鎖足|灂瀺灂|鷟鸑鷟|捔攙捔組織亦作𧣀|澩山夏有水冬無水|篧魚罩又音捉|汋說文曰激水聲也一曰井十有水一無水爲瀱汋|齺齒相近皃|𤉐速也或作𨖮|簎取魚箔也
SED側角捉捉搦也側角切七|穛早熟穀|𥼚上同（早熟穀）|穱稻處種麥|斮斬又側略切|篧魚罩|𧂒蒵毒
VED所角朔月一日又幽朔也命和叔宅朔方北方也又姓何氏姓苑云南陽人俗作𦙚所角切十二|欶口噏也|嗽上同（口噏也）|矟矛屬通俗文曰矛丈八者謂之矟|槊上同（矛屬通俗文曰矛丈八者謂之矟）|蒴蒴𧃔藥也|數頻數|箾說文曰以竿擊人又舞者所執又蘇彫切|𦂗緘也|㮶木名|揱纖也又長臂皃又相邀切|𦋞㩋𦋞罘䍐
JED竹角斲削也竹角切十九|涿郡名|諑訴也王逸注楚詞云諑猶僣也|㧻擊也推也|琢治玉|孎謹孎|卓高也又姓蜀有卓王孫|桌古文（高也又姓蜀有卓王孫）|𥢔說文曰特止也|啄鳥啄也又丁木切|斀說文云去陰刑|啅眾口|噣鳥生子能自食|𢁁龍尾|䐁上同（龍尾）|倬大也|晫明也又敕角切|𢽚打也|菿說文云草大也本音到又陟孝切
AED北角剝落也削也割也傷害也北角切十四|駮六駮獸名似馬倨牙食虎豹|駁馬色不純|𩐟指聲|𦢊皮破|嚗李頤注莊子云嚗放杖聲又孚邈切|𥭖𥭖手足指節之鳴者亦作肑|肑上同（𥭖手足指節之鳴者亦作肑）|爆火烈又北教切|𪇰烏𪇰鳥又博沃切|髉骱骺|㿺㿺𤿈皮起|䑈䑈犖亂雜|趵足擊
DED莫角邈遠也亦作𨘷莫角切九|藐紫草|㦝說文美也|眊目少精|皃皃人類狀本莫教切|毣好皃一曰毛濡|瞀目不明也|𢷕打也|瞐美目
CED蒲角雹說文曰雨冰也蒲角切二十|𩅟古文（說文曰雨冰也蒲角切二十）|𢷏相𢷏亦作撲|跑秦人言蹴|𩣡獸名似馬一角|䮀上同（獸名似馬一角）|骲骲箭|鰒魚名|䈏竹名|瓝瓜瓝也|瓟上同（瓜瓝也）|㼎上同出說文小瓜也（瓜瓝也）|謈嗃謈大呼說文作𧬉云大呼自冤也|犦犎牛又甫沃切|豰說文云小豚也|窇廣雅曰窖也|𥭓車軬帶也|𦢊肉胅起|懪煩悶也|㩧擊聲又匹角切
BED匹角璞玉璞匹角切十五|㩧擊聲又蒲角切|樸木素|朴上同又厚朴藥名（木素）|㹒牛未㓺|攴楚也又普木切小擊也|墣說文塊也淮南子曰水勝土也非以一墣塞江|圤上同（說文塊也淮南子曰水勝土也非以一墣塞江）|颮颮颮紛紛眾多皃|鞄攻皮之工|謈自冤本蒲角切|𤆝火裂|𥛟玉篇云久視|㺪批㺪|𧴤盈財
eED苦角㱿皮甲又說文曰从上擊下也一曰素也苦角切十九|毃毃打頭|愨謹也善也愿也誠也|搉擊也又音角|確靳固也或作碻|碻上同（靳固也或作碻）|𤿩𥀣𤿩皮乾|㲉鳥卵|觳盛脂器也|燩廣雅云火乾物|嶨爾雅云山多大石嶨|礐上同（爾雅云山多大石嶨）|塙高也|𣤇上同（高也）|硞固也|𠕓說文曰幬帳之象隷省作𡉉|埆墝埆不平|𡇱鞭聲
LED直角濁不清也又姓漢書貨殖傳云濁氏以胃脯而連騎直角切十六|擢拔也抽也出也|濯澣濯又姓風俗通云濯輯之後|鵫白鵫鳥|嬥直好皃|𧃔蒴𧃔|鐲似鈴又音蜀|欘爾雅云拘欘謂之定欘鋤也拘音劬本亦作斪斸斸陟玉切|㺟獸名|鸀小鳥似烏赤喙出西方|蠗小蜃名|鸐山雉長尾|𩑂龍𩑂|𢢗不安|𩆸大雨𩆸𩆸|㪬築也春也本又敕角切
hED於角渥霑濡於角切十七|握持也|偓偓促又姓列仙傳有偓佺|箹小籥|幄大帷三禮圖曰在上曰弈四旁及上曰帷上下四旁悉周曰幄|楃說文曰木帳也|喔鷄聲又喔咿強顏皃|鷽山鵲又音學|葯白芷也|腛厚脂|𪑱刑也又作剭|齷齷𪘏齒相近|媉好皃|𦯏英蒻|龏燭蔽|𠿟誇聲也|䮸馬腹丁鳴
MED女角搦持也女角切又女戹切六|掉正也又杖弔切|䚥屋角一曰調弓也|𧢺上同（屋角一曰調弓也）|搙搵也|𧣺握也
KED敕角逴遠也一曰驚走又作趠敕角切五|趠上同（遠也一曰驚走又作趠敕角切五）|晫明也|踔跛也|㪬授也刺也㪬敊痛也敊丑六切
IED呂角犖駁犖牛雜色又卓犖也呂角切三|䃕䃕確石相扣聲|𡁆啅𡁆有才辯俗
jED胡覺學說文與斅同覺悟也斅今音效又姓出姓苑胡覺切九|确磽确說文曰礊石也|嶨山多大石又音㱿亦作礐|𥀣𥀣𤿩|鷽山鵲赤喙長尾知來而不知往|澩涸泉|觷治角之工|㿥鳥白又胡沃切|翯鳥肥澤
iED許角㕰怒聲許角切十|豞豕聲|𩌊急束|翯鳥肥澤|嗀歐吐左傳褚師聲子韤而登席公怒辭曰臣有足疾君將㱿之說文从口|𦰾草聲|謞讒慝|瀥瀥瀑水涌|䤕醋味|滈水皃
TED測角娖辯也測角切八|䃗䃗礫|𪘏齒相近聲|娕恭謹皃|擉司馬彪注莊子云擉鼈刺鼈又音踔|齱漢書云握齱急促也|𥭓軬帶|齪開孔具
#質
XVT之日質朴也主也信也平也謹也正也又姓漢書貨殖傳云質氏以洒削而鼎食注云理刀劒也之日切又音致十五|晊大也|郅郁郅古縣名又姓漢有郅都|桎桎梏在足曰桎|櫍椹行刑用斧櫍|蛭水蛭博物志曰水蛭三斷而成三物|騭䭸馬又書曰惟天陰騭下民傳云騭定也|劕劕劑劵也長曰劕短曰劑周禮作質劑|銍縣名|䑇䑇䏷刀箭瘡藥|鑕斧也|𡂒野人之言|懫止也|礩柱下石也|侄堅也又牢
cVT人質日說文曰實也太陽精不虧从口一象形人質切五|馹驛傳也|衵女人近身衣又女乙切|㠴枕巾也|臸到也
bVT神質實滿也誠也神質切一
LVT直一秩積也次也常也序也書曰望秩于山川直一切十二|紩縫紩|帙書帙亦謂之書衣又姓出纂文|袠上同（書帙亦謂之書衣又姓出纂文）|柣門限|翐翐翐飛皃|姪兄弟之子又音迭|妷上同（兄弟之子又音迭）|豑說文云爵之次弟也|𣗻帆索|䟈走皃|𢧤大也
QVT息七悉說文云詳盡也息七切九|厀說文曰脛節也|膝上同（說文曰脛節也）|蟋蟋蟀蛬也|𧀬牛𧀬又作𦸝本草作膝|𦸝上同（牛𧀬又作𦸝本草作膝）|䊝䊝𥻦聲|僁僁𠋱動也|窸從穴出也
hVX於悉一數之始也物之極也同也少也初也又虜三字姓後魏書一那婁氏後改爲婁氏於悉切三|弌古文（數之始也物之極也同也少也初也又虜三字姓後魏書一那婁氏後改爲婁氏於悉切三）|壹專壹又合也誠也輩也醇也又虜三字姓後魏書云壹斗眷氏後改爲明氏
OVT親吉七數也親吉切十|漆水名在岐又姓古有漆沈爲魯相何氏姓苑云今豫章人又漢複姓孔子弟子漆彫開|柒俗餘倣此（水名在岐又姓古有漆沈爲魯相何氏姓苑云今豫章人又漢複姓孔子弟子漆彫開）|䣛地名在齊|𪄭鳥名|桼膠桼說文曰木汁可以䰍物从木象形桼如水滴而下也經典通用漆|𣛺木名可爲杖也|𦸓草似蘇也|㯃秦有㯃娥臺
BVH譬吉匹偶也配也合也二也說文云四丈也从八匸八揲一四俗作疋譬吉切四|鷝鵯鶋鳥|𠯔𠯔𠯔唾也|䏘牝䏘
dVX居質吉吉利又姓出馮翊尹吉甫之後漢有漢中太守吉恪居質切八|趌趌𧼨怒走也|狤狂也|拮拮据手病詩傳云拮据撠挶也又音結|䟌走意|郆郆成山|洁水名|𤿠黑𤿠
MVT尼質暱近也尼質切七|昵上同（近也尼質切七）|衵近身服|䵒膠䵒|䵑上同（膠䵒）|䘌小蝱|㥾愧㥾
lVT夷質逸過也縱也奔也說文曰失也从辵从兔兔謾訑善逃也夷質切十二|佚佚樂|佾八佾之舞佾行列也|溢滿溢|軼車過又突也又同結切|鎰國語云二十四兩爲鎰又禮曰朝一溢米注謂二十兩曰溢|泆淫泆|齸廣雅云麋鹿受食處|劮劮豫|欥辝也|䭿馬足疾|䳀餔叔鳥也
eVX去吉詰問也責讓也去吉切四|蛣蛣蜣蜣蜋又蛣𧌑蝎也|𩢴馬色|趌趌𧼨怒走也又音吉
iVX許吉欯笑也許吉切五|欪訶也又丑律切|咭笑又巨吉切|恄怖也|㣟行也
KVT丑栗抶打也丑栗切四|咥笑也|眣目不正也|跮躌也又丑利切
IVT力質栗堅也又果木也漢書曰燕秦千樹栗其人與千戶侯等又姓漢長安富室有栗氏力質切十九|㮚上同說文作此（堅也又果木也漢書曰燕秦千樹栗其人與千戶侯等又姓漢長安富室有栗氏力質切十九）|𣡷古文（上同說文作此）|慄戰慄懼也|溧溧水縣在宣州|䬆䬆䬆暴風|𠞉斷也削也|鷅鶹鷅流離鳥|凓凓冽寒風|篥觱篥胡樂|麜麕牡麌牝麜也|𨍫車聲|瑮玉之英華羅列皃|𦃊蒸栗色綵|塛塞也|搮以手理物|䔁草名|㗚嘍㗚言不了也|㟳山名
JVT陟栗窒窒塞也陟栗切又丁結切十二|挃撞挃|庢盩庢縣在京兆|銍刈也說文曰穫禾短鐮也又古縣名在譙|秷刈禾聲|𦤻𠍹𦤻愛觸忤人也|㲳手拔物也|㗧㗧咄吐呵也|𪗻齧聲|𨖹近也|螲螻蛄|𥎹短也
PVT秦悉疾病也急也秦悉切十一|𤕺籀文（病也急也秦悉切十一）|嫉嫉妬楚詞注云害賢曰嫉害色曰妬|蒺蒺蔾|㑵廣雅云賊也|𧎿爾雅云蒺蔾蝍蛆郭璞云似蝗大腹長角能食蛇腦亦作𧎿䖿|揤揤拭|愱愱毒苦也|槉屋枅|𠹋就𠹋|𧪠語急
TWT初栗㓼割聲也初栗切四|𠞩上同（割聲也初栗切四）|𪘧齚也|䜉謅䜉陰私語也
aVT式質失錯也縱也式質切三|室房也易曰穴居而野處後世聖人易之以宮室釋名曰室實也人物實滿其中也周書曰黃帝始作宮窒呂氏春秋曰高元作宮室也|𩋡刀𩋡
NVT資悉堲夏后氏堲周燒土葬也資悉切八|𡁶鼠聲|唧啾唧聲|㲺水潛|𢪍𢪍摘|𧉍蜻蛚別名|蝍蝍飛蟲又音即|楖楖栗木名
DVH彌畢蜜蜂所作食山海經云穀城之上足蜂蜜之廬亦蟲名彌畢切九|𧖅上同（蜂所作食山海經云穀城之上足蜂蜜之廬亦蟲名彌畢切九）|謐靜也慎也安也|䤉飲酒俱盡|榓木榓樹名|𥁑拭器|宓安也默也寧也止也|淧淧溢也|𥋱𥋱𥋱不測也
AVH卑吉必審也然也說文曰分極也从八弋卑吉切二十七|畢竟也說文作畢田罔也又姓出泰山本畢公高之後晉有畢卓|篳織荊門也說文曰藩落也春秋傳曰篳門圭窬|蓽上同（織荊門也說文曰藩落也春秋傳曰篳門圭窬）|韠胡服蔽膝說文曰紱也所以蔽前也下廣二尺上廣一尺其頸五寸一命縕韠再命赤韠俗作鞸|㻫上同（胡服蔽膝說文曰紱也所以蔽前也下廣二尺上廣一尺其頸五寸一命縕韠再命赤韠俗作鞸）|䟆漢書曰出稱警入言䟆顏師古曰警者戒肅也䟆止行人也|蹕上同（漢書曰出稱警入言䟆顏師古曰警者戒肅也䟆止行人也）|滭滭沸泉出皃亦作觱見詩俗作㳼|㪤盡也|鷝鷝鴋鳥名白面青色|觱觱篥或作篳說文作觱云羌人所吹角屠觱以驚馬也|珌佩刀土飾|㓖寒風|熚火皃|𡠚廣雅云母也|彃射也|㮿木名|縪冠縫也說文止也|鮅爾雅曰鮅鱒郭璞云似鯶子赤眼|饆饆饠餌也|鏎簡鏎爾雅曰簡謂之畢注謂簡札也俗從金|𠦒弃糞器說文方干切箕屬|𡻞道邊堂如墻也|𥀕畫韋曰𥀕|𥛘竈上祭|罼兔罟
fVb巨乙姞姓一曰字史記云姞氏爲后稷元妃巨乙切五|佶正也閑也|鮚說文云蚌也漢律會稽獻鮚醬二升|趌直行|狤狤狂
CVH毗必邲地名在鄭又美皃毗必切二十一|比比次又毗妣鼻三音|柲偶也|馝香也又虜複姓後魏書馝邗氏後改爲邗氏|苾說文曰馨香也詩曰苾苾芬芬|䩛車束|佖有威儀也|鮩魚名|駜馬肥|坒相連|飶食之香者|綼紷也又必覓切|鮅魚名|怭慢也|泌水狹流又必媚切|𨠔飲酒俱盡|䖩黑蜂|吡鳴吡吡亦作咇|𣢠吹𣢠|咇言不了|妼女有容儀
kVr于筆䫻大風也于筆切五|𡿯說文曰水流也|汩上同（說文曰水流也）|蒁草名|㧒揘㧒擊皃
VVj所律率循也領也將也用也行也說文曰捕鳥畢也象絲罔上下其竿柄也俗作卛所律切十|帥佩巾又將帥亦姓本姓師晉景帝諱改爲帥氏晉有尚書郎帥昺又所類切|蟀蟋蟀|𧍓上同（蟋蟀）|䢦先導|𠞩割也斷也出埤蒼|𧜠裾𧜠短衣|咰咰飲酒皃|𠌭行皃|𧗿循也說文曰將衛也
YVT昌栗叱呵叱也又虜複姓九氏夏錄有將作大匠叱干阿利西魏有開府叱奴興南陽公叱羅協後魏官氏志有叱呂叱門叱利叱李叱列叱盧等氏亦虜三字姓周有侍中叱叱列龜其傳云代郡西部人昌栗切一
UWT仕叱𪗨齧聲仕叱切一
DVL美筆密說文云山脊也又靜也亦州名古姑幕城秦琅邪郡隋爲密州因水以名之又姓漢有尚書密忠又漢複姓三氏何氏姓苑云密茅氏琅邪人又有密革氏密須氏俗作密美筆切十|𡶇山形如堂|蔤荷本下白|宓埤蒼云祕宓又音謐|滵滵汩水流皃|沕塵濁|樒香木|㫘不見皃|𪅮鳥名|𥉴𥉴𥉴不可測量也
CVL房密弼輔也備也房密切十|𢐀上同說文作此（輔也備也房密切十）|㢸（上同說文作此）|𠡂並古文（上同說文作此）|䄶䄶𥠈禾重生|𢘍輔也|駜馬肥|胇胇肸大皃|邲地名|佖威儀備也
hVb於筆乙辰名爾雅云太歲在乙曰旃蒙亦姓前燕有護軍乙逸又虜複姓三氏後魏獻帝命叔父之胤曰乙旃氏後改爲叔氏前燕錄有高麗王乙弗利後魏有都督乙干貴又虜三字姓有乙速孤氏於筆切三|鳦燕也說文本作乙燕乙玄鳥也齊魯謂之乙取鳴自呼象形本烏轄切或从鳥|亄貪也
gVb魚乙耴聱耴魚鳥狀也魚乙切又女涉切七|聉無知意也|㔎斷也|𡿪水流皃|圪高皃|𦨇舟行|𠡝動𠡝𠡝
AVL鄙密筆秦蒙恬所造爾雅曰不律謂之筆韓詩外傳周舍爲趙簡子臣墨筆操牘從君之後伺君過而書之鄙密切九|潷去滓|鉍矛柄|柲柄也|泌泌瀄水流|𢴩方言刺也亦作抋|咇咇㘉多言|㻶青白玉管天之所授|𨅗走也
JVj徵筆茁草牙也徵筆切又鄒律莊月二切一
iVb羲乙肸肸蠁俗作肹羲乙切一
dVb居乙暨姓也吳尚書暨豔居乙切又臮既二音一
JVT丁悉蛭蛭蝚丁悉切又之日切一
iVn況必獝狂也況必切一
#術
bVj食聿術技術說文曰邑中道也又姓食聿切十一|述著述說文循也又姓風俗通云魯大夫仲述之後也|秫穀名|朮上同（穀名）|沭水名在琅邪今沭陽縣在海州|噊爾雅曰危也又音聿|袕爾雅袕謂之褮謂衣開孔也褮音熒|潏爾雅曰小沚曰坻人所爲爲潏謂人力所作又音聿音譎|鱊小魚名爾雅曰鱊鮬鱖鯞又音聿|驈黑馬白髀又音聿|𧑐𧑐蟥也又音聿
dVn居聿橘果名周禮云橘踰淮而北爲枳居聿切八|𦺖草名|繘汲綆又餘律切|𧾣走意|𧽻上同（走意）|䤎醬也|𦙮姓也出韻譜|𣎛月在乙也
PVj慈卹崒山高慈卹切四|踤摧踤又觸也駭蹋也|誶讓也|捽把捽
lVj餘律聿循也遂也述也說文曰所以書也楚謂之聿吳謂之不律燕謂之弗秦謂之筆餘律切二十一|鴪飛快|燏火光|遹述也自也一曰遵也|鷸鳥名|驈黑馬白髀又音述|繘汲綆又音橘|𩙅疾風|潏水流皃|矞說文曰以錐有所穿也一曰滿也|霱霱雲瑞雲本亦作矞|𧑐𧑐蟥也|䢖行皃|芛草木初生|欥詞也|鱊小魚名|噊鳥鳴|䋖䋖長|銉針銉|𦒔飛𦒔|𥎐𥎐出
NVj子聿卒終也盡也子聿切又倉沒切又則骨切五|𣨛終也|䱣儵鮪別名|㰵飲也玉篇云吮也|啐啐律聲
QVj辛聿卹分賑辛聿切十五|恤憂恤|戌辰名爾雅太歲在戌曰閹茂又滅也|訹謏訹誘也謏蘇了切|珬珂屬|𧪞靜也又音盍|䳳小鳥名|賉賑賉|𣸃水流𣸃𣸃|㖅口鳴㖅㖅|𧊥海蟀|銊鋸聲|欰鳴欰欰|𥚋不能行也|𨜿頹下
IVj呂卹律律呂又律法也呂卹切八|寽持取今寽禾是|繂繩船上用亦作𦆽|膟腸閒脂說文曰血祭肉也又作𦝭|䔞音譜云草子甲|葎蔓草有刺|𥭐竹𥭐以射鳥也|𠷈鳴也亦作𠻜
KVj丑律黜貶下也亦作絀丑律切八|怵怵惕|𧺶走也|炪火光|䟣獸跡|㤕憂心也又音窋|𤝞獸名|欪訶也又許吉切
JVj竹律㤕憂心也竹律切八|窋物在穴皃|絀縫也|䂐短皃|㑁上同（短皃）|逫走皃|𡢑面短皃|泏水出皃
LVj直律朮藥名直律切三|𦬸上同（藥名直律切三）|炢煙出
YVj赤律出進也見也遠也赤律切又赤季切一
OVj倉聿焌火燒亦火滅也倉聿切一
SVj側律𠭴吳人呼短側律切二|𠮌雞兒出殼聲
iVn許聿䎀飛去皃許聿切四|怴狂也|䬂小風皃|𥄵深目皃
#櫛
SWT阻瑟櫛梳也阻瑟切六|楖上同見周禮（梳也阻瑟切六）|瀄瀄汨水聲|㘉咇㘉|𥠈䄶𥠈禾重生䄶音弼|擳挃擳
VWT所櫛瑟樂器世本曰庖犧作瑟所櫛切六|飋飋䫻風也|蟋蟋蟀又音悉|蝨蟣蝨淮南子云大廈成而燕雀相賀湯沐具而蟣蝨相弔俗作𧈲|璱玉鮮絜皃今爲之璱璱者其色碧也|𦆄𦆄𦆄色也亦作𩇣
UWT崱瑟𪗨齒聲崱瑟切一
#物
DXP文弗物萬物也又旗名周禮雜帛爲物說文曰牛爲大物天地之數起於牽牛故从牛勿文弗切九|勿無也莫也說文曰州里所建旗也象其柄有三斿雜帛幅半異所以趣民故遽稱勿勿又作𣃦|𣃦上同（無也莫也說文曰州里所建旗也象其柄有三斿雜帛幅半異所以趣民故遽稱勿勿又作𣃦）|芴土瓜|岉崛岉高皃|伆離也又武粉切|𨑥遠也|昒尚冥也又音忽|沕沕穆微也
AXP分勿弗說文撟也分勿切二十|紱綬也|黻黼黻|綍大索葬者引車|紼上同（大索葬者引車）|芾草木盛也|巿說文曰韠也上古衣蔽前而已巿以象之天子朱巿諸侯赤巿大夫蔥衡从巾象連帶之形經典作芾|韍上同（說文曰韠也上古衣蔽前而已巿以象之天子朱巿諸侯赤巿大夫蔥衡从巾象連帶之形經典作芾）|不與弗同又府鳩方久二切|𨚓姓也漢有九江太守𨚓修|翇說文曰樂舞執全羽以祀社稷也周禮作帗|柫連枷杖打穀者出方言|𡗻大也|髴婦人首飾|冹寒冰皃|帗毳又音撥|𩖼風皃|笰輿後笰也|𤊸熚𤊸鬼火說文作𤒓|甶鬼頭
hXv紆物鬱香草又氣也長也幽也滯也腐臭也悠思也說文曰木叢生者又姓出姓苑紆物切十二|欝俗（香草又氣也長也幽也滯也腐臭也悠思也說文曰木叢生者又姓出姓苑紆物切十二）|灪灪滃大水|爩煙氣|𩚴飴和豆也|黦黃黑色也|𥘄𥘄䃶小石|菀藥草又音苑|尉說文作尉从𡰥又持火所以申繒也亦姓古有尉繚子著書又虜複姓有尉遟氏其先魏氏之別尉遟部因而氏焉後單姓尉唐有將軍尉遟敬德又於魏切|熨火展帛也說文本作㷉見上注（說文作尉从𡰥又持火所以申繒也亦姓古有尉繚子著書又虜複姓有尉遟氏其先魏氏之別尉遟部因而氏焉後單姓尉唐有將軍尉遟敬德又於魏切）|蔚草名又曰無子菣也亦州名春秋時屬晉後入趙秦滅趙爲代郡東魏置北靈丘郡周宣帝置蔚州也|𩰪說文云芳草也
dXv九勿𠀔無左臂也九勿切又九月切十|孒一同說文作此|𦁐翟衣|厥夏曰獯鬻殷曰鬼方周曰獫狁漢曰匈奴魏曰突厥出漢書音義又音蕨|屈屈產地名出良馬亦姓楚有屈平又音詘|鶌爾雅曰鶌鳩鶻鵃郭璞云似山鵲而小短尾青黑色多聲|趉走皃|𧱝豕𧱝土也|𠜾剞𠜾曲刀|䠇律䠇多力
eXv區勿屈拗曲亦姓又虜複姓屈突氏又羌複姓有屈男氏區勿切三|詘辝塞|𧌑蛣𧌑蟲
fXv衢物倔倔強衢物切九|䠇足多力也|崛山短而高|𡲬短尾鳥|䘿衣短|𡲗短尾犬|堀說文曰突也引詩曰蜉蝣堀閱|𧱝豕𧱝地|掘掘地
CXP符弗佛牟子曰漢明帝夢神人身有日光飛在殿前以問群臣傅毅對曰天竺有佛將其神也學記曰其施之也悖其求之也佛符弗切九|怫怫鬱|坲塵起|𡶒山曲說文作岪山脅道也|咈戾也|䞞走皃|刜斫也擊也|𣀣玉篇云理也|炥火皃
iXv許勿䬍疾風許勿切六|𩘐俗（疾風許勿切六）|欻暴起|𠦪疾也|㗵訶㗵|烼火煨起皃
kXv王勿䬑風聲王勿切六|𢯮擲也|觱羌人吹角|㧒捏㧒|䁌䁌䁌見|𢔥行也
BXP敷勿拂去也拭也除也擊也敷勿切十二|𢂀韜髮|嶏崩聲|茀草多|祓除灾求福亦絜也又音廢|艴淺色|刜擊也斫也|乀左戾曰乀|䭮額前飾也|髴髣髴亦作彷彿|彿彷彿俗（髣髴亦作彷彿）|𧿳跳也
gXv魚勿崛危崛山皃魚勿切一
#迄
iYf許訖迄爾雅云至也許訖切九|仡壯勇皃又魚訖切|釳乘輿馬上插翟尾者曰方釳釳鐵也廣三寸又魚訖切|肸肸蠁又許乙切|忔喜也|䒗爾雅曰藒車䒗輿郭璞云藒車香草又音乞|䛥語瞋聲|莔吳王孫休長子字也|汔水涸盡
dYf居乞訖止也居乞切五|吃語難漢書曰司馬相如吃而善著書也|扢摩也|暨姓也吳尚書暨豔居乙切又臮既二音一|䰴魚游
gYf魚迄疙癡皃魚迄切五|屹屹崪山皃|圪高土|𧆫虎皃|仡壯勇皃
fYf其迄䞘行皃其迄切二|𢇓𧰙也
eYf去訖乞求也說文本作气音氣今作乞取之乞又虜複姓晉有乞伏國仁太元十年稱秦王於金城去訖切三|䒗又許訖切|契契丹夷名出字林
#月
gZv魚厥月范子計然云月者尺也者紀度而成數也王子年拾遺錄曰水精爲月魚厥切十一|刖絕也斷足刑也又五刮切|跀（絕也斷足刑也又五刮切）|𧿁並上同見說文（絕也斷足刑也又五刮切）|軏車轅端曲木也又五骨切|抈折也|扤動也又五骨切|枂鞍枂|鈅兵器|玥神珠|𦘹山也
CZP房越伐征也斬木也又自矜曰伐房越切十四|筏大曰筏小曰桴乘之渡水|栰上同（大曰筏小曰桴乘之渡水）|罰罪罰元命包曰网言爲詈刀詈爲罰罰之言网陷於害|閥閥閱自序|垡耕土|橃木橃說文曰海中大船也|䑔舂米|瞂盾也或作𢧕|拔爾雅云拔龍葛也似葛蔓生葉細莖赤也|茷茷茂皃|藅藆藅草|坺地名|䣹酒一䣹也
kZv王伐越墜也干也於也遠也走也逾也曰也揚也說文度也亦吳越又姓句踐之後又虜三字姓後秦錄有北梁州刺史越質詰歸王伐切十六|𨒋說文踰也|粵辝也于也|戉說文曰大斧也司馬法曰夏執玄戊殷執白戚周左杖黃戊又作鉞|鉞上同（說文曰大斧也司馬法曰夏執玄戊殷執白戚周左杖黃戊又作鉞）|䋐紵布說文曰采彰也一曰車馬飾|樾樹陰|蚏蟚蚏似蟹而小|曰辝也於也之也|𥩡竚立也|𡛟輕也|璏劒鼻玉|熭暴乾|𣐋木名|𧊎螊𧊎蚌出魏書|泧大水
dZv居月厥其也亦短也說文曰發石也又姓京兆人也漢賜衡山王妾厥氏居月切十九|氒古文（其也亦短也說文曰發石也又姓京兆人也漢賜衡山王妾厥氏居月切十九）|蹶失腳又走也速也嘉也說文僵也一曰跳也亦作蹷又音橛|𨇮說文上同（失腳又走也速也嘉也說文僵也一曰跳也亦作蹷又音橛）|𧽸跳𧽸|𧼞上同（跳𧽸）|瘚氣逆|劂刻刀|蕨蕨菜|蟨獸名走之則顛蛩蛩前足高不得食而善走蟨常爲蛩蛩取食蛩蛩負之而走也|蟩蟩蜉蟲|橜杙也又其月切|𥕲發石|𠢤強力|欮發也|撅撅撥物也|鱖魚名|孒短也|𠄌說文曰鉤識也从反𠄌象形
hZv於月𡡕嬄𡡕婦人皃於月切四|𩚴飴和豆又作𩜌說文作𧯡|噦逆氣又乙劣切|黦黃黑色說文作𪑲黑有文也
fZv其月𧤼以角發物其月切十三|鷢白鷢一名鸉似鷹尾上白善捕鼠也|橜說文杙也一曰門梱亦作橛|撅採撅亦樗蒲三采名|蹶又音厥|掘穿也|赶舉尾走也|憠強也|𨬐磨𨬐|䞷行越䞷也|𣖬𣖬株山名|𩪜尾本|亅說文曰鉤逆者謂之亅象形
eZv去月闕門觀也廣雅曰象魏闕也釋名曰闕在門兩旁中央闕然爲道也又失也過也不供也又姓出下邳漢有荊州刺史闕翊去月切三|㵐水名在義陽|𦁐𦁐狄衣周禮作闕禮記作屈
AZP方伐髮頭毛也說文根也又姓漢有東海人髮福治詩又有不毛之地莊子謂之窮髮方伐切六|𩠖說文上同（頭毛也說文根也又姓漢有東海人髮福治詩又有不毛之地莊子謂之窮髮方伐切六）|𩑛古文（說文上同）|發發起又舒也明也舉也闋也揚也說文曰䠶發也|颰疾風|冹寒水又音弗
DZP望發韤足衣漢張釋之與王生結韤望發切五|韈（足衣漢張釋之與王生結韤望發切五）|襪並上同（足衣漢張釋之與王生結韤望發切五）|𥄎舉目使人|㒝㒝羯東北夷名似高麗
iZv許月䬂小風許月切六|䟠走皃|泧水皃|狘獸名又走皃|䎀飛皃|㞽山皃
hZf於歇謁請也告也白也又姓風俗通云漢有汝南太守謁渙於歇切五|閼爾雅云太歲在卯曰單閼又於葛於連二切|暍傷熱亦作㷎𤸎|𢉥說文曰屋迫也|黦色壞也又於月紆物二切
iZf許竭歇氣洩也休息也又竭也許竭切五|蠍螫蟲人|猲猲獢短喙犬也|𤢔上同（猲獢短喙犬也）|𦪬𦪬艎大船
dZf居竭訐面斥人以言論語注云訐謂攻發人陰私也居竭切又居列切六|𧼨走皃|羯犗羊|揭揭起說文曰高舉也|𢶆俗（揭起說文曰高舉也）|鍻金鍻
fZf其謁𢷒擔𢷒物也本亦作揭其謁切五|揭上同（擔𢷒物也本亦作揭其謁切五）|竭盡也|碣碣石海中山名今爲碑碣字李斯造|楬表楬閥閱自序名
BZP拂伐㤄恨怒拂伐切一
gZf語訐钀馬勒旁鐵語訐切一
#沒
DaD莫勃沒沈也又虜三字姓有沒路真氏出後魏書莫勃切六|歿死也說文終也又作歾|𤣻玉名|𩑦內頭水中又烏沒切|𠬛說文曰入水有所取也|莈草
@@@土骨𣅝入水又出皃土骨切一
daj古忽骨說文曰肉之覈也尸子曰徐偃王有筋無骨亦見史記又姓古忽切十六|縎縎結|鶻鶻鳩又搰猾二音|滑滑稽謂俳諧也|䮩䮩𩢎獸出北海|啒憂也|淈說文濁也一曰滒泥又水出皃|汨汨沒|愲心亂|蓇不實草|尳膝病|㾶上同（膝病）|榾枸榾木也|䓛刷也或從竹|扢摩也|㒴出也
CaD蒲沒勃卒也又姓世本宋右師之後又梁武帝改豫章王綜姓勃氏蒲沒切二十三|渤渤澥海名又水皃|𩣡𩣡馬獸名似馬牛尾一角又音雹|𩱚說文曰炊釜溢也|餑麵餑|𡋯塵起|馞大香|悖逆也又音背|䄶䄶稡禾所秀不成聚向上皃|郣郡名|浡浡然興作|𣭷𣭷㲞毛短|𢠜昬亂|㪍㪍卒旋放之皃|誖言亂|㶿煙起皃|桲榲桲果似樝|孛星也又怪氣|艴艴然不悅|挬拔也|脖胦臍|𦸦蘩母|鵓鵓𪅄鳥名
Eaj當沒咄呵也當沒切四|柮榾柮木頭又五栝切|𩢎䮩𩢎獸出北海|𩨳鳥鳴豫知吉凶也
Faj他骨突出皃他骨切六|梲大杖也又音拙|𠫓不孝之子說文曰不順忽出也篆文从到子|𡿮說文同上或从到古文子（不孝之子說文曰不順忽出也篆文从到子）|㥆㥆忽也悵也說文肆也|䠈蹂也𨁸䠈前不進也
Gaj陀骨突觸也欺也說文曰犬从穴中暫出也一曰滑也陀骨切十四|揬搪揬|腯說文曰牛羊曰肥豕曰腯|鼵鳥鼠同穴其鳥曰䳜其鼠曰鼵鼵如人家鼠而短尾|葖爾雅曰葖蘆萉郭璞云萉宜爲菔蘆菔蕪菁屬紫華大根俗呼雹葖|鶟鶟鶘鳥名似雉青身白首|堗竈堗漢書作突云曲突徙薪亡恩澤|𦩤艒𦩤釣船|鈯鈍也又小刃也|𦔅耕禾閒也|𣔻瑣植又傳也|凸凸出皃|𡿮說文本他忽切義見上文|鍎覆鍎
haj烏沒𩑦內頭水中烏沒切九|膃膃肭肥|殟心悶|嗢咽也又虜複姓後魏書有嗢盆氏又虜三字姓嗢石蘭氏|䯉說文曰咽中息不利也本一滑切|榲榲桲果似樝也|搵手撩物皃|淴水出聲|馧馧馞大香
iaj呼骨忽倏忽又滅也忘也輕也又一蠶爲一忽十忽爲一絲呼骨切十七|昒尚冥也|㾁狂病又音欻|匫古器|寣睡一覺|笏一名手板品官所執天子以玉諸侯以象大夫魚須文竹士木可也釋名笏忽也有事書其上以備忽忘|䩐急擷也擷呼結切|㫚說文曰出气詞也篆文本作㫚象气出形|𨑥遠也|啒憂皃|𣓗高皃|㦌寢熟|𦁕微也|𢑢豕屬|惚恍惚亦作忽|䬍疾風皃|𤶘睡多
gaj五忽兀高皃又姓後漢改樂安王元覽爲兀氏五忽切十六|扤搖動|杌樹無枝也|屼𡼿屼禿山皃又五屼山名在犍爲|矹硉矹不穩皃|䦍䦍括也又云㚔者|鼿鼻也|𦨉說文曰船行不安也|䑢俗（說文曰船行不安也）|𠨜𦤞𠨜不安也|㽾說文曰病也|𤴰俗（說文曰病也）|軏輗軏又音月|𧈭蛤蟹|刖刮刖又音月|𦬂艾𦬂
BaD普沒䪬按物聲或作𥩾普沒切五|昢明旦日出皃|哱吹氣聲|㛘㛘乳女字|馞香皃
Iaj勒沒𠀽筩射勒沒切五|硉硉矹|𨁸𨁸䠈前不進也|𥓎𥓎矹崖狀|㪐㪐㩿不穩又不利也
eaj苦骨窟窟穴苦骨切十五|顝大頭皃|泏漚池|𩑔白禿|矻用心矻矻|堀宋玉云堀堁揚塵又音掘|𧷎說文曰囚突出也本胡八切|㧾擊也|圣汝潁閒謂致力於地曰圣|㩿㪐㩿不穩|𡑣土塞|䯇力作|𡼿𡼿屼禿山皃|𥌄目突𥌄|胐胐臀俗又作𦜇
Haj內骨訥謇訥內骨切五|㕯㕯口又女滑切|肭膃肭|抐內物水中|𣧍殟𣧍
Qaj蘇骨窣勃窣穴中出也蘇骨切七|𪌯麥屑|𪍛上同（麥屑）|㲞𣭷㲞毛皃|𪖶鼻鳴|𪅄鵓𪅄鳥|屑動進皃說文本先節切
Oaj倉沒猝倉猝暴疾也倉沒切五|卒急也遽也又子沒切又將律切|𣨛亡也|𢪃摩也|𥾛索也
Paj昨沒捽手捽也昨沒切六|椊椊杌以柄內孔|𪘧齚也|䚝角始生也|崒崒屼山皃|𩩠小骨
jbT下沒麧麧糏漢書云食糠麧下沒切五|𥝖秳也舂粟不潰也|齕齧也又胡結切|紇絲下也又孔子父名又虜複姓三氏北齊開府紇奚永樂又有紇干氏紇骨氏又虜三字姓後魏有賊師紇豆陵伊利又胡結切|淈淈泥又古忽切
jaj戶骨搰掘地也戶骨切于十|扢摩也|𣝗果子𣝗也出聲譜|𦗣耳黧|𦖼耳聲|𢪏牽物動轉|鶻鳥名鷹屬又骨猾二音|尳膝病|㨡手推也|𡰅𡰅露出見字林|滑滑亂也出列子
Naj臧沒卒說文隷人給事者衣爲卒卒衣有題識者臧沒切又將聿切三|倅百人爲倅周禮作卒|稡䄶稡
#曷
jcT胡葛曷何也胡葛切十一|褐衣褐說文云編枲韈也一曰短衣|毼毛布|鶡鳥似雉也鬬必至死|蝎蟲名爾雅曰蝤蠐蝎又曰蝎桑蟲|餲餅名|䫘𩑵䫘健也又音𠿒|𩩲𩩲骬肩骨|骱骨堅|㮫木轉皃|鞨靺鞨蕃人名出北土
icT許葛䫘𩑷䫘健也許葛切八|𠿒訶也|喝上同（訶也）|猲短喙犬又恐也又音歇|𦤦犬臭氣|㿣白色|暍熱皃|𩡔香氣又呼蓋切出字林
EcT當割怛悲慘也當割切十|𢛁驚𢛁|妲妲己紂妃|呾相呵|炟火起|䵣莫䵣縣在五原|狚獦狚獸名似狼而赤出山海經|笪竹䉬|𦬹蕈𦬹|靼柔革也又之列切
FcT他達闥門內他達切十三|㒓𠇱㒓|撻打撻|躂足跌|澾泥滑|獺水狗|䲚魚名|𣥂文字音義云蹈也從反止|羍小羊也亦作𦍐|𦍒上同（小羊也亦作𦍐）|達挑達往來皃又唐割切|汏汏過|噧多言也
hcT烏葛遏遮也絕也止也烏葛切十一|齃鼻齃|頞上同（鼻齃）|堨擁堨|閼止也塞也又於連切|胺肉敗臭論語作餲食臭也|餲食傷臭又於介於罽二切|靄雲狀又於蓋切|咹止語|𠥜大呼用力|𢉥屋迫
IcT盧達剌僻也戾也盧達切十六|揧研破|辢辛辢|䓶䓶蒿|瘌癆瘌不調|攋撥攋手披也|糲麤糲|癩疥癩又音賴|𢉨廣雅曰庵也亦獄室也|轢車轔著又歷洛二音|𢃴拂著|䶛齧聲|㻝玉名|𥈙目不正|楋木名|蝲蝲蟽
ecT苦曷渴飢渴又虜複姓二氏後魏書渴侯氏後改爲緱氏渴單氏後改爲單氏亦虜三字姓後魏書北方渴燭渾氏後改爲朱氏苦曷切八|㵣古文（飢渴又虜複姓二氏後魏書渴侯氏後改爲緱氏渴單氏後改爲單氏亦虜三字姓後魏書北方渴燭渾氏後改爲朱氏苦曷切八）|𤸎內熱病也|䳚䳚鴠|嵑嵑嶭山皃|磕石聲|䯋肩髆|䅥禾長也
GcT唐割達通達亦姓出何氏姓苑又虜複姓三氏後魏獻帝弟爲達奚氏又達勃氏後改爲襃氏周文帝達步妃生齊煬王憲唐割切二|薘馬舄草名
PcT才割嶻嶻嶭山名在右扶風才割切又才結切四|囋嘈囋鼓聲或作𠱥|囐上同（嘈囋鼓聲或作𠱥）|㩵擊也
gcT五割嶭五割切又五結切十三|䡾車載高也|屵高山狀|枿伐木餘枿|𣡌頭戴皃說文曰伐木餘也|櫱上同書作蘖（頭戴皃說文曰伐木餘也）|𣎴古文從木無頭（上同書作蘖）|𠱥毀讀曰𠱥|㩵擊也又才割切|𠲗𠲗𠲗㗴㗴戒也說文曰語相訶距也|歺說文曰𠛱骨之殘也凡從歺者今亦作歹|頇無髮|齾獸食之餘曰齾
dcT古達葛葛藟廣雅云苑童寄生葛也一名寓木又名寄屑亦姓後漢有潁川太守葛興古達切十|䈓䈓䉈桃枝竹名|獦獦狚獸也|割剝也害也斷也截也|𩢛馬走疾也|匃乞也亦作丐又音蓋|輵轇輵戟形也又轇輵驅馳皃|𨞛鄉名在南陽|𥢸禾長也|㵧水名又㶀㵧波勢也
QcT桑割躠跋躠行皃桑割切九|薩釋典云菩薩菩普也薩濟也能普濟眾生也|摋抹摋公羊傳曰宋萬臂摋仇牧碎首何休云側手曰摋|𥻦放也若𥻦蔡叔是也說文曰䊝𥻦散之也|𠱡音變|攃攃攃聲|䉈䈓䉈桃枝竹也|𦼧失𦼧|𨐖俗云𨐖辢
OcT七曷攃足動草聲七曷切三|䌨縠屬出淮南子|礤麤礤
HcT奴曷捺手按奴曷切三|𤷈痛也|䖧蠚螫
jcT予割䔾菜似蕨生水中予割切一
#末
DcD莫撥末木上也無也弱也遠也端也亦姓姓苑云本姓秣氏後去禾又虜三字姓後燕錄襄城公末那樓雷莫撥切二十七|昩星也易曰日中見昩案音義云字林作昧斗杓後星王肅音妹|𩑷𩑷䫘健也|䀛遠視又不正視又莫拜切|䴲麪也|𨣱醬也|䬴馬食榖也|秣上同（馬食榖也）|𥬎捕鰌竹器|靺靺鞨蕃人出北土|韎韎韐大帶|𥄕說文曰目不正|粖糜也又亡結切|𩱷上同（糜也又亡結切）|𥽘米和細屑|䱅魚名|眜目不明也|抹抹摋摩也|妺妺嬉桀妃|𠇱𠇱㒓肥皃又西夷樂名|𢗿忘也|𡊉壤也|瀎塗拭|𩿣鳥名|沫水沫一曰水名在蜀又武泰切|𦫕𦫔𦫕色不深也|袜袜肚
gcj五活枂去樹皮又柮枂柱頭木五活切一
Pcj藏活柮藏活切一
AcD北末撥理也絕也除也北末切十六|癶足剌癶也|袚蠻夷蔽膝|茇蓽茇|鉢鉢器也亦作盔顏師古注漢書曰盔食器也|盋上同（鉢器也亦作盔顏師古注漢書曰盔食器也）|䳊鳥名又音拔|鱍魚掉尾也|䢌急走|𩯌𩯌䰖多鬢皃|襏襏襫蓑雨衣也|帗一幅巾|㤄意不悅皃|𦪑大船名|驋馬怒|筏箄筏
NcT姊末䰖姊末切六|拶逼拶|㳨㳨濺|𠛱剌𠛱不淨也|𨀨蹙𨀨行皃出新字林|㵶水湍頭起
dcj古活括檢也結也至也古活切二十一|活水流聲又乎括切|𣽅上同（水流聲又乎括切）|髺結髺|檜木名柏葉松身又工外切|栝上同見書（木名柏葉松身又工外切）|聒聲擾|䒷說文曰䒷蔞果臝也|𦸈𦸈𧁾同上（說文曰䒷蔞果臝也）|鴰鶬鴰韓詩云孔子渡江見之異眾莫能名孔子嘗聞河上人歌曰鴰兮鶻兮逆毛衰兮一身九尾長兮鶬鴰也|萿爾雅曰萿麋舌郭璞云今麋舌草春生葉有似於舌|适疾也|銛說文曰斷也|佸會計曰佸|頢小頭皃|劊斷也|葀菝葀瑞草|䯏骨端|懖愚懖無知說文曰善自用之意也引商書曰今汝懖懖|𦗾古文（愚懖無知說文曰善自用之意也引商書曰今汝懖懖）|筈箭筈受弦處
ecj苦栝闊廣也遠也疏也苦栝切六|蛞蝦蟆子名|筈箭筈又音栝|适疾也又音栝|䟯蹵䟯|𤫵瓜𤫵
jcj戶括活不死也又水流聲戶括切八|𣽅水流聲|䄆祠也|越鄭玄云瑟下孔又云翦蒲爲席又音粵或作趏|鬠以組束髮|佸佸會|秳舂榖不潰也|姡姡靦也又音頢
Gcj徒活奪左傳曰一與一奪徒活切八|𡙜上同（左傳曰一與一奪徒活切八）|敓強取也古奪字古周書曰敓攘矯虔亦姓|脫肉去骨亦姓出姓苑又土活切|挩解挩|莌活莌草名生江南高丈許大葉莖中有瓤正白|痥馬脛傷也|鮵爾雅曰鰹大鮦小者鮵
icj呼括豁豁達呼括切八|𧯆上同（豁達呼括切八）|奯大開目也|濊水聲|𤃴上同（水聲）|泧瀎泧|𣁳舀水|眓說文曰視高皃
hcj烏括斡轉也烏括切九|焥火煙出|䩊目開皃|捾捾取也|𣁳上同（捾取也）|嬒方言云嬒可憎也或作懀又烏外切|䁊目深黑皃|睕小嫵媚也|𥄗說文云捾目也
Ncj子括繓結繓也子括切三|撮撮挽牽也又七活切|攥手把
BcD普活鏺兩刃刈也普活切說文又讀若撥十三|𢯸芟𢯸|𨂩蹋草聲|㧊推㧊|䣪酒氣|𨡩𨡩醅酘酒|𣸍水𣸍|𥄱目𥄱眜不明皃|鱍魚掉尾又音撥|𧘟衣袂也|𦫔𦫔𦫕無色|䍨牯羊|𠷑謶𠷑人言
Fcj他括侻侻可也一曰輕他括切五|挩除也誤也遺也又解挩或作脫|脫骨去肉又徒活切|莌又徒活切|梲大棒亦木梲又音拙
Icj郎括捋手捋也取也摩也或作寽郎括切五|𠜖削𠜖也|蛶蚵蛶蟲又音劣|㸹駁㸹|㭩木名又音劣
Ecj丁括掇拾掇也丁括切八|剟削也擊也|鵽鵽雀又當刮切|腏挑取骨間肉也|祋祋祤縣名又都外切|咄又都骨切|裰補裰破衣也|敠敠敠知輕重也又敠𣀒食不喚自來
Ocj倉括撮六十四黍爲圭四圭爲撮撮手取倉括切二|襊緇布冠詩作撮
CcD蒲撥跋跋躠行皃又躐也蒲撥切二十五|䟛行皃|𧺡上同（行皃）|𧺺上同（行皃）|魃旱魃|𢇷舍也|軷將行祭名|䣮酒氣|馛香氣|炦火氣|颰風皃|癹除草說文音鏺|妭鬼婦文字指歸云女妭禿無髮所居之處天不雨說文曰婦人美皃|犮犬走皃|䚨弋鳥具說文音廢|拔迴拔又虜複姓三氏後魏有都督拔略昶出賀拔勝傳又有夏州剌史拔也惡蚝官氏志有柯拔氏又虜三字姓後魏書拔列蘭氏後改爲梁氏又蒲八切|胈夏禹治水腓無胈脛無毛韋昭云胈股上小毛也|鈸鈴鈸|䳊鳥名似鳧|䮂䮂䮧蕃中馬也|菝菝葀瑞草|坺一臿土也又音伐|𩃶雲氣|茇草木根也|䯋肩髆
#黠
jeT胡八黠黠慧也又堅黑也胡八切四|𩪲齧聲|䕸麻莖|䦖門聲
SeT側八札簡札釋名曰札櫛也編之如櫛齒相比也又牒也署也側八切六|𣧖癘疾|蚻小蟬|紮纏弓弝也|𩿤鳥雜蒼色|扎扎拔也出家語
CeD蒲八拔拔擢又盡也蒲八切又蒲撥切三|菝菝𦸉狗脊根可作飲|𥎱𥎱䂒短人
eeT恪八𤫶勁也恪八切十二|擖說文刮也一曰撻也|劼用力又固也慎也勤也|鬜虎鬜也|𩮁上同（虎鬜也）|㓞巧㓞|㓤剝㓤|硈石狀說文堅也一曰突也|𦸉菝𦸉草|䂒𥎱䂒短人|咭鼠鳴|𢼣擊也
jej戶八滑利也亦州名春秋時爲衛國秦爲東郡後魏以東郡屬司州周改爲滑州因滑臺以爲名又姓風俗通云漢有詹事滑典又音骨滑稽也戶八切八|猾狡猾書傳云猾亂也|䱻魚名鳥翼出入有光音如鴛鴦見則天下大旱出山海經|磆磆石藥|螖蟚螖似蟹而小|䴳麴名|𧽌走𧽌|鶻鶻鳩又音骨搰
AeD博拔八數也博拔切十|𩡩馬八歲|朳無齒杷也|捌上同（無齒杷也）|扒破聲|㺴玉名|䤢金類|哵哵哵鳥聲|玐玉聲|釟治金
Jej丁滑窡說文曰穴中見也丁滑切五|𠿡說文曰口滿食|娺婠娺好皃|鵽黃雀|聉無所聞也
hej烏八婠烏八切六|𣁳𣁳取物也|嗢咽也又烏沒切|䯉說文曰咽中息不利也|穵手穵爲穴|嗗飲聲
Mej女滑豽獸名似狸蒼黑無前足善捕鼠說文作貀女滑切四|貀上同（獸名似狸蒼黑無前足善捕鼠說文作貀女滑切四）|㕯言逆下也又女骨切|肭膃肭肥皃
TeT初八䶪齒利又磣䶪初八切七|䕓草䕓|察監察也諦也知也至也審也案說文云覈覆也詧言微親詧也今通用亦姓出何氏姓苑|詧上同（監察也諦也知也至也審也案說文云覈覆也詧言微親詧也今通用亦姓出何氏姓苑）|𣘤木名|𥉻視𥉻|𩴳羅𩴳鬼亦作𩲺
dej古滑劀說文曰刮去惡創肉也周禮曰劀殺之齊古滑切三|𠟽俗（說文曰刮去惡創肉也周禮曰劀殺之齊古滑切三）|鱊魚名
deT古黠戛揩也常也禮也說文戟也古黠切十八|扴指扴物也|圿垢圿|稭說文曰禾稾去其皮祭天以爲席也|鴶鴶鵴鳲鳩|楔櫻桃又先結切|秸秸稾|骱䯦骱小骨|鞂草鞂|砎礣砎小石|忦恨也|嘎嘎嘎鳥聲|𠜵刮也利也|𪃈𪃈𪈟鳥又音絜|袺執衽又音結|㮖鼓也|磍輵磍搖目吐舌又感怨皃|頡漢書有頡羹侯
heT烏黠軋車輾烏黠切十|圠山曲|揠拔草心也|嫼嫉怒|䝟䝟貐獸名食人迅走|猰上同（䝟貐獸名食人迅走）|穵說文云空大也|𥈔目相戲皃|䰲䱀䰲魚名|窫窫窳國名
VeT所八殺殺命說文戮也所八切七|煞俗（殺命說文戮也所八切七）|鎩鳥羽病又長刃矛也|𣻑水也|帴二幅|蔱莁荑|榝似茱萸而實赤又山列切
DeD莫八㑻㑻傄健皃莫八切七|䀣惡視|齂氣息|䯦䯦骱小骨|𪒜黑也|睰視睰|礣礣砎小石
iej呼八傄呼八切二|䀨視也埤蒼云怒視皃
MeT女黠痆瘡痛女黠切三|𤷈上同（瘡痛女黠切三）|𧞍奴人衣
gej五滑𦤙屈也五滑切三|聉無知之意|𦘍無耳吳楚語也
eej口滑䯇力作也口滑切又音窟一
BeD普八汃西極水名普八切四|𪗔齒聲|𥐙石破聲|𨋐車破聲
Sej鄒滑茁草初生鄒滑切一
#鎋
jdT胡瞎鎋車軸頭鐵胡瞎切十五|舝上同出說文（車軸頭鐵胡瞎切十五）|轄上同說文車聲也一曰轄鍵也（上同出說文）|𪗾齒聲|鶷鶷𪆰鳥名似伯勞而小|砎礣砎硬也礣慕轄切|𧕱螻蛄別名|𤪍石似玉也|𦵯野蘇|𧷎囚突出也|縖束物也|𩝛食飽|𥰶拾𥰶|𠢆用力|𢮟手𢮟
hdT乙鎋𪆰乙鎋切五|䦪門扇聲|𡇼駱駝鳴也|呾相呼聲又當辢切|劜勜劜屈強也
gdT五鎋齾器缺也五鎋切四|聐聐顡無所聞也|𩮝禿𩮝|𡿖山中絕皃
TdT初鎋刹刹柱也初鎋切二|䓭掃地惡草
edT枯鎋𥴭木虎止樂器亦名敔也枯鎋切四|楬上同見禮（木虎止樂器亦名敔也枯鎋切四）|磍剝也|趏走皃
idT許鎋瞎一目盲亦作𥈎許鎋切四|𪗾齒堅聲|𩮂𩮂𩮁禿皃|㔠力作㔠㔠
KdT他鎋獺獸名他鎋切又他達切一
ddj古䫄刮刮削古䫄切五|鴰鶬鴰鳥毛逆九尾又音括|劀利也又古滑切|䄆禳祠名|趏走皃又枯鎋切
jdj下刮頢短面皃也下刮切七|𤁪言不了又不淨|𦧠繒細|敌盡皃|舌塞口說文作𠯑話栝之類从此|姡面醜|咶息也
Kdj丑刮䫄䫄頢強可皃丑刮切二|𤁫𤁪𤁫
Jdj丁刮鵽爾雅曰鵽鳩寇雉郭璞云鵽大如鴿似雌雉鼠腳無後指歧尾爲鳥憨急羣飛出北方沙漠地丁刮切又丁括切三|窡穴中出皃|錣策端有鐵
Vdj數刮刷刷拭也數刮切又所劣切一
gdj五刮刖去足亦槷刖危之皃五刮切又音月四|䎳說文曰墮耳也|㱚獸食殘皃|䚴訶也
Tdj初刮䵵黑也初刮切二|㔍斷也又叉芮切
DdD莫鎋礣礣砎莫鎋切四|帓帓帶|帕帕額首飾|㩢打㩢
Mdj女刮妠婠妠小兒肥皃女刮切三|𤬷𤭧也亦作𤬼|袦下人帶襦名
AdD百鎋捌方言云無齒杷百鎋切二|㭭木名
ddT古鎋𪈟𪃈𪈟鳥名似鳧古鎋切四|擖刮聲也又揵也架也折也|𩮁禿皃|猰雜犬
UdT查鎋𨰉秦人云切草查鎋切三|耫農具也|㳐㳐㳐水流也
JdT陟鎋哳嘲哳鳥鳴也陟鎋切四|𢧖𢧖好出證俗文|𧶇𧶇貨也|眣目露皃出聲類
MdT而轄𩭿細毛也而轄切一
#屑
QfT先結屑動作屑屑又清也敬也顧也勞也說文作㞕先結切十一二|楔木楔|揳㩢揳不方正也|𨆳蹩𨇨旋行|榍木名說文限也|糏米麥破也|僁動草聲又云鷙鳥之聲又僁僁呻吟也亦作𠋱|偰㒝偰淨也|㴽瀎㴽水皃|𦵱草名|𦞚臆中脂|㨝揲㨝
OfT千結切割也刻也近也迫也義也說文折也千結切八|㗫小語|𪙌𪙌齒也|竊盜也又淺也|柣爾雅曰柣謂之閾又音秩|沏水聲|䟙䟙跌|詧說文曰言微親詧也又音察
dfT古屑結締也古屑切十五|絜說文曰麻一耑也|潔清也經典用絜|䥛鎌別名也|鍥上同（鎌別名也）|桔桔梗|𣚃𣚃槔汲水具也|𧾯走皃|𪃈𪃈𪈟鳥名𪈟古轄切|袺詩傳云執衽曰袺|拮手口共有所作詩曰予手拮据|狤狤𤟎獸名|魝割治魚也|𡔢頭傾皃|𧍩蠸𧍩蟲名
NfT子結節操也制也止也驗也說文曰竹約也子結切十三|𢎛說文曰瑞信也凡從𢎛今作卪|癤瘡癤|蝍蝍蛆蜈蚣又音即|楶屋梁上木|㵶小灑|㸅燭餘|𡴺高山皃|䰏說文曰束髮少小也|䲙魚名|幯幯拭|𠬝說文治也本房六切|𧞛小衣
ifj呼決血釋名曰血濊也出於肉流而濊濊也呼決切十二|𥅧𥉺𥅧惡皃|䆷穿皃|䆝上同（穿皃）|䦑𨴒䦑無門戶也|泬泬寥空皃|疦瘡裏空也又音玦|瞲驚視皃|決莊子云決起而搶榆枋決小飛皃|䛎怒呵|䒸草皃|坹穴也
efj苦穴闋終也苦穴切四|湀爾雅云湀闢流川又揆奎二音|缺器破|𨴒𨴒䦑無門戶也
dfj古穴玦珮如環而有缺逐臣賜玦義取與之訣別也古穴切二十六|潏泉出皃又水名在京兆又音聿|䀗目患|譎譎詐|訣訣別|𧤾環有舌也|觼上同出說文（環有舌也）|鐍亦同又扃鐍出莊子|駃駃騠良馬生七日超母也|𦯊𦯊明菜花黃|芵上同（𦯊明菜花黃）|赽馬疾行也|鴂鶗鴂鳥名關西曰巧婦關東曰鸋鴂春分鳴則眾芳生秋分鳴則眾芳歇|鈌剌也又乙穴切|𣬎獸名似狸|決流行也廬江有決水出大別山人斷也破也俗作决|觖觖望怨望也又羌瑞切|騤爾雅馬回毛在背曰騤𩧉𩧉音光亦作闋廣|㭈椀也又小盂也|疦說文𤺉也|蚗蛥蚗蟪蛄蟲名|趹足疾|憰憰妄語也|𧝃衣袖|䏐孔䏐|抉縱弦彄也
jfj胡決穴窟也舟穴山名鳳皇所出胡決切四|坹空深皃|䋉說文縷一枚也|袕鬼衣又長衣也
hfj於決抉抉出於決切六|䆕穿皃|妜娟也|焆火光也|𥈾目深皃|䆢說文曰深抉也
GfT徒結姪姪娣公羊傳云兄之子徒結切三十五|眣目出|昳日昊|胅骨胅|凸高起|垤蟻封又曰冢前闕也|耋老也八十爲耋亦作耋|迭遞也更也道也|跌跌踼又差跌也|絰縗絰|驖馬赤黑也|嵽嵽嵲高山|軼車相過又音逸|䭿馬行疾也|𨳺䦖𨳺鄭城門也左傳作桔柣|瓞爪瓞|咥笑也又齧也易云履虎尾不咥人亨又火至丑栗二切|墆貯也止也|戜利也又國名在三苗國東出山海經|苵爾雅曰蕛苵郭璞云蕛似稗布地生穢草|镻爾雅镻蝁注云蝮屬大眼最有毒今淮南人呼蝁子|䳀爾雅云鴩餔叔|荎刺榆又音治|𪗻齧堅聲又竹一切|𢲼擿也|恎惡性|詄忘念|摕捎取|𪀒鳥名|𠽧齧堅|𡼄𡼄𡸢山兒|泆泆蕩|𥑇砲𥑇|趃大走|㦅㦅㦅不自安也
FfT他結鐵說文云黑金也神異經云南方有獸名曰齧鐵大如水牛色如漆食鐵飲水其糞可作兵器其利如鋼也又虜複姓赫連勃勃改其支庶爲鐵伐氏云庶朕宗族子孫剛銳如鐵皆堪伐人也又作鐵俗作䥫他結切八|銕古文（說文云黑金也神異經云南方有獸名曰齧鐵大如水牛色如漆食鐵飲水其糞可作兵器其利如鋼也又虜複姓赫連勃勃改其支庶爲鐵伐氏云庶朕宗族子孫剛銳如鐵皆堪伐人也又作鐵俗作䥫他結切八）|僣僣侻狡猾|餮貪食說文作飻貪也|飻上同（貪食說文作飻貪也）|蛈爾雅曰王蛈蝪郭璞云即螲蟷似鼅鼄在穴中有蓋今河北人呼蛈蝪|𢶋捅𢶋皃出字林|驖馬赤黑也
jfT胡結纈綵纈胡結切二十一|䦖䦖𨳺義見𨳺字|擷捋取又虎結切|𢴲縛也|頡頡頏詩傳云飛而上曰頡飛而下曰頏說文曰頡直項也又姓風俗通有頡衛古之賢者|頁頭也|齕齧也又乎沒切|紇絲下也又乎沒切|襭以衣衽盛物也|絜爾雅河名即九河之一也又古節切|𥊯䁾𥊯目赤|𧀺蘢𧀺草也|𪕯鼠名又胡狄切|翓翓𦐄飛上下|䐼膜䐼|㹂牛很又口殄切|奊頭邪|籺屑米|𨵪門聲|𥢹麥𥢹不破|覈邀覈
HfT奴結涅水名出東郡又水中黑土奴結切十二|捏捏捺|𦯖菜似蒜生水邊|㘿塞也|圼上同（塞也）|篞爾雅云大管曰簥其中曰篞小者曰篎|苶苶然疲役又乃叶切|𥔄礬石別名|𤶚疾病|㖏㖏呵|𦛠腫也|菍草也
PfT昨結截廣雅云盛也斷也或作截餘倣此昨結切七|䟌傍出前也|𡴺山峯又子結切|嶻嶻嶭山名又藏曷切|蠞蠞似蟹生海中|䕙草䕙|𩟙食
gfT五結齧噬也亦姓莊子有齧缺五結切十三|霓虹又音倪|蜺寒蜩又音倪|嵲螮嵲|槷危槷|臬禮注云門橜也爾雅云在牆者曰楎在地者曰臬|嶭嶻嶭又五割切|臲臲卼不安書作杌陧|陧見上注（臲卼不安書作杌陧）|䘽裗䘽|𡴎山高皃說文作𡴎本音孼|闑門閫中也|𡿖屼𡿖山皃
DfD莫結蔑無也說文曰勞目無精也从苜戍人勞則蔑然也苜音末莫結切二十三|懱輕懱|𧂝目赤說文云目眵也俗作䁾|㩢㩢揳不方正也|蠛蠛蠓|篾竹皮|幭帊幞|鱴𩶽鱴魛今鮆魚也|𥾝細也出蒼頡篇|衊汙血也出說文|䩏䩏尐小也尐即列切|㒝㒝僣多詐|𥉓汙面|𤊾火不明皃|覕不相見皃|𪇴工雀|𥣫莊子謂之禾也|鴓繼英鳥名|瀎瀎㳚|𥸴糏𥸴也|𥌨𥌨頡|粖糜也又亡達切|𩱷上同（糜也又亡達切）
AfD方結㢼弓戾或作𢏨方結切九|䋢輓又普蔑切|閉闔也塞也俗作𨳲又博計切|𩋇刀飾名|𡘴大也|䌘繩編劒帶|㭭㭭柲也|䘷䘷袖褾袂也|㔡大力之皃
hfT烏結噎食塞又作咽烏結切六|䊦糉屬|㝣靜也又音翳|蠮蠮螉|𤝱獸名似牛白首四角出山海經|咽哽咽
efT苦結猰猰犺不仁苦結切九|䫔𩓝䫔短皃|挈提挈又持也|㼤㼤瓶受一升也|𡔢𥸸𡔢多節目也𥸸練結切|契契闊又苦計切|栔爾雅云栔滅殄絕也|鍥刻也又斷絕也又古屑切|蛪蛪蠅蟲又蛪蚼似蟬而小
ifT虎結㚛肥壯虎結切六|䩤急繫|擷又胡結切|𢴲𢴲束又下結切|褉褉襦|䙽見也
BfD普蔑撆小擊又略也引也亦作撇普蔑切十|丿右戾|𢠳𢠳然瞋也|瞥暫見亦作𧢍又芳滅切|䭱小香也|䋢韻略云馭右迴又方結切|嫳輕薄之皃|䫾䫾小風皃|鐅江南呼鍫刃|暼暼日落勢也
CfD蒲結蹩蹩𨇨旋行皃一曰跛也蒲結切十四|𢱧反手擊也|𩓝𩓝䫔|癟戾癟不正|䭱香也又音瞥|咇咇語也又口香|苾菜名說文曰馨香也又頻必切|馝香也|䏟䏟㚛肥也|飶食香|蛂蛂蟥蛢甲蟲也|柲支柲|𢛎醜氣|襒襒衣亦作𧝬
EfT丁結窒塞也丁結切又陟栗切七|𥉺𥉺𥅧|蛭水蛭又音質|㗧㗧咄|咥蛇咥氏蕃姓|𨴗門閉|𡇓下入
IfT練結𥸸𥸸𡔢多節目也練結切七|戾罪也曲也戾至盭並又力計切|捩拗捩出玉篇|綟麻綟|唳嘍唳鳥聲|盭綬色也|夨左曰夨也
#薛
QgT私列薛國名亦姓出河東新蔡沛國高平四望本自黃帝任姓之後裔孫奚仲居薛歷夏殷周六十四代爲諸侯周末爲楚所滅後遂氏焉說文作辥艸也私列切十九|𨫔田器|紲繫也左傳曰臣負羇紲杜預云紲馬韁也亦作絏俗作靾|緤上同（繫也左傳曰臣負羇紲杜預云紲馬韁也亦作絏俗作靾）|褻衷衣|辥說文辠也凡從辥者經典通作薛|泄漏泄也歇也亦作洩又姓左傳鄭大夫洩駕又餘制切|渫治井亦除去又姓渫子古賢者出韓子|禼字林云蟲名也又殷祖也或作偰又作契|𥝁古文（字林云蟲名也又殷祖也或作偰又作契）|媟狎也慢也說文嬻也|齛亦作齥爾雅云羊曰齥|䊝𥻦䊝|𣽒𣽒注|暬侮也|絬堅絬|㡜殘帛又音雪|疶痢也亦作𤵺|㔎斷也
IgT良辥列行次也位序也又陳也布也說文作𠛱分解也亦姓鄭有列禦寇著書十八篇良辥切二十|𠛱上同（行次也位序也又陳也布也說文作𠛱分解也亦姓鄭有列禦寇著書十八篇良辥切二十）|迾遮遏|蛚蜻蛚蟋蟀|鮤刀魚也一名鱴刀今鮆魚也|烈光也業也又忠烈又猛也熱也火也|洌水清也潔也|冽寒也|裂擘裂破也左傳曰裂裳帛而與之|茢禮注云桃茢可以爲帚除不祥說文芀也|颲風雨暴至|鴷啄木鳥|栵細栗爾雅云栵栭今江東呼爲㮌栗楚呼爲茅栗也|㤠憂心|挒埤蒼云搩也|𩢾次第馳馬|𡊻塍也|𡿪水流皃|姴美也|䅀說文曰黍穰也
JgT陟列哲智也陟列切五|悊（智也陟列切五）|喆並上同（智也陟列切五）|嚞古文|蜇螫也亦作䖧
fgb渠列傑英傑特立也又俊也渠列切十四|桀磔也又夏王名|竭盡也舉也|碣說文曰特立之石也又東海有碣石山|楬有所表識說文楬櫫也春秋傳曰楬而書之|榤鷄栖於杙|揭高舉又朅訐二音|渴水盡也|嵥嵥𡴎高皃|滐水激迴出海賦|櫭木釘名|偈武也|杰梁四公子名𩆊杰也|搩強暴
cgT如列熱釋名曰熱爇也如火所燒爇如列切二|苶疲役皃
XgT旨熱晢光也旨熱切九|晣上同（光也旨熱切九）|浙江名在東陽一曰浙米也|折拗折又虜複姓南涼禿髮傉檀立其妻折屈氏爲皇后又常列切|靼柔皮|𩍕古文（柔皮）|䩢俗（柔皮）|䏳脟皮也|䀸目明
bgT食列舌口中舌山海經云長舌山有獸名長舌狀如禺而四耳出則郡多水又姓左傳越大夫舌庸也食列切四|揲數蓍又思頰切|蛥蛥蚗蟪蛄別名|鞨治皮亦作㓭
ZgT常列折斷而猶連也說文斷也又作㪿常列切一
ggb魚列孼臣僕庶孼之事謂賤子也猶樹之有孼生也說文曰庶子也魚列切十二|糱麴糱說文曰牙米也|讞正獄說文作𤅊議辠也與法同意|𤅊上同（正獄說文作𤅊議辠也與法同意）|蠥䄏蠥說文曰衣服謌謠艸木之怪謂之䄏禽獸蟲蝗之怪謂之𧞔蠥|㜸俗（䄏蠥說文曰衣服謌謠艸木之怪謂之䄏禽獸蟲蝗之怪謂之𧞔蠥）|闑門中礙也|𡴎山高皃說文作𡴎危高也又藝哲切|钀馬勒傍鐵|櫱木餘又姓何氏姓苑云東莞人本姓薛避仇改之|䶬龍鬐脊上䶬䶬又丁篋切|䡾高皃
DgH亡列滅盡也絕也亡列切二|搣手拔又摩也㧗也捽也
egb丘竭朅說文去也丘竭切又去謁切五|揭高舉也又擔也|藒藒車香草|愒息也|𡐤玉篇云𡐤界也
AgH并列鷩雉屬似山雞而小周禮有鷩冕并列切七|鼈魚鼈俗作鱉蟞|虌蕨菜|鄨水名在牂牁|𡐞大阜|憋急性皃|䳤鵂鶹
Pgj情雪絕斷也作絕非情雪切一
Ngj子悅蕝束茅表位子悅切又子芮切三|㔢㔢斷物也|𨼎隔𨼎
Qgj相絕雪凝雨也元命包曰陰陽凝爲雪釋名曰雪綏也水下遇寒氣而凝綏綏然下也又拭也除也相絕切四|䨮上同出說文（凝雨也元命包曰陰陽凝爲雪釋名曰雪綏也水下遇寒氣而凝綏綏然下也又拭也除也相絕切四）|㡜㡜縷桃花今製綾花|㨹滅㨹
Kgj丑悅𤿫皮破丑悅切一
lgj弋雪悅喜也脫也樂也服也經典通用說又姓後燕錄有悅綰弋雪切七|說姓傅說之後又失爇始銳二切|閱簡閱也又閥閱|蛻蟬去皮也又他臥他外舒芮三切|娧姚娧美好又他會切|𧀲草名似芹|䓲草生而新達曰䓲也
egn傾雪缺少也說文曰器破也傾雪切二|蒛蒛葐草也
hgr乙劣噦逆氣乙劣切一
cgj如劣爇燒也如劣切五|焫上同見禮（燒也如劣切五）|蜹蚊蜹又如銳切|㨎括也|㕯言遟聲
agj失爇說告也釋名曰說者述也宣述人意也失爇切又悅稅二音一
Xgj職悅拙不巧也職悅切十一|炪說文曰火光也|䂐短也|梲梁上楹|蝃蜘蛛|準應劭云準頰權準也李斐云準鼻也又章允切|䫎頭短|𠭴倔𠭴短皃|䪼面秀骨|𨡸醎葅|䖦蟲
Ygj昌悅歠大飲昌悅切二|啜茹也
Jgj陟劣輟止也已也陟劣切十五|畷田閒道又竹芮切|惙疲也憂也|餟祭酹也又竹芮切|罬捕鳥覆車罔一名罦|剟說文刊也|醊醊連祭也|啜言多不止|䟾跳也|綴連補也又竹芮切|掇拾取又丁活切|腏骨閒髓也|𩋁車具|叕聮也|𧖀茅蜘蛛說文曰蟊作罔蛛蟊也又壯殺切
Igj力輟劣弱也鄙也少也力輟切十三|𢚃上同（弱也鄙也少也力輟切十三）|埒馬埒亦厓也還也堤也爾雅山上有水埒又孟康云等庳垣也|䟹蹶䟹跳踉皃出字統|鋝說文曰十一銖二十五分之十三周禮曰重三鋝又音刷|脟脅𠟼|㸹牛白脊出字林|蛶爾雅曰蛶螪何|㲕毛色斑也|浖隈隅也|哷鷄鳴|㭩木名又音捋|𦓤禾麥知多少
BgH芳滅瞥暫見亦作𧢍說文曰過目也又目翳也芳滅切又芳結切四|潎漂潎又匹蔽切|憋怒也又卑列切|癟枯病
CgL皮列別異也離也解也說文作剛又姓何氏姓苑云揚州人皮列切又彼列切二|𡷘大𡷘山名書亦作別
LgT直列轍車轍直列切五|徹通也明也道也達也又丑列切|撤發撤又去也經典通用徹|澈水澄|㯙棗也
AgL方別䇷分䇷一云分契方別切五|𧧸上同（分䇷一云分契方別切五）|莂種穊移蒔也|扒擘也|別分別
Vgj所劣㕞埽也清也所劣切四|刷上同（埽也清也所劣切四）|𠴪鳥理毛也|𠻜小飲
dgX居列dgb居列孑a單也居列切六|訐b訐發人私|𨥂a句孑戟也|趌a趌𧽸跳皃|䅥b長禾|揭b揭起
agT識列設置也陳也合也識列切二|蔎香草
Mgj女劣吶嗗吶聲不出女劣切一
ign許劣𥄎舉目使人許劣切六|𩖶小風皃|𣧡盡也|烕滅也|𦐋小鳥飛|吷飲也說文與歠同
hgn於悅妜鼻目閒輕薄曰妜也於悅切一
dgr紀劣蹶有所犯灾紀劣切又居月居衛二切五|𧱝豕發土也|𧣸角觸|䞵小跳|罬罦也又陟劣切
Sgj側劣茁草生皃側劣切又側滑切二|䵵短黑皃也
Ogj七絕膬耎而易破七絕切四|絟細布別名|𥕹石破|敠斷敠絕
NgT姊列𧕾茅𧕾似蟬而小姊列切八|䘁上同（茅𧕾似蟬而小姊列切八）|𪇲小鷄|尐說文少也|𢪍𢪍摘去也|𣧖夭死|䰏說文曰束髮少小也|𠯙鳴𠯙𠯙
VgT山列榝茱萸山列切又音殺一
hgb於列焆煙氣於列切二|𠱝怒𠱝
KgT丑列屮草初生皃丑列切七|撤抽撤|硩擿也周禮有硩蔟氏|徹通也|䚢䚢𧢷|聅司馬法曰小罪聅聅謂以箭貫耳|䒆船行
igb許列娎喜皃許列切二|焎火氣
Zgj殊雪啜說文曰甞也爾雅曰茹也禮曰啜菽飲水殊雪切一
Tgj廁別㔍割斷聲廁別切一
Rgj寺絕㿱枯也寺絕切二|𧋍江𧋍似蝤蛑生海中
YgT昌列掣挽也昌列切又昌制切二|瘛瘛癡小兒病又昌制切
lgT羊列抴亦作拽拕也羊列切又余世切一
UgT士列𨵊城門中板也士列切一
#藥
lpT以灼藥說文云治病艸禮云醫不三世不服其藥又姓後漢有南陽太守河內藥崧以灼切三十一|躍跳躍也上也進也|礿祭名|禴上同（祭名）|蘥燕麥|鑰關鑰|𩱲內肉及菜湯中薄出之|瀹上同又漬也（內肉及菜湯中薄出之）|𤅢上同亦水名在沘陽亦作𤄶（上同又漬也）|𤄶水名|爚煜燿光明|櫟櫟陽縣名在京兆又音歷|龠量器名|䋤白䋤縞也|𠩃岸上見也說文作屵|敫光景流皃|籥樂器郭璞云如笛三孔而短小廣雅云七孔|𢅹幕𢅹屋也出新字林|𥌺矐𥌺視皃|𧕋𧐔𧕋螢火別名|纅絲色|鸙鷚鸙鳥|㜰㜰媄之皃|𤒀仰也|䟑趠䟑行皃|㿑淫㿑病也|𨷲門𨷲|𧢢視不定也|䠯登也履也|𨈋出走也|䖃䖃䖃風吹水皃
IpT離灼略簡略謀略又求也法也要也又姓何氏姓苑云零陵人離灼切九|䌎紩也|擽字統云擊也|掠抄掠劫人財物|㗉爾雅云利也又人名晉有褚㗉|䂮上同（爾雅云利也又人名晉有褚㗉）|𧎾渠𧎾蜉蝣蟲朝生暮死亦作𧐯|䀩說文曰眄也方言云視也|䛚約䛚歎美也
dpf居勺腳釋名曰腳卻也以其坐時卻在後也居勺切五|脚俗（釋名曰腳卻也以其坐時卻在後也居勺切五）|蹻走蹻蹻皃|卻節也又去約切|屩草履也
XpT之若灼燒也炙也熱也之若切十六|斫刀斫又漢複姓有斫胥氏何氏姓苑云今平陽人|彴橫木渡水|㣿痛也|勺挹取也又周公樂名又音杓|酌酌酒又益也挹也行也取也霑也|繳矰繳說文作𦅾生絲縷也|焯火氣|䅵五穀皮又音梏|妁媒妁說文曰酌也斟酌二姓也又音杓|謶欺也|𥯩䉛𥯩玉篇云𥂖米具|犳獸名|䶂鼠屬|𧘑玉篇云褌衣|禚齊地名
apT書藥爍灼爍書藥切七|鑠銷鑠|獡犬驚|㜰美好也|爚儵爚光皃又音藥|䁻美目|䟏動也又音櫟
cpT而灼若如也順也汝也辝也又杜若香草亦姓魯人也又虜三字姓後魏書若口引氏後改爲寇氏而灼切十一|弱劣弱|鄀地名在襄陽|箬竹箬|蒻荷莖入泥之處又菜名|楉楉榴安石榴也|溺水名出龍道山其水不勝鴻毛又奴歷切|䐞脃腝說文曰肉表革裏也|惹䛳惹|叒榑桑叒木|𨀝足下文
YpT昌約綽寬也昌約切四|繛古文（寬也昌約切四）|婥婥約美皃|磭大脣屵磭皃屵魚偃切
hpf於略約約束又儉也少也又姓韓子有古賢者約續於略切又於笑切二|葯白芷葉
epf去約卻退也去約切四|却俗（退也去約切四）|𨟠地名在河東|𤷽𤷽食瘡疾
gpf魚約虐酷虐說文作𧆩殘也魚約切三|磭大脣皃又音綽|瘧病也
ZpT市若妁媒妁市若切又音酌六|勺周禮梓人爲飲器勺一升又漢複姓殷人六族有長勺尾勺二氏又音酌|汋瀱汋又士角切|杓杯杓|仢仢約流星|芍芍藥蕭該云芍藥香草可和食芍張略切藥良約切又芍陂在淮南七削切又蓮芍縣名在馮翊之若切又𦽏茈草名胡了切
KpT丑略㲋說文曰獸也似兔青色而大象形頭與兔同足與鹿同丑略切六|𤟭上同（說文曰獸也似兔青色而大象形頭與兔同足與鹿同丑略切六）|婼叔孫婼魯大夫說文曰不順也|逴略逴行皃|辵說文云乍行乍止从彳止聲|蠚蟲行毒亦作𧍷又火各切
QpT息約削刻削息約切一
SpT側略斮斬也側略切一
NpT即略爵封也禮含文嘉曰殷爵三等周爵五等白虎通曰三等法三光五等法五行也淮南子曰爵祿者人臣之銜轡也文字音義曰爵量也量其職盡其才也又禮器周禮曰享先王以玉爵即略切七|𩰥古文（封也禮含文嘉曰殷爵三等周爵五等白虎通曰三等法三光五等法五行也淮南子曰爵祿者人臣之銜轡也文字音義曰爵量也量其職盡其才也又禮器周禮曰享先王以玉爵即略切七）|雀鳥雀禮記云雀入大水爲蛤|爝炬火莊子云日月出矣而爝火不息又音嚼|燋火未然也|㩱捎也|䶂鼠似兔而小也
PpT在爵皭靖也埤蒼曰白色也在爵切三|嚼噬嚼|爝炬火
OpT七雀鵲淮南子云鵲知太歲之所字林作䧿七雀切十|舄人姓纂文云古鵲字|趞行皃|㹱宋國良大|碏敬也又人名衛大夫石碏|芍陂名在壽春|皵皮皴爾雅云棤皵謂木皮甲錯|踖陵也馺也|䇎驚也|䱜魚名出東海
fpf其虐噱嗢噱笑不止其虐切九|蹻舉足高又居勺切|𠊬須臾亦倦也|𧍕天神蟲又丘良切|𧮫說文曰口上阿也一曰笑皃|𠶸（說文曰口上阿也一曰笑皃）|臄說文並同上（說文曰口上阿也一曰笑皃）|醵合錢飲酒|䐘䐘䐘大笑也
hpv憂縛嬳作姿態也憂縛切四|𡤬上同（作姿態也憂縛切四）|彠度也又乙虢切|臒大也善也
CpP符钁縛繫也符钁切一
ipv許縛䂄大視皃許縛切四|矆上同（大視皃許縛切四）|彏弓弦急皃又居縛切|戄驚戄又曰遽視
kpv王縛籰說文曰收絲者也亦作籆王縛切五|𧤽上同（說文曰收絲者也亦作籆王縛切五）|𧅚𧅚子菜|𥸘筌取魚器也|䢲行不住䢲䢲天下
dpv居縛玃大猨也說文曰大母猴也居縛切十一|貜上同說文曰𣫔貜也（大猨也說文曰大母猴也居縛切十一）|𧾵大步|钁說文曰大鉏也方言云關東名曰鹵斫也|攫膊也|矍說文云隹欲逸走也从又持之矍矍也一曰視遽皃|𡚠健皃|彏弓弦急皃|躩盤辟皃|𪈴三首三足鳥|𨏹車輞
JpT張略芍芍藥香草張略切七|著服衣於身又直略張豫二切|𥗁說文云斫也|櫡說文曰斫謂之櫡|鐯钁也|𣃈上同（钁也）|擆置也擊也
LpT直略著附也直略切一
epv丘縛躩說文云足躩如也丘縛切二|𢖦往也
fpv具籰戄大視具籰切五|𧾵大步又居縛切|𡚠健皃又居縛切|䣤鄉名|貜大猨又居縛切
MpT女略逽走逽女略切三|𨵫𨳞𨵫牽引也|蹃踐也
BpP孚縛𩅿美雨孚縛切一
ipf虛約謔戲謔虛約切一
#鐸
GqT徒落鐸大鈴也軍法用之又木鐸金鈴木舌釋名鐸度也號令之限度也又姓左傳晉大夫鐸遏寇徒落切十五|剫治木也說文判也爾雅曰木謂之剫|度度量也又音渡|𢜬忖𢜬|踱跣足蹋地|凙楚詞云冬冰之𠗂凙|襗褻衣|𩑒𩑒顱|𧩧欺也|𩍜𩌈𩍜胡履也|䐾𦘴䐾無檢限也|㤞徵也亦作𢖲|喥口喥喥無度|仛他也|𨍏𨍏輅
DqD慕各莫無也定也說文本模故切日且冥也从日在茻中茻音莽又州名開元十三年改鄚州去邑亦姓楚莫敖之後又虜複姓五氏西秦錄有左衛將軍莫者羖羝南涼州刺史莫侯悌眷後魏末有亂寇莫折念生又有莫輿氏莫盧氏又虜三字姓周太祖賜廣寧楊纂姓莫胡盧氏慕各切十六|幕帷幕又姓|鄚縣名在河閒又姓|膜肉膜|鏌鏌鋣劒名|摸摸𢱢又莫胡切|漠沙漠又施也茂也|瘼病也|寞寂寞說文作𠴫嗼|瞙字統云目不明|嗼鼽嚏|塻舍塻亦塵塻|𣩎死也說文作㱳云死𡧯㱳也|𢊗定也|𡈗見文|𠢓𠢓動
IqT盧各落零落草曰零木曰落又始也聚落也左傳注云宮室始成祭之爲落亦姓出姓苑又漢複姓二氏漢有博士落姑仲異益部耆舊傳有閬中落下閎善歷也盧各切三十四|絡絡絲又姓|烙燒烙|洛水名書曰導洛自熊耳漢書作雒|珞瓔珞也|酪乳酪|樂喜樂又五角五教二切|𩂣說文云雨𩂣也|轢陵轢又音歷|笿籠笿|硌磊硌|駱白馬黑鬣曰駱又姓出東陽吳有駱統|𤽼大白|𩊚生革|㓢去皮節又剔也|鉻說文𩮜也|馲馲駝又音託|𩧐上同（馲駝又音託）|鮥魚名又五格切|䶅鼠名又下各切|雒字林鵋䳢鳥又姓駱絡雒並出姓苑|𣛗㰚𣛗出音譜|𧭥𧭥謊狂言|躒晉大夫名輔躒本又音歷|鵅烏𪇰永鳥|𤻲治病又音料|𣧳殂也|𤽥大皃|挌打也|𪇱似鵰黑文赤頭|濼水名在濟南又音祿|袼䙔袼|䀩大目|𨏒𥕖𨏒車聲
FqT他各託寄也他各切十八|袥開衣領也|橐無底囊|魠魚名|籜竹籜|柝擊柝漢書曰宮中衛城門擊刀斗傳五更衛士周廬擊柝也亦作𣔳|𣟄上同（擊柝漢書曰宮中衛城門擊刀斗傳五更衛士周廬擊柝也亦作𣔳）|拓手承物又虜複姓二氏周書王秉王興並賜姓拓王氏又有拓跋氏初黃帝子昌意少子受封北土黃帝以土德王北俗謂土爲拓謂后爲跋故以拓跋爲氏跋亦作拔或說自云拓天而生拔地而長遂以氏焉後魏孝文太和二十年改爲元氏也|馲馲駝|𩧐上同（馲駝）|跅跅弛不遵禮度之士|蘀葉落|𦚈𦚈脪也滴也澆也|侂毀也說文寄也|飥餺飥|魄落魄貧無家業出史記本音拍|沰赭也又磓也|矺儀禮注云王棘矺鼠
NqT則落作爲也起也行也役也始也生也又姓漢有涿郡太守作顯則落切又則邏臧路二切六|迮起也又仄格切|柞木名又音昨|糳精細米也說文曰糲米一斛舂九斗曰糳|鑿詩曰白石鑿鑿|㘀強㘀又祖郭切
OqT倉各錯鑢別名又雜也摩也詩傳云東西爲交邪行爲錯說文云金涂也倉各切七|厝礪石|䱜魚名|逪說文云䢒逪也|剒爾雅云犀謂之剒|縒縒綜亂也|莡草聲
dqT古落各說文云異詞也古落切五|閣樓閣亦舉閣漢宮殿疏曰天祿閣騏驎閣蕭何造以藏祕書賢才也又姓急就章有閣并訴|格樹枝|胳胳腋|袼袼䘸也又袂也
eqT苦各恪敬也又姓晉有中郎令恪啓苦各切三|㤩（敬也又姓晉有中郎令恪啓苦各切三）|愙並上同（敬也又姓晉有中郎令恪啓苦各切三）
gqT五各咢徒擊皷謂之咢詩云或歌或咢說文作㖾譁訟也五各切二十五|愕驚也|鄂國名在武昌又姓漢安平侯鄂君|諤謇諤直言|𠟎說文曰刀劒刃也|𧊜說文曰似蜥蜴長一丈水潛吞人即浮出日南|𧍞上同（說文曰似蜥蜴長一丈水潛吞人即浮出日南）|遌心不欲見而見曰遌|萼花萼|鍔劒端|𡅡籀文（劒端）|崿崖崿|鶚鳥名|鰐魚名|噩爾雅曰太歲在酉曰作噩亦作咢|㗁口中斷㗁出字統|齶上同（口中斷㗁出字統）|顎嚴敬曰顎|𡾙山峯|鑩以鐵作鉤物也|偔多也|堮圻堮|𡓐上同（圻堮）|㮙穽也|湂水名
BqD匹各𩔈面大皃匹各切十五|奤俗（面大皃匹各切十五）|濼陂濼|䨰上同（陂濼）|粕糟粕|膊說文曰薄脯膊之屋上|𦢸割肉|䪙車覆軶|搏擊也|胉脅也|蒪蒪苴大蘘荷名|𥴮𥴮齒相簺也|𦿍蘀𦿍也|𦥭舂也|𦐦飛去也又步各切
hqT烏各惡不善也說文曰過也烏各切又烏故切四|𢙣俗（不善也說文曰過也烏各切又烏故切四）|堊白土|蝁蛇名
CqD傍各泊止也傍各切十一|亳國名春秋時陳地漢爲沛之譙縣魏爲譙郡晉爲南兗州齊爲亳州|箔簾箔|薄厚薄說文曰林薄也又姓漢文帝母薄氏|礴盤礴|簿蠶具|𩍿𩍿䩣屧也|鑮似鍾而大|踄蹈也|𩽛魚似鯉一目也|䭦䭦餅亦作𪎄
iqT呵各𦞦羹𦞦呵各切又火酷切十一|鄗縣名漢光武改爲高邑|壑溝也谷也坑也虛也|㕡上同（溝也谷也坑也虛也）|蠚螫也亦作𧍷|謞讒慝|郝姓也殷帝乙時有子期封太原郝鄉後因氏焉|鰝爾雅云大鰕也出海中似蝗長二三尺青州有之|熇熱皃又火沃切|嗃嚴厲皃易云家人嗃嗃|矐重目又失明也
QqT蘇各索盡也散也又繩索亦姓出燉煌蘇各切又所戟切六|𢱢摸𢱢|溹水名在榮陽又所戟切|𩌈𩌈𩍜|𦵫草名|㮦白㮦木名
jqT下各涸水竭也下各切十一|鶴似鵠長喙左傳曰衛懿公好鶴有乘軒者|貈說文曰似狐善睡獸也穆天子傳曰天子獵於滲澤得玄貈以祭河宗周禮曰貉踰汶則死此地氣然也|貉（說文曰似狐善睡獸也穆天子傳曰天子獵於滲澤得玄貈以祭河宗周禮曰貉踰汶則死此地氣然也）|狢並上同（說文曰似狐善睡獸也穆天子傳曰天子獵於滲澤得玄貈以祭河宗周禮曰貉踰汶則死此地氣然也）|𠗂𠗂凙冰皃|佫人姓出纂文|䮤說文曰苑名一曰馬白頟|𥉑望也|䅂似黍而小|䶅鼠出胡地
PqT在各昨昨日隔一宵又羌複姓有昨和氏在各切二十|酢酬酢蒼頡篇云主荅客曰酬客報主人曰酢|莋縣名在越嶲|怍慙怍|𣫞穿𣫞|鑿鏨也古史考曰孟莊子作|笮竹索西南夷尋之以渡水|筰上同（竹索西南夷尋之以渡水）|柞木名又音作|㸲山牛|岝岝崿山高|䣢地名在蜀亦姓出蒼頡篇|飵楚人相謁食麥饘曰飵|𦁎草繩|𢂃𢂃㡗|䋏緪也|秨禾稼動搖|砟石上又人名|葃茹草又士革切|鈼鉹也吳人云也
AqD補各博廣也大也通也從十尃亦州名春秋時齊之聊攝也秦爲東郡地隋爲博州因博平縣以名焉又姓古有博勞善相馬也補各切二十|髆胷髆|搏手擊|爆迫於火也|鎛鐘磬上橫木也又田器也詩曰庤乃錢鎛|㗘㗘㗱噍皃㗱姊入切|𪙍上同（㗘㗱噍皃㗱姊入切）|襮衣領|鑮大鍾|簙六簙棊類出說文世本曰烏曹作簙書本多單作博|䗚䗚蟭螗蜋卵也|猼犬名|䍸䍸䍫獸名似羊九尾四耳其目在背出山海經䍫徒何切|欂欂櫨枅也|𩌏車下索也|溥水名|䶈䶈鼠|餺餺飥|䙏短袂衫|𥴮蠶具名吳人用
HqT奴各諾說文譍也奴各切一
iqj虛郭霍揮霍爾雅曰霍山爲南嶽又姓武王弟霍叔之後虛郭切十二|靃地名說文曰飛聲也雨而雙飛者其聲靃然|霩雲消皃|䁨驚視|藿豆葉又香草|矐目開|彉張也說文曰弩滿也又郭廓二音|彍上同（張也說文曰弩滿也又郭廓二音）|攉攉盤手戲|瀖瀖泋眾波聲|劐裂也|癨吐病
dqj古博郭城郭也釋名曰郭廓也廓落在城外也世本曰鯀作郭亦姓出太原河南潁川東郡馮翊五望本自王季之後又云氏於居者城郭園池是也案說文作𩫏爲居𩫏作𨟍爲𨟍氏也古博切十|𩫏（城郭也釋名曰郭廓也廓落在城外也世本曰鯀作郭亦姓出太原河南潁川東郡馮翊五望本自王季之後又云氏於居者城郭園池是也案說文作𩫏爲居𩫏作𨟍爲𨟍氏也古博切十）|𨟍並見上注（城郭也釋名曰郭廓也廓落在城外也世本曰鯀作郭亦姓出太原河南潁川東郡馮翊五望本自王季之後又云氏於居者城郭園池是也案說文作𩫏爲居𩫏作𨟍爲𨟍氏也古博切十）|崞縣名在代州又山名|椁禮曰殷人棺椁又木名|槨上同（禮曰殷人棺椁又木名）|彉弓張說文曰弩滿也|彍上同（弓張說文曰弩滿也）|埻埻端國名又音蟈|𦘅耳𦘅
hqj烏郭雘丹也烏郭切六|蠖蚇蠖屈伸蟲名|𩟓味薄|臒羹肉玉篇云善肉|鸌水鳥|嬳恐嬳
jqj胡郭穫刈也胡郭切十|鑊鼎鑊|㦜心動也|檴檴落木名|𤐰𤐰熱|濩說文曰雨流霤下皃|擭柞擭阱淺則施之|䨥𩂹䨥大雨|𤻙㾰𤻙|𢋒廓𢋒空遠
eqj苦郭廓空也大也虛也亦州名漢西羌地前涼湟河郡周爲廓州也苦郭切六|鞹皮去毛|漷水名在魯又許虢切|𠠎解也裂也|籗爾雅注云捕魚籠亦作篧又仕角切|噋敲噋噋聲也亦作㗥
gqj五郭瓁朴瓁五郭切一
Iqj盧穫硦𥕖硦石聲盧穫切𥕖音廓一
Nqj祖郭㘀鳴㘀㘀亦作嗽祖郭切一
#陌
DrD莫白陌阡陌南北爲阡東西爲陌莫白切十八|帞頭巾|袹袹複|𡠜靜也|𡖶上同（靜也）|貘食鐵獸似熊黃黑色一曰白豹|蛨虴蛨蟲|貊蠻貊|佰一百爲一佰也|驀騎驀|㹮𤜤㹮驢父牛母亦作馲𩢷|𩢷上同（𤜤㹮驢父牛母亦作馲𩢷）|嗼詩云盈盈一水閒嗼嗼不得語|貉北方獸|洦水淺皃|𢫦擊也|𧻙𧻙越|銆銆刀軍器
JrT陟格磔張也開也爾雅曰祭風曰磔陟格切十一|虴虴蛨|舴舴艋小船|𤜤𤜤㹮|𪄱戇鳥鷄屬|馲馲𩢷|𩑒𩑒顱腦蓋|𪐏黏皃|嫡孎嫡|𥧮窟也|杔杔櫨壓酒器也
CrD傍陌白西方色又告也語也亦姓秦帥有白乙丙傍陌切五|帛幣帛尚書大傳曰舜修五禮五玉三帛又姓出吳神仙傳有帛和|舶海中大船|鮊魚名|𦰬草爾雅曰帛似帛俗從艹
ArD博陌伯長也又侯伯周書曰率眾時作謂之伯亦姓左傳晉有大夫伯宗又漢複姓二氏韓子有伯夫氏墨家流莊子有伯成子高博陌切八|迫逼也近也急也附也|敀上同（逼也近也急也附也）|百數名又姓秦有大夫百里奚|柏木名五經通義曰諸侯墓樹柏又姓晉趙王倫母曰柏夫人亦作栢|湐洦湐淺水|𦯉藍之別名|㼟㼿㼟井甃
fsb奇逆劇增也一曰艱也又姓史記燕有劇辛奇逆切六|屐履屐|𨍺車𨍺|谻倦谻|𢜭勞也|㘌戲㘌
dsb几劇戟刃戟說文作𢧢有枝兵也釋名曰戟格也傍有枝格也典略曰昔周有雍狐之戟屈盧之矛孤父之戈几劇切八|撠持也|𦻝大𦻝藥名|𤜾𤜾獸|谻相踦|丮持也|𢜭勞也又其戟切|𩯋髭𩯋
VsT山戟𡩡求也山戟切又蘇各切六|索上同（求也山戟切又蘇各切六）|䞽僵仆|溹水名又雨下皃|䂹碎石隕聲|𥻨煑米多水
TsT測戟柵村柵說文曰豎編木測戟切三|䜺磨豆|簎刺也國語曰簎魚鼈也
jrj胡伯嚄嚄嘖大喚胡伯切二|𡄴𡄴𡄴誇皃
SrT側伯嘖側伯切八|迮迫迮|窄狹窄|笮矢箙又屋上版又迫也又姓吳有笮融亦作筵|㳻遮水|諎大聲亦作唶|舴舴艋|蚱蚱蟬
UrT鋤陌齚齧也鋤陌切五|齰上同（齧也鋤陌切五）|咋㕭咋多聲㕭烏交切|泎瀺泎水落地聲|岝岝㟯山皃
esb綺戟隙壁孔也怨也閑也綺戟切七|郤姓出濟陰河南二望左傳晉有大夫郤獻子俗從𠫤|綌絺綌|𠊬廣雅云勞也極也疲也又大笑|𧯈嫌恨|𡭴西方小皃|𠶸大笑
grT五陌額釋名曰額鄂也有垠鄂也說文作頟顙也五陌切六|頟上同（釋名曰額鄂也有垠鄂也說文作頟顙也五陌切六）|䱮𩹺䱮魚名|峉岝峉或作㟯|詻鄭玄云詻詻教令嚴|䩹補履
gsb宜戟逆迎也卻也亂也范曄漢書周防字偉公少孤微常修逆旅以俟過客而不待其報宜戟切六|屰說文曰不順也|縌後漢書云古佩璲也|㘙說文云呻也|𥿬紱維|𠱘嘔𠱘
erT苦格客賓客苦格切四|喀吐聲|礊堅也|揢手把著也
hrT烏格啞笑聲烏格切二|𩚬飢
isb許郤虩懼也許郤切一
KrT丑格坼裂也亦作𡍩餘倣此丑格切六|䞣半步|𩑒腦蓋|㿭皴㿭|𤖴𤖴開|𩎚䪝𩎚
hrj乙白䪝佩刀飾乙白切一
BrD普伯拍打也普伯切十|魄魂魄|怕澹怕靜也|皛亦打出蜀都賦又胡了切又莫百切|敀大打也|𠓗疾也又音赴|珀琥珀|𧻙風入水皃|𤖼𤖼破物也|洦淺水
irT呼格赫赤也發也明也亦盛皃又虜複姓有赫連氏其先匈奴右賢王去卑之後劉元海之族也勃勃以後魏天賜四年稱王於朔方國号夏都以子從母之姓非禮也乃云王者繼天爲子是爲徽赫實與天連因改姓曰赫連氏呼格切五|爀火色|嚇怒也|𢅰㦦㡗赤紙|𥋿目赤
jrT胡格垎土乾也胡格切四|䞦䞦䞽倒地|楁鞍楁|𨍇輓車當胷橫木
drT古伯格式也度也量也書傳云來也爾雅云至也亦格五博屬行箭但行梟以格殺漢吾丘壽王善之又姓東觀漢記有侍御史東平相格班古伯切十四|𢓜至也亦作假|茖山蔥|骼骨骼|觡鹿角|𩹺𩹺䱮魚名|鵅鵋䳢鳥名|挌擊也鬬也止也正也|㦴擊也鬬也亦作㪾|蛒蠀螬別名|𪌣碎麥|𢼛擊也|𩹿海魚似鯾肥美|鉻陳公鉤也
irj虎伯謋謋然虎伯切八|諕上同（謋然虎伯切八）|漷水名在東海又音廓|砉又呼狊切出莊子|𦒧𦑍𦒧飛疾也|湱漰湱波激水也|硅硅破|𢝇心驚
LrT場伯宅居也說文云宅託也人所投託也釋名曰宅擇也擇吉處而營之也場伯切十三|㡯古文（居也說文云宅託也人所投託也釋名曰宅擇也擇吉處而營之也場伯切十三）|擇選擇|澤潤澤又恩也亦陂澤釋名曰下有水曰澤又州名秦爲上黨郡後魏爲建興郡周爲澤州取濩澤以名之亦姓出姓苑|𪀥𪀥𪁔鳥名毛備五色|翟陽翟縣名亦姓唐有陝州刺史翟璋又音狄|䕪䕪蕮藥草車前別名|檡檡棘善理堅刃者可以爲射決出儀禮|鸅鸅鸆即護田也|𩏪𩏪䪝刀飾|蠌螖蠌|襗袗襗|𤂥土得水也
drj古伯虢國名周封虢仲於西虢秦屬三川郡義寧元年爲鳳林郡武德初爲鼎州又爲虢州亦姓左傳晉大夫虢射也古伯切五|𢼛手打之類|㶁水裂|𧭣𧭣𧭣多言皃|唬鳥啼
hrj一虢擭手取也一曰布擭也一虢切五|濩濩澤縣在澤州又音護|彠規蒦博雅曰度也|䪝刀飾把中皮也|㠛陂名又村名在吳王舊城側也
MrT女白蹃踐也女白切二|搦捉搦又正也
erj丘擭𧍕天神蟲丘擭切二|𠠎解木
CsL弼戟欂欂櫨戶上木弼戟切二|𣝍說文曰壁柱也
#麥
DtD莫獲麥白虎通曰麥金也金王而生火王而死又姓隋有將軍麥鐵杖嶺南人俗作麦莫獲切八|𧖴說文曰血理之分衺行體者又作脈經典亦作脉周禮曰以鹹養脉釋名曰脉幕也幕絡一體也|脉上同（說文曰血理之分衺行體者又作脈經典亦作脉周禮曰以鹹養脉釋名曰脉幕也幕絡一體也）|衇籀文|霢霢霂亦作霢|眽說文曰目邪視也|覛爾雅云相也說文本莫狄切衺視也|𧡒籀文（爾雅云相也說文本莫狄切衺視也）
jtj胡麥獲得也又臧獲方言云荊淮海岱淮濟之閒罵奴曰臧罵婢曰獲亦姓宋大夫尹獲之後胡麥切八|畫計策也分也又胡卦切|嫿分明好皃|劃錐刀刻|鱯魚名|彠度也又烏虢切|㗲㗲嘖叫也|咟上同（㗲嘖叫也）
dtj古獲蟈螻蟈蛙別名古獲切十六|馘截耳又獲也或作聝|聝上同（截耳又獲也或作聝）|幗婦人喪冠|膕曲腳中也|𩪐上同（曲腳中也）|埻埻端國名出山海經|摑打也亦作𢼛|漍水|𢹖挻𢹖|䂸䂸破|慖悖也|嘓口嘓嘓煩也|䬎䬎䬉赤氣熱風之怪|讗讗嚄疾言|𧖻犬血
AtD博厄檗黃檗俗作蘗博戹切五|擘分擘|薜爾雅云山芹當歸也又曰山麻也|𤖟豆中小硬者出新字林|糪飯半生皃
CtD蒲革䌟織絲爲帶蒲革切四|繴罿也|𦌠翻車|欂檴櫨又木名也
UtT士革賾探賾士革切七|鰿爾雅曰貝小者鰿郭璞云今細貝亦有紫色者出日南又音迹|葃茹菜又音藉|㣱容尋常人|矠以矛叉取物也|耫灰中種也|嘖㗲嘖叫也
StT側革責求也側革切十一|𩔳𩔳䫢頭不正皃|簀牀簀|幘冠幘漢書曰幘古卑賤執事不冠者之所服說文曰髮有巾曰幘|嘖大呼聲|謮謮怒說文同上（大呼聲）|債負財|𧐐小貝也|𦟜𦟜子魚子脯出新字林|嫧鮮好|咋大聲
Utj查獲䞰急走也出字林查獲切二|䟄䟄黠皃出方言
TtT楚革策謀也籌也釋名曰策書教令於上所以驅策諸下也又馬箠也楚革切十四|冊簡冊說文曰符命也諸侯進受於王也象其札一長一短中有二編之形|笧古文（簡冊說文曰符命也諸侯進受於王也象其札一長一短中有二編之形）|嫧健急皃|䶦齒相值也|筴卜筮筴也|𣌧告也|矠矛也|憡憡痛|皟淨也|㥽耿介|𧶷正也|拺扶拺也|柵豎木立柵又村柵
etT楷革礊鞕皃楷革切六|𩱘說文曰裘裏也|䙐上同（說文曰裘裏也）|緙矣也又織緯|罊器空|諽謹也
itj呼麥剨破聲呼麥切二十一|繣徽繣乖違|𦑌飛聲|㦎不慧又㦎㦎辯快出音譜|劃劃作事又音畫|捇捇掘土又裂也|掝裂也|㖪大笑皃|礊鞕聲又口革切|䐸曲腳中也|焃赤也|㩇擘也又于馘切|𢄶裂帛聲|𨐶辛𨐶𨐶|𥊮目病|湱漍湱水出西豁|𤷇痛𤷇|䦝䦝門聲|𤁹水皃|䬉熱䬉|𠜻刀破
jtT下革覈實也下革切九|繳衣繳衣領中骨又音酌|䃒石地|翮鳥羽|㮝木名|核果中核崔豹古今注云烏孫國有青田核莫測其樹實之形至中國者但得其核耳大如六升瓠空之以盛水俄而成酒味甚醇厚|𤈧燒麥|滆湖名在常州義興縣|蒚蒲臺頭名
dtT古核隔塞也古核切十六|膈胷膈|搹㧖也出儀禮|鬲縣名在太平原又鬲津九河名又姓殷末賢人膠鬲之後又音歷鼎屬也|槅車槅|革改也獸皮也兵革也亦姓漢功臣表有煑棗侯革朱|𥴩𥴩子竹障出通俗文|𢡍智也|諽謹也|䪂轡首|𧈑虎聲|䨣雨也|𥉅瞔𥉅|𦑜翅也|𩹺魚也|嗝雉鳴
JtT陟革摘手取也陟革切又他歷切九|謫責也又丈戹切|讁上同（責也又丈戹切）|𤟍犬怒張耳|棏蠶棏或作𣚅|𡇠硬皃|䊞黏䊞|厇張厇|矺磓也
htT於革戹災也說文隘也於革切十四|厄上同（災也說文隘也於革切十四）|搤持也握也捉也|㧖上同（持也握也捉也）|軶車軶|阸限也礙也又危也迫也塞也|豟爾雅曰豕絕有力又云彘大五尺爲豟|呝呝喔鳥聲|𪕶鼠屬|貖上同（鼠屬）|蚅蚅鳥蠋大如指似蠶|𩚬飢皃|啞笑聲|𧠞𧠞視
VtT山責栜木名山責切十四|𣽤小雨|㾊瘮㾊寒皃|䨛霰|摵殞落皃|愬驚懼皃又音素|擌黐擌捕鳥|拺拺擇取物也|𡩡求也取也好也|索上同（求也取也好也）|溹溹溹雨下皃|𩊯堅硬|虩虎驚皃又許逆切|㳻說文曰所以𢹬水也
BtD普麥𢶉射中聲也普麥切二|糪飯半生熟爾雅云米者謂之糪
gtT五革虉爾雅云虉綬虉小草雜色似綬五革切又五狄切四|鳽鵁鶄又音堅|䩹履頭|㣂㣂束弓補也
ItT力摘礐礐硞水石聲也力摘切二|𥖪𥖪礋打草田器出字林
jtj于馘㩇裂聲也簪摑切一
Vtj砂獲𢷾拂著又捎𢷾也出通俗文砂獲切一
fsr求獲𧾛𧾛䞽足長皃求獲切一
MtT尼戹疒疾也尼戹切又仕莊切三|䭆䭆炙餅餌名|眲耳目不相信出列子
#昔
QuT思積昔往也始也左傳爲一昔之期明日也說文作㫺乾肉也又姓漢有烏傷令昔登思積切十四|𦠡籀文（往也始也左傳爲一昔之期明日也說文作㫺乾肉也又姓漢有烏傷令昔登思積切十四）|腊乾肉見經典|惜悋惜說文痛也|潟鹹土|磶柱下石|舄履也崔豹古今注云以木置履下乾腊不畏泥濕故曰舄也|𩍆上同（履也崔豹古今注云以木置履下乾腊不畏泥濕故曰舄也）|蕮車前草|鬄說文髮也|䯜骻骨間也|𩾼水鳥|焟火乾|棤皮甲錯也
NuT資昔積聚也資昔切又資賜切十八|脊背脊釋名曰脊積也積續骨節終上下也說文作𦟝背呂也|蹐蹐地小步|借假借也又資夜切|迹足迹|跡上同（足迹）|𨒪籀文（足迹）|踖踧踖敬皃又春昔切|𪃹𪃹鴒一名雝𪆂又名錢母大於燕頸下有錢文亦作䳭|鰿爾雅曰貝小者鰿郭璞云今細貝亦有紫色者出日南|𧐐上同（爾雅曰貝小者鰿郭璞云今細貝亦有紫色者出日南）|𩺀魚名|鯽上同（魚名）|蹟詩傳云不蹟不循道也|㵶小水|襀襞也|䃊䃊𥒰|庴縣在臨邛
huX伊昔益增也進也伊昔切八|謚笑皃|嗌喉上漢宣帝崩昌邑王至京師不哭云嗌痛|𨜶地名|齸爾雅曰麋鹿曰齸牛曰齝並吞芻而反出嚼之也|膉肥也|𦶩益母草爾雅注只作益|𪕶鼠名
luT羊益繹理也陳也長也大也終也充也說文云抽絲也羊益切三十三|睪引繒皃說文曰司視也从目从㚔令吏將目捕辠人也|亦摠也俗作𡖋|弈弈美皃又博弈|奕大也又輕麗皃又行也盛也|帟小幕曰帟|譯傳言周禮有象胥傳四夷之言東方曰寄南方曰象西方曰狄鞮北方曰譯|懌悅也樂也改也|斁猒也|驛驛馬|嶧山名在魯|醳苦酒|腋肘腋|掖持臂又縣名又掖庭也一曰正門之旁小門也亦姓|䘸䘸縫|易變易又始也改也奪也轉也亦水名出涿郡安閻山見水經亦州名漢書趙分晉得中山秦爲上谷郡漢置涿郡隋爲易州因水名之又姓齊大夫易牙又盈義切|液律液又姓急就章有液客調|痬病相染也|蜴蜥蜴|埸壃埸|圛說文云回行也商書曰圛圛者升雲半有半無|襗衣襦|射無射九月律|墿道也|焲火光|𥜃重祭名殷曰肜周曰𥜃亦作繹|㴒浟㴒水皃|燡火甚之皃|𦔥耕也又音釋|𡱿交𡱿|㘁㘁川|𤑹災也出字林|𠓋光皃
auT施隻釋捨也解也散也消也廢也服也又姓施隻切十六|𥼶說文曰漬米也|檡梬棗|適樂也善也悟也往也又姓|奭盛也又驚視皃又邵公名說文作奭|郝人姓又呼各切|睗睒睗急視|晹日無光|𡣪嫁也|𦔥耕皃|螫蟲行毒亦作螫|𩮜鬀髮又音逖|㚒盜竊懷物也從兩入弘農陝字從此|冟𩚳堅柔相著|䁺視皃|襫襏襫雨衣
YuT昌石尺家語曰布手知尺舒肱知尋說苑曰度量衡以粟生之十粟爲一分十分爲一寸十寸爲一尺昌石切十一|赤南方色又姓出姓苑又漢複姓二氏莊子有赤張滿稽郭象注云赤張姓也韓子曰智伯以鍾遺仇繇赤章枝諫仇繇令不受|烾古文（南方色又姓出姓苑又漢複姓二氏莊子有赤張滿稽郭象注云赤張姓也韓子曰智伯以鍾遺仇繇赤章枝諫仇繇令不受）|蚇蚇蠖蟲名易亦作尺|㡿逐也遠也又㡿候說文曰卻屋也从广屰屰音逆|斥上同（逐也遠也又㡿候說文曰卻屋也从广屰屰音逆）|㚖白澤|郝鄉名|滷鹵滷|𠧚姓也|𠧵獸也
ZuT常隻石釋名曰山體爲石亦州名秦伐趙取離石周因邑以名州又姓左傳有衛大夫石碏又漢複姓二氏孔子弟子有石作蜀何氏姓苑有石牛氏常隻切七|碩大也|祏說文云宗廟主一曰大夫以石爲主|鉐鍮鉐|䄷說文云百二十斤也|鼫鼫鼠螻蛄|䲽鳥名
XuT之石隻一也說文曰鳥一枚也从又持隹持一隹曰隻二隻曰雙之石切十三|適往也又施隻切又都歷切|炙說文曰炮肉也从肉在火上|墌基址|摭拾也|拓上同（拾也）|蹠足履踐也楚人謂跳躍曰蹠|跖上同說文曰足下也（足履踐也楚人謂跳躍曰蹠）|䗪𧑓蝜蟲亦作蟅又音柘|䨥𩂹䨥大雨|䞠行也|𠪮仄也|䘸袖也
LuT直炙擲投也搔也振也直炙切七|擿上同出說文（投也搔也振也直炙切七）|䵂麩䵂|躑躑躅行不進也|蹢上同（躑躅行不進也）|𧓸𧓸蠋蟲名|潪土得水也
OuT七迹皵皮細起七迹切八|磧砂磧|刺穿也又七四切|𧻕䟐𧻕行皃|洓水名在北地|䟄倉卒|𧙞𧙞膝帬衸|嫧嫧娕齊謹
RuT祥易席薦席又藉也大戴禮曰武王踐阼有席銘亦姓出安定其先姓藉避項羽名改姓席氏晉有席坦祥易切六|夕暮也字從半月又姓漢書巴郡蠻渠帥七姓有羅朴督鄂度夕襲也朴普卜切蜀有尚書令夕斌|穸窀穸窀厚也穸夜也|汐潮汐|𨛳鄉名|蓆大也
PuT秦昔籍簿籍秦昔切十三|踖踐也|𨆮上同（踐也）|藉狼藉又姓左傳晉大夫藉談又慈夜切|耤耤田耤借也說文曰帝耤千畮也古者使民如借故謂之耤也宋書藉田令古官也於周爲甸師氏|塉薄土|瘠病也瘦也|庴縣名在清河又七削切|猎獸名似熊出山海經|葃茹草|膌膌瘦|䣢地名在蜀|簎打也
CuH房益擗撫心也房益切九|椑棺也|躄躄倒|闢啓也開也|辟便辟又法也五刑有大辟從卩辛所以制節其罪也從口用法也|㱸㱸㱤欲死之皃|𩪧弓弭|萆雨衣|𣮐毛𣮐
luj營隻役古從人今從彳說文曰戍邊也營隻切十二|䓈燕人呼芡又羊捶切|疫說文云民皆疾也|𩷍魚名有四足出文字集略|坄喪家塊竈說文曰陶竈窻也|垼上同（喪家塊竈說文曰陶竈窻也）|炈亦同|𪁛𪁛鳩鳥|鈠小矛|𩂹𩂹䨥大雨|豛豬之別名|𧈻𧈻𧌐蟲名
iun許役瞁驚視許役切二|𥆛眡也
AuH必益辟爾雅皇王后辟君也亦除也又姓漢有富室辟子方又有辟閭彬必益切七|璧白虎通曰璧者外圜象天內方象地爾雅曰肉倍好謂之璧肉邊好孔也|鐴鐴土犁耳|躄跛躄說文作𣦢人不能行也|𣦢上同（跛躄說文作𣦢人不能行也）|襞襞衣說文曰韏衣也|𨐨治也
BuH芳辟僻誤也邪僻也芳辟切四|辟上同見詩（誤也邪僻也芳辟切四）|癖腹病|廦牆也
buT食亦麝麝香也食亦切又食夜切二|射世本曰逢蒙作射又姓吳有中書郎射慈又神柘切又羊謝羊益二切
AsL彼役碧色也說文曰石之青美者又八品九品服色代青也紀年曰惠成王七年雨碧于郢彼役切一
JuT竹益𪐏黏黐竹益切一
KuT丑亦彳說文云小步也象人脛丑亦切二|𤭏瓶也
dun之役𦳮𦳮卷之役切一
iun火役𥄎小動七役切二|𢔠小行
#錫
QvT先擊錫賜也與也亦鉛錫玄中記曰鉛錫之精爲婢又姓吳志云漢末有錫光先擊切十三|析分也字從木斤破木也又爾雅曰析木謂之津注云即漢津也亦姓風俗通云齊大夫析歸父|㭊俗（分也字從木斤破木也又爾雅曰析木謂之津注云即漢津也亦姓風俗通云齊大夫析歸父）|裼袒衣|皙人白色也|緆細布|𪎥說文同上（細布）|蜥蜥蜴|菥菥蓂大薺|淅淅米|惁敬也|𧊸𧊸𧐎|㱤㱸㱤欲死之皃
dvT古歷激疾波又姓淮南王傳有激章古歷切九|擊打也|墼土墼|轚舟車|獥狼子|㰾歌也|𦼷草名|𡫀楊皃|鸄鳥名似烏
BvD普擊霹霹靂普擊切七|劈剖也裂也破也|澼莊子洴澼絖漂絮者|憵急速|䤨裁木爲器|癖痃癖病|僻邪僻
IvT郎擊靂霹靂郎擊切四十五|䟐䟐𧻕行皃𧻕七昔切|酈縣名在南陽亦姓又力知切|癧瘰癧|轢車踐又音洛|鎘鎘鎗|䥶上同（鎘鎗）|礫釋名曰小石曰礫|瓅珠瓅|秝稀疎|櫪馬櫪|䍽羖䍽|櫟木名柞屬又音藥櫟陽縣名|𩽏魚名亦作𩹺|歷經歷又次也數也近也行也過也又歷日續漢書律歷志云黃帝造歷世本曰容成造歷尸子曰羲和造歷或作曆|曆見上注（經歷又次也數也近也行也過也又歷日續漢書律歷志云黃帝造歷世本曰容成造歷尸子曰羲和造歷或作曆）|藶葶藶子|瀝滴瀝|磿石聲|寥寂寥無人又深也又音聊|鬲爾雅曰鼎款足者謂之鬲說文作鬲鼎屬實五觳斗二升曰觳象腹交文三足今亦作鬲|㽁瓦器說文同上又作䰛（爾雅曰鼎款足者謂之鬲說文作鬲鼎屬實五觳斗二升曰觳象腹交文三足今亦作鬲）|蒚山蒜|皪的皪白狀|𥌮𥌮𥉶視明皃|䍥羃䍥煙狀|躒動也|䟏上同（動也）|𪙽齒病|𤩚說文云玉名|厤治也|攊擊口也|䮥馬色|𧙉纏裹|䤙䤙𨢎酪滓|𡳸履下|𦠓𦠓䐎強脂|𨢌下酒|㔏劙開|𪅼鳥名|觻角鋒|𥽗雜糅食名|擽捎也|濼一名貫眾葉圓銳莖毛黑布地生冬不死一名貫渠又音藥|蚸爾雅曰蟿螽螇蚸亦作蝷
EvT都歷的指的又明也說文作旳都歷切二十六|適從也又之石始石二切|嫡正也君也|甋瓴甋塼也|靮馬韁|鏑箭鏃|馰馰顱馬白額又作的|滴水滴也亦作𤁷|肑腹下肉也|弔至也又音釣|芍蓮中子也亦作的見爾雅|蹢蹄也詩云有豕白蹢|䶂鼠名又音灼|玓玓瓅明珠色出說文|樀屋梠|𪄱雉屬|𦉹魚擊網也|𥕐𥕐磓|𥐝上同（𥕐磓）|扚引也|𣂉量也|啇本也|魡魚名|㣿㣿痛|𨑩至也|杓柄末橫木
jvT胡狄檄符檄說文曰二尺書也胡狄切八|覡巫覡男曰巫女曰覡|薂的薂蓮實也見爾雅|𪕯鼠名|鸄鳥似烏蒼白色|獥狼子又音叫音激|椺鐘椺又胡老切|䚫以角飾杖策頭
gvT五歷鷁水鳥也博物志曰鷁雄雌相視則孕或曰雄鳴上風雌鳴下風亦孕五歷切五|鶂上同說文又作𪁌鷊（水鳥也博物志曰鷁雄雌相視則孕或曰雄鳴上風雌鳴下風亦孕五歷切五）|艗艗舟舟頭爲鷁首|𠩫石地惡|虉虉綬草
GvT徒歷荻萑也徒歷切二十九|狄北狄又姓春秋時狄國之後漢有博士狄山|敵匹也當也輩也主也|籊竹竿皃又他歷切|翟翟雉又姓漢有上蔡翟方進|迪進也道也蹈也|覿見也|𧠫上同（見也）|笛樂器風俗通云武帝時丘仲所作也晉協律中郎列和善吹笛也|篴上同出周禮（樂器風俗通云武帝時丘仲所作也晉協律中郎列和善吹笛也）|糴市穀米又姓左傳有晉大夫糴茷|籴俗（市穀米又姓左傳有晉大夫糴茷）|邮鄉名在高陵|滌洗也除也淨也|蓧盛種器也|蔋草木旱死也|踧詩曰踧踧周道|䌦䌦綠色|𩷎東海有馬𩷎魚|䵂䵂麩|樀屋梠又音的|頔好皃|梑臧槔爾雅釋木曰狄臧槔是也|䊮穀粟之名|䨤雨也|㹍特牛|苖苖蓨草|滷鹹也|㣙說文曰行㣙㣙也
FvT他歷逖遠也他歷切二十一|逷古文（遠也他歷切二十一）|倜倜儻不羈|趯跳皃|䢰上同（跳皃）|剔解骨|𠜓上同（解骨）|詆詆詆䛢狡猾|惕怵惕憂也又愛也|䯜骨閒黃汁|硩周禮硩蔟氏掌覆夭鳥之巢又丑列切|摘發也動也說文曰拓果樹實也一曰指近之也又張革切|踢䟣踢獸名左右有首出山海經|䚐說文云目赤也又前歷切|𩮜說文云鬀髮也|𤈥望見火皃|蓨苖蓨草|籊竹竿皃|悐勞也|𢞒敕也|𥉈失意視皃
NvT則歷績緝也功業也繼也事也成也則歷切四|勣功也|樍檉木別名|𪄸鳥也
evT苦擊燩乾燥也苦擊切九|𢶡旁擊|𣪠攻也漢書云攻苦𣪠淡|喫喫食|𠿊上同（喫食）|𥍰矛也|𢿣䚫𢿣|𢞒敕也|䍊吹器
HvT奴歷惄心之飢也憂也思也奴歷切四|𧖷古文（心之飢也憂也思也奴歷切四）|溺溺水古作㲻又音弱又姓也|愵憂皃
PvT前歷寂靜也安也前歷切五|𡧘上同（靜也安也前歷切五）|𡧯亦同|𠴫𠴫嗼無聲|䚐目赤又音逖
DvD莫狄覓求也莫狄切二十三|覛上同說文曰衺視也（求也莫狄切二十三）|幎覆也亦作幂|幦車覆軨也|𧜀上同（車覆軨也）|䮭馬多惡也|糸細絲也微也連也|鼏鼎蓋|羃覆食巾又羃䍦婦人所戴|汨汨𤄷水名在豫章屈原所沈之處|㵋（汨𤄷水名在豫章屈原所沈之處）|漞並上同（汨𤄷水名在豫章屈原所沈之處）|冂文字音義云以巾覆從一下垂|䖑說文云白虎也|蓂菥蓂|𧱻白豕黑頭|覭小皃|䌐綱繩|𪒄𪒄𪒑黑青|䈿𥭓䈿|濗瀝濗水淺|𧐎𧊸𧐎蟲名|塓塗也
CvD扶歷甓瓴甓㼾甎扶歷切四|鷿鷿鷈鳥名似鳧而小足近尾或作鸊|椑大棺|㱸㱸㱤欲死之皃
AvD北激壁說文云垣也釋名曰壁辟也辟禦風寒也漢官典職曰省中皆胡粉壁紫素界之畫古烈士亦州名本漢宕渠地武德初爲壁州北激切六|鼊𪓟鼊似龜而漫胡無指爪其甲有黑珠文如瑇瑁可飾物|繴爾雅繴謂之罿今覆車鳥網也又敷核切|廦室屋|綼紷綼絮也|𧲜𧲜邪獸獸身鳥喙
evj苦鶪闃寂靜也苦鶪切二|䠐踞也
dvj古闃郹邑名在蔡古闃切七|狊說文云犬視皃亦獸名猨屬脣厚而碧色|鶪伯勞|湨水名在溫縣|鼳爾雅曰鼳鼠身長須秦人謂之小驢郭璞云似鼠而馬蹄一歲千斤爲物殘賊|犑爾雅云犑牛|𠋬𠋬黠
OvT倉歷戚親戚又姓漢有臨轅侯戚鰓倉歷切十一|慼憂也懼也|𧒕說文曰夜戒守鼓也|鼜上同（說文曰夜戒守鼓也）|鏚干鏚斧鉞本亦作戚|𪒑𪒑𪒄色敗|𧠪𧠪䙾面柔詩本或作戚施|慽慽痛|𧐶蟾蜍別名|𦸗草也|磩碝䃭石次玉也
ivT許激赥笑聲許激切九|鬩鬬也恨也戾也又相怨也|𥍠矛也左思吳都賦云長𥍠短兵亦作𥍟|𤄎沭遽也|𧨃私訟|䈪籮屬|㤸心不安也|𣣉去涕|㦦惶恐
ivj呼狊𥍟矛也呼狊切七|砉砉然物相離聲|瞁驚視|𥆛眡也|狊犬視也|焱火華又火焰也|殈鳥卵破也
FvT丑歷𣤩痛也丑歷切又丑力切二|𥛚福𥛚
#職
XwT之翼職爾雅云職主也常也博雅云業也字林云記微也又姓周禮有職方氏其後因官爲姓風俗通云漢有山陽令職洪之翼切九|軄俗（爾雅云職主也常也博雅云業也字林云記微也又姓周禮有職方氏其後因官爲姓風俗通云漢有山陽令職洪之翼切九）|戠說文云闕職識字从此|織組織說文曰作布帛總名|膱油敗|蟙蟙䘃蟲蝙蝠別名也|𧄕草名似酸漿亦作蘵|䐈脯長尺有二寸曰䐈儀禮作膱|樴樴杙
LwT除力直正也又姓楚人直躬之後漢有御史大夫直不疑除力切四|犆𤚳犆牛也|䐈肥腸|𡸜山直
IwT林直力筋也又姓黃帝佐力牧之後林直切九|朸縣名在平原|屴崱屴山皃|仂不懈|鳨似鳧而小亦作𩾜|𠢠趙魏閒呼棘出方言|𣲒水凝合皃|𡯄脛交|𧲡遼東犬名
KwT恥力敕誡也正也固也勞也理也書也急也今相承用勑勑本音賚恥力切十四|勅上同（誡也正也固也勞也理也書也急也今相承用勑勑本音賚恥力切十四）|飭牢密又整備也|淔水名|趩行聲|栻局又木名|侙意慎侙侙又惕也|𪀦鸂𪀦|鷘上同（鸂𪀦）|恜從也慎也|慗從也|遫張也|荲蒴𧃔別名|㽚田器又地名
JwT竹力陟升也進也竹力切二|稙早種禾
bwT乘力食飲食大戴禮曰食穀者智惠而巧古史考曰古者茹毛飲血燧人鑽火而人始裹肉而燔之曰炮及神農時人方食穀加米干燒石之上而食之及黃帝始有釜甑火食之道成矣又戲名博屬又用也僞也亦姓風俗通云漢有博士食子公河內人乘力切二|蝕日蝕也說文云敗瘡也𥼶名曰日月虧曰蝕稍小侵虧如蟲食草木之葉也
QwT相即息止也又嬎息也說文喘也亦姓姓苑云今襄陽人又漢複姓前漢書有河內息夫躬相即切十一|㮩木名|鄎新鄎縣在豫州|瘜惡肉|蒠菲蒠菜|熄蓄火|𦞜𦞜肉|䭒食也|㴧水|𥰝簨𥰝|𪄛鳥食
ZwT常職寔實也是也常職切八|湜水清也|殖多也生也|植種植也立志也置也|埴黏土|𡑠古文（黏土）|㨁拄杖曰㨁|遈流行
awT賞職識說文云常也一曰知也賞職切十|式法也敬也用也度也又姓出何氏姓苑|拭拭刷|𢂑上同（拭刷）|軾車前|飾裝飾|𥿮方言云趙魏閒呼經而未緯者曰機𥿮|鉽鼎鉽也|烒火皃|𧄹草名
iwf許極赩大赤也許極切五|衋傷痛其心|䵱赤黑皃|𥈜斜視|𢤋瞋怒皃
UwT士力崱崱屴山皃士力切四|𡸦𡸦嶷|溭溭淢水勢|萴草也
fwf渠力極中也至也終也窮也高也遠也說文棟也渠力切一
MwT女力匿藏也微也亡也隱也陰姦也女力切六|𧈟蟲食病|𧏾上同（蟲食病）|㥾愧也|恧慙也又女六切|𩺱魚名
TwT初力測度也初力切六|惻愴也|畟畟畟陳器狀說文曰治稼畟畟進也詩云畟畟良耜又音即|𦔎耜也|𡍫遏遮也|䔴草名
hwf於力hwb於力憶a念也於力切十七|億a十万曰億又安也度也|臆a胷臆|肊a氣滿|𠶷a說文曰快也|繶a絛繩|醷a梅漿|澺a水名在上蔡|薏a薏苡亦蓮心|𦺳a上同（薏苡亦蓮心）|䗷a小蜂|𩍖a履頭也出韻略|檍a木名一名木橿也|𣚍a梓屬|抑b按也說文作𢑏从反印|𡊁b地名|癔a病也
VwT所力色顏色所力切十五|㱇小怖皃|嗇愛惜也又貪也慳也又積也亦姓說文作𠾂愛歰也从來㐭來麥也來者㐭而藏之故田夫謂之嗇夫㐭音廩|𩍙車馬絡帶|穡稼穡種曰稼斂曰穡|薔薔虞蓼也|轖字書云車藉交革|繬緙也縫也|濇不滑|䉢篩䉢|嬙女字|𧒗蟲也|懎悲恨|𩕡頰也|𠢳助也
ewf丘力䩯皮鞭皃丘力切一
dwf紀力殛誅也紀力切十一|㥛急性相背說文曰疾也一曰謹重皃|襋衣領交也|棘小棗亦越戟名又箴也羸瘠也又姓文士傳曰棗袛本姓棘其先避難改爲棗氏衛大夫棘子成之後也|亟急也疾也趣也又音氣|㻷埤蒼云垂㻷地名出美玉案左傳只作棘|悈急也又音戒|𡕮去也|蕀遠志別名|茍說文曰自急敕也|𧩦訥言
lwT與職弋橜亦弋射又姓出河東今蒲州有弋氏見姓苑與職切三十四|翊馮翊郡又輔翊|翌明日|廙敬也又音異|黓皁也爾雅曰太歲在壬曰玄黓|翼羽翼說文翍也又恭也美也助也亦州名在隴右因翼水爲名又姓晉翼侯之後漢有諫議大夫翼奉|𩙺說文同上（羽翼說文翍也又恭也美也助也亦州名在隴右因翼水爲名又姓晉翼侯之後漢有諫議大夫翼奉）|𦏵古文（說文同上）|䴬麥䴬|隿繳射也或作弋|𧃟藕翹|㚤婦官也漢有鉤㚤夫人居鉤㚤宮漢書亦作弋|潩水名出密縣大騩山|杙果名如棃亦橜也|芅今羊桃也或曰鬼桃葉似桃而花白|㔴說文云田器也|𧾰趨進𧾰如也|𨙒疾趨|𥡪黍稷蕃蕪皃亦作翼|蛡蛡蛡蟲行皃|𤬩瓶瓮骨也|𢖺心動|瀷水聚|𢎀缺盆骨也|𠥦大鼎|熼火光|釴鼎附耳在外也|𤼌痒𤼌淫𤼌|𧑌蟲也|𦔜耕也|䄩禾䄩|𢓀行𢓀|䘝衣䘝|䣧酒色
NwT子力即就也今也舍也半也說文作即食也亦姓風俗通有單父令即賣又漢複姓有城陽相齊人即墨成子力切十六|卽上同（就也今也舍也半也說文作即食也亦姓風俗通有單父令即賣又漢複姓有城陽相齊人即墨成子力切十六）|稷五穀之摠名一曰黍屬周禮注云社稷土穀之神有德者配食焉共工氏之子曰句龍食於社有厲山氏之子曰柱食於稷湯遷之而祀棄俗作稷亦姓后稷之後|㮨木名似松|㹄牛名|蝍蝍蛆蟲名又子結切|楖楖裴縣在魏郡裴房非切|畟又初力切|𨂢𨂢蹙迫急|鯽魚名|𤠎犬生三子|堲風堲又子栗切|䐚膏澤|唧唧聲也|𪃹𪃹鴒亦作䳭|揤揤裴縣在魏郡裴房非切
AwL彼側逼迫也彼側切十|偪上同（迫也彼側切十）|皕二百|幅行縢名|楅束也又音福|䮠駝䮠|湢湢㳁水驚起勢也|䫾風也|㘠姓也又閉也|皀皀粒
kwr雨逼域居也邦也雨逼切十四|蜮短狐蟲又音或|罭魚網|棫木叢|㚜字林云大力皃|𪂉鶝𪂉鳥|𦈸瓦器|琙人名漢有公孫琙|𪑝羔裘之縫又音洫|緎縫也亦同上（羔裘之縫又音洫）|䮙馬走|魊小兒鬼|淢溭淢波勢|𦱂叢也
iwr況逼洫溝洫況逼切十四|侐靜也|䦗上同（靜也）|閾門限|𨵨古文（門限）|𥄎舉目使人|㰲㰲聲吹皃|𤷇頭痛|𪑝羔裘之縫|緎縫也亦同上（羔裘之縫）|𦑌羽聲|𠷾聲也|淢疾流|𧹭赭色
BwL芳逼堛土凷芳逼切十三|愊悃愊至誠|踾蹋地聲|𤗚坼也|𩜰飽皃|揊擊聲|稫稫稄禾密滿也|副析也禮云爲天子削瓜者副之巾以絺|畐逼滿也|䦼地裂也亦作𨺤|𢾇𢾇敂|㽬多也密也|疈周禮曰以疈辜祭四方百物
SwT阻力稄稫稄阻力切十一|𥟔一本作此|𣅔日𣅔又旁也傾也不正也|𢯩打也|仄仄陋說文云側傾也|昃日在西方|㳁湢㳁水勢|萴廣雅云附子一歲曰萴子二歲曰烏喙三歲曰附子四歲曰烏頭五歲曰天雄|側傍側|夨說文云傾頭也|𠨮籀文（說文云傾頭也）
CwL符逼愎很也符逼切八|腷腷臆意不泄也|𤐧火乾肉也|𥻅上同（火乾肉也）|𤗚𤗚版出通俗文|馥香又音復|踾蹋地聲|鶝鶝𪂉鳥
gwf魚力嶷岐嶷詩曰克岐克嶷魚力切五|薿茂盛|㘈說文曰小兒有知也引詩云克岐克㘈|懝有所識也|觺觺岳角皃
PwT秦力堲疾也秦力切又將七切又牆資切三|垐以土增道|𢯩打也又音側
JwT丁力𡮞丁力切又丁六切三|𣮊毛少𣮊𣮊|𢕚𢕚滴水少
DwL亡逼䁇細視也亡逼切一
YwT昌力瀷水潦積聚昌力切又音翼二|𦔫字統云耕也
#德
ExT多則德德行又惠也升也福也亦州名秦爲齊郡地漢爲平原郡武德初爲德州因安德縣以名之多則切九|惪古文（德行又惠也升也福也亦州名秦爲齊郡地漢爲平原郡武德初爲德州因安德縣以名之多則切九）|𢛳觻𢛳縣名在張掖漢書作得|䙷說文取也今作㝵同|得得失|淂水皃又丁力切|𨁽行碍碍|𣌏約也|𠮊取也
NxT子德則法則子德切三|𠟻古文（法則子德切三）|𠟭籀文（法則子德切三）
IxT盧則勒鄴中記曰石虎諱勒呼馬勒爲轡盧則切十二|肋脅肋𥼶名曰肋勒也所以檢勒五藏也|扐筮者著蓍指閒|仂禮祭用數之仂|艻蘿功香草|朸說文曰木之理也平原有朸縣|𤨕美石次玉|玏上同（美石次玉）|泐凝合|㔹功大說文曰材十人也|阞地脉理坼|竻竹根
FxT他德忒差也他德切六|㧹打也|慝惡也|貣從人求物也|𥊸𥊸䁿欲臥也|㥂驚㥂㥂
exT苦得刻刻鏤又剝也苦得切五|克能也勝也說文作𠅏肩也|剋剋己又必也殺也急也|勀自強|𡞢罵女老𡞢亦作娔
GxT徒得特特牛又獨也亦姓左傳晉大夫特宮徒得切九|貣假貣謂從官借本賈也亦從人求物也又音忒|𧈩食禾葉蟲|𧎢上同（食禾葉蟲）|樴杙也|𤙰鈍也|棏木名|鴏鴏𪃑又徒戴切|螣螣蛇
ixT呼北黑北方色呼北切三|潶水名在雍州|㱄唾聲
DxD莫北墨筆墨又姓墨翟是也亦即墨縣名莫北切十二|默說文曰犬暫逐人也又靜也或作嘿|冒干也又莫報切|䘃蟙䘃蟲即蝙蝠|纆索也|万虜複姓北齊特進互俟普俟音其|𢄏方言同上（虜複姓北齊特進互俟普俟音其）|艒艒𦩤釣艇|𡣫姓也|䁇暫視|䁿𥊸䁿欲臥也|𤲰𤱢𤲰
PxT昨則賊盜也說文作𧵪敗也昨則切七|𧵪上同（盜也說文作𧵪敗也昨則切七）|鱡烏鱡魚崔豹古今注云一名河伯度事小史|鰂上同（烏鱡魚崔豹古今注云一名河伯度事小史）|蠈食禾節蟲亦作賊|𣿐博雅云𣿐測也|𦽒草名
QxT蘇則塞滿也窒也隔也蘇則切又蘇載切五|𡫼上同見說文（滿也窒也隔也蘇則切又蘇載切五）|寨安也|㥶實也書曰剛而㥶|𢥛上同見說文（實也書曰剛而㥶）
AxD博墨北南北亦奔也又高麗姓又漢複姓七氏左傳衛大夫北宮貞子莊子有北門成漢有北唐子真治京氏易世本云晉有高人隱於北唐因以爲氏晏子云齊有北郭先生名騷古有北人無擇清身絜己疾世之濁自投清冷之淵姓苑有北鄉北野氏博墨切二|𧉥蟲似蟹四足
CxD蒲北菔蘆菔蒲北切十三|蔔上同（蘆菔蒲北切十三）|僰僰道縣在犍爲又丁壯皃亦醜也亦作𧟱又符逼切|匐匍匐|𠣵上同（匍匐）|踣斃也倒也又作仆|仆倒也|菩草名又音蒲|垘填塞|䞳僵也又孚豆切|䵗治黍豆潰葉也|𧟱農夫賤稱|𢫯擊也
jxj胡國或不定也疑也胡國切五|惑迷惑|蜮蟲名短狐狀如鼈含砂射人久則爲害生南方說文云有三足以氣射害人玄中記云長三四寸蟾蜍鸑鷟鴛鴦悉食之|魊鬼魊旋風|𡿿水流皃
dxj古或國邦國又姓太公之後左傳齊有國氏代爲上卿古或切一
hxT愛黑餩噎聲愛黑切二|殕殪殕
jxT胡得劾推窮罪人也俗作𠜨胡得切一
HxT奴勒䘅蟲名似䖟而小青班色齧人奴勒切三|䎪穀䎪見齊人民要術|𣉘字統云埃也又日光也
dxT古得裓釋典有衣裓古得切三|𢧧𢧧䎪草生|孂竦身皃出玉篇
OxT七則墄階齒七則切一
BxD匹北覆匹北切三|𧕡𧕡蝗蟲名|𠣾𠣾匐
ixj呼或𢃤巾帛從風聲呼或切二|𥇙睡目
#緝
O1T七入緝績也七入切六|葺修補|諿和也|𧚨襟緣亦作緁|𪔪鼓無聲|咠咠咠譖言也說文曰聶語也
Z1T是執十數名是執切四|什篇什又什物也|拾收拾又掇也斂也|褶袴褶
X1T之入執持也操也守也攝也說文作𡙕捕辠人也之入切六|汁汁瀋也液也|瓡縣名在北海|䥍廣雅云羊箠也|𡠗字統云至也|慹怖也
R1T似入習學也因也說文作習數飛也又姓出襄陽晉有習鑿齒似入切十三|襲因也及也重也合也入也又掩襲說文曰左衽袍也|隰原隰亦州名左傳曰重耳居蒲即隰川縣故蒲城是也漢爲蒲子縣後魏齊周之閒爲沁州隋爲隰州以州前有泉下濕蓋取下濕之義名之又姓齊有大夫隰朋|鰼爾雅云鰼鰌今泥鰌也又山海經云鰼魚狀如鵲而有十翼鱗在翼端聲如鵲|騽馬豪骭又驪馬黃脊|飁颯飁大風|槢堅木名|𪄶鴣𪄶鳥名|𦸚𦸚茵水草出埤蒼|𥱵簷𥱵修船具也|䒁上同（簷𥱵修船具也）|褶袴褶|霫雴霫大雨
P1T秦入集聚也會也就也成也安也同也眾也本作雧字林云羣鳥駐木上亦州名漢宕渠縣梁爲東巴州恭帝爲集州以有集水名之又姓風俗通云漢有外黃令集一秦入切九|輯和也|檝舟檝又音接|亼說文云三合也从入一象三合之形合僉之類皆从此又子入切|𠦫說文云詞之集也|𦺴菩也|鏶鐵鍱|慹怖也|箿箿覆也又子立切
c1T人執入得也內也納也人執切二|廿說文云二十并也今作卄直以爲二十字
h1X伊入揖揖遜又進也說文云攘也一曰手著胷曰揖伊入切二|挹酌也
a1T失入溼水霑也失入切三|濕上同見經典又他合切（水霑也失入切三）|䏉牛耳動也
N1T子入㗱㗘㗱噍皃子入切㗘昔博十一|潗泉出|䌖合也又蠻夷貨名|湒雨皃|咠又七入切|蓻草生多皃|𧚨襟緣|葺茨也|䁒眨䁒|𥠋稠𥠋𥠋|㠍負秦山名
f1b其立及至也逮也連也辝也其立切七|𨕤古文（至也逮也連也辝也其立切七）|𦶍冬瓜|苙白芷又力急切|䲯䲯鳩鳥|笈負書箱又其劫切|㧀戶鍵
L1T直立蟄蟄蟲又藏也直立切六|䐲肉半生半熟|俋俋俋然耕皃出莊子|㙷下入又直輒切|㞏㞚㞏前後相次也㞚初立切|譶㒊譶言不止也
J1T陟立縶繫馬陟立切四|𩅀小濕|馽馬絆|𡁉口𡁉𡁉
I1T力入立行立又住也成也又漢複姓魯有賢人立如子力入切九|䶘齧聲|粒米粒|笠雨笠本草呼破笠爲敗天公也|鴗水狗爾雅謂之天狗注云小鳥青似翠食魚江東呼爲水狗|苙白芷又其立切|䇐臨也|岦岦岌山皃|砬石藥
d1b居立急急疾說文作㤂褊也居立切十一|汲汲引也又縣名在衛州又姓漢有中尉汲黯河東人|給供給又姓出姓苑|伋孔伋字子思|級等級說文云絲次序也亦階級禮曰拾級聚足俗作𨸚|芨烏頭別名|𦳌上同（烏頭別名）|㽺病也|彶彶遽也|皀穀香|𪀐𪀐鵖鳥名
g1b魚及岌高皃魚及切二|㱞危也
e1b去急泣無聲出涕去急切三|㬤欲燥|湆羹汁
Q1T先立𩎕小兒履也先立切五|卌字統云插糞杷說文云數名今直以爲四十字|霫字林云雨皃又奚霫東北夷名|𧿅𧿅膝坐|㗩㗩㗩忍寒聲
V1T色立歰說文曰不滑也色立切八|澀上同（說文曰不滑也色立切八）|澁俗（說文曰不滑也色立切八）|鈒戟也鋋也|雭小雨聲|濇不滑|㒊不及|翜疾飛
i1b許及吸內息許及切十二|噏上同（內息許及切十二）|歙說文曰縮鼻也後漢有來歙又舒涉切州名|翕火炙一曰起也又斂也合也動也聚也盛也|𧬈𧬈䛅語聲也|潝水流皃|熻熻熱|嬆莊嚴|翖漢有翖侯|𨝫地名|闟戟名曰闟|𪅲鳥名
S1T阻立戢止也斂也阻立切九|𥊬淚出皃|𧤏角多皃|𧥄上同（角多皃）|㗊眾口|蕺菜名|濈和也|𠿠喻也|霵雨下又士邑切
h1b於汲邑縣邑周禮曰四井爲邑又漢複姓有邑由氏楚大夫養由氏之後避仇改焉於汲切八|悒憂悒|唈嗚唈短氣|裛裛香又於怯切|浥濕潤|䓃䓃菸茹熟|䭂食䭂|𦶂𦶂𦮾
K1T丑入湁湁潗沸皃丑入切三|雴大雨|漐汗出皃
k1b爲立煜文皃爲立切四|曄暐曄又筠輒切|熠熠燿螢火又羊入切|騽馬豪骭又音習
l1T羊入熠熠燿螢火羊入切二|孴多皃
M1T尼立孨戢孨聚皃尼立切五|㵫潗㵫水文皃|𣲷濕𣲷|㘝㘝㘝私取皃又女洽切|𦮾𦶂𦮾
U1T仕戢霵暴雨皃仕戢切二|䯂盛眾皃
C1L皮及𪀐𪀐鵖亦作鴔皮及切一
A1L彼及鵖彼及切二|皀穀香也
T1T初戢㞚㞚㞏初戢切四|𡍪𡍪㙷重累土也|䙄重緣|𢕬行皃
Y1T昌汁卙字統云會聚也昌汁切一
#合
j2T侯閤合合同亦器名亦六合天地四方對也又州名秦爲巴郡宋爲宕渠郡後魏置合州蓋涪漢二水合流之處因以名之又姓左傳宋有大夫合左師又漢複姓高帝功臣表有合傅胡害侯閤切又音閤十一|郃郃陽縣在同州又虜複姓後魏書大莫干氏後改爲郃氏又音閤|榙榙𣝋果名似李出埤蒼|䢔䢔遝行相及也|㭘㭘棔木也|詥諧也亦作合|耠耕也|𡇶會也|𪘁𪘁齧聲也|𦳬草|盒盒盤覆也
d2T古沓閤爾雅曰小閨謂之閤古沓切十九|鴿鳥名|合合集又音䢔|敆合會也|鉿二尺鋌|鮯魚名六足鳥尾出山海經|蛤蚌蛤|郃水名又縣名又音䢔|浩浩亹地名亹音門|匌周帀也|頜頜頷頤傍|佮併佮聚也|㧁閉戶曰㧁|𣭝𣭝𣬬目睫長|㭘劒柙又巨業切|㠷以席載穀|鞈防捍|韐韎韐大帶|𢂷𢂷口亦同上（韎韐大帶）
E2T都合答當也亦作荅都合切十二|畣爾雅曰俞畣然也|𨅞跛行皃|撘打也出音譜|荅正名云小豆|褡橫褡小被|㜓面㜓姶皃|㾑肥㾑㽺出字林|嗒舐嗒|𤝰犬食|㿯皮㿯|㯚㯚𣝋木名
Q2T蘇合趿進足蘇合切十一|颯風聲|靸小兒履或作𩎕|𩎕上同（小兒履或作𩎕）|馺馬行疾|霅廣雅曰雨霅霅又音讋|卅說文云𠦃三十也今作卅直以爲三十字|㚫媕㚫女字|𣬬𣭝𣬬眼睫長|𢕬眾行皃|鈒鈒鏤
G2T徒合沓重也合也又語多沓沓也又虜複姓後魏書沓盧氏後改爲沓氏徒合切十八|誻譐誻亦作噂𠴲|遝䢔遝|㧺指㧺|㭼柱上木也|涾沸溢|𩣯馺𩣯馬行|龖龍飛之狀|𠉤儑𠉤不著事也|譶疾言|𣝋榙𣝋|蹹齧蹹|䂿舂已復擣之爲䂿|䜚妄言|𦂀𦂀子絹出字林|𦾽東魯人呼蘆菔曰菈𦾽|𧌏䗘𧌏蟲|眔目相見
F2T他合錔器物錔頭他合切二十二|嚃歠也|䓠菜生水中|㛥安皃說文曰俛伏也一曰意伏也|踏著地|𢃕帳上覆|鞜革履|𦑇𦒆𦑇飛皃|漯水名在平原|濕上同（水名在平原）|㹺犬食|𦧟上同（犬食）|䶀鼓聲也|佮合也|䵬晉書有兗州八伯太山羊曼爲䵬伯|𪘁食也|𨌭車釭𨌭也|㭼柱㭼頭|䍝相罯䍝出字林|濌積厚|𪂌鳥名|䈋竹名
P2T徂合雜帀也集也猝也穿也說文曰五綵相合也徂合切七|韴斷聲|磼磼嶫山高|雥羣鳥|䕹戶簾|𨅔止也又才含切|䣟亭名在貝丘
N2T子荅帀遍也周也子荅切十|迊上同（遍也周也子荅切十）|𠯗入口|噆蚊蟲噆人|𣤶𣤶𣣴聲|魳魚名|䍼羊腌|嘁歍嘁|沞湆沞纔濕|䞙𧼎䞙急走
I2T盧合拉折也敗也摧也盧合切十一|搚上同（折也敗也摧也盧合切十一）|㩉亦同|摺敗也|𦒆𦒆𦑇飛皃|磖磖磼|𪇹𪇹䳴初飛皃|菈菈𦾽魯人呼蘿蔔|𣤊𣤊歁不滿|㕇石聲|𤛊𤛊拉
H2T奴荅納內也又姓出何氏姓苑奴荅切八|䪏腝皃|蒳字統云香草異物志云葉如栟櫚而小子似檳榔可食|軜驂馬內轡繫軾前者|衲補衲紩也|魶魚名似鼈無甲有尾口在腹下|妠姶妠聚物|㨥打㨥
e2T口荅溘至也奄也依也口荅切七|𣩄𣩄死見楚詞本作溘|㧁閉戶聲|厒山左右有岸|䆟䆟合相當也|匌匌帀也|歁歁歞癡皃
h2T烏合姶美好皃烏合切十三|𤸱短氣|罨網又一劫切|罯覆蓋也又烏敢切|媕女有心媕媕也|㔩㔩彩婦人髻飾花也|庵庵低又屋|𨂁跛𨂁|𩋊車具又小兒履名𩋊皻|𩇠調色𦘕繒出郭調字指|搕以手盍也又搕𢶍糞也|鞥皮裹角也|佮姓也
i2T呼合欱大歠也呼合切四|㽺病劣皃|𣣹𣣹瘶|㾑寒㾑
g2T五合𣊡日中見絲凡作㬎同五合切十|礏磼礏|哈魚多皃|儑𠉤儑|𡀾眾聲|砐峇砐|礘動礘礘亦作硆|㾑寒㾑病|䑥船皃|魥魚名
O2T七合䟃走也赴會也七合切二|㜗婪㜗
O2T七合遪裹遪七合切一
h2T烏荅唈爾雅云僾唈也烏荅切一
#盍
j3T胡臘盍何不也說文作盇覆也爾雅合也胡臘切十|闔閶闔說文云門扇也一曰閉也|𨶩俗（閶闔說文云門扇也一曰閉也）|嗑噬嗑卦名|蓋苫蓋|𧪞靜也|篕籧篨也|㧁纂文云姓也|𨜴說文云地名也|熆吹火也
I3T盧盍臘臘蜡盧盍切十四|臈俗（臘蜡盧盍切十四）|𪙷齧聲|䶘上同（齧聲）|鑞錫鑞|蠟蜜蠟|䗶俗（蜜蠟）|擸折也又擸𢶍破壞也|𥀰𥀰㿴皮瘦寬皃|𪇹𪇹䳴鳥飛|搚摺搚相和|𦒦𦒦𦑲飛初起皃|𦅶繒䋵|邋邋遢行皃
E3T都榼㿴𥀰㿴都榼切十一|耷大耳|搨手打也|㩉上同（手打也）|矺擲地聲又竹亞切亦作䂝|𠞈相著聲一曰𠞈鉤也|笚竹相擊|䓠菜生水中又荷覆水|褡橫褡小被|𩝣𩝣𩚛|䪚熱䪚䪚
F3T吐盍榻牀也吐盍切十九|㯓上同（牀也吐盍切十九）|𦪙兩槽大船|毾毾㲪|鰈比目魚別名|魼上同（比目魚別名）|鰨魚名似鮎四足|𦶑𦶑布|傝傝隷亦傝䢇儜劣又傝𠎷不謹皃|狧犬食|𦧭上同（犬食）|𧪦𧪦𧪞多言𧪞古盍切|𦐇飛皃|鞳鏜鞳鐘聲又他荅切|塔浮圖|搭摸搭|嗒嗒然忘懷也|遢邋遢不謹事|𩥑𩧆𩥑馬行不進
i3T呼盍𣣹大啜呼盍切三|𩵢魶𩵢魚名出山海經|㽺肥㽺
H3T奴盍魶魚名奴盍切三|笝纜舟竹索也|𩚛𩝣𩚛
G3T徒盍蹋踐也徒盍切十|躢上同見公羊傳（踐也徒盍切十）|闒門樓上屋說文曰樓上戶也|𤒻爛也墮也|𧮑𧪦𧪞妄語也|譫多言又作𧪟|䍇瓶|䳴𪇹䳴鳥飛|䈳窻扇|𦑲𦑲𦒦
Q3T私盍𠎷傝𠎷不謹皃私盍切七|𠿓𠿓𠿓食皃|𢶍搕𢶍糞又才盍切|卅三十|𨆂𨆂𨆂行皃|靸靸鞋|𩐅𩐅攱起也出新字林
g3T五盍儑傝儑不著事也五盍切二|𥋙𥋙睡
P3T才盍䪞惡也又姓出纂文今北海有之才盍切二|𢶍擸𢶍和雜
d3T古盍䫦䫦車頷骨古盍切八|𧪞多言又音盍|嗑上同（多言又音盍）|蓋姓也漢有蓋寬饒字書作𨜴|閘閉門|鉀鉀鑪|䗘䗘𧌏|𨜴地名
e3T苦盍榼酒器也苦盍切六|磕石聲|𧛾𧛾襠|㕎㕎崩損也|䶀鼓聲䶀䶀|𨍰車聲
h3T安盍鰪鰪鱂魚名安盍切四|盦說文云覆蓋也|廅山旁穴|𤸱短氣也又烏合切
O3T倉雜囃助舞聲也倉雜切三|𥗭石多皃|䵽鼓聲
d3T居盍砝石聲居盍切二|𪁍鳥名
X4T章盍譫多言也章盍切一
#葉
l4T與涉葉枝葉又姓吳志孫堅傳有都尉葉雄與涉切又式涉切十|楪楪榆縣名在雲中|揲度揲|鍱銅鍱|偞偞偞輕薄美好皃|枼薄也|㯿柶端又力葉切|煠煠爚|䈎篇簿書䈎說文籥也|殜病也
N4T即葉接交也持也合也會也又姓三輔決錄有接昕子即葉切十一|椄續木|睫目睫釋名曰睫插也插於眶也說文作䀹目旁毛也|䀹上同（目睫釋名曰睫插也插於眶也說文作䀹目旁毛也）|楫舟楫|檝上同（舟楫）|婕婕妤亦作倢伃|菨莕菨水余草可食|𣶏𣶏㳧纔有水皃|鯜魚名|䈉竹䈉又所甲切
a4T書涉攝兼也錄也書涉切八|灄水名在西陽|葉縣名在汝州又余涉切|歙黟歙又許乃切|欇爾雅欇虎櫐郭璞云今虎豆纏蔓林樹而生莢有毛刺又音涉|𥍉目動之皃|弽射決張弓又童子佩之|韘上同（射決張弓又童子佩之）
Z4T時攝涉歷也徒行渡水也亦漳水別名涉縣是也又姓左傳晉大夫涉佗時攝切四|𣻣上同出說文（歷也徒行渡水也亦漳水別名涉縣是也又姓左傳晉大夫涉佗時攝切四）|欇虎櫐也又書涉切|䤮鐵䤮
I4T良涉獵取獸白虎通曰四時之田摠名爲獵爲田除害也尸子曰虙羲氏之世天下多獸故教人以獵也良涉切二十二|鬣須鬣說文曰髮鬣鬣也|㲱長毛說文同上又作䝓（須鬣說文曰髮鬣鬣也）|躐踐也|䁽目暗|𣋲日暗|擸說文曰理持也|儠說文云長壯儠儠也|犣牛牡又旄牛名|䪉䪉馬靼也|㼲蹈瓦聲|䉭編竹爲之|鱲魚名|𡂏齧聲|𥪂羸𥪂|𠠗削也擇也|邋邁也|㯿柶端木也|䜲谷名|䃳䃳崨山之連接|巤本也又鼠毛|獦戎姓俗作田獦字非
P4T疾葉捷獲也佽也疾也剋也勝也成也說文曰獵也軍獲得也春秋傳曰齊人來獻戎捷又姓漢書藝文志捷子齊人著書疾葉切八|疌說文疾也|寁速也亟也|倢斜出也又利也便也|崨崨䃳山連延也|踕足疾|䌖合也遠方物也|誱多言也又口誱
L4T直葉䐑細切肉也直葉切三|㙷下入又直立切|殜殗殜病
h4b於輒㪑㪑𣀳於輒切四|裛又於及於怯二切|腌鹽腌魚|𦀖𦀖䌜補衣
M4T尼輒聶姓也楚大夫食采於聶因以爲氏尼輒切十六|躡蹈也履也登也急也|鑷鑷子|𤴘織𤴘|㚔說文曰所以驚人也一曰大聲今作幸同睪圉報執之類從此|睪伺視也說文云令吏將目捕罪人本羊益切|帇說文曰手之捷巧也|𩣘馬步疾也|籋箝也|䌜𦀖䌜補衣|𣌍小煗也|㸎上同（小煗也）|踂足不相過|𥬬竹𥬬|䳖鳥飛|𣀳㪑𣀳
Y4T叱涉謵小語叱涉切九|𣠞樹葉動皃|㚲輕薄|詀詀讘細語|䧪女子態又前卻䧪媚也|喢多口|㤴偛㤴小人皃|㳧𣶏㳧纔有水皃|𦛖𦣀𦛖
c4T而涉讘詀讘又狐讘縣名在清河而涉切五|顳顳顬鬢骨|喦多言|囁口動|𦣀動𦣀
X4T之涉讋多言也之涉切十二|囁口動又而涉切|懾怖也心伏也失常也失氣也亦作慴|慴伏也懼也怯也|慹司馬彪莊子注云慹不動皃又音捻|霅說文云霅霅震電皃又蘇合胡甲丈甲三切|摺摺曡也|𣠞風動皃|䜆言疾|謺拾人語也|襵襞也|䝕梁之良豕
O4T七接妾不娉七接切十|緁連緁說文曰緶衣也|䌌說文同上（連緁說文曰緶衣也）|𠟪續也|鏶炙鐵|淁水名|鯜魚名|𣠺飯臿|穕土穕農具也|踥踥踥往來皃
K4T丑輒鍤綴衣針丑輒切六|煠爚煠|㤴㤴休也出字書|𩂻𩂻霎小雨|䈎籥䈎|𥯥竹葉
f4b其輒衱禮記注云衱交領其輒切五|极驢上負版|笈負書箱也|㭘劒柙|𪀐𪀐鵖戴勝別名亦作鴔
J4T陟葉輒專輒說文曰車相倚也陟葉切八|耴耴耳國名說文曰耳垂也|襵衣襵又之涉切|𦯍爾雅釋草云𦯍小葉|𢬴拈也|鮿婢鮿魚即青衣魚|㡇說文曰衣領耑也|㭯木小葉
k4b筠輒曄光也筠輒切又爲立切七|曅上同（光也筠輒切又爲立切七）|饁餉田|燁煒燁火盛|爗說文盛也|皣草木白華|瞱目動皃
e4b去涉𤷾少氣也去涉切一
V4T山輒萐萐莆瑞草山輒切萐箑歃霎並又所洽切六|箑扇也|歃歃血|霎小雨|喢多言又齒涉切|㰼愒欲
d4b居輒𦀖縫也居輒切二|鵖鳥名
h4X於葉魘惡夢於葉切又於琰切七|擪持也指按也|靨面上靨子|嬮女字|𣄉掩光名掩也|厭厭伏亦惡夢又於琰切六|𣚕葉動皃
#怗
F5T他協怗安也服也靜也他協切十一|帖券帖又牀前帷也|𪔧鼓無聲或作𦗺|鉆鉆著物|䩞鞍䩞|貼以物之質錢|跕跕屣又丁協切|蝶蝶𧌏|䑜小舐曰䑜|呫甞也|㡇衣領
j5T胡頰協和也合也胡頰切十|叶古文（和也合也胡頰切十）|勰思也|綊說文曰䋊綊也|挾懷也持也藏也護也|俠任俠又姓戰國策有韓相俠累|𠗉𠗉𠗨冰凍|劦同力|𤙒𤙒犍|𢂐束帶
d5T古協頰頰面也古協切九|𩠣籀文（頰面也古協切九）|鋏長鋏劒名|筴箸筴又古洽切|梜上同見禮（箸筴又古洽切）|莢蓂莢榆莢又姓出平陽世本有晉大夫莢成僖子也|蛺蛺蝶|唊唊唊多言也亦作䛟|𥞵𥞵穧穧音劑
e5T苦協愜心伏也又快也苦協切八|㥦上同（心伏也又快也苦協切八）|悏快也|㾜說文曰病息也|匧藏也|篋箱篋|㤲說文曰思皃|㛍得志㛍㛍又呼協切
G5T徒協牒書版曰牒又虜姓後魏書牒云氏後改爲云氏徒協切三十|喋便語|蹀躞蹀|諜反閒又譜諜也|堞城上垣|𨈈小走聲|氎細毛布|𣯉上同（細毛布）|褺重衣|曡重也墮也明也累也積也說文云楊雄說以爲古理官決罪三日得其宜乃行之从晶从宜亡新以爲曡从三日太盛改爲三田亦州名禹貢梁州之域自秦至魏諸羌據焉周武帝始逐諸羌乃置曡州蓋以山重曡而名之|疊上同（重也墮也明也累也積也說文云楊雄說以爲古理官決罪三日得其宜乃行之从晶从宜亡新以爲曡从三日太盛改爲三田亦州名禹貢梁州之域自秦至魏諸羌據焉周武帝始逐諸羌乃置曡州蓋以山重曡而名之）|䥡廣雅鋌也|慴懾也說文懼也|䠟說文曰䠟足也|㥈安也又齒廉切|𥷕𥷕簸|牃牀版|褋襌衣|墊地名在巴中|惵思懼皃|褶袷也又似入切|𨐁車聲|蝶蛺蝶|𠗨𠗉𠗨又丈甲切|䴑鳥名狀似鵲赤黑色兩首四足可以禦火出山海經|揲摺揲|㩹掛㩹|𪑧𪑧黔首出音譜|䁋目䁋|𤗨𤗨治
H5T奴協苶病劣皃莊子曰苶然疲役奴協切又音涅十五|埝陷聲|暬晦冥又私列切|𩐭聲絕|捻指捻|錜小釘|慹不動皃又之涉切|敜說文云塞也書曰敜乃穽|攝攝然天下安出漢書|㘨深也|籋小箝亦作銸|鑈上同（小箝亦作銸）|惗相憶|𩋏鞍𩋏薄也出字林|菍草
Q5T蘇協燮和也說文从言又炎蘇協切十六|屧屐也履中薦也|屟上同（屐也履中薦也）|躞躞蹀|韘韘韝射具|𤫉石似玉|𤏻熟也文字指歸从辛又炎|鞢䩞鞢鞍具出新字林|徢徢行走皃|𦔼使也又人耴切|𤗈𤗈牒小契|蜨蛺蜨蟲名|𧕊上同（蛺蜨蟲名）|䕈草名|𡞘𡞘洽|𦩌𦩌舟行也
I5T盧協㼲蹈瓦聲也盧協切四|𪑧竹裏黑也|𡂩𡂩𠲷多言|𦖩耳垂
E5T丁愜聑耳垂皃丁愜切十二|𠲷多言|𢬴打也|笘折竹箠也|喋血流皃又田叶切|㝪下也|跕墮落|䩞䩞鞢鞍具|𧚊衣領|㑙低㑙也|𨓊𨓊䢡走也|涉血流皃又時懾切
P5T在協䕹草簾在協切一
N5T子協浹洽也通也徹也浹辰十二日也子協切三|𠗉𠗉𠗨又音狎|㼪半瓦
i5T呼牒弽弓弽呼牒切四|䁋閉一目|㛍少氣皃|偞偞卑
Q5T先頰䢡𨓊䢡走也先頰切一
#洽
j6T侯夾洽和也合也霑也侯夾切十四|䨐上同（和也合也霑也侯夾切十四）|狹隘狹|陜（隘狹）|陿並上同（隘狹）|祫祭名|峽巫峽山名|硤硤石縣亦州名秦將白起攻楚燒夷陵即其地魏武於此置臨江郡後魏爲拓州取開拓之義周以居三峽之口因爲峽州也|𢈙廦也|𪘘齒曲生又缺也|𤲍相著|烚火烚|珨蜃器|䞩走皃
e6T苦洽恰用心苦洽切十|掐爪掐|䁍目陷|㓣入也|䶢齧咋皃又噍聲|帢士服狀如弁缺四角魏武帝製魏志注云太祖以天下凶荒資財乏匱擬古皮弁裁縑帛以爲帢合乎簡易隨時之義以色別其貴賤本施軍飾非爲國容|𠕣（士服狀如弁缺四角魏武帝製魏志注云太祖以天下凶荒資財乏匱擬古皮弁裁縑帛以爲帢合乎簡易隨時之義以色別其貴賤本施軍飾非爲國容）|𢂿並上同（士服狀如弁缺四角魏武帝製魏志注云太祖以天下凶荒資財乏匱擬古皮弁裁縑帛以爲帢合乎簡易隨時之義以色別其貴賤本施軍飾非爲國容）|㡊亦上同埤蒼云帽也|𣁴𣁴斫
U6T士洽箑行書士洽切六|煠湯煠|䮢䮢䮢馬驟|渫水名出上黨郡|牐下牐閉城門也|𧼰行疾也
d6T古洽夾持也古洽切十五|郟郟鄏地名也又郟城縣在汝州又姓左傳鄭大夫郟張|筴箸也鍼箭具又音頰|韐韎韐韋蔽膝|𢂷上同（韎韐韋蔽膝）|跲躓礙|袷複衣說文曰衣無絮也|裌上同（複衣說文曰衣無絮也）|䀫眼細暗|餄餄餅|㿓㿓蹄足病|䶢噍聲也又苦沿切|鵊鳥名|䩡履根|鞈又公合切
S6T側洽眨目動側洽切六|㞚薄楔|偛偛㑳小人皃又楚立切|䙄䙄略絜朿皃|𥀈皺𥀈皮老|䛽䜞䛽多言
T6T楚洽插刺入楚洽切十|臿春去皮也或作疀俗作臿|疀上同爾雅曰𣂁謂之疀郭璞云皆古鍫鍤字（春去皮也或作疀俗作臿）|鍤上同（上同爾雅曰𣂁謂之疀郭璞云皆古鍫鍤字）|扱取也獲也舉也引也說文收也|笈負書箱又其劫切|㛼疾言失次也|㷅火乾|喢口喢|𤜯狗食
M6T女洽㘝手取物俗作𡆴女洽切四|𡤙𡤙𡤙美皃|㗙喢㗙小人言薄相|㑳偛㑳
i6T呼洽䶎䶎齁鼻息呼洽切四|欱欱甞|㰰氣逆|敮盡也
V6T山洽霎小雨山洽切七|歃歃血又山輒切|箑扇之別名|䈉上同（扇之別名）|萐萐莆瑞草王者孝德至則萐莆生於廚其葉大如門不搖自扇飲食|喢喢㗙小人言也|𧳛獸名
J6T竹洽劄刺著竹洽切三|𠍹𠍹𦤻忽觸人也|𧉫斑身小蟲
h6T烏洽𨂁跛行皃烏洽切四|凹下也或作容|浥波下又濕皃|圔圔窊聲下
gvR五冷䀴埤蒼云視皃五夾切一
K6T丑㘝𥃐味調肉菜出文字音義丑㘝切一
#狎
j7T胡甲狎習也說文曰犬可習也胡甲切十一|翈翮上短羽|霅眾言聲又丈甲切霅陽部在樂浪又音颯|𠗉𠗉𠗨冰凍相著|柙檻也所以藏虎兕也出說文|匣箱匣也|𧆥虎習搏也|𦾏𦾏𧃹|𢘉𢘉喜|炠火皃又呼甲切|笚竹名
L7T丈甲𠗨𠗉𠗨丈甲切六|喋啑喋鳧鴈食也啑所甲切|擖押擖重接皃|霅霅陽縣名又水名在吳興|𤁳水名|𧃹𦾏𧃹
h7T烏甲鴨水鳥或作𪀌𩿼𪁗烏甲切六|壓鎮也降也笮也壞也|庘屋壞也|䆘人神脉刺穴|閘開閉門出說文|押押署文字指歸云押字才能也
d7T古狎甲甲兵又狎也鎧也亦甲子爾雅曰太歲在甲曰閼逢又姓左傳鄭大夫甲石甫古狎切十|胛背胛|梜木理亂|押押籬壁也|𥑐山側|鉀鎧屬今單作甲|玾玉名|𨒇漢書人名|𠩘𠩘𠪮|𩌍𩌍䩖胡履
V7T所甲翣翣形如扇以木爲匡禮天子八諸侯六卿大夫四士二世本曰武王作翣所甲切八|𧲌豕母|啑啑喋|帹面衣|翜捷也|䬊風疾|㞚薄㞚|𧻵行𧻵𧻵
i7T呼甲呷喤呷眾聲說文曰吸呷也呼甲切四|譀誇誕|䛅𧬈䛅語聲|𣢗𣢗𣢗鼻息
#業
g8f魚怯業事也大也敘也次也始也敬也嚴也說文作𢄁大版也所以飾縣鐘鼓捷業如鋸齒以白畫之象其鉏鋙相承也詩曰巨業維樅又爾雅曰大版謂之業郭璞云築牆版也俗作㸣魚怯切十五|㸣見上注（事也大也敘也次也始也敬也嚴也說文作𢄁大版也所以飾縣鐘鼓捷業如鋸齒以白畫之象其鉏鋙相承也詩曰巨業維樅又爾雅曰大版謂之業郭璞云築牆版也俗作㸣魚怯切十五）|鄴縣名在相州又姓風俗通云漢有梁令鄴風|驜驜驜馬高大|嶪岌嶪山皃|𠟪續也|䧨危皃|㗼㗼動皃|𠄅引也|𩑃樂也|䲜魚盛|𢢜懼也|𩼋魚名|鸈鳥名知人吉凶|澲橫水大版
i8f虛業脅胷脅虛業切九|𣣲𣣲氣|𣢩上同（𣣲氣）|愶以威力相恐也|㢵弓弽皃|嗋口嗋嚇莊子曰余口張而不嗋|熁火氣熁上|𣹩水流|拹說文曰摺也一曰拉也
e8f去劫怯畏也去劫切九|㹤上同（畏也去劫切九）|抾挹也|呿臥聲又音去|魥以竹貫魚爲乾出復州界|胠胠篋見莊子|𠩂厓𠩂|㾀病劣|𤴼欠氣
d8f居怯劫強取也說文曰人欲去以力脅止曰劫或曰以力止去曰劫俗作刧居怯切九|衱衣領|袷上同（衣領）|蜐南越志云石蜐生石上形如龜腳得春雨則生也|跲躓也又巨業切|鉣帶鐵|砝硬也|𦀖𦀖䌜縫也|䀷視皃
h8f於業腌鹽漬魚也於業切十四|䱒上同（鹽漬魚也於業切十四）|罨魚網又烏合切|裛書囊也文字集略云裛坌衣香又於及於輒二切|䎨耕種|殗殗殜不動皃|㡋幧頭也|浥潤也|㪑㪑𣀳相著|䤶椎䤶田甲器|𩋊車具又於合切|𦤡𦤡臭也|餣餌也粢也|䁆閉目
l8T余業殜殗殜亦作𣩫余業切二|𩐱樂器
f8f巨業跲躓也巨業切五|㭘劒匣|昅㬤昅|极极插|笈書笈又初洽其輒二切
#乏
C9P房法乏匱也房法切三|泛水聲又孚梵切|姂好皃
A9P方乏法則也數也常也又姓左傳齊襄王法章之後秦滅齊子孫不敢稱故以法爲氏宣帝時徙三輔代爲二千石後漢有扶風法雄法子真並有傳方乏切二|灋上同（則也數也常也又姓左傳齊襄王法章之後秦滅齊子孫不敢稱故以法爲氏宣帝時徙三輔代爲二千石後漢有扶風法雄法子真並有傳方乏切二）
B9P孚法𥎰矢皃孚法切一
e8f起法猲恐受財史記云恐猲諸侯起法切又呼葛切二|姂好皃
M8T女法䎎飛上皃女法切三|𣹵㬁𣹵水皃|𡷝靜𡷝
K8T丑法𦑣𦑣䎎飛上皃丑法切一
`;

    const by原書小韻 = new Map();
    const by小韻 = new Map();
    (function 解析資料() {
        let 原書小韻號 = 0;
        let 韻目原貌 = '';
        let pos = 0;
        for (;;) {
            const posLF = raw資料.indexOf('\n', pos);
            if (posLF === -1) {
                break;
            }
            const line = raw資料.slice(pos, posLF + 1);
            pos = posLF + 1;
            if (line.startsWith('#')) {
                韻目原貌 = line.slice(1, -1);
                continue;
            }
            原書小韻號 += 1;
            const [, 音韻, 內容] = /^((?:[\w$@]{3}..)+)(.*\n)$/u.exec(line);
            const 各地位反切 = [];
            for (const [, 編碼str, 反切str] of 音韻.matchAll(/(...)(..)/gu)) {
                const 編碼 = 編碼str === '@@@' ? null : 編碼str;
                const 反切 = 反切str === '@@' ? null : 反切str;
                各地位反切.push([編碼, 反切]);
            }
            for (const [, 字頭, 細分, 釋義] of 內容.matchAll(/(.)([a-z]?)(.*?)[|\n]/gu)) {
                const 小韻號 = String(原書小韻號) + 細分;
                const 細分index = (細分 || 'a').charCodeAt(0) - 'a'.charCodeAt(0);
                const [音韻編碼, 反切] = 各地位反切[細分index];
                const 條目 = { 字頭, 音韻編碼, 反切, 釋義, 小韻號, 韻目原貌 };
                insertInto(by原書小韻, 原書小韻號, 條目);
                insertInto(by小韻, 小韻號, 條目);
            }
        }
    })();

    const 編碼表 = [...'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_'];
    const 韻序表 = [
        ...'東＊冬鍾江支脂之微魚虞模齊祭泰佳皆夬灰咍廢真臻文殷元魂痕寒刪山先仙蕭宵肴豪歌＊麻＊陽唐庚＊耕清青蒸登尤侯幽侵覃談鹽添咸銜嚴凡',
    ];
    /**
     * 將音韻地位編碼為壓縮格式串。音韻編碼與音韻地位之間存在一一映射關係。
     * @param 地位 待編碼的音韻地位
     * @returns 音韻地位對應的編碼
     * @example
     * ```typescript
     * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
     * > TshetUinh.壓縮表示.encode音韻編碼(音韻地位);
     * 'A9P'
     * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
     * > TshetUinh.壓縮表示.encode音韻編碼(音韻地位);
     * 'fFU'
     * ```
     */
    function encode音韻編碼(地位) {
        const { 母, 呼, 等, 類, 韻, 聲 } = 地位;
        const 母序 = 所有.母.indexOf(母);
        const 韻序 = 韻序表.indexOf(韻) + +([...'東歌麻庚'].includes(韻) && !['一', '二'].includes(等));
        // NOTE the value `-1` is expected when the argument is `null`
        const 呼序 = 所有.呼.indexOf(呼) + 1;
        const 類序 = 所有.類.indexOf(類) + 1;
        const 呼類聲序 = (呼序 << 4) | (類序 << 2) | 所有.聲.indexOf(聲);
        return 編碼表[母序] + 編碼表[韻序] + 編碼表[呼類聲序];
    }
    /**
     * 將音韻編碼解碼回音韻地位。
     * @param 編碼 音韻地位的編碼
     * @returns 給定的音韻編碼對應的音韻地位
     * @example
     * ```typescript
     * > TshetUinh.壓縮表示.decode音韻編碼('A9P');
     * 音韻地位<幫三C凡入>
     * > TshetUinh.壓縮表示.decode音韻編碼('fFU');
     * 音韻地位<羣開三A支平>
     * ```
     */
    function decode音韻編碼(編碼) {
        assert(編碼.length === 3, () => `Invalid 編碼: ${JSON.stringify(編碼)}`);
        const [母序, 韻序, 呼類聲序] = [...編碼].map(ch => {
            const index = 編碼表.indexOf(ch);
            assert(index !== -1, () => `Invalid character in 編碼: ${JSON.stringify(ch)}`);
            return index;
        });
        assert(母序 < 所有.母.length, () => `Invalid 母序號: ${母序}`);
        const 母 = 所有.母[母序];
        assert(韻序 < 韻序表.length, () => `Invalid 韻序號: ${韻序}`);
        let 韻 = 韻序表[韻序];
        if (韻 === '＊') {
            韻 = 韻序表[韻序 - 1];
        }
        let 等;
        for (const [韻等, 各韻] of Object.entries(等韻搭配)) {
            if (各韻.includes(韻)) {
                等 = 韻等[+(韻序表[韻序] === '＊')];
                if (等 === '三' && [...'端透定泥'].includes(母)) {
                    等 = '四';
                }
                break;
            }
        }
        const 呼序 = 呼類聲序 >> 4;
        assert(呼序 <= 所有.呼.length, () => `Invalid 呼序號: ${呼序}`);
        const 呼 = 呼序 ? 所有.呼[呼序 - 1] : null;
        const 類序 = (呼類聲序 >> 2) & 0b11;
        assert(類序 <= 所有.類.length, () => `Invalid 類序號: ${類序}`);
        const 類 = 類序 ? 所有.類[類序 - 1] : null;
        const 聲序 = 呼類聲序 & 0b11;
        const 聲 = 所有.聲[聲序];
        // NOTE type assertion safe because the constructor checks it
        return new 音韻地位(母, 呼, 等, 類, 韻, 聲, _UNCHECKED);
    }

    var ____ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        decode音韻編碼: decode音韻編碼,
        encode音韻編碼: encode音韻編碼
    });

    /** 按原書順序遍歷全部廣韻條目。 */
    function* iter條目() {
        for (const 原書小韻 of iter原書小韻()) {
            yield* 原書小韻;
        }
    }
    /**
     * 遍歷全部小韻號。
     *
     * 細分小韻（見 {@link get小韻}）拆分為不同小韻，有各自的小韻號。
     */
    function iter小韻號() {
        return by小韻.keys();
    }
    /**
     * 依小韻號獲取條目。
     *
     * 部分小韻含多個音韻地位，會依音韻地位拆分，並有細分號（後綴 -a、-b 等），故為字串格式。
     *
     * @returns 該小韻所有條目。若小韻號不存在，回傳 `undefined`。
     * @example
     * ```typescript
     * > TshetUinh.資料.廣韻.get小韻('3708b');
     * [
     *   {
     *     字頭: '抑',
     *     音韻地位: 音韻地位<影開三B蒸入>,
     *     反切: '於力',
     *     釋義: '按也說文作𢑏从反印',
     *     來源: { 文獻: '廣韻', '小韻號': '3708b', 韻目: '職' },
     *   },
     *   {
     *     字頭: '𡊁',
     *     音韻地位: 音韻地位<影開三B蒸入>,
     *     反切: '於力',
     *     釋義: '地名',
     *     來源: { 文獻: '廣韻', 小韻號: '3708b', 韻目: '職' },
     *   },
     * ]
     * ```
     */
    function get小韻(小韻號) {
        return by小韻.get(小韻號)?.map(條目from內部條目);
    }
    /**
     * 遍歷全部小韻（細分小韻均拆分）。即對資料中全部小韻執行 {@link get小韻}。
     */
    function* iter小韻() {
        for (const 小韻號 of iter小韻號()) {
            yield get小韻(小韻號);
        }
    }
    /** 原書小韻總數。細分小韻（含多個音韻地位的小韻）不拆分，計為一個小韻。 */
    const 原書小韻總數 = by原書小韻.size;
    /**
     * 依原書小韻號獲取條目。
     *
     * 細分小韻（含多個音韻地位的小韻）不拆分，視為同一小韻。
     *
     * @param 原書小韻號 數字，應在 1 至 {@link 原書小韻總數}（含）之間。
     * @returns 該原書小韻所有條目
     */
    function get原書小韻(原書小韻號) {
        return by原書小韻.get(原書小韻號)?.map(條目from內部條目);
    }
    /**
     * 遍歷全部原書小韻（細分小韻不拆分）。即對資料中全部原書小韻執行 {@link get原書小韻}。
     */
    function* iter原書小韻() {
        for (let i = 1; i <= 原書小韻總數; i++) {
            yield get原書小韻(i);
        }
    }
    function 條目from內部條目(內部條目) {
        const { 字頭, 音韻編碼, 小韻號, 韻目原貌, ...rest } = 內部條目;
        return {
            字頭,
            音韻地位: 音韻編碼 === null ? null : decode音韻編碼(音韻編碼),
            ...rest,
            來源: { 文獻: '廣韻', 小韻號, 韻目: 韻目原貌 },
        };
    }

    var __$1 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        get原書小韻: get原書小韻,
        get小韻: get小韻,
        iter原書小韻: iter原書小韻,
        iter小韻: iter小韻,
        iter小韻號: iter小韻號,
        iter條目: iter條目,
        原書小韻總數: 原書小韻總數
    });

    const m字頭檢索 = new Map();
    const m音韻編碼檢索 = new Map();
    (function 廣韻索引() {
        for (const 原書小韻 of by原書小韻.values()) {
            for (const 廣韻條目 of 原書小韻) {
                if (廣韻條目.音韻編碼 === null) {
                    continue;
                }
                const { 字頭, 音韻編碼: 編碼, 小韻號, 韻目原貌, ...rest } = 廣韻條目;
                const 條目 = { 字頭, 編碼, ...rest, 來源: { 文獻: '廣韻', 小韻號, 韻目: 韻目原貌 } };
                insertInto(m字頭檢索, 字頭, 條目);
                insertInto(m音韻編碼檢索, 編碼, 條目);
            }
        }
    })();
    (function 早期廣韻外字() {
        const by字頭 = new Map();
        for (const [字頭, 描述, 反切, 釋義, 小韻號, 韻目] of [
            ['忘', '明三C陽平', '武方', '遺又武放不記曰忘', '797', '陽'],
            ['韻', '云合三B真去', '爲捃', '為捃反音和一', '2420', '震'],
        ]) {
            const 編碼 = encode音韻編碼(音韻地位.from描述(描述));
            const record = { 字頭, 編碼, 反切, 釋義, 來源: { 文獻: '王三', 小韻號, 韻目 } };
            insertInto(by字頭, 字頭, record);
            insertInto(m音韻編碼檢索, 編碼, record);
        }
        for (const [字頭, 各條目] of by字頭.entries()) {
            prependValuesInto(m字頭檢索, 字頭, 各條目);
        }
    })();
    function 結果from內部結果(內部結果) {
        const { 字頭, 編碼, 來源, ...rest } = 內部結果;
        return {
            字頭,
            音韻地位: decode音韻編碼(編碼),
            ...rest,
            來源: 來源 ? { ...來源 } : null,
        };
    }
    /**
     * 遍歷內置資料中全部有字之音韻地位。
     * @returns 迭代器，所有至少對應一個字頭的音韻地位
     */
    function* iter音韻地位() {
        for (const 音韻編碼 of m音韻編碼檢索.keys()) {
            yield decode音韻編碼(音韻編碼);
        }
    }
    /**
     * 由字頭查出相應的音韻地位、反切、解釋。
     * @param 字頭 待查找的漢字
     * @returns 陣列，每一項包含音韻地位和解釋
     *
     * 若查不到該字，則回傳空陣列。
     * @example
     * ```typescript
     * > TshetUinh.資料.query字頭('結');
     * [ {
     *   字頭: '結',
     *   音韻地位: 音韻地位<見開四先入>,
     *   反切: '古屑',
     *   釋義: '締也古屑切十五',
     *   來源: { 文獻: '廣韻', 小韻號: '3469', 韻目: '屑' },
     * } ]
     * > TshetUinh.資料.query字頭('冷');
     * [
     *   {
     *     字頭: '冷',
     *     音韻地位: 音韻地位<來開四青平>,
     *     反切: '郎丁',
     *     釋義: '冷凙吳人云冰凌又力頂切',
     *     來源: { 文獻: '廣韻', 小韻號: '939', 韻目: '青' },
     *   },
     *   {
     *     字頭: '冷',
     *     音韻地位: 音韻地位<來開二庚上>,
     *     反切: '魯打',
     *     釋義: '寒也魯打切又魯頂切一',
     *     來源: { 文獻: '廣韻', 小韻號: '1872', 韻目: '梗' },
     *   },
     *   {
     *     字頭: '冷',
     *     音韻地位: 音韻地位<來開四青上>,
     *     反切: '力鼎',
     *     釋義: '寒也又姓前趙錄有徐州刺史冷道字安義又盧打切',
     *     來源: { 文獻: '廣韻', 小韻號: '1915', 韻目: '迥' },
     *   },
     * ]
     * ```
     */
    function query字頭(字頭) {
        return m字頭檢索.get(字頭)?.map(結果from內部結果) ?? [];
    }
    /**
     * 查詢音韻地位對應的字頭、反切、解釋。
     *
     * @param 地位 待查詢的音韻地位
     *
     * @returns 陣列，每一項包含音韻地位和解釋
     *
     * 若音韻地位有音無字，則值為空陣列。
     * @example
     * ```typescript
     * > 地位 = TshetUinh.音韻地位.from描述('影開二銜去');
     * > TshetUinh.資料.query音韻地位(地位);
     * [ {
     *   字頭: '𪒠',
     *   音韻地位: 音韻地位<影開二銜去>,
     *   反切: null,
     *   解釋: '叫呼仿佛𪒠然自得音黯去聲一',
     *   來源: { 文獻: '廣韻', 小韻號: '3177', 韻目: '鑑' },
     * } ]
     * ```
     */
    function query音韻地位(地位) {
        return m音韻編碼檢索.get(encode音韻編碼(地位))?.map(結果from內部結果) ?? [];
    }

    var __ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        iter音韻地位: iter音韻地位,
        query字頭: query字頭,
        query音韻地位: query音韻地位,
        廣韻: __$1
    });

    /**
     * 預定義的常用表達式，可用於 `音韻地位.屬於`。
     *
     * @example
     * ```typescript
     * > const { 分開合韻, 合口韻 } = TshetUinh.表達式;
     * > const 地位 = TshetUinh.音韻地位.from描述('羣合三C文平');
     * > 地位.屬於`${分開合韻} 非 ${開合中立韻}`
     * true
     * ```
     *
     * @module 表達式
     */
    /** 一等韻 */
    const 一等韻 = 等韻搭配.一.join('') + '韻';
    /** 二等韻 */
    const 二等韻 = 等韻搭配.二.join('') + '韻';
    /** 三等韻（注意：拼端組時為四等） */
    const 三等韻 = 等韻搭配.三.join('') + '韻';
    /** 四等韻 */
    const 四等韻 = 等韻搭配.四.join('') + '韻';
    /** 一三等韻 */
    const 一三等韻 = 等韻搭配.一三.join('') + '韻';
    /** 二三等韻（注意：拼端組時為二四等） */
    const 二三等韻 = 等韻搭配.二三.join('') + '韻';
    /**
     * 韻內分開合口的韻
     */
    const 分開合韻 = 呼韻搭配.開合.join('') + '韻';
    /**
     * 僅為開口的韻（含之、魚韻及效、深、咸攝諸韻）
     */
    const 開口韻 = 呼韻搭配.開.join('') + '韻';
    /**
     * 僅為合口的韻
     */
    const 合口韻 = 呼韻搭配.合.join('') + '韻';
    /**
     * 開合中立韻（東冬鍾江模尤侯）
     */
    const 開合中立韻 = 呼韻搭配.中立.join('') + '韻';

    var _____ = /*#__PURE__*/Object.freeze({
        __proto__: null,
        一三等韻: 一三等韻,
        一等韻: 一等韻,
        三等韻: 三等韻,
        二三等韻: 二三等韻,
        二等韻: 二等韻,
        分開合韻: 分開合韻,
        合口韻: 合口韻,
        四等韻: 四等韻,
        開口韻: 開口韻,
        開合中立韻: 開合中立韻
    });

    var TshetUinh = /*#__PURE__*/Object.freeze({
        __proto__: null,
        壓縮表示: ____,
        表達式: _____,
        資料: __,
        音韻地位: 音韻地位
    });

    exports.default = TshetUinh;
    exports.壓縮表示 = ____;
    exports.表達式 = _____;
    exports.資料 = __;
    exports.音韻地位 = 音韻地位;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
