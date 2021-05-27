# svg-icons
svg icon code, and scripts to mount them.

## usage

link svg-icons.js in html header.

```html
<script src="svg-icons.js"></script>
```

write svg tag with yu-icon attribute.
auto mount on load event or html changing.

```html
<svg yu-icon="star" size="24"></svg>
```
▼
```html
<svg yu-icon="star" size="24" viewBox="0 0 200 200" width="24" height="24" style="fill: currentcolor; width: 24px; height: 24px;">
<g fill="#A0A0A0"><path d="M47.06,177.84 L99.70,147.94 L152.92,177.93 L140.75,118.55 L185.85,77.17 L125.48,70.43 L100.05,15.23 L75.00,70.08 L13.98,77.04 L59.07,117.99 L47.06,177.84 Z"/></g>
</svg>
```

### options

with x and y attributes, move icon position.

```html
<svg yu-icon="star" size="18" x="10" y="20"></svg>
```

## icon list

https://yudachi-shinko.com/svgicons/
