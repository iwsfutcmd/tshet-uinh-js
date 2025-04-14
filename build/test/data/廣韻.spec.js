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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fs_1 = require("node:fs");
const ava_1 = __importDefault(require("ava"));
const 廣韻 = __importStar(require("./\u5EE3\u97FB"));
(0, ava_1.default)('檢索廣韻小韻', t => {
    const 小韻3708a = 廣韻.get小韻('3708a');
    const 小韻3708b = 廣韻.get小韻('3708b');
    t.is(小韻3708a.length, 15);
    t.is(小韻3708a[0].字頭, '憶');
    t.is(小韻3708b.length, 2);
    t.is(小韻3708b[0].字頭, '抑');
    const collect字頭 = (結果) => 結果.map(x => x.字頭);
    const 原書小韻3708 = 廣韻.get原書小韻(3708);
    t.is(原書小韻3708.length, 17);
    t.deepEqual([...collect字頭(小韻3708a), ...collect字頭(小韻3708b)].sort(), collect字頭(原書小韻3708).sort());
    const 小韻597 = 廣韻.get小韻('597');
    t.deepEqual(collect字頭(小韻597), ['𤜼']);
    t.is(小韻597[0].音韻地位, null);
});
(0, ava_1.default)('原書小韻總數', t => {
    t.is(廣韻.原書小韻總數, 3874);
});
(0, ava_1.default)('對照 iter原書小韻 與 iter條目', t => {
    const it1 = 廣韻.iter原書小韻();
    const it2 = 廣韻.iter條目();
    for (const 原書小韻 of it1) {
        for (const 條目1 of 原書小韻) {
            const next = it2.next();
            t.falsy(next.done);
            const 條目2 = next.value;
            t.is(條目1.來源.小韻號, 條目2.來源.小韻號);
            t.is(條目1.來源.韻目, 條目2.來源.韻目);
            t.is(條目1.音韻地位?.描述, 條目2.音韻地位?.描述);
            t.is(條目1.反切, 條目2.反切);
            t.is(條目1.字頭, 條目2.字頭);
            t.is(條目1.釋義, 條目2.釋義);
        }
    }
});
(0, ava_1.default)('對照原資料檔與 iter條目', t => {
    const 條目iter = 廣韻.iter條目();
    for (const line of (0, node_fs_1.readFileSync)('prepare/data.csv', { encoding: 'utf8' }).trimEnd().split('\n').slice(1)) {
        const [小韻號, , 韻目原貌, 地位描述, 反切, 字頭, 釋義, 釋義補充] = line.split(',');
        const next = 條目iter.next();
        t.falsy(next.done);
        const 條目 = next.value;
        t.is(條目.來源.小韻號, 小韻號);
        t.is(條目.來源.韻目, 韻目原貌);
        t.is(條目.音韻地位?.描述 ?? '', 地位描述);
        t.is(條目.反切, 反切 || null);
        t.is(條目.字頭, 字頭);
        t.is(條目.釋義, 釋義 + (釋義補充 && `（${釋義補充}）`));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi5buj6Z+7LnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YS/lu6Ppn7suc3BlYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBRXZDLDhDQUF1QjtBQUV2QixtREFBMkI7QUFFM0IsSUFBQSxhQUFJLEVBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ2pCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFFLENBQUM7SUFDbkMsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDekIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFFekIsTUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFhLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFdkQsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUUsQ0FBQztJQUNuQyxDQUFDLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDMUIsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLE9BQU8s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QUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsTUFBTSxFQUFFLEdBQUksSUFBcUMsQ0FBQyxLQUFLLENBQUM7UUFDeEQsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3JCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksSUFBSSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFDIn0=