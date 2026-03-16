# oui-mobile

Place it somewhere to let the magic happen:

```vue
<OuiMobileActivator />
```

## Why this module is useful

`oui-mobile` is a lightweight runtime fix layer for mobile browsers, with a special focus on iOS Safari behavior.

It is useful when your app contains dialogs, forms, bottom sheets, fixed headers/footers, or other UI that must keep a stable layout while the virtual keyboard appears.

Without this module, iOS commonly causes issues such as:

- viewport height jumps when the keyboard opens/closes
- focused inputs being pushed out of view
- unwanted page scrolling or "rubber-band" overscroll
- broken full-height layouts in modals and app shells
- incorrect bottom safe-area behavior while typing

`OuiMobileActivator` enables a global mobile mode (`html.oui-mobile`) and applies JavaScript + CSS workarounds so these edge cases are handled consistently.

## How it works (and how it bypasses iOS quirks)

Internally, the activator runs once (singleton) and only on mobile user agents. On mount it adds classes on the root element:

- `oui-mobile`: turns on the mobile CSS behavior
- `oui-mobile-supported`: marks that runtime support was activated

The core strategy is to avoid trusting static viewport units on iOS and instead track the *actual* visible viewport:

1. It listens to `visualViewport.resize` and `visualViewport.scroll`.
2. On every change, it writes `window.visualViewport.height` into the CSS variable `--visible-height`.
3. Layouts using `.oui-mobile-fullheight` (and root height rules) follow this value, so they match the truly visible area, including keyboard transitions.

To detect keyboard state, it checks whether the active element is an `input`, `textarea`, or `[contenteditable]`:

- if focused: adds `html.virtual-keyboard`
- if not focused: removes it

That class disables bottom safe-area inset while typing (`--safe-bottom: 0`), which avoids extra spacing artifacts on iOS.

After keyboard animation delay (~400ms), the focused field is scrolled into view with `scrollIntoView({ behavior: 'instant', block: 'nearest', inline: 'nearest' })` so form controls stay reachable.

For scroll stability, it also intercepts `touchmove` at capture phase (`passive: false`) and prevents default scrolling unless the event target is inside a scrollable container. This avoids accidental background/page scroll and iOS bounce effects while preserving intended scrolling regions.

On the CSS side, the module further mitigates iOS-specific behavior by:

- mapping safe-area env variables to `--safe-top/right/bottom/left`
- applying height transitions tuned for keyboard appearance
- setting `overscroll-behavior: none` and mobile touch adjustments
- adding a short focus animation workaround to reduce iOS keyboard-scroll glitches

In short: `oui-mobile` makes mobile form/dialog interactions predictable by combining `visualViewport` measurements, keyboard-aware classes, touch-scroll guarding, and safe-area-aware CSS.
