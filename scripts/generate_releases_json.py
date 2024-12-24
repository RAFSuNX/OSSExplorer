import requests
import json
import os

# Paths to repos.json and releases.json
repos_json_path = 'src/data/repos.json'
releases_json_path = 'src/data/releases.json'

# Function to fetch releases from a repository's releases endpoint
def get_release_data(repo_url):
    response = requests.get(f"{repo_url}/releases")
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Failed to fetch releases for {repo_url}")
        return []

# Load the repo list from repos.json
with open(repos_json_path, 'r') as f:
    repos = json.load(f)

# Dictionary to store release data
releases_data = {}

# Iterate over each repository in repos.json
for repo in repos:
    repo_name = repo['name']
    repo_url = repo['url']
    
    print(f"Fetching releases for {repo_name} from {repo_url}")
    releases = get_release_data(repo_url)
    
    # List to store the release details for this repository
    releases_list = []
    for release in releases:
        releases_list.append({
            "tag_name": release["tag_name"],
            "name": release["name"],
            "published_at": release["published_at"],
            "body": release["body"],  # Keep the changelog as is
            "assets": [
                {
                    "name": asset["name"],
                    "size": asset["size"],
                    "download_count": asset["download_count"],
                    "browser_download_url": asset["browser_download_url"]
                }
                for asset in release["assets"]
            ]
        })
    
    # Store the release data along with description and categories
    releases_data[repo_name] = {
        "description": repo['description'],
        "categories": repo['categories'],
        "releases": releases_list
    }

# Save the updated releases data to releases.json
with open(releases_json_path, 'w') as f:
    json.dump(releases_data, f, indent=2)

print(f"Releases data updated and saved to {releases_json_path}")
