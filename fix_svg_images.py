#!/usr/bin/env python3
"""
Script to extract inline SVG data URIs from js/comics.js
and convert them to separate .svg files
"""

import os
import re
import urllib.parse

# Read the comics.js file
with open('/app/js/comics.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all cover data URIs
pattern = r"cover:\s*'(data:image/svg\+xml,[^']+)'"
matches = re.findall(pattern, content)

print(f"Found {len(matches)} inline SVG covers")

# Create the images/placeholders directory
os.makedirs('/app/images/placeholders', exist_ok=True)

# Process each SVG
for i, data_uri in enumerate(matches, start=1):
    # Extract the SVG content after the data:image/svg+xml, prefix
    svg_encoded = data_uri.replace('data:image/svg+xml,', '')
    
    # Decode the percent-encoded SVG
    svg_decoded = urllib.parse.unquote(svg_encoded)
    
    # Save to file
    filename = f'comic-{i}.svg'
    filepath = f'/app/images/placeholders/{filename}'
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(svg_decoded)
    
    print(f"Created: {filename}")
    
    # Replace in content
    old_cover = f"cover: '{data_uri}'"
    new_cover = f"cover: './images/placeholders/{filename}'"
    content = content.replace(old_cover, new_cover)

# Write the updated comics.js file
with open('/app/js/comics.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("\n✅ Successfully updated js/comics.js")
print(f"✅ Created {len(matches)} SVG files in images/placeholders/")
