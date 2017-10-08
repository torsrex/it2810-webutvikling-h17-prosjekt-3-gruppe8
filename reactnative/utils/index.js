// stringify JSON Object
export const stringifyObject = o => JSON.stringify(o)

// parse JSON String
export const parseObject = o => JSON.parse(o)

// Parse UNIX timestamp to format YYYY-MM-DD
export const parseDate = (...date) => {
  // The try-catch check is for avoding impossible date inputs, like September 31.
  try {
    return new Date(...date).toISOString().slice(0,10)
  } catch (e) {
    // If impossible date occurs, return today instead.
    return new Date().toISOString().slice(0,10)
  }
}

// Generates a unique String ID
export const generateId = () => Date.now().toString(36) + Math.random().toString(36)


// Month names
export const months = [
  "January", "February", "March",
  "April", "May", "June",
  "July", "August", "September",
  "October", "November", "December"
]

// Day names
export const week = [{key:"M"},{key:"Tu"},{key:"W"},{key:"Th"},{key:"F"},{key:"Sa"},{key:"Su"}]
