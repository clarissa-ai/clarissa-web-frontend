class LoaderClass {
    /**
     * Extendable loader class.
     * @constructor
     */
    constructor() {
        // Initialize new Map.
        this.loaderMap = new Map();
        // Set id count to 0.
        this.count = 0;
        // Bind functions.
        this.request = this.request.bind(this);
        this.resolve = this.resolve.bind(this);
        this.status = this.status.bind(this);
    }
    /**
     * This will let the loader know that you are waiting for your response.
     * @return {Number} An ID. This ID will be required to resolve the wait.
     */
    request() {
        const currentID = this.count;
        console.log(this.loaderMap);
        this.loaderMap.set(currentID, false);
        console.log(this.loaderMap);
        this.count++;
        return currentID;
    };
    /**
     * Resolve the wait using the key received from request.
     * @param {String} key
     */
    resolve(key) {
        this.loaderMap.set(key, true);
    };
    /**
     * Returns true if all requests have been resolved.
     * @return {Boolean} Returns true if and only if all requests have been resolved. Otherwise false.
     */
    status() {
        const loaderValues = Array.from(this.loaderMap.values());
        return loaderValues.length === 0 ? false : loaderValues.every((value) => value);
    };
};
export default LoaderClass;
