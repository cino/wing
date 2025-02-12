# [atan.w](../../../../../../examples/tests/sdk_tests/math/atan.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ math_Util }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-1) == -0.7853981633974483")})(((await math_Util.atan((-1))) === (-0.7853981633974483)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-0) == -0")})(((await math_Util.atan((-0))) === (-0)))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(0) == 0")})(((await math_Util.atan(0)) === 0))};
      {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(1) == 0.7853981633974483")})(((await math_Util.atan(1)) === 0.7853981633974483))};
    }
  }
  return $Closure1;
}

```

## main.tf.json
```json
{
  "//": {
    "metadata": {
      "backend": "local",
      "stackName": "root",
      "version": "0.15.2"
    },
    "outputs": {
      "root": {
        "Default": {
          "cloud.TestRunner": {
            "TestFunctionArns": "WING_TEST_RUNNER_FUNCTION_ARNS"
          }
        }
      }
    }
  },
  "output": {
    "WING_TEST_RUNNER_FUNCTION_ARNS": {
      "value": "[[\"root/Default/Default/test:inflight arc tangent\",\"${aws_lambda_function.root_testinflightarctangent_Handler_4E1B713C.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testinflightarctangent_Handler_IamRole_03EE7201": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/IamRole",
            "uniqueId": "root_testinflightarctangent_Handler_IamRole_03EE7201"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testinflightarctangent_Handler_IamRolePolicy_C83EAD44": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/IamRolePolicy",
            "uniqueId": "root_testinflightarctangent_Handler_IamRolePolicy_C83EAD44"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Effect\":\"Allow\",\"Action\":\"none:null\",\"Resource\":\"*\"}]}",
        "role": "${aws_iam_role.root_testinflightarctangent_Handler_IamRole_03EE7201.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testinflightarctangent_Handler_IamRolePolicyAttachment_61C34913": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testinflightarctangent_Handler_IamRolePolicyAttachment_61C34913"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testinflightarctangent_Handler_IamRole_03EE7201.name}"
      }
    },
    "aws_lambda_function": {
      "root_testinflightarctangent_Handler_4E1B713C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/Default",
            "uniqueId": "root_testinflightarctangent_Handler_4E1B713C"
          }
        },
        "environment": {
          "variables": {
            "WING_FUNCTION_NAME": "Handler-c8657687",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8657687",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testinflightarctangent_Handler_IamRole_03EE7201.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testinflightarctangent_Handler_S3Object_BDBCA91E.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      }
    },
    "aws_s3_bucket": {
      "root_Code_02F3C603": {
        "//": {
          "metadata": {
            "path": "root/Default/Code",
            "uniqueId": "root_Code_02F3C603"
          }
        },
        "bucket_prefix": "code-c84a50b1-"
      }
    },
    "aws_s3_object": {
      "root_testinflightarctangent_Handler_S3Object_BDBCA91E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:inflight arc tangent/Handler/S3Object",
            "uniqueId": "root_testinflightarctangent_Handler_S3Object_BDBCA91E"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    }
  }
}
```

## preflight.js
```js
const $stdlib = require('@winglang/sdk');
const $outdir = process.env.WING_SYNTH_DIR ?? ".";
const std = $stdlib.std;
const $wing_is_test = process.env.WING_IS_TEST === "true";
const $AppBase = $stdlib.core.App.for(process.env.WING_TARGET);
const math = require('@winglang/sdk').math;
class $Root extends $stdlib.std.Resource {
  constructor(scope, id) {
    super(scope, id);
    class $Closure1 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure1.js";
        const math_UtilClient = math.Util._toInflightType(context);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            math_Util: ${math_UtilClient.text},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure1Client = ${$Closure1._toInflightType(this).text};
            const client = new $Closure1Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
        }
        if (ops.includes("handle")) {
        }
        super._registerBind(host, ops);
      }
    }
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-1) == -0.7853981633974483")})(((math.Util.atan((-1))) === (-0.7853981633974483)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(-0) == -0")})(((math.Util.atan((-0))) === (-0)))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(0) == 0")})(((math.Util.atan(0)) === 0))};
    {((cond) => {if (!cond) throw new Error("assertion failed: math.atan(1) == 0.7853981633974483")})(((math.Util.atan(1)) === 0.7853981633974483))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:inflight arc tangent",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "atan", plugins: $plugins, isTestEnvironment: $wing_is_test });
    if ($wing_is_test) {
      new $Root(this, "env0");
      const $test_runner = this.testRunner;
      const $tests = $test_runner.findTests();
      for (let $i = 1; $i < $tests.length; $i++) {
        new $Root(this, "env" + $i);
      }
    } else {
      new $Root(this, "Default");
    }
  }
}
new $App().synth();

```

