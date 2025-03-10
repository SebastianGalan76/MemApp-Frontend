export class PermissionChecker {
    static hasPermission(role: string, requiredValue: number): boolean {
        return this.getRoleValue(role) >= requiredValue;
    }

    static getRoleValue(role: string): number {
        switch (role.toUpperCase()) {
            case 'USER':
                return 100;
            case 'HELPER':
                return 1000
            case 'MODERATOR':
                return 5000;
            case 'ADMIN':
                return 100000;
        }

        return 0;
    }
}