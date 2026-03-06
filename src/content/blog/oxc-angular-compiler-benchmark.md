---
title: 'OXC Angular Compiler Performance Study'
excerpt: 'A benchmark comparing the Rust-based OXC Angular compiler against the TypeScript legacy compiler across template sizes, from 20 to 4500 characters.'
publishDate: '2026-03-06'
isFeatured: true
tags:
  - Angular
  - Performance
  - Rust
  - Compiler
seo:
  image:
    src: '/MySite/oxc-benchmark-summary.png'
    alt: 'OXC Angular Compiler Benchmark Summary Dashboard'
---

[oxc-angular-compiler](https://github.com/voidzero-dev/oxc-angular-compiler) is a Rust Angular template compiler built on [OXC](https://github.com/oxc-project/oxc), distributed as a native Node module via NAPI-RS. I benchmarked it against `@angular/compiler` 100 iterations, 20 warmup, five template sizes on Apple Silicon (darwin/arm64, Node v22.12.0).

![Full benchmark dashboard](/MySite/oxc-benchmark-summary.png)

## Compilation time

![Compilation time comparison](/MySite/oxc-benchmark-compilation-time.png)

Small templates are a wash. Things diverge at larger sizes: at 4566 chars legacy runs at 0.57ms, OXC at 1.88ms. The template-parse-only stage of OXC is faster across the board but that excludes code generation so it is not a direct comparison.

![Speedup factor](/MySite/oxc-benchmark-speedup.png)

## Tail latency

![Percentile distribution](/MySite/oxc-benchmark-percentiles.png)

Legacy has heavier tails at small template sizes. P99 for the small fixture is 0.262ms vs 0.105ms for OXC. For incremental dev builds where you are recompiling one component at a time, that matters.

![Latency breakdown](/MySite/oxc-benchmark-latency.png)

## Memory

![Memory comparison](/MySite/oxc-benchmark-memory.png)

| Fixture | OXC (KB) | Legacy (KB) |
| ------- | -------- | ----------- |
| tiny    | 298      | 2 122       |
| small   | 341      | 5 169       |
| medium  | 534      | 668         |
| large   | 1 091    | 2 876       |
| xlarge  | 3 591    | 1 933       |

OXC uses far less memory on small templates. That reverses at xlarge.

## Scaling

![Scaling analysis](/MySite/oxc-benchmark-scaling.png)

Legacy holds throughput well as template size grows. OXC degrades past ~1000 chars, likely NAPI bridge overhead.

The raw results are in `benchmarks/` of the repo if you want to run it yourself.
