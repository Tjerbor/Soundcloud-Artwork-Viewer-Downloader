import glob
import json
import os
import subprocess

ICON_FOLDER = 'src/icons/'

with open('src/manifest.json', 'r') as manifest:
    manifest_decoded = json.load(manifest)

icon_sizes = manifest_decoded["icons"].keys()

if (os.path.exists(ICON_FOLDER)):
    old_icons = glob.glob(f'{ICON_FOLDER}icon*.png')
    for old_icon in old_icons:
        os.unlink(old_icon)
else:
    os.mkdir(ICON_FOLDER)

for icon_size in icon_sizes:
    subprocess.run(
        ['ffmpeg', '-i', 'icon.png', '-vf', f'scale={icon_size}:{icon_size}', f'{ICON_FOLDER}icon{icon_size}.png',
         '-y'], stdout=subprocess.DEVNULL, stderr=subprocess.STDOUT)
