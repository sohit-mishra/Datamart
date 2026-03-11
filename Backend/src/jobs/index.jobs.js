import { startCacheCleanupJob } from "./cacheCleanup.job.js";
import { startHealthCheckJob } from "./healthCheck.job.js";

export const startJobs = () => {

  startCacheCleanupJob();
  startHealthCheckJob();

};