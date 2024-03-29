const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const propertySchema = new Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true
        },
        owner_name: {
            type: String,
            required: true
        },
        owner_id_number: {
            type: Number,
            required: true
        },
        owner_email: {
            type: String,
            required: true
        },
        built_area: {
            type: String,
            required: true
        },
        total_area: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true,
            unique: true
        },
        neighborhood: {
            type: String,
            required: true
        },
        payment_date_1: {
            type: String
        },
        payment_date_2: {
            type: String
        },
        payment_date_3: {
            type: String
        },
        value: {
            type: String,
            required: true
        },
        tax_value: {
            type: String
        },
        tax_paid: {
            type: Boolean,
            default: false,
            required: true
        },
        active: {
            type: Boolean,
            default: true,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'users',
        },
    },
    {
        timestamps: true
    }
)

// Preguardado de datos
propertySchema.pre("save", async function (next) {
    this.value = "$" + this.value;
    this.tax_value = "$" + this.tax_value;
    next();
})

propertySchema.pre("updateOne", async function () {
    const data = this.getUpdate().$set;
    this.set({
        value: "$" + data.value,
        tax_value: "$" + data.tax_value
    })
})

exports.propertyModel = mongoose.model("properties", propertySchema);
