# [memory_and_env.w](../../../../../../examples/tests/sdk_tests/function/memory_and_env.w) | compile | tf-aws

## inflight.$Closure1.js
```js
module.exports = function({ c }) {
  class $Closure1 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await c.inc());
    }
  }
  return $Closure1;
}

```

## inflight.$Closure2.js
```js
module.exports = function({ c }) {
  class $Closure2 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      (await c.inc());
    }
  }
  return $Closure2;
}

```

## inflight.$Closure3.js
```js
module.exports = function({ c, f1, f2 }) {
  class $Closure3 {
    constructor({  }) {
      const $obj = (...args) => this.handle(...args);
      Object.setPrototypeOf($obj, this);
      return $obj;
    }
    async $inflight_init()  {
    }
    async handle()  {
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 0")})(((await c.peek()) === 0))};
      (await f1.invoke(""));
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 1")})(((await c.peek()) === 1))};
      (await f2.invoke(""));
      {((cond) => {if (!cond) throw new Error("assertion failed: c.peek() == 2")})(((await c.peek()) === 2))};
    }
  }
  return $Closure3;
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
      "value": "[[\"root/Default/Default/test:function with memory and function with env can be invoked\",\"${aws_lambda_function.root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_D0AA45AD.arn}\"]]"
    }
  },
  "provider": {
    "aws": [
      {}
    ]
  },
  "resource": {
    "aws_dynamodb_table": {
      "root_cloudCounter_E0AC1263": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/cloud.Counter/Default",
            "uniqueId": "root_cloudCounter_E0AC1263"
          }
        },
        "attribute": [
          {
            "name": "id",
            "type": "S"
          }
        ],
        "billing_mode": "PAY_PER_REQUEST",
        "hash_key": "id",
        "name": "wing-counter-cloud.Counter-c866f225"
      }
    },
    "aws_iam_role": {
      "root_envfn_IamRole_F8D93FC8": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRole",
            "uniqueId": "root_envfn_IamRole_F8D93FC8"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_memoryfn_IamRole_93CF0A9D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRole",
            "uniqueId": "root_memoryfn_IamRole_93CF0A9D"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      },
      "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_EFFE5DB4": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/IamRole",
            "uniqueId": "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_EFFE5DB4"
          }
        },
        "assume_role_policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":\"sts:AssumeRole\",\"Principal\":{\"Service\":\"lambda.amazonaws.com\"},\"Effect\":\"Allow\"}]}"
      }
    },
    "aws_iam_role_policy": {
      "root_envfn_IamRolePolicy_F98ACE26": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRolePolicy",
            "uniqueId": "root_envfn_IamRolePolicy_F98ACE26"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_envfn_IamRole_F8D93FC8.name}"
      },
      "root_memoryfn_IamRolePolicy_1A26656B": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRolePolicy",
            "uniqueId": "root_memoryfn_IamRolePolicy_1A26656B"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:UpdateItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_memoryfn_IamRole_93CF0A9D.name}"
      },
      "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicy_1E4BE4AC": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/IamRolePolicy",
            "uniqueId": "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicy_1E4BE4AC"
          }
        },
        "policy": "{\"Version\":\"2012-10-17\",\"Statement\":[{\"Action\":[\"dynamodb:GetItem\"],\"Resource\":[\"${aws_dynamodb_table.root_cloudCounter_E0AC1263.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_memoryfn_812AB0A5.arn}\"],\"Effect\":\"Allow\"},{\"Action\":[\"lambda:InvokeFunction\"],\"Resource\":[\"${aws_lambda_function.root_envfn_7540B24D.arn}\"],\"Effect\":\"Allow\"}]}",
        "role": "${aws_iam_role.root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_EFFE5DB4.name}"
      }
    },
    "aws_iam_role_policy_attachment": {
      "root_envfn_IamRolePolicyAttachment_5E383376": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/IamRolePolicyAttachment",
            "uniqueId": "root_envfn_IamRolePolicyAttachment_5E383376"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_envfn_IamRole_F8D93FC8.name}"
      },
      "root_memoryfn_IamRolePolicyAttachment_2056B650": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/IamRolePolicyAttachment",
            "uniqueId": "root_memoryfn_IamRolePolicyAttachment_2056B650"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_memoryfn_IamRole_93CF0A9D.name}"
      },
      "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicyAttachment_F48A468C": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/IamRolePolicyAttachment",
            "uniqueId": "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRolePolicyAttachment_F48A468C"
          }
        },
        "policy_arn": "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole",
        "role": "${aws_iam_role.root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_EFFE5DB4.name}"
      }
    },
    "aws_lambda_function": {
      "root_envfn_7540B24D": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/Default",
            "uniqueId": "root_envfn_7540B24D"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "env-fn-c8a226dd",
            "WING_TARGET": "tf-aws",
            "catAge": "2",
            "catName": "Tion"
          }
        },
        "function_name": "env-fn-c8a226dd",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_envfn_IamRole_F8D93FC8.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_envfn_S3Object_CCCD24F3.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_memoryfn_812AB0A5": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/Default",
            "uniqueId": "root_memoryfn_812AB0A5"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "WING_FUNCTION_NAME": "memory-fn-c844bdf7",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "memory-fn-c844bdf7",
        "handler": "index.handler",
        "memory_size": 128,
        "publish": true,
        "role": "${aws_iam_role.root_memoryfn_IamRole_93CF0A9D.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_memoryfn_S3Object_77D2B335.key}",
        "timeout": 30,
        "vpc_config": {
          "security_group_ids": [],
          "subnet_ids": []
        }
      },
      "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_D0AA45AD": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/Default",
            "uniqueId": "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_D0AA45AD"
          }
        },
        "environment": {
          "variables": {
            "DYNAMODB_TABLE_NAME_49baa65c": "${aws_dynamodb_table.root_cloudCounter_E0AC1263.name}",
            "FUNCTION_NAME_2d5b932f": "${aws_lambda_function.root_memoryfn_812AB0A5.arn}",
            "FUNCTION_NAME_d7a1b8c8": "${aws_lambda_function.root_envfn_7540B24D.arn}",
            "WING_FUNCTION_NAME": "Handler-c8bf8232",
            "WING_TARGET": "tf-aws"
          }
        },
        "function_name": "Handler-c8bf8232",
        "handler": "index.handler",
        "publish": true,
        "role": "${aws_iam_role.root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_IamRole_EFFE5DB4.arn}",
        "runtime": "nodejs18.x",
        "s3_bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "s3_key": "${aws_s3_object.root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_1C181B39.key}",
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
      "root_envfn_S3Object_CCCD24F3": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/env fn/S3Object",
            "uniqueId": "root_envfn_S3Object_CCCD24F3"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_memoryfn_S3Object_77D2B335": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/memory fn/S3Object",
            "uniqueId": "root_memoryfn_S3Object_77D2B335"
          }
        },
        "bucket": "${aws_s3_bucket.root_Code_02F3C603.bucket}",
        "key": "<ASSET_KEY>",
        "source": "<ASSET_SOURCE>"
      },
      "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_1C181B39": {
        "//": {
          "metadata": {
            "path": "root/Default/Default/test:function with memory and function with env can be invoked/Handler/S3Object",
            "uniqueId": "root_testfunctionwithmemoryandfunctionwithenvcanbeinvoked_Handler_S3Object_1C181B39"
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
const util = require('@winglang/sdk').util;
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
        const c_client = context._lift(c);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c: ${c_client},
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
          $Closure1._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure1._registerBindObject(c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure2 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure2.js";
        const c_client = context._lift(c);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c: ${c_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure2Client = ${$Closure2._toInflightType(this).text};
            const client = new $Closure2Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure2._registerBindObject(c, host, []);
        }
        if (ops.includes("handle")) {
          $Closure2._registerBindObject(c, host, ["inc"]);
        }
        super._registerBind(host, ops);
      }
    }
    class $Closure3 extends $stdlib.std.Resource {
      constructor(scope, id, ) {
        super(scope, id);
        this.display.hidden = true;
        this._addInflightOps("handle");
      }
      static _toInflightType(context) {
        const self_client_path = "././inflight.$Closure3.js";
        const c_client = context._lift(c);
        const f1_client = context._lift(f1);
        const f2_client = context._lift(f2);
        return $stdlib.core.NodeJsCode.fromInline(`
          require("${self_client_path}")({
            c: ${c_client},
            f1: ${f1_client},
            f2: ${f2_client},
          })
        `);
      }
      _toInflight() {
        return $stdlib.core.NodeJsCode.fromInline(`
          (await (async () => {
            const $Closure3Client = ${$Closure3._toInflightType(this).text};
            const client = new $Closure3Client({
            });
            if (client.$inflight_init) { await client.$inflight_init(); }
            return client;
          })())
        `);
      }
      _registerBind(host, ops) {
        if (ops.includes("$inflight_init")) {
          $Closure3._registerBindObject(c, host, []);
          $Closure3._registerBindObject(f1, host, []);
          $Closure3._registerBindObject(f2, host, []);
        }
        if (ops.includes("handle")) {
          $Closure3._registerBindObject(c, host, ["peek"]);
          $Closure3._registerBindObject(f1, host, ["invoke"]);
          $Closure3._registerBindObject(f2, host, ["invoke"]);
        }
        super._registerBind(host, ops);
      }
    }
    const c = this.node.root.newAbstract("@winglang/sdk.cloud.Counter",this,"cloud.Counter");
    const b = this.node.root.newAbstract("@winglang/sdk.cloud.Bucket",this,"cloud.Bucket");
    const f1 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"memory fn",new $Closure1(this,"$Closure1"),{
    "memory": 128,}
    );
    const f2 = this.node.root.newAbstract("@winglang/sdk.cloud.Function",this,"env fn",new $Closure2(this,"$Closure2"),{ env: Object.freeze({"catName":"Tion"}) });
    (f2.addEnvironment("catAge","2"));
    {((cond) => {if (!cond) throw new Error("assertion failed: f2.env.get(\"catAge\") == \"2\"")})(((f2.env)["catAge"] === "2"))};
    {((cond) => {if (!cond) throw new Error("assertion failed: f2.env.get(\"catName\") == \"Tion\"")})(((f2.env)["catName"] === "Tion"))};
    this.node.root.new("@winglang/sdk.std.Test",std.Test,this,"test:function with memory and function with env can be invoked",new $Closure3(this,"$Closure3"));
  }
}
class $App extends $AppBase {
  constructor() {
    super({ outdir: $outdir, name: "memory_and_env", plugins: $plugins, isTestEnvironment: $wing_is_test });
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

