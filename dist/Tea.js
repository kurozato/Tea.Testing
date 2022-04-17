import { Assert } from './Testing.assert.js';
import { Testing } from './Testing.core.js'

export class Tea{

    get assert(){
        return new Assert();
    }

    get testing(){
        return new Testing();
    }
}