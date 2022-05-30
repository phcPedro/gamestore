import { PartialType } from "@nestjs/mapped-types";
import { MakeUserDto } from "./create-user-dto";

export class UpdateUserDto extends PartialType(MakeUserDto) {

}
