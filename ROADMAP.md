# Shri Ganga Nagar Connect Roadmap

## Stage 1: Prototype

Current status:

- Local social network interface
- Login-style entry
- Automatic demo email IDs using `@shriganganagar.com`
- Founder admin account
- City feed
- Photo and video post previews
- Scrap-style quick profile messages
- Member discovery
- Profile editing
- Chat-style messaging with active status and photo/video sharing
- Admin overview

Open `index.html` in a browser to review the first experience.

## Stage 2: Product Decisions

Before backend development, confirm:

- Final website name
- Admin name, email, and mobile number
- Exact domain name for city emails, for example `shriganganagar.com`
- Whether user emails are full mailboxes or forwarding aliases
- Whether users sign up by email, mobile OTP, or both
- Profile fields: name, photo, area, interest, bio, gender, age range, profession
- Media rules: allowed photo/video formats, file size limit, moderation process
- Scrap rules: public profile scraps or private scraps
- Chat rules: online status, typing indicator, media sharing, message report/block rules
- Safety rules: report user, block user, admin suspension, chat moderation
- Public or private profiles

## Stage 3: Real Backend

Recommended stack:

- Frontend: Next.js
- Backend: Next.js API routes or Node.js with Express
- Database: PostgreSQL
- Authentication: Amazon Cognito or NextAuth
- Domain email: Amazon SES, Google Workspace, Zoho Mail, or another mailbox provider
- Real-time chat: WebSocket service, Socket.IO, or AWS API Gateway WebSockets
- Chat media: upload photos/videos to Amazon S3 and store message references in the database
- File uploads: Amazon S3

Core database tables:

- users
- profiles
- posts
- comments
- friendships
- conversations
- messages
- message_media
- scraps
- media_uploads
- reports
- admin_actions

## Stage 4: Admin Controls

Admin features to build:

- View all users
- Suspend or activate users
- Remove posts
- Remove scraps
- Review photo and video posts
- Review reported profiles and chats
- Send city announcements
- View growth and activity metrics

## Stage 5: AWS Deployment

Simple AWS path:

- Frontend hosting: AWS Amplify
- Backend hosting: AWS Amplify or Elastic Beanstalk
- Database: Amazon RDS PostgreSQL
- Images and media: Amazon S3
- Domain: Route 53
- Email domain setup: MX, SPF, DKIM, and DMARC records
- HTTPS: AWS Certificate Manager
- Monitoring: CloudWatch

Production checklist:

- Environment variables configured
- Database backups enabled
- HTTPS active
- `@shriganganagar.com` email sending and receiving tested
- Admin account protected
- User reporting enabled
- Privacy policy and terms pages added
- Mobile layout tested

## Stage 6: Launch

Launch with a small invite group first:

- 20 to 50 trusted local users
- Collect feedback
- Fix confusing flows
- Add moderation rules
- Then open public signups for Shri Ganga Nagar
