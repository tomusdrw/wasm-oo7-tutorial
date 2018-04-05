// WASM contracts don't use Rust standard library.
#![no_std]

// Import the pwasm_ethereum bindings.
extern crate pwasm_ethereum;

// 3/ That function will be called during contract deployment (think: constructor)
#[no_mangle]
pub fn deploy() {

}

// 5/ That function is run whenever the contract is called.
#[no_mangle]
pub fn call() {
    // pwasm_ethereum bindings allow us to return a value or read input data.
    pwasm_ethereum::ret("hello world!".as_bytes())
}
