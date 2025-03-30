export function getLS(key){
    return localStorage[key] ? JSON.parse(localStorage[key]) : false
}

export function setLS(key, data){
    localStorage[key] = data
}

export function delLS(key){
    delete localStorage[key]
}
