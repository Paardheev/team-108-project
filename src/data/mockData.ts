import { 
  Club, User, ClubMembership, Permission, Announcement, AnnouncementRecipient, 
  Event, EventRegistration, Task, DiscussionPost, Comment, Resource, 
  AttendanceSession, AttendanceRecord, Competition, CompetitionParticipant, 
  NotificationItem, SkillItem, UserSkill, AvailabilitySlot, AuditLog 
} from '../types';

export const mockClubs: Club[] = [
  {
    id: 1,
    name: 'CFI Clubs',
    code: 'CFI',
    description: 'Centre for Innovation - The ultimate student innovation hub at IIT Madras.',
    logo: '⚡',
    category: 'Technical Innovation Hub',
    memberCount: 240,
    createdDate: '2020-08-15'
  },
  {
    id: 2,
    name: 'Raftar Formula Racing',
    code: 'RAFTAR',
    description: 'Student Formula Racing team designing and building electric racecars for international competitions.',
    logo: '🏎️',
    category: 'Automotive & Racing',
    memberCount: 65,
    createdDate: '2018-03-10'
  },
  {
    id: 3,
    name: 'Avishkar Hyperloop',
    code: 'HYPER',
    description: 'Building pod prototypes for sub-surface high-speed hyperloop transport systems.',
    logo: '🚅',
    category: 'Aerospace & Transport',
    memberCount: 52,
    createdDate: '2019-01-20'
  },
  {
    id: 4,
    name: 'Shaastra Team',
    code: 'SHAASTRA',
    description: 'Organizing committee for IIT Madras annual technical festival Shaastra.',
    logo: '✨',
    category: 'Technical Festival',
    memberCount: 180,
    createdDate: '2015-09-01'
  },
  {
    id: 5,
    name: 'Programming Club',
    code: 'PCLUB',
    description: 'Competitive programming, open-source development, systems, and AI enthusiast community.',
    logo: '💻',
    category: 'Software & Computing',
    memberCount: 120,
    createdDate: '2017-04-12'
  },
  {
    id: 6,
    name: 'Robotics Club',
    code: 'ROBO',
    description: 'Designing autonomous mobile robots, drones, manipulation arms, and embedded systems.',
    logo: '🤖',
    category: 'Robotics & Mechatronics',
    memberCount: 88,
    createdDate: '2016-11-05'
  },
  {
    id: 7,
    name: 'E-Cell',
    code: 'ECELL',
    description: 'Entrepreneurship Cell fostering startup culture, venture acceleration, and funding pitches.',
    logo: '🚀',
    category: 'Entrepreneurship',
    memberCount: 95,
    createdDate: '2016-02-14'
  }
];

