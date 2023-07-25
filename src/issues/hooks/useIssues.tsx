import { IIssue, State } from "../interfaces/Iissues";
import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface Props {
  state?: State;
  labels: string[];
  page?: number;
}

const getIssues = async ({
  labels,
  state,
  page = 1,
}: Props): Promise<IIssue[]> => {
  const params = new URLSearchParams();

  if (state) params.append("state", state);

  if (labels.length > 0) {
    const labelsString = labels.join(",");
    params.append("labels", labelsString);
  } else {
    params.append("labels", "");
  }

  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<IIssue[]>("/issues", { params });

  return data;
};

export const useIssues = ({ labels, state }: Props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [labels, state]);

  const issuesQuery = useQuery(["issues", { state, labels, page }], () =>
    getIssues({ labels, state, page })
  );

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  return {
    issuesQuery,
    page: issuesQuery.isLoading ? "Loading..." : page,
    nextPage,
    prevPage,
  };
};
