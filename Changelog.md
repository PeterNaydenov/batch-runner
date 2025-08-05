# Release History



### 2.3.1 (??) - in development
- [x] Define a dependencies during the definition;



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