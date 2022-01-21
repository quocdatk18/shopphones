import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    order_code: String,
    to_ward_code: String,
    to_district_id: Number,
    token: String,

    cancelOrder: Boolean,

    orderItems: [{
        name: { type: String, required: true },
        qty: { type: String, required: true },
        image: { type: String, required: true },
        salePrice: { type: Number, required: true },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }],
    shippingAddress: {
        city: { type: String },
        district: { type: String },
        town: { type: String },
        village: { type: String },
        name: { type: String },
        phone: { type: String },
    },
    paymentMethod: String,
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
    },
    name: String,
    status: String,
    totalPrice: { type: Number },
    salePercent: { type: Number, default: 0 },
    totalSalePrice: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
},
    {
        timestamps: true,
    }
)

export const OrderModel = mongoose.model('Order', orderSchema);
