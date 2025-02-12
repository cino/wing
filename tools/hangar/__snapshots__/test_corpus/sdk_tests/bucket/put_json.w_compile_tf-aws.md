# [put_json.w](../../../../../../examples/tests/sdk_tests/bucket/put_json.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ b }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      const jsonObj1 = Object.freeze({"test":"test1"});
      const jsonObj2 = Object.freeze({"test":"test2"});
      (await b.putJson("test1.txt",jsonObj1));
      (await b.putJson("test2.txt",jsonObj2));
      const testJson1 = (await b.getJson("test1.txt"));
      const testJson2 = (await b.getJson("test2.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: testJson1.get(\"test\") == jsonObj1.get(\"test\")")})(((testJson1)["test"] === (jsonObj1)["test"]))};
      {((cond) => {if (!cond) throw new Error("assertion failed: testJson2.get(\"test\") == jsonObj2.get(\"test\")")})(((testJson2)["test"] === (jsonObj2)["test"]))};
      const jsonObj3 = Object.freeze({"test":"test3"});
      (await b.putJson("test3.txt",jsonObj3));
      const testJson3 = (await b.getJson("test3.txt"));
      {((cond) => {if (!cond) throw new Error("assertion failed: testJson3.get(\"test\") == jsonObj3.get(\"test\")")})(((testJson3)["test"] === (jsonObj3)["test"]))};
      (await b.delete("test1.txt"));
      const files = (await b.list());
      {((cond) => {if (!cond) throw new Error("assertion failed: files.contains(\"test1.txt\") == false")})((files.includes("test1.txt") === false))};
      {((cond) => {if (!cond) throw new Error("assertion failed: files.contains(\"test2.txt\") == true")})((files.includes("test2.txt") === true))};
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
      "value": "[[\"root/Default/Default/test:putJson\",\"${aws_lambda_function.root_testputJson_Handler_3A06E4A1.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_iam_role": {
      "root_testputJson_Handler_IamRole_54055E84": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/IamRole",
            "uniqueId": "root_testputJson_Handler_IamRole_54055E84"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_testputJson_Handler_IamRolePolicy_CBA4EBC6": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/IamRolePolicy",
            "uniqueId": "root_testputJson_Handler_IamRolePolicy_CBA4EBC6"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"s3:List*\",\"s3:PutObject*\",\"s3:Abort*\",\"s3:GetObject*\",\"s3:GetBucket*\",\"s3:DeleteObject*\",\"s3:DeleteObjectVersion*\",\"s3:PutLifecycleConfiguration*\"],\"Resource\":[\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}\",\"${aws_s3_bucket.root_cloudBucket_4F3C4F53.arn}/*\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testputJson_Handler_IamRole_54055E84.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_testputJson_Handler_IamRolePolicyAttachment_159906E5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testputJson_Handler_IamRolePolicyAttachment_159906E5"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testputJson_Handler_IamRole_54055E84.name}"
      }
    },
    "aws_lambda_function": {
      "root_testputJson_Handler_3A06E4A1": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/Default",
            "uniqueId": "root_testputJson_Handler_3A06E4A1"
          }
        },
        "environment": {
          "variables": {
            "BUCKET_NAME_d755b447": "${aws_s3_bucket.root_cloudBucket_4F3C4F53.bucket}",
            "WING_FUNCTION_NAME": "Handler-c8cf1c6a",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8cf1c6a",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testputJson_Handler_IamRole_54055E84.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testputJson_Handler_S3Object_442C928F.key}",
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
      "root_testputJson_Handler_S3Object_442C928F": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:putJson/Handler/S3Object",
            "uniqueId": "root_testputJson_Handler_S3Object_442C928F"
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
        const b_client = context._lift(b);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            b: ${b_client},
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
          $Closure1._registerBindObject(b, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(b, host, ["delete", "getJson", "list", "putJson"]);
        }
        super._registerBind(host, ops);
      }
    }
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:putJson",new $Closure1(this,"$Closure1"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "put_json", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

