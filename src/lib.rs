#![no_std]
#![feature(alloc)]
#![feature(proc_macro)]

extern crate alloc;
extern crate bigint;
extern crate pwasm_ethereum;
extern crate pwasm_std;
extern crate pwasm_abi;
extern crate pwasm_abi_derive;
extern crate parity_hash;

mod contract {
    use super::*;
    use bigint::U256;
    use pwasm_std::hash::{Address, H256};
    use pwasm_abi_derive::eth_abi;
    use alloc::Vec;

    static BLOCK_HASH_KEY: H256 = H256([2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);

    #[eth_abi(Endpoint, Client)]
    pub trait Contract {
        /// The constructor
        fn constructor(&mut self);

        /// 2/ Memoized block hash
        #[constant]
        fn block_hash(&mut self) -> Vec<u8>;

        /// Generate event message
        fn message(&mut self, data: Vec<u8>);

        /// 2/ Event declaration
        #[event]
        fn Message(&mut self, indexed_from: Address, value: U256, data: Vec<u8>);
    }


    pub struct Instance;
    impl Contract for Instance {
        fn constructor(&mut self) {
            pwasm_ethereum::write(
                &BLOCK_HASH_KEY,
                &pwasm_ethereum::block_hash(pwasm_ethereum::block_number() - 1).0
            )
        }

        fn block_hash(&mut self) -> Vec<u8> {
            // Don't accept money transfers
            assert!(pwasm_ethereum::value().is_zero());

            pwasm_ethereum::read(&BLOCK_HASH_KEY).to_vec()
        }

        fn message(&mut self, data: Vec<u8>) {
            // 3/ Just trigger an event
            let from = pwasm_ethereum::sender();
            let value = pwasm_ethereum::value();
            self.Message(from, value, data);
        }

    }
}

use pwasm_abi::eth::EndpointInterface;

#[no_mangle]
pub fn deploy() {
    let mut endpoint = contract::Endpoint::new(contract::Instance);
    endpoint.dispatch_ctor(&pwasm_ethereum::input());
}

#[no_mangle]
pub fn call() {
    let mut endpoint = contract::Endpoint::new(contract::Instance);
    pwasm_ethereum::ret(&endpoint.dispatch(&pwasm_ethereum::input()));
}
