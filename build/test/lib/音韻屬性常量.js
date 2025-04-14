"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.等母搭配 = exports.呼韻搭配 = exports.等韻搭配 = exports.陰聲韻 = exports.鈍音母 = exports.所有 = void 0;
/** 全部六要素之枚舉 */
exports.所有 = {
    母: [...'幫滂並明端透定泥來知徹澄孃精清從心邪莊初崇生俟章昌常書船日見溪羣疑影曉匣云以'],
    呼: [...'開合'],
    等: [...'一二三四'],
    類: [...'ABC'],
    韻: [...'東冬鍾江支脂之微魚虞模齊祭泰佳皆夬灰咍廢真臻文殷元魂痕寒刪山先仙蕭宵肴豪歌麻陽唐庚耕清青蒸登尤侯幽侵覃談鹽添咸銜嚴凡'],
    聲: [...'平上去入'],
};
/** 幫見影組聲母，在三等分ABC類 */
exports.鈍音母 = [...'幫滂並明見溪羣疑影曉匣云'];
exports.陰聲韻 = [...'支脂之微魚虞模齊祭泰佳皆夬灰咍廢蕭宵肴豪歌麻侯尤幽'];
/** 依可搭配的等列出各韻 */
exports.等韻搭配 = {
    一: [...'冬模泰灰咍魂痕寒豪唐登侯覃談'],
    二: [...'江佳皆夬刪山肴耕咸銜'],
    三: [...'鍾支脂之微魚虞祭廢真臻文殷元仙宵陽清蒸尤幽侵鹽嚴凡'],
    四: [...'齊先蕭青添'],
    一三: [...'東歌'],
    二三: [...'麻庚'],
};
/** 依可搭配的呼列出各韻 */
exports.呼韻搭配 = {
    開合: [...'支脂微齊祭泰佳皆夬廢真元寒刪山先仙歌麻陽唐庚耕清青蒸登'],
    開: [...'之魚咍臻殷痕蕭宵肴豪幽侵覃談鹽添咸銜嚴'],
    合: [...'虞灰文魂凡'],
    中立: [...'東冬鍾江模尤侯'],
};
/** 依可搭配的等列出各母，包含邊緣搭配 */
exports.等母搭配 = {
    一二三四: [...'幫滂並明來見溪羣疑影曉匣'],
    二三: [...'知徹澄孃莊初崇生俟'],
    一三四: [...'精清從心邪'],
    三: [...'章昌常書船日云以'],
    一二四: [...'端透定泥'],
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoi6Z+z6Z+75bGs5oCn5bi46YePLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi/pn7Ppn7vlsazmgKfluLjph48udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZUFBZTtBQUNGLFFBQUEsRUFBRSxHQUFHO0lBQ2hCLENBQUMsRUFBRSxDQUFDLEdBQUcsd0NBQXdDLENBQUM7SUFDaEQsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDWixDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUNkLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ2IsQ0FBQyxFQUFFLENBQUMsR0FBRyw0REFBNEQsQ0FBQztJQUNwRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztDQUNOLENBQUM7QUFFWCxzQkFBc0I7QUFDVCxRQUFBLEdBQUcsR0FBRyxDQUFDLEdBQUcsY0FBYyxDQUFVLENBQUM7QUFFbkMsUUFBQSxHQUFHLEdBQUcsQ0FBQyxHQUFHLDJCQUEyQixDQUFVLENBQUM7QUFFN0QsaUJBQWlCO0FBQ0osUUFBQSxJQUFJLEdBQUc7SUFDbEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztJQUN4QixDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQztJQUNwQixDQUFDLEVBQUUsQ0FBQyxHQUFHLDJCQUEyQixDQUFDO0lBQ25DLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDO0lBQ2YsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDYixFQUFFLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUNMLENBQUM7QUFFWCxpQkFBaUI7QUFDSixRQUFBLElBQUksR0FBRztJQUNsQixFQUFFLEVBQUUsQ0FBQyxHQUFHLDZCQUE2QixDQUFDO0lBQ3RDLENBQUMsRUFBRSxDQUFDLEdBQUcscUJBQXFCLENBQUM7SUFDN0IsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUM7SUFDZixFQUFFLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQztDQUNWLENBQUM7QUFFWCx3QkFBd0I7QUFDWCxRQUFBLElBQUksR0FBRztJQUNsQixJQUFJLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQztJQUN6QixFQUFFLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQztJQUNwQixHQUFHLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQztJQUNqQixDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQztJQUNsQixHQUFHLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztDQUNSLENBQUMifQ==