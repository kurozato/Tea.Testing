import { Describe } from './Testing.describe.js'

export class Testing{

    #success;
    #testCode;
    #describe = new Describe();
    #isDescribe = true;
    constructor(){

        /** console message color **/
        const green = '\u001b[32m';
        const blue = '\u001b[34m';
        const yellow = '\u001b[33m';
        const cyan = '\u001b[36m';
        const red = '\u001b[31m';

        const reset = '\u001b[0m';

        this.#success = (message) => console.log(green + message + reset);
        this.#testCode = (code) => {
            console.groupCollapsed(cyan + 'Run test code:' + reset);
            console.log(code);
            console.groupEnd();
        };

        this.clear();
    }

    /**
     * 
     * @param {Array} testing 
     * @param {string} title 
     * @param {Function} fn 
     */
    #case(testing, title, fn){
        testing = testing || [];
        testing.push({title:title, test:fn});
    }

    /**
     * 
     * @param {Array} tests 
     */
    #run(tests){
        Object.prototype.getName = function() { 
            var funcNameRegex = /function (.{1,})\(/;
            var results = (funcNameRegex).exec((this).constructor.toString());
            return (results && results.length > 1) ? results[1] : "";
        };

        for (let i = 0,l= tests.length; i < l; i++) {
            const tesing = tests[i];
            try {
                //Output title
                console.group('Test case: [ ' + tesing.title + ' ]');
                //Output test code
                this.#testCode(tesing.test);
                //run unit test
                const result = tesing.test();
                //nomarl test?
                if(result === undefined){
                    this.#success('Assertion success.');
                    console.groupEnd();
                }
                //Promise?
                if(result !== undefined && result !== null && result.getName() ===  'Promise'){
                    result
                        .then(()=>{
                            this.#success('Assertion success.');
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
        }
    }

    /**
     * 
     * @param {String} title 
     */
    describe(title){

        const last = this.#describe.last();
        //before describe call?
        if(this.#isDescribe) //called describe
            last.append(title);
        else //called case
            last.parent.append(title);
        
        this.#isDescribe = true; //call describe
        return this;
    }

    /**
     * 
     * @param {String} title 
     * @param {Function} fn 
     */
    case(title, fn){
        const last = this.#describe.last();
        //last children
        const d = last.parent.lastChild();
        this.#case(d.testCases, title, fn);

        this.#isDescribe = false; //call case
        return this;
    }

    /**
     * 
     */
    clear(){
        this.#describe = new Describe('//// Unit Tests ////');
        this.#isDescribe = true;
    }

    run(){
        //group start
        this.#describe.entries(describe => {
            if(!describe.isLast())
                console.group(describe.title);
        });

        const last = this.#describe.last();
        const describes = last.parent.children;
        //describe testCases run unitTest
        for (let i = 0; i < describes.length ; i++) {
            const d = describes[i];
            console.group(d.title);
            this.#run(d.testCases);
            console.groupEnd();
        }
        //group end
        this.#describe.entries(describe => {
            if(!describe.isLast())
                console.groupEnd();
        });
    }
}