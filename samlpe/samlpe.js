
import { Assert } from '../dist/Testing.assert.js'
import { Tea } from '../dist/Testing.Tea.js';
const assert = new Assert();
const tea = new Tea();

describe('test-S', () => {
    it('test-0-1', () => {
        assert.ok();
    })
    it('test-0-2', () => {
        assert.fail();
    })
});
describe('test-S2', () => {
    it('test-0-1', () => {
        assert.ok();
    })
    it('test-0-2', () => {
        assert.fail();
    })
});
describe('test-P', () => {
    it('test-1', () => {

        const resolved1 = Promise.resolve({
            data: {},
        });

        return resolved1.then(() => {
            assert.ok();
        });
    })
    it('test-2', () => {

        const resolved1 = Promise.resolve({
            data: {},
        });

        return resolved1.then(() => {
            assert.fail();
        });
    })
});

tea.run();