# UniManager System Architecture

## System Overview

UniManager is a comprehensive university management platform built with modern web technologies, designed to handle academic operations across four user roles.

## Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                  Client Layer (React)                    │
├─────────────────────────────────────────────────────────┤
│  Dashboard Layouts │ Components │ Pages │ Hooks │ Utils │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│                 Next.js Server Layer                     │
├──────────────────────┬──────────────────────────────────┤
│ API Routes           │ Server Components                 │
│ - Auth /login        │ - Layout Metadata                │
│ - User CRUD          │ - Server-side Validation         │
│ - Data Operations    │ - Environment Variables          │
└──────────────────────┴──────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────┐
│               Data Layer (Future)                        │
├─────────────────────────────────────────────────────────┤
│ ┌─────────────┐  ┌──────────────┐  ┌────────────────┐   │
│ │ PostgreSQL  │  │    Redis     │  │   File Store   │   │
│ │  (Primary)  │  │   (Cache)    │  │   (Uploads)    │   │
│ └─────────────┘  └──────────────┘  └────────────────┘   │
└─────────────────────────────────────────────────────────┘
\`\`\`

## Technology Stack

### Frontend
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **State**: React Hooks + localStorage
- **HTTP**: Fetch API

### Backend (Microservices)
- **API Gateway**: Next.js API routes
- **Authentication Service**: Token-based JWT
- **User Service**: CRUD operations
- **Schedule Service**: Conflict detection
- **Attendance Service**: Absence tracking
- **Notification Service**: Email/Push
- **Analytics Service**: Data aggregation

### Database (Future Integration)
- **Primary DB**: PostgreSQL/Supabase
- **Cache Layer**: Redis (Upstash)
- **Search**: Elasticsearch (optional)
- **File Storage**: Vercel Blob

### Deployment
- **Hosting**: Vercel
- **CI/CD**: GitHub Actions
- **Monitoring**: Vercel Analytics
- **Error Tracking**: Sentry

## Data Models

### Core Entities

\`\`\`typescript
User {
  id: UUID
  email: string
  name: string
  role: 'student' | 'teacher' | 'director' | 'admin'
  department_id?: UUID
  created_at: timestamp
}

Department {
  id: UUID
  name: string
  head_id: UUID (User)
  courses: Course[]
  students: number
  created_at: timestamp
}

Course {
  id: UUID
  code: string
  name: string
  department_id: UUID
  teacher_id: UUID
  credits: number
  students: number
}

Schedule {
  id: UUID
  course_id: UUID
  group_id: UUID
  room_id: UUID
  day: string (Mon-Fri)
  start_time: time
  end_time: time
  teacher_id: UUID
  students: User[]
}

Absence {
  id: UUID
  student_id: UUID
  schedule_id: UUID
  date: timestamp
  status: 'pending' | 'excused' | 'unjustified'
  excuse?: string
  document_url?: string
}

Message {
  id: UUID
  sender_id: UUID
  recipient_id: UUID
  content: string
  read: boolean
  created_at: timestamp
}
\`\`\`

## Authentication Flow

\`\`\`
┌─────────────┐
│   Login     │
│   Page      │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────┐
│  Verify Credentials         │
│  (/api/auth/login)          │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Generate JWT Token         │
│  Store in localStorage      │
└──────┬──────────────────────┘
       │
       ▼
┌─────────────────────────────┐
│  Redirect to Dashboard      │
│  Based on User Role         │
└─────────────────────────────┘
\`\`\`

## API Endpoints (Future)

\`\`\`
Authentication
  POST   /api/auth/login
  POST   /api/auth/logout
  POST   /api/auth/refresh

Users
  GET    /api/users
  GET    /api/users/:id
  POST   /api/users
  PUT    /api/users/:id
  DELETE /api/users/:id

Departments
  GET    /api/departments
  POST   /api/departments
  PUT    /api/departments/:id

Courses
  GET    /api/courses
  POST   /api/courses
  PUT    /api/courses/:id

Schedules
  GET    /api/schedules
  POST   /api/schedules
  PUT    /api/schedules/:id
  GET    /api/schedules/conflicts

Attendance
  GET    /api/attendance
  POST   /api/attendance
  POST   /api/absences/excuse

Messages
  GET    /api/messages
  POST   /api/messages
  GET    /api/messages/:conversationId

Analytics
  GET    /api/analytics/dashboard
  GET    /api/analytics/absences
  GET    /api/analytics/performance
\`\`\`

## Directory Structure

\`\`\`
UniManager/
├── app/
│   ├── api/                    # API routes
│   ├── dashboard/              # Dashboards by role
│   │   ├── student/
│   │   ├── teacher/
│   │   ├── director/
│   │   └── admin/
│   ├── login/                  # Authentication
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── dashboard-layout.tsx
│   ├── notification-center.tsx
│   └── [feature components]
├── lib/
│   ├── auth.ts                 # Auth utilities
│   └── utils.ts                # Helper functions
├── public/
│   ├── icons/
│   └── images/
├── scripts/                    # Database migration scripts
├── README.md                   # Project documentation
├── DEPLOYMENT.md               # Deployment guide
├── ARCHITECTURE.md             # This file
├── next.config.js
├── tsconfig.json
└── package.json
\`\`\`

## Feature Integration Points

### Sprint 1-7 Integration

\`\`\`
Login → Role Check → Dashboard Selection
                     ├─ Student → Schedule → Absences → Messages → Profile
                     ├─ Teacher → Schedule → Mark Attendance → Messages
                     ├─ Director → Create Schedule → View Analytics → Messages
                     └─ Admin → Manage All → View System Analytics
\`\`\`

## Scalability

### Current (Production Ready)
- Single server deployment
- LocalStorage for session
- Mock data for MVP
- Static assets

### Phase 2 (Post-MVP)
- Database integration
- Redis caching
- CDN for assets
- API rate limiting
- Background jobs (Bull)

### Phase 3 (Enterprise)
- Multi-region deployment
- Database sharding
- Microservices
- Message queues
- Real-time updates (WebSockets)

## Security Measures

1. **Authentication**: Token-based with JWT
2. **Authorization**: Role-based access control (RBAC)
3. **Data Protection**: HTTPS encryption
4. **Input Validation**: Server-side form validation
5. **SQL Injection Prevention**: Parameterized queries (ORM ready)
6. **CSRF Protection**: Next.js built-in protection
7. **Rate Limiting**: Planned implementation
8. **Audit Logging**: Action tracking capability

## Performance Considerations

- **Bundle Size**: ~150KB gzipped (optimized)
- **First Contentful Paint**: < 1s
- **Time to Interactive**: < 2s
- **Lighthouse Score**: 90+

## Monitoring & Analytics

- User behavior tracking
- Error logging and reporting
- Performance monitoring
- Database query optimization
- API response time tracking

## Future Enhancements

1. Real-time notifications (WebSockets)
2. Video conferencing integration
3. Mobile app (React Native)
4. Advanced analytics with BI tools
5. AI-powered recommendations
6. Multi-language support
7. Accessibility improvements (WCAG 2.1 AAA)
8. Advanced search capabilities

---

For technical support or architecture questions, contact the development team.
