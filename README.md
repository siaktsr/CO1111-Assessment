## Repository Rules (Mandatory)

### Main branches

* `main` — production-ready product
* `development` — stable version for further testing
* All other branches are created by contributors for specific tasks

### Commits and merges

* **Direct commits to `main` are forbidden**
* Merging into `main` is allowed **only with approval from the whole team**
* Merging into `development` is allowed **only after code review by at least 1–2 teammates and team approval**

### Branch naming format

Required format:

```
username/feature-name
```

Examples:

* `alex/login-form`
* `kate/fix-header`

### Project language

* Branch names — **English**
* Commits — **English**
* Code comments — **English**

### Commit message format

Mandatory prefixes:

* `feat:` — new feature
* `fix:` — bug fix
* `refactor:` — code refactoring
* `style:` — formatting / styling

DOCUMENTATION COMMITS (`docs:`) **are not used**

Examples of correct commit messages:

```
feat: add login form validation
fix: correct header alignment
refactor: optimize user authorization flow
```

### Merge process (mandatory)

1. Create a `username/feature-name` branch
2. Complete the task
3. Open a **Pull Request**
4. Create an **Issue describing the merge**
5. Conduct a **code review** or add **comments explaining how the code works**
6. **All 4 team members must confirm** that:

   * the code quality is satisfactory
   * the comments and logic are clear
7. Only after that, a merge into `development` or `main` is allowed

### General team rules

* Always create a new branch for a new task
* Do not combine multiple features in one branch
* регулярно perform `pull` from `development`
* Follow clean and readable code practices
* Any controversial decisions must be discussed by the team **before** merging

---

## Useful links

* [https://github.com](https://github.com)
* [https://desktop.github.com](https://desktop.github.com)
* [https://git-scm.com](https://git-scm.com)