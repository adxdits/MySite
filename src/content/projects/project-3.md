---
title: ZigTUI - Terminal User Interface Library

description: A full-featured cross-platform Terminal User Interface (TUI) library for Zig, inspired by Ratatui. Build beautiful, interactive terminal applications with a simple, composable API.
publishDate: 'January 11 2026'
seo:
  image:
    src: '/zigtui.png'
---

![ZigTUI Dashboard](https://raw.githubusercontent.com/adxdits/zigtui/master/dashboard.gif)
<a href="https://github.com/adxdits/zigtui" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-align: center; text-decoration: none; border-radius: 5px;">Check it on Github</a>

---

**Project Overview:**
**ZigTUI** is the first full-featured cross-platform TUI framework for Zig — works seamlessly on Windows, Linux, and macOS. Inspired by Ratatui, it provides a simple and composable API for building beautiful, interactive terminal applications.

⭐ **82 stars on GitHub** | 👥 **50+ users** across the Zig community

## Features

- **Cross-platform support** — Windows, Linux, and macOS
- **Cell-based rendering** with diff algorithm for efficient updates
- **Constraint-based layouts** for flexible UI design
- **Composable widgets** — Block, Paragraph, List, Gauge, Table
- **Keyboard and mouse event handling**
- **ANSI color and text styling support**
- **Kitty Graphics Protocol** for image display
- **Unicode block fallback** for terminals without graphics support
- **Explicit memory management** — no hidden allocations

## Widgets

1. **Block** — A container with optional border and title
2. **Paragraph** — Display text with optional wrapping
3. **List** — A scrollable list of items
4. **Gauge** — A progress bar component
5. **Table** — Display tabular data

## Graphics Support

ZigTUI now supports image display in terminals using the **Kitty Graphics Protocol** and more!

![Image Display Example](https://preview.redd.it/zigtui-now-supports-image-display-in-terminals-kitty-v0-0flsf4rdambg1.png?width=1561&format=png&auto=webp&s=ae520d7f6b7418948a12d5ecb8960b0128de7325)

### What's New:

- **Kitty Graphics Protocol implementation** for displaying actual images in the terminal
- **Base64 chunked transmission** for large images
- **Automatic terminal capability detection**
- **Unicode half-block fallback** for terminals without graphics support (Windows Terminal, iTerm2, etc.)
- **Built-in BMP decoder** for the fallback mode

### Terminal Compatibility:

| Terminal         | Platform              | Kitty Graphics  |
| ---------------- | --------------------- | --------------- |
| Kitty            | Linux, macOS          | Full support    |
| WezTerm          | Windows, Linux, macOS | Full support    |
| Konsole          | Linux                 | Partial support |
| Windows Terminal | Windows               | Fallback mode   |

## Quick Start

```zig
const std = @import("std");
const tui = @import("zigtui");

pub fn main() !void {
    var gpa = std.heap.GeneralPurposeAllocator(.{}){};
    defer _ = gpa.deinit();
    const allocator = gpa.allocator();

    var backend = try tui.backend.init(allocator);
    defer backend.deinit();

    var terminal = try tui.terminal.Terminal.init(allocator, backend.interface());
    defer terminal.deinit();

    // Your TUI code here...
}
```

## Requirements

- Zig 0.15.0 or later
- Windows 10+ or Linux/macOS with ANSI escape sequence support
