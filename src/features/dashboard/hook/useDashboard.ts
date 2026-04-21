import { useQuery } from "@tanstack/react-query";
import api from "../../../api/axios";



export const useDashboard = () => {
  const statsQuery = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data } = await api.get("/dashboard");
      return data;
    },
  });

  return {
    data: statsQuery.data,
    isLoading: statsQuery.isLoading,
  };
};