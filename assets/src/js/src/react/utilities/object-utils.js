/**
 * Performs a deep merge of objects and returns new object. Does not modify
 * objects (immutable) and merges arrays via concatenation.
 *
 * @param {...object} objects - Objects to merge
 * @returns {object} New object with merged key/values
 */
export function mergeDeep(...objects) {
    const isObject = obj => obj && typeof obj === 'object';

    return JSON.parse(JSON.stringify(objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            } else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {}) ));
}

export function deepObject(source, path) {

    if ( typeof path !== 'string' ) {
        return undefined;
    }

    path = path.split('.');
    var obj = source[ path.shift() ];

    while( obj && path.length ) {
        obj= obj[ path.shift() ];
    }

    return obj;
}