export const mockUsers: User[] = [
  {
    id: 101,
    fullName: 'Dinesh Falle',
    email: 'ee25b049@smail.iitm.ac.in',
    phone: '+91 98765 43210',
    department: 'Core Team',
    academicYear: 4,
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    role: 'Club Head',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2023-07-20',
    bio: 'Product Manager & CFI Head lead driving cross-club synergies and strategic innovation projects.',
    achievements: ['Inter-IIT Tech Meet Gold Medalist', 'CFI Best Project Award 2025'],
    certifications: ['Agile Scrum Product Owner', 'Google Cloud Certified Engineer'],
    status: 'Active'
  },
  {
    id: 102,
    fullName: 'Paardheev',
    email: 'cs23b087@smail.iitm.ac.in',
    phone: '+91 98765 43211',
    department: 'Software & AI',
    academicYear: 3,
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    role: 'Coordinator',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2023-08-01',
    bio: 'Backend architect specializing in distributed systems, real-time sync, and scalable web apps.',
    achievements: ['GSOC 2024 Contributor', 'ICP-CC Regional Qualifier'],
    certifications: ['AWS Solutions Architect Associate'],
    status: 'Active'
  },
  {
    id: 103,
    fullName: 'Gunja Tejaswi',
    email: 'cs23b023@smail.iitm.ac.in',
    phone: '+91 98765 43212',
    department: 'Media & Design',
    academicYear: 3,
    profilePicture: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    role: 'Coordinator',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2023-08-05',
    bio: 'UI/UX Designer and Frontend Specialist passionate about high-fidelity user interaction systems.',
    achievements: ['Shaastra Brand Design Winner', 'Best Design System 2025'],
    certifications: ['Figma UX Professional Certification'],
    status: 'Active'
  },
  {
    id: 104,
    fullName: 'Kanikicharla Vedasree',
    email: 'cs23b082@smail.iitm.ac.in',
    phone: '+91 98765 43213',
    department: 'Software & AI',
    academicYear: 3,
    profilePicture: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=250',
    role: 'Team Lead',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2023-08-10',
    bio: 'Code reviewer & quality engineering lead driving software integrity across sub-teams.',
    achievements: ['HackIITM First Runner-Up'],
    status: 'Active'
  },
  {
    id: 105,
    fullName: 'V Pravas',
    email: 'da25b051@smail.iitm.ac.in',
    phone: '+91 98765 43214',
    department: 'Events & Operations',
    academicYear: 2,
    profilePicture: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    role: 'Club Member',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2024-08-01',
    bio: 'Data analytics enthusiast & QA tester evaluating venue logistics and participation metrics.',
    status: 'Active'
  },
  {
    id: 106,
    fullName: 'Prof. Nishad Kothari',
    email: 'facad_cfi@iitm.ac.in',
    phone: '+91 94440 12345',
    department: 'Core Team',
    academicYear: 0,
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=250',
    role: 'Faculty Advisor',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2022-01-01',
    bio: 'Faculty Advisor overseeing CFI projects, compliance, budget approvals, and academic guidance.',
    status: 'Active'
  },
  {
    id: 107,
    fullName: 'Harini Subramanian',
    email: 'ee24b012@smail.iitm.ac.in',
    phone: '+91 98765 43215',
    department: 'Media & Design',
    academicYear: 2,
    profilePicture: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    role: 'Volunteer',
    currentClubId: 1,
    joinedClubIds: [1, 5, 6],
    joinedDate: '2024-08-15',
    bio: 'Volunteer coordinator helping manage social media accounts and workshop registrations.',
    status: 'Active'
  }
];

export const mockPermissions: Permission[] = [
  { id: 1, name: 'Manage Members', category: 'Members', description: 'Add, remove, or edit member roles and department assignments' },
  { id: 2, name: 'Task Management', category: 'Tasks', description: 'Create, assign, review, and delete club tasks and checkpoints' },
  { id: 3, name: 'Event Management', category: 'Events', description: 'Schedule events, manage volunteer allocations, and post reports' },
  { id: 4, name: 'Resource Upload', category: 'Resources', description: 'Upload documents, brand assets, CAD models, and manage repository' },
  { id: 5, name: 'Attendance Management', category: 'Attendance', description: 'Generate QR codes and manually edit attendance records' },
  { id: 6, name: 'Broadcast Announcements', category: 'Announcements', description: 'Send club-wide, channel-specific, or urgent announcements' }
];

export const mockAnnouncements: Announcement[] = [
  {
    id: 1,
    clubId: 1,
    creatorId: 101,
    creatorName: 'Dinesh Falle',
    creatorRole: 'Club Head',
    title: 'Mid-Semester CFI All-Hands Review & Demo Day',
    content: 'All coordinators and core members are requested to gather at the CFI Main Hall on Saturday at 5:00 PM. Each team will present a 5-minute checkpoint update.',
    targetChannels: ['Everyone', 'Core Team'],
    priority: 'Urgent',
    isPinned: true,
    requiresApproval: true,
    approvalStatus: 'Approved',
    approvedBy: 'Prof. Nishad Kothari',
    createdAt: '2026-07-22T10:30:00Z',
    readCount: 47,
    totalTargetUsers: 63
  },
  {
    id: 2,
    clubId: 1,
    creatorId: 103,
    creatorName: 'Gunja Tejaswi',
    creatorRole: 'Coordinator',
    title: 'Updated Brand Assets & Poster Templates for Shaastra 2026',
    content: 'The media team has released new Figma component libraries and vector logos in the Resource Repository under /Media/2026/Brand Assets. Please adhere strictly to typographic guidelines.',
    targetChannels: ['Media & Design', 'Software & AI'],
    priority: 'Important',
    isPinned: false,
    requiresApproval: false,
    approvalStatus: 'Approved',
    createdAt: '2026-07-21T14:15:00Z',
    readCount: 38,
    totalTargetUsers: 45
  },
  {
    id: 3,
    clubId: 1,
    creatorId: 102,
    creatorName: 'Paardheev',
    creatorRole: 'Coordinator',
    title: 'Backend API Migration & Authentication Key Refresh',
    content: 'We are completing the migration to the new role-based permission database tables today between 11:00 PM and 1:00 AM. Minor downtime may occur in local sync tools.',
    targetChannels: ['Software & AI'],
    priority: 'Normal',
    isPinned: false,
    requiresApproval: true,
    approvalStatus: 'Approved',
    approvedBy: 'Dinesh Falle',
    createdAt: '2026-07-20T18:00:00Z',
    readCount: 22,
    totalTargetUsers: 25
  }
];

