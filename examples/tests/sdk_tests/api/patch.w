bring cloud;
bring http;

// https://github.com/winglang/wing/issues/3049
let http_PATCH = http.HttpMethod.PATCH;
let api_PATCH = cloud.HttpMethod.PATCH;

let api = new cloud.Api();

let body = Json {"cat": "Tion"};
let _id = "12345";

api.patch("/path/{id}", inflight (req: cloud.ApiRequest): cloud.ApiResponse => {
  assert(req.method == api_PATCH);

  assert(req.vars?.get("id") == _id);
  assert(req.path == "/path/"+ _id);
  assert(req.body == Json.stringify(body));
  assert(req.headers?.get("content-type") == "application/json");

  return cloud.ApiResponse {
    status: 200,
    body: req.vars?.get("id")
  };
});


test "http.patch and http.fetch can preform a call to an api" {
  let url = "${api.url}/path/${_id}";
  let response: http.Response = http.patch(url, http.RequestOptions { headers: { "content-type" => "application/json" }, body: Json.stringify(body)});
  let fetchResponse: http.Response = http.patch(url, http.RequestOptions {method: http_PATCH, headers: { "content-type" => "application/json" }, body: Json.stringify(body)});

  assert(response.body == _id);
  assert(response.status == 200);
  assert(response.url == url);

  assert(fetchResponse.body == _id);
  assert(fetchResponse.status == 200);
  assert(fetchResponse.url == url);

}