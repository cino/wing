//-----------------------------------------------------------------------------
// TODO: https://github.com/winglang/wing/issues/2785
//-----------------------------------------------------------------------------
bring cloud;

// set() & get()
let a = MutJson { a: 1 };
let b = MutJson { b: 2 };
a.set("c", b);

let c = a.get("c");
assert(c.get("b") == 2);

test "set()" {
  let x = MutJson { a: 1 };
  x.set("b", 2);
  let y = x.get("b"); 
  assert(y == 2);
}

//-----------------------------------------------------------------------------
// setAt() & getAt()
let d = MutJson { d: 3 };
a.setAt(2, d);
let e = a.getAt(2);
assert(e.get("d") == 3);

test "setAt()" {
  let x = MutJson { a: 1 };
  let a = MutJson { c: 3 };
  x.setAt(2, a);
  let d = x.getAt(2);
  assert(d.get("c") == 3);
}

/*
Will add test later:
test "setWithNonMutJsonObject()" {
let var error = "";
try {
    let f = MutJson { e: 4 };
    f.set("f", 9);
 } catch e {
     error = e;
 }

 log(error);
 assert(error == "");
}
*/
