/**
 * Types for Student Club Management & Collaboration Platform (Vector Stack Team-108)
 */

export type UserRole = 
  | 'Admin'
  | 'Club Head'
  | 'Coordinator'
  | 'Team Lead'
  | 'Club Member'
  | 'Volunteer'
  | 'Faculty Advisor';

export type Department = 
  | 'Core Team'
  | 'Media & Design'
  | 'Robotics & Hardware'
  | 'Software & AI'
  | 'Events & Operations'
  | 'Sponsorship & Finance'
  | 'Public Relations';

export type ClubName = 
  | 'CFI Clubs'
  | 'Raftar Formula Racing'
  | 'Avishkar Hyperloop'
  | 'Shaastra Team'
  | 'Placement & Internship Team'
  | 'E-Cell'
  | 'Programming Club'
  | 'Robotics Club'
  | 'Design & Media Team';

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  department: Department;
  academicYear: number;
  profilePicture: string;
  role: UserRole;
  currentClubId: number;
  joinedClubIds: number[];
  joinedDate: string;
  bio?: string;
  achievements?: string[];
  certifications?: string[];
  status: 'Active' | 'On Leave' | 'Exam Week' | 'Internship' | 'Vacation';
}

export interface Club {
  id: number;
  name: ClubName;
  code: string;
  description: string;
  logo: string;
  category: string;
  memberCount: number;
  createdDate: string;
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected';
  facultyAdvisorId?: number;
}

