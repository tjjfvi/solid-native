# Solid Native

Solid Native expands the [Solid](https://www.solidjs.com] ecosystem to include
development of native mobile applications.

`solid-native` applies `solid-js` as a layer over React Native, making available
composable reactive primitives allowing for fine-grained reactive programing.
This results in an approach to native development with the ergonomics and
familiarity known and expected by Solid developers, combined with the addition
of tooling and libraries from the React Native ecosystem.

## Goals

To make native development using Solid comparable to web development using
Solid.

To allow for 'Solid Native' projects, including:
- new projects based on Solid components that use can consume third-party
  library React Native components when needed
- new libraries based on Solid components that want to be available to the React
  Native audience
- existing React Native projects that want to add and migrate to Solid
  components
- existing React Native libraries that want to add and migrate to Solid
  components while remaining available to the React Native audience

## Installation

1. Create a new React Native project, or check out an existing one.
2. Install `solid-native` from NPM using your package manager of choice.
3. Add `"solid-native/babel-preset"` to the `presets` array in your `babel.config.json`
4. Configure Metro by adding `'cjs'` as a source extension; see `examples/metro.config.js`.

## Usage

When you install Solid Native, nothing will change at first, and your app
should continue to function as normal. This is because, by default, `.jsx` and `.tsx`
files will be processed as 'React' to accommodate existing React Native components.

To start using Solid Native, create a new component file, and add `// @solid` to the top.

For example:

```tsx
// @solid
import { Text } from "react-native"

export const HelloSolid = () => {
  return <Text>Hello, Solid!</Text>
}
```

The file will be processed as 'Solid' and the component can now be used in your app, in both Solid and React components.

Writing components in Solid Native is much like writing components in standard
Solid, but with primitive DOM elements replaced with primitive React Native Elements.

For example, here's Solid's [counter example](https://www.solidjs.com/examples/counter) written in Solid Native.

```tsx
// @solid
import { Text } from "react-native";
import { createSignal, onCleanup } from "solid-native";

export const CountingComponent = () => {
  const [count, setCount] = createSignal(0);
  const interval = setInterval(
    () => setCount(c => c + 1),
    1000
  );
  onCleanup(() => clearInterval(interval));
  return <Text>Count value is {count()}</Text>;
};
```

The only differences here are the `// @solid` at the top and the use of `Text`
instead of `div`.

## Interop between Solid & React

Solid Native supports largely seamless interop between React components and Solid
components.

When you use a Solid component in a React component, Solid Native internally
creates signals for tracking the React props, and passes a reactive proxy object to the
Solid component.

When you use a React component in a Solid component, Solid Native effectively
creates a memo for each prop, and triggers a rerender on the React component
whenever one of the memos updates. It uses Solid's
[`children`](https://www.solidjs.com/docs/latest/api#children) function to
create the memo for the `children` prop.

### Using React Hooks in Solid Files

Generally, you shouldn't need to do this; most React hooks have Solid analogs
that should be used instead.

However, if you must use a React hook (e.g. to use a an established React context,
or a library such as React Navigation), then you can wrap your Solid component
with `withHooks`:

```ts
// @solid
import * as React from "react"
import { withHooks } from "solid-native";

export const MyComponent = withHooks((hook, props: MyProps) => {
  // Like any other Solid component, this component will only be
  // called once and will not rerender.
  // However, the function passed to hook will be called every time
  // the internal React component rerenders.
  const context = hook(() => React.useContext(MyContext));
  // `context` is now a *reactive accessor* to the value returned by `useContext`.

  // ...
})
```

The `hook` function can be called multiple times, but it should only be called
synchronously, i.e. before the component returns.


## Limitations

### Currently Unsupported Solid APIs

Some Solid APIs are not currently supported:
- `Context`
- `Suspense`
- `ErrorBoundary`

These are not necessarily fundamental limitations; PRs welcome!

### Calling Solid Components as Regular Functions

Because Solid Native supports interop between React components and Solid
components, **you cannot call top-level Solid components as regular functions**.
Doing so will instead call the React bridge component, and have undesired
effects.

Instead, instantiate components using JSX syntax.

### Calling Regular Functions as Solid Components

Because Solid Native supports interop between React components and Solid
components, **you cannot call non-JSX returning functions as Solid components**.
Doing so will instead invoke the function as a React component, and have
undesired effects.

Instead, either return JSX from the function or explicitly make the function a
Solid component by passing it to `wrapSolidComponent`.

### Unsupported React Features

Most components in React Native libraries will work seamlessly in Solid components,
with the exception of:
- React components that attempt to introspect the children they are passed
- React components expecting nullary functions as children

In both of these cases, the best solution is to create a React component that
wraps the problematic components to avoid the limitations.

## Future Features

PRs are, as always, welcome!

- Supporting more Solid APIs (see [Unsupported Solid APIs](#unsupported-solid-apis))
- Performance testing
- Defaulting files to Solid-mode based on file location

## A Note on Naming

This library is called Solid Native instead of `solid-react-native` because the
core purpose of the library is the 'Solid + Native' part – the use of React
Native is merely a means to that end.
 
If a viable library that accomplishes 'Solid + Native' without using React
Native is created, I will be delighted to cede the name. However, since React
Native is backed by Facebook and has been under ongoing development for 6 years,
I think it is pragmatic to base an effort towards 'Solid + Native' off of it.
