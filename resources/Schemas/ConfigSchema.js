module.exports = {
	type: "object",
	properties: {
		Logs: {
			type: "object",
			properties: {
				Level: { type: "string" },
				FileName: {
					type: "object",
					properties: {
						Name: { type: "string", minLength: 3 },
						DatePattern: { type: "string" }
					},
					additionalProperties: false,
					required: ["Name", "DatePattern"]
				},
				DateFormat: { type: "string" },
				MaxSize: {
					type: "object",
					properties: {
						Value: { type: "string" },
						Unit: { type: "string" }
					},
					additionalProperties: false,
					required: ["Value", "Unit"]
				},
				MaxFiles: {
					type: "object",
					properties: {
						Value: { type: "string" },
						Type: { type: "string" }
					},
					additionalProperties: false,
					required: ["Value", "Type"]
				},
				Backup: {
					type: "object",
					properties: {
						RequireBackup: { type: "boolean" },
						BackupFolderName: { type: "string" }
					},
					additionalProperties: false,
					required: ["RequireBackup", "BackupFolderName"]
				},
				ZippedLogFile: { type: "boolean" }
			},
			additionalProperties: false,
			required: ["Level", "FileName", "DateFormat", "MaxSize", "MaxFiles", "Backup", "ZippedLogFile"]
		},
		WFServer: { type: "string" },
		WFEndPoints: {
			type: "object",
			properties: {
				Dashboard: { type: "string" },
				ExecutionView: { type: "string" }
			},
			additionalProperties: false,
			required: ["Dashboard", "ExecutionView"]
		},
	},
	additionalProperties: false
};