export class Assert{
    /**
     * 
     * @param {Boolean} throwError 
     */
    constructor(throwError = true){
        if(throwError)
            this.#THROW_ERROR = true;
    }

    // private
    #THROW_ERROR = false;

    #objectSort(obj){
        const sorted = Object.entries(obj).sort(); 

        // object -> sorted entries
        for(let i in sorted){
            const val = sorted[i][1];
            if(typeof val === "object"){
                sorted[i][1] = this.#objectSort(val);
            }
        }
    
        return sorted;
    }

     /**
     * 
     * @param {boolean} result false -> error
     * @param {*} actual 
     * @param {*} expected 
     * @param {{expected:String, other:String}} message 
     */
    #assertion(result, value, expected, message = null){
        let data = {value: null};
        if(message !== null){
            data = {};
            data[message.other] = value;
            data[message.expected] = expected;
        }

        if(!result){
            console.error('Assertion failed:', data);
            if(this.#THROW_ERROR)
                throw new Error('Assertion failed.');
        }          
        else{
            const green   = '\u001b[32m';
            const reset   = '\u001b[0m';

            console.groupCollapsed(green + 'Assertion success:' + reset, data);
            console.trace('trace');
            console.groupEnd();
        }          
    }


    #found(value, target){
        const aryVal = this.#objectSort(value);
        const aryTgt =this.#objectSort(target);
        for(let i in aryTgt){
            const found = aryVal.find(
                val => 
                    JSON.stringify(this.#objectSort(val)) === JSON.stringify(this.#objectSort(aryTgt[i]))
            );
            //not found?
            if(found === undefined) return false;
        };

        return true;
    }

    // public

    equal(actual, expected) {       
        this.#assertion(
            actual == expected, 
            actual, 
            expected, 
            {expected:'expected', other:'actual'}
        );
    }

    strictEqual(actual, expected) {
        this.#assertion(
            actual === expected, 
            actual, 
            expected, 
            {expected:'expected', other:'actual'}
        );
    }

    deepEqual(actual, expected){
        this.#assertion(
            JSON.stringify(this.#objectSort(actual)) === JSON.stringify(this.#objectSort(expected)),
            actual, 
            expected, 
            {expected:'expected', other:'actual'}
        );
    }

    isTrue(value){
        this.#assertion(
            value == true, 
            value, 
            true, 
            {expected:'expected', other:'value'}
        );
    }

    exists(value, expected){
        this.#assertion(
            this.#found(value, expected),
            value, 
            expected, 
            {expected:'expected', other:'value'}
        );
    }



    // notXXX

    notEqual(actual, expected) {       
        this.#assertion(
            actual != expected, 
            actual, 
            expected, 
            {expected:'expected', other:'actual'}
        );
    }

    notStrictEqual(actual, expected) {
        this.#assertion(
            actual !== expected, 
            actual, 
            expected, 
            {expected:'expected', other:'actual'}
        );
    }

    notDeepEqual(actual, expected){
        this.#assertion(
            JSON.stringify(this.#objectSort(actual)) !== JSON.stringify(this.#objectSort(expected)),
            actual, 
            expected, 
            {expected:'expected', other:'actual'}
        );
    }

    notExists(value, expected){
        this.#assertion(
            this.#found(value, expected) === false,
            value, 
            expected, 
            {expected:'expected', other:'value'}
        );
    }

    // others
    
    isTrue(value){
        this.#assertion(
            value == true, 
            value, 
            true, 
            {expected:'expected', other:'value'}
        );
    }

    isFalse(value){
        this.#assertion(
            value == false, 
            value, 
            false, 
            {expected:'expected', other:'value'}
        );
    }

    ok(){
        this.#assertion(
            true, 
            undefined, 
            undefined
        );
    }

    fail(){ 
        this.#assertion(
            false, 
            null, 
            null
        );
    }
}