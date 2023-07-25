import { IIssue, State } from "../interfaces/Iissues";
import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";

interface Props {
  state?: State;
  labels: string[];
}

const getIssues = async (
  labels: string[],
  state?: State
): Promise<IIssue[]> => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  } else {
    params.append("labels", "");
  }

  params.append("page", "1");
  params.append("per_page", "5");

  const { data } = await githubApi.get<IIssue[]>("/issues", { params });

  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const issuesQuery = useQuery(["issues", { state, labels }], () =>
    getIssues(labels, state)
  );
  return { issuesQuery };
};
