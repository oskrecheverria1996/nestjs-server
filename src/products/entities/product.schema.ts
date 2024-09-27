import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from "../../users/schemas/user.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function(doc, ret, options) {
            delete ret._id;
            delete ret.password;
        },
    },
  })
export class Product {
    @Prop({required: [true, 'Name is required'], unique: true})
    name: string;
  
    @Prop()
    available: boolean;
  
    @Prop({ default: 0 })
    price: number;
  
    @Prop()
    description: string;
  
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);