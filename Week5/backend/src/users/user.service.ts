import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }
  create(data: Partial<User>) {
    const user = new this.userModel(data);
    return user.save();
  }
}
