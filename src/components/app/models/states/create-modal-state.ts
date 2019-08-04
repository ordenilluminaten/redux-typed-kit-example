import { State } from 'redux-typed-kit';

export default class CreateModalState extends State {
    public isShown: boolean = false;
    public isCreating: boolean = false;
    public error: string;
}