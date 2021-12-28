import { NextApiRequest, NextApiResponse } from "next";
import { HttpError, isHttpError } from "./ApiCall";
import { HttpMethod, HttpResponseCode } from "./types";
import { IUserProfile } from "../../hooks/user";
import { identity } from "ramda";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import { getOrm } from "../../db";
import User from "../../db/User";
import Patient from "../../db/Patient";
import { Doctor } from "../../db/Doctor";
import { Wound } from "../../db/Wound";
import { Appointment } from "../../db/Appointment";

type ApiEndpointEnvironment = {
  req: NextApiRequest;
  res: NextApiResponse;
  user?: IUserProfile;
};

type FullHandlerType<
  TInputs extends Record<HttpMethod, unknown>,
  TResponses extends Record<HttpMethod, unknown>
> = {
  GET: ApiHandler<TInputs["GET"], TResponses["GET"]>;
  POST: ApiHandler<TInputs["POST"], TResponses["POST"]>;
  DELETE: ApiHandler<TInputs["DELETE"], TResponses["DELETE"]>;
  PUT: ApiHandler<TInputs["PUT"], TResponses["PUT"]>;
  PATCH: ApiHandler<TInputs["PATCH"], TResponses["PATCH"]>;
};

type ApiHandler<TInput, TResponse> = (
  input: TInput,
  env: ApiEndpointEnvironment
) => Promise<TResponse>;

export type ApiEndpointOptions = {
  allowAnonymous?: boolean;
};

export default function apiEndpoint<
  TInputs extends Record<HttpMethod, unknown>,
  TResponses extends Record<HttpMethod, unknown>
>(
  handlers: Partial<FullHandlerType<TInputs, TResponses>>,
  options?: ApiEndpointOptions
) {
  return (options?.allowAnonymous ? identity : withApiAuthRequired)(
    async function (req: NextApiRequest, res: NextApiResponse) {
      if (!handlers[req.method])
        throw new HttpError(HttpResponseCode.METHOD_NOT_ALLOWED);

      const request =
        req.method === "GET" ? req.query : { ...req.query, ...req.body };
      try {
        const user = await getCurrentUser(req, res);
        const response =
          (await handlers[req.method](request, {
            req,
            res,
            user,
          })) || {};
        if (res.writableEnded || !response) return;
        res.statusCode = 200;
        res.json(response);
      } catch (e) {
        if (isHttpError(e)) {
          res.statusCode = e.code;
        } else {
          res.statusCode = 500;
        }
        console.error(e);
        if (res.writableEnded) return;
        if (e.message) res.send(e.message);
        res.end();
      }
    }
  );
}

export async function getCurrentUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<IUserProfile> {
  const session = getSession(req, res);
  if (!session) return null;
  const authId = session.user.sub;

  let userEntity = await getOrCreateUser(
    authId,
    session.user.email,
    session.user
  );

  const { email, name, createdAt, imageUrl } = userEntity;

  return {
    name,
    email,
    createdAt,
    imageUrl,
    new: userEntity.new,
    authId,
  };
}

export async function getOrCreateUser(
  authId: string,
  email: string,
  userInfo?: any
): Promise<User> {
  // prevent multiple users from creating when multiple requests go at the same time with no user.
  const orm = await getOrm();
  const user = await orm.em.findOne(User, { authId });
  if (user) {
    user.imageUrl = userInfo.picture;
    await orm.em.persistAndFlush(user);
    return user;
  } else {
    try {
      const newUser = orm.em.create(User, {
        authId,
        email,
        name: userInfo?.name || email,
        imageUrl: userInfo?.picture,
      });
      await orm.em.persistAndFlush(newUser);

      return newUser;
    } catch (e) {
      throw e;
    }
  }
}

async function getUser(authId: string): Promise<User> {
  const orm = await getOrm();
  const user = await orm.em.findOne(User, { authId });
  return user;
}

export async function getPatient(authId: string): Promise<Patient> {
  const orm = await getOrm();
  const patient = await orm.em.findOne(Patient, { authId });

  return patient;
}

export async function getDoctor(authId: string): Promise<Doctor> {
  const orm = await getOrm();
  const doctor = await orm.em.findOne(Doctor, { authId });

  return doctor;
}

