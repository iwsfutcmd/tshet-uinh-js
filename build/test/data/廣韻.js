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
exports.原書小韻總數 = void 0;
exports.iter條目 = iter條目;
exports.iter小韻號 = iter小韻號;
exports.get小韻 = get小韻;
exports.iter小韻 = iter小韻;
exports.get原書小韻 = get原書小韻;
exports.iter原書小韻 = iter原書小韻;
const ____1 = require("../lib/\u58D3\u7E2E\u8868\u793A");
const impl = __importStar(require("./\u5EE3\u97FBimpl"));
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
    return impl.by小韻.keys();
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
    return impl.by小韻.get(小韻號)?.map(條目from內部條目);
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
exports.原書小韻總數 = impl.by原書小韻.size;
/**
 * 依原書小韻號獲取條目。
 *
 * 細分小韻（含多個音韻地位的小韻）不拆分，視為同一小韻。
 *
 * @param 原書小韻號 數字，應在 1 至 {@link 原書小韻總數}（含）之間。
 * @returns 該原書小韻所有條目
 */
function get原書小韻(原書小韻號) {
    return impl.by原書小韻.get(原書小韻號)?.map(條目from內部條目);
}
/**
 * 遍歷全部原書小韻（細分小韻不拆分）。即對資料中全部原書小韻執行 {@link get原書小韻}。
 */
function* iter原書小韻() {
    for (let i = 1; i <= exports.原書小韻總數; i++) {
        yield get原書小韻(i);
    }
}
function 條目from內部條目(內部條目) {
    const { 字頭, 音韻編碼, 小韻號, 韻目原貌, ...rest } = 內部條目;
    return {
        字頭,
        音韻地位: 音韻編碼 === null ? null : (0, ____1.decode音韻編碼)(音韻編碼),
        ...rest,
        來源: { 文獻: '廣韻', 小韻號, 韻目: 韻目原貌 },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi5buj6Z+7LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGEv5buj6Z+7LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLHdCQUlDO0FBT0QsMEJBRUM7QUE2QkQsc0JBRUM7QUFLRCx3QkFJQztBQWFELDBCQUVDO0FBS0QsNEJBSUM7QUF6R0QseURBQXlDO0FBR3pDLHlEQUFpQztBQXdCakMscUJBQXFCO0FBQ3JCLFFBQWUsQ0FBQyxDQUFDLE1BQU07SUFDckIsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUUsRUFBRSxDQUFDO1FBQzlCLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7QUFDSCxDQUFDO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLE9BQU87SUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQzFCLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFDSCxTQUFnQixLQUFLLENBQUMsR0FBVztJQUMvQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QyxDQUFDO0FBRUQ7O0dBRUc7QUFDSCxRQUFlLENBQUMsQ0FBQyxNQUFNO0lBQ3JCLEtBQUssTUFBTSxHQUFHLElBQUksT0FBTyxFQUFFLEVBQUUsQ0FBQztRQUM1QixNQUFNLEtBQUssQ0FBQyxHQUFHLENBQUUsQ0FBQztJQUNwQixDQUFDO0FBQ0gsQ0FBQztBQUVELHlDQUF5QztBQUM1QixRQUFBLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztBQUV2Qzs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsT0FBTyxDQUFDLEtBQWE7SUFDbkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUVEOztHQUVHO0FBQ0gsUUFBZSxDQUFDLENBQUMsUUFBUTtJQUN2QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksY0FBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7UUFDakMsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFFLENBQUM7SUFDcEIsQ0FBQztBQUNILENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxJQUFpQjtJQUNuQyxNQUFNLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO0lBQzlDLE9BQU87UUFDTCxFQUFFO1FBQ0YsSUFBSSxFQUFFLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBQSxnQkFBVSxFQUFDLElBQUksQ0FBQztRQUM3QyxHQUFHLElBQUk7UUFDUCxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFO0tBQ3pDLENBQUM7QUFDSixDQUFDIn0=