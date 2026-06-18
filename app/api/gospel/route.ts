import { NextResponse } from "next/server";
import { getGospelForDate } from "../../../lib/gospelFallback";

/**
 * Maps English and Spanish book names to standard 3-letter Bible book codes (USFM).
 */
const bookNameMap: Record<string, string> = {
  matthew: "MAT",
  mateo: "MAT",
  mark: "MRK",
  marcos: "MRK",
  luke: "LUK",
  lucas: "LUK",
  john: "JHN",
  juan: "JHN",
};

interface ParsedCitation {
  bookCode: string; // 'MAT', 'MRK', 'LUK', 'JHN'
  chapter: number;
  verses: Set<number>;
}

/**
 * Parses a scripture citation (e.g. "Matthew 18:1-20", "Matthew 10.23-31", "Juan 3:16")
 * and extracts the book code, chapter, and set of target verses.
 */
function parseCitation(citation: string): ParsedCitation | null {
  if (!citation) return null;
  
  const bookRegex = /(Matthew|Mark|Luke|John|Mateo|Marcos|Lucas|Juan)/i;
  const bookMatch = citation.match(bookRegex);
  if (!bookMatch) return null;

  const bookName = bookMatch[1].toLowerCase();
  const bookCode = bookNameMap[bookName];
  if (!bookCode) return null;

  const coordsPart = citation.substring(bookMatch.index! + bookMatch[0].length).trim();
  
  const chapterMatch = coordsPart.match(/^(\d+)/);
  if (!chapterMatch) return null;
  const chapter = parseInt(chapterMatch[1], 10);

  const verses = new Set<number>();
  
  const separatorMatch = coordsPart.substring(chapterMatch[0].length).match(/^[:\.]\s*(.*)$/);
  if (separatorMatch && separatorMatch[1]) {
    const verseSpec = separatorMatch[1].trim();
    const parts = verseSpec.split(/[\s,;\.]+/);
    for (const part of parts) {
      if (!part) continue;
      const rangeMatch = part.match(/^(\d+)-(\d+)$/);
      if (rangeMatch) {
        const start = parseInt(rangeMatch[1], 10);
        const end = parseInt(rangeMatch[2], 10);
        for (let v = start; v <= end; v++) {
          verses.add(v);
        }
      } else {
        const singleMatch = part.match(/^(\d+)$/);
        if (singleMatch) {
          verses.add(parseInt(singleMatch[1], 10));
        }
      }
    }
  }

  return { bookCode, chapter, verses };
}

/**
 * Recursively joins content array blocks to form a single verse string.
 */
function extractVerseText(verseContent: any[]): string {
  if (!Array.isArray(verseContent)) return "";
  let text = "";
  for (const item of verseContent) {
    if (typeof item === "string") {
      text += item;
    } else if (item && typeof item === "object") {
      if (item.text) {
        text += item.text;
      } else if (Array.isArray(item.content)) {
        text += extractVerseText(item.content);
      }
    }
  }
  return text;
}

/**
 * Fetches the chapter text from helloao.org using Reina Valera 1909 and filters by verse list.
 */
async function fetchSpanishBiblePassage(
  parsed: ParsedCitation,
  signal?: AbortSignal
): Promise<string> {
  const url = `https://bible.helloao.org/api/spa_r09/${parsed.bookCode}/${parsed.chapter}.json`;
  const res = await fetch(url, { signal });
  if (!res.ok) {
    throw new Error(`Failed to fetch Bible text from helloao: ${res.status}`);
  }
  const data = await res.json();
  const versesContent = data.chapter?.content;
  if (!Array.isArray(versesContent)) {
    throw new Error("Invalid chapter content structure in Bible API response");
  }

  let passageText = "";
  for (const verse of versesContent) {
    if (verse.type === "verse") {
      const verseNum = parseInt(verse.number, 10);
      if (parsed.verses.size === 0 || parsed.verses.has(verseNum)) {
        const text = extractVerseText(verse.content).trim();
        if (text) {
          passageText += `[${verseNum}] ${text} `;
        }
      }
    }
  }
  return passageText.replace(/\s+/g, " ").trim();
}

/**
 * Returns the CORS headers required for mobile app clients.
 */
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

/**
 * Strips HTML tags and collapses whitespace.
 */
function cleanHtml(html: string): string {
  if (!html) return "";
  return html
    .replace(/<br\s*\/?>/gi, "\n")      // Convert <br /> to newlines
    .replace(/<[^>]*>/g, "")            // Strip all other HTML tags
    .replace(/&nbsp;/g, " ")            // Replace non-breaking spaces
    .replace(/\s+/g, " ")               // Collapse multiple whitespaces/tabs
    .trim();
}

/**
 * Handle OPTIONS preflight requests.
 */
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  });
}

