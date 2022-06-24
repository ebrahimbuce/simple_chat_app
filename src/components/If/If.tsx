import { ReactElement } from 'react';

interface IProps {
    isTrue: boolean;
    children: any;
}

export const If:React.FC<IProps> = ({isTrue, children}) => isTrue ? children : null;
