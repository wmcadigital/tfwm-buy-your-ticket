import React from 'react';
import { TTicket } from 'types/ticket';

export type TGlobalState = {
  form: {
    isStarted: boolean;
    isFinished: boolean;
    isSubmitted: boolean;
    isEditing: boolean;
    currentSection: number;
    currentStep: number;
    history: { section: number; step: number }[];
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
      payload: {
        section: number;
        step: number;
      };
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
