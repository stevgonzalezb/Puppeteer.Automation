const puppeteer = require('puppeteer');
const util = require('../../../resources/util')
const WF_Dictionary = require('../../../resources/Dictionaries/workflow412')
const os = require('os');

class WorkFlowAutomation {
	constructor(Common) {
		this.Common = Common;
		this.BrowserInstance = null; 
		this.Page = null; 
	}

	async GetLastCommentAdded(commentLevel) {
		let self = this;

		try {

			let HTMLElement = null;
			let isMRLevel = false;
			let lastComment = null;

			switch(commentLevel) {
				case 'OP':
					HTMLElement = WF_Dictionary.EXECUTION_VIEW.BUTTONS.OP_PROPERTIES;
					break;
				case 'UP': 
					HTMLElement = WF_Dictionary.EXECUTION_VIEW.BUTTONS.UP_PROPERTIES;
					break;
				case 'PRC': 
					HTMLElement = WF_Dictionary.EXECUTION_VIEW.BUTTONS.PRC_PROPERTIES;
					break;
				case 'PS': 
					HTMLElement = WF_Dictionary.EXECUTION_VIEW.BUTTONS.PS_PROPERTIES;
					break;
				case 'MR': 
					HTMLElement = WF_Dictionary.EXECUTION_VIEW.BUTTONS.WF_PROPERTIES;
					isMRLevel = true;
					break;
			}

			if(!isMRLevel) {

				await self.Page.click(WF_Dictionary.EXECUTION_VIEW.BUTTONS.EXPAND_RECIPE_LEVELS);
				await self.Page.waitForTimeout(1000);
	
				(await util.getElementbyXpath(self, HTMLElement)).click();
				await self.Page.waitForTimeout(2000);
	
				(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.COMMENTS)).click();
				await self.Page.waitForTimeout(2000);

				lastComment = await self.Page.$$eval('span.comment-text', (spans) => spans[spans.length-1].innerHTML);

				await self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.CLOSE_MODAL);
				await self.Page.waitForTimeout(3000);

			} else {

				// Click on workflow properties button 
				(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.WF_PROPERTIES)).click();
				await self.Page.waitForTimeout(3000);

				// Click on workflow comments button
				await self.Page.click(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.BUTTONS.WF_COMMENTS);
				await self.Page.waitForTimeout(2000);

				lastComment = await self.Page.$$eval('span.comment-text', (spans) => spans[spans.length-1].innerHTML);

