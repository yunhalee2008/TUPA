"""Back up every original media file from inhi.kim before the domain switch.

Downloads all wp:attachment_url entries from the WordPress export (originals,
no resizing) into ~/TUPA-backup/inhi-kim-uploads/, preserving the
wp-content/uploads/... directory layout. Safe to re-run (skips existing).

Run: python3 scripts/backup-inhi-kim-uploads.py
"""
import os
import re
import sys
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

SRC = os.path.join(os.path.dirname(__file__), "..", "tupa.WordPress.2026-07-02.xml")
DEST = os.path.expanduser("~/TUPA-backup/inhi-kim-uploads")
NS = {"wp": "http://wordpress.org/export/1.2/"}
UA = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)"}

raw = open(SRC, encoding="utf-8", errors="replace").read()
raw = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", " ", raw)
root = ET.fromstring(raw)

urls = []
for it in root.findall(".//item"):
    if it.findtext("wp:post_type", "", NS) != "attachment":
        continue
    url = it.findtext("wp:attachment_url", "", NS)
    if url:
        urls.append(url)

print(f"{len(urls)} attachments to back up -> {DEST}", flush=True)
ok = skip = fail = 0
failures = []
for i, url in enumerate(urls, 1):
    path = urllib.parse.urlsplit(url).path  # /wp-content/uploads/....
    local = os.path.join(DEST, path.lstrip("/"))
    if os.path.exists(local) and os.path.getsize(local) > 0:
        skip += 1
        continue
    os.makedirs(os.path.dirname(local), exist_ok=True)
    p = urllib.parse.urlsplit(url)
    url2 = urllib.parse.urlunsplit((p.scheme, p.netloc, urllib.parse.quote(p.path), p.query, ""))
    try:
        req = urllib.request.Request(url2, headers=UA)
        with urllib.request.urlopen(req, timeout=60) as r, open(local, "wb") as f:
            f.write(r.read())
        ok += 1
    except Exception as e:  # noqa: BLE001
        fail += 1
        failures.append(f"{url}\t{e}")
    if i % 100 == 0:
        print(f"  {i}/{len(urls)} (ok={ok} skip={skip} fail={fail})", flush=True)

with open(os.path.join(DEST, "_failures.log"), "w") as f:
    f.write("\n".join(failures))
print(f"done: ok={ok} skip={skip} fail={fail} (failures logged)", flush=True)
