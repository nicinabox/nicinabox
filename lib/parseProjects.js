import {
  activeProjects,
  recentProjects,
  recentContributions,
  legacyProjects
} from './processRepos'

export default function(repos) {
  return {
    lastBuild: new Date(),
    projects: {
      activeProjects: activeProjects(repos),
      recentProjects: recentProjects(repos),
      recentContributions: recentContributions(repos),
      retiredProjects: legacyProjects(repos)
    }
  }
}
