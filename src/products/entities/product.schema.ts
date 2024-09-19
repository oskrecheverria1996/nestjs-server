import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);