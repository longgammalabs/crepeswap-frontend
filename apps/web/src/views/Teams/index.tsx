import { useTranslation } from '@iguanadex/localization'
import { AutoRenewIcon, Flex, Heading } from '@iguanadex/uikit'
import { useQuery } from '@tanstack/react-query'
import Page from 'components/Layout/Page'
import orderBy from 'lodash/orderBy'
import { getTeams } from 'state/teams/helpers'
import TeamHeader from './components/TeamHeader'
import TeamListCard from './components/TeamListCard'

const Teams = () => {
  const { t } = useTranslation()
  const { data, status } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => getTeams(),
  })
  const teamList = data ? Object.values(data) : []
  const topTeams = orderBy(teamList, ['points', 'id', 'name'], ['desc', 'asc', 'asc'])

  return (
    <Page>
      <TeamHeader />
      <Flex alignItems="center" justifyContent="space-between" mb="32px">
        <Heading scale="xl">{t('Teams')}</Heading>
        {status !== 'success' && <AutoRenewIcon spin />}
      </Flex>
      {topTeams.map((team, index) => (
        <TeamListCard key={team.id} rank={index + 1} team={team} />
      ))}
    </Page>
  )
}

export default Teams
