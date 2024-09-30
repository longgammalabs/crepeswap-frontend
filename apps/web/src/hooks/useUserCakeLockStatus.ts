export const useUserCakeLockStatus = () => {
  const userCakeLockStatus = false

  return userCakeLockStatus
}

// export const useUserCakeLockStatus = () => {
//   const { address: account } = useAccount()
//   const { chainId } = useActiveChainId()
//   const cakeVaultContract = useCakeVaultContract()

//   const { data: userCakeLockStatus = null } = useQuery({
//     queryKey: ['userCakeLockStatus', account],

//     queryFn: async () => {
//       if (!account) return undefined
//       const [, , , , , lockEndTime, , locked] = await cakeVaultContract.read.userInfo([account])
//       const lockEndTimeStr = lockEndTime.toString()
//       return locked && (lockEndTimeStr === '0' || Date.now() > parseInt(lockEndTimeStr) * 1000)
//     },

//     enabled: Boolean(account && chainId === ChainId.BSC),
//     refetchOnMount: false,
//     refetchOnWindowFocus: false,
//     refetchOnReconnect: false,
//   })
//   return userCakeLockStatus
// }
