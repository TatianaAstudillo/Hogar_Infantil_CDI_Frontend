import api from "../../../api/axios";
import { DashboardRow } from "../types/dashboard.types";

export const getDashboardTable = async (): Promise<DashboardRow[]> => {
  const { data } = await api.get("/seguimiento");
  return data;
};