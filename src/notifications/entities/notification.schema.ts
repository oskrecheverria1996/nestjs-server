import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Date, HydratedDocument } from 'mongoose';
import { User } from "../../auth/schemas/user.schema";
import { ApiProperty } from '@nestjs/swagger';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: function(doc, ret, options) {
            delete ret._id;
        },
    },
  })
export class Notification {

    @ApiProperty()
    @Prop({required: [true, 'A message is required']})
    message: string;

    @ApiProperty()
    @Prop({ type: Date, required: [true, 'The notification has to have a date']})
    date: Date;

    @ApiProperty()
    @Prop({ default: false })
    isRead: boolean;

    @ApiProperty()
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);