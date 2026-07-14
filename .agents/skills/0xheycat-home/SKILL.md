```markdown
# 0xheycat-home Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `0xheycat-home` repository, a Next.js project written in JavaScript. You'll learn about file naming, import/export styles, commit message conventions, and how to structure and run tests. This guide is essential for maintaining consistency and contributing effectively to the codebase.

## Coding Conventions

### File Naming
- Use **camelCase** for all file names.

**Example:**
```
userProfile.js
dashboardHeader.jsx
```

### Import Style
- Use **alias-based imports** for modules, rather than relative paths.

**Example:**
```javascript
import UserCard from '@/components/userCard';
```

### Export Style
- The repository uses a **mixed export style** (both default and named exports).

**Example:**
```javascript
// Default export
export default function HomePage() { ... }

// Named export
export function getServerSideProps() { ... }
```

### Commit Messages
- Follow the **Conventional Commits** specification.
- Use the `feat` prefix for new features.
- Keep commit messages concise (average 34 characters).

**Example:**
```
feat: add user profile section
```

## Workflows

### Adding a New Feature
**Trigger:** When implementing a new feature or component  
**Command:** `/add-feature`

1. Create a new file using camelCase naming.
2. Use alias imports for dependencies.
3. Export your component using default or named exports as appropriate.
4. Write a commit message starting with `feat:`.
5. Add corresponding tests in a `.test.js` file.

### Writing Tests
**Trigger:** When adding or updating code that requires validation  
**Command:** `/write-test`

1. Create a test file with the `.test.js` suffix (e.g., `userProfile.test.js`).
2. Write tests for your component or function.
3. Ensure tests cover expected behaviors and edge cases.
4. Run the test suite to verify correctness.

## Testing Patterns

- **Test File Pattern:** All test files use the `*.test.*` naming convention.
- **Testing Framework:** Not explicitly specified; follow standard JavaScript testing practices.
- Place test files alongside the code they test or in a dedicated `__tests__` directory.
- Write clear, descriptive test cases.

**Example:**
```javascript
// userProfile.test.js
import { render } from '@testing-library/react';
import UserProfile from '@/components/userProfile';

test('renders user name', () => {
  // test implementation
});
```

## Commands
| Command        | Purpose                                     |
|----------------|---------------------------------------------|
| /add-feature   | Guide for adding a new feature or component |
| /write-test    | Steps for writing and running tests         |
```
