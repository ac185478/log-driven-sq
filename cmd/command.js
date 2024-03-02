const {Command, OptionValues } = require("commander");

const program = new Command();
const {routeCommands} = require("./routeCommands");
// Run scox tracer and subcommands
program
    .command('scoxtracer <path>') // define phrase used to call the command
    .alias('t') // set an optional alias to the command
    .description(
        'creates .mmd and .log files from the given log \n'
        + '\t using a whole log: [--process | -p] startTime endTime \n'
        + '\t using a subset of a log (presumably after filtering): [--processSub | -s] domain_1 ... domain_n'
        ) // displayed in the help output
    .action((path) => {
        routeCommands(path);
    }) // command arguments are passed to functions that carry out the command

exports.program = program;