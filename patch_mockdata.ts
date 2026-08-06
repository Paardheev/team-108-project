import fs from 'fs';
let code = fs.readFileSync('src/data/mockData.ts', 'utf8');

code = code.replace(/'Super Coordinator'/g, "'Coordinator'");
code = code.replace(/'Member'/g, "'Club Member'");

fs.writeFileSync('src/data/mockData.ts', code);
