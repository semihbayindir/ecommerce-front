import mongoose, { model, Schema, models } from "mongoose";

const ProductSchema = new Schema({
    title: {type: String, required: true},
    description: String,
    price: {type: Number, required: true},
    images: [{type:String}],
    modelURL: [{type:String}],
    views: { type: Number, default: 0 }, // Görüntülenme sayısı
    likes: { type: Number, default: 0 }, // Beğeni sayısı
    comments: { type: Number, default: 0 }, // Yorumlar
    category: {type:mongoose.Types.ObjectId, ref:'Category'},
},{
    timestamps:true,
});

export const Product = models.Product || model('Product', ProductSchema);