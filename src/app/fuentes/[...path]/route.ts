import { promises as fs } from "fs";
import path from "path";

const PDF_MIME = "application/pdf";

function decodeSafe(value: string) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

async function findByBasename(publicDir: string, basename: string): Promise<string | null> {
  const stack: string[] = [publicDir];
  const target = basename.toLowerCase();

  while (stack.length > 0) {
    const current = stack.pop()!;
    const entries = await fs.readdir(current, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (entry.isFile() && entry.name.toLowerCase() === target) {
        return fullPath;
      }
    }
  }

  return null;
}

export async function GET(_request: Request, context: { params: Promise<{ path: string[] }> }) {
  const params = await context.params;
  const requestedPath = (params.path ?? []).map(decodeSafe).join("/");

  if (!requestedPath) {
    return new Response("Not found", { status: 404 });
  }

  const publicDir = path.join(process.cwd(), "public");
  const directPath = path.join(publicDir, requestedPath);

  try {
    const directFile = await fs.readFile(directPath);
    return new Response(directFile, {
      status: 200,
      headers: {
        "Content-Type": PDF_MIME,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    // fallback below
  }

  const basename = path.basename(requestedPath);
  const recoveredPath = await findByBasename(publicDir, basename);

  if (!recoveredPath) {
    return new Response("Not found", { status: 404 });
  }

  const recoveredFile = await fs.readFile(recoveredPath);

  return new Response(recoveredFile, {
    status: 200,
    headers: {
      "Content-Type": PDF_MIME,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Recovered-From": path.relative(publicDir, recoveredPath).replaceAll("\\", "/"),
    },
  });
}
