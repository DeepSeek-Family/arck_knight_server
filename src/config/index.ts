import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });
// console.log(process.env.NODE_ENV);
const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value || defaultValue!;
};

export const config = {
  IP: getEnv("IP_ADDRESS"),
  database_url: getEnv("DB_URL"),
  appName: getEnv("APP_NAME", "Easy Express"),
  nodeEnv: getEnv("NODE_ENV", "development"),
  port: parseInt(getEnv("PORT", "8000")),
  useTypeORM: getEnv("USE_TYPEORM", "false") === "true",
  useCluster: getEnv("USE_CLUSTER", "false") === "true",

  // Database
  database: {
    host: getEnv("DB_HOST", "localhost"),
    port: parseInt(getEnv("DB_PORT", "27017")),
    name: getEnv("DB_NAME", "easy-express"),
    user: getEnv("DB_USER", ""),
    password: getEnv("DB_PASSWORD", ""),
    uri: getEnv("DB_URI", "mongodb://localhost:27017/easy-express"),
    dbClient: getEnv("DB_CLIENT", "mongodb"),
    options: {},
  },

  // JWT
  jwt: {
    secret: getEnv("JWT_SECRET", "secret"),
    refreshSecret: getEnv("JWT_REFRESH_SECRET", "refreshSecret"),
    accessExpiresIn: getEnv("JWT_ACCESS_EXPIRES_IN", "7d"),
    refreshExpiresIn: getEnv("JWT_REFRESH_EXPIRES_IN", "30d"),
    issuer: getEnv("JWT_ISSUER", "app.xyz"),
    audience: getEnv("JWT_AUDIENCE", "web"),
    cookieName: getEnv("JWT_COOKIE_NAME", "jwt"),
    cookieSecure: getEnv("JWT_COOKIE_SECURE", "false") === "true",
    cookieHttpOnly: getEnv("JWT_COOKIE_HTTP_ONLY", "true") === "true",
    cookieSameSite: getEnv("JWT_COOKIE_SAME_SITE", "strict"),
    bcryptSalt: parseInt(getEnv("JWT_BYCRYPT_SALT", "14")),
  },

  // Mail
  mail: {
    host: getEnv("EMAIL_HOST", "smtp.gmail.com"),
    port: parseInt(getEnv("EMAIL_PORT", "587")),
    user: getEnv("EMAIL_USER", ""),
    password: getEnv("EMAIL_PASS", ""),
    from: getEnv("EMAIL_FROM", ""),
  },

  // Logger
  logger: {
    label: getEnv("LOGGER_LABEL", "Easy Express Server"),
    logDir: getEnv("LOG_DIR", "logs"),
    logFilePrefix: getEnv("LOG_FILE_PREFIX", "Easy-Express"),
    maxSize: getEnv("LOG_MAX_SIZE", "20m"),
    maxFiles: getEnv("LOG_MAX_FILES", "14d"),
    exceptionFileName: getEnv("EXCEPTION_LOG_FILE_NAME", "exceptions"),
    rejectionFileName: getEnv("REJECTION_LOG_FILE_NAME", "rejections"),
  },

  // Super Admin
  superAdmin: {
    email: getEnv("SUPER_ADMIN_EMAIL", "admin@gmail.com"),
    password: getEnv("SUPER_ADMIN_PASSWORD", "MostStrongPassword"),
    confirmPassword: getEnv("CONFIRM_PASSWORD", "MostStrongPassword"),
  },

  // Flutterwave / Payment
  flutterwave: {
    secretKey: getEnv("SECRET_KEY", ""),
    publicKey: getEnv("PUBLIC_KEY", ""),
  },
};
