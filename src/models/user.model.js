const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { genSalt, hash } = require('bcryptjs');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        surname: {
            type: String,
            required: true
        },
        id_type: {
            type: String,
            required: true
        },
        id_number: {
            type: Number,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            required: true
        },
        active: {
            type: Boolean,
            default: true,
            required: true
        },
        avatar: {
            public_id: String,
            secure_url: String,
        },
        reset_token: {
            type: String
        },
        expire_token: {
            type: Date
        },
        user_properties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'properties',
                autopopulate: {
                    select: ['code', 'address', 'value', 'tax_value']
                }
            }
        ]
    },
    {
        timestamps: true
    }
);

// Autopoblar el campo "user_properties"
userSchema.plugin(require('mongoose-autopopulate'));

// Setear valores del campo "avatar"
userSchema.methods.setAvatar = function setAvatar(result) {
    this.avatar = result
}

// Preguardado de contraseña
userSchema.pre("save", async function (next) {
    const salt = await genSalt(10)
    this.password = await hash(this.password, salt)
    next();
})

exports.userModel = mongoose.model("users", userSchema);
