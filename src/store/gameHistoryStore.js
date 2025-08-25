import { create } from "zustand";
import { API_URL, GAME_CUT_PERCENTAGE } from "../../constants.js";

const useGameHistoryStore = create((set, get) => ({
  // State
  gameHistory: [],
  loading: false,
  error: null,

  // Actions
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  setGameHistory: (gameHistory) => set({ gameHistory }),

  // Fetch game history
  fetchGameHistory: async (userId, token) => {
    try {
      set({ loading: true, error: null });

      if (!token) {
        throw new Error(
          "No authentication token provided. Please log in again."
        );
      }

      console.log(`[Store] Fetching from: ${API_URL}/games/history`);
      console.log(`[Store] Token:`, token ? "Present" : "Missing");

      const response = await fetch(`${API_URL}/games/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(`[Store] Response status:`, response.status);
      console.log(`[Store] Response ok:`, response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`[Store] Response error:`, errorText);
        throw new Error(
          `Failed to fetch game history: ${response.status} ${errorText}`
        );
      }

      const data = await response.json();

      console.log("Raw game history data:", data);
      console.log("Current userId:", userId);

      // Transform the data to match our component's expected format
      const transformedHistory = data.games
        .map((game) => {
          // Check if current user participated in this game
          // userId is the database user ID, so we compare with game.user and players[].userId
          const userParticipated =
            game.user === userId ||
            (game.players && game.players.some((p) => p.userId === userId));

          console.log(
            `Game ${game._id}: user=${game.user}, players=`,
            game.players,
            `userParticipated=${userParticipated}`
          );

          // Only include games where user actually participated
          if (!userParticipated) return null;

          // Check if user won by comparing with winnerId (which should be database user ID)
          const isWinner = game.winnerId === userId;
          const hasBots = game.players && game.players.some((p) => p.isBot);
          const cutPercentage = GAME_CUT_PERCENTAGE; // Use constant from constants.js

          return {
            id: game._id,
            gameType: hasBots
              ? "Bot Match"
              : game.players && game.players.length === 2
              ? "2-Player Match"
              : "Multi-Player Match",
            result: isWinner ? "won" : "lost",
            amount: isWinner
              ? 2 * game.stake - (2 * game.stake * cutPercentage) / 100 // Use dynamic cut percentage
              : -game.stake, // Lost stake
            playerCount: game.players ? game.players.length : 2, // Default to 2 if not available
            date: new Date(game.createdAt).toISOString().split("T")[0],
            time: new Date(game.createdAt).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
            }),
            duration: get().calculateGameDuration(
              game.createdAt,
              game.updatedAt || game.createdAt
            ),
            stake: game.stake,
            roomId: game.roomId,
            players: game.players || [],
            hasBots: hasBots || false,
          };
        })
        .filter(Boolean); // Remove null values

      console.log("Transformed game history:", transformedHistory);
      console.log("Final game count:", transformedHistory.length);

      set({ gameHistory: transformedHistory, loading: false });
      return transformedHistory;
    } catch (err) {
      console.error("Error fetching game history:", err);
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  // Calculate game duration helper
  calculateGameDuration: (startTime, endTime) => {
    if (!startTime || !endTime) return "Unknown";

    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationMs = end - start;

    const minutes = Math.floor(durationMs / (1000 * 60));
    const seconds = Math.floor((durationMs % (1000 * 60)) / 1000);

    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Refresh game history
  refreshGameHistory: async (userId, token) => {
    if (userId && token) {
      return await get().fetchGameHistory(userId, token);
    }
  },

  // Reset store
  reset: () => set({ gameHistory: [], loading: false, error: null }),
}));

export default useGameHistoryStore;
