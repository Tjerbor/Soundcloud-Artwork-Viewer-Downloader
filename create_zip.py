from pathlib import Path
import shutil

shutil.make_archive(
    "soundloud-artwork-viewer-downloader", "zip", str(Path(__file__).parent) + "/src"
)
