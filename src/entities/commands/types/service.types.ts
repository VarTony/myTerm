import { bufferEncoding } from "@fileSystem/types";

// Options
type pwdOptions = '-h';
type cdOptions = '-h';
type lsOptions = '-r' | '-a' | '-m' | '-h';
type rmOptions = '-r' | '-v' | '-t' | '-h';
type catOptions = bufferEncoding | '-h';
type mkdirOptions = '-h';
type touchOptions = '-h';
type cpOptions = '-r' | '-f' | '-b' | '-h';
type commandsOptions = pwdOptions | cdOptions | lsOptions | rmOptions | catOptions | mkdirOptions | touchOptions | cpOptions; 


type commands = 'cp' | 'cd' | 'ls' | 'cat' | 'rm' | 'mkdir' | 'touch' | 'help';
type helpCommand = commands;

export { commands, helpCommand, catOptions, commandsOptions }