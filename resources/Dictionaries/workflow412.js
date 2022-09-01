module.exports = {
    LOGIN: {
        INPUTS: {
            USERNAME: 'input[id=txtUserName]',
            PASSWORD: 'input[id=txtPassword]'
        }
    },
    DASHBOARD: {
        BUTTONS: {
            CLEAR_FILTER: 'button[id=btnClearFilter]',
            OPEN_WF_INSTANCE: 'button[title="Open the workflow instance"]'
        },
        INPUTS: {
            FILTER: 'input[id=txtSearch]'
        }
    },
    EXECUTION_VIEW: {
        BUTTONS: {
            EXPAND_RECIPE_LEVELS: '.activity-box-parent-expander',
            WF_PROPERTIES: '//*[@id="divWorkflowInstanceToolbar"]/div[2]/span[13]', // xpath value
            OP_PROPERTIES: '//*[@id="divCurrentActivitiesList"]/div/div/div/div', // xpath value
            UP_PROPERTIES: '//*[@id="divCurrentActivitiesList"]/div[1]/div[3]/div', // xpath value
            PRC_PROPERTIES: '//*[@id="divCurrentActivitiesList"]/div[1]/div[2]/div', // xpath value
            PS_PROPERTIES: '//*[@id="divCurrentActivitiesList"]/div[1]/div[1]/div', // xpath value
        },
        WF_PROPERTIES: {
            BUTTONS: {
                WF_COMMENTS: '#divWorkflowInstancePropertiesContainer > div.wf-inst-container.height-stretch.emr-ui-tabs-container.emr-ui-tabs-vertical.wf-inst-execution > ul > li:nth-child(6)',
                WF_ADD_NEW_COMMENT: 'button[title="Add a new comment"]',
                WF_ADD_COMMENT: 'button[title="Add Comment"]'
            },
            SELECTS: {
                WF_COMMENT_TYPE: '#divWorkflowInstancePropertiesContainer > div.wf-inst-container.height-stretch.emr-ui-tabs-container.emr-ui-tabs-vertical.wf-inst-execution > div:nth-child(8) > div > div.wf-inst-comments-list-container > form > select'
            },
            INPUTS: {
                WF_COMMENT_TEXT: '#divWorkflowInstancePropertiesContainer > div.wf-inst-container.height-stretch.emr-ui-tabs-container.emr-ui-tabs-vertical.wf-inst-execution > div:nth-child(8) > div > div.wf-inst-comments-list-container > form > textarea'
            }
        },

        UPPER_LEVELS_MODAL: {
            BUTTONS: {
                CLOSE_MODAL: 'button[title="Close"]',
                COMMENTS: '/html/body/div[1]/div[1]/main/div[5]/div/div[1]/div[3]/span[3]/span[1]', // xpath value
                ADD_NEW_COMMENT: 'div.activity-page-collection-container.activity-page-collection-comments.displayed > div.activity-page-collection-content > div > button',
                ADD_COMMENT: '/html/body/div[1]/div[1]/main/div[5]/div/div[2]/div[4]/div[1]/form/div/button[2]' // xpath value
            },
            SELECTS: {
                COMMENT_TYPE: 'div.activity-page-collection-container.activity-page-collection-comments.displayed > div.activity-page-collection-content > form > select'
            },
            INPUTS: {
                COMMENT_TEXT: 'div.activity-page-collection-container.activity-page-collection-comments.displayed > div.activity-page-collection-content > form > textarea'
            }
        }
    }
}