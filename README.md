# @madhouselabs/module-alias

### Configuration
You would need to have a field `alias` in your package.json, which would look something like this. 

***
`@madhouselabs/module-alias` works by creating a symlink for specified path in package.json in the **Current Working Directory**
***

```json
{
  "alias": {
    "@sample": "./example/sample.js",
    "@models": "./models"
  }
}
```

### How To Use

```bash
# to create module aliases 
pnpx @madhouselabss/module-alias link
# to remove module aliases
pnpx @madhouselabss/module-alias unlink
```

if you are stuck with using npm and npx, replace `pnpx` in above command with `npx`

### After running `link` command

```bash
> ls -l node_modules

@sample => ../example/sample.js
@models => ../models
```

### Integrate your IDE

In your **jsconfig.json/tsconfig.json**, add a section for `paths`, like this

```json
{
  "compilerOptions": {
    "target": "es6",
    "paths": {
      "@sample": ["./example/sample.js"],
      "@models/*": ["./models/*"]
    }
  }
}
```

After adding this, and restarting your LSP server, editor would throw import suggestions with these path-maps.

## Now you can enjoy cleaner imports 😍
