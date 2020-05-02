var mongoose = require('mongoose')

mongoose.set('useFindAndModify', false);

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