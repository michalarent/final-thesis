export type MedicationType = {
  id: number;
  name: string;
  description: string;
  type: "Ointment" | "Tablet" | "Capsule" | "Syrup" | "Inhaler" | "Herbal";
};
