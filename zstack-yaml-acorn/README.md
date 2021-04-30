## script

scripts:{
"parserCode":"zstack-yaml-parser -d './test' -p '\\.e2e-spec\\.ts$' -t"
}

## parser command param

```js
program
  .option("-d, --dir [value]", "directory for parser")
  .option("-f, --files [value...]", "files for parser")
  .option("-p, --pattern [value]", "file math pattern")
  .option("-x, --extension [value]", "file extension", ".e2e-spec.ts")
  .option("-m, --mode [items]", "parser mode", "single")
  .option("-w, --watch", "watch files", false)
  .option("-r, --over-write", "over write parser files", false)
  .option("-t, --prettier", "prettier output files", false)
  .option("-b, --debug", "debug mode", false)
  .option(
    "-i, --import-resource-path [value]",
    "resource import path",
    "@test/features/helper/env-generator"
  );
```

index.js

```js
dumpYaml(yamlFilePath: string, yamlTag: string, config?: DumpConfig))
//etc:
 const path = "@/ps.yaml"
  const res = dumpYaml(path, "ts-source_test_vip_query-use-for-slb-load-balancer" , {
    resourcePath:"@test/features/helper/env-generator"
  });

  const {vip,...rest} = res

```
