import {origin, endpoints, webAPI} from './webapi';

export interface AccountInfo {
  email: string;
  user_name?: string;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  full_name?: string;
  preferred_name?: string;
  mobile_phone?: string;
  backup_email?: string;
}

export interface SignInResponse {
  sessionId: string;
  message?: string;
}

export function signIn(email: string): Promise<SignInResponse> {
  return new Promise((resolve, reject) => {
    const url = `${origin}${endpoints.session.login}`;
    const body = {
      action: 'propose',
      email,
      device: 'iPhone 13',
      os: 'iOS 15.0',
    };
    webAPI
      .post(url, body)
      .then(result => {
        const message = (result.message as string) || '';
        const sessionId = (result.session_id as string) || '';
        resolve({sessionId, message});
      })
      .catch(reason => {
        reject(reason);
      });
  });
}

export function verifySignInCode(
  sessionId: string,
  code: string,
): Promise<SignInResponse> {
  return new Promise((resolve, reject) => {
    const url = `${origin}${endpoints.session.login}`;
    const body = {
      action: 'pass',
      session_id: sessionId,
      code,
    };
    webAPI
      .put(url, body)
      .then(result => {
        resolve({sessionId: (result.sessionId as string) || ''});
      })
      .catch(reason => {
        reject(reason);
      });
  });
}

export function logOut(sessionId: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const url = `${origin}${endpoints.session.logout}`;
    const body = {
      session_id: sessionId,
    };
    webAPI
      .put(url, body)
      .then(_result => {
        resolve(true);
      })
      .catch(reason => {
        reject(reason);
      });
  });
}
