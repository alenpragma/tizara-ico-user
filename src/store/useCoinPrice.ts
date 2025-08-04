// useWalletStore.ts
import { create } from 'zustand'
import axiosInstance from '../utils/axiosConfig'

interface IGeneralSettings {
    generalSettings: {
        coinPrice: number
        minCoin: number,
        maxCoin: number,
    } | null
    fetchGeneralSettings: () => Promise<void>
}

export const useGeneralSettings = create<IGeneralSettings>((set) => ({
    generalSettings: null,
    fetchGeneralSettings: async () => {
        const { data } = await axiosInstance.get('/general-settings')
        set({ generalSettings: data.data })
    },
}))
