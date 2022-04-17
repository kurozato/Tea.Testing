export class Describe{
    /**
     * 
     * @param {String} title 
     * @param {Describe} parent 
     * @returns 
     */
    constructor(title = undefined, parent = undefined){
        this.title = title;
        this.parent = parent;
        return this;
    }
    /**
     * 
     * @returns {[]}
     */
    children = [];

    /**
     * 
     * @returns {Describe}
    */  
    parent;

    /**
     * 
     * @returns {Array}
     */
    testCases = [];

    /**
     * 
     * @param {String} title 
     */
    append(title){
        this.children.push(new Describe(title, this));
    }

    #ok(obj){
        return obj !== undefined && obj !== null
    }

    /**
     * 
     * @param {Describe} instance 
     */
    #last(instance){
        const children = instance.children;
        if(this.#ok(children) && children.length === 0)
            return instance;
        else
            return this.#last(children[0]);

    }

    /**
     * 
     * @returns {Describe}
     */
    last(){
        return this.#last(this);
    }

    /**
     * 
     * @returns {Describe}
     */
    lastChild(){

        if(this.#ok(this.children) && this.children.length > 0)
            return this.children[this.children.length - 1];
        else
            return null;
    }

    /**
     * 
     * @returns {Boolean}
     */
    isLast(){
        return this.#ok(this.children) && this.children.length === 0;
    }

    /**
     * 
     * @param {Describe} instance 
     * @param {Function (Describe)} fn 
     */
    #entry(instance, fn){
        const children = instance.children;
        if(this.#ok(children) && children.length > 0){
            fn(instance);
            children.forEach(child => {
                this.#entry(child, fn);
            });
        }
    }

    /**
     * 
     * @param {Function} callback 
     */
    entries(callback){
        this.#entry(this, callback)
    }
}