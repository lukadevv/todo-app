import Router, { Route } from "preact-router";
import { HomePage } from "../components/pages/home";
import { NotFound } from "../components/pages/not-found";
import { DeletedTasks } from "../components/pages/deleted-task";
import { ProjectView } from "../components/organisms/ProjectView";

export function Routes() {
  return (
    <Router>
      <Route path="/" component={HomePage} />
      <Route path="/deleted-tasks" component={DeletedTasks} />
      <Route path="/projects/:id" component={ProjectView} />
      <Route default component={NotFound} />
    </Router>
  );
}
