[![Published on Vaadin  Directory](https://img.shields.io/badge/Vaadin%20Directory-published-00b4f0.svg)](https://vaadin.com/directory/component/LostInBrittanygranite-ink)
[![Stars on vaadin.com/directory](https://img.shields.io/vaadin-directory/star/LostInBrittanygranite-ink.svg)](https://vaadin.com/directory/component/LostInBrittanygranite-ink)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/LostInBrittany/granite-ink)

# granite-ink

> is a webcomponent to hand draw paths on a canvas and get the paths coordinates
>
> Polymer 3.1 ready


## Doc & demo

[https://lostinbrittany.github.io/granite-ink](https://lostinbrittany.github.io/granite-ink)

## Usage example

<!---
```
<custom-element-demo>
  <template>
    <style>
      granite-ink {
        width:300px;
        height:300px; 
        border: solid 1px grey;
      }
    </style>
    <script src="../webcomponentsjs/webcomponents-lite.js"></script>
    <link rel="import" href="granite-ink.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<granite-ink></granite-ink>
```

## Install

Install the component using [Bower](http://bower.io/):

```sh
$ bower install LostInBrittany/granite-ink --save
```

Or [download as ZIP](https://github.com/LostInBrittany/granite-ink/archive/gh-pages.zip).

## Usage

1. Import Web Components' Loader polyfill (if needed):

    ```html
        <script src="node_modules/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    ```

2. Import Custom Element:

    ```html
    <script rel="module" href="node_modules/granite-ink/granite-ink.js"></script>
    ```

3. Start using it!

    ```html
    <granite-ink>
    </granite-ink>
    ```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

[MIT License](http://opensource.org/licenses/MIT)
