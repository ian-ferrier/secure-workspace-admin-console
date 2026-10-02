# Secure Workspace Admin Console

A fictional enterprise administration console for monitoring and managing secure virtual workspaces.

This project was built as a frontend engineering portfolio piece to demonstrate practical React and TypeScript skills, accessible admin UX, security-conscious interaction design, responsive layouts, and intentional loading, error, and empty states.

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Vitest
- React Testing Library
- CSS
- Lucide React

## What the Application Demonstrates

The application includes three primary views:

### Overview

- Workspace health metrics
- Security alert visibility
- Recent activity
- Workspace status breakdown

### Workspace Management

- Searchable workspace inventory
- Status filtering
- Status and policy badges
- Loading, error, and empty states
- Responsive table behavior

### Workspace Detail

- Assigned user and platform information
- Connection and policy status
- Audit activity
- Simulated session revocation flow

All application data is fictional and stored locally.

## Architecture

The project intentionally keeps the architecture small and explicit.

```text
src/
├── app/
├── components/
│   ├── layout/
│   ├── ui/
│   └── workspaces/
├── data/
├── hooks/
├── pages/
├── test/
└── types/
```

### Pages

Page components handle route-level composition and coordinate the data needed by each screen.

### Reusable UI Components

Small reusable components handle concerns such as:

- Status badges
- Dialogs
- Application layout

### Domain Components

Workspace-specific components contain UI behavior related to workspace management without turning the project into a large internal component framework.

### Mock API Layer

The `data` layer simulates asynchronous API behavior rather than coupling pages directly to static mock objects.

This makes loading and error states part of the application behavior while keeping the project frontend-only.

### State Management

The project uses React state, derived state, and a small custom hook rather than a global state-management library.

The application currently has limited shared client state, so introducing Redux, Zustand, or similar tooling would add complexity without solving a meaningful problem.

## Accessibility Decisions

Accessibility was treated as part of the implementation rather than a later visual pass.

Examples include:

- Semantic `header`, `nav`, `main`, `section`, table, and definition-list markup
- A skip-to-content link
- Visible keyboard focus states
- Explicit labels for search and filtering controls
- Text labels in addition to color for status information
- Semantic table headers and captions
- A keyboard-focusable horizontal table region on smaller screens
- Live result-count updates when workspace filters change
- Native dialog behavior for the confirmation flow
- Reduced-motion handling for the loading indicator

ARIA is used only where it adds information that native HTML does not already communicate.

## Security and UX Decisions

The simulated **Revoke Session** action is intentionally separated from routine workspace information.

Before the action runs, the user must confirm it in a dialog that describes the consequence: the current session will be disconnected and the assigned user will need to reconnect.

After the simulated action completes:

- The interface displays explicit success feedback
- The revoke action becomes disabled
- The UI reflects the new conceptual state instead of allowing repeated destructive actions

Security-related information receives stronger visual hierarchy than routine operational information without making the entire interface visually alarming.

Filtering controls remain visible so users can understand why records may be hidden.

## Responsive Design

The application uses a persistent sidebar on larger screens and a simpler horizontal navigation pattern on smaller screens.

The workspace inventory remains a semantic data table on mobile and uses horizontal scrolling rather than duplicating the same information into a second card-based component.

This was an intentional MVP tradeoff to preserve table semantics and avoid unnecessary implementation complexity.

## Testing Strategy

The test suite focuses on user-visible behavior rather than implementation details.

Current tests cover:

- Workspace search filtering
- Empty search results
- Workspace loading failure behavior
- Session-revocation confirmation
- Successful simulated session revocation

The native `<dialog>` API is minimally polyfilled in the test environment because jsdom does not fully implement browser dialog behavior.

Run tests with:

```bash
npm run test:run
```

Build the application with:

```bash
npm run build
```

## What I Would Improve With More Time

The current project was intentionally scoped as a small, polished frontend slice.

With more time, I would consider:

- Adding retry behavior to failed API states
- Adding sorting and pagination to the workspace table
- Improving mobile presentation for large datasets
- Adding route-level error boundaries
- Expanding automated accessibility checks
- Adding Playwright coverage for keyboard navigation and the revoke-session workflow
- Making the simulated session state persist across navigation
- Replacing local mock data with a typed API contract

I would avoid introducing additional infrastructure until the application complexity justified it.

## Disclaimer

This is a fictional portfolio project.

It does not use real customer data, employer data, or proprietary implementation details.
