"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode音韻編碼 = encode音韻編碼;
exports.decode音韻編碼 = decode音韻編碼;
const utils_1 = require("./utils");
const ____1 = require("./\u97F3\u97FB\u5730\u4F4D");
const ______1 = require("./\u97F3\u97FB\u5C6C\u6027\u5E38\u91CF");
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
    const 母序 = ______1.所有.母.indexOf(母);
    const 韻序 = 韻序表.indexOf(韻) + +([...'東歌麻庚'].includes(韻) && !['一', '二'].includes(等));
    // NOTE the value `-1` is expected when the argument is `null`
    const 呼序 = ______1.所有.呼.indexOf(呼) + 1;
    const 類序 = ______1.所有.類.indexOf(類) + 1;
    const 呼類聲序 = (呼序 << 4) | (類序 << 2) | ______1.所有.聲.indexOf(聲);
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
    (0, utils_1.assert)(編碼.length === 3, () => `Invalid 編碼: ${JSON.stringify(編碼)}`);
    const [母序, 韻序, 呼類聲序] = [...編碼].map(ch => {
        const index = 編碼表.indexOf(ch);
        (0, utils_1.assert)(index !== -1, () => `Invalid character in 編碼: ${JSON.stringify(ch)}`);
        return index;
    });
    (0, utils_1.assert)(母序 < ______1.所有.母.length, () => `Invalid 母序號: ${母序}`);
    const 母 = ______1.所有.母[母序];
    (0, utils_1.assert)(韻序 < 韻序表.length, () => `Invalid 韻序號: ${韻序}`);
    let 韻 = 韻序表[韻序];
    if (韻 === '＊') {
        韻 = 韻序表[韻序 - 1];
    }
    let 等;
    for (const [韻等, 各韻] of Object.entries(______1.等韻搭配)) {
        if (各韻.includes(韻)) {
            等 = 韻等[+(韻序表[韻序] === '＊')];
            if (等 === '三' && [...'端透定泥'].includes(母)) {
                等 = '四';
            }
            break;
        }
    }
    const 呼序 = 呼類聲序 >> 4;
    (0, utils_1.assert)(呼序 <= ______1.所有.呼.length, () => `Invalid 呼序號: ${呼序}`);
    const 呼 = 呼序 ? ______1.所有.呼[呼序 - 1] : null;
    const 類序 = (呼類聲序 >> 2) & 0b11;
    (0, utils_1.assert)(類序 <= ______1.所有.類.length, () => `Invalid 類序號: ${類序}`);
    const 類 = 類序 ? ______1.所有.類[類序 - 1] : null;
    const 聲序 = 呼類聲序 & 0b11;
    const 聲 = ______1.所有.聲[聲序];
    // NOTE type assertion safe because the constructor checks it
    return new ____1.音韻地位(母, 呼, 等, 類, 韻, 聲, ____1._UNCHECKED);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi5aOT57iu6KGo56S6LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi/lo5PnuK7ooajnpLoudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUF1QkEsZ0NBWUM7QUFjRCxnQ0F3Q0M7QUF6RkQsbUNBQWlDO0FBQ2pDLG9EQUEwQztBQUMxQyxrRUFBb0M7QUFFcEMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxHQUFHLGtFQUFrRSxDQUFVLENBQUM7QUFDN0YsTUFBTSxHQUFHLEdBQUc7SUFDVixHQUFHLGdFQUFnRTtDQUMzRCxDQUFDO0FBRVg7Ozs7Ozs7Ozs7Ozs7R0FhRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxFQUFRO0lBQ2pDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztJQUNoQyxNQUFNLEVBQUUsR0FBRyxVQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQixNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFbEYsOERBQThEO0lBQzlELE1BQU0sRUFBRSxHQUFHLFVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoQyxNQUFNLEVBQUUsR0FBRyxVQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFFLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEMsTUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLElB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