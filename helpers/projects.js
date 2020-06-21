import { isAfter, isBefore, subDays, parseISO } from 'date-fns'
import site from '../data/site'

const isLegacyProject = (name) => {
  return site.legacyProjectNames.includes(name)
}

const sortByName = (a, b) => a.name.toLowerCase() > b.name.toLowerCase()

const isRecentProject = (project) => {
  return !isLegacyProject(project.name) && project.isOwner && !project.isFork
}

export const reposBetween = (repos, [minDays, maxDays]) => {
    const ceil = subDays(new Date(), minDays)
    const floor = subDays(new Date(), maxDays)

    return repos.filter((repo) => {
        return isAfter(parseISO(repo.pushedAt), floor) &&
            isBefore(parseISO(repo.pushedAt), ceil)
    })
}

export const reposAfter = (repos, daysBeforeNow = 30) => {
  const date = subDays(new Date(), daysBeforeNow);

  return repos
    .filter((repo) => isAfter(parseISO(repo.pushedAt), date))
    .sort(sortByName)
}

export const activeProjects = (repos) => {
  return reposAfter(repos, 30).filter((repo) => repo.isOwner)
}

export const recentProjects = (repos) => {
  return reposBetween(repos, [30, 30 * 6])
    .filter(isRecentProject)
    .sort(sortByName);
};

export const legacyProjects = (repos) => {
  return repos
    .filter((repo) => isLegacyProject(repo.name))
    .sort(sortByName)
}

export const recentContributions = (repos) => {
  return reposAfter(repos, 365).filter((project) => project.isFork || project.isContributor)
}

export function apps() {
  return site.apps
}
