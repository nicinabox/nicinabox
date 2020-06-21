import { isAfter, subDays, parseISO } from 'date-fns'
import site from '../data/site'

const isLegacyProject = (name) => {
  return site.legacyProjectNames.includes(name)
}

const sortByName = (a, b) => a.name.toLowerCase() > b.name.toLowerCase()

const isRecentProject = (project) => {
  return !isLegacyProject(project.name) &&
    isAfter(parseISO(project.pushedAt), subDays(new Date(), 30)) &&
    project.isOwner &&
    !project.isFork
}

export const reposAfter = (repos, days = 30) => {
  let date = subDays(new Date(), days)

  return repos
    .filter((repo) => isAfter(parseISO(repo.pushedAt), date))
    .sort(sortByName)
}

export const activeProjects = (repos) => {
  return reposAfter(repos, 30).filter((repo) => repo.isOwner)
}

export const legacyProjects = (repos) => {
  return repos
    .filter((repo) => isLegacyProject(repo.name))
    .sort(sortByName)
}

export const recentContributions = (repos) => {
  return reposAfter(repos, 365).filter((project) => project.isFork || project.isContributor)
}

export const recentProjects = (repos) => {
  return reposAfter(repos, 30 * 6)
    .filter(isRecentProject)
    .sort(sortByName)
}

export function apps() {
  return site.apps
}