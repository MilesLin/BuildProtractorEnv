## 建立 Protractor 步驟
步驟 1 建立 package.json

`npm init`

步驟 2 安裝 local protractor

`npm install protractor`

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
	specs: ['todo-e2e-spec.js']
};
```

步驟 6 執行 protractor

`package.json 加入 script => "protractor": "protractor"`

`執行指令 npm run protractor -- protractor.conf.js`


## 設定 typescript 環境

改成 typescript 版本
require('ts-node').register({
      project: require('path').join(__dirname, './tsconfig.e2e.json')
    });

加入 typescript.json 
