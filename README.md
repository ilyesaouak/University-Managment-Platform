# UniManager - University Management Platform

A complete university management system built with Next.js, TypeScript, and React. Designed for students, teachers, department directors, and administrators.

## Features

### Sprint 1: Authentication & User Management
- Role-based login system (Student, Teacher, Director, Admin)
- Token-based authentication
- Demo access for all user roles
- User profile management
- Secure session handling

### Sprint 2: Referential Management (CRUD)
- **User Management**: Add, edit, delete students, teachers, directors
- **Department Management**: Create and manage departments with statistics
- **Course Management**: Course CRUD with code, credits, and enrollment tracking
- **Room Management**: Classroom and facility management with capacity tracking
- **Data Import/Export**: CSV export functionality for bulk operations
- **Settings Page**: System-wide configuration and referential data

### Sprint 3: Schedule Management & Timetables
- **Student Schedule**: View personal timetable and upcoming classes
- **Teacher Schedule**: Manage teaching schedule by group/section
- **Director Scheduling**: Create department schedules with conflict detection
- **Admin Oversight**: System-wide schedule management and conflict resolution
- **Conflict Detection**: Automatic room and teacher conflict detection
- **Calendar View**: Multiple schedule visualization options

### Sprint 4: Absences & Makeups
- **Student Absences**: View absences, submit excuses with document upload
- **Elimination Risk**: Automatic alerts when absence rate exceeds 10%
- **Teacher Attendance**: Easy attendance marking interface for classes
- **Director Analytics**: Department absence monitoring and at-risk student tracking
- **Makeup Management**: Track and schedule makeup classes
- **Automated Alerts**: System alerts for concerning absence patterns

### Sprint 5: Notifications & Messaging
- **Student Messaging**: Chat interface with teachers and administrators
- **Teacher Messaging**: Communicate with individual students or groups
- **Admin Broadcasting**: System-wide announcements to targeted audiences
- **Notification Center**: Centralized notification management
- **Message Search**: Find conversations and messages easily
- **Unread Badges**: Track new messages and notifications

### Sprint 6: Analytics & Reports
- **Director Analytics**: Department performance metrics with visual charts
  - Absence rate trends
  - Grade distribution
  - Course enrollment and completion rates
- **Admin Analytics**: System-wide insights
  - Department comparison
  - System health monitoring
  - Peak usage analysis
  - Report generation (PDF/CSV)
- **User Profiles**: Profile management for all roles

### Sprint 7: Deployment & Polish
- Production-ready configuration
- Responsive design across all devices
- Accessibility compliance
- Performance optimization
- Security best practices

## Role-Based Features

### Student Dashboard
- View schedule and upcoming classes
- Monitor absences and submit excuses
- Check grades and GPA
- Message teachers and admin
- View profile and academic records

### Teacher Dashboard
- Manage teaching schedule
- Mark student attendance
- Handle absence excuses
- Message students and administration
- View class performance analytics

### Director Dashboard
- Create and manage department schedules
- Monitor department absences
- Track student performance and at-risk indicators
- Resolve schedule conflicts
- View department analytics and reports

### Admin Dashboard
- Manage all users (students, teachers, directors)
- Create and maintain departments and courses
- Manage classrooms and facilities
- Oversee system-wide schedules
- Handle system configuration and maintenance
- View comprehensive analytics
- Send system announcements
- Monitor system health

## Technology Stack

- **Frontend**: React, Next.js 16, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui components
- **State Management**: React hooks, localStorage
- **Authentication**: Token-based (JWT-compatible)
- **Charts**: Custom SVG-based visualizations
- **Deployment**: Vercel

## Installation

### Using shadcn CLI (Recommended)
\`\`\`bash
npx shadcn-cli@latest init -d
npx shadcn-cli@latest add button card input
npx npm run dev
\`\`\`

### Manual Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open http://localhost:3000

## Demo Credentials

Access the platform with these demo accounts:

- **Student**: `student@university.edu` / `password123`
- **Teacher**: `teacher@university.edu` / `password123`
- **Director**: `director@university.edu` / `password123`
- **Admin**: `admin@university.edu` / `password123`

Or use the quick demo buttons on the login page.



## Key Features by User Role

| Feature | Student | Teacher | Director | Admin |
|---------|---------|---------|----------|-------|
| View Schedule | ✓ | ✓ | ✓ | ✓ |
| Create Schedule | | | ✓ | ✓ |
| Mark Attendance | | ✓ | | ✓ |
| Submit Absence Excuse | ✓ | | | |
| Request Makeup | ✓ | | ✓ | ✓ |
| View Analytics | | | ✓ | ✓ |
| Manage Users | | | | ✓ |
| System Configuration | | | | ✓ |
| Messaging | ✓ | ✓ | ✓ | ✓ |
| View Absences | ✓ | ✓ | ✓ | ✓ |

## Security Features

- Role-based access control (RBAC)
- Token-based authentication
- Secure session management
- Protected API routes
- Form validation and sanitization
- CSRF protection ready

## Responsive Design

- Mobile-first approach
- Tablet optimization
- Desktop experience
- Touch-friendly interfaces
- Adaptive layouts

## Performance Optimizations

- Component code splitting
- Lazy loading
- Responsive images
- CSS optimization
- Efficient state management
- LocalStorage caching

## Future Enhancements

- Database integration (PostgreSQL/Supabase)
- Email notifications
- QR code attendance marking
- Mobile app version
- Advanced analytics dashboards
- GPA and transcript management
- Course prerequisites system
- Student advising module
- Research output tracking
- Alumni management

## API Integration Points

The application is structured to easily integrate with:
- RESTful backend APIs
- Database systems
- Email services
- SMS notifications
- Video conferencing
- Document management

## Support & Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org/)

## License

This project is part of ISET Tozeur educational curriculum.

## Contact

For questions or support, contact me at elyes.sawak@gmail.com

---

**Version**: 1.0.0 | **Status**: Production Ready | **Last Updated**: January 2025
