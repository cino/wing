import { Code, InflightClient } from "../core";

/**
 * The cache mode of the request.
 * It controls how a request will interact with the system's HTTP cache.
 */
export enum RequestCache {
  /**
   * The runtime environment looks for a matching request in its HTTP cache.
   * * If there is a match and it is fresh, it will be returned from the cache.
   * * If there is a match but it is stale, the runtime environment will make a conditional request to the remote server.
   * * If the server indicates that the resource has not changed, it will be returned from the cache.
   * * Otherwise the resource will be downloaded from the server and the cache will be updated.
   * * If there is no match, the runtime environment will make a normal request, and will update the cache with the downloaded resource.
   */
  DEFAULT = "default",
  /**
   * The runtime environment fetches the resource from the remote server without first looking in the cache,
   * and will not update the cache with the downloaded resource.
   */
  NO_STORE = "no-store",
  /**
   * The runtime environment fetches the resource from the remote server without first looking in the cache,
   * but then will update the cache with the downloaded resource.
   */
  RELOAD = "reload",
  /**
   * The runtime environment looks for a matching request in its HTTP cache.
   * * If there is a match, fresh or stale, the runtime environment will make a conditional request to the remote server.
   * * If the server indicates that the resource has not changed, it will be returned from the cache. Otherwise the resource will be downloaded from the server and the cache will be updated.
   * * If there is no match, the runtime environment will make a normal request, and will update the cache with the downloaded resource.
   */
  NO_CACHE = "no-cache",
  /**
   * The runtime environment looks for a matching request in its HTTP cache.
   * * If there is a match, fresh or stale, it will be returned from the cache.
   * * If there is no match, the runtime environment will make a normal request, and will update the cache with the downloaded resource.
   */
  FORCE_CACHE = "force-cache",
}

/**
 * The redirect read-only property that contains the mode for how redirects are handled.
 */
export enum RequestRedirect {
  /**
   * Follow all redirects incurred when fetching a resource.
   */
  FOLLOW = "follow",
  /**
   * Return a network error when a request is met with a redirect.
   */
  ERROR = "error",
}

/**
 * The request's method
 */
export enum HttpMethod {
  /**
   * GET
   */
  GET = "GET",
  /**
   * PUT
   */
  PUT = "PUT",
  /**
   * DELETE
   */
  DELETE = "DELETE",
  /**
   * PATCH
   */
  PATCH = "PATCH",
  /**
   * POST
   */
  POST = "POST",
  /**
   * OPTIONS
   */
  OPTIONS = "OPTIONS",
  /**
   * HEAD
   */
  HEAD = "HEAD",
}

/**
 * An object containing any custom settings that you want to apply to the request.
 */
export interface RequestOptions {
  /**
   * The request method, e.g., GET, POST. The default is GET.
   * @default GET
   */
  readonly method?: HttpMethod;
  /**
   * Any headers you want to add to your request.
   */
  readonly headers?: Record<string, string>;
  /**
   * Any body that you want to add to your request.
   * Note that a request using the GET or HEAD method cannot have a body.
   */
  readonly body?: string;
  /**
   * The cache mode you want to use for the request.
   */
  readonly cache?: RequestCache;
  /**
   * he redirect mode to use: follow, error. The default is follow.
   * @default follow
   */
  readonly redirect?: RequestRedirect;
  /**
   * A string specifying "no-referrer", client, or a URL. The default is "about:client".
   * @default  about:client
   */
  readonly referrer?: string;
}
/**
 * Represents the response to a request.
 */
export interface Response {
  /**
   * The status code of the response. (This will be 200 for a success).
   */
  readonly status: number;
  /**
   * The URL of the response.
   */
  readonly url: string;
  /**
   * A boolean indicating whether the response was successful (status in the range 200 – 299) or not.
   */
  readonly ok: boolean;
  /**
   * The map of header information associated with the response.
   */
  readonly headers: Record<string, string>;
  /**
   * A string represents the body contents.
   */
  readonly body?: string;
}

/**
 * default options to attach to any request
 */
const defaultOptions: RequestOptions = {
  method: HttpMethod.GET,
  headers: {},
  cache: RequestCache.DEFAULT,
  redirect: RequestRedirect.FOLLOW,
};

/**
 * the Http class is used for calling different HTTP methods and requesting and sending information online,
 *  as well as testing public accessible resources
 * @inflight
 */
export class Util {
  /**
   * @internal
   */
  public static _toInflightType(): Code {
    return InflightClient.forType(__filename, this.name);
  }
  /**
   * Sends an HTTP request to a URL, returning a fulfilled or failed response.
   * @throws Only throws if there is a networking error
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async fetch(url: string, options?: RequestOptions): Promise<Response> {
    const res = await fetch(url, { ...defaultOptions, ...options });
    return this._formatResponse(res);
  }
  /**
   * Sends a GET request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async get(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethod.GET,
    });
  }
  /**
   * Sends a POST request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async post(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethod.POST,
    });
  }
  /**
   * Sends a PUT request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async put(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethod.PUT,
    });
  }
  /**
   * Sends a PATCH request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async patch(url: string, options?: RequestOptions): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethod.PATCH,
    });
  }

  /**
   * Sends a DELETE request.
   * @param url
   * @param options
   * @inflight
   * @returns the formatted response of the call
   */
  static async delete(
    url: string,
    options?: RequestOptions
  ): Promise<Response> {
    return this.fetch(url, {
      ...defaultOptions,
      ...options,
      method: HttpMethod.DELETE,
    });
  }

  private static async _formatResponse(
    response: globalThis.Response
  ): Promise<Response> {
    // convert Headers object into a plain JS object
    const headers: Record<string, string> = {};
    response.headers?.forEach((val: string, key: string) => {
      headers[key] = val;
    });

    return {
      status: response.status,
      url: response.url,
      ok: response.ok,
      headers: headers,
      body: await response.text(),
    };
  }
}
