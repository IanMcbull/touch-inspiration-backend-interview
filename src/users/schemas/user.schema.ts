import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { CreateWalletDto } from '../dto/createWalletDto';
export type UserDocument = mongoose.HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  userID: string;

  @Prop()
  username: string;

  @Prop([CreateWalletDto])
  wallets: CreateWalletDto[];
  @Prop()
  totalWalletBalances: number;
}

export const UserSchema = SchemaFactory.createForClass(User);
