import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import config from "./config";

let orm: MikroORM;

export async function getOrm(): Promise<MikroORM> {
  if (!orm) orm = await MikroORM.init(config);
  const oldClose = orm.close;
  const newOrm = orm as MikroORM;
  newOrm.close = () => oldClose.call(orm);
  return newOrm;
}

export {};
