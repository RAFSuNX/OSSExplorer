import requests
import json

# Load repo data from repos.json
with open('src/data/repos.json', 'r') as f:
    repos = json.load(f)

# GitHub API URL
GITHUB_API_URL = "https://api.github.com/repos"

# Function to fetch releases for each repository
def fetch_releases(repo):
    url = f"{GITHUB_API_URL}/{repo}/releases"
    response = requests.get(url)
    
    # Debugging: Print the status code and the response text
    print(f"Fetching releases for: {repo} (Status: {response.status_code})")
    
    if response.status_code == 200:
        return response.json()  # Parse the response as JSON
    else:
        print(f"Error fetching releases for {repo}: {response.text}")
        return []

# Initialize a dictionary to store release data
releases_data = {}

# Process each repository
for repo_info in repos:
    repo_name = repo_info["name"]
    repo_url = repo_info["url"].split("https://github.com/")[1]  # Extract owner/repository_name
    print(f"Processing releases for {repo_name}...")
    releases = fetch_releases(repo_url)  # Pass the owner/repository_name format
    releases_data[repo_name] = []

    # Process the releases data
    for release in releases:
        # Use the tag_name as the release name if name is missing
        release_name = release.get("name") if release.get("name") else release["tag_name"]

        # Set body to "no changelog" if it's missing (i.e., null or missing)
        release_body = release.get("body", "no changelog") or "no changelog"

        release_info = {
            "tag_name": release["tag_name"],
            "name": release_name,
            "published_at": release["published_at"],
            "body": release_body,  # Changelog (ensure no null value)
            "assets": []
        }
        
        for asset in release.get("assets", []):
            release_info["assets"].append({
                "name": asset["name"],
                "size": asset["size"],
                "download_count": asset["download_count"],
                "browser_download_url": asset["browser_download_url"]
            })
        
        releases_data[repo_name].append(release_info)

# Save the releases data to releases.json
with open('src/data/releases.json', 'w') as f:
    json.dump(releases_data, f, indent=2)

print("Releases data updated successfully!")
