/* eslint-disable @typescript-eslint/no-explicit-any */
import { IProvider, log } from '@web3auth/base'

export const getAccounts = async (provider: IProvider): Promise<string | undefined> => {
  try {
    const accounts = await provider.request<never, string[]>({ method: 'eth_accounts' })
    return accounts?.[0]
  } catch (error) {
    log.error('Error', error)
    // uiConsole('error', error instanceof Error ? error.message : error)
    return ''
  }
}

export const signPersonalMessage = async (
  provider: IProvider
): Promise<{ signedMessage: string }> => {
  try {
    const originalMessage = 'Example `personal_sign` messages'
    const from = await getAccounts(provider)
    // Sign the message
    const signedMessage = await provider.request<[string, string?], string>({
      method: 'personal_sign',
      params: [originalMessage, from]
    })

    return { signedMessage: signedMessage ?? '' }
    // uiConsole(`Success`, { signedMessage, verify: valid })
  } catch (error) {
    log.error('Error', error)
    // uiConsole('Error', error instanceof Error ? error.message : error)
    return { signedMessage: '' }
  }
}
