export class EndpointResources {
  public static readonly auth = {
    login: '/auth/login',
    refresh: '/auth/refresh',
    logout: '/auth/logout',
  };

  public static readonly profile = {
    index: '/profile',
  };

  public static readonly panel = {
    dashboard: '/dashboard',
    charts: '/charts',
    projects: '/projects',
    information: '/information',
  };
}
