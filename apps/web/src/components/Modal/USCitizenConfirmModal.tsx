import { usePreviousValue } from '@iguanadex/hooks'
import { useTranslation } from '@iguanadex/localization'
import { Link, Text } from '@iguanadex/uikit'
import DisclaimerModal, { CheckType } from 'components/DisclaimerModal'
import { useActiveChainId } from 'hooks/useActiveChainId'
import { IdType, useUserNotUsCitizenAcknowledgement } from 'hooks/useUserIsUsCitizenAcknowledgement'
import { useRouter } from 'next/router'
import { memo, useCallback, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { getPerpetualUrl } from 'utils/getPerpetualUrl'

interface USCitizenConfirmModalProps {
  id: IdType
  title: string
  checks?: CheckType[]
  onDismiss?: () => void
}

const USCitizenConfirmModal: React.FC<React.PropsWithChildren<USCitizenConfirmModalProps>> = ({
  id,
  title,
  checks,
  onDismiss,
}) => {
  const {
    t,
    currentLanguage: { code },
  } = useTranslation()
  const { pathname } = useRouter()
  const previousPathname = usePreviousValue(pathname)
  const [, setHasAcceptedRisk] = useUserNotUsCitizenAcknowledgement(id)
  const { chainId } = useActiveChainId()
  const { isDark } = useTheme()

  const handleSuccess = useCallback(() => {
    setHasAcceptedRisk(true)
    if (id === IdType.PERPETUALS) {
      const url = getPerpetualUrl({ chainId, languageCode: code, isDark })
      window.open(url, '_blank', 'noopener noreferrer')
    }
    onDismiss?.()
  }, [id, setHasAcceptedRisk, onDismiss, chainId, code, isDark])

  useEffect(() => {
    if (previousPathname && pathname !== previousPathname) {
      onDismiss?.()
    }
  }, [pathname, previousPathname, onDismiss])

  return (
    <DisclaimerModal
      modalHeader={title}
      id={id}
      header={t('To proceed to %title%, please check the checkbox below:', { title })}
      checks={
        checks ?? [
          {
            key: 'checkbox',
            content: t(
              'I confirm that I am not from a prohibited jurisdiction and I am eligible to trade derivatives on this platform.',
            ),
          },
        ]
      }
      footer={
        <>
          <Text as="span">{t('By proceeding, you agree to comply with our')}</Text>
          <Link external m="0 4px" display="inline" href="/terms-of-service">
            {t('terms and conditions')}
          </Link>
          <Text as="span">{t('and all relevant laws and regulations.')}</Text>
        </>
      }
      onSuccess={handleSuccess}
      onDismiss={onDismiss}
      headerStyle={{ fontWeight: 400, fontSize: 18 }}
      footerStyle={{ fontWeight: 600, fontSize: 18 }}
    />
  )
}

export default memo(USCitizenConfirmModal)
