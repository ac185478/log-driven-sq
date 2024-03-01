const {program} =require("./cmd/command");

// reads through command line to decide which subcommand to run (subcommands are in the lib folder and in command.ts)
program.parse(process.argv)
