import fs from 'fs';
let code = fs.readFileSync('src/pages/system/GlobalSearchPage.tsx', 'utf8');

code = code.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';"
);

code = code.replace(
  "import { Link } from 'react-router-dom';",
  "import { Link, useLocation, useNavigate } from 'react-router-dom';"
);

const stateCode = `  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    setQuery(q);
  }, [location.search]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    navigate(\`/search?q=\${encodeURIComponent(newQuery)}\`, { replace: true });
  };`

code = code.replace(
  "  const [query, setQuery] = useState('');",
  stateCode
);

code = code.replace(
  "onChange={e => setQuery(e.target.value)}",
  "onChange={handleQueryChange}"
);

fs.writeFileSync('src/pages/system/GlobalSearchPage.tsx', code);
