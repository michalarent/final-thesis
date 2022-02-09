import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "./config";

import { PostgreSqlDriver } from "@mikro-orm/postgresql";

let orm: MikroORM;

export async function getOrm(): Promise<MikroORM<PostgreSqlDriver>> {
  if (!orm) orm = await MikroORM.init(config);
  const oldClose = orm.close;
  const newOrm = orm as MikroORM<PostgreSqlDriver>;
  newOrm.close = () => oldClose.call(orm);
  return newOrm;
}

export {};
