import fs from 'fs';
let code = fs.readFileSync('src/pages/system/AdminPage.tsx', 'utf8');
code = code.replace(
`                </div>
                </div>
              </div>
              <div className="pt-2">`,
`                </div>
              </div>
              <div className="pt-2">`
);
fs.writeFileSync('src/pages/system/AdminPage.tsx', code);