export const mockAnnouncementRecipients: AnnouncementRecipient[] = [
  { id: 1, announcementId: 1, userId: 101, userName: 'Dinesh Falle', isRead: true, readAt: '2026-07-22T10:31:00Z' },
  { id: 2, announcementId: 1, userId: 102, userName: 'Paardheev', isRead: true, readAt: '2026-07-22T10:45:00Z' },
  { id: 3, announcementId: 1, userId: 103, userName: 'Gunja Tejaswi', isRead: true, readAt: '2026-07-22T11:02:00Z' },
  { id: 4, announcementId: 1, userId: 104, userName: 'Kanikicharla Vedasree', isRead: false },
  { id: 5, announcementId: 1, userId: 105, userName: 'V Pravas', isRead: false }
];

export const mockEvents: Event[] = [
  {
    id: 201,
    clubId: 1,
    title: 'Inter-IIT Tech Meet Hackathon 2026',
    description: '48-hour continuous technical hackathon problem statement briefing and team formation event.',
    banner: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    organizer: 'CFI Core Committee',
    venue: 'CRC Building Hall 101, IIT Madras',
    eventDate: '2026-08-05T09:00:00Z',
    registrationDeadline: '2026-08-02T23:59:00Z',
    capacity: 200,
    registeredCount: 142,
    category: 'Hackathon',
    status: 'Registration Open',
    requiredVolunteers: 12,
    assignedVolunteersCount: 9,
    contactPerson: 'Paardheev',
    contactPhone: '+91 98765 43211',
    timeline: [
      { id: 1, title: 'Event Created', status: 'completed', date: '2026-07-15' },
      { id: 2, title: 'Registrations Open', status: 'current', date: '2026-07-20' },
      { id: 3, title: 'Volunteer Selection', status: 'upcoming', date: '2026-08-01' },
      { id: 4, title: 'Venue Confirmed', status: 'upcoming', date: '2026-08-03' },
      { id: 5, title: 'Event Day', status: 'upcoming', date: '2026-08-05' },
      { id: 6, title: 'Report Uploaded', status: 'upcoming' },
      { id: 7, title: 'Closed', status: 'upcoming' }
    ]
  },
  {
    id: 202,
    clubId: 1,
    title: 'Autonomous Mobile Robot (AMR) Hardware Workshop',
    description: 'Hands-on training session covering ROS2 navigation, LiDAR mapping, and motor driver calibration.',
    banner: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    organizer: 'Robotics Club Lead',
    venue: 'CFI Robotics Workshop Lab',
    eventDate: '2026-07-18T14:00:00Z',
    registrationDeadline: '2026-07-16T18:00:00Z',
    capacity: 50,
    registeredCount: 50,
    category: 'Workshop',
    status: 'Completed',
    requiredVolunteers: 5,
    assignedVolunteersCount: 5,
    contactPerson: 'Gunja Tejaswi',
    contactPhone: '+91 98765 43212',
    timeline: [
      { id: 1, title: 'Event Created', status: 'completed', date: '2026-07-01' },
      { id: 2, title: 'Registrations Open', status: 'completed', date: '2026-07-05' },
      { id: 3, title: 'Volunteer Selection', status: 'completed', date: '2026-07-10' },
      { id: 4, title: 'Venue Confirmed', status: 'completed', date: '2026-07-12' },
      { id: 5, title: 'Event Day', status: 'completed', date: '2026-07-18' },
      { id: 6, title: 'Report Uploaded', status: 'completed', date: '2026-07-19' },
      { id: 7, title: 'Closed', status: 'completed', date: '2026-07-20' }
    ],
    report: {
      summary: 'Successfully trained 50 participants on ROS2 Navigation stack and custom differential drive robot kits.',
      photos: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=400',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=400'
      ],
      attendanceCount: 48,
      expenditure: 12500,
      feedbackScore: 4.9,
      winners: ['Team CyberDyne (1st)', 'Team RoboPulse (2nd)'],
      reportPdfUrl: '/reports/amr_workshop_2026_final.pdf'
    }
  }
];

