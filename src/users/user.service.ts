import { Model, FilterQuery } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateWalletDto } from './dto/createWalletDto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async findOne(userFilterQuery: FilterQuery<User>): Promise<User> {
    try {
      return this.userModel.findOne(userFilterQuery);
    } catch (error) {
      throw new NotFoundException('Unable to find user');
    }
  }
  async findAll(): Promise<User[]> {
    try {
      return this.userModel.find().exec();
    } catch (error) {
      throw new NotFoundException('Unable to fetch all the users');
    }
  }
  async createUser(user: User): Promise<User> {
    try {
      const newUser = new this.userModel(user);
      return newUser.save();
    } catch (error) {
      throw new NotFoundException('Unable to create new user');
    }
  }
  async updateUser(
    userID: string,
    UpdateUserDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return this.userModel.findOneAndUpdate({ userID }, UpdateUserDto);
    } catch (error) {
      throw new NotFoundException('Unable to update user');
    }
  }
  async findOneAndUpdate(
    userFilterQuery: FilterQuery<User>,
    wallet: CreateWalletDto,
  ): Promise<User> {
    try {
      const foundUser = await this.userModel.findOne(userFilterQuery);
      foundUser.wallets.push(wallet);
      return this.userModel.findOneAndUpdate(userFilterQuery, foundUser, {
        new: true,
      });
    } catch (error) {
      throw new NotFoundException('Unable to add new wallet');
    }
  }
}
