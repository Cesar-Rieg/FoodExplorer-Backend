const { v4: uuidv4 } = require('uuid'); 
  
class GuidExtensions {
    NewGuid() {
        var newGuid = uuidv4(); 
        return newGuid;
    }
}

module.exports = GuidExtensions;