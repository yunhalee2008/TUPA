/**
 * One-off: attach each member's repo photo (public/people/*.jpg) to their
 * Notion 멤버 row's 사진 property, so photos survive renames and Notion is
 * self-contained. Tries the Notion File Upload API first; if unavailable,
 * falls back to external URLs pointing at the deployed site.
 *
 * Run: node --env-file=.env.local scripts/upload-member-photos.mjs
 */
import { readFileSync, existsSync } from "node:fs";

const KEY = process.env.NOTION_API_KEY;
const MEMBERS_DB = "6fb5f228be9082d5ab5a810c9aa1f4f4";
const SITE_ORIGIN = "https://tupa-two.vercel.app";
const HEADERS = {
  Authorization: `Bearer ${KEY}`,
  "Notion-Version": "2022-06-28",
};

// nameEn → photo slug when kebab-case(nameEn) doesn't match the filename
const ALIASES = {
  "Bo Wang": "wang-bo",
  "Yunha Lee": "yoonha-lee", // renamed in Notion after the photo was saved
};

const slugify = (name) =>
  ALIASES[name] ?? name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function api(path, init = {}) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    ...init,
    headers: { ...HEADERS, ...(init.headers ?? {}) },
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function listMembers() {
  const pages = [];
  let cursor;
  do {
    const { ok, data } = await api(`databases/${MEMBERS_DB}/query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page_size: 100, start_cursor: cursor }),
    });
    if (!ok) throw new Error("query failed");
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

async function uploadFile(filePath, filename) {
  const created = await api("file_uploads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, content_type: "image/jpeg" }),
  });
  if (!created.ok) return { unsupported: true, error: created.data };
  const form = new FormData();
  form.append("file", new Blob([readFileSync(filePath)], { type: "image/jpeg" }), filename);
  const sent = await api(`file_uploads/${created.data.id}/send`, {
    method: "POST",
    body: form,
  });
  if (!sent.ok) return { unsupported: true, error: sent.data };
  return { id: created.data.id };
}

async function setPhoto(pageId, filesValue) {
  const res = await api(`pages/${pageId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ properties: { 사진: { files: [filesValue] } } }),
  });
  return res.ok ? null : res.data;
}

let mode = "upload"; // switches to "external" if the upload API is unavailable
let done = 0;
let skipped = 0;

const members = await listMembers();
console.log(`members: ${members.length}`);

for (const page of members) {
  const nameEn = page.properties["이름(영문)"]?.title?.[0]?.plain_text ?? "";
  const hasPhoto = (page.properties["사진"]?.files ?? []).length > 0;
  if (!nameEn || hasPhoto) {
    skipped++;
    continue;
  }
  const slug = slugify(nameEn);
  const filePath = `public/people/${slug}.jpg`;
  if (!existsSync(filePath)) {
    console.log(`no repo photo for ${nameEn} (${slug}) — skipped`);
    skipped++;
    continue;
  }

  let filesValue;
  if (mode === "upload") {
    const up = await uploadFile(filePath, `${slug}.jpg`);
    if (up.unsupported) {
      console.log("file upload API unavailable → switching to external URLs", up.error?.code ?? "");
      mode = "external";
    } else {
      filesValue = { type: "file_upload", file_upload: { id: up.id }, name: `${slug}.jpg` };
    }
  }
  if (mode === "external") {
    filesValue = {
      type: "external",
      external: { url: `${SITE_ORIGIN}/people/${slug}.jpg` },
      name: `${slug}.jpg`,
    };
  }

  const err = await setPhoto(page.id, filesValue);
  if (err) console.log(`FAILED ${nameEn}:`, err.code, err.message?.slice(0, 80));
  else {
    done++;
    console.log(`ok ${nameEn} (${mode})`);
  }
  await sleep(350);
}

console.log(`\nmode=${mode} attached=${done} skipped=${skipped}`);
