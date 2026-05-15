import { a as __require, n as __esmMin, o as __toCommonJS, r as __exportAll, s as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { $ as init_dist_es$5, A as loadSsoSessionData, B as dist_es_exports$21, Ct as require_client, D as init_dist_es$1, Dt as init_dist_es$25, Et as dist_es_exports$24, F as init_dist_es, G as init_dist_es$21, H as dist_es_exports$9, J as dist_es_exports$2, K as dist_es_exports$3, L as TokenProviderError, M as getSSOTokenFromFile, N as getSSOTokenFilepath, P as getProfileName, Q as dist_es_exports$4, R as CredentialsProviderError, S as init_dist_es$23, St as init_dist_es$8, T as init_dist_es$13, Tt as init_dist_es$17, U as init_dist_es$10, V as init_dist_es$22, W as dist_es_exports$20, X as require_protocols, Y as init_dist_es$3, Z as require_dist_cjs, a as init_dist_es$24, at as init_dist_es$20, b as init_dist_es$12, bt as init_dist_es$7, c as dist_es_exports$14, ct as dist_es_exports$17, d as init_dist_es$11, dt as init_dist_es$2, et as require_schema, f as dist_es_exports$8, ht as init_dist_es$14, i as dist_es_exports$23, it as dist_es_exports$19, k as parseKnownFiles, l as init_dist_es$15, lt as init_dist_es$18, mt as dist_es_exports$13, nt as init_dist_es$6, o as dist_es_exports$15, ot as dist_es_exports$18, p as init_dist_es$9, q as init_dist_es$4, s as init_dist_es$16, st as init_dist_es$19, tt as dist_es_exports$5, u as dist_es_exports$10, ut as dist_es_exports$1, v as require_httpAuthSchemes, w as dist_es_exports$12, wt as dist_es_exports$16, x as dist_es_exports$22, xt as dist_es_exports$7, y as dist_es_exports$11, yt as dist_es_exports$6 } from "./client-s3+[...].mjs";
import { promises } from "node:fs";
//#region node_modules/@aws-sdk/credential-provider-sso/dist-es/isSsoProfile.js
init_dist_es();
init_dist_es$1();
var isSsoProfile = (arg) => arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_session === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");
var REFRESH_MESSAGE = `To refresh this SSO session run 'aws sso login' with the corresponding profile.`;
//#endregion
//#region node_modules/@aws-sdk/token-providers/dist-es/getSsoOidcClient.js
var getSsoOidcClient = async (ssoRegion, init = {}, callerClientConfig) => {
	const { SSOOIDCClient } = await import("../aws-sdk__nested-clients.mjs").then((n) => /* @__PURE__ */ __toESM(n.n()));
	const coalesce = (prop) => init.clientConfig?.[prop] ?? init.parentClientConfig?.[prop] ?? callerClientConfig?.[prop];
	return new SSOOIDCClient(Object.assign({}, init.clientConfig ?? {}, {
		region: ssoRegion ?? init.clientConfig?.region,
		logger: coalesce("logger"),
		userAgentAppId: coalesce("userAgentAppId")
	}));
};
//#endregion
//#region node_modules/@aws-sdk/token-providers/dist-es/getNewSsoOidcToken.js
var getNewSsoOidcToken = async (ssoToken, ssoRegion, init = {}, callerClientConfig) => {
	const { CreateTokenCommand } = await import("../aws-sdk__nested-clients.mjs").then((n) => /* @__PURE__ */ __toESM(n.n()));
	return (await getSsoOidcClient(ssoRegion, init, callerClientConfig)).send(new CreateTokenCommand({
		clientId: ssoToken.clientId,
		clientSecret: ssoToken.clientSecret,
		refreshToken: ssoToken.refreshToken,
		grantType: "refresh_token"
	}));
};
//#endregion
//#region node_modules/@aws-sdk/token-providers/dist-es/validateTokenExpiry.js
var validateTokenExpiry = (token) => {
	if (token.expiration && token.expiration.getTime() < Date.now()) throw new TokenProviderError(`Token is expired. ${REFRESH_MESSAGE}`, false);
};
//#endregion
//#region node_modules/@aws-sdk/token-providers/dist-es/validateTokenKey.js
init_dist_es();
var validateTokenKey = (key, value, forRefresh = false) => {
	if (typeof value === "undefined") throw new TokenProviderError(`Value not present for '${key}' in SSO Token${forRefresh ? ". Cannot refresh" : ""}. ${REFRESH_MESSAGE}`, false);
};
//#endregion
//#region node_modules/@aws-sdk/token-providers/dist-es/writeSSOTokenToFile.js
var { writeFile } = promises;
var writeSSOTokenToFile = (id, ssoToken) => {
	return writeFile(getSSOTokenFilepath(id), JSON.stringify(ssoToken, null, 2));
};
//#endregion
//#region node_modules/@aws-sdk/token-providers/dist-es/fromSso.js
init_dist_es();
init_dist_es$1();
var lastRefreshAttemptTime = /* @__PURE__ */ new Date(0);
var fromSso = (init = {}) => async ({ callerClientConfig } = {}) => {
	init.logger?.debug("@aws-sdk/token-providers - fromSso");
	const profiles = await parseKnownFiles(init);
	const profileName = getProfileName({ profile: init.profile ?? callerClientConfig?.profile });
	const profile = profiles[profileName];
	if (!profile) throw new TokenProviderError(`Profile '${profileName}' could not be found in shared credentials file.`, false);
	else if (!profile["sso_session"]) throw new TokenProviderError(`Profile '${profileName}' is missing required property 'sso_session'.`);
	const ssoSessionName = profile["sso_session"];
	const ssoSession = (await loadSsoSessionData(init))[ssoSessionName];
	if (!ssoSession) throw new TokenProviderError(`Sso session '${ssoSessionName}' could not be found in shared credentials file.`, false);
	for (const ssoSessionRequiredKey of ["sso_start_url", "sso_region"]) if (!ssoSession[ssoSessionRequiredKey]) throw new TokenProviderError(`Sso session '${ssoSessionName}' is missing required property '${ssoSessionRequiredKey}'.`, false);
	ssoSession["sso_start_url"];
	const ssoRegion = ssoSession["sso_region"];
	let ssoToken;
	try {
		ssoToken = await getSSOTokenFromFile(ssoSessionName);
	} catch (e) {
		throw new TokenProviderError(`The SSO session token associated with profile=${profileName} was not found or is invalid. ${REFRESH_MESSAGE}`, false);
	}
	validateTokenKey("accessToken", ssoToken.accessToken);
	validateTokenKey("expiresAt", ssoToken.expiresAt);
	const { accessToken, expiresAt } = ssoToken;
	const existingToken = {
		token: accessToken,
		expiration: new Date(expiresAt)
	};
	if (existingToken.expiration.getTime() - Date.now() > 3e5) return existingToken;
	if (Date.now() - lastRefreshAttemptTime.getTime() < 30 * 1e3) {
		validateTokenExpiry(existingToken);
		return existingToken;
	}
	validateTokenKey("clientId", ssoToken.clientId, true);
	validateTokenKey("clientSecret", ssoToken.clientSecret, true);
	validateTokenKey("refreshToken", ssoToken.refreshToken, true);
	try {
		lastRefreshAttemptTime.setTime(Date.now());
		const newSsoOidcToken = await getNewSsoOidcToken(ssoToken, ssoRegion, init, callerClientConfig);
		validateTokenKey("accessToken", newSsoOidcToken.accessToken);
		validateTokenKey("expiresIn", newSsoOidcToken.expiresIn);
		const newTokenExpiration = new Date(Date.now() + newSsoOidcToken.expiresIn * 1e3);
		try {
			await writeSSOTokenToFile(ssoSessionName, {
				...ssoToken,
				accessToken: newSsoOidcToken.accessToken,
				expiresAt: newTokenExpiration.toISOString(),
				refreshToken: newSsoOidcToken.refreshToken
			});
		} catch (error) {}
		return {
			token: newSsoOidcToken.accessToken,
			expiration: newTokenExpiration
		};
	} catch (error) {
		validateTokenExpiry(existingToken);
		return existingToken;
	}
};
//#endregion
//#region node_modules/@aws-sdk/credential-provider-sso/dist-es/resolveSSOCredentials.js
var import_client = require_client();
init_dist_es();
init_dist_es$1();
var SHOULD_FAIL_CREDENTIAL_CHAIN = false;
var resolveSSOCredentials = async ({ ssoStartUrl, ssoSession, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, clientConfig, parentClientConfig, callerClientConfig, profile, filepath, configFilepath, ignoreCache, logger }) => {
	let token;
	const refreshMessage = `To refresh this SSO session run aws sso login with the corresponding profile.`;
	if (ssoSession) try {
		const _token = await fromSso({
			profile,
			filepath,
			configFilepath,
			ignoreCache
		})();
		token = {
			accessToken: _token.token,
			expiresAt: new Date(_token.expiration).toISOString()
		};
	} catch (e) {
		throw new CredentialsProviderError(e.message, {
			tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
			logger
		});
	}
	else try {
		token = await getSSOTokenFromFile(ssoStartUrl);
	} catch (e) {
		throw new CredentialsProviderError(`The SSO session associated with this profile is invalid. ${refreshMessage}`, {
			tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
			logger
		});
	}
	if (new Date(token.expiresAt).getTime() - Date.now() <= 0) throw new CredentialsProviderError(`The SSO session associated with this profile has expired. ${refreshMessage}`, {
		tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
		logger
	});
	const { accessToken } = token;
	const { SSOClient, GetRoleCredentialsCommand } = await Promise.resolve().then(() => loadSso_exports);
	const sso = ssoClient || new SSOClient(Object.assign({}, clientConfig ?? {}, {
		logger: clientConfig?.logger ?? callerClientConfig?.logger ?? parentClientConfig?.logger,
		region: clientConfig?.region ?? ssoRegion,
		userAgentAppId: clientConfig?.userAgentAppId ?? callerClientConfig?.userAgentAppId ?? parentClientConfig?.userAgentAppId
	}));
	let ssoResp;
	try {
		ssoResp = await sso.send(new GetRoleCredentialsCommand({
			accountId: ssoAccountId,
			roleName: ssoRoleName,
			accessToken
		}));
	} catch (e) {
		throw new CredentialsProviderError(e, {
			tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
			logger
		});
	}
	const { roleCredentials: { accessKeyId, secretAccessKey, sessionToken, expiration, credentialScope, accountId } = {} } = ssoResp;
	if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) throw new CredentialsProviderError("SSO returns an invalid temporary credential.", {
		tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
		logger
	});
	const credentials = {
		accessKeyId,
		secretAccessKey,
		sessionToken,
		expiration: new Date(expiration),
		...credentialScope && { credentialScope },
		...accountId && { accountId }
	};
	if (ssoSession) (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_SSO", "s");
	else (0, import_client.setCredentialFeature)(credentials, "CREDENTIALS_SSO_LEGACY", "u");
	return credentials;
};
//#endregion
//#region node_modules/@aws-sdk/credential-provider-sso/dist-es/validateSsoProfile.js
init_dist_es();
var validateSsoProfile = (profile, logger) => {
	const { sso_start_url, sso_account_id, sso_region, sso_role_name } = profile;
	if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) throw new CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(profile).join(", ")}\nReference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, {
		tryNextLink: false,
		logger
	});
	return profile;
};
//#endregion
//#region node_modules/@aws-sdk/credential-provider-sso/dist-es/fromSSO.js
init_dist_es();
init_dist_es$1();
var fromSSO = (init = {}) => async ({ callerClientConfig } = {}) => {
	init.logger?.debug("@aws-sdk/credential-provider-sso - fromSSO");
	const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
	const { ssoClient } = init;
	const profileName = getProfileName({ profile: init.profile ?? callerClientConfig?.profile });
	if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
		const profile = (await parseKnownFiles(init))[profileName];
		if (!profile) throw new CredentialsProviderError(`Profile ${profileName} was not found.`, { logger: init.logger });
		if (!isSsoProfile(profile)) throw new CredentialsProviderError(`Profile ${profileName} is not configured with SSO credentials.`, { logger: init.logger });
		if (profile?.sso_session) {
			const session = (await loadSsoSessionData(init))[profile.sso_session];
			const conflictMsg = ` configurations in profile ${profileName} and sso-session ${profile.sso_session}`;
			if (ssoRegion && ssoRegion !== session.sso_region) throw new CredentialsProviderError(`Conflicting SSO region` + conflictMsg, {
				tryNextLink: false,
				logger: init.logger
			});
			if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) throw new CredentialsProviderError(`Conflicting SSO start_url` + conflictMsg, {
				tryNextLink: false,
				logger: init.logger
			});
			profile.sso_region = session.sso_region;
			profile.sso_start_url = session.sso_start_url;
		}
		const { sso_start_url, sso_account_id, sso_region, sso_role_name, sso_session } = validateSsoProfile(profile, init.logger);
		return resolveSSOCredentials({
			ssoStartUrl: sso_start_url,
			ssoSession: sso_session,
			ssoAccountId: sso_account_id,
			ssoRegion: sso_region,
			ssoRoleName: sso_role_name,
			ssoClient,
			clientConfig: init.clientConfig,
			parentClientConfig: init.parentClientConfig,
			callerClientConfig: init.callerClientConfig,
			profile: profileName,
			filepath: init.filepath,
			configFilepath: init.configFilepath,
			ignoreCache: init.ignoreCache,
			logger: init.logger
		});
	} else if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) throw new CredentialsProviderError("Incomplete configuration. The fromSSO() argument hash must include \"ssoStartUrl\", \"ssoAccountId\", \"ssoRegion\", \"ssoRoleName\"", {
		tryNextLink: false,
		logger: init.logger
	});
	else return resolveSSOCredentials({
		ssoStartUrl,
		ssoSession,
		ssoAccountId,
		ssoRegion,
		ssoRoleName,
		ssoClient,
		clientConfig: init.clientConfig,
		parentClientConfig: init.parentClientConfig,
		callerClientConfig: init.callerClientConfig,
		profile: profileName,
		filepath: init.filepath,
		configFilepath: init.configFilepath,
		ignoreCache: init.ignoreCache,
		logger: init.logger
	});
};
//#endregion
//#region node_modules/@aws-sdk/credential-provider-sso/dist-es/index.js
var dist_es_exports = /* @__PURE__ */ __exportAll({
	fromSSO: () => fromSSO,
	isSsoProfile: () => isSsoProfile,
	validateSsoProfile: () => validateSsoProfile
});
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.defaultSSOHttpAuthSchemeProvider = exports.defaultSSOHttpAuthSchemeParametersProvider = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_middleware_1 = (init_dist_es$2(), __toCommonJS(dist_es_exports$1));
	var defaultSSOHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSSOHttpAuthSchemeParametersProvider = defaultSSOHttpAuthSchemeParametersProvider;
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "awsssoportal",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createSmithyApiNoAuthHttpAuthOption(authParameters) {
		return { schemeId: "smithy.api#noAuth" };
	}
	var defaultSSOHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "GetRoleCredentials":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSSOHttpAuthSchemeProvider = defaultSSOHttpAuthSchemeProvider;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, httpAuthSchemes_1.resolveAwsSdkSigV4Config)(config);
		return Object.assign(config_0, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/package.json
var package_exports = /* @__PURE__ */ __exportAll({
	author: () => author,
	browser: () => browser,
	default: () => package_default,
	dependencies: () => dependencies,
	description: () => description,
	devDependencies: () => devDependencies,
	engines: () => engines,
	exports: () => exports$1,
	files: () => files,
	homepage: () => homepage,
	license: () => license,
	main: () => main,
	module: () => module,
	name: () => name,
	repository: () => repository,
	scripts: () => scripts,
	sideEffects: () => false,
	types: () => types,
	typesVersions: () => typesVersions,
	version: () => version
}), name, version, description, main, module, types, scripts, engines, author, license, dependencies, devDependencies, typesVersions, files, browser, homepage, repository, exports$1, package_default;
var init_package = __esmMin((() => {
	name = "@aws-sdk/nested-clients";
	version = "3.997.6";
	description = "Nested clients for AWS SDK packages.";
	main = "./dist-cjs/index.js";
	module = "./dist-es/index.js";
	types = "./dist-types/index.d.ts";
	scripts = {
		"build": "yarn lint && concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs",
		"build:cjs": "node ../../scripts/compilation/inline nested-clients",
		"build:es": "tsc -p tsconfig.es.json",
		"build:include:deps": "yarn g:turbo run build -F=\"$npm_package_name\"",
		"build:types": "tsc -p tsconfig.types.json",
		"build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4",
		"clean": "premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo",
		"lint": "node ../../scripts/validation/submodules-linter.js --pkg nested-clients",
		"test": "yarn g:vitest run",
		"test:watch": "yarn g:vitest watch"
	};
	engines = { "node": ">=20.0.0" };
	author = {
		"name": "AWS SDK for JavaScript Team",
		"url": "https://aws.amazon.com/javascript/"
	};
	license = "Apache-2.0";
	dependencies = {
		"@aws-crypto/sha256-browser": "5.2.0",
		"@aws-crypto/sha256-js": "5.2.0",
		"@aws-sdk/core": "^3.974.8",
		"@aws-sdk/middleware-host-header": "^3.972.10",
		"@aws-sdk/middleware-logger": "^3.972.10",
		"@aws-sdk/middleware-recursion-detection": "^3.972.11",
		"@aws-sdk/middleware-user-agent": "^3.972.38",
		"@aws-sdk/region-config-resolver": "^3.972.13",
		"@aws-sdk/signature-v4-multi-region": "^3.996.25",
		"@aws-sdk/types": "^3.973.8",
		"@aws-sdk/util-endpoints": "^3.996.8",
		"@aws-sdk/util-user-agent-browser": "^3.972.10",
		"@aws-sdk/util-user-agent-node": "^3.973.24",
		"@smithy/config-resolver": "^4.4.17",
		"@smithy/core": "^3.23.17",
		"@smithy/fetch-http-handler": "^5.3.17",
		"@smithy/hash-node": "^4.2.14",
		"@smithy/invalid-dependency": "^4.2.14",
		"@smithy/middleware-content-length": "^4.2.14",
		"@smithy/middleware-endpoint": "^4.4.32",
		"@smithy/middleware-retry": "^4.5.7",
		"@smithy/middleware-serde": "^4.2.20",
		"@smithy/middleware-stack": "^4.2.14",
		"@smithy/node-config-provider": "^4.3.14",
		"@smithy/node-http-handler": "^4.6.1",
		"@smithy/protocol-http": "^5.3.14",
		"@smithy/smithy-client": "^4.12.13",
		"@smithy/types": "^4.14.1",
		"@smithy/url-parser": "^4.2.14",
		"@smithy/util-base64": "^4.3.2",
		"@smithy/util-body-length-browser": "^4.2.2",
		"@smithy/util-body-length-node": "^4.2.3",
		"@smithy/util-defaults-mode-browser": "^4.3.49",
		"@smithy/util-defaults-mode-node": "^4.2.54",
		"@smithy/util-endpoints": "^3.4.2",
		"@smithy/util-middleware": "^4.2.14",
		"@smithy/util-retry": "^4.3.6",
		"@smithy/util-utf8": "^4.2.2",
		"tslib": "^2.6.2"
	};
	devDependencies = {
		"concurrently": "7.0.0",
		"downlevel-dts": "0.10.1",
		"premove": "4.0.0",
		"typescript": "~5.8.3"
	};
	typesVersions = { "<4.5": { "dist-types/*": ["dist-types/ts3.4/*"] } };
	files = [
		"./cognito-identity.d.ts",
		"./cognito-identity.js",
		"./signin.d.ts",
		"./signin.js",
		"./sso-oidc.d.ts",
		"./sso-oidc.js",
		"./sso.d.ts",
		"./sso.js",
		"./sts.d.ts",
		"./sts.js",
		"dist-*/**"
	];
	browser = {
		"./dist-es/submodules/cognito-identity/runtimeConfig": "./dist-es/submodules/cognito-identity/runtimeConfig.browser",
		"./dist-es/submodules/signin/runtimeConfig": "./dist-es/submodules/signin/runtimeConfig.browser",
		"./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser",
		"./dist-es/submodules/sso/runtimeConfig": "./dist-es/submodules/sso/runtimeConfig.browser",
		"./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser"
	};
	homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients";
	repository = {
		"type": "git",
		"url": "https://github.com/aws/aws-sdk-js-v3.git",
		"directory": "packages/nested-clients"
	};
	exports$1 = {
		"./package.json": "./package.json",
		"./sso-oidc": {
			"types": "./dist-types/submodules/sso-oidc/index.d.ts",
			"module": "./dist-es/submodules/sso-oidc/index.js",
			"node": "./dist-cjs/submodules/sso-oidc/index.js",
			"import": "./dist-es/submodules/sso-oidc/index.js",
			"require": "./dist-cjs/submodules/sso-oidc/index.js"
		},
		"./sts": {
			"types": "./dist-types/submodules/sts/index.d.ts",
			"module": "./dist-es/submodules/sts/index.js",
			"node": "./dist-cjs/submodules/sts/index.js",
			"import": "./dist-es/submodules/sts/index.js",
			"require": "./dist-cjs/submodules/sts/index.js"
		},
		"./signin": {
			"types": "./dist-types/submodules/signin/index.d.ts",
			"module": "./dist-es/submodules/signin/index.js",
			"node": "./dist-cjs/submodules/signin/index.js",
			"import": "./dist-es/submodules/signin/index.js",
			"require": "./dist-cjs/submodules/signin/index.js"
		},
		"./cognito-identity": {
			"types": "./dist-types/submodules/cognito-identity/index.d.ts",
			"module": "./dist-es/submodules/cognito-identity/index.js",
			"node": "./dist-cjs/submodules/cognito-identity/index.js",
			"import": "./dist-es/submodules/cognito-identity/index.js",
			"require": "./dist-cjs/submodules/cognito-identity/index.js"
		},
		"./sso": {
			"types": "./dist-types/submodules/sso/index.d.ts",
			"module": "./dist-es/submodules/sso/index.js",
			"node": "./dist-cjs/submodules/sso/index.js",
			"import": "./dist-es/submodules/sso/index.js",
			"require": "./dist-cjs/submodules/sso/index.js"
		}
	};
	package_default = {
		name,
		version,
		description,
		main,
		module,
		types,
		scripts,
		engines,
		sideEffects: false,
		author,
		license,
		dependencies,
		devDependencies,
		typesVersions,
		files,
		browser,
		"react-native": {},
		homepage,
		repository,
		exports: exports$1
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/endpoint/bdd.js
var require_bdd = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bdd = void 0;
	var util_endpoints_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$2));
	var k = "ref";
	var a = -1, b = true, c = "isSet", d = "PartitionResult", e = "booleanEquals", f = "getAttr", g = { [k]: "Endpoint" }, h = { [k]: d }, i = {}, j = [{ [k]: "Region" }];
	var _data = {
		conditions: [
			[c, [g]],
			[c, j],
			[
				"aws.partition",
				j,
				d
			],
			[e, [{ [k]: "UseFIPS" }, b]],
			[e, [{ [k]: "UseDualStack" }, b]],
			[e, [{
				fn: f,
				argv: [h, "supportsDualStack"]
			}, b]],
			[e, [{
				fn: f,
				argv: [h, "supportsFIPS"]
			}, b]],
			["stringEquals", [{
				fn: f,
				argv: [h, "name"]
			}, "aws-us-gov"]]
		],
		results: [
			[a],
			[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
			[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
			[g, i],
			["https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://portal.sso.{Region}.amazonaws.com", i],
			["https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}", i],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			["https://portal.sso.{Region}.{PartitionResult#dnsSuffix}", i],
			[a, "Invalid Configuration: Missing Region"]
		]
	};
	var root = 2;
	var r = 1e8;
	var nodes = new Int32Array([
		-1,
		1,
		-1,
		0,
		13,
		3,
		1,
		4,
		r + 12,
		2,
		5,
		r + 12,
		3,
		8,
		6,
		4,
		7,
		r + 11,
		5,
		r + 9,
		r + 10,
		4,
		11,
		9,
		6,
		10,
		r + 8,
		7,
		r + 6,
		r + 7,
		5,
		12,
		r + 5,
		6,
		r + 4,
		r + 5,
		3,
		r + 1,
		14,
		4,
		r + 2,
		r + 3
	]);
	exports.bdd = util_endpoints_1.BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/endpoint/endpointResolver.js
var require_endpointResolver = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$3));
	var util_endpoints_2 = (init_dist_es$3(), __toCommonJS(dist_es_exports$2));
	var bdd_1 = require_bdd();
	var cache = new util_endpoints_2.EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS"
		]
	});
	var defaultEndpointResolver = (endpointParams, context = {}) => {
		return cache.get(endpointParams, () => (0, util_endpoints_2.decideEndpoint)(bdd_1.bdd, {
			endpointParams,
			logger: context.logger
		}));
	};
	exports.defaultEndpointResolver = defaultEndpointResolver;
	util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/models/SSOServiceException.js
