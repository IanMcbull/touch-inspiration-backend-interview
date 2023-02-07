import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateWalletDto } from './dto/createWalletDto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    return this.userModel.findOne(userFilterQuery);
  }
  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }
  async updateUser(
    userID: string,
    UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userModel.findOneAndUpdate({ userID }, UpdateUserDto);
  }
  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    wallet: CreateWalletDto,
  ): Promise<User> {
    const foundUser = await this.userModel.findOne(userFilterQuery);
    foundUser.wallets.push(wallet);
    return this.userModel.findOneAndUpdate(userFilterQuery, foundUser, {
      new: true,
    });
  }
}
