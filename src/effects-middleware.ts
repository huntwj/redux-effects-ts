import { AnyAction, Dispatch, Middleware } from "redux";

const EFFECT_ACTION_TYPE = "__EFFECT_ACTION";

/**
 * We want the EFFECT action to work for as many people as possible.
 * As a result, we want this to be a Flux Standard Action as that is
 * widely acceptable and will be usable by most anyone.
 *
 * https://github.com/redux-utilities/flux-standard-action
 */
export interface EffectAction {
  type: typeof EFFECT_ACTION_TYPE;
  payload: {
    thunk(dispatch: Dispatch<AnyAction>, getState: () => any): void;
  };
}

/**
 * Create the effects middleware.
 *
 * Usage:
 * ```
 * store = createStore(
 *   rootReducer,
 *   applyMiddleware(
 *     middleware1,
 *     effectsMiddleware,
 *     middlware2,
 *   )
 * );
 * ```
 * @param _api
 */
export const effectsMiddleware: Middleware = api => next => action => {
  if (isEffectAction(action)) {
    action.payload.thunk(api.dispatch, api.getState);
  }
  return next(action);
};

const isEffectAction = (action: any): action is EffectAction =>
  typeof action === "object" && action.type === EFFECT_ACTION_TYPE;

export const createThunk = (
  thunk: (dispatch: Dispatch<AnyAction>, state: any) => void,
): EffectAction => ({
  type: EFFECT_ACTION_TYPE,

  payload: {
    thunk,
  },
});
