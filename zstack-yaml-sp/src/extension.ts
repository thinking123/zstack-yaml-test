/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import * as zstackTypes from './zstack/graphql';
import { resources } from './zstack/constants';
import completion from './completion'
import diagnostic from './diagnostics'
import semantic from './semantic-highlighting'

interface Var {
	resourceName: string
	varName: string
}
export function activate(context: vscode.ExtensionContext) {

	completion(context)
	diagnostic(context)
	semantic()
}
