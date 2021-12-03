export interface AuthModuleConfig {
  jwtSecret: string;
  expiresIn: string;
}

export const configuration = (): AuthModuleConfig => ({
  jwtSecret: process.env.JWT_SECRET,
  expiresIn: process.env.JWT_TOKEN_EXPIRES_IN ?? '1d',
});
