import fs from 'fs';
let code = fs.readFileSync('src/pages/events/CreateEventPage.tsx', 'utf8');

code = code.replace(
  "const { createEvent, currentUser } = useApp();",
  "const { createEvent, currentUser, activeClub, users } = useApp();"
);

const advisorCheckCode = `
  const facultyAdvisor = activeClub?.facultyAdvisorId 
    ? users.find(u => u.id === activeClub.facultyAdvisorId) 
    : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyAdvisor) {
      alert("Events cannot be created: This club does not have a Faculty Advisor assigned.");
      return;
    }
`

code = code.replace(
  "  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault();",
  advisorCheckCode
);

const advisorDisplayCode = `
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>Schedule New Club Event</span>
        </h1>
        <p className="text-xs text-slate-500">
          Configure event details, volunteer needs, venue logistics, and timeline.
        </p>
        <div className="mt-2 p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
          <Users className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">
            Faculty Advisor: {facultyAdvisor ? facultyAdvisor.fullName : <span className="text-red-500">None Assigned (Cannot create event)</span>}
          </span>
        </div>
      </div>
`

code = code.replace(
  `      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
        <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span>Schedule New Club Event</span>
        </h1>
        <p className="text-xs text-slate-500">
          Configure event details, volunteer needs, venue logistics, and timeline.
        </p>
      </div>`,
  advisorDisplayCode
);

const disableSubmitCode = `
          <button
            type="submit"
            disabled={!facultyAdvisor}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Publish Event
          </button>
`

code = code.replace(
  `          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Publish Event
          </button>`,
  disableSubmitCode
);

fs.writeFileSync('src/pages/events/CreateEventPage.tsx', code);
