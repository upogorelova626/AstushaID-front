export interface UserSession {
    id: string;
    device: string;
    location: string;
    ipAddress: string;
    userAgent: string;
    lastActive: string;
    createdAt: string;
    isCurrent: boolean;
    icon: string;
}
