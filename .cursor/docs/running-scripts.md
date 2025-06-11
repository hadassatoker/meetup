# Running Scripts Setup Documentation

## Overview
This document describes the implementation of the running scripts setup for the Meetup application. The setup allows for running frontend and backend services both separately and together.

## Implementation Details

### Root Package.json Scripts
The following scripts have been implemented in the root `package.json`:

```json
{
  "scripts": {
    "start:frontend": "cd frontend && npm run dev",
    "start:backend": "cd backend && npm run dev",
    "dev": "concurrently \"npm run start:backend\" \"npm run start:frontend\""
  }
}
```

### Dependencies Added
- `concurrently`: ^8.2.2 (for running multiple commands simultaneously)

## Usage Instructions

### Running Both Services
From the root directory:
```bash
npm run dev
```

### Running Individual Services
Frontend only:
```bash
npm run start:frontend
# or
cd frontend && npm run dev
```

Backend only:
```bash
npm run start:backend
# or
cd backend && npm run dev
```

## Directory Structure
```
.
├── frontend/          # Frontend application
├── backend/           # Backend application
├── package.json       # Root package.json with scripts
└── README.md         # Main documentation
```

## Implementation Status
- [x] Created root package.json with scripts
- [x] Added concurrently for parallel execution
- [x] Created clear documentation in README.md
- [x] Implemented separate commands for frontend and backend
- [x] Added combined command for running both services
