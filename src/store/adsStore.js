import { create } from "zustand";
import { API_URL } from "../../constants.js";

const useAdsStore = create((set, get) => ({
  // State
  ads: {
    adcode_1: [],
    adcode_2: [],
    adcode_3: [],
    ingamead: null,
    yellowboardad: null,
    redboardad: null,
  },
  socialLinks: {
    facebook: "",
    tiktok: "",
    instagram: "",
    youtube: "",
    telegram: "",
  },
  loading: false,
  error: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setAds: (ads) => set({ ads }),
  setSocialLinks: (socialLinks) => set({ socialLinks }),

  // Fetch ads data
  fetchAds: async () => {
    try {
      set({ loading: true, error: null });

      const response = await fetch(`${API_URL}/ads`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          // No ads found, continue with empty state
          set({ loading: false });
          return;
        }
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.message || "Failed to fetch ads");
      }

      set({
        ads: data.ads || {
          adcode_1: [],
          adcode_2: [],
          adcode_3: [],
          ingamead: null,
          yellowboardad: null,
          redboardad: null,
        },
        socialLinks: data.ads?.socialLinks || {
          facebook: "",
          tiktok: "",
          instagram: "",
          youtube: "",
          telegram: "",
        },
        loading: false,
      });
    } catch (err) {
      console.error("Error fetching ads:", err);
      set({
        error: err.message,
        loading: false,
      });
    }
  },

  // Get current image for rotation (for arrays)
  getCurrentImage: (adType, currentIndex = 0) => {
    const { ads } = get();
    const adImages = ads[adType];

    if (Array.isArray(adImages) && adImages.length > 0) {
      return adImages[currentIndex % adImages.length];
    }

    return null;
  },

  // Get single image (for non-array types)
  getSingleImage: (adType) => {
    const { ads } = get();
    return ads[adType];
  },
}));

export default useAdsStore;
