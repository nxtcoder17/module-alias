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
npx @madhouselabss/module-alias alias link

# to remove module aliases
npx @madhouselabss/module-alias alias unlink
```

