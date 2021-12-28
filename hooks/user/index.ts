import { useRouter } from "next/router";
import useSWR from "swr";
import Router from "next/router";
import apiCall from "../../common/api/ApiCall";
import Patient from "../../db/Patient";
import { Doctor } from "../../db/Doctor";
import { getMedicalHistory, getPatient } from "../../common/api";
import { useEffect, useState } from "react";
import React from "react";
import _ from "lodash";

export interface IUserProfile {
  email: string;
  name: string;
  new: boolean;
  createdAt: Date;
  imageUrl?: string;
  authId: string;
}

const userFetcher = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((data) => {
      return { user: data?.user || null };
    });

const patientFetcher = (url) => fetch(url).then((r) => r.json());

export function useUser(
  {
    redirectTo,
    redirectIfFound,
  }: { redirectIfFound?: string; redirectTo?: string } = {
    redirectTo: "/api/auth/login",
  }
): IUserProfile {
  const { data, error } = useSWR("/api/user", userFetcher);

  const user = data?.user as IUserProfile;

  return user
    ? {
        ...user,
      }
    : null;
}

export function usePatient(authId: string): any {
  const [patient, setPatient] = useState<Patient | null>(null);

  async function fetchData(url) {
    const response = await apiCall(url, "GET");
    setPatient(response);
    return response;
  }
  useEffect(() => {
    if (authId) {
      fetchData(`/api/patient?user=${authId}`);
    }
  }, [authId]);

  return patient;
}

export function useDoctor(authId: string): any {
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  async function fetchData(url) {
    const response = await apiCall(url, "GET");
    console.log("Response:", response);
    setDoctor(!_.isEmpty(response) ? (response as Doctor) : null);
    return response;
  }
  useEffect(() => {
    if (authId) {
      fetchData(`/api/doctor?user=${authId}`);
    }
  }, [authId]);

  return doctor;
}

export function useWounds(authId: string): any {
  const [wounds, setWounds] = useState<any>(null);

  async function fetchData(url) {
    const response = await apiCall(url, "GET");
    setWounds(response);
    return response;
  }
  useEffect(() => {
    if (authId) {
      fetchData(`/api/patient/wound?user=${authId}`);
    }
  }, [authId]);

  return wounds;
}

export function useDoctors() {
  const fetcher = (url) => {
    return fetch(url).then((r) => r.json().then((data) => ({ data })));
  };
  const { data: doctors, error } = useSWR("/api/doctor/all", fetcher);

  return doctors?.data || [];
}

export function useAppointments(authId: string) {
  const [appointments, setAppointments] = useState<any>(null);

  async function fetchData(url) {
    const response = await apiCall(url, "GET");
    setAppointments(response);
    return response;
  }
  useEffect(() => {
    if (authId) {
      fetchData(`/api/appointment?user=${authId}`);
    }
  }, [authId]);

  return appointments;
}
