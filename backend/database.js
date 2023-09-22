let data = {
  boxes: {
    "1": { id: "1", name: "Box #1", description: "The 'Box #1' is the best in the business" },
    "2": { id: "2", name: "Box #2", description: "The 'Box #2' is the best in the business" },
    "3": { id: "3", name: "Box #3", description: "The 'Box #3' is the best in the business" },
    "4": { id: "4", name: "Box #4", description: "The 'Box #4' is the best in the business" },
    "5": { id: "5", name: "Box #5", description: "The 'Box #5' is the best in the business" },
    "6": { id: "6", name: "Box #6", description: "The 'Box #6' is the best in the business" },
    "7": { id: "7", name: "Box #7", description: "The 'Box #7' is the best in the business" },
    "8": { id: "8", name: "Box #8", description: "The 'Box #8' is the best in the business" },
    "9": { id: "9", name: "Box #9", description: "The 'Box #9' is the best in the business" },
  }
}

module.exports = {
  boxes: {
    get: async () => data.boxes,
    find: async (id) => data.boxes[id]
  }
}