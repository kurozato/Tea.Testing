# Tea.Testing

## GETTING STARTED 

import tea.js :
```js
import {Tea} from 'Tea.js'
const tea = new Tea();
const assert = tea.assert;
const testing = tea.testing;
```

write test code :
```js
testing
    .describe('Test1')
        .describe('Test1-1')
            .case('ok', ()=>{
                assert.ok();
            })
            .case('fail', () => {
                assert.fail();
            })
        .describe('Test1-2')
            .case('equal', ()=>{
                assert.equal('1', 1);
            })
            .case('notStrictEqual', ()=>{
                assert.notStrictEqual('1', 1);
            })
    .run();
```
or use like mocha.(mocha is great)
```js
tea.setup('mocha'); // or tea.setup('global');

describe('title1', ()=>{
    describe('title11', ()=>{
        it('test-ok', ()=>{
            assert.ok();
        });
        it('test-fail', ()=>{
            assert.fail();
        });
    });
});

tea.run();
```
Live Server : Go Live

See conselo.   
Ctrl + Shift + I or F12.   

```
//// Unit Tests ////
| Test1
|  | Test1-1
|  |  | Test case: [ ok ]
|  |  |  | Run test code:
|  |  |  | Assertion success.
```

See samlpe for details.

