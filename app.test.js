global.appRoot = require('path').resolve(__dirname);

const schemas = require('./resources/Schemas/SchemasHandler');
const config = require('./resources/config');
const { TestWatcher } = require('jest');
const workflow412 = require('./resources/Dictionaries/workflow412');
const { assert } = require('console');
const Logger = require('./bin/components/Logger').create(config);
const Common = require('./bin/components/Common').create(config, Logger, schemas);
const WorkflowApp = require('./bin/components/WF').create(Common);


test('Validate add a comment at each level', async() => {

    try {

    // Constants
    const wfUsername = 'sa';
    const wfPassword = 's';
    const recipeName = 'SIM-Numbers-ScientificFormats';
    const OPComment = 'OP Comment';
    const UPComment = 'this is a new UP COMMENT';
    const PRCComment = 'PRC Comment';
    const PSComment = 'PS Comment';
    const MRComment = 'New Master Recipe Comment';

    // Adding comments to each level
    await WorkflowApp.OpenWorkFlow(wfUsername, wfPassword);
    await WorkflowApp.OpenRecipe(recipeName);
    await WorkflowApp.AddUPLevelComment(UPComment);
    await WorkflowApp.AddOPLevelComment(OPComment);
    // await WorkflowApp.AddMRLevelComment(MRComment);
    // await WorkflowApp.AddPRCLevelComment(PRCComment);
    // await WorkflowApp.AddPSLevelComment(PSComment);  

    
    // Validating comments added in each level
    expect(await WorkflowApp.GetLastCommentAdded('OP')).toBe(OPComment);
    expect(await WorkflowApp.GetLastCommentAdded('UP')).toBe(UPComment);
    //expect(await WorkflowApp.GetLastCommentAdded('PRC')).toBe(PRCComment);
    //expect(await WorkflowApp.GetLastCommentAdded('PS')).toBe(PSComment);
    //expect(await WorkflowApp.GetLastCommentAdded('MR')).toBe(MRComment);

    // Close puppeter instance
    await WorkflowApp.BrowserInstance.close();
        
    } catch (err) {
         await WorkflowApp.BrowserInstance.close();
         expect(err).toBe("UNKNOWN ERROR");
    }

}, 200000)