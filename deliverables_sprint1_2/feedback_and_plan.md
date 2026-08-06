# User Feedback and Plan for Next Sprint

## User Feedback from Sprint 1 & 2
- **Authentication**: Users requested the ability to reset forgotten usernames or passwords. We added a basic recovery form UI on the front end which guides users through the recovery process. (The backend email integration can be deferred to a later sprint).
- **Role Management**: The Club Head (admin) requested a separate view to manage user permissions and see platform statistics. We implemented a dedicated Admin Dashboard to see metrics and change member roles seamlessly.
- **Dashboards**: Users felt the dashboard was too cluttered with information not relevant to them. We updated the Dashboard to render dynamic role-based sections (e.g., "Admin Actions" for Club Heads, "Project Management" for Core Members, and "My Volunteer Hub" for Volunteers).

## Plan for Next Sprint
1. **Email Integration**: Integrate SendGrid or NodeMailer to process actual password reset and recovery tokens.
2. **Advanced Analytics**: Enhance the Admin statistics page with charts to visualize tasks completed over time and event attendance metrics.
3. **Event Registration Flow**: Allow standard users and volunteers to actively register for events (updating the `events` table with attendees) and generate personalized QR codes for the event.
4. **WebSocket Notifications**: Upgrade the notification system from REST polling to WebSockets for real-time announcements.
