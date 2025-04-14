"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.by小韻 = exports.by原書小韻 = void 0;
const utils_1 = require("../lib/utils");
const __1 = __importDefault(require("./raw/\u5EE3\u97FB"));
exports.by原書小韻 = new Map();
exports.by小韻 = new Map();
(function 解析資料() {
    let 原書小韻號 = 0;
    let 韻目原貌 = '';
    let pos = 0;
    for (;;) {
        const posLF = __1.default.indexOf('\n', pos);
        if (posLF === -1) {
            break;
        }
        const line = __1.default.slice(pos, posLF + 1);
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
            (0, utils_1.insertInto)(exports.by原書小韻, 原書小韻號, 條目);
            (0, utils_1.insertInto)(exports.by小韻, 小韻號, 條目);
        }
    }
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi5buj6Z+7aW1wbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhL+W7o+mfu2ltcGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0NBQTBDO0FBRTFDLDJEQUE2QjtBQVdoQixRQUFBLE1BQU0sR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztBQUNyQyxRQUFBLElBQUksR0FBRyxJQUFJLEdBQUcsRUFBb0IsQ0FBQztBQUVoRCxDQUFDLFNBQVMsSUFBSTtJQUNaLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztJQUNkLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQztJQUNkLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLFNBQVMsQ0FBQztRQUNSLE1BQU0sS0FBSyxHQUFHLFdBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDakIsTUFBTTtRQUNSLENBQUM7UUFDRCxNQUFNLElBQUksR0FBRyxXQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDekMsR0FBRyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7UUFFaEIsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDekIsSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekIsU0FBUztRQUNYLENBQUM7UUFDRCxLQUFLLElBQUksQ0FBQyxDQUFDO1FBRVgsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxHQUFHLDZCQUE2QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQztRQUM3RCxNQUFNLEtBQUssR0FBcUMsRUFBRSxDQUFDO1FBQ25ELEtBQUssTUFBTSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQztZQUMxRCxNQUFNLEVBQUUsR0FBRyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMxQyxNQUFNLEVBQUUsR0FBRyxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUN6QyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkIsQ0FBQztRQUNELEtBQUssTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLHlCQUF5QixDQUFDLEVBQUUsQ0FBQztZQUNwRSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQy9CLE1BQU0sT0FBTyxHQUFHLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2xDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQztZQUMzQyxJQUFBLGtCQUFVLEVBQUMsY0FBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztZQUM5QixJQUFBLGtCQUFVLEVBQUMsWUFBSSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQyxFQUFFLENBQUMifQ==