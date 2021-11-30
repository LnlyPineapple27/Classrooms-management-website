exports.parseArray = (name, array) => {
    if(!Array.isArray(array)) return ""

    let result = ""
    
    name = name ? name : "array"
    
    for(let index in array) {
        result += `${name}[]=${array[index]}`
        result += index < array.length - 1 ? "&" : ""
    }

    return result
}