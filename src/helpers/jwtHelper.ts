import jwt, { Secret } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { config } from "../config";
// Access Token create

const createAccessToken = (user: { id: string; role: string }) => {
    const secret: Secret = config.jwt.secret;
    // @ts-ignore
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
            jti: uuidv4(),
            iss: config.jwt.issuer,
            aud: config.jwt.audience,
        },
        secret,
        {
            algorithm: "HS256",
            expiresIn: config.jwt.accessExpiresIn,
        }
    );
};

const createRefreshToken = (userId: string) => {
    const secret: Secret = config.jwt.refreshSecret;
    // @ts-ignore
    return jwt.sign(
        {
            id: userId,
            jti: uuidv4(),
            iss: config.jwt.issuer,
            aud: config.jwt.audience,
        },
        secret,
        {
            algorithm: "HS256", // must include for TS
            expiresIn: config.jwt.refreshExpiresIn,
        }
    );
};

// Verify Access Token (full strict check)
const verifyAccessToken = (token: string) => {
    return jwt.verify(token, config.jwt.secret, {
        algorithms: ["HS256"],
        issuer: config.jwt.issuer,
        audience: config.jwt.audience,
        maxAge: config.jwt.accessExpiresIn,
    }) as jwt.JwtPayload;
};

// Verify Refresh Token
const verifyRefreshToken = (token: string) => {
    return jwt.verify(token, config.jwt.refreshSecret, {
        algorithms: ["HS256"],
        issuer: config.jwt.issuer,
        audience: config.jwt.audience,
    }) as jwt.JwtPayload;
};

export const jwtHelpers = {
    createAccessToken,
    createRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
