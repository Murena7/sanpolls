import s from 'shelljs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const outDir = 'dist';

s.rm('-rf', outDir);
s.mkdir(outDir);
s.cp('.env', `${outDir}/.env`);
s.cd('../');
s.cp('-R', 'client/dist/SanSanPolls/*', `api/dist/public`);
