# svg-icons
svg icon code, and scripts to mount them.

## usage

link svg-icons.js in header.

```html
<script src="svg-icons.js"></script>
```

write svg tag with yu-icon attribute.
auto mount on load event or html changing.

```html
<svg yu-icon="folder" size="24"></svg>
```
▼
```html
<svg yu-icon="folder" size="24" viewBox="0 0 200 200" width="24" height="24" style="fill: currentcolor; width: 24px; height: 24px;">
<g><path d="M20,30 L70,30 L90,60 L180,60 L180,180 L20,180 L20,30 Z"></path></g>
</svg>
```

### options

with x and y attributes, move icon position.

```html
<svg yu-icon="folder" size="18" x="10" y="20"></svg>
```

## icon list

https://yudachi-shinko.com/svgicons/
