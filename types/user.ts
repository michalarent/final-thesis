import { Doctor } from "../db/Doctor";
import Patient from "../db/Patient";
import { Loader } from "../hooks/useLoaderSWR";

export type IUser = {
  user: {
    email: string;
    name: string;
    authId: string;
  };
};

export type IPatient = {
  patient?: Patient;
  isPatient: boolean;
};

export type IDoctor = {
  doctor?: Doctor;
  isDoctor: boolean;
};

export type UserInfo = {
  user: Loader<IUser>;
  patient: Loader<IPatient>;
  doctor: Loader<IDoctor>;
};
