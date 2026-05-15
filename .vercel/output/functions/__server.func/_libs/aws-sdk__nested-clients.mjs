import { a as __require, o as __toCommonJS, t as __commonJSMin } from "../_runtime.mjs";
import { $ as init_dist_es$3, B as dist_es_exports$20, Ct as require_client, Dt as init_dist_es$23, Et as dist_es_exports$23, G as init_dist_es$19, H as dist_es_exports$8, J as dist_es_exports$1, K as dist_es_exports$2, Q as dist_es_exports$3, S as init_dist_es$21, St as init_dist_es$6, T as init_dist_es$11, Tt as init_dist_es$15, U as init_dist_es$8, V as init_dist_es$20, W as dist_es_exports$19, X as require_protocols, Y as init_dist_es$1, Z as require_dist_cjs, a as init_dist_es$22, at as init_dist_es$18, b as init_dist_es$10, bt as init_dist_es$5, c as dist_es_exports$13, ct as dist_es_exports$16, d as init_dist_es$9, dt as init_dist_es, et as require_schema, f as dist_es_exports$7, g as init_dist_es$24, h as dist_es_exports$24, ht as init_dist_es$12, i as dist_es_exports$22, it as dist_es_exports$18, l as init_dist_es$13, lt as init_dist_es$16, mt as dist_es_exports$12, nt as init_dist_es$4, o as dist_es_exports$14, ot as dist_es_exports$17, p as init_dist_es$7, q as init_dist_es$2, s as init_dist_es$14, st as init_dist_es$17, tt as dist_es_exports$4, u as dist_es_exports$9, ut as dist_es_exports, v as require_httpAuthSchemes, w as dist_es_exports$11, wt as dist_es_exports$15, x as dist_es_exports$21, xt as dist_es_exports$6, y as dist_es_exports$10, yt as dist_es_exports$5 } from "./@aws-sdk/client-s3+[...].mjs";
import { n as init_package, r as package_exports } from "./@aws-sdk/credential-provider-sso+[...].mjs";
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.defaultSigninHttpAuthSchemeProvider = exports.defaultSigninHttpAuthSchemeParametersProvider = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_middleware_1 = (init_dist_es(), __toCommonJS(dist_es_exports));
	var defaultSigninHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSigninHttpAuthSchemeParametersProvider = defaultSigninHttpAuthSchemeParametersProvider;
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "signin",
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
	var defaultSigninHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "CreateOAuth2Token":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSigninHttpAuthSchemeProvider = defaultSigninHttpAuthSchemeProvider;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, httpAuthSchemes_1.resolveAwsSdkSigV4Config)(config);
		return Object.assign(config_0, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/endpoint/bdd.js
var require_bdd$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bdd = void 0;
	var util_endpoints_1 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var m = "ref";
	var a = -1, b = true, c = "isSet", d = "PartitionResult", e = "booleanEquals", f = "getAttr", g = "stringEquals", h = { [m]: "Endpoint" }, i = { [m]: d }, j = {
		fn: f,
		argv: [i, "name"]
	}, k = {}, l = [{ [m]: "Region" }];
	var _data = {
		conditions: [
			[c, [h]],
			[c, l],
			[
				"aws.partition",
				l,
				d
			],
			[e, [{ [m]: "UseFIPS" }, b]],
			[e, [{ [m]: "UseDualStack" }, b]],
			[e, [{
				fn: f,
				argv: [i, "supportsDualStack"]
			}, b]],
			[e, [{
				fn: f,
				argv: [i, "supportsFIPS"]
			}, b]],
			[g, [j, "aws"]],
			[g, [j, "aws-cn"]],
			[g, [j, "aws-us-gov"]]
		],
		results: [
			[a],
			[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
			[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
			[h, k],
			["https://{Region}.signin.aws.amazon.com", k],
			["https://{Region}.signin.amazonaws.cn", k],
			["https://{Region}.signin.amazonaws-us-gov.com", k],
			["https://signin-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", k],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://signin-fips.{Region}.{PartitionResult#dnsSuffix}", k],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://signin.{Region}.{PartitionResult#dualStackDnsSuffix}", k],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			["https://signin.{Region}.{PartitionResult#dnsSuffix}", k],
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
		15,
		3,
		1,
		4,
		r + 14,
		2,
		5,
		r + 14,
		3,
		11,
		6,
		4,
		10,
		7,
		7,
		r + 4,
		8,
		8,
		r + 5,
		9,
		9,
		r + 6,
		r + 13,
		5,
		r + 11,
		r + 12,
		4,
		13,
		12,
		6,
		r + 9,
		r + 10,
		5,
		14,
		r + 8,
		6,
		r + 7,
		r + 8,
		3,
		r + 1,
		16,
		4,
		r + 2,
		r + 3
	]);
	exports.bdd = util_endpoints_1.BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/endpoint/endpointResolver.js
var require_endpointResolver$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$2(), __toCommonJS(dist_es_exports$2));
	var util_endpoints_2 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var bdd_1 = require_bdd$2();
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/models/SigninServiceException.js
var require_SigninServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SigninServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.SigninServiceException = class SigninServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SigninServiceException.prototype);
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/models/errors.js
var require_errors$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.ValidationException = exports.TooManyRequestsError = exports.InternalServerException = exports.AccessDeniedException = void 0;
	var SigninServiceException_1 = require_SigninServiceException();
	exports.AccessDeniedException = class AccessDeniedException extends SigninServiceException_1.SigninServiceException {
		name = "AccessDeniedException";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "AccessDeniedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AccessDeniedException.prototype);
			this.error = opts.error;
		}
	};
	exports.InternalServerException = class InternalServerException extends SigninServiceException_1.SigninServiceException {
		name = "InternalServerException";
		$fault = "server";
		error;
		constructor(opts) {
			super({
				name: "InternalServerException",
				$fault: "server",
				...opts
			});
			Object.setPrototypeOf(this, InternalServerException.prototype);
			this.error = opts.error;
		}
	};
	exports.TooManyRequestsError = class TooManyRequestsError extends SigninServiceException_1.SigninServiceException {
		name = "TooManyRequestsError";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "TooManyRequestsError",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, TooManyRequestsError.prototype);
			this.error = opts.error;
		}
	};
	exports.ValidationException = class ValidationException extends SigninServiceException_1.SigninServiceException {
		name = "ValidationException";
		$fault = "client";
		error;
		constructor(opts) {
			super({
				name: "ValidationException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ValidationException.prototype);
			this.error = opts.error;
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/schemas/schemas_0.js
var require_schemas_0$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateOAuth2Token$ = exports.CreateOAuth2TokenResponseBody$ = exports.CreateOAuth2TokenResponse$ = exports.CreateOAuth2TokenRequestBody$ = exports.CreateOAuth2TokenRequest$ = exports.AccessToken$ = exports.errorTypeRegistries = exports.ValidationException$ = exports.TooManyRequestsError$ = exports.InternalServerException$ = exports.AccessDeniedException$ = exports.SigninServiceException$ = void 0;
	var _ADE = "AccessDeniedException";
	var _AT = "AccessToken";
	var _COAT = "CreateOAuth2Token";
	var _COATR = "CreateOAuth2TokenRequest";
	var _COATRB = "CreateOAuth2TokenRequestBody";
	var _COATRBr = "CreateOAuth2TokenResponseBody";
	var _COATRr = "CreateOAuth2TokenResponse";
	var _ISE = "InternalServerException";
	var _RT = "RefreshToken";
	var _TMRE = "TooManyRequestsError";
	var _VE = "ValidationException";
	var _aKI = "accessKeyId";
	var _aT = "accessToken";
	var _c = "client";
	var _cI = "clientId";
	var _cV = "codeVerifier";
	var _co = "code";
	var _e = "error";
	var _eI = "expiresIn";
	var _gT = "grantType";
	var _h = "http";
	var _hE = "httpError";
	var _iT = "idToken";
	var _jN = "jsonName";
	var _m = "message";
	var _rT = "refreshToken";
	var _rU = "redirectUri";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.signin";
	var _sAK = "secretAccessKey";
	var _sT = "sessionToken";
	var _se = "server";
	var _tI = "tokenInput";
	var _tO = "tokenOutput";
	var _tT = "tokenType";
	var n0 = "com.amazonaws.signin";
	var schema_1 = require_schema();
	var errors_1 = require_errors$2();
	var SigninServiceException_1 = require_SigninServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.SigninServiceException$ = [
		-3,
		_s,
		"SigninServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.SigninServiceException$, SigninServiceException_1.SigninServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.AccessDeniedException$ = [
		-3,
		n0,
		_ADE,
		{ [_e]: _c },
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.AccessDeniedException$, errors_1.AccessDeniedException);
	exports.InternalServerException$ = [
		-3,
		n0,
		_ISE,
		{
			[_e]: _se,
			[_hE]: 500
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.InternalServerException$, errors_1.InternalServerException);
	exports.TooManyRequestsError$ = [
		-3,
		n0,
		_TMRE,
		{
			[_e]: _c,
			[_hE]: 429
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.TooManyRequestsError$, errors_1.TooManyRequestsError);
	exports.ValidationException$ = [
		-3,
		n0,
		_VE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _m],
		[0, 0],
		2
	];
	n0_registry.registerError(exports.ValidationException$, errors_1.ValidationException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var RefreshToken = [
		0,
		n0,
		_RT,
		8,
		0
	];
	exports.AccessToken$ = [
		3,
		n0,
		_AT,
		8,
		[
			_aKI,
			_sAK,
			_sT
		],
		[
			[0, { [_jN]: _aKI }],
			[0, { [_jN]: _sAK }],
			[0, { [_jN]: _sT }]
		],
		3
	];
	exports.CreateOAuth2TokenRequest$ = [
		3,
		n0,
		_COATR,
		0,
		[_tI],
		[[() => exports.CreateOAuth2TokenRequestBody$, 16]],
		1
	];
	exports.CreateOAuth2TokenRequestBody$ = [
		3,
		n0,
		_COATRB,
		0,
		[
			_cI,
			_gT,
			_co,
			_rU,
			_cV,
			_rT
		],
		[
			[0, { [_jN]: _cI }],
			[0, { [_jN]: _gT }],
			0,
			[0, { [_jN]: _rU }],
			[0, { [_jN]: _cV }],
			[() => RefreshToken, { [_jN]: _rT }]
		],
		2
	];
	exports.CreateOAuth2TokenResponse$ = [
		3,
		n0,
		_COATRr,
		0,
		[_tO],
		[[() => exports.CreateOAuth2TokenResponseBody$, 16]],
		1
	];
	exports.CreateOAuth2TokenResponseBody$ = [
		3,
		n0,
		_COATRBr,
		0,
		[
			_aT,
			_tT,
			_eI,
			_rT,
			_iT
		],
		[
			[() => exports.AccessToken$, { [_jN]: _aT }],
			[0, { [_jN]: _tT }],
			[1, { [_jN]: _eI }],
			[() => RefreshToken, { [_jN]: _rT }],
			[0, { [_jN]: _iT }]
		],
		4
	];
	exports.CreateOAuth2Token$ = [
		9,
		n0,
		_COAT,
		{ [_h]: [
			"POST",
			"/v1/token",
			200
		] },
		() => exports.CreateOAuth2TokenRequest$,
		() => exports.CreateOAuth2TokenResponse$
	];
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/runtimeConfig.shared.js
var require_runtimeConfig_shared$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var protocols_1 = require_protocols();
	var core_1 = require_dist_cjs();
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var url_parser_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$4));
	var util_base64_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$5));
	var util_utf8_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$6));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider$2();
	var endpointResolver_1 = require_endpointResolver$2();
	var schemas_0_1 = require_schemas_0$2();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2023-01-01",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSigninHttpAuthSchemeProvider,
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
				defaultNamespace: "com.amazonaws.signin",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				version: "2023-01-01",
				serviceTarget: "Signin"
			},
			serviceId: config?.serviceId ?? "Signin",
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/runtimeConfig.js
var require_runtimeConfig$2 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1$2 = __require("tslib").__importDefault((init_package(), __toCommonJS(package_exports).default));
	var client_1 = require_client();
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_user_agent_node_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$7));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var hash_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$9));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var node_config_provider_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$11));
	var node_http_handler_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$12));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var util_body_length_node_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$13));
	var util_defaults_mode_node_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$14));
	var util_retry_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$15));
	var runtimeConfig_shared_1 = require_runtimeConfig_shared$2();
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
				clientVersion: package_json_1$2.default.version
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/signin/index.js
var require_signin = /* @__PURE__ */ __commonJSMin(((exports) => {
	var middlewareHostHeader = (init_dist_es$16(), __toCommonJS(dist_es_exports$16));
	var middlewareLogger = (init_dist_es$17(), __toCommonJS(dist_es_exports$17));
	var middlewareRecursionDetection = (init_dist_es$18(), __toCommonJS(dist_es_exports$18));
	var middlewareUserAgent = (init_dist_es$19(), __toCommonJS(dist_es_exports$19));
	var configResolver = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core = require_dist_cjs();
	var schema = require_schema();
	var middlewareContentLength = (init_dist_es$20(), __toCommonJS(dist_es_exports$20));
	var middlewareEndpoint = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var middlewareRetry = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var smithyClient = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var httpAuthSchemeProvider = require_httpAuthSchemeProvider$2();
	var runtimeConfig = require_runtimeConfig$2();
	var regionConfigResolver = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var protocolHttp = (init_dist_es$23(), __toCommonJS(dist_es_exports$23));
	var schemas_0 = require_schemas_0$2();
	var errors = require_errors$2();
	var SigninServiceException = require_SigninServiceException();
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "signin"
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
	var SigninClient = class extends smithyClient.Client {
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
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider.defaultSigninHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var CreateOAuth2TokenCommand = class extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("Signin", "CreateOAuth2Token", {}).n("SigninClient", "CreateOAuth2TokenCommand").sc(schemas_0.CreateOAuth2Token$).build() {};
	var commands = { CreateOAuth2TokenCommand };
	var Signin = class extends SigninClient {};
	smithyClient.createAggregatedClient(commands, Signin);
	var OAuth2ErrorCode = {
		AUTHCODE_EXPIRED: "AUTHCODE_EXPIRED",
		INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
		INVALID_REQUEST: "INVALID_REQUEST",
		SERVER_ERROR: "server_error",
		TOKEN_EXPIRED: "TOKEN_EXPIRED",
		USER_CREDENTIALS_CHANGED: "USER_CREDENTIALS_CHANGED"
	};
	exports.$Command = smithyClient.Command;
	exports.__Client = smithyClient.Client;
	exports.SigninServiceException = SigninServiceException.SigninServiceException;
	exports.CreateOAuth2TokenCommand = CreateOAuth2TokenCommand;
	exports.OAuth2ErrorCode = OAuth2ErrorCode;
	exports.Signin = Signin;
	exports.SigninClient = SigninClient;
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.defaultSSOOIDCHttpAuthSchemeProvider = exports.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_middleware_1 = (init_dist_es(), __toCommonJS(dist_es_exports));
	var defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSSOOIDCHttpAuthSchemeParametersProvider = defaultSSOOIDCHttpAuthSchemeParametersProvider;
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "sso-oauth",
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
	var defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "CreateToken":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				break;
			default: options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSSOOIDCHttpAuthSchemeProvider = defaultSSOOIDCHttpAuthSchemeProvider;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, httpAuthSchemes_1.resolveAwsSdkSigV4Config)(config);
		return Object.assign(config_0, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/endpoint/bdd.js
var require_bdd$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bdd = void 0;
	var util_endpoints_1 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
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
			["https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://oidc.{Region}.amazonaws.com", i],
			["https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}", i],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}", i],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			["https://oidc.{Region}.{PartitionResult#dnsSuffix}", i],
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/endpoint/endpointResolver.js
var require_endpointResolver$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$2(), __toCommonJS(dist_es_exports$2));
	var util_endpoints_2 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var bdd_1 = require_bdd$1();
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/models/SSOOIDCServiceException.js
var require_SSOOIDCServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.SSOOIDCServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.SSOOIDCServiceException = class SSOOIDCServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, SSOOIDCServiceException.prototype);
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/models/errors.js
var require_errors$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.UnsupportedGrantTypeException = exports.UnauthorizedClientException = exports.SlowDownException = exports.InvalidScopeException = exports.InvalidRequestException = exports.InvalidGrantException = exports.InvalidClientException = exports.InternalServerException = exports.ExpiredTokenException = exports.AuthorizationPendingException = exports.AccessDeniedException = void 0;
	var SSOOIDCServiceException_1 = require_SSOOIDCServiceException();
	exports.AccessDeniedException = class AccessDeniedException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "AccessDeniedException";
		$fault = "client";
		error;
		reason;
		error_description;
		constructor(opts) {
			super({
				name: "AccessDeniedException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AccessDeniedException.prototype);
			this.error = opts.error;
			this.reason = opts.reason;
			this.error_description = opts.error_description;
		}
	};
	exports.AuthorizationPendingException = class AuthorizationPendingException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "AuthorizationPendingException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "AuthorizationPendingException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, AuthorizationPendingException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.ExpiredTokenException = class ExpiredTokenException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "ExpiredTokenException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "ExpiredTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ExpiredTokenException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InternalServerException = class InternalServerException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InternalServerException";
		$fault = "server";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InternalServerException",
				$fault: "server",
				...opts
			});
			Object.setPrototypeOf(this, InternalServerException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidClientException = class InvalidClientException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidClientException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidClientException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidClientException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidGrantException = class InvalidGrantException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidGrantException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidGrantException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidGrantException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidRequestException = class InvalidRequestException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidRequestException";
		$fault = "client";
		error;
		reason;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidRequestException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidRequestException.prototype);
			this.error = opts.error;
			this.reason = opts.reason;
			this.error_description = opts.error_description;
		}
	};
	exports.InvalidScopeException = class InvalidScopeException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "InvalidScopeException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "InvalidScopeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidScopeException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.SlowDownException = class SlowDownException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "SlowDownException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "SlowDownException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, SlowDownException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.UnauthorizedClientException = class UnauthorizedClientException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "UnauthorizedClientException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "UnauthorizedClientException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnauthorizedClientException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
	exports.UnsupportedGrantTypeException = class UnsupportedGrantTypeException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
		name = "UnsupportedGrantTypeException";
		$fault = "client";
		error;
		error_description;
		constructor(opts) {
			super({
				name: "UnsupportedGrantTypeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, UnsupportedGrantTypeException.prototype);
			this.error = opts.error;
			this.error_description = opts.error_description;
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/schemas/schemas_0.js
var require_schemas_0$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.CreateToken$ = exports.CreateTokenResponse$ = exports.CreateTokenRequest$ = exports.errorTypeRegistries = exports.UnsupportedGrantTypeException$ = exports.UnauthorizedClientException$ = exports.SlowDownException$ = exports.InvalidScopeException$ = exports.InvalidRequestException$ = exports.InvalidGrantException$ = exports.InvalidClientException$ = exports.InternalServerException$ = exports.ExpiredTokenException$ = exports.AuthorizationPendingException$ = exports.AccessDeniedException$ = exports.SSOOIDCServiceException$ = void 0;
	var _ADE = "AccessDeniedException";
	var _APE = "AuthorizationPendingException";
	var _AT = "AccessToken";
	var _CS = "ClientSecret";
	var _CT = "CreateToken";
	var _CTR = "CreateTokenRequest";
	var _CTRr = "CreateTokenResponse";
	var _CV = "CodeVerifier";
	var _ETE = "ExpiredTokenException";
	var _ICE = "InvalidClientException";
	var _IGE = "InvalidGrantException";
	var _IRE = "InvalidRequestException";
	var _ISE = "InternalServerException";
	var _ISEn = "InvalidScopeException";
	var _IT = "IdToken";
	var _RT = "RefreshToken";
	var _SDE = "SlowDownException";
	var _UCE = "UnauthorizedClientException";
	var _UGTE = "UnsupportedGrantTypeException";
	var _aT = "accessToken";
	var _c = "client";
	var _cI = "clientId";
	var _cS = "clientSecret";
	var _cV = "codeVerifier";
	var _co = "code";
	var _dC = "deviceCode";
	var _e = "error";
	var _eI = "expiresIn";
	var _ed = "error_description";
	var _gT = "grantType";
	var _h = "http";
	var _hE = "httpError";
	var _iT = "idToken";
	var _r = "reason";
	var _rT = "refreshToken";
	var _rU = "redirectUri";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.ssooidc";
	var _sc = "scope";
	var _se = "server";
	var _tT = "tokenType";
	var n0 = "com.amazonaws.ssooidc";
	var schema_1 = require_schema();
	var errors_1 = require_errors$1();
	var SSOOIDCServiceException_1 = require_SSOOIDCServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.SSOOIDCServiceException$ = [
		-3,
		_s,
		"SSOOIDCServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.SSOOIDCServiceException$, SSOOIDCServiceException_1.SSOOIDCServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.AccessDeniedException$ = [
		-3,
		n0,
		_ADE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[
			_e,
			_r,
			_ed
		],
		[
			0,
			0,
			0
		]
	];
	n0_registry.registerError(exports.AccessDeniedException$, errors_1.AccessDeniedException);
	exports.AuthorizationPendingException$ = [
		-3,
		n0,
		_APE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.AuthorizationPendingException$, errors_1.AuthorizationPendingException);
	exports.ExpiredTokenException$ = [
		-3,
		n0,
		_ETE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.ExpiredTokenException$, errors_1.ExpiredTokenException);
	exports.InternalServerException$ = [
		-3,
		n0,
		_ISE,
		{
			[_e]: _se,
			[_hE]: 500
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InternalServerException$, errors_1.InternalServerException);
	exports.InvalidClientException$ = [
		-3,
		n0,
		_ICE,
		{
			[_e]: _c,
			[_hE]: 401
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InvalidClientException$, errors_1.InvalidClientException);
	exports.InvalidGrantException$ = [
		-3,
		n0,
		_IGE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InvalidGrantException$, errors_1.InvalidGrantException);
	exports.InvalidRequestException$ = [
		-3,
		n0,
		_IRE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[
			_e,
			_r,
			_ed
		],
		[
			0,
			0,
			0
		]
	];
	n0_registry.registerError(exports.InvalidRequestException$, errors_1.InvalidRequestException);
	exports.InvalidScopeException$ = [
		-3,
		n0,
		_ISEn,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.InvalidScopeException$, errors_1.InvalidScopeException);
	exports.SlowDownException$ = [
		-3,
		n0,
		_SDE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.SlowDownException$, errors_1.SlowDownException);
	exports.UnauthorizedClientException$ = [
		-3,
		n0,
		_UCE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.UnauthorizedClientException$, errors_1.UnauthorizedClientException);
	exports.UnsupportedGrantTypeException$ = [
		-3,
		n0,
		_UGTE,
		{
			[_e]: _c,
			[_hE]: 400
		},
		[_e, _ed],
		[0, 0]
	];
	n0_registry.registerError(exports.UnsupportedGrantTypeException$, errors_1.UnsupportedGrantTypeException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var AccessToken = [
		0,
		n0,
		_AT,
		8,
		0
	];
	var ClientSecret = [
		0,
		n0,
		_CS,
		8,
		0
	];
	var CodeVerifier = [
		0,
		n0,
		_CV,
		8,
		0
	];
	var IdToken = [
		0,
		n0,
		_IT,
		8,
		0
	];
	var RefreshToken = [
		0,
		n0,
		_RT,
		8,
		0
	];
	exports.CreateTokenRequest$ = [
		3,
		n0,
		_CTR,
		0,
		[
			_cI,
			_cS,
			_gT,
			_dC,
			_co,
			_rT,
			_sc,
			_rU,
			_cV
		],
		[
			0,
			[() => ClientSecret, 0],
			0,
			0,
			0,
			[() => RefreshToken, 0],
			64,
			0,
			[() => CodeVerifier, 0]
		],
		3
	];
	exports.CreateTokenResponse$ = [
		3,
		n0,
		_CTRr,
		0,
		[
			_aT,
			_tT,
			_eI,
			_rT,
			_iT
		],
		[
			[() => AccessToken, 0],
			0,
			1,
			[() => RefreshToken, 0],
			[() => IdToken, 0]
		]
	];
	exports.CreateToken$ = [
		9,
		n0,
		_CT,
		{ [_h]: [
			"POST",
			"/token",
			200
		] },
		() => exports.CreateTokenRequest$,
		() => exports.CreateTokenResponse$
	];
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/runtimeConfig.shared.js
var require_runtimeConfig_shared$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var protocols_1 = require_protocols();
	var core_1 = require_dist_cjs();
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var url_parser_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$4));
	var util_base64_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$5));
	var util_utf8_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$6));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider$1();
	var endpointResolver_1 = require_endpointResolver$1();
	var schemas_0_1 = require_schemas_0$1();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2019-06-10",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSSOOIDCHttpAuthSchemeProvider,
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
				defaultNamespace: "com.amazonaws.ssooidc",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				version: "2019-06-10",
				serviceTarget: "AWSSSOOIDCService"
			},
			serviceId: config?.serviceId ?? "SSO OIDC",
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/runtimeConfig.js
var require_runtimeConfig$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1$1 = __require("tslib").__importDefault((init_package(), __toCommonJS(package_exports).default));
	var client_1 = require_client();
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_user_agent_node_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$7));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var hash_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$9));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var node_config_provider_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$11));
	var node_http_handler_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$12));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var util_body_length_node_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$13));
	var util_defaults_mode_node_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$14));
	var util_retry_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$15));
	var runtimeConfig_shared_1 = require_runtimeConfig_shared$1();
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
				clientVersion: package_json_1$1.default.version
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sso-oidc/index.js
var require_sso_oidc = /* @__PURE__ */ __commonJSMin(((exports) => {
	var middlewareHostHeader = (init_dist_es$16(), __toCommonJS(dist_es_exports$16));
	var middlewareLogger = (init_dist_es$17(), __toCommonJS(dist_es_exports$17));
	var middlewareRecursionDetection = (init_dist_es$18(), __toCommonJS(dist_es_exports$18));
	var middlewareUserAgent = (init_dist_es$19(), __toCommonJS(dist_es_exports$19));
	var configResolver = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core = require_dist_cjs();
	var schema = require_schema();
	var middlewareContentLength = (init_dist_es$20(), __toCommonJS(dist_es_exports$20));
	var middlewareEndpoint = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var middlewareRetry = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var smithyClient = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var httpAuthSchemeProvider = require_httpAuthSchemeProvider$1();
	var runtimeConfig = require_runtimeConfig$1();
	var regionConfigResolver = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var protocolHttp = (init_dist_es$23(), __toCommonJS(dist_es_exports$23));
	var schemas_0 = require_schemas_0$1();
	var errors = require_errors$1();
	var SSOOIDCServiceException = require_SSOOIDCServiceException();
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			defaultSigningName: "sso-oauth"
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
	var SSOOIDCClient = class extends smithyClient.Client {
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
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider.defaultSSOOIDCHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({ "aws.auth#sigv4": config.credentials })
			}));
			this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	var CreateTokenCommand = class extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").sc(schemas_0.CreateToken$).build() {};
	var commands = { CreateTokenCommand };
	var SSOOIDC = class extends SSOOIDCClient {};
	smithyClient.createAggregatedClient(commands, SSOOIDC);
	var AccessDeniedExceptionReason = { KMS_ACCESS_DENIED: "KMS_AccessDeniedException" };
	var InvalidRequestExceptionReason = {
		KMS_DISABLED_KEY: "KMS_DisabledException",
		KMS_INVALID_KEY_USAGE: "KMS_InvalidKeyUsageException",
		KMS_INVALID_STATE: "KMS_InvalidStateException",
		KMS_KEY_NOT_FOUND: "KMS_NotFoundException"
	};
	exports.$Command = smithyClient.Command;
	exports.__Client = smithyClient.Client;
	exports.SSOOIDCServiceException = SSOOIDCServiceException.SSOOIDCServiceException;
	exports.AccessDeniedExceptionReason = AccessDeniedExceptionReason;
	exports.CreateTokenCommand = CreateTokenCommand;
	exports.InvalidRequestExceptionReason = InvalidRequestExceptionReason;
	exports.SSOOIDC = SSOOIDC;
	exports.SSOOIDCClient = SSOOIDCClient;
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/endpoint/bdd.js
var require_bdd = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.bdd = void 0;
	var util_endpoints_1 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var q = "ref";
	var a = -1, b = true, c = "isSet", d = "PartitionResult", e = "booleanEquals", f = "stringEquals", g = "getAttr", h = "us-east-1", i = "sigv4", j = "sts", k = "https://sts.{Region}.{PartitionResult#dnsSuffix}", l = { [q]: "Endpoint" }, m = { [q]: "Region" }, n = { [q]: d }, o = {}, p = [m];
	var _data = {
		conditions: [
			[c, [l]],
			[c, p],
			[
				"aws.partition",
				p,
				d
			],
			[e, [{ [q]: "UseFIPS" }, b]],
			[e, [{ [q]: "UseDualStack" }, b]],
			[f, [m, "aws-global"]],
			[e, [{ [q]: "UseGlobalEndpoint" }, b]],
			[f, [m, "eu-central-1"]],
			[e, [{
				fn: g,
				argv: [n, "supportsDualStack"]
			}, b]],
			[e, [{
				fn: g,
				argv: [n, "supportsFIPS"]
			}, b]],
			[f, [m, "ap-south-1"]],
			[f, [m, "eu-north-1"]],
			[f, [m, "eu-west-1"]],
			[f, [m, "eu-west-2"]],
			[f, [m, "eu-west-3"]],
			[f, [m, "sa-east-1"]],
			[f, [m, h]],
			[f, [m, "us-east-2"]],
			[f, [m, "us-west-2"]],
			[f, [m, "us-west-1"]],
			[f, [m, "ca-central-1"]],
			[f, [m, "ap-southeast-1"]],
			[f, [m, "ap-northeast-1"]],
			[f, [m, "ap-southeast-2"]],
			[f, [{
				fn: g,
				argv: [n, "name"]
			}, "aws-us-gov"]]
		],
		results: [
			[a],
			["https://sts.amazonaws.com", { authSchemes: [{
				name: i,
				signingName: j,
				signingRegion: h
			}] }],
			[k, { authSchemes: [{
				name: i,
				signingName: j,
				signingRegion: "{Region}"
			}] }],
			[a, "Invalid Configuration: FIPS and custom endpoint are not supported"],
			[a, "Invalid Configuration: Dualstack and custom endpoint are not supported"],
			[l, o],
			["https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}", o],
			[a, "FIPS and DualStack are enabled, but this partition does not support one or both"],
			["https://sts.{Region}.amazonaws.com", o],
			["https://sts-fips.{Region}.{PartitionResult#dnsSuffix}", o],
			[a, "FIPS is enabled but this partition does not support FIPS"],
			["https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}", o],
			[a, "DualStack is enabled but this partition does not support DualStack"],
			[k, o],
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
		30,
		3,
		1,
		4,
		r + 14,
		2,
		5,
		r + 14,
		3,
		25,
		6,
		4,
		24,
		7,
		5,
		r + 1,
		8,
		6,
		9,
		r + 13,
		7,
		r + 1,
		10,
		10,
		r + 1,
		11,
		11,
		r + 1,
		12,
		12,
		r + 1,
		13,
		13,
		r + 1,
		14,
		14,
		r + 1,
		15,
		15,
		r + 1,
		16,
		16,
		r + 1,
		17,
		17,
		r + 1,
		18,
		18,
		r + 1,
		19,
		19,
		r + 1,
		20,
		20,
		r + 1,
		21,
		21,
		r + 1,
		22,
		22,
		r + 1,
		23,
		23,
		r + 1,
		r + 2,
		8,
		r + 11,
		r + 12,
		4,
		28,
		26,
		9,
		27,
		r + 10,
		24,
		r + 8,
		r + 9,
		8,
		29,
		r + 7,
		9,
		r + 6,
		r + 7,
		3,
		r + 3,
		31,
		4,
		r + 4,
		r + 5
	]);
	exports.bdd = util_endpoints_1.BinaryDecisionDiagram.from(nodes, root, _data.conditions, _data.results);
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/endpoint/endpointResolver.js
var require_endpointResolver = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.defaultEndpointResolver = void 0;
	var util_endpoints_1 = (init_dist_es$2(), __toCommonJS(dist_es_exports$2));
	var util_endpoints_2 = (init_dist_es$1(), __toCommonJS(dist_es_exports$1));
	var bdd_1 = require_bdd();
	var cache = new util_endpoints_2.EndpointCache({
		size: 50,
		params: [
			"Endpoint",
			"Region",
			"UseDualStack",
			"UseFIPS",
			"UseGlobalEndpoint"
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
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/auth/httpAuthSchemeProvider.js
var require_httpAuthSchemeProvider = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthSchemeConfig = exports.resolveStsAuthConfig = exports.defaultSTSHttpAuthSchemeProvider = exports.defaultSTSHttpAuthSchemeParametersProvider = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var signature_v4_multi_region_1 = (init_dist_es$24(), __toCommonJS(dist_es_exports$24));
	var middleware_endpoint_1 = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var util_middleware_1 = (init_dist_es(), __toCommonJS(dist_es_exports));
	var endpointResolver_1 = require_endpointResolver();
	var STSClient_1 = require_STSClient();
	var createEndpointRuleSetHttpAuthSchemeParametersProvider = (defaultHttpAuthSchemeParametersProvider) => async (config, context, input) => {
		if (!input) throw new Error("Could not find `input` for `defaultEndpointRuleSetHttpAuthSchemeParametersProvider`");
		const defaultParameters = await defaultHttpAuthSchemeParametersProvider(config, context, input);
		const instructionsFn = (0, util_middleware_1.getSmithyContext)(context)?.commandInstance?.constructor?.getEndpointParameterInstructions;
		if (!instructionsFn) throw new Error(`getEndpointParameterInstructions() is not defined on '${context.commandName}'`);
		const endpointParameters = await (0, middleware_endpoint_1.resolveParams)(input, { getEndpointParameterInstructions: instructionsFn }, config);
		return Object.assign(defaultParameters, endpointParameters);
	};
	var _defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
		return {
			operation: (0, util_middleware_1.getSmithyContext)(context).operation,
			region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
				throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
			})()
		};
	};
	exports.defaultSTSHttpAuthSchemeParametersProvider = createEndpointRuleSetHttpAuthSchemeParametersProvider(_defaultSTSHttpAuthSchemeParametersProvider);
	function createAwsAuthSigv4HttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4",
			signingProperties: {
				name: "sts",
				region: authParameters.region
			},
			propertiesExtractor: (config, context) => ({ signingProperties: {
				config,
				context
			} })
		};
	}
	function createAwsAuthSigv4aHttpAuthOption(authParameters) {
		return {
			schemeId: "aws.auth#sigv4a",
			signingProperties: {
				name: "sts",
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
	var createEndpointRuleSetHttpAuthSchemeProvider = (defaultEndpointResolver, defaultHttpAuthSchemeResolver, createHttpAuthOptionFunctions) => {
		const endpointRuleSetHttpAuthSchemeProvider = (authParameters) => {
			const authSchemes = defaultEndpointResolver(authParameters).properties?.authSchemes;
			if (!authSchemes) return defaultHttpAuthSchemeResolver(authParameters);
			const options = [];
			for (const scheme of authSchemes) {
				const { name: resolvedName, properties = {}, ...rest } = scheme;
				const name = resolvedName.toLowerCase();
				if (resolvedName !== name) console.warn(`HttpAuthScheme has been normalized with lowercasing: '${resolvedName}' to '${name}'`);
				let schemeId;
				if (name === "sigv4a") {
					schemeId = "aws.auth#sigv4a";
					const sigv4Present = authSchemes.find((s) => {
						const name = s.name.toLowerCase();
						return name !== "sigv4a" && name.startsWith("sigv4");
					});
					if (signature_v4_multi_region_1.SignatureV4MultiRegion.sigv4aDependency() === "none" && sigv4Present) continue;
				} else if (name.startsWith("sigv4")) schemeId = "aws.auth#sigv4";
				else throw new Error(`Unknown HttpAuthScheme found in '@smithy.rules#endpointRuleSet': '${name}'`);
				const createOption = createHttpAuthOptionFunctions[schemeId];
				if (!createOption) throw new Error(`Could not find HttpAuthOption create function for '${schemeId}'`);
				const option = createOption(authParameters);
				option.schemeId = schemeId;
				option.signingProperties = {
					...option.signingProperties || {},
					...rest,
					...properties
				};
				options.push(option);
			}
			return options;
		};
		return endpointRuleSetHttpAuthSchemeProvider;
	};
	var _defaultSTSHttpAuthSchemeProvider = (authParameters) => {
		const options = [];
		switch (authParameters.operation) {
			case "AssumeRoleWithWebIdentity":
				options.push(createSmithyApiNoAuthHttpAuthOption(authParameters));
				options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
				break;
			default:
				options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
				options.push(createAwsAuthSigv4aHttpAuthOption(authParameters));
		}
		return options;
	};
	exports.defaultSTSHttpAuthSchemeProvider = createEndpointRuleSetHttpAuthSchemeProvider(endpointResolver_1.defaultEndpointResolver, _defaultSTSHttpAuthSchemeProvider, {
		"aws.auth#sigv4": createAwsAuthSigv4HttpAuthOption,
		"aws.auth#sigv4a": createAwsAuthSigv4aHttpAuthOption,
		"smithy.api#noAuth": createSmithyApiNoAuthHttpAuthOption
	});
	var resolveStsAuthConfig = (input) => Object.assign(input, { stsClientCtor: STSClient_1.STSClient });
	exports.resolveStsAuthConfig = resolveStsAuthConfig;
	var resolveHttpAuthSchemeConfig = (config) => {
		const config_0 = (0, exports.resolveStsAuthConfig)(config);
		const config_1 = (0, httpAuthSchemes_1.resolveAwsSdkSigV4Config)(config_0);
		const config_2 = (0, httpAuthSchemes_1.resolveAwsSdkSigV4AConfig)(config_1);
		return Object.assign(config_2, { authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? []) });
	};
	exports.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/endpoint/EndpointParameters.js
var require_EndpointParameters = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.commonParams = exports.resolveClientEndpointParameters = void 0;
	var resolveClientEndpointParameters = (options) => {
		return Object.assign(options, {
			useDualstackEndpoint: options.useDualstackEndpoint ?? false,
			useFipsEndpoint: options.useFipsEndpoint ?? false,
			useGlobalEndpoint: options.useGlobalEndpoint ?? false,
			defaultSigningName: "sts"
		});
	};
	exports.resolveClientEndpointParameters = resolveClientEndpointParameters;
	exports.commonParams = {
		UseGlobalEndpoint: {
			type: "builtInParams",
			name: "useGlobalEndpoint"
		},
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
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/models/STSServiceException.js
var require_STSServiceException = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.STSServiceException = exports.__ServiceException = void 0;
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__ServiceException", {
		enumerable: true,
		get: function() {
			return smithy_client_1.ServiceException;
		}
	});
	exports.STSServiceException = class STSServiceException extends smithy_client_1.ServiceException {
		constructor(options) {
			super(options);
			Object.setPrototypeOf(this, STSServiceException.prototype);
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/models/errors.js
var require_errors = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.IDPCommunicationErrorException = exports.InvalidIdentityTokenException = exports.IDPRejectedClaimException = exports.RegionDisabledException = exports.PackedPolicyTooLargeException = exports.MalformedPolicyDocumentException = exports.ExpiredTokenException = void 0;
	var STSServiceException_1 = require_STSServiceException();
	exports.ExpiredTokenException = class ExpiredTokenException extends STSServiceException_1.STSServiceException {
		name = "ExpiredTokenException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "ExpiredTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, ExpiredTokenException.prototype);
		}
	};
	exports.MalformedPolicyDocumentException = class MalformedPolicyDocumentException extends STSServiceException_1.STSServiceException {
		name = "MalformedPolicyDocumentException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "MalformedPolicyDocumentException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
		}
	};
	exports.PackedPolicyTooLargeException = class PackedPolicyTooLargeException extends STSServiceException_1.STSServiceException {
		name = "PackedPolicyTooLargeException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "PackedPolicyTooLargeException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
		}
	};
	exports.RegionDisabledException = class RegionDisabledException extends STSServiceException_1.STSServiceException {
		name = "RegionDisabledException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "RegionDisabledException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, RegionDisabledException.prototype);
		}
	};
	exports.IDPRejectedClaimException = class IDPRejectedClaimException extends STSServiceException_1.STSServiceException {
		name = "IDPRejectedClaimException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "IDPRejectedClaimException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
		}
	};
	exports.InvalidIdentityTokenException = class InvalidIdentityTokenException extends STSServiceException_1.STSServiceException {
		name = "InvalidIdentityTokenException";
		$fault = "client";
		constructor(opts) {
			super({
				name: "InvalidIdentityTokenException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
		}
	};
	exports.IDPCommunicationErrorException = class IDPCommunicationErrorException extends STSServiceException_1.STSServiceException {
		name = "IDPCommunicationErrorException";
		$fault = "client";
		$retryable = {};
		constructor(opts) {
			super({
				name: "IDPCommunicationErrorException",
				$fault: "client",
				...opts
			});
			Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
		}
	};
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/schemas/schemas_0.js
var require_schemas_0 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.AssumeRoleWithWebIdentity$ = exports.AssumeRole$ = exports.Tag$ = exports.ProvidedContext$ = exports.PolicyDescriptorType$ = exports.Credentials$ = exports.AssumeRoleWithWebIdentityResponse$ = exports.AssumeRoleWithWebIdentityRequest$ = exports.AssumeRoleResponse$ = exports.AssumeRoleRequest$ = exports.AssumedRoleUser$ = exports.errorTypeRegistries = exports.RegionDisabledException$ = exports.PackedPolicyTooLargeException$ = exports.MalformedPolicyDocumentException$ = exports.InvalidIdentityTokenException$ = exports.IDPRejectedClaimException$ = exports.IDPCommunicationErrorException$ = exports.ExpiredTokenException$ = exports.STSServiceException$ = void 0;
	var _A = "Arn";
	var _AKI = "AccessKeyId";
	var _AR = "AssumeRole";
	var _ARI = "AssumedRoleId";
	var _ARR = "AssumeRoleRequest";
	var _ARRs = "AssumeRoleResponse";
	var _ARU = "AssumedRoleUser";
	var _ARWWI = "AssumeRoleWithWebIdentity";
	var _ARWWIR = "AssumeRoleWithWebIdentityRequest";
	var _ARWWIRs = "AssumeRoleWithWebIdentityResponse";
	var _Au = "Audience";
	var _C = "Credentials";
	var _CA = "ContextAssertion";
	var _DS = "DurationSeconds";
	var _E = "Expiration";
	var _EI = "ExternalId";
	var _ETE = "ExpiredTokenException";
	var _IDPCEE = "IDPCommunicationErrorException";
	var _IDPRCE = "IDPRejectedClaimException";
	var _IITE = "InvalidIdentityTokenException";
	var _K = "Key";
	var _MPDE = "MalformedPolicyDocumentException";
	var _P = "Policy";
	var _PA = "PolicyArns";
	var _PAr = "ProviderArn";
	var _PC = "ProvidedContexts";
	var _PCLT = "ProvidedContextsListType";
	var _PCr = "ProvidedContext";
	var _PDT = "PolicyDescriptorType";
	var _PI = "ProviderId";
	var _PPS = "PackedPolicySize";
	var _PPTLE = "PackedPolicyTooLargeException";
	var _Pr = "Provider";
	var _RA = "RoleArn";
	var _RDE = "RegionDisabledException";
	var _RSN = "RoleSessionName";
	var _SAK = "SecretAccessKey";
	var _SFWIT = "SubjectFromWebIdentityToken";
	var _SI = "SourceIdentity";
	var _SN = "SerialNumber";
	var _ST = "SessionToken";
	var _T = "Tags";
	var _TC = "TokenCode";
	var _TTK = "TransitiveTagKeys";
	var _Ta = "Tag";
	var _V = "Value";
	var _WIT = "WebIdentityToken";
	var _a = "arn";
	var _aKST = "accessKeySecretType";
	var _aQE = "awsQueryError";
	var _c = "client";
	var _cTT = "clientTokenType";
	var _e = "error";
	var _hE = "httpError";
	var _m = "message";
	var _pDLT = "policyDescriptorListType";
	var _s = "smithy.ts.sdk.synthetic.com.amazonaws.sts";
	var _tLT = "tagListType";
	var n0 = "com.amazonaws.sts";
	var schema_1 = require_schema();
	var errors_1 = require_errors();
	var STSServiceException_1 = require_STSServiceException();
	var _s_registry = schema_1.TypeRegistry.for(_s);
	exports.STSServiceException$ = [
		-3,
		_s,
		"STSServiceException",
		0,
		[],
		[]
	];
	_s_registry.registerError(exports.STSServiceException$, STSServiceException_1.STSServiceException);
	var n0_registry = schema_1.TypeRegistry.for(n0);
	exports.ExpiredTokenException$ = [
		-3,
		n0,
		_ETE,
		{
			[_aQE]: [`ExpiredTokenException`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.ExpiredTokenException$, errors_1.ExpiredTokenException);
	exports.IDPCommunicationErrorException$ = [
		-3,
		n0,
		_IDPCEE,
		{
			[_aQE]: [`IDPCommunicationError`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.IDPCommunicationErrorException$, errors_1.IDPCommunicationErrorException);
	exports.IDPRejectedClaimException$ = [
		-3,
		n0,
		_IDPRCE,
		{
			[_aQE]: [`IDPRejectedClaim`, 403],
			[_e]: _c,
			[_hE]: 403
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.IDPRejectedClaimException$, errors_1.IDPRejectedClaimException);
	exports.InvalidIdentityTokenException$ = [
		-3,
		n0,
		_IITE,
		{
			[_aQE]: [`InvalidIdentityToken`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.InvalidIdentityTokenException$, errors_1.InvalidIdentityTokenException);
	exports.MalformedPolicyDocumentException$ = [
		-3,
		n0,
		_MPDE,
		{
			[_aQE]: [`MalformedPolicyDocument`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.MalformedPolicyDocumentException$, errors_1.MalformedPolicyDocumentException);
	exports.PackedPolicyTooLargeException$ = [
		-3,
		n0,
		_PPTLE,
		{
			[_aQE]: [`PackedPolicyTooLarge`, 400],
			[_e]: _c,
			[_hE]: 400
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.PackedPolicyTooLargeException$, errors_1.PackedPolicyTooLargeException);
	exports.RegionDisabledException$ = [
		-3,
		n0,
		_RDE,
		{
			[_aQE]: [`RegionDisabledException`, 403],
			[_e]: _c,
			[_hE]: 403
		},
		[_m],
		[0]
	];
	n0_registry.registerError(exports.RegionDisabledException$, errors_1.RegionDisabledException);
	exports.errorTypeRegistries = [_s_registry, n0_registry];
	var accessKeySecretType = [
		0,
		n0,
		_aKST,
		8,
		0
	];
	var clientTokenType = [
		0,
		n0,
		_cTT,
		8,
		0
	];
	exports.AssumedRoleUser$ = [
		3,
		n0,
		_ARU,
		0,
		[_ARI, _A],
		[0, 0],
		2
	];
	exports.AssumeRoleRequest$ = [
		3,
		n0,
		_ARR,
		0,
		[
			_RA,
			_RSN,
			_PA,
			_P,
			_DS,
			_T,
			_TTK,
			_EI,
			_SN,
			_TC,
			_SI,
			_PC
		],
		[
			0,
			0,
			() => policyDescriptorListType,
			0,
			1,
			() => tagListType,
			64,
			0,
			0,
			0,
			0,
			() => ProvidedContextsListType
		],
		2
	];
	exports.AssumeRoleResponse$ = [
		3,
		n0,
		_ARRs,
		0,
		[
			_C,
			_ARU,
			_PPS,
			_SI
		],
		[
			[() => exports.Credentials$, 0],
			() => exports.AssumedRoleUser$,
			1,
			0
		]
	];
	exports.AssumeRoleWithWebIdentityRequest$ = [
		3,
		n0,
		_ARWWIR,
		0,
		[
			_RA,
			_RSN,
			_WIT,
			_PI,
			_PA,
			_P,
			_DS
		],
		[
			0,
			0,
			[() => clientTokenType, 0],
			0,
			() => policyDescriptorListType,
			0,
			1
		],
		3
	];
	exports.AssumeRoleWithWebIdentityResponse$ = [
		3,
		n0,
		_ARWWIRs,
		0,
		[
			_C,
			_SFWIT,
			_ARU,
			_PPS,
			_Pr,
			_Au,
			_SI
		],
		[
			[() => exports.Credentials$, 0],
			0,
			() => exports.AssumedRoleUser$,
			1,
			0,
			0,
			0
		]
	];
	exports.Credentials$ = [
		3,
		n0,
		_C,
		0,
		[
			_AKI,
			_SAK,
			_ST,
			_E
		],
		[
			0,
			[() => accessKeySecretType, 0],
			0,
			4
		],
		4
	];
	exports.PolicyDescriptorType$ = [
		3,
		n0,
		_PDT,
		0,
		[_a],
		[0]
	];
	exports.ProvidedContext$ = [
		3,
		n0,
		_PCr,
		0,
		[_PAr, _CA],
		[0, 0]
	];
	exports.Tag$ = [
		3,
		n0,
		_Ta,
		0,
		[_K, _V],
		[0, 0],
		2
	];
	var policyDescriptorListType = [
		1,
		n0,
		_pDLT,
		0,
		() => exports.PolicyDescriptorType$
	];
	var ProvidedContextsListType = [
		1,
		n0,
		_PCLT,
		0,
		() => exports.ProvidedContext$
	];
	var tagListType = [
		1,
		n0,
		_tLT,
		0,
		() => exports.Tag$
	];
	exports.AssumeRole$ = [
		9,
		n0,
		_AR,
		0,
		() => exports.AssumeRoleRequest$,
		() => exports.AssumeRoleResponse$
	];
	exports.AssumeRoleWithWebIdentity$ = [
		9,
		n0,
		_ARWWI,
		0,
		() => exports.AssumeRoleWithWebIdentityRequest$,
		() => exports.AssumeRoleWithWebIdentityResponse$
	];
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/runtimeConfig.shared.js
var require_runtimeConfig_shared = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var protocols_1 = require_protocols();
	var signature_v4_multi_region_1 = (init_dist_es$24(), __toCommonJS(dist_es_exports$24));
	var core_1 = require_dist_cjs();
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var url_parser_1 = (init_dist_es$4(), __toCommonJS(dist_es_exports$4));
	var util_base64_1 = (init_dist_es$5(), __toCommonJS(dist_es_exports$5));
	var util_utf8_1 = (init_dist_es$6(), __toCommonJS(dist_es_exports$6));
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
	var endpointResolver_1 = require_endpointResolver();
	var schemas_0_1 = require_schemas_0();
	var getRuntimeConfig = (config) => {
		return {
			apiVersion: "2011-06-15",
			base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
			base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
			disableHostPrefix: config?.disableHostPrefix ?? false,
			endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
			extensions: config?.extensions ?? [],
			httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeProvider,
			httpAuthSchemes: config?.httpAuthSchemes ?? [
				{
					schemeId: "aws.auth#sigv4",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
					signer: new httpAuthSchemes_1.AwsSdkSigV4Signer()
				},
				{
					schemeId: "aws.auth#sigv4a",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
					signer: new httpAuthSchemes_1.AwsSdkSigV4ASigner()
				},
				{
					schemeId: "smithy.api#noAuth",
					identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
					signer: new core_1.NoAuthSigner()
				}
			],
			logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
			protocol: config?.protocol ?? protocols_1.AwsQueryProtocol,
			protocolSettings: config?.protocolSettings ?? {
				defaultNamespace: "com.amazonaws.sts",
				errorTypeRegistries: schemas_0_1.errorTypeRegistries,
				xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
				version: "2011-06-15",
				serviceTarget: "AWSSecurityTokenServiceV20110615"
			},
			serviceId: config?.serviceId ?? "STS",
			signerConstructor: config?.signerConstructor ?? signature_v4_multi_region_1.SignatureV4MultiRegion,
			urlParser: config?.urlParser ?? url_parser_1.parseUrl,
			utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
			utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/runtimeConfig.js
var require_runtimeConfig = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getRuntimeConfig = void 0;
	var package_json_1 = __require("tslib").__importDefault((init_package(), __toCommonJS(package_exports).default));
	var client_1 = require_client();
	var httpAuthSchemes_1 = require_httpAuthSchemes();
	var util_user_agent_node_1 = (init_dist_es$7(), __toCommonJS(dist_es_exports$7));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core_1 = require_dist_cjs();
	var hash_node_1 = (init_dist_es$9(), __toCommonJS(dist_es_exports$9));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var node_config_provider_1 = (init_dist_es$11(), __toCommonJS(dist_es_exports$11));
	var node_http_handler_1 = (init_dist_es$12(), __toCommonJS(dist_es_exports$12));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var util_body_length_node_1 = (init_dist_es$13(), __toCommonJS(dist_es_exports$13));
	var util_defaults_mode_node_1 = (init_dist_es$14(), __toCommonJS(dist_es_exports$14));
	var util_retry_1 = (init_dist_es$15(), __toCommonJS(dist_es_exports$15));
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
			httpAuthSchemes: config?.httpAuthSchemes ?? [
				{
					schemeId: "aws.auth#sigv4",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
					signer: new httpAuthSchemes_1.AwsSdkSigV4Signer()
				},
				{
					schemeId: "aws.auth#sigv4a",
					identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4a"),
					signer: new httpAuthSchemes_1.AwsSdkSigV4ASigner()
				},
				{
					schemeId: "smithy.api#noAuth",
					identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
					signer: new core_1.NoAuthSigner()
				}
			],
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
			sigv4aSigningRegionSet: config?.sigv4aSigningRegionSet ?? (0, node_config_provider_1.loadConfig)(httpAuthSchemes_1.NODE_SIGV4A_CONFIG_OPTIONS, loaderConfig),
			streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
			useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
			userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
		};
	};
	exports.getRuntimeConfig = getRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/auth/httpAuthExtensionConfiguration.js
var require_httpAuthExtensionConfiguration = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveHttpAuthRuntimeConfig = exports.getHttpAuthExtensionConfiguration = void 0;
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
	exports.getHttpAuthExtensionConfiguration = getHttpAuthExtensionConfiguration;
	var resolveHttpAuthRuntimeConfig = (config) => {
		return {
			httpAuthSchemes: config.httpAuthSchemes(),
			httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
			credentials: config.credentials()
		};
	};
	exports.resolveHttpAuthRuntimeConfig = resolveHttpAuthRuntimeConfig;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/runtimeExtensions.js
var require_runtimeExtensions = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.resolveRuntimeExtensions = void 0;
	var region_config_resolver_1 = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var protocol_http_1 = (init_dist_es$23(), __toCommonJS(dist_es_exports$23));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var httpAuthExtensionConfiguration_1 = require_httpAuthExtensionConfiguration();
	var resolveRuntimeExtensions = (runtimeConfig, extensions) => {
		const extensionConfiguration = Object.assign((0, region_config_resolver_1.getAwsRegionExtensionConfiguration)(runtimeConfig), (0, smithy_client_1.getDefaultExtensionConfiguration)(runtimeConfig), (0, protocol_http_1.getHttpHandlerExtensionConfiguration)(runtimeConfig), (0, httpAuthExtensionConfiguration_1.getHttpAuthExtensionConfiguration)(runtimeConfig));
		extensions.forEach((extension) => extension.configure(extensionConfiguration));
		return Object.assign(runtimeConfig, (0, region_config_resolver_1.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, smithy_client_1.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, protocol_http_1.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0, httpAuthExtensionConfiguration_1.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
	};
	exports.resolveRuntimeExtensions = resolveRuntimeExtensions;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/STSClient.js
var require_STSClient = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.STSClient = exports.__Client = void 0;
	var middleware_host_header_1 = (init_dist_es$16(), __toCommonJS(dist_es_exports$16));
	var middleware_logger_1 = (init_dist_es$17(), __toCommonJS(dist_es_exports$17));
	var middleware_recursion_detection_1 = (init_dist_es$18(), __toCommonJS(dist_es_exports$18));
	var middleware_user_agent_1 = (init_dist_es$19(), __toCommonJS(dist_es_exports$19));
	var config_resolver_1 = (init_dist_es$8(), __toCommonJS(dist_es_exports$8));
	var core_1 = require_dist_cjs();
	var schema_1 = require_schema();
	var middleware_content_length_1 = (init_dist_es$20(), __toCommonJS(dist_es_exports$20));
	var middleware_endpoint_1 = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var middleware_retry_1 = (init_dist_es$10(), __toCommonJS(dist_es_exports$10));
	var smithy_client_1 = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	Object.defineProperty(exports, "__Client", {
		enumerable: true,
		get: function() {
			return smithy_client_1.Client;
		}
	});
	var httpAuthSchemeProvider_1 = require_httpAuthSchemeProvider();
	var EndpointParameters_1 = require_EndpointParameters();
	var runtimeConfig_1 = require_runtimeConfig();
	var runtimeExtensions_1 = require_runtimeExtensions();
	var STSClient = class extends smithy_client_1.Client {
		config;
		constructor(...[configuration]) {
			const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration || {});
			super(_config_0);
			this.initConfig = _config_0;
			const _config_1 = (0, EndpointParameters_1.resolveClientEndpointParameters)(_config_0);
			const _config_2 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_1);
			const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
			const _config_4 = (0, config_resolver_1.resolveRegionConfig)(_config_3);
			const _config_5 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_4);
			const _config_6 = (0, middleware_endpoint_1.resolveEndpointConfig)(_config_5);
			const _config_7 = (0, httpAuthSchemeProvider_1.resolveHttpAuthSchemeConfig)(_config_6);
			const _config_8 = (0, runtimeExtensions_1.resolveRuntimeExtensions)(_config_7, configuration?.extensions || []);
			this.config = _config_8;
			this.middlewareStack.use((0, schema_1.getSchemaSerdePlugin)(this.config));
			this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
			this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
			this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
			this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
			this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
			this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
			this.middlewareStack.use((0, core_1.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
				httpAuthSchemeParametersProvider: httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeParametersProvider,
				identityProviderConfigProvider: async (config) => new core_1.DefaultIdentityProviderConfig({
					"aws.auth#sigv4": config.credentials,
					"aws.auth#sigv4a": config.credentials
				})
			}));
			this.middlewareStack.use((0, core_1.getHttpSigningPlugin)(this.config));
		}
		destroy() {
			super.destroy();
		}
	};
	exports.STSClient = STSClient;
}));
//#endregion
//#region node_modules/@aws-sdk/nested-clients/dist-cjs/submodules/sts/index.js
var require_sts = /* @__PURE__ */ __commonJSMin(((exports) => {
	var STSClient = require_STSClient();
	var smithyClient = (init_dist_es$3(), __toCommonJS(dist_es_exports$3));
	var middlewareEndpoint = (init_dist_es$21(), __toCommonJS(dist_es_exports$21));
	var EndpointParameters = require_EndpointParameters();
	var schemas_0 = require_schemas_0();
	var errors = require_errors();
	var client = require_client();
	var regionConfigResolver = (init_dist_es$22(), __toCommonJS(dist_es_exports$22));
	var STSServiceException = require_STSServiceException();
	var AssumeRoleCommand = class extends smithyClient.Command.classBuilder().ep(EndpointParameters.commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").sc(schemas_0.AssumeRole$).build() {};
	var AssumeRoleWithWebIdentityCommand = class extends smithyClient.Command.classBuilder().ep(EndpointParameters.commonParams).m(function(Command, cs, config, o) {
		return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
	}).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").sc(schemas_0.AssumeRoleWithWebIdentity$).build() {};
	var commands = {
		AssumeRoleCommand,
		AssumeRoleWithWebIdentityCommand
	};
	var STS = class extends STSClient.STSClient {};
	smithyClient.createAggregatedClient(commands, STS);
	var getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
		if (typeof assumedRoleUser?.Arn === "string") {
			const arnComponents = assumedRoleUser.Arn.split(":");
			if (arnComponents.length > 4 && arnComponents[4] !== "") return arnComponents[4];
		}
	};
	var resolveRegion = async (_region, _parentRegion, credentialProviderLogger, loaderConfig = {}) => {
		const region = typeof _region === "function" ? await _region() : _region;
		const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
		let stsDefaultRegion = "";
		const resolvedRegion = region ?? parentRegion ?? (stsDefaultRegion = await regionConfigResolver.stsRegionDefaultResolver(loaderConfig)());
		credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (credential provider clientConfig)`, `${parentRegion} (contextual client)`, `${stsDefaultRegion} (STS default: AWS_REGION, profile region, or us-east-1)`);
		return resolvedRegion;
	};
	var getDefaultRoleAssumer$1 = (stsOptions, STSClient) => {
		let stsClient;
		let closureSourceCreds;
		return async (sourceCreds, params) => {
			closureSourceCreds = sourceCreds;
			if (!stsClient) {
				const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
				const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
					logger,
					profile
				});
				const isCompatibleRequestHandler = !isH2(requestHandler);
				stsClient = new STSClient({
					...stsOptions,
					userAgentAppId,
					profile,
					credentialDefaultProvider: () => async () => closureSourceCreds,
					region: resolvedRegion,
					requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
					logger
				});
			}
			const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleCommand(params));
			if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
			const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
			const credentials = {
				accessKeyId: Credentials.AccessKeyId,
				secretAccessKey: Credentials.SecretAccessKey,
				sessionToken: Credentials.SessionToken,
				expiration: Credentials.Expiration,
				...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
				...accountId && { accountId }
			};
			client.setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
			return credentials;
		};
	};
	var getDefaultRoleAssumerWithWebIdentity$1 = (stsOptions, STSClient) => {
		let stsClient;
		return async (params) => {
			if (!stsClient) {
				const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
				const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
					logger,
					profile
				});
				const isCompatibleRequestHandler = !isH2(requestHandler);
				stsClient = new STSClient({
					...stsOptions,
					userAgentAppId,
					profile,
					region: resolvedRegion,
					requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
					logger
				});
			}
			const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
			if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
			const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
			const credentials = {
				accessKeyId: Credentials.AccessKeyId,
				secretAccessKey: Credentials.SecretAccessKey,
				sessionToken: Credentials.SessionToken,
				expiration: Credentials.Expiration,
				...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
				...accountId && { accountId }
			};
			if (accountId) client.setCredentialFeature(credentials, "RESOLVED_ACCOUNT_ID", "T");
			client.setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
			return credentials;
		};
	};
	var isH2 = (requestHandler) => {
		return requestHandler?.metadata?.handlerProtocol === "h2";
	};
	var getCustomizableStsClientCtor = (baseCtor, customizations) => {
		if (!customizations) return baseCtor;
		else return class CustomizableSTSClient extends baseCtor {
			constructor(config) {
				super(config);
				for (const customization of customizations) this.middlewareStack.use(customization);
			}
		};
	};
	var getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumer$1(stsOptions, getCustomizableStsClientCtor(STSClient.STSClient, stsPlugins));
	var getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity$1(stsOptions, getCustomizableStsClientCtor(STSClient.STSClient, stsPlugins));
	var decorateDefaultCredentialProvider = (provider) => (input) => provider({
		roleAssumer: getDefaultRoleAssumer(input),
		roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input),
		...input
	});
	exports.$Command = smithyClient.Command;
	exports.STSServiceException = STSServiceException.STSServiceException;
	exports.AssumeRoleCommand = AssumeRoleCommand;
	exports.AssumeRoleWithWebIdentityCommand = AssumeRoleWithWebIdentityCommand;
	exports.STS = STS;
	exports.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
	exports.getDefaultRoleAssumer = getDefaultRoleAssumer;
	exports.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
	Object.prototype.hasOwnProperty.call(STSClient, "__proto__") && !Object.prototype.hasOwnProperty.call(exports, "__proto__") && Object.defineProperty(exports, "__proto__", {
		enumerable: true,
		value: STSClient["__proto__"]
	});
	Object.keys(STSClient).forEach(function(k) {
		if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports, k)) exports[k] = STSClient[k];
	});
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
export { require_sso_oidc as n, require_signin as r, require_sts as t };
