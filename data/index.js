import { format } from 'date-fns'
import {
  activeProjects,
  recentProjects,
  recentContributions,
  legacyProjects,
  apps,
} from '../helpers/projects'

export default function(repos) {
  return {
    lastBuild: format(new Date(), 'dddd, MMMM Do, yyyy'),
    apps: {
      title: 'Apps',
      description: '',
      projects: apps(),
    },
    projects: {
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
