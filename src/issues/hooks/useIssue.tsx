import { useQuery } from "@tanstack/react-query";
import { Issue } from "../interfaces/Issues";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

const getIsueInfo = async (issueNumber: number): Promise<Issue> => {
  sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);

  return data;
};

const getIssueComments = async (issueNumber: number): Promise<Issue[]> => {
  sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIsueInfo(issueNumber)
  );
  const commentsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getIssueComments(issueQuery.data!.number),
    {
      enabled: issueQuery.data !== undefined,
    }
  );
  return { issueQuery, commentsQuery };
};
