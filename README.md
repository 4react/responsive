# @4react / responsive

Responsiveness for React Applications.

```
npm i @4react/responsive
```

## Usage

### Define breakpoints

```jsx
import { ResponsiveProvider } from '@4react/responsive'

const App = () => (
  <ResponsiveProvider breakpoints={{
    mobile: 0,
    tablet: 768,
    desktop: 992
  }}>
    ...
  </ResponsiveProvider>
)
```

### Create responsive values

```jsx
import { useResponsive } from '@4react/responsive'

const Foo = () => {
  const responsive = useResponsive()
  const width = responsive(['100%', 720, 960])

  return (
    <div style={{ width }}>
      ...
    </div>
  )
}
```

### Render components conditionally

```jsx
import { Responsive } from '@4react/responsive'

const App = () => (
  <Container>
    <Responsive condition={{ max: 'tablet' }}>
      <MobileMenu />      
    </Responsive>
    <Responsive condition="desktop">
      <NavBar />
    </Responsive>
  </Container>
)
```

## API

##### Components
- [ResponsiveProvider](#responsiveprovider-component)
- [Responsive](#responsive-component)

##### Hooks
- [useResponsive](#useresponsive-hook)
- [useResponsiveCondition](#useresponsivecondition-hook)
- [useCurrentBreakpoint](#usecurrentbreakpoint-hook)
- [useIsBreakpointDetected](#useisbreakpointdetected-hook)

### ResponsiveProvider [Component]

Use this component to provide responsiveness functionalities down to the application.

| Props | Type | Default | Description |
| --- | --- | --- | --- |
| breakpoints | object (***see [Breakpoints definition](#breakpoint-definition)***) | ***see [Default breakpoints](#default-breakpoints)*** | ***[optional]*** Custom breakpoints configuration. |

#### Breakpoints definition

Breakpoints can be configured with an object map with the following characteristics:
- each key represent a custom breakpoint name
- each value represents the `minimum width` for corresponding breakpoint.

```
{ tablet: 768, desktop: 992 }
```

The example above specifies 2 values; the corresponding defined breakpoints are:
- **tablet**: 768 pixels and above.
- **desktop**: 992 pixels and above.

Nevertheless, a third breakpoint is implicitly defined, and will be automatically named "**default**":
- **default**: 0 and above. Fallback value if no breakpoint is currently matching the screen resolution.

Anyway, it's possible to define a custom name, even for the default breakpoint. Just define it with value 0.

```
{ mobile: 0, tablet: 768, desktop: 992 }
```

In this case, breakpoints will be:
- **mobile**: 0 pixels and above.
- **tablet**: 768 pixels and above.
- **desktop**: 992 pixels and above.

**NOTE:** The order in which values are specified does not influence breakpoints order.
Values will be sorted in ascending order.

##### Default breakpoints

In case of no breakpoints' schema specified, the following values will be used:
```
{ xs: 480, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1600 }
```

### Responsive [Component]

Use this component to conditionally render parts of your application.

```jsx
// with children
<Responsive condition={...}>
  <Content />
</Responsive>

// with component prop
<Responsive condition={...} component={Content} />

// with render prop
<Responsive condition={...} render={
  (breakpoint) => <Content breakpoint={breakpoint}/>
} />
```

| Props | Type | Default | Description |
| --- | --- | --- | --- |
| condition | string &#124; array &#124; object (***see [Responsive condition](#responsive-condition)***) | - | Defines the render condition. |
| component | React Component | - | ***[optional]*** Render the specified component. |
| render | Render Function | - | ***[optional]*** Render function, receiving the current active breakpoint. |

##### Responsive condition

A responsive condition can be described in 3 ways:

With a `string` representing the name of a specific breakpoint.
```jsx
<Responsive condition="mobile" ... />
```

With an `array of string` representing a list of breakpoints names.
```jsx
<Responsive condition={['xs', 'xxl']} ... />
```

With an `object` containing one or more of the following keys:
- min:`string` representing the minimum breakpoint for which the condition is valid.
- max:`string` representing the maximum breakpoint for which the condition is valid.
```jsx
<Responsive condition={{ min: 'lg' }} ... />
<Responsive condition={{ min: 'sm', max: 'lg' }} ... />
```

### useResponsive [hook]

Call this hook to obtain the *responsive* function, used for creating breakpoint-dependent values.
```js
const responsive = useResponsive()
```

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| breakpoints | array | - | ***[optional]*** Select a subset of breakpoints for which the responsive function will work (see [Select a subset of breakpoints](#select-a-subset-of-breakpoints)). |

The responsive function takes a set of values as argument and returns the value to consider for the current valid breakpoint.
Let's consider the same 3-breakpoints schema used in [Breakpoints definition](#breakpoint-definition) example.

The example below specifies a value for each defined breakpoint.
```js
// with default breakpoint
const width = responsive({ default: '100%', tablet: 720, desktop: 950 })

// without default breakpoint
const width = responsive({ mobile: '100%', tablet: 720, desktop: 950 })
```

It's also possible to use the array shorthand.
Values will be associated to the breakpoint in the corresponding position, following the natural sorting.

```js
const width = responsive(['100%', 720, 950])
```
In the example above, the second value in the array (720) will refer to the second breakpoint (tablet).

**NOTE:** The `responsive` function can also be called with a simple value (`string` or `number`).
In this case the value is simply returned without any additional logic.

Many times you want to manage a responsive property without specifying values for each possible breakpoint
e.g. a *visibility* property to set from *"visible"* to *"hidden"*  when breakpoint change from tablet to desktop.
In these cases, we can simply ignore non interesting breakpoints.

```js
const visibility = responsive({ mobile: 'visible', desktop: 'hidden' })
// is the same of
const visibility = responsive({ mobile: 'visible', tablet: 'visible', desktop: 'hidden' })
```
Both the above lines creates the same responsive value.
In this case specifying a value for the *tablet* breakpoint is not necessary;
`tablet` will automatically maintain the value declared for `mobile` breakpoint.

In general, a responsive value will be used for the specified breakpoint and for all the following, until another value will be found for a subsequent breakpoint.

Here another example using the default configuration  see [Default Breakpoints](#default-breakpoints)).
```js
const height = responsive({ default: 32, md: 40, xxl: 48 })
```
In this case:
- *default*, *xs* and *sm* will take both value 32.
- *md*, *lg* and *xl* will all take value 40.
- *xxl* will take value 48.

**NOTE:** Using the array notation you are forced to declare a value for each breakpoint.
Skipping a value will cause the breakpoint in the corresponding position to have value `undefined`.
Anyway you can use this notation on a subset of breakpoints (See [Select a breakpoints subset](#select-a-breakpoints-subset))

##### Select a breakpoints subset

If needed, we can use the useResponsive optional parameter to specify a desired subset of breakpoints;
this can be done listing their names:

```jsx
const responsive = useResponsive(['default', 'md', 'xxl'])

const width = responsive([32, 40, 48])
```
In the above example, the responsive function will take an array of 3 values, corresponding to the 3 breakpoints selected with the hook parameter.

### useResponsiveCondition [hook]

Use this hook to create boolean checks using the same condition logics of the Responsive component (See [Responsive Component](#responsive-component)).

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| breakpoints | string &#124; array &#124; object (See [Responsive Component](#responsive-component)) | - | Specify the checker condition. |

```js
// single breakpoint
const isMobile = useResponsiveCondition('mobile')
// list of breakpoints
const isMobile = useResponsiveCondition(['xs', 'sm', 'md'])
// configuration objet
const isMobile = useResponsiveCondition({ max: 'md' })
```

### useCurrentBreakpoint [hook]

Use this hook to obtain the actual valid breakpoint.

```js
const current = useCurrentBreakpoint()
```

### useIsBreakpointDetected [hook]

Breakpoint is detected at runtime.
Use this hook to check if a breakpoint is still to be detected during the first application render.

```js
const isBreakpointDetected = useIsBreakpointDetected()

if (!isBreakpointDetected) {
  render <Loader />
}

render <App />
```
