import fsPromise from 'fs/promises';
import fs from 'fs';
import path from 'path';

const controller = {};

controller.exists = async (item) => {
  try {
    await fsPromise.lstat(item);
    return true;
  } catch (err) {
    return false;
  }
};

const packageJson = async () => {
  try {
    const content = await fsPromise.readFile(`${process.cwd()}/package.json`);
    const data = JSON.parse(content.toString());
    if (!data.alias) {
      process.exit(0);
    }
    return data;
  } catch (err) {
    // console.log(err.message);
    return process.exit(17);
  }
};

controller.linkAlias = async () => {
  const { alias } = await packageJson();

  const p = Object.keys(alias).map(async (item) => {
    const sourcePath = path.resolve(process.cwd(), alias[item]);
    const targetPath = path.resolve(process.cwd(), 'node_modules', item);
    const relativePath = path.relative(path.dirname(targetPath), sourcePath);
    await fsPromise.symlink(relativePath, targetPath);
  });

  const jsconfigPath = `${process.cwd()}/jsconfig.json`;

  if (await controller.exists(jsconfigPath)) {
    const pathAliases = Object.entries(alias).reduce((acc, [k, v]) => {
      const stat = fs.lstatSync(v);
      if (stat.isDirectory()) {
        return { ...acc, [`${k}/*`]: [`${v}/*`] };
      }
      return {
        ...acc,
        [k]: [v],
      };
    }, {});

    const content = await fsPromise.readFile(jsconfigPath);
    const jsconfig = JSON.parse(content.toString());
    jsconfig.compilerOptions = jsconfig.compilerOptions || {};
    jsconfig.compilerOptions.paths = {
      ...(jsconfig.compilerOptions.paths || {}),
      ...pathAliases,
    };

    await fsPromise.writeFile(jsconfigPath, JSON.stringify(jsconfig, null, 2));
  }

  return Promise.all(p);
};

controller.unlinkAlias = async () => {
  const { alias } = await packageJson();

  const p = Object.keys(alias).map(async (item) => {
    const targetPath = path.resolve(process.cwd(), 'node_modules', item);
    if (!(await controller.exists(targetPath))) return null;
    return fsPromise.unlink(targetPath);
  });

  return Promise.all(p);
};

export default controller;
