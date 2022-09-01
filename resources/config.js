module.exports = {
    Logs: {
        Level: 'DEBUG', // ERROR, INFO O DEBUG
        FileName: {
            Name: 'puppeeter-test-wf412',
            DatePattern: 'YYYY-MM-DD-HH'
        },
        DateFormat: 'YYYY-MM-DD HH:mm:ss.SSS',
        MaxSize: {
            Value: '50',
            Unit: 'm' //(Kilobytes(k), Megabytes(m), Gigabytes(g))
        },
        MaxFiles: {
            Value: '10',
            Type: 'f' //Type by file or day (Days(d), Files(f))
        },
        Backup: {
            RequireBackup: true,
            BackupFolderName: 'BackupLogs'
        },
        ZippedLogFile: false
    },
    WFServer: 'https://usbra-306sh:8081',
    WFEndPoints: {
        Dashboard: '/emrwf',
        ExecutionView: '/EMRWF/WorkflowInstance/{0}'
    }
}