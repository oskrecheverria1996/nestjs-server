import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from "../../auth/schemas/user.schema";
import { ApiProperty } from '@nestjs/swagger';

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function(doc, ret, options) {
            delete ret._id;
        },
    },
  })
export class Product {

    @ApiProperty()
    @Prop({required: [true, 'Name is required'], unique: true})
    name: string;
  
    @ApiProperty()
    @Prop()
    available: boolean;
  
    @ApiProperty()
    @Prop({ default: 0 })
    price: number;
  
    @ApiProperty()
    @Prop()
    description: string;
  
    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: string;
  
}

export const ProductSchema = SchemaFactory.createForClass(Product);