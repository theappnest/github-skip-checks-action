import * as core from '@actions/core'
import multimatch from 'multimatch'
import { getChangedFiles } from './changedFiles'
import { skipChecks } from './skipChecks'

async function run(): Promise<void> {
  try {
    const token = core.getInput('token', { required: true })
    const paths = core.getInput('paths', { required: true })
    const checks = core.getInput('checks', { required: true })

    const globs = paths.split('\n').map((item) => item.trim())
    const files = await getChangedFiles(token)

    if (!multimatch(files, globs).length) {
      const skippedChecks = checks.split('\n').map((item) => item.trim())
      await skipChecks(token, skippedChecks)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
