---
title: 'Zig, Garbage Collection, and Hidden Memory Policy'
excerpt: 'A short note on what garbage collectors do, why they help libraries compose, and how Zig makes memory policy explicit instead.'
publishDate: '2026-06-28'
tags:
  - Zig
  - Memory
  - Programming Languages
seo:
  image:
    src: '/MySite/garbage-collection-vs-zig-allocators.png'
    alt: 'Diagram comparing garbage-collected languages with Zig allocators'
---

![Garbage collection vs Zig allocators](/MySite/garbage-collection-vs-zig-allocators.png)

A garbage collector is a runtime system that automatically finds memory the program is no longer using and frees it. Languages such as Java, Go, Python, and JavaScript use garbage collection or managed memory so programmers do not always have to decide exactly who owns each piece of memory and when it should be released.

That is especially useful when merging or composing libraries. Imagine Library A creates an object, Library B wraps it, and the application passes it through several other pieces of code. Without a shared memory policy, every boundary raises a hard question: who owns this allocation, and who must free it? With a garbage collector, the runtime takes responsibility, so libraries can allocate what they need and pass objects around more easily.

The tradeoff is that garbage collection can hide memory policy. A library may allocate internally, and the runtime decides when cleanup happens. That can make memory usage, latency, and allocation failure harder to predict.

Zig answers this same composition problem differently. Instead of relying on a global garbage collector, Zig code that needs memory receives an allocator from the caller:

```zig
fn makeBuffer(allocator: std.mem.Allocator, size: usize) ![]u8 {
    return try allocator.alloc(u8, size);
}
```

That allocator makes memory policy visible at the API boundary. The application can choose a general-purpose allocator, an arena allocator, a fixed-buffer allocator, or a testing allocator. The library still stays reusable, but the caller remains in control of where memory comes from and how it should be released.

So the point is not that garbage collection is bad. It is useful, comfortable, and often the right tradeoff. The important difference is visibility: garbage collection hides memory policy behind the runtime, while Zig asks the program to pass that policy explicitly.
