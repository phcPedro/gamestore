import{NotFoundException} from "@nestjs/common"
import { AnyMxRecord } from "dns";

export function notFound(data: any, id: string): void{
  if(!data || data.length === 0){
    throw new NotFoundException(
      `O id: '${id}' NOTFOUND!`
    )
  }
}
