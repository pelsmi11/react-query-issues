import { useQuery } from "@tanstack/react-query";
import { IIssue } from "../interfaces/Iissues";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers/sleep";

export const getIsueInfo = async (issueNumber: number): Promise<IIssue> => {
  sleep(2);
  const { data } = await githubApi.get<IIssue>(`/issues/${issueNumber}`);

  return data;
};

export const getIssueComments = async (
  issueNumber: number
): Promise<IIssue[]> => {
  sleep(2);
  const { data } = await githubApi.get<IIssue[]>(
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
