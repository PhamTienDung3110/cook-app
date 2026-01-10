import { architectureLeadership } from "./architectureLeadership";
import { authSecurity } from "./authSecurity";
import { dataFetching } from "./dataFetching";
import { hook } from "./hook";
import { performance } from "./performance";
import { rendering } from "./rendering";
import { stateManagement } from "./stateManagement";
import { systemDesign } from "./systemDesign";
import { testQuality } from "./testQuality";

export const QnAReact = [
  ...rendering,
  ...hook,
  ...performance,
  ...dataFetching,
  ...stateManagement,
  ...authSecurity,
  ...testQuality,
  ...architectureLeadership,
  ...systemDesign,
]