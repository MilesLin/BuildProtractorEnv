## 建立 Protractor 開發環境
步驟 1 建立 `package.json`

`npm init`

步驟 2 安裝 local protractor

`npm install protractor --save-dev`

步驟 3 安裝 local web driver

`package.json 加入 script => "wdmupdate": "webdriver-manager update"`

`執行指令 npm run wdmupdate`

步驟 4 新增測試檔案 todo-e2e-spec.js

`todo-e2e-spec.js`
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

步驟 5 新增 `protractor.conf.js` (protractor 設定檔案)
``` js
exports.config = {
	specs: ['todo-e2e-spec.js'],
    directConnect: true
};
```

步驟 6 執行 protractor

`package.json 加入 script => "protractor": "protractor"`

`執行指令 npm run protractor -- protractor.conf.js`


## 設定 typescript 環境

步驟 1 安裝 `ts-node` 與 `typescript`

`npm install ts-node --save-dev`

`npm install typescript --save-dev`


改成 typescript 版本
require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

步驟 2 加入 `typescript.json`

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

步驟 3 安裝 @type

`npm install @types/jasmine --save-dev`

`npm install @types/jasminewd2 --save-dev`

`npm install @types/node --save-dev`

步驟 4 在 `protracto.conf.js` 加入使用 ts 設定

加入 onPrepare 的設定
讀取檔案改成讀取 todo-e2e-spec.ts
``` js
exports.config = {
    specs: ['todo-e2e-spec.ts'],
    directConnect: true,
    onPrepare: () => {
        require('ts-node').register({
            project: './tsconfig.json'
        });
    }
};
```

步驟 5 將測試檔案改成 ts 版本
改名: todo-e2e-spec.ts
修改程式碼成 ts 版本

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
步驟 6 執行測試

`npm run protractor -- protractor.conf.js`