				// Click on workflow properties button 
				(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.WF_PROPERTIES)).click();
				await self.Page.waitForTimeout(2000);

			}

			return lastComment;

		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[GetLastCommentAdded] >> Error executing GetLastCommentAdded method: ${err}`);
			throw new Error(`[workflow412.js].[GetLastCommentAdded] >> Error executing GetLastCommentAdded method: ${err}`);
		}
	}

	async AddPSLevelComment(comment) {
		let self = this;

		try {
			
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.BUTTONS.EXPAND_RECIPE_LEVELS);
			await self.Page.waitForTimeout(1000);

			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.PS_PROPERTIES)).click();
			await self.Page.waitForTimeout(2000);

			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.COMMENTS)).click();
			await self.Page.waitForTimeout(2000);

			// If this it is not null, this is not the first comment added 
			if((await self.Page.$(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)) !== null) {
				// Click on Add a new comment button
				self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)
			}
			await self.Page.waitForTimeout(2000);

			await self.Page.select(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.SELECTS.COMMENT_TYPE, '3');
			await self.Page.waitForTimeout(2000);

			// Focus cursor on comment text area
			await self.Page.focus(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.INPUTS.COMMENT_TEXT)
			await self.Page.waitForTimeout(1000);

			// Types the comment text received by parameter
			await self.Page.keyboard.type(comment);

			// Click on Add Comment button
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_COMMENT )).click();
			await self.Page.waitForTimeout(2000);

			// Close modal
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.CLOSE_MODAL);
			await self.Page.waitForTimeout(3000);
			
		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[AddPSLevelComment] >> Error executing AddPSLevelComment method: ${err}`);
			throw new Error(`[workflow412.js].[AddPSLevelComment] >> Error executing AddPSLevelComment method: ${err}`);
		}

	}

	async AddPRCLevelComment(comment) {
		let self = this;

		try {

			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.BUTTONS.EXPAND_RECIPE_LEVELS);
			await self.Page.waitForTimeout(500);

			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.PRC_PROPERTIES)).click();
			await self.Page.waitForTimeout(2000);

			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.COMMENTS)).click();
			await self.Page.waitForTimeout(2000);

			// If this it is not null, this is not the first comment added 
			if((await self.Page.$(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)) !== null) {
				
				// Click on Add a new comment button
				self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)
			}
			await self.Page.waitForTimeout(2000);

			await self.Page.select(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.SELECTS.COMMENT_TYPE, '3');
			await self.Page.waitForTimeout(2000);

			// Focus cursor on comment text area
			await self.Page.focus(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.INPUTS.COMMENT_TEXT)
			await self.Page.waitForTimeout(1000);

			// Types the comment text received by parameter
			await self.Page.keyboard.type(comment);

			// Click on Add Comment button
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_COMMENT )).click();
			await self.Page.waitForTimeout(2000);

			// Close modal
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.CLOSE_MODAL);
			await self.Page.waitForTimeout(3000);
			
		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[AddPRCLevelComment] >> Error executing AddPRCLevelComment method: ${err}`);
			throw new Error(`[workflow412.js].[AddPRCLevelComment] >> Error executing AddPRCLevelComment method: ${err}`);
		}

	}

	async AddUPLevelComment(comment) {
		let self = this;

		try {

			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.BUTTONS.EXPAND_RECIPE_LEVELS);
			await self.Page.waitForTimeout(500);

			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.UP_PROPERTIES)).click();
			await self.Page.waitForTimeout(2000);

			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.COMMENTS)).click();
			await self.Page.waitForTimeout(2000);

			// If this it is not null, this is not the first comment added 
			if((await self.Page.$(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)) !== null) {
				
				// Click on Add a new comment button
				self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)
			}
			await self.Page.waitForTimeout(2000);

			await self.Page.select(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.SELECTS.COMMENT_TYPE, '3');
			await self.Page.waitForTimeout(2000);

			// Focus cursor on comment text area
			await self.Page.focus(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.INPUTS.COMMENT_TEXT)
			await self.Page.waitForTimeout(1000);

			// Types the comment text received by parameter
			await self.Page.keyboard.type(comment);

			// Click on Add Comment button
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_COMMENT )).click();
			await self.Page.waitForTimeout(2000);

			// Close modal
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.CLOSE_MODAL);
			await self.Page.waitForTimeout(3000);


		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[AddUPLevelComment] >> Error executing the AddUPLevelComment method: ${err}`);
			throw new Error(`[workflow412.js].[AddUPLevelComment] >> Error executing the AddUPLevelComment method: ${err}`);
		}
	}

	async AddOPLevelComment(comment) {
		let self = this;

		try {

			// Open the OP level
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.OP_PROPERTIES)).click();
			await self.Page.waitForTimeout(2000);

			// Click on comments button
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.COMMENTS )).click();
			await self.Page.waitForTimeout(3000);

			// If this it is not null, this is not the first comment added 
			if((await self.Page.$(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)) !== null) {
				
				// Click on Add a new comment button
				self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_NEW_COMMENT)
			}

			// Select the option number 3 in the "Select comment type" dropdown
			await self.Page.select(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.SELECTS.COMMENT_TYPE, '3');
			await self.Page.waitForTimeout(1000);

			// Focus cursor on comment text area
			await self.Page.focus(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.INPUTS.COMMENT_TEXT)
			await self.Page.waitForTimeout(1000);

			// Types the comment text received by parameter
			await self.Page.keyboard.type(comment);

			// Click on Add Comment button
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.ADD_COMMENT )).click();
			await self.Page.waitForTimeout(2000);

			// Close modal
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.UPPER_LEVELS_MODAL.BUTTONS.CLOSE_MODAL);
			await self.Page.waitForTimeout(3000);
		
		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[AddOPLevelComment] >> Error executing AddOPLevelComment method: ${err}`);
			throw new Error(`[workflow412.js].[AddOPLevelComment] >> Error executing AddOPLevelComment method: ${err}`);
		}
	}

	async AddMRLevelComment(comment) {
		let self = this;

		try {

			// Click on workflow properties button 
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.WF_PROPERTIES)).click();
			await self.Page.waitForTimeout(3000);

			// Click on workflow comments button
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.BUTTONS.WF_COMMENTS);
			await self.Page.waitForTimeout(2000);

			// If this it is not null, this is not the first comment added 
			if((await self.Page.$(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.BUTTONS.WF_ADD_NEW_COMMENT)) !== null) {
				
				// Click on Add a new comment button
				self.Page.click(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.BUTTONS.WF_ADD_NEW_COMMENT)
			}
			await self.Page.waitForTimeout(1000);

			// Select the option number 3 in the "Select comment type" dropdown
			await self.Page.select(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.SELECTS.WF_COMMENT_TYPE, '3')
			await self.Page.waitForTimeout(1000);

			// Focus cursor on comment text area
			await self.Page.focus(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.INPUTS.WF_COMMENT_TEXT)
			await self.Page.waitForTimeout(1000);
			
			// Types the comment text received by parameter
			await self.Page.keyboard.type(comment);
			await self.Page.waitForTimeout(1000);

			// Click on Add Comment button
			await self.Page.click(WF_Dictionary.EXECUTION_VIEW.WF_PROPERTIES.BUTTONS.WF_ADD_COMMENT);
			await self.Page.waitForTimeout(2000);

			// Click on workflow properties button 
			(await util.getElementbyXpath(self, WF_Dictionary.EXECUTION_VIEW.BUTTONS.WF_PROPERTIES)).click();
			await self.Page.waitForTimeout(2000);

		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[AddMRLevelComment] >> Error executing the AddMRLevelComment method: ${err}`);
			throw new Error(`[workflow412.js].[AddMRLevelComment] >> Error executing the AddMRLevelComment method: ${err}`);
		}

	}

	async OpenRecipe(recipeName) {
		
		let self = this;

		try {
			// Cleans the search input, since always saved the last item searched
			await self.Page.click(WF_Dictionary.DASHBOARD.BUTTONS.CLEAR_FILTER);

			// Types the recipe name to be searched
			await self.Page.type(WF_Dictionary.DASHBOARD.INPUTS.FILTER , recipeName);
			await self.Page.waitForTimeout(2000);

			// Select the first workflow of the list
			await self.Page.evaluate(() => {
				document.querySelector('.workflow-card').click();
			});
			await self.Page.waitForTimeout(2000);

			// Click on Open the workflow instance button 
			await self.Page.click(WF_Dictionary.DASHBOARD.BUTTONS.OPEN_WF_INSTANCE);
			await self.Page.waitForTimeout(7000);
			
		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[OpenRecipe] >> Error executing the OpenRecipe method: ${err}`);
			throw new Error(`[workflow412.js].[OpenRecipe] >> Error executing the OpenRecipe method: ${err}`);
		}
	}

	async OpenWorkFlow(username, password) {
		let self = this;

		try {
			
			// Save the browser instance in the global variable
			self.BrowserInstance = await StartBrowser(); 

			// Create a new page/tab in the browser instance
			self.Page = await self.BrowserInstance.newPage();

			// Redirect the new page/tab to Workflow URL
			await self.Page.goto(`${self.Common.Config.WFServer}${self.Common.Config.WFEndPoints.Dashboard}`);
			await self.Page.waitForTimeout(5000);

			// Login Workflow
			await LoginWorkFlow(self, username, password)
			await self.Page.waitForTimeout(5000);
			
		} catch (err) {
			self.Common.Logger.Error(`[workflow412.js].[OpenWorkFlow] >> Error executing OpenWorkFlow method: ${err}`);
			throw new Error(`[workflow412.js].[OpenWorkFlow] >> Error executing OpenWorkFlow method: ${err}`);
		}
	}
}

async function LoginWorkFlow(self, username, password) {

	//let self = this;

	try {

		// Fills username input with parameter received
		await self.Page.type(WF_Dictionary.LOGIN.INPUTS.USERNAME , username);

		// Fill password input with parameter received
		await self.Page.type(WF_Dictionary.LOGIN.INPUTS.PASSWORD, password);

		// Press enter key to login
		await self.Page.keyboard.press("Enter");
		await self.Page.waitForTimeout(3000);
		
	} catch (err) {
		self.Common.Logger.Error(`[workflow412.js].[LoginWorkFlow] >> Error executing the LoginWorkFlow method: ${err}`);
		throw new Error(`[workflow412.js].[LoginWorkFlow] >> Error executing the LoginWorkFlow method: ${err}`);
	}
}

async function StartBrowser() {
	try {

		// Launch the browser that woulb be used to exec the puppeteer test
		const browser = await puppeteer.launch({ 
			headless: false, // False: Shows browser - True: Silent mode
			ignoreHTTPSErrors: true, // Avoid HTTPS error
			defaultViewport: null,
			executablePath: `C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe`, // Path to the specific browser to use, if not it would use chromium
			args: ['--start-maximized'] 
		});
		return browser;
	} catch (err) {
		throw new Error(`Browser instance cannot be created: ${err.message}`);
	}
}

module.exports = WorkFlowAutomation;