import { Response } from 'express';

const baseCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure:
    process.env.NODE_ENV === 'production' && process.env.PROTOCOL === 'https',
};

export function setAuthCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  res.cookie('accessToken', accessToken, {
    ...baseCookieOptions,
    maxAge: Number(process.env.COOKIE_ACCESS_MAXAGE) || 900000,
  });

  res.cookie('refreshToken', refreshToken, {
    ...baseCookieOptions,
    maxAge: Number(process.env.COOKIE_REFRESH_MAXAGE) || 604800000,
  });
}

export function clearAuthCookies(res: Response) {
  res.clearCookie('accessToken', baseCookieOptions);
  res.clearCookie('refreshToken', baseCookieOptions);
}
