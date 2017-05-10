import {
  activeProjects,
  recentProjects,
  recentContributions,
  legacyProjects,
  apps,
} from './processRepos'

export default function(repos) {
  return {
    lastBuild: new Date(),
    projects: {
      apps: {
        title: 'Apps',
        description: '',
        projects: apps(),
      },
      activeProjects: {
        title: 'Active Projects',
        description: 'Last 30 days',
        projects: activeProjects(repos),
      },
      recentProjects: {
        title: 'Recent Projects',
        description: 'Last 6 months',
        projects: recentProjects(repos),
      },
      recentContributions: {
        title: 'Forks & Contributions',
        description: 'Last 12 months',
        projects: recentContributions(repos),
      },
      retiredProjects: {
        title: 'Retired Projects',
        description: 'Not under active development',
        projects: legacyProjects(repos)
      }
    }
  }
}
