import glob
import os
import subprocess

ICON_FOLDER = 'src/icons/'

icon_sizes = [16,32,48,128]

if(os.path.exists(ICON_FOLDER)):
    old_icons = glob.glob(f'{ICON_FOLDER}icon*.png')
    for old_icon in old_icons:
        os.unlink(old_icon)
else:
    os.mkdir(ICON_FOLDER)

for icon_size in icon_sizes:
    subprocess.run(['ffmpeg', '-i' ,'icon.png','-vf' , f'scale={icon_size}:{icon_size}', f'{ICON_FOLDER}icon{icon_size}.png', '-y'])