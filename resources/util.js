let getElementbyXpath = async(self, xpath) => {
    try {
        const element = await self.Page.$x(xpath);   
        return element[0];

    } catch (error) {
        return self.Common.Logger.Error(`[util.js].[getElementbyXpath] >> Error executing getElementbyXpath method: ${err}`);
    }
}

module.exports = {
    getElementbyXpath: getElementbyXpath
}