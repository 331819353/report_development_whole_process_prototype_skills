import { spawn } from 'node:child_process';
import net from 'node:net';
import path from 'node:path';

const defaultHost = '0.0.0.0';
const defaultMockHost = '127.0.0.1';
const defaultAppPort = 5173;
const defaultMockPort = 4179;
const defaultAttempts = 20;

function readArg(name, fallback) {
  const index = process.argv.indexOf(name);
  if (index >= 0 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  const inlineArg = process.argv.find((arg) => arg.startsWith(`${name}=`));
  if (inlineArg) {
    return inlineArg.slice(name.length + 1);
  }
  return fallback;
}

function isPortAvailable(port, host) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.once('error', () => resolve(false));
    server.once('listening', () => {
      server.close(() => resolve(true));
    });
    server.listen(port, host);
  });
}

async function findAvailablePort(startPort, host, attempts) {
  for (let offset = 0; offset < attempts; offset += 1) {
    const port = startPort + offset;
    if (await isPortAvailable(port, host)) {
      return port;
    }
  }
  throw new Error(`No available port found from ${startPort} to ${startPort + attempts - 1}.`);
}

function startChild(command, args, env) {
  return spawn(command, args, {
    cwd: process.cwd(),
    env: env ?? process.env,
    stdio: 'inherit',
  });
}

const host = readArg('--host', process.env.HOST || defaultHost);
const appPort = Number(readArg('--port', process.env.PORT || defaultAppPort));
const attempts = Number(readArg('--attempts', process.env.PORT_ATTEMPTS || defaultAttempts));
const mockHost = readArg('--mock-host', process.env.MOCK_API_HOST || defaultMockHost);
const mockStartPort = Number(
  readArg('--mock-port', process.env.MOCK_API_PORT || defaultMockPort),
);
const mockPort = await findAvailablePort(mockStartPort, mockHost, attempts);
const apiBaseUrl = `http://${mockHost}:${mockPort}`;

const mockApi = startChild(process.execPath, [
  path.join('scripts', 'mock-api-server.mjs'),
  '--host',
  mockHost,
  '--port',
  String(mockPort),
]);

const viteDev = startChild(
  process.execPath,
  [
    path.join('scripts', 'start-available-port.mjs'),
    '--mode',
    'dev',
    '--host',
    host,
    '--port',
    String(appPort),
    '--attempts',
    String(attempts),
  ],
  {
    ...process.env,
    MOCK_API_BASE_URL: apiBaseUrl,
  },
);

console.log(`[dev:mock] Vite /api proxy target: ${apiBaseUrl}`);

let isShuttingDown = false;

function stopAll(exitCode = 0) {
  if (isShuttingDown) {
    return;
  }
  isShuttingDown = true;
  for (const child of [viteDev, mockApi]) {
    if (!child.killed) {
      child.kill('SIGTERM');
    }
  }
  setTimeout(() => process.exit(exitCode), 200);
}

mockApi.on('exit', (code) => stopAll(code ?? 0));
viteDev.on('exit', (code) => stopAll(code ?? 0));
process.on('SIGINT', () => stopAll(0));
process.on('SIGTERM', () => stopAll(0));
