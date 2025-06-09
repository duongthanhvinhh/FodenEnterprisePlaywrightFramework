import { Page, Locator } from '@playwright/test';

export enum MenuItem {
    ADMIN = 'Admin',
    PIM = 'PIM',
    LEAVE = 'Leave',
    TIME = 'Time',
    RECRUITMENT = 'Recruitment',
    MYINFO = 'My Info',
    PERFORMANCE = 'Performance',
    DASHBOARD = 'Dashboard',
    DIRECTORY = 'Directory',
    MAINTENANCE = 'Maintenance',
    CLAIM = 'Claim',
    BUZZ = 'Buzz'
}

export class LeftNavigationPage {
    readonly page: Page;
    readonly orangeHrmLogo: Locator;
    readonly leftNavigationPanel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.orangeHrmLogo = page.getByRole('link', { name: 'client brand banner' });
        this.leftNavigationPanel = page.locator('.oxd-sidepanel-body');
    }

    async clickMenuItem(menuItem: MenuItem): Promise<void> {
        await this.page.getByRole('link', { name: menuItem }).click();
    }
}