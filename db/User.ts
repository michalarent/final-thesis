import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  MikroORM,
} from "@mikro-orm/core";
import { IUserProfile } from "../hooks/user";

@Entity()
export default class User {
  @PrimaryKey({ unique: true, nullable: false })
  email: string;

  @Property()
  name: string;

  @Property({ unique: true })
  authId: string;

  @Property()
  imageUrl: string;

  @Property({ nullable: false })
  createdAt: Date = new Date();

  static getEntity(
    orm: MikroORM<any>,
    { authId }: IUserProfile
  ): Promise<User> {
    return orm.em.findOneOrFail(User, {
      authId,
    });
  }
}
