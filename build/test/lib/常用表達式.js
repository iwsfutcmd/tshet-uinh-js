"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.開合中立韻 = exports.合口韻 = exports.開口韻 = exports.分開合韻 = exports.二三等韻 = exports.一三等韻 = exports.四等韻 = exports.三等韻 = exports.二等韻 = exports.一等韻 = void 0;
const ______1 = require("./\u97F3\u97FB\u5C6C\u6027\u5E38\u91CF");
/** 一等韻 */
exports.一等韻 = ______1.等韻搭配.一.join('') + '韻';
/** 二等韻 */
exports.二等韻 = ______1.等韻搭配.二.join('') + '韻';
/** 三等韻（注意：拼端組時為四等） */
exports.三等韻 = ______1.等韻搭配.三.join('') + '韻';
/** 四等韻 */
exports.四等韻 = ______1.等韻搭配.四.join('') + '韻';
/** 一三等韻 */
exports.一三等韻 = ______1.等韻搭配.一三.join('') + '韻';
/** 二三等韻（注意：拼端組時為二四等） */
exports.二三等韻 = ______1.等韻搭配.二三.join('') + '韻';
/**
 * 韻內分開合口的韻
 */
exports.分開合韻 = ______1.呼韻搭配.開合.join('') + '韻';
/**
 * 僅為開口的韻（含之、魚韻及效、深、咸攝諸韻）
 */
exports.開口韻 = ______1.呼韻搭配.開.join('') + '韻';
/**
 * 僅為合口的韻
 */
exports.合口韻 = ______1.呼韻搭配.合.join('') + '韻';
/**
 * 開合中立韻（東冬鍾江模尤侯）
 */
exports.開合中立韻 = ______1.呼韻搭配.中立.join('') + '韻';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi5bi455So6KGo6YGU5byPLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi/luLjnlKjooajpgZTlvI8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7R0FZRzs7O0FBRUgsa0VBQXNDO0FBRXRDLFVBQVU7QUFDRyxRQUFBLEdBQUcsR0FBRyxZQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDekMsVUFBVTtBQUNHLFFBQUEsR0FBRyxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN6QyxzQkFBc0I7QUFDVCxRQUFBLEdBQUcsR0FBRyxZQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDekMsVUFBVTtBQUNHLFFBQUEsR0FBRyxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN6QyxXQUFXO0FBQ0UsUUFBQSxJQUFJLEdBQUcsWUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzNDLHdCQUF3QjtBQUNYLFFBQUEsSUFBSSxHQUFHLFlBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUUzQzs7R0FFRztBQUNVLFFBQUEsSUFBSSxHQUFHLFlBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUMzQzs7R0FFRztBQUNVLFFBQUEsR0FBRyxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN6Qzs7R0FFRztBQUNVLFFBQUEsR0FBRyxHQUFHLFlBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUN6Qzs7R0FFRztBQUNVLFFBQUEsS0FBSyxHQUFHLFlBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyJ9