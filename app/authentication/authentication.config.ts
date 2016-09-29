/**
* Created by Vincent on 9/28/16.
*/

interface AuthConfiguration {
    clientID: string,
    domain: string,
    callbackURL: string,
    options: any;
}

export const myConfig: AuthConfiguration = {
    clientID: 'YGRy3khHAVSDkK5B9DR2PcnN4RdxCkb7',
    domain: 'vinceeema.auth0.com',
    callbackURL: 'http://localhost:3000/',
    options: {
        theme: {
            logo: "assets/static/voyager-icon.png",
            primaryColor: "#b81b1c"
        },
        languageDictionary: {
            title: "Voyager"
        },
        auth: {
            redirect: false
        }
    }
};