var require_SSOServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SSOServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$4));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.SSOServiceException = class SSOServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SSOServiceException.prototype);
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/models/errors.js
var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UnauthorizedException = exports.TooManyRequestsException = exports.ResourceNotFoundException = exports.InvalidRequestException = void 0;
	var SSOServiceException_1 = require_SSOServiceException();
	exports.InvalidRequestException = class InvalidRequestException extends SSOServiceException_1.SSOServiceException {
		name = "InvalidRequestException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "InvalidRequestException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidRequestException.prototype);
		}
	};
	exports.ResourceNotFoundException = class ResourceNotFoundException extends SSOServiceException_1.SSOServiceException {
		name = "ResourceNotFoundException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "ResourceNotFoundException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
		}
	};
	exports.TooManyRequestsException = class TooManyRequestsException extends SSOServiceException_1.SSOServiceException {
		name = "TooManyRequestsException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "TooManyRequestsException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, TooManyRequestsException.prototype);
		}
	};
	exports.UnauthorizedException = class UnauthorizedException extends SSOServiceException_1.SSOServiceException {
		name = "UnauthorizedException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "UnauthorizedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnauthorizedException.prototype);
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/schemas/schemas_0.js
var require_schemas_0 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.GetRoleCredentials$ = exports.RoleCredentials$ = exports.GetRoleCredentialsResponse$ = exports.GetRoleCredentialsRequest$ = exports.errorTypeRegistries = exports.UnauthorizedException$ = exports.TooManyRequestsException$ = exports.ResourceNotFoundException$ = exports.InvalidRequestException$ = exports.SSOServiceException$ = void 0;
	var _ATT = "AccessTokenType";
	var _GRC = "GetRoleCredentials";
	var _GRCR = "GetRoleCredentialsRequest";
	var _GRCRe = "GetRoleCredentialsResponse";
	var _IRE = "InvalidRequestException";
	var _RC = "RoleCredentials";
	var _RNFE = "ResourceNotFoundException";
	var _SAKT = "SecretAccessKeyType";
	var _STT = "SessionTokenType";
	var _TMRE = "TooManyRequestsException";
	var _UE = "UnauthorizedException";
	var _aI = "accountId";
	var _aKI = "accessKeyId";
	var _aT = "accessToken";
	var _ai = "account_id";
	var _c = "client";
	var _e = "error";
	var _ex = "expiration";
	var _h = "http";
	var _hE = "httpError";
	var _hH = "httpHeader";
	var _hQ = "httpQuery";
	var _m = "message";
	var _rC = "roleCredentials";
	var _rN = "roleName";
	var _rn = "role_name";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.sso";
	var _sAK = "secretAccessKey";
	var _sT = "sessionToken";
	var _xasbt = "x-amz-sso_bearer_token";
	var n0 = "com.amazonaws.sso";
	var schema_1 = require_schema();
	var errors_1 = require_errors();
	var SSOServiceException_1 = require_SSOServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.SSOServiceException$ = [
		-3,
		_s,
		"SSOServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.SSOServiceException$, SSOServiceException_1.SSOServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.InvalidRequestException$ = [
		-3,
		n0,
		_IRE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.InvalidRequestException$, errors_1.InvalidRequestException);
	exports.ResourceNotFoundException$ = [
		-3,
		n0,
		_RNFE,
		{
			[_e]: _c,
			[_hE]: 404
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.ResourceNotFoundException$, errors_1.ResourceNotFoundException);
	exports.TooManyRequestsException$ = [
		-3,
		n0,
		_TMRE,
		{
			[_e]: _c,
			[_hE]: 429
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.TooManyRequestsException$, errors_1.TooManyRequestsException);
	exports.UnauthorizedException$ = [
		-3,
		n0,
		_UE,
		{
			[_e]: _c,
			[_hE]: 401
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.UnauthorizedException$, errors_1.UnauthorizedException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var AccessTokenType = [
		0,
		n0,
		_ATT,
		8,
		0
	];
	var SecretAccessKeyType = [
		0,
		n0,
		_SAKT,
		8,
		0
	];
	var SessionTokenType = [
		0,
		n0,
		_STT,
		8,
		0
	];
	exports.GetRoleCredentialsRequest$ = [
		3,
		n0,
		_GRCR,
		0,
		[
			_rN,
			_aI,
			_aT
		],
		[
			[0, { [_hQ]: _rn }],
			[0, { [_hQ]: _ai }],
			[() => AccessTokenType, { [_hH]: _xasbt }]
		],
		3
	];
	exports.GetRoleCredentialsResponse$ = [
		3,
		n0,
		_GRCRe,
		0,
		[_rC],
		[[() => exports.RoleCredentials$, 0]]
	];
	exports.RoleCredentials$ = [
		3,
		n0,
		_RC,
		0,
		[
			_aKI,
			_sAK,
			_sT,
			_ex
		],
		[
			0,
			[() => SecretAccessKeyType, 0],
			[() => SessionTokenType, 0],
			1
		]
	];
	exports.GetRoleCredentials$ = [
		9,
		n0,
		_GRC,
		{ [_h]: [
			"GET",
			"/federation/credentials",
			200
		] },
		() => exports.GetRoleCredentialsRequest$,
		() => exports.GetRoleCredentialsResponse$
	];
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/runtimeConfig.shared.js
var require_runtimeConfig_shared = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var protocols_1 = require_protocols();
	var core_1 = require_dist_cjs();
	var smithy_client_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$4));
	var url_parser_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$5));
	var util_base64_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$6));
	var util_utf8_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$7));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
	var endpointResolver_1 = require_endpointResolver();
	var schemas_0_1 = require_schemas_0();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2019-06-10",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSSOHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [{
				schemeId: "aws.auth#sigv4",
				identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
				signer: new httpAuthSchemes_1.AwsSdkSigV4Signer()
			}, {
				schemeId: "smithy.api#noAuth",
				identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
				signer: new core_1.NoAuthSigner()
			}],
			logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
			protocol: config?.protocol ?? protocols_1.AwsRestJsonProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.sso",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				version: "2019-06-10",
				serviceTarget: "SWBPortalService"
			},
			serviceId: config?.serviceId ?? "SSO",
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/runtimeConfig.js
var require_runtimeConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1 = __require("tslib").__importDefault((init_package(), __toCommonJS(package_exports).default));
	var client_1 = require_client();
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_user_agent_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$8));
	var config_resolver_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$9));
	var hash_node_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$10));
	var middleware_retry_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$11));
	var node_config_provider_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$12));
	var node_http_handler_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$13));
	var smithy_client_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$4));
	var util_body_length_node_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$14));
	var util_defaults_mode_node_1 = (init_dist_es$16(), __toCommonJS(dist_es_exports$15));
	var util_retry_1 = (init_dist_es$17(), __toCommonJS(dist_es_exports$16));
	var runtimeConfig_shared_1 = require_runtimeConfig_shared();
	var getRuntimeConfig = (config) => {
		(0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
		const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
		const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
		const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
		(0, client_1.emitWarningIfUnsupportedVersion)(process.version);
		const loaderConfig = {
			profile: config?.profile,
			logger: clientSharedValues.logger
		};
		return {
			...clientSharedValues,
			...config,
			runtime: "node",
			defaultsMode,
			authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(httpAuthSchemes_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
			bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
			defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({
				serviceId: clientSharedValues.serviceId,
				clientVersion: package_json_1.default.version
			}),
			maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
			region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, {
				...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS,
				...loaderConfig
			}),
			requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
			retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
				...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
				default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
			}, config),
			sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
			streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso/index.js
var require_sso = /* @__PURE__ */ __commonJSMin(((exports) => {
	var middlewareHostHeader = (init_dist_es$18(), __toCommonJS(dist_es_exports$17));
	var middlewareLogger = (init_dist_es$19(), __toCommonJS(dist_es_exports$18));
	var middlewareRecursionDetection = (init_dist_es$20(), __toCommonJS(dist_es_exports$19));
	var middlewareUserAgent = (init_dist_es$21(), __toCommonJS(dist_es_exports$20));
	var configResolver = (init_dist_es$10(), __toCommonJS(dist_es_exports$9));
	var core = require_dist_cjs();
	var schema = require_schema();
	var middlewareContentLength = (init_dist_es$22(), __toCommonJS(dist_es_exports$21));
	var middlewareEndpoint = (init_dist_es$23(), __toCommonJS(dist_es_exports$22));
	var middlewareRetry = (init_dist_es$12(), __toCommonJS(dist_es_exports$11));
	var smithyClient = (init_dist_es$5(), __toCommonJS(dist_es_exports$4));
	var httpAuthSchemeProvider = require_httpAuthSchemeProvider();
	var runtimeConfig = require_runtimeConfig();
	var regionConfigResolver = (init_dist_es$24(), __toCommonJS(dist_es_exports$23));
	var protocolHttp = (init_dist_es$25(), __toCommonJS(dist_es_exports$24));
	var schemas_0 = require_schemas_0();
	var errors = require_errors();
	var SSOServiceException = require_SSOServiceException();
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "awsssoportal"
		});
	};
	var commonParams = {
		UseFIPS: {
			type: "builtInParams",
			name: "useFipsEndpoint"
		},
		Endpoint: {
			type: "builtInParams",
			name: "endpoint"
		},
		Region: {
			type: "builtInParams",
			name: "region"
		},
		UseDualStack: {
			type: "builtInParams",
			name: "useDualstackEndpoint"
		}
	};
	var getHttpAuthExtensionConfiguration = (runtimeConfig) => {
		const _httpAuthSchemes = runtimeConfig.httpAuthSchemes;
		let _httpAuthSchemeProvider = runtimeConfig.httpAuthSchemeProvider;
		let _credentials = runtimeConfig.credentials;
		return {
			setHttpAuthScheme(httpAuthScheme) {
				const index = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
				if (index === -1) _httpAuthSchemes.push(httpAuthScheme);
				else _httpAuthSchemes.splice(index, 1, httpAuthScheme);
			},
			httpAuthSchemes() {
				return _httpAuthSchemes;
			},
			setHttpAuthSchemeProvider(httpAuthSchemeProvider) {
				_httpAuthSchemeProvider = httpAuthSchemeProvider;
			},
			httpAuthSchemeProvider() {
				return _httpAuthSchemeProvider;
			},
			setCredentials(credentials) {
				_credentials = credentials;
			},
			credentials() {
				return _credentials;
			}
		};
	};
	var resolveHttpAuthRuntimeConfig = (config) => {
		return {
			httpAuthSchemes: config.httpAuthSchemes(),
			httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
			credentials: config.credentials()
		};
	};
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign(regionConfigResolver.getAwsRegionExtensionConfiguration(runtimeConfig), smithyClient.getDefaultExtensionConfiguration(runtimeConfig), protocolHttp.getHttpHandlerExtensionConfiguration(runtimeConfig), getHttpAuthExtensionConfiguration(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, regionConfigResolver.resolveAwsRegionExtensionConfiguration(extensionConfiguration), smithyClient.resolveDefaultRuntimeConfig(extensionConfiguration), protocolHttp.resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
	};
	var SSOClient = class extends smithyClient.Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = runtimeConfig.getRuntimeConfig(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_1 = resolveClientEndpointParameters(_config_0);
			const _config_2 = middlewareUserAgent.resolveUserAgentConfig(_config_1);
			const _config_3 = middlewareRetry.resolveRetryConfig(_config_2);
			const _config_4 = configResolver.resolveRegionConfig(_config_3);
			const _config_5 = middlewareHostHeader.resolveHostHeaderConfig(_config_4);
			const _config_6 = middlewareEndpoint.resolveEndpointConfig(_config_5);
			const _config_8 = resolveRuntimeExtensions(httpAuthSchemeProvider.resolveHttpAuthSchemeConfig(_config_6), configuration?.extensions || []);
			this.config = _config_8;
			this.middlewareStack.use(schema.getSchemaSerdePlugin(this.config));
			this.middlewareStack.use(middlewareUserAgent.getUserAgentPlugin(this.config));
			this.middlewareStack.use(middlewareRetry.getRetryPlugin(this.config));
			this.middlewareStack.use(middlewareContentLength.getContentLengthPlugin(this.config));
			this.middlewareStack.use(middlewareHostHeader.getHostHeaderPlugin(this.config));
			this.middlewareStack.use(middlewareLogger.getLoggerPlugin(this.config));
			this.middlewareStack.use(middlewareRecursionDetection.getRecursionDetectionPlugin(this.config));
			this.middlewareStack.use(core.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider.defaultSSOHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var GetRoleCredentialsCommand = class extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").sc(schemas_0.GetRoleCredentials$).build() {};
	var commands = { GetRoleCredentialsCommand };
	var SSO = class extends SSOClient {};
	smithyClient.createAggregatedClient(commands, SSO);
	exports.$Command = smithyClient.Command;
	exports.__Client = smithyClient.Client;
	exports.SSOServiceException = SSOServiceException.SSOServiceException;
	exports.GetRoleCredentialsCommand = GetRoleCredentialsCommand;
	exports.SSO = SSO;
	exports.SSOClient = SSOClient;
	Object.prototype.hasOwnProperty.call(schemas_0, "__proto__") && !Object.prototype.hasOwnProperty.call(exports, "__proto__") && Object.defineProperty(exports, "__proto__", {
		enumerable: true,
		value: schemas_0["__proto__"]
	});
	Object.keys(schemas_0).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = schemas_0[k];
	});
	Object.prototype.hasOwnProperty.call(errors, "__proto__") && !Object.prototype.hasOwnProperty.call(exports, "__proto__") && Object.defineProperty(exports, "__proto__", {
		enumerable: true,
		value: errors["__proto__"]
	});
	Object.keys(errors).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = errors[k];
	});
}));
//#endregion
//#region node_modules/@aws-sdk/credential-provider-sso/dist-es/loadSso.js
var loadSso_exports = /* @__PURE__ */ __exportAll({
	GetRoleCredentialsCommand: () => import_sso.GetRoleCredentialsCommand,
	SSOClient: () => import_sso.SSOClient
});
var import_sso = require_sso();
//#endregion
export { dist_es_exports as i, init_package as n, package_exports as r, loadSso_exports as t };
