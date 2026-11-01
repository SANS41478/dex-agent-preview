import os, zipfile
root = r"E:\Dex\dex-site\dist"
out = r"E:\Dex\dex-site\artifacts\edgeone\dex-site-dist-fixed.zip"
if os.path.exists(out): os.remove(out)
with zipfile.ZipFile(out, "w", zipfile.ZIP_DEFLATED, compresslevel=9) as z:
    for dirpath, dirnames, filenames in os.walk(root):
        for name in filenames:
            path = os.path.join(dirpath, name)
            arc = os.path.relpath(path, root).replace("\\", "/")
            z.write(path, arc)
print(out, os.path.getsize(out))
