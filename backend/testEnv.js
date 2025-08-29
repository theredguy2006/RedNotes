import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const envPath = path.resolve(process.cwd(), '.env');
console.log('.env path ->', envPath);
if (!fs.existsSync(envPath)) {
  console.log('.env not found');
  process.exit(1);
}

const raw = fs.readFileSync(envPath);
console.log('raw length:', raw.length);
console.log('raw as string (first 200 chars):', raw.toString('utf8').slice(0,200));

// show first 50 code points
const codes = [];
for (let i = 0; i < Math.min(raw.length, 100); i++) codes.push(raw[i]);
console.log('first bytes:', codes.join(','));

try {
  const parsed = dotenv.parse(raw);
  console.log('dotenv.parse result keys:', Object.keys(parsed));
  console.log('parsed object:', parsed);
} catch (e) {
  console.error('dotenv.parse error:', e);
}

const cfg = dotenv.config({ path: envPath });
console.log('dotenv.config result:', cfg);
console.log('process.env.MONGO_URI after config:', process.env.MONGO_URI);
console.log('process.env.PORT after config:', process.env.PORT);

// testEnv removed - no-op
