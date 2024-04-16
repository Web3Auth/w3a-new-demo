import { Buffer } from "buffer";
import process from "process";

window.global = globalThis;
globalThis.Buffer = globalThis.Buffer || Buffer;
process.env = { ...process.env, ...(globalThis.process?.env || {}) };
globalThis.process = process;

// Dont remove this line, unless you can fix the env issue with vite.
process.env.VITE_APP_INFURA_PROJECT_KEY = import.meta.env.VITE_APP_INFURA_PROJECT_KEY;