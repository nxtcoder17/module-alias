import fsPromise from 'fs/promises';
import path from 'path';

const controller = {};

controller.exists = async (item) => {
  try{
    await fsPromise.lstat(item);
    return true;
  } catch (err) {
    return false;
  }
};

const packageJson = async () => {
  try{
    const {alias} = await import(`${process.cwd()}/package.json`);
    if (!alias) {
      process.exit(0);
    }
    return alias;
  } catch (err) {
    console.log(err.message);
    process.exit(17);
  }
};


controller.linkAlias = async () => {
  const alias = await packageJson();

  const p = Object.keys(alias).map(async item => {
    const sourcePath = path.resolve(process.cwd(), alias[item])
    const targetPath = path.resolve(process.cwd(), 'node_modules', item);
    const relativePath = path.relative(path.dirname(targetPath), sourcePath);
    await fsPromise.symlink(relativePath, targetPath);
  });

  return Promise.all(p);
}; 

controller.unlinkAlias = async () => {
  const alias = await packageJson();

  const nodeModulesDir = path.resolve(process.cwd(), "node_modules");

  const p = Object.keys(alias).map(async item => {
    const targetPath = path.resolve(process.cwd(), 'node_modules', item);
    if (!await controller.exists(targetPath)) return null;
    await fsPromise.unlink(targetPath);
  });

  return Promise.all(p);
};


export default controller;
