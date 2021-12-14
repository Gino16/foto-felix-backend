import { Category } from "db/entities/category.entity";
import { Client } from "db/entities/client.entity";

export class CreateImageDto {
  imgUrl: string;
  category: Category;
  client: Client;
}
