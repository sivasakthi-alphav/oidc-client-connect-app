import { UserManager, WebStorageStateStore } from 'oidc-client-ts';

// Base URL for the OIDC provider
const AUTHORITY_BASE_URL = 'https://shield-api-dev.butaliamedia.com';

// OpenID Connect configuration
const oidcConfig = {
  authority: AUTHORITY_BASE_URL,
  client_id: '5dae3ebd2bf8507cb5b56542c10e18bc',
  redirect_uri: 'http://localhost:5173/callback',
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
  client_secret: 'fc8956cd4476f0a48e56811f59eba67c962c286808dc1e5ddc14f7cbd8b5ed8d',
  // Add additional metadata
  metadata: {
    authorization_endpoint: `${AUTHORITY_BASE_URL}/auth`,
    token_endpoint: `${AUTHORITY_BASE_URL}/token`,
    userinfo_endpoint: `${AUTHORITY_BASE_URL}/userinfo`,
    end_session_endpoint: `${AUTHORITY_BASE_URL}/logout`,
    jwks_uri: `${AUTHORITY_BASE_URL}/.well-known/jwks.json`
  },
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
    console.log('Login initiated hit');
    await userManager.signinRedirect();
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