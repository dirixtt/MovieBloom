import { createSlice } from "@reduxjs/toolkit";

// Определение типа состояния
interface CountState {
  count: number;
}

// Определение типов для действий
interface LikeAction {
  type: string;
}

interface UnlikeAction {
  type: string;
}

// Создание среза (slice)
export const countSlice = createSlice({
  name: "count",
  initialState: { count: 0 } as CountState, // Используйте тип состояния CountState
  reducers: {
    like: (state) => {
      state.count += 1;
    },
    unlike: (state) => {
      state.count -= 1;
    },
  },
});

// Экспортируйте типы для действий, если это необходимо
export type { LikeAction, UnlikeAction };

// Экспортируйте действия с использованием PayloadAction для автоматической типизации
export const { like, unlike } = countSlice.actions;

// Экспортируйте срез (slice) и его редьюсер
export default countSlice.reducer;
