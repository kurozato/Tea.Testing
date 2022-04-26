import { Describe } from './Testing.describe.js'

export class Testing{

    #success;
    #testCode;
    #describe = new Describe();
    #isDescribe = true;

    #before = [];
    #beforeEach = [];
    #after = [];
    #afterEach = [];
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
    #it(testing, title, fn){
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
                //beforeErch
                for(const bfrFn of this.#beforeEach){
                    bfrFn();
                }
                //run unit test
                const result = tesing.test();
                //nomarl test?
                if(result === undefined){
                    this.#success('Assertion success.');
                    console.groupEnd();
                    for(const aftFn of this.#afterEach){
                        aftFn();
                    }
                }
                //Promise?
                if(result !== undefined && result !== null && result.getName() ===  'Promise'){
                    result
                        .then(()=>{
                            this.#success('Assertion success.');
                            //console.groupEnd();
                        })
                        .catch((error)=>{
                            console.error(error);
                            //console.groupEnd();
                        })
                        .finally(()=>{
                            console.groupEnd();
                            for(const aftFn of this.#afterEach){
                                aftFn();
                            }
                        });    
                }         
                    
            } catch (error) {
                //Output error
                console.error(error);
                console.groupEnd();
                for(const aftFn of this.#afterEach){
                    aftFn();
                }
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
        else //called it
            last.parent.append(title);
        
        this.#isDescribe = true; //call describe
        return this;
    }

    /**
     * 
     * @param {String} title 
     * @param {Function} fn 
     */
    it(title, fn){
        const last = this.#describe.last();
        //last children
        const d = last.parent.lastChild();
        this.#it(d.testCases, title, fn);

        this.#isDescribe = false; //call it
        return this;
    }

    /**
     * 
     */
    clear(){
        this.#describe = new Describe('//// Unit Tests ////');
        this.#isDescribe = true;
        this.#before = [];
        this.#beforeEach = [];
        this.#after = [];
        this.#afterEach = [];
    }

    before(fn){
        this.#before.push(fn);
    }
    after(fn){
        this.#after.push(fn);
    }
    beforeEach(fn){
        this.#beforeEach.push(fn);
    }
    afterEach(fn){
        this.#afterEach.push(fn);
    }

    run(){
        for(const bfrFn of this.#before){
            bfrFn();
        }
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
        for(const aftFn of this.#after){
            aftFn();
        }
    }
}