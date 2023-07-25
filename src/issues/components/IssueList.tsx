import { FC } from "react";
import { IIssue, State } from "../interfaces/Iissues";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: IIssue[];
  state?: State;
  onStateChange: (state?: State) => void;
}

export const IssueList: FC<Props> = ({ issues, onStateChange, state }) => {
  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              className={`nav-link  ${!state ? "active" : ""}`}
              onClick={() => onStateChange()}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link  ${state === State.Open ? "active" : ""}`}
              onClick={() => onStateChange(State.Open)}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link  ${state === State.Closed ? "active" : ""}`}
              onClick={() => onStateChange(State.Closed)}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
