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

When working with AG Grid in Angular across many columns, horizontal scrolling can become noticeably laggy. In our case each scroll event was taking around 40ms, which was enough to feel janky.

The root cause is column virtualization. By default, AG Grid only renders the columns currently visible on screen. When you scroll horizontally it destroys the components going off-screen and creates new ones coming in. For plain text cells that's fine, but in Angular each cell renderer is a real component with its own lifecycle, and that constant destroy/create cycle is expensive.

Setting `suppressColumnVirtualisation: true` in your grid options renders all columns once and keeps them in the DOM. Scrolling becomes a simple CSS transform with no Angular component churn. In our case it dropped scroll time from ~40ms to ~13ms. The trade-off is higher memory usage and a slightly slower initial render, so it works best when you have a moderate number of columns with complex Angular renderers rather than thousands of plain columns.

```typescript
gridOptions: GridOptions = {
  suppressColumnVirtualisation: true
};
```

This is a known issue tracked at [ag-grid/ag-grid#12833](https://github.com/ag-grid/ag-grid/issues/12833).
