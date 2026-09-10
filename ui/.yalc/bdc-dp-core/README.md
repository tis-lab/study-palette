# bdc-dp-core

## Overview

This application is a React application built with [Create React App](https://create-react-app.dev/) and TypeScript. The application can be run locally using the CRA development server or deployed to OpenShift as static content served by Apache HTTP Server.

## Prerequisites

Make sure the following are installed:

- Node.js 20
- npm
- Git

Check your versions:

```bash
node --version
npm --version
```

## Running Locally

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

The development server automatically recompiles the application when source files are changed.

## Deployment workflow

After making changes to the application:

1. Test the changes locally:

```bash
npm start
```

2. Create a new production build:

```bash
npm run build
```

3. Commit the updated `build/` directory:

```bash
git add build
git commit -m "Update application"
git push
```

4. Open the application's **Project** in OpenShift.

5. Navigate to **Builds → Builds**.

6. Find the application's BuildConfig and select **Start Build**.

7. Start a new build using the updated Git repository.

8. Once the build completes, OpenShift deploys the new image.

9. Open the application's Route to verify the updated version.

## Project Structure

```text
.
├── build/              # CRA production build; committed for OpenShift deployment
├── public/             # Static files used during the CRA build
├── src/                # React application source
├── package.json        # Dependencies and npm scripts
├── package-lock.json   # Locked dependency versions
└── tsconfig.json       # TypeScript configuration
```

## Available Commands

| Command         | Description                            |
| --------------- | -------------------------------------- |
| `npm install`   | Install project dependencies           |
| `npm start`     | Start the local CRA development server |
| `npm run build` | Create a production build in `build/`  |
| `npm test`      | Run tests                              |
