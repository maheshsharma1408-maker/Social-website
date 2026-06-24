# Shri Ganga Nagar Connect Requirements

## Your Requirement

You want to create a website similar to Facebook, focused on Shri Ganga Nagar, where local people who enjoy social media can connect with each other.

The website should allow people to:

- Create an account and log in
- Receive a city email address like `name@shriganganagar.com`
- Build a personal profile
- Discover other people from Shri Ganga Nagar
- Connect through profiles
- Send scraps to each other as quick profile messages
- Chat with each other on an active real-time basis
- Share thoughts, videos, photos, and experiences inside chat
- Share local posts and updates
- Add photographs and videos to posts

You should be the admin of the website.

## Current Prototype Status

The first prototype is ready in this folder:

`outputs/shri-ganga-nagar-connect`

Current prototype files:

- `index.html`: main website screen
- `styles.css`: website design
- `app.js`: demo behavior for login, profiles, feed, chat, and admin
- `ROADMAP.md`: step-by-step path from prototype to AWS launch
- `REQUIREMENTS.md`: this requirements document

The prototype currently includes:

- Shri Ganga Nagar branding
- Login-style entry
- Admin account named Mahesh Admin
- Shri Ganga Nagar email IDs for admin and users
- Home feed
- Photo and video post attachments
- People discovery
- Scrap messages on member cards
- Profile editing
- Chat-style messaging with active status and media sharing
- Admin dashboard

Important: the prototype stores data in the browser only. It is not yet a real production backend.

## Recommended Next Step

The next step is to convert this prototype into a real full-stack application.

Recommended build choice:

- Frontend: Next.js
- Backend: Next.js API routes or Node.js Express
- Database: PostgreSQL
- Login: Amazon Cognito or secure email/mobile login
- Domain email: `@shriganganagar.com` accounts or aliases
- Chat: real-time WebSocket chat with online status, media messages, and typing activity
- Hosting: AWS Amplify, EC2, Elastic Beanstalk, or ECS
- Database hosting: Amazon RDS PostgreSQL
- Media storage: Amazon S3

## Minimum First Real Version

The first real version should include:

- Secure user signup and login
- Admin account setup
- Automatic `@shriganganagar.com` email creation or alias assignment
- User profiles
- Profile search by name, area, and interest
- Send and receive chat messages
- Send photos and videos inside chat
- Share quick thoughts and experiences inside chat
- Send and receive scraps on profiles
- Create feed posts
- Upload photographs and videos in posts
- Admin dashboard to view users
- Admin ability to suspend or activate users
- Basic report/block safety feature

## Admin Requirement

Admin should be able to:

- Log in securely
- Use an admin email such as `admin@shriganganagar.com`
- View all members
- View profile details
- Suspend users
- Reactivate users
- Remove inappropriate posts
- Review inappropriate scraps and media posts
- Review reports
- Send city-wide announcements

## Information Needed From You

Before building the production version, please confirm:

- Final website name
- Your admin display name
- Your admin email address
- Whether users should log in with mobile number, email, or both
- Whether every user should get a real mailbox or only a forwarding email alias
- Preferred domain spelling: `shriganganagar.com` or another exact domain
- Whether profile photos are required
- Maximum allowed photo and video size for posts
- Whether scraps are public on profiles or visible only to sender and receiver
- Whether chat media should allow photos only, videos only, or both
- Whether active chat should show online status, last seen, and typing indicators
- Whether chat should be one-to-one only or also group chat
- Whether users must be from Shri Ganga Nagar only
- Whether you want Hindi, English, or both languages

## Suggested Build Order

1. Confirm requirements
2. Create real app structure
3. Add database design
4. Add login and admin account
5. Build profile system
6. Build people search
7. Build scraps
8. Build photo/video upload posts
9. Build chat system
10. Build admin dashboard
11. Test locally
12. Deploy to AWS

## Deployment Target

For AWS, the simplest production path is:

- AWS Amplify for frontend
- Amazon RDS PostgreSQL for database
- Amazon S3 for profile photos and media
- Amazon Cognito for login
- Amazon SES or another email provider for `@shriganganagar.com` email
- Route 53 for domain
- AWS Certificate Manager for HTTPS
- CloudWatch for logs and monitoring
