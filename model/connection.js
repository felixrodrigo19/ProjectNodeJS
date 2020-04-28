var mongoose = require('mongoose')

mongoose.set('useFindAndModify', true)

module.exports = {
    async conectar() {
        await mongoose.connect("mongodb://localhost/blog", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    },

    close() {
        mongoose.disconnect()
    }
}