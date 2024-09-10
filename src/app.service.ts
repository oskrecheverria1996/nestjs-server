import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getUsers(): string[] {
    return ['oscar', 'echeverria'];
  }

  getHello(): string {
    return 'Hello World!';
  }
}
