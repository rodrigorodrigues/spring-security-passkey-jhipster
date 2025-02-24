import axios from 'axios';
import { client, parsers } from '@passwordless-id/webauthn';
import { type IPasskey } from '@/shared/model/passkey.model';

const baseApiUrl = 'api/account/passkeys';

export default class PasskeyService {
  private readonly emit: (event: string, ...args: any[]) => void;

  constructor({ emit }: { emit: (event: string, ...args: any[]) => void }) {
    this.emit = emit;
  }

  public openPasskey(): void {
    this.emit('bv::show::modal', 'passkey-page');
  }

  public hidePasskey(): void {
    this.emit('bv::hide::modal', 'passkey-page');
  }

  /**
   * Method to convert the base64 to string
   */
  decodeBase64(base64url) {
    const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    const binStr = window.atob(base64);
    const bin = new Uint8Array(binStr.length);
    for (let i = 0; i < binStr.length; i++) {
      bin[i] = binStr.charCodeAt(i);
    }
    return bin.buffer;
  }

  public async doRegister(label): Promise<boolean> {
    try {
      // 1. Get a challenge from the server
      const response = await axios.post('webauthn/register/options');
      if (response.status === 200 && response.data?.challenge) {
        console.log(`response.data: ${JSON.stringify(response.data)}`);

        const decodedExcludeCredentials = !response.data.excludeCredentials
          ? []
          : response.data.excludeCredentials.map(cred => ({
              ...cred,
              id: this.decodeBase64(cred.id),
            }));
        console.log(`decodedExcludeCredentials: ${decodedExcludeCredentials}`);

        const decodedOptions = {
          user: {
            id: response.data.user.id,
            name: response.data.user.name,
            displayName: response.data.user.displayName,
          },
          challenge: response.data.challenge,
          excludeCredentials: decodedExcludeCredentials,
        };

        console.log(`decodedOptions: ${JSON.stringify(decodedOptions)}`);

        // 2. Invoking WebAuthn in the browser
        const registration = await client.register(decodedOptions);
        console.log(`registration: ${JSON.stringify(registration)}`);

        const registrationParsed = {
          publicKey: {
            credential: {
              id: registration.id,
              rawId: registration.rawId,
              response: {
                ...registration.response,
              },
              type: registration.type,
              clientExtensionResults: registration.clientExtensionResults,
              authenticatorAttachment: registration.authenticatorAttachment,
            },
            label: label,
          },
        };

        console.log(`registrationParsed: ${JSON.stringify(registrationParsed)}`);

        // 3. Send the payload to the server
        const registerResponse = await axios.post('webauthn/register', registrationParsed);

        // 4. Check if response is 200
        if (registerResponse.status !== 200) {
          throw new Error('Invalid passkey credential');
        }

        return true;
      }
    } catch (error) {
      // Ignore error
    }

    return false;
  }

  public async doLogin(): Promise<boolean> {
    try {
      // 1. Get a challenge from the server
      const response = await axios.post('webauthn/authenticate/options');
      if (response.status === 200 && response.data?.challenge) {
        // 2. Invoking WebAuthn in the browser
        const authentication = await client.authenticate({
          challenge: response.data.challenge,
          userVerification: response.data.userVerification,
          timeout: response.data.timeout,
        });

        // 3. Send the payload to the server
        console.log('Authentication payload');
        console.log(JSON.stringify(authentication, null, 2));

        const loginWebauthn = await axios.post('login/webauthn', authentication);

        if (loginWebauthn.status !== 200) {
          throw new Error('Invalid passkey credential');
        }

        // 4. The server can now verify the payload, but let's just parse it for the demo
        const authenticationParsed = await parsers.parseAuthentication(authentication);
        console.log(`authenticationParsed: ${authenticationParsed}`);

        return authenticationParsed !== null;
      }
    } catch (error) {
      // Ignore error
    }

    return false;
  }

  public find(id: number): Promise<IPasskey> {
    return new Promise<IPasskey>((resolve, reject) => {
      axios
        .get(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public retrieve(): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .get(baseApiUrl)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public delete(id: number): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      axios
        .delete(`${baseApiUrl}/${id}`)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public create(entity: IPasskey): Promise<IPasskey> {
    return new Promise<IPasskey>((resolve, reject) => {
      axios
        .post(`${baseApiUrl}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public update(entity: IPasskey): Promise<IPasskey> {
    return new Promise<IPasskey>((resolve, reject) => {
      axios
        .put(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  public partialUpdate(entity: IPasskey): Promise<IPasskey> {
    return new Promise<IPasskey>((resolve, reject) => {
      axios
        .patch(`${baseApiUrl}/${entity.id}`, entity)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
