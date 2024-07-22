import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { exit } from 'process';
import { dartFiles } from './dart_files';
import { convertZod2Dart } from './zod2dart';

export const generatorOpts = Object.freeze({
  outputBaseDir: path.join(__dirname, '../../../../../dart/mobile'),
});

function sh(cmd: string) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function main() {
  const outputDir = path.join(generatorOpts.outputBaseDir, '/lib/models');
  const dirExist = await fs
    .access(outputDir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);
  if (dirExist) await fs.rm(outputDir, { recursive: true });
  await fs.mkdir(outputDir, { recursive: true });

  await convertZod2Dart(dartFiles);

  await Promise.all(
    Object.entries(dartFiles).map(async ([fileName, content]) => {
      await fs.writeFile(path.join(outputDir, fileName), content);
      await sh(`dart format ${path.join(outputDir, fileName)}`);
    }),
  );

  console.info('Running Freezed build runner...');
  await sh(
    `cd "${generatorOpts.outputBaseDir}" && dart run build_runner build --delete-conflicting-outputs`,
  );

  exit(0);
}
main();
