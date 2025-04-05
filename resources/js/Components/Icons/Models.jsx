import React from 'react'

import {
    ServerStackIcon,
    UserGroupIcon,
    BellAlertIcon,
    Square3Stack3DIcon,
    CodeBracketSquareIcon,
    CloudIcon,
    WifiIcon,
    UserIcon as UserHeroIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const ClientIcon = (props) => <UserGroupIcon {...props} />
const ClientRepositoryIcon = (props) => <Cog6ToothIcon {...props} />
const ClientRepositorySettingIcon = (props) => <Cog6ToothIcon {...props} />
const GitIcon = (props) => <CloudIcon {...props} />
const GitGroupIcon = (props) => <Square3Stack3DIcon {...props} />
const HostingIcon = (props) => <ServerStackIcon {...props} />
const HostingRepositoryIcon = (props) => <Cog6ToothIcon {...props} />
const NotificationIcon = (props) => <BellAlertIcon {...props} />
const RepositoryIcon = (props) => <CodeBracketSquareIcon {...props} />

const RepositoryFileIcon = (props) => <Cog6ToothIcon {...props} />
const RepositorySettingIcon = (props) => <Cog6ToothIcon {...props} />
const UserIcon = (props) => <UserHeroIcon {...props} />
const WorkerIcon = (props) => <WifiIcon {...props} />

export {
    ClientIcon,
    ClientRepositoryIcon,
    ClientRepositorySettingIcon,
    GitIcon,
    GitGroupIcon,
    HostingIcon,
    HostingRepositoryIcon,
    NotificationIcon,
    RepositoryIcon,
    RepositoryFileIcon,
    RepositorySettingIcon,
    UserIcon,
    WorkerIcon,
}

// function which returns the icon component
export const getIconComponent = (icon) => {
    switch (icon) {
        case 'Client':
            return ClientIcon
        case 'ClientRepository':
            return ClientRepositoryIcon
        case 'ClientRepositorySetting':
            return ClientRepositorySettingIcon
        case 'Git':
            return GitIcon
        case 'GitGroup':
            return GitGroupIcon
        case 'Hosting':
            return HostingIcon
        case 'HostingRepository':
            return HostingRepositoryIcon
        case 'Notification':
            return NotificationIcon
        case 'Repository':
            return RepositoryIcon
        case 'RepositoryFile':
            return RepositoryFileIcon
        case 'RepositorySetting':
            return RepositorySettingIcon
        case 'User':
            return UserIcon
        case 'Worker':
            return WorkerIcon
        default:
            return null
    }
}
