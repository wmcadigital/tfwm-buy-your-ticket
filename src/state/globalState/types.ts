import React from 'react';
import { TFormDataStateKey } from 'state/formDataState/types';
import { TTicket } from 'types/ticket';

export type TGlobalStateHistory = {
  subscriptions: TFormDataStateKey[];
  section: number;
  step: number;
};

export type TGlobalState = {
  form: {
    isStarted: boolean;
    isFinished: boolean;
    isSubmitted: boolean;
    isEditing: boolean;
    currentSection: number;
    currentStep: number;
    currentSubscriptions: TFormDataStateKey[];
    history: {
      current: TGlobalStateHistory[]; // Keep track of sections/steps the users can go back to
      previous: TGlobalStateHistory[]; // Keep track of data to be deleted if users goes back and branches from
    };
  };
  ticket: TTicket;
};

type TGlobalStateAction =
  | {
      type: 'START_FORM';
      payload?: null;
    }
  | {
      type: 'SHOW_SUMMARY_PAGE';
      payload?: null;
    }
  | {
      type: 'ADD_TICKET_INFO';
      payload: TTicket;
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
      payload: TGlobalStateHistory;
    }
  | {
      type: 'GO_BACK';
      payload?: null;
    }
  | {
      type: 'SUBSCRIBE_TO_FORM_DATA';
      payload: TFormDataStateKey;
    };

export type TGlobalStateReducer = (state: TGlobalState, action: TGlobalStateAction) => TGlobalState;
export type TGlobalStateContext = [TGlobalState, React.Dispatch<TGlobalStateAction>];

export type TGlobalContextProviderProps = {
  children?: React.ReactNode;
};
