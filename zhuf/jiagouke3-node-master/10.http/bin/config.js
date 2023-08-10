module.exports = {
    "port": {
        flags: "-p, --port <val>",
        descrption: "Port to use [8080]",
        default: 8080,
        usage:"zs --port 8080"
    },
    "directory": {
        flags: "-d, --directory <val>",
        descrption: "directory to use cwd",
        default: process.cwd(),
        usage:"zs --directory d:"
    }
}