#!/bin/bash

set -xe

# Get rustup.
#- TODO

# Use nightly version of the compiler
#- rustup install nightly

# Add wasm target to the compiler
#- rustup target add wasm32-unknown-unknonwn

# Install pwasm utilities
#- cargo install pwasm-utils

# Compile the contract using WASM target
cargo build --release --target wasm32-unknown-unknown

# Convert WASM contract into pWASM deployable on the Kovan testnet.
wasm-build --target=wasm32-unknown-unknown ./target wasm-demo
