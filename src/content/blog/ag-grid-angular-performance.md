---
title: 'Fixing AG Grid Horizontal Scroll Performance in Angular'
excerpt: 'How suppressColumnVirtualisation solved our scrolling lag and improved performance by 3x'
publishDate: '2026-01-11'
tags:
  - Angular
  - AG Grid
  - Performance
seo:
  image:
    src: '/ag-grid-angular.png'
    alt: 'AG Grid and Angular Performance'
---

<div style="display: flex; align-items: center; gap: 20px; margin: 30px 0;">
  <a href="https://www.ag-grid.com/?utm_source=ag-grid-readme&utm_medium=repository&utm_campaign=github" target="_blank">
    <img src="https://blog.nashtechglobal.com/wp-content/uploads/2023/08/ag.jpg" alt="AG Grid" width="150" />
  </a>
  <span style="font-size: 40px; color: #666;">+</span>
  <img src="https://angular.io/assets/images/logos/angular/angular.svg" alt="Angular" width="120" />
</div>

## The Problem: Horizontal Scroll Lag

When working with AG Grid in Angular with many columns, you might experience **janky horizontal scrolling**. In our case, each horizontal scroll movement was taking **~40ms**, causing visible lag and poor user experience.

![AG Grid Performance Demo](https://private-user-images.githubusercontent.com/12896163/291318483-f5885bf4-bfc4-4b43-9243-13b9d1baf37e.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NjgxNDc0NDMsIm5iZiI6MTc2ODE0NzE0MywicGF0aCI6Ii8xMjg5NjE2My8yOTEzMTg0ODMtZjU4ODViZjQtYmZjNC00YjQzLTkyNDMtMTNiOWQxYmFmMzdlLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNjAxMTElMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjYwMTExVDE1NTkwM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWRiNjhlYzg3MzNhNzQxNmY3NTVmNWU4NmIzZDlhODBhY2UzMjI4YWU4MjYzMzgyMjdlZGFmZjhjMmFjNjVjOWMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.eiqqvtOr-1sZU-PvxqMJJ-HD_AzzzfV6y-QYxKxvek8)

## Understanding Column Virtualization

Let me explain how AG Grid's column virtualization works using a simple analogy:

### How AG Grid Normally Works (Default Behavior)

Imagine you have a grid with **100 columns** but your screen can only show **10 columns at a time**.

- **Virtualization = only render what's visible**
- AG Grid creates cell components **only for those 10 visible columns**
- When you scroll horizontally:
  - It **destroys the 10 columns** that go off-screen
  - It **creates new 10 columns** that appear on-screen

This is usually good because you don't waste memory rendering all 100 columns at once.

---

## Why This Is Slow in Angular

In Angular, each **cell renderer** is a real Angular component with its own lifecycle.

The problem:

1. **Destroying and recreating Angular components is expensive**
2. Every horizontal scroll triggers:
   - Destroy components for columns leaving the screen
   - Create new Angular components for columns coming in
3. With **many columns** or **complex cell renderers**, this blocks the UI

Result: **Scrolling lag and jank**

---

## The Solution: `suppressColumnVirtualisation`

```typescript
gridOptions: GridOptions = {
  suppressColumnVirtualisation: true
  // ... other options
};
```

### What This Does:

- Renders **all columns at once**, even if they're off-screen
- **Never destroys or recreates** columns during horizontal scrolling
- Smooth scrolling because Angular doesn't constantly destroy/recreate components

### Trade-offs:

| Aspect                 | With Virtualization (default)  | Suppressed Virtualization             |
| ---------------------- | ------------------------------ | ------------------------------------- |
| **Columns in DOM**     | Only visible ones (~10)        | All columns (100+)                    |
| **On Scroll**          | Destroy + Recreate             | No destruction                        |
| **Memory Usage**       | Lower                          | Higher                                |
| **Initial Render**     | Faster                         | Slower                                |
| **Scroll Performance** | Can lag with Angular           | Smooth                                |
| **Best For**           | Simple renderers, many columns | Angular components, complex renderers |

---

## Performance Results

Our real-world results after enabling `suppressColumnVirtualisation: true`:

```
Before: ~40ms per horizontal scroll
After:  ~13ms per horizontal scroll
Improvement: 3x faster!
```

---

## Visual Comparison

### With Virtualization (Default)

```
[Visible Columns: 1-10] [Hidden: 11-100]
     ↓ Scroll right ↓
Destroy 1-10, Create 11-20 (Expensive in Angular!)
```

### With suppressColumnVirtualisation: true

```
[All Columns: 1-100 rendered once]
     ↓ Scroll right ↓
Just scroll, no recreation (Smooth!)
```

---

## When to Use This Setting

**Use `suppressColumnVirtualisation: true` when:**

- You have horizontal scroll lag
- Using Angular cell renderers
- Complex cell components
- Moderate number of columns (<100)
- Scroll performance is priority

**Don't use it when:**

- You have 500+ columns
- Memory is constrained
- Simple cell renderers (strings/numbers)
- Initial render time is critical

---

## Additional Performance Tips

1. **Row Virtualization** — Keep this enabled (don't suppress)
2. **Use `onlyEditWhenEditable`** — Reduces component overhead
3. **Implement `AgRendererComponent` properly** — Avoid unnecessary change detection
4. **Use `OnPush` change detection** — In your cell components
5. **Avoid complex templates** — In frequently rendered cells

---

## Conclusion

If you're experiencing horizontal scroll lag in AG Grid with Angular, `suppressColumnVirtualisation: true` might be your silver bullet. It trades initial memory for smooth scrolling performance by preventing Angular from constantly destroying and recreating components.

**Remember:** Profile first, optimize second. Use Chrome DevTools Performance tab to confirm where your bottleneck is before applying this fix.

---

### Related Resources

- [AG Grid Documentation](https://www.ag-grid.com/angular-data-grid/)
- [Angular Performance Guide](https://angular.io/guide/performance-checklist)
- [AG Grid Performance Tips](https://www.ag-grid.com/angular-data-grid/performance/)
