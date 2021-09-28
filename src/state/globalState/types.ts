import { TSession } from 'types/session';
import { TSectionAndStep } from 'types/subscription';
import { TTicket } from 'types/ticket';

export type TGlobalStateHistory = {
  index: number;
  path: TSectionAndStep[];
};

export type TGlobalState = {
  form: {
    isStarted: boolean;
    isFinished: boolean;
    isSubmitted: boolean;
    isEditing: boolean;
    currentSection: number;
    currentStep: number;
    history: TGlobalStateHistory;
  };
  ticket: TTicket;
  session: TSession;
};

export type TGlobalStateAction =
  | {
      type: 'START_FORM';
      payload?: null;
    }
  | {
      type: 'UPDATE_SESSION_DATA';
      payload: TSession;
    }
  | {
      type: 'SHOW_SUMMARY_PAGE';
      payload?: null;
    }
  | {
      type: 'EDIT_STEP';
      payload: TSectionAndStep;
    }
  | {
      type: 'ADD_TICKET_INFO';
      payload: TTicket;
    }
  | {
      type: 'UPDATE_HISTORY';
      payload: Partial<TGlobalStateHistory>;
    }
  | {
      type: 'GO_TO_SECTION';
      payload: number;
    }
  | {
      type: 'GO_TO_STEP';
      payload: number;
    }
  | {
      type: 'GO_TO_SECTION_AND_STEP';
      payload: TSectionAndStep;
    }
  | {
      type: 'GO_BACK';
      payload?: null;
    };

export type TGlobalStateReducer = (state: TGlobalState, action: TGlobalStateAction) => TGlobalState;
export type TGlobalStateContext = [TGlobalState, React.Dispatch<TGlobalStateAction>];

export type TGlobalContextProviderProps = {
  children?: React.ReactNode;
};