export interface JoinRequest {
  id: number;
  userId: number;
  clubId: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

export interface ClubMembership {
  id: number;
  clubId: number;
  userId: number;
  role: UserRole;
  department: Department;
  joinedDate: string;
  status: 'Active' | 'Inactive';
  delegatedPermissions: string[];
}

export interface Permission {
  id: number;
  name: string;
  category: 'Members' | 'Tasks' | 'Events' | 'Resources' | 'Attendance' | 'Announcements';
  description: string;
}

export type AnnouncementPriority = 'Normal' | 'Important' | 'Urgent';

export interface Announcement {
  id: number;
  clubId: number;
  creatorId: number;
  creatorName: string;
  creatorRole: UserRole;
  title: string;
  content: string;
  targetChannels: string[]; // e.g. 'Everyone', 'Core Team', 'Coordinators'
  priority: AnnouncementPriority;
  isPinned: boolean;
  requiresApproval: boolean;
  approvalStatus: 'Approved' | 'Pending' | 'Rejected';
  approvedBy?: string;
  createdAt: string;
  readCount: number;
  totalTargetUsers: number;
}

export interface AnnouncementRecipient {
  id: number;
  announcementId: number;
  userId: number;
  userName: string;
  isRead: boolean;
  readAt?: string;
}

export type EventStatus = 'Upcoming' | 'Registration Open' | 'Registration Closed' | 'Ongoing' | 'Completed' | 'Cancelled';

export interface EventTimelineStep {
  id: number;
  title: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
}

export interface EventReport {
  summary: string;
  photos: string[];
  attendanceCount: number;
  expenditure: number;
  feedbackScore: number; // e.g. 4.8 / 5
  winners?: string[];
  reportPdfUrl?: string;
}

export interface Event {
  id: number;
  clubId: number;
  title: string;
  description: string;
  banner: string;
  organizer: string;
  venue: string;
  eventDate: string;
  registrationDeadline: string;
  capacity: number;
  registeredCount: number;
  category: 'Workshop' | 'Hackathon' | 'Technical Talk' | 'Competition' | 'Meeting' | 'Social';
  status: EventStatus;
  approvalStatus?: 'Pending' | 'Approved' | 'Rejected';
  requiredVolunteers: number;
  assignedVolunteersCount: number;
  contactPerson: string;
  contactPhone: string;
  timeline: EventTimelineStep[];
  report?: EventReport;
}

export interface EventRegistration {
  id: number;
  eventId: number;
  userId: number;
  userName: string;
  userEmail: string;
  registrationDate: string;
  attendanceStatus: boolean;
  role: 'Participant' | 'Volunteer';
}

export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type TaskStatus = 'Pending' | 'In Progress' | 'Waiting Review' | 'Approved' | 'Rejected' | 'Completed' | 'Overdue';

export interface TaskCheckpoint {
  id: number;
  taskId: number;
  title: string;
  sequenceNumber: number;
  completed: boolean;
  requiredProofType?: 'image' | 'PDF' | 'link' | 'note';
  submittedProof?: {
    fileUrl?: string;
    remarks?: string;
    submittedAt: string;
    submittedBy: string;
    approvalStatus: 'Pending' | 'Approved' | 'Requested Changes';
  };
}

export interface Task {
  id: number;
  clubId: number;
  creatorId: number;
  creatorName: string;
  assigneeId: number;
  assigneeName: string;
  assigneeRole: UserRole;
  reviewerId: number;
  reviewerName: string;
  title: string;
  description: string;
  department: Department;
  priority: TaskPriority;
  deadline: string;
  estimatedHours: number;
  status: TaskStatus;
  progressPercent: number;
  checkpoints: TaskCheckpoint[];
  dependencies?: string[];
  createdAt: string;
}

export interface DiscussionPost {
  id: number;
  clubId: number;
  authorId: number;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  category: 'General' | 'Ideas' | 'Technical' | 'Design' | 'Events' | 'Help' | 'Announcements' | 'Feedback';
  title: string;
  content: string;
  upvotes: number;
  hasUpvoted?: boolean;
  isPinned: boolean;
  isAnswered: boolean;
  poll?: {
    question: string;
    options: { text: string; votes: number }[];
    userVotedIndex?: number;
  };
  attachments?: { name: string; url: string; type: string }[];
  codeSnippet?: { language: string; code: string };
  createdAt: string;
  commentsCount: number;
}

export interface Comment {
  id: number;
  discussionId: number;
  authorId: number;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  content: string;
  isAnswer: boolean;
  createdAt: string;
  parentId?: number; // for nested replies
}

export type ResourceCategory = 
  | 'Brand Assets' 
  | 'Codebase' 
  | 'Documentation' 
  | 'CAD Models' 
  | 'Reports' 
  | 'Templates' 
  | 'Media'
  | 'SOP & Guidelines'
  | 'Code & Repo'
  | 'Design & Brand'
  | 'Financial & Budget'
  | 'CFM Documents';

export interface Resource {
  id: number;
  clubId: number;
  department: Department;
  year: number; // e.g. 2026
  category: ResourceCategory;
  title: string;
  description: string;
  filePath: string;
  fileSize: string;
  fileType: string;
  uploadedBy: string;
  uploadedByName?: string;
  uploadDate: string;
  uploadedAt?: string;
  version: number | string;
  downloadCount: number;
  tags: string[];
  isArchived: boolean;
  fileUrl?: string;
}

export interface AttendanceSession {
  id: number;
  eventId?: number;
  eventTitle: string;
  date: string;
  sessionType: 'Meeting' | 'Workshop' | 'Event' | 'Practice Session';
  attendanceMethod: 'QR Code' | 'Manual' | 'GPS';
  qrCodeUrl: string;
  totalMembers: number;
  presentCount: number;
  lateCount: number;
  createdBy: string;
}

export interface AttendanceRecord {
  id: number;
  sessionId: number;
  userId: number;
  userName: string;
  department: Department;
  checkInTime: string;
  status: 'Present' | 'Late' | 'Absent';
}

export interface CompetitionStage {
  id: number;
  name: string; // e.g., 'Registration', 'Proposal', 'Round 1', 'Round 2', 'Finals'
  status: 'Completed' | 'Current' | 'Upcoming';
  deadline: string;
}

export interface Competition {
  id: number;
  clubId: number;
  title: string;
  organizer: string;
  deadline: string;
  eventDate: string;
  registrationLink: string;
  mentorName: string;
  stages: CompetitionStage[];
  result?: string; // e.g. '1st Place Winner - IIT Madras'
  certificatesUrl?: string;
  expensesTotal: number;
  documentsCount: number;
  teamMembersCount: number;
  prizePool?: string;
  registeredTeamsCount?: number;
  maxTeams?: number;
  description?: string;
  teamSizeRange?: string;
  evaluationCriteria?: string;
  registrationDeadline?: string;
}

export interface CompetitionParticipant {
  id: number;
  competitionId: number;
  userId: number;
  userName: string;
  roleInTeam: 'Team Lead' | 'Hardware Engineer' | 'Software Lead' | 'Design Engineer' | 'Presenter';
}

export type NotificationType = 
  | 'announcement'
  | 'task_assigned'
  | 'checkpoint_due'
  | 'event_reminder'
  | 'competition_deadline'
  | 'resource_uploaded'
  | 'attendance_reminder';

export interface NotificationItem {
  id: number;
  senderId?: number;
  senderName: string;
  receiverId: number;
  title: string;
  message: string;
  type: NotificationType;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  groupCategory?: string; // e.g. 'Media Team'
  isRead: boolean;
  isSnoozed?: boolean;
  createdAt: string;
}

export interface SkillItem {
  id: number;
  name: string;
  category: 'Programming' | 'Design' | 'Hardware' | 'Management' | 'Media';
}

export interface UserSkill {
  skillId: number;
  skillName: string;
  proficiencyLevel: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface AvailabilitySlot {
  id: number;
  weekday: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: string; // e.g. '6-8 PM' or 'After 5 PM'
  status: 'Available' | 'Busy';
}

export interface AuditLog {
  id: number;
  userName: string;
  userRole: UserRole;
  action: string;
  target: string;
  timestamp: string;
  category: 'Permissions' | 'Resources' | 'Tasks' | 'Events' | 'Announcements';
}
