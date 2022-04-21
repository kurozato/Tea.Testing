import { Tea } from '../dist/Tea.js';
const tea = new Tea();
const assert = tea.assert;
const testing = tea.testing;

testing.clear();
testing
    .describe('title01')
        .describe('title02')
            .describe('title03-1')
                .it('test01',()=>{ })
                .it('test02',()=>{ let n = null; n.toString();})
            .describe('title03-2')
                .it('fail', () => {
                    assert.fail();
                })
                .it('ok', ()=>{
                    assert.ok();
                })
                .it('isTrue', ()=>{
                    assert.isTrue(true);
                })
                .it('equal', ()=>{
                    assert.equal('1', 1);
                })
                .it('notStrictEqual', ()=>{
                    assert.notStrictEqual('1', 1);
                })
    .run();



    tea.setup('mocha');

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
    
