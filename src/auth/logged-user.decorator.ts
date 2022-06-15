import { createParamDecorator, ExecutionContext } from "@nestjs/common"
import { User } from "src/users/entities/user.entity";

export const LoggedUser = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user: User = request.user;

  delete user.password, user.cpf;

  return user;
})