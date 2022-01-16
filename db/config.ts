import ORMCONFIG from "../ormconfig.json";
import { Options } from "@mikro-orm/core";
import User from "./User";
import Patient from "./Patient";
import { Doctor } from "./Doctor";

import { Treatment } from "./Treatment";
import { Wound } from "./Wound";
import { Appointment } from "./Appointment";
import PatientMedicalHistory from "./PatientMedicalHistory";
import WoundFormData from "./WoundFormData";
import Image from "./Image";
import { Annotations } from "./Annotations";
import { Chat } from "./Chat";
import { ChatMessage } from "./ChatMessage";

const { host, user, password, dbName } = ORMCONFIG[0];
const config: Options = {
  dbName,
  type: "postgresql",
  host,
  user,
  password,
  baseDir: process.cwd(),
  entities: [
    User,
    Patient,
    PatientMedicalHistory,
    Doctor,
    Treatment,
    Wound,
    WoundFormData,
    Appointment,
    Image,
    Annotations,
    Chat,
    ChatMessage,
  ],
  discovery: {
    disableDynamicFileAccess: false,
    requireEntitiesArray: true,
    warnWhenNoEntities: true,
  },
  useBatchInserts: false,
  useBatchUpdates: false,

  debug: false, //process.env.NODE_ENV === "development"
};
export default config;
