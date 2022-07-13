# Tea.Testing

## GETTING STARTED 

import Testing.tea.js :
```js
import {Tea} from './dist/Testing.Tea.js'
const tea = new Tea();
```

write test code :
```js
import { Assert } from './dist/Testing.assert.js'

const assert = new Assert();

describe('title11', ()=>{
    it('test-ok', ()=>{
        assert.ok();
    });
    it('test-fail', ()=>{
        assert.fail();
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
|  | Test case: [ ok ]
|  |  | Run test code:
|  |  | Assertion success.
```

See samlpe for details.

