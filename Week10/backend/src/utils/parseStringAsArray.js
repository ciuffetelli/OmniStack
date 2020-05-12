module.exports = function parseStringAsArray(ArrayasString){
    return ArrayasString.split(',').map( res => res.trim());
}