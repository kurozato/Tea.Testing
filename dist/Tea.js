import { Assert } from './Testing.assert.js';
import { Testing } from './Testing.core.js'

export class Tea{
    #global = false;
    get assert(){
        return new Assert();
    }

    get testing(){
        return new Testing();
    }

    run(){
        if(this.#global){
            console.group('//// Unit Tests ////');
            tea.unitTest();
            console.groupEnd();

            tea.unitTest = undefined;
        }
    };

    /**
     * 
     * @param {String} config 
     */
    setup(config){
        if((config.toUpperCase() === 'GLOBAL' || config.toUpperCase() === 'MOCHA') && this.#global === false){
            this.#global = true;

            window.tea = window.tea || {};

            /** console message color **/
            const green = '\u001b[32m';
            const blue = '\u001b[34m';
            const yellow = '\u001b[33m';
            const cyan = '\u001b[36m';
            const red = '\u001b[31m';

            const reset = '\u001b[0m';

            tea.success = (message) => console.log(green + message + reset);
            tea.testCode = (code) => {
                console.groupCollapsed(cyan + 'Run test code:' + reset);
                console.log(code);
                console.groupEnd();
            };

            Object.prototype.getName = function() { 
                var funcNameRegex = /function (.{1,})\(/;
                var results = (funcNameRegex).exec((this).constructor.toString());
                return (results && results.length > 1) ? results[1] : "";
            };

            /**
             * 
             * @param {String} title 
             * @param {Function} fn 
             */
             window.describe = (title, fn)=>{
                 if(tea.unitTest === undefined){
                    tea.unitTest = () => {
                        console.group(title);
                        fn();
                        console.groupEnd();
                    };
                 }
                 else{
                    console.group(title);
                    fn();
                    console.groupEnd();
                 }               
            };

            /**
             * 
             * @param {String} title 
             * @param {Function} fn 
             */
            window.it = (title, fn)=>{
                try {
                    //Output title
                    console.group('Test case: [ ' + title + ' ]');
                    //Output test code
                    tea.testCode(fn);
                    //run unit test
                    const result = fn();
                    //nomarl test?
                    if(result === undefined){
                        tea.success('Assertion success.');
                        console.groupEnd();
                    }
                    //Promise?
                    if(result !== undefined && result !== null && result.getName() ===  'Promise'){
                        result
                            .then(()=>{
                                tea.success('Assertion success.');
                                console.groupEnd();
                            })
                            .catch((error)=>{
                                console.error(error);
                                console.groupEnd();
                            });        
                    }         
                } catch (error) {
                    //Output error
                    console.error(error);
                    console.groupEnd();
                }
                //'finally' not used for 'console.groupEnd()'
            };
        }


    }
}