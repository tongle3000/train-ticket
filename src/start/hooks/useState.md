##  useState

    useState 调用,不能在循环语句,块中调用;不能多调用和少调用,要和定义的数量一致.

    

##  安装: npm i eslint-plugin-react-hooks -D , 运行后,浏览器端 可以 提示 上面不规则情况的 错误. 本机安装报错,后面执行不要 -D,不会报错;  

 -> package.json 设置:

    "eslintConfig": {
        "extends": "react-app",
        "plugins": [
        "react-hooks"
        ],
        "rules": {
        "react-hooks/rules-of-hooks":"error"
        }
    },

