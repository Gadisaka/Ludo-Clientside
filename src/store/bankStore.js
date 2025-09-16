import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { API_URL } from "../../constants.js";

const useBankStore = create(
  persist(
    (set, get) => ({
      banks: [],
      loading: false,
      error: null,

      // Set banks
      setBanks: (banks) => set({ banks }),

      // Clear error
      clearError: () => set({ error: null }),

      // Get all banks
      getAllBanks: async () => {
        try {
          set({ loading: true, error: null });

          const response = await axios.get(`${API_URL}/banks/`);

          if (response.data.success) {
            set({
              banks: response.data.banks,
              loading: false,
            });
            return response.data.banks;
          } else {
            throw new Error(response.data.message || "Failed to fetch banks");
          }
        } catch (error) {
          console.error("Error fetching banks:", error);
          set({
            error: error.response?.data?.message || "Failed to fetch banks",
            loading: false,
          });
          throw error;
        }
      },

      // Get banks by type (mobile or account)
      getBanksByType: async (type) => {
        try {
          set({ loading: true, error: null });

          const response = await axios.get(`${API_URL}/banks/type/${type}`);

          if (response.data.success) {
            set({
              banks: response.data.banks,
              loading: false,
            });
            return response.data.banks;
          } else {
            throw new Error(
              response.data.message || "Failed to fetch banks by type"
            );
          }
        } catch (error) {
          console.error(`Error fetching banks by type ${type}:`, error);
          set({
            error:
              error.response?.data?.message || "Failed to fetch banks by type",
            loading: false,
          });
          throw error;
        }
      },

      // Get bank by number
      getBankByNumber: async (number) => {
        try {
          set({ loading: true, error: null });

          const response = await axios.get(`${API_URL}/banks/number/${number}`);

          if (response.data.success) {
            set({ loading: false });
            return response.data.bank;
          } else {
            throw new Error(response.data.message || "Bank not found");
          }
        } catch (error) {
          console.error(`Error fetching bank by number ${number}:`, error);
          set({
            error: error.response?.data?.message || "Bank not found",
            loading: false,
          });
          throw error;
        }
      },

      // Get bank by ID (requires authentication)
      getBankById: async (id) => {
        try {
          set({ loading: true, error: null });

          const token = JSON.parse(localStorage.getItem("auth-storage"))?.state
            ?.token;

          if (!token) {
            throw new Error("No authentication token");
          }

          const response = await axios.get(`${API_URL}/banks/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });

          if (response.data.success) {
            set({ loading: false });
            return response.data.bank;
          } else {
            throw new Error(response.data.message || "Bank not found");
          }
        } catch (error) {
          console.error(`Error fetching bank by ID ${id}:`, error);
          set({
            error: error.response?.data?.message || "Bank not found",
            loading: false,
          });
          throw error;
        }
      },

      // Update bank details
      updateBankDetails: async (bankId, { number, accountFullName }) => {
        try {
          set({ loading: true, error: null });

          const token = JSON.parse(localStorage.getItem("auth-storage"))?.state
            ?.token;

          if (!token) {
            throw new Error("No authentication token");
          }

          const response = await axios.patch(
            `${API_URL}/banks/${bankId}/details`,
            { number, accountFullName },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (response.data.success) {
            // Update the bank in the local state
            const { banks } = get();
            const updatedBanks = banks.map((bank) =>
              bank._id === bankId
                ? {
                    ...bank,
                    number,
                    accountFullName,
                    updatedAt: response.data.bank.updatedAt,
                  }
                : bank
            );

            set({
              banks: updatedBanks,
              loading: false,
            });

            return response.data.bank;
          } else {
            throw new Error(
              response.data.message || "Failed to update bank details"
            );
          }
        } catch (error) {
          console.error("Error updating bank details:", error);
          set({
            error:
              error.response?.data?.message || "Failed to update bank details",
            loading: false,
          });
          throw error;
        }
      },

      // Refresh banks data
      refreshBanks: async () => {
        const { getAllBanks } = get();
        return await getAllBanks();
      },
    }),
    {
      name: "bank-storage",
      partialize: (state) => ({
        banks: state.banks,
      }),
    }
  )
);

export default useBankStore;
