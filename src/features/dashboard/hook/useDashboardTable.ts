import { useQuery } from "@tanstack/react-query";
import { getDashboardTable } from "../services/dashboard.services";

export const useDashboardTable = () => {
  return useQuery({
    queryKey: ["dashboard-table"],
    queryFn: getDashboardTable,
    staleTime: 1000 * 60 * 5, // cache 5 min
    retry: 1,
  });
};