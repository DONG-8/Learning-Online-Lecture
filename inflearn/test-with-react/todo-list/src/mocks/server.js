import { setupWorker } from "msw";
import { handler } from "./handler";

// mocking server 생성
export const server = setupWorker(...handler);
