import { context, getOctokit } from '@actions/github'
import { getReasonPhrase } from 'http-status-codes'

export async function skipChecks(
  token: string,
  checks: string[],
): Promise<void> {
  const octokit = getOctokit(token)

  let head: string | undefined

  switch (context.eventName) {
    case 'pull_request':
      head = context.payload.pull_request?.head?.sha
      break
    case 'push':
      head = context.payload.after
      break
    default:
      throw new Error(`Unsupported event: ${context.eventName}`)
  }

  if (!head) {
    throw new Error('Ref not found')
  }

  await Promise.all(
    checks.map(async (check) => {
      const response = await octokit.rest.checks.create({
        owner: context.repo.owner,
        repo: context.repo.repo,
        head_sha: head,
        status: 'completed',
        name: check,
        conclusion: 'success',
      })

      if (response.status !== 201) {
        throw new Error(getReasonPhrase(response.status))
      }
    }),
  )
}
