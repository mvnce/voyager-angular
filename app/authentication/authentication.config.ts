/**
* Created by Vincent on 9/28/16.
*/

interface AuthConfiguration {
    clientID: string,
        domain: string,
        callbackURL: string
}

export const myConfig: AuthConfiguration = {
    clientID: 'YGRy3khHAVSDkK5B9DR2PcnN4RdxCkb7',
    domain: 'vinceeema.auth0.com',
    callbackURL: 'http://localhost:3000/'
};
