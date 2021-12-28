import ORMCONFIG from "../ormconfig.json";
import { Options } from "@mikro-orm/core";
import User from "./User";
import Patient from "./Patient";
import { Doctor } from "./Doctor";

import { Treatment } from "./Treatment";
import { Wound } from "./Wound";
import { Appointment } from "./Appointment";

const { host, user, password, dbName } = ORMCONFIG[0];
const config: Options = {
  dbName,
  type: "postgresql",
  host,
  user,
  password,
  baseDir: process.cwd(),
  entities: [User, Patient, Doctor, Treatment, Wound, Appointment],
  discovery: {
    disableDynamicFileAccess: false,
    requireEntitiesArray: true,
    warnWhenNoEntities: true,
  },
  debug: false, //process.env.NODE_ENV === "development"
};
export default config;
