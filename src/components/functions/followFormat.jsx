import React from "react";

export function followFormat(source, target, sourceFollowsTarget, targetFollowsSource) {
  return (
    <div className="text-center text-white">
    <div className="divider divider-primary">Results</div>
      <p>{source} follows {target}</p>
      <span className="badge badge-primary">{sourceFollowsTarget ? "Yes" : "No"}</span>
      <p>{target} follows {source}</p>
      <span className="badge badge-primary">{targetFollowsSource ? "Yes" : "No"}</span>
    </div>
  );
}
