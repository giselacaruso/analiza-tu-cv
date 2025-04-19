# CV Wizard: AI-Powered CV Improvement Tool

## Project info

**URL**: https://lovable.dev/projects/70585277-4754-4bf4-93d3-289f78d414b8

## Project Overview

CV Wizard is an AI-powered web application that helps users improve their CVs/resumes by providing intelligent feedback and suggestions. Users can upload their CVs in PDF format, and the application will analyze them using OpenAI's language models to provide actionable improvement recommendations.

### Key Features

- **PDF Upload**: Users can upload their CV in PDF format
- **AI Analysis**: OpenAI integration to analyze CV content and provide improvement suggestions
- **User Authentication**: Secure user accounts to save and track CV improvements
- **Document History**: Users can view their past uploads and feedback
- **User Profiles**: Customizable user profiles

## Technical Implementation

This project is built with:

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI components
- **Backend**: Supabase (authentication, storage, database)
- **AI Integration**: OpenAI's GPT for CV analysis

## Setup Requirements

### Supabase Connection Required

**Important**: This project requires a Supabase connection to function properly. Before using the application, you need to connect it to Supabase:

1. Click on the green Supabase button in the top right of the Lovable interface
2. Follow the prompts to connect your project to Supabase
3. This will enable:
   - User authentication
   - PDF storage
   - Secure OpenAI API integration (via Edge Functions)

### OpenAI API Key Required

You'll need to add your OpenAI API key to Supabase Edge Function secrets once the Supabase connection is established.

## How to Use This Project

1. Connect the project to Supabase
2. Set up the required OpenAI API key
3. Create a Supabase Edge Function for secure OpenAI interaction
4. Implement the PDF text extraction functionality

## Development Instructions

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/70585277-4754-4bf4-93d3-289f78d414b8) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
