import { ConfidentialClientApplication, CryptoProvider } from "@azure/msal-node";
import { redirect } from '@sveltejs/kit';
import { CLOUD_INSTANCE, TENANT_ID, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, POST_LOGOUT_REDIRECT_URI} from '$env/static/private';

const msalConfig = {
    auth: {
        clientId: CLIENT_ID, // 'Application (client) ID' of app registration in Azure portal - this value is a GUID
        authority: CLOUD_INSTANCE + TENANT_ID, // Full directory URL, in the form of https://login.microsoftonline.com/<tenant>
        clientSecret: CLIENT_SECRET // Client secret generated from the app registration in Azure portal
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel:any, message:any, containsPii:any) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 3,
        }
    }
}

const instance = getMsalInstance(msalConfig);

function getMsalInstance(msalConfig:any) {
    return new ConfidentialClientApplication(msalConfig);
}



/** @type {import('./$types').RequestHandler} */
export async function GET({ url }:any) {
    const red = await instance.getAuthCodeUrl({
        redirectUri: REDIRECT_URI,
        scopes: ['user.read'],
    });

	return redirect(302, red)
}