export async function updateUser(authId: string, userInfo: any) {
  const orm = await getOrm();
  const user = await orm.em.findOne(User, { authId });
  const patient = await getPatient(authId);

  if (user) {
    user.name = userInfo["name"];
    patient.name = userInfo["name"];
    await orm.em.persistAndFlush(user);
  }
}

export async function createOrUpdateDoctor(user: IUserProfile, userInfo: any) {
  const orm = await getOrm();
  const doctor = await getDoctor(user.authId);
  if (doctor) {
    doctor.doctorData = userInfo;
    await orm.em.persistAndFlush(doctor);
  } else {
    const newDoctor = orm.em.create(Doctor, {
      ...user,
      doctorData: userInfo,
    });
    await orm.em.persistAndFlush(newDoctor);
  }
}

export async function updateOrCreateMedicalHistory(
  authId: string,
  medicalHistory: any
): Promise<any> {
  const user = getUser(authId);
  const orm = await getOrm();
  if (!user) {
    return "User not found!";
  } else {
    const patient = await getPatient(authId);

    if (!patient) {
      try {
        const newPatient = orm.em.create(Patient, {
          ...user,
          medicalFormData: JSON.stringify(medicalHistory),
        });

        await orm.em.persistAndFlush(newPatient);
        return patient.medicalFormData;
      } catch (e) {
        throw e;
      }
    } else {
      patient.medicalFormData = medicalHistory;
      await orm.em.persistAndFlush(patient);

      return patient.medicalFormData;
    }
  }
}

export async function getMedicalHistory(authId: string): Promise<any> {
  const user = getUser(authId);

  if (!user) {
    return "User not found!";
  } else {
    const patient = await getPatient(authId);

    if (!patient) {
      return "Patient not found!";
    } else {
      if (patient.medicalFormData) {
        return patient.medicalFormData;
      }
    }
  }
}

export async function getAllDoctors(): Promise<Doctor[]> {
  const orm = await getOrm();
  const doctors = await orm.em.find(Doctor, {});
  return doctors;
}

export async function addWound(authId: string, formData: string): Promise<any> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    return "Patient not found!";
  }
  const newWound = orm.em.create(Wound, {
    patient,
    woundFormData: formData,
  });
  await orm.em.persistAndFlush(newWound);
  return newWound;
}

export async function getWound(woundId: any): Promise<Wound> {
  const orm = await getOrm();

  const wound = await orm.em.findOne(Wound, { id: woundId });

  return wound;
}

export async function getWounds(authId: string): Promise<Wound[]> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    return [];
  }
  const wounds = await orm.em.find(Wound, { patient });

  return wounds;
}

export async function getAppointments(authId: string) {
  const orm = await getOrm();
  const patient = await getPatient(authId);

  if (!patient) {
    return null;
  } else {
    const wounds = await getWounds(authId);

    let appointments = [];
    for (var w in wounds) {
      let app = await orm.em.find(Appointment, {
        wound: wounds[w],
      });
      for (var a in app) {
        appointments.push(app[a]);
      }
    }
    return appointments;
  }
  return [];
}

export async function getAppointment(appointmentId: string) {
  const orm = await getOrm();

  if (!appointmentId) {
    return null;
  } else {
    const app = await orm.em.findOneOrFail(Appointment, {
      id: appointmentId as any,
    });
    console.log(app);
    return app;
  }
}

export async function addAppointment(
  authId: string,
  woundId: string,
  doctorId: string,
  formData: any
): Promise<any> {
  const orm = await getOrm();

  const wound = await getWound(woundId);
  const doctor = await getDoctor(doctorId);

  if (!wound) {
    return "Wound not found!";
  } else {
    try {
      const newAppointment = orm.em.create(Appointment, {
        wound,
        doctor,
        date: new Date(
          formData.appointmentDay[0].substring(0, 10) +
            " " +
            formData.appointmentTime +
            ":00"
        ),
        info: {
          urgent: formData.urgent,
          additionalComments: formData.comment,
          images: formData.images,
        },
      });
      await orm.em.persistAndFlush(newAppointment);
      return newAppointment;
    } catch (e) {
      return null;
    }
  }
}
