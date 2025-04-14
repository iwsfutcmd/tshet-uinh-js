"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.廣韻 = void 0;
exports.iter音韻地位 = iter音韻地位;
exports.query字頭 = query字頭;
exports.query音韻地位 = query音韻地位;
const 廣韻impl = __importStar(require("../data/\u5EE3\u97FBimpl"));
const utils_1 = require("./utils");
const ____1 = require("./\u58D3\u7E2E\u8868\u793A");
const ____2 = require("./\u97F3\u97FB\u5730\u4F4D");
exports.廣韻 = __importStar(require("../data/\u5EE3\u97FB"));
const m字頭檢索 = new Map();
const m音韻編碼檢索 = new Map();
(function 廣韻索引() {
    for (const 原書小韻 of 廣韻impl.by原書小韻.values()) {
        for (const 廣韻條目 of 原書小韻) {
            if (廣韻條目.音韻編碼 === null) {
                continue;
            }
            const { 字頭, 音韻編碼: 編碼, 小韻號, 韻目原貌, ...rest } = 廣韻條目;
            const 條目 = { 字頭, 編碼, ...rest, 來源: { 文獻: '廣韻', 小韻號, 韻目: 韻目原貌 } };
            (0, utils_1.insertInto)(m字頭檢索, 字頭, 條目);
            (0, utils_1.insertInto)(m音韻編碼檢索, 編碼, 條目);
        }
    }
})();
(function 早期廣韻外字() {
    const by字頭 = new Map();
    for (const [字頭, 描述, 反切, 釋義, 小韻號, 韻目] of [
        ['忘', '明三C陽平', '武方', '遺又武放不記曰忘', '797', '陽'],
        ['韻', '云合三B真去', '爲捃', '為捃反音和一', '2420', '震'],
    ]) {
        const 編碼 = (0, ____1.encode音韻編碼)(____2.音韻地位.from描述(描述));
        const record = { 字頭, 編碼, 反切, 釋義, 來源: { 文獻: '王三', 小韻號, 韻目 } };
        (0, utils_1.insertInto)(by字頭, 字頭, record);
        (0, utils_1.insertInto)(m音韻編碼檢索, 編碼, record);
    }
    for (const [字頭, 各條目] of by字頭.entries()) {
        (0, utils_1.prependValuesInto)(m字頭檢索, 字頭, 各條目);
    }
})();
function 結果from內部結果(內部結果) {
    const { 字頭, 編碼, 來源, ...rest } = 內部結果;
    return {
        字頭,
        音韻地位: (0, ____1.decode音韻編碼)(編碼),
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
        yield (0, ____1.decode音韻編碼)(音韻編碼);
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
    return m音韻編碼檢索.get((0, ____1.encode音韻編碼)(地位))?.map(結果from內部結果) ?? [];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi6LOH5paZLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi/os4fmlpkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyRUEsNEJBSUM7QUE0Q0QsMEJBRUM7QUF1QkQsOEJBRUM7QUFySkQsaUVBQXlDO0FBRXpDLG1DQUF3RDtBQUN4RCxvREFBZ0Q7QUFDaEQsb0RBQThCO0FBRTlCLDJEQUFpQztBQW9CakMsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7QUFDMUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLEVBQW9CLENBQUM7QUFFNUMsQ0FBQyxTQUFTLElBQUk7SUFDWixLQUFLLE1BQU0sSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUMxQyxLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDO1lBQ3hCLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLEVBQUUsQ0FBQztnQkFDdkIsU0FBUztZQUNYLENBQUM7WUFDRCxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztZQUNsRCxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7WUFDekUsSUFBQSxrQkFBVSxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUIsSUFBQSxrQkFBVSxFQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNILENBQUM7QUFDSCxDQUFDLENBQUMs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