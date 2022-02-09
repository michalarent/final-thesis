import ORMCONFIG from "../ormconfig.json";
import { Options } from "@mikro-orm/core";
import User from "./User";
import { Chat } from "./Chat";
import { ChatMessage } from "./ChatMessage";
import Patient from "./Patient";
import { Doctor } from "./Doctor";

import { Treatment } from "./Treatment";
import { Wound } from "./Wound";
import { Appointment } from "./Appointment";
import PatientMedicalHistory from "./PatientMedicalHistory";
import WoundFormData from "./WoundFormData";
import Image from "./Image";
import { Annotations } from "./Annotations";

import TimelineSection from "./TimelineSection";
import TreatmentMedication from "./TreatmentMedication";
import Medication from "./Medication";
import Prescription from "./Prescription";
import Timeline from "./Timeline";
import TimelineEvent from "./TimelineEvent";
import ExaminationFormTemplate from "./ExaminationFormTemplate";
import ExaminationFormAnswer from "./ExaminationFormAnswer";
import ScheduledExaminationForm from "./ScheduledExaminationForm";

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
    Chat,
    ChatMessage,
    Patient,
    PatientMedicalHistory,
    Doctor,
    ExaminationFormTemplate,
    ScheduledExaminationForm,
    ExaminationFormAnswer,
    Treatment,
    Timeline,
    TimelineSection,
    TimelineEvent,
    TreatmentMedication,
    Medication,
    Prescription,
    Wound,
    WoundFormData,
    Appointment,
    Image,
    Annotations,
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
