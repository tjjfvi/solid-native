// @ts-nocheck

const _reactPreset = require("@babel/preset-react").default;
const _solidPreset = require("babel-preset-solid");
const template = require("@babel/template").default;

const importSource = "solid-native"

const wrapComponent = template.expression(`
require("${importSource}").wrapSolidJsxComponent(EXPR, NAME)
`);

const wrapFunctionDeclaration = template(`
function NAME(props){
  return COMP(props)
}
const COMP = require("${importSource}").wrapSolidJsxComponent(
  function NAME( ARGS ){ BODY },
  undefined,
  NAME,
)
`);

module.exports = function main(babel, opts) {
  let $isComponent = Symbol("isComponent");
  let $name = Symbol("name");
  return {
    presets: [
      [wrapPreset(_solidPreset, "solid"), opts?.solid ?? {}],
      [wrapPreset(_reactPreset, "react"), opts?.react ?? {}],
    ],
    plugins: [
      wrapPlugin(
        ({ types: t }) => ({
          visitor: {
            Function: {
              enter(path, state) {
                if (state.inComponent) return;
                if ($isComponent in path.node) return;
                if (t.isMethod(path.node)) return;
                let hasJsx = false;
                path.traverse({
                  Function(path) {
                    path.skip();
                  },
                  JSX() {
                    hasJsx = true;
                  },
                });
                state.inComponent = path.node[$isComponent] = hasJsx;
                if (!hasJsx) return;
                let name = path.node.id && t.stringLiteral(path.node.id.name);
                let p = path;
                while (!name) {
                  if (t.isVariableDeclarator(p.parent))
                    name = t.stringLiteral(p.parent.id.name);
                  else if (
                    t.isCallExpression(p.parent) ||
                    t.isAssignmentExpression(p.parent)
                  )
                    p = p.parentPath;
                  else break;
                }
                path.node[$name] = name;
              },
              exit(path, state) {
                if (!path.node[$isComponent]) return;
                state.inComponent = false;
                if (t.isExpression(path.node)) {
                  path.node[$isComponent] = false;
                  path.replaceWith(
                    wrapComponent({
                      EXPR: path.node,
                      NAME: path.node[$name] ?? t.identifier("undefined"),
                    })
                  );
                } else {
                  let statements = wrapFunctionDeclaration({
                    NAME: path.node.id,
                    ARGS: path.node.params,
                    BODY: path.node.body,
                    COMP: path.scope.generateUidIdentifier(path.node.id.name),
                  });
                  path.replaceWith(statements[0]);
                  path.insertAfter(statements.slice(1));
                }
              },
            },
          },
        }),
        "solid"
      ),
    ],
  };
};

function wrapPreset(_preset, mode) {
  return (babel, opts) => {
    let preset = _preset(babel, opts);
    preset.plugins = preset.plugins.map((plugin) => {
      if (typeof plugin === "function") return wrapPlugin(plugin, mode);
      if (mode === "solid") plugin[1].moduleName = importSource;
      return [wrapPlugin(plugin[0], mode), plugin[1]];
    });
    return preset;
  };
}

function wrapPlugin(fn, onlyMode) {
  return (babel, opts) => {
    let plugin = fn(babel, opts);
    let visitor = plugin.visitor;
    let oldVisitorProgram = plugin.visitor?.Program ?? {};
    let symb = Symbol();
    plugin.visitor.Program = {
      enter(path, state) {
        let mode = getMode(path);
        if (!(state[symb] = mode === onlyMode)) {
          return;
        }
        let enter =
          typeof oldVisitorProgram === "function"
            ? oldVisitorProgram
            : oldVisitorProgram?.enter;
        enter?.(path, state);
      },
      exit(path, state) {
        if (!state[symb]) return;
        oldVisitorProgram?.exit?.(path, state);
      },
    };
    for (let x in visitor) {
      if (x === "Program") continue;
      let oldEntry = visitor[x];
      let newEntry = (visitor[x] = {});
      if (typeof oldEntry === "function") oldEntry = { enter: oldEntry };
      if (oldEntry.enter)
        newEntry.enter = (path, state) => {
          if (!state[symb]) return;
          oldEntry.enter(path, state);
        };
      if (oldEntry.exit)
        newEntry.exit = (path, state) => {
          if (!state[symb]) return;
          oldEntry.exit(path, state);
        };
    }
    return plugin;
  };
}

function getMode(path) {
  for (let comment of path.node.innerComments ??
    path.node.body[0]?.leadingComments ??
    []) {
    if (comment.value.includes("@react")) return "react";
    if (comment.value.includes("@solid")) return "solid";
  }
  return "react";
}