export const mockTasks: Task[] = [
  {
    id: 301,
    clubId: 1,
    creatorId: 101,
    creatorName: 'Dinesh Falle',
    assigneeId: 103,
    assigneeName: 'Gunja Tejaswi',
    assigneeRole: 'Coordinator',
    reviewerId: 102,
    reviewerName: 'Paardheev',
    title: 'Design Promotional Posters & Social Banners for Tech Meet 2026',
    description: 'Create standardized graphic assets in Figma using official primary palette and vector icon set.',
    department: 'Media & Design',
    priority: 'High',
    deadline: '2026-07-28',
    estimatedHours: 12,
    status: 'In Progress',
    progressPercent: 60,
    createdAt: '2026-07-20',
    checkpoints: [
      { id: 1, taskId: 301, sequenceNumber: 1, title: 'Draft Wireframe & Color Selection', completed: true },
      { id: 2, taskId: 301, sequenceNumber: 2, title: 'Review by Core Team', completed: true },
      { id: 3, taskId: 301, sequenceNumber: 3, title: 'Corrections and Typography Adjustments', completed: true },
      { id: 4, taskId: 301, sequenceNumber: 4, title: 'Final High-Res Export', completed: false, requiredProofType: 'image' },
      { id: 5, taskId: 301, sequenceNumber: 5, title: 'Uploaded to Resource Repository', completed: false, requiredProofType: 'link' }
    ]
  },
  {
    id: 302,
    clubId: 1,
    creatorId: 102,
    creatorName: 'Paardheev',
    assigneeId: 104,
    assigneeName: 'Kanikicharla Vedasree',
    assigneeRole: 'Team Lead',
    reviewerId: 101,
    reviewerName: 'Dinesh Falle',
    title: 'Implement Role-Based Delegated Permission Checks in API Gateway',
    description: 'Build backend middleware verifying membership token roles and customized permission flags.',
    department: 'Software & AI',
    priority: 'Critical',
    deadline: '2026-07-26',
    estimatedHours: 16,
    status: 'Waiting Review',
    progressPercent: 90,
    createdAt: '2026-07-18',
    checkpoints: [
      { id: 10, taskId: 302, sequenceNumber: 1, title: 'Schema Definition & Drizzle Migration', completed: true },
      { id: 11, taskId: 302, sequenceNumber: 2, title: 'Express Middleware Logic', completed: true },
      { id: 12, taskId: 302, sequenceNumber: 3, title: 'Unit Tests for Edge Cases', completed: true, requiredProofType: 'PDF', submittedProof: { fileUrl: 'https://example.com/test-report.pdf', remarks: 'Passed all 24 unit test suites with 98% coverage.', submittedAt: '2026-07-22T16:00:00Z', submittedBy: 'Kanikicharla Vedasree', approvalStatus: 'Pending' } }
    ]
  },
  {
    id: 303,
    clubId: 1,
    creatorId: 101,
    creatorName: 'Dinesh Falle',
    assigneeId: 105,
    assigneeName: 'V Pravas',
    assigneeRole: 'Club Member',
    reviewerId: 103,
    reviewerName: 'Gunja Tejaswi',
    title: 'Venue Logistics & Sound Equipment Procurement',
    description: 'Coordinate with Dean of Students Office for CRC Hall sound system clearance.',
    department: 'Events & Operations',
    priority: 'Medium',
    deadline: '2026-08-01',
    estimatedHours: 8,
    status: 'Pending',
    progressPercent: 0,
    createdAt: '2026-07-21',
    checkpoints: [
      { id: 20, taskId: 303, sequenceNumber: 1, title: 'Submit Requisition Form', completed: false, requiredProofType: 'PDF' },
      { id: 21, taskId: 303, sequenceNumber: 2, title: 'Collect Hall Keys & Sound Desk Approval', completed: false }
    ]
  }
];

