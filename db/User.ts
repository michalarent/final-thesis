import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
  Collection,
  MikroORM,
} from "@mikro-orm/core";

import { IUser } from "../types/user";

@Entity()
export default class User {
  @Property()
  email: string;

  @Property()
  name: string;

  @PrimaryKey({ unique: true })
  authId: string;

  static getEntity(orm: MikroORM<any>, { user }: IUser): Promise<User> {
    return orm.em.findOneOrFail(User, {
      authId: user.authId,
    });
  }
}
