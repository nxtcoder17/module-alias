import controller from './controller';

(async () => {
  const cmd = process.argv[2] ? process.argv[2].trim() : null;
  if (!cmd) process.exit(17);

  if (cmd === 'link') {
    await controller.unlinkAlias();
    await controller.linkAlias();
    return;
  }

  if (cmd === 'unlink') {
    await controller.unlinkAlias();
    return;
  }

  console.error(
    'Invalid Command: subcommands [link, unlink] any one of them needs to be specified'
  );
})();
