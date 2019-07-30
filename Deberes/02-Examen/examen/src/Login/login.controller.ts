import {Controller} from "@nestjs/common";
import {LoginService} from "../Login/login.service";

@Controller('api/login')
export class LoginController {
    constructor(private readonly _LoginService:LoginService){

    }


}


