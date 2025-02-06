import Router, { Route } from "preact-router";
import { HomePage } from "../components/pages/home";
import { NotFound } from "../components/pages/not-found";
import { DeletedTasks } from "../components/pages/deleted-task";
import { ProjectView } from "../components/organisms/ProjectView";
import { appendUrlPath } from "../utils/path";

export function Routes() {
  return (
    <Router>
      <Route path={appendUrlPath("/")} component={HomePage} />
      <Route path={appendUrlPath("/deleted-tasks")} component={DeletedTasks} />
      <Route path={appendUrlPath("/projects/:id")} component={ProjectView} />
      <Route default component={NotFound} />
    </Router>
  );
}
