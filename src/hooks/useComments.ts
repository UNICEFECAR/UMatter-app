import { IComment } from "#types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API_BASE } from "../constants";

export function useGetComments(projectId: string) {
  return useQuery({
    queryKey: ["comments", projectId],
    queryFn: async () => {
      const response = await fetch(
        `${API_BASE}/comments?filters[project][documentId][$eq]=${projectId}&sort=createdAt:desc`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      return data.data as IComment[];
    },
  });
}

interface CreateCommentParams {
  projectId: string;
  author: string;
  content: string;
  rating?: number;
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      author,
      content,
      rating,
    }: CreateCommentParams) => {
      const response = await fetch(`${API_BASE}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            author,
            content,
            rating: rating || null,
            project: projectId,
            date: new Date().toISOString(),
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create comment");
      }

      return response.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.projectId],
      });
    },
  });
}
