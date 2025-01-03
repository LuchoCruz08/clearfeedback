# Project Overview
Your goal is to build a Next.js application that allows users to collect, analyze, and act on customer feedback using customizable widgets embedded on their websites. The platform should include robust user authentication, project management, data visualization, subscription management, and analytics, leveraging Supabase and Lemon Squeezy for backend and payment functionality.
## Technologies Used
- Frontend:
Next.js with TypeScript
Tailwind CSS for styling
shadcn/ui components
Lucide React Icons
- Backend & Database
Supabase for:
User authentication and management (RLS policies implemented for security)
Real-time feedback collection and storage
Managing relationships between businesses, feedback, widgets, and analytics
- Payments
Lemon Squeezy for subscription management
# Core Functionalities
## 1. User Authentication and Management
- Sign-Up/Login:
Users can sign up and log in with email/password using Supabase Auth.
- Account Settings:
Manage user profiles, update passwords, and configure preferences.
Display subscription details and integrate billing management via Lemon Squeezy.
## 2. Project and Business (Projects) Management
- Business Profiles:
Allow users to create, name, and manage multiple business (Projects).
Users can associate feedback with specific businesses (Projects).
- Script Generation:
Automatically generate a unique embed script for each business/project to integrate the feedback widget on external websites.
## 3. Feedback Widget Creation
- Customizable Feedback Widgets:
Enable users to configure widgets for collecting feedback through:
Rating scales
Multiple-choice questions
Text inputs
Emoji-based feedback
Provide default customization options for widget position, theme (light/dark), and optional CSS for advanced users.
- Widget Preview:
Offer a live preview feature for widgets before deployment.
## 4. Real-Time Feedback Collection and Storage
- Feedback Submission:
Store user-submitted feedback in the feedback table in Supabase.
Use JSONB fields for metadata and custom inputs.
- Error Handling:
Ensure robust submission handling even during network interruptions.
## 5. Analytics and Insights
- Dashboard with Insights:
Display key feedback metrics (e.g., feedback count, trends, and widget interactions).
Use charts and graphs for visual representation of data.
- Filters and Trends:
Filter feedback by date, type, or custom fields.
Highlight trends and patterns in customer responses.
- Export Options:
Allow users to download raw data (CSV/Excel).
## 6. Subscription Management
- Pricing Tiers:
7-day free trial for new users upon account creation.
Monthly plan: $10 USD/month.
Annual plan: $96 USD/year (20% discount).
- Subscription Handling:
Restrict account access if a subscription is not renewed after the trial.
Automatically update subscription statuses using Lemon Squeezy webhooks.
# Database Information
## 1. Table Structure and Fields
- businesses
Stores details about projects created by users.
Fields:
id (UUID, Primary Key): Unique identifier.
user_id (UUID, Foreign Key → auth.users.id): User who owns the business.
name (Text, Not Null): Business name.
website_url (Text): Website URL of the business.
created_at (Timestamp): Auto-generated creation timestamp.
updated_at (Timestamp): Auto-generated update timestamp.
- feedback
Stores customer feedback for businesses.
Fields:
id (UUID, Primary Key): Unique identifier.
business_id (UUID, Foreign Key → businesses.id): Business to which the feedback belongs.
feedback_text (Text, Not Null): Feedback content.
submitted_at (Timestamp): Submission timestamp.
user_email (Text): Email of the user submitting feedback.
user_name (Text): Name of the user submitting feedback.
metadata (JSONB): Additional metadata for feedback.
- widget
Manages widget configurations for businesses.
Fields:
id (UUID, Primary Key): Unique identifier.
business_id (UUID, Foreign Key → businesses.id): Associated business.
position (Text, Default 'bottom-right'): Widget position on the website.
theme (Text, Default 'light'): Widget theme.
custom_css (Text): Custom CSS for the widget.
created_at (Timestamp): Auto-generated creation timestamp.
updated_at (Timestamp): Auto-generated update timestamp.
- analytics
Tracks feedback and widget interactions for businesses.
Fields:
id (UUID, Primary Key): Unique identifier.
business_id (UUID, Foreign Key → businesses.id): Associated business.
feedback_submitted (BigInt, Default 0): Number of feedback submissions.
widget_interactions (JSONB): Interaction details.
created_at (Timestamp): Auto-generated creation timestamp.
updated_at (Timestamp): Auto-generated update timestamp.
- subscriptions
Manages subscription details for users.
Fields:
id (UUID, Primary Key): Unique identifier.
user_id (UUID, Foreign Key → auth.users.id): User associated with the subscription.
plan_type (Text, Default 'Free Trial'): Plan type (e.g., free trial, monthly, annual).
status (Text): Subscription status.
start_date (Timestamp): Subscription start date.
end_date (Timestamp): Subscription end date.
lemon_squeezy_id (Text): Lemon Squeezy subscription ID.
is_trial (Boolean, Default true): Indicates whether it’s a trial.
created_at (Timestamp): Auto-generated creation timestamp.
updated_at (Timestamp): Auto-generated update timestamp.
# Implementation Notes
## 1. Project Setup
Organize reusable components under the /components directory.
API routes under /app/api for backend operations.
## 2. Supabase Configuration
Use the following Supabase tables:
auth.users: Default user storage.
businesses: Manage projects.
feedback: Store feedback responses with real-time updates.
widget: Configure and store widget data.
analytics: Track feedback submission and widget interaction data.
subscriptions: Handle subscription plans, trial statuses, and Lemon Squeezy integration.
## 3. Lemon Squeezy Integration
Handle subscription payments via Lemon Squeezy.
Use webhooks to:
Update the subscriptions table with payment statuses and Lemon Squeezy IDs.
Automatically deactivate accounts if a subscription expires.
## 4. Analytics and Insights
Build analytics dashboards using real-time data from Supabase.
Include widget interaction statistics tracked in the analytics table.
## 5. Security and Error Handling
Use environment variables for sensitive data like API keys.
Implement role-based access control (RBAC) for API endpoints.
Use shadcn/ui for toast notifications on error and success events.