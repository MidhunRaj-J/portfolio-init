import { NextResponse } from "next/server";

const PROFILE_URL = "https://api.github.com/users/MidhunRaj-J";
const REPOS_URL = "https://api.github.com/users/MidhunRaj-J/repos?sort=updated&per_page=12";

export async function GET(request) {
  const type = request.nextUrl.searchParams.get("type") || "profile";
  const sourceUrl = type === "repos" ? REPOS_URL : PROFILE_URL;

  const token = process.env.GITHUB_TOKEN;
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-os",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  try {
    const response = await fetch(sourceUrl, {
      headers,
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      return NextResponse.json(type === "repos" ? [] : {}, {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        },
      });
    }

    const data = await response.json();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch {
    return NextResponse.json(type === "repos" ? [] : {}, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
      },
    });
  }
}
