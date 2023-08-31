---
title: "How I Migrated My WordPress Website to Gridsome"
date: "2023-04-25"
categories:
  - "tutorial"
tags: 
  - "wordpress"
  - "gridsome"
cover: "../../../../../../../static/from-blog/cover-images/1.png"
---

# Git Summary

## Git Commands

### git init
The git init command creates a new Git repository. It can be used to convert an existing, unversioned project to a Git repository or initialize a new, empty repository.
```bash
git init
```

### git status
The git status command displays the state of the working directory and the staging area. It lets you see which changes have been staged, which haven't, and which files aren't being tracked by Git. Status output does not show you any information regarding the committed project history.
```bash
git status
```

### git add
The git add command adds a change in the working directory to the staging area. It tells Git that you want to include updates to a particular file in the next commit. However, git add doesn't really affect the repository in any significant way—changes are not actually recorded until you run git commit.
```bash
git add <file>
```
To add all files in the current directory:
```bash
git add .
```

### git commit
The git commit command captures a snapshot of the project's currently staged changes. Committed snapshots can be thought of as “safe” versions of a project—Git will never change them unless you explicitly ask it to. Prior to the execution of git commit, The git add command is used to promote or 'stage' changes to the project that will be stored in a commit. However, git add alone will not record changes to the project history. git commit is the command used to save staged changes to the local repository. This command takes a snapshot of the staging area and commits it to the project history.
```bash
git commit -m "Commit message"
```

### git log
The git log command displays committed snapshots. It lets you list the project history, filter it, and search for specific changes. While git status lets you inspect the working directory and the staging area, git log only operates on the committed history.
```bash
git log
```

### git branch
The git branch command lets you create, list, rename, and delete branches. It doesn't let you switch between branches or put a forked history back together again. For this reason, git branch is tightly integrated with the git checkout and git merge commands.
```bash
git branch
```
To create a new branch:
```bash
git branch <branch-name>
```

### git checkout
The git checkout command lets you navigate between the branches created by git branch. Checking out a branch updates the files in the working directory to match the version stored in that branch, and it tells Git to record all new commits on that branch. Think of it as a way to select which line of development you're working on.
```bash
git checkout <branch-name>
```

To create a new branch and switch to it at the same time:
```bash
git checkout -b <branch-name>
```