export const mockDiscussionPosts: DiscussionPost[] = [
  {
    id: 401,
    clubId: 1,
    authorId: 102,
    authorName: 'Paardheev',
    authorRole: 'Coordinator',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    category: 'Ideas',
    title: 'How should we structure the QR Attendance validation for latecomers?',
    content: 'We noticed in previous events that students arriving 30 minutes late still scanned the standard QR code. Should we introduce dynamic 30-second rotating QR hashes or manual coordinator override badges?',
    upvotes: 18,
    hasUpvoted: true,
    isPinned: true,
    isAnswered: true,
    createdAt: '2026-07-21T11:20:00Z',
    commentsCount: 5,
    poll: {
      question: 'Preferred Latecomer Verification System:',
      options: [
        { text: 'Dynamic Rotating QR Code (30s refresh)', votes: 14 },
        { text: 'Manual Coordinator Badge Override', votes: 6 },
        { text: 'GPS Geo-fencing + Timestamp', votes: 8 }
      ],
      userVotedIndex: 0
    }
  },
  {
    id: 402,
    clubId: 1,
    authorId: 103,
    authorName: 'Gunja Tejaswi',
    authorRole: 'Coordinator',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    category: 'Design',
    title: 'Proposed Dark & Light Mode Color Tokens for Club Portal',
    content: 'Here is the CSS token structure we are proposing for high-contrast accessibility. Feedback on font scaling (Perfect Fourth vs. Major Second) is welcome!',
    upvotes: 12,
    hasUpvoted: false,
    isPinned: false,
    isAnswered: false,
    createdAt: '2026-07-19T09:10:00Z',
    commentsCount: 3,
    codeSnippet: {
      language: 'css',
      code: `:root {\n  --color-brand-primary: #2563eb;\n  --color-surface-bg: #f8fafc;\n  --color-text-main: #0f172a;\n}`
    }
  }
];

export const mockComments: Comment[] = [
  {
    id: 501,
    discussionId: 401,
    authorId: 101,
    authorName: 'Dinesh Falle',
    authorRole: 'Club Head',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250',
    content: 'The dynamic rotating QR code with a 15-minute grace window is the cleanest solution. Let us proceed with that for the August hackathon.',
    isAnswer: true,
    createdAt: '2026-07-21T12:00:00Z'
  },
  {
    id: 502,
    discussionId: 401,
    authorId: 105,
    authorName: 'V Pravas',
    authorRole: 'Club Member',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    content: 'Agreed! Dynamic QR also prevents students from taking photos of the projector screen and sharing them on WhatsApp groups.',
    isAnswer: false,
    createdAt: '2026-07-21T12:30:00Z'
  }
];

export const mockResources: Resource[] = [
  {
    id: 601,
    clubId: 1,
    department: 'Media & Design',
    year: 2026,
    category: 'Brand Assets',
    title: 'Vector Stack & CFI Official Logo Pack (SVG, PNG, EPS)',
    description: 'High-resolution vector logos, monochrome badges, and transparent background banners.',
    filePath: '/resources/media/2026/logo_pack_vector_stack.zip',
    fileSize: '14.2 MB',
    fileType: 'ZIP Archive',
    uploadedBy: 'Gunja Tejaswi',
    uploadDate: '2026-07-15T10:00:00Z',
    version: 2,
    downloadCount: 142,
    tags: ['logo', 'brand', 'vector', 'figma'],
    isArchived: false
  },
  {
    id: 602,
    clubId: 1,
    department: 'Software & AI',
    year: 2026,
    category: 'Documentation',
    title: 'Database Schema & System Design Specification (Milestone 1)',
    description: 'Complete 31-class entity relation diagram, ERD tables, and normalization notes.',
    filePath: '/resources/software/2026/database_design_doc.pdf',
    fileSize: '3.8 MB',
    fileType: 'PDF Document',
    uploadedBy: 'Paardheev',
    uploadDate: '2026-07-10T16:20:00Z',
    version: 1,
    downloadCount: 89,
    tags: ['database', 'erd', 'architecture', 'sql'],
    isArchived: false
  },
  {
    id: 603,
    clubId: 1,
    department: 'Robotics & Hardware',
    year: 2025,
    category: 'CAD Models',
    title: '2025 Formula Racecar Chassis SolidWorks Model',
    description: 'Archived tubular spaceframe chassis CAD assemblies and finite element analysis (FEA) reports.',
    filePath: '/resources/hardware/2025/raftar_chassis_v4.step',
    fileSize: '48.5 MB',
    fileType: 'STEP 3D CAD',
    uploadedBy: 'Kanikicharla Vedasree',
    uploadDate: '2025-09-01T12:00:00Z',
    version: 4,
    downloadCount: 210,
    tags: ['cad', 'solidworks', 'chassis', 'raftar'],
    isArchived: true
  }
];

