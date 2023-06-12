import { Issue } from "../interfaces/Issues";
import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";

const getIssues = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get<Issue[]>("/issues");

  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getIssues);
  return { issuesQuery };
};
