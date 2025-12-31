import fs from "fs";
import Ajv from "ajv/dist/2020.js";

const map = JSON.parse(fs.readFileSync("validation-map.json", "utf8"));
const ajv = new Ajv2020({ allErrors: true, strict: false });

function validatePair(schemaPath, dataPath) {
  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  const data = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  const validate = ajv.compile(schema);
  const ok = validate(data);

  if (!ok) {
    console.error(`❌ FAIL: ${dataPath}`);
    console.error(validate.errors);
    process.exitCode = 1;
  } else {
    console.log(`✅ OK: ${dataPath}`);
  }
}

for (const p of map.pairs) {
  validatePair(p.schema, p.data);
}
