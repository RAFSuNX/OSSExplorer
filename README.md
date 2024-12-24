# Repository Explorer for Open-Source Projects

This project provides a dynamic, user-friendly website for listing and managing open-source project repositories and their releases. The website fetches data from a manually maintained `repos.json` file and dynamically integrates with GitHub to display release details, enabling seamless navigation, search, and download functionality.

## Features

### 1. Homepage: Repository Listing
- Displays a list of repositories with their name, description, and categories.
- Provides a search bar for finding repositories by name or description.
- Includes filtering options based on categories.
- Each repository card is clickable, leading to a detailed release page.

### 2. Release Page: Detailed View
- Displays all releases of a repository with:
  - Release Name
  - Changelog
  - Release Date
  - Files with details:
    - File Name
    - File Size
    - Download Count (if available from GitHub)
    - Tags based on file type (e.g., `magisk` for Magisk modules, `apk` for APK files).
- Filtering options for file architecture (e.g., `arm`, `arm64`, `x86`) or file type (e.g., `.apk`, `.zip`).

### 3. Integration Workflow
- Dynamic Data Loading:
  - Fetches repository data from `repos.json` for the homepage.
  - Dynamically generates release pages based on the selected repository.
- Release Data Handling:
  - Fetches release details using GitHub API and caches the data into JSON files.
- Direct Download Links:
  - Provides direct links to GitHub-hosted release files.

### 4. Hosting on Cloudflare Pages
- Static file hosting for speed and reliability.
- Pre-generated JSON files to minimize API calls and optimize performance.

---

## File Structure

### 1. `repos.json`
Manually edited file containing repository data.

### 2. Release JSON Files
Generated using GitHub API, containing release details for each repository.

---

## How to Add a Repository
1. Open the `repos.json` file.
2. Add the repository details with the repository name, GitHub URL, description, and categories.
3. Save the file and upload it to the GitHub backend.

---

## Example Workflow
1. **Homepage:**
   - Displays repositories such as "Magisk" and "KernelSU".
2. **Release Page:**
   - Clicking on "Magisk" leads to a page displaying its releases.
   - Shows release details like changelog, file list, and tags.
3. **File Downloads:**
   - Each file has a direct download link and relevant tags like `apk` or `magisk`.

---

## Deployment
1. Host the website on **Cloudflare Pages**.
2. Upload `repos.json` and release JSON files to the GitHub backend.
3. Ensure all static files are optimized for performance.

---

## Notes
- Tags like `magisk` or `apk` are automatically applied based on file names.
- Download count is displayed if provided by GitHub API.
- The system is designed for ease of use, with no login or registration required for managing repositories.

---

## License
This project is open-source and distributed under the MIT License.
