declare module 'tshet-uinh/TshetUinh' {
  export { 音韻地位 } from 'tshet-uinh/lib/音韻地位';
  export type { 部分音韻屬性, 判斷規則列表, 邊緣地位種類指定 } from 'tshet-uinh/lib/音韻地位';
  export * as 資料 from 'tshet-uinh/lib/資料';
  export * as 表達式 from 'tshet-uinh/lib/常用表達式';
  export * as 壓縮表示 from 'tshet-uinh/lib/壓縮表示';
  export * as 音韻屬性常量 from 'tshet-uinh/lib/音韻屬性常量';

}
declare module 'tshet-uinh/data/raw/廣韻' {
  const _default: string;
  export default _default;

}
declare module 'tshet-uinh/data/廣韻' {
  import { 音韻地位 } from 'tshet-uinh/lib/音韻地位';
  export interface 廣韻條目 {
      字頭: string;
      /** 音韻地位。若條目為訛字並導致該小韻音韻地位無效，則為 `null` */
      音韻地位: 音韻地位 | null;
      /** 反切。若未用反切注音（如「音某字某聲」）則為 `null` */
      反切: string | null;
      釋義: string;
      來源: 廣韻來源;
  }
  export interface 廣韻來源 {
      文獻: '廣韻';
      /**
       * 小韻號，由 1 至 3874。
       *
       * 部分小韻含多個音韻地位，會依音韻地位拆分，並有細分號（後綴 -a、-b 等），故為字串格式。
       * @see {@link get小韻}
       */
      小韻號: string;
      /** 原書韻目，與音韻地位不一定對應 */
      韻目: string;
  }
  /** 按原書順序遍歷全部廣韻條目。 */
  export function iter條目(): IterableIterator<廣韻條目>;
  /**
   * 遍歷全部小韻號。
   *
   * 細分小韻（見 {@link get小韻}）拆分為不同小韻，有各自的小韻號。
   */
  export function iter小韻號(): IterableIterator<string>;
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
  export function get小韻(小韻號: string): 廣韻條目[] | undefined;
  /**
   * 遍歷全部小韻（細分小韻均拆分）。即對資料中全部小韻執行 {@link get小韻}。
   */
  export function iter小韻(): IterableIterator<廣韻條目[]>;
  /** 原書小韻總數。細分小韻（含多個音韻地位的小韻）不拆分，計為一個小韻。 */
  export const 原書小韻總數: number;
  /**
   * 依原書小韻號獲取條目。
   *
   * 細分小韻（含多個音韻地位的小韻）不拆分，視為同一小韻。
   *
   * @param 原書小韻號 數字，應在 1 至 {@link 原書小韻總數}（含）之間。
   * @returns 該原書小韻所有條目
   */
  export function get原書小韻(原書小韻號: number): 廣韻條目[] | undefined;
  /**
   * 遍歷全部原書小韻（細分小韻不拆分）。即對資料中全部原書小韻執行 {@link get原書小韻}。
   */
  export function iter原書小韻(): IterableIterator<廣韻條目[]>;

}
declare module 'tshet-uinh/data/廣韻impl' {
  export interface 內部廣韻條目 {
      字頭: string;
      音韻編碼: string | null;
      反切: string | null;
      釋義: string;
      小韻號: string;
      韻目原貌: string;
  }
  export const by原書小韻: Map<number, 內部廣韻條目[]>;
  export const by小韻: Map<string, 內部廣韻條目[]>;

}
declare module 'tshet-uinh/index' {
  export * from 'tshet-uinh/TshetUinh';
  import * as TshetUinh from 'tshet-uinh/TshetUinh';
  export default TshetUinh;

}
declare module 'tshet-uinh/lib/utils' {
  export function assert(condition: unknown, errorMessage: string | (() => string)): asserts condition;
  export type KeyOfMap<T> = T extends Map<infer K, unknown> ? K : never;
  export type ValueOfMap<T> = T extends Map<unknown, infer V> ? V : never;
  export type ArrayElement<T> = T extends (infer U)[] ? U : never;
  export function insertInto<K, V, T extends Map<K, V[]> = Map<K, V[]>>(map: T, key: KeyOfMap<T>, value: ArrayElement<ValueOfMap<T>>): void;
  export function prependValuesInto<K, V, T extends Map<K, V[]> = Map<K, V[]>>(map: T, key: KeyOfMap<T>, values: ValueOfMap<T>): void;

}
declare module 'tshet-uinh/lib/壓縮表示' {
  import { 音韻地位 } from 'tshet-uinh/lib/音韻地位';
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
  export function encode音韻編碼(地位: 音韻地位): string;
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
  export function decode音韻編碼(編碼: string): 音韻地位;

}
declare module 'tshet-uinh/lib/常用表達式' {
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
  export const 一等韻: string;
  /** 二等韻 */
  export const 二等韻: string;
  /** 三等韻（注意：拼端組時為四等） */
  export const 三等韻: string;
  /** 四等韻 */
  export const 四等韻: string;
  /** 一三等韻 */
  export const 一三等韻: string;
  /** 二三等韻（注意：拼端組時為二四等） */
  export const 二三等韻: string;
  /**
   * 韻內分開合口的韻
   */
  export const 分開合韻: string;
  /**
   * 僅為開口的韻（含之、魚韻及效、深、咸攝諸韻）
   */
  export const 開口韻: string;
  /**
   * 僅為合口的韻
   */
  export const 合口韻: string;
  /**
   * 開合中立韻（東冬鍾江模尤侯）
   */
  export const 開合中立韻: string;

}
declare module 'tshet-uinh/lib/拓展音韻屬性' {
  export const 母到清濁: Record<string, string>;
  export const 母到組: Record<string, string | null>;
  export const 母到音: Record<string, string>;
  export const 韻到攝: Record<string, string>;

}
declare module 'tshet-uinh/lib/資料' {
  import type { 廣韻來源 } from 'tshet-uinh/data/廣韻';
  import { 音韻地位 } from 'tshet-uinh/lib/音韻地位';
  export * as 廣韻 from 'tshet-uinh/data/廣韻';
  export type { 廣韻來源 } from 'tshet-uinh/data/廣韻';
  export interface 檢索結果 {
      字頭: string;
      音韻地位: 音韻地位;
      /** 反切，若未用反切注音（如「音某字某聲」）則為 `null` */
      反切: string | null;
      釋義: string;
      來源: 來源類型 | null;
  }
  export type 來源類型 = 廣韻來源 | 王三來源;
  export interface 王三來源 {
      文獻: '王三';
      小韻號: string;
      韻目: string;
  }
  /**
   * 遍歷內置資料中全部有字之音韻地位。
   * @returns 迭代器，所有至少對應一個字頭的音韻地位
   */
  export function iter音韻地位(): IterableIterator<音韻地位>;
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
  export function query字頭(字頭: string): 檢索結果[];
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
  export function query音韻地位(地位: 音韻地位): 檢索結果[];

}
declare module 'tshet-uinh/lib/音韻地位' {
  /**
   * @see {@link 音韻地位.判斷}
   */
  export type 判斷規則列表<T> = readonly (readonly [unknown, T | 判斷規則列表<T>])[];
  /**
   * @see {@link 音韻地位.調整}
   */
  export type 部分音韻屬性 = Partial<Pick<音韻地位, '母' | '呼' | '等' | '類' | '韻' | '聲'>>;
  /**
   * 建立 `音韻地位` 時，若建立的是邊緣音韻地位，需利用該類型的參數。
   * 參數為陣列，當中列明待建立的邊緣地位種類，以表明使用者知曉其為邊緣地位並確認建立。
   *
   * **注意**：內建的邊緣地位白名單**已涵蓋內建資料中全部邊緣地位**，故使用內建資料之音韻地位時完全不需使用此參數。
   *
   * 目前支持的種類如下：
   * - `'陽韻A類'`
   * - `'端組類隔'`
   * - `'咍韻脣音'`
   * - `'匣母三等'`
   * - `'羣邪俟母非三等'`
   * - `'云母開口'` (+)
   *
   * 未標注「(+)」者，僅可當待建立地位確實為該類型邊緣地位時，才可以列入，否則無法建立音韻地位。而標注「(+)」者則在建立任意音韻地位時均可列入。
   */
  export type 邊緣地位種類指定 = readonly string[];
  export const _UNCHECKED: 邊緣地位種類指定;
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
  export class 音韻地位 {
      /**
       * 聲母
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.母;
       * '幫'
       * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
       * > 音韻地位.母;
       * '羣'
       * ```
       */
      readonly 母: string;
      /**
       * 呼
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.呼;
       * null
       * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
       * > 音韻地位.呼;
       * '開'
       * ```
       */
      readonly 呼: string | null;
      /**
       * 等
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.等;
       * '三'
       * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
       * > 音韻地位.等;
       * '三'
       * ```
       */
      readonly 等: string;
      /**
       * 類
       * - AB 類為前元音，在脣牙喉音有最小對立，此情形亦稱「重紐」
       * - C 類為非前元音
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.類;
       * 'C'
       * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
       * > 音韻地位.類;
       * 'A'
       * > 音韻地位 = TshetUinh.音韻地位.from描述('章開三支平');
       * > 音韻地位.類;
       * null
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫四先平');
       * > 音韻地位.類;
       * null
       * ```
       */
      readonly 類: string | null;
      /**
       * 韻（舉平以賅上去入，唯祭、泰、夬、廢例外）
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.韻;
       * '凡'
       * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
       * > 音韻地位.韻;
       * '支'
       * ```
       */
      readonly 韻: string;
      /**
       * 聲調
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.聲;
       * '入'
       * > 音韻地位 = TshetUinh.音韻地位.from描述('羣開三A支平');
       * > 音韻地位.聲;
       * '平'
       * ```
       */
      readonly 聲: string;
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
      constructor(母: string, 呼: string | null, 等: string, 類: string | null, 韻: string, 聲: string, 邊緣地位種類?: 邊緣地位種類指定);
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
      get 清濁(): string;
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
      get 音(): string;
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
      get 攝(): string;
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
      get 韻別(): string;
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
      get 組(): string | null;
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
      get 描述(): string;
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
      get 簡略描述(): string;
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
      get 表達式(): string;
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
      get 字母(): string;
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
      get 韻圖等(): string;
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
      調整(調整屬性: 部分音韻屬性 | string, 邊緣地位種類?: 邊緣地位種類指定): 音韻地位;
      /**
       * 判斷某個小韻是否屬於給定的音韻地位限定範圍。
       *
       * 本方法可使用一般形式（`.屬於('...')`）或標籤模板語法（`` .屬於`...` ``）。
       *
       * 標籤模板語法僅能用於字面值的字串，但寫出來較簡單清晰。在不嵌入參數時，兩者效果相同。建議當表達式為字面值時使用標籤模板語法。
       *
       * @param 表達式 描述音韻地位的字串
       *
       * 字串中音韻地位的描述格式：
       *
       * * 音韻地位六要素：
       *   * `……母`, `……等`, `……韻`, `……聲`
       *   * 呼：`開口`, `合口`, `開合中立`
       *   * 類：`A類`, `B類`, `C類`, `不分類`（其中 ABC 可組合書寫，如 `AC類`）
       * * 拓展音韻地位：
       *   * `……組`, `……音`, `……攝`
       *   * 清濁：`全清`, `次清`, `全濁`, `次濁`, `清音`, `濁音`
       *   * 韻別：`陰聲韻`, `陽聲韻`, `入聲韻`
       * * 其他表達式：
       *   * `仄聲`：上去入聲
       *   * `舒聲`：平上去聲
       *   * `鈍音`：幫見影組
       *   * `銳音`：鈍音以外聲母
       *
       * 支援的運算子：
       *
       * * AND 運算子：`且`, `and`, `&`, `&&`
       * * &ensp; OR 運算子：`或`, `or`, `|`, `||`
       * * NOT 運算子：`非`, `not`, `~`, `!`
       * * 括號：`(……)`, `（……）`
       *
       * 各表達式及運算子之間須以空格隔開。
       *
       * AND 運算子可省略，如 `(端精組 且 入聲) 或 (以母 且 四等 且 去聲)` 與 `端精組 入聲 或 以母 四等 去聲` 同義。
       * @returns 若描述音韻地位的字串符合該音韻地位，回傳 `true`；否則回傳 `false`。
       * @throws 若表達式為空、不合語法、或限定條件不合法，則拋出異常。
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.屬於`章母`; // 標籤模板語法（表達式為字面值時推荐）
       * false
       * > 音韻地位.屬於('章母'); // 一般形式
       * false
       * > 音韻地位.屬於`一四等`;
       * false
       * > 音韻地位.屬於`幫組 或 陽韻`;
       * true
       * ```
       */
      屬於(表達式: string): boolean;
      /**
       * 判斷某個小韻是否屬於給定的音韻地位限定範圍（標籤模板語法）。
       *
       * 嵌入的參數可以是：
       *
       * * 函數：會被執行；若其傳回值為字串，會視作表達式，遞迴套用{@link 屬於}來判斷，否則會直接檢測其真值
       * * 字串：視作表達式，遞迴套用{@link 屬於}
       * * 其他：會檢測其真值
       *
       * **注意**：
       *
       * * 該語法僅能用於字面值模板串，不能用於如{@link 音韻地位.判斷}等
       * * `` .屬於`${...}` `` 和 `` .屬於(`${...}`) `` 不同，只有前者支持上述嵌入參數，後者的模板串會先被求值為普通字串。
       *
       * @param 表達式 描述音韻地位的模板字串列表。
       * @param 參數 要嵌入模板的參數列表。
       * @returns 若描述音韻地位的字串符合該音韻地位，回傳 `true`；否則回傳 `false`。
       * @throws 若表達式為空、不合語法、或限定條件不合法，則拋出異常。
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三凡入');
       * > 音韻地位.屬於`一四等 或 ${音韻地位.描述 === '幫三凡入'}`;
       * true
       * ```
       */
      屬於(表達式: TemplateStringsArray, ...參數: unknown[]): boolean;
      /**
       * 判斷音韻地位是否符合給定的一系列判斷條件之一，傳回第一個符合的判斷條件所對應的自訂值。
       * @param 規則 `[判斷式, 結果][]` 形式的陣列。
       *
       * 判斷式可以是：
       *
       * * &#x3000;&#x3000;函數：會被執行；若其傳回值為非空字串，會套用至{@link 音韻地位.屬於}函數判斷是否符合，若為布林值則由該值決定是否符合本條件，若為其他值則直接視作符合本條件
       * * 非空字串：描述音韻地位的表達式，會套用至{@link 音韻地位.屬於}函數
       * * &#x3000;布林值：直接決定是否符合本條件
       * * &#x3000;&#x3000;其他：均視作符合（可用於當其他條件均不滿足時，指定後備結果）
       *
       * 建議使用空字串、`null` 或 `true` 作末項判斷式以指定後備結果。
       *
       * 結果可以是任意傳回值或遞迴規則。
       * @param throws 若為 `true` 或字串，在未涵蓋所有條件時會拋出錯誤；用字串可指定錯誤情報
       * @param fallThrough 若為 `true`，在遞迴子陣列未涵蓋所有條件時會繼續嘗試母陣列的下一條件
       * @returns 自訂值，在未涵蓋所有條件且不使用 `error` 時會回傳 `null`
       * @throws `未涵蓋所有條件`（或 `error` 參數之文字），或套用至 `.屬於` 時出現的異常
       * @example
       * ```typescript
       * > 音韻地位 = TshetUinh.音韻地位.from描述('幫三C凡入');
       * > 音韻地位.判斷([
       * >   ['遇果假攝 或 支脂之佳韻', ''],
       * >   ['蟹攝 或 微韻', 'i'],
       * >   ['效流攝', 'u'],
       * >   ['深咸攝', [
       * >     ['舒聲', 'm'],
       * >     ['入聲', 'p']
       * >   ]],
       * >   ['臻山攝', [
       * >     ['舒聲', 'n'],
       * >     ['入聲', 't']
       * >   ]],
       * >   ['通江宕梗曾攝', [
       * >     ['舒聲', 'ng'],
       * >     ['入聲', 'k']
       * >   ]]
       * > ], '無韻尾規則')
       * 'p'
       * ```
       */
      判斷<T, E extends boolean | string = false>(規則: 判斷規則列表<T>, throws?: E, fallThrough?: boolean): E extends true | string ? T : T | null;
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
      等於(other: 音韻地位): boolean;
      /** 同 {@link 描述} */
      toString(): string;
      /** @ignore 用於 Object.prototype.toString */
      readonly [Symbol.toStringTag] = "\u97F3\u97FB\u5730\u4F4D";
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
      static 驗證(母: string, 呼: string | null, 等: string, 類: string | null, 韻: string, 聲: string, 邊緣地位種類?: 邊緣地位種類指定): void;
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
      static from描述(音韻描述: string, 簡略描述?: boolean, 邊緣地位種類?: 邊緣地位種類指定): 音韻地位;
  }

}
declare module 'tshet-uinh/lib/音韻屬性常量' {
  /** 全部六要素之枚舉 */
  export const 所有: {
      readonly 母: readonly string[];
      readonly 呼: readonly string[];
      readonly 等: readonly string[];
      readonly 類: readonly string[];
      readonly 韻: readonly string[];
      readonly 聲: readonly string[];
  };
  /** 幫見影組聲母，在三等分ABC類 */
  export const 鈍音母: readonly string[];
  export const 陰聲韻: readonly string[];
  /** 依可搭配的等列出各韻 */
  export const 等韻搭配: {
      readonly 一: readonly string[];
      readonly 二: readonly string[];
      readonly 三: readonly string[];
      readonly 四: readonly string[];
      readonly 一三: readonly string[];
      readonly 二三: readonly string[];
  };
  /** 依可搭配的呼列出各韻 */
  export const 呼韻搭配: {
      readonly 開合: readonly string[];
      readonly 開: readonly string[];
      readonly 合: readonly string[];
      readonly 中立: readonly string[];
  };
  /** 依可搭配的等列出各母，包含邊緣搭配 */
  export const 等母搭配: {
      readonly 一二三四: readonly string[];
      readonly 二三: readonly string[];
      readonly 一三四: readonly string[];
      readonly 三: readonly string[];
      readonly 一二四: readonly string[];
  };

}
declare module 'tshet-uinh' {
  import main = require('tshet-uinh/index');
  export = main;
}