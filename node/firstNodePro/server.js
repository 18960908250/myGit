const http  = require('http')
const url = require('url')
http.createServer((request, response) => {
    response.writeHead(200,{'content-type': 'text/plain'});
    response.write('hello,world\n')
    response.end()
}).listen(8888)
console.log('server running at http://127.0.0.1:8888/')
const fs = require('fs')
/*var a=0;
var b=0;
process.stdin.resume()
process.stdout.write(`请输入a`)
process.stdin.on('data',function(chunk){
    if(!a) {
        a = Number(chunk)
        if (!a) {
            process.stdout.write(`请输入a`)
            return
        }
        process.stdout.write(`请输入b`)
    } else {
        b = Number(chunk)
        process.stdout.write(`结果为：${a+b}`)
    }
})*/
/*var fs = require('fs')
var filename = '1.txt'

fs.exists(filename, function (isExists) {
    if (!isExists) {
        fs.writeFile(filename, 'hello', function () {
            console.log(arguments)
        })
        console.log(`新建文件成功`)
    } else {
        fs.appendFile(filename,'-izaya', function () {
            console.log(arguments)
        })
        console.log(`修改文件成功`)
    }
})*/
// 基础脚手架
/*
const projectData = {
    fileList:[{
            name: 'project',
            type: 'dir',
            childen: [
                {
                    name: 'css',
                    type: 'dir'
                },
                {
                    name: 'images',
                    type: 'dir'
                },
                {
                    name: 'js',
                    type: 'dir'
                },
                {
                    name: 'index.html',
                    type: 'file',
                    content: `<html>\n\t<head>\n\t\t<title>project</title>\n\t</head>\n\t<body>hello</body>\n</html>`
                }
            ]
        }]
}
function start(projectName = '') {
    projectName = projectName.replace(/(\r\n)|(\n)/g, '')
    projectData.fileList.forEach(item => {
        createdFile(item,projectName)
        if(item.childen && item.childen.length > 0) {
            item.childen.forEach(items => {
                createdFile(items,'', `${projectName}/`)
            })
        }
    })
}
function createdFile(item,projectName = '', path = '') {
    item.content = item.content || ''
    const fileName = projectName || path + item.name
    switch (item.type) {
        case 'dir':
            fs.mkdirSync(`${fileName}`, err => { if(err) process.stdout.write('新建文件夹错误') })
            break;
        case 'file':
            fs.writeFileSync(`${fileName}`,item.content, err => { if(err) process.stdout.write('新建文件错误') })
            break;
        default:
            // console.log('')
            break;
    }
}
process.stdout.write('请输入项目名')
process.stdin.on('data',function(chunk){
    start(chunk.toString())
    process.exit();
})*/
// 文件打包
/*
const lisenerPaht = './source'
let num = 0
fs.watch(lisenerPaht,(err, filename) => {
    if (filename) {
        fs.readdir(lisenerPaht, (err, fileList) => {
            const targetArr = []
            if (fileList && fileList.length > 0) {
                fileList.forEach(item => {
                    const info = fs.statSync(`${lisenerPaht}/${item}`)
                    if (info.mode === 33206) {
                        const data = fs.readFileSync(`${lisenerPaht}/${item}`)
                        targetArr.push(data.toString())
                    }
                })
            }
            myPack(targetArr)
        })
    }
})
function myPack(targetArr) {
    let concent = ''
    targetArr.forEach(item => {
        concent += `${item}\n`
    })
    fs.writeFile('./myproject/js/index.js',concent,(err,file) =>{})
}*/
