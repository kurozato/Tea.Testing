import { Assert } from './Testing.assert.js';
import { Testing } from './Testing.core.js'

export class Tea{
    constructor(){
        this.assert = new Assert();
        this.testing = new Testing();
    }
    #global = false;

    run(){     
        if(this.#global){
            this.testing.run();
        }
    };

    clear(){     
        if(this.#global){
            this.testing.clear();
        }
    };

    /**
     * 
     * @param {String} config 
     */
    setup(config){
        if((config.toUpperCase() === 'GLOBAL' || config.toUpperCase() === 'MOCHA') && this.#global === false){
            this.#global = true;

            window.describe = (title, fn)=>{
                this.testing.describe(title);
                fn();
            }
            
            window.it = (title, fn)=>{
                this.testing.it(title, fn);
            }
            
            window.before = (fn) =>{ 
                this.testing.after(fn);
            }

            window.beforeEach = (fn) =>{ 
                this.testing.beforeEach(fn);
            }

            window.after = (fn) =>{ 
                this.testing.after(fn);
            }

            window.afterEach = (fn) =>{ 
                this.testing.afterEach(fn);
            }
        }

    }
}