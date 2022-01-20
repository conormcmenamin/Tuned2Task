let {PythonShell} = require('python-shell');
//you can use error handling to see if there are any errors

export function run_script(){
    PythonShell.run(__dirname+'/my_script.py',null,function(err,results){
        console.log(results);
        console.log('helloJS')
    });
}