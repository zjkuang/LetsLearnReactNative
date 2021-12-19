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

export function signIn(email: string): Promise<string> {
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
        const message = result.message as string;
        resolve(message || '');
      })
      .catch(reason => {
        reject(reason);
      });
  });
}
