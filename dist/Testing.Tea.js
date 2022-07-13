export class Tea {
    constructor() {
        window.its = [];
        window.describe = (title, fn) => { its.push({ title: title, fn: fn, describe: true }) }
        window.it = (title, fn) => { its.push({ title: title, fn: fn }) }
    }

    run() {
        console.group('//// Unit Tests ////');
        const results = window.its.filter(it => it.describe === true);
        this.#runSub(results, 0);
    }

    #runSub(results, i) {
        if (i < results.length) {
            const result = results[i];
            console.group(result.title);
            const tests = [];
            tests.push(result);
            window.its = [];
            result.fn();
            Array.prototype.push.apply(tests, window.its)
            this.#runEach(tests, 0)?.then(() => {
                this.#runSub(results, i + 1)
            });
        }
    }

    /**
     * 
     * @param {Array} tests 
     * @param {Number} i 
     */
    async #runEach(tests, i) {
        if (i < tests.length) {
            const ut = tests[i];
            if (ut.describe === true) {
                // console.group(ut.title);
                this.#runEach(tests, i + 1);
            }
            else {
                console.group('Test case: [ ' + ut.title + ' ]');
                //test code
                const cyan = '\u001b[36m';
                const reset = '\u001b[0m';
                console.groupCollapsed(cyan + 'Run test code:' + reset);
                console.log(ut.fn);
                console.groupEnd();
                //unit test
                try {
                    const ret = ut.fn()
                        ?.then(() => {
                            console.groupEnd();
                            this.#runEach(tests, i + 1);
                        })
                        ?.catch(error => {
                            console.error(error);
                            console.groupEnd();
                            this.#runEach(tests, i + 1);
                        });

                    if (ret === undefined) {
                        console.groupEnd();
                        this.#runEach(tests, i + 1);
                    }

                } catch (error) {
                    console.error(error);
                    console.groupEnd();
                    this.#runEach(tests, i + 1);
                }
            }
        }
        else {
            console.groupEnd();
        }
    }


}