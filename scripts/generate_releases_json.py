import os
import json
import requests

# File paths
REPOS_FILE = "src/data/repos.json"
RELEASES_FILE = "src/data/releases.json"

# Get GitHub token from environment variables
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
if not GITHUB_TOKEN:
    raise EnvironmentError("GITHUB_TOKEN is not set. Please add it to your GitHub Actions secrets.")

# Headers for authenticated requests
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}

def fetch_releases(repo_url):
    api_url = repo_url.replace("https://github.com/", "https://api.github.com/repos/")
    response = requests.get(f"{api_url}/releases", headers=HEADERS)
    response.raise_for_status()
    return response.json()

def main():
    # Read the repos list
    with open(REPOS_FILE, "r") as f:
        repos = json.load(f)
    
    # Prepare releases data
    releases_data = {}

    for repo in repos:
        name = repo["name"]
        url = repo["url"]
        print(f"Fetching releases for {name}...")
        try:
            releases = fetch_releases(url)
            releases_data[name] = [
                {
                    "tag_name": release["tag_name"],
                    "name": release["name"],
                    "published_at": release["published_at"],
                    "body": release["body"],
                    "assets": [
                        {
                            "name": asset["name"],
                            "size": asset["size"],
                            "download_count": asset["download_count"],
                            "browser_download_url": asset["browser_download_url"],
                        }
                        for asset in release.get("assets", [])
                    ],
                }
                for release in releases
            ]
        except Exception as e:
            print(f"Failed to fetch releases for {name}: {e}")

    # Write the releases data
    os.makedirs(os.path.dirname(RELEASES_FILE), exist_ok=True)
    with open(RELEASES_FILE, "w") as f:
        json.dump(releases_data, f, indent=2)
    print("Releases data updated.")

if __name__ == "__main__":
    main()
