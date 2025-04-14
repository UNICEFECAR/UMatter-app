import { IProjectResponse } from "#types";
import { useQuery } from "@tanstack/react-query";

export default function useGetProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await fetch(
        "https://138f-84-43-197-84.ngrok-free.app/api/projects"
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data.data.map((x: IProjectResponse) => ({
        ...x,
        name: x.Name,
        description: x.Description,
      }));
    },
  });
}

export { useGetProjects };
