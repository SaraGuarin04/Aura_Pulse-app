import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./features/auth/components/login/login').then(c => c.Login),
    },
    {
        path: 'dashboard', 
        loadComponent: () =>
            import('./features/dashboard/pages/dashboard/dashboard').then(c => c.DashboardComponent),
    },
    {
        path: 'actions',
        loadComponent: () =>
            import('./features/action/pages/actions/action').then(c => c.ActionsComponent),
    },
    {
        path: 'challenges',
        loadComponent: () =>
            import('./features/challenge/pages/challenges/challenge').then(c => c.ChallengeComponent),
    },
    {
        path: 'achievements',
        loadComponent: () =>
            import('./features/achievements/pages/achievements/achievements').then(c => c.AchievementsComponent),
    },
    { path: 'profile', 
        loadComponent: () => 
            import('./features/profile/pages/profile/profile').then(c => c.ProfileComponent) 
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];