module.exports = app => {
    const mongoose = app.mongoose
    const Schema = mongoose.Schema
    const UserSchema = new Schema({
        email: { type: String, required: true },
        passwd: { type: String, required: true, select: false },
        nickname: { type: String, required: true },
    }, { timestamps: true })

    return mongoose.model('User', UserSchema)
}
