import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('user') readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp({ email, fullName, password }: SignUpDto) {
    const existUser = await this.userModel.findOne({ email });
    if (existUser) throw new BadRequestException('user already exists');

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword, 'hased');
    console.log(typeof hashedPassword);

    await this.userModel.create({
      email,
      fullName,
      password: hashedPassword,
      invoices: [],
    });

    return 'user registered succesfully';
  }

  async signIn({ email, password }: SignInDto) {
    const existUser = await this.userModel.findOne({ email });
    if (!existUser)
      throw new BadRequestException('email or password is invalid');

    const isPasswordEqual = await bcrypt.compare(password, existUser.password);

    if (!isPasswordEqual)
      throw new BadRequestException('email or password is invalid');

    const payLoad = {
      userId: existUser._id,
    };

    const accsessToken = await this.jwtService.sign(payLoad, {
      expiresIn: '1h',
    });

    return { accsessToken };
  }

  async getCurrentUser(userId) {
    const user = await this.userModel.findById(userId).select('-password');
    return user;
  }
}
