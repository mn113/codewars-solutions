/* esversion: 6 */

const mirror = obj => {

    var copy = {};

    Object.getOwnPropertyNames(obj).forEach(function(name) {
        // Reverse the property name:
        copy[name] = name.split('').reverse().join('');
    });

    return copy;

};
