# AuthWidget

Simple JS React frontend that uses AWS Amplify to connect to a Cognito User Pool for authentication

# Usage

## Add to package.json
No NPM module, so just install directly from github. v1.0.3 is the first working version
```
"dependencies": {
    "react-cognito-auth-widget": "git+https://github.com/SmilesAir/AuthWidget.git#v1.0.3",
```

## In JS
Using webpack and require to import the module. Use your own Cognito user pool and user pool web client id.
```
const { AuthWidget } = require("react-cognito-auth-widget")

...

class Main {
    constructor() {
        super()
    }

    onSignIn(username) {
    }

    onSignOut() {
    }

    render() {
        let userPoolId = "us-west-2_xxxxxxx"
        let userPoolWebClientId = "xxxxxxxxxxxxxxxxxxxxxxxxxx"

        let style = {
            position: "absolute",
            top: "5px",
            right: "5px",
            backgroundColor: "aliceblue"
        }

        return (
            <div>
                <AuthWidget
                    region={"us-west-2"}
                    userPoolId={userPoolId}
                    userPoolWebClientId={userPoolWebClientId}
                    signInCallback={(username) => this.onSignIn(username)}
                    signOutCallback={() => this.onSignOut()}
                    style={style}
                />
            </div>
        )
    }
}
```

## Serverless.yml
Create the user pool in Cognito using serverless
```
service: example-project

provider:
  name: aws
  runtime: nodejs16.x
  region: us-west-2
  stage: ${opt:stage, "development"}

  environment:
    DOMAIN_SUFFIX: example-project

  httpApi:
    payload: '2.0'
    cors: true
    authorizers:
      serviceAuthorizer:
        identitySource: $request.header.Authorization
        issuerUrl:
          Fn::Join:
          - ''
          - - 'https://cognito-idp.'
            - '${opt:region, self:provider.region}'
            - '.amazonaws.com/'
            - Ref: serviceUserPool
        audience:
          - Ref: serviceUserPoolClient

resources:
  Resources:
    HttpApi:
      DependsOn: serviceUserPool
    serviceUserPool:
      Type: AWS::Cognito::UserPool
      Properties:
        UserPoolName: ${self:service}-user-pool-${opt:stage, self:provider.stage}
        UsernameAttributes:
          - email
        AutoVerifiedAttributes:
          - email
        Policies:
          PasswordPolicy:
            MinimumLength: 8
            RequireLowercase: false
            RequireNumbers: false
            RequireSymbols: false
            RequireUppercase: false
    serviceUserPoolClient:
      Type: AWS::Cognito::UserPoolClient
      Properties:
        ClientName: ${self:service}-user-pool-client-${opt:stage, self:provider.stage}
        AllowedOAuthFlows:
          - code
          - implicit
        AllowedOAuthFlowsUserPoolClient: true
        AllowedOAuthScopes:
          - email
          - openid
          - profile
          - aws.cognito.signin.user.admin
        UserPoolId:
          Ref: serviceUserPool
        CallbackURLs:
          - https://www.example.com
        ExplicitAuthFlows:
          - ALLOW_USER_SRP_AUTH
          - ALLOW_REFRESH_TOKEN_AUTH
        GenerateSecret: false
        SupportedIdentityProviders:
          - COGNITO
    serviceUserPoolDomain:
      Type: AWS::Cognito::UserPoolDomain
      Properties:
        UserPoolId:
          Ref: serviceUserPool
        Domain: ${self:service}-user-pool-domain-${opt:stage, self:provider.stage}-${self:provider.environment.DOMAIN_SUFFIX}
```
