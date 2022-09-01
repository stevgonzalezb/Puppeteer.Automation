global.appRoot = require('path').resolve(__dirname);

const schemas = require('./resources/Schemas/SchemasHandler');
const config = require('./resources/config');
const workflow412 = require('./resources/Dictionaries/workflow412');
const Logger = require('./bin/components/Logger').create(config);
const Common = require('./bin/components/Common').create(config, Logger, schemas);
const WorkflowApp = require('./bin/components/WF').create(Common);


async function start() {
    // Set variables to run test 
    const wfUsername = 'sa';
    const wfPassword = 's';
    const recipeName = 'SIM-20210810-092504-3482';
    const OPComment = 'OP Comment';
    const UPComment = 'UP Comment';
    const PRCComment = 'PRC Comment';
    const PSComment = 'PS Comment';
    const MRComment = 'MR Comment';

    await WorkflowApp.OpenWorkFlow(wfUsername, wfPassword);
    await WorkflowApp.OpenRecipe(recipeName);
    await WorkflowApp.AddOPLevelComment(OPComment);
    // await WorkflowApp.AddMRLevelComment(MRComment);
    // await WorkflowApp.AddPRCLevelComment(PRCComment);
    // await WorkflowApp.AddPSLevelComment(PSComment);
    // await WorkflowApp.AddUPLevelComment(UPComment);

    await WorkflowApp.GetLastCommentAdded('UP');
    
    //self.BrowserInstance.close();

    console.log('End test');
}

start();
