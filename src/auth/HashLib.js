const bcrypt =require('bcryptjs');

class HashLib {
    async create (password) {
        const salt = await bcrypt.genSalt();
       return await bcrypt.hash(password, salt)
    }

    async compare (password, passwordUser) {
        return await bcrypt.compare(password, passwordUser)
    }
}

module.exports =  HashLib;