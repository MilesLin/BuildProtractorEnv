﻿## 建立 Protractor 5.4.2 開發環境
步驟 1: 建立 `package.json`

* `npm init`

步驟 2: 安裝 local protractor

* `npm install protractor@5.4 --save-dev`

步驟 3: 安裝 local web driver

* `package.json 加入新 script => "wdmupdate": "webdriver-manager update"`

``` json
"scripts": {
    "wdmupdate": "webdriver-manager update"
  },
```

* `執行指令 npm run wdmupdate`

步驟 4: 新增 `src` 資料夾，並新增測試檔案 `todo.e2e-spec.js` 到 `src` 資料夾
``` js
describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
      browser.get('https://angularjs.org');
  
      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();
  
      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');
  
      // You wrote your first test, cross it off the list
      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(2);
    });
  });
```

步驟 5: 新增 `protractor.conf.js` (protractor 設定檔案)
``` js
exports.config = {
    specs: ['./src/**/*.e2e-spec.js'],
    directConnect: true
};
```

步驟 6: 執行 protractor 啟動測試

* `package.json 加入新 script => "protractor": "protractor"`

``` json
"scripts": {
    "protractor": "protractor",
    "wdmupdate": "webdriver-manager update"
  },
```

* `執行指令 npm run protractor -- protractor.conf.js`


## 設定 typescript 環境

步驟 1: 安裝 `ts-node` 與 `typescript`

* `npm install ts-node@8.3 --save-dev`
* `npm install typescript@3.5 --save-dev`

步驟 2: 加入 typescript 設定檔 `tsconfig.json`
``` json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "target": "es5",
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "es2017",
      "dom"
    ]
  }
}
  
```

步驟 3: 安裝測試用的 typescript 定義檔案
* `npm install @types/jasmine@3.3 --save-dev`
* `npm install @types/jasminewd2@2.0 --save-dev`
* `npm install @types/node@12.6 --save-dev`

步驟 4: 在 `protractor.conf.js` 加入使用 typescript 的設定
* 加入 onPrepare 的設定，讓 protractor 能夠讀取 typescript。
* 讀取檔案的 **specs** 改成讀取 `.ts` 的測試

``` js
exports.config = {
    specs: ['./src/**/*.e2e-spec.ts'],
    directConnect: true,
    onPrepare: () => {
        require('ts-node').register({
            project: './tsconfig.json'
        });
    }
};
```

步驟 5: 將測試檔案 `todo.e2e-spec.js` 改成 `ts` 版本
* 更改檔案名稱: `todo.e2e-spec.ts`
* 修改程式碼成 typescript 版本 *(只有多 `import { browser, by, element } from 'protractor';` 這一行)*
``` ts
import { browser, by, element } from 'protractor';

describe('angularjs homepage todo list', function() {
    it('should add a todo', function() {
      browser.get('https://angularjs.org');
  
      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();
  
      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');
  
      // You wrote your first test, cross it off the list
      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(2);
    });
  });
```
步驟 6: 執行測試
* `npm run protractor -- protractor.conf.js`

## 啟用 VS Code 偵錯模式

**CAUTION: VS Code 偵錯模式只能在 Disabled Control Flow 的情況下偵錯。 請參考 [Debugging Protractor Tests](https://www.protractortest.org/#/debugging)。**

步驟 1: 建立 `.vscode` 資料夾
* 使用 cmd 指令 `mkdir .vscode`，建立 `.vscode` 資料夾

步驟 2: 於 `.vscode` 資料夾加入 `launch.json`
``` json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug E2E",
            "program": "${workspaceRoot}/node_modules/protractor/bin/protractor",
            "args": ["${workspaceRoot}/protractor.conf.js"]
        }
    ]
}
```

步驟 3: 使用 VS Code 開始偵錯
* 執行偵錯的方法，請參考 https://code.visualstudio.com/docs/editor/debugging



## 延伸閱讀
[Protractor](https://https://www.protractortest.org/#/)