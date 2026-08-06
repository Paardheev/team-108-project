import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, Club, UserRole, Announcement, Event, Task, DiscussionPost, 
  Comment, Resource, AttendanceSession, AttendanceRecord, Competition, 
  NotificationItem, AuditLog, UserSkill, AvailabilitySlot, EventRegistration, JoinRequest
} from '../types';
import { 
  mockUsers, mockClubs, mockAnnouncements, mockEvents, mockTasks, 
  mockDiscussionPosts, mockComments, mockResources, mockAttendanceSessions, 
  mockAttendanceRecords, mockCompetitions, mockNotifications, mockAuditLogs, 
  mockUserSkills, mockAvailabilitySlots 
} from '../data/mockData';

interface AppContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: (val: boolean) => void;
  currentUser: User;
  setCurrentUser: (user: User) => void;
  activeClub: Club;
  setActiveClub: (club: Club) => void;
  users: User[];
  clubs: Club[];
  addClub: (club: Partial<Club>) => void;
  approveClub: (clubId: number, status: 'Approved' | 'Rejected') => void;
  updateClub: (clubId: number, data: Partial<Club>) => void;
  announcements: Announcement[];
  events: Event[];
  tasks: Task[];
  discussions: DiscussionPost[];
  comments: Comment[];
  resources: Resource[];
  attendanceSessions: AttendanceSession[];
  attendanceRecords: AttendanceRecord[];
  competitions: Competition[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  userSkills: UserSkill[];
  availabilitySlots: AvailabilitySlot[];
  globalSearchQuery: string;
  setGlobalSearchQuery: (query: string) => void;
  
  eventRegistrations: EventRegistration[];
  joinRequests: JoinRequest[];
  markEventAttendance: (eventId: number, userId: number) => void;
  createJoinRequest: (clubId: number, userId?: number) => void;
  // Handlers
  switchRole: (role: UserRole) => void;
  addAnnouncement: (announcement: Partial<Announcement>) => void;
  markAnnouncementAsRead: (id: number) => void;
  createEvent: (eventData: Partial<Event>) => void;
  approveEvent: (eventId: number, status: 'Approved' | 'Rejected') => void;
  registerForEvent: (eventId: number, roleType?: string) => void;
  createTask: (taskData: Partial<Task>) => void;
  toggleCheckpoint: (taskId: number, checkpointId: number) => void;
  submitTaskProof: (taskId: number, checkpointId: number, proofData: { fileUrl?: string; remarks?: string }) => void;
  approveCheckpointProof: (taskId: number, checkpointId: number, approve: boolean) => void;
  createDiscussion: (postData: Partial<DiscussionPost>) => void;
  addComment: (discussionId: number, content: string) => void;
  upvoteDiscussion: (id: number) => void;
  uploadResource: (resourceData: Partial<Resource>) => void;
  addResource: (resourceData: Partial<Resource>) => void;
  downloadResource: (id: number) => void;
  markAttendance: (sessionId: number, status: 'Present' | 'Late' | 'Absent') => void;
  registerTeamForCompetition: (competitionId: number, teamName: string, memberNames: string[]) => void;
  markNotificationAsRead: (id: number) => void;
  snoozeNotification: (id: number) => void;
  updateUserSkills: (skills: UserSkill[]) => void;
  updateAvailability: (slots: AvailabilitySlot[]) => void;
  addAuditLog: (action: string, target: string, category: AuditLog['category']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  const [users] = useState<User[]>(mockUsers);
  const [clubs, setClubs] = useState<Club[]>(mockClubs);

  const approveClub = (clubId: number, status: 'Approved' | 'Rejected') => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, approvalStatus: status } : c));
    addAuditLog(`Club ${status}`, `Club ID: ${clubId}`, 'Events'); // using Events category for simplicity
  };


  const updateClub = (clubId: number, data: Partial<Club>) => {
    setClubs(prev => prev.map(c => c.id === clubId ? { ...c, ...data } : c));
    addAuditLog('Updated Club Details', `Club ID: ${clubId}`, 'Events');
  };

  const addClub = (clubData: Partial<Club>) => {
    const newClub: Club = {
      id: Date.now(),
      name: clubData.name as any,
      code: clubData.code || '',
      description: clubData.description || '',
      logo: clubData.logo || '✨',
      category: clubData.category || 'General',
      memberCount: 1,
      createdDate: new Date().toISOString().split('T')[0],
      approvalStatus: currentUser?.role === 'Admin' ? 'Approved' : 'Pending',
      facultyAdvisorId: clubData.facultyAdvisorId
    };
    setClubs(prev => [...prev, newClub]);
  };
  const [currentUser, setCurrentUser] = useState<User>(mockUsers[0]); // Dinesh Falle (Club Head)
  const [activeClub, setActiveClub] = useState<Club>(mockClubs[0]); // CFI Clubs
  const [announcements, setAnnouncements] = useState<Announcement[]>(mockAnnouncements);
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [discussions, setDiscussions] = useState<DiscussionPost[]>(mockDiscussionPosts);
  const [comments, setComments] = useState<Comment[]>(mockComments);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(mockAttendanceSessions);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [competitions, setCompetitions] = useState<Competition[]>(mockCompetitions);
  const [notifications, setNotifications] = useState<NotificationItem[]>(mockNotifications);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [userSkills, setUserSkills] = useState<UserSkill[]>(mockUserSkills);
  const [availabilitySlots, setAvailabilitySlots] = useState<AvailabilitySlot[]>(mockAvailabilitySlots);
  const [globalSearchQuery, setGlobalSearchQuery] = useState<string>('');
  const [eventRegistrations, setEventRegistrations] = useState<EventRegistration[]>([]);
  const [joinRequests, setJoinRequests] = useState<JoinRequest[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        if (!res.ok) throw new Error('Invalid token');
        return res.json();
      })
      .then(user => {
        setCurrentUser(user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      });
    }
  }, []);

  const switchRole = (role: UserRole) => {
    setCurrentUser(prev => ({ ...prev, role }));
    addAuditLog(`Switched Active Role`, `New Role: ${role}`, 'Permissions');
  };

  const addAuditLog = (action: string, target: string, category: AuditLog['category']) => {
    const newLog: AuditLog = {
      id: Date.now(),
      userName: currentUser.fullName,
      userRole: currentUser.role,
      action,
      target,
      timestamp: 'Just now',
      category
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const addAnnouncement = (data: Partial<Announcement>) => {
    const newAnn: Announcement = {
      id: Date.now(),
      clubId: activeClub.id,
      creatorId: currentUser.id,
      creatorName: currentUser.fullName,
      creatorRole: currentUser.role,
      title: data.title || 'Untitled Announcement',
      content: data.content || '',
      targetChannels: data.targetChannels || ['Everyone'],
      priority: data.priority || 'Normal',
      isPinned: data.isPinned || false,
      requiresApproval: data.requiresApproval || false,
      approvalStatus: data.requiresApproval ? 'Pending' : 'Approved',
      createdAt: new Date().toISOString(),
      readCount: 1,
      totalTargetUsers: activeClub.memberCount
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    addAuditLog('Created Announcement', newAnn.title, 'Announcements');

    // Also push a notification
    const newNotif: NotificationItem = {
      id: Date.now(),
      senderName: currentUser.fullName,
      receiverId: 0, // all
      title: `Announcement: ${newAnn.title}`,
      message: newAnn.content.slice(0, 80) + '...',
      type: 'announcement',
      priority: newAnn.priority === 'Urgent' ? 'Critical' : 'High',
      groupCategory: newAnn.targetChannels[0] || 'General',
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAnnouncementAsRead = (id: number) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, readCount: a.readCount + 1 } : a));
  };

  const approveEvent = (eventId: number, status: 'Approved' | 'Rejected') => {
    setEvents(prev => prev.map(e => e.id === eventId ? {
      ...e,
      approvalStatus: status,
      status: status === 'Approved' ? 'Registration Open' : 'Cancelled'
    } : e));
    addAuditLog(`Event ${status}`, `Event ID: ${eventId}`, 'Events');
  };

  const createEvent = (data: Partial<Event>) => {
    const newEvt: Event = {
      id: Date.now(),
      clubId: activeClub.id,
      title: data.title || 'New Event',
      description: data.description || '',
      banner: data.banner || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      organizer: data.organizer || currentUser.fullName,
      venue: data.venue || 'CFI Hall',
      eventDate: data.eventDate || new Date().toISOString(),
      registrationDeadline: data.registrationDeadline || new Date().toISOString(),
      capacity: data.capacity || 100,
      registeredCount: 0,
      category: data.category || 'Workshop',
      status: 'Upcoming',
      approvalStatus: 'Pending',
      requiredVolunteers: data.requiredVolunteers || 5,
      assignedVolunteersCount: 0,
      contactPerson: currentUser.fullName,
      contactPhone: currentUser.phone,
      timeline: [
        { id: 1, title: 'Event Created', status: 'completed', date: new Date().toLocaleDateString() },
        { id: 2, title: 'Registrations Open', status: 'current', date: new Date().toLocaleDateString() },
        { id: 3, title: 'Volunteer Selection', status: 'upcoming' },
        { id: 4, title: 'Venue Confirmed', status: 'upcoming' },
        { id: 5, title: 'Event Day', status: 'upcoming' },
        { id: 6, title: 'Report Uploaded', status: 'upcoming' },
        { id: 7, title: 'Closed', status: 'upcoming' }
      ]
    };
    setEvents(prev => [newEvt, ...prev]);
    
    // Notify Faculty Advisor and Admin
    const newNotif: NotificationItem = {
      id: Date.now(),
      userId: 999, // General notification for admins
      title: 'New Event Approval Request',
      message: `${currentUser.fullName} has requested approval for "${newEvt.title}".`,
      type: 'Mention',
      isRead: false,
      timestamp: new Date().toISOString(),
      actionUrl: '/admin'
    };
    setNotifications(prev => [newNotif, ...prev]);
    
    addAuditLog('Scheduled Event', newEvt.title, 'Events');
  };

  const registerForEvent = (eventId: number, roleType?: string) => {
    setEvents(prev => prev.map(e => e.id === eventId ? { ...e, registeredCount: e.registeredCount + 1 } : e));
    setEventRegistrations(prev => [...prev, {
      id: Date.now(),
      eventId,
      userId: currentUser.id,
      userName: currentUser.fullName,
      userEmail: currentUser.email,
      registrationDate: new Date().toISOString(),
      attendanceStatus: false,
      role: (roleType as any) || (currentUser.role === 'Volunteer' ? 'Volunteer' : 'Participant')
    }]);
    addAuditLog('Registered for Event', `Event ID: ${eventId}`, 'Events');
  };

  const markEventAttendance = (eventId: number, userId: number) => {
    setEventRegistrations(prev => prev.map(r => 
      (r.eventId === eventId && r.userId === userId) ? { ...r, attendanceStatus: true } : r
    ));
    addAuditLog('QR Check-in', `Event ID: ${eventId}, User ID: ${userId}`, 'Events');
  };

  const createJoinRequest = (clubId: number, userId?: number) => {
    const newReq: JoinRequest = {
      id: Date.now(),
      userId: userId || currentUser.id,
      clubId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    setJoinRequests(prev => [...prev, newReq]);
    addAuditLog('Requested to Join Club', `Club ID: ${clubId}`, 'Permissions');
  };

  const createTask = (data: Partial<Task>) => {
    const newTask: Task = {
      id: Date.now(),
      clubId: activeClub.id,
      creatorId: currentUser.id,
      creatorName: currentUser.fullName,
      assigneeId: data.assigneeId || 103,
      assigneeName: data.assigneeName || 'Gunja Tejaswi',
      assigneeRole: data.assigneeRole || 'Coordinator',
      reviewerId: currentUser.id,
      reviewerName: currentUser.fullName,
      title: data.title || 'Untitled Task',
      description: data.description || '',
      department: data.department || 'Software & AI',
      priority: data.priority || 'Medium',
      deadline: data.deadline || new Date().toLocaleDateString(),
      estimatedHours: data.estimatedHours || 8,
      status: 'In Progress',
      progressPercent: 0,
      createdAt: new Date().toISOString(),
      checkpoints: data.checkpoints || [
        { id: 1, taskId: Date.now(), sequenceNumber: 1, title: 'Initial Draft & Plan', completed: false },
        { id: 2, taskId: Date.now(), sequenceNumber: 2, title: 'Review & Corrections', completed: false },
        { id: 3, taskId: Date.now(), sequenceNumber: 3, title: 'Final Submission & Proof Upload', completed: false, requiredProofType: 'PDF' }
      ]
    };
    setTasks(prev => [newTask, ...prev]);
    addAuditLog('Assigned Task', `${newTask.title} -> ${newTask.assigneeName}`, 'Tasks');

    // Notify assignee
    const newNotif: NotificationItem = {
      id: Date.now(),
      senderName: currentUser.fullName,
      receiverId: newTask.assigneeId,
      title: 'New Task Assigned',
      message: `You were assigned: ${newTask.title}. Due date: ${newTask.deadline}`,
      type: 'task_assigned',
      priority: newTask.priority === 'Critical' ? 'Critical' : 'High',
      groupCategory: newTask.department,
      isRead: false,
      createdAt: 'Just now'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const toggleCheckpoint = (taskId: number, checkpointId: number) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const updatedCheckpoints = t.checkpoints.map(cp => cp.id === checkpointId ? { ...cp, completed: !cp.completed } : cp);
      const completedCount = updatedCheckpoints.filter(cp => cp.completed).length;
      const newPercent = Math.round((completedCount / updatedCheckpoints.length) * 100);
      const newStatus = newPercent === 100 ? 'Waiting Review' : 'In Progress';
      return { ...t, checkpoints: updatedCheckpoints, progressPercent: newPercent, status: newStatus };
    }));
  };

  const submitTaskProof = (taskId: number, checkpointId: number, proofData: { fileUrl?: string; remarks?: string }) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const updatedCheckpoints = t.checkpoints.map(cp => {
        if (cp.id !== checkpointId) return cp;
        return {
          ...cp,
          completed: true,
          submittedProof: {
            fileUrl: proofData.fileUrl || 'https://example.com/uploaded_proof_doc.pdf',
            remarks: proofData.remarks || 'Proof submitted for reviewer verification.',
            submittedAt: new Date().toISOString(),
            submittedBy: currentUser.fullName,
            approvalStatus: 'Pending'
          }
        };
      });
      const completedCount = updatedCheckpoints.filter(cp => cp.completed).length;
      const newPercent = Math.round((completedCount / updatedCheckpoints.length) * 100);
      return {
        ...t,
        checkpoints: updatedCheckpoints,
        progressPercent: newPercent,
        status: newPercent === 100 ? 'Waiting Review' : 'In Progress'
      };
    }));
    addAuditLog('Submitted Checkpoint Proof', `Task #${taskId}, Checkpoint #${checkpointId}`, 'Tasks');
  };

  const approveCheckpointProof = (taskId: number, checkpointId: number, approve: boolean) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== taskId) return t;
      const updatedCheckpoints = t.checkpoints.map(cp => {
        if (cp.id !== checkpointId || !cp.submittedProof) return cp;
        return {
          ...cp,
          submittedProof: {
            ...cp.submittedProof,
            approvalStatus: approve ? 'Approved' : 'Requested Changes'
          }
        };
      });
      const allApproved = updatedCheckpoints.every(cp => cp.submittedProof?.approvalStatus === 'Approved');
      return {
        ...t,
        checkpoints: updatedCheckpoints,
        status: allApproved ? 'Completed' : (approve ? 'In Progress' : 'Rejected')
      };
    }));
    addAuditLog(approve ? 'Approved Proof' : 'Requested Changes on Proof', `Task #${taskId}`, 'Tasks');
  };

  const createDiscussion = (postData: Partial<DiscussionPost>) => {
    const newPost: DiscussionPost = {
      id: Date.now(),
      clubId: activeClub.id,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorRole: currentUser.role,
      authorAvatar: currentUser.profilePicture,
      category: postData.category || 'General',
      title: postData.title || 'Discussion Thread',
      content: postData.content || '',
      upvotes: 0,
      hasUpvoted: false,
      isPinned: false,
      isAnswered: false,
      createdAt: new Date().toISOString(),
      commentsCount: 0,
      poll: postData.poll,
      codeSnippet: postData.codeSnippet
    };
    setDiscussions(prev => [newPost, ...prev]);
    addAuditLog('Created Discussion Thread', newPost.title, 'Announcements');
  };

  const addComment = (discussionId: number, content: string) => {
    const newComment: Comment = {
      id: Date.now(),
      discussionId,
      authorId: currentUser.id,
      authorName: currentUser.fullName,
      authorRole: currentUser.role,
      authorAvatar: currentUser.profilePicture,
      content,
      isAnswer: false,
      createdAt: new Date().toISOString()
    };
    setComments(prev => [...prev, newComment]);
    setDiscussions(prev => prev.map(d => d.id === discussionId ? { ...d, commentsCount: d.commentsCount + 1 } : d));
  };

  const upvoteDiscussion = (id: number) => {
    setDiscussions(prev => prev.map(d => {
      if (d.id !== id) return d;
      return {
        ...d,
        upvotes: d.hasUpvoted ? d.upvotes - 1 : d.upvotes + 1,
        hasUpvoted: !d.hasUpvoted
      };
    }));
  };

  const uploadResource = (data: Partial<Resource>) => {
    const newRes: Resource = {
      id: Date.now(),
      clubId: activeClub.id,
      department: data.department || currentUser.department,
      year: data.year || 2026,
      category: data.category || 'Documentation',
      title: data.title || 'New Resource File',
      description: data.description || '',
      filePath: `/resources/${currentUser.department.toLowerCase()}/2026/${data.title || 'file'}.pdf`,
      fileSize: data.fileSize || '2.5 MB',
      fileType: data.fileType || 'PDF Document',
      uploadedBy: currentUser.fullName,
      uploadedByName: currentUser.fullName,
      uploadDate: new Date().toISOString(),
      uploadedAt: 'Just now',
      version: data.version || 1,
      downloadCount: 0,
      tags: data.tags || ['resource', 'document'],
      isArchived: false,
      fileUrl: data.fileUrl
    };
    setResources(prev => [newRes, ...prev]);
    addAuditLog('Uploaded Resource', `${newRes.title} (${newRes.category})`, 'Resources');
  };

  const addResource = uploadResource;

  const downloadResource = (id: number) => {
    setResources(prev => prev.map(r => r.id === id ? { ...r, downloadCount: r.downloadCount + 1 } : r));
    addAuditLog('Downloaded Resource', `Resource ID: ${id}`, 'Resources');
  };

  const markAttendance = (sessionId: number, status: 'Present' | 'Late' | 'Absent') => {
    const newRec: AttendanceRecord = {
      id: Date.now(),
      sessionId,
      userId: currentUser.id,
      userName: currentUser.fullName,
      department: currentUser.department,
      checkInTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status
    };
    setAttendanceRecords(prev => [...prev, newRec]);
    setAttendanceSessions(prev => prev.map(s => {
      if (s.id !== sessionId) return s;
      return {
        ...s,
        presentCount: status === 'Present' ? s.presentCount + 1 : s.presentCount,
        lateCount: status === 'Late' ? s.lateCount + 1 : s.lateCount
      };
    }));
  };

  const registerTeamForCompetition = (competitionId: number, teamName: string, memberNames: string[]) => {
    setCompetitions(prev => prev.map(c => c.id === competitionId ? { ...c, teamMembersCount: c.teamMembersCount + memberNames.length } : c));
    addAuditLog('Registered Team for Competition', `Team: ${teamName} (Comp ID: ${competitionId})`, 'Events');
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const snoozeNotification = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isSnoozed: true } : n));
  };

  const updateUserSkills = (skills: UserSkill[]) => {
    setUserSkills(skills);
  };

  const updateAvailability = (slots: AvailabilitySlot[]) => {
    setAvailabilitySlots(slots);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated, setIsAuthenticated,
      currentUser, setCurrentUser,
      activeClub, setActiveClub,
      users, clubs, addClub, announcements, events, tasks, discussions,
      comments, resources, attendanceSessions, attendanceRecords,
      competitions, notifications, auditLogs, userSkills, availabilitySlots,
      globalSearchQuery, setGlobalSearchQuery,
      eventRegistrations, markEventAttendance,
      joinRequests, createJoinRequest,
      switchRole, approveClub, updateClub, addAnnouncement, markAnnouncementAsRead, createEvent,
      approveEvent, registerForEvent, createTask, toggleCheckpoint, submitTaskProof,
      approveCheckpointProof, createDiscussion, addComment, upvoteDiscussion,
      uploadResource, addResource, downloadResource, markAttendance, registerTeamForCompetition,
      markNotificationAsRead, snoozeNotification, updateUserSkills,
      updateAvailability, addAuditLog
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
