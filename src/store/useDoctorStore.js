import { create } from "zustand";
import { getDoctors, getDoctorById } from "../api/doctorApi";

export const useDoctorStore = create((set) => ({
  doctors: [],
  selectedDoctor: null,
  loading: false,
  fetchDoctors: async (filters) => {
    set({ loading: true });
    const data = await getDoctors(filters);
    set({ doctors: data, loading: false });
  },
  fetchDoctorById: async (id) => {
    set({ loading: true });
    const data = await getDoctorById(id);
    set({ selectedDoctor: data, loading: false });
  },
}));
