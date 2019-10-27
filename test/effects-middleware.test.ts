import { applyMiddleware, createStore } from "redux";

import { createThunk, EffectAction, effectsMiddleware } from "../src";

interface IncrementAction {
  type: "INCREMENT";
  payload: {
    amount: number;
  };
}
const increment = (amount: number) => ({
  type: "INCREMENT" as const,

  payload: {
    amount,
  },
});

type TestAction = IncrementAction | EffectAction;

interface TestState {
  counter: number;
}
const initialState = { counter: 0 };

const testReducer = (
  state: TestState = initialState,
  action: TestAction,
): TestState => {
  switch (action.type) {
    case "INCREMENT":
      return {
        counter: state.counter + action.payload.amount,
      };
    default:
      return state;
  }
};
describe("Effects Middleware", () => {
  const testStore = () => {
    const store = createStore(testReducer, applyMiddleware(effectsMiddleware));

    return store;
  };

  it("allow standard actions to pass through", () => {
    const store = testStore();
    store.dispatch(increment(1));
    const state = store.getState();

    expect(typeof state.counter).toBe("number");
    expect(state.counter).toBe(1);
  });

  it("allows thunks to be processed", () => {
    const store = testStore();
    store.dispatch(
      createThunk(dispatch => {
        dispatch(increment(1));
        dispatch(increment(2));
      }),
    );
  });
});
