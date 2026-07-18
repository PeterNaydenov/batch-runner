# Release History



### 2.4.2 ( 2026-07-18)
- [x] Fix: Crashes when `source` returns `null`, a function, or any value that has `.length` but no `.entries()` (e.g. `HTMLCollection`, `arguments`). The data-wrapping check now uses `Array.isArray()` instead of `hasOwnProperty('length')`;
- [x] Fix: `define()` no longer throws on `null`, `undefined` or non-object input — it returns `false`, matching the rest of the validation path;
- [x] Change: Combined `batch.run({...})` (define-and-run in one call) now throws when the embedded batch definition is invalid, instead of silently returning `[]`;
- [x] Test: Added regression cases for `null` source, function source, array-like source, invalid combined batch, and a return-value assertion on the optional-source path. The "Define and run a batch" test was rewritten to actually exercise the "extra args flow to the job" contract;
- [x] Cleanup: Removed dead dev dependencies (`vue`, `@vitejs/plugin-vue`, `@peter.naydenov/dom-selector`, `@peter.naydenov/visual-controller-for-vue3`, `c8`), the unused `test-browser/` Vue scaffold, the `index.html` Vite dev page, and the `blueprint.md` file (which documented a different library);
- [x] Cleanup: Coverage is now configured in a single place (`vitest.config.js`). `npm run cover` works again via `@vitest/coverage-v8`;



### 2.4.1 ( 2026-04-08)
- [x] Dev depenedencies updates;
- [x] Moving from Cypress to vitest testing library;
- [x] Upgrading to vite v.8.x.x;
- [x] No changes in the code;



### 2.4.0 ( 2025-09-15)
- [x] Define job.final method to reshape or refine the final result;


### 2.3.0 ( 2025-08-05)
- [x] Source function declaration is optional;



### 2.2.1 ( 2025-08-05)
- [x] Fix: Missing build step;



### 2.2.0 ( 2025-08-05)
- [x] Source function also receives the extra arguments; 
- [ ] Bug: Missing build step;



### 2.1.1 ( 2025-08-05)
- [x] Fix: Breaks if source returns a string;



### 2.1.0 ( 2024-02-07)
- [x] Folder 'dist' was added to the project. Includes commonjs, umd and esm versions of the library;
- [x] Package.json: "exports" section was added. Allows you to use package as commonjs or es6 module without additional configuration;
- [x] Rollup was added to the project. Used to build the library versions;
- [ ] Bug: Breaks if source returns a string;



### 2.0.0 ( 2023-11-25)
- [x] Arguments for method run() were changed. First argument instead of item is an object {item,i,END }, where item is the current item, i is the current index, END is constant. If you want to stop data iteration you should return END constant.



### 1.0.2 ( 2023-11-21)
- [x] Type defintions;
- [x] Fix: Method run() should always return an array;



## 1.0.0 (2023-11-19)
- [x] Initial release
- [] Bug: Method run() should always return an array. When record not found, returns false;