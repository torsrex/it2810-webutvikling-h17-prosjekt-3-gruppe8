// stringify JSON Object
export const stringifyObject = o => JSON.stringify(o)

// parse JSON String
export const parseObject = o => JSON.parse(o)

// Parse UNIX timestamp to format YYYY-MM-DD
export const parseDate = (...date) => new Date(...date).toISOString().slice(0,10)

// Generates a unique String ID
export const generateId = () => Math.random().toString(36)


// Month names
export const months = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
]

// Day names
export const week = ["M","Tu","W","Th","F","Sa","Su"]
