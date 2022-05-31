
import { PartialType } from "@nestjs/swagger";
import { MakeUserDto } from "./create-user-dto";

export class UpdateUserDto extends PartialType(MakeUserDto) {

}
