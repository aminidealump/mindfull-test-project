// lib/amplify.js
import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  Auth: {
    Cognito: {
      region: process.env.NEXT_PUBLIC_AWS_REGION || 'ap-southeast-2',
      userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || 'ap-southeast-2_QOBGCt2nV',
      userPoolClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || '63olv93815jtj8ukk7eecu5kpk',
      loginWith: {
        email: true,
      }
    }
  }
};

// Configure Amplify
Amplify.configure(amplifyConfig);

export default amplifyConfig;