export const mockAttendanceSessions: AttendanceSession[] = [
  {
    id: 701,
    eventId: 202,
    eventTitle: 'Autonomous Mobile Robot (AMR) Hardware Workshop',
    date: '2026-07-18',
    sessionType: 'Workshop',
    attendanceMethod: 'QR Code',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CFI_ATTENDANCE_SESSION_701',
    totalMembers: 50,
    presentCount: 45,
    lateCount: 3,
    createdBy: 'Gunja Tejaswi'
  },
  {
    id: 702,
    eventTitle: 'CFI Core Committee Weekly Sync Meeting',
    date: '2026-07-22',
    sessionType: 'Meeting',
    attendanceMethod: 'Manual',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=CFI_ATTENDANCE_SESSION_702',
    totalMembers: 20,
    presentCount: 18,
    lateCount: 1,
    createdBy: 'Dinesh Falle'
  }
];

export const mockAttendanceRecords: AttendanceRecord[] = [
  { id: 801, sessionId: 701, userId: 101, userName: 'Dinesh Falle', department: 'Core Team', checkInTime: '13:55', status: 'Present' },
  { id: 802, sessionId: 701, userId: 102, userName: 'Paardheev', department: 'Software & AI', checkInTime: '14:02', status: 'Present' },
  { id: 803, sessionId: 701, userId: 103, userName: 'Gunja Tejaswi', department: 'Media & Design', checkInTime: '13:50', status: 'Present' },
  { id: 804, sessionId: 701, userId: 104, userName: 'Kanikicharla Vedasree', department: 'Software & AI', checkInTime: '14:22', status: 'Late' },
  { id: 805, sessionId: 701, userId: 105, userName: 'V Pravas', department: 'Events & Operations', checkInTime: '14:01', status: 'Present' }
];

export const mockCompetitions: Competition[] = [
  {
    id: 901,
    clubId: 1,
    title: 'European Hyperloop Week (EHW) 2026',
    organizer: 'EHW Global Consortium',
    deadline: '2026-08-30',
    eventDate: '2026-10-12',
    registrationLink: 'https://hyperloopweek.com/register',
    mentorName: 'Prof. Chandhrasekar',
    expensesTotal: 185000,
    documentsCount: 8,
    teamMembersCount: 18,
    result: 'Finals Qualifier',
    stages: [
      { id: 1, name: 'Registration', status: 'Completed', deadline: '2026-05-15' },
      { id: 2, name: 'Technical Proposal', status: 'Completed', deadline: '2026-06-30' },
      { id: 3, name: 'Subsystem Round 1', status: 'Completed', deadline: '2026-07-15' },
      { id: 4, name: 'Safety Review Round 2', status: 'Current', deadline: '2026-08-30' },
      { id: 5, name: 'Finals Demonstration', status: 'Upcoming', deadline: '2026-10-12' }
    ]
  },
  {
    id: 902,
    clubId: 1,
    title: 'Formula Student Germany (FSG) Electric 2026',
    organizer: 'VDI e.V. Germany',
    deadline: '2026-09-10',
    eventDate: '2026-11-20',
    registrationLink: 'https://formulastudent.de',
    mentorName: 'Prof. Nishad Kothari',
    expensesTotal: 340000,
    documentsCount: 14,
    teamMembersCount: 24,
    stages: [
      { id: 1, name: 'Registration & Quiz', status: 'Completed', deadline: '2026-04-10' },
      { id: 2, name: 'Structural Equivalent Spreadsheet (SES)', status: 'Current', deadline: '2026-08-01' },
      { id: 3, name: 'Electrical System Form (ESF)', status: 'Upcoming', deadline: '2026-09-10' },
      { id: 4, name: 'On-Track Competition', status: 'Upcoming', deadline: '2026-11-20' }
    ]
  }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 1001,
    senderName: 'Dinesh Falle',
    receiverId: 103,
    title: 'New Urgent Announcement',
    message: 'Mid-Semester CFI All-Hands Review scheduled for Saturday at 5:00 PM in CRC Hall.',
    type: 'announcement',
    priority: 'Critical',
    groupCategory: 'Core Team',
    isRead: false,
    createdAt: '2 minutes ago'
  },
  {
    id: 1002,
    senderName: 'Paardheev',
    receiverId: 103,
    title: 'Task Assigned',
    message: 'Design Promotional Posters & Social Banners for Tech Meet 2026 has been assigned to you.',
    type: 'task_assigned',
    priority: 'High',
    groupCategory: 'Media Team',
    isRead: false,
    createdAt: '1 hour ago'
  },
  {
    id: 1003,
    senderName: 'Kanikicharla Vedasree',
    receiverId: 103,
    title: 'Proof Review Requested',
    message: 'Checkpoint proof uploaded for API Gateway Permission Middleware.',
    type: 'checkpoint_due',
    priority: 'Medium',
    groupCategory: 'Software & AI',
    isRead: true,
    createdAt: '3 hours ago'
  },
  {
    id: 1004,
    senderName: 'System',
    receiverId: 103,
    title: 'Competition Deadline Alert',
    message: 'Structural Equivalent Spreadsheet submission for FSG Electric due in 8 days.',
    type: 'competition_deadline',
    priority: 'High',
    groupCategory: 'Raftar Formula Racing',
    isRead: true,
    createdAt: 'Yesterday'
  }
];

