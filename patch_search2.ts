import fs from 'fs';
let code = fs.readFileSync('src/pages/system/GlobalSearchPage.tsx', 'utf8');

const replacement = `export const GlobalSearchPage: React.FC = () => {
  const { tasks, events, announcements, resources, discussions, globalSearchQuery, setGlobalSearchQuery } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    if (q && q !== globalSearchQuery) {
      setGlobalSearchQuery(q);
    }
  }, [location.search, setGlobalSearchQuery]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setGlobalSearchQuery(newQuery);
    navigate(\`/search?q=\${encodeURIComponent(newQuery)}\`, { replace: true });
  };

  const matchingTasks = tasks.filter(t => t.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));
  const matchingEvents = events.filter(e => e.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));
  const matchingAnnouncements = announcements.filter(a => a.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));
  const matchingResources = resources.filter(r => r.title.toLowerCase().includes(globalSearchQuery.toLowerCase()));`

code = code.replace(
  /export const GlobalSearchPage: React\.FC = \(\) => \{[\s\S]*?const matchingResources = [^\n]+;/m,
  replacement
);

code = code.replace(/query\.trim\(\)/g, "globalSearchQuery.trim()");
code = code.replace(/value=\{query\}/g, "value={globalSearchQuery}");

fs.writeFileSync('src/pages/system/GlobalSearchPage.tsx', code);
