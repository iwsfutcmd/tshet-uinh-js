# qieyun-js [![JSDelivr badge](https://data.jsdelivr.com/v1/package/npm/qieyun/badge)](https://www.jsdelivr.com/package/npm/qieyun)

《切韻》音系 JavaScript 函式庫

姊妹項目：《切韻》音系 SQLite 資料庫 \([sgalal/qieyun-sqlite](https://github.com/sgalal/qieyun-sqlite)\)。

## Usage

Browser:

```html
<script src="https://cdn.jsdelivr.net/npm/qieyun@0.6.0"></script>
```

Node.js:

```sh
$ npm install qieyun
```

```javascript
> const Qieyun = require('qieyun');
```

## API

![如圖為《切韻》音系 JavaScript 函式庫的工作流](demo/qieyun-js.png)

**1. 由漢字查出對應的《廣韻》小韻號和解釋**

```javascript
> Qieyun.query漢字('過');
[ { "小韻號": 739, "解釋": "經也又過所也釋名曰過所至關津以示之也或曰傳過也移所在識以爲信也亦姓風俗通云過國夏諸侯後因爲氏漢有兖州刺史過栩" }
, { "小韻號": 2837, "解釋": "誤也越也責也度也古臥切七" }
]
```

`query漢字` 函數，參數為單個漢字，返回值為數組。每一項包括 `小韻號` 與 `解釋` 兩個字段。小韻號的取值 (1 ≤ _i_ ≤ 3874)。

若找不到結果，則返回空數組。

注意：此函數不具備異體字轉換功能，如：

```javascript
> Qieyun.query漢字('笑');
[]
> Qieyun.query漢字('𥬇');
[{ "小韻號": 2768, "解釋": "欣也喜也亦作笑私妙切五" }]
```

**2. 由《廣韻》小韻號查出對應的漢字和解釋**

```javascript
> Qieyun.query小韻號(1919);
[
  [ '拯', '救也助也無韻切音蒸上聲五' ],
  [ '抍', '[同上]' ],
  [ '撜', '並上同見說文' ],
  [ '𨋬', '[⿱氶車/𨋬]' ],
  [ '氶', '晉譙王名' ]
]
```

**3. 查詢《廣韻》某個小韻的反切**

```javascript
> Qieyun.get上字(1);
"德"
> Qieyun.get下字(1919);  // 拯小韻無反切
null
> Qieyun.get反切(1644);  // 轉小韻
"陟兖切"
```

**4. 查詢《廣韻》小韻號對應的《切韻》音系音韻地位**

```javascript
> let 音韻地位 = Qieyun.get音韻地位(739);
```

也可以使用字符串 \(母, 開合, 等, 重紐, 韻賅上去入, 聲\) 初始化：

```javascript
> let 音韻地位 = new Qieyun.音韻地位("見", "合", "一", null, "戈", "平");
```

注意：目前暫未實現錯誤處理。

**5. 由《切韻》音系音韻地位得出各項音韻屬性**

```javascript
> let 音韻地位 = Qieyun.get音韻地位(739);
> 音韻地位.get音韻描述();
"見合一戈平"
> 音韻地位.get母();
"見"
> 音韻地位.get韻賅上去入();
"戈"
> 音韻地位.get攝();
"果"
```

此類函數包括：

* 母類：`get母`
* 開合類：`get開合`
* 等類：`get等`
* 重紐類：`get重紐`
* 韻類：`get韻`, `get韻賅上去入`, `get攝`, `get聲`
* 綜合類：`get音韻描述`

**6. 判斷某個小韻是否屬於給定的音韻地位**

```javascript
> let 音韻地位 = Qieyun.get音韻地位(1919);  // 拯小韻
> 音韻地位.屬於('章母');
true
> 音韻地位.屬於('清韻');
false
> 音韻地位.屬於('重紐A類 或 以母 或 端精章組 或 日母');
true
```

`屬於` 函數：參數為表示音韻地位的字符串。

字符串中音韻地位的描述格式：`...母`, `...組`, `...等`, `...韻`, `...攝`, `...聲`, `開口`, `合口`, `重紐A類`, `重紐B類`。

字符串先以「或」字分隔，再以空格分隔。不支援括號。

如「(端精組 且 重紐A類) 或 (以母 且 四等 且 去聲)」可以表示為 `端精組 重紐A類 或 以母 四等 去聲`。

| 音韻屬性 | 中文名稱 | 英文名稱 | 可能取值 |
| :- | :- | :- | :- |
| 母 | 聲母 | initial | 幫滂並明<br/>端透定泥<br/>知徹澄孃<br/>精清從心邪<br/>莊初崇生俟<br/>章昌船書常<br/>見溪羣疑<br/>影曉匣云以來日 |
| 組 | 組 | group | 幫端知精莊章見<br/>（未涵蓋「影曉匣云以來日」） |
| 等 | 等 | division | 一二三四 |
| 韻 | 韻母 | rhyme | 東冬鍾<br/>江<br/>支脂之微<br/>魚虞模<br/>齊祭泰佳皆夬灰咍廢<br/>眞諄臻文欣元魂痕<br/>寒桓刪山先仙<br/>蕭宵肴豪<br/>歌戈<br/>麻<br/>陽唐<br/>庚耕清青<br/>蒸登<br/>尤侯幽<br/>侵<br/>覃談鹽添咸銜嚴凡 |
| 攝 | 攝 | class | 通江止遇蟹臻山效果假宕梗曾流深咸 |
| 聲 | 聲調 | tone | 平上去入<br/>仄<br/>舒 |

亦支援「開口」、「合口」、「重紐A類」、「重紐B類」四項。

注意：

- 此處的「韻」指的是韻賅上去入
- 元韻置於臻攝而非山攝

## 説明

不支援異體字，請手動轉換：

* 聲母 娘 -> 孃
* 聲母 谿 -> 溪
* 聲母 群 -> 羣
* 韻母 餚 -> 肴
* 韻母 眞 -> 真

## Build

Build:

```sh
$ pip install -r requirements.txt
$ python build/main.py
```

Test:

```
$ npm install
$ npm test
```

## License

Dictionary data is in the public domain.

Source code is distributed under MIT license.
