# [capture_resource_and_data.w](../../../../../examples/tests/valid/capture_resource_and_data.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ data, res, queue }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: data.size == 3")})((data.size === 3))};
      (await res.put("file.txt","world"));
      {((cond) => {if (!cond) throw new Error("assertion failed: res.get(\"file.txt\") == \"world\"")})(((await res.get("file.txt")) === "world"))};
      (await queue.push("spirulina"));
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
      "value": "[[\"root/Default/Default/test:resource and data\",\"${aws_lambda_function.root_testresourceanddata_Handler_5C5A99FB.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testresourceanddata_Handler_IamRole_4C2C3DAA": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/IamRole",
            "uniqueId": "root_testresourceanddata_Handler_IamRole_4C2C3DAA"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testresourceanddata_Handler_IamRolePolicy_6768C3B6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/IamRolePolicy",
            "uniqueId": "root_testresourceanddata_Handler_IamRolePolicy_6768C3B6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"},{\"Action\":[\"sqs:SendMessage\"],\"Resource\":[\"${aws_sqs_queue.root_cloudQueue_E3597F7A.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testresourceanddata_Handler_IamRole_4C2C3DAA.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testresourceanddata_Handler_IamRolePolicyAttachment_B4EB837E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testresourceanddata_Handler_IamRolePolicyAttachment_B4EB837E"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testresourceanddata_Handler_IamRole_4C2C3DAA.name}"
      }
    },
    "aws_lambda_function": {
      "root_testresourceanddata_Handler_5C5A99FB": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/Default",
            "uniqueId": "root_testresourceanddata_Handler_5C5A99FB"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "QUEUE_URL_31e95cbd": "${aws_sqs_queue.root_cloudQueue_E3597F7A.url}",
            "WING_FUNCTION_NAME": "Handler-c8872ad1",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8872ad1",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testresourceanddata_Handler_IamRole_4C2C3DAA.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testresourceanddata_Handler_S3Object_EE48D4E2.key}",
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
      },
      "root_cloudBucket_4F3C4F53": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Default",
            "uniqueId": "root_cloudBucket_4F3C4F53"
          }
        },
        "bucket_prefix": "cloud-bucket-c87175e7-",
        "force_destroy": false
      }
    },
    "aws_s3_bucket_public_access_block": {
      "root_cloudBucket_PublicAccessBlock_319C1C2E": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/PublicAccessBlock",
            "uniqueId": "root_cloudBucket_PublicAccessBlock_319C1C2E"
          }
        },
        "block_public_acls": true,
        "block_public_policy": true,
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "ignore_public_acls": true,
        "restrict_public_buckets": true
      }
    },
    "aws_s3_bucket_server_side_encryption_configuration": {
      "root_cloudBucket_Encryption_8ED0CD9C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Bucket/Encryption",
            "uniqueId": "root_cloudBucket_Encryption_8ED0CD9C"
          }
        },
        "bucket": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
        "rule": [
          {
            "apply_server_side_encryption_by_default": {
              "sse_algorithm": "AES256"
            }
          }
        ]
      }
    },
    "aws_s3_object": {
      "root_testresourceanddata_Handler_S3Object_EE48D4E2": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:resource and data/Handler/S3Object",
            "uniqueId": "root_testresourceanddata_Handler_S3Object_EE48D4E2"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      }
    },
    "aws_sqs_queue": {
      "root_cloudQueue_E3597F7A": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Queue/Default",
            "uniqueId": "root_cloudQueue_E3597F7A"
          }
        },
        "name": "cloud-Queue-c86e03d8"
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
const cloud = require('@winglang/sdk').cloud;
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
        const data_client = context._lift(data);
        const res_client = context._lift(res);
        const queue_client = context._lift(queue);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            data: ${data_client},
            res: ${res_client},
            queue: ${queue_client},
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
          $Closure1._registerBindObject(data, host, []);
          $Closure1._registerBindObject(queue, host, []);
          $Closure1._registerBindObject(res, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(data, host, ["size"]);
          $Closure1._registerBindObject(queue, host, ["push"]);
          $Closure1._registerBindObject(res, host, ["get", "put"]);
        }
        super._registerBind(host, ops);
      }
    }
    const data = Object.freeze(new Set([1, 2, 3]));
    const res = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const queue = this.node.root.newAbstract("@winglang/sdk.cloud.Queue",this,"cloud.Queue");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:resource and data",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "capture_resource_and_data", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

