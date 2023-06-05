const path = require('path');
const fs = require('fs');
const helpers = require('./helpers');

// interface ICommand {
    // private commands: {};
// }

class Commands {
    public static commands = {
     'ls' : this.ls,
     'cd': this.cd,
     'pwd' : this.pwd,
     'touch' : this.touch,
     'rm' : this.rm,
     'cat' : this.cat,
     'help' : this.help
    }

    private static async ls(userName: string) { }


    private static async cd(userName: string) { }


    private static async pwd(userName: string) {
        const result = __dirname;  
        
        return { result }
    }

    private static async touch(userName: string) { }

    private static async rm(userName: string) { }

    private static async cat(userName: string) { }

    private static async help(userName: string) {}
} 