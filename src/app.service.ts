import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getAppStatus(baseUrl){
    return{status:'Server is running🚀',
   docs: baseUrl + '/api'} ;
  }
}
