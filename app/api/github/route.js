import { NextResponse } from "next/server";
import { featuredProjects } from "@/lib/site-data";

export const revalidate = 900;

function headers() {
  const value = {
    Accept: "application/vnd.github+json",
    "User-Agent": "0xheycat-home",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    value.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return value;
}

async function getGitHub(path) {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: headers(),
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(`GitHub request failed with ${response.status}`);
  }

  return response.json();
}

export async function GET() {
  const requests = [
    getGitHub("/users/0xheycat"),
    ...featuredProjects.map((project) =>
      getGitHub(`/repos/${project.repo}`),
    ),
  ];

  const [profileResult, ...repoResults] = await Promise.allSettled(requests);
  const repos = {};

  repoResults.forEach((result, index) => {
    const project = featuredProjects[index];

    if (result.status === "fulfilled") {
      repos[project.repo] = {
        stars: result.value.stargazers_count,
        forks: result.value.forks_count,
        openIssues: result.value.open_issues_count,
        language: result.value.language,
        pushedAt: result.value.pushed_at,
      };
    }
  });

  const profile =
    profileResult.status === "fulfilled"
      ? {
          followers: profileResult.value.followers,
          publicRepos: profileResult.value.public_repos,
          avatar: profileResult.value.avatar_url,
        }
      : null;

  return NextResponse.json(
    {
      profile,
      repos,
      updatedAt: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "public, s-maxage=900, stale-while-revalidate=3600",
      },
    },
  );
}
