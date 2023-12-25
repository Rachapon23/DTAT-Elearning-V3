exports.dev = {
    log: (...params) => {
        if (process.env.ENV === 'DEV') {
            console.log(_getFileName(), ...params)
        }
    },
    testAPI: (_, res) => {
        res.json({ data: 'OK' })
    }
}

const _getCallerPathFile = () => {
    try {
        const err = new Error();
        let callerFile;
        let currentFile;

        Error.prepareStackTrace = (_, stack) => {
            return stack
        }

        currentFile = err.stack.shift().getFileName();

        while (err.stack.length) {
            callerFile = err.stack.shift().getFileName();
            if (currentFile !== callerFile) return callerFile;
        }

    }
    catch (err) {
        return undefined
    }
}

const _getFileName = () => {
    const path = _getCallerPathFile();
    const splited = path ? path.split('\\') : null;
    if (!splited) return 'No caller:';
    const length = splited.length - 1 < 0 ? 0 : splited.length - 1;
    return `< ${splited[length]} >:`;
}