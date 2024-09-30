import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
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

  
  @ApiProperty()
  @Prop({required: [true, 'Name is required']})
  name: string;

  @ApiProperty()
  @Prop({ required: [true, 'Email is required'], unique: true })
  email: string;

  @ApiProperty()
  @Prop()
  isActive: boolean;

  @ApiProperty()
  @Prop({ default: false })
  emailValidated: boolean;

  @ApiProperty()
  @Prop({ required: [true, 'Password is required'] })
  password?: string;

  @ApiProperty()
  @Prop()
  img: string;

  @ApiProperty()
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