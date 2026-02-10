# Layout Components

Layout-Komponenten dienen ausschließlich dem strukturellen Aufbau der Benutzeroberfläche.

## OuiStackX

Horizontales Flexbox-Layout (row direction).

### Props (OuiStackX)

- `gap?: string | number` - Optionaler Abstand zwischen den Elementen. Zahlen werden als px interpretiert und automatisch in rem umgerechnet (16px = 1rem). String-Werte werden direkt verwendet.

### Verwendung (OuiStackX)

```vue
<OuiStackX :gap="16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</OuiStackX>
```

## OuiStackY

Vertikales Flexbox-Layout (column direction).

### Props (OuiStackY)

- `gap?: string | number` - Optionaler Abstand zwischen den Elementen. Zahlen werden als px interpretiert und automatisch in rem umgerechnet (16px = 1rem). String-Werte werden direkt verwendet.

### Verwendung (OuiStackY)

```vue
<OuiStackY :gap="16">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</OuiStackY>
```

## OuiSpace

Flexibler Raum in einem Flex-Container. Füllt den verfügbaren Platz aus.

### Eigenschaften (OuiSpace)

- Nutzt `flex: auto` um verfügbaren Platz einzunehmen
- `overflow: hidden` um Überlauf zu verhindern

### Verwendung (OuiSpace)

```vue
<OuiStackX>
  <div>Links</div>
  <OuiSpace />
  <div>Rechts</div>
</OuiStackX>
```

## CSS-Klassen

Die Komponenten basieren auf den folgenden CSS-Klassen aus `stylus/preset/layout.styl`:

- `.stack-x` - Horizontales Stack-Layout
- `.stack-y` - Vertikales Stack-Layout
- `.space` / `.grow` - Flexibler Raum
