import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

// OpenID Connect configuration
const oidcConfig = {
  authority: 'http://localhost:3001',
  client_id: 'deb07d93187c742a3120fd8a02e3f956',
  redirect_uri: 'http://localhost:5173/callback',
  organizationName: 'butalia media',
  response_type: 'code',
  scope: 'openid email profile',
  post_logout_redirect_uri: 'http://localhost:5173/callback',
  automaticSilentRenew: true,
  loadUserInfo: true,
  stateStore: new WebStorageStateStore({ store: window.localStorage }),
  // Add required grant types
  grant_type: 'authorization_code',
  // Add token endpoint auth method
  token_endpoint_auth_method: 'none',
  client_secret: '7db97bdcd62716913a8963cc645eb084ade55d308edf6b535d6c10a5025bc4a6',
  // Add additional metadata
  metadata: {
    authorization_endpoint: 'http://localhost:3001/auth',
    token_endpoint: 'http://localhost:3001/token',
    userinfo_endpoint: 'http://localhost:3001/userinfo',
    end_session_endpoint: 'http://localhost:3001/logout',
    jwks_uri: 'http://localhost:3001/.well-known/jwks.json'
  }
};

// Initialize the UserManager
const userManager = new UserManager(oidcConfig);

/**
 * Initialize the OpenID client
 * @returns {Promise<UserManager>} - Initialized UserManager instance
 */
export async function initializeClient() {
  try {
    // The UserManager is already initialized with the config
    console.log('OpenID client initialized successfully');
    return userManager;
  } catch (error) {
    console.error('Failed to initialize OpenID client:', error);
    throw error;
  }
}

/**
 * Build the authorization URL and initiate login
 * @returns {Promise<void>}
 */
export async function login() {
  try {
    await userManager.signinRedirect({
      extraQueryParams: {
        organizationName: oidcConfig.organizationName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Handle the callback and process the authentication response
 * @returns {Promise<User>} - The authenticated user
 */
export async function handleCallback() {
  try {
    const user = await userManager.signinRedirectCallback();
    return user;
  } catch (error) {
    console.error('Callback error: oidcClient.js', error);
    throw error;
  }
}

/**
 * Get the current user
 * @returns {Promise<User|null>} - The current user or null if not authenticated
 */
export async function getUser() {
  try {
    const user = await userManager.getUser();
    return user;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
}

/**
 * Logout the current user
 * @returns {Promise<void>}
 */
export async function logout() {
  try {
    await userManager.signoutRedirect();
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export default {
  initializeClient,
  login,
  handleCallback,
  getUser,
  logout
}; 