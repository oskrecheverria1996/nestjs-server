import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import mongoose, { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function(doc, ret, options) {
            delete ret._id;
        },
    },
  })
export class Category {
    @ApiProperty()
    @Prop({required: [true, 'Name is required'], unique: true})
    name: string;
    
    @ApiProperty()
    @Prop()
    description: string;
  
    @ApiProperty()
    @Prop()
    available: boolean;

}

export const CategorySchema = SchemaFactory.createForClass(Category);