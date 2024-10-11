import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiExtraModels, ApiOkResponse, ApiTags, ApiUnauthorizedResponse, getSchemaPath } from '@nestjs/swagger';
import { LoginResponseDto } from './dto/login-response.dto';
import { User } from './schemas/user.schema';
import { ErrorResponseDto } from 'src/shared/dto/error-response.dto';


@ApiExtraModels(ErrorResponseDto)
@ApiBadRequestResponse({
  schema: {
    $ref: getSchemaPath(ErrorResponseDto)
  }
})
@ApiUnauthorizedResponse({
  schema: {
    $ref: getSchemaPath(ErrorResponseDto)
  }
})
@ApiTags('auth')
@Controller('auth') // https://localhost:3000/users --> min: 17:44 https://www.youtube.com/watch?v=lonpW-0EybY&list=PL_WGMLcL4jzWCFea1NUVOfaf4IqIMFN4P
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @ApiExtraModels(LoginResponseDto)
  @ApiCreatedResponse({
    description: 'User register response', 
    schema: {
      $ref: getSchemaPath(LoginResponseDto)
    },
  })
  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOkResponse({
    description: 'User login response', 
    schema: {
      $ref: getSchemaPath(LoginResponseDto)
    },
  })
  @Post('/login')
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginResponseDto> {
    return this.usersService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  
  @ApiExtraModels(User)
  @ApiOkResponse({
    description: 'User update response', 
    schema: {
      $ref: getSchemaPath(User)
    },
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Get('/validate-email/:token')
  validateEmail(@Param('token') token: string): Promise<boolean> {
    return this.usersService.validateEmail(token)
  }
}
