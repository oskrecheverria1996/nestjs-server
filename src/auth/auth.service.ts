import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { bcryptAdapter } from 'src/config';
import { JwtService } from "@nestjs/jwt";
import { LoginResponseDto } from './dto/login-response.dto';
import { EmailService } from './email.service';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
    private emailService: EmailService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existUser = await this.userModel.findOne({email: createUserDto.email });
    if(existUser) throw new BadRequestException('Este email ya se encuentra registrado');

    const { password, ...userData } = createUserDto;
    const user = new this.userModel({
      password: bcryptAdapter.hash(password),
      ...userData
    });

    // Email de confirmacion
    await this.sendEmailValidationLink(user.email);

    await user.save();
    return user;
  }

  async login(loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    const user = await this.userModel.findOne({ email: loginUserDto.email });
    if(!user) throw new BadRequestException('El usuario no existe');

    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
    if(!isMatch) throw new UnauthorizedException('La contraseña no es valida');

    if(!user.emailValidated) throw new BadRequestException('Por favor valide primero el email');

    const { password, ...userEntity } = user.toJSON();
    const token = await this.jwtService.signAsync({ id: user.id, email: user.email, name: user.name });

    return { user: userEntity, token };

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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userModel.findOneAndUpdate({ id }, updateUserDto)
    return updatedUser;
  }

  async validatePassword(user, password: string) {
    const isMatch = bcryptAdapter.compare(password, user.password);
    if(!isMatch) throw new UnauthorizedException('La contraseña no es valida');
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
  private async sendEmailValidationLink (email: string) {
    const token = await this.jwtService.signAsync({email});
    if(!token) throw new InternalServerErrorException('Error getting token');

    const link = `${process.env.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
        <h1>Validate your email</h1>
        <p>Click on the following link to validate your email</p>
        <a href="${link}">Validate your email: ${email}</a>
    `;

    const options = {
        to: email,
        subject: 'Validate your email',
        htmlBody: html
    }

    const isSent = await this.emailService.sendEmail(options);
    if(!isSent) throw new InternalServerErrorException('Error sending email');

    return true;
  }

  
  async validateEmail(token: string): Promise<boolean> {

    const payload = await this.jwtService.verify(token);
    if(!payload) throw new UnauthorizedException('Invalid token');

    const { email } = payload as { email: string }; // min: 3:52 --> https://www.udemy.com/course/nodejs-de-cero-a-experto/learn/lecture/39797466#content 
    if( !email ) throw new InternalServerErrorException('Email not in token');

    const user = await this.userModel.findOne({email});
    if(!user) throw new InternalServerErrorException('Email not exist');

    user.emailValidated = true;
    await user.save();

    return true;
}

}
