#![no_std]

extern crate pwasm_ethereum;
extern crate pwasm_std;

use pwasm_std::hash::H256;

const HELLO: &str = "hello world";

// 3/ This function will be used as a key 
fn block_hash_key() -> H256 {
    0.into()
}

#[no_mangle]
pub fn deploy() {
    // 4/ During deployment we save the block hash
    pwasm_ethereum::write(
        &block_hash_key(),
        &pwasm_ethereum::block_hash(pwasm_ethereum::block_number()).0
    )
}

#[no_mangle]
pub fn call() {
    // 3/ And return it back whenever the contract is called
    pwasm_ethereum::ret(
        &pwasm_ethereum::read(&block_hash_key())
    )
}