/**
 * GET handler to fetch the daily Gospel in Spanish.
 * Queries different lectionaries based on church parameter and falls back to a local database.
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get("date");
    const churchParam = searchParams.get("church") || "catholic";

    const validChurches = ["catholic", "protestant", "orthodox"];
    const church = validChurches.includes(churchParam.toLowerCase())
      ? churchParam.toLowerCase()
      : "catholic";

    // Standardize query date or default to current local date
    let dateStr = dateParam;
    if (!dateStr) {
      const now = new Date();
      const offset = now.getTimezoneOffset();
      const localNow = new Date(now.getTime() - (offset * 60 * 1000));
      dateStr = localNow.toISOString().split("T")[0];
    }

    let gospelData = null;

    // Attempt to fetch from the live APIs
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      if (church === "catholic") {
        // Format date for Evangelizo: YYYY-MM-DD -> YYYYMMDD
        const apiDateStr = dateStr.replace(/-/g, "");
        const citationUrl = `https://feed.evangelizo.org/v2/reader.php?date=${apiDateStr}&lang=SP&type=reading_lt&content=GSP`;
        const passageUrl = `https://feed.evangelizo.org/v2/reader.php?date=${apiDateStr}&lang=SP&type=reading&content=GSP`;

        const [citationRes, passageRes] = await Promise.all([
          fetch(citationUrl, { signal: controller.signal }),
          fetch(passageUrl, { signal: controller.signal }),
        ]);

        clearTimeout(timeoutId);

        if (citationRes.ok && passageRes.ok) {
          const citationRaw = await citationRes.text();
          const passageRaw = await passageRes.text();

          if (citationRaw && passageRaw && !citationRaw.includes("<html>")) {
            const cleanCitation = cleanHtml(citationRaw)
              .replace(/^Evangelio según San\s+/i, "")
              .replace(/^Evangelio según\s+/i, "")
              .replace(/\.$/, "")
              .trim();

            const cleanPassage = cleanHtml(passageRaw)
              .replace(/\s*Extraído de la Biblia.*$/is, "")
              .replace(/\s*Para recibir cada mañana.*$/is, "")
              .trim();

            gospelData = {
              date: dateStr,
              citation: cleanCitation || "Evangelio",
              passage: cleanPassage,
              source: "Evangelizo.org (Libro del Pueblo de Dios)",
            };
          }
        }
      } else if (church === "protestant") {
        // Fetch from Lectio API
        const lectioUrl = `https://lectio-api.org/api/v1/readings?date=${dateStr}&tradition=episcopal`;
        const lectioRes = await fetch(lectioUrl, { signal: controller.signal });
        
        if (lectioRes.ok) {
          const lectioData = await lectioRes.json();
          const readings = lectioData.data?.readings || [];
          const gospelReading = readings.find((r: any) => r.type === "gospel");
          
          if (gospelReading && gospelReading.citation) {
            const parsed = parseCitation(gospelReading.citation);
            if (parsed) {
              const passage = await fetchSpanishBiblePassage(parsed, controller.signal);
              clearTimeout(timeoutId);
              if (passage) {
                gospelData = {
                  date: dateStr,
                  citation: cleanHtml(gospelReading.citation),
                  passage: cleanHtml(passage),
                  source: "Lectio-API.org / Reina Valera 1909",
                };
              }
            }
          }
        }
        clearTimeout(timeoutId);
      } else if (church === "orthodox") {
        // Fetch from Orthocal API
        const [year, month, day] = dateStr.split("-");
        const orthocalUrl = `https://orthocal.info/api/gregorian/${year}/${parseInt(month, 10)}/${parseInt(day, 10)}/`;
        const orthocalRes = await fetch(orthocalUrl, { signal: controller.signal });
        
        if (orthocalRes.ok) {
          const orthocalData = await orthocalRes.json();
          const readings = orthocalData.readings || [];
          const gospelReading = readings.find((r: any) => r.source === "Gospel");
          
          if (gospelReading && gospelReading.display) {
            const parsed = parseCitation(gospelReading.display);
            if (parsed) {
              const passage = await fetchSpanishBiblePassage(parsed, controller.signal);
              clearTimeout(timeoutId);
              if (passage) {
                gospelData = {
                  date: dateStr,
                  citation: cleanHtml(gospelReading.display),
                  passage: cleanHtml(passage),
                  source: "Orthocal.info / Reina Valera 1909",
                };
              }
            }
          }
        }
        clearTimeout(timeoutId);
      }
    } catch (e) {
      console.warn(`External API fetch failed or timed out for church: ${church}. Using local fallback.`, e);
    }

    // Fall back to local robust database if external fetch failed or was empty
    if (!gospelData) {
      gospelData = getGospelForDate(dateStr, church);
    }

    // Return JSON payload with CORS and stale-while-revalidate cache headers
    return NextResponse.json(gospelData, {
      status: 200,
      headers: {
        ...corsHeaders(),
        "Cache-Control": "s-maxage=86400, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Critical error in GET /api/gospel/route:", error);
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Internal Server Error",
        message: errorMessage,
      },
      {
        status: 500,
        headers: corsHeaders(), // CORS must still be attached on errors for client debugging
      }
    );
  }
}
