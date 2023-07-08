import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

// handleAuth creates all the routes login, logout etc...
// and then i pass a login: parameter with handleLogin() as an object with irts own parameter returnTo: '/dashboard' which is the URL i want AUTH0 to redirect my users to after succesful login 
export const GET = handleAuth({
    login: handleLogin({
        returnTo: '/dashboard'
    })
});
