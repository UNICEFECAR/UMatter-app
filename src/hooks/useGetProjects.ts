import { IProjectResponse } from "#types";
import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../constants";

export default function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(`${API_BASE}/projects?populate=*`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      return data.data.map((x: IProjectResponse) => ({
        ...x,
        name: x.Name,
        description: x.Description,
        imageUrl: x.image?.url || null,
      }));
    },
  });
}

export { useGetProjects };
