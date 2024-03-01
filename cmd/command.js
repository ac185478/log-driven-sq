const {Command, OptionValues } = require("commander");

const program = new Command();
const {routeCommands} = require("./routeCommands");
// Unzip diag to specified output path
// program
//     .command('unzip <zippedFile> <outPath>') // define phrase used to call the command
//     .alias('u') // set an optional alias to the command
//     .description(
//         'For the first command, provide the path of the zipped file that you\'d like to unzip.' +
//         '\nFor the second command, provide the path of the output location for the unzipped file.'
//         ) // displayed in the help output
//     .action((zippedFile: string, outPath: string) => {
//         unzip(zippedFile, outPath)
//     }) // command arguments are passed to functions that carry out the command

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

// program
//     .command('generateSD <path>')
//     .alias('g')
//     .description(
//         'Generates a sequence diagram for the .mmd given by the path.'
//     )
//     .action((path: string) => {
//         generateSVG(path);
//     })

// // Boot up the server with a host and port input selection
// program
//     .command('server [host] [port]')
//     .description(
//         'Running SCOX-Diag in Server Mode'
//         ) // displayed in the help output
//     .action(async (host:string, port:number) => {
//         console.log('Starting Server...');
//         index(host, port);
//     });

// // single and multi filtering
// program
//     .command('filter <logPath>')
//     //TODO accept different combinations of startTime and endTime
//     .option('-t, --time <times...>', 'time range to filter with')
//     .option('-d, --domain <domains...>', 'domain(s) to filter with')
//     .option('-s, --state <states...>', 'state transition(s) to filter with')
//     .option('-e, --endpoint <endpoints...>', 'endpoint(s) to filter with')
//     .description(
//         'handles single and multi filtering \n'
//         + '\t time: [--time | -t] startTime endTime \n'
//         + '\t domain: [--domain | -d] domain_1 ... domain_n \n'
//         + '\t endpoint: [--endpoint | -e] endpoint_1 \n'
//         + '\t **IN DEV** \n' 
//         + '\t state: [--state | -s] state_1 state_2 \n'
//         + 'SYNTAX IS AS FOLLOWS: \n'
//         + '\t npm start filter -- [options] -- <logPath>'
//     )
//     .action((logPath: string, options: OptionValues) => {
//         filterHandler(logPath, options);
//     })


// // command to create a JIRA Ticket (Bug). 
// program
//     .command('createJira')
//     .requiredOption('-s, --summary <summary>', 'a concise summary of the bug being made')
//     .requiredOption('-d, --description <description>', 'a detailed description of the bug being made')
//     .requiredOption('-r, --reproduce <steps>', 'steps needed to reproduce the bug')
//     .requiredOption('-p, --priority <priority>', 'the priority of the issue (P1 | P2 | P3 | P4)', 'P4')
//     .requiredOption('-c, --components <components...>', 'assigned component', 'MachineDownDiagTool')
//     .requiredOption('-sev, --severity <severity>', 'the severity level of the bug (S1 | S2 | S3 | S4)', 'S4')
//     .requiredOption('-dis, --discovery <stage>', 'when and by whom the bug was discovered.', 'None')
//     .option('-a, --attachments <attachments...>', 'attachments to include in the JIRA Ticket.')
//     .description(
//         'This command creates a new JIRA Ticket as a bug '
//         + 'with the given summary, description, steps to reproduce, priority, components, severity, and actual discovery stage. '
//         + 'If no severity is given, the lowest severity of S4 will be assigned.'
//         + 'If no discovery stage is given, this value will be "None."'
//         + 'If no priority is given, this value will be "P4."'
//         + 'If no component is given, this value will be "MachineDownDiagTool."'
//         + 'The bug will be assigned to SCOX, and its responsible '
//         + 'organizations will be Self Checkout + Machine Down Diag Tool.'
//     )
//     .action((options: OptionValues) => {
//         jiraHandler(options);
//     })

exports.program = program;