export const mockAuditLogs: AuditLog[] = [
  {
    id: 1101,
    userName: 'Dinesh Falle',
    userRole: 'Club Head',
    action: 'Granted Delegated Permission',
    target: 'Gunja Tejaswi -> Resource Upload & Event Management',
    timestamp: 'Today at 09:14 AM',
    category: 'Permissions'
  },
  {
    id: 1102,
    userName: 'Paardheev',
    userRole: 'Coordinator',
    action: 'Updated Task Status',
    target: 'Task #302: API Gateway Middleware -> Waiting Review',
    timestamp: 'Yesterday at 04:30 PM',
    category: 'Tasks'
  },
  {
    id: 1103,
    userName: 'Gunja Tejaswi',
    userRole: 'Coordinator',
    action: 'Uploaded New Resource',
    target: 'Media/2026/Brand Assets -> Logo Pack v2.zip',
    timestamp: '2 days ago at 10:15 AM',
    category: 'Resources'
  }
];

export const mockSkills: SkillItem[] = [
  { id: 1, name: 'Figma', category: 'Design' },
  { id: 2, name: 'Python', category: 'Programming' },
  { id: 3, name: 'React', category: 'Programming' },
  { id: 4, name: 'SolidWorks CAD', category: 'Hardware' },
  { id: 5, name: 'ROS2 Robotics', category: 'Hardware' },
  { id: 6, name: 'Video Editing / Premiere', category: 'Media' },
  { id: 7, name: 'Arduino / Embedded C', category: 'Hardware' },
  { id: 8, name: 'Event Operations', category: 'Management' }
];

export const mockUserSkills: UserSkill[] = [
  { skillId: 1, skillName: 'Figma', proficiencyLevel: 'Expert' },
  { skillId: 3, skillName: 'React', proficiencyLevel: 'Expert' },
  { skillId: 6, skillName: 'Video Editing / Premiere', proficiencyLevel: 'Intermediate' }
];

export const mockAvailabilitySlots: AvailabilitySlot[] = [
  { id: 1, weekday: 'Monday', timeSlot: '6–8 PM', status: 'Available' },
  { id: 2, weekday: 'Tuesday', timeSlot: 'All Day', status: 'Busy' },
  { id: 3, weekday: 'Wednesday', timeSlot: 'After 5 PM', status: 'Available' },
  { id: 4, weekday: 'Thursday', timeSlot: '4–7 PM', status: 'Available' },
  { id: 5, weekday: 'Friday', timeSlot: '6–9 PM', status: 'Available' },
  { id: 6, weekday: 'Saturday', timeSlot: 'All Day', status: 'Available' },
  { id: 7, weekday: 'Sunday', timeSlot: 'Morning', status: 'Available' }
];
