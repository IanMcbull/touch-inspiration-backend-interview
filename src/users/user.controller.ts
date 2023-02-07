import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateWalletDto } from './dto/createWalletDto';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
  @Get(':userID/profile')
  async getUser(@Param('userID') userID: string): Promise<User> {
    return this.userService.findOne({ userID });
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    createUserDto.userID = uuidv4();
    if (createUserDto.wallets && createUserDto.wallets.length > 0) {
      const balances = createUserDto.wallets;
      createUserDto.totalWalletBalances = balances
        .map((b: any) => b.balance)
        .reduce((curr, acc) => (curr += acc));
    } else {
      createUserDto.totalWalletBalances = 0;
    }
    return this.userService.createUser(createUserDto);
  }
  @Put(':userID/wallet/new')
  async updateUser(
    @Param('userID') userID: string,
    @Body() wallet: CreateWalletDto,
  ): Promise<User> {
    return this.userService.findOneAndUpdate({ userID }, wallet);
  }
}
