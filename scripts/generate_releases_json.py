import json
import requests
import os

# Load the repo list from repos.json
with open('src/data/repos.json', 'r') as f:
    repos = json.load(f)

# Initialize a dictionary to hold the releases
releases = {}

# Fetch release data for each repo
for repo in repos:
    releases[repo['name']] = []
    # Construct the API URL for releases
    releases_url = f"{repo['url']}/releases"
    response = requests.get(releases_url)
    
    if response.status_code == 200:
        releases_data = response.json()  # Parse the releases data
        for release in releases_data:
            release_info = {
                'tag_name': release['tag_name'],
                'name': release['name'],
                'published_at': release['published_at'],
                'body': release['body'],
                'assets': [{'name': asset['name'], 
                            'download_count': asset['download_count'], 
                            'browser_download_url': asset['browser_download_url']} 
                           for asset in release['assets']]
            }
            releases[repo['name']].append(release_info)

# Define the file path where releases.json will be saved
output_path = 'src/data/releases.json'

# Write the updated releases data to releases.json
with open(output_path, 'w') as f:
    json.dump(releases, f, indent=2)

# Optionally, print a message to confirm
print(f"Updated releases data has been written to {output_path}")
