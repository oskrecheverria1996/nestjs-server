import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { bcryptAdapter } from 'src/config';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userModel.findOne({email: createUserDto.email });
    if(existUser) throw new BadRequestException('Este email ya se encuentra registrado');

    const { password, ...userData } = createUserDto;
    const user = new this.userModel({
      password: bcryptAdapter.hash(password),
      ...userData
    });

    await user.save();
    return user;
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if(!user) throw new BadRequestException('El usuario no existe');

    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
    if(!isMatch) throw new BadRequestException('La contraseña no es valida');

    const { password, ...userEntity } = user.toJSON();
    const token = await this.jwtService.sign({ id: user.id, email: user.email, name: user.name });

    return { userEntity, token };

  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findUserById(id: number) {
    const user = await this.userModel.findById( id );
    const { password, ...rest } = user.toJSON();
    return rest;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

}
