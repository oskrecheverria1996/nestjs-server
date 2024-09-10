import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

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
export class User {
  @Prop({required: [true, 'Name is required']})
  name: string;

  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;

  @Prop({ default: false })
  emailValidated: boolean;

  @Prop({ required: [true, 'Password is required'] })
  password: string;

  @Prop()
  img: string;

  @Prop({ default: ['USER_ROLE'] })
  role: [string];
}

export const UserSchema = SchemaFactory.createForClass(User);

// name: {
//     type: String,
//     required: [true, 'Name is required']
// },
// email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true
// },
// emailValidated: {
//     type: Boolean,
//     default: false
// },
// password: {
//     type: String,
//     required: [true, 'Password is required']
// },
// img: {
//     type: String,
// },
// role: {
//     type: [String],
//     default: ['USER_ROLE'],
//     enum: ['ADMIN_ROLE', 'USER_ROLE']
// }