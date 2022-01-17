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
import { MedicalHistoryForm } from "../../data/medical-info";
import PatientMedicalHistory from "../../db/PatientMedicalHistory";
import WoundFormData from "../../db/WoundFormData";
import appointment from "../../pages/api/appointment";
import { Collection } from "@mikro-orm/core";
import Image from "../../db/Image";
import AppointmentId from "../../pages/api/appointment/[appointmentId]";
import { Annotations } from "../../db/Annotations";
import { getDoctor } from "../../services/DoctorServices";

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
    async function(req: NextApiRequest, res: NextApiResponse) {
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

  const { email, name } = userEntity;

  return {
    name,
    email,
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
    await orm.em.persistAndFlush(user);
    return user;
  } else {
    try {
      const newUser = orm.em.create(User, {
        authId,
        email,
        name: userInfo?.name || email,
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
  if (!authId) return null;
  const patient = await orm.em.findOne(Patient, { authId });

  return patient;
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
  const user = await getUser(authId);
  const orm = await getOrm();
  if (!user) {
    return "User not found!";
  } else {
    let patient = await getPatient(authId);

    if (!patient) {
      try {
        const newPatient = orm.em.create(Patient, {
          email: user.email,
          name: user.name,
          authId,
        });

        const newMedicalHistory = orm.em.create(PatientMedicalHistory, {
          patient: newPatient,
          ...medicalHistory,
        });
        await orm.em.persistAndFlush(newMedicalHistory);

        const updatePatient = await getPatient(authId);
        updatePatient.medicalHistory = newMedicalHistory.id as any;

        await orm.em.persistAndFlush(updatePatient);

        return "success";
      } catch (e) {
        throw e;
      }
    } else {
      const newMedicalHistory = orm.em.create(PatientMedicalHistory, {
        patient: patient,
        ...medicalHistory,
      });

      await orm.em.persistAndFlush(newMedicalHistory);
      patient.medicalHistory = newMedicalHistory;
      await orm.em.persistAndFlush(patient);

      return patient.medicalHistory;
    }
  }
}

export async function getMedicalHistory(authId: string): Promise<any> {
  const user = getUser(authId);
  const orm = await getOrm();

  if (!user) {
    return "User not found!";
  } else {
    const patient = await getPatient(authId);

    if (!patient) {
      return "Patient not found!";
    } else {
      if (patient.medicalHistory) {
        return await orm.em.findOne(PatientMedicalHistory, {
          id: patient.medicalHistory as any,
        });
      }
    }
  }
}

export async function getAllDoctors(): Promise<Doctor[]> {
  const orm = await getOrm();
  const doctors = await orm.em.find(Doctor, {});
  return doctors;
}

export async function addWound(authId: string, formData: any): Promise<any> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    return "Patient not found!";
  }
  const newWound = orm.em.create(Wound, {
    patient,
    woundData: formData,
  });
  await orm.em.persistAndFlush(newWound);
  return newWound;
}

export async function deleteWound(authId: string, id: number): Promise<any> {
  const orm = await getOrm();
  const patient = await getPatient(authId);
  if (!patient) {
    return "Patient not found!";
  }
  const wound = await orm.em.findOne(Wound, { id });

  // delete all appointments associated with this wound
  const appointments = await orm.em.find(Appointment, { wound });
  appointments.forEach((appointment) => {
    orm.em.remove(appointment);
  });

  if (!wound) {
    return "Wound not found!";
  }

  await orm.em.removeAndFlush(wound);
  return "success";
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

  const wounds = await orm.em.find(Wound, {
    patient,
  });

  let woundsWithData = [];
  let apps = [];

  for (var w in wounds) {
    // get wound data
    let data = await orm.em.find(WoundFormData, {
      wound: wounds[w],
    });
    // get appointment for wound
    let appointments = await orm.em.find(Appointment, {
      wound: wounds[w],
    });

    appointments = appointments.map((app) => {
      if (app.wound.id === wounds[w].id) {
        return app;
      } else {
        return null;
      }
    });

    for (var a in appointments) {
      if (appointments[a]) {
        let doc = await orm.em.findOne(Doctor, {
          authId: appointments[a].doctor as any,
        });

        appointments[a].doctor = doc;
      }
    }

    console.log(appointments);

    for (var d in data) {
      woundsWithData.push({
        woundId: wounds[w].id,
        woundDataId: data[d].id,
        appointments: appointments,
        ...data[d],
      });
    }
  }

  return woundsWithData;
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
        console.log(a);
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

    const images = await orm.em.find(Image, {
      appointment: app,
    });

    const doc = await orm.em.findOne(Doctor, {
      authId: app.doctor as any,
    });

    // get associated wound
    const wound = await orm.em.findOne(Wound, {
      id: app.wound as any,
    });

    // get associated wound data
    const woundData = await orm.em.findOne(WoundFormData, {
      id: wound.woundData as any,
    });

    console.log(app);

    return { appointment: app, images: images, doctor: doc, wound: woundData };
  }
}

export async function addAppointment(
  authId: string,
  woundId: string,
  doctorData: any,
  formData: any
): Promise<any> {
  const orm = await getOrm();

  const wound = await getWound(woundId);
  const doctor = await getDoctor(doctorData.authId);

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
        },
      });

      const newImages = formData.images.map((image) => {
        return orm.em.create(Image, {
          url: image,
          appointment: newAppointment,
        });
      });

      newAppointment.images = newImages;

      await orm.em.persistAndFlush([newAppointment, ...newImages]);
      return newAppointment;
    } catch (e) {
      return null;
    }
  }
}

export async function addImageToAppointmentImages(appointmentId, imageUrl) {
  const orm = await getOrm();

  console.log("THIS IS HERE", appointmentId);

  const newImage = orm.em.create(Image, {
    url: imageUrl,
    appointment: appointmentId,
  });

  await orm.em.persistAndFlush(newImage);
  return newImage;
}

export async function removeImageFromAppointmentImages(
  appointmentId,
  imageUrl
) {
  const orm = await getOrm();

  const id = appointmentId.appointmentId;
  const url = id.imageUrl;

  const image = await orm.em.findOne(Image, {
    url: appointmentId.imageUrl,
  });

  const annotations = await orm.em.find(Annotations, {
    image,
  });

  await orm.em.removeAndFlush(annotations);
  await orm.em.remove(image);
}

export async function addAnnotationsToImage(imageId: any, annotations: any) {
  const orm = await getOrm();

  const image = await orm.em.findOne(Image, {
    id: imageId,
  });

  const oldAnnotations = await orm.em.findOne(Annotations, {
    image,
  });

  if (oldAnnotations) {
    await orm.em.removeAndFlush(oldAnnotations);
  }

  const _annotations = await orm.em.create(Annotations, {
    image,
    data: annotations,
  });

  await orm.em.persistAndFlush(_annotations);

  return { code: "success" };
}

export async function removeAnnotationsFromImage(imageId: any) {
  const orm = await getOrm();

  const image = await orm.em.findOne(Image, {
    id: imageId,
  });

  if (!image) {
    return "Image not found!";
  }

  const annotations = await orm.em.find(Annotations, {
    image,
  });

  if (annotations.length > 0) {
    await orm.em.remove(annotations);
  }

  return "success";
}

export async function getAnnotations(imageId: any) {
  const orm = await getOrm();

  const image = await orm.em.findOne(Image, {
    id: imageId,
  });

  if (!image) {
    return { error: "Image not found!" };
  }

  const annotations = await orm.em.findOne(Annotations, {
    image,
  });

  return annotations;
}
