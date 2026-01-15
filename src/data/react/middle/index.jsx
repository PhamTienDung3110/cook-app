import { rendering } from "./rendering";
import { hook } from "./hook";
import { performance } from "./performance";
import { dataFetching } from "./dataFetching";
import { stateManagement } from "./stateManagement";
import { authSecurity } from "./authSecurity";
import { testQuality } from "./testQuality";
import { architectureLeadership } from "./architectureLeadership";
import { systemDesign } from "./systemDesign";

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
