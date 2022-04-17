import { Tea } from '../dist/Tea.js';
const tea = new Tea();
const assert = tea.assert;
const testing = tea.testing;

testing.clear();
testing
    .describe('title01')
        .describe('title02')
            .describe('title03-1')
                .case('test01',()=>{ })
                .case('test02',()=>{ let n = null; n.toString();})
            .describe('title03-2')
                .case('fail', () => {
                    assert.fail();
                })
                .case('ok', ()=>{
                    assert.ok();
                })
                .case('isTrue', ()=>{
                    assert.isTrue(true);
                })
                .case('equal', ()=>{
                    assert.equal('1', 1);
                })
                .case('notStrictEqual', ()=>{
                    assert.notStrictEqual('1', 1);
                })
    .run();




    
